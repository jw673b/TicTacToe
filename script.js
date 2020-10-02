const player = (name) => {
    let turn = false;
    let XorO = "X";
    let winCount = 0;
    return {name,XorO,turn,winCount}
}
var p1 = player(prompt("Player 1 enter your name"));
p1.turn = true;
var p2 = player(prompt("Player 2 enter your name"));
p2.XorO = "O";
const winCases = [[1,2,3],[1,5,9],[1,4,7],[2,5,8],[3,6,9],[3,5,7],[4,5,6],[7,8,9]];
const setPlayers = () => {
    let players = [];
    players.push(p1,p2);
    players.forEach((player,index) => {
        const pDOM = document.querySelector(`#player${index+1}`);
        console.log(pDOM);
        let childDOMs = pDOM.childNodes;
            childDOMs = Array.from(childDOMs)
        const nameDOM = childDOMs[1];
            nameDOM.textContent += player.name;
        const winsDOM = childDOMs[5];
            winsDOM.textContent = player.wins;
    })
    setWins();
}
const setWins = () => {
    let p1Wins = document.querySelector("#p1Wins");
    let p2Wins = document.querySelector("#p2Wins");
    p1Wins.textContent = p1.winCount;
    p2Wins.textContent = p2.winCount;
}
const startGame = () => {
    const gameBoardDOM = document.querySelector("#gameboard");
    const checkBox = (e) => {
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
    }
    const gameLogic = () => {
        setTimeout(() => {
            let currentPlayer;
            let currentPlayerName;
            p1.turn === false ? currentPlayerName = p1.name:currentPlayerName = p2.name;
            p1.turn === false ? currentPlayer = p1:currentPlayer = p2;
            let playerInputs = document.querySelectorAll(`.${currentPlayerName}`);
            playerInputs = Array.from(playerInputs);
            console.log({currentPlayer});
            if (checkWin(playerInputs)) {
                currentPlayer.winCount += 1;
                alert(`${currentPlayerName} wins!`);
                setWins();
                setBoard();
            } else if (playerInputs.length === 5) {
                alert(`The game is a draw!`)
                setBoard();
            }
        }, 1000);
    }
    const checkWin = (inputs) => {
        inputs = inputs.map(val => parseInt(val.id[4]));
        console.log(inputs);
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
                }
            }
        return isWin;
        }
    }
    const setBoard = () => {
        while (gameBoardDOM.firstChild) {
            gameBoardDOM.removeChild(gameBoardDOM.firstChild);
        }
        for (i=1;i<=9;i++) {
            const gridSpaceDOM = document.createElement("div");
            gridSpaceDOM.id=`grid${i}`;
            gridSpaceDOM.addEventListener("click", checkBox);
            gridSpaceDOM.addEventListener("click", gameLogic);
            gameBoardDOM.appendChild(gridSpaceDOM);
        }

    }
    setBoard();
}

startGame();
setPlayers();

const ai = () => {
    
}