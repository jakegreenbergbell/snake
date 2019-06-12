var s;
var scl = 20;

var food;
var badApple;
var otherBadApples = [];

function setup() {
    var cnv = createCanvas(500, 500);
    cnv.style('position', 'relative');
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2 + 50;
    cnv.position(x, y);
    background(255, 0, 200);
    s = new Snake();
    frameRate(10);
    pickLocationA();
    pickLocationB();
    document.getElementById("score2").style.right = windowWidth/2;
}


function pickLocationA() {
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}

function pickLocationB(){
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    badApple = createVector(floor(random(cols)), floor(random(rows)));
    badApple.mult(scl);
}

function mousePressed() {
    s.total++;
}

var highScore = 0;

function draw() {

    background(51);

    if (s.eat(food)) {
        pickLocationA();
        pickLocationB();
        otherBadApples = [];
    }
    if (s.eatBadApple(badApple)) {
        pickLocationB();
        otherBadApples = [];
    }
    for(var i = 0; i < otherBadApples.length; i++){
        if(s.eatBadApple(otherBadApples[i])){
            pickLocationB();
            otherBadApples = [];
        }
    }
    s.death();
    s.update();
    s.show();
    document.getElementById("score2").innerHTML = "SCORE = " + s.total;
    // document.getElementById("score3").innerHTML = "HIGH-SCORE = " + s.total;
    if(highScore < s.total){
        console.log("entered");
        highScore = s.total;
        document.getElementById("score3").innerHTML = "HIGH SCORE = " + s.total;
    }
    fill(0, 0, 255);
    rect(food.x, food.y, scl, scl);
    fill(255, 0, 100);
    rect(badApple.x, badApple.y, scl, scl);
    for(var i = 0; i < otherBadApples.length; i++){
        fill(255,0,100);
        rect(otherBadApples[i].x,otherBadApples[i].y,scl,scl);
    }
}





function keyPressed() {
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    var oneExtra = createVector(floor(random(cols)), floor(random(rows)));
        oneExtra = oneExtra.mult(scl);
    fill(255, 0, 100);
    rect(oneExtra.x, oneExtra.y, scl, scl);
    otherBadApples.push(oneExtra);
    if (keyCode === 38 && s.yspeed == 0) {
        s.dir(0, -1);
    } else if (keyCode === 40 && s.yspeed == 0) {
        s.dir(0, 1);
    } else if (keyCode === 39 && s.xspeed == 0) {
        s.dir(1, 0);
    } else if (keyCode === 37 && s.xspeed == 0) {
        s.dir(-1, 0);
    }
}