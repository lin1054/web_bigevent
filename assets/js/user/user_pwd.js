$(function () {
  const { form } = layui;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    somPwd: function (value) {
      if (value === $("[name=oldPwd]").val()) {
        return "新旧密码不能相同";
      }
    },
    rePwd: function (value) {
      if (value !== $("[name=newPwd]").val()) {
        return "两次密码不一样";
      }
    },
  });
  $(".layui-form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/updatepwd",
      data: $(this).serialize(),

      success(res) {
        if (res.status !== 0) {
          return layui.layer.msg("更新密码失败！");
        }
        layui.layer.msg("更新密码成功！");
        $(".layui-form")[0].reset();
      },
    });
  });
});
