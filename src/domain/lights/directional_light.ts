import Position from "../shared/position";

export default class DirectionalLight {
  
    color: number;
    intensity: number;
    position: Position;

    constructor(
        color: number,
        intensity: number,
        position: Position
    ) {
      this.color = color;
      this.intensity = intensity;
      this.position = position;
    }

}