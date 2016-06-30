// 创建一个闭包

// option
(function($) {
  // 插件的定义
  $.fn.validate_form = function(options) {
    // build main options before element iteration
    // 合并参数
    var opts = {};
    opts = options.option;
    for (var item in options.option) {
      opts[item] = $.extend({}, $.fn.validate_form.defaults, $.fn.validate_form
        .customOption[options.option[item].customOption], options.option[
          item]);
    }
    // options.option = opts;
    // options.option = opts;
    // 绑定按钮
    var makeBtn = options.makeBtn || null;

    // 管理函数 判断正则
    var oManager = {
        judgeOk: function(obj) {
          var status = true;
          for (var item in opts) {
            if (opts[item].regIndex == false) {
              status = false;
              break;
            }
          }
          if (status) {
            obj.removeClass('disabled');
          } else {
            obj.addClass('disabled');
          }
        },
        judgeReg: function(regArray, value) {
          var andStatus = true,
            orStatus = false;
          if (regArray.and && regArray.and.length) {
            for (var i = 0; i < regArray.and.length; i++) {
              if (!(regArray.and[i][0].test(value) == regArray.and[
                  i][1])) {
                andStatus = false;
                break;
              }
            }
          }
          if (regArray.or && regArray.or.length) {
            for (var i = 0; i < regArray.or.length; i++) {
              if ((regArray.or[i][0].test(value) == regArray.or[i][
                  1
                ])) {
                orStatus = true;
                break;
              }
            }
          }
          return andStatus || orStatus;
        }
      }
      // iterate and reformat each matched element
      // 主函数 对每一个input都验证
      //input的位置关系 example
      /*
          <div class="edit-box input-validate-box">
              <div>
                  <input type="text" class="form-control input-validate" id="vpcName" data-id={{vpc_id}}>
                  <i class="fa"></i>
              </div>
              <div class="info check-info">
                <span class="tip"></span>
              </div>
          </div>
      */
      // 可选用参数
      /*
          allowEmpty: true;                       // 是否可以为空
          extra: function(){}                     // 对于不适合用正则的可以自定义函数
          and: [[reg, true], [reg, false]]        // 正则的 && 形式
          or: [[reg, true], [reg, false]]         // 正则的 || 形式
          right_not_icon: true                    // 验证正确是否显示图标
          novalid: true;                          // 不做任何验证（适合于表单被禁用的情况）
          callback: function(regIndex){};         // 回调函数，返回验证值
      */
    return this.each(function() {
      $this = $(this);

      $this.find("input, textarea").each(function(index, element) {
        $this = $(element);
        $id = $this.attr("id");
        $fa = $this.siblings(".fa");
        $tip = $this.parent("div").siblings("div.info").find(
          ".tip");
        if (opts[$id]) {
          if (!opts[$id].novalid) {
            $this.off("focus");
            $this.off("blur");
            $this.on({
              focus: (function($tip, $id) {
                return function() {
                  $tip.text(opts[$id].tip).css(opts[
                    $id].tipStyle);
                }
              })($tip, $id),
              blur: (function($tip, $id, $fa) {

                return function() {
                  var val = $(this).val();
                  if (val == "") {
                    if (opts[$id].allowEmpty) {
                      $fa.removeClass().addClass(
                        "fa").css(opts[$id].successStyle);
                      opts[$id].regIndex = true;
                      $tip.text(opts[$id].success).css(
                        opts[$id].successStyle);
                    } else {
                      $tip.text(opts[$id].warning).css(
                        opts[$id].warningStyle);
                      $fa.removeClass().addClass(
                        "fa fa-exclamation-circle"
                      ).css(opts[$id].warningStyle);
                      opts[$id].regIndex = false;
                    }

                  } else if (!oManager.judgeReg(
                      opts[$id].reg, val) || (opts[
                      $id].extra ? !opts[$id].extra(
                      val) : false)) {
                    $tip.text(opts[$id].error).css(
                      opts[$id].errorStyle);
                    $fa.removeClass().addClass(
                      "fa fa-times-circle").css(
                      opts[$id].errorStyle);
                    opts[$id].regIndex = false;
                  } else {
                    if (opts[$id].right_not_icon) {
                      opts[$id].regIndex = true;
                      $tip.text(opts[$id].success).css(
                        opts[$id].successStyle);
                      $fa.removeClass().addClass(
                        "fa").css(opts[$id].successStyle);
                    } else {
                      opts[$id].regIndex = true;
                      $tip.text(opts[$id].success).css(
                        opts[$id].successStyle);
                      $fa.removeClass().addClass(
                        "fa fa-check-circle").css(
                        opts[$id].successStyle);
                    }
                  }
                  opts[$id].callback && opts[$id].callback(
                    opts[$id].regIndex)
                  if (makeBtn) {
                    oManager.judgeOk(makeBtn);
                  }
                }.bind(this);
              }.bind(this))($tip, $id, $fa)
            })
          }

        }
      });
    });
  };
  // 私有函数：debugging
  function debug($obj) {
    if (window.console && window.console.log)
      window.console.log('hilight selection count: ' + $obj.size());
  };
  // 插件的defaults
  $.fn.validate_form.defaults = {
    reg: {

    },
    tipStyle: {
      color: "#27bf81"
    },
    warningStyle: {
      color: "#f28224"
    },
    successStyle: {
      color: "#27bf81"
    },
    errorStyle: {
      color: "#ff0d00"
    },
    regIndex: false
  };

  // 一些可以自己定制的验证组合
  $.fn.validate_form.customOption = {
      commonName: {
        tip: "2-32位字母、数字、横线组合，不能为纯数字",
        warning: "不能为空",
        error: "2-32位字母、数字、横线组合，不能为纯数字",
        success: "",
        reg: {
          and: [
            [/^[0-9a-zA-Z-]{2,32}$/, true],
            [/^[0-9]{2,32}$/, false]
          ]
        }
      },
      securityRule: {
        tip: "2-32位，中文、字母和数字组合，支持逗号和小括号",
        warning: "不能为空",
        error: "2-32位，中文、字母和数字组合，支持逗号和小括号",
        success: "",
        reg: {
          and: [
            [/^[\u4e00-\u9fa5|0-9a-zA-Z,，（）()]{2,32}$/, true]
          ]
        }
      },
      inviteRule: {
        tip: "2-32位，中文、字母和数字组合，支持横线和小括号",
        warning: "不能为空",
        error: "2-32位，中文、字母和数字组合，支持横线和小括号",
        success: "",
        reg: {
          and: [
            [/^[\u4e00-\u9fa5|0-9a-zA-Z-（）()]{2,32}$/, true]
          ]
        }
      },
      email: {
        tip: "请输入有效的电子邮箱地址",
        warning: "不能为空",
        error: "请输入有效的电子邮箱地址",
        success: "",
        reg: {
          and: [
            [
              /^[a-zA-Z0-9-_]+(\.[a-zA-Z0-9-_]+)*@[a-zA-Z0-9-_]+(\.[a-zA-Z0-9-_]+)*(\.[a-zA-Z]{2,4}){1,2}$/,
              true
            ]
          ]
        }
      },
      phoneNumber: {
        tip: "请输入有效的11位手机号码",
        warning: "不能为空",
        error: "请输入有效的11位手机号码",
        success: "",
        reg: {
          and: [
            [(function() {
              var phoneprefix = ['130', '131', '132', '133',
                '134', '135', '136', '137', '138', '139', '150',
                '151', '152', '153', '155', '156', '157', '158',
                '159', '170', '176', '177', '178', '180', '181',
                '182', '183', '184', '185', '186', '187', '188',
                '189'
              ]
              var prefix = phoneprefix.join("|");
              var phoneReg = new RegExp("^(" + prefix + ")" +
                "\\d{8}$");
              return phoneReg;
            })(), true]
          ]
        }
      },
      validatePhone: {
        tip: "请输入6位验证码",
        warning: "不能为空",
        error: "请输入6位验证码",
        success: "",
        reg: {
          and: [
            [/^[0-9]{6}$/, true]
          ]
        },
        right_not_icon: true,
        regIndex: false
      },
      validateAccount: {
        tip: "请输入正确的转账金额",
        warning: "不能为空",
        error: "请输入正确的转账金额",
        success: "",
        reg: {
          and: [
            [/^\d+$/, true]
          ]
        },
        regIndex: false
      },
      validatePassword: {
        tip: "8-24位字母、数字、下划线组合，须同时包含大小写字母及数字",
        warning: "不能为空",
        error: "请输入正确格式的密码",
        success: "",
        reg: {
          and: [
            [/^[_0-9A-Za-z]{8,24}$/, true],
            [/[0-9]+/, true],
            [/[a-z]+/, true],
            [/[A-Z]+/, true]
          ]
        },
        regIndex: false
      }
    }
    // 闭包结束
})(jQuery);
