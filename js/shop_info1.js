$(function(){
	var local = window.location.search;
	var href = window.location.href;
	var sb = document.getElementById('sb');
	//console.log(123)
	var reg = /^\?id=\d+$/;
	var id=local.substr(local.indexOf('=')+1,);
	if(!id||!reg.test(local)){
		var str = `<div class="jumbotron">
						<h1>很抱歉,您还没有选择商品</h1>
						<p>请到商品详情页选择商品</p>
						<p><a class="btn btn-primary btn-lg" href="index.html" role="button">返回商品详情页</a></p>
					</div>`;
	$(".container").html(str);
	}else{
		var xhr = new XMLHttpRequest();
		xhr.open('get','../servers/shop_info.php?id='+id);
		xhr.send();
		xhr.onload=function(){
			if(JSON.parse(xhr.responseText)){
				bindHtml(JSON.parse(xhr.responseText));
				
			}
		}		
	}
	function bindHtml(data){
		//console.log(data)
		var ulimgstr = `
			<ul id="ul">
				<li class="selected"><img src="${data.sProfileImg}"/></li>
								
		`
		if(data.sDetailImg0){
			ulimgstr+=`<li><img src="${data.sDetailImg0}"/></li>`;
		}
		if(data.sDetailImg1){
			ulimgstr+=`<li><img src="${data.sDetailImg1}"/></li>`;
		}
		if(data.sDetailImg2){
			ulimgstr+=`<li><img src="${data.sDetailImg2}"/></li>`;
		}
		ulimgstr+=`</ul>`
		var str=`
			<div class="panel panel-default">
		    <div class="panel-body">
		        <div class="media">
		            <div class="media-left">
		            	<div id="zoom">${ulimgstr}`+`
		            		
							<div id="small">
								<div id="show"></div>
								<img src="${data.sProfileImg}"/>
							</div>
							<div id="larger">
								<img src="${data.sProfileImg}"/>
							</div>
						</div>
		            </div>
		            <div class="media-body">
		               <dl>
		                	<dt><h1>${data.sMallName}</h1></dt>
		                	<dd>现价:&nbsp;<span style="font-weight: bold;color:#800000">￥</span><span style="font-size: 22px;font-weight: bold;color:#C40000">${parseFloat(data.iPrice/100).toFixed(2)}</span></dd>
		                	<dd>
		                		<span>最近销量 <span style="color:#408080">${data.iSoldNum}</span></span>
		                		<span>累计评价  <span style="color:#408080">${data.iFavNum}</span></span>
		                		<span>累计宝贝收藏  <span style="color:#408080">${data.iComments}</span></span>
		                	</dd>
		                	<dd>
		                		<p>颜色: <button>彩色</button></p>
		                		<p>尺码: <button>均码</button></p>
		                		<p><div class="btn-group" role="group" aria-label="..." >
											<span style="float: left;padding-right: 15px;">数量: </span><button class="btn btn-default" id="Subtract">-</button>
											  <input type="text" class="btn btn-default" value="1" style="width: 48px;" id="goods"></input>
											  <button class="btn btn-default" id="add">+</button>
											  <span style="padding-left: 15px;">库存：<span style="color: red;font-weight: bold;" id="nums"> ${data.iMallQty}</span>件</span>
									</div>
		                		
		                		</p>
		                	</dd>
		                	<dd>
		                		<button type="button" class="btn" id="buy" data-id="" user-id="">立即购买</button>
		                		<button type="button" class="btn" id="joinCart" data-id="${data.iMallId}" data-price="${parseFloat(data.iPrice/100).toFixed(2)}" data-name="${data.sMallName}" data-img="${data.sProfileImg}" data-qty="${data.iMallQty}"><span class="iconfont" sty>&#xe602;</span>加入购物车</button>
		                	</dd>
		                	<dd>
		                		<span style="margin-left: 0;">7</span>&nbsp;7天无理由退款
		                		<span>官</span>&nbsp;100%官方正品
		                		<span>邮</span>&nbsp;全场包邮
		                	</dd>
		                </dl>
		               
		            </div>
		        </div>
		    </div>
		    <ul class="nav nav-tabs">
		        <li role="presentation" class="active"><a href="#">商品详情信息</a></li>
		        <li role="presentation"><a href="#">用户点评(${data.iFavNum})</a></li>
		        <li role="presentation"><a href="#">相关商品</a></li>
		    </ul>
		  <div id="info_imgs"> ${data.sMallDesc}</div>
		`;
		/* */
		$(".container").html(str);
		var ulogin = getCookie('loginid')
		var zoom = document.getElementById('zoom');
		var z = new Zoom(zoom);
		var Subtn = document.getElementById('Subtract');
		var goods = document.getElementById('goods');
		var addbtn = document.getElementById('add');
		var nums = document.getElementById('nums');
		var buy = document.getElementById('buy');
		var joinCart = document.getElementById('joinCart');
		buy.onclick=function(){
			if(!ulogin){
				alert("您还没登录");
			}else{
				window.location.href="../view/shopCar.html";
			}
		}
		joinCart.onclick=function(){
			
			if(!ulogin){
				alert("您还没登录");
			}else{
				
				//data-id="${data.iMallId}" data-price="${parseFloat(data.iPrice/100).toFixed(2)}" data-name="${data.sMallName}" data-img="${data.sProfileImg}" data-qty="${data.iMallQty}"
				var iMallId = this.getAttribute("data-id");
				var iPrice = this.getAttribute("data-price");
				var sMallName = this.getAttribute("data-name");
				var sProfileImg = this.getAttribute("data-img");
				var iMallQty = this.getAttribute("data-qty");
				var str = "Uid="+ulogin+"&iMallId="+this.getAttribute("data-id")+"&iPrice="+this.getAttribute("data-price")+"&sMallName="+this.getAttribute("data-name")+"&sProfileImg="+this.getAttribute("data-img")+"&iMallQty="+this.getAttribute("data-qty")+"&numbers="+goods.value;
				var Cxhr = new XMLHttpRequest();
				Cxhr.open('get','../servers/joinCart.php?'+str);
				Cxhr.send();
				Cxhr.onload=function(){		
					if(Cxhr.responseText){
						alert("成功加入"+goods.value+"件商品至购物车");
						getSb();
					}
				}
			}
			
		}
		
		addbtn.onclick=function(){
			var s =Number(goods.value);	
			if(s<Number(nums.innerText)){
				Subtn.disabled=false;
				this.disabled=false;
				goods.value=Number(goods.value)+1;
			}else{
				Subtn.disabled=false;
				this.disabled=true;
			}
		}
		Subtn.onclick=function(){
			var s =Number(goods.value);	
			if(s>1){
				addbtn.disabled=false;
				this.disabled=false;
				goods.value=Number(goods.value)-1;
			}else{
				addbtn.disabled=false;
				this.disabled=true;
			}
		}
		goods.oninput=function(){
			var s =parseInt(goods.value);
			if(!s){
				Subtn.disabled=true;
				addbtn.disabled=false;
				goods.value=1;
			}else if(s>Number(nums.innerText)){
				addbtn.disabled=true;
				Subtn.disabled=false;
				goods.value=nums.innerText;
			}else if(s<1){
				addbtn.disabled=false;
				Subtn.disabled=true;
				goods.value=1;
			}
			goods.value=parseInt(goods.value);
		}
		}
	function getSb(){
		var xhr = new XMLHttpRequest();
			xhr.open('get',"../servers/shopCar.php?Uid="+getCookie('loginid'));
			xhr.send();
			xhr.onload=function(){
				sb.innerText=JSON.parse(xhr.responseText).length;
			}
	}
	//顶部轮播
	var index_banner_info_ul=0;
	function run(){
			if(index_banner_info_ul==5) index_banner_info_ul=0;
			$("#banner_info_ul li").eq(index_banner_info_ul).animate({opacity:"1"}, 1000).siblings().animate({opacity:"0"}, 500);
			index_banner_info_ul++;
	}
	setInterval(run,3000);

})

