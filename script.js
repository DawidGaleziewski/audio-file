// Each question is placed in a container in DOM foe easier manipulation
let questionDivs = document.querySelectorAll(".question");
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

// tracks which question should be currently in use
let questionTracker = 0;

let nextButton = document.getElementById("next");
nextButton.addEventListener("click", function(){
	questionTracker++
	hideNotUsedQuestions()
})

// hide questions that are not beeing answered currently
function hideNotUsedQuestions(){
	var notUsedQuestions = questionDivs;
	let usedQuestion = questionDivs[questionTracker];
	for(let i = 0; i < notUsedQuestions.length; i++){
		notUsedQuestions[i].classList.add("input-hidden");
	}
	usedQuestion.classList.remove("input-hidden")
}

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

// Actions after clicking finish button
function addFunctionsToFinishButton(){
	let finishButton = document.getElementById("finish");
	finishButton.addEventListener("click", function(){
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
	let table = document.querySelector(".results");
	// must startt from second on loop as first is header
	let rows = table.querySelectorAll("tr");
	for(let i = 1; i < rows.length; i++){
		let tableData = rows[i].querySelectorAll("td");
		tableData[1].innerText = rolledAudioVisualObjects[i - 1]["correct"];
		tableData[2].innerText = rolledAudioVisualObjects[i - 1]["winnerObject"]["description"];
	}
}

// Criteria used for evaluating each question if its correct, and update objects
function checkAnswers(){
	for(let i = 0; i < rolledAudioVisualObjects.length; i++){
		if(rolledAudioVisualObjects[i].winnerBox.classList.contains("check")){
			rolledAudioVisualObjects[i].correct = true;
		}

	}		
}

// Loop thru all containers using previously designed functions
	// Used after loading the page
function startProgram(questionDivs){
	for(let i = 0; i < questionDivs.length; i++){
		// use current container to generate questions and push it to array
		rolledAudioVisualObjects.push(updateAudioVisualMediaInformation(questionDivs[i]));
		// pass to addMedia function only current iteration of
		addMedia(rolledAudioVisualObjects[i], questionDivs[i]);
		toggleColor(questionDivs[i]);
	}
}

// Highlight clicked answer - Apply function to each square in container
function toggleColor(container){
	let answerImage = container.querySelectorAll("img")
	for(let i = 0; i < answerImage.length; i++ ){
		answerImage[i].classList.remove("check");
		answerImage[i].addEventListener("click", function(){
			removeToggledColor(answerImage);
			this.classList.add("check");
		})
	}
}

// Remove highlight if other picture is clicked
function removeToggledColor(answerImage){
	for(let e = 0; e < answerImage.length; e++){
		answerImage[e].classList.remove("check");
	}
}

// Apply rolled media to their DOM objects
function addMedia(rolledAudioVisualObject, container){
	rolledAudioVisualObject["box1"].src =  rolledAudioVisualObject["rolledMedia"][0]["visual"];
	rolledAudioVisualObject["box2"].src =  rolledAudioVisualObject["rolledMedia"][1]["visual"];
	rolledAudioVisualObject["box3"].src =  rolledAudioVisualObject["rolledMedia"][2]["visual"];

	// Adding sound to play button
	let playButton = container.querySelector(".play");
	playButton.addEventListener("click", function(){
		rolledAudioVisualObject["winnerObject"]["audio"].play()
	})
}

// Combine rolled objects with DOM objects for easy applying letter
 function updateAudioVisualMediaInformation(containerQuestion) {
 	let questionsBoxes = containerQuestion.querySelectorAll("img");
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

// functions run at start
hideNotUsedQuestions();
startProgram(questionDivs);
addFunctionsToFinishButton();









