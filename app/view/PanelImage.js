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
			id:'image',
			//src: 'resources/images/plan0.jpg',
			width: 1024,
			height: 768,
			listeners:{
          tap:function(e,t){
          	Ext.getCmp('gauche').setValue(t.pageX);
          	Ext.getCmp('haut').setValue(t.pageY-87);
          	Ext.getCmp('PanelConfigNavigation').pop();
          }}
			}
		],
		listeners:{
          painted:function(e,d){
          	var record = Ext.getStore('FloorsStore').getAt(Ext.getStore('FloorsStore').findExact('floor_id', Ext.getCmp('etage').getValue()));
          	Ext.getCmp('image').setSrc(record.data.path);
          	Ext.getStore('FloorsStore').clearFilter();
          }}
		
	}
});