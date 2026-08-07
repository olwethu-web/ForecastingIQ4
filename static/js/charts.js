/* ==========================================
   Charts
========================================== */

function initializeCharts(){

    createSalesChart();

    createRevenueChart();

    createForecastChart();

}

/* ==========================================
   Sales Chart
========================================== */

function createSalesChart(){

    const ctx = document.getElementById("salesChart");

    if(!ctx) return;

    new Chart(ctx,{

        type:"line",

        data:{

            labels:["Jan","Feb","Mar","Apr","May","Jun"],

            datasets:[{

                label:"Sales",

                data:[900,1050,1250,1400,1550,1700],

                borderColor:"#3b82f6",

                backgroundColor:"rgba(59,130,246,.15)",

                fill:true,

                tension:.4,

                borderWidth:3,

                pointRadius:5,

                pointBackgroundColor:"#3b82f6"

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{

                    labels:{

                        color:"#ffffff"

                    }

                }

            },

            scales:{

                x:{

                    ticks:{color:"#cbd5e1"},

                    grid:{color:"#334155"}

                },

                y:{

                    ticks:{color:"#cbd5e1"},

                    grid:{color:"#334155"}

                }

            }

        }

    });

}

/* ==========================================
   Revenue Chart
========================================== */

function createRevenueChart(){

    const ctx=document.getElementById("revenueChart");

    if(!ctx) return;

    new Chart(ctx,{

        type:"bar",

        data:{

            labels:["Jan","Feb","Mar","Apr","May","Jun"],

            datasets:[{

                label:"Revenue",

                data:[180000,210000,245000,270000,295000,320000],

                backgroundColor:"#22c55e",

                borderRadius:8

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{

                    labels:{

                        color:"#ffffff"

                    }

                }

            },

            scales:{

                x:{

                    ticks:{color:"#cbd5e1"},

                    grid:{display:false}

                },

                y:{

                    ticks:{color:"#cbd5e1"},

                    grid:{color:"#334155"}

                }

            }

        }

    });

}