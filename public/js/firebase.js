$(document).ready(function () {
  var config = {
    apiKey: "AIzaSyAn3Z01eZ7KULCJwK73Ku7xafnDJQ78Kow",
    authDomain: "artists-photo.firebaseapp.com",
    databaseURL: "https://artists-photo.firebaseio.com",
    projectId: "artists-photo",
    storageBucket: "artists-photo.appspot.com",
    messagingSenderId: "1076918173975"
  };
  firebase.initializeApp(config);
  console.log("firebase");
  var artist = {};
  $.get("/api/user_data").then(function (data) {
    console.log(data);
    artist = data;
  });
  console.log(artist);

  var storage = firebase.storage();
  var directory = "";


  //uPload profile pic
  var profilePicUpload = $("#inputGroupFile02");

  $("#inputGroupFile02").change(function (event) {
    $("#profilePicTemp").text(event.target.files[0].name);
    console.log(event.target.files[0].name);
  });

  profilePicUpload.change(function (event) {
    console.log(event);
    var file = event.target.files[0];
    directory = artist.email + "/profile/" + file.name;
    var storageRef = firebase.storage().ref(directory);

    var task = storageRef.put(file);
    console.log("/" + directory);

    //Monitor progress of upload
    task.on("state_changed",

      function progress(snapshot) {
        // var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // uploader.value = percentage;
      },
      function error(err) {
        console.log(err);
      },
      function complete() {
        console.log("Upload Complete");
        $("#inputGroupFile02").val("");
        $("#profilePicTemp").text("Choose File");
      
        //Get url of image to submit to mysql
        var starsRef = storage.ref(directory);

    var image_url = "";

    starsRef.getDownloadURL().then(function (url) {
      image_url = url;
      console.log(url);
      //enter .post request here to send url to backend

    });
  }
  );

});


//Upload pictures on Portfolio tab

var imageUpload = $("#inputGroupFile04");

$("#inputGroupFile04").change(function (event) {
  $("#tempFile").text(event.target.files[0].name);
  console.log(event.target.files[0].name);
});


imageUpload.change(function (event) {
  console.log(event);
  var file = event.target.files[0];
  directory = artist.email + "/" + file.name;
  var storageRef = firebase.storage().ref(directory);

  var task = storageRef.put(file);
  console.log("/" + directory);

  //Monitor progress of upload
  task.on("state_changed",

    function progress(snapshot) {
      // var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // uploader.value = percentage;
    },
    function error(err) {
      console.log(err);
    },
    function complete() {
      console.log("Upload Complete");
      $("#inputGroupFile04").val("");
      $("#tempFile").text("Choose File");

      //Get url of image to submit to mysql
      var starsRef = storage.ref(directory);

      var image_url = "";

      starsRef.getDownloadURL().then(function (url) {
        image_url = url;
        console.log(url);
        //enter .post request here to send url to backend
      });
    }
  );

});


















































});

