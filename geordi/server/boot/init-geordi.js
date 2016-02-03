module.exports = function(app) {
  app.dataSources['geordi-mysql'].autoupdate('ACL', function(err) {
      console.log(err);
  });
  app.dataSources['geordi-mysql'].autoupdate('AccessToken', function(err) {
      console.log(err);
  });
  app.dataSources['geordi-mysql'].autoupdate('User', function(err) {
      console.log(err);
  });
  app.dataSources['geordi-mysql'].autoupdate('Role', function(err) {
      console.log(err);
  });
  app.dataSources['geordi-mysql'].autoupdate('RoleMapping', function(err) {
      console.log(err);
  });
  app.dataSources['geordi-mysql'].autoupdate('event', function(err) {
      console.log(err);
  });
  app.dataSources['geordi-mysql'].autoupdate('userseq', function(err) {
      console.log(err);
  });
};