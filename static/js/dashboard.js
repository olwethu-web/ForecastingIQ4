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