//Create a collections called posts
Posts = new Mongo.Collection('posts');

//allowing to user to insert a post only when they are logged in
Posts.allow({
  insert: function(userId, doc) {
    //allow user to insert when they are logged in (clients are allowed to insert only if they have userID)
    return !!userId;
  }
})
//Posts.allow - telling the meteor only under this circumstance post has to be added
// how it works

// the userId of the user who is inserting is sent to the allow function.