Ext.define('myvera.view.PanelConfigFloors', {
	extend: 'Ext.List',
	xtype: 'PanelConfigFloors',
	id:'PanelConfigFloors',
	requires: ['myvera.store.FloorsStore'],
	config: {
		itemTpl: ' {name}',
        store: 'FloorsStore',
        onItemDisclosure: true
    }
});