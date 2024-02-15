<?php
$ReservationF=$_POST;

$mysqli=new mysqli("localhost","root","Password","SANDRA");
$stmt=$mysqli->prepare("INSERT INTO Reservation(username,Start_Time,End_Time,Date,Type) VALUES (?,?,?,?,?)");
$slot=explode("to",$ReservationF['slot']);
$Start_Time=$slot[0];
$End_Time=$slot[1];
$stmt->bind_param('sssss',$ReservationF['username'],$Start_Time,$End_Time,$ReservationF['date'],$ReservationF['type']);
$stmt->execute();

?>
