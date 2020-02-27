<?php
	include 'base.php';
	$arr = array();
	$sql = "select * from shop_info";
	$res = mysql_query($sql);
	while($row = mysql_fetch_assoc($res)){
		array_push($arr,$row);
	}
	echo json_encode($arr);
?>