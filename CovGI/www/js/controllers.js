angular.module('starter.controllers', [])


.controller('AppCrtl', function ($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
    $scope.$on(AUTH_EVENTS.notAuthentificated, function (event) {
       AuthService.logout();
       $state.go('tab.login');
       var alertPopup = $ionicPopup.alert({
         title: 'End Session',
         template: 'You have to login again'
       });
    });
})


//controller of the login page
.controller('loginCrtl', function ($scope, AuthService, $ionicPopup, $state) {
    //initier les params vide
    $scope.user = {
        login: '',
        passwrd: ''
      };

    //methode login qui fait appel au service
    $scope.login = function () {
            AuthService.login($scope.user).then(function (msg) {
            $state.go('menu.inside');
        }, function (errMsg) {
              var alertPopup = $ionicPopup.alert({
                title: 'Login failed',
                template: errMsg
              });
              alertPopup.then(function (res) {
                  console.log('Invalide login or password');
              });
            });

    };
})

.controller('menuCrtl',function ($scope, AuthService, API_ENDPOINT, $http, $state) {
    $http.get(API_ENDPOINT.url+'/member').then(function (result) {
        $scope.memberInfo = result.data.user;
    });

    $scope.logout = function () {
        AuthService.logout();
        $state.go('tab.login');

    };
})

.controller('InsideCrtl', function ($scope , AuthService, API_ENDPOINT, $http, $state) {
  //to destroy the session (destroy the token)
  $scope.destroySession = function () {
        AuthService.logout();
    };

    //return the info of the user from the REST api
    $scope.getInfo = function () {
        $http.get(API_ENDPOINT.url+'/member').then(function (result) {
            $scope.membreInfo = result.data.message;
        });
    };




})


