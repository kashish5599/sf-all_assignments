<?php
session_start();
require 'connect.inc.php';
if (isset($_SESSION['username'])) {
	$id = $_SESSION['id'];
	$fname = $_SESSION['fname'];
	$lname = $_SESSION['lname'];
	$username = $_SESSION['username'];
	$type = $_SESSION['type'];
	$table = "ISSUE" . $id;
	$message = "";
}
else {
	die("Please Login");
}
if (isset($_GET['end'])) {
	session_destroy();
	header('Location:login.php');
	exit();
}
?>

<!DOCTYPE html>
<html>
<head>
	<title>Home</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<script type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="code.js"></script>
	<link rel="stylesheet" type="text/css" href="./css/style.css">
	<style type="text/css">
		body {
			background-image: url("back.jpg");
			background-repeat: no-repeat;
			background-size: cover;
		}
		@media (max-width: 700px) {
			#bar {
				width: 80%;
			}
			#greeting {
				font-size:14px;
				width: 50%;
			}
			@keyframes textEffect {
				from { width: 0%}
				to {width: 50%}
			}
		}
	</style>
</head>
<body>
<div id = "heading">Library Portal</div>
<div id = "bar">
<?php 
if ($type == "User") {
	echo "<button id = \"mybooks\" onClick=\"showIssuedBooks('" . $table . "')\" style=\"width:80px;float:left;\">My books</button>";
}
else {
	echo "<button id = \"mybooks\" onClick=\"addBook(0, '' , '' , '')\" style=\"width:80px;float:left;\">Add book</button>";
}
?>
<div id = "greeting"><?php echo "Welcome " . $fname . " " . $lname ?></div>
<a href = "userhome.php?end=true" style="float:right;width:80px;line-height: 200%;">Log Out</a>
</div>
<?php echo "<script>show('" . $table . "', '". $type . "')</script>"; ?>
<div id ="table"></div>
<div id="issuedTable"></div>
<div id = "Add">
	<div class = "modalContent" style="width:30%;margin: 10% auto;">
		<label for="name">Name</label><br><input type="text" name="name" id='name'><br><br>
		<label>Author</label><br><input type="text" name="author" id="author"><br><br>
		<label>Publisher</label><br><input type="text" name="publisher" id='publisher'><br><br>
		<input type="submit" value="Add" name="add" id='submit' style="width:40px;float: left:">
		<button onClick = "$('#Add').css('display','none')" style="float: right;">Cancel</button>
	</div>
</div>
</body>
</html>