Ext.define('myvera.model.CurrentUser', {
	extend: 'Ext.data.Model',
	config: {
		fields: [
			{name: 'id', type: 'int'},
			{name: 'connexion', type: 'int'},
			{name: 'ipvera', type: 'string'},
			{name: 'serial', type: 'string'},
			{name: 'name', type: 'string'},
			{name: 'pass', type: 'string'},
			{name: 'url', type: 'string'}
		],

		proxy: {
			type: 'localstorage',
			id: 'login-data'
		}
	}
});
