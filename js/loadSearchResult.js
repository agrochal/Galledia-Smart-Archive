const parameters = getAllUrlParams(window.location.href);

const search_phrase = parameters["search"];

  if(search_phrase!=""&&search_phrase!=null){
    document.getElementById('search').value = search_phrase;
    document.getElementById('sorting').style.display = "block";
  }
