let forecastData = [];
let forecastChart = null;

/* ==========================================
   Forecast Chart
========================================== */

async function createForecastChart() {

    const ctx = document.getElementById("forecastChart");

    if (!ctx) return;

    // Fetch forecast from Flask
    const response = await fetch("http://127.0.0.1:5000/api/forecast");

    const forecast = await response.json();

    const labels = forecast.map(item =>
        new Date(item.ds).toLocaleDateString()
    );

    const values = forecast.map(item => item.yhat);

    if (forecastChart) {
    forecastChart.destroy();
    }

    forecastChart = new Chart(ctx,{
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "30-Day Forecast",
                data: values,
                borderColor: "#8b5cf6",
                backgroundColor: "rgba(139,92,246,0.15)",
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

}

/*
==========================================
LOAD FORECAST
==========================================
*/

async function loadForecast() {

    console.log("Loading forecast...");

    try {

        const response = await fetch(`${API_BASE_URL}/api/forecast`);

        forecastData = await response.json();

        console.log("Forecast Data:", forecastData);

        createForecastChart();

    } catch (error) {

        console.error("Forecast Error:", error);

    }

}