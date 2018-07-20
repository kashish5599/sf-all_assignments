<?php
require 'connect.inc.php';
if(isset($_POST['table'])) {
	$table = $_POST['table'];
	$table2 = $_POST['table2'];
	$type = $_POST['typeau'];
	if ($table == 'books') {
		$data = "<h1>Available books</h1>";
		$data .=  "<table><tr><th>Name</th><th>Author</th><th>Publisher</th><th>Availability</th><th>Issue</th></tr>";
		$stmnt = $conn->query("SELECT * FROM books");
		while ($row = $stmnt->fetch(PDO::FETCH_ASSOC)) {
			$data .= "<tr><td>" . $row['Name'] . "</td><td>";
			$data .= $row['Author'] . "</td><td>";
			$data .= $row['Publisher'] . "</td><td>";
			$data .= $row['Availability'] . "</td><td>";
			if ($type == "User") {
				$data .= "<button id = 'issue" . $row['id'] . "' onClick = 'issueBook(" . $row['Availability'] . ", \"" . $table2 . "\", " . $row['id'] . ")'>Issue</button></td></tr>";
			}
			else {
				$data .= "<button id = 'delete" . $row['id'] . "' onClick = 'deleteBook(" . $row['Availability'] . ", " . $row['id'] . ")'>Delete</button></td></tr>";
			}
		}
		$data .= "</table>";
		echo $data;
	}
	else if ($table == "issuedTable") {
		$data = "<div class=\"modalContent\"><table><tr><th>Name</th><th>Author</th><th>Publisher</th><th>Status</th></tr>";
		$sql = "SELECT * FROM " . $table2;
		$stmnt = $conn->query($sql);
		while ($row = $stmnt->fetch(PDO::FETCH_ASSOC)) {
			$data .= "<tr><td>" . $row['Name'] . "</td><td>";
			$data .= $row['Author'] . "</td><td>";
			$data .= $row['Publisher'] . "</td><td>";
			$data .= "<button id = 'return" . $row['id'] . "' onClick = 'returnBook(\"" . $table2 . "\", " . $row['id'] . ")'>Return</button></td></tr>";
		}
		$data .= "</table>";
		$data .= "<button class = \"close\"onClick=\"$('#issuedTable').css('display', 'none')\">Close</button></div>";
		echo $data;
	}
}
?>