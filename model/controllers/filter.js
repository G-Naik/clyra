const products = require("../schema/products");

const filterProduct = async (request, response) => {
    // Extract category and sorting data from query parameters
    const { category,sortOrder = 'asc' } = request.query;

    console.log(category,sortOrder)

    try {
        // Find products by category and apply sorting based on sortField and sortOrder
        const filteroutData = await products.find({ category: category })
            .sort({ price:sortOrder === 'asc' ? 1 : -1 });

        if (filteroutData.length > 0) {
            // Send the filtered and sorted data
            response.status(200).send(filteroutData);
        } else {
            // If no data found, send 404 status
            response.status(404).send({ message: "No products found for the specified category" });
        }
    } catch (err) {
        // Send 500 error if any issues occur
        response.status(500).send({ message: "Internal Server Error", error: err.message });
    }
};

module.exports = { filterProduct };
