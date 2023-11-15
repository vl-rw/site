

let player_stroke = "sprites/sprite_9.png";		

let sprite_src_stroke = "sprites/sprite_1.png";		// adds 5 different sources for image inside wall part

let obj_num = 1; 							// adds class from wall_1 to wall_5 to set different styles for image in css


function chosen_loader() {

	if (!player_src.value) { player_stroke = player_src.placeholder }
	
	else { player_stroke = player_src.value };

	document.getElementById("chosen").innerHTML = '<img src="' + player_stroke + '" class="pl" ></div>';

};

function sprite_source(a) {

	obj_num = a;

	(document.getElementById("sprite_" + a).value) ? 
	
		sprite_src_stroke = document.getElementById("sprite_" + a).value : 
		
		sprite_src_stroke = document.getElementById("sprite_" + a).placeholder;

};
	
	
	
function submit() {

	container.innerHTML = code_src.value;
	
	document.getElementById("screen").style.display = "none";

	resize();
	
	document.getElementById("0_0_block").innerHTML="<div id='chosen'></div>";

};

function pressed(field) {
/*
	message(field);
	let element = document.getElementById(field);

	if (!onDoor.checked) {

			if (element.id[0] === 'n' ) {
				element.classList.remove("taken");
				element.id = element.id.slice(1);
				element.innerHTML = "";
			} else {
				element.classList.add("taken");
				element.id = "n" + element.id;
				element.innerHTML = "<img class='wall_" + obj_num + "' src='" + sprite_src_stroke + "' >"; 
			};
	
	} else {
	
			if (element.id[0] === 'n' ) {
				message("no it is taken");
			} else {
				element.classList.add("door");
			};
	
	};
*/
};



container.style.width = '400px';

function add_w() {

	container.style.width = 20 + parseInt( container.style.width ) + "px";

};

function rem_w() {

	container.style.width = -20 + parseInt( container.style.width ) + "px";

};

function load_bck(image_name) {

	if (!image_name) {

		container.style.backgroundImage = 'url("sprites/bck.png")';
	
		container.style.backgroundSize = 'cover';
		
	} else {
	
		container.style.backgroundImage = 'url(' + image_name + ')';
	
		container.style.backgroundSize = 'cover';
	
	};

};

function copy() {

	exod.value = container.innerHTML;
	
	exod.value += '<_script>  let basic_x = ';
	
	exod.value += parseInt(document.getElementById("chosen").parentElement.id.split("_")[0]);
	
	exod.value += '; let basic_y = ';
	
	exod.value += parseInt(document.getElementById("chosen").parentElement.id.split("_")[1]);
	
	exod.value += '; let time = .2;' + 'container.style.height = 20 * (';
	
	exod.value += document.getElementsByClassName("row").length;
	
	exod.value += ') + "px"; container.style.width =  20 * ('
	
	exod.value += (document.getElementsByClassName("cell").length) / (document.getElementsByClassName("row").length);
	
	exod.value += ') + "px" </_script>  ';
	

	let copyText = document.getElementById("exod");

	copyText.select();
	copyText.setSelectionRange(0, 99999); // For mobile devices

	navigator.clipboard.writeText(copyText.value);

	alert("Text was copied to clipboard");
};


let link_z = "";
let link_x = "";
let link_c = "";
let link_v = "";


function door(text) {
//message(text);
	switch (text) {
  	case "7_6_block":
    	message('Z → sex diff. info<br><br><br><br>');
		link_z = "sex/index.html";
		link_x = "";
		link_c = "";
		link_v = "";
    	break;
  	case "4_7_block":
    	message('Z → sex diff. info<br><br><br><br>');
		link_z = "sex/index.html";
		link_x = "";
		link_c = "";
		link_v = "";
    	break;
  	case "5_7_block":
    	message('Z → sex diff. info<br><br><br><br>');
		link_z = "sex/index.html";
		link_x = "";
		link_c = "";
		link_v = "";
    	break;
  	case "7_7_block":
    	message('Z → sex diff. info<br><br><br><br>');
		link_z = "sex/index.html";
		link_x = "";
		link_c = "";
		link_v = "";
    	break;
  	case "9_7_block":
    	message('Z → coding <br>X → articles<br><br><br><br>');
		link_z = "program/index.html";
		link_x = "articles/index.html";
		link_c = "";
		link_v = "";
    	break;
  	case "10_7_block":
    	message('Z → coding <br>X → articles<br><br><br><br>');
		link_z = "program/index.html";
		link_x = "articles/index.html";
		link_c = "";
		link_v = "";
    	break;
  	case "13_7_block":
    	message('Archive?');
		link_z = "";
		link_x = "";
		link_c = "";
		link_v = "";
    	break;
  	case "14_7_block":
    	message('Archive?');
		link_z = "";
		link_x = "";
		link_c = "";
		link_v = "";
    	break;
  	case "20_7_block":
    	message('Z → exit<br><br><br><br>');
		link_z = "https://www.google.com/";
		link_x = "";
		link_c = "";
		link_v = "";
    	break;
  	case "16_8_block":
    	message('Z → planet<br><br><br><br>');
		link_z = "planet/index.html";
		link_x = "";
		link_c = "";
		link_v = "";
    	break;
  	case "22_8_block":
  		t = new Date;
    	message(t.getHours() + ' : ' + t.getMinutes() + ' : ' + t.getSeconds());
		link_z = "";
		link_x = "";
		link_c = "";
		link_v = "";
    	break;
  	case "23_10_block":
    	message('Z → Chemistry<br><br><br><br>');
		link_z = "chem/index.html";
		link_x = "";
		link_c = "";
		link_v = "";
    	break;
  	case "22_11_block":
    	message('Z → Chemistry<br><br><br><br>');
		link_z = "chem/index.html";
		link_x = "";
		link_c = "";
		link_v = "";
    	break;
  	case "23_12_block":
    	message('Z → Chemistry<br><br><br><br>');
		link_z = "chem/index.html";
		link_x = "";
		link_c = "";
		link_v = "";
    	break;
  	case "4_14_block":
    	message('Z → donate<br><br><br><br>');
		link_z = "donate/index.html";
		link_x = "";
		link_c = "";
		link_v = "";
    	break;
  	case "5_15_block":
    	message('Z → donate<br><br><br><br>');
		link_z = "donate/index.html";
		link_x = "";
		link_c = "";
		link_v = "";
    	break;
  	case "21_14_block":
    	message('Z → memes <br>X → music <br>C → videos <br>V → dendy <br><br><br><br>');
		link_z = "tv/politics/index.html";
		link_x = "tv/player/index.html";
		link_c = "tv/video/index.html";
		link_v = "tv/html-emulator/index.html";
    	break;
  	case "22_14_block":
    	message('Z → memes <br>X → music <br>C → videos <br>V → dendy <br><br><br><br>');
		link_z = "tv/politics/index.html";
		link_x = "tv/player/index.html";
		link_c = "tv/video/index.html";
		link_v = "tv/html-emulator/index.html";
    	break;
  	case "7_17_block":
    	message('Balcony?<br><br><br><br>');
		link_z = "";
		link_x = "";
		link_c = "";
		link_v = "";
    	break;
  	case "8_17_block":
    	message('Balcony?<br><br><br><br>');
		link_z = "";
		link_x = "";
		link_c = "";
		link_v = "";
    	break;
  	case "9_17_block":
    	message('Balcony?<br><br><br><br>');
		link_z = "";
		link_x = "";
		link_c = "";
		link_v = "";
    	break;
  	case "10_17_block":
    	message('Balcony?<br><br><br><br>');
		link_z = "";
		link_x = "";
		link_c = "";
		link_v = "";
    	break;
	default:
    	message('<br><br><br><br>');
		link_z = "";
		link_x = "";
		link_c = "";
		link_v = "";
    	
    	
	}

}; 

function door_list() {
	
	let array = document.getElementsByClassName("door");

	for (let i = 0 ; i < array.length; i++) {
	
		console.log( array[i].id );
	
	};

}; 

function resize() {

	container.style.height = 20 * ( document.getElementsByClassName("row").length ) + "px";
	
	container.style.width =  20 * ( document.getElementsByClassName("cell").length / document.getElementsByClassName("row").length ) + "px";
	
	consol.style.width = container.style.width;
	
	left_table.style.width = (window.innerWidth - parseInt(container.style.width) -100) / 2 + "px";
	
	right_table.style.width = (window.innerWidth - parseInt(container.style.width) -100) / 2 + "px";
	
};

function message(txt) {

	consol.innerHTML = txt + "<br><br>" + consol.innerHTML;

};

