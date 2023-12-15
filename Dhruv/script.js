function addRow(entry, count)
{  
  var table = document.getElementById("catalogue");
  var row = table.insertRow(count);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  var cell7 = row.insertCell(6);
                  
  cell1.innerHTML = count;
  cell2.innerHTML = "<img src=" + entry.fields.image + "></img>";
  cell3.innerHTML = entry.fields.Title;
  cell4.innerHTML = entry.fields.Author;
  cell5.innerHTML = "<div class=\"more\">"+entry.fields.description+"</div>"; 
  cell6.innerHTML = "<div class=\"star-ratings-sprite\"><span style=\"width:" + parseFloat(entry.fields.rating)*20 + "%\" class=\"star-ratings-sprite-rating\"></span></div>";
  cell7.innerHTML = entry.fields.Genre;
}

function cat_search(concept, que){
  $("#quote").css({"position":"fixed","bottom":"0","width":"100%","margin":"0"});
  if(concept === null || que === null);
  else{
  document.getElementById("wait").innerHTML = "Results may take a few seconds to load.";
  document.getElementById("catalogue").innerHTML = "<tr><thead><th>#</th><th>Cover</th><th>Title</th><th>Author</th><th>Description</th><th>Rating</th><th>Genre</th></thead></tr>";
  var query = new RegExp(que, "i");
  $.ajax({
          dataType: "json",
          url: "./data.json",
          mimeType: "application/json",
          success: function(result){
            var len = result.length;
            var table = document.getElementById("catalogue");
            var count = 1;
            if (concept == "Title" || concept == "Filter by"){
              for (var index = 0; index < len; index++) {
                if ((result[index].fields.Title).search(query) !== -1)
                  {addRow(result[index], count); count++}
              }
            }
            if (concept == "Author" || concept == "Filter by"){
              for (var index = 0; index < len; index++) {
                if ((result[index].fields.Author).search(query) !== -1)
                  {addRow(result[index], count); count++}
              }
            }
            if (concept == "Genre" || concept == "Filter by"){
              for (var index = 0; index < len; index++) {
                if ((result[index].fields.Genre).search(query) !== -1)
                  {addRow(result[index], count); count++}
              }
            }
            shorten();
            if (count > 1)
                $("#quote").css({"position":"","bottom":"","width":"","margin":""});
            document.getElementById("wait").innerHTML = (count - 1) + " results found.";
        }
      }); 
    }
}

//Search bar
$(document).ready(function(e){
    var concept = $('span#search_concept').text();
    if ((window.location.pathname).indexOf("catalogue") != -1)
    {
      var con = sessionStorage.getItem("concept");
      var que = sessionStorage.getItem("query");
      $('#query').innerHTML = que;
      cat_search(con, que);
    }
    $('.search-panel .dropdown-menu').find('a').click(function(e) {
		  e.preventDefault();
	    var param = $(this).attr("href").replace("#","");
	    concept = $(this).text();
	    $('.search-panel span#search_concept').text(concept);
	    $('.input-group #search_param').val(param);
	  });
    $('#search-btn').click(function(){
        sessionStorage.setItem("query", $('#query').val());
        sessionStorage.setItem("concept", concept);
        if ((window.location.pathname).indexOf("catalogue") == -1)
          window.location.assign("./catalogue.html");
        else
          cat_search(concept, $('#query').val());
    });
  });
