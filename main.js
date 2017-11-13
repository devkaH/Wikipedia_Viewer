var apiURL = "https://en.wikipedia.org/w/api.php?callback=?";


$('#searchSubmit').click(function() {

  $('#container').append("<img id='clearIcon' src='icon.png'>") ;
  // clear prior search results 
  $('#clearIcon').click(function(){
   $("#searchResult").empty();
   $("#search").val('');

 })


    // clear prior search results 
    $.getJSON(apiURL, {
      action: 'query',
      format: 'json',
      inprop: "url",
      formatversion: 2,
      prop: 'extracts|pageimages',
      generator: 'search',
      gsrsearch: $("#search").val(),
      gsrwhat: "text",
      prop: 'extracts|info',
      exsentences: 3,
      exintro: "",
      explaintext: "",        
      exlimit: 10,
    })
    .success(function(response) {
      console.log(response);
      response.query.pages.forEach(function(resp) {
        $('#searchResult').append(
          "<a href='" + resp.fullurl + "' target= '_blank'><div id='result' class='results'><h3>" + resp.title + "</h3><p  class='extract'>" + resp.extract.substring(0,resp.extract.indexOf('.')+1) + "</p></div>");

      })

    });


  }); // search



  // trigger submit on use of enter key
  $("#search").keyup(function(event) {
    if (event.keyCode == 13) {
      $("#searchSubmit").click();

    }
  });


