// This file won't have documentation / comments for a little while, because I'm still figuring
// out how I want to structure it

class Action {
	constructor(entity) {
		this.entity = entity;
		this.performed = false;
	}

	perform() {
		throw new Error("Cannot call perform on 'Action' You must extend this class")
	}
}

class NoAction extends Action {
	constructor() {
		super(null);
	}

	perform() {
		if(this.performed)
			throw new Error("Cannot call same Action object twice");
		this.performed = true;
	}
}

class MoveAction extends Action {
	constructor(entity, level, direction = vZero()) {
		super(entity);
		this.level = level;
		this.direction = direction;
	}

	perform() {
		if(this.performed)
			throw new Error("Cannot call same Action object twice");
		this.entity.position.add(this.direction);

		if(this.level.tilemap.getTile(this.entity.position.x, this.entity.position.y).tags.includes("solid"))
			this.entity.position.subtract(this.direction);

		this.performed = true;
	}
}