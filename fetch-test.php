<?php
session_start();

$json=json_encode($_SESSION);
print_r($json);

?>