angular.module('app')
  .controller('HomeController', ['FunThings', '$http', function(FunThings, $http){
    const self = this;

    self.current = FunThings.current;
    self.nextBlast = FunThings.nextBlast;
    self.explain = FunThings.explain;

    self.explainButton = function(){
      FunThings.explain.boolean = false;
    }


  }])
