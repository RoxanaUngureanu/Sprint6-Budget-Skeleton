$(document).click(function() {
    $('.input-group.date').datetimepicker({
        //format: 'YYYY-MM-DD HH:mm'
        format: 'Do HH:mm'
    });
});
var app = angular.module("budgetApp", ['ngRoute']);

app.controller("MainController",function($scope){

});
    app.config(function($routeProvider, $locationProvider){

        $locationProvider.html5Mode({
           enable:true,
            requiredBase:false
        });
        $routeProvider
            .when("/add",
            {
                templateUrl: "add.html",
                controller: "SpendController"
            })
            .when("/home",
                {
                    templateUrl: "home.html",
                    controller: "BalanceController"
                })
            .when("/receive",
                {
                    templateUrl: "receive.html",
                    controller: "ReceiveController"
                })
            .otherwise({
                templateUrl: "home.html",
                controller: "BalanceController"
            });

    });
    app.controller("BalanceController",function($scope){
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
    });
    app.controller("SpendController",function($scope){

    });
    app.controller("ReceiveController",function($scope){

});

