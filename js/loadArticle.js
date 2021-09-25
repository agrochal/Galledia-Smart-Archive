let index = 0;

const parameters = getAllUrlParams(window.location.href);

const article = parameters["article"];

if (!isNaN(article)) {
  if (article > -1) {
    index = article;
  }
}

async function getArticles(id) {

  const json = await fetch(`http://20.203.135.4:8000/article/${id}/`);
  const article = await json.json();
  console.log(article);

}

getArticles(article);
