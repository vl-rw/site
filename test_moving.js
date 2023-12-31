player_stroke="sprites/ghost.gif";

function key_z() {
	message('z');
	if (link_z) window.open(link_z);
};

function key_x() {
	message('x');
	if (link_x) window.open(link_x);
};
 
function key_c() {
	message('c');
	if (link_c) window.open(link_c);
};

function key_v() {
	message('v');
	if (link_v) window.open(link_v);
};


const player_stroke_norm = player_stroke;

const player_stroke_left = player_stroke + '" class="toLeft pl';

function go_l() {

	// get where contaning element is placed
	
	current_x = parseInt(document.getElementById("chosen").parentElement.id.split("_")[0]);
	
	current_y = parseInt(document.getElementById("chosen").parentElement.id.split("_")[1]);
	
	if (document.getElementById(`${current_x-1}_${current_y}_block`)) {
 	
	current_x--;
	document.getElementById("chosen").style.marginLeft="-20px";
	
	player_stroke = player_stroke_left;
		
	setTimeout( () => {
	
		document.getElementById("chosen").style.transitionDuration = "0s";
		document.getElementById("chosen").style.marginLeft="0px";
		document.getElementById(`${current_x+1}_${current_y}_block`).innerHTML="";
		document.getElementById(`${current_x}_${current_y}_block`).innerHTML='<div id="chosen"><img src="'  + player_stroke + '" ></div>'   ;
		document.getElementById("chosen").style.transitionDuration = time + "s";
		door(`${current_x}_${current_y}_block`);
	
	}, time * 1000);

	};
};


function go_r() {

	// get where contaning element is placed
	
	current_x = parseInt(document.getElementById("chosen").parentElement.id.split("_")[0]);
	
	current_y = parseInt(document.getElementById("chosen").parentElement.id.split("_")[1]);
	
	if (document.getElementById(`${current_x+1}_${current_y}_block`)) {
 	
	current_x++;
	document.getElementById("chosen").style.marginLeft="20px";
	
    player_stroke = player_stroke_norm;
		
	setTimeout( () => {
	
		document.getElementById("chosen").style.transitionDuration = "0s";
		document.getElementById("chosen").style.marginLeft="0px";
		document.getElementById(`${current_x-1}_${current_y}_block`).innerHTML="";
		document.getElementById(`${current_x}_${current_y}_block`).innerHTML='<div id="chosen"><img src="'   +   player_stroke  + '" class="pl" ></div>'   ;
		document.getElementById("chosen").style.transitionDuration = time + "s";
		door(`${current_x}_${current_y}_block`);
		
	
	}, time * 1000);

	};
};

function go_u() {

	// get where contaning element is placed
	
	current_x = parseInt(document.getElementById("chosen").parentElement.id.split("_")[0]);
	
	current_y = parseInt(document.getElementById("chosen").parentElement.id.split("_")[1]);
	
	if (document.getElementById(`${current_x}_${current_y-1}_block`)) {
 	
	current_y--;
	document.getElementById("chosen").style.marginTop="-20px";
		
	setTimeout( () => {

		document.getElementById("chosen").style.transitionDuration = "0s";
		document.getElementById("chosen").style.marginLeft="0px";
		document.getElementById(`${current_x}_${current_y+1}_block`).innerHTML="";
		document.getElementById(`${current_x}_${current_y}_block`).innerHTML='<div id="chosen"><img src="'   +   player_stroke  + '" class="pl" ></div>'   ;
		document.getElementById("chosen").style.transitionDuration = time + "s";
		door(`${current_x}_${current_y}_block`);
	
	}, time * 1000);

	};
};

function go_d() {

	// get where contaning element is placed
	
	current_x = parseInt(document.getElementById("chosen").parentElement.id.split("_")[0]);
	
	current_y = parseInt(document.getElementById("chosen").parentElement.id.split("_")[1]);
	
	if (document.getElementById(`${current_x}_${current_y+1}_block`)) {
 	
	current_y++;
	document.getElementById("chosen").style.marginTop="20px";
		
	setTimeout( () => {
	
		document.getElementById("chosen").style.transitionDuration = "0s";
		document.getElementById("chosen").style.marginLeft="0px";
		document.getElementById(`${current_x}_${current_y-1}_block`).innerHTML="";
		document.getElementById(`${current_x}_${current_y}_block`).innerHTML='<div id="chosen"><img src="'   +   player_stroke  + '" class="pl" ></div>'   ;
		document.getElementById("chosen").style.transitionDuration = time + "s";
		door(`${current_x}_${current_y}_block`);
	
	}, time * 1000);

	};
};

