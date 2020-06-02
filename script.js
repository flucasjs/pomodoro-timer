class Timer {

    constructor() {

        this.activeTimers = {};

        this.pausedTimers = {};

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

    if (minutes < 10 || seconds < 10) {

        minutes = (0 + String(minutes)).slice(-2);
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

    let key = "";

    if (totalSeconds == pomodoro) {

        key = "pomodoro";
        document.getElementById("start").dataset.currentTimer = "pomodoro";

    } else if (totalSeconds == longBreak) {

        key = "longBreak"
        document.getElementById("start").dataset.currentTimer = "longBreak";

    } else if (totalSeconds == shortBreak) {

        key = "shortBreak"
        document.getElementById("start").dataset.currentTimer = "shortBreak";

    } else {
        key = "continue";
        document.getElementById("start").dataset.currentTimer = "continue";

    }

    window.timer.start(key, countDown(totalSeconds), 1000, 1);
    
    // Move this.
    setTimeout(() => window.timer.clear(key), totalSeconds * 1000);

    

    

}

window.addEventListener("load", (event) => {

    document.getElementById("start").value = 0;
    document.getElementById("pomodoro").value = 1500;
    document.getElementById("long-break").value = 600;
    document.getElementById("short-break").value = 300;

    document.getElementById("start").dataset.currentTimer = "";

    window.timer = new Timer();
    
});

document.getElementById("pomodoro").addEventListener("click", (event) => {

    let totalSeconds = document.getElementById("pomodoro").value = 1500;
    let currentTimer = document.getElementById("start").dataset.currentTimer;

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

    let totalSeconds = document.getElementById("long-break").value = 600;

    let currentTimer = document.getElementById("start").dataset.currentTimer;

    if (start.value == 0) {

        setTimer(totalSeconds);

    } else if (start.value == 1) {

        if (currentTimer != "longBreak") {

            timer.clear(currentTimer);
            setTimer(totalSeconds);
            start.value--;
            start.innerHTML = "Start";
           
        }

    }
    
});

document.getElementById("long-break").addEventListener("click", (event) => {

    let totalSeconds = document.getElementById("short-break").value = 10;

    let currentTimer = document.getElementById("start").dataset.currentTimer;

    if (start.value == 0) {

        setTimer(totalSeconds);

    } else if (start.value == 1) {

        if (currentTimer != "shortBreak") {

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

