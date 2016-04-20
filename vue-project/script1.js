var initialapplication = 0;
// var initialIndexram = 1;
var setting = {
  "DIY": {
    index: 0,
    protocal: "TCP",
    port: 'ALL'
  },
  "HTTPS": {
    index: 0,
    protocal: "TCP",
    port: 443
  },
  "HTTP": {
    index: 0,
    protocal: "TCP",
    port: 80
  },
  "SSH": {
    index: 0,
    protocal: "TCP",
    port: 22
  },
  "PING": {
    index: 2,
    protocal: "ICMP",
    port: false
  },
  "REMOTE": {
    index: 0,
    protocal: "TCP",
    port: 3389
  },
  "FTP": {
    index: 0,
    protocal: "TCP",
    port: 21
  },
  "OpenVpn": {
    index: 1,
    protocal: "UDP",
    port: 1194
  }
}


var vm = new Vue({
  el: "#config-box",
  data: {
    iscurapp: initialapplication,
    iscurprotocal: "",
    protocols: ["TCP", "UDP", "ICMP", "ALL"],
    applications: [{
      text: "自定义",
      key: "DIY"
    }, {
      text: "HTTPS"
    }, {
      text: "SSH"
    }, {
      text: "PING"
    }, {
      text: "REMOTE"
    }, {
      text: "FTP"
    }, {
      text: "OpenVpn"
    }, {
      text: "HTTP"
    }],
    currentApplication: "",
    currentProtocal: "",
    infolists: [{
      label: "配置："
    }],
    ip: "",
    ifIPValidate: true,
    ifShowTip: false,
    iptip: "",
    port: "",
    defaultport: "ALL",
    disabled: false,
    placeholder: "22,1-10,ALL",
    ifShowPortTip: false,
    porttip: "",
    ifPortValidate: true
  },
  computed: {
    // currentProtocal: function() {
    //   console.log("trigger")
    //   return this.rams[initialIndexram].text;
    // }
  },
  methods: {
    changeApplication: function(event, index) {
      this.currentApplication = event.target.innerText;
      this.iscurapp = index;
      var key = setting[event.target.getAttribute("data-key")];
      this.iscurprotocal = key.index;
      if (key.port) {
        this.defaultport = key.port;
        this.disabled = false;
        this.placeholder = "22,1-10,ALL";
        this.ifPortValidate = false;
      } else {
        this.defaultport = "";
        this.disabled = true;
        this.placeholder = "";
      }
      this.currentProtocal = key.protocal;
    },
    changeProtocal: function(event, index) {
      this.currentProtocal = event.target.innerText;
      this.iscurprotocal = index;
      this.iscurapp = initialapplication;
      this.currentApplication = this.applications[this.iscurapp].text;
    },
    send: function(event, index) {
      console.log(this.currentApplication);
      console.log(this.currentProtocal);
    },
    validateIP: function(event) {
      this.ifIPValidate = !(
        /^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})$/
        .test(this.ip) ||
        /^((0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})\.){3}(0|1[0-9]{0,2}|2[0-9]{0,1}|2[0-4][0-9]|25[0-5]|[3-9][0-9]{0,1})(\/)(0|1[0-9]{0,1}|2[0-9]{0,1}|3[1-2]{0,1}|[4-9])$/
        .test(this.ip))
      console.log(this.ifIPValidate);
      if (this.ifIPValidate) {
        this.iptip = "您输入的地址有误"
      } else {
        this.iptip =
          '<i style="display: inline;" class="fa fa-check-circle"></i>'
      }
    },
    validatePort: function(event) {
      this.ifPortValidate = !(
        (/^\d{1,5}$/.test(this.defaultport) && ((+this.defaultport) >=
          1 &&
          (+this.defaultport) <=
          65535)) || (this.defaultport == "ALL") || this.validateRange(
          this.defaultport)
      );
      if (this.ifPortValidate) {
        this.porttip = "您输入的端口有误"
      } else {
        this.porttip =
          '<i style="display: inline;" class="fa fa-check-circle"></i>'
      }
    },
    tipvalidateIP: function() {
      this.ifShowTip = true;
      this.iptip = "请输入有效的IP地址"
    },
    validateRange: function(port) {
      if (/^(\d{1,5})-(\d{1,5})$/.test(port) == false) {
        return false;
      }
      var portArr = /^(\d{1,5})-(\d{1,5})$/.exec(port);
      var portbegin = +portArr[1];
      var portend = +portArr[2];
      return ((portbegin >= 1 && portbegin <= 65535) && (portend >= 1 &&
        portend <= 65535) && (portbegin < portend))
    },
    tipvalidatePort: function() {
      this.ifShowPortTip = true;
      this.porttip = "请输入有效的端口"
    }
  }
})

vm.currentApplication = vm.applications[initialapplication].key ? vm.applications[
  initialapplication].key : vm.applications[initialapplication].text;
vm.iscurprotocal = setting[vm.currentApplication].index;
vm.currentProtocal = setting[vm.currentApplication].protocal;
// 可以动态的替换data数据 尤其的适合ajax模型 逻辑不变 数据可变的情况
// vm.$data = {
//   iscurcpu: initialIndexcpu,
//   iscurram: initialIndexram,
//   cpus: [{
//     text: "4核"
//   }, {
//     text: "8核"
//   }, {
//     text: "16核"
//   }, {
//     text: "32核"
//   }, ],
//   currentCpu: "",
//   rams: ramGroupArr[initialIndexcpu],
//   infolists: [{
//     label: "配置："
//   }],
//   click: false,
//   currentram: ""
// }
