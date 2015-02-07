//local collections
//meaning error collections will only present in browser and will not try to synchronize with server
//name of collection is set to null so that it is not saved in server side database
Errors = new Mongo.Collection(null);
throwError = function(message) {
  Errors.insert({message: message});
};