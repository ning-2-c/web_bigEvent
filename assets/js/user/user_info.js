$(function(){
    var form = layui.form
    var layer=layui.layer
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return 'nickname.length is from 1 to 6'
            }
        }
    })
    initUsrInfo()
    function initUsrInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return  layer.msg('get userinfo')
                }
                // console.log(res);
                form.val('formUserInfo',res.data)
            }
        })
    }

    $('#btnReset').on('click',function(e){
        e.preventDefault();
        initUsrInfo();

    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('fail to update')
                }
                layer.msg('success to update')
                window.parent.getUserInfo()
            }
        })
    })
})