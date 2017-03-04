angular.module('app').controller('BuilderController', ['$http', function($http, $timeout){
    console.log('builder controller running');
    const self = this;



  this.items = ['chris', 'andrew', 'joe'];
  this.cohorts = ['sigma', 'tau'];

  this.loadCohort = function() {


  // Use timeout to simulate a 650ms request.
    return this.cohorts;


};


  }]);
