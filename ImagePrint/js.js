var nameBox = document.getElementById("nameDateBox");
nameBox.style.display = "none";
var imageData;

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
    dataBox.style.lineHeight = fSize.value * 3 * 0.9 + "pt";
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

// ! showing the file choose by button
photo.onchange = (evt) => {
  const [file] = imgInp.files;
  if (file) {
    document.getElementById("proImg").src = URL.createObjectURL(file);
  }
};

// ! back to menu function
function backMenu() {
  document.getElementById("main").style.display = "inline";
  document.getElementById("picBox").style.display = "none";
}

// ! Print
function pri() {
  document.getElementById("options").style.display = "none";
  document.getElementById("realPicBox").style.padding = "0";
  document.getElementById("realPicBox").style.marginLeft = "0";
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
function liveNDShow(currentWork, data) {
  liveName = document.getElementById("liveName");
  liveDate = document.getElementById("liveDate");
  if (currentWork === 1) {
    liveName.innerHTML = data;
    liveNameStore = data;
  }
  if (currentWork === 2) {
    liveDate.innerHTML = data;
  }
  if (currentWork === 3) {
    if (data > 15) {
      fSize.value = 15;
      data = 15;
    }
    liveName.style.fontSize = data * 3 + "pt";
    liveDate.style.fontSize = data * 3 + "pt";
    dataBox.style.lineHeight = data * 3 * 0.9 + "pt";
  }
}

// * Generate Function
function gen(event) {
  event.preventDefault();
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
  // if image added then remove red shadow
  document.getElementById("proImg").style.boxShadow = "";

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
    if (name == "" || date == "") {
    }
    // select all p and change their value
    var d = document.getElementsByClassName("data");
    for (let i = 0; i < d.length; i++) {
      d[i].innerHTML = name + "<br>" + date;
      d[i].style.fontSize = document.getElementById("fSize").value + "pt";
      d[i].style.lineHeight =
        document.getElementById("fSize").value * 0.9 + "pt";
    }
  } else {
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
}
