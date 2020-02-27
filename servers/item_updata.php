<?php
	include 'base.php';
	$iMallId1=$_GET['iMallId'];
	$number1=$_GET['number'];
	$Uid1=$_GET['Uid2'];
	$opt=$_GET['opt'];
	
	
	if($opt=='jia'||$opt=='jian'){
		$sql = "UPDATE `shop_cart` SET `numbers`='$number1' WHERE `iMallId`='$iMallId1'";
		//echo $sql;
		mysql_query($sql);
		
	}
	if($opt=='select'){
		$sql = "UPDATE `shop_cart` SET `is_select`='$number1' WHERE `iMallId`='$iMallId1'";
		mysql_query($sql);
	}
	
	if($opt=='del'){
		 $sql = "DELETE FROM `shop_cart` WHERE `iMallId`='$iMallId1'";
		 mysql_query($sql);
	}
	
	if($opt=='delall'){
		 $sql = "DELETE FROM `shop_cart` WHERE `Uid`='$Uid1'";
		 
		 mysql_query($sql);
	}
?>