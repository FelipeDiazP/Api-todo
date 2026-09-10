import { Router } from "express";
import taskRoutes from "../../modules/tasks/task.routes";
import categoryRoutes from "../../modules/categories/category.routes";

const router = Router();

router.use("/task", taskRoutes);
router.use("/category", categoryRoutes);

export default router;
