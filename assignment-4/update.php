<?php
require 'connect.inc.php';
if (isset($_POST['action'])) {
	if($_POST['action'] == "issue") {
		$book_id = $_POST['book_id'];
		$table = $_POST['table'];
		$sql = "SELECT * FROM books WHERE id ='$book_id'";
		$q = $conn->prepare($sql);
		$q->execute();
		$data = $q->fetch(PDO::FETCH_ASSOC);
		$name = $data['Name'];
		$author = $data['Author'];
		$publisher = $data['Publisher'];
		$sql2 = "UPDATE books SET Availability = '0' WHERE id = '$book_id'";
		$conn->exec($sql2);
		$sql3 = "INSERT INTO " . $table . " (Name, Author, Publisher, originalId) VALUES ('$name', '$author', '$publisher', '$book_id')";
		$conn->exec($sql3);
	}
	else if ($_POST['action'] == "return") {
		$book_id = $_POST['book_id'];
		$table = $_POST['table'];
		$sql = "SELECT originalId FROM " . $table . " WHERE id ='$book_id'";
		$q = $conn->prepare($sql);
		$q->execute();
		$data = $q->fetch(PDO::FETCH_ASSOC);
		$id = $data['originalId'];
		$sql1 = "DELETE FROM " . $table . " WHERE id = '$book_id'";
		$conn->exec($sql1);
		$sql2 = "UPDATE books SET Availability = '1' WHERE id = '$id'";
		$conn->exec($sql2);
	}
	else if ($_POST['action'] == "remove") {
		$book_id = $_POST['book_id'];
		$sql = "DELETE FROM books WHERE id = '$book_id'";
		$conn->exec($sql);
		echo "a";
	}
	else if ($_POST['action'] == "add") {
		$name = $_POST['name'];
		$author = $_POST['author'];
		$publisher = $_POST['publisher'];
		$sql = "INSERT INTO books (Name, Author, Publisher, Availability) VALUES ('$name', '$author', '$publisher', '1')";
		$conn->exec($sql);
	}
}
?>