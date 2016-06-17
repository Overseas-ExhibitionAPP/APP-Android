var services = angular.module('starter.services', []);
var urlBase = 'http://mathgress.ncnu.edu.tw:8080/V1';
services.factory('localStorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    removeItem: function(key){
      $window.localStorage.removeItem(key);
    }
  }
}]);
services.factory('STALLS',function ($filter, $http) {
    var self = this;
    self.searchStalls = function(stallName , tmpList) {
        var stalls_tmp = null;
        
        var found = $filter('filter')(tmpList,{"name": stallName}, true)
        if (found.length) {
            stalls_tmp = angular.fromJson(found[0]);
        }
        return stalls_tmp;
    }
    self.getStallList = function() {
        var Stalls_List;
        var link = 'http://163.22.17.174:8080/V1/exhibitions/2016/layout/my';
        Stalls_List = $http.get(link);
        return Stalls_List;
    }
    return self;
});
services.factory('Questionnaire_serve', function($http){
    var Questionnaire_List;
    var self = this;
    self.getQuestionnaire = function(country,year){
        var link = 'http://163.22.17.174:8080/V1/questionnaire/'+year+'/'+country;
        Questionnaire_List = $http.get(link);
        return Questionnaire_List;
    }
    self.postQuestionnaire = function(ansList,year,country){
        var link = 'http://163.22.17.174:8080/V1/questionnaire/'+year+'/'+country;
        var data = ansList;
        return $http.post(link,data);
    }
    return self;
});
services.factory('ThemeEvents_serve', function($http){
    var alphabet_list;
    var self = this;
    self.getalphabet = function(country,id){
        var link = 'http://163.22.17.174:8080/V1/exhibitions/activity/'+id+'/'+country+'/collectionbox';
        alphabet_list = $http.get(link);
        return alphabet_list;
    }
    self.collectStamp = function(country,id,schoolnum){
        var link = 'http://163.22.17.174:8080/V1/exhibitions/activity/collectionbox';
        var data = {
            "userid": id,
            "country": country,
            "schoolnum": schoolnum
        };
        var response = $http.put(link, data);
        return response;
    }
    self.exchangeCBox = function(country,id,url){
        var link = 'http://163.22.17.174:8080/V1/exhibitions/activity/'+id+'/'+country+url;
        var response = $http.get(link);
        return response;
    }
    return self;
});
services.factory('News',function ($filter, $http) {
    var self = this;
    self.searchNews = function(newsTitle , tmpList) {
        var news_tmp = null;
        
        var found = $filter('filter')(tmpList,{"title": newsTitle}, true)
        if (found.length) {
            news_tmp = angular.fromJson(found[0]);
        }
        return news_tmp;
    }
    self.getNewsList = function() {
        var News_List;
        var link = 'http://163.22.17.174:8080/V1/news/my';
        News_List = $http.get(link);
        return News_List;
    }
    return self;
});
services.factory('Lecture',function ($filter, $http) {
    var self = this;
    self.searchLecture = function(areaName , tmpList) {
        var lec_tmp = null;
        var found = $filter('filter')(tmpList,{"area": areaName}, true)
        if (found.length) {
            lec_tmp = angular.fromJson(found[0]);
        }
        return lec_tmp;
    }
    self.getLectureList = function() {
        var Lecture_List;
        var link = 'http://163.22.17.174:8080/V1/exhibitions/lectures/my';
        Lecture_List = $http.get(link);
        return Lecture_List;
    }
    return self;
});
services.factory('MAP', function ($filter, $http) {
    var self = this;
    self.getPosList = function(){
        var Pos_List;
        var link = 'http://163.22.17.174:8080/V1/exhibitions/2016/traffic/my';
        Pos_List = $http.get(link);
        return Pos_List;
    }
    self.searchPos = function(posName, temList) {
        var pos_tmp = null;
        //利用posName來找出陣列中符合的gps資訊
        var found = $filter('filter')(temList, {"name": posName}, true);
        if (found.length) {
            pos_tmp = angular.fromJson(found[0]);
        }
        return pos_tmp;
    }
    return self
});