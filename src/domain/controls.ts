export default class Controls {

    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;

    constructor() {
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
    }

    pressUp() {
        this.up = true;
    }

    pressDown() {
        this.down = true;
    }

    pressLeft() {
        this.left = true;
    }

    pressRight() {
        this.right = true;
    }

    releaseUp() {
        this.up = false;
    }

    releaseDown() {
        this.down = false;
    }

    releaseLeft() {
        this.left = false;
    }

    releaseRight() {
        this.right = false;
    }

}