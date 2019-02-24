var editor = ace.edit("editor");
var Range = ace.require('ace/range').Range;
var markers=[]
editor.session.setMode("ace/mode/c_cpp");


var app = angular.module('app', []);

app.controller('myCtrl', function($http,$scope) {

    $scope.navstyle = [["", "切片方向"], ["", "切片方法"], ["", "并行设置"], ["", "图像类型"], ["", "时间设置"]]

    $scope.icon = ["glyphicon glyphicon-sort","glyphicon glyphicon-th-large","glyphicon glyphicon-align-justify","glyphicon glyphicon-picture","glyphicon glyphicon-time"]
    $scope.radiocontent = [["Bwd", "Fwd", "Both"], [" Symbolic", "Weiser", "SDG", "IFDS"], ["False", "True"], ["Sdg", "Cg", "Cdg", "Cfg", "Icfg", "Pdt", "Dt"]]
    $scope.radiocheck = [[true, false, false], [true, false, false, false], [true, false], [true, false, false, false, false, false, false]]

    $scope.radio = function (e) {

    var a=e.substring(0,1)
        var b=e.substring(1,2)


        for(var i=0;i< $scope.radiocheck[a].length;++i){
            $scope.radiocheck[a][i]=false
        }
        $scope.radiocheck[a][b]=true
    }

    $scope.nav = function (e) {


        if ($scope.navstyle[e][0] == "active") {
            $scope.navstyle[e][0] = ""
        } else {
            $scope.navstyle[e][0] = "active"
        }


        for (var i = 0; i < $scope.navstyle.length; ++i) {
            if (i != e)
                $scope.navstyle[i][0] = ""
        }


    }

    $scope.change = function () {
        var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
        reader.readAsText(document.getElementById("file").files[0]);//读取文件的内容


        reader.onload = function () {


            editor.setValue(this.result.trim(), -1)


            $scope.$apply()

        };


    }

    $scope.file = function(){



        document.getElementById("file").click();

    };


    $scope.net= function(){
var choice=[]
for(var a=0;a<=3;++a){
    for(var b=0;b<=$scope.radiocheck[a].length;++b){
if ($scope.radiocheck[a][b]==true){
    choice.push($scope.radiocontent[a][b])

}

    }

}

        $http({

            method:'post',

            url:'slice',

            data:{
              code:  editor.getValue(),

                direction:choice[0],
                method:choice[1],
                parallel:choice[2],
                image:choice[3],


                time:$scope.time,



            } ,


        }).success(function(req){

            $scope.result=req.trim()


        })



    };



$scope.time="1800"


})







