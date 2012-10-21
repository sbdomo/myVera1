Ext.define('myvera.view.PanelConfig', {
	extend: 'Ext.tab.Panel',
	xtype: 'PanelConfig',
	id:'PanelConfig',
	requires: ['myvera.view.PanelConfigNavigation','myvera.view.PanelConfigFloorsNavigation','myvera.view.PanelConfigGenerale'],
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
				title: 'config generale'
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