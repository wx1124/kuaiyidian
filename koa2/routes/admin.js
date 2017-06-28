var router = require('koa-router')();
var Users = require('../models/UserModel');
var ShopModel = require('../models/ShopModel');
var formidable = require('formidable');


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


router.post('/createShop', async function (ctx, next) {
  let loginbean = ctx.session.loginbean;

  let form = new formidable.IncomingForm();   //创建上传表单
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = './public/images/shopphoto/';     //设置上传目录 文件会自动保存在这里
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 5 * 1024 * 1024 ;   //文件大小5M
  let fields = await new Promise(function(resolve,reject){
  		form.parse(ctx.req, function (err, fields, files) {
	        if(err){
	            console.log(err);
	        }
	        fields.photourl=files.photourl.path.replace('public','');
	        resolve(fields);
	   })
  })
  try{
  	let creaters = await ShopModel.create(fields);
  	console.log(creaters);
  	console.log('返回id:'+creaters.null);
  }catch(err){
		console.log(err.errors[0].message); //识别唯一键
  }
  


  ctx.body='商店创建成功';
  
})

module.exports = router;
