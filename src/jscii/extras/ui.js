class PanelRenderer extends Renderer {
	constructor(entity, layer = "ui", size = vOne(), fgColor = WHITE, bgColor = BLACK) {
		super(entity, layer, fgColor, bgColor);
		this.size = size;
	}

	render(level) {
		for(var y = 0; y < this.size.y; y++){
			for(var x = 0; x < this.size.x; x++) {
				var char = SPACE;

				if(x == 0) {
					char = LEFT_VERTICAL_LINE_3;
					if(y == 0)
						char = FWD_SLASH;
					if(y == this.size.y - 1)
						char = BACK_DIAGONAL_LINE;
				} else if(x == this.size.x - 1) {
					char = RIGHT_VERTICAL_LINE_3;
					if(y == 0)
						char = BACK_DIAGONAL_LINE;
					if(y == this.size.y - 1)
						char = FWD_SLASH;
				} else {
					if(y == 0)
						char = TOP_HORIZONTAL_LINE_3;
					if(y == this.size.y - 1)
						char = BOTTOM_HORIZONTAL_LINE_3;
				}

				FONT.renderChar(char, this.entity.position.x + x, this.entity.position.y + y, this.fgColor, this.bgColor);
			}
		}
	}
}

class TextRenderer extends Renderer {
	constructor(entity, layer = "ui", text = "", fgColor = WHITE, bgColor = BLACK) {
		super(entity, layer, fgColor, bgColor);
		this.text = text;
	}

	render(level) {
		FONT.renderText(this.text, this.entity.position.x, this.entity.position.y, this.fgColor, this.bgColor);
	}
}

class Text extends Entity {
	constructor(id = "text", position = vZero(), text = "", fgColor = WHITE, bgColor = BLACK, layer = "ui", tags = ["ui"]) {
		super(id, position, tags);
		this.renderer = new TextRenderer(this, layer, text, fgColor, bgColor);
	}

	render(level) {
		this.renderer.render(level);
	}
}