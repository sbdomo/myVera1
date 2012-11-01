Ext.define('myvera.view.PanelImage', {
	extend: 'Ext.Panel',
	xtype: 'PanelImage',
	id:'PanelImage',
	requires: ['Ext.Img'],
	config: {
		fullscreen: true,
		items: [
			{
			xtype: 'image',
			itemId:'image',
			width: 1024,
			height: 768,
			listeners:{
				tap:function(e,t){
					var itempanel = Ext.getCmp('PanelConfigItem');
					Ext.getCmp('PanelConfigItem').down('#LeftItem').setValue(t.pageX);
					Ext.getCmp('PanelConfigItem').down('#TopItem').setValue(t.pageY);
					Ext.getCmp('PanelConfigNavigation').pop();
				}
			}
			}
		],
		listeners:{
			painted:function(e,d){
				var floors = Ext.getStore('FloorsStore');
				var floor = floors.getById(this.config.data.id);
				var path = floor.get('path');
				this.getParent().down('image').setSrc('./resources/config/img/' + path);
			}
		}
	}
});