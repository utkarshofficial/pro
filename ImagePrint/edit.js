let i = {
  brightness: 100,
  contrast: 100,
  saturate: 100,
  grayscale: 0,
  scaleX: 1,
  scaleY: 1,
  rotateAngle: 0,
  set: (name, val) => {
    switch (name) {
      case "Brightness":
        i.brightness = val;
        break;
      case "Contrast":
        i.contrast = val;
        break;
      case "Saturation":
        i.saturate = val;
        break;
      case "Grayscale":
        i.grayscale = val;
        break;
      default:
        break;
    }
  },
  reset: () => {
    i.brightness = 100;
    i.contrast = 100;
    i.saturate = 100;
    i.grayscale = 0;
    i.scaleX = 1;
    i.scaleY = 1;
    i.rotateAngle = 0;
    document.querySelector(".edit-options .active").classList.remove(".active");
    document.getElementById("start").click();
    applyFilter();
  },
  rotate: () => {
    i.rotateAngle += 90;
    return i.rotateAngle;
  },
  flipH: () => {
    i.scaleX = i.scaleX === -1 ? 1 : -1;
  },
  flipV: () => {
    i.scaleY = i.scaleY === -1 ? 1 : -1;
  },
};

let edit = {
  options: document.querySelectorAll(".edit-options li"),
  title: document.querySelector("#edit-title"),
  slider: document.querySelector("#edit-range"),
  value: document.querySelector("#edit-value"),
  image: document.querySelectorAll(".filter"),
};

// for mattching whos button clicked return that variable
function getButtonValue(name) {
  switch (name) {
    case "Brightness":
      edit.slider.min = 0;
      edit.slider.max = 200;
      return i.brightness;
      break;
    case "Contrast":
      edit.slider.min = 0;
      edit.slider.max = 200;
      return i.contrast;
      break;
    case "Saturation":
      edit.slider.min = 0;
      edit.slider.max = 200;
      return i.saturate;
      break;
    case "Grayscale":
      edit.slider.min = 0;
      edit.slider.max = 100;
      return i.grayscale;
      break;
    default:
      break;
  }
}

// * Editor options
edit.options.forEach((filter) => {
  // adding event listener for edit options
  filter.addEventListener("click", () => {
    // cliked text
    let clickedText = filter.lastElementChild.innerHTML;
    if (clickedText === "Reset") {
      i.reset();
      return;
    }
    if (clickedText === "Rotate") {
      i.rotate();
      applyFilter();
      return;
    }
    if (clickedText === "Flip H") {
      i.flipH();
      applyFilter();
      return;
    }
    if (clickedText === "Flip V") {
      i.flipV();
      applyFilter();
      return;
    }

    // removeing and adding active class
    document.querySelector(".edit-options .active").classList.remove("active");
    filter.classList.add("active");

    // changing slider name,title
    edit.title.innerText = clickedText;
    edit.value.innerText = getButtonValue(clickedText) + "%";
    edit.slider.value = getButtonValue(clickedText);
  });
});

// * handle slider change
edit.slider.addEventListener("input", () => {
  i.set(
    document.querySelector(".edit-options .active span").innerHTML,
    edit.slider.value
  );
  edit.value.innerHTML = edit.slider.value + "%";
  applyFilter();
});

// * add filter to image
const applyFilter = () => {
  edit.image.forEach((img) => {
    img.style.filter = `brightness(${i.brightness}%) contrast(${i.contrast}%) saturate(${i.saturate}%) grayscale(${i.grayscale}%)`;
    // img.style.rotate = `${i.rotateAngle}deg`;
    img.style.transform = `rotate(${i.rotateAngle}deg) scale(${i.scaleX}, ${i.scaleY})`;
  });
};

// uploading image by clicking bigImage
var changed = 0;
document.querySelector(".big-show").addEventListener("click", () => {
  if (!changed) {
    imgInput.click();
    document.querySelector(".big-show").style.cursor = "unset";
    changed = 1;
    imgChanged = 1;
  }
});

// upload img animation
const dispImg = document.getElementById("proImg");
function uploadAnime(mouseevent) {
  if (
    dispImg.src.indexOf("asdfghjkl;'mouse.png") !== -1 ||
    dispImg.src.indexOf("asdfghjkl;'.png") !== -1
  ) {
    if (mouseevent === "enter") {
      dispImg.src = "./asdfghjkl;'mouse.png";
    } else {
      dispImg.src = "./asdfghjkl;'.png";
    }
  } else {
    return;
  }
}

// simulating click
document.getElementById("start").click();
