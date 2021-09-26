const parameters = getAllUrlParams(window.location.href);

const magazine_edition = parameters["magazine"].replace(/[\u00A0-\u9999<>\&]/g, function(i) {
   return '&#'+i.charCodeAt(0)+';';
});

if(magazine_edition==""||magazine_edition==null){
  window.location.href = "index.html";
}

document.getElementById("h_edition").textContent = decodeURI(magazine_edition);

async function getMagazine(magazine){
  if (location.protocol === 'https:') {
    location.replace(`http:${location.href.substring(location.protocol.length)}`);
  }

  const json = await fetch(`http://20.203.135.4:8000/magazine/${magazine}/`);
  if(json["status"]!=200||json==null) window.location.href = "index.html";
  const results = await json.json();

  const articles_edition = document.getElementById("articles_edition");
  for(let i=0;i<results.length;i++){
    const date_val = new Date(results[i]["fields"]["published_date"]);
    let article_val = results[i]["fields"]["title"];
    const article_id = results[i]["fields"]["article_id"];
    const text_val = results[i]["fields"]["content"].slice(0,140).trim() + "...";

    if(article_val.length>28){
      article_val = article_val.slice(0,26).trim();
      article_val += "...";
    }

    let article = document.createElement("article");

    let date = document.createElement("div");
    date.classList.add("article_date");
    date.textContent = `${date_val.getDate()}.${date_val.getMonth()+1}.${date_val.getFullYear()}`;

    let article_title = document.createElement("a");
    article_title.classList.add("article_title");
    article_title.href = `article.html?article=${article_id}`;;
    article_title.textContent = article_val;

    let article_text = document.createElement("div");
    article_text.classList.add("article_text");
    article_text.textContent = text_val;

    let article_button = document.createElement("div");
    article_button.classList.add("article_button");
    article_button.textContent = "Read more";

    article.appendChild(date);
    article.appendChild(article_title);
    article.appendChild(article_text);
    article.appendChild(article_button);
    articles_edition.appendChild(article);
  }
}

getMagazine(magazine_edition);
