var riddleGenerator = (function () {
	var solutions = [
		{ question: "ki", answer: "\u304d" },
		{ question: "pa", answer: "\u3071" },
		{ question: "bo", answer: "\u307c" },
		{ question: "ru", answer: "\u308b" },
	];

	var spawnPoints = [ 100, 400, 800, 650, 280, 487 ];

	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	function getRandomChar(skip) {
		var characters = "\u3042\u304a\u3082\u3092\u3070\u3072\u3073\u3084\u3086\u3050\u305e\u306c\u306d\u308b\u307c\u3071\u304d";
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

