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