<?php

$mysqli=new mysqli("localhost","root","Sms_f4U.123","SANDRA");
$sql="SELECT * FROM Reservation";
$result=mysqli_query($mysqli,$sql);
$result_array=mysqli_fetch_all($result,MYSQLI_ASSOC);
$reservation=array();

foreach ($result_array as $key => $value) {
    $Extended_Props=array("type"=>$value['Type']);
    $reservation_add=array("title"=>$value['username'],"start"=>$value['Date']."T".$value['Start_Time'],"end"=>$value['Date']."T".$value['End_Time'],"extendedProps"=>$Extended_Props);
    array_push($reservation,$reservation_add);
  
    
    
}

$reservation_json=json_encode($reservation);
echo $reservation_json;

?>