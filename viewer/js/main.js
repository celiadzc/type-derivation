var graph = fetch('../../type-derivation.dot')
.then(function(response) {
  return response.text();
})
.then(function(content) {
  document.body.innerHTML += Viz(content,  { engine: "circo" });
})
.catch(function(err){
  console.log("error");
})
