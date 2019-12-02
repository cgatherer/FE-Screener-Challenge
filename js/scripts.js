

// Call the API ****************************************
// **************************************************
jQuery(document).ready(function($){
    $.ajax({
        type: 'GET',
        url: '',
        dataType: "jsonp",
        success: function(data) {
            // var widget = showWeather(data);
            // $('.showWeather').html(widget);
            console.log(data);
        }
    });
});
