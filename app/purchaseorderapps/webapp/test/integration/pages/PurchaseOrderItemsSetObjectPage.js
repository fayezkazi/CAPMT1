sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'fk.po.purchaseorderapps',
            componentId: 'PurchaseOrderItemsSetObjectPage',
            contextPath: '/POsSet/Items'
        },
        CustomPageDefinitions
    );
});