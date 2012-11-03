Ext.define('myvera.store.FloorsStore', {
    id:'FloorsStore',
    extend: 'Ext.data.Store',
    config: {
            model: 'myvera.model.Floors',
	    storeId: 'FloorsStore',
	    //setup the proxy for the store to use an ajax proxy and give it a url to load
	    //the local contacts.json file
	    proxy: {
		    type: 'ajax',
		    url: './resources/config/floors.json',
		
		    reader: {
			    type: 'json',
			    rootProperty: 'floors'
		    }
	    }
    }
}
);