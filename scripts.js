//function to get idea-title-input
function getIdeaTitleInput () {
  var ideaTitleInput = $('#idea-title-input').val();
};

//function to get idea-body-input
function getIdeaBodyInput () {
  var ideaBodyInput = $('#idea-body-input').val();
};


//an idea object has a unique ID, title, body, and a quality.
function Idea(title, body) {
  this.title = title;
  this.body = body;
};

var myIdea = new Idea ("bahah", "alalala", quality);

// event listener for save button to trigger getInput functions
$('.container').on('click', '.save-button', function(){
  getIdeaTitleInput();
  getIdeaBodyInput();
});
