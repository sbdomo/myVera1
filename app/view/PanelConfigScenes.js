Ext.define('myvera.view.PanelConfigScenes', {
	extend: 'Ext.List',
	xtype: 'PanelConfigScenes',
	id:'PanelConfigScenes',
	//requires: ['myvera.store.ConfigDevicesStore'],
	config: {
		itemTpl: '<img src="resources/images/<tpl if="state==-4">vert<tpl else>rouge</tpl>.png"/><img src="resources/images/l<tpl if="icon!=null">{icon}'+
		'<tpl else>1000</tpl>_0.png" /> {name}',
		store: 'ConfigScenesStore',
		grouped: true,
		onItemDisclosure: true
	}
});