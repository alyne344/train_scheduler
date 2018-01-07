  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA_h1agncLhry6WU2o667JnGd1frMTUfrg",
    authDomain: "train-scheduler-6601d.firebaseapp.com",
    databaseURL: "https://train-scheduler-6601d.firebaseio.com",
    projectId: "train-scheduler-6601d",
    storageBucket: "train-scheduler-6601d.appspot.com",
    messagingSenderId: "882454454094"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val();
    var trainDestination = $("#destination-input").val();
    var trainTime = moment($("#time-input").val().trim(), "HH:mm").subtract(1, "years").format("X");
    var frequencyInput = $("#frequency-input").val();

 // Creates local "temporary" object for holding employee data
 var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: frequencyInput
  };

    // Uploads employee data to the database
    database.ref().push(newTrain);
    
      // Logs everything to console
      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.time);
      console.log(newTrain.frequency);

        // Alert
  alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    
      console.log(childSnapshot.val());
    
      // Store everything into a variable.
      var trainName = childSnapshot.val().name;
      var trainDestination = childSnapshot.val().destination;
      var trainTime = childSnapshot.val().time;
      var frequencyInput = childSnapshot.val().frequency;
    
      // Train Info
      console.log(trainName);
      console.log(trainDestination);
      console.log(trainTime);
      console.log(frequencyInput);
    
      // Calculate the Train Next Arrival
    var diffTime = moment().diff(moment.unix(trainTime), "minutes");
		var timeRemainder = moment().diff(moment.unix(trainTime), "minutes") % frequencyInput;
		var minutes = frequencyInput - timeRemainder;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");
    
      // Add each train's data into the table
      $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
      frequencyInput + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + " min  " + "</td></tr>");
    });
  