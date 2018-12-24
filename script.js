// Decision on how many questions will be checked
let numberOfQuestions = 2

// Each question is placed in a container in DOM foe easier manipulation
// !after change this will use only one div that will change
let questionDiv = document.querySelector(".question");
// Keep track of rolled questions their media, and DOM objects they are assigned to
	// Important! It keep the audio in variables so we can access it on click
let rolledAudioVisualObjects = [];
// Variables used for creating tags
const tagLetter = ["a","b","c","d","e","f","g"];
let tagTracker = 0;
// Array of objects. Each object contains sound and picture tha can be used in the program.
// !Tag is not used in program so far, remove if it won't be used at the end
let audioVisualMedia = [
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
];

let navigateButtonGroup = document.getElementById("button-container")

// tracks which question should be currently in use
// let questionTracker = 0;

// let nextButton = document.getElementById("next");
// nextButton.addEventListener("click", function(){
// 	questionTracker++
// 	hideNotUsedQuestions()
// })


// !!Legacy as we do not need to operate on more than one div now
// hide questions that are not beeing answered currently
// function hideNotUsedQuestions(){
// 	var notUsedQuestions = questionDivs;
// 	let usedQuestion = questionDivs[questionTracker];
// 	for(let i = 0; i < notUsedQuestions.length; i++){
// 		notUsedQuestions[i].classList.add("input-hidden");
// 	}
// 	usedQuestion.classList.remove("input-hidden")
// }

// function for generating random tags for audioVisual array of objects
function generateTag(){
	let tag = ""
	for(let i = 0; i < 5; i++){
		tag += tagLetter[random(6)];
	}

	for(let e = 0; e < 5; e++){
		tag += [random(6)];
	}

	tag += tagTracker;
	tagTracker++;
	return tag;
}

// Add function to update number of questions
let buttonConfirm = document.getElementById("confirmNumberOfQuestions");
let numberOfQuestionsInput = document.getElementById("numberOfQuestions");
buttonConfirm.addEventListener("click", function(){
	numberOfQuestions = numberOfQuestionsInput.value;
	startProgram();
	questionDiv.classList.remove("input-hidden");
	navigateButtonGroup.classList.remove("input-hidden");
})

// stop currently playing sound
function stopCurrentSound(){
	rolledAudioVisualObjects[currentQuestion]["winnerObject"]["audio"].pause();
	rolledAudioVisualObjects[currentQuestion]["winnerObject"]["audio"].currentTime = 0;
}

// Add conditions so that next button is hidden when there are no more questions and finish button is shown
function swapNextAndFinishButtons(){
	if ((numberOfQuestions -1) === currentQuestion) {
		nextButton.classList.add("input-hidden");
		finishButton.classList.remove("input-hidden")
	} else {
		finishButton.classList.add("input-hidden")
	}
}

	let finishButton = document.getElementById("finish");
	finishButton.addEventListener("click", function(){
		stopCurrentSound()
		// check answers so far
		checkAnswer();
		// Update table data
		updateTable();
		// Show hidden table with results
		showTable();
	})


// Show hidden table with results
function showTable(){
	document.querySelector(".results").classList.remove("input-hidden");
}

// Update hidden table with results of the test
function updateTable(){
	// get tables dom
	let table = document.querySelector(".results");
	// must startt from second on loop as first is header
	let rows = table.querySelectorAll("tr");
	for(let i = 1; i < rows.length; i++){
		let tableData = rows[i].querySelectorAll("td");
		tableData[1].innerText = rolledAudioVisualObjects[i - 1]["correct"];
		tableData[2].innerText = rolledAudioVisualObjects[i - 1]["winnerObject"]["description"];
	}
}

// variable needed for below function
var nextButton = document.querySelector("#next")

// this will now needed to use more often, after each next button
nextButton.addEventListener("click", function(){
	stopCurrentSound()
	// check current answer
	checkAnswer();
	// get rid of toggled image effec
	removeToggledColor();
	// interpolate the variable
	currentQuestion++;
	// add new media
	addMedia(rolledAudioVisualObjects[currentQuestion]);
	// Update the number of question:
	questionDiv.querySelector("h2").innerText = "Test" + (currentQuestion + 1);
	swapNextAndFinishButtons()
})


// !needs to be changed so checks one answer so works on next button
// Criteria used for evaluating each question if its correct, and update objects
function checkAnswer(){
	// check current question with rolledAudioVisualObjects array and record result inside it
	if(rolledAudioVisualObjects[currentQuestion].winnerBox.classList.contains("check")){
		rolledAudioVisualObjects[currentQuestion].correct = true;
	}
}

// !This needs to be changed as we no longer have multiple divs
// Loop thru all containers using previously designed functions
	// Used after loading the page
//Need to keet track of current question
let currentQuestion = 0
function updateQuestionDiv(currentQuestion){
		addMedia(rolledAudioVisualObjects[currentQuestion], questionDiv);	
}
// Those need to be moved to dif function
		// pass to addMedia function only current iteration of
		// addMedia(rolledAudioVisualObjects[i], questionDiv);
		// toggleColor(questionDiv);

// Create array of  rolledAudioVisualObjects
function createRolledAudioVisualObjectsArray(numberOfQuestions){
	for(let i = 0; i < numberOfQuestions; i++){
		// Use info provided by user to generate questions and push it to array
		rolledAudioVisualObjects.push(updateAudioVisualMediaInformation(questionDiv));
	}
}

// new variable to simplyfy toggle color and remove toggle color
let questionDivImgs = questionDiv.querySelectorAll("img")

// Highlight clicked answer - Apply function to each square in container
function toggleColor(){
	for(let i = 0; i < questionDivImgs.length; i++ ){
		questionDivImgs[i].classList.remove("check");
		questionDivImgs[i].addEventListener("click", function(){
			removeToggledColor(questionDivImgs);
			this.classList.add("check");
		})
	}
}

// Remove highlight if other picture is clicked
function removeToggledColor(answerImage){
	for(let e = 0; e < questionDivImgs.length; e++){
		questionDivImgs[e].classList.remove("check");
	}
}

// !This needs to be rebuild so that it can be used everytime after next button is clicked
// Apply rolled media to their DOM objects
// !this accepts only one argument now, no need to change containers



function addMedia(rolledAudioVisualObject){
	rolledAudioVisualObject["box1"].src =  rolledAudioVisualObject["rolledMedia"][0]["visual"];
	rolledAudioVisualObject["box2"].src =  rolledAudioVisualObject["rolledMedia"][1]["visual"];
	rolledAudioVisualObject["box3"].src =  rolledAudioVisualObject["rolledMedia"][2]["visual"];

	// Adding sound to play button
	let playButton = questionDiv.querySelector(".play");
	
	playButton.addEventListener("click", playCurrentSound)
}

function playCurrentSound(){
	rolledAudioVisualObjects[currentQuestion]["winnerObject"]["audio"].play()
};

// for testing
var playButton = questionDiv.querySelector(".play");

// Combine rolled objects with DOM objects for easy applying letter
 function updateAudioVisualMediaInformation(questionDiv) {
 	let questionsBoxes = questionDiv.querySelectorAll("img");
 	let rolledAudioVisualObjects = setWinningLosingAnswers();
 	let winnerObjectIndex = rolledAudioVisualObjects.findIndex(x => x.winner == "true");
 	let positions = {
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




// Below does not need to change
// Select the winner object - make sure it won't be used anymore
function setWinningLosingAnswers(){
	let questionsLocal = rollAnswersArray();
	let winnerIndex = random(3)
	questionsLocal[winnerIndex].winner = "true"
	audioVisualMedia.splice(audioVisualMedia.indexOf(questionsLocal[winnerIndex]),1)
	// remove this item from all items so it wont be selected again in the future
	return questionsLocal
}

// Roll 3 posible answars for question
function rollAnswersArray(){
	let questions = [];
	// roll 3 questions
	for(let i = 0; i < 3; i++){
		questions.push(rollDuplicateControl(audioVisualMedia,questions))
	}
	return questions
}

// Make sure there are no duplicates of rolled questions in each container
function rollDuplicateControl(inputArray, outputArray){
	let rolledItem = inputArray[random(inputArray.length)]

			// make sure it does not exist in this array, or was not chosen as winner
			while (outputArray.indexOf(rolledItem) !== -1 ){
				rolledItem = inputArray[random(inputArray.length)];
			} 
return rolledItem;
}

// function for rolling random numbers
function random(howMany) {
	return Math.floor((Math.random() * howMany) + 0)
}

function startProgram(){
// make sure only one button is visible from start
		swapNextAndFinishButtons()
		createRolledAudioVisualObjectsArray(numberOfQuestions);
		// this can be used only once now
		toggleColor(questionDiv);
		// functions run at start
		// hideNotUsedQuestions();

		// startProgram(questionDiv);
		// addFunctionsToFinishButton();
		// update the div at start
		updateQuestionDiv(currentQuestion);
	}









