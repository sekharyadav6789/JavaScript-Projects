let fs=require("fs");
console.log("Before");

console.log("F1 read sent");
fs.readFile("../f1.txt",cb1);

function cb1(err,content){
    if(err){
        console.log(err);
    }
    else{
        console.log("content->"+content);
        console.log("F2 read sent");
        fs.readFile("../f2.txt",cb2);
    }
}

function cb2(err,content){
    if(err){
        console.log(err);
    }
    else{
        console.log("content->"+content);
        console.log("F3 read sent");
        fs.readFile("../f3.txt",cb3);
    }
}

function cb3(err,content){
    if(err){
        console.log(err);
    }
    else{
        console.log("content->"+content);
        console.log("F4 read sent");
        fs.readFile("../f4.txt",cb4);
    }
}

function cb4(err,content){
    if(err){
        console.log(err);
    }
    else{
        console.log("content->"+content);
    }
}

console.log("After");