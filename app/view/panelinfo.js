Ext.define('myvera.view.panelinfo', {
	extend: 'Ext.Container',
	id:'panelinfo',
	xtype: 'panelinfo',
	config: {
		layout: 'vbox',
		items: [
		{
			html: 'Modules allumés',
			height: 22,
			style: "background-color:#d9ffa0; margin-left:3px;"
		},
		{
			xtype: 'dataliston',
			flex: 2
		},
		{
			html: 'Modules éteints à surveiller',
			height: 22,
			style: "background-color:#d9ffa0; margin-left:3px;"
		},
		{
			xtype: 'datalistoff',
			flex: 1
		}
		]
	}
});