Ext.define('myvera.view.PanelConfigNavigation', {
	extend: 'Ext.navigation.View',
	xtype: 'PanelConfigNavigation',
	id:'PanelConfigNavigation',
	requires: ['myvera.view.PanelConfigItems','myvera.view.PanelConfigItem'],
	config: {
			iconCls : '',
			title : 'Devices' ,
			items: [
          {
          	xtype: 'PanelConfigItems'
          	
          }
				],
			listeners:{
				activate:function(panel,item){
					var ConfigDevicesStore = Ext.getStore('ConfigDevicesStore');
					ConfigDevicesStore.getProxy().setExtraParam( 'connexion',  Ext.getCmp('selectconnexion').getValue());
					ConfigDevicesStore.getProxy().setExtraParam( 'user',  Ext.getCmp('login').getValue());
					ConfigDevicesStore.getProxy().setExtraParam( 'password',  Ext.getCmp('pass').getValue());
					ConfigDevicesStore.getProxy().setExtraParam( 'ipvera',  Ext.getCmp('ipvera').getValue());
					ConfigDevicesStore.getProxy().setExtraParam( 'serial',  Ext.getCmp('serial').getValue());
					ConfigDevicesStore.getProxy().setExtraParam( 'url',  Ext.getCmp('url').getValue());
					ConfigDevicesStore.load();
					Ext.getStore('FloorsStore').load();
					
				},
				pop:function(panel,item){
					var ConfigDevicesStore = Ext.getStore('ConfigDevicesStore');
					ConfigDevicesStore.getProxy().setExtraParam( 'connexion',  Ext.getCmp('selectconnexion').getValue());
					ConfigDevicesStore.getProxy().setExtraParam( 'user',  Ext.getCmp('login').getValue());
					ConfigDevicesStore.getProxy().setExtraParam( 'password',  Ext.getCmp('pass').getValue());
					ConfigDevicesStore.getProxy().setExtraParam( 'ipvera',  Ext.getCmp('ipvera').getValue());
					ConfigDevicesStore.getProxy().setExtraParam( 'serial',  Ext.getCmp('serial').getValue());
					ConfigDevicesStore.getProxy().setExtraParam( 'url',  Ext.getCmp('url').getValue());
					ConfigDevicesStore.load();
					Ext.getStore('FloorsStore').load();
					
				}
			}
			
		
	}
});