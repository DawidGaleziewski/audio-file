// Each question is placed in a container in DOM foe easier manipulation
var containerQuestions = document.querySelectorAll(".question");
// Keep track of rolled questions their media, and DOM objects they are assigned to
	// Important! It keep the audio in variables so we can access it on click
var positionsArray = []
// Variables used for creating tags
var tagLetter = ["a","b","c","d","e","f","g"]
var tagTracker = 0
// Used to store objects that won the game
var audioVisualWinners
// Array of objects. Each object contains sound and picture used.
var audioVisual = [
	{	tag: generateTag(),
		audio: new Audio("media/1_beben_4180ms.wav"),
		visual: "media/1_beben_4180ms.jpg",
		winner: false,
		description: "Drum"
	},
	{
		tag: generateTag(),
		audio: new Audio("media/2_grzechotka_czerwona_7375ms.wav"),
		visual: "media/2_grzechotka_czerwona_7375ms.jpg",
		winner: false,
		description: "Rattle"
	},
	{
		tag: generateTag(),
		audio: new Audio("media/3_dzwonek_zolty_6606ms.wav"),
		visual: "media/3_dzwonek_zolty_6606ms.jpg",
		winner: false,
		description: "Bell"
	},

	{
		tag: generateTag(),
		audio: new Audio("media/5_trojkat2_7007ms.wav"),
		visual: "media/5_trojkat2_7007ms.jpg",
		winner: false,
		description: "Triangle"
	},

	{
		tag: generateTag(),
		audio: new Audio("media/6_tamburyno_stukanie1_4389ms.wav"),
		visual: "media/6_tamburyno_stukanie1_4389ms.jpg",
		winner: false,
		description: "Tambourine"
	},
		{
		tag: generateTag(),
		audio: new Audio("media/7_dzwoneczki_6860ms.wav"),
		visual: "media/7_dzwoneczki_6860ms.jpg",
		winner: false,
		description: "Little bells"
	},
		{
		tag: generateTag(),
		audio: new Audio("media/8_drewienko_akustyczne_9894ms.wav"),
		visual: "media/8_drewienko_akustyczne_9894ms.jpg",
		winner: false,
		description: "tWood"
	}
]

// function for generating random tags for audioVisual array of objects
function generateTag(){
	var tag = ""
	for(var i = 0; i < 5; i++){
		tag += tagLetter[random(6)]
	}

	for(var e = 0; e < 5; e++){
		tag += [random(6)]
	}

	tag += tagTracker
	tagTracker++
	return tag
}

// Actions after clicking finish button
function listenToFinish(){
	var buttonFinish = document.getElementById("finish");

	buttonFinish.addEventListener("click", function(){
		// check answers so far
		checkAnswers();
		// Update table data
		updateTable();
		// Show hidden table with results
		showTable();
	})
	
}

// Show hidden table with results
function showTable(){
	document.querySelector(".results").classList.remove("input-hidden");
}

// Update hidden table with results of the test
function updateTable(){
	// get tables dom
	var table = document.querySelector(".results")
	// must startt from second on loop as first is header
	var rows = table.querySelectorAll("tr")
	for(var i = 1; i < rows.length; i++){
		var tableData = rows[i].querySelectorAll("td");
		tableData[1].innerText = positionsArray[i - 1]["correct"];
		tableData[2].innerText = positionsArray[i - 1]["winnerObject"]["description"];
	}
}

// Criteria used for evaluating each question if its correct, and update objects
function checkAnswers(){
	for(var i = 0; i < positionsArray.length; i++){
		if(positionsArray[i].winnerBox.classList.contains("check")){
			positionsArray[i].correct = true
		}

	}		
}

// Loop thru all containers using previously designed functions
	// Used after loading the page
function bootstrapFunctions(containerQuestions){
	for(var i = 0; i < containerQuestions.length; i++){
		// use current container to generate questions and push it to array
		positionsArray.push(rememberPositions(containerQuestions[i]));
		// pass to addMedia function only current iteration of
		addMedia(positionsArray[i], containerQuestions[i]);
		toggleColor(containerQuestions[i]);
		console.log(positionsArray[i]["winnerObject"])

	}
}

// Highlight clicked answer - Apply function to each square in container
function toggleColor(container){
	var squares = container.querySelectorAll("img")
	for(var i = 0; i < squares.length; i++ ){
		squares[i].classList.remove("check");
		squares[i].addEventListener("click", function(){
			removeToggle(squares);
			this.classList.add("check");
		})
	}
}

// Remove highlight if other picture is clicked
function removeToggle(squares){
	for(var e = 0; e < squares.length; e++){
		squares[e].classList.remove("check");
	}
}

// Apply rolled media to their DOM objects
function addMedia(positionsArray, container){
	positionsArray["box1"].src =  positionsArray["rolledMedia"][0]["visual"];
	positionsArray["box2"].src =  positionsArray["rolledMedia"][1]["visual"];
	positionsArray["box3"].src =  positionsArray["rolledMedia"][2]["visual"];

	// Adding sound to play button
	var button = container.querySelector(".play");
	button.addEventListener("click", function(){
		positionsArray["winnerObject"]["audio"].play()
	})
}

// Combine rolled objects with DOM objects for easy applying letter
 function rememberPositions(containerQuestion) {
 	var questionsBoxes = containerQuestion.querySelectorAll("img");
 	var rolledAudioVisualObjects = setWinnerLoser();
 	var winnerObjectIndex = rolledAudioVisualObjects.findIndex(x => x.winner == "true");
 	var positions = {
 		winnerObject: rolledAudioVisualObjects.find(x => x.winner === "true"),
 		winnerBox: "box" + (winnerObjectIndex + 1),
 		rolledMedia: rolledAudioVisualObjects,
 		box1: questionsBoxes[0],
 		box2: questionsBoxes[1],
 		box3: questionsBoxes[2],
 		correct: false
 	}
 	positions.winnerBox = positions[positions.winnerBox]

 	return positions
 } 

// Select the winner object - make sure it won't be used anymore
function setWinnerLoser(){
	var questionsLocal = rollQuestionsArray();
	var winnerIndex = random(3)
	questionsLocal[winnerIndex].winner = "true"
	audioVisual.splice(audioVisual.indexOf(questionsLocal[winnerIndex]),1)
	// remove this item from all items so it wont be selected again in the future
	return questionsLocal
}


// Roll 3 posible answars for question
function rollQuestionsArray(){
	var questions = [];
	// roll 3 questions
	for(var i = 0; i < 3; i++){
		questions.push(rollControl(audioVisual,questions))
	}
	return questions
}

// Make sure there are no duplicates of rolled questions in each container
function rollControl(inputArray, outputArray){
	var rolledItem = inputArray[random(inputArray.length)]

			// make sure it does not exist in this array, or was not chosen as winner
			while (outputArray.indexOf(rolledItem) !== -1 ){
				console.log(rolledItem.winner)
				rolledItem = inputArray[random(inputArray.length)];
			} 
return rolledItem;
}

// function for rolling random numbers
function random(howMany) {
	return Math.floor((Math.random() * howMany) + 0)
}


// functions run at start
listenToFinish();
bootstrapFunctions(containerQuestions);







