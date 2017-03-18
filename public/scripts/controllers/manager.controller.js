/*jshint esversion: 6 */
angular.module('app')
    .controller('ManagerController', ['$http', 'CohortFactory', '$mdDialog', function($http, CohortFactory, $mdDialog) {
        var self = this;

        self.cohort = CohortFactory.cohort;
        CohortFactory.getPeople();

        self.addPerson = function(name) {
            CohortFactory.addPerson(name);
        };
        self.deletePerson = function(student) {
            CohortFactory.deletePerson(student);
        };

        self.addPersonDialog = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.prompt()
                .title('What is the name of the new student?')
                .textContent('Luke is a good name.')
                .placeholder('Student name')
                .ariaLabel('Student name')
                .targetEvent(ev)
                .ok('Save')
                .cancel('Cancel');

            $mdDialog.show(confirm)
                .then(function(result) {
                  self.addPerson(result);
                });
        };

                self.addCohortDialog = function(ev) {
                    // Appending dialog to document.body to cover sidenav in docs app
                    var confirm = $mdDialog.prompt()
                        .title('What is the name of the new cohort?')
                        .textContent('Sigma is a good name.')
                        .placeholder('Cohort name')
                        .ariaLabel('Cohort name')
                        .targetEvent(ev)
                        .ok('Save')
                        .cancel('Cancel');

                    $mdDialog.show(confirm)
                        .then(function(result) {
                          self.addCohort(result);
                        });
                };

    }]);
