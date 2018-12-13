// array with objects used for test

var engine = [
 {
	audio: "meow.mp3",
	picture: "cat.jpeg"
	},

{
	audio: "woof.mp3",
	picture: "dog.jpeg"
	}
]

// filtering method
	engine.find(obj => {return obj.audio === "woof.mp3"});




