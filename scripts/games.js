const cardsData = [
  {imageUrl: 'images/games/SOS_Thumbnail.png', link: 'https://mchang0004.itch.io/stars-of-sorellia' },
  {imageUrl: 'images/games/AOS_Thumbnail.png', link: 'https://mchang0004.itch.io/artifacts-of-sorellia' },
  {imageUrl: 'images/games/FA_Thumbnail.png', link: 'https://mchang0004.github.io/ForestAdventure/' },

];

const cardsContainer = document.getElementById('cards');

cardsData.forEach(({imageUrl, link }) => {
  const cardElement = document.createElement('div');              //create new div for each card
  cardElement.className = 'card';

  cardElement.addEventListener('click', () => {
  window.open(link, '_blank');                                    //opens the assigned link from the array, and in a new tab
  });

  const frontImageElement = document.createElement('img');        //create new image for each card
  frontImageElement.className = 'card-front-image card-image';
  frontImageElement.src = imageUrl;                               //get image from URL

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
  cardElement.appendChild(fadersElement);
  cardsContainer.appendChild(cardElement);
});
