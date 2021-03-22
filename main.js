song = "";
Left_Wrist_x = "";
Left_Wrist_y = "";
right_Wrist_x = "";
right_Wrist_y = "";
score = 0;
score_r = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center()

    video = createCapture(VIDEO);
    video.hide()

    poseNet = ml5.poseNet(video, Model_loaded);
    poseNet.on('pose', got_poses);
}


function Model_loaded() {
    console.log("Model Loaded !!");
}



function draw() {
    image(video, 0, 0, 600, 500);
    fill(0, 255, 0);
    stroke(0, 255, 0);
    if (score > 0.2) {
        circle(Left_Wrist_x, Left_Wrist_y, 20);
        Number_y = Number(Left_Wrist_y);
        remove_decimals = floor(Number_y);
        volume = remove_decimals / 500;
        document.getElementById("volume").innerHTML = "volume = " + volume;
        song.setVolume(volume);
    }

    if (score_r > 0.2) {
        circle(right_Wrist_x, right_Wrist_y, 20);
        if (right_Wrist_y > 0 && right_Wrist_y <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5";
            song.rate(0.5);
        } else if (right_Wrist_y > 100 && right_Wrist_y <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1";
            song.rate(1);
        } else if (right_Wrist_y > 200 && right_Wrist_y <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5";
            song.rate(1.5);
        } else if (right_Wrist_y > 300 && right_Wrist_y <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2";
            song.rate(2);
        } else if (right_Wrist_y > 400) {
            document.getElementById("speed").innerHTML = "Speed = 2.5";
            song.rate(2.5);
        }
    }
}

function got_poses(result) {
    if (result.length > 0) {
        console.log(result);
        Left_Wrist_x = result[0].pose.leftWrist.x;
        Left_Wrist_y = result[0].pose.leftWrist.y;
        score = result[0].pose.keypoints[9];
        score_r = result[0].pose.keypoints[10];
        right_Wrist_x = result[0].pose.rightWrist.x;
        right_Wrist_y = result[0].pose.rightWrist.y;
    }

}

function play() {
    song.play()
    song.setVolume(1);
    song.rate(1)
}