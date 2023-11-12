// It takes time to elements to even appear
// so when i added this on start it just didn't work
// so i added timeout



setTimeout(()=>{


copy_text = 'Yes, please choose one of these variants:';
    
btc_button = document.getElementById("btc_button");

btc_button.addEventListener("click", btc_func);

function btc_func(event) {
  
  image_of_leaf.src= "btc_exod.png";
  
  copy_text = "bc1qv4peuv0rs3g7zvc0drueppnllmptjwnx5klk7m";
  
  adress_paragraph.textContent =  copy_text;
  
  event.preventDefault();
};


ltc_button = document.getElementById("ltc_button");

ltc_button.addEventListener("click", ltc_func, false);

function ltc_func(event) {
  
  image_of_leaf.src= "eth_exod.png";
  
  copy_text = "0xD098EFb35dB9B7DEa5D8bC63A436ef279b1C463a"; 
  
  adress_paragraph.textContent = copy_text; 
  
  event.preventDefault();
};


eth_button = document.getElementById("eth_button");

eth_button.addEventListener("click", eth_func, false);

function eth_func(event) {
  
  image_of_leaf.src= "btc_leg.png";
  
  copy_text = "12N4F6FZWAW2ivNiVQFAKghXnqDxd9Nq6X";
  
  adress_paragraph.textContent = copy_text; 
  
  event.preventDefault();
};


copy_button = document.getElementById("copy_button");

copy_button.addEventListener("click", copy_func, false);

function copy_func(event) {
    

  navigator.clipboard.writeText(copy_text);
  alert("Copied the text: " + copy_text);
  
  
//   let text = 'Hello from Techozu'  
// 
//   navigator.clipboard.writeText(text).then(() => {
//     alert("Copied the text: " + text);
//   })

};




}, 500);
