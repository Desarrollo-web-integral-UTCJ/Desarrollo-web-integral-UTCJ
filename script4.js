// Las variables canvas y ctx se utilizan para obtener el lienzo y su contexto en 2D respectivamente.
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
// Las variables x e y representan las coordenadas de la pelota en el lienzo.
let x = 240;
let y = 160;
// Las variables dy y dx indican la dirección de movimiento de la pelota en los ejes y respectivamente.
let dy = 1;
let dx = 1;
// Las variables raquetX y raquetY representan las coordenadas de la raqueta del jugador 1.
let raquetX = 460;
let raquetY = 120;
// Las variables raquet2X y raquet2Y representan las coordenadas de la raqueta del jugador 2.
let raquet2X = 10;
let raquet2Y = 120;
// Las variables downPressed, upPressed, wPressed y sPressed se utilizan para registrar si las teclas de flecha hacia abajo, flecha hacia arriba, "W" y "S" respectivamente están siendo presionadas.
let downPressed = false;
let upPressed = false;
let wPressed = false;
let sPressed = false;
// Las variables raquetDY y raquet2DY se utilizan para controlar el movimiento de las raquetas en los ejes y respectivamente.
let raquetDY = 0;
let raquet2DY = 0;
// Las variables player1Score y player2Score almacenan los puntajes de los jugadores.
let player1Score = 0;
let player2Score = 0;
// La constante maxPoints indica el puntaje máximo requerido para ganar el juego.
const maxPoints = 5;
// La variable gameOver se utiliza para controlar si el juego ha terminado o no.
let gameOver = false;
// Variable para almacenar el ID del intervalo de dibujo
let intervalId;
//letra L
let obstaculoLX = 80;
let obstaculoLY = 250;
//letra C
let obstaculoCX = 320;
let obstaculoCY = 80;

// Los eventos keydown y keyup se agregan al documento para detectar cuando se presionan y sueltan las teclas correspondientes. Estos eventos modifican las variables
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
  if (e.keyCode == 40) {
    downPressed = true;
  } else if (e.keyCode == 38) {
    upPressed = true;
  } else if (e.keyCode == 87) {
    wPressed = true;
  } else if (e.keyCode == 83) {
    sPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.keyCode == 40) {
    downPressed = false;
  } else if (e.keyCode == 38) {
    upPressed = false;
  } else if (e.keyCode == 87) {
    wPressed = false;
  } else if (e.keyCode == 83) {
    sPressed = false;
  }
}
 // La función drawBall dibuja la pelota y las raquetas en el lienzo utilizando el contexto 2D.
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#4ce310";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(raquetX, raquetY, 10, 50);
  ctx.rect(raquet2X, raquet2Y, 10, 50);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();

  // Obstáculo en forma de "L"
  ctx.beginPath();
  ctx.rect(obstaculoLX, obstaculoLY, 50, 10);
  ctx.rect(obstaculoLX, obstaculoLY - 50, 10, 50);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();

// Obstáculo en forma de "C"
ctx.beginPath();
ctx.rect(obstaculoCX - 20, obstaculoCY - 25, 40, 5); // Rectángulo superior
ctx.rect(obstaculoCX - 20, obstaculoCY + 20, 40, 5); // Rectángulo inferior
ctx.rect(obstaculoCX - 20, obstaculoCY - 20, 5, 40); // Rectángulo izquierdo
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

  // Rectángulos para formar la letra "A"
  // ctx.beginPath();
  // ctx.rect(letraLX, letraLY, 10, 50);
  // ctx.rect(letraCX - 20, letraCY, 50, 10);
  // ctx.rect(letraRX, letraRY, 10, 50);
  // ctx.rect(letraPX - 20, letraPY, 50, 10);
  // ctx.fillStyle = "#0095DD";
  // ctx.fill();
  // ctx.closePath();

}

// La función drawTexto dibuja los puntajes de los jugadores en el lienzo.+
function drawTexto() {
  ctx.fillStyle = "red";
  ctx.fillText("Jugador 1: " + player1Score, 0, 10);
  ctx.fillText("Jugador 2: " + player2Score, 380, 10);
}
// La función collisions() verifica las colisiones entre la pelota y las raquetas, así como los límites del lienzo. Actualiza las variables dx y dy en caso de colisiones y maneja los puntajes y reinicios del juego.
function collisions() {
  let distanceX = raquetX - x;
  if (distanceX < 0) {
    distanceX = -distanceX;
  }
  let distanceY = raquetY - y;
  if (distanceY < 0) {
    distanceY = -distanceY;
  }
  if (distanceX < 20 && distanceY < 50) {
    dx = -dx;
  }

  let distance2X = raquet2X - x;
  if (distance2X < 0) {
    distance2X = -distance2X;
  }
  let distance2Y = raquet2Y - y;
  if (distance2Y < 0) {
    distance2Y = -distance2Y;
  }
  if (distance2X < 20 && distance2Y < 50) {
    dx = -dx;
  }

  let distanceLX = obstaculoLX - x;
  if (distanceLX < 0) {
    distanceLX = -distanceLX;
  }
  let distanceLY = obstaculoLY - y;
  if (distanceLY < 0) {
    distanceLY = -distanceLY;
  }
  if (
    (distanceLX < 10 && distanceLY < 50) ||  // Lado izquierdo vertical de letra L
    (distanceLX < 50 && distanceLY < 10) ||  // Lado superior horizontal de letra L
    (distanceLX < 10 && distanceLY > 40 && distanceLY < 90)  // Lado inferior vertical de letra L
  ) {
    dx = -dx;
    dy = -dy;
  }

  let distanceCX = obstaculoCX - x;
  if (distanceCX < 0) {
    distanceCX = -distanceCX;
  }
  let distanceCY = obstaculoCY - y;
  if (distanceCY < 0) {
    distanceCY = -distanceCY;
  }
  if (
    (distanceCX < 20 && distanceCY < 25) || // Lado izquierdo vertical de letra C
    (distanceCX < 20 && distanceCY > 20 && distanceCY < 45) || // Lado superior horizontal de letra C
    (distanceCX > 15 && distanceCX < 40 && distanceCY > 20 && distanceCY < 45) // Lado inferior vertical de letra C
  ) {
    dx = -dx;
    dy = -dy;
  }

  if (y >= 310 || y <= 10) {
    dy = -dy;
  }

        
        if (x < 0) {
        player2Score++;
        x = 240;
        y = 160;
        raquetX = 460;
        raquetY = 120;
        raquet2X = 10;
        raquet2Y = 120;
        raquetDY = 0;
        raquet2DY = 0;
        }
        if (x > 480) {
        player1Score++;
        x = 240;
        y = 160;
        raquetX = 460;
        raquetY = 120;
        raquet2X = 10;
        raquet2Y = 120;
        raquetDY = 0;
        raquet2DY = 0;
        }
}
// La función updateRackets actualiza las coordenadas de las raquetas según las teclas presionadas.
function updateRackets() {
  if (downPressed && raquetY < 240) {
    raquetDY = 2;
  } else if (upPressed && raquetY > 10) {
    raquetDY = -2;
  } else {
    raquetDY = 0;
  }

  if (wPressed && raquet2Y > 10) {
    raquet2DY = -2;
  } else if (sPressed && raquet2Y < 240) {
    raquet2DY = 2;
  } else {
    raquet2DY = 0;
  }

  raquetY += raquetDY;
  raquet2Y += raquet2DY;
}
// La función draw es el ciclo principal del juego. Borra el lienzo, dibuja los elementos, actualiza las posiciones y llama a collisions() para verificar colisiones.
function draw() {
  ctx.clearRect(0, 0, 480, 320);
  drawBall();
  drawTexto();
  updateRackets();
  x += dx;
  y += dy;
  collisions();
  if (!gameOver && (player1Score === maxPoints || player2Score === maxPoints)) {
    dx = 0;
    dy = 0;
    gameOver = true;
    if (player1Score > player2Score) {
        alert("Jugador 1 Gano!");
    } else {
        alert("Jugador 2 Gano!");
    }
}
}
function restartGame() {
  // Reset scores
  player1Score = 0;
  player2Score = 0;
  // Reset posision de pelota
  x = 240;
  y = 160;
  // Reset posisiones de raqueta
  raquetY = 120;
  raquet2Y = 120;
  // Reset ball direction and speed
  dx = 1;
  dy = 1;
  // Reset game over bandera
  gameOver = false;

  clearInterval(intervalId); // Detener el intervalo anterior antes de comenzar uno nuevo
  intervalId = setInterval(draw, 10); // Iniciar un nuevo intervalo de dibujo
}

if (!gameOver && (player1Score === maxPoints || player2Score === maxPoints)) {
  dx = 0;
  dy = 0;
  gameOver = true;
  if (player1Score > player2Score) {
    alert("Jugador 1 Gano!");
  } else {
    alert("Jugador 2 Gano!");
  }
  restartGame();
}

// Finalmente, setInterval se utiliza para llamar a la función draw() cada 10 milisegundos, creando una animación continua del juego.
setInterval(draw, 10);