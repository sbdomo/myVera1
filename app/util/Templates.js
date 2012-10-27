Ext.define('myvera.util.Templates', {
    alias : 'widget.Templates',
    singleton : true,
//    tpl2: '<div class="x-img x-floating" style="height: 50px; width: 50px; top: {top}px; left: {left}px; z-index: 6; background-image: url(./img/d{category}_{status}.png); ">' +
//		'<tpl if="state==-2"><img src="./img/jaune.png" /><tpl elseif="state==-3"><img src="./img/rouge.png" /></tpl>'
//		+'</div>',
    config: {
	tplplan: '<div class="x-img x-floating" style="height: 50px; width: 50px; top: {top}px; left: {left}px; z-index: 6; background-image: url(./resources/images/d'+
	    '<tpl if="icon!=null||category==2||category==3||category==4||category==8||category==101||category==103||category==120">'+
	    	'<tpl if="icon!=null">{icon}<tpl elseif="category==4&&subcategory==4">44<tpl else>{category}</tpl>_<tpl if="category==4||category==103||category==120">{tripped}<tpl else>{status}</tpl>' +
	    '<tpl elseif="category==102">102_0'+
	    '<tpl else>0_0</tpl>.png); ">'+
	    '<tpl if="state==-2"><img src="./resources/images/jaune.png" /><tpl elseif="state==-3"><img src="./resources/images/rouge.png" />'+
	    '<tpl elseif="(category==4||category==103)&&armed==0"><img src="./resources/images/darm.png" />'+
	    '<tpl elseif="category==120"><tpl if="armed==1&&var3==\'off\'"><img src="./resources/images/doff.png" />'+
	    	'<tpl elseif="armed==0&&var3==\'off\'"><img src="./resources/images/darmoff.png" /><tpl elseif="armed==0&&var3==\'on\'"><img src="./resources/images/darm.png" /></tpl>'+
	    '</tpl>'+
	    '</div>',
	tpllist: '<div class="devtitle">{name}</div>'+
		'<div class="devmain">'+
			'<div class="devicon">'+
				'<img class="deviceImage" src="./resources/images/'+
				'<tpl if="state==-2">jaune<tpl elseif="state==-3">rouge<tpl else>vide</tpl>'+
				'.png" style="background-image: url(./resources/images/l'+
				'<tpl if="icon!=null||category==2||category==3||category==4||category==8||category==101||category==103||category==120">'+
					'<tpl if="icon != null">{icon}<tpl elseif="category==4&&subcategory==4">44'+
					'<tpl elseif="category==120&&subcategory==1">121<tpl elseif="category==120&&subcategory==2">122'+
					'<tpl else>{category}</tpl>_<tpl if="category==4||category==103||category==120">{tripped}<tpl else>{status}</tpl>'+
				'<tpl elseif="category==102">102_0'+
				'<tpl else>0_0</tpl>.png);" />'+
			'</div>'+
			'<div class="contenu">'+
				'<tpl if="category==4&&armed!= null"><div>'+
				'<img class="armed" src="./resources/images/arm{armed}.png" /> '+
				'</div>'+
				'<tpl elseif="category==101"><div class="var"><tpl if="var1==null">&nbsp;<tpl else>{var1}</tpl><br /><tpl if="var2==null">&nbsp;<tpl else>{var2}</tpl></div>'+
				'<tpl elseif="category==102"><div class="var"><tpl if="var1==null">&nbsp;<tpl else>{var1}</tpl><br /><tpl if="var2==null">&nbsp;<tpl else>{var2}</tpl><br /><tpl if="var3==null">&nbsp;<tpl else>{var3}</tpl><br /><tpl if="var4==null">&nbsp;<tpl else>{var4}</tpl> <tpl if="var5==null">&nbsp;<tpl else>{var5}</tpl></div>'+
				'<tpl elseif="category==103"><div><div class="longvar"><tpl if="var1==null">&nbsp;<tpl else>{var1}</tpl></div>'+
					'<tpl if="armed!= null"><div class="clock2"><img class="armed2" src="./resources/images/arm{armed}.png" /></div></tpl></div>'+
				'<tpl elseif="category==120"><div><div class="clock1"><tpl if="var1==null">&nbsp;<tpl else>{var1}</tpl><br /><tpl if="var2==null||subcategory!=1">&nbsp;<tpl else>{var2}</tpl></div>'+
					'<tpl if="armed!= null"><div class="clock2"><img class="armed2" src="./resources/images/arm{armed}.png" /></div></tpl></div>'+
					'<div class="var2"><tpl if="var3==null">&nbsp;<tpl else><img class="clock" src="./resources/images/{var3}.png" /></tpl></div>'+
				'<tpl elseif="category==2||category==8"><div>'+
				'<div class="devicelevel1">'+
					'<div class="lpourcent"><tpl if="level != null">{level} %<tpl else> </tpl></div>'+
					'<img class="d25" src="./resources/images/25<tpl if="level&gt;=25">on</tpl>.png" />'+
					'<img class="d50" src="./resources/images/50<tpl if="level&gt;=50">on</tpl>.png" />'+
				'</div>'+
				'<div class="devicelevel2">'+
					'<img class="d75" src="./resources/images/75<tpl if="level&gt;=75">on</tpl>.png" /> '+
					'<img class="d100" src="./resources/images/100<tpl if="level==100">on</tpl>.png" />'+
				'</div>'+
				'</div>'+
				'</tpl>'+
			'</div>'+
		'</div>'+
		'<div class="footer"><tpl if="comment!=\'\'&&comment!=null">{comment}<tpl else>&nbsp;</tpl></div>'
    },
//    statics: {
//        tplplan: '<div class="x-img x-floating" style="height: 50px; width: 50px; top: {top}px; left: {left}px; z-index: 6; background-image: url(./img/d{category}_{status}.png); ">' +
//		'<tpl if="state==-2"><img src="./img/jaune.png" /><tpl elseif="state==-3"><img src="./img/rouge.png" /></tpl>'
//		+'</div>'
//		}
//		,
    constructor : function(config) {
        this.initConfig(config);
        this.callParent([config]);
    }
});