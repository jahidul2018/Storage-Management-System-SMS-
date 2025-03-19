const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Storage Management System API",
            version: "1.0.0",
            description: "API Documentation for Storage Management System",
        },
        servers: [
            {
                url: "http://localhost:5000", // ✅ Make sure this matches your server URL
                description: "Local Development Server",
            },
        ],
    },
    apis: [path.join(__dirname, "../routes/*.js")], // ✅ Fix path to route files
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // ✅ Serve the raw Swagger JSON
    app.get("/api/docs/swagger.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    console.log("📄 Swagger Docs available at: http://localhost:5000/api/docs");
};

module.exports = setupSwagger;
