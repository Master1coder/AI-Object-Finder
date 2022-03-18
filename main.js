objects=[];
status="";
object_name="";
function setup(){
canvas=createCanvas(400,400);
canvas.center();
video=createCapture(VIDEO);
video.size(400,400);
video.hide();
}

function start(){
    objectdetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status: Detcting Objects";
    object_name=document.getElementById("input").value;
}

function modelloaded(){
    console.log("model has loaded");
    status=true;
}

function gotresults(error,results){
if(error){
    console.log(error);
}
console.log(results);
objects=results;
}

function draw(){
    image(video,0,0,400,400);
    if(status!=""){
        objectdetector.detect(video,gotresults);

        for(var i=0; i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="Status: Objects Detected";
            document.getElementById("object").innerHTML="Number Of Objects "+objects.length;
        fill("#ff0000");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
        noFill();
        stroke("#ff0000");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        
    if(object_name==objects[i].label){
        document.getElementById("object").innerHTML=object_name+" detected";
        
            }
          else{
              document.getElementById("object").innerHTML=object_name+" not detected";
          }
        }
        }

    }
