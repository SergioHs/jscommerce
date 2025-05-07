const {getProducts, getProductById, saveProducts, saveProduct} = require('../models/products.model');

const getAll = async () => {
    const products = await getProducts();
    if(!products || products.length === 0){
        throw new Error ('Produtos não encontrados');
    }
    return products;
}

const getProduct = async (id) => {
    const product = await getProductById(id);
    if(!product || product.length === 0){
        throw new Error ('Produto não encontrado');
    }
    return product;
}

const updateProduct = async (id, data) => {
    const product = await getProduct(id);
    
    //combina o produto com o novo
    const updatedProduct = {...product, ...data};

    //procurar e mesclar o produto no json
    const products = await getProducts();
    const index = products.findIndex(
        prod => prod.id === Number(id)
    );
    products[index] = updatedProduct;

    await saveProducts(products);
    return products[index];
}

const createProduct = async (data, imagePath) => {
    const newProduct = {
        id: Date.now(),
        ...data,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        image: imagePath
    }
    await saveProduct(newProduct);
    return newProduct;
}

module.exports = {
    getAll,
    getProduct,
    updateProduct,
    createProduct
}