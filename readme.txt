app can be viewed at:
https://audio-file-test.herokuapp.com/

To do:
Next:
[] Remove event listener from play button after pressing next and finish
	[] store this function in a variable to use removeEventListener


[x]#Find way to style the input button


[x]Load ony one question at a time
#make code so that it will need only one div, rest should be remembered in the app
#after checking the answer and pressing the next button current question should be evaluated and than new question loaded

Refine js code. according to:
https://github.com/airbnb/javascript
#New features:
[]Roll new media using shuffle button
[]Add new media for animal sounds
[x]Add option to chose number of questions per test

#Endhance:
[x]Make table with results more readable

#Refactor:
[] Javascript refactor
	[x] a) Better naming for variables in js
		Currently in use:

		#containerQuestions
		all question divs
		Better name: 
		questionDivs

		#positionsArray
		rolled questions media
		Responsible for tracking rolled media
		Better name:
		rolledAudioVisualObjects


		#tagLetter
		#tagTracker
		#audioVisualWinners

		#audioVisual
		Description:
		media used in the program
		audioVisualMedia

		#buttonFinish

		#button

		#squares
		:answerImage

		#positions
		#rolledItem


	[x]#1 Change all var variables to clean global variables where possible.
			Important! let cannot be re declared
	[x] b) functions
		listenToFinish()
		addFunctionsToFinishButton

		startProgram
		bootstrapFunctions

		removeToggle
		removeToggledColor

		rememberPositions
		updateAudioVisualMediaInformation

		setWinnerLoser
		setWinningLosingAnswers

		rollQuestionsArray()
		rollAnswersArray

		rollControl
		rollDuplicateControl

	[] Better descriptions

[]Html refacot


