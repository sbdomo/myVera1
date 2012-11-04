Ext.define('myvera.view.PanelConfigItems', {
	extend: 'Ext.List',
	xtype: 'PanelConfigItems',
	id:'PanelConfigItems',
	//requires: ['myvera.store.ConfigDevicesStore'],
	config: {
		itemTpl: '<img src="resources/images/<tpl if="state==-4">vert<tpl else>rouge</tpl>.png"/><img src="resources/images/l<tpl if="icon!=null">{icon}'+
		'<tpl elseif="category==4&&subcategory==4">44'+
		'<tpl elseif="category==120&&subcategory==1">121<tpl elseif="category==120&&subcategory==2">122'+
		'<tpl else>{category}</tpl>_0.png" /> {name}',
		store: 'ConfigDevicesStore',
		grouped: true,
		onItemDisclosure: true
	}
});