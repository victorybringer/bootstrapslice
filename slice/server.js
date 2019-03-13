//基于Express框架
const express = require('express')
const app = express()

const exec = require('child_process').exec; 
 
const fs = require('fs')

console.log("构建完成，请关闭此命令窗口")

//打开终端
exec("cd /usr/local/&& ./gotty -w bash", function (err, stdout, stderr){

   


 })

//容器模式下，读取文件
app.get('/openfile', function (req, res) {

    fs.readFile(req.query.path, 'utf8', function(err, data){
       res.send(data)
    });


})

//容器模式下，列出文件目录
app.get('/filesystem', function (req, res) {



    fs.readdir(req.query.path,function(err, files){


        var filelist = []

      if(req.query.path!="/etc/") {
          files.forEach(function (item, index) {
              let fsStats = fs.statSync(req.query.path + item);
              if (fsStats.isFile()) {
                  filelist.push([item, false]);
              } else if (fsStats.isDirectory()) {
                  filelist.push([item, true]);
              }

          })

          res.send(filelist)

      }
      else{
          res.send([])
      }

    });




})

//接收前端传来的代码，生成.C文件,交给LLVM处理
app.post('/slice', function (req, res) {
    var code = [];


    req.on('data', function (data) {

        code = data.toString()

        fs.writeFile('slice/data/testfile.c', JSON.parse(code).code, function (err) {


            var direction = JSON.parse(code).direction

            var method = JSON.parse(code).method
            var parallel = JSON.parse(code).parallel

            var image = JSON.parse(code).image
            var time = JSON.parse(code).time



            fs.writeFile('/usr/local/src/testfile.c', code, function (err) {

                exec("llvm-slicing slice/data/testfile.c -d " + direction + " -m  " + method + " -p  " + parallel + " -t  " + time, function (err, stdout, stderr) {

                    res.send(stdout + stderr)


                    exec("cp slice/data/testfile.c /usr/local/src/ && cd /usr/local/src/ && llvm-slicing testfile.c -g " + image, function (err, stdout, stderr) {


                        if (image == "Sdg") {

                            exec("cp /usr/local/src/testfile_SDG.dot   /opt/slice/slice/data/", function (err, stdout, stderr) {


                                res.end()

                            })

                        }


                        if (image == "Cg") {

                            exec("cp /usr/local/src/testfile_CG.dot    /opt/slice/slice/data/", function (err, stdout, stderr) {


                                res.end()

                            })
                        }


                        if (image == "Icfg") {

                            exec("cp /usr/local/src/testfile_ICFG.dot    /opt/slice/slice/data/", function (err, stdout, stderr) {


                                res.end()

                            })

                        }

                        if (image != "Icfg" && image != "Sdg" && image != "Cg") {
                            exec("cp -r /usr/local/src/testfile.c_"+image.toUpperCase()+"   /opt/slice/slice/data/", function (err, stdout, stderr) {


                                res.end()

                            })


                        }


                    })

                })
            });


        })

    })


})



    //slice目录下存放静态的HTML
    app.use(express.static('slice'))

    //监听8000端口
    app.listen(8000, function() {

    })


        
   


 












	

	
 



		
		
	
	






	
		
		
	
	



	


	




      
   
       

    



    









