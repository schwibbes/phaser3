class HighScore {

    entries = [];

    addEntry(playerName, score) {
        this.entries.push([playerName, score]);
        this.entries.sort((a, b) => a[1] - b[1]);
        if (this.entries.length > options.maxHighScoreEntriesCount) {
            this.entries.pop();
        }
    }
}
