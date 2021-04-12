$(function () {
  gerUserInfo();
});

$("#btn_logOut").click(function () {
  layer.confirm("确定退出？", { icon: 3, title: "提示" }, function (index) {
    localStorage.removeItem("token");
    location.href = "/login.html";
    layer.close(index);
  });
});
function gerUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.token,
    // },
    success(res) {
      if (res.status !== 0) {
        return layui.layer.msg(res.message);
      }
      renderAvatar(res.data);
    },
  });
}
function renderAvatar(user) {
  const name = user.nickname || user.username;
  $("#welcome").html("欢迎" + name);

  if (user.user_pic != null) {
    $(".layui-nav-img").atter("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    const first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}
