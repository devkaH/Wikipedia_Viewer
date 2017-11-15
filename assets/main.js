const $ = window.$
var apiURL = 'https://en.wikipedia.org/w/api.php?callback=?'

function searchResult () {
  $('.searchBox').append("<img id='assets/clearIcon' src='icon.png'>")
// call ajax for get informations
  $.getJSON(apiURL, {
    action: 'query',
    format: 'json',
    inprop: 'url',
    formatversion: 2,
    prop: 'extracts|pageimages|info',
    generator: 'search',
    gsrsearch: $('#search').val(),
    gsrwhat: 'text',
    piprop: 'thumbnail',
    pilimit: 'max',
    pithumbsize: 200,
    exsentences: 3,
    exintro: '',
    explaintext: '',
    exlimit: 10
  })
.success(function (response) {
  updateUI(response)
})
  // Display the search results (article+image)
  function updateUI (response) {
    var data = response.query.pages
    data.forEach(function (resp) {
      if (resp.thumbnail) {
        $('#searchResult').append(
          "<a  href='" + resp.fullurl + "' target= '_blank'><div id='result' class='results'><h3>" + resp.title + "</h3><p  class='extract'>" + resp.extract.substring(0, resp.extract.indexOf('.') + 1) + '</p> </div> <img src=' + resp.thumbnail.source + '><hr>')
      }
    })
    data.forEach(function (resp) {
      $('#searchResult').append(
        "<a  href='" + resp.fullurl + "' target= '_blank'><div id='result' class='results'><h3>" + resp.title + "</h3><p  class='extract'>" + resp.extract.substring(0, resp.extract.indexOf('.') + 1) + '</p> </div><hr>')
    })
  }
}

 // clear prior search results
function clearResults () {
  $('.searchBox').append("<img id='clearIcon' src='assets/icon.png'>")
  $('#clearIcon').click(function () {
    $('#searchResult').empty()
    $('#search').val('')
    $('#clearIcon').remove()
  })
}

  // trigger submit on use of enter key
$('#search').keyup(function (event) {
  if (event.keyCode === 13) {
    searchResult()
    clearResults()
  }
})
