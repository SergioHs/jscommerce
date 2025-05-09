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
    products.push(product);
    await saveProducts(products); 
}

module.exports = {
    getProducts,
    getProductById,
    saveProducts,
    saveProduct
}