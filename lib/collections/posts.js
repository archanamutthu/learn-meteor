//Create a collections called posts
Posts = new Mongo.Collection('posts');

//allowing to user to insert a post only when they are logged in
// Posts.allow({
//   insert: function(userId, doc) {
//     //allow user to insert when they are logged in (clients are allowed to insert only if they have userID)
//     return !!userId;
//   }
// })
Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });
    var user = Meteor.user();
    var post = _.extend('postAttributes', {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    console.log(user);
    console.log(post);
    var postId = Posts.insert(post);
    console.log(postId);
    return {
      _id : postId
    };
  }
});
//Posts.allow - telling the meteor only under this circumstance post has to be added
// how it works

// the userId of the user who is inserting is sent to the allow function.
// postInsert method is called from post_submit.js
// check() method is used to check if javascript object follows the pattern (Here it checks if userid, url, title are strings)
//_extend is underscore js function to extend the javascript objects by adding three more properties into the db
// finally it returns the _id(which is basically caller of this method)