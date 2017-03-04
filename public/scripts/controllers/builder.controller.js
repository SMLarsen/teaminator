angular.module('app')
  .controller('BuilderController', ['$http', function($http){
    console.log('builder controller running');
    const self = this;



  this.items = [1,2,3,4,5];
  this.selected = [1];
  this.toggle = function (item, list) {
    var idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item);
    }
  };

  this.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };

  this.isIndeterminate = function() {
    return ($scope.selected.length !== 0 &&
        $scope.selected.length !== $scope.items.length);
  };

  this.isChecked = function() {
    return $scope.selected.length === $scope.items.length;
  };

  this.toggleAll = function() {
    if ($scope.selected.length === $scope.items.length) {
      $scope.selected = [];
    } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
      $scope.selected = $scope.items.slice(0);
    }
  };
// });

  }]);
