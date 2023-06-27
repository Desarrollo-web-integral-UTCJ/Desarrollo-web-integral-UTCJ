let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
//-------- Declaracion de variables --------//
let x = 240;
let y = 170;
let dy = 2;
let dx = 1;
let raquetx = 460;
let raquety = 110;
let raquetx2 = 10;
let raquety2 = 110;
let downPressed = false;
let upPressed = false;
let down2 = false;
let up2 = false;
let pausado = false;
let id;
let player1 = 0;
let player2 = 0;
let contador = 0;
// -------- Fin de declaracion de variables --------//

//un escuchador de eventos Callback: pasa una funcion como parametro a otra
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//----Deteccion de teclas -------//
function keyDownHandler(e) {
    //alert(e.keycode);
    if (e.keyCode == 40) {
        downPressed = true;
    }
    if (e.keyCode == 38) {
        upPressed = true;
    }
    if (e.keyCode == 87) {
        down2 = true;
    }
    if (e.keyCode == 83) {
        up2 = true;
    }
}
function keyUpHandler(e) {
    //alert(e.keycode);
    if (e.keyCode == 40) {
        downPressed = false;
    }
    if (e.keyCode == 38) {
        upPressed = false;
    }
    if (e.keyCode == 87) {
        down2 = false;
    }
    if (e.keyCode == 83) {
        up2 = false;
    }
}
//-----fin de deteccion de presion de teclas----//

//-----Dibujar la pelota-----/
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
//-----Fin de dibujar pelota------//

//------Dibujar raqueta----//
function drawraquet() {
    ctx.beginPath();
    ctx.rect(raquetx2, raquety2, 10, 60); //raqueta izquierda
    ctx.rect(raquetx, raquety, 10, 60);//lado derecho
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//------Colisiones-----//
function colitions() {
    let d = 0;
    let d2 = 0;
    let d3 = 0;
    let distancex = (raquetx + 5) - x;
    let disx = (raquetx) -x;
    let distax = (raquetx + 10) - x;
    if(distax < 0){
        distax = -distax;
    }
    if(disx < 0){
        disx = -disx;
    }
    if (distancex < 0) {
        distancex = -distancex;
    }
    //distancia en y
    let distancey = (raquety + 30) - y;
    let disy = (raquety) - y;
    let distay = (raquety + 10) - y;
    if (distay < 0){
        distay = -distay;
    }
    if(disy < 0){
        disy = -disy;
    }
    if (distancey < 0) {
        distancey = -distancey;
    }
    d = (distancex * distancex) + (distancey * distancey);
    d = Math.sqrt(d);
    d2 = (disx * disx) + (disy * disy);
    d2 = Math.sqrt(d2);
    d3 = (distax * distax) + (distay * distay);
    d3 = Math.sqrt(d3);
    if (d < 21) {
        dx = -dx;
    }
    if(d2 < 21){
        dx = -dx;
    }
    if(d3 < 21){
        dx = -dx;
    }
    //colicion con raqueta izquierda
    let di = 0;
    let di2 = 0;
    let di3 = 0;
    let distancex2 = (raquetx2) - x;
    let distax2 = (raquetx2 + 5) - x;
    let disx2 = (raquetx2 + 10) - x;
    if (distancex2 < 0) {
        distancex2 = -distancex2;
    }
    if(distax2 < 0){
        distax2 = -distax2
    }
    if(disx2 < 0){
        disx2 = -disx2;
    }
    //distancia en y
    let distancey2 = (raquety2) - y;
    let distay2 = (raquety2 + 30) - y;
    let disy2 = (raquety2 + 10) - y;
    if(distancey2 < 0){
        distancey2 = -distancey2;
    }
    if(distay2 < 0){
        distay2 = -distay2;
    }
    if(disy2 < 0){
        disy2 = -disy2;
    }
    di = (distancex2 * distancex2) + (distancey2 * distancey2);
    di = Math.sqrt(di);
    di2 = (distax2 * distax2) + (distay2 * distay2);
    di2 = Math.sqrt(di2);
    di3 = (disx2 * disx2) + (disy2 * disy2);
    di3 = Math.sqrt(di3);
    if(di < 21){
        dx = -dx;
    }
    if(di2 < 21){
        dx = -dx;
    }
    if(di3 < 23){
        dx = -dx;
    }
}

//----- funcion de pausar el juego------//
function pausa(){
    pausado = !pausado;
    boton = document.getElementById("btn");
    if(pausado){
        x = 240;
        y = 170;
        boton.style.display="block";
        clearInterval(id);
    }else{
        boton.style.display="none";
        id = setInterval(draw,10);
        contador = 0;
    }
}
//---- fin de pausa-----//

//---funcion resetear----//
function reset(){
    player1 = 0;
    player2 = 0;
    x = 240;
    y = 170;
    raquetx = 460;
    raquety = 110;
    raquetx2 = 10;
    raquety2 = 110;
    id = setInterval(draw,10);
}
//--Fin de restar-----//

//----Dibujar texto----//
function drawTexto() {
    ctx.fillStyle = "red";
    var fontSize = 20; // Tamaño de fuente en píxeles
    ctx.font = fontSize + "px Arial";
    ctx.fillText("Player 1: " + player1, 0, 16)
    ctx.fillText("Player 2: " + player2, 370, 16)
}
//-----fin de dibujar texto----//

//----marcador al anotar cada gol----//
function marcador(p){
    ctx.fillStyle = "red";
    var fontSize = 20; // Tamaño de fuente en píx
    ctx.font = fontSize + "px Arial";
    ctx.fillText("Punto para player"+p, 155, 170);
}
//-----fin de marcador ----//

//---- marcador final ----//
function ganador(p,mar1,mar2){
    ctx.fillStyle = "red";
    var fontSize = 20; // Tamaño de fuente en píx
    ctx.font = fontSize + "px Arial";
    ctx.fillText("El ganador es el player"+p, 120, 140);
    ctx.fillText("Puntaje Final", 165, 160);
    ctx.fillText("Player1", 120, 190);
    ctx.fillText("Player2", 265, 190);
    ctx.fillText(mar1, 150, 220);
    ctx.fillText(mar2, 295, 220);
}
//-----fin de marcador final---//

//---- detener el juego por completo----//
function stop(){
    clearInterval(id);
}
//---fin de stop---//

//---- Iniciales de mi nombre---//
function firma(){
    ctx.beginPath();
    ctx.rect(110, 200, 60, 10); // (x,y,width,heigth); letra C
    ctx.rect(110, 200, 10, 60); // (x,y,width,heigth); letra C
    ctx.rect(110, 260, 60, 10); // (x,y,width,heigth); letra C
   
    ctx.rect(370, 60, 10, 60); // (x,y,width,heigth); Letra L
    ctx.rect(370, 110, 45, 10); // (x,y,width,heigth); Letra L
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
//----fin de mis iniciales----//

//----coliciones para mis iniciales letra C----//
function colicion2(){
    //---colisiones para letra C ---//
    let distancia1 = 0;
    let distancia2 = 0;
    let distancia3 = 0;
    let dcentro = 0;
    let distancia4 = 0;
    let distancia5 = 0;
    let distancia6 = 0;
    //primer colicion en esquina superior izquierda de letra c
    let dsx = (110) - x;
    if(dsx < 0){
        dsx = -dsx;
    }
    let dsy = (200)-y;
    if(dsy < 0){
        dsy = -dsy;
    }
    distancia1 = (dsx * dsx) + (dsy * dsy);
    distancia1 = Math.sqrt(distancia1);
    //---primer colicion en esquina superior izquierda de letra c----//
    if(distancia1 < 23){
        dx = -dx;
    }
    //---segunda colicion de letra c---//
    let dssx = (130)- x;
    if(dssx < 0){
        dssx = -dssx;
    }
    distancia2 = (dssx * dssx) + (dsy * dsy);
    distancia2 = Math.sqrt(distancia2);
    if(distancia2 < 23){
        dy = -dy;
    }
    //----- tercer punto------//
    let dsssx = (170) - x;
    if(dsssx - 0){
        dsssx = -dsssx;
    }
    distancia3 = (dsssx * dsssx) + (dsy * dsy);
    distancia3 = Math.sqrt(distancia3);
    if(distancia3 < 23){
        dy = -dy;
    }
    //-----punto central ----//
    let dssy = (230) - y;
    if(dssy < 0){
        dssy = -dssy;
    }
    dcentro = (dsx * dsx) + (dssy * dssy);
    dcentro = Math.sqrt(dcentro);
    if(dcentro < 23){
        dx = -dx;
    }
    //---punto inferior----//
    let dsssy = (270) - y;
    if(dsssy < 0 ){
        dsssy = -dsssy;
    }
    distancia4 = (dsx * dsx) + (dsssy * dsssy);
    distancia4 = Math.sqrt(distancia4);
    if(distancia4 < 23){
        dx = -dx;
    }
    //----punto central inferior----//
    distancia5 = (dssx * dssx) + (dsssy * dssy);
    distancia5 = Math.sqrt(distancia5);
    if(distancia5 < 23){
        dy = -dy;

    }
    //----punto inferior derecho---//
    distancia6 = (dsssx * dsssx) + (dsssy * dsssy);
    distancia6 = Math.sqrt(distancia6);
    if(distancia6 < 23){
        contador = contador +1;
        dx = -dx;
        console.log(contador);
        if(contador > 2){
            dx = -dx;
            
        }
    }
}
//----fin de coliciones para iniciales de letra C---//

//---Coliciones para iniciales de letra L----//
function colicion3(){
    let dist1 = 0;
    let dist2 = 0;
    let dist3 = 0;
    let dist4 = 0;
    let dist5 = 0;
    //-----Primer colicion en letra L-----//
    let ldsx = (370) - x;
    if(ldsx < 0){
        ldsx = -ldsx;
    }
    let ldsy = (60) - y;
    if(ldsy < 0){
        ldsy = -ldsy;
    }
    dist1 = (ldsx * ldsx) + (ldsy * ldsy);
    dist1 = Math.sqrt(dist1);
    if(dist1 < 23){
        dx = -dx;
        dy = -dy;
        if(contador > 2){
            dx = -dx;
        }
    }
    //---fin de primer colicion en letra L----//

    //----segunda colicion en letra L---//
    let ldssy = (90) - y;
    if(ldssy < 0){
        ldssy = -ldssy;
    }
    dist2 = (ldsx * ldsx) + (ldssy * ldssy);
    dist2 = Math.sqrt(dist2);
    if(dist2 < 23){
        dx = -dx;
    }
    //---fin de segunda colision en letra L----//

    //----tercera colicion en letra L---//
    let ldsssy = (110) - y;
    if (ldsssy < 0 ){
        ldsssy = -ldsssy;
    }
    dist3 = (ldsx * ldsx) + (ldsssy * ldsssy);
    dist3 = Math.sqrt(dist3);
    if(dist3 < 23){
        dx = -dx;
        dy = -dy;
    }
    //--- fin de tercera colicion en letra L----//

    //----cuarta colicion en letra L----//
    let ldssx = (415) - x;
    if(ldssx < 0){
        ldssx = -ldssx;
    }
    dist4 = (ldssx * ldssx) + (ldsssy * ldsssy);
    dist4 = Math.sqrt(dist4);
    if(dist4 < 23){
        dy = -dy;
    }
}
//--- funcion main donde se manda a llamar todas las funciones----//
function draw() {
    ctx.clearRect(0, 0, 480, 320);
    drawBall();
    drawraquet();
    firma();
    colicion2();
    colicion3();
    colitions();
    drawTexto();
    if (y >= 310) {
        dy = dy * (-1);
    }
    if (y <= 10) {
        dy = dy * (-1);
    }
    x = x + dx;
    y = y + dy;
    //Teclas up y down
    if (downPressed == true) {
        raquety += 3;
    }
    if (upPressed == true) {
        raquety -= 3;
    }
    //raqueta izquierda
    if (down2 == true) {
        raquety2 -= 3;
    }
    if (up2 == true) {
        raquety2 += 3;
    }
    if(x < - 20){
        player2 = player2 + 1;
        if(player2 >= 3 ){
            ganador(2,player1,player2);
            stop();
        }else{
            marcador(2);
            pausa();
        }
    }
    if(x > 500){
        player1 = player1 +1;
        if(player1 >= 3 ){
            ganador(1,player1,player2);
            stop();
        }else{
            marcador(1);
            pausa();
        }
    }
}
id = setInterval(draw, 10);