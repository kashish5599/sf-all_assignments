function showIssuedBooks(table) {
	$('#issuedTable').css('display', 'block');
	$.ajax({
		url: 'show.php',
		type: 'POST',
		cache: false,
		data: {'table': 'issuedTable', 'table2': table, 'typeau': 'User'},
		success: function(response) {
			$('#issuedTable').html(response);
		}
	});
}

function show(table, typeau) {
	$.ajax({
		url: 'show.php',
		type: 'POST',
		cache: false,
		data: {'table': 'books', 'table2': table, 'typeau': typeau},
		success: function(response) {
			$('#table').html(response);
		}
	});
}

function issueBook(n, table, id) {
	if (n == 0) {
		alert("Book is not available.");
	}
	else{
		$.ajax({
			url: 'update.php',
			type: 'POST',
			cache: false,
			data: {'action': 'issue', 'book_id': id, 'table': table},
			success: function() {
				alert("Book issued successfully");
				show(table, 'User');
			}
		});
	}
}

function returnBook(table, id) {
	$.ajax ({
		url: 'update.php',
		type: 'POST',
		cache: false,
		data: {'action': 'return', 'book_id': id, 'table': table},
		success: function() {
			alert("Book returned successfully");
			show(table, 'User');
			showIssuedBooks(table);
		}
	});
}

function deleteBook(n, id) {
	if (n == 0) {
		alert("Book cannot be removed");
	}
	else {
		$.ajax({
			url: 'update.php',
			type: 'POST',
			cache: false,
			data: {'action': 'remove', 'book_id': id},
			success: function(a) {
				show("", 'Admin');
				alert("Book removed successfully");
			}
		});
	}
}

function addBook(mode, name, author, publisher) {
	if (mode == 0) {
		$("#Add").css("display", "block");
	}
	else {
		$.ajax({
			url: 'update.php',
			type: 'POST',
			cache: false,
			data: {'action': 'add', 'name': name, 'author': author, 'publisher': publisher},
			success: function(){
				alert("Book added successfully");
				show("", 'Admin');
			}
		});
	}
}
$(document).ready(function(){
	$('#submit').click(function () {
		var name = $('#name').val();
		var author = $('#author').val();
		var publisher = $('#publisher').val();
		if (name == '' || author == '' || publisher == ''){
			alert("Enter all details to add a book");
		}
		else {
			$('#name').val("");
			$('#author').val("");
			$('#publisher').val("");
			addBook(1, name, author, publisher);
		}
	});
});

window.onclick = function(event) {
	if (event.target == document.getElementById('issuedTable') || event.target == document.getElementById('Add')) {
		$('#issuedTable').css('display', 'none');
		$('#Add').css('display', 'none');
	}
}