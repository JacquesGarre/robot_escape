import Position from "../shared/position";

export default class Enemy {

    name: string
    position: Position;
    animation: string;
    rotation: number;

    constructor(position: Position, name: string, rotation: number) {
        this.name = name;
        this.position = position;
        this.animation = 'Idle';
        this.rotation = rotation;
    }

}