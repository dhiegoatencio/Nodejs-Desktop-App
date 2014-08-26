angular.module('NerdCtrl', []).controller('NerdController',
        ['$scope', 'NerdSrvc', 'focus', function($s, Nerd, focus){

    $s.nerd = "";
    var msgErroPadrao = ' Verifique se o servidor e banco estão no ar. ';

    Nerd.get().success(function(data, status, headers, config) {
        $s.nerds = data;
    }).error(function(data, status, headers, config) {
        $s.Alert('danger','O app não conseguiu carregar os nerds.' + msgErroPadrao + data); 
    });

    $s.salvar = function($event) {
        if ($s.nerd != "") {
        	Nerd.create($s.nerd).success(function(data) {
                //window.location.href = '/api/nerds';
                $s.nerd._id = data;      // Adiciona o id gerado pelo mongo ao nerd (para funcionar o delete ou um possível edit)
                $s.nerds.push($s.nerd);  // Add o nerd na lista da grid
                $s.nerd = "";            // limpa os campos
                $s.Alert('success', "Nerd adicionado com sucesso. Id: " + data);
                $event.preventDefault(); // previne que a página pule quando for clicado no botão que chamou a rotina
                focus('nome');           // joga o foco no input com o focus-on="nome"
        	}).error(function(data){
                $s.Alert('danger','O app não conseguiu gravar o nerd.' + msgErroPadrao + data);
            });
        } else {
            $s.Alert('info', 'Para adicionar nerd, preencha as informações do nerd.');
        };
    };

    $s.pesquisar = function(){
        Nerd.pesquisa($s.nerd).success(function(data){
            if ($s.nerd != "") {
                $s.Alert('info', 'Buscou por: ' + JSON.stringify($s.nerd) + '. Para visualizar todos os nerds, efetue uma pesquisa sem filtros.');
            } else {
                $s.Alert('info', 'O app buscou todos os nerds.');
            };
            $s.nerds = data;
            $s.nerd = ""; // limpa o campo de pesquisa
        }).error(function(data){
            $s.Alert('danger', 'O app não conseguiu efetuar a pesquisa.' + msgErroPadrao + data);
        });
    };

    $s.delete = function(arrayIndex) {
        var idNerd = $s.nerds[arrayIndex]._id;

        Nerd.delete(idNerd).success(function() {
            $s.nerds.splice(arrayIndex, 1);
            $s.Alert('success', 'Nerd excluído com sucesso. Id: ' + idNerd);
        }).error(function(data){
            $s.Alert('danger','O app não conseguiu apagar o nerd.' + msgErroPadrao + data);
        });
    };

}]);