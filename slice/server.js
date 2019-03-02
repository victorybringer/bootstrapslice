const express = require('express')
const app = express()

const exec = require('child_process').exec; 
 
const fs = require('fs')




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

                            exec("cp /usr/local/src/testfile_SDG.png   /opt/slice/slice/data/", function (err, stdout, stderr) {

                                console.log(image)
                                res.end()

                            })

                        }


                        if (image == "Cg") {

                            exec("cp /usr/local/src/testfile_CG.png   /opt/slice/slice/data/", function (err, stdout, stderr) {

                                console.log(image)
                                res.end()

                            })
                        }


                        if (image == "Icfg") {

                            exec("cp /usr/local/src/testfile_ICFG.png   /opt/slice/slice/data/", function (err, stdout, stderr) {
                                console.log(image)

                                res.end()

                            })

                        }

                        if (image != "Icfg" && image != "Sdg" && image != "Cg") {
                            console.log(image)
                            res.end()

                        }


                    })

                })
            });


        })

    })

})


    app.use(express.static('slice'))
    app.listen(8000, function() {

    })


        
   


 












	

	
 



	
		
		
	
	






	
		
		
	
	



	


	




      
   
       

    



    









