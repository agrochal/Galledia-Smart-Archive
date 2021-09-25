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
//const images = [];
if(images.length>0){
images.sort(sortFunction);

let text = document.getElementById('text').textContent;
let proportion = text.length / (images.length - 1);

const white_spaces = [];
for(let i=0;i<text.length;i++){
  if(text[i]==" "){
    white_spaces.push(i);
  }
}


let old_closest = 0;
document.getElementById('text').innerHTML = "";
for(let i=0;i<images.length;i++){
  let img = '<img src="assets/' + images[i][0] + '">';
  if (i == 0) {
    document.getElementById('header_image').innerHTML = img;
    continue;
  }
  const needle = proportion*i;
  const closest = white_spaces.reduce((a, b) => {
      return Math.abs(b - needle) < Math.abs(a - needle) ? b : a;
  });
  document.getElementById('text').innerHTML += text.slice(old_closest, closest) + img;
  old_closest = closest;
}

document.getElementById('text').innerHTML += text.slice(old_closest, text.length);
} else {
  document.getElementById('header_image').remove();
}
