Ext.define('myvera.view.dataplan', {
	extend: 'Ext.DataView',
	xtype: 'dataplan',
	requires:['myvera.util.Templates'],
	stores: ['devicesStore'],
	config: {
		emptyText: 'Aucun module',		
		store: 'devicesStore',
		scrollable: false,
		listeners:{
			//itemdoubletap: 'onDeviceTapHold'
			itemsingletap: function(view, index, target, record, event){
				console.log('tap');
				myvera.app.getController('myvera.controller.contdevices').onDeviceTap(view, index, target, record, event);
			}
		}
	}
});