import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "URL Shortener API",
            version: "1.0.0",
            description: "A RESTful API for shortening URLs, managing shortened URLs, and viewing statistics.",
            contact: {
                name: "API Support",
            },
        },
        servers: [
            {
                url: "http://localhost:8080/api",
                description: "Development server",
            },
        ],
        components: {
            schemas: {
                Error: {
                    type: "object",
                    properties: {
                        success: {
                            type: "boolean",
                            example: false,
                        },
                        message: {
                            type: "string",
                            example: "Error message here",
                        },
                    },
                },
                Success: {
                    type: "object",
                    properties: {
                        success: {
                            type: "boolean",
                            example: true,
                        },
                        data: {
                            type: "object",
                        },
                    },
                },
                Url: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                        },
                        url: {
                            type: "string",
                            format: "uri",
                            example: "https://example.com/very/long/url",
                        },
                        shortCode: {
                            type: "string",
                            example: "abc12345",
                        },
                        accessCount: {
                            type: "integer",
                            example: 42,
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2024-01-01T00:00:00.000Z",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            example: "2024-01-01T00:00:00.000Z",
                        },
                    },
                },
            },
        },
    },
    apis: ["./routes/*.js", "./controllers/*.js"], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
