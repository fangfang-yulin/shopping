//设置当前打开页的信息
let pageinfo2={
	pagenum: 1, // 当前页数
	pagesize:9, // 每页多少条
	total: 1000, // 数据总数
	totalpage: 100 // 页码总数
}
//获取container对象
var local = window.location.search;
var href = window.location.href;
let biuuu_city_list=document.querySelector('.biuuu_city_list');
var reg = /^\?search=(\w*|\W*|[\\u4e00-\\u9fa5]*)*$/;
var search_vaule=local.substr(local.indexOf('=')+1,);
if(!search_vaule||!reg.test(local)){
		/*var str = `<div class="jumbotron">
						<h1>很抱歉,您还没有选择商品</h1>
						<p>请到商品详情页选择商品</p>
						<p><a class="btn btn-primary btn-lg" href="index.html" role="button">返回商品详情页</a></p>
					</div>`;*/
			alert("访问错误");
			window.history.go(-1);
			//$(".container").html(str);
	}else{
		getData();		
	}

//从数据库中获取当前页的数据

async function getData(){
	let res=await pAjax({
		url:'../php/search_shop.php',
		data:{
			vaule:search_vaule,
		},
		datatype:'json'
	})
	//alert(res);
	let data=JSON.parse(res);
	if(data.count==0){
		alert("很抱歉，没有你想要的的数据");
		window.history.go(-1);
	}else{
		pageinfo2.total=data.count-0;
		pageinfo2.totalpage=Math.ceil(data.count/pageinfo2.pagesize);
		//alert(data.count.count1);
		//console.log(data);
		bindHtml(data);
	}
}
function bindHtml(data){
	//创建一个接受所有数据的字符串
	let str='<div>'
	//遍历当前获取的数据
	data.ar1.forEach(item=>{
		str+=`
        <li mallid="${item.iMallId}">
     	       <i class="pl-like pl-liked"></i>
       <a href="shop_info.html?id=${item.iMallId}" target="_blank" class="pl-link"> 
       <div class="pl-img">
            <img src="${item.sProfileImg}" width="527" height="506" alt="${item.sMallName}">
       </div>                     
       <div class="pl-img pl-hoverimg">
            <img src="${item.sDetailImg0}" width="527" height="506" alt="${item.sMallName}">
    	</div> 
            </a> 
            <p class="pl-name">${item.sMallName}</p>   
            <p class="pl-price">¥${item.iPrice/100}.00</p>     
         
        </li>

		`
	})
	
	str+='</div>'
	
	
	//追加刚刚添加的数据
	biuuu_city_list.innerHTML=str;
	
	//点击收藏按钮变红
		$(".pl-like").click(function(){         			
			$(this).toggleClass("pl-liked")
		})
	
	
	
	//获取分页对象
	let div1=document.querySelector('.demo20')
	fenye(div1)
}
	
	//打红勾
	$(".sorting_check").click(function(){
		
		$(".sorting_check").toggleClass("sorting_checked")
	
	})
	


//创建分页函数
function fenye(ele){
	new Pagination(ele,{
		pageInfo:pageinfo2,
		textInfo:{
			first: '首页',
		    prev: '上一页',
		    next: '下一页',
		    last: '尾页'
		},
		async change(n){
			if(pageinfo2.pagenum===n) return
			pageinfo2.pagenum=n
			let res2=await pAjax({
				url:'../php/clothes.php',
				data:{
					num1:pageinfo2.pagenum,
					size1:9
				},
				datatype:'json'
			})
			bindHtml(JSON.parse(res2))
		}
	})
}




