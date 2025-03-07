const dAside = document.querySelector('aside');
const toClose = document.querySelectorAll('.xClose');
const hw2play = document.querySelector('.hw2play');
const record = document.querySelector('.record');
const theNum = document.querySelector('.theNum');
const dAnswer = document.querySelector('.dAnswer');
const chancesLeft = document.querySelector('.chancesLeft');
const highLow = document.querySelector('.highLow');

const dI = document.querySelector('.toPlay');
const toRecord = document.querySelector('.toRecord');
const btnEnter =  document.querySelector('#btnEnter');
const resetBtn =  document.querySelector('#reset');
const dInputs = document.querySelector('#dInputs');

const feedback = document.querySelector('.feedback');
const data2 = document.querySelector('.data2');
const lose = document.querySelector('.lose');
const win = document.querySelector('.win');
const toInput = document.querySelector('.dInputsSect');
const tbody = document.querySelector('tbody');

/**
* * ****************Global Variables
*/
let numEntered = dInputs.value;
let chanceLeft = 10;
let counter = 0;
let randomNum = Number(Math.floor(Math.random()*100+1));

/**
* * ****************Initial display 'none'
*/
dAside.style.display = 'none';
feedback.style.display = 'none';
resetBtn.style.display = 'none';

console.log(randomNum);
const numStore = [];

function recordTrack(dI, dNum){
let tabRow = document.createElement('tr');
let cell1 = document.createElement('td');
let cell2 = document.createElement('td');

cell1.textContent = dI;

if (dI == 1) {
cell1.textContent = '1st';
}
else if(dI == 10) {
cell1.textContent = 'last';
} else{
cell1.textContent = Number(dI);
}

cell2.textContent = Number(dNum);
tabRow.appendChild(cell1);
tabRow.appendChild(cell2);
tbody.prepend(tabRow);
}

/**
* * **************** Function Section
*/
// *The 'Play function for (Enter Btn)'
function playBtn() {
let enteredNum = Number(dInputs.value);

if (enteredNum > 0 && enteredNum <= 100){
    console.log(enteredNum);

    resetBtn.style.display = 'block';
    
    chanceLeft--;
    counter++;
    
    chancesLeft.textContent = chanceLeft;
    theNum.textContent = enteredNum;

    numStore.unshift(enteredNum);
    recordTrack(counter, enteredNum);
    // dInputs.value = "";
    dInputs.focus();

    if (randomNum === enteredNum){
        feedback.style.display = 'flex';
        win.style.display = 'block';
        toInput.style.display = 'none';
        lose.style.display = 'none';
    
        dAnswer.textContent = randomNum; 
    
        console.log(win.className);
        highLow.textContent = 'Accurate';
        resetBtn.textContent = 'Play Again';
    }
    
    if( chanceLeft  < 1 && randomNum != enteredNum){
        feedback.style.display = 'flex';
        lose.style.display = 'block';
        toInput.style.display = 'none';
        win.style.display = 'none';
        
        dAnswer.textContent = randomNum; 
        
        console.log(lose.className);
        highLow.textContent = 'Wrong';
        resetBtn.textContent = 'Try Again'; 
    }

    if (randomNum > enteredNum && chanceLeft != 0) {
        highLow.textContent = 'Low Guess';
    }

    else if (randomNum < enteredNum && chanceLeft != 0) {
        highLow.textContent = 'High Guess';
    }
}

}

// *The 'Reset function for (Reset / Try or Play Again Btn)'
function resetGame (){
toInput.style.display = 'block';
feedback.style.display = 'none';
resetBtn.style.display = 'none';

resetBtn.textContent = 'Reset';
tbody.textContent = '';
highLow.textContent = 'Uncertain ';
theNum.textContent = '00';
chancesLeft.textContent = '00';

dInputs.value = "";
randomNum = Number(Math.floor(Math.random()*100+1));
console.log(randomNum);

dInputs.focus();

chanceLeft = 10;
counter = 0;
}

// *The 'Close BTN'
for (let i = 0; i < toClose.length; i++) {
toClose[i].addEventListener('click', e=>{
dAside.style.display = 'none';
console.log(chanceLeft);
});
}

// *The 'To display 'Record/How to play'
const toDisplay = (e,m)=>{

dAside.style.display = 'none';
hw2play.style.display = 'none';
record.style.display = 'none';

e.style.display = 'flex';
m.style.display = 'flex';

console.log(m.className);
}

/**
* * ******* addEventListeners Section********
*/
// *The Play Button'
btnEnter.addEventListener('mousedown', playBtn);

// *The Reset Button'
resetBtn.addEventListener('click', resetGame);

// *The View Record'
dI.addEventListener('click',()=>{
toDisplay(dAside,hw2play);
});

// *The View Record'
toRecord.addEventListener('click',()=>{
toDisplay(dAside,record);
});

/**
* * ******* Unknown Section********
* *
* *How to make the "Table to display the information such that new rows are place above the first while maintaining their number"
* *
* *Example::::::
* 
* -------------
* |last|   20|
* ------------- 
* |n   |   33|
* ------------- 
* |3   |   24|
* ------------- 
* |2   |   20|
* ------------- 
* |1st |   20|
* -------------
*/