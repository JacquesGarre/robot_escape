import Coordinates from "./coordinates"
import CameraConfig from "./interface/camera_config";

export default class Camera {

    position: Coordinates
    direction: Coordinates

    constructor(config: CameraConfig) {
        this.position = config.position;
        this.direction = config.direction;
    }

    static default(): Camera {
        let position = new Coordinates(
            0, 
            30, 
            -30,
        );
        let direction = new Coordinates(
            0,  
            0, 
            0
        );
        return new Camera({
            position, 
            direction
        });
    }

}