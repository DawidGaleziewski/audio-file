var testArray = ["a","b","c","d","e","f","g"];

function rollRandom(){
	var newArray = [];

	for(var i = 0; i < 7; i++){
		newArray.push(testArray[random(6)])
	}

	return newArray
}

function random(howMany) {
	return Math.floor((Math.random() * howMany) + 0);
}

// duplicate control
// make sure that if the element exists in array, it should be rolled again

function rollControl(array, item){
// 1 take rolled element and store it in variable
var rolledItem = item;

// 2 compare this element with each element existing in array
	for(var i = 0; i < array.length; i++){
		console.log(i)
		console.log(rolledItem)
		if (array[i] === rolledItem){
			// 3. if it exists reset the loop and roll new element
			rolledItem = testArray[random(6)];
			i = 0;
		} 
		return rolledItem;
	}
}

// works!