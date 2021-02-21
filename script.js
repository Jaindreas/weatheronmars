insightMars = (apiKey) => {
    fetch('http://api.nasa.gov/insight_weather/?api_key=' + apiKey+ '&feedtype=json&ver=1.0')  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then((data) => {
        console.log(data)
       
        let dayToday = data.sol_keys[1];
        let averageTemp = Math.round(data[dayToday].PRE.av * 10) / 10
        let dateRecorded = data[dayToday].Last_UTC
        let minTemp = Math.round(data[dayToday].PRE.mn * 10) / 10
        let maxTemp = Math.round(data[dayToday].PRE.mx * 10) / 10

        

        let DaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let dt = new Date(dateRecorded);
        whichDay = dt.getDay();
        day = DaysOfWeek[whichDay]
        time = dt.toLocaleTimeString('en-GB', { hour12: false, 
            hour: "numeric", 
            minute: "numeric"})
        
        
        document.getElementById("weatherOnMars").innerHTML = `${averageTemp}°C `
        document.getElementById("date_time").innerHTML = `${day} at ${time}`
        document.getElementById("console").innerHTML = `Data Recieved: ${dt} <br/> Sol: ${dayToday}`
        document.getElementById("minMax").innerHTML = `Min: ${minTemp}°C | Max: ${maxTemp}°C`
        
     }).catch(function() {
    // catch any errors
  });
}

  window.onload = function() {
    insightMars('ZWA4Rv1rhuOqL7hE0rKud1ofD93SMgYk0kbBCkx6');
  }