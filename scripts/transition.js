function animateImageTrack() {
  var imageTrack = document.getElementById('image-track');
  var animatedContainer = document.getElementById('animated-container');
  var links = [
    { src: 'images/illustration/Knight1.png', text: 'Image 1' },
    { src: 'images/illustration/Knight2.png', text: 'Image 2' },
  ];
  // Fade out image-track
  imageTrack.style.transition = 'opacity 1s';
  imageTrack.style.opacity = '0';

  // Clear previous content
  animatedContainer.innerHTML = '';

  // Fade in new content after a delay
  setTimeout(function() {
    for (var i = 0; i < links.length; i++) {
      var container = document.createElement('div');
      container.className = 'image-container';
      var img = document.createElement('img');
      img.className = 'image';
      img.src = links[i].src;
      img.draggable = 'false';
      var text = document.createElement('p');
      text.className = 'image-text';
      text.textContent = links[i].text;
      container.appendChild(img);
      container.appendChild(text);
      animatedContainer.appendChild(container);
    }
    // Fade in animated-container
    animatedContainer.style.transition = 'opacity 1s';
    animatedContainer.style.opacity = '1';

    // Reset image-track opacity after animation completes
    setTimeout(function() {
      imageTrack.style.opacity = '1';
    }, 1000);
  }, 1000); // Delay the fade in to start after the fade out completes
}
