/**
 * routes/devices.js
 * @brief ϵͳ�Զ�����DeviceName��Secret
 */

const shortid = require('shortid')
const Device = require('../models/device')

const express = require('express')
const router = express.Router()

router.post('/', function (req, res) {
    // �������л�ü�ֵ�Բ���
    var productName = req.body.product_name
    var deviceName = shortid.generate()
    var secret = shortid.generate()
    var brokerUsername = `${productName}/${deviceName}`
    
    // ����Device��ʵ��������
    var device = new Device({
        product_name: productName,
        device_name: deviceName,
        secret: secret,
        broker_username: brokerUsername
    })

    device.save(function (err) {
        if (err) {
            res.status(500).send(err)
        } else {
            // res.send({ product_name: productName, device_name: deviceName, secret: secret })
            // ����json��ʽ�Ļظ������ݿ���д洢
            res.json({ product_name: productName, device_name: deviceName, secret: secret })
        }
    }) 
})

/* Server API�ӿڣ���ȡ�����豸��Ϣ */
router.get("/:productName/:deviceName", function (req, res) {
    var productName = req.params.productName
    var deviceName = req.params.deviceName
    Device.findOne({ "product_name": productName, "device_name": deviceName }, function (err, device) {
        if (err) {
            res.send(err)
        } else {
            if (device != null) {
                res.json(device.toJSONObject())
            } else {
                res.status(404).json({error:"Not Found"})
            }
        }
    })
})

/* ��ȡ�豸�б� */
router.get("/:productName", function (req, res) {
    var productName = req.params.productName
    Device.find({ "product_name": productName }, function (err, devices) {
        if (err) {
            res.send(err)
        } else {
            res.json(devices.map(function (device) {
                return device.toJSONObject()
            }))
        }
    })
})
// routesĿ¼�ڵ������ļ��������ٸô���
module.exports = router;