const { SysConf } = require('../models/SysConf');

module.exports = {
    getSysConf: async () => {
        const sysConf = await SysConf.findOne();
        return sysConf;
    },
    updateSysConf: async (sysConf) => {
        let updatedSysConf = await SysConf.findOneAndUpdate({}, sysConf, { new: true });

        if (!updatedSysConf) {
            updatedSysConf = await SysConf.create(sysConf);
        }

        return updatedSysConf;
    }
};
