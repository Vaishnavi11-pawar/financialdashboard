import express from 'express';

import authentication  from './auth.routes';
import analyticsRoutes from "./analytics.routes";
import transactionsRoutes from "./transaction.routes";
import exportRoutes from "./export.routes";

const router = express.Router();

// export default (): express.Router => {
//     authentication(router);

//     return router;
// };

router.use(authentication);
router.use(analyticsRoutes);
router.use(transactionsRoutes);
router.use(exportRoutes);

export default router;
 