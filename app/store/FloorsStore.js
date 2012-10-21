Ext.define('myvera.store.FloorsStore', {
	id:'FloorsStore',
    extend: 'Ext.data.Store',
    config: {
            model: 'myvera.model.Floors',
	    //give the store some fields
            //fields: ['name', 'id'],

            //filter the data using the name field
	    	    
	    storeId: 'FloorsStore',
	    sorters: [
//	    {
//		    property : 'etage',
//		    direction: 'ASC'
//	    },
	    {
		    property : 'room',
		    direction: 'ASC'
	    },
	    {
		    property : 'name',
		    direction: 'ASC'
	    }
	    ],

	    //setup the proxy for the store to use an ajax proxy and give it a url to load
	    //the local contacts.json file
	    proxy: {
		    type: 'ajax',
		    url: './remote/index.php/Floor/JsonGetFloors/',
		
		    reader: {
			    type: 'json',
			    rootProperty: 'floors'
		    }
	    }
    }
}
);