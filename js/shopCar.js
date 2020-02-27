var data
var car=document.getElementById("buycar")
var ulogin = getCookie("loginid");
//获取数据数据
if(!ulogin){
	alert("你还没登录");
	window.history.go(-1);
}else{
	getData();
}

	async function getData(){
		let res=await pAjax({
			url:"../servers/shopCar.php",
			data:{"Uid":ulogin}
		})
		//console.log(res);
		data=JSON.parse(res)
		if(data.length==0){
			//window.location.href="http://localhost:81/League_of_legends_store/view/shopCar1.html"
			$('#all').html(`<h4 style="line-height:500px">您的购物车中还没有商品，<a href="../index.html" style="color:red">去逛逛吧</a></h4>`);
			$('#all').css({
				
				"margin-bottom":"20px",
				"background":"#EFEFEF",
				"text-align":"center",
				"height":"500px"
				
			})
			car.style.display='none';
			linkshop();
		}else{
			$('#all').css({
				"margin-bottom":"20px",
				"background":"white",
				"height":"auto"
					
			})
			$('.containeraaaaa').css({'display':'none'});
			car.style.display='block';
			bindHTML(JSON.parse(res));
			linkshop();
		}
		
		
	}
	
	async function item_updata(id,number,opt){
	let res=await pAjax({
		url:"../servers/item_updata.php",
		data:{"iMallId":id,"number":number,"opt":opt}
		
	})

	getData();
	}
	
	
	async function delall(a,opt){

		let res=await pAjax({
			url:"../servers/item_updata.php",
			data:{"Uid2":a,"opt":opt}
			
		})
//		console.log(res);
		getData();
	}


var contant=document.getElementById("all")
var car=document.getElementById("buycar")
function bindHTML(data){

	let selectAll1=data.every(item=>item.is_select==1)
	
	let str=`
			<div class="panel panel-default">
				
				<!--购物车顶部-->
			  <div class="panel-heading">
			  	<ul class="car-title">
			  	<li><input type="checkbox" class="checkall " id="selectAll" ${selectAll1?"checked":""} >&nbsp;&nbsp;</li>
			  	<li >全选</li>
			  	<li style="margin-left: 100px;">商品信息</li>
			  	<li style="margin-left: 220px;">单价（元）</li>
			  	<li style="margin-left: 100px;">数量</li>
			  	<li style="margin-left: 100px;">小计</li>
			  	<li style="margin-left: 90px;">操作</li>
			  	</ul>
			   </div>
	`
	
	data.forEach(item=>{
		
		str+=`
		
			<div class="panel-body">
			  	
				  	<input type="checkbox" class="check" id="select" data-id=${item.iMallId}  ${item.is_select==1? "checked":""}/>
				  	<div class="media">
					  <div class="media-left">
					    <a href="#">
					      <img class="media-object small_img" src="${item.sProfileImg}" alt="..." >
					    </a>
					  </div>
					  <div class="media-body">
					    <h4 class="media-heading">${item.sMallName}</h4>
					  
					     <span class="carDetail1" style="font-size:16px;">￥${item.iPrice}</span>
					    <div class="btn-group" role="group" aria-label="...">
					   		<button type="button" class="btn btn-default" style="width:30px;height:40px;font-size:20px" data-id=${item.iMallId} id="jian" ${item.numbers<=1?"disabled":''}>-</button>
							<button type="button" class="btn btn-default" id="btn" style="width:30px;height:40px;font-size:16px">${item.numbers}</button>
							<button type="button" class="btn btn-default" data-id=${item.iMallId} id="jia" style="width:30px;height:40px;font-size:20px">+</button>
				    	</div>
					     <span class="carDetail2" style="font-size:16px; color:red">￥${(item.iPrice*item.numbers).toFixed(2)}</span>
					     <span class="carDetail3" data-id=${item.iMallId} id="delet" style="font-size:16px;">删除</span>
					   
					  </div>
					</div>
				
			  </div>
		`
	})
	
	str+=`
		<div class="car-footer">
			  	<p style="margin-left: 10px; margin-top: 5px;"><input type="checkbox" id="checkAll" ${selectAll1?"checked":""}/>&nbsp;&nbsp;</p>
			  	<p id="selectall" >全选</p>
			  	<p style="margin-left: 30px; " ><a href="../index.html" style="color: red;">继续购物</a></p>
			  	<p style="float: right;margin-right: 80px;" ><a href="#"  class="a1" id="delAll"><img src="../images/del.jpg" style="margin-top: -5px;"/>&nbsp;清空购物车</a></p>
			  </div>
			  
		</div>
	
	`
	contant.innerHTML=str
	
		
		 str1=`
			<p class="myBuycar-title" style="font-size:14px; ">&nbsp;&nbsp;<img src="../images/shopcar1.jpg"/>&nbsp;&nbsp;我的购物车</p>
			<div class="myBuycar-contant">
				<p style="color: red;margin-top: 16px; font-size:14px;">满199包邮</p>
				<p ><img src="../images/yinc.png" id="full" style="display:none"/><img src="../images/wei.png" id="full1" style="display:none"/></p>
				<p class="shopcount" style="font-size:14px;">商品种类：${data.length}</p>
				<p>商品金额：<span style="color: red; font-size:14px;">￥${(total().price).toFixed(2)}</span></p>
				<p class="pay" id="accounts">去结算</p>
				<div class="myBuycar-footer">
					<h4>承诺</h4>
					<ul>
						<li>7天无理由退换货</li>
						<li>100%官方正品</li>
						<li>全场每单满199元包邮</li>
					</ul>
				</div>
			</div>
	`
	
	car.innerHTML=str1
	
	fn()
	
  }

	function fn(){
	
	var ful=document.getElementById("full")
	var ful1=document.getElementById("full1")
	var account=document.getElementById("accounts")
	var list1=data.filter(item=>item.is_select==1)
	var fullPrice=total().price
	if(fullPrice>=199){
		ful.style.display="block"
		
	}
	if(fullPrice<199&&fullPrice!=0){
		ful1.style.display="block"
	}
	if(list1.length!=0){
		account.style.backgroundColor="red"
		account.style.color="white"
	}
  }

	contant.addEventListener('click',e=>{
		
		var e=e||windont.evnt
		var target=e.target
		
		let id1=target.getAttribute("data-id")
		
		//加
		if(target.id=="jia"){
			
			data.forEach(item=>{
				if(item.iMallId==id1){			
					//通过不同的id识别不同商品，代表选操作的是当前商品
					item.numbers=item.numbers-0+1
					item_updata(item.iMallId,item.numbers,"jia")
					
				}
				
			})
			
			
		}	
		 
		//减
		if(target.id=="jian"){
			data.forEach(item=>{
				//通过不同的id识别不同商品，代表选操作的是当前商品
				if(item.iMallId==id1){			
				item.numbers=item.numbers-0-1
				item_updata(item.iMallId,item.numbers,"jian")
				}
			})
		}	
		 
		//删除
		if(target.id=="delet"){
			data.forEach(item=>{
				if(item.iMallId==id1){			
					item_updata(item.iMallId,item.numbers,"del")
				}
			})
		}
		
		//单选
		if(target.id=="select"){
			
			data.forEach(item=>{
				if(item.iMallId==id1){	
				//判断当前的选中框是否被选中，如果被选中就为1，未选中则为0
				item.is_select=target.checked?1:0 
				item_updata(item.iMallId,item.is_select,"select")
				}
			})
			
			
		}
		
		//全选
		if(target.id=="selectAll"||target.id=="checkAll"){
			
			data.forEach(item=>{	
				//判断当前的选中框是否被选中，如果被选中就为1，未选中则为0
				item.is_select=target.checked?1:0 
				item_updata(item.iMallId,item.is_select,"select")
			})
			
		}
		
		
		//全删
		if(target.id=="delAll"){
			if(confirm("确定要清空购物车吗")){
				delall(data[0].Uid,"delall");
			}	
		}
		//window.location.reload();
		

	})

	//结算
	car.addEventListener('click',e=>{
		var e=e||windont.evnt
		var target=e.target
	
		if(target.id=="accounts"){
		
			alert('当前支付：￥'+(total().price).toFixed(2))
			data.forEach(item=>{
				if(item.is_select==1){			
				item_updata(item.iMallId,item.numbers,"del")
				
				}
			})
				
		}
		//window.location.reload();
		
	})
	
	
	function total(){
	var price=0;//商品总价

	var list=data.filter(item=>item.is_select==1)
		
		for(var i=0;i<list.length;i++){
//			
			price+=list[i].numbers*list[i].iPrice
		}
	
	//返回总价和数量
		return {price:price}
	}
	
	
	//相关商品
	
	var link1=document.getElementById("intro")
	
	function linkshop(){
		var arrdata;
		
		let xhr = new XMLHttpRequest();
		xhr.open('get','../servers/iMallId.php');
		xhr.send();
		xhr.onload=function(){
			//console.log(xhr.responseText);
			//console.log(JSON.parse(xhr.responseText));
			arrdata=JSON.parse(xhr.responseText);
			bindjingpin(arrdata);
					
		}
		function bindjingpin(arrdata){
			
			var str=`<div class="jingpin">
							<h4>精品推荐</h4>
						</div>`;
			for(var i=0;i<6;i++){
				var n = Math.floor(Math.random()*arrdata.length);
				str+=`<dl class="xiangguan" id="xiangguan">
							<dt><a href="shop_info.html?id=${arrdata[n].iMallId}" class="a"><img src="${arrdata[n].sProfileImg}"/><span></span></a></dt>
							<dd>
								<a href="" class="a" id="a" href="JavaScript:;" onclick="return false;">
									<p>${arrdata[n].sMallName}</p>
									<p style="color: black;">
									  ￥${parseFloat(arrdata[n].iPrice/100).toFixed(2)}
									</p>
									<p class="buycar" data-id="${arrdata[n].iMallId}" data-price="${parseFloat(arrdata[n].iPrice/100).toFixed(2)}" data-name="${arrdata[n].sMallName}" data-img="${arrdata[n].sProfileImg}" data-qty="${arrdata[n].iMallQty}">加入购物车</p>
								</a>
							</dd>
						</dl>	`;
						
			}
			link1.innerHTML=str;
			var joinCart = document.getElementsByClassName("buycar");
			for(var t=0;t<joinCart.length;t++){
				joinCart[t].index=t;
				joinCart[t].onclick=function(){
					var iMallId = this.getAttribute("data-id");
					var iPrice = this.getAttribute("data-price");
					var sMallName = this.getAttribute("data-name");
					var sProfileImg = this.getAttribute("data-img");
					var iMallQty = this.getAttribute("data-qty");
					//console.log(ulogin);
					var str = "Uid="+ulogin+"&iMallId="+this.getAttribute("data-id")+"&iPrice="+this.getAttribute("data-price")+"&sMallName="+this.getAttribute("data-name")+"&sProfileImg="+this.getAttribute("data-img")+"&iMallQty="+this.getAttribute("data-qty")+"&numbers=1";
					//alert(str);
					var Cxhr = new XMLHttpRequest();
					Cxhr.open('get','../servers/joinCart.php?'+str);
					Cxhr.send();
					Cxhr.onload=function(){		
						if(Cxhr.responseText){
							alert("成功加入1件商品至购物车");
							//alert(Cxhr.responseText);
							getData();
						}
					}	
				}
			}
			
		}
		
		
	}





