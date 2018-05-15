$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  var artist = {};
  $.get("/api/user_data").then(function(data) {
    console.log(data);
    artist = data;
    $(".member-name").text(data.email);
  });
//switch between screens on the member settings after log in/register
  $( "#strengths-link" ).on( "click", function() {
    console.log("you clicked strengths");
    $("#strengths-link").addClass("active");
    $("#strengths").removeClass("d-none");
    $("#portfolio").addClass("d-none");
    $("#profile").addClass("d-none");
    $("#portfolio-link").removeClass("active");
    $("#profile-link").removeClass("active");

  });

  $( "#portfolio-link" ).on( "click", function() {
    console.log("you clicked portfolio");
    $("#portfolio-link").addClass("active");
    $("#portfolio").removeClass("d-none");
    $("#profile").addClass("d-none");
    $("#strengths").addClass("d-none");
    $("#strengths-link").removeClass("active");
    $("#profile-link").removeClass("active");
    
  });

  $( "#profile-link" ).on( "click", function() {
    console.log("you clicked profile");
    $("#profile-link").addClass("active");
    $("#profile").removeClass("d-none");
    $("#strengths").addClass("d-none");
    $("#portfolio").addClass("d-none");
    $("#strengths-link").removeClass("active");
    $("#portfolio-link").removeClass("active");
    
  });

});
