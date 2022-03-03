class WorldGenerator {
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}

	generate() {
		throw new Error("Cannot generate with a 'WorldGenerator'. You must extend this class");
	}
}

class DungeonGenerator extends WorldGenerator {
	constructor(tilemap, minRoomSize = vector2(8, 8), maxRoomSize = vector2(16, 16), maxTries = 50, floorTiles = [1, 2], wallTile = 3, tunnelTile = 4, posOffset = vOne(), sizeOffset = vZero()) {
		super(tilemap.tiles[0].length, tilemap.tiles.length);
		this.tilemap = tilemap;
		this.minRoomSize = minRoomSize;
		this.maxRoomSize = maxRoomSize;
		this.maxTries = maxTries;
		this.floorTiles = floorTiles;
		this.wallTile = wallTile;
		this.tunnelTile = tunnelTile;
		this.posOffset = posOffset;
		this.sizeOffset = sizeOffset;
		this.tries = 0;
		this.rooms = [];
	}

	createRoom() {
		const rect = new Rect(
			vector2(
				Math.floor(randomRange(this.posOffset.x, this.width - this.maxRoomSize.x - this.sizeOffset.x)),
				Math.floor(randomRange(this.posOffset.y, this.height - this.maxRoomSize.y - this.sizeOffset.y))
			),
			vector2(
				Math.floor(randomRange(this.minRoomSize.x, this.maxRoomSize.x)),
				Math.floor(randomRange(this.minRoomSize.y, this.maxRoomSize.y))
			)
		);
		for(const room of this.rooms)
			if(room.overlaps(new Rect(rect.position.minus(1), rect.size.plus(2))))
				return;

		for(var y = 0; y < rect.size.y; y++) {
			for(var x = 0; x < rect.size.x; x++) {
				var tile = randomInArray(this.floorTiles);

				if(x == 0
				|| y == 0
				|| x == rect.size.x - 1
				|| y == rect.size.y - 1)
					tile = this.wallTile;

				this.tilemap.tiles[y + rect.position.y][x + rect.position.x] = tile;
			}
		}

		this.rooms.push(rect);
	}

	generateRooms(tries) {
		while(this.tries < this.maxTries) {
			this.createRoom();
			this.tries += 1;
		}
	}

	createHorizontalTunnel(x1, x2, y) {
		for(var x = Math.min(x1, x2); x <= Math.max(x1, x2); x++)
			if(!this.tilemap.getTile(x, y).hasTag("floor"))
				this.tilemap.tiles[y][x] = this.tunnelTile;
	}

	createVerticalTunnel(y1, y2, x) {
		for(var y = Math.min(y1, y2); y <= Math.max(y1, y2); y++)
			if(!this.tilemap.getTile(x, y).hasTag("floor"))
				this.tilemap.tiles[y][x] = this.tunnelTile;
	}

	generateTunnels() {
		var lastPos = this.rooms[0].center().rounded();
		var doneRooms = 1;
		while(doneRooms < this.rooms.length) {
			var roomTo = this.rooms[doneRooms];
			var positionTo = roomTo.center().rounded();

			if(flipCoin()) {
				this.createHorizontalTunnel(lastPos.x, positionTo.x, lastPos.y);
				this.createVerticalTunnel(lastPos.y, positionTo.y, positionTo.x);
			} else {
				this.createVerticalTunnel(lastPos.y, positionTo.y, lastPos.x);
				this.createHorizontalTunnel(lastPos.x, positionTo.x, positionTo.y);
			}

			lastPos = positionTo;

			doneRooms += 1;
		}
	}

	placePlayer() {
		const room = randomInArray(this.rooms);
		return room.center().rounded();
	}

	generate() {
		this.generateRooms();
		this.generateTunnels();

		return this.placePlayer();
	}
}