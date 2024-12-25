import Elevator from "../elevator/elevator";
import Cube from "../cube/cube";
import DirectionalLight from "../lights/directional_light";
import HemisphereLight from "../lights/hemisphere_light";
import Fog from "./fog";
import Grid from "./grid";
import Ground from "./ground";

export default class Scene {
  
    backgroundColor: number;
    fog: Fog;
    hemisphereLight: HemisphereLight;
    directionalLight: DirectionalLight;
    ground: Ground;
    grid: Grid;
    cubes: Cube[];
    elevator: Elevator;

    constructor(
        backgroundColor: number,
        fog: Fog,
        hemisphereLight: HemisphereLight,
        directionalLight: DirectionalLight,
        ground: Ground,
        grid: Grid,
        cubes: Cube[],
        elevator: Elevator
    ) {
      this.backgroundColor = backgroundColor;
      this.fog = fog;
      this.hemisphereLight = hemisphereLight;
      this.directionalLight = directionalLight;
      this.ground = ground;
      this.grid = grid;
      this.cubes = cubes;
      this.elevator = elevator;
    }

}