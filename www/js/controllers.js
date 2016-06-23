angular.module('starter.controllers', ['starter.services', 'ngCordova','ui.bootstrap','ngAnimate'])
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
.controller('SchoolSearchCtrl', function($scope,$state, $stateParams,$window,DepartInfoSet, SchoolFunc, FavoriteList_Func, schoolFilter, staudyGroup,localStorage) {
	
	var filterSunmary = {};
	$scope.school_fifter = schoolFilter;
	$scope.staudyGroup = staudyGroup;
	$scope.groups = DepartInfoSet;
	$scope.filterResultArea = [];
	$scope.filterResultGroup = [];
	
	localStorage.removeItem('filterSunmary');
    $scope.getInfoSet = function(gName) {
        $scope.departs = SchoolFunc.getDepartSet(gName);
    };
	$scope.checkedOrNotAera = function (SchoolareaName, schoolArea, $index) {
		if (schoolArea) {
			$scope.filterResultArea.push(""+$index);
		} else {
        var _index = $scope.filterResultArea.indexOf(""+$index);
			$scope.filterResultArea.splice(_index, 1);
		}	
	};
	$scope.checkedOrNotGroup = function (Group, staudyGroup_data, $index) {
		var _index;
		if (staudyGroup_data) {
			$index = $index +1;
			if ($index < 10){
				$scope.filterResultGroup.push("0"+$index);
			}else{
				$scope.filterResultGroup.push(""+$index);
			}
		} else {
			$index = $index +1;
			if ($index < 10){
				_index = $scope.filterResultGroup.indexOf("0"+$index);
				$scope.filterResultGroup.splice(_index, 1);
				
			}else{
				_index = $scope.filterResultGroup.indexOf(""+$index);
				$scope.filterResultGroup.splice(_index, 1);
			}
		}
	};
    $scope.oneAtATime = true;
	$scope.Filtersubmit = function(){
		filterSunmary = {
			"DepartList" : $scope.filterResultGroup,
			"AreaList" : $scope.filterResultArea
		}
		localStorage.setObject('filterSunmary', filterSunmary);
        $state.go('searchlist');
		
	};
	$scope.filterResultArea.length = 0;
	$scope.filterResultGroup.length = 0;

})
.controller('ThemeEventsCtrl', function($scope,$state, $stateParams, ThemeEvents_serve,$http,$cordovaBarcodeScanner,$ionicPopup, $timeout,$window) {
    var boxS;
    var alphabet_list;
    var i;
    var j;
    var picture = "";
    var alphabet_tmp = [];
    var Block = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAYAAAA+s9J6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAKISURBVHhe7dMxAQAgDMCwgX/PwIGHPslTBV3nGSCzf4GICSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQUjMXJIEFvkOhX5EAAAAASUVORK5CYII=";
    //集章簿初始化
    ThemeEvents_serve.getalphabet('my','test0001')
        .success(function(response){
            boxS = response.box_status;
            $scope.CboxStatus = "不可兌換";
            if(response.status == "403") {
                for (i = 1;i <= 15;i++){
                    alphabet_tmp.push(Block);
                }
                $scope.StampNum = 0;
            }else{
                alphabet_list = response.collectionbox;
                if (alphabet_list.length == 15){
                    if(boxS == 0) {
                        $scope.CboxStatus = "可兌換";
                    } else {
                        $scope.CboxStatus = "已兌換";
                    }
                }
                for (i = 0;i <= alphabet_list.length-1;i++){
                    picture = alphabet_list[i].picture;
                    alphabet_tmp.push(picture);
                }
                $scope.StampNum = alphabet_list.length;
                for (j = 1;j <= (15 - alphabet_list.length);j++){
                    alphabet_tmp.push(Block);
                }
            }
            $scope.alphabet = alphabet_tmp;
        })
        .error(function (response) {
        });
    $scope.scanBarcodeStamp = function () {
        //掃描學校QRcode，並回傳給後端資料庫
        $cordovaBarcodeScanner.scan().then(function (result) {
            var tmp = angular.fromJson(result.text);
            ThemeEvents_serve.collectStamp('my','test0001',tmp.schoolnum)
                .success(function(response){
                    //該頁面reload
                    var alertPopup = $ionicPopup.alert({
                        title: '',
                        template: response.message
                    });
                    alertPopup.then(function(res) {
                        //更新目前的集章簿
                        if(response.status == 201 || response.status ==200) {
                            ThemeEvents_serve.getalphabet('my','test0001')
                                .success(function(response){
                                    boxS = response.box_status;
                                    alphabet_list = response.collectionbox;
                                    for (i = 0;i <= alphabet_list.length-1;i++){
                                        picture = alphabet_list[i].picture;
                                        alphabet_tmp[i] = picture;
                                    }
                                    if (alphabet_list.length == 15){
                                        if(boxS == 0) {
                                            $scope.CboxStatus = "可兌換";
                                        } else {
                                            $scope.CboxStatus = "已兌換";
                                        }
                                    }
                                    $scope.StampNum = alphabet_list.length;
                                    $scope.alphabet = alphabet_tmp;
                                })
                                .error(function (response) {
                                });
                        }
                    });
                })
                .error(function (response) {
                
                });
        }, function (error) {
            console.warn("An error happened -> " + error);
        });
    };
    $scope.scanBarcodeExchange = function() {
        //掃描兌換QRcode，並回傳給後端資料庫來判斷是否可兌換
        $cordovaBarcodeScanner.scan().then(function (result) {
            var tmpurl = result.text;
            ThemeEvents_serve.exchangeCBox('my','test0001',tmpurl)
                .success(function(response){
                    //該頁面reload
                    var alertPopup = $ionicPopup.alert({
                        title: '',
                        template: response.message
                    });
                    var status = response.status;
                    alertPopup.then(function(res) {
                        if(status == "200") {
                            $scope.CboxStatus = "已兌換";
                            boxS = "Y";
                        }
                        
                    });
                })
                .error(function (response) {
                
                });
        }, function (error) {
            console.warn("An error happened -> " + error);
        });
    };
})
.controller('TrafficCtrl', function($scope,$state, $stateParams, $http,MAP) {
    var mapList;
    MAP.getPosList()
		.success(function(res){
			$scope.Pos_Set = res.traffic_list;
			mapList = res.traffic_list;
			$scope.name = "地點；" + mapList[0].name;
			$scope.address = "地址：" + mapList[0].address;
			$scope.time = "時間：" + mapList[0].starttime + "~" + mapList[0].endtime;
			//預設地圖為參展資料之第一筆地區資料
			var posT = MAP.searchPos(mapList[0].name, mapList);
            $scope.position = posT.position;
		})
		.error(function(res){
			
		});
    //偵測到地區按鈕被點擊，即reload該地區圖資
    $scope.setPos=function(posName) {
        var posT = MAP.searchPos(posName, mapList);
        $scope.position = posT.position;
		$scope.name = "地點；" + posT.name;
		$scope.address = "地址：" + posT.address;
		$scope.time = "時間：" + posT.starttime + "~" + posT.endtime;

    };
})
.controller('NewsCtrl', function($scope,$state, $stateParams, $http, News, $ionicPopup, $timeout) {
    var tmpList;
    News.getNewsList()
        .success(function(res) {
            $scope.News_Set = res.news_set;
            tmpList = res.news_set;
        })
        .error(function(res){
        });
    $scope.getNews = function(newsTitle) {
        var tmp = News.searchNews(newsTitle , tmpList);
        $ionicPopup.alert({
            title: tmp.title,
            template: tmp.content,
            cssClass: 'news-alert'
        });
    }
})
.controller('QuestionnaireSelect', function($scope, $window, $http, Questionnaire_serve,  $state, $ionicHistory, localStorage) {
    var qSet;
    var count = 0;
    var change = "";
    var ansSunmary={};
    var UserId = "test0001";
    
    Questionnaire_serve.getQuestionnaire('hk','2016')
        .success(function (response) {      
            qSet = response.questionset; 
            $scope.selected = [];
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
.controller('LikeListCrtl', function($scope,$state, $stateParams,FavoriteList_Func,$http,localStorage,$window) {
    FavoriteList_Func.getFavoriteList('test0001')
        .success(function(res) {
            $scope.fList = res.favoriteList;
        })
        .error(function(res){
            
        });
    $scope.getSchoolinfo = function(schoolnum) {
        var tmp = schoolnum;
        localStorage.set('SchoolNum', tmp);
        localStorage.set('PrePage', 'like_list');
        $state.go('schoolinfo');
    }
})
.controller('LecturetimeCrtl', function($scope,$state, $stateParams, $http, Lecture) {
    var tmpList;
    Lecture.getLectureList()
        .success(function(res) {
            $scope.button_Set = res.area_set;
            $scope.Lecture_Set = res.area_set[0].lec_Set;
            tmpList = res.area_set;
        })
        .error(function(res){
            
        });
    $scope.setLecture = function(areaName) {
        var tmp = Lecture.searchLecture(areaName , tmpList);
        $scope.Lecture_Set = tmp.lec_Set;
    }
})
.controller('SearchListCtrl', function($scope,$state, $stateParams,localStorage,schoolSearchRes) {
    var filterSunmary = localStorage.getObject('filterSunmary');
	schoolSearchRes.getResult(filterSunmary)
		.success(function (response) {      
            $scope.searchList = response.searchList;
			$scope.schoolNum = response.searchList.schoolNum;
        })
        .error(function (response) {

        });
	$scope.getSchoolNum = function(schoolNum){
		console.log("1111:"+schoolNum);
		console.log("3333:"+schoolNum);
		localStorage.set('SchoolNum', schoolNum);
        $state.go('schoolinfo');
	}
})
.controller('SchoolinfoCtrl', function($scope,$state, $stateParams,localStorage,schoolSearchRes,$ionicPopup,FavoriteList_Func) {
    var schoolNum = localStorage.get('SchoolNum');
	var schoolInformation= {};
	var res_status = "";
    var schName="";
    
    schoolSearchRes.getSchoolDetail(schoolNum,'my')
		.success(function (response) {
		   res_status = response.status;
           schName = response.chineseName;
		   $scope.res_status = res_status;
		   if(res_status == "200-1"){
			   $scope.picture = response.picture;
			   $scope.schoolnum = response.schoolnum;
			   $scope.chineseName = response.chineseName;
			   $scope.englishName = response.englishName;
			   $scope.schoolInfo = response.schoolinfo.introduction;
			   $scope.cList1 = response.schoolinfo.cList;
			   $scope.schoollink = response.schoolinfo.website;
			   $scope.groups = response.deptGList;
			   $scope.Stalls = response.layoutList;
		   }
		   if(res_status == "200-2"){
			   $scope.picture = response.picture;
			   $scope.schoolnum = response.schoolnum;
			   $scope.chineseName = response.chineseName;
			   $scope.englishName = response.englishName;
			   $scope.schoolInfo = response.schoolinfo.introduction;
			   $scope.cList1 = response.schoolinfo.cList;
			   $scope.schoollink = response.schoolinfo.website;
			   $scope.groups = response.deptGList;
			   if (response.layoutList != undefined){
					$scope.Stalls = response.layoutList;
					$scope.stalltitle = "教育展相關資訊";
			   }else{
				   $scope.StallsError = "無教育展相關資訊";
			   }
		   }
		   if(res_status == "200-3"){
			   $scope.picture = response.picture;
			   $scope.schoolnum = response.schoolnum;
			   $scope.chineseName = response.chineseName;
			   $scope.englishName = response.englishName;
			   $scope.schoolInfo = "無學校資訊資訊";
			   if (response.schoolinfo != undefined){
				   if (response.schoolinfo.cList!= undefined){
					   $scope.cList1 = response.schoolinfo.cList;
				   }else{
					   $scope.error = "無學校資訊資訊";
				   }
			   }else{
				   $scope.error = "無學校資訊資訊";
			   }
			   $scope.schoollink = "";
			   if (response.deptGList != undefined){
				   $scope.groups = response.deptGList;
			   }else{
				   if (response.deptGList.deptList != undefined){
						$scope.deptGList_error = ""; 
				   }
			   } 
			   $scope.Stalls = response.layoutList;
		   }
		   if(res_status == "200-4"){
			   $scope.picture = response.picture;
			   $scope.schoolnum = response.schoolnum;
			   $scope.chineseName = response.chineseName;
			   $scope.englishName = response.englishName;
			   $scope.schoolInfo = "無學校資訊資訊";
			   if (response.schoolinfo != undefined){
				   if (response.schoolinfo.cList!= undefined){
					   $scope.cList1 = response.schoolinfo.cList;
				   }else{
					   $scope.error = "無學校資訊資訊";
				   }
			   }else{
				   $scope.error = "無學校資訊資訊";
			   }
			   $scope.schoollink = "";
			   if (response.deptGList != undefined){
				   $scope.groups = response.deptGList;
			   }else{
				   if (response.deptGList.deptList != undefined){
						$scope.deptGList_error = "";
				   }
			   } 
			   if (response.layoutList != undefined){
					$scope.Stalls = response.layoutList;
					$scope.stalltitle = "教育展相關資訊";
			   }else{
				   $scope.StallsError = "無教育展相關資訊";
			   }
		   }
		   //console.log(response);
		   
		   
		   
		})
		.error(function (response) {

		});
    $scope.setFavoriteList = function() {
        FavoriteList_Func.updateFavoriteList('test0001','my',schoolNum,schName)
            .success(function(res) {
                var alertPopup = $ionicPopup.alert({
                    title: '',
                    template: res.message
                });
            })
            .error(function(res){

            });
    }
    $scope.backToindex = function() {
        $state.go('lobby');
    }
})
.controller('OtherCtrl', function($scope,$state, $stateParams) {
})
;