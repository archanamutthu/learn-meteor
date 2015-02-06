Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    var post = {
      url : $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };
    //insert function will return id for the post which isto be inserted using the url is constructed
    post._id = Posts.insert(post);
    Router.go('postPage', post);
  }
});