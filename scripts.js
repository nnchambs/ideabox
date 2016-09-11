var $titleInput = $('#idea-title-input');
var $bodyInput = $('#idea-body-input');


onLoad();

//an idea object has a unique ID, title, body, and a quality.
function Idea(title, body, quality, id) {
  this.title = title;
  this.body = body;
  this.quality = quality || "swill";
  this.uniqueID = id || Date.now();
};
// when the page loads, please set the local storage to an empty array with the key of 'ideas' and then render them on the DOM, pretty please
function onLoad() {
  setLocalStorage();
  renderLocalStorageAsFuckingIdeas;
}
// get local storage and set it to [] if there is no local storage
function setLocalStorage () {
if (localStorage.getItem('ideas') === null) {
     localStorage.setItem ('ideas', JSON.stringify([]));
   }
};

//get ideas from localStorage
function getIdeasFromLocalStorage() {
  var ideas = localStorage.getItem('ideas');
  return JSON.parse(ideas);
}
// render the goddamn ideas
  function renderLocalStorageAsFuckingIdeas () {
    var ideas = getIdeasFromLocalStorage;
    ideas.forEach (function(idea){
      renderIdeas(idea.title, idea.body, idea.quality, idea.uniqueID);
    })

  };
//function to generate and render a new ideas
  function generateNewIdea() {
          var title = $titleInput.val();
          var body = $bodyInput.val();
          var newIdea = new Idea(title, body);
          ideas = getIdeasFromLocalStorage();
          ideas.push(newIdea);
          var stringifiedIdeas = JSON.stringify(ideas);
          localStorage.setItem('ideas', stringifiedIdeas);
          renderIdeas(newIdea);
  };

//function to render ideas on the damn page

function renderIdeas(idea) {
  // var titleInput = $('#idea-title-input').val();
  // var bodyInput = $('#idea-body-input').val();
  $('.results-container').append(`<section><h1 class="idea-output">${idea.title}<button type="image" id="${idea.uniqueID}" class="delete"></button></h1> <p class="idea-body-output">${idea.body}</p> <p class="buttons"> <button type="image" class="upVote"></button> <button type="image" class="downVote"></button> <span class="idea-quality">quality</span>:<span class="idea-quality-rank">${idea.quality}</span></section>`);
};


// //get ideas from localStorage
// function getIdeasFromLocalStorage() {
//   var ideas = local.storage.getItem('ideas');
//   return JSON.parse(ideas);
// }

// // render the goddamn ideas
//   function renderLocalStorageAsFuckingIdeas () {
//     debugger;
//     var ideas = getOrSetLocalStorage();
//     ideas.forEach (function(idea){
//       render(idea.title, idea.body, idea.quality, idea.uniqueID);
//     })
//     // return ideaBox.ideas;
//   };

//
// function generateNewIdea() {
//         var title = $titleInput.val();
//         var body = $bodyInput.val();
//         var newIdea = new Idea(title, body);
//         ideaBox.ideas.push(newIdea);
//         var stringifiedIdeas = JSON.stringify(this.ideas);
//         localStorage.setItem('ideas', stringifiedIdeas);
//         render(newIdea);
// };
//
// function getOrSetLocalStorage () {
// ideaBox.ideas = localStorage.getItem('ideas');
//
// if (ideaBox.ideas === null) {
//   localStorage.setItem ('ideas', JSON.stringify([]));
//     }
// else {
//   ideaBox.ideas = JSON.parse(ideaBox.ideas);
//     }
// return ideaBox.ideas;
// };

// function makeLocalStorageIdeas () {
//   var ideas = getOrSetLocalStorage();
//   ideas.forEach (function(idea){
//     renderIdeas(idea.title, idea.body, idea.quality, idea.uniqueID);
//   })
// };




// var ideaBox = {
//   ideas : [],
//   // add :
//   remove : function removeIdea(uniqueID) {
//     id = parseInt(uniqueID);
//     this.ideas = this.ideas.filter(function(m){
//       return m.id !== this.id;
//       this.store;
//     })
//     },
//
//
//
//   store : function generateNewIdea() {
//           var title = $titleInput.val();
//           var body = $bodyInput.val();
//           var newIdea = new Idea(title, body);
//           ideaBox.ideas.push(newIdea);
//           var stringifiedIdeas = JSON.stringify(this.ideas);
//           localStorage.setItem('ideas', stringifiedIdeas);
//           render(newIdea);
//           clearInputFields();
//           // storeIdeas();
//         }
//   // retrieve :
//   // find :
//
// };

// function generateNewIdea() {
//   var title = $titleInput.val();
//   var body = $bodyInput.val();
//   var newIdea = new Idea(title, body);
//   storeNewIdea(newIdea);
//
// }
//
//
// function storeNewIdea (newIdea) {
//   this.ideas.push(newIdea);
//   var stringifiedIdeas = JSON.stringify(this.ideas);
//   localStorage.setItem('ideas', stringifiedIdeas);
// }


// function storeNewIdea() {
//   this.ideas.push(newIdea)
//   var stringifiedIdeas = JSON.stringify(this.ideas);
//   localStorage.setItem('ideas', stringifiedIdeas)
// };


// // get local storage and set it to [] if there is no local storage
// function setLocalStorage () {
// if (localStorage.getItem('ideas') === null) {
//      localStorage.setItem ('ideas', JSON.stringify([]));
//    }
// };
//
// //get ideas from localStorage
// function getIdeasFromLocalStorage() {
//   var ideas = local.storage.getItem('ideas');
//   return JSON.parse(ideas);
// }
//
// // render the goddamn ideas
//   function renderLocalStorageAsFuckingIdeas () {
//     debugger;
//     var ideas = getOrSetLocalStorage();
//     ideas.forEach (function(idea){
//       render(idea.title, idea.body, idea.quality, idea.uniqueID);
//     })
//     // return ideaBox.ideas;
//   };


//render that shit (ideaBox.ideas) on the page



// need to re-write grabStorageAndRender with a forEach command where forEach goes through the ideas array and turns each localStorage item into an idea and then renders it on the page
// function grabStorageAndRender() {
//   ideaBox.ideas = JSON.parse(localStorage.ideas) || [];
//
//
//   var idea = new Idea(object.title, object.body, object.quality, object.id)
//
//   forEach(new Idea(ideaBox.ideas) {
//
//
//   }
//
//   ideaBox.ideas[i] = idea;
//
//   for(var i = 0; i < ideaBox.ideas.length; i++) {
//     var object = ideaBox.ideas[i];
//     render(idea)
//   }
// }

//function to generate new idea and set it to local storage


//function to append new idea to the idea box DOM



// grabStorageAndRender();

//clear the input fields
function clearInputFields() {
   $titleInput.val('');
   $bodyInput.val('');
};

// event listener for save button to trigger getInput functions
$('.container').on('click', '.save-button', function(){
  generateNewIdea();
  clearInputFields();
});

// $('.results-container').on('click', '.delete', function(){
//   ideaBox.remove(uniqueID);
// });
