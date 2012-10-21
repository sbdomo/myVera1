Ext.define('myvera.view.PanelConfigGenerale', {
	extend: 'Ext.form.Panel',
	xtype: 'PanelConfigGenerale',
	requires: [
        'Ext.field.Text',
        'Ext.field.Select',
        'Ext.field.Toggle'
    ],
	config: {
		scrollable: 'vertical',
        
        items: [        
   		{
   			xtype: 'selectfield',
   			name: 'selectconnexion',
   			id: 'selectconnexion',
   			label: 'Connexion',
   			options: [
                        {text: '',  value: ''},
                        {text: 'Locale',  value: '0'},
                        {text: 'A distance', value: '1'}
                    ],
            listeners: 
{
    change:function(selectbox,value,oldvalue){
    	if(value==0){
    		Ext.getCmp('ipvera').show();
    		Ext.getCmp('login').hide();
    		Ext.getCmp('pass').hide();
    	}else if(value==1){
    		Ext.getCmp('ipvera').hide();
    		Ext.getCmp('login').show();
    		Ext.getCmp('pass').show();
    	}else{
    		Ext.getCmp('ipvera').hide();
    		Ext.getCmp('login').hide();
    		Ext.getCmp('pass').hide();
    	}
    }
    }
   		},
   		{
        	xtype: 'textfield',
        	label: 'IP de la Vera',
        	id: 'ipvera',
        	name: 'ipvera',
        	hidden:true
        },
   		{
        	xtype: 'textfield',
        	label: 'Serial de la Vera',
        	id: 'serial',
        	name: 'serial',
        	hidden:true
        },
        {
        	xtype: 'textfield',
        	label: 'URL Mios',
        	id: 'url',
        	name: 'url',
        	hidden:true
        },
        {
        	xtype: 'textfield',
        	label: 'Login',
        	id: 'login',
        	name: 'login',
        	hidden:true
        },
        {
			xtype: 'passwordfield',
			label: 'password',
			id:'pass',
			name: 'pass',
			hidden:true
		},
        {
        	xtype: 'button',
        	name: 'loginbutton',
        	text: 'S\'identifier',
        	ui: 'confirm'
        }
        ]
    }
});