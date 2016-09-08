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




// event listener for save button to trigger getInput functions
$('.container').on('click', '.save-button', function(){
  generateNewIdea();
});
