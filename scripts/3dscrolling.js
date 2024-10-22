// Define image data with src, alt, and text
const imageData = [
  { src: "/images/drag.png", alt: "", text: "", link: "" },
  { src: "/images/3Drenders/Sign_1.png", alt: "Wooden Sign", text: "Wooden Sign - Blender & Substance 3D", link: "" },
  { src: "/images/3Drenders/Shield_1.png", alt: "Shield", text: "Shield - Blender & Substance 3D", link: "" },

];


function populateImageTrack() {
  const imageTrack = document.getElementById("image-track");
  imageTrack.innerHTML = '';

  imageData.forEach(data => {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

//images
    const image = document.createElement("img");
    image.classList.add("image");
    image.src = data.src;
    image.alt = data.alt;
    image.style.userSelect = "none";
    image.draggable = false;

//text
    const imageText = document.createElement("p");
    imageText.classList.add("image-text");
    imageText.textContent = data.text;

    const animatedContainer = document.createElement("div");
    animatedContainer.classList.add("animated-container");

  //link
    const link = document.createElement("a");
    link.classList.add("image-link");
    link.href = data.link;

    link.textContent = data.link.trim() !== "" ? "View Collection" : "";

    imageContainer.appendChild(image);
    imageContainer.appendChild(imageText);
    imageContainer.appendChild(animatedContainer);
    imageContainer.appendChild(link);
    imageTrack.appendChild(imageContainer);
  });
}

populateImageTrack();




/*

scrolling logic

*/


const track = document.getElementById("image-track");


let currentPercentage = 0;      //tracks the current scroll by percentage

//scrolling starts with the last image as the minimum, and the first image as the maximum
//don't change values from -0 to -100
const minPercentage = -100;
const maxPercentage = -0;


/* for tracking the mouse down for dragging */
const handleOnDown = e => {
  track.dataset.mouseDownAt = e.clientX;
  track.dataset.prevPercentage = currentPercentage;
};

/* for tracking the mouse up for dragging */
const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
};

/* for calcualting how much the mouse has dragged */
const handleOnMove = e => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100, nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage, nextPercentage = clamp(nextPercentageUnconstrained, minPercentage, maxPercentage);

  currentPercentage = nextPercentage;   //updates new percentage for track

  updateTrackPosition();
};


/* for scroll wheel movement */
const handleScroll = e => {
  const delta = Math.max(-1, Math.min(1, (e.deltaY || -e.wheelDelta || e.detail)));

  /* The sensitivity must be negative to invert the direction of the scroll. I chose to invert the direction so that it better mimics scrollig on a vertical page. */
  const scrollSpeed = -5;

  currentPercentage += delta * scrollSpeed;
  currentPercentage = clamp(currentPercentage, minPercentage, maxPercentage);

  updateTrackPosition();
};

/* translating the images based on the currentPercentage */
const updateTrackPosition = () => {
  track.dataset.percentage = currentPercentage;

  track.animate(
    {
      transform: `translate(${currentPercentage - 15.5}%, -50%)`  //The subtract from current position to affect the starting position. You will also need to change this in the CSS
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {

     image.animate(
       {
         objectPosition: `${50}% center`
       },
       { duration: 1200, fill: "forwards" }
    );
  }
};


function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}


/* for listening */
window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = handleOnUp;
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);
window.addEventListener("wheel", handleScroll);
