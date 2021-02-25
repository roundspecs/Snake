var unit = 20, // size of each square of the snake
    i = unit,
    score = 0;
var rectangle = {
    x: unit,
    y: unit
};
var cnvs = { // size of the canvas
    x: 900, // x-coordinate for the canvas
    y: 900  // y-coordinate for the canvas
};
var speed = {
    x: 0,
    y: 0
};
var apple = {
    x: 0,
    y: 0
};
var apple1 = {
    x: 0,
    y: 0
};
state = true;
state1 = true;
on1 = true;
var tailX = [];
var tailY = [];
var i;

function setup() {
    createCanvas(cnvs.x, cnvs.y);
    frameRate(12); // slows down the snake and gives a arcade game look
    background(100);
    // as the setup funtion runs only for once when the game is started, this line below will be executed only for once when the game starts.......this code will pop up a new window that will display the rules to play the game.
    alert("Game rules:\n1.Your score will be deducted by 1 if you eat the blue apple or touch the border.\n2.Your score will be increased by 1 if you eat the red apple.\n3.The length of the snake represents your score. Try not to score less than 2.\n4.The game will be over if you score less than 0.\nInstructions:\nUse the arrow keys on you key board or the controller at the bottom-right of the\nscreen to move the snake.\nStart the game?\n");
}

function draw() {
    background(80);
    score_plus();
    drawApples(apple.x, apple.y, 255, 0, 0);
    score_minus();
    drawApples(apple1.x, apple1.y, 0, 0, 255);
    snake(rectangle.x, rectangle.y);
    move();
    returning();
    border();
    Score();
    arrows();
    arrowMove();
    gameOver();
    // drawLines();
}

function snake(x, y) {
    fill(0);
    for (i = 0; i <= score; i += 1) {
        rect(tailX[i], tailY[i], unit, unit);
    }
    for (i = score; i >= 1; i--) {
        tailX[i] = tailX[i - 1];
        tailY[i] = tailY[i - 1];
    }
    tailX[0] = rectangle.x;
    tailY[0] = rectangle.y;
    rect(x, y, unit, unit);
    rectangle.x += speed.x;
    rectangle.y += speed.y;
}

function border() {
    rectMode(CORNER); // makes a border around inside the canvas
    fill(30, 102, 198); // color of the border
    noStroke();
    rect(0, 0, unit, cnvs.y);
    rect(0, 0, cnvs.x, unit);
    rect(cnvs.x, 0, -unit, cnvs.y);
    rect(cnvs.x, cnvs.y, -cnvs.x, -unit);
}

function move() { // moving the snake with the key-pad
    if (keyIsPressed) {
        if (keyCode === UP_ARROW) {
            speed.y = -unit;
            speed.x = 0;
        } else if (keyCode === DOWN_ARROW) {
            speed.y = unit;
            speed.x = 0;
        } else if (keyCode === LEFT_ARROW) {
            speed.x = -unit;
            speed.y = 0;
        } else if (keyCode === RIGHT_ARROW) {
            speed.x = unit;
            speed.y = 0;
        } else {
            speed.x = 0;
            speed.y = 0;
        }
    }
}

function returning() { // when the snake touches the border it comes back from the opposite border and the score is deducted by 1
    if (rectangle.x < unit) {
        rectangle.x = cnvs.x - unit * 2;
        score--;
    } else if (rectangle.x > cnvs.x - unit * 2) {
        rectangle.x = unit;
        score--;
    }
    if (rectangle.y < unit) {
        rectangle.y = cnvs.y - unit * 2;
        score--;
    } else if (rectangle.y > cnvs.y - unit * 2) {
        rectangle.y = unit;
        score--;
    }
}

function drawLines() {
    strokeWeight(2);
    stroke(75);
    for (i = unit; i < cnvs.x; i += unit) { // verical lines
        line(i, unit, i, cnvs.y - unit);
    }
    for (i = unit; i < cnvs.y; i += unit) { // horizontal lines
        line(unit, i, cnvs.x - unit, i);
    }
}

function drawApples(x, y, r, g, b) {
    noStroke();
    ellipseMode(CORNER);  // this is a special function......google it
    fill(r, g, b);
    ellipse(x + 1, y + 1, unit - 1, unit - 1);  // creates a circle 1 pixel smaller than the size of the snake.
}

function applePosX() {  // returns a new position for apple's x coordinate
    return floor(random(1, cnvs.x / unit - 1)) * unit;
}

function applePosY() {  // returns a new position for apple's y coordinate
    return floor(random(1, cnvs.y / unit - 1)) * unit;
}

function Score() {
    fill(0, 255, 255); // color of the score
    textSize(24); // text size of the score
    text("Scrore:" + score, cnvs.x - 120, 20); // displays the word, 'Score' and the score after it
}

function score_plus() {
    if (state || rectangle.x === apple.x && rectangle.y === apple.y) {
        state = false;
        apple.x = applePosX(); // new position of the red apple - changing x
        apple.y = applePosY(); // new position of the red apple - changing y
        score++; // increases the score by 1
    }
}

function score_minus() {
    if (state1 || rectangle.x === apple1.x && rectangle.y === apple1.y) {
        state1 = false;
        apple1.x = applePosX(); // new position of the blue apple - changing x
        apple1.y = applePosY(); // new position of the blue apple - changing y
        score--; // decreases the score by 1
    }
}

function arrows() { // this function is useless......i made it so that the player can play the game with touch screen device
    fill(255, 50); // color of the moving pad
    noStroke();
    rect(cnvs.x - unit * 4, cnvs.y - unit * 4, unit, unit);
    triangle(cnvs.x - unit * 3, cnvs.y - unit * 4, cnvs.x - unit * 3, cnvs.y - unit * 3, cnvs.x - unit * 2, cnvs.y - unit * 3.5);
    rect(cnvs.x - unit * 6, cnvs.y - unit * 4, unit, unit);
    triangle(cnvs.x - unit * 6, cnvs.y - unit * 4, cnvs.x - unit * 6, cnvs.y - unit * 3, cnvs.x - unit * 7, cnvs.y - unit * 3.5);
    rect(cnvs.x - unit * 5, cnvs.y - unit * 5, unit, unit);
    triangle(cnvs.x - unit * 5, cnvs.y - unit * 5, cnvs.x - unit * 4, cnvs.y - unit * 5, cnvs.x - unit * 4.5, cnvs.y - unit * 6);
    rect(cnvs.x - unit * 5, cnvs.y - unit * 3, unit, unit);
    triangle(cnvs.x - unit * 5, cnvs.y - unit * 2, cnvs.x - unit * 4, cnvs.y - unit * 2, cnvs.x - unit * 4.5, cnvs.y - unit);
}

function arrowMove() { // this function allows the player to move the snake with the arrow pad....on the down-right corner
    // these long conditions below represents the arrow....in short if the mouse hovers on the left arrow go left,if the mouse hovers on the up arrow go up, and so on... 
    if (mouseX >= cnvs.x - unit * 5 && mouseX <= cnvs.x - unit * 4 && mouseY <= cnvs.y - unit * 4 && mouseY >= cnvs.y - unit * 6) {
        speed.y = -unit;
        speed.x = 0;
    } else if (mouseX >= cnvs.x - unit * 5 && mouseX <= cnvs.x - unit * 4 && mouseY <= cnvs.y - unit && mouseY >= cnvs.y - unit * 3) {
        speed.y = unit;
        speed.x = 0;
    } else if (mouseX >= cnvs.x - unit * 7 && mouseX <= cnvs.x - unit * 5 && mouseY <= cnvs.y - unit * 3 && mouseY >= cnvs.y - unit * 4) {
        speed.x = -unit;
        speed.y = 0;
    } else if (mouseX >= cnvs.x - unit * 4 && mouseX <= cnvs.x - unit * 2 && mouseY <= cnvs.y - unit * 3 && mouseY >= cnvs.y - unit * 4) {
        speed.x = unit;
        speed.y = 0;
    }
}

function gameOver() {
    if (score < 0 || tail_touch()) {
        fill(207, 80, 80);
        textSize(cnvs.y / 10);
        text("Game Over", cnvs.x / 5, cnvs.y / 2 - unit * 2);
        rectangle.x = cnvs.x - unit * 5;
        rectangle.y = cnvs.y - unit * 4;
        apple.x = 0;
        apple1.x = 0;
        on1 = false;
    }
}

function tail_touch() {
    for (i = 0; i <= score + 1; i += 1) {
        var tempX = tailX[i];
        var tempY = tailY[i];
        if (rectangle.x === tempX && rectangle.y === tempY && on1 === false) {
            score = -1
            gameOver()
            break
        }
    }
}
