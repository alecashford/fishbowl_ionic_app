angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FeedCtrl', ['$scope', '$http', 'Chats', 'MyFeed', function($scope, $http, Chats, MyFeed) {
  $scope.feedData;
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
  MyFeed.populate().success(function(data) {
    $scope.feedData = data;
    MyFeed.showAll = data
  })
}])

// We need an index. k = position, v = id

.controller('PostDetailCtrl', ['$scope', '$stateParams', 'MyFeed', 'Comments', function($scope, $stateParams, MyFeed, Comments) {
  $scope.title = MyFeed.showAll[$stateParams.postId].title
  $scope.content = MyFeed.showAll[$stateParams.postId].content
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

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
