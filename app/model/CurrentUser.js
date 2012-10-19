Ext.define('myvera.model.CurrentUser', {
	extend: 'Ext.data.Model',
	config: {
		fields: [
			{name: 'id', type: 'int'},
			{name: 'name', type: 'string'},
			{name: 'pass', type: 'string'},
		],

		proxy: {
			type: 'localstorage',
			id: 'login-data'
		}
	}
});
