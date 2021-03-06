// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.feed', {
      url: '/feed',
      views: {
        'tab-feed': {
          templateUrl: 'templates/tab-feed.html',
          controller: 'FeedCtrl'
        }
      }
    })
    .state('tab.post-detail', {
      url: '/post/:postId',
      views: {
        'tab-feed': {
          templateUrl: 'templates/post-detail.html',
          controller: 'PostDetailCtrl'
        }
      }
    })
    .state('tab.new-post', {
      url: '/post/new',
      views: {
        'tab-feed': {
          templateUrl: 'templates/new-post.html',
          controller: 'NewPostCtrl'
        }
      }
    })

  .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })
  .state('tab.my-groups', {
      url: '/my-groups',
      views: {
        'tab-mygroups': {
          templateUrl: 'templates/my-groups.html',
          controller: 'MyGroupsCtrl'
        }
      }
    })
  .state('tab.specific-feed', {
      url: '/feed/:groupId',
      views: {
        'tab-mygroups': {
          templateUrl: 'templates/specific-feed.html',
          controller: 'SpecificFeedCtrl'
        }
      }
    })
  .state('tab.admin', {
      url: '/admin/:groupId',
      views: {
        'tab-mygroups': {
          templateUrl: 'templates/admin.html',
          controller: 'AdminCtrl'
        }
      }
    })
  .state('tab.new-group', {
      url: '/new-group',
      views: {
        'tab-mygroups': {
          templateUrl: 'templates/new-group.html',
          controller: 'NewGroupCtrl'
        }
      }
    })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
