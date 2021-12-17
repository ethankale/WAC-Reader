
var elements = document.getElementById("contentWrapper").children[2].children;

// Starts with (1) or similar
var level1regex = new RegExp('^[(][0-9]+[)]');
// Starts with (a) or similar
var level2regex = new RegExp('^[(][a-z][)]');
// Starts with (i) or similar (lower case roman numeral)
var level3regex = new RegExp('^[(](xc|xl|l?x{0,3})(ix|iv|v?i{0,3})[)]');

for (var i = 0, element; element = elements[i++];) {
  element.style.removeProperty("text-indent");
  
  if (level1regex.test(element.innerHTML)) {
    element.className = "level1";
  // Element 3 comes first, because otherwise (i) would be classified as
  //  a lower-case letter (2), rather than a roman numeral (3).
  } else if (level3regex.test(element.innerHTML)) {
    element.className = "level3";
  } else if (level2regex.test(element.innerHTML)) {
    element.className = "level2";
  }
}