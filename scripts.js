

//before you click on anything!
document.querySelector("#splashScreen span").addEventListener("click", function() {
    // Hide the splash screen
    document.getElementById("splashScreen").style.display = "none";

    // Start the music
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.play();
});



window.addEventListener('DOMContentLoaded', function () {
    var audio = document.getElementById('audioPlayer');
    var playbackPosition = localStorage.getItem('music-playback-position');

    if (playbackPosition) {
        audio.currentTime = parseFloat(playbackPosition);
    }

    audio.addEventListener('timeupdate', function () {
        localStorage.setItem('music-playback-position', audio.currentTime.toString());
    });
});

function redirectToSpotify() {
    window.open("https://open.spotify.com/artist/06ecWZ8SAM9MQIyfrcdwcI?si=bcnTXekcTZWfHBok44S-Fgm", "_blank");
}

function reloadImage() {
    const plantImage = document.getElementById('plantImage');
    // Fetch a new image from Unsplash and update the image source
    fetch('https://source.unsplash.com/400x400/?bugs/')
        .then(response => {
            plantImage.src = response.url;
        })
        .catch(error => {
            console.error("Error fetching image from Unsplash:", error);
        });
}


document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audioPlayer');
    const muteButton = document.getElementById('muteButton');

    // Check localStorage for mute state on page load
    const isMuted = localStorage.getItem('audio-muted') === 'true';
    audioPlayer.muted = isMuted;
    muteButton.innerText = isMuted ? 'UNMUTE' : 'MUTE';

    muteButton.addEventListener('click', () => {
        audioPlayer.muted = !audioPlayer.muted; // Toggle the muted state
        muteButton.innerText = audioPlayer.muted ? 'UNMUTE' : 'MUTE'; // Update the button label

        // Store mute state in localStorage
        localStorage.setItem('audio-muted', audioPlayer.muted);
    });

    audioPlayer.addEventListener('volumechange', () => {
        muteButton.innerText = audioPlayer.muted ? 'UNMUTE' : 'MUTE'; // Update the button label based on the muted state
    });
});


function displayRandomBug() {
    // Fetch a random bug image from Unsplash
    fetch('https://source.unsplash.com/random/?bug')
        .then(response => {
            const bug = document.createElement('img');
            bug.src = response.url;
            bug.classList.add('bug');
            bug.style.left = Math.random() * (window.innerWidth - 50) + 'px'; // Random X position
            bug.style.top = Math.random() * (window.innerHeight - 50) + 'px'; // Random Y position
            document.body.appendChild(bug);

            bug.addEventListener('click', function() {
                bug.classList.add('expanded');
                setTimeout(() => {
                    bug.remove();
                }, 1000); // Remove the bug after 1 second
            });

            // Optionally, remove the bug after some time if not clicked
            // setTimeout(() => {
            //     if (document.body.contains(bug)) {
            //         bug.remove();
            //     }
            // }, 5000); // Remove the bug after 5 seconds
        })
        .catch(error => {
            console.error("Error fetching image from Unsplash:", error);
        });
}

// Display a bug every 10 seconds (you can adjust the interval as needed)
setInterval(displayRandomBug, 10000);

const bugFacts = [
    "Some dragonflies can fly up to 50 miles per hour.",
    "There are more insects in one square mile of rural land than there are humans on the entire earth.",
    "The weight of all the ants on Earth is greater than the weight of all the humans on the planet.",
    "A single honeybee will only produce approximately 1/12 teaspoon of honey in its lifetime.",
    "The praying mantis is the only insect that can turn its head 360 degrees."
];

document.getElementById('factTrigger').addEventListener('mouseover', function() {
    const randomFact = bugFacts[Math.floor(Math.random() * bugFacts.length)];
    const bugFactElement = document.getElementById('bugFact');
    bugFactElement.textContent = randomFact;
    bugFactElement.style.display = 'flex';
});

document.getElementById('factTrigger').addEventListener('mouseout', function() {
    document.getElementById('bugFact').style.display = 'none';
});

let isDragging = false;
let currentPopup = null; // To keep track of the currently dragged popup
let offsetX, offsetY;
let currentZIndex = 1000; // Start with a base value

let popupInterval = null;

function togglePopups() {
    if (popupInterval) {
        clearInterval(popupInterval); // Stop creating popups
        popupInterval = null;
    } else {
        popupInterval = setInterval(createPopup, 5000); // Start creating popups every 5 seconds
    }
}

// Initialize the popups on page load
popupInterval = setInterval(createPopup, 5000);

function createPopup() {
    const popup = document.createElement('div');
    popup.classList.add('popup');

    const popupHeader = document.createElement('div');
    popupHeader.classList.add('popupHeader');
    popup.appendChild(popupHeader);

    popup.onmousedown = function() {
        currentZIndex++; // Increment the z-index
        popup.style.zIndex = currentZIndex; // Apply the new z-index to the popup
    }

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('closeBtn');
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = function() {
        popup.style.display = 'none';
    };
    popupHeader.appendChild(closeBtn);

    const img = document.createElement('img');
    img.src = "defenders of the realm.png"; 
    img.alt = "Human Extermination";
    popup.appendChild(img);

    popupHeader.addEventListener('mousedown', function(e) {
        isDragging = true;
        currentPopup = popup;
        offsetX = e.clientX - popup.getBoundingClientRect().left;
        offsetY = e.clientY - popup.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging && currentPopup) {
            currentPopup.style.left = (e.clientX - offsetX) + 'px';
            currentPopup.style.top = (e.clientY - offsetY) + 'px';
        }
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
        currentPopup = null;
    });

    document.addEventListener('mouseleave', function() {
        isDragging = false;
        currentPopup = null;
    });

    document.body.appendChild(popup);

    const xPosition = Math.random() * (window.innerWidth - popup.offsetWidth);
    const yPosition = Math.random() * (window.innerHeight - popup.offsetHeight);
    
    popup.style.left = xPosition + 'px';
    popup.style.top = yPosition + 'px';
    popup.style.display = 'block';
}

document.querySelectorAll('.optionButton').forEach(button => {
    button.addEventListener('click', function() {
        const color = this.getAttribute('data-color');
        switch (color) {
            case 'red':
                document.body.style.backgroundColor = 'cyan';
                currentRippleColor = 'rgba(255, 0, 0, 0.2)'; // Red
                currentBeamColor = 'rgba(255, 30, 100, 0.648)'; // Red
                break;
            case 'green':
                document.body.style.backgroundColor = 'magenta';
                currentRippleColor = 'rgba(0, 128, 0, 0.2)'; // Green
                currentBeamColor = 'rgba(50, 100, 200, 0.6)'; // Green
                break;
            case 'purple':
                document.body.style.backgroundColor = 'yellow';
                currentRippleColor = 'rgba(128, 0, 128, 0.2)'; // Purple
                currentBeamColor = 'rgba(200, 50, 70, 0.6)'; // Purple
                break;
            case 'lightblue':
                document.body.style.backgroundColor = 'orange';
                currentRippleColor = 'rgba(24, 163, 188, 0.2)'; // Light Blue
                currentBeamColor = 'rgba(70, 16, 220, 0.6)'; // Light Blue
                break;
        }
    });
});


//    ------------- BEAMS AND RIPPLES ---------------

let currentRippleColor = 'rgba(24, 163, 188, 0.2)'; // Default ripple color
let currentBeamColor = 'rgba(70, 33, 130, 0.648)'; // Default beam color
let lastClickedPosition = null;
let beamInterval; // Define the beamInterval variable
let effectsEnabled = true; // By default, effects are enabled

document.getElementById('toggleEffectsButton').addEventListener('click', function() {
    effectsEnabled = !effectsEnabled; // Toggle the effects state
});

function createRipple(e) {
    // Create ripple element
    if (effectsEnabled) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.background = currentRippleColor;
        ripple.style.width = '100px';
        ripple.style.height = '30px';
        ripple.style.left = (e.clientX - 25) + 'px'; // Adjusting by half the ripple size to center it
        ripple.style.top = (e.clientY - 25) + 'px'; // Adjusting by half the ripple size to center it
        document.body.appendChild(ripple);

        // Remove ripple after animation completes
        ripple.addEventListener('animationend', function () {
            ripple.remove();
        });
    }
    
}

// Add the event listener for the ripple effect
document.body.addEventListener('mousemove', createRipple);
document.body.addEventListener('mousedown', function(e) {
    lastClickedPosition = { x: e.clientX - 25, y: e.clientY };

    // If the interval isn't already set, set it up
    if (!beamInterval) {
        beamInterval = setInterval(createBeamsFromLastClickedPosition, 500);
    }
});

function createBeamsFromLastClickedPosition() {
    if (lastClickedPosition && effectsEnabled) {
        // Create 6 beams
        for (let i = 0; i < 6; i++) {
            const beam = document.createElement('div');
            beam.classList.add('beam');
            beam.style.background = currentBeamColor;
            beam.style.left = lastClickedPosition.x + 'px';
            beam.style.bottom = (window.innerHeight - lastClickedPosition.y) + 'px'; // Invert Y to get distance from bottom
            beam.style.transform = `rotate(${i * 60}deg)`; // 360/6 = 60 degrees between each beam
            document.body.appendChild(beam);

            // Remove beam after animation completes
            beam.addEventListener('animationend', function() {
                beam.remove();
            });
        }
    }
}

// function stopBeamsAndRipple() {
//     // Remove the event listener for the beams
//     document.body.removeEventListener('mousedown', createBeamsFromLastClickedPosition);
//     clearInterval(beamInterval); // Clear the interval for beams

//     // Remove the event listener for the ripple effect
//     document.body.removeEventListener('mousemove', createRipple);
// }

// document.addEventListener('keydown', function(e) {
//     if (e.key === '7') {
//         // Stop the beams and ripple effect
//         stopBeamsAndRipple();
//     }
// });


// ----------------------- CAT PILLOW ---------------------------
let isDraggingCat = false;
let catOffsetX, catOffsetY;
const catImage = document.getElementById('catpillow');
const gravityAcceleration = 0.7; // Acceleration due to gravity
let velocity = 0; // Initial velocity

// On mouse down, start dragging
catImage.onmousedown = function(e) {
    isDraggingCat = true;
    catOffsetX = e.clientX - catImage.getBoundingClientRect().left;
    catOffsetY = e.clientY - catImage.getBoundingClientRect().top;
}

// On mouse move, update the position of the cat image
document.onmousemove = function(e) {
    if (isDraggingCat) {
        catImage.style.left = (e.clientX - catOffsetX + 100) + 'px';
        catImage.style.top = (e.clientY - catOffsetY + 100) + 'px';
    }
}

// On mouse up, stop dragging and apply gravity
document.onmouseup = function() {
    isDraggingCat = false;
    velocity = 0; // Reset velocity

    // Gravity effect
    let gravityInterval = setInterval(function() {
        velocity += gravityAcceleration; // Increase velocity due to gravity
        const catBottomPosition = catImage.getBoundingClientRect().bottom;
        if (window.innerHeight - catBottomPosition > 0) {
            catImage.style.top = (catImage.offsetTop + velocity) + 'px'; // Move the cat image down by the current velocity
        } else {
            clearInterval(gravityInterval); // Stop when the cat image reaches the bottom
            catImage.style.top = (window.innerHeight - 50) + 'px'; // Ensure the cat image is exactly at the bottom
        }
    }, 12); // 20ms interval for smoother animation
}
