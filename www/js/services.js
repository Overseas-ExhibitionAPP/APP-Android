angular.module('starter.services', [])
        .factory('MAP', function (POIs, $filter) {
            var self = this;
            
            self.searchPos = function(posName) {
                var pos_tmp = null;
                //利用posName來找出陣列中符合的gps資訊
                var found = $filter('filter')(POIs, {"name": posName}, true);
                if (found.length) {
                    pos_tmp = angular.fromJson(found[0]);
                }
                return pos_tmp
            }
            self.initialize = function (id, pos) {
                console.log(pos);
                var LatLng = new google.maps.LatLng(pos.lat,pos.lng); // 目前位置

                var mapOptions = {
                    center: LatLng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById(id), mapOptions);
                return map;
            }
 
            self.setLocation = function (map, pos) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(pos.lat, pos.lng),
                    map: map,
                    title: pos.name
                });
                map.setCenter(marker.getPosition());
                return map;
            }
            return self
        })
        .value('POIs', [
            {
                "name": "啟德碼頭",
                "lat": 22.3061703,
                "lng": 114.2128582
            }
        ])
        .factory('SchoolFunc', function (DepartInfoSet, $filter) {
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
        })
        .value('DepartInfoSet', [
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
        ])
        .factory('FavoriteList_Func', function (FavoriteList, $filter) {
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
        })
        .value('FavoriteList',[
            {
                "schoolName" : "國立暨南國際大學",
                "layout_Number": "72",
                "Speech": "true"
            }
        ]);

         /*
    function initialize() {
        var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map($scope.map,
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
    }
    google.maps.event.addDomListener(window, 'load', initialize);*/