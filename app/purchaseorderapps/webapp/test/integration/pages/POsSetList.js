sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'fk.po.purchaseorderapps',
            componentId: 'POsSetList',
            contextPath: '/POsSet'
        },
        CustomPageDefinitions
    );
});