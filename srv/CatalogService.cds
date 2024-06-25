
using { anubhav.db.master, anubhav.db.transaction  } from '../db/datamodel';
//using { anubhav.cds.CDSViews } from '../db/CDSViews';

    

service CatalogService @(path:'CatalogService') {

entity EmployeeSet as projection on master.employees;
@Capabilities:{ Insertable,Updatable,Deletable:false}
entity BusinessPartnerSet as projection on master.businesspartner;
entity ProductSet as projection on master.product;
entity AddressSet as projection on master.address;
entity PurchaseOrderItemsSet as projection on transaction.poitems;
function setOrderStatus() returns POsSet;
entity POsSet @(
    odata.draft.enabled: true,
    Common.DefaultValuesFunction: 'setOrderStatus'
) as projection on transaction.purchaseorder {
    CASE OVERALL_STATUS
    WHEN 'A' THEN 'Approved'
    WHEN 'D' THEN 'Delivered'
    WHEN 'P' THEN 'Pending'
    WHEN 'X' THEN 'Rejected'
    WHEN 'N' THEN 'New' END AS overallStat: String(10) @(title: '{i18n>overallStat}'),
    CASE OVERALL_STATUS
    WHEN 'A' THEN 0
    WHEN 'D' THEN 1
    WHEN 'P' THEN 2
    WHEN 'X' THEN 2
    WHEN 'N' THEN 1 END AS colorCode: Integer,    
    *,
    Items
} actions {
    @cds.odata.bindingparameter.name: '_fk'
    @Common.SideEffects : { TargetProperties : [
        '_fk/GROSS_AMOUNT',
    ] }

    action boost();
    function largestOrder() returns array of POsSet;

};


//entity CProductValuesViewSet as projection on CDSViews.CProductValuesView;
}