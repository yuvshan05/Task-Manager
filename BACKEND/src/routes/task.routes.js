import { Router } from "express";
import { ToggleTaskCompletion, createTask, deleteTask, getTasks, updateTask } from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-task").post(verifyJWT,createTask)
router.route("/tasks").get(verifyJWT , getTasks)
router.route("/update-task/:id").patch(verifyJWT , updateTask)
router.route("/delete-task/:id").delete(verifyJWT , deleteTask)
router.route("/task-completion/:id").patch(verifyJWT , ToggleTaskCompletion)
export default router;