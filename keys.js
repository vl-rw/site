function moving_char(evt) {

	switch (evt.keyCode) {
	
    	case 65: // A
      	go_l();
      	break;
    	case 37: // Left arrow
      	go_l();
      	break;

    	case 68: // D
      	go_r();
      	break;
      	case 39: // right Arrow
      	go_r();
      	break;
      	
    	case 87:
      	go_u(); // W
      	break;
      	case 38:
      	go_u(); // Up arrow
      	break;
      	
    	case 83:
      	go_d(); // S
      	break;
      	case 40:
      	go_d(); // Down arrow
      	break;
      	
      	
    	case 90:
      	key_z(); // Z
      	break;
      	case 88:
      	key_x(); // X
      	break;
    	case 67:
      	key_c(); // C
      	break;
      	case 86:
      	key_v(); // V
      	break;
      	
  	}

}

window.addEventListener('keydown', moving_char);
