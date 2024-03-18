const track = document.getElementById("image-track");


let currentPercentage = 0;      //tracks the current scroll by percentage

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

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    currentPercentage = nextPercentage;   //updates new percentage for track


  updateTrackPosition();
};


/* for scroll wheel movement */
const handleScroll = e => {
  const delta = Math.max(-1, Math.min(1, (e.deltaY || -e.wheelDelta || e.detail)));

  /* The sensitivity must be negative to invert the direction of the scroll. I chose to invert the direction so that it better mimics scrollig on a vertical page. */
  const scrollSpeed = -5;

  currentPercentage += delta * scrollSpeed;
  currentPercentage = Math.max(Math.min(currentPercentage, 0), -100); //updates new percentage for track

  updateTrackPosition();
};

/* translating the images based on the currentPercentage */
const updateTrackPosition = () => {
  track.dataset.percentage = currentPercentage;

  track.animate(
    {
      transform: `translate(${currentPercentage}%, -50%)`
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + currentPercentage}% center`
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

/* for listening */
window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = handleOnUp;
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);
window.addEventListener("wheel", handleScroll);
