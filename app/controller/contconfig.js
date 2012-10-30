Ext.define('myvera.controller.contconfig', {
	extend : 'Ext.app.Controller',
	config: {
		//stores: ['ConfigDevicesStore', 'devicesStore'],
		views: ['PanelConfigNavigation', 'PanelConfigItemsMenu', 'PanelConfigItems', 'PanelConfigItem', 'PanelConfigFloorsNavigation', 'PanelConfigFloors', 'PanelConfigFloor'],
		refs: {
			configDevices: 'PanelConfigNavigation',
			panelConfigItemsOpen: 'PanelConfigItemsMenu [name=openPanelConfigItems]',
			panelItemsMoveOpen: 'PanelConfigItemsMenu [name=openPanelMove]',
			listItemsSave: 'PanelConfigItemsMenu [name=sauver]',
			
			configFloors: 'PanelConfigFloorsNavigation',
			panelConfigFloor: 'PanelConfigFloor',
			savefloor: 'PanelConfigFloor [name=savefloor]',
			deletefloor: 'PanelConfigFloor [name=deletefloor]'
		},
		control: {
			configDevices: {
				activate: 'onActivatePanelItems'
			},
			
			panelConfigItemsOpen: {
				tap: 'onPanelConfigItemsOpen'
			},
			
			panelItemsMoveOpen: {
				tap: 'onPanelItemsMoveOpen'
			},
			
			listItemsSave: {
				tap: 'onListItemsSave'
			},
			
			'PanelConfigItems': {
				disclose: 'showDetailItem'
			},
			'PanelConfigFloors': {
				disclose: 'showDetailFloor'
			},
			
			
			savefloor: {
				tap: 'onsavefloor'
			},
			
			deletefloor: {
				tap: 'ondeletefloor'
			},
		}
	},
	
	onActivatePanelItems: function(panel,item) {
		var ConfigDevicesStore = Ext.getStore('ConfigDevicesStore');
		var contdevices = this.getApplication().getController('contdevices');
		
		if (ConfigDevicesStore.getCount() <= 0) {
			ConfigDevicesStore.on({
					load: 'onLoadConfigDevicesStore',
					scope: this
			});
			console.log("Load Vera Modules");
			ConfigDevicesStore.getProxy().setExtraParam( 'ipvera',  contdevices.getIpveraCt().getValue());
			ConfigDevicesStore.getProxy().setExtraParam( 'id',  'sdata');
			var syncheader = "";
			syncheader = {'Authorization': 'Basic ' + contdevices.loggedUserId};
			ConfigDevicesStore.getProxy().setHeaders(syncheader);
			ConfigDevicesStore.load();
		}

	},
	
	onLoadConfigDevicesStore: function() {
		var ConfigDevicesStore = Ext.getStore('ConfigDevicesStore');
		console.log('Store:' + ConfigDevicesStore.getCount());
		if (ConfigDevicesStore.getCount()>0) {
			var devices = Ext.getStore('devicesStore');
			if (devices.getCount()>0) {
				var count = 0;
				var letexte = "";
				devices.data.each(function(device) {
					var id = device.get('id');
					configdevice = ConfigDevicesStore.getById(id);
					if (configdevice) {
						configdevice.set('state', '-4');
						configdevice.set('category', device.get('category'));
						var icon_num = device.get('icon');
						if (icon_num != null) {
							configdevice.set('icon', icon_num);
						}
						
						var name = configdevice.get('name');
						if (device.get('name') != name) {
							device.set('name', name);
							device.set('state', "-3");
							letexte+=" " + name + " renommé.";
							count++;
						}
						var room = configdevice.get('room');
						if (device.get('room') != room) {
							device.set('room', room);
							device.set('state', "-3");
							letexte+=" " + name + " dans pièce n°" + room;
							count++;
						}
						if(count > 0) {
							Ext.Msg.alert('Message', letexte + ' Sauver la liste des modules');
						}
						
					} else {
						//console.info('error finding ' + device.get('name'));
						Ext.Msg.alert('Message', device.get('name') + ' non trouvé. Il faudrait le supprimer.');
						ConfigDevicesStore.add({
								id: device.get('id'),
								name: device.get('name'),
								state: "-4",
								room: device.get('room'),
								category: device.get('category'),
								subcategory: device.get('subcategory'),
								icon: device.get('icon')
						});
					}
				});
			}
		}
	},
	
	onPanelConfigItemsOpen: function() {
		this.getConfigDevices().push({
				xtype: 'PanelConfigItems',
				title: 'Liste des modules'
		});
       },
	onPanelItemsMoveOpen: function() {
		Ext.Msg.alert('Message', "non implémenté");
	},
	
	onListItemsSave: function() {
		var syncheader = "";
		var contdevices = this.getApplication().getController('contdevices');
		syncheader={'Authorization': 'Basic ' + contdevices.loggedUserId};
		Ext.getStore('devicesStore').getProxy().setHeaders(syncheader);
		Ext.getStore('devicesStore').sync(
			//ne marche pas...
			//{
			//	success: function(ed) {
			//		Ext.Msg.alert('Message', "Liste savegardée.");
			//	}
			//}
			);
		contdevices.devicesync(0,0, true);
		Ext.Msg.alert('Message', "Sauvegarde lancée.");
	},
	
	showDetailItem: function(list, record) {
		console.info('Record ' + record.get('name'));
		this.getConfigDevices().push({
				xtype: 'PanelConfigItem',
				title: 'Détail du module',
				data: record.getData()
		});
       },
       
	showDetailFloor: function(list, record) {
		console.info('Record ' + record.get('name'));
		if( record.get('id') != -1 ) {
			this.getConfigFloors().push({
					xtype: 'PanelConfigFloor',
					title: 'Détail de la vue',
					layout: 'vbox',
					data: record.getData()
			});
		} else {
			Ext.Msg.alert('Message', "Ne peut-être éditée. (Vue par défaut)");
		}
	},
	      
	onsavefloor: function() {
		var form = this.getPanelConfigFloor();
		var formdata = form.getValues();
		var contdevices = this.getApplication().getController('contdevices');
		var syncheader = "";
		syncheader={'Authorization': 'Basic ' + contdevices.loggedUserId};
		var idfloor = "";
		if(form.config.data){
			idfloor = form.config.data.id;
		}
		var floor= {id: idfloor, name: formdata.name, path: formdata.path, linkimage: formdata.linkimage };
		Ext.Ajax.request({
			url: './protect/savefloors.php',
			headers: syncheader,
			method: 'POST',
			jsonData: {
				floor: floor
			},
			success: function(result){
				var response = Ext.decode(result.responseText, true);
				if (response) {
					if (response.success=="true") {
						// process server response here
						contdevices.pushplans();
						Ext.getCmp('PanelConfigFloorsNavigation').pop();
						Ext.Msg.alert('Message', 'Etage ' + response.result + ' mis à jour');
					} else {
						alert('Erreur lors de la mise à jour');
					}
				} else {
					alert('Erreur lors de la mise à jour');
				}
			},
			failure: function(response) {
				alert('Erreur lors de la mise à jour');
			}
		});
		//Ext.Msg.alert('Message', "Edition - non implémenté");
	},
       
	ondeletefloor: function() {
	  Ext.Msg.confirm('Supression', 'Voulez-vous effacer cette vue?', function(confirmed) {
	  if (confirmed == 'yes') {
			
			
		var form = this.getPanelConfigFloor();
		var formdata = form.getValues();
		var contdevices = this.getApplication().getController('contdevices');
		var syncheader = "";
		syncheader={'Authorization': 'Basic ' + contdevices.loggedUserId};
		var idfloor = form.config.data.id;
		
		Ext.Ajax.request({
			url: './protect/deletefloor.php',
			headers: syncheader,
			method: 'GET',
			params: {
				id: idfloor
			},
			success: function(result){
				var response = Ext.decode(result.responseText, true);
				if (response) {
					if (response.success=="true") {
						
						// réallocation des modules de la vue
						movemodule=false;
						var ConfigDevicesStore = Ext.getStore('ConfigDevicesStore');
						var devices = Ext.getStore('devicesStore');
						if (devices.getCount()>0) {
							devices.data.each(function(device) {
								if ( device.get('etage') == idfloor) {
									device.set('etage', '-1');
									device.set('state', '-3');
									var id = device.get('id');
									var configdevice = ConfigDevicesStore.getById(id);
									if (configdevice) {
										configdevice.set('etage', '-1');
									}
									movemodule=true;
								}
							});
						}
						
						contdevices.pushplans();
						Ext.getCmp('PanelConfigFloorsNavigation').pop();
						if(movemodule==false) {
							Ext.Msg.alert('Message', 'Etage ' + response.result + ' supprimé.');
						} else {
							Ext.Msg.alert('Message', 'Modules déplacés dans "Aucun étage". Sauvez la liste des modules !');
						}
					} else {
						alert('Erreur lors de la supression de la vue');
					}
				} else {
					alert('Erreur lors de la supression de la vue');
				}
			},
			failure: function(response) {
				alert('Erreur lors de la supression de la vue');
			}
		});
			
			
	  }
	  }, this);
	}
	
});