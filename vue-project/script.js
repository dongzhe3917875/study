var initialIndexcpu = 1;
var initialIndexram = 1;
var ramGroupArr = [
  [{
    text: "1G"
  }, {
    text: "2G"
  }, {
    text: "4G"
  }, {
    text: "8G"
  }, ],
  [{
    text: "2G"
  }, {
    text: "4G"
  }, {
    text: "8G"
  }, {
    text: "16G"
  }],
  [{
    text: "4G"
  }, {
    text: "8G"
  }, {
    text: "16G"
  }, {
    text: "30G"
  }, ],
  [{
    text: "8G"
  }, {
    text: "16G"
  }, {
    text: "32G"
  }, {
    text: "48G"
  }, ]
]


var vm = new Vue({
  el: "#config-box",
  data: {
    iscurcpu: initialIndexcpu,
    iscurram: initialIndexram,
    cpus: [{
      text: "2核"
    }, {
      text: "4核"
    }, {
      text: "8核"
    }, {
      text: "16核"
    }, ],
    currentCpu: "",
    rams: ramGroupArr[initialIndexcpu],
    infolists: [{
      label: "配置："
    }],
    click: false,
    currentram: ""
  },
  computed: {
    currentRam: function() {
      console.log("trigger")
      return this.rams[initialIndexram].text;
    }
  },
  methods: {
    changeCpu: function(event, index) {
      this.currentCpu = event.target.innerText;
      this.iscurcpu = index;
      this.click = false;
      this.rams = ramGroupArr[index];
    },
    changeRam: function(event, index) {
      this.iscurram = index;
      // this.iscurcpu = 0;
      this.currentCpu = this.cpus[this.iscurcpu].text;
      this.click = true;
      this.currentram = event.target.innerText;
      console.log(event.target.innerText);
    },
    send: function(event, index) {
      console.log(this.click ? this.currentram : this.currentRam);
      console.log(this.currentCpu);
    }
  }
})
vm.currentCpu = vm.cpus[initialIndexcpu].text;
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
