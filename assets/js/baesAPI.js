$.ajaxPrefilter(function (options) {
  options.url = "http://api-breakingnews-web.itheima.net" + options.url;
  if (options.url.includes("/my/")) {
    options.headers = {
      Authorization: localStorage.token || "",
    };
    options.complete = function (response) {
      console.log(response);
      const { responseJSON } = response;
      //   const responseJSON = response.responseJSON;
      const { status } = responseJSON;
      const { message } = responseJSON;
      if (status === 1 && message === "身份认证失败！") {
        localStorage.removeItem("token");
        // 2. 强制跳转到登录页面
        location.href = "/login.html";
      }
    };
  }
});
