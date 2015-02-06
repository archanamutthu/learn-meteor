Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    var post = {
      url : $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };
    //insert function will return id for the post which isto be inserted using the url is constructed
    //this has some drwbacks where user can insert data from console so to avoid that we are using Meteor method
    // post._id = Posts.insert(post);
    // Router.go('postPage', post);
    Meteor.call('postInsert', post, function(error, result) {
      if(error) {
        return alert(error.reason);
      }
      if(result.postExists) {
        return alert("This post already exists!!!");
      }
      Router.go('postPage', {_id: result._id});
    })
  }
});

//Points
// - Meteor method is server side function that is called client side
// - Router.go is redirect the page to certain page with the id where the url can be constructed with that
//-postInsert is called in posts collections