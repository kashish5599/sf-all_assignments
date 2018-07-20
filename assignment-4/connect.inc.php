<?php
$current_file = $_SERVER['SCRIPT_NAME'];
$servername = "localhost";
$Username = "root";
$Password = "";

try {
    $conn = new PDO("mysql:host=$servername;dbname=data", $Username, $Password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
catch(PDOException $e)
    {
    die("Connection failed!!!");
    }
?>