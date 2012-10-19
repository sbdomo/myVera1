Ext.define('myvera.view.dataplan1', {
	extend: 'Ext.DataView',
	xtype: 'dataplan1',
	stores: ['devicesStore'],
	requires:['myvera.util.Templates'],
	config: {
		emptyText: 'Aucun module',
		itemTpl: '<tpl if="etage==1">' + myvera.util.Templates.getTplplan() + '</tpl>',
		style: 'background:url(./resources/images/plan1.jpg) no-repeat left top;',
		store: 'devicesStore',
		scrollable: false
	}
});