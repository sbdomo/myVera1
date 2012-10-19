Ext.define('myvera.view.dataplan0', {
	extend: 'Ext.DataView',
	xtype: 'dataplan0',
	requires:['myvera.util.Templates'],
	stores: ['devicesStore'],
	config: {
		itemTpl: '<tpl if="etage==0">' + myvera.util.Templates.getTplplan() + '</tpl>',
		emptyText: 'Aucun module',
		style: 'background:url(./resources/images/plan0.jpg) no-repeat left top;',
		store: 'devicesStore',
		scrollable: false
	}
});