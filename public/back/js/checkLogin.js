//这个功能用于拦截为登录的用户
//4 登录拦截功能
//   如果当前用户没有登录 需要拦截到登录页
//   前端不知道用户有没有登录 后端知道 需要发送请求获取用户的登录状态

$.ajax({
    type:"get",
    url: "/employee/checkRootLogin",
    dataType:"json",
    success: function(info){
        console.log(info);
        if(info.error===400){
            //未登录 拦截到登录页
            location.href="login.html";
        }
        if(info.success){
            //已登录 让用户继续访问即可
            console.log("当前用户已登录");
        }
    }
})
