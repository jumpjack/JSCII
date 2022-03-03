// PECS stands for Pseudo-ECS :)

class Entity {
	constructor(id = "", position = vZero(), tags = []) {
		this.id = id;
		this.position = position;
		this.tags = tags;
		this.destroyed = false;
	}

	addTag(tag) {
		if(!this.hasTag(tag))
			tags.push(tag);
	}

	removeTag(tag) {
		this.tags = this.tags.filter(function(value, index, array) {
			return !value == tag;
		});
	}

	hasTag(tag) {
		return this.tags.includes(tag);
	}

	destroy() {
		this.destroyed = true;
	}

	init(level) {}
	update(level) {}
	render(level) {}
}

class Component {
	constructor(entity) {
		this.entity = entity
	}

	init(level) {
		throw new Error("Cannot init an empty Component! You must extend this class");
	}

	update(level) {
		throw new Error("Cannot update an empty Component! You must extend this class");
	}

	render(level) {
		throw new Error("Cannot render an empty Component! You must extend this class");
	}
}

class Renderer extends Component {
	constructor(entity, layer = "default", fgColor = WHITE, bgColor = BLACK) {
		super(entity);
		this.layer = layer;
		this.fgColor = fgColor;
		this.bgColor = bgColor;
	}

	render(level) {
		throw new Error("Cannot render an empty renderer! You must extend this class");
	}
}

class CharRenderer extends Renderer {
	constructor(entity, layer = "default", char = QUESTION, fgColor = WHITE, bgColor = BLACK) {
		super(entity, layer, fgColor, bgColor);
		this.char = char;
	}

	render(level) {
		FONT.renderChar(this.char, this.entity.position.x, this.entity.position.y, this.fgColor, this.bgColor);
	}
}

class ArrayRenderer extends Renderer {
	constructor(entity, layer = "default", array = [QUESTION], fgColor = WHITE, bgColor = BLACK) {
		super(entity, layer, fgColor, bgColor);
		this.array = array;
	}

	render(level) {
		FONT.renderArray(this.array, this.entity.position.x, this.entity.position.y, this.fgColor, this.bgColor);
	}
}

class TwoDArrayRenderer extends Renderer {
	constructor(entity, layer = "default", array = [[QUESTION]], fgColor = WHITE, bgColor = BLACK) {
		super(entity, layer, fgColor, bgColor);
		this.array = array;
	}

	render(level) {
		for(var i = 0; i < this.array.length; i++)
			FONT.renderArray(this.array[i], this.entity.position.x, this.entity.position.y + i, this.fgColor, this.bgColor);
	}
}