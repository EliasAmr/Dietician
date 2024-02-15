<?php

$mysqli=new mysqli("localhost","root","Password","SANDRA");
$sql="SELECT a.Start_Time,a.End_Time from Time_Slots a LEFT JOIN Reservation b on a.Start_Time=b.Start_Time and a.Start_Time < b.End_Time and a.End_Time > b.Start_Time where b.Start_Time is null ORDER BY `a`.`Start_Time` ASC ";
$result=mysqli_query($mysqli,$sql);
$result_array=mysqli_fetch_all($result,MYSQLI_ASSOC);

$results_json=json_encode($result_array);

header('Content-Type: application/json');

echo $results_json;


?>
