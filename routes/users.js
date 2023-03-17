const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const authRolMiddleware = require("../middlewares/rol");
const authMiddleware = require("../middlewares/auth");
const {
  validateCreate,
  validateUpdate,
  validateId,
} = require("../validators/users");
const router = express.Router();

router
  .get("/users", authMiddleware, authRolMiddleware(["admin"]), getUsers)
  .get("/users/:id", authMiddleware, authRolMiddleware(["admin"]), getUserById)
  .post("/users", authRolMiddleware(["admin"]), validateCreate, createUser)
  .put(
    "/users/:id",
    authMiddleware,
    authRolMiddleware(["admin"]),
    validateUpdate,
    updateUser
  )
  .delete(
    "/users/:id",
    authMiddleware,
    authRolMiddleware(["admin"]),
    validateId,
    deleteUser
  );

module.exports = router;
