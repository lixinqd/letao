
$(function(){


var currentPage = 1;//表示当前页
var pageSize = 5;//每页多少条

    //一进入页面就需要展示数据
    //通过ajax向后台发送请求获取数据
// 通过模板引擎绑定数据渲染页面
render();
 function render(){
     $.ajax({
         type: "get",
         url: "/user/queryUser",
         data: {
             page: currentPage,//页码
             pageSize: pageSize//每页多少条
         },
         dataType: "json",
         success: function (info) {
             console.log(info)
             //绑定数据
             //模板引擎template（模板id 数据对象）
             var htmlStr = template("tpl", info);
             //根据生成的模板渲染tbody
             $('tbody').html(htmlStr);


             //分页初始化测试
             $('#paginator').bootstrapPaginator({
                 //指定bootstrap的版本
                 bootstrapMajorVersion: 3,
                 //总页数
                 totalPages: Math.ceil(info.total / info.size),
                 //当前页
                 currentPage: info.page,
                 //给分页按钮添加点击事件
                 onPageClicked: function (a, b, c, page) {
                     console.log(page);
                     //更新当前页
                     currentPage = page;
                     //重新根据render渲染
                     render();
                 }
             });
         }
     })
 }
})

