$(function () {
  const { form } = layui;
  const { layer } = layui;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称必须在1~6位之间";
      }
    },
  });
  initUserInfo();
  function initUserInfo() {
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取用户信息失败！");
        }
        console.log(res);
        form.val("formUserInfo", res.data);
      },
    });
  }
  $("#btnReset").click(function (e) {
    e.preventDefault();
    initUserInfo();
  });
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success(res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("更新成功");
        window.parent.gerUserInfo();
      },
    });
  });
});
