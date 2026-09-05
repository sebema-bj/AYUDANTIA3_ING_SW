import prisma from '../config/prisma.js';

/**
 * Obtener reseñas de un producto
 * GET /api/products/:id/reviews
 */
export const getProductReviews = async (req, res, next) => {
  try {
    const productId = Number(req.params.id);

    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return res.status(404).json({
        error: 'Producto no encontrado'
      });
    }

    const reviews = await prisma.review.findMany({
      where: { productId }
    });

    const averageRating =
      reviews.length > 0
        ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
        : 0;

    res.status(200).json({
      reviews,
      averageRating
    });

  } catch (error) {
    next(error);
  }
};

/**
 * Crear reseña para un producto
 * POST /api/products/:id/reviews
 */
export const createReview = async (req, res, next) => {
  try {
    const productId = Number(req.params.id);

    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return res.status(404).json({
        error: 'Producto no encontrado'
      });
    }

    const newReview = await prisma.review.create({
      data: {
        ...req.body,
        productId
      }
    });

    res.status(201).json({
      mensaje: 'Reseña creada exitosamente',
      data: newReview
    });

  } catch (error) {
    next(error);
  }
};