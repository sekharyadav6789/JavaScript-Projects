let fs=require("fs");
console.log("Before");
fs.readFile("function.js",cb);
function cb(err,data){
    if(err){
        console.log(err);
    }
    else{
        console.log("content->"+ data);
    }
}
console.log("After");