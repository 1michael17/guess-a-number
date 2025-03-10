const dAside = document.querySelector('aside');
const toClose = document.querySelectorAll('.xClose');
const hw2play = document.querySelector('.hw2play');
const record = document.querySelector('.record');
const theNum = document.querySelector('.theNum');
const dAnswer = document.querySelector('.dAnswer');
const chancesLeft = document.querySelector('.chancesLeft');
const highLow = document.querySelector('.highLow');
const yes = document.querySelector('.yes');
const no = document.querySelector('.no');

const dI = document.querySelector('.toPlay');
const aside1 = document.querySelector('.aside1');
const toRecord = document.querySelector('.toRecord');
const btnEnter = document.querySelector('#btnEnter');
const resetBtn = document.querySelector('#reset');
const dInputs = document.querySelector('#dInputs');

const feedback = document.querySelector('.feedback');
const data2 = document.querySelector('.data2');
const lose = document.querySelector('.lose');
const win = document.querySelector('.win');
const dInputsSect = document.querySelector('.dInputsSect');
const tbody = document.querySelector('tbody');

/**
* * ****************Global Variables
*/
let enteredNum = Number(dInputs.value);
let chanceLeft = 10;
let counter = 0;
let randomNum = Number(Math.floor(Math.random() * 100 + 1));
let inDisStyle = window.getComputedStyle(dInputsSect).display;
let aside1Display = window.getComputedStyle(aside1).display;
dInputs.focus();

/**
* * ****************Initial display 'none'
*/
dAside.style.display = 'none';
aside1.style.display = 'none';
feedback.style.display = 'none';
resetBtn.style.display = 'none';

console.log(randomNum); 

function recordTrack(dI, dNum) {
    let tabRow = document.createElement('tr');
    let cell1 = document.createElement('td');
    let cell2 = document.createElement('td');

    cell1.textContent = dI;

    if (dI == 1) {
        cell1.textContent = '1st';
    }
    else if (dI == 10) {
        cell1.textContent = 'last';
    } else {
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
    enteredNum = Number(dInputs.value);
    
    if (enteredNum > 0 && enteredNum <= 100) {
        resetBtn.style.display = 'block';
        aside1.style.display = 'none';

        chanceLeft--;
        counter++;

        chancesLeft.textContent = chanceLeft;
        theNum.textContent = enteredNum;

        recordTrack(counter, enteredNum);
        dInputs.value = "";

        if (randomNum === enteredNum) {
            feedback.style.display = 'flex';
            win.style.display = 'block';
            dInputsSect.style.display = 'none';
            lose.style.display = 'none';

            dAnswer.textContent = randomNum;

            highLow.textContent = 'Accurate';
            resetBtn.textContent = 'Play Again';
        }

        if (chanceLeft < 1 && randomNum != enteredNum) {
            feedback.style.display = 'flex';
            lose.style.display = 'block';
            dInputsSect.style.display = 'none';
            win.style.display = 'none';

            dAnswer.textContent = randomNum;

            highLow.textContent = 'Wrong';
            resetBtn.textContent = 'Try Again';
        }

        if (randomNum > enteredNum && chanceLeft != 0) {
            highLow.textContent = 'Low Guess';
        }

        else if (randomNum < enteredNum && chanceLeft != 0) {
            highLow.textContent = 'High Guess';
        }
        inDisStyle = window.getComputedStyle(dInputsSect).display;
        dInputs.focus();
    }
    else {
        dInputs.value = "";
        dInputs.focus();
    }
}

// *The 'Reset function for (Reset / Try or Play Again Btn)'
function resetGame() {
    if(randomNum === enteredNum || chanceLeft < 1 && randomNum != enteredNum){
        dInputsSect.style.display = 'block';
        feedback.style.display = 'none';
        resetBtn.style.display = 'none';
        aside1.style.display = 'none';
    
        resetBtn.textContent = 'Reset';
        tbody.textContent = '';
        highLow.textContent = 'Uncertain ';
        theNum.textContent = '00';
        chancesLeft.textContent = '10';
    
        dInputs.value = "";
        randomNum = Number(Math.floor(Math.random() * 100 + 1));
        console.log(randomNum);
    
        dInputs.focus();
    
        chanceLeft = 10;
        counter = 0;
    }
    else{
        aside1.style.display = 'flex';
        resetBtn.style.display = 'none';
    }
}

// *The 'To display 'Record/How to play'
const toDisplay = (e, m) => {

    dAside.style.display = 'none';
    hw2play.style.display = 'none';
    record.style.display = 'none';

    e.style.display = 'flex';
    m.style.display = 'flex';

    console.log(m.className);
}

//* * **** ADDEVENTLISTENER Section********* * ***/

// *The Play Button'
btnEnter.addEventListener('click', playBtn);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (inDisStyle === 'block'|| chanceLeft == 10) playBtn();
        else resetGame();
    }
})

// *The Reset Button'
resetBtn.addEventListener('click', resetGame);
yes.addEventListener('click', ()=>{
    chanceLeft = 0;
    resetGame();
});
no.addEventListener('click', ()=>{
    aside1.style.display = 'none';
    resetBtn.style.display = 'block';
    playBtn();
});
dInputs.addEventListener("input",()=>{aside1.style.display='none';});

// *The 'Close BTN'
for (let i = 0; i < toClose.length; i++) {
    toClose[i].addEventListener('click', e => {
        dAside.style.display = 'none';
        console.log(chanceLeft);
    });
}

// *The View How to Play'
dI.addEventListener('click', () => {
    toDisplay(dAside, hw2play);
});

// *The View Record'
toRecord.addEventListener('click', () => {
    toDisplay(dAside, record);
});
