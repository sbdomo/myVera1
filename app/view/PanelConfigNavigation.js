Ext.define('myvera.view.PanelConfigNavigation', {
	extend: 'Ext.navigation.View',
	xtype: 'PanelConfigNavigation',
	id:'PanelConfigNavigation',
	requires: ['myvera.view.PanelConfigItemsMenu'],
	config: {
		iconCls : '',
		title : 'Modules' ,
		items: [
		{
			xtype: 'PanelConfigItemsMenu'
			
		}
		]
	}
});