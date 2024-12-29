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

    direction(): string | null {
        if (this.up) {
            return "up";
        }   
        if (this.down) {
            return "down";
        }   
        if (this.right) {
            return "right";
        }  
        if (this.left) {
            return "left";
        }   
        return null
    }

    arePressed() {
        return this.up || this.down || this.left || this.right;
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