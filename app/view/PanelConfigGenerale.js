Ext.define('myvera.view.PanelConfigGenerale', {
	extend: 'Ext.form.Panel',
	xtype: 'PanelConfigGenerale',
	id:'PanelConfigGenerale',
	requires: ['Ext.field.Hidden', 'Ext.field.Password', 'Ext.field.Toggle'],
	config: {
		items: [
		{
			xtype: 'fieldset',
			title: 'Connexion locale',
			//iconCls: 'home',
			//instructions: 'Connexion locale',
			items: [
			{
				xtype: 'hiddenfield',
				value:'0',
				name: 'connexion'
			},
			{
				xtype: 'textfield',
				name: 'login',
				autoCapitalize: false,
				placeHolder: 'Nom'
			},
			{
				xtype: 'passwordfield',
				name: 'pass',
				placeHolder: 'Mot de passe'
			},
			{
				xtype: 'textfield',
				label: 'IP de la Vera',
				id: 'ipvera',
				name: 'ipvera',
				placeHolder: 'Exemple: 192.168.0.1',
			},
			{
				xtype: 'button',
				text: 'S\'identifier',
				name: 'loginbutton',
				ui: 'confirm'
			}
			]
		}
		]
	}
});