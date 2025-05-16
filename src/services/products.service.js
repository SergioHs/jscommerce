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

const updateProduct = async (id, data, imagePath) => {
    const product = await getProduct(id);

    console.log('data', data);
    console.log('imagePath', imagePath);    

    const updatedProduct = {
        id: parseInt(data.id),
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        category: data.category,
        brand: data.brand,
        image: imagePath
    }

    console.log('updatedProduct', updatedProduct);

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

const removeProduct = async (id) => {
    const products = await getProducts();
    const index = products.findIndex(p => p.id === Number(id));
    if(index === -1) return null;
    const deleted = products.splice(index, 1);
    await saveProducts(products);
    return deleted[0];
}

const searchByName = async(searchTerm) => {
    const products = await getProducts();

    return products.filter(p => {
        const name = p.name || '';
        const description = p.description || '';

        return name.toLowerCase().includes(searchTerm.toLowerCase()) 
        || description.toLowerCase().includes(searchTerm.toLowerCase());
    })
}

const updateStock = async (id, quantity) => {
    const products = await getProducts();
    const index = products.findIndex(p => p.id === Number(id));
    if(index === -1) return null;

    products[index].stock = parseInt(quantity);
    await saveProducts(products);
    return products[index];
}

module.exports = {
    getAll,
    getProduct,
    updateProduct,
    createProduct,
    removeProduct,
    searchByName,
    updateStock
}