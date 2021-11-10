const { Router } = require("express");
const { check } = require("express-validator");
const { validar_campos } = require("../middlewares");
const { login_cliente,
  recuperar_contraseña,
  olvido_contraseña,
  menu_recuperar_contraseña
} = require("../controllers");


const router = Router();

router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("clave", "La contraseña es obligatoria").not().isEmpty(),
    validar_campos,
  ],
  login_cliente
);

router.get("/recuperar/:id", menu_recuperar_contraseña);

router.put(
  "/olvido",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    validar_campos
  ],
  olvido_contraseña
);

router.put(
  "/recuperar/:c",
  [
    check("c", "url es obligatorio").not().isEmpty(),
    check("newPassword", "La contraseña es obligatoria").not().isEmpty(),
    validar_campos
  ],
  recuperar_contraseña
);

module.exports = router;