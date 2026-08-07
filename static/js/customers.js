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