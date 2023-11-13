
function key_z() {

message('z')
if (link_z) window.open(link_z);

};

function key_x() {

message('x')
if (link_x) window.open(link_x);

};
 
function key_c() {

message('c')
if (link_c) window.open(link_c);

};

function key_v() {

message('v')
if (link_v) window.open(link_v);

};



function go_l() {

	// get where contaning element is placed
	
	current_x = parseInt(document.getElementById("chosen").parentElement.id.split("_")[0]);
	
	current_y = parseInt(document.getElementById("chosen").parentElement.id.split("_")[1]);
	
	if (document.getElementById(`${current_x-1}_${current_y}_block`)) {
 	
	//message('yes');
	current_x--;
	//document.getElementById("chosen").style.transitionDuration = time + "s";
	document.getElementById("chosen").style.marginLeft="-20px";

	document.getElementById("chosen").classList.remove('toLeft');
	document.getElementById("chosen").classList.add('toLeft');
		
	setTimeout( () => {

		document.getElementById("chosen").classList.remove('toLeft');
	
		document.getElementById("chosen").style.transitionDuration = "0s";
		document.getElementById("chosen").style.marginLeft="0px";
		document.getElementById(`${current_x+1}_${current_y}_block`).innerHTML="";
		document.getElementById(`${current_x}_${current_y}_block`).innerHTML='<div id="chosen"><img src="'   +   player_stroke  + '" class="pl" ></div>'   ;
		document.getElementById("chosen").style.transitionDuration = time + "s";
		door(`${current_x}_${current_y}_block`);

		document.getElementById(`${current_x}_${current_y}_block`).classList.add('toLeft');
	
	}, time * 1000);

	};
};


function go_r() {

	// get where contaning element is placed
	
	current_x = parseInt(document.getElementById("chosen").parentElement.id.split("_")[0]);
	
	current_y = parseInt(document.getElementById("chosen").parentElement.id.split("_")[1]);
	
	if (document.getElementById(`${current_x+1}_${current_y}_block`)) {
 	
	//message('yes');
	current_x++;
	//document.getElementById("chosen").style.transitionDuration = time + "s";
	document.getElementById("chosen").style.marginLeft="20px";

	document.getElementById("chosen").classList.remove('toLeft');
		
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
 	
	//message('yes');
	current_y--;
	//document.getElementById("chosen").style.transitionDuration = time + "s";
	document.getElementById("chosen").style.marginTop="-20px";

	document.getElementById("chosen").classList.remove('toLeft');
		
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
 	
	//message('yes');
	current_y++;
	//document.getElementById("chosen").style.transitionDuration = time + "s";
	document.getElementById("chosen").style.marginTop="20px";

	document.getElementById("chosen").classList.remove('toLeft');
		
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


 
