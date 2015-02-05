//get specific datas from db
Meteor.publish('posts', function() {
  return Posts.find();
});