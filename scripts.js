//cached selectors
var $titleInput = $('#idea-title-input');
var $bodyInput = $('#idea-body-input');
var $searchInput = $('.search-input');
var $saveButton = $('.save-button');
//event listener for save button
$saveButton.on('click', function() {
  IdeaBox.createNewIdea();
});
//event listener for delete button
$('.results-container').on('click', '.delete', function() {
  ideaToBeRemoved = $(this).parent();
  var id = parseInt(ideaToBeRemoved.attr('id'));
  IdeaBox.removeIdea(id);
  ideaToBeRemoved.remove();
});
//event listener for up-vote button
$('.results-container').on('click', '.up-vote', function() {
  var id = parseInt($(this).parent().parent().attr('id'));
  var ideaToBeUpVoted = IdeaBox.findIdeaByID(id);
    if (ideaToBeUpVoted.quality === 'swill') {
      ideaToBeUpVoted.quality = 'plausible';
    }
    else if (ideaToBeUpVoted.quality === 'plausible'){
      ideaToBeUpVoted.quality = 'genius'
    }
    else if (ideaToBeUpVoted.quality === 'genius') {
      ideaToBeUpVoted.quality = 'genius'
    }
  var newQuality = ideaToBeUpVoted.quality;
  IdeaBox.changeQuality(id, newQuality);
});
//event listener for down-vote button
$('.results-container').on('click', '.down-vote', function() {
  var id = parseInt($(this).parent().parent().attr('id'));
  var ideaToBeDownVoted = IdeaBox.findIdeaByID(id);
    if (ideaToBeDownVoted.quality === 'genius') {
      ideaToBeDownVoted.quality =  'plausible';
    } else if (ideaToBeDownVoted.quality === 'plausible'){
    ideaToBeDownVoted.quality = 'swill';
    } else if (ideaToBeDownVoted.quality === 'swill'){
    ideaToBeDownVoted.quality = 'swill';
    }
  var newQuality = ideaToBeDownVoted.quality;
  IdeaBox.changeQuality(id, newQuality);
});
//event listener for search function
$searchInput.on('keyup', function() {
  var searchInput = $searchInput.val();
  IdeaBox.searchIdeas(searchInput);
});

//event listeners for editing title and preventing default on enter key

$('.results-container').on('keypress', '.editable-title', function(e) {
  if (e.which == 13) {
    e.preventDefault();
    $(this).blur();
  }
});
$('.results-container').on('focusout', '.editable-title', function() {
  var id = parseInt($(this).parent().attr('id'));
  var newTitle = $(this).text();
  IdeaBox.changeTitle(id, newTitle);
});
//event listeners for editing body and preventing default on enter key
$('.results-container').on('focusout', '.editable-body', function() {
  var id = parseInt($(this).parent().attr('id'));
  var newBody = $(this).text();
  IdeaBox.changeBody(id, newBody);
});

$('.results-container').on('keypress', '.editable-body', function(e) {
  if (e.which == 13) {
    e.preventDefault();
    $(this).blur();
  }
});
//function to get storage and render on page load
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

function sortIdeas(){
  
}
//IdeaBox holds OUR ideas array with a whole bunch of methods
var IdeaBox = {

  ideasArray: [],

  createNewIdea: function() {
    var newIdea = new Idea($titleInput.val(), $bodyInput.val());
    this.ideasArray.push(newIdea);
    this.storeIdeasArray();
    this.renderIdeas(newIdea);
  },

  storeIdeasArray: function() {
    localStorage.setItem('ideas', JSON.stringify(this.ideasArray));
  },

  renderIdeas: function (idea) {
    $('.results-container').prepend(`<section id= ` + idea.id +  ` class="idea-output"><h1 class="editable-title" contenteditable = 'true'>` + idea.title + `</h1><button type="image" class="delete"></button> <p contenteditable='true' class="editable-body">`+ idea.body + `</p> <p class="buttons"> <button type="image" class="up-vote"></button> <button type="image" class="down-vote"></button> <span class="idea-quality">quality</span>:<span class="idea-quality-rank">`+ idea.quality +`</span></section>`);
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
  },

  changeQuality: function (id, newQuality) {
    var idea = this.findIdeaByID(id);
    idea.quality = newQuality;
    var ideaIndex = IdeaBox.ideasArray.indexOf(idea);
    IdeaBox.ideasArray[ideaIndex] = idea;
    this.storeIdeasArray();
    $('.idea-output').remove();
    this.renderIdeasArray();
  },

  searchIdeas: function(searchInput) {
    if(searchInput !== ""){
      $('.results-container').find('section:not(:contains('+ searchInput + '))').slideUp();
      $('.results-container').find('section:contains(' + searchInput + ')').slideDown();
    } else {
   $('.results-container').find('section').slideDown();
 };
},

  // changeBody: function(id, newText){
  //   var idea = this.findIdeaByID(id);
  //   idea.
  //
  // },

  changeTitle: function(id, newTitle){
    var idea = this.findIdeaByID(id);
    idea.title = newTitle;
    var ideaIndex = IdeaBox.ideasArray.indexOf(idea);
    IdeaBox.ideasArray[ideaIndex] = idea;
    this.storeIdeasArray();
  },

  changeBody: function(id, newBody){
    var idea = this.findIdeaByID(id);
    idea.body = newBody;
    var ideaIndex = IdeaBox.ideasArray.indexOf(idea);
    IdeaBox.ideasArray[ideaIndex] = idea;
    this.storeIdeasArray();
  }


}
