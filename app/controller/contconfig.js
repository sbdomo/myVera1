Ext.define('myvera.controller.contconfig', {
	extend : 'Ext.app.Controller',
	config: {
		//stores: ['ConfigDevicesStore', 'devicesStore'],
		views: ['PanelConfigNavigation', 'PanelConfigItemsMenu', 'PanelConfigItems', 'PanelConfigItem', 'PanelImage', 'carouselitemmove', 'datamove', 'PanelConfigFloorsNavigation', 'PanelConfigFloors', 'PanelConfigFloor'],
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
			
			'#RefreshRoomsButton': {
				tap: 'onRefreshRooms'
			}
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
		//Ext.Msg.alert('Message', "non implémenté");
		var FloorsStore = Ext.getStore('FloorsStore');
		if(FloorsStore.getCount()>1) {
		//Chercher pourquoi il faut faire load, j'ai une erreur si je ne le fait pas...
		FloorsStore.load(function(floors) {
			var items = [];
			Ext.each(floors, function(floor) {
				if(floor.data.id!=-1) {
					items.push({
						xtype: 'datamove',
						style: 'background:url(./resources/config/img/'+floor.data.path+') no-repeat left top;',
						itemTpl: '<tpl if="etage=='+floor.data.id+'">' + myvera.util.Templates.getTplplan() + '</tpl>'
					});
				}
			});
			Ext.getCmp('carouselitemmove').setItems(items);
			Ext.getCmp('carouselitemmove').setActiveItem(0);
			
		});
		
		Ext.getCmp('main').getTabBar().hide();
		Ext.getCmp('PanelConfig').getTabBar().hide();
		Ext.getCmp('PanelConfigNavigation').getNavigationBar().setDocked('bottom');
		this.getConfigDevices().push({
				xtype: 'carouselitemmove',
				title: 'Faire glisser les modules'
		});
		} else {
			Ext.Msg.alert('Il n\'y a pas de vue.');
		}
	},
	
	onListItemsSave: function() {
		
		Ext.Viewport.setMasked({
                     xtype: 'loadmask',
                     message: 'Sauvegarde....'
		 });
		
		var contdevices = this.getApplication().getController('contdevices');
		var devicesStore = Ext.getStore('devicesStore')
		var syncheader = "";
		syncheader={'Authorization': 'Basic ' + contdevices.loggedUserId};
		Ext.getStore('devicesStore').getProxy().setHeaders(syncheader);
		
		//Remplacement par Ext.Ajax.request car il manque un callback...
		//Ext.getStore('devicesStore').sync();
		var allDataStore = [];
		devicesStore.each(function(record){
			allDataStore.push(record.getData());
		});
				
		Ext.Ajax.request({
			url: './protect/savedevices.php',
			headers: syncheader,
			method: 'POST',
			jsonData: {
				devices: allDataStore
			},
			success: function(result){
				if (result.responseText=="true") {
					Ext.Viewport.setMasked(false);
				} else {
					Ext.Viewport.setMasked(false);
					Ext.Msg.alert('Erreur lors de la sauvegarde.');
				}
			},
			failure: function(result) {
				Ext.Viewport.setMasked(false);
				Ext.Msg.alert('Erreur lors de la sauvegarde.');
			}
		});
		
		contdevices.devicesync(0,0, true);
		//Ext.Msg.alert('Message', "Sauvegarde lancée.");
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
		Ext.Viewport.setMasked({
                     xtype: 'loadmask',
                     message: 'Sauvegarde....'
		 });
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
					Ext.Viewport.setMasked(false);
					if (response.success=="true") {
						// process server response here
						contdevices.pushplans();
						Ext.getCmp('PanelConfigFloorsNavigation').pop();
						Ext.Msg.alert('Message', 'Etage ' + response.result + ' mis à jour');
					} else {
						Ext.Msg.alert('Erreur lors de la mise à jour');
					}
				} else {
					Ext.Msg.alert('Erreur lors de la mise à jour');
				}
			},
			failure: function(response) {
				Ext.Viewport.setMasked(false);
				Ext.Msg.alert('Erreur lors de la mise à jour');
			}
		});
	},
       
	ondeletefloor: function() {
	  Ext.Msg.confirm('Supression', 'Voulez-vous effacer cette vue?', function(confirmed) {
	  if (confirmed == 'yes') {
		Ext.Viewport.setMasked({
                     xtype: 'loadmask',
                     message: 'Suppression....'
		 })
		
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
						
						Ext.Viewport.setMasked(false);
						
						Ext.getCmp('PanelConfigFloorsNavigation').pop();
						if(movemodule==false) {
							Ext.Msg.alert('Message', 'Etage ' + response.result + ' supprimé.');
						} else {
							Ext.Msg.alert('Message', 'Modules déplacés dans "Aucun étage". Sauvez la liste des modules !');
						}
					} else {
						Ext.Viewport.setMasked(false);
						Ext.Msg.alert('Erreur lors de la supression de la vue');
					}
				} else {
					Ext.Viewport.setMasked(false);
					Ext.Msg.alert('Erreur lors de la supression de la vue');
				}
			},
			failure: function(result) {
				Ext.Viewport.setMasked(false);
				Ext.Msg.alert('Erreur lors de la supression de la vue');
			}
		});
			
			
	  }
	  }, this);
	},
	
	onRefreshRooms: function() {
		
		Ext.Viewport.setMasked({
                     xtype: 'loadmask',
                     message: 'Mise à jour....'
		});
		
		var contdevices = this.getApplication().getController('contdevices');
		var syncheader = "";
		syncheader={'Authorization': 'Basic ' + contdevices.loggedUserId};
		ipvera = contdevices.ipvera;
		Ext.Ajax.request({
			scope: this,
			url: './protect/readrooms.php',
			headers: syncheader,
			method: 'GET',
			params: {
				ipvera: ipvera
			},
			success: function(result){
				
				var response = Ext.decode(result.responseText, true);
				if (response) {
					if (response.success=="true") {
						var RoomsStore = Ext.getStore('Rooms');
						var listId = new Array();
						for (idrecord in response.rooms) {
							var result_room = response.rooms[idrecord];
							var resultId=result_room.id;
							room = RoomsStore.getById(resultId);
							if (room) {
								room.set('name', result_room.name);
							} else {
								RoomsStore.add({
									id: resultId,
									name: result_room.name,
									section: result_room.section
								});
								room = RoomsStore.getById(resultId);
								room.setDirty();
							}
							listId.push(resultId);
						}
						RoomsStore.data.each(function(testroom) {
							var id=testroom.get('id');
							if(!Ext.Array.contains(listId, id)) {
								//alert(testroom.get('name'));
								RoomsStore.remove(testroom);
							}
						});
						Ext.Viewport.setMasked(false);
						Ext.Msg.confirm('Mise à jour', 'Enregister la liste des pièces?', function(confirmed) {
							if (confirmed == 'yes') {
								this.saveRooms();
							}
						}, this);
				
					} else {
						Ext.Viewport.setMasked(false);
						Ext.Msg.alert('Erreur lors de la lecture des pièces');
					}				
				} else {
					Ext.Viewport.setMasked(false);
					Ext.Msg.alert('Erreur lors de la lecture des pièces');
				}
				

			},
			failure: function(response) {
				Ext.Viewport.setMasked(false);
				Ext.Msg.alert('Erreur lors de la lecture des pièces');
			}
		});
	
	
	},
	
	saveRooms: function() {
		 Ext.Viewport.setMasked({
                     xtype: 'loadmask',
                     message: 'Sauvegarde....'
		 });
		
		var RoomsStore = Ext.getStore('Rooms');
		var contdevices = this.getApplication().getController('contdevices');
		var syncheader = "";
		syncheader={'Authorization': 'Basic ' + contdevices.loggedUserId};
		
		var allDataStore = [];
		RoomsStore.each(function(record){
			allDataStore.push(record.getData());
		});
		
		Ext.Ajax.request({
			url: './protect/saverooms.php',
			headers: syncheader,
			method: 'POST',
			jsonData: {
				rooms: allDataStore
			},
			success: function(result){
				//Le texte de  Ext.Msg.alert n'est pas correct si on l'ouvre après confirmation
				//de Ext.Msg.confirm de "onRefreshRooms"
				if (result.responseText=="true") {
					Ext.Viewport.setMasked(false);
					//new Ext.MessageBox().show({
					//		title: 'Pièces',
					//		message: 'Liste sauvegardée.'
					//});
				} else {
					Ext.Viewport.setMasked(false);
					new Ext.MessageBox().show({
							title: 'Pièces',
							message: 'Erreur lors de la sauvegarde.'
					});
				}
			},
			failure: function(result) {
				Ext.Viewport.setMasked(false);
				new Ext.MessageBox().show({
					title: 'Pièces',
					message: 'Erreur lors de la sauvegarde.'
				});
			}
		});
	}
	
});