<?php
	include 'base.php';
	$username = $_GET['username'];
	$password = $_GET['password'];
	$sql  = "select * from userinfo where username='$username' and password='$password'";
	$res = mysql_query($sql);
	$row=mysql_fetch_assoc($res);
	$expire=time()+60*60;
	if(!$row){
		echo 'no';
	}else{
		//setcookie('loginid',$row['Uid'],$expire);
        //setcookie('loginuser',$username,$expire);
        echo $row['Uid'];
	}
?>