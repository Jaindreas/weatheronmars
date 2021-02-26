insightMars = (apiKey) => {
    fetch('http://api.nasa.gov/insight_weather/?api_key=' + apiKey+ '&feedtype=json&ver=1.0')  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then((data) => {
        console.table(data);
        /**
         * The Mars Insight API is currently on hold. Latest two dates were for SOL 787 AND 788
         */
         //Object Decontructor for Data
        let {sol_keys: [ , latestDay]} = data;
        let{av: average, mn: min, mx: max} = data[latestDay].PRE
        let averageTemp = Math.round((average * 10) / 10)
        let minTemp = Math.round((min * 10) / 10)
        let maxTemp = Math.round((max * 10) / 10)
        let dateRecorded = data[latestDay].Last_UTC
        
        let newArr = getDate();
        let[day, time, fullDate] = newArr;
        displayData();

        function displayData() {
        document.getElementById("weatherOnMars").innerHTML = `${averageTemp}°C `
        document.getElementById("date_time").innerHTML = `${day} at ${time}`
        document.getElementById("minMax").innerHTML = `Min: ${minTemp}°C | Max: ${maxTemp}°C`
        document.getElementById("console").innerHTML = `Data Recieved: ${fullDate} <br/> Sol: ${latestDay}`
        }

        function getDate() {
          const DaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          let dt = new Date(dateRecorded);
          let whichDay = dt.getDay();
          let day = DaysOfWeek[whichDay]
          let time = dt.toLocaleTimeString('en-GB', { hour12: false, 
              hour: "numeric", 
              minute: "numeric"})
          let dateArray =[day, time, dt]  
          return dateArray
          }
     }).catch(function() {
    // catch any errors
  });
}
  window.onload = function() {
    insightMars('ZWA4Rv1rhuOqL7hE0rKud1ofD93SMgYk0kbBCkx6');
  }
