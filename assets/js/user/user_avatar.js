$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  const $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  $("#chooseImg").click(function () {
    $("#file").click();
  });
  $("#file").on("change", function (e) {
    const [file] = e.target.files;
    if (!file) return layui.layer.msg("请选择文件");
    const imgURL = URL.createObjectURL(file);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", imgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  const layer = layui.layer;
  $("#btnUpload").on("click", function () {
    const dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png");

    $.ajax({
      type: "POST",
      url: "/my/update/avatar",
      data: {
        avatar: dataURL,
      },
      success(res) {
        if (res.status !== 0) {
          return layer.msg("更换头像失败！");
        }
        layer.msg("更换头像成功！");
        window.parent.gerUserInfo();
      },
    });
  });
});
