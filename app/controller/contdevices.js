Ext.define('myvera.controller.contdevices', {
	extend : 'Ext.app.Controller',
	config: {
		stores: ['ConfigDevicesStore', 'devicesStore', 'storeRooms'],
		views: ['dataplan0', 'dataplan1', 'datalist', 'listclock', 'PanelConfigNavigation', 'PanelConfigItemsMenu', 'PanelConfigItems', 'PanelConfigItem'],
		//profile: Ext.os.deviceType.toLowerCase(),
		
		loggedUserId: null,
		logged: null,
		refs: {
			plan0: 'dataplan0',
			plan1: 'dataplan1',
			liste1: 'datalist',
			listeon: 'dataliston',
			listeoff: 'datalistoff',
			listclock: 'listclock',
			
			usernameCt: 'PanelConfigGenerale [name=login]',
			passwordCt: 'PanelConfigGenerale [name=pass]',
			connexionCt: 'PanelConfigGenerale [name=connexion]',
			ipveraCt: 'PanelConfigGenerale [name=ipvera]',
			panelConfig: 'PanelConfigGenerale',
			loginBt: 'PanelConfigGenerale [name=loginbutton]',
			
			clockfieldsetCt: 'paneloverlay [name=fieldset1]',
			clockdeiveidCt: 'paneloverlay [name=deviceid]',
			clockheuredebCt: 'paneloverlay [name=heuredeb]',
			clockheurefinCt: 'paneloverlay [name=heurefin]',
			clockmessageCt: 'paneloverlay [name=message]',
			clocksaveclockBt: 'paneloverlay [name=saveclock]',
			
			configDevices: 'PanelConfigNavigation',
			panelConfigItemsOpen: 'PanelConfigItemsMenu [name=openPanelConfigItems]',
			panelItemsMoveOpen: 'PanelConfigItemsMenu [name=openPanelMove]',
			listItemsSave: 'PanelConfigItemsMenu [name=sauver]'
		},
		control: {
			plan0: {
				//activate: 'onActivate',
				itemtap: 'onDeviceTap'
			},
			plan1: {
				itemtap: 'onDeviceTap'
			},
			liste1: {
				itemtap: 'onDeviceTap'
			},
			listeon: {
				itemtap: 'onDeviceTap'
			},
			listeoff: {
				itemtap: 'onDeviceTap'
			},
			listclock: {
				itemtap: 'onDeviceTap'
			},
			
			loginBt: {
				tap: 'onLoginTap'
			},
			
			clocksaveclockBt: {
				tap: 'onClockSaveTap'
			},
			
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
				disclose: 'showDetail'
			},
		}
	},

	launch: function() {
		Ext.ModelMgr.getModel('myvera.model.CurrentUser').load(1, {
			scope: this,
			success: function(cachedLoggedInUser) {
				delete cachedLoggedInUser.phantom;
				this.getUsernameCt().setValue(cachedLoggedInUser.get('name'));
				this.getPasswordCt().setValue(cachedLoggedInUser.get('pass'));
				this.getConnexionCt().setValue(cachedLoggedInUser.get('connexion'));
				this.getIpveraCt().setValue(cachedLoggedInUser.get('ipvera'));
				this.loggedUserId = this.base64_encode(cachedLoggedInUser.get('name') + ":" + cachedLoggedInUser.get('pass'));
				console.info('Auto-Login succeeded.');
				Ext.getCmp('main').getTabBar().items.items[2].show();
				Ext.getCmp('main').getTabBar().items.items[1].show();
				Ext.getCmp('main').getTabBar().items.items[0].show();
				this.LogIn();
				//this.startstore();
			},
			failure : function() {
				console.warn('Auto-Login failed (user was not logged in).');
				Ext.getCmp('main').setActiveItem(Ext.getCmp('PanelConfig'));
				Ext.Msg.alert('Erreur','Vous devez vous identifier !');
			}
		});
	},

	startstore: function() {
		//var storeRooms = Ext.getStore('Rooms');
		var DevicesStore = Ext.getStore('devicesStore');
		DevicesStore.on({
			load: 'onDevicesStoreLoad',
			scope: this
		});
		Ext.getStore('devicesStore').getProxy().setExtraParam( 'ipvera',  this.getIpveraCt().getValue());
		//storeRooms.load();
		DevicesStore.load();
	},
	
	onDevicesStoreLoad: function() {
		this.logged = true;
		this.devicesync(0,0);
	},
	
	devicesync: function(newloadtime, newdataversion, nonewsync) {
		console.log("New Vera Sync");
		if (nonewsync != true) nonewsync=false;
		var vera_url = './protect/syncvera.php';
		var syncheader = "";
		syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
		var ipvera = this.getIpveraCt().getValue();
		Ext.Ajax.request({
			url: vera_url,
			headers: syncheader,
			method: 'GET',
			timeout: 90000,
			scope: this,
			//withCredentials: true,
			//useDefaultXhrHeader: false,
			params: {
				id: 'sdata',
				loadtime: newloadtime,
				dataversion: newdataversion,
				ipvera: ipvera,
				timeout: '60',
				minimumdelay: '1000'
			},
			success: function(result) {
				var date = new Date();
				console.log("Vera Sync : OK " + Ext.Date.format(date, 'h:i:s'));
				var response = Ext.decode(result.responseText, true);
				if (response) {
					var devices = Ext.getStore('devicesStore');
					var device = "";
					if (devices) {
						for (idrecord in response.devices) {
							device = devices.getById(response.devices[idrecord].id);
							if (device) {
								device.set('status', response.devices[idrecord].status);
								device.set('level', response.devices[idrecord].level);
								device.set('comment', response.devices[idrecord].comment);
								if (response.devices[idrecord].state == null) {
									device.set('state', 0);
								} else {
									device.set('state', response.devices[idrecord].state);
								}
								device.set('tripped', response.devices[idrecord].tripped);
								device.set('armed', response.devices[idrecord].armed);
								
								var category = device.get('category');
								switch (category) {
									case 101: //vswitch
										device.set('var1', response.devices[idrecord].text1);
										device.set('var2', response.devices[idrecord].text2);
										break;
									case 102: //vcontainer
										device.set('var1', response.devices[idrecord].variable1);
										device.set('var2', response.devices[idrecord].variable2);
										device.set('var3', response.devices[idrecord].variable3);
										device.set('var4', response.devices[idrecord].variable4);
										device.set('var5', response.devices[idrecord].variable5);
										break;
									case 103: //gcal
										device.set('var1', response.devices[idrecord].nextevent);
										break;
									case 120: //vclock
										device.set('var1', response.devices[idrecord].alarmtime);
										if (response.devices[idrecord].alarmtime != null) {
											heuredep = new Date("February 5, 2001 " + response.devices[idrecord].alarmtime);
											duration = response.devices[idrecord].alarmduration;
											heuredep.setTime(heuredep.getTime() + (eval(duration) * 1000));
											heures = Ext.Date.format(heuredep, 'H:i:s')
											device.set('var2', heures);
										}
										device.set('var3', response.devices[idrecord].next);
										device.set('var4', response.devices[idrecord].text1);
										device.set('var5', response.devices[idrecord].alarmtype);
										device.set('var6', response.devices[idrecord].weekdays);
										break;
									default:
										break;
								}
							}
						}
						
						// Maj indicateur nb allumés/éteints
						var count1 = 0; // nb allumés
						var count2 = 0; // nb éteints
						devices.findBy(function(rec) {
							var status = rec.get('status');
							var category = rec.get('category');
							var isTripped = (rec.get('tripped') == 1);
							if (
									(rec.get('verif') != 'off' && rec.get('verif') != 'no')
									&&
									(
										((category == 4 || category == 103 || category == 120) && isTripped)
										||
										(category !=4 && status == 1)
									)
							) {
								count1++;
							}
							if (
									(
										rec.get('verif') == 'off'
										&&
										(
											((category == 4 || category == 103 || category == 120) && !isTripped)
											||
											(category !=4 && category != 103 && category != 120 && status == 0)
										)
									)
									||
									(rec.get('verif')!='no' && (category == 4 || category == 103 || category == 120) && rec.get('armed')==0)
							) {
								count2++;
							}
						});
						if (count1 == 0 && count2 == 0) {
							Ext.getCmp('panelinfo').tab.setBadgeText("");
						} else {
							Ext.getCmp('panelinfo').tab.setBadgeText(count1 + '-' + count2);
						}
					}
					if(nonewsync!=true) {
					//new sync
					if (response.loadtime && response.dataversion) {
						this.devicesync(response.loadtime,response.dataversion);
					} else {
						Ext.Msg.alert('Erreur', 'Synchronisation sans loadtime');
						this.devicesync(0, 0, nonewsync);
					}
					}
				} else {
					Ext.Msg.confirm('Erreur', 'Pas de réponse lors de la synchro. Essayer à nouveau?', function(confirmed) {
					if (confirmed == 'yes') {
						this.devicesync(0,0, nonewsync);
					}
					}, this);
				}
			},
			failure: function(response) {
				console.log("Vera Sync : Error");
				//Ext.Msg.alert('Erreur','Synchronisation avec la Vera impossible ou interrompue');
				Ext.Msg.confirm('Erreur', 'Synchronisation avec la Vera impossible ou interrompue. Essayer à nouveau?', function(confirmed) {
					if (confirmed == 'yes') {
						this.devicesync(0,0, nonewsync);
					}
				}, this);
				
				//setTimeout(this.devicesync(0,0),2000);
			}//,
			//callback: function(response) {
			//	console.log("It's OK");
			//}
		});
	},
	//onActivate: function() {
	//    console.log('Main container is active');
	//   },

	onDeviceTap: function(view, index, target, record, event) {
		//abort if in datalist it's not the image
		//if(view.id=="datalist"&&Ext.get(event.target).hasCls('deviceImage')==false) return;
		//console.log("tap");
		var dservice = 'urn:upnp-org:serviceId:SwitchPower1';
		var daction = 'SetTarget';
		var sdim = 'urn:upnp-org:serviceId:Dimming1';
		var actdim = 'SetLoadLevelTarget';
		var tardim = 'newLoadlevelTarget';
		var dtargetvalue = 'newTargetValue';
		
		var newstatus = "0";
		
		var icontap = false;
		var cat=record.get('category');
		if (!Ext.Array.contains([2, 3, 4, 8, 101, 102, 103, 120], cat) && (record.get('sceneon') == null || record.get('sceneoff') == null)) {
			return;
		}
		if (Ext.Array.contains(["datalist", "dataliston", "datalistoff", "listclock"], view.id)) {
			var tap = Ext.get(event.target);
			if (tap.hasCls('deviceImage')) {
				icontap = true;
			} else if (tap.hasCls('d25')) {
				dservice=sdim;
				daction=actdim;
				dtargetvalue=tardim;
				newstatus = 25;
			} else if (tap.hasCls('d50')) {
				dservice=sdim;
				daction=actdim;
				dtargetvalue=tardim;
				newstatus = 50;
			} else if (tap.hasCls('d75')) {
				dservice=sdim;
				daction=actdim;
				dtargetvalue=tardim;
				newstatus = 75;
			} else if (tap.hasCls('d100')) {
				//Open 100%
				newstatus = "1";
			} else if (tap.hasCls('armed') || tap.hasCls('armed2')) {
				dservice = 'urn:micasaverde-com:serviceId:SecuritySensor1';
				daction = 'SetArmed';
				dtargetvalue = 'newArmedValue';
				if (record.get('armed') == 1) {
					newstatus = "0";
				} else {
					newstatus = "1";
				}
			} else if (tap.hasCls('clock')) {
				dservice = 'urn:upnp-org:serviceId:VClock1';
				daction = 'SetNext';
				dtargetvalue = 'newNextValue';
				if (record.get('var3') == "on") {
					newstatus = "off";
				} else {
					newstatus = "on";
				}
			} else {
				return;
			}
		} else {
			icontap = true;
		}
		if (icontap == true) {
			
			if (record.get('category') == 120) {
				this.getClockfieldsetCt().setTitle(record.get('name'));
				this.getClockdeiveidCt().setValue(record.get('id'));
				dateheure=new Date("February 5, 2001 "+record.get('var1'));
				this.getClockheuredebCt().setValue(dateheure);
				dateheure=new Date("February 5, 2001 "+record.get('var2'));
				this.getClockheurefinCt().setValue(dateheure);
				if(record.get('subcategory')!=1) this.getClockheurefinCt().hide();
				else this.getClockheurefinCt().show();
				this.getClockmessageCt().setValue(record.get('var4'));
				if(record.get('subcategory')!=2) this.getClockmessageCt().hide();
				else this.getClockmessageCt().show();
				if(record.get('subcategory')!=1&&record.get('subcategory')!=2) Ext.getCmp('paneloverlay').setHeight('250px');
				else Ext.getCmp('paneloverlay').setHeight('290px');
				Ext.getCmp('paneloverlay').show();
				return;
			}
			
			if (record.get('category') == 4) {
				if (record.get('tripped') == 0) {
					newstatus = "1";
				}
			} else if (record.get('status') == 0) {
				newstatus = "1";
			}
			if (record.get('category') == 101) {
				dservice = "urn:upnp-org:serviceId:VSwitch1";
				daction = 'SetTarget';
				dtargetvalue = 'newTargetValue';
			}

			if (record.get('sceneon') != null && record.get('sceneoff') != null) {
				dservice = 'urn:micasaverde-com:serviceId:HomeAutomationGateway1';
				daction = 'RunScene';
				if (newstatus == "1") {
					newstatus = record.get('sceneon');
				} else {
					newstatus = record.get('sceneoff');
				}
			} else if (Ext.Array.contains([4, 103, 120], record.get('category'))) {
				return;
			}
		}

		//switch status
		console.log("switch : " + record.get('name'));
		record.set('state', -2);
		var vera_url = './protect/syncvera.php';
		var syncheader = "";
		syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
		var ipvera = this.getIpveraCt().getValue();
		Ext.Ajax.request({
			url: vera_url,
			headers: syncheader,
			method: 'GET',
			timeout: 10000,
			scope: this,
			params: {
				id: 'lu_action',
				ipvera: ipvera,
				DeviceNum: record.get('id'),
				serviceId: dservice,
				action: daction,
				newvalue: newstatus,
				targetvalue: dtargetvalue
				//newLoadlevelTarget: newstatus,
				//newTargetValue: newstatus,
				//newArmedValue: newstatus,
				//output_format: 'json'
			},
			success: function(response) {
				if (Ext.Array.contains([2, 3, 8], record.get('category'))) {
					record.set('state', -2);
				}
			},
			failure: function(response) {
				console.log("switch error :" + record.get('name'));
				Ext.Msg.alert('Erreur','Switch Error');
			}
		});
	},
	
	onLoginTap: function() {
		if(this.logged!=true) {
			var username = this.getUsernameCt().getValue(),
				password = this.getPasswordCt().getValue();
				ipvera = this.getIpveraCt().getValue();
			if(!Ext.isEmpty(password) && !Ext.isEmpty(username) && !Ext.isEmpty(ipvera)) {
				var user = Ext.create('myvera.model.CurrentUser', {
					id: 1,
					name: username,
					pass: password,
					ipvera: ipvera
				});
				user.save();
				this.loggedUserId=this.base64_encode(username+":"+password);
				console.log('logUserIn: ', username);
				//this.startstore();
				this.LogIn();

				Ext.getCmp('main').getTabBar().items.items[2].show();				
				Ext.getCmp('main').getTabBar().items.items[1].show();
				Ext.getCmp('main').getTabBar().items.items[0].show();
				Ext.getCmp('main').setActiveItem(Ext.getCmp('homepanel'));
			} else Ext.Msg.alert('Erreur','vous devez indiquer un login, un mot de passe et l\'IP de la Vera.');
		} else {
			Ext.ModelMgr.getModel('myvera.model.CurrentUser').load(1, {
				success: function(user) {
					Ext.Msg.confirm('Message', 'Voulez-vous vous déconnecter?', function(confirmed) {
						if (confirmed == 'yes') {
							user.erase({success: function() {window.location.reload(); } });
						}
					}, this);
				},
				failure: function() {
					// this should not happen, nevertheless:
					window.location.reload();
				}
			}, this);
		}
	},
	
	LogIn: function() {
		this.startstore();
		this.getLoginBt().setText('Se déconnecter');
		//this.getLoginBt().setUi('decline');
		this.getUsernameCt().hide();
		this.getPasswordCt().hide();
		this.getIpveraCt().hide();
	},
	
	onClockSaveTap: function() {
		Ext.getCmp('paneloverlay').hide();
		var id = this.getClockdeiveidCt().getValue();
		var datedeb = this.getClockheuredebCt().getValue();
		//le controleur, change le jour (il met le jour en cours). il faut donc le corriger.
		datedeb = new Date("February 5, 2001 " + Ext.Date.format(datedeb, 'H:i:s'));
		var datefin = this.getClockheurefinCt().getValue();
		datefin = new Date("February 5, 2001 " + Ext.Date.format(datefin, 'H:i:s'));
			//Ext.Msg.alert('Message',Ext.Date.format(datedeb, 'd/m/y H:i:s')+' '+Ext.Date.format(datefin, 'd/m/y H:i:s'));
		var message = this.getClockmessageCt().getValue();
		var devices = Ext.getStore('devicesStore');
		device=devices.getById(id);
		devicetype=device.get('subcategory');
		var change=false;
		if (devicetype == "1") {
			if (Date.parse(datefin) < Date.parse(datedeb)) {
				datefin.setTime(datefin.getTime() + (24 * 60 * 60 * 1000));
			}
			heurefin = (datefin.getTime() - datedeb.getTime()) / 1000;
			if(!heurefin>=10) heurefin=10;
			change=true;
		} else  heurefin="";
		var heuredeb=Ext.Date.format(datedeb, 'H:i:s');
		if(heuredeb!=device.get('var1')) {
			change=true;
		}
		if(devicetype=="2"&&message!=device.get('var4')) {
			change=true;
		} else message="";
		//change=false;
		if (change == true) {
			device.set('state', -2);
			var vera_url = './protect/syncvera.php';
			var syncheader = "";
			syncheader={'Authorization': 'Basic ' + this.loggedUserId};
			var ipvera = this.getIpveraCt().getValue();
			Ext.Ajax.request({
				url: vera_url,
				headers: syncheader,
				params: {
					id: 'vclock',
					ipvera: ipvera,
					DeviceNum: id,
					alarmtime: heuredeb,
					alarmduration: heurefin,
					text1: message
				},
				method: 'GET',
				timeout: 10000,
				scope: this,
				success: function(response) {
				},
				failure: function(response) {
					//console.log("switch error :" + record.get('name'));
					Ext.Msg.alert('Erreur','Clock Error');
				}
			});
		} else {
			Ext.Msg.alert('Message','Pas de modification.');
			//Ext.Msg.alert('Message',''+heuredeb+' '+heurefin);
		}
	
	},

	
	onActivatePanelItems: function(panel,item) {
		var ConfigDevicesStore = Ext.getStore('ConfigDevicesStore');
		if (ConfigDevicesStore.getCount() <= 0) {
			ConfigDevicesStore.on({
					load: 'onLoadConfigDevicesStore',
					scope: this
			});
			console.log("Load Vera Modules");
			ConfigDevicesStore.getProxy().setExtraParam( 'ipvera',  this.getIpveraCt().getValue());
			ConfigDevicesStore.getProxy().setExtraParam( 'id',  'sdata');
			var syncheader = "";
			syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
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
		syncheader={'Authorization': 'Basic ' + this.loggedUserId};
		Ext.getStore('devicesStore').getProxy().setHeaders(syncheader);
		Ext.getStore('devicesStore').sync(
			//ne marche pas...
			//{
			//	success: function(ed) {
			//		Ext.Msg.alert('Message', "Liste savegardée.");
			//	}
			//}
			);
		this.devicesync(0,0, true);
		Ext.Msg.alert('Message', "Sauvegarde lancée.");
	},
	
	showDetail: function(list, record) {
			console.info('Record ' + record.get('name'));
			this.getConfigDevices().push({
					xtype: 'PanelConfigItem',
					title: 'Détail du module',
					data: record.getData()
			});
       },
	
	base64_encode: function(data) {
		var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
		ac = 0,
		enc = "",
		tmp_arr = [];
		
		if (!data) {
			return data;
		}
		
		//data = this.utf8_encode(data + '');
		
		do { // pack three octets into four hexets
			o1 = data.charCodeAt(i++);
			o2 = data.charCodeAt(i++);
			o3 = data.charCodeAt(i++);
			
			bits = o1 << 16 | o2 << 8 | o3;
			h1 = bits >> 18 & 0x3f;
			h2 = bits >> 12 & 0x3f;
			h3 = bits >> 6 & 0x3f;
			h4 = bits & 0x3f;
			
			// use hexets to index into b64, and append result to encoded string
			tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
		} while (i < data.length);
		
		enc = tmp_arr.join('');
		
		var r = data.length % 3;
		
		return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
	}
});
