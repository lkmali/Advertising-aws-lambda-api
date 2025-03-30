import { ControllersRequest } from "../interface"
import { JWTService } from "../service/jwt.service"
import { UserService } from "../service/user.service"

export const health = function () {
  return {
    message: "Server is running",
  }
}
