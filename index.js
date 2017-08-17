var userID = "";
var HeroUrl = "https://overwatch-api.net/api/v1/hero/";

var GifUrl = "http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=5b325b5eee184703b021d2b43f799e14&limit=5";
//5b325b5eee184703b021d2b43f799e14









function changeHero(id) {

    $.ajax({
        url: HeroUrl,
        success: function (data) {
            console.log(data);
            var Hero = data.data[id];
            var name = Hero.name;
            var health = Hero.health;
            var age = Hero.age;
            var armour = Hero.armour;
            var description = Hero.description;
            var shield = Hero.shield;
            var difficulty = Hero.difficulty;

            $("#stats_name").text(name);
            $("#stats_description").text(description);
            $("#stats_health").text(health);
            $("#stats_armour").text(armour);
            $("#stats_shield").text(shield);
            $("#stats_difficulty").text(difficulty);
            var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=overwatch_" + name + "&api_key=5b325b5eee184703b021d2b43f799e14&limit=5");
            xhr.done(function (data) {
                console.log("success got data", data);
                var gif = data.data[0];
                var show = gif.embed_url;
                console.log(show);


                $("#stats_picture").attr("src", show);




            });


        }
    });
}


var y=0;
var leftMar = 100;
var topMar = 0;
var direction;
var int2;
var int1;
var score = 0;


 
function startGame() {
    int1 = setInterval(updateCloud,3000);
    int2 = setInterval(updateCloudPos,20);
    document.querySelector(".start").style.display = "none";
    document.querySelector(".stop").style.display = "inline";
}

function stopGame() {
     console.log("Stopping Game...");
    clearInterval(int1);
    clearInterval(int2);
    document.querySelector(".start").style.display = "inline";
    document.querySelector(".stop").style.display = "none";
    console.log("Game Stopped");
}

function changePharah(event) {
    y = event.clientY;

    // if ((y - 400) <= -10) {
    //     y = 395;
    // }
    // if ((y - 400) >= 700) {
    //     y = 480;
    // }
    document.querySelector(".pharah").style.top = (y + 10) + "px";
}


function updateCloud() {
    var y;
    score += 1;
    document.querySelector(".score").innerHTML = score;
    leftMar = 100;
    topMar = (Math.floor(Math.random() * 85) + 1);
    direction = (Math.floor(Math.random() * 2 ) + 1);
    if (direction === 1) {
        document.querySelector(".upArrow").style.display = "inline";
        document.querySelector(".downArrow").style.display = "none";
    } else {
        document.querySelector(".upArrow").style.display = "none";
        document.querySelector(".downArrow").style.display = "inline";
    }
    document.querySelector(".cloud").style.top = topMar + "vh";
    document.querySelector(".upArrow").style.top = (topMar + 4) + "vh";
    document.querySelector(".downArrow").style.top = (topMar + 4) + "vh";
}

function updateCloudPos() {
    leftMar -= 1;
    document.querySelector(".cloud").style.left = leftMar + "vw";
    document.querySelector(".upArrow").style.left = (leftMar + 8) + "vw";
    document.querySelector(".downArrow").style.left = (leftMar + 8) + "vw";
    if (leftMar === 22) {
        checkPlaneCloudPos();
    }
}

function checkPlaneCloudPos() {
    // // console.log("Checking for Pos...");
    if ((direction === 2) && (y - 400) <= topMar) {
        alert("Oh No! You went over the cloud and crashed!");
        score = 0;
    } else if ((direction === 1) && (y - 400 >= topMar)) {
        alert("Oh No! You went under the cloud and crashed!");
        score = 0;
    }
}

