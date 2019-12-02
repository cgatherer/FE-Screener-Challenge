

// Call the API ****************************************
// **************************************************
jQuery(document).ready(function($){

    // Anchor Scroll
    $('a[href*=\"#\"]').on('click', function(e) {
        e.preventDefault()
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                        scrollTop: target.offset().top - 80
                }, 750);
                return false;
            }
        }
    });

    // Table Reset
    $("#reset").click(function (e) {
        location.reload();
    });

    // Get Weather
    $("#submitButton").click(function(e) {
        $(".spinner-border").show();
        setTimeout( function() {
            $.ajax({
                type: "POST",
                url: "http://api.openweathermap.org/data/2.5/group?id=2643741,2644688,2633352,2654675,2988507,2990969,2911298,2925535,2950159,3120501,3128760,5128581,4140963,4930956,5106834,5391959,5368361,5809844,4099974,4440906&appid=de6d52c2ebb7b1398526329875a49c57&units=metric",
                dataType: "json",
                success: function (result, status, xhr) {
                    res = CreateWeatherJson(result);
                    $(".spinner-border").hide();
                    $("#weatherTable").append("<thead class='thead-dark'><tr><th>City Id</th><th>City Name</th><th>Temperature</th><th>Min Temp</th><th>Max Temp</th><th>Humidity</th><th>Pressure</th></thead>");
                    $('#weatherTable').DataTable({
                        data: JSON.parse(res),
                        columns: [
                            { data: 'cityId' },
                            { data: 'cityName' },
                            { data: 'temp' },
                            { data: 'tempMin' },
                            { data: 'tempMax' },
                            { data: 'pressure' },
                            { data: 'humidity' }
                        ],
                                "pageLength": 5
                    });
                },
                error: function (xhr, status, error) {
                    alert("Error: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
                }
            });
        }, 2000);
    });

    // Create Weather
    function CreateWeatherJson(json) {
        var newJson = "";
        for (i = 0; i < json.list.length; i++) {
            cityId = json.list[i].id;
            cityName = json.list[i].name;
            temp = json.list[i].main.temp
            pressure = json.list[i].main.pressure
            humidity = json.list[i].main.humidity
            tempmin = json.list[i].main.temp_min
            tempmax = json.list[i].main.temp_max

            newJson = newJson + "{";
            newJson = newJson + "\"cityId\"" + ": " + cityId + ","
            newJson = newJson + "\"cityName\"" + ": " + "\"" + cityName + "\"" + ","
            newJson = newJson + "\"temp\"" + ": " + temp + ","
            newJson = newJson + "\"pressure\"" + ": " + pressure + ","
            newJson = newJson + "\"humidity\"" + ": " + humidity + ","
            newJson = newJson + "\"tempMin\"" + ": " + tempmin + ","
            newJson = newJson + "\"tempMax\"" + ": " + tempmax
            newJson = newJson + "},";
        }
        return "[" + newJson.slice(0, newJson.length - 1) + "]"
    }
});
