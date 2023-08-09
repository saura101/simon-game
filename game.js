let gamePattern=[];
let userClickedButtons=[];
 
let started =false;
let level=0;
let buttonColors=["green","red","yellow","blue"];

//play sound
function playsound(color)
{
    let aud=new Audio("sounds/"+color+".mp3");
    aud.play();
}



$(document).on("keydown",function(){
    if(!started)
    {
        $("h1").text("Level "+ level);
        started= true;
        nextSequence();
    }
});

//animate

function animatePress(color)
{
    $("#"+color).addClass("pressed");
    setTimeout(function(){ $("#"+color).removeClass("pressed")},100);
    playsound(color);
}
$(".btn").click(function()
{
    let chosenColor=$(this).attr("id");
    userClickedButtons.push(chosenColor);
    animatePress(chosenColor);
    playsound(chosenColor);

    checkAnswer(userClickedButtons.length-1)
});


let diff=1000;

function update() {
    var select = document.getElementById('dif');
    var option = select.options[select.selectedIndex];
    //console.log(option.value);
    if(option.value==1)
        diff=1000;
    else if(option.value==2)
        diff=800;
    else if(option.value==3)
        diff=500;
    else if(option.value==4)
        diff=100;
    //console.log(diff);
}

function nextSequence()
{
    update();
    //console.log(diff);
    userClickedButtons=[];
    level++;
    $("h1").text("Level "+ level);
    let rand=Math.floor(Math.random()*4);
    
    let randomChosenColor=buttonColors[rand];

    gamePattern.push(randomChosenColor);
    //console.log(gamePattern);
    for(let i=0;i<gamePattern.length;i++)
    {
        setTimeout(function() {
            $("#"+gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
            playsound(gamePattern[i]);
        },(i+1)*diff);
            
        
    }
    

}
function checkAnswer(currentClick)
{
    //console.log(gamePattern);
    //console.log(userClickedButtons);
    if(gamePattern[currentClick]==userClickedButtons[currentClick])
    {
        if(userClickedButtons.length===gamePattern.length)
        {
            console.log("success");
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }   
    else
    {
        console.log("wrong");
        gameOver();
        startOver();
    }
        

}
function gameOver()
{
    playsound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){$("body").removeClass("game-over") },400);
}

function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}


