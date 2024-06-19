const apiUrl = "https://api.spacexdata.com"

$(document).ready(function() {
  $.getJSON(apiUrl + "/v5/launches/next", function(data) {
      const eventName = data.name;
      const eventDate = new Date(data.date_utc);

      $('.launchName').text(eventName);
      $('.launchDate').text(eventDate.toUTCString());

      function updateTimer() {
          const now = new Date().getTime();
          const distance = eventDate - now;

          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          $('.launchTimer').text(days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's');
      }

      // Update the timer every second
      const interval = setInterval(updateTimer, 1000);

      // Initial call to display the timer immediately
      updateTimer();
  });
});