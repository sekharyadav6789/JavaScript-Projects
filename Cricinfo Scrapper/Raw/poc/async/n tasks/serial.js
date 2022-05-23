let fs=require("fs");
let files=["../f1.txt","../f2.txt","../f3.txt","../f4.txt"];

console.log("Before");
console.log("Starting loop");
//Deadlock condition

// for(let i=0;i<files.length;){
//     fs.readFile(files[i],function cb(err,content){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("content->"+content);
//             i=i+1;
//         }
//     })
// }

function serialReader(n){
    if(n==files.length){
        return;
    }
    fs.readFile(files[n],function(err,content){
        if(err){
            console.log(err);
        }
        else{
            console.log("content->" + content);
            serialReader(n+1)
        } 
    });
}

serialReader(0);

console.log("all files read finished");