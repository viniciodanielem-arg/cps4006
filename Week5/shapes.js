// ***************** SHAPE ***************** //

function Shape(name) {
    this.name = name;
}

Shape.prototype.calculateArea = function() {
    return 0;
};

Shape.prototype.displayInfo = function() {
    console.log(`Name: ${this.name}\nArea: ${this.calculateArea()}`);
};


// ***************** RECTANGLE ***************** //

function Rectangle(name, width, height) {
    Shape.call(this, name);
    this.width = width;
    this.length = height;
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.calculateArea = function() {
    return this.width * this.height;
};



// ***************** CIRCLE ***************** //

function Circle(name, radius) {
    Shape.call(this, name);
    this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.calculateArea = function() {
    return Math.PI * this.radius ** 2
};






// ***************** SQUARE ***************** //

function Square(name, side) {
    Rectangle.call(this, name, side, side);
    this.side = side;
}

Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;

Square.prototype.calculateArea = function() {
    return this.side ** 2;
};

// ***************** TESTING ***************** //

const rect = new Rectangle("Rectangle 1", 5, 10);
const circle = new Circle("Circle 1", 7);
const square = new Square("Square 1", 4);

rect.displayInfo();
circle.displayInfo();
square.displayInfo();




