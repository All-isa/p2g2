

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
});