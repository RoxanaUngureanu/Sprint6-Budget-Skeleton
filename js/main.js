$(document).click(function() {
    $('.input-group.date').datetimepicker({
        //format: 'YYYY-MM-DD HH:mm'
        format: 'Do HH:mm'
    });
});
var app = angular.module("budgetApp", ['ngRoute']);
var pages = [
    {name: 'Home', url: ''},
    {name: 'Receive', url: 'receive'},
    {name: 'Spend', url: 'spend'}
];

app.config(function($routeProvider, $locationProvider){

    $locationProvider.html5Mode({
       enable:true,
        requireBase:false
    });
    angular.forEach(pages, function (page) {
        $routeProvider.when('/' + page.url, {
            templateUrl: 'pages/' + (!page.url ? 'index' : page.url) + '.html'
        })
    });
    $routeProvider.otherwise({
        templateUrl: 'pages/index.html',
        controller: "HomeCtrl"
    });

});

app.controller("HomeCtrl",function($scope, TransactionStore){
    $scope.data = [];
    TransactionStore.getTransactionsByMonth('2016-02').then(function(data){
        $scope.data = data;
    });

    $scope.deleteTransaction = function(id){
        TransactionStore.deleteTransaction(id).then(function(){
            TransactionStore.getTransactionsByMonth('2016-02').then(function(data){
                $scope.data = data;
            });
        });
    };

});

app.controller("SpendCtrl",function($scope){

});

app.controller("ReceiveCtrl",function($scope){

});

app.factory("TransactionStore", function($http,$q){
    return (function() {
        var URL = "http://server.godev.ro:8080/api/roxanau/transactions";

        var getTransactionsByMonth = function (month) {
            return $q (function (resolve, reject) {
                $http({
                    url: URL + "?month=" + month
                }).then(function (xhr) {
                        if (xhr.status == 200) {
                            resolve(xhr.data);
                        } else {
                            reject();
                        }
                    },
                    reject
                );
            });
        };

        var addTransaction = function(data) {
            return $q(function(resolve, reject) {
                $http({
                    url: URL,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(data)
                })
                    .then(
                        function(xhr) {
                            if (xhr.status == 201) {
                                resolve(xhr.data);
                            } else {
                                reject();
                            }
                        },
                        reject
                    );
            });
        };

        var deleteTransaction = function(id) {
            return $q(function(resolve, reject) {
                $http({
                    url: URL + '/' + id,
                    method: 'DELETE'
                })
                    .then(
                        function(xhr) {
                            if (xhr.status == 204) {
                                resolve();
                            } else {
                                reject();
                            }
                        },
                        reject
                    );
            });
        };
        return {
            getTransactionsByMonth: getTransactionsByMonth,
            addTransaction: addTransaction,
            deleteTransaction: deleteTransaction
        };
    })();
});