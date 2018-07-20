//Code for making the game layout
var i1, i2, i3, i4;
var txt1, txt2, txt3, txt4;
txt1 = txt2 = txt3 = txt4 ="";
//alert("Type in the second box to fix the value of dice");
for (i1=i2=i3=i4=0; i1 < 8; i1++, i2++, i3++, i4++) {
	if (i1 == 0) txt1 += '<div id="startA" style="background-color: red;"></div>';
	else txt1 += '<div></div>';
	if (i2 == 5) txt2 += '<div id="endB" style="background-color: blue;"></div>';
	else if (i2 < 6) txt2 += '<div></div>';
	if (i3 == 7) txt3 += '<div id="startB" style="background-color: purple;"></div>';
	else txt3 += '<div></div>';
	if (i4 == 0) txt4 += '<div id="endA" style="background-color: orange;"></div>';
	else if (i4 < 6) txt4 += '<div></div>';
	}
document.getElementById('row1').innerHTML = txt1;
document.getElementById('col1').innerHTML = txt2;
document.getElementById('row2').innerHTML = txt3;
document.getElementById('col2').innerHTML = txt4;

//Main code for the game
var step = 4.7, finishA = 0, finishB = 0, lastroll = "d1";

function anim (startL, startT, endL, endT, id) {
	var stepH, stepV;
	var elem = document.getElementById(id);
	if (endL > startL) stepH = step;
	else if (endL == startL) stepH = 0;
	else stepH = -4.7;
	if (endT > startT) stepV = step;
	else if (endT == startT) stepV = 0;
	else stepV = -4.7;
	if (startT == 4 || startT == 36.9) var intervalH = setInterval(frameH, 500);
	else var intervalV = setInterval(frameV, 500);
	function frameH () {
		if (startL == endL) {
			clearInterval(intervalH);
			if (startT != endT) var intervalV = setInterval(frameV, 500);
		}
		else {
			startL += stepH;
			startL = (Math.round(startL*10))/10;
			id.style.left = startL + "vw";
		}
	}
	function frameV () {
		if (startT == endT) {
			clearInterval(intervalV);
			if (startL != endL) var intervalH = setInterval(frameH, 500);
		}
		else {
			startT += stepV;
			startT = (Math.round(startT*10))/10;
			id.style.top = startT + "vw";
		}
	}
}

function token(left, top) {
	this.left = left;
	this.top = top;
}

var A1 = new token (13.3, -0.7);
var A2 = new token (13.3, -0.7);
var B1 = new token (55.6, 41.6);
var B2 = new token (55.6, 41.6);
var endA = new token (18, 8.7);
var endB = new token (50.9, 32.2);
var startA = new token (18, 4);
var startB = new token (50.9, 36.9); 
var pavA = new token (13.3, -0.7);
var pavB = new token (55.6, 41.6);

function dice (val) {
	switch (val) {
		case 1: document.getElementById("d1").style.display = "block"; lastroll = "d1"; break;
		case 2: document.getElementById("d2").style.display = "block"; lastroll = "d2"; break;
		case 3: document.getElementById("d3").style.display = "block"; lastroll = "d3"; break;
		case 4: document.getElementById("d4").style.display = "block"; lastroll = "d4"; break;
		case 5: document.getElementById("d5").style.display = "block"; lastroll = "d5"; break;
		case 6: document.getElementById("d6").style.display = "block"; lastroll = "d6"; break;
	}
}

function change (turn) {
	if (turn == "A") {
		document.getElementById("turn").innerHTML = "B";
	}
	else {
		document.getElementById("turn").innerHTML = "A";
	}
	document.getElementById("Roll").style.pointerEvents = "auto";
}

function cut (ID1) {
	switch (ID1) {
		case "B1":
		case "B2": if(JSON.stringify(B1) == JSON.stringify(B2)) {
				   	document.getElementById("tokens_b").innerHTML = "2";
				   	document.getElementById("B1").style.left = "55.6vw";
				   	document.getElementById("B1").style.top = "41.6vw";
				   	document.getElementById("B2").style.left = "55.6vw";
				   	document.getElementById("B2").style.top = "41.6vw";
				   	document.getElementById("B1").style.display = "none";
				   	document.getElementById("B2").style.display = "none";
				   	document.getElementById("B1").innerHTML = "<br>1B";
				   	B1.left = B2.left = 55.6; B1.top = B2.top = 41.6;
				   }
				   else {
				   	if (document.getElementById("tokens_b").innerHTML == "1") {
				   		document.getElementById("tokens_b").innerHTML = "2"; 
				   	}
				   	else {
				   		document.getElementById("tokens_b").innerHTML = "1";
				   	}
				   	document.getElementById(ID1).style.left = "55.6vw";
				   	document.getElementById(ID1).style.top = "41.6vw";
				   	document.getElementById(ID1).style.display = "none";
				   	if (ID1 == "B1") {B1.left = 55.6; B1.top = 41.6;}
				   	else {B2.left = 55.6; B2.top = 41.6; document.getElementById("B2").innerHTML = "<br>2B";}
				   }
				   break;
		case "A1":
		case "A2": if (JSON.stringify(A1) == JSON.stringify(A2)) {
				   	document.getElementById("tokens_a").innerHTML = "2";
				   	document.getElementById("A1").style.left = "13.3vw";
				   	document.getElementById("A1").style.top = "-0.7vw";
				   	document.getElementById("A2").style.left = "13.3vw";
				   	document.getElementById("A2").style.top = "-0.7vw";
				   	document.getElementById("A1").style.display = "none";
				   	document.getElementById("A2").style.display = "none";
				   	document.getElementById("A1").innerHTML = "<br>1A";
				    A1.left = A2.left = 13.3; A1.top = A2.top = -0.7;
				   }
				   else {
				   	if (document.getElementById("tokens_a").innerHTML == "1") {
				   		document.getElementById("tokens_a").innerHTML = "2";
				   	}
				   	else {
				   		document.getElementById("tokens_a").innerHTML = "1";
				   	}
				   	document.getElementById(ID1).style.left = "13.3vw";
				   	document.getElementById(ID1).style.top = "-0.7vw";
				   	document.getElementById(ID1).style.display = "none";
				   	if (ID1 == "A1") {A1.left = 13.3; A1.top = -0.7;}
				   	else {A2.left = 13.3; A2.top = -0.7; document.getElementById("A2").innerHTML = "<br>2A";}
				   }
				   break;
	}
}

function unlock (turn, tkn) {
	if (tkn == 2) {
		switch (turn) {
			case "A": document.getElementById("A1").style.left = "18vw";
					  document.getElementById("A1").style.top = "4vw";
					  A1.left = 18; A1.top = 4;
					  document.getElementById("A1").style.display = "inline";
					  document.getElementById("Roll").style.pointerEvents = "auto";
					  document.getElementById("tokens_a").innerHTML = '1';
					  if (JSON.stringify(A1) == JSON.stringify(B1)) cut("B1");
					  else if(JSON.stringify(A1) == JSON.stringify(B2)) cut("B2");
					  break;
			case "B": document.getElementById("B1").style.left = "50.9vw";
					  document.getElementById("B1").style.top = "36.9vw";
					  B1.left = 50.9; B1.top = 36.9;
					  document.getElementById("B1").style.display = "inline";
					  document.getElementById("Roll").style.pointerEvents = "auto";
					  document.getElementById("tokens_b").innerHTML = '1';
					  if (JSON.stringify(A1) == JSON.stringify(B1)) cut("A1");
					  else if(JSON.stringify(A2) == JSON.stringify(B1)) cut('A2');
					  break;
		}
	}
	else {
		switch (turn) {
			case "A": document.getElementById("tokens_a").innerHTML = '0';
					  document.getElementById("A2").style.left = "18vw";
					  document.getElementById("A2").style.top = "4vw";
					  A2.left = 18; A2.top = 4;
					  document.getElementById("A2").style.display = "inline";
					  document.getElementById("Roll").style.pointerEvents = "auto";
					  document.getElementById("player1").style.cursor = "default";
					  document.getElementById("A1").style.cursor = "default";
					  document.getElementById("A2").style.cursor = "default";
					  document.getElementById("player1").style.pointerEvents = "none";
					  document.getElementById("A1").style.pointerEvents = "none";
					  document.getElementById("A2").style.pointerEvents = "none";
					  if (A1.left == 18 && A1.top == 4) {
					  	document.getElementById("A1").innerHTML = "<br>2A";
					  }
					  else if (B1.left == 18 && B1.top == 4) {
					  	document.getElementById("A2").innerHTML = "<br>1A";
					  	cut("B1");
					  }
					  else if (B2.left == 18 && B2.top == 4) {
					  	document.getElementById("A2").innerHTML = "<br>1A";
					  	cut("B2");
					  }
					  else {
					  	document.getElementById("A2").innerHTML = "<br>1A";
					  }
					  break;
			case "B" : document.getElementById("tokens_b").innerHTML = '0';
					   document.getElementById("B2").style.left = "50.9vw";
					   document.getElementById("B2").style.top = "36.9vw";
					   B2.left = 50.9; B2.top = 36.9;
					   document.getElementById("B2").style.display = "inline";
					   document.getElementById("Roll").style.pointerEvents = "auto";
					   document.getElementById("player2").style.cursor = "default";
					   document.getElementById("B1").style.cursor = "default";
					   document.getElementById("B2").style.cursor = "default";
					   document.getElementById("player2").style.pointerEvents = "none";
					   document.getElementById("B1").style.pointerEvents = "none";
					   document.getElementById("B2").style.pointerEvents = "none";
					   if (B1.left == 50.9 && B1.top == 36.9) {
					  	document.getElementById("B1").innerHTML = "<br>2B";
					   }
					   else if (A1.left == 50.9 && A1.top == 36.9) {
					  	document.getElementById("B2").innerHTML = "<br>1B";
					  	cut("A1");
					   }
					   else if (A2.left == 50.9 && A2.top == 36.9) {
					  	document.getElementById("B2").innerHTML = "<br>1B";
					  	cut("A2");
					   }
					   else {
					  	document.getElementById("B2").innerHTML = "<br>1B";
					   }
					   break;
		}
	}
}

function move (val, id) {
	var turn, id2, tkn = {}, endH, endV, val2, plyr, finish;
	if (id == "A1" || id == "A2") {
		turn = "A";
		id2 = (id == "A1") ? "A2":"A1";
		plyr = "player1";
		finish = finishA;
	}
	else {
		turn = "B";
		id2 = (id == "B1") ? "B2":"B1";
		plyr = "player2";
		finish = finishB;
	}
	switch (id) {
		case "A1": tkn.left = A1.left; tkn.top = A1.top; break;
		case "A2": tkn.left = A2.left; tkn.top = A2.top; break;
		case "B1": tkn.left = B1.left; tkn.top = B1.top; break;
		case "B2": tkn.left = B2.left; tkn.top = B2.top; break;
	}
	if (tkn.top == 4) {
		endH = 50.9; endV = 36.9; val2 = Math.round((endH-tkn.left)/step);
		if (val <= val2) {tkn.left += Math.round(val*step*10)/10; tkn.left = Math.round(tkn.left*10)/10;}
		else {
			tkn.left = endH;
			tkn.top += Math.round((val-val2)*step*10)/10;
			tkn.top = Math.round(tkn.top*10)/10;
		}
	}
	else if (tkn.top == 36.9) {
		endH = 18; endV = 4; val2 = Math.round((tkn.left-endH)/step);
		if (val <= val2) {tkn.left -= Math.round(val*step*10)/10; tkn.left = Math.round(tkn.left*10)/10;}
		else {
			tkn.left = endH;
			tkn.top -= Math.round((val-val2)*step*10)/10;
			tkn.top = Math.round(tkn.top*10)/10;
		}
	}
	else if (tkn.left == 18) {
		endH = 50.9; endV = 4; val2 = Math.round((tkn.top-endV)/step);
		if (val <= val2) {tkn.top -= Math.round(val*step*10)/10; tkn.top = Math.round(tkn.top*10)/10;}
		else {
			tkn.top = endV;
			tkn.left += Math.round((val-val2)*step*10)/10;
			tkn.left = Math.round(tkn.left*10)/10;
		}
	}
	else if (tkn.left == 50.9) {
		endH = 18; endV = 36.9; val2 = Math.round((endV-tkn.top)/step);
		if (val <= val2) {tkn.top += Math.round(val*step*10)/10; tkn.top = Math.round(tkn.top*10)/10;}
		else {
			tkn.top = endV;
			tkn.left -= Math.round((val-val2)*step*10)/10;
			tkn.left = Math.round(tkn.left*10)/10;
	 	}
	}
	switch (id) {
		case "A1": if ((((Number(tkn.top) - Number(A1.top)) < 0) && ((Number(tkn.left) - Number(A1.left)) > 0)) || (JSON.stringify(tkn) == JSON.stringify(startA))) {
					document.getElementById("tip1").style.display = "inline";
				   }
				   else if (JSON.stringify(tkn) == JSON.stringify(endA)) {
				   	anim(A1.left, A1.top, tkn.left, tkn.top, document.getElementById(id));
				   	A1.top = 0; A1.left = 0;
				   	document.getElementById("A1").style.display = "none";
				   	finishA += 1; finish += 1;
				   	if (JSON.stringify(endA) == JSON.stringify(B1)) cut('B1');
				   	else if (JSON.stringify(endA) == JSON.stringify(B2)) cut('B2');
				   	if (finish == 2) {
				   		document.getElementById("tip2").style.display = "inline";
				   	}
				   }
				   else {
				   	   anim(A1.left, A1.top, tkn.left, tkn.top, document.getElementById(id));
					   A1.left = tkn.left; A1.top = tkn.top;
					   if (JSON.stringify(A1) == JSON.stringify(B1)) cut ('B1');
					   else if (JSON.stringify(A1) == JSON.stringify(B2)) cut ('B2');
					   else if (JSON.stringify(A1) == JSON.stringify(A2)) {
					   	document.getElementById("A1").innerHTML = "<br>2A";
						document.getElementById("A2").innerHTML = "<br>2A";
						}
					}
				   break;
		case "A2": if ((((Number(tkn.top) - Number(A2.top)) < 0) && ((Number(tkn.left) - Number(A2.left)) > 0)) || (JSON.stringify(tkn) == JSON.stringify(startA))) {
					document.getElementById("tip1").style.display = "inline";
				   }
				   else if (JSON.stringify(tkn) == JSON.stringify(endA)) {
				   	anim(A2.left, A2.top, tkn.left, tkn.top, document.getElementById(id));
				   	A2.top = A1.top; A2.left = A1.left; A1.top = 0; A1.left = 0;
				   	document.getElementById("A1").style.display = "none";
				   	document.getElementById("A2").style.left = A2.left + "vw";
				   	document.getElementById("A2").style.top = A2.top + "vw";
				   	finishA += 1; finish += 1;
				   	if (JSON.stringify(endA) == JSON.stringify(B1)) cut('B1');
				   	else if (JSON.stringify(endA) == JSON.stringify(B2)) cut('B2');
				   	if (finishA == 2) {
				   		document.getElementById("A2").style.display = "none";
				   		document.getElementById("tip2").style.display = "inline";
				   	}
				   }
				   else {
					   anim(A2.left, A2.top, tkn.left, tkn.top, document.getElementById(id));
					   A2.left = tkn.left; A2.top = tkn.top;
					   if (JSON.stringify(A2) == JSON.stringify(B1)) cut ('B1');
					   else if (JSON.stringify(A2) == JSON.stringify(B2)) cut ('B2');
					   else if (JSON.stringify(A1) == JSON.stringify(A2)) {
					   	document.getElementById("A1").innerHTML = "<br>2A";
						document.getElementById("A2").innerHTML = "<br>2A";
					   }
					}
				   break;
		case "B1": if ((((Number(tkn.top) - Number(B1.top)) > 0) && ((Number(tkn.left) - Number(B1.left)) < 0)) || (JSON.stringify(tkn) == JSON.stringify(startB))) {
					document.getElementById("tip1").style.display = "inline";
				   }
				   else if (JSON.stringify(tkn) == JSON.stringify(endB)) {
				   	anim(B1.left, B1.top, tkn.left, tkn.top, document.getElementById(id));
				   	B1.top = 0; B1.left = 0;
				   	document.getElementById("B1").style.display = "none";
				   	finishB += 1; finish += 1;
				   	if (JSON.stringify(endB) == JSON.stringify(A1)) cut('A1');
				   	else if (JSON.stringify(endB) == JSON.stringify(A2)) cut('A2');
				   	if (finishB == 2) {
				   		document.getElementById("tip2").style.display = "inline";
				   		document.getElementById("winner").innerHTML = "B";
				   	}
				   }
				   else {
					   anim(B1.left, B1.top, tkn.left, tkn.top, document.getElementById(id));
					   B1.left = tkn.left; B1.top = tkn.top;
					   if (JSON.stringify(A1) == JSON.stringify(B1)) cut ('A1');
					   if (JSON.stringify(A2) == JSON.stringify(B1)) cut ('A2');
					   else if (JSON.stringify(B2) == JSON.stringify(B1)){
					   	document.getElementById("B1").innerHTML = "<br>2B";
						document.getElementById("B2").innerHTML = "<br>2B";
					   }
					}
				   break;
		case "B2": if ((((Number(tkn.top) - Number(B2.top)) > 0) && ((Number(tkn.left) - Number(B2.left)) < 0)) || (JSON.stringify(tkn) == JSON.stringify(startB))) {
					document.getElementById("tip1").style.display = "inline";
				   }
				   else if (JSON.stringify(tkn) == JSON.stringify(endB)) {
				   	anim(B2.left, B2.top, tkn.left, tkn.top, document.getElementById(id));
				   	B2.top = B1.top; B2.left = B1.left; B1.top = 0; B1.left = 0;
				   	document.getElementById("B1").style.display = "none";
				   	document.getElementById("B2").style.left = B2.left + "vw";
				   	document.getElementById("B2").style.top = B2.top + "vw";
				   	finishB += 1; finish += 1;
				   	if (JSON.stringify(endB) == JSON.stringify(A1)) cut('A1');
				   	else if (JSON.stringify(endB) == JSON.stringify(A2)) cut('A2');
				   	if (finishB == 2) {
				   		document.getElementById("B2").style.display = "none";
				   		document.getElementById("tip2").style.display = "inline";
				   		document.getElementById("winner").innerHTML = "B";
				   	}
				   }
				   else {
					   anim(B2.left, B2.top, tkn.left, tkn.top, document.getElementById(id));
					   B2.left = tkn.left; B2.top = tkn.top;
					   document.getElementById(id).style.left = B2.left + "vw";
					   document.getElementById(id).style.top = B2.top + "vw";
					   if (JSON.stringify(A1) == JSON.stringify(B2)) cut ('A1');
					   else if (JSON.stringify(A2) == JSON.stringify(B2)) cut ('A2');
					   else if (JSON.stringify(B2) == JSON.stringify(B1)) {
					   	document.getElementById("B1").innerHTML = "<br>2B";
						document.getElementById("B2").innerHTML = "<br>2B";
					   }
					}
				   break;
	}
	document.getElementById(id).style.pointerEvents = "none";
	document.getElementById(id2).style.pointerEvents = "none";
	document.getElementById(plyr).style.pointerEvents = "none";
	document.getElementById(plyr).style.cursor = "default";
	document.getElementById(id).style.cursor = "default";
	document.getElementById(id2).style.cursor = "default";
	if (finish != 2) {
		document.getElementById("Roll").style.pointerEvents = "auto";
		if (val != 6) change(turn);
	}
}

function Rolled() {
	var tkn, id1, id2, plyr, entered_val, finish;
	var turn = document.getElementById("turn").innerHTML;
	var val = Math.floor(Math.random()*6) + 1;
	entered_val = document.getElementById('entr_val').value;
	if (turn == "A") {
		tkn = document.getElementById("tokens_a").innerHTML;
		plyr = "player1";
		id1 = "A1";
		id2 = "A2";
		finish = finishA;
	}
	else {
		tkn = document.getElementById("tokens_b").innerHTML;
		plyr = "player2";
		id1 = "B1";
		id2 = "B2";
		finish = finishB;
	}
	if (entered_val != "" && (entered_val > 0 && entered_val <= 6)) {
		val = Number(entered_val);
	}
	document.getElementById(lastroll).style.display = "none";
	dice(val);
	document.getElementById("Roll").style.pointerEvents = "none";
	document.getElementById('entr_val').value = "";
	document.getElementById("tip1").style.display = "none";
	if (tkn == '2') {
		if (val != 6) change(turn);
		else unlock (turn, tkn);
	}
	else if (tkn == '1') {
		if (val == 6 && finish == 0) {
			document.getElementById(plyr).style.pointerEvents = "auto";
			document.getElementById(plyr).style.cursor = "pointer";
			if ((id1 == "A1" && JSON.stringify(A1) != JSON.stringify(pavA)) || (id1 == "B1" && JSON.stringify(B1) != JSON.stringify(pavB))) {
				document.getElementById(id1).style.pointerEvents = "auto";
				document.getElementById(id1).style.cursor = "pointer";
				document.getElementById(plyr).onclick = function() {unlock (turn, tkn);};
				document.getElementById(id1).onclick = function() {move (val, id1);};
			}
			else {
				document.getElementById(id2).style.pointerEvents = "auto";
				document.getElementById(id2).style.cursor = "pointer";
				document.getElementById(plyr).onclick = function() {unlock (turn, tkn);};
				document.getElementById(id2).onclick = function() {move (val, id2);};
			}
		}
		else if (val == 6 && finish == 1) {
			unlock(turn, tkn);
		}
		else if (finish == 0) {
			if ((id1 == "A1" && JSON.stringify(A1) != JSON.stringify(pavA)) || (id1 == "B1" && JSON.stringify(B1) != JSON.stringify(pavB))) move(val, id1);
			else move(val, id2);
		}
		else if  (finish == 1) {
			change (turn);
		}
	}
	else {
		if (id1 == "A1" && (JSON.stringify(A2) == JSON.stringify(A1))) {
			document.getElementById(id1).innerHTML = "<br>1" + turn;
			document.getElementById(id2).innerHTML = "<br>1" + turn;
			move (val, id1);
		}
		else if (id1 == "B1" && (JSON.stringify(B2) == JSON.stringify(B1))) {
			document.getElementById(id1).innerHTML = "<br>1" + turn;
			document.getElementById(id2).innerHTML = "<br>1" + turn;
			move (val, id1);
		}
		else if (finish == 0) {
			document.getElementById(id1).style.pointerEvents = "auto";
			document.getElementById(id2).style.pointerEvents = "auto";
			document.getElementById(id1).style.cursor = "pointer";
			document.getElementById(id2).style.cursor = "pointer";
			document.getElementById(id1).onclick = function() {move (val, id1);};
			document.getElementById(id2).onclick = function() {move (val, id2);};
		}
		else if (finish == 1) {
			move (val, id2);
		}
	}
}