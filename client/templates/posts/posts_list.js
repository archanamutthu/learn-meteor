//template with name postsList can have access to this datas
Template.postsList.helpers({
  posts: function() {
    return Posts.find();
  }
});