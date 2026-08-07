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