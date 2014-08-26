angular.module('MainCtrl', []).controller('MainController', function($scope) {

	$scope.Alert = function(tipo, mensagem) {
		$scope.showAlert = true;
		$scope.alertMsg  = mensagem;
		$scope.alert     = tipo;
	};

	$scope.MostraMenu = function(){
		return true;
	};
});