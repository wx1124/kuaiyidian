var router = require('koa-router')();
var Users = require('../models/UserModel');

router.get('/', async function (ctx, next) {
  let loginbean = ctx.session.loginbean;
  if(loginbean){
  	await ctx.render('admin/adminIndex', {});
  }else{
  	ctx.redirect('/adminLogin.html');
  }
  
});

router.post('/login', async function (ctx, next) {
	let rs = await new Promise(function(resolve,reject){
		Users.findOne({where:{email:ctx.request.body.email,pwd:ctx.request.body.pwd}}).then(function(rs){
			if(rs!=null){
				let loginbean=new Object();
				loginbean.id = rs.id;
				loginbean.nicheng = rs.nicheng;
				loginbean.role = rs.role;
				loginbean.msgnum = rs.msgnum;
				ctx.session.loginbean=loginbean;
				//ctx.redirect('/admin/index');
				resolve(1);
			}else{
				resolve(2);
			}
		});
	})
	if(rs==1){
		ctx.redirect('./');
		//ctx.body='登陆成功';
	}else{
		ctx.body='email/密码错误';
	}
  	
})

module.exports = router;
