$(document).click(function() {
    $('.input-group.date').datetimepicker({
        format: 'YYYY-MM-DD HH:mm'
    });
});
var app = angular.module("budgetApp", ['ngRoute']);
var emptyData = function(){
    date = "";
    amount = "";
    description = "";
};
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

    $scope.totalBalance = function(){
        var total = 0;
        angular.forEach($scope.data, function (item) {
            total = total + item.amount;
        });

        return total.toFixed(2);
    };

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

app.filter("TransactionFilter",function(){
    return function(data, type){

        var filterData = [];

        angular.forEach(data, function (item) {

            if(0 > item.amount && type === "spend"){
                filterData.push(item);

                return filterData;

            }else if (0 < item.amount && type === "income"){
                filterData.push(item);

                return filterData;
            }else if(type === "both"){
                filterData.push(item);

                return filterData;
            }
        });

        return filterData;
    }
});

app.controller("FormsCtrl",function($scope, $location, TransactionStore){
    $scope.formData = emptyData();

    $scope.addTransaction = function(){
        $scope.formData.amount = ($location.path() === "/spend") ?
            -$scope.formData.amount : $scope.formData.amount;
        TransactionStore.addTransaction($scope.formData).then(function(){
            $scope.formData = emptyData();
        });
    }
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