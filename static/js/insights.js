/*==========================================
AI INSIGHTS CHART
==========================================
*/

let insightsChart = null;

function createInsightsChart() {

    const ctx = document.getElementById("insightsChart");

    if (!ctx) return;

    if (insightsChart) {
        insightsChart.destroy();
    }

    insightsChart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: [
                "Sales Growth",
                "Revenue Growth",
                "Profit Growth",
                "Customer Growth"
            ],

            datasets: [{

                data: [30, 30, 20, 20],

                backgroundColor: [
                    "#3b82f6",
                    "#22c55e",
                    "#8b5cf6",
                    "#f59e0b"
                ],

                borderWidth: 0

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            cutout: "65%",

            plugins: {

                legend: {

                    position: "right",

                    labels: {

                        color: "#ffffff"

                    }

                }

            }

        }

    });

}

/*==========================================
LOAD DASHBOARD DATA
==========================================
*/

async function loadInsights(){

    try{

        const response = await fetch(`${API_BASE_URL}/api/insights`);

        const insights = await response.json();

        const container = document.getElementById("insightsList");

        container.innerHTML = "";

        insights.forEach(text=>{

            container.innerHTML += `

                <div class="insight">

                    <strong>AI Recommendation</strong>

                    <p>${text}</p>

                </div>

            `;

        });

    }

    catch(error){

        console.error(error);

    }

}

updateGreeting();

const copilotButton = document.querySelector(".copilot-btn");

if (copilotButton) {

    copilotButton.addEventListener("click", () => {

        document.getElementById("aiSummary").innerHTML = `
            📈 Revenue is forecast to increase by <strong>18%</strong>.<br><br>
            🤖 Customer growth remains strong.<br><br>
            💰 Profit margin is expected to improve over the next quarter.<br><br>
            ⚠ Continue monitoring operating expenses.
        `;

    });

}

document.getElementById("analyzeBtn").addEventListener("click", function(){

    document.getElementById("performanceSummary").innerHTML =
    "Revenue has increased by <strong>18%</strong>. Customer growth remains positive and profit margins are stable.";

    document.getElementById("opportunitySummary").innerHTML =
    "Focus marketing on premium products and expand customer loyalty initiatives.";

    document.getElementById("riskSummary").innerHTML =
    "Operating expenses are trending upward. Monitor costs and inventory closely.";

    document.getElementById("recommendationSummary").innerHTML =
    "Maintain current sales momentum while investing in customer retention and demand forecasting.";

});