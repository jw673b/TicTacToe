const player = (name) => {
    let XorO = "X";
    let winCount = 0;
    return {name,XorO,winCount}
};
let p1;
let p2;
let mode;
let dif;
let turn = "p1";
const gb = document.querySelector("#gameboard");
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
    this.win = function() {
        let curP = turn === "p1" ? p2.name:p1.name;
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
        const endMsg = document.querySelector("#endMessage");
        if (isWin) {
                p1.name === curP ? p1.winCount++ : p2.winCount++;
                logic.setWin();
                endMsg.textContent = `${curP} Wins!`;
                aux.endGame();
                isWin = false;
        } else if (!isWin && inputs.length === 5) {
                endMsg.textContent = "The game is a tie!";
                aux.endGame();
        } else{};
    };
    const ai = new function() {    
        this.availSpaces = function() {
            let avail = [];
            let gbChildren = document.querySelector("#gameboard").childNodes;
            gbChildren = Array.from(gbChildren);
            gbChildren.forEach(child => {
                if (child.className === "avail") {
                    avail.push(child.id);
                };
            });
            return avail;
        };      
        this.rand = function() {
            const avail = ai.availSpaces();
            const random = avail[Math.floor(Math.random()*avail.length)];
            const targ = document.querySelector(`#${random}`);
            if (random) {
                targ.className = p2.name;
                targ.innerText = p2.XorO;
            };
        };
        this.imp = function() {
            const avail = ai.availSpaces();
        };
    };
    this.twoPGame = function(e) {
        if (mode === 2) {
            if (e.target.innerText === "") {
                const targ = document.querySelector(`#${e.target.id}`);
                if (turn === "p1") {
                    targ.className = p1.name;
                    e.target.innerText = p1.XorO;
                    turn = "p2";
                } else if (turn === "p2") {
                    targ.className = p2.name;
                    e.target.innerText = p2.XorO;
                    turn = "p1";
                };
                logic.win();
            } else {};
        } else {};
    };
    this.onePGame = function(e) {
        if (mode === 1) {
            console.log(turn);
            if (e.target.innerText === "") {
                const targ = document.querySelector(`#${e.target.id}`);
                let cont = true;
                if (turn === "p1") {
                    const curWins = document.querySelector("#p1Wins");
                    const score = curWins.textContent;
                    targ.className = p1.name;
                    e.target.innerText = p1.XorO;
                    turn = "p2";
                    logic.win();
                    if (curWins.textContent !== score) {
                        cont = false;
                    } else {};
                } if (turn === "p2" && cont) {
                    dif === "reg" ? ai.rand():ai.imp();
                    turn = "p1";
                    logic.win();
                };
            } else {};
        } else{};
    };
};
const aux = new function() {//setup and reset the board + DOM items
//constants / variables
    const endMod = document.querySelector("#endModal"); //orig display:none
    const continueBtn = document.querySelector("#continue"); //orig display:none
    const submitBtn = document.querySelector("#submit");
    const confirmBtn = document.querySelector("#confirm");
    const resetBtn = document.querySelector("#reset");
    const baseMod = document.querySelector("#baseModal"); //orig display:flex
    const contMod = document.querySelector("#contentModal"); //orig display:flex
    const nameMod = document.querySelector("#pNameModal"); //orig display:none
    const pNum = document.querySelector("#pNum");
    let pCount = 1; //counter to assign player names
    const listeners = (function() {
        submitBtn.addEventListener("click", submit);
        confirmBtn.addEventListener("click", confirm);
        resetBtn.addEventListener("click", reset);    
        continueBtn.addEventListener("click", end);   
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
    this.endGame = function() {
        baseMod.style.display = "flex";
        endMod.style.display = "flex";
    }
    function end() {
        baseMod.style.display = "none";
        endMod.style.display = "none";
        aux.board();
    };
    this.board = function() {
        while (gb.firstChild) {
            gb.removeChild(gb.firstChild);
        };
        for (i=1;i<=9;i++) {
            const gs = document.createElement("div");
            gs.id=`grid${i}`;
            mode === 1 ? gs.addEventListener("click", logic.onePGame):
                gs.addEventListener("click", logic.twoPGame);
            gs.className = "avail";
            gb.appendChild(gs);
        };
    };
};
