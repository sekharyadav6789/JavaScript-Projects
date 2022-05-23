let fs=require("fs");
console.log("Before");
//line bottle neck
//files, db, image process -> background
//mean while i can do other
//let content=fs.readFileSync("f1.html");
//read -> start and i will send it to someone else
fs.readFile("f1.html",cb);
function cb(err,content){
    console.log("content =>"+content);
}
//console.log("content =>"+content);
console.log("After");
console.log("other work");
/*while(true){

}*/