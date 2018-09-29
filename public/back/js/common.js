
//1 使用NProgress插件实现进度条功能
//需求 在发送第一个ajax的时候开启进度条 在全部的ajax回来时关闭进度条
$(document).ajaxStart(function(){
    //开启进度条
    NProgress.start();
});

$(document).ajaxStop(function(){
    //模拟网络延迟
    setTimeout(function(){
        //关闭进度条
        NProgress.done();
    },500);
});

//2 公共部分 
//二级菜单切换 主体部分右侧头部菜单栏切换  退出功能
$(function(){
    //1 二级菜单切换效果
    $('.lt_aside .category').click(function(){
        $('.lt_aside .child').stop().slideToggle();
    })
    //点击顶部左侧菜单栏切换
    $('.icon_menu').click(function () {
        $('.lt_aside').toggleClass('hidemenu');
        $('.lt_topbar').toggleClass('hidemenu');
        $('.lt_main').toggleClass('hidemenu');
    })

    //3 点击退出显示模态框
    $('.icon_logout').click(function () {
        //获取模态框 调用modal('show')可以显示模态框 hide隐藏
        $('#logoutModal').modal('show');
    });

    //点击退出按钮退出
    $('#logoutBtn').click(function () {
        //实现退出功能 应该调用后台提供的接口 在服务端销毁该用户的登录状态
        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            dataType: "json",
            success: function (info) {
                if (info.success) {
                    //退出成功 跳转到登录页
                    location.href = "login.html";
                }
            }
        })
    })
})
