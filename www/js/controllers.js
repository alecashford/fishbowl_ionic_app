angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FeedCtrl', ['$scope', '$http', 'MyFeed', function($scope, $http, MyFeed) {
  $scope.feedData;
  MyFeed.populateFeed().then(function(response) {
    console.log(response)
    $scope.feedData = response;
  })
}])

.controller('PostDetailCtrl', ['$scope', '$stateParams', 'MyFeed', 'Comments', function($scope, $stateParams, MyFeed, Comments) {
  // console.log($stateParams.postId)
  $scope.post = MyFeed.getPost($stateParams.postId)
  $scope.comments;
  Comments.populate_comments({post_id: ($stateParams.postId)}).success(function(data) {
    $scope.comments = data;
  })
}])

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('MyGroupsCtrl', function($scope, $http, MyGroups) {
  MyGroups.populateGroups().then(function(response) {
    console.log(response)
    $scope.allGroups = response;
    $scope.groupsIOwn = response.owned;
    $scope.groupsImPartOf = response.not_owned;
  });
})

.controller('SpecificFeedCtrl', function($scope, $http, $stateParams, MyGroups, MyFeed) {
  $scope.specificFeed = MyFeed.getSpecificFeed($stateParams.groupId)
  $scope.title = MyGroups.getGroupName($stateParams.groupId);
  $scope.admin = MyGroups.getOwnershipStatus($stateParams.groupId);
})

.controller('NewGroupCtrl', function($scope, $http, $location) {
  $scope.addGroup = function(displayName, memberEmail) {
    console.log("addGroup fired")
    console.log(displayName)
    $http({
          method: 'POST',
          url: 'http://127.0.0.1:9393/',
          data: {action: 'create_fishbowl', payload: {display_name: displayName,
                                                      member_email: memberEmail,
                                                      user_id: 1}} //change from hardcoded
        }).success(function(data) {
          window.location = '#/tab/my-groups';
        })
  }
})

.controller('AdminCtrl', function($scope, $http, $location) {
  $scope.admin
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
