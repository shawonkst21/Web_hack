let boxes=document.querySelectorAll('.box');
let reset_btn=document.querySelector('.reset');
let winnermsg=document.querySelector('#winner');
let trunO=true;
const winningCombos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const resetGame=()=>{
    trunO=true;
    boxes.forEach((box)=>{
        box.innerText="";
        box.disabled=false;
    });
    winnermsg.style.display="none";
}
boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        if(trunO)
        {
            console.log("O's turn");
            box.innerText="O";
            trunO=false;

        }
        else{
            console.log("X's turn");
            box.innerText="X";
            trunO=true;
        }
        box.disabled=true;
       checkWinner();
    });
});
 const checkWinner=()=>{
            for(let pattern of winningCombos)
            {
              let pos1val=boxes[pattern[0]].innerText;
              let pos2val=boxes[pattern[1]].innerText;
              let pos3val=boxes[pattern[2]].innerText;
              if(pos1val!=""&& pos2val!="" && pos3val!="" && pos1val===pos2val && pos2val===pos3val)
              {
                console.log("Winner is "+pos1val);
                alert("Winner is "+pos1val);
                winnermsg.innerText="Congratulations! Winner is Player "+pos1val;
                winnermsg.style.display="block";
                boxes.forEach((box)=>{
                    box.disabled=true;
                });
                return;
              }

            }
        }
reset_btn.addEventListener('click',()=>{
    resetGame();
}); 
