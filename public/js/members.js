$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  // var artist = {};
  // $.get("/api/user_data").then(function(data) {
  //   console.log(data);
  //   artist = data;
  //   $(".member-name").text(data.name);
  // });
  //switch between screens on the member settings after log in/register
  $("#strengths-link").on("click", function () {
    console.log("you clicked strengths");
    $("#strengths-link").addClass("active");
    $("#strengths").removeClass("d-none");
    $("#portfolio").addClass("d-none");
    $("#profile").addClass("d-none");
    $("#portfolio-link").removeClass("active");
    $("#profile-link").removeClass("active");

  });

  $("#portfolio-link").on("click", function () {
    console.log("you clicked portfolio");
    $("#portfolio-link").addClass("active");
    $("#portfolio").removeClass("d-none");
    $("#profile").addClass("d-none");
    $("#strengths").addClass("d-none");
    $("#strengths-link").removeClass("active");
    $("#profile-link").removeClass("active");

  });

  $("#profile-link").on("click", function () {
    console.log("you clicked profile");
    $("#profile-link").addClass("active");
    $("#profile").removeClass("d-none");
    $("#strengths").addClass("d-none");
    $("#portfolio").addClass("d-none");
    $("#strengths-link").removeClass("active");
    $("#portfolio-link").removeClass("active");

  });

  var artist = {};

  $.get("/api/user_data").then(function (data) {
    console.log(data);
    artist = data;
  });


  $("#bioSave").on("click", function () {
    var bio = $("#shortBio").val().trim();
    console.log(bio);
    $.ajax("/api/bio/" + artist.id, {
      type: "PUT",
      data: {
        short_bio: bio
      }
    }).then(function (data) {
      console.log(data);
      // window.location.replace(data);
    });
  });

  // var strengthsArr = [];
  // $("input").on("click", function pushStrength() {
  //   console.log("something happened");
  //   var strengths = $("input:checked").val();
  //   strengths.push(strengthsArr);
  // });

  // $("#saveStrenghts").click(function () {
  //   console.log("you clicked this button");
  //   $.ajax("/api/strengths/" + artist.id, {
  //     type: "PUT",
  //     data: {
  //       strengths: strengthsArr
  //     }
  //   }).then(function (data) {
  //     console.log(data);
  //   });
  // });
  var strengthsArr = [];
  var strengths = [];
  $("#saveStrengths").on("click", function () {
    event.preventDefault();
    strengths = $("[name='category2']");

    $.each(strengths, function (index, element) {
      if (element.checked === true) {
        strengthsArr.push(element.id);
      }
    })
    // strengthsArr.push(strengths);
    // strengthsArr = strengths.filter(":checked").map(function() {
    //   return this.value;
    // }).get();
    console.log(strengthsArr);
    $.ajax("/api/strengths/" + artist.id, {
      type: "PUT",
      data: {
        strengths: JSON.stringify(strengthsArr)
      }
    }).then(function (data) {
      console.log(data);
    });
  });
});