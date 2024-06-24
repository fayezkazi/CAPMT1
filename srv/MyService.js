const cds = require("@sap/cds");

const mysrvdemo = function (srv) {

    const { ReadEmployeeSrv } = this.entities;
    const { employees } = cds.entities("anubhav.db.master");

    srv.on('hello', (req,res) => {
        console.log("Service has been called");
        return "Service is called by: " + req.data.name ;
    });

    srv.on('READ', ReadEmployeeSrv, async (req,res) => {
        let whereCondition = req.data;
        if (whereCondition.hasOwnProperty("ID")) {
            results = await cds.tx(req).run(SELECT.from(employees).where(whereCondition));
        }else {
            results = await cds.tx(req).run(SELECT.from(employees).limit(5));
        }
        return results;
    });
};

module.exports = mysrvdemo;