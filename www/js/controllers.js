angular.module('starter.controllers', ['starter.services','ui.bootstrap','ngAnimate'])

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
    $scope.Pos_Set = POIs;
    //預設地圖為參展資料之第一筆地區資料
    var posT = MAP.searchPos(POIs[0].name);
    var map = MAP.initialize('map', posT);  // 載入地圖 'map'是顯示地圖區塊的id
    var marker = posT;
    MAP.setLocation(map, marker);
    //偵測到地區按鈕被點擊，即reload該地區圖資
    $scope.setPos=function(posName) {
        console.log(posName);
        var pos = MAP.searchPos(posName);
        var map = MAP.initialize('map', pos);
        var marker = pos;
        MAP.setLocation(map, marker);

    }
})
.controller('SchoolInfoCtrl', function($scope, DepartInfoSet, SchoolFunc, FavoriteList_Func) {
    $scope.groups = DepartInfoSet;
    $scope.getInfoSet = function(gName) {
        $scope.departs = SchoolFunc.getDepartSet(gName);
    }
    $scope.addItem = function() {
        var result = FavoriteList_Func.add("國立暨南國際大學")
        console.log(result);
    }
    $scope.oneAtATime = true;
})
.controller('LikeListCrtl', function($scope,FavoriteList) {
    $scope.items = FavoriteList;

})
.controller('ThemeEventsCtrl', function($scope) {
    $scope.alphabet = ['NCNU_LOGO.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png'];

})
.controller('CarouselDemoCtrl', function ($scope) {
  $scope.myInterval = 2000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.addSlide = function() {
    var newWidth = 500 + slides.length + 1;
    slides.push({
      image: '/img/photos/1.jpg',
      text: ['Nice image','Awesome photograph','That is so cool'][slides.length % 3],
      id: currIndex++
    });
  };

  $scope.randomize = function() {
    var indexes = generateIndexesArray();
    assignNewIndexesToSlides(indexes);
  };

  for (var i = 0; i < 4; i++) {
    $scope.addSlide();
  }

  // Randomize logic below

  function assignNewIndexesToSlides(indexes) {
    for (var i = 0, l = slides.length; i < l; i++) {
      slides[i].id = indexes.pop();
    }
  }

  function generateIndexesArray() {
    var indexes = [];
    for (var i = 0; i < currIndex; ++i) {
      indexes[i] = i;
    }
    return shuffle(indexes);
  }

  // http://stackoverflow.com/questions/962802#962890
  function shuffle(array) {
    var tmp, current, top = array.length;

    if (top) {
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    }

    return array;
  }
})
;