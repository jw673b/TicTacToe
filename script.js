const player = (name) => {
    let turn = true;
    let XorO = "X";
    let winCount = 0;
    return {name,XorO,turn,winCount}
};
const gb = document.querySelector("#gameboard");
let p1;
let p2;
let mode;
let dif;

const helper = new function() {// game helper functions
    this.move = function(e) {
        if (p1.turn && e.target.innerText === "") {
            const targDiv = document.querySelector(`#${e.target.id}`);
            targDiv.className = p1.name;
            e.target.innerText = p1.XorO;
            p1.turn = false;
            p2.turn = true;
        } else if (p2.turn && e.target.innerText === "") {
            const targDiv = document.querySelector(`#${e.target.id}`);
            targDiv.className = p2.name;
            e.target.innerText = p2.XorO;
            e.target.class = p2.name;
            p2.turn = false;
            p1.turn = true;
        }
    };
    this.win = function() {
        let p1Wins = document.querySelector("#p1Wins");
        let p2Wins = document.querySelector("#p2Wins");
        if (p2) {
            p1Wins.textContent = p1.winCount;
            p2Wins.textContent = p2.winCount;
        };
    };
};
const logic = new function() {//game logic functions
    this.win = function() {
        let curP = p1.turn ? p2.name:p1.name;
        let inputs = document.querySelectorAll(`.${curP}`);
        inputs = Array.from(inputs);
        inputs = inputs.map(val => parseInt(val.id[4]));
        let isWin = false;
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
        if (isWin === true) {
            setTimeout(() => {
                p1.name === curP ? p1.winCount++ : p2.winCount++;
                helper.win();
                board();
            }, 1000);
        };
    };
};
const AI = new function() {

};
const setup = new function() {
    const submit = document.querySelector("#submit");
    const confirm = document.querySelector("#confirm");
    const input = document.querySelector("#pname");
    const pnum = document.querySelector("#pnum");
    const modalBase = document.querySelector("#modalBase");
    const modal = document.querySelector("#modalContents");
    const modal2 = document.querySelector("#modal2");
    const player1 = document.querySelector("#p1name");
    const player2 = document.querySelector("#p2name");
    const openModal = document.querySelector("#openModal");
    let p = 1;
    pnum.textContent = `P${p}`;
    this.submitbtn = (function() {
        submit.addEventListener("click",() => {//code for the submit button
            modal.style.display = "none";
            modalBase.style.display = "flex";
            modal2.style.display = "grid";
            const reg = document.querySelector("#regular");
            const imp = document.querySelector("#impossible");
            const oneP = document.querySelector("#1p");
            const twoP = document.querySelector("#2p");
            mode = two.checked ? 2:1;
            dif = easy.checked ? "easy":"hard";
            if (mode === 1) {
                p2 = player("computer");
                p2.XorO = "O";
                player2.textContent +="Computer";
            };
        });
    })();
    this.players = (function() {
        confirm.addEventListener("click",() => {//code for the confirm button
            let pname = input.value;
            if (pname.length < 2) {
                alert("Player name should be 2 characters or longer");
            } else if (pname.match(/\W|_/g)) {
                alert("Player name should not contain special characters");
            } else {
                switch(p) {
                    case 1:
                        typeof p1 === "object" ?
                        p1 = p1:p1 = player(pname);
                        player1.textContent +=p1.name;
                        break;
                    case 2:
                        typeof p2 === "object" ?
                        p2 = p2:p2 = player(pname);
                        p2.XorO = "O";
                        const player2 = document.querySelector("#p2name");
                        player2.textContent +=p2.name;
                        break;
                };
                if (mode === 2 && p === 1) {
                    p++;
                    pnum.textContent = `P${p}`;
                    input.value = "";
                } else {
                    modal2.style.display = "none";
                    modalBase.style.display = "none";
                };
                helper.win();
            };
        });
    })();
    this.resetbtn = (function(){
        openModal.addEventListener("click",() => {
            board();
            p1 = "";
            p2 = "";
            input.value = "";
            player1.textContent = "P1: ";
            player2.textContent = "P2: ";
            modal.style.display = "flex";
            modalBase.style.display = "flex";
            setup();
        });
    })();
};
function board() {
    while (gb.firstChild) {
        gb.removeChild(gb.firstChild);
    }
    for (i=1;i<=9;i++) {
        const gs = document.createElement("div");
        gs.id=`grid${i}`;
        gs.addEventListener("click", helper.move);
        gs.addEventListener("click", logic.win);
        gb.appendChild(gs);
    }
};
setup();
board();