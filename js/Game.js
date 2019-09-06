class Game {
    constructor() {
        this.players = this.createPlayers();
        this.board = new Board();
        this.ready = false;
    }
    
    get activePlayer() {
        return this.players.find(player => player.active);
    }
    
    createPlayers() {
        const players = [new Player('Player 1', 1, '#e15258', true), new Player('Player 2', 2, '#e59a13')];
        return players;
    }
    
    startGame() {
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
         
    }
    
    playToken() {
        let spaces = this.board.spaces;
        let activeToken = this.activePlayer.activeToken;
        let targetColumn = spaces[activeToken.columnLocation];
        let targetSpace = null;
        
        for(let space of targetColumn) {
            if(space.token === null) {
                targetSpace = space;
            }
        }
        
        if(targetSpace != null) {
            this.ready = false;
            activeToken.drop(targetSpace, function() {
                game.updateGameState(activeToken, targetSpace);
            });
        }
    }
    
    handleKeyDown(event) {
        if(this.ready) {
            if(event.key === 'ArrowRight') {
                this.activePlayer.activeToken.moveRight(this.board.columns);
            }
            else if(event.key === 'ArrowLeft') {
                this.activePlayer.activeToken.moveLeft();

            }
            else if(event.key === 'ArrowDown') {
                this.playToken();
            }
        } 
    }
    
    updateGameState(token, target) {
        target.mark(token);
        
        if(this.checkForWin(target)) {
            this.gameOver("You are a winner!!");
        }
        else {
            this.switchPlayers();
            
            const hasActiveToken = this.activePlayer.checkTokens();
            const activeToken = this.activePlayer.activeToken;
            
            if(hasActiveToken) {
            activeToken.drawHTMLToken();
            this.ready = true;
            }
            else {
              this.gameOver("You ran out of tokens");  
            }
            
        }
    }
    
    switchPlayers() {
        for(let player of this.players) {
            player.active = player.active === true ? false : true;
        }
    }
    
    gameOver(message) {
        const gameOver = document.getElementById('game-over');
        gameOver.style.display = 'block';
        gameOver.textContent = message;
        this.ready = false;
    }
    
    checkForWin(target){
        const owner = target.token.owner;
        let win = false;

        // vertical
        for (let x = 0; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x][y+1].owner === owner && 
                    this.board.spaces[x][y+2].owner === owner && 
                    this.board.spaces[x][y+3].owner === owner) {
                        win = true;
                }           
            }
        }

        // horizontal
        for (let x = 0; x < this.board.columns - 3; x++ ){
            for (let y = 0; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x+1][y].owner === owner && 
                    this.board.spaces[x+2][y].owner === owner && 
                    this.board.spaces[x+3][y].owner === owner) {
                        win = true;
                }           
            }
        }

        // diagonal
        for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x-1][y+1].owner === owner && 
                    this.board.spaces[x-2][y+2].owner === owner && 
                    this.board.spaces[x-3][y+3].owner === owner) {
                        win = true;
                }           
            }
        }

        // diagonal
        for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 3; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x-1][y-1].owner === owner && 
                    this.board.spaces[x-2][y-2].owner === owner && 
                    this.board.spaces[x-3][y-3].owner === owner) {
                        win = true;
                }           
            }
        }

        return win;
    }
}