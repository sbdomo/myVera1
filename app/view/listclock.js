Ext.define('myvera.view.listclock', {
	extend: 'Ext.DataView',
	id:'listclock',
	xtype: 'listclock',
	stores: ['devicesStore'],
	requires:['myvera.util.Templates'],
	config: {
		styleHtmlContent:true,
		itemCls:'deviceview',
		disableSelection: true,
		itemTpl:  '<tpl if="category==120"><div class="devicecadre">'+
		 myvera.util.Templates.getTpllist() +
	        '</div></tpl>',
		emptyText: 'Aucun réveil',
		store: 'devicesStore'
	}
});