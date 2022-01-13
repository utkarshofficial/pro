var nameBox = document.getElementById("nameDateBox");
nameBox.style.display = "none";
var imageData;



// ---------------------- for image paste
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('paste', function (evt) {
        const clipboardItems = evt.clipboardData.items;
        const items = [].slice.call(clipboardItems).filter(function (item) {
            // Filter the image items only
            return item.type.indexOf('image') !== -1;
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
    if (cb.checked) {
        nameBox.style.display = "inline";
        return true;
    } else {
        nameBox.style.display = "none";
        return false;
    }
}

// changes the all images data
function change() {
    var imgs = document.querySelectorAll("img");
    imgs.forEach(function (img) {
        img.setAttribute('src', document.getElementById("proImg").src);
    });
}

// ! showing the file choose by button
photo.onchange = evt => {
    const [file] = imgInp.files
    if (file) {
      document.getElementById("proImg").src = URL.createObjectURL(file)
    }
  }

// ! back to menu function
function backMenu() {
    document.getElementById("main").style.display = "inline";
    document.getElementById("picBox").style.display = "none";
}

// ! Print
function pri() {
    document.getElementById("options").style.display = "none";
    document.getElementById("foot").style.display = "none";
    window.print();
    document.getElementById("foot").style.display = "block";
    document.getElementById("options").style.display = "flex";
}

// * Generate Function
function gen() {
    // for checking image is pasted or not
    var srcName = document.getElementById("proImg").src;
    var oldName = "img.png";
    var s = "";
    for (let i = srcName.length - 1; i >= 0; i--) {
        if (srcName[i] == '/') {
            break;
        }
        s = srcName[i] + s;
    }
    if (s == oldName) {
        // document.getElementById("proImg").style.border = "2px solid red"
        document.getElementById("proImg").style.boxShadow = "0 4px 8px 0 rgba(255, 0, 0, 0.8), 0 6px 20px 0 rgba(255, 0, 0, 0.8)";
        return;
    }
    var imgCount = document.getElementById("count").value;
    if (imgCount == "") {
        return;
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
            d[i].innerHTML = name + "<br>" + date;
        }

    } else {

    }
    for (let i = 1; i <= 30; i++) {
        document.getElementById(i + "i").style.display = "none";
    }
    for (let i = 1; i <= imgCount; i++) {
        if (i > 30) {
            break;
        }
        document.getElementById(i + "i").style.display = "inline";
    }

}

// ! Handle Enter key press
function handle(e) {
    if (e.key === 13) {
        gen();
    }
}
