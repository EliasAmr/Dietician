<?php

$text=file_get_contents('php://input');
$_text=json_decode($text,true);
var_dump($_text);
$column=$_text['col'];
$mysqli=new mysqli("localhost","root","Password","SANDRA");
$stmt=$mysqli->prepare("UPDATE Reservation set $column=(?) where username=(?) and $column=(?)");
$stmt->bind_param('sss',$_text['New_Value'],$_text['username'],$_text['Old_Value']);

$stmt->execute();

?>
