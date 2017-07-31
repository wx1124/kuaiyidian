var router = require('koa-router')();
var sequelize =require('../models/ModelHeader')();
var OrderModel = require('../models/OrderModel');
var OrderDishModel = require('../models/OrderDishModel');

router.get('/getDishForKeys', async function (ctx, next) {
  let loginbean = ctx.session.loginbean;
  if(typeof(loginbean.shoprole)!='undefined'){
  	  let dishkey = ctx.query.dishkey;

  	  let sql = 'select d.id,d.dishname,d.price from dishkeys dk,dishes d where dk.dishkey=? and dk.dishid=d.id';
      let dishRs = await sequelize.query(sql,{replacements: [dishkey]});
      ctx.body=dishRs[0];
	  
  }else{
  	ctx.body=[];
  }
})

router.get('/newDishMenu', async function (ctx, next) {
  let loginbean = ctx.session.loginbean;
  if(typeof(loginbean.shoprole)!='undefined'){
      let t = await sequelize.transaction();
      try{
        let order={
          tableid:ctx.query.tableid,
          shopid:loginbean.shopid,
          sumprice:ctx.query.price*ctx.query.num,
          realprice:0,
          createtime:new Date(),
        };
        let rs1 = await OrderModel.create(order, {transaction: t});
        let orderid = rs1.null;
        let orderDish={
          orderid:orderid,
          tableid:ctx.query.tableid,
          dishid:ctx.query.dishid,
          dishname:ctx.query.dishname,
          num:ctx.query.num,
          remark:ctx.query.remark,
          createtime:new Date(),
        };
        let rs2 = await OrderDishModel.create(orderDish, {transaction: t});
        t.commit();
       }catch(err){
        console.log(err);
        t.rollback();
        ctx.body=0;
        return;
       }
       ctx.body=1;
  }
})

router.get('/appendDish', async function (ctx, next) {
  let loginbean = ctx.session.loginbean;
  if(typeof(loginbean.shoprole)!='undefined'){
      let orderid=ctx.query.orderid;
      let orderDish={
        orderid:orderid,
        tableid:ctx.query.tableid,
        dishid:ctx.query.dishid,
        dishname:ctx.query.dishname,
        num:ctx.query.num,
        remark:ctx.query.remark,
        createtime:new Date(),
      };
      try{
        let rs = await OrderDishModel.create(orderDish);
        ctx.body=1;
      }catch(err){
        ctx.body=0;
      }
      
  }
})

router.get('/delDish', async function (ctx, next) {
  let loginbean = ctx.session.loginbean;
  if(typeof(loginbean.shoprole)!='undefined'){
      let odid=ctx.query.odid;
      try{
        let rs = await OrderDishModel.destroy({where:{id:odid,state:{'$lt':2}}});
        if(rs==1){
          ctx.body=1;
        }else{
          ctx.body=0;
        }
        
      }catch(err){
        ctx.body=-1;
      }
      
  }
})

router.get('/getOrderList', async function (ctx, next) {
  //-------接参-----------
  let tableid = ctx.query.tableid;
  //------先查orders表，获取orderid的集合-----
  let orderRs = await OrderModel.findAll({where:{tableid:tableid}});
  //-----循环orderid，查orderDish表获得菜品,再用键值对的方式放进对象中--
  let len=orderRs.length;
  let orderObj = {};
  for(let i=0;i<len;i++){
    let orderid = orderRs[i].id;
    let dishRs = await OrderDishModel.findAll({where:{orderid:orderid}});
    orderObj[orderid] = dishRs;
  }
  ctx.body = orderObj;
})

router.get('/confirmDish', async function (ctx, next) {
  let odid = ctx.query.odid;
  let rs = await OrderDishModel.update({state:1},{where:{'id':odid}});
  ctx.body=1;
})



module.exports = router;
