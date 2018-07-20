<?php
session_start();
require 'connect.inc.php';
$username = $password = $message = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$username = $_POST["username"];
	$password = md5($_POST["password"]);
	if(empty($username) || empty($password)) {
		$message = "*Enter username and password.";
	}
	else {
		$sql = "SELECT * FROM login_details WHERE Username LIKE :uname AND Password LIKE :pword";
		$q = $conn->prepare($sql);
		$q->execute(['uname' => $username, 'pword' => $password]);
		$data = $q->fetch();
		if (empty($data)) {
			$message = "*Username or password is incorrect.";
		}
		else {
			$_SESSION['id'] = $data['id'];
			$_SESSION['fname'] = $data['fname'];
			$_SESSION["lname"] = $data['lname'];
			$_SESSION['username'] = $username;
			$_SESSION['type'] = $data['Type'];
			header('Location:userhome.php');
			exit();
		}
	}
}

?>
<!DOCTYPE html>
<html>
<head>
	<title>Login</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<link rel="stylesheet" type="text/css" href="./css/style.css">
	<style type="text/css">
		html {
			background-image: url("back.jpg");
			background-size: cover;
			height: 100%;
			overflow: hidden;
		}
		@media (max-width: 700px) {
			#box {
				width: 40%;
				margin: 30% auto;
			}
		}
	</style>
</head>
<body>
<div id = "heading">Library Portal</div>
<div id = "box" style="color:white;">
	<h2>Login</h2>
	<br><div style="color:red;"><?php echo $message;?></div>
	<form action = "<?php echo htmlspecialchars($current_file);?>" method="POST">
		<label>Username</label><br>
		<input type="text" name="username"><br><br>
		<label>Password</label><br>
		<input type="password" name="password"><br><br>
		<input type="submit" value="Login" id = "submit" style="width: 50px;float:left;">
	</form>
	<a href="register.php" style="float:right;line-height: 200%;border-radius: 5px;width:60px;">Register</a>
</div>
</body>
</html>