//

document.addEventListener("DOMContentLoaded", function() {
    init();
    setTimer();
    buttons.pause.addEventListener("click", pauseButtonHandler);
    buttons.plus.addEventListener("click", plusButtonHandler);
    buttons.minus.addEventListener("click", minusButtonHandler);
    buttons.heart.addEventListener("click", heartButtonHandler);
    comment.submitButton.addEventListener("click", commentHandler);
});

function init() {
    running = true;
    count = 0;
    counter = document.getElementById("counter");
    likes = document.querySelector("ul");
    buttons = {
        pause: document.getElementById("pause"),
        heart: document.getElementById("heart"),
        plus: document.getElementById("plus"),
        minus: document.getElementById("minus"),
        comment: document.getElementById("submit"),
    }
    comment = {
        list: document.getElementById("list"),
        submitButton: document.getElementById("submit"),
        submission: document.getElementById("comment-input"),
    }
}

let updateCounter = (n = ++count) => {
    count = (n < 0)? 0 : n;
    counter.innerHTML = count;
}

let setTimer = () => setTimeout(e => {
    if (running) {
        updateCounter();
        setTimer();
    }
}, 1000); // refactor with setInterval()?

let pauseButtonHandler = event => {
    running = !running;
    if (running) {
        setTimer();
        buttons.pause.innerHTML = "pause";
    } else {
        buttons.pause.innerHTML = "resume";
    }
}

let plusButtonHandler = event => {
    updateCounter();
}

let minusButtonHandler = event => {
    updateCounter(--count);
}

let heartButtonHandler = event => {
    let like = likes.querySelector(`[num="${count}"]`)
    if (!like) {
        like = document.createElement("li");
        like.setAttribute("num", count);
        like.innerHTML = `${count} has been liked <span>0</span> times.`;
        likes.appendChild(like);
    }
    let innerCount = like.querySelector("span");
    innerCount.innerHTML = parseInt(innerCount.innerHTML) + 1;
}

let commentHandler = event => {
    event.preventDefault();
    if (comment.submission.value !== "") {
        let newComment = document.createElement("p");
        newComment.innerHTML = comment.submission.value;
        comment.submission.value = "";
        comment.list.appendChild(newComment);
    }
}