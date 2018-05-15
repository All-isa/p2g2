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

  var storage = firebase.storage();

  var imageUpload = $("#inputGroupFile04");

  console.log($("#inputGroupFile04"));
  $("#inputGroupFile04").change(function (event) {
    console.log("hi dan!");
    $("#tempFile").text(event.target.files[0].name);
    console.log(event.target.files[0].name);
  });
console.log($("#inputGroupFile04"));

var directory = "";
  imageUpload.change(function (event) {
    console.log(event);
    var file = event.target.files[0];

    directory = artist.email + "/" + file.name;
    var storageRef = firebase.storage().ref(directory);

    var task = storageRef.put(file);
  });

  console.log("/" + directory);
  // var starsRef = storage.ref(directory);

  // var image_url = "";

  // starsRef.getDownloadURL().then(function(url) {
  //   image_url = url;
  //   console.log(url);
  // });















































});

