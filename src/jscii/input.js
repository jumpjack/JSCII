// This stores whether or not the key is being held down right now
var keys = [];
// This stores whether or not the key was being held *last* frame
var keysLast = [];

window.addEventListener("keydown", function(event) {
	keys[event.key] = true;
});

window.addEventListener("keyup", function(event) {
	keys[event.key] = false;
});

function updateKeys() {
	// Note: JavaScript is a little weird in it's memory management,
	// 		So I have to do this 'Object.assign({})' thing to copy the array
	//		instead of make a reference to it
	keysLast = Object.assign({}, keys);
}

// "Is the key being held *right now*"
function keyDown(key) {
	return keys[key];
}

// "Was the key held last frame?"
function keyUp(key) {
	return !keys[key];
}

// "Was the key *just* pressed this frame?"
function keyJustDown(key) {
	return keys[key] && !keysLast[key];
}

// "Was the key just released this frame?"
function keyJustUp(key) {
	return !keys[key] && keysLast[key];
}