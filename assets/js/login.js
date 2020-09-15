$(function(){
 // 点击“去注册账号”的链接
 $('#link_reg').on('click', function() {
  $('.login').show()
  $('.reg').hide()
})

// 点击“去登录”的链接
$('#link_login').on('click', function() {
  $('.login').hide()
  $('.reg').show()
})
// 从 layui 中获取 form 对象
var form = layui.form
var layer = layui.layer

form.verify({
  pwd:[/^[\S]{6,12}$/,'密码必须是6-12位,且不能以空格'],
  repwd:function(value){
    var pwd = $('.reg [name = password]').val()
    if(pwd !== value){
      return '两次密码必须一致'
    }
  }
})

$('#form_reg').on('submit',function(e){
  e.preventDefault()
  var data = {
    username: $('#form_reg [name=username]').val(),
    password: $('#form_reg [name=password]').val()
  }
  $.post('/api/reguser',data,function(res){
    if(res.status !== 0) {
      return layer.msg('登录失败'+res.message)
    }
    layer.msg('注册成功,请登录')
    $('#form_login').click()
  })
})

$('#form_login').submit(function(e){
  e.preventDefault()
  var data = $(this).serialize()
  $.ajax({
    method:'post',
    url:'/api/login',
    data:data,
    success:function(res){
      if(res.status !== 0){
        return layer.msg('登录失败'+res.message)
      }
      layer.msg('登录成功')
      localStorage.setItem('token',res.token)
      location.href = '/index.html'
    }
  })
})
})





