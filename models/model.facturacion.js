const { Schema, model } = require("mongoose");

const FacturacionesSchema = Schema({
  valor_total: {
    type: Number,
    require: [true, "El valor total es obligatorio"],
  },
  fecha: {
    type: Date,
    require: [true, "La fecha es obligatoria"],
  },
  reserva: {
    type: Schema.Types.ObjectId,
    ref: "Reserva",
    require: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    require: true,
  },
});
FacturacionesSchema.methods.toJSON = function () {
  const { __v, _id, ...fac } = this.toObject();
  fac.uid = _id;
  return fac;
};

module.exports = model("Facturacion", FacturacionesSchema);
