angular.module('starter.controllers', ['starter.services'])

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
  
})
.controller('TrafficCtrl', function($scope, MAP, $stateParams,POIs,$filter) {
    $scope.Test = "hahaha";
    $scope.Pos_Set = POIs;
    //預設地圖為參展資料之第一筆地區資料
    var posT = MAP.searchPos(POIs[0].name);
    var map = MAP.initialize('map', posT);  // 載入地圖 'map'是顯示地圖區塊的id
    var marker = posT;
    MAP.setLocation(map, marker);
    //偵測到地區按鈕被點擊，即reload該地區圖資
    $scope.setPos=function(posName) {
        var pos = MAP.searchPos(posName);
        var map = MAP.initialize('map', pos);
        var marker = pos;
        MAP.setLocation(map, marker);

    }
});