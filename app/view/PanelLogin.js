Ext.define('myvera.view.PanelLogin', {
	extend: 'Ext.form.Panel',
	xtype: 'PanelLogin',
	id:'PanelLogin',
	requires: ['Ext.field.Password','Ext.form.FieldSet'],
	config: {
		items: [
			{
			xtype: 'fieldset',
			//title: 'test',
			iconCls: 'home',
			//defaults: {
			//	labelWidth: '40%'
			//},
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