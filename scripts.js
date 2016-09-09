//an idea object has a unique ID, title, body, and a quality.
function Idea(title, body) {
  this.title = title;
  this.body = body;
  this.quality = "swill";
  this.uniqueID = Date.now();
};


//function to generate new idea and set it to local storage
function generateNewIdea() {
  var newIdea = new Idea();
  newIdea.title = $('#idea-title-input').val();
  newIdea.body = $('#idea-body-input').val();
  if (localStorage.ideas) {
    var parsedLocalStorageIdeas = JSON.parse(localStorage.ideas);
  }
  else {
  var parsedLocalStorageIdeas = [];
}
  parsedLocalStorageIdeas.push(newIdea);
  var stringifiedLocalStorageIdeas = JSON.stringify(parsedLocalStorageIdeas);
  localStorage.setItem('ideas', stringifiedLocalStorageIdeas);
};


//function to append new idea to the idea box DOM

function appendNewIdea() {
  var titleInput = $('#idea-title-input').val();
  var bodyInput = $('#idea-body-input').val();
  $('.results-container').append(`<h1 class="idea-output">${titleInput}<button type="image" class="delete"></button></h1> <p class="idea-body-output">${bodyInput}</p> <p class="buttons"> <button type="image" class="upVote"></button> <button type="image" class="downVote"></button> <span class="idea-quality">quality</span>:<span class="idea-quality-rank">swill</span>`);
};


// event listener for save button to trigger getInput functions
$('.container').on('click', '.save-button', function(){
  generateNewIdea();
  appendNewIdea();
});
