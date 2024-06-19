const apiUrl = "https://api.spacexdata.com";

$(document).ready(function () {
  $.getJSON(apiUrl + "/v5/launches/next", function (data) {
    const eventName = data.name;
    const eventDate = new Date(data.date_utc);

    $(".launchName").text(eventName);
    $(".launchDate").text(eventDate.toUTCString());

    function updateTimer() {
      const now = new Date().getTime();
      const distance = eventDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      $(".launchTimer").text(
        days + "d " + hours + "h " + minutes + "m " + seconds + "s"
      );
    }

    // Update the timer every second
    const interval = setInterval(updateTimer, 1000);

    // Initial call to display the timer immediately
    updateTimer();
  });
});

function selectValueChange(value) {
  let query = {};
  if (value === -1) {
    return;
  } else if (value === 1) {
    query = {
      success: true,
    };
  } else if (value === 2) {
    query = {
      success: false,
    };
  }

  const requestBody = {
    query: query,
    options: {
      limit: 10,
    },
  };

  $.ajax({
    url: apiUrl + "/v5/launches/query",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(requestBody),
    success: function (data) {
      console.log("Success:", data.docs);

      // Handle the data received from the API
      data.docs.forEach(function (doc) {
        const row = $("<tr></tr>");
        const nameCell = $("<td></td>").text(doc.name);
        const dateCell = $("<td></td>").text(new Date(doc.date_utc).toLocaleDateString());
        const detailCell = $("<td></td>").text("");
        const illustrationCell = $("<td></td>").text("");
        const youtubeCell = $("<td></td>").text(doc.links.webcast);
        row.append(nameCell, dateCell, detailCell, illustrationCell, youtubeCell);
        $("table").append(row);
      });
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    },
  });
}
