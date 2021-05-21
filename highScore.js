class HighScore {

    entries = [];

    addEntry(playerName, score) {
        this.entries.push([playerName, score]);
        this.entries.sort((a, b) => b[1] - a[1]);
        if (this.entries.length > options.maxHighScoreEntriesCount) {
            this.entries.pop();
        }
    }
}
