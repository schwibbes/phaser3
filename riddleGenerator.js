var riddleGenerator = (function () {
	var solutions = [
		{ question: "Mensch", answer: "\u5165" },
		{ question: "Loch", answer: "\u30ea" },
		{ question: "Stärke", answer: "\u529b" },
		{ question: "Disziplin", answer: "\u8ebe" },
	];

	var spawnPoints = [ 100, 400, 800, 650, 280, 487 ];

	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	function getRandomChar(skip) {
		var characters = "\u4eb0\u56f0\u4eb2\u5650\u5240\u55b0\u4eb6\u5140\u4eb8\u4eb9\u5390";
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
		var candidate = solutions[getRandomInt(solutions.length)];
		var answer = JSON.parse(JSON.stringify(candidate));
		var wrong1 = JSON.parse(JSON.stringify(candidate));
		var wrong2 = JSON.parse(JSON.stringify(candidate));
		var charsToSkip = [answer.answer];
		wrong1.answer = getRandomChar(charsToSkip);
		wrong2.answer = getRandomChar(charsToSkip.concat(wrong1.answer));

		return [ {
			solution: answer,
			correct: true
		}, {
			solution: wrong1,
			correct: false
		} , {
			solution: wrong2,
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

