import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({
  log: ['query', 'info', 'warn'], // ou apenas 'query' para ver apenas consultas
});

export default prismaClient;