/* ==========================================
   LIVE DATE & TIME
========================================== */

function updateDateTime() {

    const now = new Date();

    const options = {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric"
    };

    const date =
        now.toLocaleDateString("en-GB", options);

    const time =
        now.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

    const currentDate =
        document.getElementById("currentDate");

    if(currentDate){

        currentDate.innerHTML =
            `<i class="fas fa-calendar-alt"></i>
             ${date} | ${time}`;

    }

}

/* Load once */

updateDateTime();

/* Update every second */

setInterval(updateDateTime,1000);

/* ===========================
   LIVE DATE & TIME
============================*/

document.addEventListener("DOMContentLoaded", function () {

    function updateDateTime() {

        const now = new Date();

        document.getElementById("liveDate").textContent =
            now.toLocaleDateString("en-GB", {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric"
            });

        document.getElementById("liveTime").textContent =
            now.toLocaleTimeString("en-GB");

    }

    updateDateTime();

    setInterval(updateDateTime, 1000);

});