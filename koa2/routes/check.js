var router = require('koa-router')();
var sequelize =require('../models/ModelHeader')();

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title'
  };

  await ctx.render('index', {
  });
})

router.get('/getCheckInfo', async function (ctx, next) {
	let loginbean = ctx.session.loginbean;
	let orderid=ctx.query.orderid;
	let sql = 'select od.dishname,od.num,d.price from orderdishes od,dishes d where od.orderid=? and od.dishid=d.id';
	let rs = await sequelize.query(sql,{replacements: [orderid]});
	sql = 'select weixin,zhifubao from qrcodeinfos where id=?';
	let rs1 = await sequelize.query(sql,{replacements: [loginbean.shopid]});
	rs[0].push(rs1[0])
	let payRs=rs[0];
	// console.log(payRs);
	ctx.body=payRs;
})

router.get('/finishOrder', async function (ctx, next) {
	let loginbean = ctx.session.loginbean;
	let orderid=ctx.query.orderid;
	let sql = 'update orders set state=1 where id=? and shopid=?';
	let rs = await sequelize.query(sql,{replacements: [orderid,loginbean.shopid]});
	let rsjson = JSON.parse(JSON.stringify(rs[0]))
	// if(rsjson.info.indexOf('1')>0){
		ctx.body=1;
	// }else{
	// 	ctx.body=0;
	// }
	
})

module.exports = router;
