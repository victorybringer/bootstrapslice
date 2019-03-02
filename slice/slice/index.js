var editor = ace.edit("editor");
var Range = ace.require('ace/range').Range;
var selection=ace.require("ace/selection").Selection
var markers=[]
var choice
var  variable=[];
editor.session.setMode("ace/mode/c_cpp");





var app = angular.module('app', []);

app.controller('myCtrl', function($http,$scope) {
    editor.selection.on("changeSelection", function(){

        var cur=editor.getSelectedText()

        for (var i=0;i<variable.length;++i){

            if (cur==variable[i][0].trim()){
                $scope.current=cur
                $scope.$apply()
                var str=$scope.result[variable[i][1]]
                var regex = /\[(.+?)\]/g;

                var a=str.match(regex)+""
                a=a.replace("[",'');


                var b=a.replace("]",'');

                $scope.number= b.split(",")


                for(var a=0;a<markers.length;++a){

                    editor.session.removeMarker(markers[a])
                }
                markers=[]
                for(var a=0;a< $scope.number.length;++a){

                    markers[a]=editor.session.addMarker(new Range($scope.number[a]-1, 0, $scope.number[a]-1, 1), "myMarker", "fullLine");
                }
                editor.clearSelection()

            }


        }




    })
    $scope.current=""
    $scope.navstyle = [["", "切片方向"], ["", "切片方法"], ["", "并行设置"], ["", "图像类型"], ["", "时间设置"]]
    $scope.origin
    $scope.icon = ["glyphicon glyphicon-sort","glyphicon glyphicon-th-large","glyphicon glyphicon-align-justify","glyphicon glyphicon-picture","glyphicon glyphicon-time"]
    $scope.radiocontent = [["Bwd", "Fwd", "Both"], [" Symbolic", "Weiser", "SDG", "IFDS"], ["False", "True"], ["Sdg", "Cg", "Cdg", "Cfg", "Icfg", "Pdt", "Dt"]]
    $scope.radiocheck = [[true, false, false], [true, false, false, false], [true, false], [true, false, false, false, false, false, false]]
    $scope.showimage=false
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
            $scope.showimage=false
            $scope.current=""
            for(var a=0;a<markers.length;++a){

                editor.session.removeMarker(markers[a])
            }

            editor.setValue(this.result.trim(), -1)

            $scope.origin=""
            $scope.$apply()

        };


    }

    $scope.file = function(){



        document.getElementById("file").click();

    };


    $scope.net= function(){
        $scope.current=""
 choice=[]
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
$scope.navstyle = [["", "切片方向"], ["", "切片方法"], ["", "并行设置"], ["", "图像类型"], ["", "时间设置"]]
            $scope.result=[]
            $scope.showimage=false
            var origin=req.trim().split("\n")
            $scope.origin=req.trim()
            for(var n=0;n<origin.length;++n){
                if(origin[n].length>0)
                    $scope.result.push(origin[n])

            }

            for(var a=0;a<markers.length;++a){

                editor.session.removeMarker(markers[a])
            }
            variable=[]
            for(var a=0;a< $scope.result.length;++a){
                var name=$scope.result[a].indexOf("@")

                if(name!=-1){


                    variable.push([$scope.result[a].substring(0,name),a]);




                }

            }
       if(variable.length>0){
           $scope.showimage=true
       }
        })



    };



$scope.time="1800"

    $scope.image=function () {

        window.location.href="data/testfile_"+choice[3].toUpperCase()+".png";


    }
})







