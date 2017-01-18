/**
 * Created by lechkaiel on 1/10/17.
 */

// initialize
    // use while loop based on current leg length being positive (or >25?)
    // run createSquare within while loop

// createSquare
    // create div
    // set height and width randomly
    // set position
    // append div

// spiralMapper
    // increment by a fixed amount
    // change direction when increment surpasses current leg length
    // subtract one increment length every other time a direction change occurs


// need to add an html canvas or something to set up export
    // maybe make it in a square that fits inside the screen height/width
// refactor to be an animation

var compassPoint = 1;
var incrementLegLength = 20;

var currentLegWidthMax = window.innerWidth;
var currentLegHeightMax = window.innerHeight + 40;

var currentLegWidth = 0;
var currentLegHeight = 0;

var verticalPosition = -30;
var horizontalPosition = -20;


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function spiralMapper() {

    var direction = compassPoint % 4;

    if (direction == 1) {
        verticalPosition += incrementLegLength;
        currentLegHeight += incrementLegLength;
        if (currentLegHeight > currentLegHeightMax) {
            compassPoint++;
            currentLegHeightMax -= incrementLegLength;
            currentLegHeight = 0;
        }
    } else if (direction == 2) {
        horizontalPosition += incrementLegLength;
        currentLegWidth += incrementLegLength;
        if (currentLegWidth > currentLegWidthMax) {
            compassPoint++;
            currentLegWidthMax -= incrementLegLength;
            currentLegWidth = 0;
        }
    } else if (direction == 3) {
        verticalPosition -= incrementLegLength;
        currentLegHeight += incrementLegLength;
        if (currentLegHeight > currentLegHeightMax) {
            compassPoint++;
            currentLegHeightMax -= incrementLegLength;
            currentLegHeight = 0;
        }
    } else {
        horizontalPosition -= incrementLegLength;
        currentLegWidth += incrementLegLength;
        if (currentLegWidth > currentLegWidthMax) {
            compassPoint++;
            currentLegWidthMax -= incrementLegLength;
            currentLegWidth = 0;
        }
    }

}

function createSquare() {

    var square = document.createElement("div");

    var randomHeight = Math.floor((Math.random() * 10) + 25);
    var randomWidth = Math.floor((Math.random() * 10) + 25);

    var pxRandomHeight = randomHeight + "px";
    var pxRandomWidth = randomWidth + "px";

    square.style.height = pxRandomHeight;
    square.style.width = pxRandomWidth;
    square.style.position = "fixed";
    // square.style.background = getRandomColor();

    var agitHeight = Math.floor((Math.random() * -10) + 5);
    var agitWidth = Math.floor((Math.random() * -10) + 5);

    var heightPlacement = verticalPosition + agitHeight;
    var widthPlacement = horizontalPosition + agitWidth;

    var topSpacing = heightPlacement + "px";
    var leftSpacing = widthPlacement + "px";

    square.style.top = topSpacing;
    square.style.left = leftSpacing;

    spiralMapper();

    var theBody = document.getElementById("container");
    theBody.appendChild(square);
}


function initialize() {

    // var counter = 1;
    //
    // function layers() {
    //     if (currentLegHeightMax < 300 || currentLegWidthMax < 300) {
    //         console.log("end conditions met");
    //         clearInterval(reset);
    //     } else {
    //         createSquare();
    //         console.log(counter);
    //         counter++
    //     }
    // }
    //
    // var reset = setInterval(layers(), 25);

    while (currentLegHeightMax > 300 && currentLegWidthMax > 300) {
        createSquare();
    }

}
