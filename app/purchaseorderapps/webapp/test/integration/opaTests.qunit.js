sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'fk/po/purchaseorderapps/test/integration/FirstJourney',
		'fk/po/purchaseorderapps/test/integration/pages/POsSetList',
		'fk/po/purchaseorderapps/test/integration/pages/POsSetObjectPage',
		'fk/po/purchaseorderapps/test/integration/pages/PurchaseOrderItemsSetObjectPage'
    ],
    function(JourneyRunner, opaJourney, POsSetList, POsSetObjectPage, PurchaseOrderItemsSetObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('fk/po/purchaseorderapps') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePOsSetList: POsSetList,
					onThePOsSetObjectPage: POsSetObjectPage,
					onThePurchaseOrderItemsSetObjectPage: PurchaseOrderItemsSetObjectPage
                }
            },
            opaJourney.run
        );
    }
);