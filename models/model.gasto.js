const { Schema, model } = require("mongoose");

const GastosSchema = Schema({
  cantidad: {
    type: Number,
    require: [true, "El numero es obligatorio"],
     default: 1
  },
  valor_total: {
    type: Number,
    require: [true, "El valor total es obligatorio"],
  },
  fecha: {
    type: Date,
    require: [true, "La fecha es obligatoria"],
  },
  servicio: {
    type: Schema.Types.ObjectId,
    ref: "Servicio",
    require: true,
  },
  reserva: {
    type: Schema.Types.ObjectId,
    ref: "Reserva",
    require: true,
  },
});
GastosSchema.methods.toJSON = function () {
  const { __v, _id, ...gasto } = this.toObject();
  gasto.uid = _id;
  return gasto;
};

module.exports = model("Gasto", GastosSchema);
