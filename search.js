function search_product() {
    const input = document.getElementById('searchbar').value.toLowerCase();
    const products = document.querySelectorAll('.product'); 

    products.forEach((product) => {
        const productName = product.querySelector('h3').textContent.toLowerCase();

        if (productName.includes(input)) {
            product.style.display = 'block'; 
        } else {
            product.style.display = 'none'; 
        }
    });
}