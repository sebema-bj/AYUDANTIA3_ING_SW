import { Router } from 'express';

import {
  getProductReviews,
  createReview
} from '../controllers/review.controller.js';

import { validate } from '../middlewares/validate.middleware.js';
import { createReviewSchema } from '../schemas/review.schema.js';
import { productIdParamSchema } from '../schemas/product.schema.js';

const router = Router({
  mergeParams: true
});

router.get(
  '/',
  validate(productIdParamSchema, 'params'),
  getProductReviews
);

router.post(
  '/',
  validate(productIdParamSchema, 'params'),
  validate(createReviewSchema, 'body'),
  createReview
);

export default router;