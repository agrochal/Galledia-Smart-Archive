function indexOfMax(arr) {
  if (arr.length === 0) {
    return -1;
  }
  let max = arr[0];
  let maxIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }
  return maxIndex;
}
function sortFunction(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}
const images = [["image1.jpg",50267], ["image2.jpg",6997568], ["image3.jpg",326900]];

images.sort(sortFunction);


let text_length = document.getElementById('text').textContent.length;
let proportion = text_length / (images.length - 1);
let text = document.getElementById('text').textContent;
document.getElementById('text').innerHTML = text.slice(0, proportion);
for (let i = 0; i < images.length; i++) {
  let img = '<img src="assets/' + images[i][0] + '">';
  if (i == 0) {
    document.getElementById('header_image').innerHTML = img;
    continue;
  }
  document.getElementById('text').innerHTML += img + text.slice(proportion * i, proportion * (i + 1))
}
