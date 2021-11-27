$(function(){
    // 点击切换注册登录界面
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })

    $('#link_login').on('click',function(){
        $('.reg-box').hide();
        $('.login-box').show();
    })

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        'pwd':[/^[\S]{6,12}$/]  ,//密码必须6-12位，而且不能出现空格
        'repwd':function(value){
            //通过形参能够拿到确认密码框的内容
            var pwd=$('.reg-box [name=password]').val();
            if(pwd!==value) return '密码不一致'
        }
    })

    //监听注册表单事件;
    $('#form_reg').on('submit',function(e){
        //阻止默认提交
        e.preventDefault();
        //发起Ajax的post请求
        var data= {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()};
        $.post('/api/reguser',data,function(res){
                    if(res.status!==0){
                        return layer.msg(res.message);
                    }
                    layer.msg('注册成功,请登录');
                    $('#link_login').click();
                })
    })

    //监听登录表单的事件
    $('#form_login').submit(function(e){
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('登录失败!');
                }
                layer.msg('登录成功！');
                // console.log(res.token);
                //跳转后台页面
                localStorage.setItem('token',res.token);
                location.href='/大事件项目/index.html';
            }
            
        })
    })
})