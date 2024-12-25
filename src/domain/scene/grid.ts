export default class Grid {
  
    size: number;
    divisions: number;
    color1: number;
    color2: number;
    opacity: number;

    constructor(
        size: number,
        divisions: number,
        color1: number,
        color2: number,
        opacity: number,
    ) {
      this.size = size;
      this.divisions = divisions;
      this.color1 = color1;
      this.color2 = color2;
      this.opacity = opacity;
    }

}