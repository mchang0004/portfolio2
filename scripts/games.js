const cardsData = [
  {imageUrl: '/images/games/SOS_Thumbnail.png', link: 'https://mchang0004.itch.io/stars-of-sorellia', text: 'Stars of Sorellia - Unity 2D Game | itch.io '},
  {imageUrl: '/images/games/AOS_Thumbnail.png', link: 'https://mchang0004.itch.io/artifacts-of-sorellia', text: 'Artifacts of Sorellia - Unity 3D Game | itch.io '},
  {imageUrl: '/images/games/FA_Thumbnail.png', link: 'https://mchang0004.github.io/ForestAdventure/', text: 'Forest Adventure - Javascript | In Browser'},
  {imageUrl: '/images/games/KAF_Thumbnail.png', link: 'https://mchang0004.itch.io/kaf-sorellia', text: 'KAF - Unity 3D Game | itch.io '},

];

const cardsContainer = document.getElementById('cards');
cardsContainer.style.display = 'grid';
cardsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)'; // 3 columns
cardsContainer.style.gap = '3vh';

function updateGridLayout() {

    const viewportWidth = window.innerWidth;



  if (viewportWidth <= 908 && viewportWidth > 590) {
      cardsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)'; // 2 columns for smaller screens
    } else if (viewportWidth <= 590) {
      cardsContainer.style.gridTemplateColumns = 'repeat(1, 1fr)'; // 1 column for even smaller screens
    } else {
      cardsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)'; // 3 columns for larger screens
    }
  }

updateGridLayout();

window.addEventListener('resize', updateGridLayout);




cardsData.forEach(({imageUrl, link, text }) => {
  const cardElement = document.createElement('div');              //create new div for each card
  cardElement.className = 'card';

  cardElement.addEventListener('click', () => {
    window.open(link, '_blank');                                   //opens the assigned link from the array, and in a new tab
  });

  const frontImageElement = document.createElement('img');        //create new image for each card
  frontImageElement.className = 'card-front-image card-image';
  frontImageElement.src = imageUrl;                               //get image from URL

  const textElement = document.createElement('p');               //create new paragraph element for text
  textElement.className = 'card-text';
  textElement.textContent = text;                                //set text content

  const fadersElement = document.createElement('div');
  fadersElement.className = 'card-faders';

  for (let i = 0; i < 8; i++) {                                   //create faders
    const faderImageElement = document.createElement('img');
    faderImageElement.className = 'card-fader card-image';
    faderImageElement.src = imageUrl;
    fadersElement.appendChild(faderImageElement);
  }

  const effect = document.createElement('div');
  effect.className = 'effect';
  cardElement.appendChild(effect);

  cardElement.appendChild(frontImageElement);                     //stack everything
  cardElement.appendChild(textElement);                           // append text below image
  cardElement.appendChild(fadersElement);
  cardsContainer.appendChild(cardElement);
});
