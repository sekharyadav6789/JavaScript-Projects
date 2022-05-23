//Java variables, function
//function are treated as first class citizens
//JS, Haskell,-> function are also treated as a variable
//you can store value/address of a variable in another variable
//you can also store address of a function inside a variable

let a=[10,20,30,40];
let b=a;
console.log("value inside b is",a);
let fnAddrCont=function fn(param){
    console.log("param is ",param);
}

console.log(fnAddrCont());
//int a=10;
//int b=a;
//System.out.println(b);

function fn(param){
    console.log(" param is ", param);
}
//fn("a");
//fn(10);
//fn([10,20,30,40]);