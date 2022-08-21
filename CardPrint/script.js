// ! margin between front and back resizer
var mar = 0;

function rightMargin(check) {
  if (check && mar < 10) {
    mar++;
  } else if (!check && mar > 0) {
    mar--;
  }
  document.getElementById("marginTime").style.marginRight = mar + "px";
  console.log(mar);
}

var first = 0;
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("paste", function (evt) {
    var clipboardItems = evt.clipboardData.items;
    var items = [].slice.call(clipboardItems).filter(function (item) {
      // Filter the image items only
      return item.type.indexOf("image") !== -1;
    });
    if (items.length === 0) {
      return;
    }
    var item = items[0];
    imageData = item.getAsFile();
    if (first === 0) {
      document.getElementById("frontImg").src = URL.createObjectURL(imageData);
      first = 1;
      document.getElementById("backImg").src = "back.png"; // for removing olg image after one successful print
    } else if (first === 1) {
      document.getElementById("backImg").src = URL.createObjectURL(imageData);
      first = 0;
    }
  });
});

// ! border function
function checkBorder() {
  var imgS = document.getElementsByClassName("imgSize");
  if (document.getElementById("rounded").checked) {
    imgS[0].style.borderRadius = "10px";
    imgS[1].style.borderRadius = "10px";
  } else {
    imgS[0].style.borderRadius = "";
    imgS[1].style.borderRadius = "";
  }
}
checkBorder();
