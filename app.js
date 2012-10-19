Ext.application({
    name: 'myvera',
    controllers: [
        'Application','contdevices'
	],
    requires: [
        'Ext.MessageBox',
	'myvera.util.Templates'
	],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },
    glossOnIcon: true,
    isIconPrecomposed: false,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
	var MB = Ext.MessageBox;
	Ext.apply(MB, {
		YES: { text: 'Oui', itemId: 'yes', ui: 'action' },
		NO: { text: 'Non', itemId: 'no' }
	});
	Ext.apply(MB, {
		YESNO: [MB.NO, MB.YES]
	});
	// Destroy the #appLoadingIndicator element
	Ext.fly('appLoadingIndicator').destroy();
    },
    
    onUpdated: function() {
        Ext.Msg.confirm(
		"Mise à jour de l'application",
		"Mise à jour réussie. Recharger maintenant ?",
		function(buttonId) {
			if (buttonId === 'yes') {
				window.location.reload();
			}
		}
		);
    }
});
