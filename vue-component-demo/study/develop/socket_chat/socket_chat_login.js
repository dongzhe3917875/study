$(document).ready(function() {
  // Stuff to do as soon as the DOM is ready
  $(".nav-item").on("click", function() {
    var index = $(this).index();
    $(this).addClass("active").siblings().removeClass("active");
    $(".form_content").eq(index).addClass("show").siblings().removeClass(
      "show");
    var area_input = $(".form_content").eq(index).find("input");
    area_input.val("");
    area_input.siblings("i").removeClass().addClass("fa");
    area_input.parent().siblings().find(".tip").text("");
  })
  var registerPassword = $("#password");
  var registerPasswordMaksure = $("#makesurepassword");
  var lg_password = $("#lg_password");

  var loginOption = {
    lg_username: {
      customOption: "commonName",
      allowEmpty: false
    },
    lg_password: {
      customOption: "validatePassword",
      allowEmpty: false
    }
  }
  $(".login_content").validate_form({
    option: loginOption,
    makeBtn: $(".login_finish")
  });

  var registerOption = {
    username: {
      customOption: "commonName",
      allowEmpty: false
    },
    password: {
      customOption: "validatePassword",
      allowEmpty: false,
      extra: function(val) {
        if (registerPasswordMaksure.val() !== "") {
          registerPasswordMaksure.trigger("blur");
        }
        return true;
      }
    },
    makesurepassword: {
      extra: function(val) {
        return (val !== "" && val === $(registerPassword).val());
      },
      allowEmpty: false,
      success: "",
      tip: "请再次输入密码",
      error: "两次输入密码不一致"
    },
    email: {
      customOption: "email",
      allowEmpty: false
    }
  }

  $(".register_content").validate_form({
    option: registerOption,
    makeBtn: $(".logout_finish")
  });
});
