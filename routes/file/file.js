var express = require('express');
// const multer = require("multer");
const router = express.Router();
const fs = require('fs');

router.post('', function (req, res){
    const { imageBase64 } = req.body

    const d = new Date()
    const random = Math.floor(Math.random() * 1000)

    const filePath = `image/${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}-${d.getMinutes()}-${d.getSeconds()} random${random}.png`

    const imageBuffer = Buffer.from(imageBase64, 'base64');

    // Write buffer to a file
    fs.writeFile(filePath, imageBuffer, function(err) {
        if (err) {
            console.log(err)
            res.status(400).send(
                JSON.stringify({message: err.toString(), filePath: ""})
            )
        }else{
            res.status(200).send(
                JSON.stringify({message: "success", filePath: filePath})
            )
        }
    });
})

module.exports = router;