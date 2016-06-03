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
.controller('TrafficCtrl', function($scope, MAP, $stateParams, POIs, $filter) {
    var temList;
	MAP.getPosList()
		.success(function(res){
			$scope.Pos_Set = res.traffic_list;
			temList = res.traffic_list;
			$scope.name = "地點；" + temList[0].name;
			$scope.address = "地址：" + temList[0].address;
			$scope.time = "時間：" + temList[0].starttime + "~" + temList[0].endtime;
			//預設地圖為參展資料之第一筆地區資料
			var posT = MAP.searchPos(temList[0].name, temList);
			var map = MAP.initialize('map', posT);  // 載入地圖 'map'是顯示地圖區塊的id
			var marker = posT;
			MAP.setLocation(map, marker);
		})
		.error(function(res){
			
		})
	
	
    
    //偵測到地區按鈕被點擊，即reload該地區圖資
    $scope.setPos=function(posName) {
        console.log(posName);
        var pos = MAP.searchPos(posName, temList);
        var map = MAP.initialize('map', pos);
        var marker = pos;
        MAP.setLocation(map, marker);
		$scope.name = "地點；" + pos.name;
		$scope.address = "地址：" + pos.address;
		$scope.time = "時間：" + pos.starttime + "~" + pos.endtime;

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
.controller('StallsCtrl', function($scope, STALLS) {
	var tmpList;
	STALLS.getStallList()
		.success(function(res) {
			$scope.Stall_Set = res.layout_list;
			tmpList = res.layout_list;
			$scope.pic_model = tmpList[0].layout;
		})
		.error(function(res){
			
		});
	$scope.setPic = function(picName) {
		var tmp = STALLS.searchStalls(picName , tmpList);
		$scope.pic_model = tmp.layout;
	}

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
.controller('QuestionnaireSelect', function($scope, $window, $http, Questionnaire_serve, $ionicModal, $ionicPopup, $timeout, $state, $ionicHistory, $stateParams, localStorage )
{	
	var qSet;
	var count = 0;
	//var q_option_type;
	//var show_flag = this;
	Questionnaire_serve.getQuestionnaire('hk','2016')
		.success(function (response) {      
			qSet = response.questionset;    
			$scope.Questionnaire_List_question1 = qSet[0].description;
			if (qSet[0].type == "MultiSelect"){
				$scope.Questionnaire_List_option_M = "";
				$scope.Questionnaire_List_option_S = "";
				$scope.q_option_type_Test = qSet[count].type;
				$scope.Questionnaire_List_option_M = qSet[count].options;
			}
			if (qSet[0].type == "SingleSelect"){
				$scope.Questionnaire_List_option_M = "";
				$scope.Questionnaire_List_option_S = "";
				$scope.q_option_type_Test = qSet[count].type;
				$scope.Questionnaire_List_option_S = qSet[count].options;
			}
			$scope.q_option_type_Test = qSet[0].type;
			$scope.info = response.info;
			//q_option_type = qSet.type;
			
			if (count == qSet.length)
			{
				$scope.state = "問卷結束";
				$scope.Questionnaire_List_question1 = "";
				$scope.Questionnaire_List_option1 = "";
			}
			else
			{
				count = count + 1;
			}
      })
      .error(function (response) {

      });
	$scope.state = "下一題";
	$scope.space = "      ";
	
	$scope.nextQ = function() {    //下一題的功能區塊
		if (count == qSet.length){
			$window.location.href = '#Q-end';
			count = 0;
		}
		else
		{
			$scope.state = "下一題";
			$scope.Questionnaire_List_question1 = qSet[count].description;
			//$scope.Questionnaire_List_option1 = qSet[count].options;
			$scope.Questionnaire_List_count = count;
			$scope.q_option_type_Test = qSet[count].type;
			
			if (qSet[count].type == "MultiSelect"){
				$scope.Questionnaire_List_option_M = "";
				$scope.Questionnaire_List_option_S = "";
				$scope.q_option_type_Test = qSet[count].type;
				$scope.Questionnaire_List_option_M = qSet[count].options;
			}
			if (qSet[count].type == "SingleSelect"){
				$scope.Questionnaire_List_option_M = "";
				$scope.Questionnaire_List_option_S = "";
				$scope.q_option_type_Test = qSet[count].type;
				$scope.Questionnaire_List_option_S = qSet[count].options;
			}
			count = count + 1;
		}
	}
	$scope.endQ = function() {
		$window.location.href = '#index';
		$window.location.reload();
		count = 0;
		//$scope.Questionnaire_List_count = count;
	}
})
;