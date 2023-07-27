
var app = angular.module("myApp", ["ngRoute", 'ngAnimate']);


app.config(function ($routeProvider) {
    $routeProvider

        .when("/", {
            templateUrl: "component/home.html"
        })
        .when("/films", {
            templateUrl: "component/characherfilms.html",

        })

        .when("/favpage", {
            templateUrl: "component/favpage.html",

        })

        .otherwise({ redirectTo: "/" });
});



//retrieve  people data from  Api
app.controller("peopleController", function ($scope, $http, $window) {

    $scope.values = [];
    $scope.films = [];
    $scope.titles = [];
    var url = "https://swapi.dev/api/people/?format=json";
    // var url = "https://swapi.dev/api/";
    $http.get(url).then(function (response) {


        $scope.items = response.data.results;
        if ($scope.items == null) {
            swal('Data Not Show ');

        }
    });
});


//Add character to favourite array
app.controller("puchController", function ($scope) {

    $scope.push = function (name) {


        let elementExists = false;
        elementExists = $scope.values.includes(name);
        if (!elementExists) {
            $scope.values.push(name);
        }
        else {

            swal(" Already exists");


        }
    };

});

//retrieve film data from api
app.controller("filmController", function ($scope, $http) {

    var url = "https://swapi.dev/api/films/?format=json";
    // var url = "https://swapi.dev/api"

    $http.get(url).then(function (response) {


        $scope.films = response.data.results;


        if ($scope.films == null) {
            swal('Erorr in Films Data');
        }
    })

});


// Delete favourite character  from favourite array
app.controller("DeleteCon", function ($scope) {


    $scope.Delete = function (name) {

        for (let i in $scope.values) {

            if ($scope.values[i].name == name) {

                $scope.values.splice(i, 1);

            }


        }
    };

});

// log out
app.controller("LogoutCon", function ($scope, $window) {
    $scope.Logout = function () {
        $window.location.href = 'login.html';

    }

});






//Loading animation
app.service('showAlertSrvc', ['$timeout', function ($timeout) {
    return function (delay) {
        var result = { hidden: true };
        $timeout(function () {
            result.hidden = false;
        }, delay);
        return result;
    };
}])
    .controller('testController', function ($scope, showAlertSrvc) {

        $scope.test = showAlertSrvc(6000);
    })


// display detail of each character and the film acted in
app.controller('hidShowcon', function ($scope, $http) {
    $scope.movies = [];

    $scope.hiddenshow = false;
    $scope.showitem = function (name) {
        $scope.hiddenshow = true;

        for (let i in $scope.items) {

            if ($scope.items[i].name == name) {
                $scope.name = $scope.items[i].name;
                $scope.mass = $scope.items[i].mass;
                $scope.gender = $scope.items[i].gender;
                $scope.height = $scope.items[i].height;
                $scope.birth_year = $scope.items[i].birth_year;
                for (let j in $scope.items[i].films) {
                    $scope.movies.push($scope.items[i].films[j])
                }

            }

        }

        for (let i in $scope.movies) {
            for (let j in $scope.films) {


                if ($scope.movies[i] == $scope.films[j].url) {
                    $scope.titles.push($scope.films[j].title);

                }

            }


        }


        $scope.movies = []
        $scope.ti = $scope.titles

        $scope.titles = []
    }
    $scope.ti = []


});




app.controller('logincontroller', function ($scope, $window) {

    $scope.Submit = function () {
        let username = $scope.username;
        let Password = $scope.password;
        if (username == 'sample@gmail.com' && Password == "sample123") {
            $window.location = ('index.html');

        }
        else {

            alert('please enter correct data');
        };

    };
});





