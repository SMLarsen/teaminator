angular.module('app').controller('BuilderController', ['$http', function($http, $timeout){
    console.log('builder controller running');
    const self = this;


  self.teamCount;
  self.items = ['chris', 'andrew', 'joe'];
  self.cohorts = [1,2,3,4];
  self.projectName = "Phil";
  self.loadCohort = function() {


  // Use timeout to simulate a 650ms request.
    return this.cohorts;



};

  self.build = function () {
    console.log('clicked');
    $http({
      method: "POST",
      url: "/project",
      data: {
        projectName: self.projectName,
        teamCount : self.teamCount
      }

    }).then(function(res){
      console.log("SUCCESS");
    })
  }

  }]);
