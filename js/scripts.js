

// Call the API ****************************************
// **************************************************
jQuery(document).ready(function($){

    $("#zipCode").on("keypress keyup blur",function (event) {    
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    $("#submitButton").click(function (e) {
        e.preventDefault();
        var zipValue =  $('#zipCode').val();

        $(".spinner-border").show();
        setTimeout( function() {
            $.ajax({
                type: 'GET',
                url: 'https://api.openweathermap.org/data/2.5/forecast?zip=' + zipValue +',us&units=imperial&cnt=7&appid=40e16fbeed946b77e017347d9947098d',
                dataType: "jsonp",
                success: function(data) {
                    var widget = showWeather(data);
                    $('.showWeather').html(widget);
                    $(".spinner-border").hide();
                    console.log(data);
                },
                error: function (xhr, status, error) {
                    alert("Error: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
                }
            });
        }, 2000);
    });

    function showWeather(data) {
        var temp = Math.round(data.list[0].main.temp);
        var wind = Math.round(data.list[0].wind.speed);
        return "<div class='weather-forcast'>" +
               "<div class='weather-forcast--conditions'>weather<br>conditions</div>" +
               "<div class='weather-forcast--icon'><img src='https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/" + data.list[0].weather[0].icon + ".png' width='100' height='100' alt='Weather in Tarrytown, US'></div>" +
               "<div class='weather-forcast--temp'><span class='degrees'>" + temp + "° F</span><br><span class='decs'>" + data.list[0].weather[0].main + "</span><br><span class='speed'> " + wind + " MPH Winds</span></div>" +
               "<div class='weather-forcast--tomorrow'><span class='day'>Tomorrow</span><br><span class='degrees'>" + Math.round(data.list[1].main.temp) + "° F</span><br><img src='https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/" + data.list[1].weather[0].icon + ".png' width='45' height='45' alt='Weather in Tarrytown, US'></div>" +
               "<div class='weather-forcast--day-after'><span class='day'>The Day After</span><br><span class='degrees'>" + Math.round(data.list[2].main.temp) + "° F</span><br><img src='https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/" + data.list[2].weather[0].icon + ".png' width='45' height='45' alt='Weather in Tarrytown, US'></div>" +
               "</div>";
      }
});
