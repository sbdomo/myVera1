Ext.define('myvera.view.PanelConfig', {
	extend: 'Ext.tab.Panel',
	xtype: 'PanelConfig',
	id:'PanelConfig',
		config: {
		ui: 'light',
		tabBar: {
			layout:{
				pack:'center'
			}
		},
		activeTab: 1,
		
		items: [
		{
			xtype:'PanelConfigGenerale',
			title: 'Config. générale'
		},
		{
			xtype: 'PanelConfigFloorsNavigation'
		},
		{
			xtype: 'PanelConfigNavigation'
			
		}
		]
	}
});