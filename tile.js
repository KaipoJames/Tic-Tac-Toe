export class Tile {
    constructor(pos) {
        this.isMarked = false;
        this.element = "";
        this.position = "tile" + pos;
    }
    mark() {
        this.isMarked = true;
    }
    setElement(el) {
        if (this.isMarked === false) {
            this.element = el;
            this.mark();
        }
    }
}