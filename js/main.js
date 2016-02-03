$(document).click(function() {
    $('.input-group.date').datetimepicker({
        //format: 'YYYY-MM-DD HH:mm'
        format: 'Do HH:mm'
    });
});
var app = angular.module("budgetApp", ['ngRoute']);

app.controller("MainController",function($scope){
    $scope.data = [{
        id: 1,
        description: "Salariu",
        amount: 2500,
        date: "2016-02-01 14:58"
    },
    {
        id: 2,
        description: "Food",
        amount: -80,
        date: "2016-02-01 15:00"
    }];

    $scope.deleteRow = function(index){
        //$scope.data.splice({id:$scope.id, description:$scope.description, amount:$scope.amount, date:$scope.date});
        $scope.data.splice(index, 1);
    };
});
    app.config(function($routeProvider){
        $routeProvider
            .when("/",
                {
                    templateUrl: "home.html",
                    controller: "BalanceController"
                })
            .when("/add.html",
            {
                templateUrl: "add.html",
                controller: "SpendController"
            })
            .when("/home.html",
                {
                    templateUrl: "home.html",
                    controller: "BalanceController"
                })
            .when("/receive.html",
                {
                    templateUrl: "receive.html",
                    controller: "ReceiveController"
                })
            .when("/income.html",
                {
                    templateUrl: "income.html",
                    controller: "BalanceController"
                })
            .when("/spendings.html",
                {
                    templateUrl: "spendings.html",
                    controller: "BalanceController"
                })
    });
    app.controller("BalanceController",function($scope){

    });
//    app.controller("SpendController",function($scope){
//
//    });
//    app.controller("ReceiveController",function($scope){
//
//});
