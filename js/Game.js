class Game {
    constructor() {
        this.players = this.createPlayers();
        this.board = new Board();
        this.ready = false;
    }
    
    createPlayers() {
        const players = [new Player('Player 1', 1, '#e15258', true), new Player('Player 2', 2, '#e59a13')];
        return players;
    }
    
    startGame() {};
}