<?php
include 'base.php';
$id=$_GET['Uid'];

$res=mysql_query("select * from shop_cart where Uid='$id'");
$arr =[];
while($row=mysql_fetch_assoc($res)){
	array_push($arr,$row);
}
echo (json_encode($arr));

 
?>