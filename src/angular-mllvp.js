(function (MLLVP, angular) {

  var ngMLLVP = angular.module('ngMLLVP', []);

  ngMLLVP.directive('mllvp', function () {

    return {
      restrict: 'E',
      scope: {
        setup: '=',
        player: '='
      },
      link: function (scope, element, attrs) {

        scope.player = new MLLVP.Player(element, scope.setup);

      }
    };

  });

}(MLLVP, angular));