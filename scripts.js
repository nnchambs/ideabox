//an idea object has a unique ID, title, body, and a quality.
function Idea(title, body) {
  this.title = title;
  this.body = body;
  this.quality = "swill";
  this.uniqueID = Date.now();
};


//function to generate new idea
function generateNewIdea() {
  var newIdea = new Idea();
  newIdea.title = $('#idea-title-input').val();
  newIdea.body = $('#idea-body-input').val();
  localStorage.setItem('ideas ,', newIdea);
};



//function to generate new Idea
// var myIdea = new Idea ();

// event listener for save button to trigger getInput functions
$('.container').on('click', '.save-button', function(){
  generateNewIdea();
});
