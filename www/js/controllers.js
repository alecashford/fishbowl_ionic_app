angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FeedCtrl', ['$scope', '$http', 'MyFeed', function($scope, $http, MyFeed) {
  $scope.feedData;
  MyFeed.populateFeed().then(function(response) {
    $scope.feedData = response;
  })
}])

.controller('PostDetailCtrl', ['$scope', '$stateParams', 'MyFeed', 'Comments', function($scope, $stateParams, MyFeed, Comments) {
  $scope.post = MyFeed.getPost($stateParams.postId)
  $scope.comments;
  Comments.populate_comments({post_id: ($stateParams.postId)}).success(function(data) {
    $scope.comments = data;
    console.log(data)
  })

  $scope.addComment = function(commentText, data) {
    var post = data.nodes.length + 1;
    console.log(data)
  }

  // $scope.addReply = function(data) {
  //   var data.nodes.length + 1;
  //   data.nodes.push({content: "test", score: 0, nodes: []});
  // }

  $scope.tree = $scope.comments

  // $scope.tree = [{content: "abc", score: 0, nodes: []},
  //                {content: "lmn", score: 0, nodes: [
  //                 {content: "123", score: 0, nodes: [
  //                   {content: "456", score: 0, nodes: []}]},
  //                 {content: "789", score: 0, nodes: []}]},
  //                {content: "xyz", score: 0, nodes: []}]




}])

.controller('NewPostCtrl', function($scope, $http, $location, MyGroups) {
  MyGroups.populateGroups().then(function(response) {
    $scope.groups = response
  });
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('MyGroupsCtrl', function($scope, $http, MyGroups) {
  $scope.groupsIOwn = [];
  $scope.groupsImPartOf = [];
  MyGroups.populateGroups().then(function(response) {
    var sortGroups = function() {
      for (var i = 0; i < response.length; i++) {
        if (response[i].creator_id == 1) { // Change from hardcoded
          $scope.groupsIOwn.push(response[i])
        } else {
          $scope.groupsImPartOf.push(response[i])
        }
      }
    }();
  });
})

.controller('SpecificFeedCtrl', function($scope, $http, $stateParams, MyGroups, MyFeed) {
  $scope.specificFeed = MyFeed.getSpecificFeed($stateParams.groupId)
  $scope.title = MyGroups.getGroupName($stateParams.groupId);
  $scope.admin = MyGroups.getOwnershipStatus($stateParams.groupId, 1); // Change 2nd param, user_id, from hardcoded
})

.controller('NewGroupCtrl', function($scope, $http, $location) {
  $scope.addGroup = function(displayName, memberEmail) {
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
