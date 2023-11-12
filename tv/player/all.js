const http = require("http");
const fs = require("fs");
const { exec } = require("child_process");


a = '';

// run the `ls` command using exec
exec('ls ./music/', (err, output) => {
    // once the command has completed, the callback function is called
    if (err) {
        // log and return if we encounter an error
        console.error("could not execute command: ", err)
        return
    }
    // log the output received from the command
    a += output;
});

setTimeout(() => {
    
    
    b = a.split('\n');

    text = '';
    
    b.pop();
    
}, 100);



setTimeout(() => {
    
    
    for (let i in b) {
        text += '"'; text+= b[i]; text+='" : "./music/'; text+=b[i];text+='",\n';
    }
    
    
}, 200);



setTimeout(() => {
    
//     console.log(text);
//     text = text.substring(0, (text.length-11));

    text = "music_list = { \n" + text + '}';
    
    
    
}, 300);



setTimeout(() => {
    
    
    const fs = require('fs');

    const content =  text;

    fs.writeFile('list.json', content, err => {
    if (err) {
        console.error(err);
    }
    console.log('file written successfully');
    });
        
    
    
}, 400);









   
http.createServer(function(request, response){
       
    let filePath = "index.html";
    if(request.url !== "/"){
        // получаем путь после слеша
        filePath = request.url.substring(1);
    }
    fs.readFile(filePath, function(error, data){
               
        if(error){
                   
            response.statusCode = 404;
            response.end("Resourse not found!");
        }   
        else{
            response.end(data);
        }
    });
     
}).listen(3000, function(){
    console.log("Server started at 3000"); 
    console.log("http://localhost:3000/");
}); 
