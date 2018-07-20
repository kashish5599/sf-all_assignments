<?php require 'connect.inc.php'; ?>

<!DOCTYPE html>
<html>
<head>
	<title>Register</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<link rel="stylesheet" type="text/css" href="./css/style.css">
	<style type="text/css">
		html {
			background-image: url("back.jpg");
			background-size: cover;
			height: 100%;
		}
		@media (max-width: 700px) {
			#box {
				width: 40%;
		}
	</style>
</head>
<body>
<?php
$fname = $lname = $username = $password = $type = "";
$message = "*All fields are compulsory.";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$fname = test($_POST["fname"]);
	$lname = test($_POST["lname"]);
	$email = $_POST["email"];
	$username = test($_POST["username"]);
	$password = md5($_POST["password"]);
	$date = $_POST["date"];
	$type = test($_POST["type"]);
	$check_user = $conn->prepare("SELECT Username FROM login_details WHERE Username LIKE ?");
	$check_user->execute([$username]);
	$check = $check_user->fetch();
	if (empty($fname) || empty($lname) || empty($email) || empty($username) || empty($password) || empty($date)) {
		$message = "Fill all fields to register.";
	}
	else if (!empty($check)) {
		$message = "This username is already registered.";
	}
	else if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
		$message = "Enter valid email  address.";
	}
	else {
		$sql = "INSERT INTO login_details (fname, lname, Username, Password, Email, Type, DOB)
				VALUES ('".$fname."', '".$lname."', '".$username."', '".$password."', '".$email."', '".$type."', '".$date."')";
		$conn->exec($sql);
		$id = $conn->lastInsertId();
		$table_sql = "CREATE TABLE ISSUE" . $id . " (id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, Name VARCHAR(200) NOT NULL, Author VARCHAR(200) NOT NULL, Publisher VARCHAR(200) NOT NULL, originalId INT(11) UNSIGNED)";
		$conn->exec($table_sql);
		$message = "Registered successfully.";
		$_POST['username'] = "";
	}
}

function test($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

?>
<div id = "heading">Library Portal</div>
<div id = "box" style="margin: 1% auto">
	<h2>Register</h2>
	<div style="color: red;"><?php echo $message;?></div>
	<form action = "<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="POST" style="color: white;">
		<label>First Name</label><br>
		<input type="text" name="fname"><br><br>
		<label>Last Name</label>
		<input type="text" name="lname"><br><br>
		<label>Email Id</label><br>
		<input type="text" name="email"><br><br>
		<label>Username</label><br>
		<input type="text" name="username"><br><br>
		<label>Password</label><br>
		<input type="password" name="password"><br><br>
		<label>Date of birth</label><br>
		<input type="date" name="date"><br><br>
		<label for="admin">Admin</label><input type="radio" name="type" value="Admin" id="admin" style="width: inherit;">
		<label for="user">User</label><input type="radio" name="type" value="User" checked="checked" id="user" style="width:inherit;"><br><br>
		<input type="submit" value="Register" name="register" id="submit" style="width: 60px;">
	</form>
	<a href="login.php" style="float: right;line-height: 200%;border-radius: 5px;width:50px;">Login</a>
</div>
</body>
</html>