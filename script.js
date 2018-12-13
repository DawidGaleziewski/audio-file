
// Create a object, holding a picture, sound and tag, acting as a hash table
// Note: it will be better to: try to use array, try for each loop, add id(hash) to each object generated on load
// Each question is placed in container, need to catch them in array to loop thru it.
var containerQuestions = document.querySelectorAll(".question");
var tagLetter = ["a","b","c","d","e","f","g"]
var tagTracker = 0
// hardcoded sound for new button
// if I change the source here it works on the button. I do not have to load it again
// This should work fine if I create a new engine and apply it


// new engine
// to do: add randomly generated tags
var audioVisual = [
	{	tag: generateTag(),
		audio: new Audio("media/cat.mp3"),
		visual: "media/cat.jpeg",
		winner: false,
		description: "cat",
		box: 0
	},
	{
		tag: generateTag(),
		audio: new Audio("media/cricket.mp3"),
		visual: "media/cricket.jpeg",
		winner: false,
		description: "cricket",
		box: 0
	},
	{
		tag: generateTag(),
		audio: new Audio("media/horse.mp3"),
		visual: "media/horse.jpeg",
		winner: false,
		description: "horse",
		box: 0
	},
	{
		tag: generateTag(),
		audio: new Audio("media/truck.mp3"),
		visual: "media/truck.jpeg",
		winner: false,
		description: "truck",
		box: 0
	},
	{
		tag: generateTag(),
		audio: new Audio("media/dog.mp3"),
		visual: "media/dog.jpeg",
		winner: false,
		description: "dog",
		box: 0
	}
]

var audioVisualWinners


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

// actions after clicking finish button
listenToFinish();
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

// show hidden table
function showTable(){
	document.querySelector(".results").classList.remove("input-hidden");
}

// update table with gathered data
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


// Check if the answer is correct, after user selects it and clicks finish
// Note: beta, change after adding more divs
function checkAnswers(){
	for(var i = 0; i < positionsArray.length; i++){
		if(positionsArray[i].winnerBox.classList.contains("check")){
			positionsArray[i].correct = true
		}

	}		
}


// Highlight only clicked picture
function applyToContainers(containers){
	var localContainers = containers
	for(var d = 0; d < localContainers.length; d++){
		var squares = localContainers[d].querySelectorAll("img")
		toggleColor(squares)
	}
}

function toggleColor(squares){
	for(var i = 0; i < squares.length; i++ ){
		squares[i].classList.remove("check");
		squares[i].addEventListener("click", function(){
			removeToggle(squares);
			this.classList.add("check");
		})
	}
}

function removeToggle(squares){
	for(var e = 0; e < squares.length; e++){
		squares[e].classList.remove("check");
	}
}

// Toggle hihlight when picture is clicked and remove it from the rest

// variable for test only
// var positions =  rememberPositions(containerQuestions[0])

// loop thru all containers using previously designed functions
function bootstrapFunctions(containerQuestions){
	for(var i = 0; i < containerQuestions.length; i++){
		// use current container to generate questions and push it to array
		positionsArray.push(rememberPositions(containerQuestions[i]));
		// pass to addMedia function only current iteration of
		addMedia(positionsArray[i], containerQuestions[i]);
		console.log(positionsArray[i]["winnerObject"])

	}
}


// Apply rolled media to their DOM
function addMedia(positionsArray, container){
	// this will have to be iterated on array so it applies to each container
	// correct pictures are not getting replaced
	positionsArray["box1"].src =  positionsArray["rolledMedia"][0]["visual"];
	positionsArray["box2"].src =  positionsArray["rolledMedia"][1]["visual"];
	positionsArray["box3"].src =  positionsArray["rolledMedia"][2]["visual"];
	// adding sound
		// find play button
	var button = container.querySelector(".play");
	button.addEventListener("click", function(){
		positionsArray["winnerObject"]["audio"].play()
	})
}


// keep the audio in variable so we can access it on click
 var positionsArray = []

 // this is for test but will need to be iterated on each container
 

// combine rolled objects with DOM objects for easy applying letter
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


// rolll 3 posible answars for question
function rollQuestionsArray(){
	var questions = [];
	// roll 3 questions
	for(var i = 0; i < 3; i++){
		questions.push(rollControl(audioVisual,questions))
	}
	return questions
}

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





// Core functions starting the logic of the app
bootstrapFunctions(containerQuestions);
applyToContainers(containerQuestions);






