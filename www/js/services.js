angular.module('starter.services', [])

.factory('MyFeed', function($http) {
  var totalFeed;
  return {
    populateFeed: function() {
      return $http({
        method: 'POST',
        url: 'http://127.0.0.1:9393/',
        data: {
          action: 'populate_feed',
          payload: {user_id: 1}
        }
      }).then(function(response) {
        totalFeed = response.data;
        return totalFeed;
      });
    },
    getPost : function(id) {
      for (var i = 0; i < totalFeed.length; i++) {
        if (totalFeed[i].id == id) {
          return totalFeed[i];
        }
      }
      return null;
    },
    getSpecificFeed: function(id) {
      var results = [];
      for (var i = 0; i < totalFeed.length; i++) {
        if (totalFeed[i].community_id == id) {
          results.push(totalFeed[i]);
        }
      }
      return results;
    }
  }
})



.factory('Comments', function($http) {
  return {
    populate_comments: function(payload) {
      return $http({
        method: 'POST',
        url: 'http://127.0.0.1:9393/',
        data: {action: 'get_comments', payload: payload}
      })
    }
  }
})

.factory('MyGroups', function($http) {
  var allGroups;
  return {
    populateGroups: function() {
      return $http({
        method: 'POST',
        url: 'http://127.0.0.1:9393/',
        data: {
          action: 'my_groups',
          payload: {user_id: 1}
        }
      }).then(function(response) {
        allGroups = response.data;
        return allGroups;
      });
    },
    getGroupName: function(id) {
      for (var i = 0; i < allGroups.length; i++) {
        console.log(allGroups[i].display_name)
        if (allGroups[i].id == id) {
          return allGroups[i].display_name;
        }
      }
      return null;
    },
    getOwnershipStatus: function(post_id, user_id) {
      for (var i = 0; i < allGroups.length; i++) {
        if (allGroups[i].id == post_id && allGroups[i].creator_id == user_id) {
          return true;
        }
      }
      return false;
    }
  }
})

.directive('treeRenderer', function() {
  return {
    restrict: 'E',
    template: '{{data.content}}' +
              '<ul>' +
              '  <li ng-repeat="data in data.nodes"><tree-renderer></tree-renderer></li>' +
              '</ul>'

  }
})

