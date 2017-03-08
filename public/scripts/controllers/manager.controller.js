/*jshint esversion: 6 */
angular.module('app')
  .controller('ManagerController', ['$http', function($http){

    //variables
    const self = this;

    self.cohort = {};
    self.cohort.name = "Sigma";
    self.newMember = {};

    //AJAX calls


    function getCohorts(){
      var promise = $http({
        method: 'GET',
        url: '/cohort'
      }).then(function(response){
        self.cohorts = response.data
        console.log("Cohorts", self.cohorts);
      });
      return promise;
    }

 //  this function needs to get person by
 //  the cohort id provided by the home select a cohort
 //  IKNOWTHISBELONGSINAFACTORYIDOWHATIWANT     (╯°□°)╯︵┻┻

    function getPerson(){
      var promise = $http({
        method: 'GET',
        url: '/person'
      }).then(function(response){
        self.people = response.data
      });
      return promise;
    }

    getCohorts();
    getPerson();

    //DOM interactions
    self.submitMember = function(newMember){
      self.newMember.name = newMember;
      //replace the 1 int with cohort_id from proper get request
      self.newMember.cohort_id = 1;
      self.people.push(self.newMember)
      newMember = {};
      self.newMember = {};
      console.log(self.people);
    }

//on submitMember
   //assogn newMember appropriate cohort
   //put newMember into DB
   //get members from DB?
}]);
