class HighScore {

    Entry = class {
        constructor(playerName, score) {
            this.playerName = playerName;
            this.score = score;
        }
    }

    entries = [];
    latestIndex;

    addEntry(playerName, score) {
        let newEntry = new this.Entry(playerName, score);
        this.entries.push(newEntry);
        this.entries.sort((a, b) => b.score - a.score);
        if (this.entries.length > options.maxHighScoreEntriesCount) {
            this.entries.pop();
        }

        this.latestIndex = this.entries.indexOf(newEntry);
    }
}