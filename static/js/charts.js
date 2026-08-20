/* ==========================================================
   FORECASTINGIQ CHART SYSTEM
   ========================================================== */

let salesChart = null;
let revenueChart = null;
let forecastChart = null;

let chartData = [];

let currentPeriod = "monthly";


/* ==========================================================
   LOAD CHART DATA
   ========================================================== */

async function loadChartData() {

    try {

        const response = await fetch("/api/chart-data");

        if (!response.ok) {
            throw new Error("Could not load chart data");
        }

        chartData = await response.json();

        console.log("Chart data loaded:", chartData);

        createSalesChart();
        createRevenueChart();

    } catch (error) {

        console.error("Chart Data Error:", error);

    }
}


/* ==========================================================
   PREPARE SALES DATA
   ========================================================== */

function prepareSalesData(period) {

    if (!chartData.length) {
        return {
            labels: [],
            values: []
        };
    }

    const rows = chartData.map(row => ({
        date: new Date(row.Date),
        sales: Number(row.Sales)
    }));


    /* -----------------------------
       YEARLY
    ----------------------------- */

    if (period === "yearly") {

        const grouped = {};

        rows.forEach(row => {

            const year = row.date.getFullYear();

            if (!grouped[year]) {
                grouped[year] = 0;
            }

            grouped[year] += row.sales;

        });

        return {
            labels: Object.keys(grouped),
            values: Object.values(grouped)
        };
    }


    /* -----------------------------
       WEEKLY
    ----------------------------- */

    if (period === "weekly") {

        return {
            labels: rows.map(row =>
                row.date.toLocaleDateString(
                    "en-ZA",
                    {
                        day: "2-digit",
                        month: "short"
                    }
                )
            ),

            values: rows.map(row => row.sales)
        };
    }


    /* -----------------------------
       MONTHLY
    ----------------------------- */

    const grouped = {};

    rows.forEach(row => {

        const key =
            row.date.getFullYear() +
            "-" +
            String(row.date.getMonth() + 1).padStart(2, "0");

        if (!grouped[key]) {
            grouped[key] = 0;
        }

        grouped[key] += row.sales;

    });


    const labels = Object.keys(grouped).map(key => {

        const [year, month] = key.split("-");

        return new Date(
            Number(year),
            Number(month) - 1
        ).toLocaleDateString(
            "en-ZA",
            {
                month: "short",
                year: "numeric"
            }
        );

    });


    return {
        labels: labels,
        values: Object.values(grouped)
    };
}


/* ==========================================================
   SALES TREND
   ========================================================== */

function createSalesChart() {

    const canvas = document.getElementById("salesChart");

    if (!canvas) {
        console.error("salesChart canvas not found");
        return;
    }

    const data = prepareSalesData(currentPeriod);


    if (salesChart) {
        salesChart.destroy();
    }


    salesChart = new Chart(canvas, {

        type: "line",

        data: {

            labels: data.labels,

            datasets: [{

                label: "Sales",

                data: data.values,

                borderColor: "#3b82f6",

                backgroundColor:
                    "rgba(59,130,246,0.15)",

                borderWidth: 3,

                tension: 0.4,

                fill: true,

                pointRadius: 4,

                pointHoverRadius: 6

            }]
        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            interaction: {
                intersect: false,
                mode: "index"
            },

            plugins: {

                legend: {
                    labels: {
                        color: "#ffffff"
                    }
                },

                tooltip: {
                    callbacks: {

                        label: function(context) {

                            return "Sales: " +
                                Number(
                                    context.raw
                                ).toLocaleString();

                        }

                    }
                }

            },

            scales: {

                x: {

                    ticks: {
                        color: "#cbd5e1"
                    },

                    grid: {
                        display: false
                    }

                },

                y: {

                    beginAtZero: true,

                    ticks: {
                        color: "#cbd5e1"
                    },

                    grid: {
                        color: "#334155"
                    }

                }

            }

        }

    });

}


/* ==========================================================
   REVENUE TREND
   ========================================================== */

function createRevenueChart() {

    const canvas =
        document.getElementById("revenueChart");

    if (!canvas) {
        console.error("revenueChart canvas not found");
        return;
    }


    const rows = chartData.map(row => ({

        date: new Date(row.Date),

        revenue: Number(row.Revenue)

    }));


    const grouped = {};


    rows.forEach(row => {

        const key =
            row.date.getFullYear() +
            "-" +
            String(
                row.date.getMonth() + 1
            ).padStart(2, "0");

        if (!grouped[key]) {
            grouped[key] = 0;
        }

        grouped[key] += row.revenue;

    });


    const labels = Object.keys(grouped).map(key => {

        const [year, month] = key.split("-");

        return new Date(
            Number(year),
            Number(month) - 1
        ).toLocaleDateString(
            "en-ZA",
            {
                month: "short",
                year: "numeric"
            }
        );

    });


    const values =
        Object.values(grouped);


    if (revenueChart) {
        revenueChart.destroy();
    }


    revenueChart = new Chart(canvas, {

        type: "bar",

        data: {

            labels: labels,

            datasets: [{

                label: "Revenue",

                data: values,

                backgroundColor: "#22c55e",

                borderRadius: 8

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    labels: {
                        color: "#ffffff"
                    }

                },

                tooltip: {

                    callbacks: {

                        label: function(context) {

                            return "Revenue: R" +
                                Number(
                                    context.raw
                                ).toLocaleString();

                        }

                    }

                }

            },

            scales: {

                x: {

                    ticks: {
                        color: "#cbd5e1"
                    },

                    grid: {
                        display: false
                    }

                },

                y: {

                    beginAtZero: true,

                    ticks: {

                        color: "#cbd5e1",

                        callback: function(value) {

                            return "R" +
                                Number(value)
                                .toLocaleString();

                        }

                    },

                    grid: {
                        color: "#334155"
                    }

                }

            }

        }

    });

}


/* ==========================================================
   SALES FORECAST
   ========================================================== */

async function createForecastChart() {

    const canvas =
        document.getElementById("forecastChart");

    if (!canvas) {
        console.error("forecastChart canvas not found");
        return;
    }


    try {

        const response =
            await fetch("/api/forecast");


        if (!response.ok) {
            throw new Error(
                "Forecast API failed"
            );
        }


        const forecast =
            await response.json();


        const labels =
            forecast.map(item =>
                new Date(
                    item.ds
                ).toLocaleDateString(
                    "en-ZA",
                    {
                        day: "2-digit",
                        month: "short"
                    }
                )
            );


        const values =
            forecast.map(
                item => Number(item.yhat)
            );


        if (forecastChart) {
            forecastChart.destroy();
        }


        forecastChart = new Chart(
            canvas,
            {

                type: "line",

                data: {

                    labels: labels,

                    datasets: [{

                        label:
                            "30-Day Sales Forecast",

                        data: values,

                        borderColor:
                            "#8b5cf6",

                        backgroundColor:
                            "rgba(139,92,246,0.15)",

                        borderWidth: 3,

                        tension: 0.4,

                        fill: true,

                        pointRadius: 3

                    }]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {

                            labels: {
                                color: "#ffffff"
                            }

                        }

                    },

                    scales: {

                        x: {

                            ticks: {
                                color: "#cbd5e1"
                            },

                            grid: {
                                display: false
                            }

                        },

                        y: {

                            beginAtZero: false,

                            ticks: {
                                color: "#cbd5e1"
                            },

                            grid: {
                                color: "#334155"
                            }

                        }

                    }

                }

            }
        );


    } catch (error) {

        console.error(
            "Forecast Chart Error:",
            error
        );

    }

}


/* ==========================================================
   WEEKLY / MONTHLY / YEARLY BUTTONS
   ========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const buttons =
            document.querySelectorAll(
                ".chart-header button, .card-header button"
            );


        buttons.forEach(button => {

            const text =
                button.textContent
                    .trim()
                    .toLowerCase();


            if (
                text === "weekly" ||
                text === "monthly" ||
                text === "yearly"
            ) {

                button.addEventListener(
                    "click",
                    function() {

                        currentPeriod =
                            text;

                        createSalesChart();

                    }
                );

            }

        });

    }
);


/* ==========================================================
   START CHART SYSTEM
   ========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadChartData();

        createForecastChart();

    }
);