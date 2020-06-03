class Timer {

    constructor() {

        this.activeTimers = {};

        this.start = (key, callback, interval, executeOnStart = 0) => {

            if (executeOnStart == 1) {

                callback();

            }

            this.activeTimers[key] = {

                id: setInterval(callback, +interval),
                cb: callback,
                int: interval,

            };

            return this.activeTimers[key].id;

        };

        this.clear = (key) => {

            if (!this.activeTimers[key]) return;
            clearInterval(this.activeTimers[key].id);
            delete this.activeTimers[key];

        };

        this.change = (key, interval) => {

            if (!this.activeTimers[key]) return;
            clearInterval(this.activeTimers[key].id);
            this.activeTimers[key].id = setInterval(this.activeTimers[key].cb, interval);

        };

    }

}

function displayTime(minutes, seconds) {

    if (seconds < 10) {

        seconds = (0 + String(seconds)).slice(-2);

    }
    
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

function parseTime() {

    let timeString = document.getElementById("countdown").innerHTML;
    let timeArray = timeString.split(":");
    return +(timeArray[0] * 60) + +timeArray[1];

}

function updateTimer() {

    let totalSeconds = parseTime();

    let pomodoro = document.getElementById("pomodoro").value;
    let longBreak = document.getElementById("long-break").value;
    let shortBreak = document.getElementById("short-break").value;

    let currentTimer = document.getElementById("start").dataset.currentTimer;

    let key = "";
    
    if (currentTimer != "continue") {

        document.getElementById("start").dataset.continueTimer = currentTimer;

    }
    

    if (totalSeconds == pomodoro) {

        key = "pomodoro";
        document.getElementById("start").dataset.currentTimer = "pomodoro";

    } else if (totalSeconds == longBreak) {

        key = "long-break"
        document.getElementById("start").dataset.currentTimer = "long-break";

    } else if (totalSeconds == shortBreak) {

        key = "short-break"
        document.getElementById("start").dataset.currentTimer = "short-break";

    } else {

        key = "continue";
        document.getElementById("start").dataset.currentTimer = "continue";

    }

    window.timer.start(key, countDown(totalSeconds), 1000, 1);
    
    // Move this.
    setTimeout(() => {resetTimerDisplay(key)}, totalSeconds * 1000);

}


function resetTimerDisplay(key) {

    window.timer.clear(key); 
    setTimer(document.getElementById(key).value); 
    document.getElementById("start").innerHTML = "Start"; 
    document.getElementById("start").value = 0;

}

window.addEventListener("load", (event) => {

    document.getElementById("start").value = 0;
    document.getElementById("pomodoro").value = 1500;
    document.getElementById("long-break").value = 600;
    document.getElementById("short-break").value = 300;

    document.getElementById("start").dataset.currentTimer = "pomodoro";

    window.timer = new Timer();
    
});

document.getElementById("pomodoro").addEventListener("click", (event) => {

    let totalSeconds = document.getElementById("pomodoro").value = 1500;
    let currentTimer = document.getElementById("start").dataset.currentTimer;

    document.getElementById("start").dataset.currentTimer = "pomodoro";

    if (start.value == 0) {

        setTimer(totalSeconds);

    } else if (start.value == 1) {

        if (currentTimer != "pomodoro") {

            timer.clear(currentTimer);
            setTimer(totalSeconds);
            start.value--;
            start.innerHTML = "Start";
           
        }

    }
});

document.getElementById("short-break").addEventListener("click", (event) => {

    let totalSeconds = document.getElementById("short-break").value = 300;
    let currentTimer = document.getElementById("start").dataset.currentTimer;

    document.getElementById("start").dataset.currentTimer = "short-break";

    if (start.value == 0) {

        setTimer(totalSeconds);

    } else if (start.value == 1) {

        if (currentTimer != "short-break") {

            timer.clear(currentTimer);
            setTimer(totalSeconds);
            start.value--;
            start.innerHTML = "Start";
           
        }

    }
    
});

document.getElementById("long-break").addEventListener("click", (event) => {

    let totalSeconds = document.getElementById("long-break").value = 600;
    let currentTimer = document.getElementById("start").dataset.currentTimer;

    document.getElementById("start").dataset.currentTimer = "long-break";

    if (start.value == 0) {

        setTimer(totalSeconds);

    } else if (start.value == 1) {

        if (currentTimer != "long-break") {

            timer.clear(currentTimer);
            setTimer(totalSeconds);
            start.value--;
            start.innerHTML = "Start";
           
        }

    }
       
});

document.getElementById("start").addEventListener("click", (event) => {

    let start = document.getElementById("start");
    let currentTimer = document.getElementById("start").dataset.currentTimer;
    
    if (start.value == 0) {

        start.value++;
        start.innerHTML = "Stop";
        updateTimer();
        

    } else if (start.value == 1){ 
        
        start.value--;
        start.innerHTML = "Start";
        window.timer.clear(currentTimer);
        document.getElementById("start").dataset.currentTimer = "continue";

    };

});

document.getElementById("reset").addEventListener("click", (event) => {

    let currentTimer = document.getElementById("start").dataset.currentTimer;
    let continueTimer = document.getElementById("start").dataset.continueTimer;

    if (currentTimer == "continue") {
        
        window.timer.clear("continue");
        resetTimerDisplay(continueTimer);

    } else {

        window.timer.clear(currentTimer);
        resetTimerDisplay(currentTimer);

    }
    
});

