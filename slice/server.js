const express = require('express')
const app = express()

const exec = require('child_process').exec; 
 
const fs = require('fs')




app.post('/slice', function (req, res) {
    var code = [];


    req.on('data', function (data) {

       code=data.toString()

        fs.writeFile('slice/data/testfile.c', JSON.parse(code).code,  function(err) {


            var direction=JSON.parse(code).direction

            var method=JSON.parse(code).method
            var parallel=JSON.parse(code).parallel

            var image=JSON.parse(code).image
            var time=JSON.parse(code).time




            exec("llvm-slicing slice/data/testfile.c -d "+direction+" -m  "+method+" -p  "+parallel+" -t  "+time, function(err,stdout,stderr) {

               res.send(stdout+stderr)





            })


        });

    });

})





        
   


 












	

	
 



	
		
		
	
	






	
		
		
	
	



app.post('/image', function (req, res) {


  var code = [];
    
  
  req.on('data', function (data) {
       
       code.push(data);
        
    });
    





fs.writeFile('/usr/local/src/testfile.c', code,  function(err) {});

exec("cd /usr/local/src/ && llvm-slicing testfile.c -g Sdg ", function(err,stdout,stderr){


exec("cp /usr/local/src/testfile_SDG.png   /opt/slice/slice/data/", function(err,stdout,stderr){



 res.end()

})


})

})
	


	




app.use(express.static('slice'))
app.listen(8000, function() {

})
       
      
   
       

    



    









