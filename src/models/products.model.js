const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '../data/products.json');

const getProducts = async () => {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

const getProductById = async (id) => {
    const data = await getProducts();
    const product = data.find(
        prod => prod.id === Number(id)
    );
    return product;
}

const saveProducts = async (products) => {
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
}

const saveProduct = async (product) => {
    const products = await getProducts();
    let result = [];

    let keys = Object.keys(products);
    keys.forEach(function(key){
        result.push(products[key]);
    })
    result.push(product);

    await saveProducts(result)
}


module.exports = {
    getProducts,
    getProductById,
    saveProducts,
    saveProduct
}