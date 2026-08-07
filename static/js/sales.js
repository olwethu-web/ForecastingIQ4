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