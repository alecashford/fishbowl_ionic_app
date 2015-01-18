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

// We need an index. k = position, v = id

.controller('PostDetailCtrl', ['$scope', '$stateParams', 'MyFeed', 'Comments', function($scope, $stateParams, MyFeed, Comments) {
  // console.log($stateParams.postId)
  $scope.post = MyFeed.getPost($stateParams.postId)
  $scope.comments;
  Comments.populate_comments({post_id: ($stateParams.postId)}).success(function(data) {
    $scope.comments = data;
  })

  // $http({
  //       method: 'POST',
  //       url: 'http://127.0.0.1:9393/',
  //       data: {action: 'get_comments', payload: {post_id: ($stateParams.postId - 1)}}
  //     }).success(function(data) {
  //       $scope.comments = data
  //       debugger
  //     })
}])

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('MyGroupsCtrl', function($scope, $http) {
    // $http({
    //     method: 'POST',
    //     url: 'http://127.0.0.1:9393/',
    //     data: {action: 'my_groups', payload: {display_name: $scope.displayName,
    //                                                 member_email: $scope.memberEmail,
    //                                                 user_id: 1}} //change from hardcoded
    //   }).success(function(data) {
    //     $scope.comments = data
    //   })
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

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
