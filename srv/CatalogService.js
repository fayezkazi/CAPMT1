module.exports = cds.service.impl( async function () {
    //Get the Objects of the OData entity
    const { EmployeeSet, POsSet } = this.entities;
  
    this.before('CREATE', EmployeeSet, async (req,res) => {
        console.log("Validation before update" + JSON.stringify(req.data.ID));
        if (parseInt(req.data.salaryAmount) >= 1000000) {
            req.error(500,"Salary Amount can not more than 1 million");
        }

    });

    this.on('boost', async (req,res) => {
        try {
            const ID = req.params[0];
            console.log("PO ID from request is " + req.params[0].ID );

            const tx = cds.tx(req);
            await tx.update(POsSet).with({
                GROSS_AMOUNT: { '+=' : 2000 },
                NOTE: 'Boosted'
            }).where(ID);

        } catch (error) {
           return "Error " + error.toString(); 
        }
    });

    this.on('largestOrder', async (req,res) => {
        const ID = req.params[0];
        console.log("Largest Order finding process begins" );

        try {
            const tx = cds.tx(req);
            const reply = await tx.read(POsSet).orderBY({
                GROSS_AMOUNT: 'desc'
            }).limit(1);
            return reply;
        } catch (error) {
            return "Error " + error.toString(); 
        }
    })
});