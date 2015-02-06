//Create a collections called posts
Posts = new Mongo.Collection('posts');

Posts.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
})