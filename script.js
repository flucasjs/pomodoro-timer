

// -------------------------------------------------- CLASS DEFINITIONS -------------------------------------------------- //

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

class Time {

    constructor(totalSeconds) {

        this.seconds = totalSeconds % 60;

        if (this.seconds < 10) {
        
            this.seconds = (0 + String(this.seconds)).slice(-2);

        }

        this.minutes = totalSeconds / 60;
        this.totalSeconds = totalSeconds;

    }

    getTime() {

        return `${this.minutes}:${this.seconds}`

    }


    setTime(totalSeconds) {

        this.seconds = totalSeconds % 60;

        if (this.seconds < 10) {
        
            this.seconds = (0 + String(this.seconds)).slice(-2);

        }

        this.minutes = totalSeconds / 60;
        this.totalSeconds = totalSeconds;

    }


}

// -------------------------------------------------- GLOBAL VARIABLES -------------------------------------------------- //

    window.timer = new Timer();
    window.TOGGLEON = "fa-toggle-on";
    window.TOGGLEOFF = "fa-toggle-off";

    document.getElementById("start").value = 0;
    document.getElementById("pomodoro").value = 1500;
    document.getElementById("long-break").value = 600;
    document.getElementById("short-break").value = 300;

    document.getElementById("start").dataset.currentTimer = "pomodoro";


// -------------------------------------------------- EVENT LISTENERS -------------------------------------------------- //

// Load toggled theme.
document.addEventListener("load", (event) => {

    window.style = localStorage.getItem("THEME");

    if (window.style == "dark") { 

        toggleTheme();

    }

});

// Handle pomodoro button click;
document.getElementById("pomodoro").addEventListener("click", (event) => {

    let totalSeconds = document.getElementById("pomodoro").value;
    let currentTimer = document.getElementById("start").dataset.currentTimer;

    document.getElementById("start").dataset.currentTimer = "pomodoro";

    if (start.value == 0) {

        displayTime(totalSeconds);

    } else if (start.value == 1) {

        if (currentTimer != "pomodoro") {

            timer.clear(currentTimer);
            displayTime(totalSeconds);
            start.value--;
            start.innerHTML = "Start";
           
        }

    }
});

// Handle short-break button click.
document.getElementById("short-break").addEventListener("click", (event) => {

    let totalSeconds = document.getElementById("short-break").value;
    let currentTimer = document.getElementById("start").dataset.currentTimer;

    document.getElementById("start").dataset.currentTimer = "short-break";

    if (start.value == 0) {

        displayTime(totalSeconds);

    } else if (start.value == 1) {

        if (currentTimer != "short-break") {

            timer.clear(currentTimer);
            displayTime(totalSeconds);
            start.value--;
            start.innerHTML = "Start";
           
        }

    }
    
});

// Handle long-break buttong click.
document.getElementById("long-break").addEventListener("click", (event) => {

    let totalSeconds = document.getElementById("long-break").value;
    let currentTimer = document.getElementById("start").dataset.currentTimer;

    document.getElementById("start").dataset.currentTimer = "long-break";

    if (start.value == 0) {

        displayTime(totalSeconds);

    } else if (start.value == 1) {

        if (currentTimer != "long-break") {

            timer.clear(currentTimer);
            displayTime(totalSeconds);
            start.value--;
            start.innerHTML = "Start";
           
        }

    }
       
});

// Handle start button click.
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

// Handle reset button click.
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


// Handle toggle theme element click.
theme.addEventListener("click", (event) => {

    let element = event.target;
    toggleTheme(element);

});



// -------------------------------------------------- FUNCTION DEFINITIONS -------------------------------------------------- //

// Display the amount of time remaining in the format mm:ss in the countdown element.
function displayTime(totalSeconds) {

    let timeObj = secondsToMinutes(totalSeconds);

    if (timeObj.seconds < 10) {

        timeObj.seconds = (0 + String(timeObj.seconds)).slice(-2);

    }
    
    document.getElementById("countdown").innerHTML = `${timeObj.minutes}:${timeObj.seconds}`;
    
}

// Convert seconds to object containing minutes and seconds as properties.
function secondsToMinutes(totalSeconds) {

    return { minutes: Math.floor(totalSeconds / 60), seconds: totalSeconds % 60 };

}

function countDown(totalSeconds) {

    let secondsPassed = 0;
    let secondsLeft = totalSeconds - secondsPassed;

    return function() {

        secondsPassed++;
        secondsLeft = totalSeconds - secondsPassed;
        displayTime(secondsLeft)

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
    
    setTimeout(() => {
        
        resetTimerDisplay(key);
        playAudio("bell.ogg");

    }, totalSeconds * 1000);

}


function resetTimerDisplay(key) {

    window.timer.clear(key); 
    displayTime(document.getElementById(key).value); 
    document.getElementById("start").innerHTML = "Start"; 
    document.getElementById("start").value = 0;

}

function toggleTheme() {

    let element = document.getElementById("toggle");
    
    element.classList.toggle(TOGGLEON);
    element.classList.toggle(TOGGLEOFF);

    let app = document.querySelector(".container");
    let title = document.getElementById("title");
    let intervalButtons = document.querySelectorAll(".interval-container button");
    let countdownDisplay = document.querySelector(".countdown-container");
    let countdownText = document.getElementById("countdown");
    let controlButtons = document.querySelectorAll(".control-container button");

    if (element.classList.contains(TOGGLEON)) {

        document.body.style.background = "rgba(0, 0, 0, .75)";
        app.style.background = "black";
        title.style.color = "green";
        countdownDisplay.style.color = "green";
        countdownDisplay.style.background = "black";
        countdownDisplay.style.border = "5px inset green";
        countdownText.style.color = "green";
        
        for (let button of intervalButtons) {

            button.classList.remove("light-theme");
            button.classList.add("night-theme");
        
        }

        for (let button of controlButtons) {
;
            button.classList.remove("light-theme");
            button.classList.add("night-theme");

        }

        localStorage.setItem("THEME", "dark");
        
    } else {

        document.body.style.background = "whitesmoke";
        app.style.background = "#d34f4f";
        title.style.color = "white";
        countdownDisplay.style.color = "#963737";
        countdownDisplay.style.background = "white";
        countdownText.style.color = "#963737";
        countdownDisplay.style.border = "5px inset #d34f4f";

        for (let button of intervalButtons) {

            button.classList.remove("night-theme");
            button.classList.add("light-theme");
        
        }

        for (let button of controlButtons) {

            button.classList.remove("night-theme");
            button.classList.add("light-theme");

        }

        localStorage.setItem("THEME", "light");

    }

}

function playAudio(soundFile) {

    let audio = new Audio(soundFile);
    audio.play()

}