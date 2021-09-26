function sortFunction(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}

let index = -1;

const parameters = getAllUrlParams(window.location.href);

const article = parameters["article"];

if (!isNaN(article)) {
  if (article > -1) {
    index = article;
  } else {
    window.location.href = "index.html";
  }
} else {
  window.location.href = "index.html";
}

async function getArticle(id) {
  if (location.protocol === 'https:') {
    location.replace(`http:${location.href.substring(location.protocol.length)}`);
  }
  const json = await fetch(`http://20.203.135.4:8000/article/${id}/`);
  if(json["status"]!=200||json==null) window.location.href = "index.html";
  const article = await json.json();

  const title = article["title_article"];
  const text = article["article_text"];
  const magazine_edition = article["magazine_edition"];
  const publishment_date = new Date(article["publishment_date"]);
  const images = [];
  for(let i=0;i<article["images"].length;i++){
    images.push([article["images"][i]["image"]["image_path"],article["images"][i]["image"]["size"]]);
  }
  const days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

  if(title==""||title==null) window.location.href = "index.html";
  if(text==""||text==null) window.location.href = "index.html";
  if(magazine_edition==""||magazine_edition==null) window.location.href = "index.html";
  if(publishment_date==""||publishment_date==null) window.location.href = "index.html";

  document.getElementsByTagName('h1')[0].textContent = title;
  document.getElementsByTagName('h3')[0].textContent = `${days[publishment_date.getDay()]}, ${publishment_date.getDate()}.${publishment_date.getMonth()+1}.${publishment_date.getFullYear()}`;
  document.getElementsByTagName('h3')[1].getElementsByTagName('a')[0].textContent = magazine_edition;
  document.getElementsByTagName('h3')[1].getElementsByTagName('a')[0].href = `magazine_edition.html?magazine=${magazine_edition}`
  document.getElementById('text').textContent = text;

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

}

getArticle(article);
