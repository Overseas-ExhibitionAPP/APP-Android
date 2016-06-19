<<<<<<< HEAD
﻿var services = angular.module('starter.services', []);
=======
var services = angular.module('starter.services', []);
>>>>>>> 84aa8e9daf3b4f7db986ef83e524cb0ad765a6a2
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
<<<<<<< HEAD
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
services.factory('SchoolFunc', function (DepartInfoSet, $filter) {
        var self = this;
        self.getDepartSet = function(gName) {
            var tmp = null;
            //利用posName來找出陣列中符合的gps資訊
            var found = $filter('filter')(DepartInfoSet, {"groupName": gName}, true);
            if (found.length) {
                tmp = angular.fromJson(found[0]);
            }
            return tmp.departSet
        }
        return self
    });
services.value('DepartInfoSet', [
        {
            "groupName": "資訊學群",
            "departSet": [
                {
                    "departName" : "資訊工程學系",
                    "url": "http://www.csie.ncnu.edu.tw"
                },
                {
                    "departName" : "資訊管理學系",
                    "url": "http://www.im.ncnu.edu.tw"
                }
            ]
        },
        {
            "groupName": "工程學群",
            "departSet": [
                {
                    "departName" : "土木工程學系",
                    "url": "http://www.ncnu.edu.tw/ncnuweb/home.aspx?unitId=O100"
                },
                {
                    "departName" : "電機工程學系",
                    "url": "http://www.ee.ncnu.edu.tw/"
                }
            ]
        },
        {
            "groupName": "數理化學群",
            "departSet": [
                {
                    "departName" : "應用化學系",
                    "url": "http://www.ncnu.edu.tw/ncnuweb/home.aspx?unitId=o400"
                }
            ]
        },
        {
            "groupName": "外語學群",
            "departSet": [
                {
                    "departName" : "外國語文學系",
                    "url": "http://www.dfll.ncnu.edu.tw"
                }
            ]
        },
        {
            "groupName": "文史哲學群",
            "departSet": [
                {
                    "departName" : "中國語文學系",
                    "url": "http://www.cll.ncnu.edu.tw/"
                },
                {
                    "departName" : "歷史學系",
                    "url": "http://www.his.ncnu.edu.tw/"
                }
            ]
        },
        {
            "groupName": "教育學群",
            "departSet": [
                {
                    "departName" : "國際文教與比較教育學系",
                    "url": "http://www.ced.ncnu.edu.tw/"
                },
                {
                    "departName" : "教育政策與行政學系",
                    "url": "http://www.doc.ncnu.edu.tw/epa"
                }
            ]
        },
        {
            "groupName": "法政學群",
            "departSet": [
                {
                    "departName" : "公共行政與政策學系",
                    "url": "http://www.dppa.ncnu.edu.tw/"
                }
            ]
        },
        {
            "groupName": "管理學群",
            "departSet": [
                {
                    "departName" : "國際企業學系",
                    "url": "http://www.ibs.ncnu.edu.tw/"
                }
            ]
        },
        {
            "groupName": "財經學群",
            "departSet": [
                {
                    "departName" : "經濟學系",
                    "url": "http://www.econ.ncnu.edu.tw/"
                },
                {
                    "departName" : "財務金融學系",
                    "url": "http://www.finance.ncnu.edu.tw/"
                }
            ]
        },
        {
            "groupName": "社會與心理學群",
            "departSet": [
                {
                    "departName" : "社會政策與社會工作學系",
                    "url": "http://www.spsw.ncnu.edu.tw/"
                },
                {
                    "departName" : "東南亞學系東南亞組",
                    "url": "http://www.ncnu.edu.tw/ncnuweb/home.aspx?unitId=m800"
                },
                {
                    "departName" : "東南亞學系人類學組",
                    "url": "http://www.ncnu.edu.tw/ncnuweb/home.aspx?unitId=m800"
                },
                {
                    "departName" : "諮商心理與人力資源發展學系-諮商心理組",
                    "url": "http://ncnu-dch.webnode.tw/"
                },
                {
                    "departName" : "諮商心理與人力資源發展學系-終身學習與人力資源發展組",
                    "url": "http://ncnu-dch.webnode.tw/"
                }
            ]
        },
        {
            "groupName": "體育休閒學群",
            "departSet": [
                {
                    "departName" : "觀光休閒與餐旅管理學系觀光休閒組",
                    "url": "http://www.tourism.ncnu.edu.tw/"
                },
                {
                    "departName" : "觀光休閒與餐旅管理學系餐旅管理組",
                    "url": "http://www.tourism.ncnu.edu.tw/"
                }
            ]
        }
    ]);
services.factory('FavoriteList_Func', function (FavoriteList, $filter) {
            var self = this;
            self.add = function(sName) {
                var tmp = null;
                //利用posName來找出陣列中符合的gps資訊
                var found = $filter('filter')(FavoriteList, {"schoolName": sName}, true);
                if (found.length) {
                    tmp = angular.fromJson(found[0]);
                } else {
                    var item = { "schoolName": sName};
                    FavoriteList.push(item);
                }
                return FavoriteList;
            }
            return self
        });
services.value('FavoriteList',[
            {
                "schoolName" : "國立暨南國際大學",
                "layout_Number": "72",
                "Speech": "true"
            }
        ]);
=======
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
        //�Q��posName�ӧ�X�}�C���ŦX��gps��T
        var found = $filter('filter')(temList, {"name": posName}, true);
        if (found.length) {
            pos_tmp = angular.fromJson(found[0]);
        }
        return pos_tmp;
    }
    return self
});
>>>>>>> 84aa8e9daf3b4f7db986ef83e524cb0ad765a6a2
