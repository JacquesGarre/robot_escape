import GridCoordinates from "./grid_coordinates";
import ElevatorConfig from "./interface/elevator_config";
import Level from "./level";
import LevelObject from "./level_object";
import LevelObjectType from "./level_object_type";
import Robot from "./robot";

export default class Elevator extends LevelObject {

    coordinates: GridCoordinates;

    static SPEED = 0.65;
    static MAX_HEIGHT = 50;

    playingSound: boolean = false; // TODO: Nothing to do here, have a state "moving" or not, then play the sound in infrastructure

    constructor(config: ElevatorConfig) {
        super({
            x: config.x,
            z: config.z,
            width: Level.TILESIZE,
            height: 0
        })
        this.type = LevelObjectType.ELEVATOR
        this.coordinates = new GridCoordinates(config.x, config.z);
    }

    goUp(robot: Robot) {
        if (this.hasReachedTop()) {
            return;
        }
        this.playSound(); // TODO : Nothing to do here, should be in infra layer
        robot.center.y += Elevator.SPEED
        this.setHeight(this.height + Elevator.SPEED) // TODO: Fix this ugly thing
    }

    setHeight(newHeight: number) {
        this.center.y = newHeight / 2;
        this.height = newHeight;
    }

    hasReachedTop() {
        return this.height >= Elevator.MAX_HEIGHT;
    }

    
    playSound() { // TODO: Move that to infra 
        if(this.playingSound) {
            return;
        }
        this.playingSound = true;
        const audio = new Audio('assets/sounds/elevator.mp3');
        audio.volume = 0.1;
        audio.play().catch(error => {
            console.error('Error playing sound:', error);
        });
    }
}
