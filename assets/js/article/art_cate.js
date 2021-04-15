$(function () {
  initArtCateList();
  function initArtCateList() {
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success(res) {
        console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        const htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
      },
    });
  }
  let indexAdd = null;
  const { layer } = layui;
  $("#btnAddCate").on("click", function () {
    indexAdd = layer.open({
      type: 1,
      title: "添加文章分类",
      content: $("#dialog-add").html(),
      area: ["500px", "250px"],
    });
  });
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        initArtCateList();
        layer.close(indexAdd);
      },
    });
  });
  let indexEdit = null;
  const { form } = layui;
  $("tbody").on("click", ".btn-edit", function () {
    indexEdit = layer.open({
      type: 1,
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
      area: ["500px", "250px"],
    });
    const id = $(this).attr("data-id");
    // 发起请求获取对应分类的数据
    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        form.val("form-edit", res.data);
      },
    });
  });
  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        layer.close(indexEdit);
        initArtCateList();
      },
    });
  });

  $("tbody").on("click", ".btn-delete", function () {
    const id = $(this).attr("data-id");
    layer.confirm("确认删除?", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        method: "GET",
        url: "/my/article/deletecate/" + id,
        success(res) {
          if (res.status !== 0) {
            return layer.msg(res.message);
          }
          layer.msg(res.message);
          layer.close(index);
          initArtCateList();
        },
      });
    });
  });
});
