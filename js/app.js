//On click event for preventing default submission
//Incorporate Moment.js
//Pull data from Firebase into the html doc
//append table data with information retrieved
//unable to get Minutes Away as a returned number
  $(document).ready(function() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyC6kupCSzDzwMTsE9AC0YT9xFxBDrJxsm4",
      authDomain: "unit-7-homework.firebaseapp.com",
      databaseURL: "https://unit-7-homework.firebaseio.com",
      projectId: "unit-7-homework",
      storageBucket: "unit-7-homework.appspot.com",
      messagingSenderId: "673705487673"
    };
    firebase.initializeApp(config);
 
  

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTT = "";
  var frequency = "";


  $("#submit-user").on("click", function(event) {
    event.preventDefault();

    trainName = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTT = moment($("#first-train-time-input").val().trim(),"MM/DD/YYYY").format("X");
    frequency = $("#frequency-input").val().trim();
    var currentTime = moment();
	console.log("CURRENT TIME: " +  moment(currentTime).format("hh:mm"));


    var trainInfo = {
        train: trainName,
        destination: destination,
        firstTimeTrainInput: firstTT,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    database.ref().push(trainInfo);
    console.log(trainInfo.trainName);
    console.log(trainInfo.destination);
    console.log(trainInfo.firstTT);

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
    

    return false;
        
    });



  database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot

   childSnap = childSnapshot.val();
   console.log(Object.values(childSnap));



        var trainTime = moment.unix(firstTT).format("hh:mm");
		
		var difference =  moment().diff(moment(trainTime),"minutes");

		var trainRemain = difference % frequency;

		var minUntil = frequency - trainRemain;

		var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');

		$("#table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");
    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  })

});
