'use strict';

var app = angular.module('app', ['ngRoute','ngFileUpload']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider, $routeParams) {
  $routeProvider.
  when('/admin', {
    templateUrl: '/javascripts/app/admin/admin.html',
    controller: 'adminController'
  }).
  when('/profile', {
    templateUrl: '/javascripts/app/profile/profile.html',
    controller: 'profileController'
  }). // CHALLENGES
  when('/challenges', {
    templateUrl: '/javascripts/app/challenges/challenges.html',
    controller: 'challengesController'
  }).
  when('/challenges/:challenge', {
    templateUrl: '/javascripts/app/challenges/sections/challenge.html',
    controller: 'challengeController'
  }).
  when('/challenges/:challenge/languages', {
    templateUrl: '/javascripts/app/challenges/sections/languages.html',
    controller: 'challengeController'
  }).
  when('/challenges/:challenge/languages/:language/submit', {
    templateUrl: '/javascripts/app/challenges/sections/submit.html',
    controller: 'challengeController'
  }).// LEADERBOARD
  when('/leaderboard', {
    templateUrl: '/javascripts/app/leaderboard/leaderboard.html',
    controller: 'leaderboardController'
  }).
  when('/leaderboard/challenge/:challenge', {
    templateUrl: '/javascripts/app/leaderboard/sections/challenge.html',
    controller: 'leaderboardChallengeController'
  });
  
  $locationProvider.html5Mode(true);
}]);

//TODO user's profile to edit info
//added challenge now cannot edit it
//TODO clear out forms on submit (admin)