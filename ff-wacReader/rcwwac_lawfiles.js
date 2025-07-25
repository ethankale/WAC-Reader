

var elements = document.getElementsByTagName("div")

for (var i = 0; i < elements.length; i++) {
  element = elements[i];
  element.style.removeProperty("text-indent");
}

reformat(elements);

function reformat(elements) {

  // Starts with (1) or similar
  var level1regex = new RegExp('^[(][0-9]+[)]');
  // Starts with (a) or similar
  var level2regex = new RegExp('^[(][a-z][)]');
  // Starts with (i) or similar (lower case roman numeral)
  var level3regex = new RegExp('^[(](xc|xl|l?x{0,3})(ix|iv|v?i{0,3})[)]');
  // Starts with (A) or similar
  var level4regex = new RegExp('^[(][A-Z][)]');
  // Starts with (i) or similar (lower case roman numeral)
  var level5regex = new RegExp('^[(](XC|XL|L?X{0,3})(IX|IV|V?I{0,3})[)]');

  // Starts with a specific comment
  var commentregex = new RegExp('^<!-- field: BeginningSection -->');

  var lowerhregex = new RegExp('\\(h\\)');
  var upperHregex = new RegExp('\\(H\\)');

  var lastClass   = "level1";
  var lastContent = "";

  for (var i = 0, element; element = elements[i++];) {
    element.style.removeProperty("text-indent");
    
    var currentClass = lastClass;
    
    if (level1regex.test(element.innerHTML) || commentregex.test(element.innerHTML)) {
      currentClass = "level1";
    
    // Element 3 comes first, because otherwise (i) would be classified as
    //  a lower-case letter (2), rather than a roman numeral (3).
    } else if (level3regex.test(element.innerHTML)) {
      if (lowerhregex.test(lastContent)) {
        currentClass = "level2";
      } else {
        currentClass = "level3";
      };
    } else if (level2regex.test(element.innerHTML)) {
      currentClass = "level2";
    
    // Same as 3 and 2 above.
    } else if (level5regex.test(element.innerHTML)) {
      currentClass = "level5";
    } else if (level4regex.test(element.innerHTML)) {
      currentClass = "level4";
    };
    
    // console.log(lastContent);
    // console.log(element.innerHTML);
    // console.log(currentClass);
    // console.log('----');
    
    element.className = currentClass;
    lastClass   = currentClass;
    lastContent = element.innerHTML;
    
  }
}