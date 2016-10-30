/*
DONE:
- play/pause;
- volume;
- progress bar.

TODO:
- backward/forward;
- repeat/shuffle;
- lyrics;
- playlist.
*/
var audio = document.getElementById('audio');
var progress = document.getElementById('progress');
var playpause = document.getElementById("play");
var replay = document.getElementById("replay");
var volume = document.getElementById("volume");
var time=document.getElementById('times');

audio.controls = false;
// audio.autoplay=true;
audio.addEventListener('timeupdate', function() {
	
  	updateProgress();
	  var	aTime =parseInt(audio.currentTime);
	  var   aLength =parseInt(audio.duration) ; 
	  var pass_mon = parseInt(aLength/60);
	  aLength = aLength%60;
	  var start_mon = parseInt(aTime/60);	
	  aTime = aTime%60;
	  if(aTime<10){
	  	time.innerHTML=start_mon+':0'+aTime+'/'+pass_mon+':'+aLength;
			
	  }else{	
	  	time.innerHTML=start_mon+':'+aTime+'/'+pass_mon+':'+aLength;
	  }
      
	}, false);

function togglePlay() {
   if (audio.paused || audio.ended) {

      playpause.title = "Pause";
      playpause.innerHTML = '<i>&#xe603;</i>';
      audio.play();
   } else {
      playpause.title = "Play";
      playpause.innerHTML = '<i>&#xe600;</i>';
      audio.pause();
   }
}

function replayAudio(){
	audio.currentTime = 0; 
	ctx.clearRect(0,0,canvas.width,canvas.height);
}


function setVolume() {
   audio.volume = volume.value;
}
var canvas = document.getElementById('progress');
var ctx = canvas.getContext('2d');
function updateProgress() {
	var percent = Math.floor((100 / audio.duration) * audio.currentTime);
	progress.value = percent;		
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	var radius = 150;	
	var circ = Math.PI;
	var quart = Math.PI / 4;
	var cpercent = percent / 100; /* current percent */
	ctx.beginPath();
	ctx.lineCap='round';
	ctx.arc(centerX, centerY, radius,0, ((circ) * cpercent), false);
	ctx.lineWidth =5;
	ctx.strokeStyle = 'yellow';
	ctx.stroke();
	if(audio.ended){
		resetPlayer();
	}
}

function resetPlayer() {
	audio.currentTime = 0; 
	ctx.clearRect(0,0,canvas.width,canvas.height);
	playpause.title = "Play";
    playpause.innerHTML = '<i>&#xe600;</i>';

 	  /*playpause.title = "Play";
	  playpause.innerHTML = '<i class="fa fa-play fa-3x"></i>';*/
}

// thx to: http://www.adobe.com/devnet/html5/articles/html5-multimedia-pt3.html