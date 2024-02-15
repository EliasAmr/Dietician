<?php 

session_start();
$text=file_get_contents('php://input');
$_text=json_decode($text,true);
$column=$_text['query'];
$mysqli=new mysqli("localhost","root","Password","SANDRA");
$stmt=$mysqli->prepare("UPDATE users set $column=(?) where username=(?)");
$stmt->bind_param('ss',$_text['val'],$_SESSION['username']);

$stmt->execute();
?>
