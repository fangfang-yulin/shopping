var l_box = document.getElementById('l-box');
var boy = document.getElementById('boy');
var e = document.documentElement || document.body;
var divs;
var loca = window.location.href;

function Logo(){
	document.body.style.overflow="hidden";
	l_box.style.display = "block";
	l_box.style.zIndex = 100;
	l_box.style.left = (document.body.clientWidth/2-l_box.offsetWidth/2)+'px';
	l_box.style.top = (document.body.clientHeight/2-l_box.offsetHeight/2)+'px';
	divs=document.createElement('div');
	document.body.appendChild(divs);
	divs.style.background="rgba(0,0,0,0.3)";
	divs.style.position='fixed';
	divs.style.top='0'
	divs.style.zIndex = 99;
	divs.style.width=document.body.clientWidth+'px';
	divs.style.height=document.body.clientHeight+'px';
	console.log(divs.style.width+" login  "+divs.style.height)
	//console.log(window.clientY.height);
}


var user_login = document.getElementById('user_login');
var user_reg = document.getElementById('user_reg');
//var btns = document.getElementById('btns').getElementsByTagName('button');
/*var aa = document.getElementById('aaa');
var bb = document.getElementById('bbb');*/

function btns0(){
	$('.login_user').addClass('login_active');
	$('.reg_user').removeClass('login_active');
	user_login.style.display='block';
	user_reg.style.display='none';
}
/*aa.onclick=function(){
	$('.login_user').addClass('login_active');
	$('.reg_user').removeClass('login_active');
	user_login.style.display='block';
	user_reg.style.display='none';
}*/
function btns1(){
	$('.reg_user').addClass('login_active');
	$('.login_user').removeClass('login_active');
	user_login.style.display='none';
	user_reg.style.display='block';
}





function Stop(){
	var l_box = document.getElementById('l-box');
	document.body.style.overflow="auto";
	l_box.style.display = "none";
	document.body.removeChild(divs);
	btns0();
}


var login_User = false;
var login_Pwd = false;
var login_user = document.user_login_frm.user;
var login_pwd = document.user_login_frm.pwd;
function Submit_login(){
    if (login_User&&login_Pwd) {
        User_Login();
    }else{
        checkuser_Login();
        checkpwd_Login();
        return false;
    }
}
function User_Login(){
	var str = "username="+login_user.value+"&password="+login_pwd.value;
	console.log(str)
	var xhr = new XMLHttpRequest();
	xhr.open('get','../servers/login.php?'+str);
	xhr.send();
	console.log(xhr.responseText);
	xhr.onload=function(){
		if(xhr.responseText=='no'){
			alert("账号或密码错误");
			window.location.href=loca;
		}else{
			setCookie('loginuser',login_user.value);
			setCookie('loginid',xhr.responseText);
			alert("登录成功");
			window.location.href=loca;
			
			
			
			
		}
		
	}
}
function checkuser_Login() {
	var reg = /^[A-Za-z][0-9A-Za-z]{3,15}$/
	var userN = login_user.nextElementSibling;
	if (reg.test(login_user.value)) {
	    userN.style.color = "green";
	    userN.innerText = "√";
	    login_User = true;
	} else {
	    userN.style.color = "red";
	    userN.innerText = "用户名由英文字母和数字的4-16位字符，以字母开头";
	        login_User = false;
	    }
}

function checkpwd_Login() {
    var reg = /^[0-9A-Za-z]{4,10}$/
    var pwdN = login_pwd.nextElementSibling;
    if (reg.test(login_pwd.value)) {
        pwdN.style.color = "green";
        pwdN.innerText = "√";
        login_Pwd = true;
    } else {
        pwdN.style.color = "red";
        pwdN.innerText = "密码不能含有非法字符，长度为4-10之间";
        login_Pwd = false;
    }
}



	var User = false;
	var	Pwd = false;
	var	Cpwd = false;
	var	Email = false;
	var	Birthday = false;
	var user = document.frm.user;
	var pwd = document.frm.pwd;
	var email = document.frm.email;
	var birthday = document.frm.birthday;
	var cpwd = document.frm.cpwd;
	var sex = document.frm.sex;
	
	
	function checkUser() {
		var reg = /^[A-Za-z][0-9A-Za-z]{3,15}$/
		var userN = user.nextElementSibling;
		if (reg.test(user.value)) {
			userN.style.color = "green";
			userN.innerText = "√";
			User = true;
		} else {
			userN.style.color = "red";
			userN.innerText = "用户名由英文字母和数字的4-16位字符，以字母开头";
			User = false;
		}
	}

	function checkpwd() {

		var reg = /^[0-9A-Za-z]{4,10}$/
		var pwdN = pwd.nextElementSibling;
		if (reg.test(pwd.value)) {
			pwdN.style.color = "green";
			pwdN.innerText = "√";
			Pwd = true;
		} else {
			pwdN.style.color = "red";
			pwdN.innerText = "密码不能含有非法字符，长度为4-10之间";
			Pwd = false;
		}
	}

	function checkcpwd() {


		var cpwdN = cpwd.nextElementSibling;
		if (pwd.value == cpwd.value && cpwd.value != '') {
			cpwdN.style.color = "green";
			cpwdN.innerText = "√";
			Cpwd = true;
		} else {
			cpwdN.style.color = "red";
			cpwdN.innerText = "两次输入的密码不一致";
			Cpwd = false;
		}

	}

	function checkemail() {

		var reg = /^\w+@(qq|163|sina|126|shou|google)\.(com|cn)$/;
		var emailN = email.nextElementSibling;
		if (reg.test(email.value)) {
			emailN.style.color = "green";
			emailN.innerText = "√";
			Email = true;
		} else {
			emailN.style.color = "red";
			emailN.innerText = "E-mail格式不正确；例如：web@shou.com";
			Email = false;
		}
	}

	function checkbirthday() {

		var reg = /^(19\d\d|20[0-1][0-9])-(0?[1-9]|1[0-2])-(0?[1-9]|[1-2]\d|3[0-1])$/
		var birthdayN = birthday.nextElementSibling;
		if (reg.test(birthday.value)) {
			birthdayN.style.color = "green";
			birthdayN.innerText = "√";
			Birthday = true;
		} else {
			birthdayN.style.color = "red";
			birthdayN.innerText = "生日格式不正确，例如1990-1-24或1990-01-24";
			Birthday = false;
		}


	}

	function Submit() {
		if (User && Pwd && Cpwd && Email && Birthday) {
			regsiter();
		} else {
			checkUser();
			checkpwd();
			checkcpwd();
			checkemail();
			checkbirthday();
			return false;
		}
	}

	function regsiter() {
		var str = ''
		var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789_'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
		for (var i = 0; i < 60; i++) {
			str += $chars.charAt(Math.floor(Math.random() * $chars.length));
		}
		var xhrstr = "Uid=" + str + "&username=" + user.value + "&password=" + pwd.value + "&email=" + email.value +
			"&birthday=" + birthday.value + "&sex=" + sex.value + "&state=0&code=" + str;
		var xhr = new XMLHttpRequest();
		xhr.open('get', '../servers/regsiter.php?'+xhrstr);
		xhr.send();
		alert(xhr.responseText);
		xhr.onload = function () {
			alert(xhr.responseText);
			if (xhr.responseText == "yes"){
				alert("注册成功");
				setCookie('loginuser',user.value);
				setCookie('loginid',str);
				window.location.href=loca;
				
			}
			if (xhr.responseText == "no") {
				alert("注册失败，你的用户名或邮箱地址已经被注册");
				window.location.href=loca;
			}
		}
	}