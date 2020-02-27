<?php
	include 'base.php';
	$Uid = $_GET['Uid'];
	$iMallId = $_GET['iMallId'];
	$iMallId = $_GET['iMallId'];
	$iPrice = $_GET['iPrice'];
	$sMallName = $_GET['sMallName'];
	$sProfileImg = $_GET['sProfileImg'];
	$iMallQty = $_GET['iMallQty'];
	$numbers = $_GET['numbers'];
	$sql = "select * from shop_cart where iMallId='$iMallId'";
	$res = mysql_query($sql);
	$row = mysql_fetch_assoc($res);
	if(!$row){
		$sql = "INSERT INTO shop_cart(Uid,iMallId,iPrice,sMallName,sProfileImg,iMallQty,numbers,is_select) VALUES (\"".$Uid."\",\"".$iMallId."\",\"".$iPrice."\",\"".$sMallName."\",\"".$sProfileImg."\",\"".$iMallQty."\",\"".$numbers."\",0)";
		$res = mysql_query($sql);
		echo "n1";
	}else{
		$numbers =$numbers+intval($row['numbers']);
		echo $numbers;
		$sql = "UPDATE `shop_cart` SET `numbers`='$numbers' WHERE `iMallId`='$iMallId'";
		$res = mysql_query($sql);
		echo 'n2';
	}
	
?>