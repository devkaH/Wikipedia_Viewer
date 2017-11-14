var apiURL = "https://en.wikipedia.org/w/api.php?callback=?";

console.log("hello")
function click() {

  $('#container').append("<img id='clearIcon' src='icon.png'>") ;
  // clear prior search results 
  $('#clearIcon').click(function(){
   $("#searchResult").empty();
   $("#search").val('');

 });


    // clear prior search results 
    $.getJSON(apiURL, {
      action: 'query',
      format: 'json',
      inprop: "url",
      formatversion: 2,
      prop: 'extracts|pageimages|info',
      generator: 'search',
      gsrsearch: $("#search").val(),
      gsrwhat: "text",
      piprop: 'thumbnail',
      pilimit: 'max',
      pithumbsize: 200,
      exsentences: 3,
      exintro: "",
      explaintext: "",        
      exlimit: 10,
    })
    .success(function(response) {
      var data=response.query.pages;
      console.log(data);
      
      data.forEach(function(resp) {
        if (resp.thumbnail){
          $('#searchResult').append(
            "<a  href='" + resp.fullurl + "' target= '_blank'><div id='result' class='results'><h3>" + resp.title + "</h3><p  class='extract'>" + resp.extract.substring(0,resp.extract.indexOf('.')+1) + "</p> </div> <img src=" + resp.thumbnail.source+  "><hr>");
          
        }
      });
      data.forEach(function(resp) {
        
        $('#searchResult').append(
          "<a  href='" + resp.fullurl + "' target= '_blank'><div id='result' class='results'><h3>" + resp.title + "</h3><p  class='extract'>" + resp.extract.substring(0,resp.extract.indexOf('.')+1) + "</p> </div><hr>");
        
      }) ;               
      

    });

  }
  // search



  // trigger submit on use of enter key
  $("#search").keyup(function(event) {
    if (event.keyCode == 13) {
     click();

   }
 });


