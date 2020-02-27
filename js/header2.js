
$(function(){
	var login = document.getElementById('store_login');
	var quit = document.getElementById('quit');
	var sb = document.getElementById('sb');
	
	is_login();
	function is_login(){
		if(getCookie('loginid')){
			$(".store_login").html(`<a style="color:#FA322C;">欢迎,${getCookie('loginuser')}</a>`);
			document.getElementById('quit').style.display="block";
			getSb();
		}else{
			$(".store_login").html(`<a href="#" onclick="Logo()" onclick="return fasle;">你好，请登录</a>`);
			document.getElementById('quit').style.display="none";
			sb.innerText=0;
		}
	}
	quit.onclick=function(){
		delCookie('loginid');
		delCookie('loginuser');
		is_login();
	}
	function getSb(){
		var xhr = new XMLHttpRequest();
			xhr.open('get',"../servers/shopCar.php?Uid="+getCookie('loginid'));
			xhr.send();
			xhr.onload=function(){
				sb.innerText=JSON.parse(xhr.responseText).length;
			}
	}
	
	
	
})

//console.log($(".store_cart").html());