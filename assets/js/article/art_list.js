$(function () {
  const { layer } = layui;
  const { laypage } = layui;

  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date);

    const y = dt.getFullYear();
    const m = padZero(dt.getMonth() + 1);
    const d = padZero(dt.getDate());
    const hh = padZero(dt.getHours());
    const mm = padZero(dt.getMinutes());
    let ss = padZero(dt.getSeconds());

    return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
  };

  function padZero(n) {
    return n > 9 ? n : "0" + n;
  }

  const q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: "",
    state: "",
  };
  initTable();
  function initTable() {
    $.ajax({
      method: "GET",
      url: "/my/article/list",
      data: q,
      success(res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        const htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
        renderPage(res.total);
      },
    });
  }
  initCate();
  function initCate() {
    const { form } = layui;
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        const htmlStr = template("tpl-cate", res);
        $("[name=cate_id]").html(htmlStr);
        form.render();
      },
    });
  }

  $("#form-search").on("submit", function (e) {
    e.preventDefault();
    const cate_id = $("[name=cate_id]").val();
    const state = $("[name=state]").val();

    q.cate_id = cate_id;
    q.state = state;
    initTable();
  });
  function renderPage(total) {
    console.log(total);
    laypage.render({
      elem: "pageBox",
      count: total,
      limit: q.pagesize,
      limits: [2, 3, 4, 5],
      curr: q.pagenum,
      jump(obj, frist) {
        console.log(obj.curr);

        q.pagenum = obj.curr;
        q.pagesize = obj.limit;
        if (!frist) {
          initTable();
        }
      },
      layout: ["count", "limit", "prev", "page", "skip", "refresh", "next"],
    });
  }
  $("table").on("click", ".btn-delete", function () {
    const len = $(".btn-delete").length;
    const id = $(this).attr("data-id");
    layer.confirm("确认删除?", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        method: "GET",
        url: "/my/article/delete/" + id,
        success(res) {
          if (res.status !== 0) {
            return layer.msg(res.message);
          }
          layer.msg(res.message);
          if (len === 1 && q.pagenum !== 1) {
            q.pagenum--;
          }
          initTable();
        },
      });
      layer.close(index);
    });
  });
});
