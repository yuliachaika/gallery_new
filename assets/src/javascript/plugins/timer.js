'use strict';

function startTimer(duration) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;

    function timer() {

        diff = duration * 60 - (((Date.now() - start) / 1000) | 0);
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        var display = document.querySelector('#js-time');
        display.textContent = minutes + ":" + seconds; 

        if (diff <= 0) {
            start = Date.now() + 1000;
        }
    };
    timer();
    setInterval(timer, 1000);
};



