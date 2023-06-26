import { dogsData } from "./data.js";

const emotionsEl = document.getElementById("emotion-radios");
const radioEls = document.getElementsByClassName("radio");
const getImageBtn = document.getElementById("get-image-btn");
const modal = document.getElementById("meme-modal");
const modalInner = document.getElementById("meme-modal-inner");
const modalCloseBtn = document.getElementById("meme-modal-close-btn");
const isChippyOnly = document.getElementById("gifs-only-option");

modalCloseBtn.addEventListener("click", closeModal);
emotionsEl.addEventListener("change", highlightSelectedEmotion);
getImageBtn.addEventListener("click", renderImage);

function closeModal() {
  modal.style.display = "none";
}

function highlightSelectedEmotion(e) {
  for (let radioEl of radioEls) {
    radioEl.classList.remove("highlight");
  }
  e.target.parentElement.classList.add("highlight");
}

function renderImage() {
  const selectedEl = document.querySelector(
    'input[type="radio"]:checked'
  ).value;

  const selectedChoiceArray = dogsData.filter(function (dog) {
    if (isChippyOnly.checked) {
      return dog.emotionTags.includes(selectedEl) && dog.isChippy;
    } else {
      return dog.emotionTags.includes(selectedEl);
    }
  });
  // get selected element Array

  let gifToRender;
  if (selectedChoiceArray < 1) {
    modal.style.display = "flex";
    return (modalInner.textContent = "Sorry, no such gif available");
  } else if (selectedChoiceArray.length === 1) {
    gifToRender = selectedChoiceArray[0];
  } else {
    let randomNo = Math.floor(Math.random() * selectedChoiceArray.length);
    gifToRender = selectedChoiceArray[randomNo];
  }
  // get picture for selected Element

  modalInner.innerHTML = `<img class="dog-img" src="${gifToRender.image}" />`;
  modal.style.display = "flex";
  // put picture into the modal
  // render modal on page
}

function getEmotions() {
  const dogsEmotions = [];

  for (let dog of dogsData) {
    for (let emotion of dog.emotionTags) {
      if (!dogsEmotions.includes(emotion)) dogsEmotions.push(emotion);
    }
  }
  return dogsEmotions;
}

function renderEmotionRadios() {
  const dogsEmotions = getEmotions();
  let emotionsToRender = "";

  for (let emotion of dogsEmotions) {
    emotionsToRender += `
    <div class="radio">
      <label for="${emotion}">${emotion}</label>
      <input type="radio" id="${emotion}" value="${emotion}" name="radio-choice">
    </div>
    `;
  }
  emotionsEl.innerHTML = emotionsToRender;
}

renderEmotionRadios();
