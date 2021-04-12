$(function () {
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  const { form } = layui;
  const { layer } = layui;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码格式不正确"],
    repwd: function (value) {
      const pwd = $(".reg-box [name=password]").val();
      if (value != pwd) {
        return "两次密码不一致";
      }
    },
  });

  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/reguser",
      data: {
        username: $(".reg-box [name=username]").val(),
        password: $(".reg-box [name=password]").val(),
      },
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("注册成功，请登录！");
        $("#link_login").click();
      },
    });
  });
  $("#form_login").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/login",
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layer.msg("登录失败！");
        }
        layer.msg("登录成功！");
        localStorage.setItem("token", res.token);
        location.href = "/index.html";
      },
    });
  });
});
