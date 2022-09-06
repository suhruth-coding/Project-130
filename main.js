hpts = "";
ppts = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song_status_1 = "";
song_status_2 = "";
function preload(){
    hpts = loadSound("hpts.mp3");
    ppts = loadSound("ppts.mp3");
}

function setup(){
    canvas = createCanvas(600, 450);
    canvas.position(450, 250);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function draw(){
    image(video, 0, 0, 600, 450);

    fill("#FF0000");
    stroke("800000");

    song_status_1 = hpts.isPlaying();
    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        ppts.stop();

        if(song_status_1 == false){
            hpts.play();
            document.getElementById("song").innerHTML = "Song = Harry Potter Theme Song";
        }
    }

    song_status_2 = ppts.isPlaying();
    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        hpts.stop();

        if(song_status_2 == false){
            ppts.play();
            document.getElementById("song").innerHTML = "Song = Peter Pan Theme Song";
        }
    }


}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX, "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX, "rightWristY = " + rightWristY);

    }
}