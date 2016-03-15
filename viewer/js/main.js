var graph = fetch('../../type-derivation.dot')
.then(function(response) {
  return response.text();
})
.then(function(content) {
  document.body.innerHTML += Viz(content,  { engine: "dot" });
})
.catch(function(err){
  console.log(err)
})
