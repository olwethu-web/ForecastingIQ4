/* ===========================================
   Dashboard Filters
=========================================== */

let currentPeriod = "monthly";

function updateDashboard() {

    document.querySelectorAll(".chart-buttons button").forEach(button => {
        button.classList.remove("active");
    });

    document.getElementById(currentPeriod + "Btn").classList.add("active");

    console.log("Current Period:", currentPeriod);

}