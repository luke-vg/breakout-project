var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var chkSide = false; //false = going right, true = going left
var score = 0;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var lives = 3;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 112.5;
var brickHeight = 30;
var brickPadding = 15;
var brickOffsetTop = 45;
var brickOffsetLeft = 45;
var rightPressed = false;
var leftPressed = false;
var ballRadius = 15;
var paddleHeight = 15;
var paddleWidth = 120; 
var paddleX = (canvas.width-paddleWidth) / 2;
var bricks = [];
for (var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1};
    }
}
function test() {
    alert("WAARSCHUWING! De aangeraden browser is FireFox. Andere browsers functioneren mogelijk niet. Er is bovendien muziek aanwezig, zet het geluid maar eens aan!");
    var sound = new Howl({
        src: ['palmtrees.mp3', 'palmtrees.ogg'],
        volume: 0.8
      });

      sound.play();
      testtest();
}
function testtest() {
    getAudioContext().resume();
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
draw();
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key =="Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key =="Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("You win! Congratulations!")
                              
                                           
                          document,location.reload();
                    }
                }
            }
        }
    }
}
function drawScore() {
    ctx.font = "20px Arial"
    ctx.fillStyle = "#0095DD";
    ctx.fillText ("Score: " + score, 8, 20);
}
function drawLives() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 75, 20);
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBricks();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
        if (chkSide == false) {
            chkSide = true;
        }
        else if (chkSide == true) {
            chkSide = false;
        }
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            dy -= 0.35;
            if (chkSide == false) {
                dx += 0.45;
            }
            else if (chkSide == true) {
                dx -= 0.45;
            }
        }
        else{
            lives--;
            if(!lives) {
                alert("Game over");
                document.location.reload();
            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
                chkSide = false;
            }
        }
    }
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 5;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 5;
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD"
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for (var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
            var brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
            var brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}