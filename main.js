function setup() {
    canvas = createCanvas(600, 500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}
song = ""

function preload() {
    song = loadSound("music.mp3")
}

function draw() {
    image(video, 0, 0, 600, 500)
    fill("#FF0000")
    stroke("#FF0000")
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20)
        inNumberLeftWristY = Number(leftWristY)
        remove_dicimals = floor(inNumberLeftWristY)
        volume = remove_dicimals / 500
        document.getElementById("volume").innerHTML = "Volume = " + volume
        song.setVolume(volume)
        console.log(volume)
    }

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20)
        if (rightWristY > 0 && rightWristY < 100) {
            song.rate(0.5)
            document.getElementById("speed").innerHTML = "Speed = 0.5X"
        } else if (rightWristY > 100 && rightWristY < 200) {
            song.rate(1.0)
            document.getElementById("speed").innerHTML = "Speed = 1.0X"
        } else if (rightWristY > 200 && rightWristY < 300) {
            song.rate(1.5)
            document.getElementById("speed").innerHTML = "Speed = 1.5X"
        } else if (rightWristY > 300 && rightWristY < 400) {
            song.rate(2.0)
            document.getElementById("speed").innerHTML = "Speed = 2.0X"
        } else if (rightWristY > 400 && rightWristY < 500) {
            song.rate(2.5)
            document.getElementById("speed").innerHTML = "Speed = 2.5X"
        }
    }
}

scoreLeftWrist = 0
scoreRightWrist = 0

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log('poseNet is initialized')
}
rightWristX = 0
leftWristX = 0
rightWristY = 0
leftWristY = 0



function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[10].score
        scoreLeftWrist = results[0].pose.keypoints[9].score
        console.log("scoreRightWrist = " + scoreRightWrist + "," + "ScoreLeftWrist" + scoreLeftWrist)

        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log("rightWristX = " + rightWristX + "," + "rightWristY = " + rightWristY)


        lefttWristX = results[0].pose.leftWrist.x
        lefttWristY = results[0].pose.leftWrist.y
        console.log("leftWristX = " + leftWristX + "," + "leftWristY = " + leftWristY)
    }
}