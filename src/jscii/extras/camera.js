class Camera extends Entity {
	constructor(id = "camera", position = vZero(), tags = ["camera"], target = null) {
		super(id, position, tags);
		if(target !== null)
			this.target = target;
	}

	update() {
		if(this.target !== null
		&& this.target !== undefined)
			this.position = this.target.position;
	}

	top() { return this.position.y; }
	bottom() { return this.position.y + SCREEN_HEIGHT; }
	left() { return this.position.x; }
	right() { return this.position.x + SCREEN_WIDTH; }

	tileInView(x, y) {
		return y * TILE_SIZE >= this.top()
			&& y * TILE_SIZE < this.bottom()
			&& x * TILE_SIZE >= this.left()
			&& x * TILE_SIZE < this.right();
	}
}

const CAMERA = new Camera();