//Create a collections called posts
Posts = new Mongo.Collection('posts');

//allowing to user to insert a post only when they are logged in
// Posts.allow({
//   insert: function(userId, doc) {
//     //allow user to insert when they are logged in (clients are allowed to insert only if they have userID)
//     return !!userId;
//   }
// })
Posts.allow({
  update: function(userId, post) {
    return ownsDocument(userId, post);
  },
  remove: function(userId, post) { return ownsDocument(userId, post); }
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    return (_.without(fieldNames, 'url', 'title').length > 0)
  }
});

//without is underscore method where it returns sub arrays of field that are not inthis case url and title
//if eveything's normal it will return 0 , if something is wrong it will return 1 so the conditions  return true thus denying the update.

//got rid of allow methid for insert since it is insert new posts via server method
Meteor.methods({
  postInsert: function(postAttributes) {
    console.log(postAttributes.url);
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });
    //check if the code is running on client or server side
    // if(Meteor.isServer) {
    //   postAttributes.title += "(server)";
    //   Meteor._sleepForMs(5000);
    // }
    // else {
    //   postAttributes.title += "(client)";
    // }
    //checking if there is already a post with same url and flagging it
    var postWithSameLinks = Posts.findOne({url : postAttributes.url });
    if(postWithSameLinks) {
      return {
        postExists: true,
        _id: postWithSameLinks._id
      }
    }
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
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
//stub is client simualation