<?php
	header('content-type:text/html;charset=utf-8');
	$conn=mysql_connect('localhost','root','root');
	mysql_select_db('db_shop',$conn);
	mysql_query('set names utf8');
?>