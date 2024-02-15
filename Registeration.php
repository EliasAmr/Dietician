<?php


$User=$_POST;
var_dump($User);
$mysqli=new mysqli("localhost","root","Password","SANDRA");
$password=password_hash($User['password'],PASSWORD_DEFAULT);
$stmt=$mysqli->prepare("INSERT INTO users(First_Name,Family_Name,username,password,email) VALUES (?,?,?,?,?)");
$stmt->bind_param('sssss',$User['First_Name'],$User['Family_Name'],$User['UserName'],$password,$User['email']);

$stmt->execute();





?>
