angular.module('NerdService', []).factory('NerdSrvc', ['$http', function($http) {

	return {
		// call to get all nerds
		get : function() {
			return $http.get('/api/nerds');
		},

		pesquisa : function(nerd) {
			if (nerd.nome == ""){
				nerd.nome = undefined;
			};
			if (nerd.sobrenome == "") {
				nerd.sobrenome = undefined;
			};

			return $http.get('/api/nerds/' + nerd.nome + '-' + nerd.sobrenome);
		},

		// call to POST and create a new nerd
		create : function(nerdData) {
			return $http.post('/api/nerds', nerdData);
		},

		// call to DELETE a nerd
		delete : function(id) {
			return $http.delete('/api/nerds/' + id);
		}
	}		

}]);