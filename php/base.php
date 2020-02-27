<?php
header('content-type:text/html;charset=utf-8');
//连接mysql数据库
$conn=mysql_connect('localhost','root','root');
//连接指定数据库
mysql_select_db('db_shop',$conn);

//设置数据库编码
mysql_query('set names utf8');
?>