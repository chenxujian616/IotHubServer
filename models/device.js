const { Schema, model } = require("mongoose");

/* IotHub_Server/models/device.js */
const deviceSchema = new Schema({
    // productName
    product_name: {
        type: String,
        required:true
    },
    // deviceName
    device_name: {
        type: String,
        required:true
    },
    // 接入EMQ X时使用的username
    broker_username: {
        type: String,
        required:true
    },
    // secret
    secret: {
        type: String,
        required:true
    }
})

/* 定义device.toJSONObject方法获取单个设备的信息 */
deviceSchema.methods.toJSONObject = function () {
    return {
        product_name: this.product_name,
        device_name: this.device_name,
        secret: this.secret
    }
}

/**
 * Mongoose 的一切始于 Schema
 * 每个 schema 都会映射到一个 MongoDB collection ，并定义这个collection里的文档的构成
 * 
 * 但是，Schema并不是对象。Schema只是定义了文档结构和属性类型
 * 必须要用mongoose.model()方法把Schema创建为对象class，然后才能实例化该对象
 */
var Device = model('Device', deviceSchema)
module.exports = Device