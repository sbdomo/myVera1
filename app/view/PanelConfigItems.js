Ext.define('myvera.view.PanelConfigItems', {
	extend: 'Ext.List',
	xtype: 'PanelConfigItems',
	id:'PanelConfigItems',
	//requires: ['myvera.store.ConfigDevicesStore'],
	config: {
		itemTpl: '<img src="resources/images/<tpl if="state==-4">vert<tpl else>rouge</tpl>.png"/><img src="resources/images/l<tpl if="icon!=null">{icon}<tpl else>{category}</tpl>_0.png" /> {name}',
		store: 'ConfigDevicesStore',
		grouped: true,
		onItemDisclosure: true
	}
});