let map;
let canvas;
const mappa = new Mappa('Leaflet');

const options = {
  lat: 40,
  lng: -95,
  zoom: 4,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function setup(){
    
    canvas = createCanvas(1000,600, WEBGL);
    frameRate(60);
    
    map = mappa.tileMap(options); 
    map.overlay(canvas) 
    
    // Do stuff when map is moved
    map.onChange(mapMoved);
}

var time = 0.0, radius = 25;

var conti = [], contiCanvasLoc = [];

function draw(){
    background(0, 0, 0);
    clear();
    
    radius = 15;
    
    noFill();
    stroke(0);
    strokeWeight(3);
    circle(contiCanvasLoc.x, contiCanvasLoc.y, radius+3);
    circle(contiCanvasLoc.x, contiCanvasLoc.y, 42);
    
    fill(0);
    noStroke();
    circle(contiCanvasLoc.x, contiCanvasLoc.y, 5);
    for (var i = 0; i < 1.0; i += 0.1) {
        circle(contiCanvasLoc.x + radius*cos(i*PI*2 + time), contiCanvasLoc.y + radius*sin(i*PI*2 + time), 8);
    }
    
    time += 0.05;
}


function mapMoved(){
    //load list of locations
    
    conti = map.latLngToPixel(32.368407, -111.121668);
    contiCanvasLoc.x = conti.x - canvas.width/2;
    contiCanvasLoc.y = conti.y - canvas.height/2;
}