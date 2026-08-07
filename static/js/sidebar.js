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
