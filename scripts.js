//cached selectors
var $titleInput = $('#idea-title-input');
var $bodyInput = $('#idea-body-input');
var $searchinput = $('.search-input');
var $saveButton = $('.save-button');

$saveButton.on('click', function() {
  IdeaBox.createNewIdea();
});

$('.results-container').on('click', '.delete', function() {
  ideaToBeRemoved = $(this).parent().parent();
  var id = parseInt(ideaToBeRemoved.attr('id'));
  IdeaBox.removeIdea(id);
  ideaToBeRemoved.remove();
})

$(document).ready(function(){
  IdeaBox.onLoad();
});



//an idea object has a unique ID, title, body, and a quality.
function Idea(title, body, quality, id) {
  this.title = title;
  this.body = body;
  this.quality = quality || "swill";
  this.id = id || Date.now();
};

var IdeaBox = {

  ideasArray: [],

  createNewIdea: function() {
    var newIdea = new Idea($titleInput.val(), $bodyInput.val());
    console.log(newIdea);
    this.ideasArray.push(newIdea);
    this.storeIdeasArray();
    this.renderIdeas(newIdea);
  },

  storeIdeasArray: function() {
    localStorage.setItem('ideas', JSON.stringify(this.ideasArray));
  },

  renderIdeas: function (idea) {
    $('.results-container').append(`<section id= ` + idea.id +  ` class="idea-output"><h1>` + idea.title + `<button type="image" class="delete"></button></h1> <p class="idea-body-output">`+ idea.body + `</p> <p class="buttons"> <button type="image" class="up-vote"></button> <button type="image" class="down-vote"></button> <span class="idea-quality">quality</span>:<span class="idea-quality-rank">`+ idea.quality +`</span></section>`);
  },

  getStorageAndRender: function() {
    var storedIdeas = JSON.parse(localStorage.getItem('ideas'));
    if (storedIdeas)  {
      this.ideasArray = storedIdeas.map( function(e) {
        return new Idea(e.title, e.body, e.quality, e.id)
      })
    }
    this.renderIdeasArray();
  },

  renderIdeasArray: function () {
    for (var i = 0; i < this.ideasArray.length; i++) {
      this.renderIdeas(this.ideasArray[i]);
    }
  },

  onLoad: function () {
    this.getStorageAndRender();
  },

  removeIdea: function(id) {
    this.ideasArray = this.ideasArray.filter(function(i){
      return i.id !== id;
    })
    this.storeIdeasArray();
  },

  findIdeaByID: function(id) {
    return this.ideasArray.find(function(i){
      return i.id === id;
    })
  }

  //qualityUp: function(id, newQuality) {
    // var idea = this.findIdeaByID(id)
    // idea.quality = newQuality
    //this.storeIdeasArray
// }
}
