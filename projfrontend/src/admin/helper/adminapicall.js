import { API } from "../../backend";


//category calls
export const createCategory = (userId, token, category)=>{
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            accept: "application/json",
        "content-type":"application/json",
        Authorization:`Bearer ${token}`
        },
    
    body:JSON.stringify(category)})
    .then(response=> {
        return response.json();
    })
    .catch(
        err => console.log(err)
    )
}

// get categories
export const getCategories = () =>{
    return fetch(`${API}/categories`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    })
    .catch(err => console.log(err));
}


//get a category
export const getCategory = categoryId => {
    return fetch(`${API}/category/${categoryId}`,{
        method:"GET",
    }).then(response=>{
        return response.json();
    })
    .catch(err => console.log(err));
}

// update categories
export const updateCategory = (categoryId,userId,token,category)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"PUT",
        headers:{
            accept: "application/json",
            Authorization:`Bearer ${token}`
        },
        body:category
    })
    .then(response=>{
        return response.json()
    })
    .catch(err => console.log(err))
}

//delete Category

export const deleteCategory = (categoryId,userId,token) =>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
    method:"DELETE",
    headers:{
        accept: "application/json",
        Authorization:`Bearer ${token}`
    }
    })
    .then(response=>{
        return response.json()
    })
    .catch(err => console.log(err))
}

//create products
export const createProduct =(userId,token,product) =>{
    return fetch(`${API}/product/create/${userId}`,{
    method:"POST",
    headers:{
        accept: "application/json",
        Authorization:`Bearer ${token}`
    },
    body:product
    })
    .then(response=>{
        return response.json()
    })
    .catch(err => console.log(err))
}

// get products
export const getProducts = () =>{
    return fetch(`${API}/products`,{
        method:"GET"
    }).then(response=>{
        return response.json()
    })
    .catch(err => console.log(err));
}


// delete a product

export const deleteProduct =(productId,userId,token) =>{
    return fetch(`${API}/product/${productId}/${userId}`,{
    method:"DELETE",
    headers:{
        accept: "application/json",
        Authorization:`Bearer ${token}`
    }
    })
    .then(response=>{
        return response.json()
    })
    .catch(err => console.log(err))
}



//get a product

export const getProduct = productId =>{
    return fetch(`${API}/product/${productId}`,{
        method:"GET"
    }).then(response=>{
        return response.json();
    })
    .catch(err => console.log(err));
}

//update a product

export const updateProduct =(productId,userId,token,product) =>{
    return fetch(`${API}/product/${productId}/${userId}`,{
    method:"PUT",
    headers:{
        accept: "application/json",
        Authorization:`Bearer ${token}`
    },
    body:product
    })
    .then(response=>{
        return response.json()
    })
    .catch(err => console.log(err))
}