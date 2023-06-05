var canvas = document.querySelector("canvas");
var color = $("#color");
var clearButton = $("button");
var pencilButton = $(".pencil");
var eraserButton = $(".eraser");
var ctx = canvas.getContext("2d");


//I set these values ​​because I want to add the ability to change the size of the canvas in future versions.
var WIDTH = canvas.width = 500;
var HEIGHT = canvas.height = 500;
var column = 25;
var row = 25;


//Setting each cell' sizes.
var cellSizeX = canvas.width / column;
var cellSizeY = canvas.height / row;

//Mouse state controller.
var state = "pencil";

//It calculates which cell the mouse is on according to its current position and paints or cleans that cell according to the state.
function draw(pos){
    ctx.fillStyle = color.val();
    if (state === "pencil"){
        ctx.fillRect(cellSizeX * (Math.floor(pos[0] / cellSizeX)),cellSizeY * (Math.floor(pos[1] / cellSizeY)),cellSizeX,cellSizeY);
    }else{
        ctx.clearRect(cellSizeX * (Math.floor(pos[0] / cellSizeX)),cellSizeY * (Math.floor(pos[1] / cellSizeY)),cellSizeX,cellSizeY);
    }
}

//Calculates the position of the mouse on the canvas.
function mousePosition(e){
    let canvasPosition = canvas.getBoundingClientRect();
    let xpos = e.clientX - canvasPosition.left;
    let ypos = e.clientY - canvasPosition.top;
    return [Math.floor(xpos), Math.floor(ypos)];
}

canvas.addEventListener("mousemove",function(e){
    let xpos = e.clientX;
    let ypos = e.clientY;
    let getColor = ctx.getImageData(xpos,ypos,1,1);
    console.log((getColor.data)[0]);
})

//Set Mousedown, Mouseup and Mousemove eventListeners
function getMove(event){
    draw(mousePosition(event));
}

canvas.addEventListener("mousedown",function(event){
    getMove(event);
    canvas.addEventListener("mousemove",getMove)
})

canvas.addEventListener("mouseup",function(event){
    canvas.removeEventListener("mousemove",getMove)
})


//State changer buttons.
pencilButton.click(function(e){
    e.stopImmediatePropagation()
    state = "pencil";
    console.log("switched to pencil");
})

eraserButton.click(function(e){
    e.stopImmediatePropagation()
    state = "eraser";
    console.log("switched to eraser");
})


//Clears whole canvas.
clearButton.click(function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("clear");
})




//Version 1.0