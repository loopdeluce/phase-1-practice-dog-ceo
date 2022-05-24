const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';

document.addEventListener('DOMContentLoaded', init);

function init(event) {
  fetch(imgUrl)
  .then(resp => resp.json())
  .then(data => data.message.forEach(dogImg => createDogPics(dogImg)))

  fetch(breedUrl)
  .then(resp => resp.json())
  .then(data => {
    Object.keys(data.message).forEach(breed => addDogBreeds(breed))
    addDropDownEvent(Object.keys(data.message))
  // .then(data => createBreedDictionary(Object.keys(data.message)))
  })
};

function createDogPics(dogImg) {
  const dogImgDiv = document.getElementById('dog-image-container');
  const img = document.createElement('img');
  img.src = dogImg;
  img.alt = 'Dog CEO';
  dogImgDiv.append(img);
};

function addDogBreeds(breed){
  const dogListElement = document.getElementById('dog-breeds');
  const li = document.createElement('li');
  li.textContent = breed;

  li.addEventListener('click', event => event.target.style.color = '#800040');

  dogListElement.append(li);
};

function addDropDownEvent(breedList) {
  const dropdown = document.getElementById('breed-dropdown');
  dropdown.addEventListener('change', event => {
    //console.log('change')
    filterBreeds(event.target.value, breedList);
  } )
};

function filterBreeds(filterLetter, breedList) {
  const filteredList = breedList.filter(breed => breed[0] === filterLetter);
  removeChildren();
  filteredList.forEach((dog) => addDogBreeds(dog));
}

function removeChildren(){
  const dogListElement = document.getElementById('dog-breeds');
  while(dogListElement.firstChild) {
    dogListElement.removeChild(dogListElement.firstChild);
  }

}