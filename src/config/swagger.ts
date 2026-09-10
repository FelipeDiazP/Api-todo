import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "API REST para gestionar tareas",
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Local",
      },
      {
        url: "https://api-todo-g6b4.onrender.com",
        description: "Produccion",
      },
    ],

    components: {
      schemas: {

        Task: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "68c987654321abcdef123456",
            },

            title: {
              type: "string",
              example: "Estudiar para parcial",
            },

            description: {
              type: "string",
              example: "Repasar vectores y ecuaciones del plano",
            },

            isDone: {
              type: "boolean",
              example: false,
            },

            category: {
              type: "string",
              example: "Universidad",
            },

            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-09-10T10:30:00.000Z",
            },

            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-09-10T10:30:00.000Z",
            },
          },
        },

        CreateTask: {
          type: "object",

          required: [
            "title",
            "description",
            "categoryId",
          ],

          properties: {
            title: {
              type: "string",
              example: "Estudiar para parcial",
            },

            description: {
              type: "string",
              example: "Repasar vectores y ecuaciones del plano",
            },

            isDone: {
              type: "boolean",
              example: false,
            },

            categoryId: {
              type: "string",
              example: "68c123456789abcdef123456",
              description: "ID de la categoría",
            },
          },
        },

        UpdateTask: {
          type: "object",

          properties: {
            title: {
              type: "string",
              example: "Estudiar para parcial de geometría",
            },

            description: {
              type: "string",
              example: "Repasar vectores, rectas y ecuaciones del plano",
            },

            isDone: {
              type: "boolean",
              example: true,
            },

            categoryId: {
              type: "string",
              example: "68c123456789abcdef123456",
              description: "ID de la categoría",
            },
          },
        },

        Category: {
          type: "object",

          properties: {
            _id: {
              type: "string",
              example: "68c123456789abcdef123456",
            },

            name: {
              type: "string",
              example: "Universidad",
            },

            description: {
              type: "string",
              example: "Tareas relacionadas con la universidad",
            },

            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-09-10T10:30:00.000Z",
            },

            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-09-10T10:30:00.000Z",
            },
          },
        },

        CreateCategory: {
          type: "object",

          required: [
            "name",
            "description",
          ],

          properties: {
            name: {
              type: "string",
              example: "Universidad",
            },

            description: {
              type: "string",
              example: "Tareas relacionadas con la universidad",
            },
          },
        },

        UpdateCategory: {
          type: "object",

          properties: {
            name: {
              type: "string",
              example: "Estudios",
            },

            description: {
              type: "string",
              example: "Tareas relacionadas con estudio y universidad",
            },
          },
        },
      },
    },
  },

  apis: ["./src/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);