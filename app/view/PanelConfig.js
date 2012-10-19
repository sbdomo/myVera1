Ext.define('myvera.view.PanelConfig', {
	extend: 'Ext.form.Panel',
	xtype: 'PanelConfig',
	id:'PanelConfig',
	requires: ['Ext.field.Password','Ext.form.FieldSet', 'Ext.field.Toggle'],
	config: {
		items: [
			{
			xtype: 'fieldset',
			iconCls: 'home',
			items: [
				{
					xtype: 'textfield',
					name: 'username',
					autoCapitalize: false,
					placeHolder: 'Nom'
				},
				{
					xtype: 'passwordfield',
					name: 'password',
					placeHolder: 'Mot de passe'
				},
				{
					xtype: 'button',
					text: 'S\'identifier',
					name: 'logbt',
					ui: 'confirm'
				}
				]
			}
		]
	}
});