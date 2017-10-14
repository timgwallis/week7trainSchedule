$(document).ready(function() {


	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyA7wOErvrZyEeNm7WNbShHgHSTxzaTEb9Y",
		authDomain: "twtrainschedule.firebaseapp.com",
		databaseURL: "https://twtrainschedule.firebaseio.com",
		projectId: "twtrainschedule",
		storageBucket: "twtrainschedule.appspot.com",
		messagingSenderId: "442599438508"
	};
	firebase.initializeApp(config);

	var database = firebase.database();



	$('#submitButton').on('click', function(){
		var trainName = $('#trainNameInput').val().trim();
		var destination = $('#destinationInput').val().trim();
		var firstTime = moment($('#timeInput').val().trim(), "HH:mm").format("");
		var frequency = $('#frequencyInput').val().trim();

		var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

		var currentTime = moment();

		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

		var tRemainder = diffTime % frequency;

		var tMinutesTillTrain = frequency - tRemainder;

		var nextTrain = moment().add(tMinutesTillTrain, "minutes");
		var nextTrainConverted = moment(nextTrain).format("hh:mm a");

		/*database.ref().push(newTrains);
			var newTrains = {
				name: trainName,
				tdestination: destination,
				tFirst: firstTime,
				tfreq: frequency,
			}


			$('#trainNameInput').val("");
			$('#destinationInput').val("");
			$('#timeInput').val("");
			$('#frequencyInput').val("");

			return false;
		*/


	database.ref().push({
		name: trainName,
		destination: destination,
		time:  firstTime,
		freq: frequency		
	});

	 // Submit Button
	 $('#trainNameInput').val("");
	 $('#destinationInput').val("");
	 $('#timeInput').val("");
	 $('#frequencyInput').val("");

	 /*console.log(trainName);
	 console.log(destination);
	 console.log(firstTime);
	 console.log(frequency);*/

	});

	database.ref().on("child_added", function(childSnapshot, prevChildKey){

		var trainName = childSnapshot.val().name;
		var destination = childSnapshot.val().destination;
		var firstTime = childSnapshot.val().time;
		var frequency = childSnapshot.val().freq;
		var arrival = childSnapshot.val().arrival;
		var away = childSnapshot.val().away;

		var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

		var currentTime = moment();

		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

		var tRemainder = diffTime % frequency;

		var tMinutesTillTrain = frequency - tRemainder;

		var nextTrain = moment().add(tMinutesTillTrain, "minutes");
		var nextTrainConverted = moment(nextTrain).format("hh:mm a");


		$("#dispSV").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + "Every " + frequency + " minutes" + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");

	});

});
