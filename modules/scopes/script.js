var containers = document.querySelectorAll(".container");

function applyToContainers(containers){
	var localContainers = containers
	for(var d = 0; d < localContainers.length; d++){
		var squares = localContainers[d].querySelectorAll(".square")
		toggleColor(squares)
	}
}

function addColor(squares){
	for(var i = 0; i < squares.length; i++ ){
		squares[i].classList.remove("check");
		squares[i].addEventListener("click", function(){
			removeToggle(squares);
			this.classList.add("check");
		})
	}
}

function removeColor(squares){
	for(var e = 0; e < squares.length; e++){
		squares[e].classList.remove("check");
	}
}

applyToContainers(containers);

