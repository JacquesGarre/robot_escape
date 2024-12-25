export default class Fog {
  
    color: number;
    near: number;
    far: number;

    constructor(
        color: number,
        near: number,
        far: number
    ) {
      this.color = color;
      this.near = near;
      this.far = far;
    }

}