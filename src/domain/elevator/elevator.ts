import Position from "../shared/position";

export default class Elevator {

    position: Position
    height: number

    constructor(position: Position, height: number) {
        this.position = position
        this.height = height
    }

    goUp() {
        if (this.height > 50) {
            return true;
        }
        this.height += 0.2
        return false;
    }

}