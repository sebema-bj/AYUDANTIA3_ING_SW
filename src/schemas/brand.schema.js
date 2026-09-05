import { z } from 'zod';

export const createBrandSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(80, 'El nombre no puede superar los 80 caracteres'),

  country: z
    .string()
    .trim()
    .max(60, 'El país no puede superar los 60 caracteres')
    .optional(),

  website: z
    .string()
    .url('La página web debe ser una URL válida')
    .max(200, 'La URL no puede superar los 200 caracteres')
    .optional()
});