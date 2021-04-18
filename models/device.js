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
    // ����EMQ Xʱʹ�õ�username
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

/* ����device.toJSONObject������ȡ�����豸����Ϣ */
deviceSchema.methods.toJSONObject = function () {
    return {
        product_name: this.product_name,
        device_name: this.device_name,
        secret: this.secret
    }
}

/**
 * Mongoose ��һ��ʼ�� Schema
 * ÿ�� schema ����ӳ�䵽һ�� MongoDB collection �����������collection����ĵ��Ĺ���
 * 
 * ���ǣ�Schema�����Ƕ���Schemaֻ�Ƕ������ĵ��ṹ����������
 * ����Ҫ��mongoose.model()������Schema����Ϊ����class��Ȼ�����ʵ�����ö���
 */
var Device = model('Device', deviceSchema)
module.exports = Device