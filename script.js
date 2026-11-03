
/* =================================
   PROJECT 22 - JAVASCRIPT
================================= */

const warningScreen = document.getElementById("warningScreen");
const flightScreen = document.getElementById("flightScreen");
const finalScreen = document.getElementById("finalScreen");

const cancelBtn = document.getElementById("cancelBtn");
const continueBtn = document.getElementById("continueBtn");

const birthdayMusic = document.getElementById("birthdayMusic");

const secretWords = document.getElementById("secretWords");
const finalCaption = document.getElementById("finalCaption");

const photoContainer = document.getElementById("photoContainer");
const balloons = document.getElementById("balloons");


/* =================================
   1. CANCEL BUTTON
   Disappears when clicked
================================= */

cancelBtn.addEventListener("click", () => {

    cancelBtn.style.transition = "all 0.5s ease";
    cancelBtn.style.opacity = "0";
    cancelBtn.style.transform = "scale(0.5)";

    setTimeout(() => {
        cancelBtn.style.display = "none";
    }, 500);

});


/* =================================
   2. CONTINUE BUTTON
================================= */

continueBtn.addEventListener("click", () => {

    // Prevent repeated clicking
    continueBtn.disabled = true;

    // Hide warning
    warningScreen.classList.remove("active");

    // Show flight animation
    flightScreen.classList.add("active");

    // Start the birthday music after the flight
    // The initial play request is made during the click.
    birthdayMusic.volume = 0.65;

    const musicPromise = birthdayMusic.play();

    if (musicPromise !== undefined) {
        musicPromise.then(() => {
            birthdayMusic.pause();
            birthdayMusic.currentTime = 0;
        }).catch(() => {
            console.log("Music will start when the birthday reveal begins.");
        });
    }

    // Wait for the airplane to finish flying
    setTimeout(() => {

        showBirthdaySurprise();

    }, 8500);

});


/* =================================
   3. BIRTHDAY SURPRISE
================================= */

function showBirthdaySurprise() {

    flightScreen.classList.remove("active");

    finalScreen.classList.add("active");

    // Start music on the final reveal
    birthdayMusic.volume = 0.65;

    birthdayMusic.play().catch(() => {
        console.log("Please interact with the page to enable music.");
    });

    // Release balloons
    releaseBalloons();

    // Reveal the secret signature after 5 seconds
    setTimeout(() => {

        secretWords.classList.add("reveal");

    }, 7000);

    // Reveal the bottom caption
    setTimeout(() => {

        finalCaption.classList.add("show");

    }, 4000);

    // Release pictures separately
    setTimeout(() => {

        releasePictures();

    }, 2000);

}


/* =================================
   4. BALLOON ANIMATION
================================= */

function releaseBalloons() {

    const balloonColors = [
        "#e9a9c3",
        "#f4d5e1",
        "#d9a4bd",
        "#ffffff",
        "#c98ba9",
        "#f0c0d3"
    ];

    for (let i = 0; i < 24; i++) {

        const balloon = document.createElement("div");

        balloon.classList.add("balloon");

        balloon.style.left = Math.random() * 100 + "%";

        balloon.style.background =
            balloonColors[
                Math.floor(Math.random() * balloonColors.length)
            ];

        balloon.style.animationDuration =
            (8 + Math.random() * 7) + "s";

        balloon.style.animationDelay =
            (Math.random() * 5) + "s";

        const size = 30 + Math.random() * 30;

        balloon.style.width = size + "px";
        balloon.style.height = size * 1.35 + "px";

        balloons.appendChild(balloon);

    }

}


/* =================================
   5. PICTURE REVEAL
   One picture every 3 seconds
================================= */

function releasePictures() {

    const photos = document.querySelectorAll(".floating-photo");

    photos.forEach((photo, index) => {

        setTimeout(() => {

            photo.classList.add("show");

        }, index * 3000);

    });

}


/* =================================
   6. FALLING NUMBER BACKGROUND
   Fallback if no video is provided
================================= */

const matrix = document.getElementById("matrix");

function createMatrixNumbers() {

    for (let i = 0; i < 35; i++) {

        const number = document.createElement("span");

        number.textContent =
            Math.random().toString(2).substring(2, 12);

        number.style.position = "absolute";
        number.style.left = Math.random() * 100 + "%";
        number.style.top = Math.random() * 100 + "%";
        number.style.color = "#00ff41";
        number.style.opacity = "0.25";
        number.style.fontSize = "12px";
        number.style.animation =
            `matrixFall ${5 + Math.random() * 10}s linear infinite`;

        matrix.appendChild(number);

    }

}

createMatrixNumbers();


/* =================================
   7. INITIALIZATION
================================= */

console.log("PROJECT 22 initialized.");
console.log("Birthday surprise system ready.");
