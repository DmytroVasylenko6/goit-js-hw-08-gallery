import photos from "./gallery-items.js";

const galleryEl = document.querySelector(".js-gallery");
const buttonEl = document.querySelector('[data-action="close-lightbox"]');
const overlayEl = document.querySelector(".lightbox__overlay");
const lightboxEl = document.querySelector(".lightbox");
const lightboxImageEl = document.querySelector(".lightbox__image");
const sliderControlLeft = document.querySelector('.slider__control_left');
const sliderControlRight = document.querySelector('.slider__control_right');
let index = 0;


const makePhotoCard = (photo, index) => {
  const itemEl = createElement('li');
  itemEl.classList.add("gallery-item");
  
  const linkAtts = {href: photo.original}
  const linkEl = createElement('a', linkAtts)
  linkEl.classList.add("gallery-link");
  linkEl.addEventListener("click", (event) => event.preventDefault());

  const imageAtts = { "data-src": photo.preview, 'data-index': index, 'data-source': photo.original, alt: photo.description };
  const imageEl = createElement('img', imageAtts)
  imageEl.classList.add("gallery-image", "lazyload");
  imageEl.setAttribute('loading', 'lazy');
  

  if ('loading' in HTMLImageElement.prototype) {
    console.log('Браузер поддерживает');
    imageEl.src = imageEl.dataset.src;
  } else if (document.querySelector('.script-lazyload') === null) {
    const script = document.createElement('script')
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.2/lazysizes.min.js";
    script.integrity = "sha512-TmDwFLhg3UA4ZG0Eb4MIyT1O1Mb+Oww5kFG0uHqXsdbyZz9DcvYQhKpGgNkamAI6h2lGGZq2X8ftOJvF/XjTUg==";
    script.crossorigin = "anonymous"
    script.class = "script-lazyload"
    document.body.appendChild(script)
    console.log('Браузер НЕ поддерживает');
  }

  // const itemEl = document.createElement("li");
  // itemEl.classList.add("gallery-item");

  // const linkEl = document.createElement("a");
  // linkEl.classList.add("gallery-link");
  // linkEl.setAttribute("href", `${photo.original}`);
  // linkEl.addEventListener("click", (event) => event.preventDefault());

  // const imageEl = document.createElement("img");
  // imageEl.classList.add("gallery-image");
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
buttonEl.addEventListener("click", onButtonCloseModalClick);


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

  const imageUrl = event.target.dataset.source;
  const imageAlt = event.target.getAttribute('alt');

  openModal();
  changesValueAttribute(imageUrl, imageAlt);
  index = +event.target.dataset.index;
}

function openModal() {
  window.addEventListener("keydown", onKeyDown);
  overlayEl.addEventListener("click", onOverlayClick);
  sliderControlLeft.addEventListener('click', prev);
  sliderControlRight.addEventListener('click', next);
  lightboxEl.classList.add("is-open");
}

function changesValueAttribute(url, alt) {
  lightboxImageEl.setAttribute("src", `${url}`);
  lightboxImageEl.setAttribute("alt", `${alt}`);
}

function onButtonCloseModalClick(event) {
  if (event.target.nodeName !== "BUTTON") {
    return;
  }
  closeModal();
  attributeClearing();
}

function closeModal() {
  window.removeEventListener("keydown", onKeyDown);
  overlayEl.removeEventListener("click", onOverlayClick);
  sliderControlLeft.removeEventListener('click', prev);;
   sliderControlRight.removeEventListener('click', next);
  lightboxEl.classList.remove("is-open");
}

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

function onKeyDown(event) {
  if (event.code === "Escape") {
    closeModal();
    attributeClearing();
  }
  if (event.code === 'ArrowRight') next();
  if (event.code === 'ArrowLeft') prev();
}

function next() {
  
  const nextIndex = ++index;
  if (photos[nextIndex]) {
    lightboxImageEl.src = photos[nextIndex].original;
    lightboxImageEl.alt = photos[nextIndex].description
  }
  else {
    index = 0, lightboxImageEl.src = photos[index].original;
    lightboxImageEl.alt = photos[index].description
  }
}

function prev() {
  
  const prevIndex = --index;
  if (photos[prevIndex]) {
    lightboxImageEl.src = photos[prevIndex].original;
    lightboxImageEl.alt = photos[prevIndex].description
  } else {
    index = photos.length - 1, lightboxImageEl.src = photos[index].original;
    lightboxImageEl.alt = photos[index].description
  }
}
    


