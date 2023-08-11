import { tco_icp_sales_chatbot_backend } from "../../declarations/tco_icp_sales_chatbot_backend";


document.serviceGetBlogs = async function(){
    const blogs = await tco_icp_sales_chatbot_backend.getBlogs();

    var response = [];
    for(let idx in blogs){
        var id = blogs[idx][0];
        var blog = blogs[idx][1];
        blog['id'] = id;
        response.push(blog)
    }
    // console.log(response);
    return response;
}


document.serviceGetProducts = async function(){
    const products = await tco_icp_sales_chatbot_backend.getProducts();

    var response = [];
    for(let idx in products){
        var id = products[idx][0];
        var product = products[idx][1];
        product['id'] = id;
        response.push(product)
    }
    // console.log(response);
    return response;
}


document.serviceFilterProducts = async function(title){
    const products = await tco_icp_sales_chatbot_backend.filterProducts(title);

    var response = [];
    for(let idx in products){
        var id = products[idx][0];
        var product = products[idx][1];
        product['id'] = id;
        response.push(product)
    }
    // console.log(response);
    return response;
}


console.log('Ready: src/tco_icp_sales_chatbot_frontend/src/index.js');

// document.querySelector("form").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const button = e.target.querySelector("button");

//   const name = document.getElementById("name").value.toString();

//   button.setAttribute("disabled", true);

//   // Interact with foo actor, calling the greet method
//   const greeting = await tco_icp_sales_chatbot_backend.greet(name);

//   button.removeAttribute("disabled");

//   document.getElementById("greeting").innerText = greeting;

//   return false;
// });
