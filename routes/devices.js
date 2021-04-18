/**
 * routes/devices.js
 * @brief 系统自动生成DeviceName和Secret
 */

const shortid = require('shortid')
const Device = require('../models/device')

const express = require('express')
const router = express.Router()

router.post('/', function (req, res) {
    // 从请求中获得键值对参数
    var productName = req.body.product_name
    var deviceName = shortid.generate()
    var secret = shortid.generate()
    var brokerUsername = `${productName}/${deviceName}`
    
    // 创建Device类实例化对象
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
            // 发送json格式的回复到数据库进行存储
            res.json({ product_name: productName, device_name: deviceName, secret: secret })
        }
    }) 
})

/* Server API接口，获取单个设备信息 */
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

/* 获取设备列表 */
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
// routes目录内的所有文件都不能少该代码
module.exports = router;