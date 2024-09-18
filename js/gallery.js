import photos from "./gallery-items.js";

const galleryEl = document.querySelector(".js-gallery");
let index = 0;

const makePhotoCard = (photo, index) => {
  const itemEl = createElement('li');
  itemEl.classList.add("gallery-item");
  
  const linkAtts = { href: photo.original };
  const linkEl = createElement('a', linkAtts);
  linkEl.classList.add("gallery-link");
  linkEl.addEventListener("click", (event) => event.preventDefault());

  const imageAtts = { "data-src": photo.preview, 'data-index': index, 'data-source': photo.original, alt: photo.description };
  const imageEl = createElement('img', imageAtts);
  imageEl.classList.add("gallery-image", "lazyload");
  imageEl.setAttribute('loading', 'lazy');

  if ('loading' in HTMLImageElement.prototype) {
    imageEl.src = imageEl.dataset.src;
  } else if (document.querySelector('.script-lazyload') === null) {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.2/lazysizes.min.js";
    script.integrity = "sha512-TmDwFLhg3UA4ZG0Eb4MIyT1O1Mb+Oww5kFG0uHqXsdbyZz9DcvYQhKpGgNkamAI6h2lGGZq2X8ftOJvF/XjTUg==";
    script.crossorigin = "anonymous";
    script.class = "script-lazyload";
    document.body.appendChild(script);
  }

  linkEl.append(imageEl);
  itemEl.append(linkEl);
  return itemEl;
};

const photoCard = photos.map(makePhotoCard);
galleryEl.append(...photoCard);

galleryEl.addEventListener("click", onImageClick);

function createElement(name, attrs = {}) {
  const element = document.createElement(name);
  for (const key in attrs) {
    element.setAttribute(key, attrs[key]);
  }
  return element;
}

function onImageClick(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }

  const imageUrl = event.target.dataset.source;
  const imageAlt = event.target.getAttribute('alt');
  index = +event.target.dataset.index;

  openModal(imageUrl, imageAlt);
}

function openModal(url, alt) {
  const instance = basicLightbox.create(`
    <img src="${url}" alt="${alt}" width="800" height="600">
  `);

  instance.show();

  window.addEventListener("keydown", onKeyDown.bind(null, instance));
}

function onKeyDown(instance, event) {
  if (event.code === "Escape") {
    instance.close();
    window.removeEventListener("keydown", onKeyDown.bind(null, instance));
  }
  if (event.code === 'ArrowRight') next(instance);
  if (event.code === 'ArrowLeft') prev(instance);
}

function next(instance) {
  const nextIndex = ++index;
  const nextPhoto = photos[nextIndex] || photos[0];
  index = nextPhoto ? nextIndex : 0;

  const newContent = `<img src="${nextPhoto.original}" alt="${nextPhoto.description}" width="800" height="600">`;
  instance.element().querySelector('img').src = nextPhoto.original;
  instance.element().querySelector('img').alt = nextPhoto.description;
}

function prev(instance) {
  const prevIndex = --index;
  const prevPhoto = photos[prevIndex] || photos[photos.length - 1];
  index = prevPhoto ? prevIndex : photos.length - 1;

  instance.element().querySelector('img').src = prevPhoto.original;
  instance.element().querySelector('img').alt = prevPhoto.description;
}
