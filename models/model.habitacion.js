const { Schema, model } = require("mongoose");

const HabitacionesSchema = Schema({
  numero: {
    type: Number,
    require: [true, "El numero es obligatorio"],
    unique: true,
  },
  tipo_habitacion: {
    type: Schema.Types.ObjectId,
    ref: "Tipo_habitacion",
    require: true,
  },
  ocupado: {
    type: Boolean,
    default: false,
  },
});
HabitacionesSchema.methods.toJSON = function () {
  const { __v, _id, ...habitacion } = this.toObject();
  habitacion.uid = _id;
  return habitacion;
};

module.exports = model("Habitacion", HabitacionesSchema);
