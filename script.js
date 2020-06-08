// ---------- EVENT LISTENERS ---------- //

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

theme.addEventListener("click", (event) => {

    let element = event.target;
    setTheme(element);

});


// ---------- CLASS DEFINITIONS ---------- //

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


// ---------- FUNCTION DEFINITIONS ---------- //

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

    window.TOGGLEON = "fa-toggle-on";
    window.TOGGLEOFF = "fa-toggle-off";

    window.style = localStorage.getItem("THEME");

    if (window.style == "dark") { 

        setTheme(document.getElementById("toggle"));

    }
    
});

function setTheme(element) {
    
    element.classList.toggle(TOGGLEON);
    element.classList.toggle(TOGGLEOFF);

    let app = document.querySelector(".container");
    let title = document.getElementById("title");
    let intervalButtons = document.querySelectorAll(".interval-container button");
    let countdownDisplay = document.querySelector(".countdown-container");
    let countdownText = document.getElementById("countdown");
    let controlButtons = document.querySelectorAll(".control-container button");
    
    let darkBackgroundColor = "rgba(0, 0, 0, .75)";
    let darkAppColor = "black";
    let darkContainerColor = "black";
    let darkTitleColor = "green";
    let darkTextColor = "green";
    let darkBorderInset = "5px inset green";
    let darkBorderOutset = "5px outset green";

    let lightBackgroundColor = "whitesmoke";
    let lightAppColor = "#d34f4f";
    let lightContainerColor = "white";
    let lightTitleColor = "white";
    let lightTextColor = "#963737";
    let lightBorderInset = "5px inset #d34f4f";
    let lightBorderOutset = "5px outset #d34f4f";


    if (element.classList.contains(TOGGLEON)) {

        document.body.style.background = darkBackgroundColor;
        app.style.background = darkAppColor;
        title.style.color = darkTitleColor;
        countdownDisplay.style.color = darkTextColor;
        countdownDisplay.style.background = darkContainerColor;
        countdownDisplay.style.border = darkBorderInset;
        countdownText.style.color = darkTextColor;
        
        for (let i = 0; i < intervalButtons.length; i++) {

            intervalButtons[i].style.background = darkContainerColor;
            intervalButtons[i].style.color = darkTextColor;
            intervalButtons[i].style.border = darkBorderInset;
        
        }

        for (let i = 0; i < controlButtons.length; i++) {

            controlButtons[i].style.background = darkContainerColor;
            controlButtons[i].style.color = darkTextColor;
            controlButtons[i].style.border = darkBorderOutset;

        }

        localStorage.setItem("THEME", "dark");
        
        
    } else {

        document.body.style.background = lightBackgroundColor;
        app.style.background = lightAppColor;
        title.style.color = lightTitleColor;
        countdownDisplay.style.color = lightTextColor;
        countdownDisplay.style.background = lightContainerColor;
        countdownText.style.color = lightTextColor;
        countdownDisplay.style.border = lightBorderInset;

        for (let i = 0; i < intervalButtons.length; i++) {

            intervalButtons[i].style.background = lightContainerColor;
            intervalButtons[i].style.color = lightTextColor;
            intervalButtons[i].style.border = lightBorderOutset;
        
        }

        for (let i = 0; i < controlButtons.length; i++) {

            controlButtons[i].style.background = lightContainerColor;
            controlButtons[i].style.color = lightTextColor;
            controlButtons[i].style.border = lightBorderOutset;

        }

        localStorage.setItem("THEME", "light");

    }

}