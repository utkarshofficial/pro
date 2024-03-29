var nameBox = document.getElementById("nameDateBox");
nameBox.style.display = "none";
var imageData;
var currentScreenWidth = window.innerWidth;

// ---------------------- for image paste
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("paste", function (evt) {
    const clipboardItems = evt.clipboardData.items;
    const items = [].slice.call(clipboardItems).filter(function (item) {
      // Filter the image items only
      return item.type.indexOf("image") !== -1;
    });
    if (items.length === 0) {
      return;
    }
    const item = items[0];
    imageData = item.getAsFile();
    document.getElementById("proImg").src = URL.createObjectURL(imageData);
    document.getElementById("proImg").style.boxShadow = "";
  });
});
// ----------------------

// checkbox checking function
function showDN() {
  const cb = document.getElementById("cbox");
  var dataBox = document.getElementById("dataBox");
  var liveName = document.getElementById("liveName");
  var liveDate = document.getElementById("liveDate");
  if (cb.checked) {
    nameBox.style.display = "inline";
    liveName.style.visibility = "visible";
    liveDate.style.visibility = "visible";
    dataBox.classList.add("liveData");
    if (currentScreenWidth > 705) {
      dataBox.style.lineHeight = fSize.value * 3 * 0.9 + "pt";
      liveName.style.fontSize = fSize.value * 3 + "pt";
      liveDate.style.fontSize = fSize.value * 3 + "pt";
    } else {
      liveName.style.fontSize = fSize.value + "pt";
      liveDate.style.fontSize = fSize.value + "pt";
      dataBox.style.lineHeight = fSize.value * 0.9 + "pt";
    }
    let count = document.getElementById("count").value;
    for (let i = 1; i <= count; i++) {
      document.getElementById(i + "p").style.display = "block";
    }
    return true;
  } else {
    nameBox.style.display = "none";
    liveName.style.visibility = "hidden";
    liveDate.style.visibility = "hidden";
    dataBox.classList.remove("liveData");
    let count = document.getElementById("count").value;
    for (let i = 1; i <= count; i++) {
      document.getElementById(i + "p").style.display = "none";
    }

    return false;
  }
}

// changes the all images data
function change() {
  var imgs = document.querySelectorAll("img");
  imgs.forEach(function (img) {
    img.setAttribute("src", document.getElementById("proImg").src);
  });
}

// ! back to menu function
function backMenu() {
  if (currentScreenWidth < 705) {
    document.body.style.marginBottom = "45px";
  }
  document.body.style.zoom = 1.0;
  document.getElementById("main").style.display = "inline";
  document.getElementById("picBox").style.display = "none";
}

// ! Print
function pri() {
  document.getElementById("options").style.display = "none";
  document.getElementById("realPicBox").style.padding = "0";
  document.getElementById("realPicBox").style.marginLeft = "0";
  document.body.style.marginBottom = "45px";
  window.print();
  document.getElementById("options").style.display = "flex";
}

// * for checking range of input
function checkRange(value, min, max) {
  if (parseInt(value) < min) {
    return "";
  } else if (parseInt(value) > max) return max;
  else return value;
}
var liveNameStore, liveDataStore;
// * For Live Name and Date Showing
const charForPadding = ["g", "j", "p", "q", ",", ";"];
function liveNDShow(currentWork, data) {
  liveName = document.getElementById("liveName");
  liveDate = document.getElementById("liveDate");
  if (currentWork === 1) {
    liveName.innerHTML = data;
    liveNameStore = data;
    let avail = 0;
    charForPadding.forEach((char) => {
      if (data.indexOf(char) !== -1) {
        liveName.style.paddingBottom = "3px";
        avail = 1;
      } else if (!avail) {
        liveName.style.paddingBottom = "0px";
      }
    });
  }
  if (currentWork === 2) {
    liveDate.innerHTML = data;
    let avail = 0;
    charForPadding.forEach((char) => {
      if (data.indexOf(char) !== -1) {
        liveDate.style.paddingBottom = "3px";
        avail = 1;
      } else if (!avail) {
        liveDate.style.paddingBottom = "0px";
      }
    });
  }
  if (currentWork === 3) {
    if (data > 15) {
      fSize.value = 15;
      data = 15;
    }
    if (currentScreenWidth > 705) {
      liveName.style.fontSize = data * 3 + "pt";
      liveDate.style.fontSize = data * 3 + "pt";
      dataBox.style.lineHeight = data * 3 * 0.9 + "pt";
    } else {
      liveDate.style.fontSize = data + "pt";
      liveName.style.fontSize = data + "pt";
      dataBox.style.lineHeight = data * 0.9 + "pt";
    }
  }
}

// * Generate Function
document.getElementById("submitImage").addEventListener("click", (e) => {
  e.preventDefault();
  currentScreenWidth = window.innerWidth;
  const maxImg = 42;
  // for checking image is pasted or not
  var srcName = document.getElementById("proImg").src;
  var oldName = "img.png";
  var s = "";
  for (let i = srcName.length - 1; i >= 0; i--) {
    if (srcName[i] == "/") {
      break;
    }
    s = srcName[i] + s;
  }
  if (s == oldName) {
    // document.getElementById("proImg").style.border = "2px solid red"
    document.getElementById("proImg").style.boxShadow =
      "0 4px 8px 0 rgba(255, 0, 0, 0.8), 0 6px 20px 0 rgba(255, 0, 0, 0.8)";
    return;
  }
  // for mobile user to zoom out the screen of generated photos
  if (currentScreenWidth < 705) {
    document.body.style.zoom = currentScreenWidth * 0.00125;
    document.body.style.marginBottom = "135px";
  }
  // if image added then remove red shadow
  document.getElementById("proImg").style.boxShadow = "none";

  var imgCount = document.getElementById("count").value;
  if (imgCount === "") {
    document.getElementById("count").value = 5;
    imgCount = 5;
  }
  // first hide all the page content
  document.getElementById("main").style.display = "none";
  document.getElementById("picBox").style.display = "block";
  document.getElementById("options").style.display = "flex";
  change();
  let name, date;

  // for check check box clicked or not
  if (showDN()) {
    name = document.getElementById("name").value;
    date = document.getElementById("date").value;

    // select all p and change their value
    var d = document.getElementsByClassName("data");
    for (let i = 0; i < d.length; i++) {
      let heightLine = 0,
        fz = document.getElementById("fSize").value;
      let paddingBottom = "";
      if (name === "" && date !== "") {
        d[i].innerHTML = date;
      } else if (name !== "" && date === "") {
        d[i].innerHTML = name;
      } else if (name !== "" && date !== "") {
        d[i].innerHTML = name + "<br/>" + date;
      } else {
        break;
      }
      if (name.indexOf("g") !== -1 && date.indexOf("g") !== 1) {
        heightLine = 1;
        paddingBottom = fz * 0.3 + "px";
      } else if (name.indexOf("g") !== -1) {
        heightLine = 1;
        paddingBottom = "0px";
      } else if (date.indexOf("g") !== -1) {
        paddingBottom = fz * 0.3 + "px";
      } else {
        heightLine = 0;
        paddingBottom = "0px";
      }
      d[i].style.fontSize = fz + "pt";
      d[i].style.lineHeight = (heightLine ? Math.abs(fz) + 1 : fz * 0.9) + "pt";
      d[i].style.paddingBottom = paddingBottom;
    }
  }
  for (let i = 1; i <= maxImg; i++) {
    document.getElementById(i + "i").style.display = "none";
  }
  for (let i = 1; i <= imgCount; i++) {
    if (i > maxImg) {
      break;
    }
    document.getElementById(i + "i").style.display = "inline";
  }
});

// * adding right tick to checkbox in starting for pc
if (currentScreenWidth > 705) {
  cbox.checked = true;
  showDN();
}
