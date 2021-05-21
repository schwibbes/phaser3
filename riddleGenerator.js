var riddleGenerator = (function () {
	var solutions = [
		{ question: "schi", answer: "#" },
		{ question: "schu", answer: "+" },
		{ question: "buh", answer: "-" },
	];

	var spawnPoints = [ 100, 400, 800 ];

	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	function getRandomChar(skip) {
		var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		var notUniqueAnswer = true;

		while (notUniqueAnswer) {
			var result = characters.charAt(
				getRandomInt(characters.length)
			);

			if (!skip.includes(result)) {
				notUniqueAnswer = false;
			}
		}

		return result;
	}

	function getRandomXPos(skip) {
		var notUniqueAnswer = true;

		while (notUniqueAnswer) {
			var result = spawnPoints[
				getRandomInt(spawnPoints.length)
			];

			if (!skip.includes(result)) {
				notUniqueAnswer = false;
			}
		}	
		
		return result;
	}

	function createRiddleTexts(){
		var candidate = solutions[getRandomInt(solutions.length - 1)];
		var answer = JSON.parse(JSON.stringify(candidate));
		var wrong1 = JSON.parse(JSON.stringify(candidate));
		var wrong2 = JSON.parse(JSON.stringify(candidate));
		var charsToSkip = [answer.answer];
		wrong1.answer = getRandomChar(charsToSkip);
		wrong2.answer = getRandomChar(charsToSkip.concat(wrong1.answer));

		return [ {
			riddle: answer,
			correct: true
		}, {
			riddle: wrong1,
			correct: false
		} , {
		riddle: wrong1,
		correct: false
		}];
	}

	return {
		createRiddle() {
			var riddles = createRiddleTexts();
			var alreadyUsed = [];
			for (var i=0; i < 3; i++) {
				var xPos = getRandomXPos(alreadyUsed);
				alreadyUsed.push(xPos);
				riddles[i].x = xPos;
			}
			return riddles;
		}
	};
})();

