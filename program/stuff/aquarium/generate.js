// function for creating aquarium and fishes from JSON 

function generate() {

	let temp = document.createElement("div");
	
	temp.style.height = world.aquarium.height;
			
	temp.style.width = world.aquarium.width;	
	
	temp.style.background = world.aquarium.color;
	
	// temp.style.backgroundImage = world.aquarium.image; 
    
	let temp1 = document.createElement("img");
	
	temp1.style.height = world.aquarium.height;
			
	temp1.style.width = world.aquarium.width;
	
	temp1.style.position = "absolute";
			
	temp1.src = world.aquarium.image; 

	temp1.style.filter = "hue-rotate(90deg)";
    
	temp.append(temp1);
	
	document.body.append(temp);
	
	// for each fish
	
	for (let element in world ) {
	
		if (element[0] == "f") {
		
			temp_child = document.createElement("div");
		
			temp_child.style.height = world[element].height;
			
			temp_child.style.width = world[element].width;		
			
			temp_child.style.transitionDuration = "0.5s";	
			
			temp_child.style.position = "absolute";	
			
			temp_child.id = element;
			
			temp_child_2 = document.createElement("img");
			
			temp_child_2.src = world[element].image;
			
			temp_child_2.style.height = world[element].height;
			
			temp_child_2.style.width = world[element].width;
			
			temp_child_2.style.transitionDuration = "500ms";
			
			temp_child.append(temp_child_2);
			
			temp.append(temp_child);
		
		};
		
	};
};

// creating the world...

generate();

// ... and bring life to it!

for (let element in world ) {
	
	if (element[0] == "f") {
		
		skew_f(element, 1); 
	
		looking_for_place(element, world[element].speed);
	
	};
	
};
