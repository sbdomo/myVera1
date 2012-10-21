Ext.define('myvera.view.PanelConfigItems', {
	extend: 'Ext.List',
	xtype: 'PanelConfigItems',
	id:'PanelConfigItems',
	requires: ['myvera.store.ConfigDevicesStore'],
	config: {
		itemTpl: '<img src="resources/images/active{active}.png"><img src="resources/images/{iconURL}"> {name}',
        store: 'ConfigDevicesStore',
        onItemDisclosure: true
    }
});