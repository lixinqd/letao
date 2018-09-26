  /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */
  $(function(){
      //先进行表单校验初始化
      $('#form').bootstrapValidator({

        // 指定校验时显示的图标, 固定写法
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',      // 校验成功
          invalid: 'glyphicon glyphicon-remove',   // 校验失败
          validating: 'glyphicon glyphicon-refresh'  // 校验中
        },
        //配置校验字段
        fields: {
          username: {
            //配置校验规则
            validators:{
              //非空校验
              notEmpty: {
                //提示信息
                message: "用户名不能为空"
              },
              //长度校验
              stringLength: {
                min: 2,
                max: 6,
                message: "用户名长度必须是2-6位"
              },
              callback: {
                message: "用户名不存在"
              }
            }
          },

          password: {
            //配置校验规则
            validators: {
              //校验非空
              notEmpty: {
                message: "密码不能为空"
              },
              //长度校验
              stringLength: {
                min: 6,
                max: 12,
                message: "密码长度必须是6-12位"
              },
              //callback 专门用于配置回调的提示说明
              callback: {
                message: "密码错误"
              }
            }
          }
        }
      });



// 2 通过submit按钮进行提交表单 可以让表单校验插件进行校验
  //(1) 校验通过 默认将表单继续提交 会跳转页面  所以需要在校验通过
  //后阻止默认的提交方式  通过ajax进行登录请求
  //(2)校验失败 表单校验插件本身就会阻止默认的提交方式
  //

  $('#form').on("success.form.bv",function(e){
    //阻止表单的默认提交方式
    e.preventDefault();

    //通过ajax进行提交
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      //通过表单序列化获取表单的数据
      data: $('#form').serialize(),
      dataType: "json",
      success: function(info){
        if(info.success){
          //登录成功 跳转到首页
          location.href = "index.html";
        }

        if(info.error===1000){
          //alert("用户名不存在")
          //将表单用户名校验状态从成功更新成失败 并且给用户提示
          $('#form').data("bootstrapVlidator").updateStatus("username","INVALID","callback");

        }
        if(info.error===1001){
          //alert("密码错误")
          //将表单密码校验状态从成功更新失败 并给用户提示
          //updateStatus
          //参数1:字段名称
          //参数2 校验状态 NOT_VALIDATED 未校验的 
          // VALIDATING 校验中 INVALID失败or VALID成功
          $('#form').data("bootstarpValidator").updateStatus("password","INVALID","callback")
        }
      }
    })
  })


//3 添加重置功能
$('[type="reset"]').click(function(){
  //调用插件的方法进行重置
  //resetForm(boolean)
  //1 true 将表单内容和校验状态都重置
  //2 false 只 重置校验状态
  $('#form').data("bootstrapValidator").resetForm();
})

  })