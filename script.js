class Timer {

    constructor() {

        this.timers = {};

        this.start = (key, callback, interval, executeOnStart = 0) => {

            if (executeOnStart == 1) {

                callback();

            }

            this.timers[key] = {

                id: setInterval(callback, +interval),
                cb: callback,

            };

            return this.timers[key].id;

        };

        this.clear = (key) => {

            if (!this.timers[key]) return;
            clearInterval(this.timers[key].id);
            delete this.timers[key];

        };

        this.change = (key, interval) => {

            if (!this.timers[key]) return;
            clearInterval(this.timers[key].id);
            this.timers[key].id = setInterval(this.timers[key].cb, interval);

        };
    }

}

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

function updateTimer() {

    let timeString = document.getElementById("countdown").innerHTML;
    let timeArray = timeString.split(":");
    let totalSeconds = +(timeArray[0] * 60) + +timeArray[1];

    let pomodoro = document.getElementById("pomodoro").value = 1500;
    let longBreak = document.getElementById("long-break").value = 600;
    let shortBreak = document.getElementById("short-break").value = 300;

    let key = "";

    if (totalSeconds == pomodoro) {

        key = "pomodoro";

    } else if (totalSeconds == longBreak) {

        key = "longBreak"

    } else if (totalSeconds == shortBreak) {

        key = "shortBreak"

    }

    window.timer.start(key, countDown(totalSeconds), 1000, 1);
    
    setTimeout(() => window.timer.clear(key), totalSeconds * 1000);

}

window.addEventListener("load", (event) => {

    document.getElementById("start").value = 0;
    document.getElementById("pomodoro").value = 1500;
    document.getElementById("long-break").value = 600;
    document.getElementById("short-break").value = 300;

    window.timer = new Timer();
    
});

document.getElementById("pomodoro").addEventListener("click", (event) => {

    let totalSeconds = document.getElementById("pomodoro").value = 1500;

    setTimer(totalSeconds);

});

document.getElementById("short-break").addEventListener("click", (event) => {

    let totalSeconds = document.getElementById("long-break").value = 600;

    setTimer(totalSeconds);
    
});

document.getElementById("long-break").addEventListener("click", (event) => {

    let totalSeconds = document.getElementById("short-break").value = 300;

    setTimer(totalSeconds);
       
});

document.getElementById("start").addEventListener("click", (event) => {

    let start = document.getElementById("start");

    if (start.value == 0) { 

        start.value++;
        start.innerHTML = "Stop";
        

    } else { 

        location.reload();

    };

    updateTimer();
    
});

