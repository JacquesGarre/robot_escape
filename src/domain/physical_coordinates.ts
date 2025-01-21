export default class PhysicalCoordinates {  // TODO: rename to 3dCoordinates? -> it should be composed of 2dCoordinates / GridCoordinates?! those are obviously linked
    
    x: number;  // TODO: Value objects.
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

}
