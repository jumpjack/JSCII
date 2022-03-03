function toCharIndex(char) {
	switch(char) {
		case "@": return AT;
		case "A": return A;
		case "B": return B;
		case "C": return C;
		case "D": return D;
		case "E": return E;
		case "F": return F;
		case "G": return G;
		case "H": return H;
		case "I": return I;
		case "J": return J;
		case "K": return K;
		case "L": return L;
		case "M": return M;
		case "N": return N;
		case "O": return O;
		case "P": return P;
		case "Q": return Q;
		case "R": return R;
		case "S": return S;
		case "T": return T;
		case "U": return U;
		case "V": return V;
		case "W": return W;
		case "X": return X;
		case "Y": return Y;
		case "Z": return Z;
		case "[": return LEFT_SQUARE_BRACKET;
		case "]": return RIGHT_SQUARE_BRACKET;
		case " ": return SPACE;
		case "!": return EXCLAMATION;
		case "\"": return QUOTE;
		case "#": return HASH;
		case "$": return DOLLAR;
		case "%": return MODULUS;
		case "&": return AMPERSAND;
		case "'": return APOSTROPHE;
		case "(": return LEFT_PAREN;
		case ")": return RIGHT_PAREN;
		case "*": return ASTERISK;
		case "+": return PLUS;
		case ",": return COMMA;
		case "-": return HYPHON;
		case ".": return PERIOD;
		case "/": return FWD_SLASH;
		case "0": return ZERO;
		case "1": return ONE;
		case "2": return TWO;
		case "3": return THREE;
		case "4": return FOUR;
		case "5": return FIVE;
		case "6": return SIX;
		case "7": return SEVEN;
		case "8": return EIGHT;
		case "9": return NINE;
		case ":": return COLON;
		case ";": return SEMICOLON;
		case "<": return LESS_THAN;
		case "=": return EQUAL;
		case ">": return GREATER_THAN;
		case "?": return QUESTION;
		case "|": return VERTICAL_LINE;
		default: return char;
	}
}

class Font {
	constructor() {
		this.image = loadImage("res/commodore64_petscii.png");
	}

	renderChar(char, x, y, fgColor, bgColor) {
		if(!CAMERA.tileInView(x, y))
			return;
		context.fillStyle = bgColor;
		context.fillRect(x * (TILE_SIZE + 1), y * (TILE_SIZE + 1), TILE_SIZE, TILE_SIZE);
		context.drawImage(this.image, toCharIndex(char) * (TILE_SIZE + 1), COLORS.indexOf(fgColor) * (TILE_SIZE + 1), TILE_SIZE, TILE_SIZE, x * (TILE_SIZE + 1), y * (TILE_SIZE + 1), 8, 8);
	}

	renderText(text, x, y, fgColor, bgColor) {
		text = text.toUpperCase();
		for(var i = 0; i < text.length; i++)
			this.renderChar(text[i], x + i, y, fgColor, bgColor);
	}

	renderArray(array, x, y, fgColor, bgColor) {
		for(var i = 0; i < array.length; i++)
			this.renderChar(array[i], x + i, y, fgColor, bgColor);
	}
}

const FONT = new Font();