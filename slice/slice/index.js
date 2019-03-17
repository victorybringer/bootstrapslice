var editor = ace.edit("editor");
var Range = ace.require('ace/range').Range;
var selection=ace.require("ace/selection").Selection
var markers=[]
var choice
var  variable=[];
editor.session.setMode("ace/mode/c_cpp");

var app = angular.module('app', []);



function  search(a){

    var index=1
    var list=[]
    while(index!=0){

        index=a.indexOf("/",index)+1

        if(index!=0)
list.push(index)

    }

    if(list.length>=2){
var back= a.substring(0,list[list.length-2])
    return back

    }
   else{
       return "/"

    }

}

app.controller('myCtrl', function($http,$scope) {


    $scope.path="/"


    editor.selection.on("changeSelection", function(){

        var cur=editor.getSelectedText()

        for (var i=0;i<variable.length;++i){

            if (cur==variable[i][0].trim()){

                var r=confirm("发现变量"+cur+",是否显示切片结果？")
                if (r==true)
                {
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
                else
                {

                }


            }


        }




    })
    $scope.dir=function () {

        $http({

            method:'get',

            url:'filesystem?path='+$scope.path,




        }).success(function(req){

            $scope.filelist=req

            $scope.current=""
            $scope.showimage=false
            $scope.showdir=!$scope.showdir
            for(var a=0;a<markers.length;++a){

                editor.session.removeMarker(markers[a])
            }

            if($scope.showdir==true){
                document.getElementById("side").style.right="30%"
            }

            else{
                document.getElementById("side").style.right="0%"
            }

            $scope.slice="开始切片"
            $scope.origin=""
        })


    }


    $scope.slice="开始切片"
    $scope.terminal=false
    $scope.current=""
    $scope.navstyle = [["", "切片方向"], ["", "切片方法"], ["", "并行设置"], ["", "图像类型"], ["", "时间设置"]]
    $scope.origin
    $scope.icon = ["glyphicon glyphicon-sort","glyphicon glyphicon-th-large","glyphicon glyphicon-align-justify","glyphicon glyphicon-picture","glyphicon glyphicon-time"]
    $scope.radiocontent = [["Bwd", "Fwd", "Both"], [" Symbolic", "Weiser", "SDG", "IFDS"], ["False", "True"], ["Sdg", "Cg", "Cdg", "Cfg", "Icfg", "Pdt", "Dt"]]
    $scope.radiocheck = [[true, false, false], [true, false, false, false], [true, false], [true, false, false, false, false, false, false]]
    $scope.showimage=false
    $scope.showdir=false
    $scope.fileturn=function(path){

        $http({

            method:'get',

            url:'filesystem?path='+$scope.path+path+'/',




        }).success(function(req){

            $scope.filelist=req
                $scope.path+=path+'/'

        })

    }

    $scope.openfile=function(path){

        $http({

            method:'get',

            url:'openfile?path='+$scope.path+path,




        }).success(function(req){


            $scope.current=""
            for(var a=0;a<markers.length;++a){

                editor.session.removeMarker(markers[a])
            }
            document.getElementById("file").value=""




            editor.setValue(req.trim(), -1)

            $scope.origin=""




        })

    }




    $scope.back=function(){


        $http({

            method:'get',

            url:'filesystem?path='+search($scope.path),




        }).success(function(req){

            $scope.filelist=req
            $scope.path=search($scope.path)

        })

    }



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
            console.log(   document.getElementById("file").files)
            $scope.showimage=false
            $scope.current=""
            $scope.slice="开始切片"
            for(var a=0;a<markers.length;++a){

                editor.session.removeMarker(markers[a])
            }

            editor.setValue(this.result.trim(), -1)
            $scope.showdir=false
            $scope.origin=""
            $scope.$apply()

        };


    }

    $scope.file = function(){

document.getElementById("file").click()
    };

    $scope.openterminal = function(){


            $scope.terminal=!$scope.terminal

            document.getElementById("tx").style.bottom="0%"

            if($scope.terminal==true)
                document.getElementById("tx").style.bottom="40%"





    };

    $scope.net= function(){
        $scope.showdir=false
        if ($scope.slice=="退出切片"){
            $scope.slice="开始切片"
            $scope.origin=""
            $scope.showimage=false
            $scope.result=[]
            editor.session.setAnnotations([]);
            for(var a=0;a<markers.length;++a){

                editor.session.removeMarker(markers[a])
            }
        }
       else{
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






                document.getElementById("side").style.right="0%"


            $scope.slice="退出切片"

            editor.session.setAnnotations([]);
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
else{

          var error=[]


           for(var a=0;a<$scope.result.length;++a){
               var name=$scope.result[a].indexOf("error:")

               if(name!=-1){

            error.push({
                row: /(:[0-9]*)/ig.exec($scope.result[a])[0].replace(/:/ig,"")-1,
                       column: 0,
                       text: "Error ", // Or the Json reply from the parser
                       type: "error" // also warning and information
               })

               }

           }



           editor.session.setAnnotations(error);





       }

        })

        }

    };



$scope.time="1800"

    $scope.image=function () {

        window.location.href="image.html?image="+choice[3].toUpperCase();


    }
})








