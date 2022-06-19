$(document).ready(function(event){


	$("form").submit(function(event){

		event.preventDefault();

		var videoId = $("#videoId").val();

		//alert(videoId);

    		//alert("form is submitted");

		$("#results").empty();

		var result = "";

		var api_key = "YOUR_SECRET_API_KEY"; //REMEMBER TO MAKE SECRET WHEN UPLOADING TO GITHUB 18:35pm 19/6/22

		var url = "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key="+api_key+"&videoId="+videoId+"&maxResults=100";
		//console.log(url); //Self testing

		$.get(url,function(data){
			console.log(data);


			for(var i=0;i<data.items.length;i++)
			{
				result = `

				<div class="well">
					<img style="/*float:left;*/" class="rounded-circle" src="${data.items[i].snippet.topLevelComment.snippet.authorProfileImageUrl}">
					
					<a href="${data.items[i].snippet.topLevelComment.snippet.authorChannelUrl}" target="_blank">				
						<h5>${data.items[i].snippet.topLevelComment.snippet.authorDisplayName}</h5>
					</a>

					<p>
						${data.items[i].snippet.topLevelComment.snippet.textDisplay}
					</p>
				</div>
				<br>
				
				`;

				$("#results").append(result);
			}


		})






  	})


})
