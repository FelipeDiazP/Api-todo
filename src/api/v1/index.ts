import { Router } from "express";
import taskRoutes from "../../modules/tasks/task.routes";
import categoryRoutes from "../../modules/categories/category.routes";
import statisticsRoutes from "../../modules/statistics/statistics.routes"

const router = Router();

router.use("/task", taskRoutes);
router.use("/category", categoryRoutes);
router.use("/statistics", statisticsRoutes)

export default router;
