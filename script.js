const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
const initialPhotoLoadCount = 3;
const photoLoadCount = 10;

// Unsplash API
const apiKey = "GDGFW_mMIPo9gXVtyyltb7WxUjXYWNZPr8ugO9VwE5M";

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  console.log("hidden status", loader.hidden);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to set attributes on HTML elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links & photos, add to DOM
function displayPhotos(photosArray) {
  totalImages += photosArray.length;
  photosArray.forEach((photo) => {
    // Create anchor element to link to unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // Put <img> inside <a> element, then put both inside image container element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos(count) {
  try {
    const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos(photosArray);
  } catch (error) {
    return console.log(error);
  }
}

// Check to see if scrolling is close to bottom, and load more photos
window.addEventListener("scroll", () => {
  if (window.scrollY >= document.body.offsetHeight - 2000 && ready) {
    ready = false;
    getPhotos(photoLoadCount);
  }
});

// On Load
getPhotos(initialPhotoLoadCount);
