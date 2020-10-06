- game logic should be adjusted - 
- game mode should rely on Modal inputs
- listeners for submit and the new gamemode button
- New Game logic
    - modal determines game mode
        - if multiplayer - 2 players input names
        - if single player - 1 player enters name
            - the difficulty button should only be visible if single player is selected
        - turn based game logic - p1 then p2 
- create AI that selects target randomly
- create AI that is unbeatable



breakdown of code 

function setup {}
- global variables/constants set
- gameboard generated
- listeners attached
- game mode selected

function gameLogic {}
- checking for the win
- going between p1 and p2

function gameHelpers {}
- setting the board
- updating the scoreboard

function AI {}
- AI with random selection
- AI that is unbeatable