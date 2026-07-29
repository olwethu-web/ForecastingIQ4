let forecastData = [];
let forecastChart = null;

/* ==========================================
   ForecastingIQ v2.0
   Main JavaScript File
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeDashboard();

});

/* ==========================================
   Initialize Dashboard
========================================== */

function initializeDashboard(){

    updateDateTime();

    startClock();

    initializeCharts();

    animateCards();

}

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

/* ==========================================
   Number Animation
========================================== */

function animateValue(element,start,end,duration){

    if(!element) return;

    let startTime=null;

    function animation(currentTime){

        if(!startTime) startTime=currentTime;

        const progress=Math.min((currentTime-startTime)/duration,1);

        const value=Math.floor(progress*(end-start)+start);

        element.innerHTML=value.toLocaleString();

        if(progress<1){

            requestAnimationFrame(animation);

        }

    }

    requestAnimationFrame(animation);

}

function animateCards(){

    animateValue(document.getElementById("totalSales"),0,1250,1200);

    animateValue(document.getElementById("customers"),0,385,1200);

}

/* ==========================================
   Charts
========================================== */

function initializeCharts(){

    createSalesChart();

    createRevenueChart();

    createForecastChart();

    let forecastChart;

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

/* ==========================================
   Fade-in Animation
========================================== */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

/*
==========================================
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

window.addEventListener("load", () => {

    loadDashboardData();

    loadInsights();

    loadSales();

    loadForecast();

    createForecastChart();

    createInsightsChart();

});

    const items = document.querySelectorAll(

        ".card, .chart-card, .summary-card, .table-card"

    );

    items.forEach(item=>{

        item.classList.add("fade");

        observer.observe(item);

});

/* ==========================================
   Notification Button
========================================== */

const notificationButton = document.querySelector(".notification-btn");

if(notificationButton){

    notificationButton.addEventListener("click",()=>{

        alert("No new notifications.");

    });

}

/* ==========================================
   Search Box
========================================== */

const searchInput = document.querySelector(".search-box input");

if(searchInput){

    searchInput.addEventListener("keyup",(event)=>{

        if(event.key==="Enter"){

            alert(

                "Searching for: " + searchInput.value

            );

        }

    });

}

/* ==========================================
   Active Sidebar Menu
========================================== */

const menuItems = document.querySelectorAll(".menu li");

menuItems.forEach(item=>{

    item.addEventListener("click",()=>{

        menuItems.forEach(link=>{

            link.classList.remove("active");

        });

        item.classList.add("active");

    });

});

/* ==========================================
   Smooth Scroll
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(

            this.getAttribute("href")

        );

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

/* ==========================================
   Theme Toggle
========================================== */

const themeButton = document.getElementById("themeButton");

if(themeButton){

    themeButton.addEventListener("click",()=>{

        document.body.classList.toggle("light-mode");

        const icon = themeButton.querySelector("i");

        if(document.body.classList.contains("light-mode")){

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        }else{

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

        }

    });

}

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

/* ==========================================
   Auto Refresh Simulation
========================================== */

function refreshDashboard(){

    console.log("Dashboard refreshed.");

}

setInterval(refreshDashboard,30000);

/* ==========================================
   Dashboard Greeting
========================================== */

function updateGreeting(){

    const title=document.querySelector(".page-title p");

    if(!title) return;

    const hour=new Date().getHours();

    let greeting="Welcome back.";

    if(hour<12){

        greeting="Good Morning.";

    }

    else if(hour<18){

        greeting="Good Afternoon.";

    }

    else{

        greeting="Good Evening.";

    }

    title.textContent=greeting+" Here's an overview of your business performance.";

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

/* ==========================================
   Table Hover Highlight
========================================== */

const rows=document.querySelectorAll("tbody tr");

rows.forEach(row=>{

    row.addEventListener("mouseenter",()=>{

        row.style.cursor="pointer";

    });

});

/*
==========================================
API CONFIGURATION
==========================================
*/

const API_BASE_URL = "http://127.0.0.1:5000";

async function loadDashboardData() {

    try {

        const response = await fetch(API_BASE_URL + "/api/dashboard");

        const data = await response.json();

        document.getElementById("totalSales").textContent =
            data.sales.toLocaleString();

        document.getElementById("revenue").textContent =
            "R " + data.revenue.toLocaleString();

        document.getElementById("profit").textContent =
            "R " + data.profit.toLocaleString();

        document.getElementById("customers").textContent =
            data.customers.toLocaleString();

        document.getElementById("growth").textContent =
            data.growth + "%";

    }

    catch (error) {

        console.error("Dashboard Error:", error);

    }

}

/*
==========================================
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

/*
==========================================
UPDATE KPI CARDS
==========================================
*/

function updateDashboard(data) {

    if (!data) return;

    document.getElementById("totalSales").textContent =
        Number(data.totalSales).toLocaleString();

    document.getElementById("totalRevenue").textContent =
        "R" + Number(data.totalRevenue).toLocaleString();

    document.getElementById("netProfit").textContent =
        "R" + Number(data.netProfit).toLocaleString();

    document.getElementById("customers").textContent =
        Number(data.customers).toLocaleString();

    document.getElementById("forecastChart").textContent =
        Number(data.Chart).toLocaleString();

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

/*
==========================================
LOAD SALES
==========================================
*/

async function loadSales(){

    try{

        const response = await fetch(`${API_BASE_URL}/sales`);

        const sales = await response.json();

        console.log(sales);

    }

    catch(error){

        console.error(error);

    }

}

/*
==========================================
LOAD CUSTOMERS
==========================================
*/

async function loadCustomers(){

    try{

        const response = await fetch(`${API_BASE_URL}/customers`);

        const customers = await response.json();

        console.log(customers);

    }

    catch(error){

        console.error(error);

    }

}

/*
==========================================
AUTO REFRESH
==========================================
*/

setInterval(()=>{

    loadDashboardData();

},60000);

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

/*
==========================================
START APPLICATION
==========================================
*/

    window.addEventListener("load", () => {

    // Weekly button
    document.getElementById("weeklyBtn").addEventListener("click", () => {
        currentPeriod = "weekly";
        updateDashboard();
    });

    // Monthly button
    document.getElementById("monthlyBtn").addEventListener("click", () => {
        currentPeriod = "monthly";
        updateDashboard();
    });

    // Yearly button
    document.getElementById("yearlyBtn").addEventListener("click", () => {
        currentPeriod = "yearly";
        updateDashboard();
    });

});

function quickQuestion(question){

document.getElementById("userQuestion").value = question;

sendQuestion();

}

function sendQuestion(){

const input = document.getElementById("userQuestion");

const question = input.value.trim();

if(question==="") return;

const chat = document.getElementById("chatWindow");

chat.innerHTML += `
<div class="user-message">
${question}
</div>
`;

let response = "";

if(question.toLowerCase().includes("forecast")){

response="📈 AI Forecast: Revenue is expected to increase by approximately 18% over the next month based on current trends.";

}

else if(question.toLowerCase().includes("revenue")){

response="💰 Revenue is performing above target. Marketing campaigns and customer growth are contributing positively.";

}

else if(question.toLowerCase().includes("customer")){

response="👥 Customer growth remains healthy. Retention is stable, with opportunities to increase loyalty through targeted promotions.";

}

else if(question.toLowerCase().includes("risk")){

response="⚠ Current business risk is LOW. Continue monitoring operating expenses and inventory levels.";

}

else{

response="🤖 I'm ready to assist. In a future version, I'll analyze your live business data and provide personalized recommendations.";

}

setTimeout(()=>{

chat.innerHTML += `
<div class="ai-message">
${response}
</div>
`;

chat.scrollTop = chat.scrollHeight;

},600);

input.value="";

}

document.getElementById("refreshDashboard").addEventListener("click", () => {

    // Refresh dashboard data
    if (typeof loadDashboardData === "function") {
        loadDashboardData();
    }

    // Refresh AI insights
    if (typeof loadInsights === "function") {
        loadInsights();
    }

    // Refresh forecast chart
    if (typeof loadForecastChart === "function") {
        loadForecastChart();
    }

    // Rotate refresh icon
    const btn = document.getElementById("refreshDashboard");
    const icon = btn.querySelector("i");

    icon.style.transition = "transform .8s";
    icon.style.transform = "rotate(360deg)";

    setTimeout(() => {
        icon.style.transform = "rotate(0deg)";
    }, 800);

    alert("Dashboard refreshed successfully.");

});

const dashboardItems = [

"Revenue Dashboard",

"Total Sales",

"Net Profit",

"Customers",

"AI Forecast",

"Executive Report",

"Revenue Analysis",

"Customer Insights",

"Business Risks",

"Market Intelligence",

"Executive Alerts",

"Performance Analytics"

];

const searchInput = document.getElementById("globalSearch");

const results = document.getElementById("searchResults");

searchInput.addEventListener("keyup", function(){

const keyword = this.value.toLowerCase();

const matches = dashboardItems.filter(item =>

item.toLowerCase().includes(keyword)

);

if(keyword===""){

results.innerHTML="<p>Start typing to search...</p>";

return;

}

if(matches.length===0){

results.innerHTML="<p>No matching results found.</p>";

return;

}

results.innerHTML = matches.map(item =>

`<div class="search-item">🔍 ${item}</div>`

).join("");

});

console.log("ForecastingIQ Ready");