function collectRiddle(player, riddle) {
    // Was the solution right or wrong?
    if (riddle.riddleModel.correct) {
        gameState.updateScore(100);
    } else {
        gameState.decreaseLive();
    }
    // In all cases: calculate new riddles 
    riddles.children.iterate(function(child) {
         child.disableBody(true, true);
    }); 


    var newRiddle = riddleGenerator.createRiddle();
    gameState.setRiddle(newRiddle);
    let i = 0;
    riddles.children.iterate(function(child) {        
        child.enableBody(true, newRiddle[i].x, 0, true, true);
        child.riddleModel = newRiddle[i];
        i++;
   }); 
}