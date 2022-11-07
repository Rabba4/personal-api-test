import { Router } from "express";
import {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/usuarios", getUsuarios);

router.get("/usuarios/:username", getUsuario);

router.post("/usuarios", createUsuario);

router.patch("/usuarios/:id", updateUsuario);

router.delete("/usuarios/:id", deleteUsuario);

export default router;
