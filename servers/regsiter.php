<?php
	include 'base.php';
	$Uid = $_GET['Uid'];
	$username = $_GET['username'];
	$password= $_GET['password'];
	$email = $_GET['email'];
	$birthday = $_GET['birthday'];
	$sex = $_GET['sex'];
	$state = $_GET['state'];
	$code = $_GET['code'];
	$sql  = "select * from userinfo where email='$email' or username='$username'";
	$res = mysql_query($sql);
	$row = mysql_fetch_assoc($res);
	if(json_encode($row)=='false'){
		$sql = "INSERT INTO userinfo(Uid,username,password,email,birthday,sex,state,code) VALUES (\"".$Uid."\",\"".$username."\",\"".$password."\",\"".$email."\",\"".$birthday."\",\"".$sex."\",\"".$state."\",\"".$code."\")";
		$res = mysql_query($sql);	
		echo "yes";
	}else{
		echo "no";
	}
	
?>