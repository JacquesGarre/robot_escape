import Position from "../shared/position";

export default class Text {

    position: Position;
    content: string;
    color: number;

    constructor(position: Position, content: string, color: number) {
        this.position = position;
        this.content = content;
        this.color = color;
    }

}