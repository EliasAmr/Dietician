<?php

$tmp_name=$_FILES["inpFile"]["tmp_name"];
$name=$_FILES["inpFile"]["name"];
var_dump($tmp_name);
move_uploaded_file($tmp_name,'uploads/'.$name);
?>

