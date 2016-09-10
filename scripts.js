//an idea object has a unique ID, title, body, and a quality.
function Idea(title, body, quality, id) {
  this.title = title;
  this.body = body;
  this.quality = quality || "swill";
  this.uniqueID = id || Date.now();
};



var ideaBox = {
  ideas : [],
  // add :
  remove : function removeIdea(uniqueID) {
    id = parseInt(uniqueID);
    this.ideas = this.ideas.filter(function(m){
      return m.id !== this.id;
      this.store;
    })
    },



  store : function generateNewIdea() {
          var title = $('#idea-title-input').val();
          var body = $('#idea-body-input').val();
          var newIdea = new Idea(title, body);
          this.ideas.push(newIdea);
          var stringifiedIdeas = JSON.stringify(this.ideas);
          localStorage.setItem('ideas', stringifiedIdeas);
          render(newIdea);
          // storeIdeas();
        }
  // retrieve :
  // find :

};


function grabStorageAndRender() {
  ideaBox.ideas = JSON.parse(localStorage.ideas) || [];
  for(var i = 0; i < ideaBox.ideas.length; i++) {
    var object = ideaBox.ideas[i];
    var idea = new Idea(object.title, object.body, object.quality, object.id)
    ideaBox.ideas[i] = idea;
    render(idea)
  }
}

//function to generate new idea and set it to local storage


//function to append new idea to the idea box DOM

function render(idea) {
  // var titleInput = $('#idea-title-input').val();
  // var bodyInput = $('#idea-body-input').val();
  $('.results-container').append(`<section><h1 class="idea-output">${idea.title}<button type="image" id="${idea.uniqueID}" class="delete"></button></h1> <p class="idea-body-output">${idea.body}</p> <p class="buttons"> <button type="image" class="upVote"></button> <button type="image" class="downVote"></button> <span class="idea-quality">quality</span>:<span class="idea-quality-rank">${idea.quality}</span></section>`);
};

// grabStorageAndRender();


// event listener for save button to trigger getInput functions
$('.container').on('click', '.save-button', function(){
  ideaBox.store();
});

$('.results-container').on('click', '.delete', function(){
  // var uniqueID = this.;
  ideaBox.remove(uniqueID);
})
