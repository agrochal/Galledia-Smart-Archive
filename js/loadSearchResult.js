const parameters = getAllUrlParams(window.location.href);

const search_phrase = parameters["search"].replace(/[\u00A0-\u9999<>\&]/g, function(i) {
   return '&#'+i.charCodeAt(0)+';';
});

  if(search_phrase!=""&&search_phrase!=null){
    document.getElementById('search').value = search_phrase;
    document.getElementById('sorting').style.display = "block";
  }

async function getSearchResults(search_phrase){
  if (location.protocol === 'https:') {
    location.replace(`http:${location.href.substring(location.protocol.length)}`);
  }
  const json = await fetch(`http://20.203.135.4:8000/search/${search_phrase}/`);
  if(json["status"]!=200||json==null) window.location.href = "index.html";
  const results = await json.json();

  const articles_section = document.getElementById("articles_section");
  for(let i=0;i<results.length;i++){
    const mini_query = await fetch(`http://20.203.135.4:8000/article/0/`);
    if(mini_query["status"]!=200||mini_query==null) window.location.href = "index.html";
    const article_info = await mini_query.json();
    const date_val = new Date(article_info["publishment_date"]);
    const magazine_val = results[i]["Magazine_edition"];
    const article_val = results[i]["Title"];
    const article_id = results[i]["Article_id"];
    const text_val = results[i]["Textdata"].slice(0,140) + "...";

    let article = document.createElement("article");

    let date = document.createElement("div");
    date.classList.add("article_date");
    date.textContent = `${date_val.getDate()}.${date_val.getMonth()+1}.${date_val.getFullYear()}`;

    let magazine_name = document.createElement("a");
    magazine_name.classList.add("magazine_name");
    magazine_name.href = `magazine_edition.html?magazine=${magazine_val}`;
    magazine_name.textContent = magazine_val;

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
    article.appendChild(magazine_name);
    article.appendChild(article_title);
    article.appendChild(article_text);
    article.appendChild(article_button);
    articles_section.appendChild(article);
  }
}

getSearchResults(search_phrase);
