$(document).ready(function() {
    $('.input-group.date').datetimepicker({
        //format: 'YYYY-MM-DD HH:mm'
        format: 'd @ HH:mm'
    });
});
var app = angular.module("budgetApp", []);

app.controller("addRow",function($scope){
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