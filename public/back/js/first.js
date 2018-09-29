//入口函数
$(function(){
    var currentPage = 1;//当前页
    var pageSize = 5;//每页多少条

//一进入页面 渲染
render();
function render(){
    //1 发送ajax请求 获取一级分类全局数据 通过模板引擎渲染到页面
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategoryPaging',
        data: {
            page: currentPage,
            pageSize: pageSize
        },
        dataType: 'json',
        success: function (info) {
            console.log(info);
            //通过template方法生成htmlStr 进行渲染(将模板和数据对象进行绑定)
            var htmlStr = template("tpl", info);
            $('tbody').html(htmlStr);

            //分页初始化
            $('#paginator').bootstrapPaginator({
                //版本号 3
                bootstrapMajorVersion: 3,
                //总页
                totalPages: Math.ceil(info.total / info.size),
                //当前页
                currentPage: info.page,
                // //给页码添加点击事件
                onPageClicked: function (event, originalEvent, type, page) {
                    console.log(page);
                    //更新当前页
                    currentPage = page;
                    //重新渲染
                    render();
                }
            })
        }
    });
}

//2 点击添加分类按钮  显示添加模态框
$('#addBtn').click(function(){
    //显示添加的模态框
    $('#addModal').modal('show');
})

//3 通过表单校验插件 实现表单校验功能
$('#form').bootstrapValidator({
    //配置图标
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',      // 校验成功
        invalid: 'glyphicon glyphicon-remove',   // 校验失败
        validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    // 配置校验字段
    fields: {
        categoryName: {
            //配置校验规则
            validators: {
                //非空校验
                notEmpty: {
                    message: '请输入一级分类名称'
                }
            }
        }
    }
});

//4 注册表单校验成功事件 阻止校验成功时的默认提交 通过ajax提交
$('#form').on('success.form.bv',function(e){
    //阻止默认的提交行为
    e.preventDefault();
    //通过ajax提交
    $.ajax({
        type: 'post',
        url: '/category/addTopCategory',
        data: $('#form').serialize(),
        dataType: 'json',
        success: function( info ){
            console.log(info);
            if(info.success){
                //关闭模态框
                $('addModal').modal('hide');
                //重新渲染第一页面
                currentPage = 1;
                render();
                //表单内容和校验状态都要重置，resetForm传true才会将内容和状态都重置
                $('#form').data('bootstrapValidator').resetForm(true);
            }
        }
    })
})

})