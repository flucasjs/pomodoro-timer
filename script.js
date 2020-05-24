function displayTime(minutes, seconds) {

    document.getElementById("countdown").innerHTML = `${minutes}:${seconds}`;

}

function setTimer(time) {

    let timeObj = convertSeconds(time);
    displayTime(timeObj.minutes, timeObj.seconds);

}

function convertSeconds(time) {

    return { minutes: Math.floor(time / 60), seconds: time % 60 };

}

function countDown(totalSeconds) {

    let secondsPassed = 0;
    let secondsLeft = totalSeconds - secondsPassed;

    return function() {

        secondsPassed++;
        secondsLeft = totalSeconds - secondsPassed;
        setTimer(secondsLeft)

    }
}

window.addEventListener("load", (event) => {

    document.getElementById("start").value = 0;
    document.getElementById("pomodoro").value = 0;
    document.getElementById("short-break").value = 0;
    document.getElementById("long-break").value = 0;
    
});

document.getElementById("pomodoro").addEventListener("click", (event) => {

    let time = 1500;
    setTimer(time);

});

document.getElementById("short-break").addEventListener("click", (event) => {

    let time = 600;
    setTimer(time);
    
});

document.getElementById("long-break").addEventListener("click", (event) => {

    let time = 300;
    setTimer(time);
    
});

document.getElementById("start").addEventListener("click", (event) => {

    let start = document.getElementById("start");
    if (start.value == 0) { 

        start.value++;
        start.innerHTML = "Stop";

    } else { 

        location.reload()

    };

    let timeString = document.getElementById("countdown").innerHTML;
    let timeArray = timeString.split(":");

    let totalSeconds = +timeArray[1] + (timeArray[0] * 60);
    let totalMS = totalSeconds * 1000;
    let count = countDown(totalSeconds);

    count();
    let interval = setInterval(count, 1000);
    setTimeout( () => clearInterval(interval), totalMS)

});


