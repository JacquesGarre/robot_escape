import Position from "../shared/position";

export default class Elevator {

    position: Position
    height: number
    width: number

    constructor(position: Position, height: number, width: number) {
        this.position = position
        this.height = height
        this.width = width
    }

    goUp() {
        if (this.height > 45) {
            return true;
        }
        this.height += 0.2
        return false;
    }

}