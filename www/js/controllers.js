angular.module('starter.controllers', ['starter.services'])
.controller('LobbyCtrl', function($scope,$state, $stateParams) {

})
.controller('StallsCtrl', function($scope,$state, $stateParams,$http,STALLS) {
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
.controller('SchoolSearchCtrl', function($scope,$state, $stateParams) {

})
.controller('ThemeEventsCtrl', function($scope,$state, $stateParams/* , ThemeEvents_serve, $http, $window */) {
	var alphabet_list;
	$scope.alphabet = ['Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png','Block.png'];
/* 	ThemeEvents_serve.getalphabet('my','test003')
		.success(function(response){
			alphabet_list = response.alphabet_list.collectionbox;
			$scope.test = alphabet_list[0].picture;
		})
		.error(function (response) {
			$scope.test = "你可以去死了!!!";
		});  */
})
.controller('TrafficCtrl', function($scope,$state, $stateParams, $http) {

})
.controller('NewsCtrl', function($scope,$state, $stateParams) {

})
.controller('QuestionnaireSelect', function($scope, $window, $http, Questionnaire_serve,  $state, $ionicHistory, localStorage) {
	var qSet;
	var count = 0;
	var change = "";
    var ansSunmary={};
	var UserId = "test005";
	
	Questionnaire_serve.getQuestionnaire('hk','2016')
		.success(function (response) {      
			qSet = response.questionset; 
			$scope.selected = [];
			$scope.isChecked = false;	
			$scope.q_Ans = [];
			var user = {	
			};
 			ansSunmary= {
				"userid" : UserId,
				"userAnsList" : $scope.q_Ans
			};  
			$scope.Questionnaire_List_question1 = qSet[0].description;
			if (qSet[0].type == "MultiSelect"){
				$scope.q_option_type_Test = qSet[count].type;
				$scope.Questionnaire_List_option_M = qSet[count].options;
				$scope.checkedOrNot = function (asset, isChecked, index) {
					if (isChecked) {
						$scope.selected.push(asset);
					} else {
						var _index = $scope.selected.indexOf(asset);
						$scope.selected.splice(_index, 1);
					}
				};
			}
			if (qSet[0].type == "SingleSelect"){
				$scope.q_option_type_Test = qSet[count].type;
				$scope.Questionnaire_List_option_S = qSet[count].options;
				$scope.selectedOrNot=function(item){
					$scope.selected = [];
					$scope.selected.push(item);
				}
			}
			$scope.q_option_type_Test = qSet[0].type;
			$scope.info = response.info;
			
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
	$scope.nextQ = function() {    //下一題的功能區塊
    var tmp = {
		"options" : $scope.selected
	};
		if (count == qSet.length+1){
			$window.location.href = '#index';
			$window.location.reload();
			count = 0;
		}
		else
		{
			if (count == qSet.length){
				
				$scope.q_Ans.push(tmp);
				$scope.selected = [];
				change = null;
				$scope.state = "回首頁";
				$scope.Questionnaire_List_question1 = "";
				$scope.Questionnaire_List_option_M = "";
				$scope.Questionnaire_List_option_S = "";
				$scope.q_option_type_Test = "";
				$scope.Questionnaire_List_count = count;
				count = count + 1;
				$scope.ansSunmary_test = ansSunmary;
				Questionnaire_serve.postQuestionnaire(ansSunmary,'2016','hk')
					.success(function (response){
						$scope.end_content = "感謝頗冗填寫此活動問卷";
						console.log(response.status);
						console.log("YES");
					})
					.error(function (response) {
						$scope.end_content = "感謝頗冗填寫此活動問卷";
						console.log(response);
						console.log("NO");
					});
				
			}else{
				$scope.state = "下一題";
				$scope.Questionnaire_List_question1 = qSet[count].description;
				$scope.Questionnaire_List_count = count;
				$scope.q_option_type_Test = qSet[count].type;
				
				if (qSet[count].type == "MultiSelect"){
					$scope.Questionnaire_List_option_M = "";
					$scope.Questionnaire_List_option_S = "";
					$scope.q_option_type_Test = qSet[count].type;
					$scope.Questionnaire_List_option_M = qSet[count].options;
					$scope.checkedOrNot = function (asset, isChecked, index) {
						if (isChecked) {
							$scope.selected.push(asset);
						} else {
							var _index = $scope.selected.indexOf(asset);
							$scope.selected.splice(_index, 1);
						}
					}; 
				}
				if (qSet[count].type == "SingleSelect"){
					$scope.Questionnaire_List_option_M = "";
					$scope.Questionnaire_List_option_S = "";
					$scope.q_option_type_Test = qSet[count].type;
					$scope.Questionnaire_List_option_S = qSet[count].options;
					$scope.selectedOrNot=function(item){
						$scope.selected = [];
						$scope.selected.push(item);
					} 
				}
				tmp = {
				"options" : $scope.selected
					};
					$scope.q_Ans.push(tmp);
					count = count + 1;
					$scope.selected = [];
					change = null;
			}
		}
	}
})
.controller('PhotosCtrl', function($scope,$state, $stateParams) {

})
.controller('LikeListCrtl', function($scope,$state, $stateParams) {

})
.controller('LecturetimeCrtl', function($scope,$state, $stateParams) {

})
.controller('OtherCtrl', function($scope,$state, $stateParams) {

})
;