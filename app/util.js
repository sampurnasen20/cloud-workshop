/** 
Function to receive day of the week by the index.
**/
function getDayText (dayIndex) {
    switch(dayIndex)
    {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        default:
            return 'Invalid Date';
    }
}

/** 
Parse weather object and return weekly forcast array.
**/
function generateWeeklyForcast (weatherObj) {
    var weeklyForecast = [];
    console.log(weatherObj);
    weatherObj.list.forEach(function(day)
    {
        var date 		= new Date(day.dt * 1000),
            dayText 	= getDayText(date.getDay()),
            tempLow 	= Math.round(day.temp.min),
            tempHigh 	= Math.round(day.temp.max),
            condition 	= day.weather[0].description;
            iconCode 	= day.weather[0].icon;
        
            // Push into weekly forecast array
            weeklyForecast.push({
                day: dayText, 
                tempLow: tempLow, 
                tempHigh: tempHigh, 
                condition: condition, 
                iconCode: iconCode
            });
    });
    
    return weeklyForecast;
}

/** 
Function to fetch weather icon from icon code.
**/
function getIconFilename (iconCode) {
    switch(iconCode)
    {
        case '01d':
            return 'sunny.svg';
        case '01n':
            return 'moon.svg';
        case '02d':
            return 'cloud-few.svg';
        case '02n':
            return 'cloud-few-night.svg';
        case '03d':
        case '03n':
        case '04d':
        case '04n':
            return 'cloud-scattered.svg';
        case '09d':
            return 'rainy.svg';
        case '09n':
            return 'rainy-night.svg';
        case '10d':
        case '10n':
            return 'rain.svg';
        case '11d':
        case '11n':
            return 'storm.svg';
        case '13d':
        case '13n':
            return 'snowflake.svg';
        case '50d':
        case '50n':
            return 'raindrop.svg';
        default:
            return iconCode;
    }
}

module.exports = { getDayText, getIconFilename, generateWeeklyForcast }