let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

//map
let map;
let canvas;
var mappa = new Mappa('Leaflet');

const options = {
  lat: 40,
  lng: -95,
  zoom: 4,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",//"https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
}

//lat long data
var latsAndLongs = [];
var canvasCoords = [];

//state variables
var pinImg;
var time = 0.0;


//Get lat long
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      //alert user that geotagging doesn't work
    }
  }
  
  //Store lat long
  function showPosition(position) {
    var i = latsAndLongs.length;
    latsAndLongs[i] = new Array();
    latsAndLongs[i].x = position.coords.latitude;
    latsAndLongs[i].y = position.coords.longitude;

    generateCoords();
  }

  //Convert lat long to x,y
function generateCoords(){
    
  for (var i = 0; i < latsAndLongs.length; i++) {
      canvasCoords[i] = map.latLngToPixel(latsAndLongs[i].x, latsAndLongs[i].y);
      canvasCoords[i].x -= canvas.width/2;
      canvasCoords[i].y -= canvas.height/2;
  }
}



//Drawing

function preload() {
    pinImg = loadImage("pin.png");
  }


function setup(){
    
  document.getElementById('geolocate').addEventListener(touchEvent, getLocation);
    
    var w = document.getElementById("canvasDiv").offsetWidth;
    var h = document.getElementById("canvasDiv").offsetHeight;
    canvas = createCanvas(w,h, WEBGL);
    //canvas.style('position', 'absolute')
    canvas.parent('canvasDiv');
    frameRate(60);


    latsAndLongs[0] = new Array();
    latsAndLongs[0].x = 32.368407;
    latsAndLongs[0].y = -111.121668;
    
    map = mappa.tileMap(options); 
    map.overlay(canvas) 
    
    map.onChange(generateCoords);

}

  //can't resize canvas normally because fuck Mappa
  //resize flag triggers refresh upon next draw
var resized = false;
function windowResized() {
  console.log("reload");
  resized = true;


  /*
  var w = document.getElementById("canvasDiv").offsetWidth;
  var h = document.getElementById("canvasDiv").offsetHeight;
  resizeCanvas(w, h);

  //map.resize(canvas);
    //map.rm() 

  generateCoords();
*/
}



function draw(){
  clear();

  if (resized) {
    window.location.reload();
  resized = false;
}
    
  generateCoords();
    radius = 5;

    for (var i = 0; i < canvasCoords.length; i++) {
      drawBeacon(canvasCoords[i].x, canvasCoords[i].y, time);
      drawPin(canvasCoords[i].x, canvasCoords[i].y);
    }
    
    time += 0.03;
}

function drawBeacon(x, y, t) {
  var p = t%1;
  noFill();
  stroke(0, 100, 155, 255*(1-p));
  circle(x, y, 35*p);

}

function drawPin(x, y) {

  var w = 25, h = 35;
  texture(pinImg);
  noStroke();
  rect(x - w/2, y - h, w, h);
}
