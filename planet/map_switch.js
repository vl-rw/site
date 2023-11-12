        let map_value = 0;
        
        function showMap() {
        
            if (map_value == 0) {
            
                bg.classList.add("hidden");
                
                map.classList.remove("hidden");

                tooohjpotj.textContent = "Show orbits";
                
                map_value = 1;
                
            } else if (map_value == 1) {
            
                map.classList.add("hidden");
                
                orbit.classList.remove("hidden");
                
                tooohjpotj.textContent = "Show god view";
                
                map_value = 2;
                
            } else if (map_value == 2) {
            
                orbit.classList.add("hidden");
                
                bg.classList.remove("hidden");
                
                tooohjpotj.textContent = "Show the map";
                
                map_value = 0;
            };
        
        }; 
