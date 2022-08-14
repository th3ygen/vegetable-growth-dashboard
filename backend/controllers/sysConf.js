const { SysConf } = require('../models/SysConf');

module.exports = {
    getSysConf: async () => {
        const sysConf = await SysConf.findOne();
        return sysConf;
    },
    updateSysConf: async (sysConf) => {
        const updatedSysConf = await SysConf.findOneAndUpdate({}, sysConf, { new: true });
        return updatedSysConf;
    }
};
