//script5
//Video details displayed


$(document).ready(function(event){


	$("form").submit(function(event){

		event.preventDefault();

		var videoId = $("#videoId").val();

		$("#results").empty();

		var result = "";

		var api_key = returnSecret();

		var url = "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key="+api_key+"&videoId="+videoId+"&maxResults=100";
		var urlForTitle = "https://www.googleapis.com/youtube/v3/videos?part=snippet&key="+api_key+"&id="+videoId; //"https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + yt_video_id + "&key=" + yt_api_key;
		//console.log(url); //Self testing
		//console.log(urlForTitle); //Self testing
		



		//Characters
		const commentLinkRepresentative = "&boxbox;"; //https://www.quora.com/Is-the-symbol-for-external-link-available-in-Unicode-If-so-how-do-I-get-in-on-my-Mac


		//Video and channel details
		$.get(urlForTitle,function(data){
			console.log(data);
			var videoTitle = data.items[0].snippet.title;
			//console.log("title:");
			//console.log(videoTitle);

			var humanUploadDatetime = data.items[0].snippet.publishedAt;
			humanUploadDatetime = humanUploadDatetime.replace("T", " ");
			//console.log(humanUploadDatetime);
			humanUploadDatetime = humanUploadDatetime.replace("Z", "");

			//Modified from the comments' display
			result = `

			<div class="well">
				<!--<br>-->
					
				<a href="${"https://www.youtube.com/watch?v=" + data.items[0].id}" target="_blank">				
					<img style="/*float:left;*/" class="" src="${data.items[0].snippet.thumbnails.default.url}">
					<h6>${videoTitle}</h6>
				</a>

				<span>${humanUploadDatetime}</span> <!--<span>${data.items[0].snippet.publishedAt}</span>-->
				<span>&middot;</span>
				<span> ____ ago</span> <!-- Time since the published date -->

				<p>
					${data.items[0].snippet.channelTitle}
				</p>

			</div>
			<br>
				
			`;

			$("#results").append(result);

		});
		


		//Comments display
		$.get(url,function(data){
			console.log(data);


			for(var i=0;i<data.items.length;i++)
			{
				//console.log(humanDatetime);
				var humanDatetime = data.items[i].snippet.topLevelComment.snippet.publishedAt;
				humanDatetime = humanDatetime.replace("T", " ");
				//console.log(humanDatetime);
				humanDatetime = humanDatetime.replace("Z", "");

				var commentLink = "https://www.youtube.com/watch?v=";
				commentLink += videoId;
				commentLink += "&lc=";
				commentLink += data.items[i].id;

				result = `

				<div class="well">
					<!--<br>-->
					<!--<img style="/*float:left;*/" class="rounded-circle" src="${data.items[i].snippet.topLevelComment.snippet.authorProfileImageUrl}">-->
					
					<a href="${data.items[i].snippet.topLevelComment.snippet.authorChannelUrl}" target="_blank">				
						<img style="/*float:left;*/" class="rounded-circle" src="${data.items[i].snippet.topLevelComment.snippet.authorProfileImageUrl}">
						<h6>${data.items[i].snippet.topLevelComment.snippet.authorDisplayName}</h6>
					</a>

					<span>${humanDatetime}</span>
					<span>&middot;</span>
					<span> ____ ago</span> <!-- Time since the published date -->

					<p>
						${data.items[i].snippet.topLevelComment.snippet.textDisplay}
					</p>
					<span>${data.items[i].snippet.topLevelComment.snippet.likeCount} &uarr;</span> <!-- Likes(/"Updoots") -->

					<span>&middot;</span>
					<a href="${commentLink}" target="_blank">${commentLinkRepresentative}</a>

				</div>
				<br>
				
				`;

				$("#results").append(result);
			}


		})






  	})


})




function convertTimestampToReadable(timestamp){
	timestamp.replace("T", " "); //2022-04-29T08:26:33Z
	timestamp.replace("Z", "");
	return timestamp;
}


/*
//function getTimeAgo(){
function getTimeAgo(pastDatetime){ //Exspects past datetime. Should work with future times but give negative numbers
	
	//Currently uses local dates. (3:36am i4 20/6/22).
	//https://stackoverflow.com/questions/8398897/how-to-get-current-date-in-jquery
	var d = new Date();

	var currentYear = d.getFullYear();
	var currentMonth = d.getMonth()+1;
	var currentDay = d.getDate();

	var output = d.getFullYear() + '/' +
    		(currentMonth<10 ? '0' : '') + currentMonth + '/' +
    		(currentDay<10 ? '0' : '') + currentDay;

	//alert(output);



	//second minus first. b - a
	//^^^ (Figuring it out). (Not labelling sections of the code).
	//pastDatetime --> 2022-04-29T08:26:33Z
	//commentYear =
	var pastYear = pastDatetime.slice(0, 4); //Maybe rename "pastDatetime" parameter to commentDatetime. i4 20/6/22 3:47am
	//console.log(pastYear);
	var pastMonth = pastDatetime.slice(5, 7);
	var pastDay = pastDatetime.slice(8, 10);
	console.log(pastYear, pastMonth, pastDay);

	var productYear = currentYear - pastYear;
	console.log(productYear);//, pastMonth, pastDay);
	var productMonth = currentMonth - pastMonth;
	console.log(productMonth);
	var productDay = currentDay - pastDay;


	//Rounding etc.
	//0-11 for months
	//0-28 for days.
	//(4:02am 20/6/22 Should I include decades or "decade" as an option? Hmm. i4).

	dayMidpoint = 28/2;
	monthMidpoint = 12/2;
	//If equal to or greater than midpoint, it rounds up.
	//(Should work even if it is a float due to the greater than aspect).

	console.log(productYear, productMonth, productDay)

}

getTimeAgo("2022-04-29T08:26:33Z");
*/
/*
//https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
//I was thinking of renaming it to timeSince too.

function timeSince(pastDatetime) {


	//pastDatetime --> 2022-04-29T08:26:33Z
	//commentYear =
	var pastYear = pastDatetime.slice(0, 4); //Maybe rename "pastDatetime" parameter to commentDatetime. i4 20/6/22 3:47am
	//console.log(pastYear);
	var pastMonth = pastDatetime.slice(5, 7);
	var pastDay = pastDatetime.slice(8, 10);
	//console.log(pastYear, pastMonth, pastDay);






  var seconds = Math.floor((new Date() - pastDatetime) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}
var aDay = 24*60*60*1000;
//console.log(timeSince(new Date(Date.now()-aDay)));
//console.log(timeSince(new Date(Date.now()-aDay*2)));
console.log( timeSince("2022-04-29T08:26:33Z") )
*/
//https://dev.to/dailydevtips1/vanilla-javascript-days-between-two-dates-3d1i#:~:text=Calculate%20days%20between%20two%20dates&text=var%20difference%20%3D%20date1.,getTime()%3B
function timeSince(pastDatetime) {
	//var date1 = new Date('12/25/2020');

	var pastYear = pastDatetime.slice(0, 4); //Maybe rename "pastDatetime" parameter to commentDatetime. i4 20/6/22 3:47am
	var pastMonth = pastDatetime.slice(5, 7);
	var pastDay = pastDatetime.slice(8, 10);
	date1 = new Date(pastMonth + "/" + pastDay + "/" + pastYear);
	console.log( pastMonth + "/" + pastDay + "/" + pastYear );

	var date2 = new Date();
	var difference = date1.getTime() - date2.getTime();
	var days = Math.ceil(difference / (1000 * 3600 * 24));
	//console.log(days + ' days to Christmas');
	console.log(days + ' days');
	return days + ' days';

	//WIP

}