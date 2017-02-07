function retrieveYouTubeData(query, callback) {
  var BASE_URL = "https://www.googleapis.com/youtube/v3/search";
  var API_KEY = "AIzaSyD6wvx7TIO2grORCJ5AdNZihH7OYUXLl-w";
  var query = {
    part: "snippet",
    maxResults: 6,
    q: query,
    key: API_KEY
  };
  $.getJSON(BASE_URL, query, callback);
}

function modifyStr(string) {
  return string.replace(/\s/g, "");
}

function renderItem(item, index) {
    return ("<div class='row' id='"+index+"'>"+
                "<div class='col-6'>"+
                  "<a href='https://www.youtube.com/watch?v="+item.id.videoId+"'>"+
                  "<img class='image' src='"+item.snippet.thumbnails.high.url+"'/></a>"+
                "</div>"+
                "<div class='col-6'>"+
                  "<a href='https://www.youtube.com/watch?v="+item.id.videoId+"'>"+
                  "<h2>"+item.snippet.title+"</h2></a>"+
                  "<a href='https://www.youtube.com/user/"+modifyStr(item.snippet.channelTitle)+"'>"+
                  "<p>"+item.snippet.channelTitle+"</p></a>"+
                  "<p>"+item.snippet.description+"</p>"+
                "</div>"+
            "</div>");
}

function displayData(data) {
  var html = data.items.map(function(item, index) {
    return renderItem(item, index);
  });
  $(".container").html(html);
}

// Events
function handleSubmit(element, inputEl) {
  element.submit(function(event) {
    event.preventDefault();
    var searchCriteria = inputEl.val();
    this.reset();
    retrieveYouTubeData(searchCriteria, displayData);
  });
}

// Document ready
$(function mainFn() {
  handleSubmit($("#form"), $("#search"));
});
