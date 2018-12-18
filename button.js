let questionNumberInput = document.getElementById("numberOfQuestions");
let questionNumberValue = questionNumberInput.value
let questionNumberButtonDown = document.getElementById("number-button-down");
let questionNumberButtonUp = document.getElementById("number-button-up");


questionNumberButtonUp.addEventListener("click", function(){
	questionNumberInput.value =  (Number(questionNumberInput.value) + 1);
})

questionNumberButtonDown.addEventListener("click", function(){
	questionNumberInput.value =  (Number(questionNumberInput.value) - 1);
})



