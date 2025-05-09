const productService = require('../services/products.service');

const getAllProducts = async (request, response) => {    
    try {
        const products = await productService.getAll();
        return response.status(200).json(products);
        
    } catch (error) {
        console.error(error);
        if(error.message === "Produtos não encontrados"){
            return response.status(404).json({message: error.message});
        }
        response.status(500).json({message: "Error: " + error.message});
    }
}

const getProduct = async (request, response) => {
    try {
        const product = await productService.getProduct(request.params.id);
        return response.status(200).json(product);
    } catch (error) {
        console.error(error);
        if(error.message === "Produto não encontrado") {
            return response.status(404).json({message: error.message});
        }
        response.status(500).json({message: "Error: " + error.message});
    }
}

const updateProduct = async (request, response) => {
    try {
        const updated = await productService.updateProduct(request.params.id, request.body);
        return response.status(200).json(updated);
        
    } catch (error) {
        console.error(error);
        response.status(500).json({message: "Error: " + error.message});
    }
}

const createProduct = async (request, response) => {
    try {
        const imagePath = request.file ? request.file.filename : null;
        const product = await productService.createProduct(request.body, imagePath);
        response.status(201).json(product);
    } catch (error){
        response.status(500).json({message: "Error: " + error.message});
    }
}

const removeProduct = async (request, response) => {
    try {
        const deleted = await productService.removeProduct(request.params.id);
        if(!deleted){
            return response.status(404).json({ message: 'Product not found'});
        }
        return response.status(204).send();
    } catch (error){
        response.status(500).json({message: "Error: " + error.message});
    }
}

const searchByName = async (request, response) => {
    try {
        const { searchTerm } = request.query;
        if(!searchTerm){
            return response.status(400).json({ message: "Termo de pesquisa obrigatório"})
        }
        const products = await productService.searchByName(searchTerm);

        response.status(200).json(products);
    } catch (error){
        response.status(500).json({message: "Error: " + error.message});
    }
}

module.exports = {
    getAllProducts,
    getProduct,
    updateProduct,
    createProduct,
    removeProduct,
    searchByName
}