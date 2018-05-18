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
  var portfolio = {};
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
          var test = false;
          // var picAddress = "artist.portfolio_" + i;
          if (artist.portfolio_1 == null && test == false) {
            artist.portfolio_1 = url;
            console.log(artist.portfolio_1);
            test = true
          } else if (artist.portfolio_2 == null && test == false) {
            artist.portfolio_2 = url;
            console.log(artist.portfolio_2);
            test = true
          } else if (artist.portfolio_3 == null && test == false) {
            artist.portfolio_3 = url;
            console.log(artist.portfolio_3);
            test = true
          } else if (artist.portfolio_4 == null && test == false) {
            artist.portfolio_4 = url;
            console.log(artist.portfolio_4);
            test = true
          } else if (artist.portfolio_5 == null && test == false) {
            artist.portfolio_5 = url;
            console.log(artist.portfolio_5);
            test = true;
          } else if (artist.portfolio_6 == null && test == false) {
            artist.portfolio_6 = url;
            console.log(artist.portfolio_6);
            test = true;
          } else if (artist.portfolio_7 == null && test == false) {
            artist.portfolio_7 = url;
            console.log(artist.portfolio_7);
            test = true;
          } else if (artist.portfolio_8 == null && test == false) {
            artist.portfolio_8 = url;
            console.log(artist.portfolio_8);
            test = true;
          } else if (artist.portfolio_9 == null && test == false) {
            artist.portfolio_9 = url;
            console.log(artist.portfolio_9);
            test = true;
          } else if (artist.portfolio_10 == null && test == false) {
            artist.portfolio_10 = url;
            console.log(artist.portfolio_10);
            test = true;
          } else {
            console.log("no slots left");
          };

          $.ajax("/api/portfolio/" + artist.id, {
            type: "PUT",
            data: {
              portfolio_1: artist.portfolio_1,
              portfolio_2: artist.portfolio_2,
              portfolio_3: artist.portfolio_3,
              portfolio_4: artist.portfolio_4,
              portfolio_5: artist.portfolio_5,
              portfolio_6: artist.portfolio_6,
              portfolio_7: artist.portfolio_7,
              portfolio_8: artist.portfolio_8,
              portfolio_9: artist.portfolio_9,
              portfolio_10: artist.portfolio_10
            }
          }).then(function (data) {
            console.log(data);
          })
          // .catch(function(err){
          // console.log(err);
          // });

        });
      }
    );

  });


















































});

