var data;

getData()
	async function getData(){
		let res=await pAjax({
			url:"../php/shopCar.php",
			data:{"Uid":1}
			//datattype:"json"
		})
		
		
//		console.log(JSON.parse(res)[0])
		data = JSON.parse(res);
		
		linkshop(JSON.parse(res))
		
	}


var ulogin = getCookie("loginid");
var link1=document.getElementById("intro")
function linkshop(data){
	var arrdata;
	
	let xhr = new XMLHttpRequest();
	xhr.open('get','../php/iMallId.php');
	xhr.send();
	
	xhr.onload=function(){
		console.log(JSON.parse(xhr.responseText));
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
						<dt><a href="JavaScript:;" class="a" onclick="return false;"><img src="${arrdata[n].sProfileImg}"/><span></span></a></dt>
						<dd>
							<a href="" class="a" id="a" href="JavaScript:;" onclick="return false;">
								<p>${arrdata[n].sMallName}</p>
								<p style="color: black;">
								  ${parseFloat(arrdata[n].iPrice/100).toFixed(2)}
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
//				console.log(str);
				var Cxhr = new XMLHttpRequest();
				Cxhr.open('get','../php/joinCart.php?'+str);
				Cxhr.send();
				Cxhr.onload=function(){		
					if(Cxhr.responseText){
						alert("成功加入1件商品至购物车")
						getData();
					}
				}	
			}
		}
		
	}
	
}