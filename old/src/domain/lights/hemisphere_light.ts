import Position from "../shared/position";

export default class HemisphereLight {
  
    skyColor: number;
    groundColor: number;
    intensity: number;
    position: Position;

    constructor(
        skyColor: number,
        groundColor: number,
        intensity: number,
        position: Position
    ) {
      this.skyColor = skyColor;
      this.groundColor = groundColor;
      this.intensity = intensity;
      this.position = position;
    }

}