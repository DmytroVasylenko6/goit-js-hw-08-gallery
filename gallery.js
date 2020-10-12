import photos from "./gallery-items.js";

const galleryEl = document.querySelector(".js-gallery");
const buttonEl = document.querySelector('[data-action="close-lightbox"]');
const overlayEl = document.querySelector(".lightbox__overlay");
const lightboxEl = document.querySelector(".lightbox");
const lightboxImageEl = document.querySelector(".lightbox__image");



//Создание и рендер разметки по массиву данных и предоставленному шаблону.

const makePhotoCard = (photo, index) => {
  const itemEl = createElement('li');
  itemEl.classList.add("gallery__item");
  
  const linkAtts = {href: photo.original}
  const linkEl = createElement('a', linkAtts)
  linkEl.classList.add("gallery__link");
  linkEl.addEventListener("click", (event) => event.preventDefault());

  const imageAtts = { src: photo.preview, 'data-index': index, 'data-source': photo.original, alt: photo.description };
  const imageEl = createElement('img', imageAtts)
  imageEl.classList.add("gallery__image");

  // const itemEl = document.createElement("li");
  // itemEl.classList.add("gallery__item");

  // const linkEl = document.createElement("a");
  // linkEl.classList.add("gallery__link");
  // linkEl.setAttribute("href", `${photo.original}`);
  // linkEl.addEventListener("click", (event) => event.preventDefault());

  // const imageEl = document.createElement("img");
  // imageEl.classList.add("gallery__image");
  // imageEl.setAttribute("src", `${photo.preview}`);
  // imageEl.setAttribute("data-source", `${photo.original}`);
  // imageEl.setAttribute("alt", `${photo.description}`);
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

function createElement(name, attrs = {}) {
  const element = document.createElement(name);
  for (const key in attrs) {
    element.setAttribute(key, attrs[key])
  }
  return element;
}

function onImageClick(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }
  let currentIndex = event.target.dataset.index;
  const cardEl = event.target;
  const imageUrl = cardEl.dataset.source;
  const imageAlt = cardEl.getAttribute('alt');

  // const parentCard = cardEl.closest(".gallery__item");
  openModal();
  changesValueAttribute(imageUrl, imageAlt);
  
}

//Открытие модального окна по клику на элементе галереи.
function openModal() {
  window.addEventListener("keydown", onEscKeyDown);
  lightboxEl.classList.add("is-open");
}

//Подмена значения атрибута src элемента img.lightbox__image.
function changesValueAttribute(url, alt) {
  lightboxImageEl.setAttribute("src", `${url}`);
  lightboxImageEl.setAttribute("alt", `${alt}`);
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
  lightboxEl.classList.remove("is-open");
}

//Очистка значения атрибута src элемента img.lightbox__image.
function attributeClearing() {
  lightboxImageEl.removeAttribute("src");
  lightboxImageEl.removeAttribute("alt");
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
 
//cлайдер
const sliderControllLeft = document.querySelector('.slider__control_left');
const sliderControllRight = document.querySelector('.slider__control_right');
sliderControllLeft.addEventListener('click', previousImage)
sliderControllRight.addEventListener('click', nextImage)

function previousImage(event) {

  let index = photos.findIndex((el) => {
    return el.original === lightboxImageEl.getAttribute("src");
  });
if (index <= photos.length && index >= 0) {
    index -= 1;
  } else { return; }
  const previousPic = photos[index].original;
  lightboxImageEl.setAttribute("src", previousPic);
}

function nextImage(event) {
  
  let index = photos.findIndex((el) => {
    return el.original === lightboxImageEl.getAttribute("src");
  });
  
  if (index <= photos.length && index >= 0) {
    index += 1;
  } else { return; }
  
  const previousPic = photos[index].original;
  lightboxImageEl.setAttribute("src", previousPic);

}


