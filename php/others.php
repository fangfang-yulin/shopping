<?php
include 'base.php';

$num1=$_GET['num1'];
$size1=$_GET['size1'];

//数据的起始位置
$first=($num1-1)*$size1;

//设置数据库编码
mysql_query('set names utf8');
//查询数据
$sql="select * from shop_info where classid=5 limit $first,$size1";
//查询数据库获取结果集
$res=mysql_query($sql);
//创建数组存放数据
$arr1=[];
//遍历每条数据
while($row=mysql_fetch_assoc($res)){
    array_push($arr1, $row);
}
//查询总条数  count()：统计数据表的总条数
$res2=mysql_query('select count(*) as count1 from shop_info WHERE classid=5');
$count=mysql_fetch_assoc($res2);

$arr2=["ar1"=>$arr1,"count"=>$count];

echo json_encode($arr2)


?>