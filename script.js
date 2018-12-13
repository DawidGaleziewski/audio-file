
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

function listenToFinish(containerQuestions){
	// get the finish button
	var resultsArray = [];
	var buttonFinish = document.getElementById("finish");

	buttonFinish.addEventListener("click", function(){
		for(var i = 0; i < containerQuestions.length; i++){
			resultsArray.push(checkAnswer(containerQuestions[i]));
			console.log(containerQuestions[i] )
		}
		return console.log(resultsArray)
	})
	
}

// Check if the answer is correct, after user selects it and clicks finish
// Note: beta, change after adding more divs
function checkAnswer(positionsArray){
	if(positionsArray[0].winnerBox.classList.contains("check")){
		positionsArray[0].correct = true
	}
		
}

// Loop thru all captured containers setting them up
// function setupContainers(containerQuestions){
// 	for(var i = 0; i < containerQuestions.length; i++){
// 		addMedia(containerQuestions[i]);
// 	}

// }

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
var positions =  rememberPositions(containerQuestions[0])
// Replace all media with rolled ones
function addMedia(positionsArray){
	// this will have to be iterated on array so it applies to each container
	positionsArray[0]["box1"].src =  positions["rolledMedia"][0]["visual"];
	positionsArray[0]["box2"].src =  positions["rolledMedia"][1]["visual"];
	positionsArray[0]["box3"].src =  positions["rolledMedia"][2]["visual"];

	// adding sound
		// find play button
	var button = containerQuestions[0].querySelector(".play");
	button.addEventListener("click", function(){
		positionsArray[0]["winnerObject"]["audio"].play()
	})
}


// create object that will store setup of a question:
 // which object wins
 // where is it located
 // where are the losers

// keep the audio in variable so we can access it on click
 var positionsArray = []

 // this is for test but will need to be iterated on each container
 positionsArray.push(rememberPositions(containerQuestions[0]))

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




// Select the winner object
// this will update not only the array it is used for, it will change th parrent scope as well
// ideal would be that a winner can be used again, but not as winner but as a placeholder
// !!!!some objcts are getting winners two times in one question!
// but they are still getting removed
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

// old version
// make sure there are no duplicated pictures in one question
// function rollControl(array){
// // 1 take rolled element and store it in variable
// var rolledItem = rollingTags[random(4)];
// // 2 compare this element with each element existing in array
// 	for(var i = 0; i < array.length; i++){
// 		rolledItem = rollingTags[random(rollingTags.length)];
// 		if (array[i]["tag"] === rolledItem){
// 			// 3. if it exists reset the loop and roll new element
// 			rolledItem = rollingTags[random(rollingTags.length)];
// 			i = 0;
// 		} 
// 	}
// // tag needs to be transfared back to object
// var notDuplicatedObject = audioVisual[rolledItem];
// return notDuplicatedObject;
// }

// Roll one random winning box
// note: using class for tracking winner is not ideal. Try to change this
// this function will be put in the loop, it needs to accept input of current container iteration, ie: containerQuestions[0]
// function rollWinnersBox(currentContainer){
// 	var currentContainerLocal = currentContainer;
// 	var answerBoxes = currentContainerLocal.querySelectorAll(".col-md-4 label img");
// 	for(var i = 0; i < answerBoxes.length; i++){
// 		answerBoxes[i].classList.add("loser");
// 	}

// 	var luckyNumber = [random(3)];
// 	var winnerBox = answerBoxes[luckyNumber];
// 	winnerBox.classList.add("winner")
// 	winnerBox.classList.remove("loser")
// 	return winnerBox
// }

// function for rolling random numbers
function random(howMany) {
	return Math.floor((Math.random() * howMany) + 0)
}


applyToContainers(containerQuestions);
setupContainers(containerQuestions);
listenToFinish(containerQuestions);









