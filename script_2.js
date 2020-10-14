const player = (name) => {
    let turn = true;
    let XorO = "X";
    let winCount = 0;
    return {name,XorO,turn,winCount}
};
let p1;
let p2;
// ---------- global variables defined above -----------
const logic = new function() {//game logic to run on each click
    let isWin = false;
    this.setWin = function() {
        let p1Wins = document.querySelector("#p1Wins");
        let p2Wins = document.querySelector("#p2Wins");
        if (p2) {
            p1Wins.textContent = p1.winCount;
            p2Wins.textContent = p2.winCount;
        };
    };
    this.move = function(e) {
        if (e.target.innerText === "") {
            const targ = document.querySelector(`#${e.target.id}`);
            if (p1.turn) {
                targ.className = p1.name;
                e.target.innerText = p1.XorO;
                p1.turn = false;
                p2.turn = true;
            } else if (p2.turn) {
                targ.className = p2.name;
                e.target.innerText = p2.XorO;
                e.target.class = p2.name;
                p2.turn = false;
                p1.turn = true;
            };
        }; 
    };
    this.win = function() {
        let curP = p1.turn ? p2.name:p1.name;
        let inputs = document.querySelectorAll(`.${curP}`);
            inputs = Array.from(inputs);
            inputs = inputs.map(val => parseInt(val.id[4]));
        function checkInputs(num,increment) {
            let returnVal = (inputs.indexOf(num + increment) !== -1 && inputs.indexOf(num + 2*increment) !== -1) ? true:false;
            return returnVal;
        }
        if (inputs.length > 2) {//checks if there have been at least 3 inputs
            for (let i=0;i < inputs.length - 2;i++) {
                let input = inputs[i];
                switch (input) {
                    case 1:
                        if (checkInputs(input,1)) {
                            isWin = checkInputs(input,1);
                        } else if (checkInputs(input,3)) {
                            isWin = checkInputs(input,3);
                        } else if (checkInputs(input,4)) {
                            isWin = checkInputs(input,4);
                        } else {}
                        break;
                    case 2:
                        if (checkInputs(input,3)) {
                            isWin = checkInputs(input,3);
                        } else {};
                        break;
                    case 3:
                        if (checkInputs(input,2)) {
                            isWin = checkInputs(input,2);
                        } else if (checkInputs(input,3)) {
                            isWin = checkInputs(input,3);
                        } else {};
                        break;
                    case 4:
                        if (checkInputs(input,1)) {
                            isWin = checkInputs(input,1);
                        } else {};
                        break;
                    case 7:
                        if (checkInputs(input,1)) {
                            isWin = checkInputs(input,1);
                        } else {};
                        break;
                };
            };
        };
        if (isWin) {
            setTimeout(() => {
                p1.name === curP ? p1.winCount++ : p2.winCount++;
                logic.setWin();
                aux.board();
                isWin = false;
            }, 1000);
        } else if (!isWin && inputs.length === 5) {
            setTimeout(() => {
                aux.board();
            }, 1000);
        };
    };
};
const aux = new function() {//setup and reset the board + DOM items
//constants / variables
    const submitBtn = document.querySelector("#submit");
    const confirmBtn = document.querySelector("#confirm");
    const resetBtn = document.querySelector("#reset");
    const baseMod = document.querySelector("#baseModal"); //orig display:flex
    const contMod = document.querySelector("#contentModal"); //orig display:flex
    const nameMod = document.querySelector("#pNameModal"); //orig display:none
    const pNum = document.querySelector("#pNum");
    let mode;
    let dif;
    let pCount = 1; //counter to assign player names
    const listeners = (function() {
        submitBtn.addEventListener("click", submit);
        confirmBtn.addEventListener("click", confirm);
        resetBtn.addEventListener("click", reset);       
    })();
//setup functions
    function submit() { //sets mode and difficulty if applicable
        const reg = document.querySelector("#regular");
        const twoP = document.querySelector("#twoP");
        contMod.style.display = "none";
        baseMod.style.display = "flex";
        nameMod.style.display = "grid";
        mode = twoP.checked ? 2:1;
        dif = reg.checked ? "reg":"imp";
        pNum.textContent = `Player ${pCount}`;
    };
    function confirm() {
        const input = document.querySelector("#pName");
        const p1Name = document.querySelector("#p1Name");
        const p2Name = document.querySelector("#p2Name");
        let name = input.value;
        if (name.length < 2) {
            alert("Player name should be 2 characters or longer");
        } else if (name.match(/\W|_|[0-9]/g)) {
            alert("Player name should not contain special characters or numbers");
        } else if (p1 && name === p1.name) {
            alert("Player 2 and Player 1 cannot have the same name");
        } else if (name === "Computer") {
            alert("You cannot be named 'Computer'");
        } else if (pCount === 1 && mode === 1) {
            p1 = player(name);
            p2 = player("Computer");
            baseMod.style.display = "none";
            nameMod.style.display = "none";
        } else if (pCount === 1 && mode === 2) {
            p1 = player(name);
            input.value = "";
            pNum.textContent = `Player ${pCount}`;
            pCount++;
        } else if (pCount === 2 && mode === 2) {
            p2 = player(name);
            baseMod.style.display = "none";
            nameMod.style.display = "none";
            pCount++
        }
        input.value = "";
        pCount === 3 || pCount === 1 ? pCount = 1:null;
        pNum.textContent = `Player ${pCount}`;
        if (typeof p1 === "object") {
            p1Name.textContent = `P1: ${p1.name}`;
        } else {};
        if (typeof p2 === "object") {
            p2Name.textContent = `P2: ${p2.name}`;
            p2.XorO = "O";
            p2.turn = false;
            aux.board();
            logic.setWin();
        } else {};

    };
    function reset() {
        p1 = player("");
        p2 = player("");
        p1Name.textContent = "P1: ";
        p2Name.textContent = "P2: ";
        logic.setWin();
        aux.board();
        baseMod.style.display = "flex";
        contMod.style.display = "flex";
    }
    this.board = function() {
        const gb = document.querySelector("#gameboard");
        while (gb.firstChild) {
            gb.removeChild(gb.firstChild);
        };
        for (i=1;i<=9;i++) {
            const gs = document.createElement("div");
            gs.id=`grid${i}`;
            gs.addEventListener("click", logic.move);
            gs.addEventListener("click", logic.win);
            gs.addEventListener("click", logic.tie);
            gb.appendChild(gs);
        };
    };
};
const ai = function() {

};