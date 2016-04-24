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
                "name": "吉隆坡",
                "lat": 24.26467,
                "lng": 121.740875
            },
            {
                "name": "麻坡",
                "lat": 2.047277, 
                "lng": 102.611882

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