//an idea object has a unique ID, title, body, and a quality.
function Idea(title, body, quality, id) {
  this.title = title;
  this.body = body;
  this.quality = quality || "swill";
  this.uniqueID = id || Date.now();
};

var onload = function() {
  var local = localStorage.getItem('ideas')
  if (!local) {
    var newLocal = localStorage.setItem('ideas', "[]")
    ideaBox.ideas = newLocal
  } else {
    var currentLocal = JSON.parse(localStorage.getItem('ideas'))
    ideaBox.ideas = currentLocal
  }
}

var ideaBox = {
  ideas : [],
  // add :
  remove : function removeIdea(uniqueID) {
    id = parseInt(uniqueID);
    localStorage.removeItem(id);
    // console.log(id);
    // this.ideas = this.ideas.filter(function(m){
    //   return m.id !== this.id;
    //   this.store;
    // })
    },



  store : function generateNewIdea() {
    var title = $('#idea-title-input').val();
    var body = $('#idea-body-input').val();
    var quality = 'swill';
    var id = Date.now();
    var newIdea = new Idea(title, body, quality, id);
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
    var idea = ideaBox.ideas[i];
    debugger;
    var newIdea = new Idea(
      idea.title,
      idea.body,
      idea.quality,
      idea.id
    )
    render(idea)
  }
}

function clearIdeas() {
  $('.results-container').empty();
}

function reRenderDom() {
  clearIdeas();
  grabStorageAndRender();
}

//function to generate new idea and set it to local storage


//function to append new idea to the idea box DOM

function render(idea) {
  $('.results-container').append(`
    <section class="results-container">
      <h1 class="idea-output">${idea.title}<button type="image" id=${idea.uniqueID} class="delete"></button></h1>
      <p class="idea-body-output">${idea.body}</p> <p class="buttons">
      <button type="image" class="upVote"></button>
      <button type="image" class="downVote"></button>
      <span class="idea-quality">quality</span>
      <span class="idea-quality-rank">${idea.quality}</span>
    </section>`
  );
};

// grabStorageAndRender();


// grabStorageAndRender on Document ready

$(document).ready(function() {
  onload()
  grabStorageAndRender();
})

// event listener for save button to trigger getInput functions
$('.container').on('click', '.save-button', function(){
  ideaBox.store();
  reRenderDom();

});

$('.results-container').on('click', '.delete', function(){
  var uniqueID = +$(this).attr('id');
  console.log(uniqueID)
  debugger;
  localStorage.removeItem(uniqueID);
  // ideaBox.remove(uniqueID);
})
