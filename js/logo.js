window.onscroll = function() {
  growShrinkLogo()
};

function growShrinkLogo() {
  let logo = document.getElementById("Logo");
  let header = document.getElementsByTagName("header")[0];
  if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
    logo.style.width = '37px';
    header.style.padding = '17px';
  } else {
    logo.style.width = '70px';
    header.style.padding = '35px';
  }
}
