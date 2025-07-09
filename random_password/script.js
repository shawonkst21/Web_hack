const inputField=document.getElementById("password");
const length=12;

const uperCase="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase="abcdefghijklmnopqrstuvwxyz";

const number="0123456789"
const symbol="~!@#$%^&*()_+{}?><|";
const allchars=uperCase+lowerCase+number+symbol;
function generatePassword(){
    let password="";
    password+=uperCase[Math.floor(Math.random()*uperCase.length)];
       password+=lowerCase[Math.floor(Math.random()*lowerCase.length)];
    password+=number[Math.floor(Math.random()*number.length)];
    password+=symbol[Math.floor(Math.random()*symbol.length)];

    while(length>password.length)
    {
    password+=allchars[Math.floor(Math.random()*allchars.length)];
    }
    inputField.value=password;
}
document.querySelector(".btn").addEventListener("click",()=>{
generatePassword();

})
function copyPassword(){
 inputField.select();
 document.execCommand("copy");
}

document.querySelector("#copy").addEventListener("click",()=>{
    copyPassword();
})

