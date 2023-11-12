// function for breathing underwater


function skew_f( fish_name, longevity ) {

	document.getElementById(fish_name).style.transform='skew(3deg, 3deg)';
	
	setTimeout(()=> {skew_ff( fish_name, longevity )}, 1000*longevity);
};

function skew_ff( fish_name, longevity ) {

	document.getElementById(fish_name).style.transform='skew(-3deg, -3deg)';
	
	setTimeout(()=> {skew_f( fish_name, longevity )}, 1000*longevity);
};


// moving function

function looking_for_place(fish_name, longevity) {

	fish = document.getElementById(fish_name);

	rightness = Math.floor( ( parseInt( world.aquarium.width ) - parseInt( fish.firstElementChild.style.width ) )  * Math.random());
	
	depth = Math.floor( ( parseInt( world.aquarium.height ) - parseInt( fish.firstElementChild.style.height ) )  * Math.random());
	
	to_right = rightness > parseInt(fish.style.left);
	
	if ( to_right ) fish.firstElementChild.style.transform = 'scaleX(-1)';
	
	if ( !to_right ) fish.firstElementChild.style.transform = 'scaleX(1)';
	
	time_len = Math.floor( ( longevity*1000 ) * Math.random());
	
	fish.style.transitionDuration = 2000 + 1000 * longevity + "ms";
	
	fish.style.top = depth;
	
	fish.style.left = rightness;
	
	setTimeout(()=> {
		
		looking_for_place(fish_name, longevity)
		
		},3500+time_len);

};
