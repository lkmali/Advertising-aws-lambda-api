import { Router } from "express"
import auth from "./auth.route"
import user from "./user.route"
import health from "./health.route"
const router = Router()
router.use("/auth", auth)
router.use("/users", user)
router.use("/health", health)
export default router
