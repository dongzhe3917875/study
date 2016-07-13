(function($) {
  var ajax_func = function(obj) {
    var defaultOption = {
      url: "",
      type: "POST",
      dataType: "json",
      data: {},
      success: function(data) {

      }
    }
    var obj = $.extend(true, {},
      defaultOption, obj);
    $.ajax(obj);
  }
  var d = document;
  var w = window;
  var p = parseInt,
    dd = d.documentElement,
    db = d.body,
    dc = (d.compatMode == 'CSS1Compat'),
    dx = (dc ? dd : db),
    ec = encodeURIComponent;
  var CHAT = {
    msnObj: d.getElementById("message"),
    screenheight: w.innerHeight ? w.innerHeight : dx.clientHeight,
    username: null,
    userid: null,
    socket: null,
    scrollToBottom: function() {
      w.scrollTo(0, d.getElementById("message").clientHeight);
    },
    logout: function() {
      $(".logout").on("click", function() {
        this.socket.disconnect();
        var obj = {
          url: "/logout",
          success: function(data) {
            var message = data.error || data.success;
            alert(message);
            if (data.success) {
              window.location.href = data.location;
            }
          }
        }
        ajax_func.call(null, obj);
      }.bind(this))
    },
    //提交聊天消息内容
    submit: function() {
      var content = d.getElementById("content").value;
      if (content != '') {
        var obj = {
          userid: this.userid,
          username: this.username,
          content: content
        };
        this.socket.emit('message', obj);
        d.getElementById("content").value = '';
      }
      return false;
    },
    genUid: function() {
      return new Date().getTime() + "" + Math.floor(Math.random() * 899 +
        100);
    },
    updateSysMsg: function(o, action) {
      //当前在线用户列表
      var onlineUsers = o.onlineUsers;
      //当前在线人数
      var onlineCount = o.onlineCount;
      //新加入用户的信息
      var user = o.user; //userid username
      var userhtml = "";
      var separator = '';
      for (key in onlineUsers) {
        if (onlineUsers.hasOwnProperty(key)) {
          userhtml += separator + onlineUsers[key];
          separator = '、';
        }
      }
      $("#onlinecount").html('当前共有 ' + onlineCount + ' 人在线，在线列表：' +
        userhtml);

      var html = '';
      html += '<div class="msg-system">';
      html += user.username;
      html += (action == 'login') ? ' 加入了聊天室' : ' 退出了聊天室';
      html += '</div>';
      $("<section></section>").addClass("system J-mjrlinkWrap J-cutMsg")
        .html(
          html).appendTo(this.msnObj);
      this.scrollToBottom();
    },
    //第一个界面用户提交用户名
    usernameSubmit: function() {
      var username = $("#username").text();
      if (username != "") {
        $("#username").text("");
        $("#username").hide();
        d.getElementById("chatbox").style.display = 'block';
        this.init(username);
      }
      return false;
    },
    reverseColor: function(color) {
      return "#" + (255 - parseInt(color.slice(0, 2), 16)).toString(
          16) + (255 - parseInt(color.slice(2, 4), 16)).toString(16) +
        (255 - parseInt(color.slice(4, 6), 16)).toString(16)
    },
    judgeThreshold: function(init, threshold) {
      var result = 0;
      if (init - threshold >= 0) {
        result = init - threshold;
      } else if (init + threshold <= 255) {
        result = init + threshold
      } else {
        result = ((init - 0 >= 255 - init) ? 0 : 255 - init);
      }
      return result;
    },
    genrateRandomClearColor: function(color) {
      var R = parseInt(color.slice(0, 2), 16);
      var G = parseInt(color.slice(2, 4), 16);
      var B = parseInt(color.slice(4, 6), 16);
      var rR, rG, rB;
      rR = this.judgeThreshold(R, 150).toString(16);
      rG = this.judgeThreshold(G, 150).toString(16);
      rB = this.judgeThreshold(B, 200).toString(16);
      return "#" + rR + rG + rB;
    },
    startDanmu: function(danmu) {
      var random = Math.ceil(10000 * Math.random()) + 20000;
      var randomColor = (~~(Math.random() * (1 << 24))).toString(16);
      var bgcColor = "#" + randomColor;
      var reverse = this.genrateRandomClearColor(randomColor);
      var span = $('<span></span>');
      span
        .addClass("danmu")
        .text(danmu)
        .css({
          "background-color": bgcColor,
          "color": reverse
        })
        .prependTo($("body"))
        .animate({
          left: '-1%'
        }, random, function() {
          span.remove();
        });
    },
    init: function(username) {
      this.userid = this.genUid();
      this.username = username;
      $("#showusername").html(this.username);
      // console.log(this, db.clientHeight, d.getElementById("message"));
      this.msnObj = d.getElementById("message");
      console.log(this.msnObj.clientHeight, db.clientHeight)
      $(this.msnObj).css("min-height", (this.screenheight - db.clientHeight +
        d.getElementById("message").clientHeight) + "px");
      this.scrollToBottom();
      //连接websocket后端服务器
      this.socket = io.connect('ws://10.16.77.117:1741');
      this.logout();
      //告诉服务器端有用户登录
      this.socket.emit('login', {
        userid: this.userid,
        username: this.username
      });

      //监听新用户登录
      this.socket.on('login', function(o) {
        CHAT.updateSysMsg(o, 'login');
      });

      //监听用户退出
      this.socket.on('logout', function(o) {
        CHAT.updateSysMsg(o, 'logout');
      });

      //监听消息发送
      this.socket.on('message', function(obj) {
        var isme = (obj.userid == CHAT.userid) ? true : false;
        // var content = '<span style="background-color=\'#' + (~~(Math.random() *
        //     (1 << 24))).toString(16) + '\'">' + obj.content +
        //   '</span>'
        // console.log(content)
        CHAT.startDanmu(obj.username + '说：' + obj.content);
        var contentDiv = '<div>' + obj.content + '</div>';
        var usernameDiv = '<span>' + obj.username + '</span>';

        var section = d.createElement('section');
        if (isme) {
          section.className = 'user';
          section.innerHTML = contentDiv + usernameDiv;
        } else {
          section.className = 'service';
          section.innerHTML = usernameDiv + contentDiv;
        }

        d.getElementById("message").appendChild(section);
        CHAT.scrollToBottom();
      });
    }
  }

  //通过“回车”提交用户名
  d.getElementById("username").onkeydown = function(e) {
    e = e || event;
    if (e.keyCode === 13) {
      CHAT.usernameSubmit();
    }
  };
  //通过“回车”提交信息
  d.getElementById("content").onkeydown = function(e) {
    e = e || event;
    if (e.keyCode === 13) {
      CHAT.submit();
    }
  };

  $("input.submitt").on("click", function() {
    CHAT.usernameSubmit();
  })
  CHAT.usernameSubmit();
  $("#mjr_send").on("click", function() {
    CHAT.submit();
  })

})(jQuery)
