const express = require("express");
const router = express.Router();

const controller = require("../controllers/sysConf");

/* GET users listing. */
router.get("/", async (req, res, next) => {
    try {
        const conf = await controller.getSysConf();
    
        res.status(200).json(conf);
    } catch (e) {
        console.log(e);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { plantTypes } = req.body;
        
        const updated = await controller.updateSysConf({plantTypes});

        res.status(200).json({
            message: "success",
        });
    } catch (e) {
        console.log(e.message);
    }
});

module.exports = router;
