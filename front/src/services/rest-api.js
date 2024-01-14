const base = "http://localhost:8080";

export async function fetchProducts() {
    const response = await fetch(`${base}/products/all`, {
        mode: 'cors',
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    });
    const products = await response.json();
    return products;
}

export async function fetchCategories(){
    const response = await fetch(`${base}/categories/all`, {
        mode: 'cors',
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
    });
    const categories = await response.json();
    return categories;
}

export async function fetchState(){
    const products = await fetchProducts();
    const categories = await fetchCategories();
    return {products, categories};
}

export async function addNewProduct(product){
    const response = await fetch(`${base}/products/`, {
        mode: 'cors',
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });
    return await response.json();
}

export async function updateProduct(product){
    const response = await fetch(`${base}/products/${product.id}`, {
        mode: 'cors',
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });
    return await response.json();
}

export async function deleteProduct(productId){
    const response = await fetch(`${base}/products/${productId}`, {
        mode: 'cors',
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
    });
    return await response.json();
}