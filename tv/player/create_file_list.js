/*const { exec } = require('node:child_process')*/

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
    
//     text = text.substring(0, (text.length-11));

    text = "music_list = { \n" + text + '"}';
    
    
    
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



