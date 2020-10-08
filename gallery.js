import photos from "./gallery-items.js";

const galleryEl = document.querySelector(".js-gallery");
const buttonEl = document.querySelector('[data-action="close-lightbox"]');
const overlayEl = document.querySelector(".lightbox__overlay");
//Создание и рендер разметки по массиву данных и предоставленному шаблону.

const makePhotoCard = (photo) => {
  const itemEl = document.createElement("li");
  itemEl.classList.add("gallery__item");

  const linkEl = document.createElement("a");
  linkEl.classList.add("gallery__link");
  linkEl.setAttribute("href", `${photo.original}`);
  linkEl.addEventListener("click", (event) => event.preventDefault());

  const imageEl = document.createElement("img");
  imageEl.classList.add("gallery__image");
  imageEl.setAttribute("src", `${photo.preview}`);
  imageEl.setAttribute("data-source", `${photo.original}`);
  imageEl.setAttribute("alt", `${photo.description}`);
  linkEl.append(imageEl);
  itemEl.append(linkEl);
  return itemEl;
};

const photoCard = photos.map(makePhotoCard);
galleryEl.append(...photoCard);

//Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

galleryEl.addEventListener("click", onImageClick);
buttonEl.addEventListener("click", onButtonClick);
overlayEl.addEventListener("click", onOverlayClick);

function onImageClick(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const cardEl = event.target;
  const imageUrl = cardEl.dataset.source;
  const parentCard = cardEl.closest(".gallery__item");

  openModal();
  changesValueAttribute(imageUrl);
  return cardEl;
}

//Открытие модального окна по клику на элементе галереи.
function openModal() {
  window.addEventListener("keydown", onEscKeyDown);
  document.querySelector(".lightbox").classList.add("is-open");
}

//Подмена значения атрибута src элемента img.lightbox__image.
function changesValueAttribute(target) {
  document.querySelector(".lightbox__image").setAttribute("src", `${target}`);
}

function onButtonClick(event) {
  if (event.target.nodeName !== "BUTTON") {
    return;
  }
  closeModal();
  attributeClearing();
}

//Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]
function closeModal() {
  window.removeEventListener("keydown", onEscKeyDown);
  document.querySelector(".lightbox").classList.remove("is-open");
}

//Очистка значения атрибута src элемента img.lightbox__image.
function attributeClearing() {
  document.querySelector(".lightbox__image").setAttribute("src", "");
}

function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    closeModal();
    attributeClearing();
  }
}

function onEscKeyDown(event) {
  if (event.code === "Escape") {
    closeModal();
    attributeClearing();
  }
}
