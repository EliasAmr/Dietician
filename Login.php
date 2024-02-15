<?php
session_start();
$mysqli=new mysqli("localhost","root","Sms_f4U.123","SANDRA");
$user_login=$_POST;
$username=$user_login['username'];
var_dump($username);
$sql = "SELECT * FROM users WHERE username = '$username'";
$result=mysqli_query($mysqli,$sql);
$user=mysqli_fetch_array($result,MYSQLI_ASSOC);
var_dump($user_login['password'],$user['password']);
if (PASSWORD_VERIFY($user_login['password'],$user['password'])){
$_SESSION=$user;
header('location: index.html');
}





?>