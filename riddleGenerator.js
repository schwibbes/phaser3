var riddleGenerator = (function () {
	var solutions = [
		{ question: "schi", answer: "#" },
		{ question: "schu", answer: "+" },
		{ question: "buh", answer: "-" },
	];

	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	function getRandomChar(skip) {
		var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		var notUniqueAnser = true;

		while (notUniqueAnser) {
			var result = characters.charAt(
				Math.floor(Math.random() * charactersLength)
			);

			if (!skip.includes(result)) {
				notUniqueAnser = false;
			}
		}

		return result;
	}

	function createRiddle() {
		var answer = solutions[getRandomInt(solutions.length - 1)];
		var wrong1 = JSON.parse(JSON.stringify(answer));
		var wrong2 = JSON.parse(JSON.stringify(answer));
		var charsToSkip = [answer.answer];
		wrong1.answer = getRandomChar(charsToSkip);
		wrong2.answer = getRandomChar(charsToSkip.concat(wrong1.answer));

		return {
			correct: answer,
			wrong1: wrong1,
			wrong2: wrong2,
		};
	}
})();
