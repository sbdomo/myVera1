Ext.define('myvera.view.PanelConfigItem', {
	extend: 'Ext.form.Panel',
	xtype: 'PanelConfigItem',
	id:'PanelConfigItem',
	requires: [
        'Ext.field.Text',
        'Ext.field.Select'
	],
	config: {
		name:'PanelConfigItem',
		scrollable: 'vertical',
		//tpl: ['<img src="resources/images/l<tpl if="icon!=null">{icon}<tpl else>{category}</tpl>_0.png" /> ID:{id}<br/>Nom: {name}'],
		items: [
		{
			html:"",
			itemId: 'titlePanelConfigItem',
			tpl: [ '<img style="float: left;" height="40px" src="resources/images/l<tpl if="icon!=null">{icon}'+
			'<tpl elseif="category==4&&subcategory==4">44'+
			'<tpl elseif="category==120&&subcategory==1">121<tpl elseif="category==120&&subcategory==2">122'+
			'<tpl else>{category}</tpl>_0.png" /><p style="line-height: 30px">&nbsp;&nbsp;{name} - ID:{id}</p><p>&nbsp;</p>' ]
		},
		{
			xtype: 'selectfield',
			label: 'Catégorie',
			name: 'category',
			options: [
			{text: 'Unknown plugin', value:'0'},
			{text: 'Virtual ON/OFF Switches (plugin)',  value: '101'},
			{text: 'Variable Container (plugin)',  value: '102'},
			{text: 'Google Calendar Switch (plugin)',  value: '103'},
			{text: 'Virtual Clock',  value: '120'},
			{text: 'Interface',  value: '1'},
			{text: 'Dimmable light',  value: '2'},
			{text: 'Switch',  value: '3'},
			{text: 'Security Sensor',  value: '4'},
			{text: 'HVAC',  value: '5'},
			{text: 'Camera',  value: '6'},
			{text: 'Door Lock',  value: '7'},
			{text: 'Window Covering',  value: '8'},
			{text: 'Remote Control',  value: '9'},
			{text: 'IR Transmitter',  value: '10'},
			{text: 'Generic I/O',  value: '11'},
			{text: 'Generic Sensor',  value: '12'},
			{text: 'Serial Port',  value: '13'},
			{text: 'Scene Controller',  value: '14'},
			{text: 'A/V',  value: '15'},
			{text: 'Humidity Sensor',  value: '16'},
			{text: 'Temperature Sensor',  value: '17'},
			{text: 'Light Sensor',  value: '18'},
			{text: 'Zwave Int',  value: '19'},
			{text: 'Insteon Int',  value: '20'},
			{text: 'Power Meter',  value: '21'},
			{text: 'Alarm Panel',  value: '22'},
			{text: 'Alarm Partition',  value: '23'}
			],
			listeners: 
			{
				change:function(selectbox,value,oldvalue){
					var subcat = this.getParent().down('#subcategory');
					if(value=="120"){
						var options = [
						{text: 'Alarm Clock',  value: '0'},
						{text: 'Electrical timer',  value: '1'},
						{text: 'Timer',  value: '2'},
						];
						subcat.setOptions(options);
						subcat.show();
					} else {
						subcat.hide();
					}
				}
			}
		},
		{
			xtype: 'selectfield',
			label: 'Sub-catégorie',
			name: 'subcategory',
			itemId: 'subcategory'
		},
		{
			xtype: 'selectfield',
			label: 'Etage',
			name: 'etage',
			itemId: 'etage',
			store: 'FloorsStore',
   			displayField:'name',
   			valueField: 'id',
			listeners: 
			{
				change:function(selectbox,value,oldvalue){
					if(value=="-1"){
						this.getParent().down('#PlaceItem').hide();
						this.getParent().down('#LeftItem').hide();
						this.getParent().down('#TopItem').hide();
					} else {
 						this.getParent().down('#PlaceItem').show();
						this.getParent().down('#LeftItem').show();
						this.getParent().down('#TopItem').show();
					}
				}
			}
		},
		{
			xtype: 'textfield',
			label: 'Position gauche',
			itemId: 'LeftItem',
			name: 'left'
		},
		{
			xtype: 'textfield',
			label: 'Position haut',
			itemId: 'TopItem',
			name: 'top'
		},
		{
			xtype: 'button',
			margin: 15,
			align: 'center',
			itemId: 'PlaceItem',
			iconCls: 'locate',
			iconMask: true,
			text: 'Définir l\'emplacement',
			handler: function(){
				Ext.getCmp('main').getTabBar().hide();
				Ext.getCmp('PanelConfig').getTabBar().hide();
				Ext.getCmp('PanelConfigNavigation').getNavigationBar().setDocked('bottom');
				Ext.getCmp('PanelConfigNavigation').push({
					xtype: 'PanelImage',
					title: 'Positionner le module sur la vue',
					data: {id: this.getParent().down('#etage').getValue()}
				});
			}
		},
		{
			xtype: 'selectfield',
			label: 'Affichage dans "Allumés ?"',
			name: 'verif',
			options: [
			{text: 'si allumé et/ou déclenché',  value: 'yes'},
			{text: 'si éteint',  value: 'off'},
			{text: 'jamais', value: 'no'}
			]
		},
		{
			xtype: 'textfield',
			label: 'Num. icône (facultatif)',
			name: 'icon'
		},
		{
			xtype: 'textfield',
			label: 'Num. scène "on" (facultatif)',
			name: 'sceneon'
		},
		{
			xtype: 'textfield',
			label: 'Num. scène "off" (facultatif)',
			name: 'sceneoff'
		},
		{
			xtype: 'button',
			margin: 5,
			itemId: 'SaveItem',
			ui: 'confirm',
			text: 'Ajouter le module',
			iconCls: 'add',
			iconMask: true,
			handler: function(){
				var form = this.getParent();
				var formdata = form.getValues();
				var data = form.config.data;
				var devices = Ext.getStore('devicesStore');
				
				var listdevices = Ext.getStore('ConfigDevicesStore');
				var listdevice = listdevices.getById(data.id);
				
				if (form.config.data.state=="-4") {
					device = devices.getById(data.id);
					device.set("category", formdata.category);
					device.set("subcategory", formdata.subcategory);
					device.set("left", formdata.left);
					device.set("top", formdata.top);
					device.set("etage", formdata.etage);
					device.set("icon", formdata.icon);
					device.set("verif", formdata.verif);
					device.set("sceneon", formdata.sceneon);
					device.set("sceneoff", formdata.sceneoff);
					device.set("state", "-3");
				} else {
					devices.add({
					id: data.id,
					name: data.name,
					state: "-3",
					status: "0",
					tripped: "0",
					room: data.room,
					category: formdata.category,
					subcategory: formdata.subcategory,
					left: formdata.left,
					top: formdata.top,
					etage: formdata.etage,
					icon: formdata.icon,
					verif: formdata.verif,
					sceneon: formdata.sceneon,
					sceneoff: formdata.sceneoff
					});
					device = devices.getById(data.id);
					device.setDirty();
					listdevice.set("state", "-4");
				}
				listdevice.set("category", formdata.category);
				listdevice.set("subcategory", formdata.subcategory);
				listdevice.set("icon", formdata.icon);
				Ext.getCmp('PanelConfigNavigation').pop();
				myvera.app.getController('myvera.controller.contconfig').alertDirtydevices();
			}
		},
		{
			xtype: 'button',
			margin: 5,
			itemId: 'DeleteItem',
			iconCls: 'trash',
			iconMask: true,
			ui: 'decline',
			hidden: true,
			text: 'Enlever le module',
			
			handler: function(){
				var form = this.getParent();
				var devices = Ext.getStore('devicesStore');
				device = devices.getById(form.config.data.id);
				devices.remove(device);
				
				var listdevices = Ext.getStore('ConfigDevicesStore');
				var listdevice = listdevices.getById(form.config.data.id);
				var formdata = form.getValues();
				listdevice.set("category", formdata.category);
				listdevice.set("subcategory", formdata.subcategory);
				listdevice.set("left", formdata.left);
				listdevice.set("top", formdata.top);
				listdevice.set("etage", formdata.etage);
				listdevice.set("icon", formdata.icon);
				listdevice.set("verif", formdata.verif);
				listdevice.set("sceneon", formdata.sceneon);
				listdevice.set("sceneoff", formdata.sceneoff);
				listdevice.set("state", "0");
				Ext.getCmp('PanelConfigNavigation').pop();
				myvera.app.getController('myvera.controller.contconfig').alertDirtydevices();
			}
		}
		],
		listeners:{
		    updatedata:function(e,d){
			    var label = this.down('#titlePanelConfigItem');
			    var html = label.getTpl().apply(e.config.data);
			    label.setHtml(html);
			    if (e.config.data.state=="-4") {
				    this.down('#SaveItem').setText('Mettre à jour');
				    this.down('#SaveItem').setIconCls('refresh');
				    var devices = Ext.getStore('devicesStore');
				    device = devices.getById(e.config.data.id);
				    e.setValues(device.getData());
				    if(device.get('verif')==null) e.setValues({verif:"yes"});
				    //Problème dans le selectfield : si etage est un entier et pas un string ??
				    //Ce serait un bug (fix dans V. 2.02)
				    e.setValues({etage: "" + device.get("etage")});
				    //e.setValues({subcat: "" + device.get("subcategory")});
				    e.setValues({category: "" + device.get("category")});
				    e.setValues({subcategory: "" + device.get("subcategory")});
				    
				    if(device.get('etage')=="-1") {
					    this.down('#PlaceItem').hide();
					    this.down('#LeftItem').hide();
					    this.down('#TopItem').hide();
				    }
				    this.down('#DeleteItem').show();
			    } else {
				    if(e.config.data.etage==null) e.config.data.etage="-1";
				    if(e.config.data.etage=="-1") {
					    this.down('#PlaceItem').hide();
					    this.down('#LeftItem').hide();
					    this.down('#TopItem').hide();
				    }
				    if(e.config.data.verif==null) e.config.data.verif="yes";
				    //e.config.data.subcat=e.config.data.subcategory;
				    e.setValues(e.config.data);
				    //Bug avec entier ??
				    e.setValues({category: "" + e.config.data.category});
				    e.setValues({subcategory: "" + e.config.data.subcategory});
			    }
		    }
	}
	}
});