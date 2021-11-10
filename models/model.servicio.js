const {Schema,model}= require('mongoose');

const ServiciosSchema= Schema({
    nombre:{
        type: String,
        require: [true,'El nombre es obligatorio'],
        unique: true
    },
    descripcion:{
        type: String,
        require: [true,'La descripción es obligatorio'],
    },
    precio:{
        type:Number,
        require:[true,'El precio es obligatorio']
    },
    img:{
        type: String,
        default:""
    },
    estado:{
        type: Boolean,
        default: true
    }

})
ServiciosSchema.methods.toJSON=function(){
    const{__v,_id,...servicio}=this.toObject();
    servicio.uid=_id;
    return servicio;
}

module.exports= model('Servicio',ServiciosSchema);