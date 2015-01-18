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
      var flattened = [].concat.apply(allGroups['owned'], allGroups['not_owned'])
      for (var i = 0; i < flattened.length; i++) {
        console.log(flattened[i].display_name)
        if (flattened[i].id == id) {
          return flattened[i].display_name;
        }
      }
      return null;
    },
    getOwnershipStatus: function(id) {
      for (var i = 0; i < allGroups.owned.length; i++) {
        if (allGroups.owned[i].id == id) {
          return true;
        }
      }
      return false;
    }
  }
})

