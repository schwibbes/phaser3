class GameState{
     gameLost = false;
     gameWon = false;
     score = 0;
     lives = options.maxLives;
     timeLeft = options.roundMaxTime;
    
     updateScore(value) {
        this.score += value;
        this.updateHud();
    }
    
     updateHud() {
        scoreText.setText(this.hudText());
    }
    
     hudText() {
        return ['Score: ' + this.score, "Lives: " + this.lives, "Time Left: " + this.timeLeft];
    }
    
    decreaseTimer() {
        this.timeLeft--;
        this.updateHud();
        this.updateGameOver();
    }
    
     decreaseLive() {
        this.lives--;
        this.updateHud();
        this.updateGameOver();
    }
    
    updateGameOver() {
        if (this.timeLeft <= 0 || this.lives <= 0) {
            this.gameLost = true;
        }
    }

    isGameOver() {
        return this.gameLost || this.gameWon;
    }
}