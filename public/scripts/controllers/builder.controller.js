angular.module('app').controller('BuilderController', ['$http', '$location', function($http, $location){
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
    })
    .then(function(res) {
      console.log("SUCCESS");
      $location.path('/teams');
    })
  }

  }])
  .config(function($mdThemingProvider) {
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
  $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
  $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
  $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});//end controller config
