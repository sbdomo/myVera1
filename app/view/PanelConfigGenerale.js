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
				//id: 'ipvera',
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
		},
		{
			xtype: 'fieldset',
			title: 'Affichage',
			items: [
			{
				xtype: 'togglefield',
				name: 'isVueL',
				value: 1,
				label: 'Vues en mode paysage'//,
				//labelWidth: '40%'
			},
			{
				xtype: 'togglefield',
				name: 'isVueP',
				value: 0,
				label: 'Vues en mode portrait'//,
				//labelWidth: '40%'
			},
			{
				xtype: 'togglefield',
				name: 'isReveil',
				value: 1,
				label: 'Réveils'//,
				//labelWidth: '40%'
			}
			]
		}
		]
	}
});