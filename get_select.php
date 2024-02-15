<?php
session_start();
$mysqli=new mysqli("localhost","root","Password","SANDRA");
$username=$_SESSION['username'];
$sql = "SELECT * FROM users WHERE username = '$username'";
$result=mysqli_query($mysqli,$sql);
$result_array=mysqli_fetch_array($result,MYSQLI_ASSOC);
$result_json=json_encode($result_array);
echo ($result_json);

?>
