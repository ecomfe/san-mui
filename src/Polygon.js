class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  noCover() {
    console.log(123);
  }

  calcArea() {
    return this.height * this.width;
  }
}

export default Polygon;
