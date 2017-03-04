angular.module('app').controller('BuilderController', ['$http', function($http, $timeout){
    console.log('builder controller running');
    const self = this;



  self.items = ['chris', 'andrew', 'joe'];
  self.cohorts = [1,2,3,4];
  self.projectName = "Phil";
  self.loadCohort = function() {


  // Use timeout to simulate a 650ms request.
    return this.cohorts;


};


  }]);
