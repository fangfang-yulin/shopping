<?php
	include 'base.php';
	$id = $_GET['id'];
	$sql = "select * from shop_info where iMallId='$id'";
	$res = mysql_query($sql);
	echo json_encode(mysql_fetch_assoc($res));
?>