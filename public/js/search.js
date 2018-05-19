

$(document).ready(function () {
    console.log("connected");
    $("input[name='category2']").change(function () {
        var maxAllowed = 3;
        var cnt = $("input[name='category2']:checked").length;
        if (cnt > maxAllowed) {
            $(this).prop("checked", "");
            alert('You can select maximum ' + maxAllowed + ' categories!!');
        }
    });
    var color = "";
    var category = "";

    $("#searchSubmit").on("click", function () {

        color = $("input[name='radios']:checked").val();
        category = $("input[name='category']:checked").val()
        
        console.log(category);
        $.get("/api/search/" + color +"/"+ category).then(function (data) {
            console.log(data);
            //refer to results with data.property
        });
    });




});