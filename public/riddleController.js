function collectRiddle(player, riddle) {
    // Was the solution right or wrong?
    if (riddle.riddleMode.correct) {
        updateScore(100);
    } else {
        decreaseLive();
    }
    // In all cases: calculate new riddles 
    riddles.children,iterate(function(child) {
         child.disableBody(true, true);
    }); 
    for (let i = 0; i < riddles.children.length; i++) {
        riddles[i].enableBody(true, newRiddle[i].x, 0, true, true);
    }
}