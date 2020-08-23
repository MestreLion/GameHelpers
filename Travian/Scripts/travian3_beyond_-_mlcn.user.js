// ==UserScript==
// @name Travian3 Beyond - ML&CN
// @author Victor Garcia (aka Croc), Szabka, Lux, Nux, ms99
// @namespace T3
// @version 3.7.8.2
// @description  (v 3.7.8.2 Travian v3 addons originally by Victor Garcia (aka Croc); - updated by Szabka pl51-7.June 2008; - updated by ms99-14.March.20092
// @source http://userscripts.org/scripts/show/28129
// @identifier http://userscripts.org/scripts/show/28129.user.js
// @include http://*.travian*.*/*.php*
// @exclude http://*.travian*.*/hilfe.php*
// @exclude http://*.travian*.*/log*.php*
// @exclude http://*.travian*.*/index.php*
// @exclude http://*.travian*.*/anleitung.php*
// @exclude http://*.travian*.*/impressum.php*
// @exclude http://*.travian*.*/anmelden.php*
// @exclude http://*.travian*.*/gutscheine.php*
// @exclude http://*.travian*.*/spielregeln.php*
// @exclude http://*.travian*.*/links.php*
// @exclude http://*.travian*.*/geschichte.php*
// @exclude http://*.travian*.*/tutorial.php*
// @exclude http://*.travian*.*/manual.php*
// @exclude http://*.travian*.*/ajax.php*
// @exclude http://*.travian*.*/ad/*
// @exclude http://*.travian*.*/chat/*
// @exclude http://forum.travian*.*
// @exclude http://board.travian*.*
// @exclude http://shop.travian*.*
// @exclude http://*.travian*.*/activate.php*
// @exclude http://*.travian*.*/support.php*
// @exclude  http://help.travian*.*/*log
// @exclude *.css
// @exclude *.js
// ==/UserScript==

//Travian3 Beyond - ML&CN (multilanguage & center numbers)

/*
* The original script from Victor Garcia (aka Croc) is licensed under the
* Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Spain License.
* To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/es/
*
* The updated script from ms99 is licensed under the
* Creative Commons Attribution-Noncommercial-Share Alike 3.0 Germany License
* To view a copy of this license, please visit http://creativecommons.org/licenses/by-nc-sa/3.0/de/
*
* An English translation of the "Creative Commons Attribution-Noncomercial-Share Alike 3.0 License"
* can be found here http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en
*
* © Copyright ms99, 2008-2009
*
* Portions of this script © Copyright 2008 Nux
* Portions of this script (Setup behavior) © Copyright 2008 Lux
* Portions of this script (Update script & Drag n drop library) © Copyright 2007 Richard Laffers
* Portions of this script (addGreyScaleSwitcher) © Copyright 2009 onetmt
*
* Portions of this script are provided by others.  There may be ideas provided by others implemented into the script.
* By providing the code or sending their ideas to the author(s) of this script, all these people have declined AND given up their rights.
* But, their names are provided here for credits.  A big THANK YOU to all contributors. 
* Only together we can improve the game experience !
*
* All rights to additional images embedded in this script belong to their respective creators or to ms99, Nux, Lux, DMaster, Brains, fr3nchlover, CuPliz13.
* All rights for the translations to different languages belong to the respective translators.
*
* Parts of this code are provided (or based on code written) by others
* RELEVANT CONTRIBUTIONS TO THIS SCRIPT (listed in alphabetical order).  THANK YOU !!!
*	BmW for the great ideas, comments, screenshots, testing and continuous help !
*	Brains for his ideas, comments, icons and help !
*	CuPliz13 for the redesigned big icons !
*	DMaster for the great ideas, comments. pictures, testing, screenshots and help !
*	Dream1 for his ideas, comments, screenshots, translation and help !
*	ezGertie for his ideas, comments, screenshots and help !
*	friedturnip for the "alt" tags for images !
*	fr3nchlover for testing, translation, ideas, code and bug fixes provided !
*	Lux for the new behavior of the "Travian Beyond Setup" !
*	MarioCheng for great ideas, comments, fixes, code, translation and help !
*	onetmt for the amazing addGreyScaleSwitcher() function for the big icons !
*	phob0z for his ideas, comments, translation and code !
*	rtellezi for the function that allows to send an IGM via <CTRL>+<ENTER> keystroke !
*	Rypi for his help and trust and translation !
*	someweirdnobody for the amazing "Select all troops" function !
*	vampiricdust/fr3nchlover for fixing the villages2cp function  !
*	yabash for ideas, translations, comments, icons and help !
*	Zippo for the global/local options of the saved offers, support, translation, patience and help !
*
* Please have understanding if I've forgotten somebody with a relevant contribution to this script.  Please send a message to the address specified on the page of the script, for credits.
*
* Other contributors' (nick)names are provided in the header of (or inside) the functions.
* Special thanks to all contributors and translators of this script !
 */

// Main function executed when the whole page is loaded
function functionMain(e) {

	var TB3O = new Object();
	// Time when the script initiates on the current page
	TB3O.TBStartTime = new Date().getTime();
	TB3O.TBEndTime = 0;
	TB3O.origMap = true;
	TB3O.crtLocationTitle = "";
	TB3O.TBTotalRunTime = function() {
		return TB3O.TBEndTime - TB3O.TBStartTime;
	};
	TB3O.OrigDocTitle = document.title;

	TB3O.versionText = function() {
		return SCRIPT.version + " - " + SCRIPT.name;
	};
	TB3O.boolShowCPinUpgTables = "1";
	TB3O.boolShowCCinUpgTables = "1";
	TB3O.boolShowDistTimes = "1";
	TB3O.xActive = -1000;
	TB3O.yActive = -1000;
	TB3O.xCrt = -1000;
	TB3O.yCrt = -1000;
	
	var SCRIPT = {
		url: 'http://userscripts.org/scripts/source/28129.user.js',
		version: '3.7.8.2',
		name: '=))',
		presentationurl: 'http://userscripts.org/scripts/show/28129'
	};

	var crtLocation = location.href;
	var boolShowStatLinks;
	var boolIsAvailableBarracks = false;
	var boolShowCellTypeInfo;
	var boolShowTravmapLinks;
	var boolShowBigIconAlliance;
	var boolShowTroopInfoTooltips;
	var boolOldServerVersion;
	var merchantsCapacity;
	var merchantsName;
	var boolIsTroopsTrainingBuilding;
	var boolShowNPCLink = crtLocation.indexOf(".org") == -1;
	var localGraphicPack = "";
	var docDir = ['left', 'right'];
	var wsServerName;
	var wsURLCropFinderLinkV2 = "http://crop-finder.com/";
	var wsURLTravianBox = "http://travianbox.com";
	var wsURLStart = new Array();
	wsURLStart["0"]	= "http://www.travian.ws/analyser.pl?s=";
	wsURLStart["1"]	= "http://travian-utils.com/?s=";
	wsURLStart["2"] = wsURLTravianBox + "/stats/";
	var crtUserID;
	var urlNow = window.location.pathname + window.location.search;
	var windowheight = window.innerHeight;
	var windowwidth = window.innerWidth;
	//var villageID;
	var villageInfo;
	var crtUserRace = "";
	var detectedLanguage = "en";
	var warsimExtLink = "http://kirilloid.ru/travian/warsim.php";
	var warsimIntLink = "warsim.php";
	var newdidActive;
	var fullServerName;
	var gServer;
	var jsVoid = 'javaScript:void(0)';
	var boolIsT35 = false;
	var xGIF = "a/x.gif";
	var dlright1 = 'lright1';
	var dmid = 'lmidall';
	var dTop5 = 'ltop5';
	var dTop1 = 'ltop1';
	var dmid2 = 'lmid2';
	var dleft = 'lleft';
	var dmid1 = 'lmid1';
	var dmap = 'map1';
	var gIcons = new Array;
	
	var LOG_LEVEL = 10;

	var currentResUnits = new Array(5);		// Current resource units
	var capacity = new Array(4);			// Capacity of the warehouse/granary
	var productionPerHour = new Array(5); 	//production per hour for the four resource types
	var timeToFill = [[-1, ""], [-1, ""], [-1, ""], [-1, ""]];//time to fill the warehouse/granary

	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;		// Constante que devuelve el primer elemento por XPath
	var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;		// Constante que devuelve una lista de elementos por XPath
	var XPIterate  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;		// Constante que deuvelve un iterador de elementos por XPath

	//css Style declarations
    //general
    var cssStyle = "";
	cssStyle += "#resumen {position:relative; width:682px;}"; //680px //900px
    cssStyle += "#tabla_mapa {position: relative; width:682px; margin-top:16px;}"; //680px //900px
    cssStyle += ".bttable {width:100%; height:129px;}";
    cssStyle += ".dcol {color:#A0A0A0;}";
	cssStyle += "table.tbg td35 {border-right:0px; border-top:0px; border-bottom:0px; border-left:0px;}";
	// NEW TABLE STYLE for the Total village troops table (initially),  Used also for market arriving merchants resume. Provided by david.macej.  Thank you !
    cssStyle += "table.tbg tr.cbgx td, td.cbgx {background-color:#FFFFC0;}";
	cssStyle += ".rfx {top:-26px;}";
	cssStyle += "#resNtable {width:30%; border-right:0px; border-top:0px; border-bottom:0px; border-left:0px;}";
	//cssStyle += ".sTable {width}";
    GM_addStyle(cssStyle);

	//other declarations to be converted to styleSheets
	tdNoBorder = 'border-bottom:0px; border-top:0px; border-right:0px; border-left:0px;';
	tdBorderTop = 'border-top:1px solid #C2C2C2; font-size:8pt;';
	
	//------------------------------------------
	//Modified by Lux
	//------------------------------------------
	var cssStyleSetup =	".MsgPageOff {visibility: hidden; display: none; position: absolute; top: -100px; left: -100px;}" +
				".OuterMsgPageOn {position: absolute; top: 0px; left: 0px; visibility: visible; width: 150%; height: 200%; background-color: #000; z-index: 1998; opacity:0.75;}"+
				".InnerMsgPageOn {position: absolute;  left:25%; top:2.8%; visibility: visible; opacity:1; z-index: 1999;}"+
				".divCloseMsgPageOn {position: absolute;  left:73.5%; top:0.2%; visibility: visible; opacity:1; z-index: 2000;}";
	GM_addStyle(cssStyleSetup);
	//------------------------------------------

	//NPC Assistant
	var cssNPCStyle = "";
	cssNPCStyle += ".npc-general {margin:3px 0 0; font-size:10px}";
	cssNPCStyle += ".npc-red {color: #DD0000}";
	cssNPCStyle += ".npc-green {color: #009900}";
	cssNPCStyle += ".npc-highlight {color: #009900; background-color: #FFFFCC}";
	GM_addStyle(cssNPCStyle);

	var NPCResources = 'npcResources';
	var NPCbacklinkName = 'npcBacklinkName';
	var NPCURL = '/build.php?gid=17&t=3';

	//resource level & center numbers
	var CN_COLOR_TEXT = '#000000';
	var CN_COLOR_NEUTRAL = '#FDF8C1';
	var CN_COLOR_MAX_LEVEL = '#7DFF7D';
	var CN_COLOR_NO_UPGRADE = '#FF9696';
	var CN_COLOR_UPGRADABLE_VIA_NPC = '#FFC84B';

	//center numbers
	var cssCNStyle = "";
	cssCNStyle += ".CNbuildingtags{background-color:" + CN_COLOR_NEUTRAL + "; border:thin solid #000000; -moz-border-radius: 2em;";
	cssCNStyle += " padding-top: 3px; font-family: Arial, Helvetica, Verdana, sans-serif; font-size:9pt; font-weight:bold;";
	cssCNStyle += " color:" + CN_COLOR_TEXT + "; text-align:center; position:absolute; width:21px; height:18px; cursor:pointer; visibility:hidden; z-index:26;}";
	GM_addStyle(cssCNStyle);

	var gidToName = new Array();
    gidToName[1] = 'lumber';
    gidToName[2] = 'clay';
    gidToName[3] = 'iron';
    gidToName[4] = 'crop';
    gidToName[5] = 'sawmill';
    gidToName[6] = 'brickyard';
    gidToName[7] = 'ironFoundry';
    gidToName[8] = 'grainMill';
    gidToName[9] = 'bakery';
    gidToName[10] = 'warehouse';
    gidToName[11] = 'granary';
    gidToName[12] = 'blacksmith';
    gidToName[13] = 'armoury';
    gidToName[14] = 'tournamentSquare';
    gidToName[15] = 'mainBuilding';
    gidToName[16] = 'rallyPoint';
    gidToName[17] = 'marketplace';
    gidToName[18] = 'embassy';
    gidToName[19] = 'barracks';
    gidToName[20] = 'stable';
    gidToName[21] = 'workshop';
    gidToName[22] = 'academy';
    gidToName[23] = 'cranny';
    gidToName[24] = 'townhall';
    gidToName[25] = 'residence';
    gidToName[26] = 'palace';
    gidToName[27] = 'treasury';
    gidToName[28] = 'tradeOffice';
    gidToName[29] = 'greatBarrack';
    gidToName[30] = 'greatStable';
	gidToName[31] = 'wallGauls';
	gidToName[32] = 'wallRomans';
	gidToName[33] = 'wallTeutons';
    gidToName[34] = 'stonemason';
    gidToName[35] = 'brewery';
    gidToName[36] = 'trapper';
    gidToName[37] = 'herosMansion';
    gidToName[38] = 'greatWarehouse';
    gidToName[39] = 'greatGranary';
    gidToName[40] = 'WW';

	var xLang = new Array(0);
	//default language = English  (.uk, .com and .us)
	//we'll replace the array item values with the translated ones (if available) based on the language detected
	xLang['ALLIANCE'] 				= 'Alliance';
	xLang['SIM'] 					= 'Combat simulator';
	xLang['AREYOUSURE'] 			= 'Are you sure?';
	xLang['LOSS'] 					= 'Loss';
	xLang['PROFIT'] 				= 'Profit';
	xLang['EXTAVAILABLE'] 			= 'Extension available';
	xLang['PLAYER'] 				= 'Player';
	xLang['VILLAGE'] 				= 'Village';
	xLang['POPULATION'] 			= 'Population';
	xLang['COORDS'] 				= 'Coordinates';
	xLang['MAPTABLEACTIONS']		= 'Actions';
	xLang['SAVED'] 					= 'Saved';
	xLang['YOUNEED'] 				= 'You need';
	xLang['TODAY'] 					= 'today';
	xLang['TOMORROW'] 				= 'tomorrow';
	xLang['PAS_MANYANA'] 			= 'day after tomorrow';
	xLang['MARKET'] 				= 'Marketplace';
	xLang['BARRACKS'] 				= 'Barracks';
	xLang['RALLYPOINT'] 			= 'Rally point';
	xLang['STABLE'] 				= 'Stable';
	xLang['WORKSHOP'] 				= 'Workshop';
	xLang['ENVIAR'] 				= 'Send resources';
	xLang['COMPRAR'] 				= 'Buy';
	xLang['VENDER'] 				= 'Sell';
	xLang['SENDIGM'] 				= 'Send IGM';
	xLang['LISTO'] 					= 'Available';
	xLang['ON'] 					= 'on';
	xLang['A_LAS'] 					= 'at';
	xLang['EFICIENCIA'] 			= 'Efficiency';
	xLang['NEVER']					= 'Never';
	xLang['ALDEAS']					= 'Village(s)';
	xLang['TIEMPO']					= 'Time';
	xLang['OFREZCO']				= 'Offering';
	xLang['BUSCO']					= 'Searching';
	xLang['TIPO']					= 'Type';
	xLang['DISPONIBLE']				= 'Only available';
	xLang['CUALQUIERA']				= 'Any';
	xLang['YES']					= 'Yes';
	xLang['NO']						= 'No';
	xLang['LOGIN']					= 'Login';
	xLang['MARCADORES']				= 'Bookmarks';
	xLang['ANYADIR']				= 'Add';
	xLang['ENLACE']					= 'New Bookmark URL';
	xLang['TEXTO']					= 'New Bookmark Text';
	xLang['ELIMINAR']				= 'Delete';
	xLang['MAPA']					= 'Map';
	xLang['MAXTIME']				= 'Maximum time';
	xLang['ARCHIVE']				= 'Archive';
	xLang['RESUMEN']				= 'Summary';
	xLang['TROPAS']					= 'Troops';
	xLang['CHECKVERSION']			= 'Update TBeyond';
	xLang['ACTUALIZAR']				= 'Update village information';
	xLang['VENTAS']					= 'Saved Offers';
	xLang['MAPSCAN']    			= 'Scan the Map';
	xLang['BIGICONS']				= 'Show extended icons';
	xLang['NOTEBLOCK']				= 'Show note block';
	xLang['SAVE']					= 'Save';
	xLang['RPDEFACT']				= 'Rally point default action';
	xLang['ATTACKTYPE2']			= 'Reinforcement';
	xLang['ATTACKTYPE3']			= 'Attack: Normal';
	xLang['ATTACKTYPE4']			= 'Attack: Raid';
	xLang['NBSIZE']					= 'Note block size';
	xLang['NBSIZEAUTO']				= 'Auto';
	xLang['NBSIZENORMAL']			= 'Normal (small)';
	xLang['NBSIZEBIG']				= 'Large screen (large)';
	xLang['NBHEIGHT']				= 'Note block height';
	xLang['NBAUTOEXPANDHEIGHT']		= 'Automatic expand height';
	xLang['NBKEEPHEIGHT']			= 'Default height';
	xLang['SHOWCENTERNUMBERS'] 		= 'Show center numbers';
	xLang['NPCSAVETIME']			= 'Save: ';
	xLang['SHOWCOLORRESLEVELS']		= 'Show resource level colours';
	xLang['SHOWCOLORBUILDLEVELS']	= 'Show building level colours';
	xLang['CNCOLORNEUTRAL'] 		= 'Color upgrade available<br>(Default = Empty)';
	xLang['CNCOLORMAXLEVEL'] 		= 'Color max level<br>(Default = Empty)';
	xLang['CNCOLORNOUPGRADE'] 		= 'Color upgrade not possible<br>(Default = Empty)';
	xLang['CNCOLORNPCUPGRADE'] 		= 'Color upgrade via NPC<br>(Default = Empty)';
	xLang['TOTALTROOPS'] 			= 'Total village troops';
	xLang['SHOWBOOKMARKS'] 			= 'Show bookmarks';
	xLang['RACECRTV2'] 				= 'Race';
	xLang['SERVERVERSION2'] 		= "Travian v2.x server";
	xLang['SELECTALLTROOPS'] 		= "Select all troops";
	xLang['PARTY'] 					= "Festivities";
	xLang['CPPERDAY']				= "CP/day";
	xLang['SLOT']					= "Slot";
	xLang['TOTAL']					= "Total";
	xLang['NOPALACERESIDENCE'] 		= "No residence or palace in this village or village center not opened yet !";
	xLang['SELECTSCOUT'] 			= "Select scout";
	xLang['SELECTFAKE'] 			= "Select fake";
	xLang['NOSCOUT2FAKE'] 			= "It's impossible to use scouts for a fake attack !";
	xLang['NOTROOP2FAKE'] 			= "There aren't troops for a fake attack!";
	xLang['NOTROOP2SCOUT'] 			= "There aren't troops to scout !";
	xLang['NOTROOPS'] 				= "There aren't troops in the village !";
	xLang['ALL'] 					= "All";
	xLang['NORACE'] 				= "Build the barracks to automatically determine the race and/or open the village center...";
	xLang['COLORHELPTEXT']			= "In color fields you may enter:<br>- <b>green</b> or <b>red</b> or  <b>orange</b>, etc.<br>- the HEX color code like <b>#004523</b><br>- leave empty for the default color";
	xLang['COLORHELP']				= "Help for color fields";
	xLang['SHOWORIGREPORT']			= "Show original report (for posting)";
	xLang['SHOWCELLTYPEINFO']		= "Show cell type/oasis info<br>while mousing over the map";
	xLang['WARSIM']					= "Combat simulator link to use:<br>(menu left)";
	xLang['WARSIMOPTION1']			= "Internal (provided by the game)";
	xLang['WARSIMOPTION2']			= "External (provided by kirilloid.ru)";
	xLang['WSANALYSER'] 			= "World Analyser to use";
	xLang['SHOWSTATLINKS'] 			= "Show analyser statistic links";
	xLang['WANALYSER0']				= "World Analyser"; //no Translation !  Name of a site !!!
	xLang['WANALYSER1']				= "Travian Utils"; //no Translation !  Name of a site !!!
	xLang['NONEWVERSION']			= "You have the latest version available";
	xLang['BETAVERSION']			= "You may have a beta version";
	xLang['NEWVERSIONAV']			= "A new version of the script is available";
	xLang['UPDATESCRIPT']			= "Update script now ?";
	xLang['CHECKUPDATE']			= "Checking for script update.  Please wait...";
	xLang['CROPFINDER']				= "Crop finder";
	xLang['AVPOPPERVIL']			= "Average population per village";
	xLang['AVPOPPERPLAYER']			= "Average population per player";
	xLang['SHOWRESUPGRADETABLE']	= "Show resource fields upgrade table";
	xLang['SHOWBUPGTABLE'] 			= "Show buildings upgrade table";
	xLang['CONSOLELOGLEVEL']		= "Console Log Level<br>ONLY FOR PROGRAMMERS OR DEBUGGING<br>(Default = 1)";
	xLang['MARKETPRELOAD']			= "Number of offer pages to preload<br>while on the 'Market => Buy' page<br>(Default = 1)";
	xLang['CAPITAL']				= 'Name of your capital<br><b>Visit your Profile for an update</b>';
	xLang['CAPITALXY']				= 'Coordinates of your capital<br><b>Visit your Profile for an update</b>';
	xLang['MAX']					= 'Max';
	//introduced in version 3.0.7
	xLang['TOTALTROOPSTRAINING']	= 'Total troops training';
	//introduced in version 3.0.9
	xLang['SHOWDISTTIMES'] 			= 'Show distances & times';
	//introduced in version 3.1.3
	xLang['TBSETUPLINK'] 			= 'Travian Beyond Setup';
	xLang['UPDATEALLVILLAGES']		= 'Update all villages.  USE WITH MAXIMUM CARE AS THIS CAN LEAD TO A BANNED ACCOUNT !';
	//introduced in version 3.1.4
	xLang['SHOWMENUSECTION3']		= "Show additional links in left menu<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
	//introduced in version 3.1.7
	xLang['LARGEMAP']				= 'Large map';
	//introduced in version 3.1.8
	xLang['SHOWTRAVMAPLINKS']		= 'Show links to travmap.shishnet.org<br>(users and alliances)';
	//introduced in version 3.1.9
	xLang['USETHEMPR']				= 'Use them (proportional)';
	xLang['USETHEMEQ']				= 'Use them (equal)';
	//introduced in version 3.2
	xLang['TOWNHALL']				= 'Town Hall';
	xLang['GAMESERVERTYPE']			= 'Game server';
	xLang['MARKETOFFERS']			= 'Market offers';
	xLang['ACCINFO']				= 'Account Information';
	xLang['BOOKMARKOPTIONS']		= 'Bookmarks';//identical to xLang['MARCADORES'] => check if this can be removed
	xLang['NOTEBLOCKOPTIONS']		= 'Noteblock';
	xLang['MENULEFT']				= 'Menu on the left side';
	xLang['STATISTICS']				= 'Statistics';
	xLang['RESOURCEFIELDS']			= 'Resource fields';
	xLang['VILLAGECENTER']			= 'Village center';
	xLang['MAPOPTIONS']				= 'Map options';
	xLang['COLOROPTIONS']			= 'Color options';
	xLang['DEBUGOPTIONS']			= 'Debug options';
	xLang['SHOWBIGICONMARKET']		= 'Market';
	xLang['SHOWBIGICONMILITARY']	= 'Military<br>Rally point/Barracks/Workshop/Stable';
	xLang['SHOWBIGICONALLIANCE']	= 'Alliance'; //identical to xLang['ALLIANCE'] => check if this can be removed
	xLang['SHOWBIGICONMILITARY2']	= "Town hall/Hero's mansion/Armoury/Blacksmith";
	xLang['HEROSMANSION']			= "Hero's mansion";
	xLang['BLACKSMITH']				= 'Blacksmith';
	xLang['ARMOURY']				= 'Armoury';
	//introduced in 3.2.1
	xLang['NOW']					= 'Now';
	xLang['CLOSE']					= 'Close';
	//introduced in 3.3
	xLang['USE']					= 'Use';
	xLang['USETHEM1H']				= 'Use them (1 hour production)';
	xLang['OVERVIEW']				= 'Overview';
	xLang['FORUM']					= 'Forum';
	xLang['ATTACKS']				= 'Attacks';
	xLang['NEWS']					= 'News';
	//introduced in 3.3.1
	xLang['ADDCRTPAGE']				= 'Add current'; //additional Add link for Bookmarks meaning 'add current page as a bookmark'
	xLang['SCRIPTPRESURL']			= 'TBeyond page';
	//introduced in 3.3.3
	xLang['NOOFSCOUTS']				= 'No. of scouts for the<br>"Select scout" function';
	//introduced in 3.3.4.2
	xLang['SPACER'] 				= 'Spacer';
	//introduced in 3.3.5
	xLang['SHOWTROOPINFOTOOLTIPS']	= 'Show troops information in tooltips';
	//introduced in 3.3.6
	xLang['MESREPOPTIONS']			= 'Messages & Reports';
	xLang['MESREPPRELOAD']			= 'Number of message/report pages to preload<br>(Default = 1)';
	xLang['ATTABLES']				= 'Troop tables';//only for users with PLUS => dorf3.php?s=6 link on dorf3.php pages
	//introduced in 3.3.7
	xLang['MTWASTED'] 				= 'Wasted';
	xLang['MTEXCEED'] 				= 'Exceeding';
	xLang['MTCURRENT'] 				= 'Current load';
	xLang['ALLIANCEFORUMLINK']		= 'Link to external forum<br>(Leave empty for internal forum)';
	xLang['LOCKBOOKMARKS']			= 'Lock bookmarks<br>(Hide delete, move up, move down icons)';
	xLang['MTCLEARALL']				= 'Clear all';
	//introduced in 3.3.7.2
	xLang['UNLOCKBOOKMARKS']		= 'Unlock bookmarks<br>(Show delete, move up, move down icons)';
	//introduced in 3.3.7.3
	xLang['CLICKSORT']				= 'Click to sort';
	xLang['MIN']					= 'Min';
	//introduced in 3.3.8
	xLang['SAVEGLOBAL']				= 'Shared among villages';
	//introduced in 3.3.8.1
	xLang['VILLAGELIST']			= 'Village List';
	xLang['SHOWINOUTICONS']			= "Show 'dorf1.php' and 'dorf2.php' links";
	//introduced in 3.3.8.3
	xLang['UPDATEPOP']				= 'Update population';
	//introduced in 3.4
	xLang['SHOWRPRINFOTOOLTIPS']	= 'Show distance and times to villages in tooltips<br>(Rally Point & Reports)';
	//introduced in 3.4.5
	xLang['EDIT']					= 'Edit';
	//introduced in 3.5
	xLang['SHOWMESOPENLINKS']		= 'Show links to open messages in a pop-up';
	//introduced in 3.5.4.1
	xLang['NPCOPTIONS']				= 'NPC Assistant options';
	xLang['NPCASSISTANT']			= 'Show NPC Assistant calculations/links';
	//introduced in 3.5.4.7
	xLang['SHOWMAPTABLE']			= 'Show table of players/villages/occupied oasis';
	//introduced in 3.5.4.7.2
	xLang['NEWVILLAGEAV']			= 'Date/Time';
	xLang['TIMEUNTIL']				= 'Time to wait';
	//introduced in 3.5.5
	xLang['SHOWREPDELTABLE']		= 'Show "Delete all" table on the Reports page';
	xLang['SHOWIGMLINKFORME']		= 'Show the "Send IGM" icon for me, too';
	xLang['CENTERMAP']				= 'Center map on this village';
	xLang['SHOWCENTERMAPICON']		= 'Show "Center map on this village" icon';
	//introduced in 3.5.8
	xLang['INETGPOPTION']			= 'Internet Graphic Pack';
	xLang['ALLOWINETGP']			= 'Allow Internet Graphic Packs';
	//introduced in 3.5.9.2
	xLang['SENDTROOPS']				= 'Send troops';
	//introduced in 3.5.9.3
	xLang['SHOWBRSTATDETAILS']		= 'Show details in Report Statistics';
	//introduced in 3.5.9.8
	xLang['SHOWBIGICONMISC']		= "Palace/Residence/Academy/Treasury";
	xLang['PALACE']					= "Palace";
	xLang['RESIDENCE']				= "Residence";
	xLang['ACADEMY']				= "Academy";
	xLang['TREASURY']				= "Treasury";
	//introduced in 3.7
	xLang['SHOWBBLINK']				= "Show blinking levels for buildings being upgraded";
	//introduced in 3.7.3
	xLang['WANALYSER2']				= "TravianBox.com"; //no Translation !  Name of a site !!!
	//introduced in 3.7.4
	xLang['SHOWSENDTROOPSRESOURCES'] = "Show 'Send troops/Send resources' icons in village list";
	//introduced in 3.7.8.1
	xLang['SHOWCPINUPGTABLES']		= "Show CP/day information in upgrade tables";
	xLang['UPGTABLES']				= "Resource fields/buildings upgrade tables";
	xLang['SHOWCCINUPGTABLES']		= "Show crop consumption in upgrade tables";

	function switchLanguage(detectedLanguage) {
		switch (detectedLanguage) {
			case "it":
				// Por IcEye, rosfe y Danielle, Lello, Zippo, Nux, ns65, Acr111, onetmt
				xLang['ALLIANCE']				= 'Alleanza';
				xLang['SIM']					= 'Simulatore di combattimento';
				xLang['AREYOUSURE']				= 'Sei sicuro?';
				xLang['LOSS']					= 'Perdita in materiale';
				xLang['PROFIT']					= 'Guadagno';
				//xLang['EXTAVAILABLE']			= 'Risorse disponibili';
				xLang['EXTAVAILABLE']			= 'Ampliamento disponibile';
				xLang['PLAYER']					= 'Proprietario';
				xLang['VILLAGE']				= 'Villaggio';
				xLang['POPULATION']				= 'Popolazione';
				xLang['COORDS']					= 'Coordinate';
				xLang['MAPTABLEACTIONS']		= 'Azioni';
				xLang['SAVED']					= 'Salvato';
				xLang['YOUNEED']				= 'Mancano';
				xLang['TODAY']					= 'oggi';
				xLang['TOMORROW']				= 'domani';
				xLang['PAS_MANYANA']			= 'dopodomani';
				xLang['MARKET']					= 'Mercato';
				xLang['BARRACKS']				= "Campo d'addestramento";
				xLang['RALLYPOINT']				= 'Caserma';
				xLang['STABLE']					= 'Scuderia';
				xLang['WORKSHOP']				= 'Officina';
				xLang['ENVIAR']					= 'Invia risorse';
				xLang['COMPRAR']				= 'Compra risorse';
				xLang['VENDER']					= 'Vendi risorse';
				xLang['SENDIGM']				= 'Invia messaggio';
				//xLang['LISTO']					= 'Ampliamento disponibile';
				xLang['LISTO'] 					= 'Disponibile';
				xLang['ON']						= 'il';
				xLang['A_LAS']					= 'alle';
				xLang['EFICIENCIA']				= 'Efficienza';
				xLang['NEVER']					= 'Mai';
				xLang['ALDEAS']					= 'Villaggi';
				xLang['TIEMPO']					= 'Tempo';
				xLang['OFREZCO']				= 'Offerta';
				xLang['BUSCO']					= 'Richiesta';
				xLang['TIPO']					= 'Percentuale di scambio';
				xLang['DISPONIBLE']				= 'Disponibile';
				xLang['CUALQUIERA']				= 'Tutti';
				xLang['YES']					= 'Si';
				xLang['NO']						= 'No';
				xLang['LOGIN']					= 'Login';
				xLang['MARCADORES']				= 'Segnalibri';
				xLang['ANYADIR']				= 'Aggiungi';
				xLang['ENLACE']					= 'URL segnalibro';
				xLang['TEXTO']					= 'Nome segnalibro';
				xLang['ELIMINAR']				= 'Eliminare';
				xLang['MAPA']					= 'Mappa';
				xLang['MAXTIME']				= 'Tempo massimo';
				xLang['ARCHIVE']				= 'Archivia';
				xLang['RESUMEN']				= "Riepilogo";
				xLang['TROPAS']					= 'Truppe';
				xLang['CHECKVERSION']			= 'Verifica Aggiornamenti';
				xLang['ACTUALIZAR']				= 'Aggiorna le informazioni sul villaggio';
				xLang['VENTAS']					= 'Offerte salvate';
				xLang['MAPSCAN']				= "Scansiona la mappa";	
				xLang['BIGICONS']				= 'Icone aggiuntive per accesso rapido';
				xLang['NOTEBLOCK']				= 'Mostra blocco note';
				xLang['SAVE']					= 'Salva';
				xLang['RPDEFACT']				= "Azione predefinita per 'Invia truppe'";
				xLang['ATTACKTYPE2']			= 'Rinforzo';
				xLang['ATTACKTYPE3']			= 'Attacco: Normale';
				xLang['ATTACKTYPE4']			= 'Attacco: Raid';
				xLang['NBSIZE']					= 'Larghezza blocco note';
				xLang['NBSIZEAUTO']				= 'Automatica';
				xLang['NBSIZENORMAL']			= 'Normale (Piccolo)';
				xLang['NBSIZEBIG']				= 'Schermi grandi (Grande)';
				xLang['NBHEIGHT']				= 'Altezza blocco note';
				xLang['NBAUTOEXPANDHEIGHT']		= "Adatta l'altezza automaticamente";
				xLang['NBKEEPHEIGHT']			= "Altezza predefinita";
				xLang['SHOWCENTERNUMBERS']		= 'Mostra livelli edifici';
				xLang['NPCSAVETIME']			= 'Tempo guadagnato: ';
				xLang['SHOWCOLORRESLEVELS']		= 'Mostra colori livelli campi';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Mostra colori livelli edifici';
				xLang['CNCOLORNEUTRAL']			= 'Colore ampliamento disponibile <br>(Vuoto = default)';
				xLang['CNCOLORMAXLEVEL']		= 'Colore livello massimo raggiunto <br>(Vuoto = default)';
				xLang['CNCOLORNOUPGRADE']		= 'Colore ampliamento non disponibile <br>(Vuoto = default)';
				xLang['CNCOLORNPCUPGRADE']		= 'Colore ampliamento col mercato nero <br> (Vuoto = default)';
				xLang['TOTALTROOPS']			= "Truppe del villaggio complessive";
				xLang['SHOWBOOKMARKS']			= 'Mostra segnalibri';
				xLang['RACECRTV2']				= 'Popolo';
				xLang['SERVERVERSION2']			= "Server Travian v2.x";
				xLang['SELECTALLTROOPS']		= "Seleziona tutte le truppe";
				xLang['PARTY']					= "Party";
				xLang['CPPERDAY']				= "PC/giorno";
				xLang['TOTAL']					= "Totale";
				xLang['NOPALACERESIDENCE']		= "Non sono presenti né il residence né il castello oppure il centro villaggio non è ancora stato aperto!";
				xLang['SELECTSCOUT']			= "Spiata";
				xLang['SELECTFAKE']				= "Fake";
				xLang['NOSCOUT2FAKE']			= "Non si possono usare le spie per mandare un fake!";
				xLang['NOTROOP2FAKE']			= "Non ci sono truppe per mandare un fake!";
				xLang['NOTROOP2SCOUT']			= "Non ci sono truppe per fare la spiata!";
				xLang['NOTROOPS']				= "Non ci sono truppe nel villaggio!";
				xLang['ALL']					= "Tutto";
				xLang['NORACE']					= "Costruisci la caserma per determinare automaticamente la razza oppure apri il centro villaggio...";
				xLang['COLORHELPTEXT']			= "Nei campi dei colori puoi inserire:<br>- il nome (in inglese) <b>green</b> o <b>red</b> o <b>orange</b>, etc.<br>- il codice esadecimale del colore <b>#004523</b><br>- lasciare vuoto per usare i colori predefiniti";
				xLang['COLORHELP']				= "Istruzioni per i colori";
				xLang['SHOWORIGREPORT']			= "Mostra report originale (per postare sul forum)";
				xLang['SHOWCELLTYPEINFO']		= "Mostra informazioni sul tipo di terreno/oasi<br>mentre il mouse passa sulla mappa";
				xLang['WARSIM']					= "Simulatore di combattimento da usare:<br>(nel menu a sinistra)";
				xLang['WARSIMOPTION1']			= "Interno (quello presente nel gioco)";
				xLang['WARSIMOPTION2']			= "Esterno (fornito da kirilloid.ru)";
				xLang['WSANALYSER']				= "World Analyser da utilizzare";				
				xLang['SHOWSTATLINKS']			= "Mostra link statistiche World Analyser";
				xLang['NONEWVERSION']			= "É già installata l'ultima versione disponibile";
				xLang['BETAVERSION']			= "Potresti avere una versione Beta";
				xLang['NEWVERSIONAV']			= "É disponibile una nuova versione";
				xLang['UPDATESCRIPT']			= "Aggiornare ora lo script?";
				xLang['CHECKUPDATE']			= "Controllo dell'ultima versione disponibile. Attendere prego...";
				xLang['CROPFINDER']				= "Crop finder";
				xLang['AVPOPPERVIL']			= "Popolazione media villaggi";
				xLang['AVPOPPERPLAYER']			= "Popolazione media giocatori";
				xLang['SHOWRESUPGRADETABLE']	= 'Mostra tabella ampliamento campi';
				xLang['SHOWBUPGTABLE']			= 'Mostra tabella ampliamento edifici';
				xLang['CONSOLELOGLEVEL']		= "Livello di logging della console<br>SOLO PER SVILUPPATORI O PER DEBUGGING<br>(Default = 1)";
				xLang['MARKETPRELOAD']			= "Numero di pagine di offerte da precaricare<br>nella pagina 'Mercato => Visualizza offerte'<br>(Default = 1)";
				xLang['CAPITAL']				= 'Nome del villaggio capitale<br><b>Vai alla pagina del tuo Profilo per aggiornare i dati</b>';
				xLang['CAPITALXY']				= 'Coordinate del villaggio capitale<br><b>Vai alla pagina del tuo Profilo per aggiornare i dati</b>';
				xLang['MAX']					= 'Max';
				xLang['TOTALTROOPSTRAINING']	= 'Totale truppe in addestramento';
				xLang['SHOWDISTTIMES']			= 'Mostra distanze e tempi';
				xLang['TBSETUPLINK']			= 'Impostazioni Travian Beyond';
				xLang['UPDATEALLVILLAGES']		= "Aggiorna tutti i villaggi.  USARE CON CAUTELA, potrebbe comportare il BAN dell`account!";
				xLang['SHOWMENUSECTION3']		= "Mostra links aggiuntivi nel menu di sinistra<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
				xLang['LARGEMAP']				= 'Mappa estesa';
				xLang['SHOWTRAVMAPLINKS']		= 'Mostra links a travmap.shishnet.org<br>(utenti e alleanze)';
				xLang['USETHEMPR']				= 'Completa proporzionalmente';
				xLang['USETHEMEQ']				= 'Completa equamente';
				xLang['TOWNHALL']				= 'Municipio';
				xLang['GAMESERVERTYPE']			= 'Server di gioco';
				xLang['MARKETOFFERS']			= 'Offerte del mercato';
				xLang['ACCINFO']				= 'Informazioni Account';
				xLang['BOOKMARKOPTIONS']		= 'Segnalibri';//identical to xLang['MARCADORES'] => check if this can be removed
				xLang['NOTEBLOCKOPTIONS']		= 'Blocco note';
				xLang['MENULEFT']				= 'Menu di sinistra';
				xLang['STATISTICS']				= 'Statistiche';
				xLang['RESOURCEFIELDS']			= 'Campi di risorse';
				xLang['VILLAGECENTER']			= 'Centro del villaggio';
				xLang['MAPOPTIONS']				= 'Opzioni mappa';
				xLang['COLOROPTIONS']			= 'Opzioni colori';
				xLang['DEBUGOPTIONS']			= 'Opzioni di debug';
				xLang['SHOWBIGICONMARKET']		= 'Mercato';
				xLang['SHOWBIGICONMILITARY']	= "Militari<br>Caserma/Campo d'addestramento/Officina/Scuderia";
				xLang['SHOWBIGICONALLIANCE']	= 'Alleanza'; //identical to xLang['ALLIANCE'] => check if this can be removed
				xLang['SHOWBIGICONMILITARY2']	= "Municipio/Circolo degli eroi/Armeria/Fabbro";
				xLang['HEROSMANSION']			= "Circolo degli eroi";
				xLang['BLACKSMITH']				= 'Fabbro';
				xLang['ARMOURY']				= 'Armeria';
				xLang['NOW']					= 'Adesso';
				xLang['CLOSE']					= 'Chiudi';
				xLang['USE']					= 'Usa';
				xLang['USETHEM1H']				= 'Completa con la produzione oraria';
				xLang['OVERVIEW']				= 'Riepilogo';
				xLang['FORUM']					= 'Forum';
				xLang['ATTACKS']				= 'Attacchi';
				xLang['NEWS']					= 'News';
				xLang['ADDCRTPAGE']				= 'Aggiungi pagina corrente';
				xLang['SCRIPTPRESURL']			= 'Travian Beyond';
				xLang['NOOFSCOUTS']				= "Numero di spie per l'invio di spiate";
				xLang['SPACER']					= 'Separatore';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'Mostra i tooltip con le informazioni sulle truppe';
				xLang['MESREPOPTIONS']			= 'Messaggi e Report';
				xLang['MESREPPRELOAD']			= 'Numero di pagine di messaggi/report da precaricare<br>(Default = 1)';
				xLang['ATTABLES']				= 'Tabella truppe';
				xLang['MTWASTED']				= 'Sprecate';
				xLang['MTEXCEED']				= 'In eccesso';
				xLang['MTCURRENT']				= 'Carico corrente';
				xLang['ALLIANCEFORUMLINK']		= 'Link al forum esterno<br>(Lasciare vuoto per il forum interno)';
				xLang['LOCKBOOKMARKS']			= 'Blocca segnalibri<br>(Nasconde le icone cancella, sposta in alto e sposta in basso)';
				xLang['MTCLEARALL']				= 'Cancella tutto';
				xLang['UNLOCKBOOKMARKS']		= 'Sblocca segnalibri<br>(Mostra le icone cancella, sposta in alto e sposta in basso)';
				xLang['CLICKSORT']				= 'Clicca per ordinare';
				xLang['MIN']					= 'Min';
				xLang['SAVEGLOBAL']				= 'Condivisa tra i villaggi';
				xLang['VILLAGELIST']			= 'Elenco villaggi';
				xLang['SHOWINOUTICONS']			= "Mostra i collegamenti a 'dorf1.php' e 'dorf2.php'";
				xLang['UPDATEPOP']				= 'Aggiorna popolazione';
				xLang['SHOWRPRINFOTOOLTIPS']	= 'Mostra tooltip con tempi e distanza dai villaggi<br>(Caserma & Report)';
				xLang['EDIT']					= 'Modifica';
				xLang['SHOWMESOPENLINKS']		= 'Mostra links per aprire i messaggi in un pop-up';
				xLang['NPCOPTIONS']				= 'Opzioni Mercato Nero';
				xLang['NPCASSISTANT']			= 'Mostra calcoli/links per il Mercato Nero';
				xLang['SHOWMAPTABLE']			= 'Mostra tabella dei giocatori/villaggi/oasi occupate';
				xLang['NEWVILLAGEAV']			= 'Data/Ora';
				xLang['TIMEUNTIL']				= 'Tempo di attesa';
				xLang['SHOWREPDELTABLE']		= 'Mostra tabella "Eliminare" nella pagina dei report';
				xLang['SHOWIGMLINKFORME']		= "Mostra l'icona 'Invia messaggio' anche per me";
				xLang['CENTERMAP']				= 'Centra la mappa su questo villaggio';
				xLang['SHOWCENTERMAPICON']		= "Mostra l'icona 'Centra la mappa su questo villaggio'";
				xLang['INETGPOPTION']			= 'Opzioni Pacchetto Grafico';
				xLang['ALLOWINETGP']			= 'Permetti Pacchetto Grafico da Internet';
				xLang['SENDTROOPS']				= 'Invia truppe';
				xLang['SHOWBRSTATDETAILS']		= 'Mostra dettagli nelle statistiche dei Reports';
				xLang['SHOWBIGICONMISC']		= "Castello/Residence/Accademia/Camera del tesoro";
				xLang['PALACE']					= "Castello";
				xLang['RESIDENCE']				= "Residence";
				xLang['ACADEMY']				= "Accademia";
				xLang['TREASURY']				= "Camera del tesoro";
				xLang['SHOWBBLINK'] 			= "Mostra il livello delle strutture in costruzione lampeggiante";
				xLang['SHOWSENDTROOPSRESOURCES']= "Mostra le icone 'Invia truppe/Invia risorse'";
				break;
			case "de":
				// geprueft und aktualisiert von Nils & hatua
				xLang['ALLIANCE']				= 'Allianz';
				xLang['SIM']					= 'Kampfsimulator';
				xLang['AREYOUSURE']				= 'Sind Sie sicher?';
				xLang['LOSS']					= 'Rohstoff-Verluste';
				xLang['PROFIT']					= 'Rentabilit&auml;t';
				xLang['EXTAVAILABLE']			= 'Ausbau m&ouml;glich';
				xLang['PLAYER']					= 'Spieler';
				xLang['VILLAGE']				= 'Dorf';
				xLang['POPULATION']				= 'Einwohner';
				xLang['COORDS']					= 'Koordinaten';
				xLang['MAPTABLEACTIONS']		= 'Aktion';
				xLang['ENVIAR']					= 'H&auml;ndler schicken';
				xLang['SAVED']					= 'Gespeichert';
				xLang['YOUNEED']				= 'Ben&ouml;tige';
				xLang['TODAY']					= 'heute';
				xLang['TOMORROW']				= 'morgen';
				xLang['PAS_MANYANA']			= '&uuml;bermorgen';
				xLang['MARKET']					= 'Marktplatz';
				xLang['BARRACKS']				= 'Kaserne';
				xLang['RALLYPOINT']				= 'Versammlungsplatz';
				xLang['STABLE']					= 'Stall';
				xLang['WORKSHOP']				= 'Werkstatt';
				xLang['COMPRAR']				= 'Kaufen';
				xLang['VENDER']					= 'Verkaufen';
				xLang['SENDIGM']				= 'IGM schreiben';
				xLang['LISTO']					= 'Genug';
				xLang['ON']						= '';
				xLang['A_LAS']					= 'um';
				xLang['EFICIENCIA']				= 'Effektivit&auml;t';
				xLang['NEVER']					= 'Nie';
				xLang['ALDEAS']					= 'D&ouml;rfer';
				xLang['MAXTIME']				= 'Maximale Dauer';
				xLang['TIEMPO']					= 'Zeit';
				xLang['MAPA']					= 'Karte';
				xLang['OFREZCO']				= 'Biete';
				xLang['BUSCO']					= 'Suche';
				xLang['TIPO']					= 'Tauschverh&auml;ltnis';
				xLang['DISPONIBLE']				= 'Nur annehmbare Angebote';
				xLang['CUALQUIERA']				= 'Beliebig';
				xLang['YES']					= 'Ja';
				xLang['NO']						= 'Nein';
				xLang['MARCADORES']				= 'Lesezeichen';
				xLang['ANYADIR']				= 'Hinzuf&uuml;gen';
				xLang['ENLACE']					= 'URL von neuem Lesezeichen';
				xLang['TEXTO']					= 'Text von neuem Lesezeichen';
				xLang['ELIMINAR']				= 'Entfernen';
				xLang['CHECKVERSION']			= 'Update TBeyond';
				xLang['ACTUALIZAR']				= 'Update Dorf Info';
				xLang['ARCHIVE']				= 'Archiv';
				xLang['VENTAS']					= 'Gespeicherte Angebote';
				xLang['RESUMEN']				= 'Zusammenfassung';
				xLang['BIGICONS']				= 'Zusätzliche Icons';
				xLang['NOTEBLOCK']				= 'Notizblock anzeigen';
				xLang['SAVE']					= 'Speichern';
				xLang['RPDEFACT']				= 'Standard Aktion Versammlungsplatz';
				xLang['ATTACKTYPE2']			= 'Unterstützung';
				xLang['ATTACKTYPE3']			= 'Angriff: Normal';
				xLang['ATTACKTYPE4']			= 'Angriff: Raubzug';
				xLang['NBSIZE']					= 'Gr&ouml;sse Notizblock';
				xLang['NBSIZEAUTO']				= 'Auto';
				xLang['NBSIZENORMAL']			= 'Normal (klein)';
				xLang['NBSIZEBIG']				= 'Breiter Monitor (breit)';
				xLang['NBHEIGHT']				= 'Notizblock: Höhe';
				xLang['NBAUTOEXPANDHEIGHT']		= 'Höhe automatisch anpassen';
				xLang['NBKEEPHEIGHT']			= 'Standard Höhe';
				xLang['SHOWCENTERNUMBERS']		= 'Levels im Dorfzentrum anzeigen';
				xLang['NPCSAVETIME']			= 'Zeitgewinn';
				xLang['SHOWCOLORRESLEVELS']		= 'Ressilevel Farbcode anzeigen';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Geb&auml;udelevel Farbcode anzeigen';
				xLang['TOTALTROOPS']			= 'Truppen dieses Dorfes';
				xLang['SHOWBOOKMARKS']			= 'Lesezeichen anzeigen';
				xLang['RACECRTV2']				= 'Volk';
				xLang['SERVERVERSION2']			= "Travian v2.x Server";
				xLang['SHOWSTATLINKS']			= "Analyser Statistiklinks anzeigen";
				xLang['SELECTALLTROOPS']		= "Alle Truppen ausw&auml;hlen";
				xLang['PARTY']					= "Feste";
				xLang['CPPERDAY']				= "KPs/Tag";
				xLang['SLOT']					= "Slots";
				xLang['NOPALACERESIDENCE']		= "Keine Residenz oder Palast in diesem Dorf oder Dorfzentrum noch nicht ge&ouml;ffnet!";
				xLang['SELECTSCOUT']			= "Sp&auml;her ausw&auml;hlen";
				xLang['SELECTFAKE']				= "Fake Truppen ausw&auml;hlen";
				xLang['NOSCOUT2FAKE']			= "Es ist unmöglich Späher für einen Fake zu benutzen!";
				xLang['NOTROOP2FAKE']			= "Keine Truppen vorhanden um einen Fake Angriff zu starten!";
				xLang['NOTROOP2SCOUT']			= "Keine Truppen vorhanden um einen Spähangriff zu starten!";
				xLang['NOTROOPS']				= "Keine Truppen im Dorf!";
				xLang['ALL']					= "Alles";
				xLang['NORACE']					= "Automatische Erkennung des Volkes: Kaserne bauen und/oder Dorfzentrum öffnen...";
				xLang['COLORHELPTEXT']			= "Was man in Farbfelder eintragen kann:<br>- (Englisch) <b>green</b> oder <b>red</b> oder <b>orange</b>, etc.<br>- HEX Farbkod, z.B. <b>#004523</b><br>- leer für Standardfarbe";
				xLang['COLORHELP']				= "Hilfe Farbfelder";
				xLang['SHOWCELLTYPEINFO']		= "Zelltyp auf der Karte anzeigen<br>wenn Mauszeiger &uuml;ber Zelle";
				xLang['WARSIMOPTION1']			= "Intern (vom Spiel zur Verfügung gestellt)";
				xLang['WARSIMOPTION2']			= "Extern (von der kirilloid.ru Seite)";
				xLang['WSANALYSER']				= "Benutze World Analyser";
				xLang['SHOWSTATLINKS']			= "World Analyser Statistiklinks anzeigen";
				xLang['NONEWVERSION']			= "Sie haben die letzte Version installiert";
				xLang['BETAVERSION']			= "Sie haben vielleicht eine Beta Version installiert";
				xLang['NEWVERSIONAV']			= "Eine neue Version des Scripts steht zur Verfügung";
				xLang['UPDATESCRIPT']			= "Script jetzt aktualisieren ?";
				xLang['CHECKUPDATE']			= "Es wird nach einer neuen Scriptversion gesucht.  Bitte warten...";
				xLang['CROPFINDER']				= "Crop finder";
				xLang['AVPOPPERVIL']			= "Dorfbewohner: Durchschnitt pro Dorf";
				xLang['AVPOPPERPLAYER']			= "Dorfbewohner: Durchschnitt pro Spieler";
				xLang['SHOWBUPGTABLE']			= "Upgradetabelle f&uuml;r Gebäude anzeigen";
				xLang['CONSOLELOGLEVEL']		= "Log Level Konsole<br />Nur f&uuml;r Programmierer (Standard = 0)";
				xLang['MARKETPRELOAD']			= "Anzahl der Angebotsseiten<br />auf der 'Markt => Kaufen' Seite,<br />die vom Server automatisch runtergeladen<br />werden sollen (Standard = 1)";
				xLang['SHOWDISTTIMES']			= 'Entfernungen & Zeiten anzeigen';
				xLang['TBSETUPLINK']			= 'Travian Beyond Einstellungen';
				xLang['SHOWORIGREPORT']			= "Original Bericht anzeigen";
				xLang['WARSIM']					= "Option Kampfsimulatorlink";
				xLang['SHOWRESUPGRADETABLE']	= "Upgradetabelle f&uuml;r Resifelder anzeigen";
				xLang['CAPITAL']				= 'Name des Hauptdorfs';
				xLang['CAPITALXY']				= 'Koordinaten des Hauptdorfs';
				xLang['TBSETUPLINK']			= 'Travian Beyond Einstellungen';
				xLang['UPDATEALLVILLAGES']		= 'Alle Dörfer aktualisieren. BITTE MIT VORSICHT BENUTZEN, DIES KÖNNTE ZUR SPERRUNG DES ACCOUNTS FÜHREN !';
				xLang['SHOWMENUSECTION3']		= "Zusätzliche Links im linken Menü anzeigen<br />(Traviantoolbox, World Analyser, Travilog, Map, usw.)";
				xLang['LARGEMAP']				= 'Große Karte';
				xLang['SHOWTRAVMAPLINKS']		= 'Links zu travmap.shishnet.org anzeigen<br />(Spieler and Allianzen)';
				xLang['USETHEMPR']				= 'Rohstoffe proportional verteilen';
				xLang['USETHEMEQ']				= 'Rohstoffe gleichmäßig verteilen';
				xLang['TOWNHALL']				= 'Rathaus';
				xLang['GAMESERVERTYPE']			= 'Server';
				xLang['MARKETOFFERS']			= 'Angebote am Markt';
				xLang['ACCINFO']				= 'xxx';
				xLang['BOOKMARKOPTIONS']		= xLang['MARCADORES'];
				xLang['NOTEBLOCKOPTIONS']		= 'Notizblock';
				xLang['MENULEFT']				= 'Menü links';
				xLang['STATISTICS']				= 'Statistiken';
				xLang['RESOURCEFIELDS']			= 'Rohstofffelder';
				xLang['VILLAGECENTER']			= 'Dorfzentrum';
				xLang['MAPOPTIONS']				= 'Karten Einstellung';
				xLang['COLOROPTIONS']			= 'Farbeinstellungen  (Standard = Leer)';
				xLang['CNCOLORNEUTRAL']			= 'Farbe "Upgrade möglich"';
				xLang['CNCOLORMAXLEVEL']		= 'Farbe "Max Level"';
				xLang['CNCOLORNOUPGRADE']		= 'Farbe "Upgrade nicht möglich"';
				xLang['CNCOLORNPCUPGRADE']		= 'Farbe "Upgrade via NPC"';
				xLang['DEBUGOPTIONS']			= 'Fehlersuche';
				xLang['SHOWBIGICONMARKET']		= 'Marktplatz';
				xLang['SHOWBIGICONMILITARY']	= 'Versammlungsplatz / Kaserne / Stall / Werkstatt';
				xLang['SHOWBIGICONALLIANCE']	= xLang['ALLIANCE'];
				xLang['SHOWBIGICONMILITARY2']	= "Rathaus / Heldenhof / Rüstungs- / Waffenschmiede";
				xLang['HEROSMANSION']			= "Heldenhof";
				xLang['BLACKSMITH']				= 'Waffenschmiede';
				xLang['ARMOURY']				= 'Rüstungsschmiede';
				xLang['NOW']					= 'Jetzt';
				xLang['CLOSE']					= 'Schließen';
				xLang['USE']					= 'Benutze';
				xLang['USETHEM1H']				= '1 Stundenproduktion schicken';
				xLang['OVERVIEW']				= 'Übersicht';
				xLang['FORUM']					= 'Forum';
				xLang['ATTACKS']				= 'Angriffe';
				xLang['NEWS']					= 'News';
				xLang['ADDCRTPAGE']				= 'Aktuelle Seite hinzufügen';
				xLang['SCRIPTPRESURL']			= 'TB-Homepage';
				xLang['NOOFSCOUTS']				= 'Anzahl der Späher für die<br />"Späher auswählen" Funktion';
				xLang['SPACER']					= 'Abstandshalter';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'Truppeninformationen anzeigen<br />(in Informations-Boxen)';
				xLang['MESREPOPTIONS']			= 'Nachrichten & Berichte';
				xLang['MESREPPRELOAD']			= 'Anzahl der "Nachrichten & Berichte" Seiten<br />die vom Server automatisch runtergeladen<br />werden sollen (Standard = 1)';
				xLang['ATTABLES']				= 'Truppenübersicht';
				xLang['MTWASTED']				= 'Noch verfügbaren Platz verschwendet';
				xLang['MTEXCEED']				= 'Zuviel';
				xLang['MTCURRENT']				= 'Aktuell verwendet';
				xLang['ALLIANCEFORUMLINK']		= 'Link zum externen Forum<br>(Für internes Forum leer lassen)';
				xLang['MTCLEARALL']				= 'Alles leeren';
				xLang['LOCKBOOKMARKS']			= 'Lesezeichen sperren<br />(Die Icons werden ausgeblendet)';
				xLang['UNLOCKBOOKMARKS']		= 'Lesezeichen entsperren<br>(Die Icons f&uuml;rs L&ouml;schen und sortieren werden wieder angezeigt)';
				xLang['CLICKSORT']				= 'Zum Sortieren klicken';
				xLang['MIN']					= 'Min';
				xLang['SAVEGLOBAL']				= 'F&uuml;r alle D&ouml;rfer verf&uuml;gbar';
				xLang['VILLAGELIST']			= 'Dorfübersicht';
				xLang['SHOWINOUTICONS']			= "Zeige die Links 'dorf1.php' und 'dorf2.php' an";
				xLang['UPDATEPOP']				= 'Einwohnerzahl aktualisieren';
				xLang['SHOWRPRINFOTOOLTIPS']	= 'Zeige Entfernung & Zeiten zu den D&ouml;rfern in ToolTips an<br />(Versammlungsplatz & Berichte)';
				xLang['EDIT']					= 'Bearbeiten';
				xLang['SHOWMESOPENLINKS']		= 'Links um IGMs in Pop-ups zu &ouml;ffnen anzeigen';
				xLang['NPCOPTIONS']				= 'Optionen NPC Assistent';
				xLang['NPCASSISTANT']			= 'NPC Assistent Kalkulation/Links anzeigen';
				xLang['SHOWMAPTABLE']			= 'Tabelle der Spieler/D&ouml;rfer/besetzte Oasen anzeigen';
				xLang['NEWVILLAGEAV']			= 'Datum/Uhrzeit';
				xLang['TIMEUNTIL']				= 'Wartezeit';
				xLang['SHOWREPDELTABLE']		= '"Alle l&ouml;schen" Tabelle auf Berichte Seite anzeigen';
				xLang['SHOWIGMLINKFORME']		= 'Zeige das "Sende IGM" Icon auch f&uuml;r mich an';
				xLang['CENTERMAP']				= 'Zentriere Karte auf dieses Dorf';
				xLang['SHOWCENTERMAPICON']		= 'Zeige "Zentriere Karte auf dieses Dorf" Icon an';
				xLang['INETGPOPTION']			= 'Internet Graphic Pack';
				xLang['ALLOWINETGP']			= 'Erlaube Internet Graphic Packs';
				xLang['SENDTROOPS']				= 'Truppen schicken';
				xLang['SHOWBRSTATDETAILS']		= 'Details in Berichte Statistiken anzeigen';
				xLang['SHOWBIGICONMISC']		= "Palast/Residenz/Akademie/Schatzkammer";
				xLang['PALACE']					= "Palast";
				xLang['RESIDENCE']				= "Residenz";
				xLang['ACADEMY']				= "Akademie";
				xLang['TREASURY']				= "Schatzkammer";
				xLang['SHOWBBLINK']				= "Blinkende Levels f&uuml;r Geb&auml;ude die gerade ausgebaut werden";
				xLang['SHOWSENDTROOPSRESOURCES']= "Zeige 'Truppen schicken/Rohstoffe verschicken' Icons in der Liste der D&ouml;rfer an";
				break;
			case "ro":
				// Traducere ms99
				xLang['ALLIANCE']				= 'Alianţă';
				xLang['SIM']					= 'Simulator luptă';
				xLang['AREYOUSURE']				= 'Eşti sigur?';
				xLang['LOSS']					= 'Pierderi';
				xLang['PROFIT']					= 'Profit';
				xLang['EXTAVAILABLE']			= 'Upgrade posibil acum';
				xLang['PLAYER']					= 'Jucător';
				xLang['VILLAGE']				= 'Sat';
				xLang['POPULATION']				= 'Populaţie';
				xLang['COORDS']					= 'Coordonate';
				xLang['MAPTABLEACTIONS']		= 'Acţiuni';
				xLang['SAVED']					= 'Salvat';
				xLang['YOUNEED']				= 'Ai nevoie de';
				xLang['TODAY']					= 'azi';
				xLang['TOMORROW']				= 'mâine';
				xLang['PAS_MANYANA']			= 'poimâine';
				xLang['MARKET']					= 'Târg';
				xLang['BARRACKS']				= 'Cazarmă';
				xLang['RALLYPOINT']				= 'Adunare';
				xLang['STABLE']					= 'Grajd';
				xLang['WORKSHOP']				= 'Atelier';
				xLang['ENVIAR']					= 'Trimite resurse';
				xLang['COMPRAR']				= 'Cumpară';
				xLang['VENDER']					= 'Vinde';
				xLang['SENDIGM']				= 'Trimite mesaj';
				xLang['LISTO']					= 'Upgrade posibil';
				xLang['ON']						= 'în';
				xLang['A_LAS']					= 'la';
				xLang['EFICIENCIA']				= 'Eficienţă';
				xLang['NEVER']					= 'Niciodată';
				xLang['ALDEAS']					= 'Sat(e)';
				xLang['TROPAS']					= 'Adunare';
				xLang['TIEMPO']					= 'Timp';
				xLang['OFREZCO']				= 'Oferă';
				xLang['BUSCO']					= 'Caută';
				xLang['TIPO']					= 'Tip';
				xLang['DISPONIBLE']				= 'Doar cele disponibile';
				xLang['CUALQUIERA']				= 'Oricare';
				xLang['YES']					= 'Da';
				xLang['NO']						= 'Nu';
				xLang['LOGIN']					= 'Intrare';
				xLang['MARCADORES']				= 'Link-uri';
				xLang['ANYADIR']				= 'Adaugă';
				xLang['ENLACE']					= 'URL';
				xLang['TEXTO']					= 'Text';
				xLang['ELIMINAR']				= 'Şterge';
				xLang['MAPA']					= 'Hartă';
				xLang['MAXTIME']				= 'Timp maxim';
				xLang['ARCHIVE']				= 'Arhivă';
				xLang['RESUMEN']				= 'Rezumat';
				xLang['TROPAS']					= 'Trupe';
				xLang['CHECKVERSION']			= 'Update TBeyond';
				xLang['ACTUALIZAR']				= 'Actualizează informaţie sat';
				xLang['VENTAS']					= 'Oferte salvate';
				xLang['MAPSCAN']				= 'Scanează harta';
				xLang['BIGICONS']				= 'Afişează icoane suplimentare';
				xLang['NOTEBLOCK']				= 'Afişează bloc-notes';
				xLang['SAVE']					= 'Salvează';
				xLang['RPDEFACT']				= 'Acţiune standard adunare';
				xLang['ATTACKTYPE2']			= 'Întăriri';
				xLang['ATTACKTYPE3']			= 'Atac: Normal';
				xLang['ATTACKTYPE4']			= 'Atac: Raid';
				xLang['NBSIZE']					= 'Lăţime bloc-notes';
				xLang['NBSIZEAUTO']				= 'Auto';
				xLang['NBSIZENORMAL']			= 'Normal (ingust)';
				xLang['NBSIZEBIG']				= 'Ecran lat (lat)';
				xLang['NBHEIGHT']				= 'Înălţime bloc-notes';
				xLang['NBAUTOEXPANDHEIGHT']		= "Măreşte inălţimea automat";
				xLang['NBKEEPHEIGHT']			= "Înălţime normală";
				xLang['SHOWCENTERNUMBERS']		= 'Afişează nivel clădiri';
				xLang['NPCSAVETIME']			= 'Timp economisit';
				xLang['SHOWCOLORRESLEVELS']		= 'Afişează culori nivel câmpuri resurse';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Afişează culori nivel clădiri';
				xLang['CNCOLORNEUTRAL']			= 'Culoare upgrade posibil<br>(Nimic = standard)';
				xLang['CNCOLORMAXLEVEL']		= 'Culoare nivel maxim<br>(Nimic = standard)';
				xLang['CNCOLORNOUPGRADE']		= 'Culoare upgrade imposibil<br>(Nimic = standard)';
				xLang['CNCOLORNPCUPGRADE']		= 'Culoare upgrade posibil via NPC<br>(Nimic = standard)';
				xLang['TOTALTROOPS']			= 'Total trupe sat';
				xLang['SHOWBOOKMARKS']			= 'Afişează link-uri';
				xLang['RACECRTV2']				= 'Rasă';
				xLang['SERVERVERSION2']			= "Server Travian v2.x";
				xLang['SELECTALLTROOPS']		= "Selectează toate trupele";
				xLang['PARTY']					= "Festivităţi";
				xLang['CPPERDAY']				= "PC/zi";
				xLang['SLOT']					= "Slot";
				xLang['TOTAL']					= "Total";
				xLang['NOPALACERESIDENCE']		= "Nu există vilă sau palat în acest sat sau nu aţi vizitat încă centrul satului !";
				xLang['SELECTSCOUT']			= "Selectează spioni";
				xLang['SELECTFAKE']				= "Selectează trupe fake";
				xLang['NOSCOUT2FAKE']			= "Nu puteţi selecta spioni pentru un fake !";
				xLang['NOTROOP2FAKE']			= "Nu există trupe pentru un fake !";
				xLang['NOTROOP2SCOUT']			= "Nu există trupe pentru un atac de spionaj !";
				xLang['NOTROOPS']				= "Nu există trupe in sat !";
				xLang['ALL']					= "Tot";
				xLang['NORACE']					= "Construieşte cazarma pentru detectarea automată a rasei şi/sau deschide pagina 'centrul satului'...";
				xLang['COLORHELPTEXT']			= "În câmpurile de culori puteţi introduce:<br>- <b>green</b> sau <b>red</b> sau <b>orange</b>, etc.<br>- codul HEX al culorii, ex. <b>#004523</b><br>- loc liber pentru culoare standard";
				xLang['COLORHELP']				= "Ajutor pentru câmpurile de culori";
				xLang['SHOWORIGREPORT']			= "Afişează raport original (pentru forumuri)";
				xLang['SHOWCELLTYPEINFO']		= "Afişează tip celula/info vale părăsită<br>(mousing over)";
				xLang['WARSIM']					= "Link către simulator luptă<br>";
				xLang['WARSIMOPTION1']			= "Intern (inclus in joc)";
				xLang['WARSIMOPTION2']			= "Extern (pus la dispoziţie de către kirilloid.ru)";
				xLang['WSANALYSER']				= "Utilizează World Analyser";
				xLang['SHOWSTATLINKS']			= "Afişează link-uri către World Anlyser";
				xLang['NONEWVERSION']			= "Ultima versiune disponibilă este instalată";
				xLang['BETAVERSION']			= "Se poate să aveţi o versiune beta instalată";
				xLang['NEWVERSIONAV']			= "O versiune nouă a scriptului este disponibilă";
				xLang['UPDATESCRIPT']			= "Doriţi să actualizaţi acum ?";
				xLang['CHECKUPDATE']			= "Verific existenţa unei versiuni noi...";
				xLang['CROPFINDER']				= "Crop finder";
				xLang['AVPOPPERVIL']			= "Populaţie medie/sat";
				xLang['AVPOPPERPLAYER']			= "Populaţie medie/jucător";
				xLang['SHOWRESUPGRADETABLE']	= "Afişează tabel upgrade câmpuri de resurse";
				xLang['SHOWBUPGTABLE']			= "Afişează tabel upgrade clădiri";
				xLang['CONSOLELOGLEVEL']		= "Log level consolă (DOAR PENTRU PROGRAMATORI)<br>(Standard = 0)";
				xLang['MARKETPRELOAD']			= "Numărul paginilor de oferte pre-încărcate<br>pe pagina 'Târg => Cumpără'<br>(Standard = 1)";
				xLang['CAPITAL']				= 'Numele capitalei<br><b>Deschide Profilul pentru actualizare automată</b>';
				xLang['CAPITALXY']				= 'Coordonatele capitalei<br><b>Deschide Profilul pentru actualizare automată</b>';
				xLang['MAX']					= 'Max';
				xLang['TOTALTROOPSTRAINING']	= 'Total trupe antrenate';
				xLang['SHOWDISTTIMES']			= 'Afişează distanţe şi timpi de deplasare';
				xLang['TBSETUPLINK']			= 'Opţiuni Travian Beyond';
				xLang['UPDATEALLVILLAGES']		= 'Actualizează toate satele.  Utilizează cu maximă atenţie.  Urmarea ar putea fi un cont banat !';
				xLang['SHOWMENUSECTION3']		= "Afişează link-uri adiţionale în meniul din stânga<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
				xLang['LARGEMAP']				= 'Harta mare';
				xLang['SHOWTRAVMAPLINKS']		= 'Afişează link-uri către travmap.shishnet.org<br>(jucători şi alianţe)';
				xLang['USETHEMPR']				= 'Use them (proportional)';
				xLang['USETHEMEQ']				= 'Use them (egal)';
				xLang['TOWNHALL']				= 'Casa de cultură';
				xLang['GAMESERVERTYPE']			= 'Game server';
				xLang['MARKETOFFERS']			= 'Oferte târg';
				xLang['ACCINFO']				= 'Informaţii cont';
				xLang['BOOKMARKOPTIONS']		= 'Link-uri';//identical to xLang['MARCADORES'] => check if this can be removed
				xLang['NOTEBLOCKOPTIONS']		= 'Bloc-notes';
				xLang['MENULEFT']				= 'Meniu stânga';
				xLang['STATISTICS']				= 'Statistici';
				xLang['RESOURCEFIELDS']			= 'Câmpuri resurse';
				xLang['VILLAGECENTER']			= 'Centrul satului';
				xLang['MAPOPTIONS']				= 'Opţiuni hartă';
				xLang['COLOROPTIONS']			= 'Opţiuni culori';
				xLang['DEBUGOPTIONS']			= 'Opţiuni Debug';
				xLang['SHOWBIGICONMARKET']		= 'Târg';
				xLang['SHOWBIGICONMILITARY']	= 'Militar<br>Adunare/Cazarmă/Atelier/Grajd';
				xLang['SHOWBIGICONALLIANCE']	=  xLang['ALLIANCE'];
				xLang['SHOWBIGICONMILITARY2']	= "Casa de cultură/Reşedinţa eroului/Armurărie/Fierărie";
				xLang['HEROSMANSION']			= "Reşedinţa eroului";
				xLang['BLACKSMITH']				= 'Fierărie';
				xLang['ARMOURY']				= 'Armurărie';
				xLang['NOW']					= 'Acum';
				xLang['CLOSE']					= 'Inchide';
				xLang['USE']					= 'Use';
				xLang['USETHEM1H']				= 'Use them (producţia/ora)';
				xLang['OVERVIEW']				= 'Perspectivă';
				xLang['FORUM']					= 'Forum';
				xLang['ATTACKS']				= 'Atacuri';
				xLang['NEWS']					= 'Stiri';
				xLang['ADDCRTPAGE']				= 'Pagina curentă';
				xLang['SCRIPTPRESURL']			= 'Pagina TBeyond';
				xLang['NOOFSCOUTS']				= 'Număr de spioni pentru funcţia<br>"Selectează spioni"';
				xLang['SPACER']					= 'Delimitator';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'Afişează informaţii despre trupe în tooltips';
				xLang['MESREPOPTIONS']			= 'Mesaje & Rapoarte';
				xLang['MESREPPRELOAD']			= 'Numărul paginilor de mesaje/rapoarte pre-încărcate<br>(Standard = 1)';
				xLang['ATTABLES']				= 'Tabele trupe';
				xLang['MTWASTED']				= 'Risipă';
				xLang['MTEXCEED']				= 'Excedent';
				xLang['MTCURRENT']				= 'Transport actual';
				xLang['ALLIANCEFORUMLINK']		= 'Link către forum extern<br>(Forum intern = loc liber)';
				xLang['MTCLEARALL']				= 'Sterge tot';
				xLang['LOCKBOOKMARKS']			= 'Ascunde icoanele pentru "Sterge, în sus , în jos"';
				xLang['MTCLEARALL']				= 'Sterge tot';
				xLang['UNLOCKBOOKMARKS']		= 'Afişează icoanele pentru "Sterge, în sus , în jos"';
				xLang['CLICKSORT']				= 'Click pentru sortare';
				xLang['SAVEGLOBAL']				= 'Valabilă în toate satele';
				xLang['VILLAGELIST']			= 'Lista satelor';
				xLang['SHOWINOUTICONS']			= "Afişează icoanele pentru 'dorf1.php' and 'dorf2.php'";
				xLang['UPDATEPOP']				= 'Actualizează populaţia satelor';
				xLang['SHOWRPRINFOTOOLTIPS']	= 'Afişează distanţe/timpi către sate în tooltips<br />(Adunare & Rapoarte)';
				xLang['EDIT']					= 'Modifică';
				xLang['SHOWMESOPENLINKS']		= 'Afişează icoane pentru a deschide mesajele într-un pop-up';
				xLang['NPCOPTIONS']				= 'Opţiuni NPC Assistant';
				xLang['NPCASSISTANT']			= 'Afişează calcule/link-uri NPC Assistant';
				xLang['SHOWMAPTABLE']			= 'Afişează tabel jucători/sate/oaze ocupate';
				xLang['NEWVILLAGEAV']			= 'Data/Ora';
				xLang['TIMEUNTIL']				= 'Timp de aşteptare';
				xLang['SHOWREPDELTABLE']		= 'Afişează tabela "Sterge toate" pe pagina de rapoarte';
				xLang['SHOWIGMLINKFORME']		= 'Afişează icon-ul "Trimite IGM" şi pentru mine';
				xLang['CENTERMAP']				= 'Centrează harta pe acest sat';
				xLang['SHOWCENTERMAPICON']		= 'Afişează icon-ul "Centrează harta pe acest sat"';
				xLang['INETGPOPTION']			= 'Internet Graphic Pack';
				xLang['ALLOWINETGP']			= 'Permite Internet Graphic Packs';
				xLang['SENDTROOPS']				= 'Trimite trupe';
				xLang['SHOWBRSTATDETAILS']		= 'Show details in Report Statistics';
				xLang['SHOWBIGICONMISC']		= "Palat/Vila/Academie/Trezorerie";
				xLang['PALACE']					= "Palat";
				xLang['RESIDENCE']				= "Vila";
				xLang['ACADEMY']				= "Academie";
				xLang['TREASURY']				= "Trezorerie";
				xLang['SHOWBBLINK']				= "Nivelul clădirilor aflate in construcţie clipeşte";
				xLang['SHOWSENDTROOPSRESOURCES']= "Afişează icoanele 'Trimite trupe/Trimite resurse' în lista satelor";
				break;
			case "es":
			case "ar":
			case "cl":
			case "mx":
				// by Leonel (aka Phob0z)
				xLang['ALLIANCE']				= 'Alianza';
				xLang['SIM']					= 'Simulador de combate';
				xLang['AREYOUSURE']				= "\u00bfEst\u00e1s seguro?";
				xLang['LOSS']					= 'P&eacute;rdidas';
				xLang['PROFIT']					= 'Ganancias';
				xLang['EXTAVAILABLE']			= 'Subir nivel';
				xLang['PLAYER']					= 'Jugador';
				xLang['VILLAGE']				= 'Aldea';
				xLang['POPULATION']				= 'Poblaci&oacute;n';
				xLang['COORDS']					= 'Coordenadas';
				xLang['MAPTABLEACTIONS']		= 'Acciones';
				xLang['SAVED']					= 'Guardado';
				xLang['YOUNEED']				= 'Te falta';
				xLang['TODAY']					= 'hoy';
				xLang['TOMORROW']				= 'ma&ntilde;ana';
				xLang['PAS_MANYANA']			= 'pasado ma&ntilde;ana';
				xLang['MARKET']					= 'Mercado';
				xLang['BARRACKS']				= 'Cuartel';
				xLang['RALLYPOINT']				= 'Plaza de reuniones';
				xLang['STABLE']					= 'Establo';
				xLang['WORKSHOP']				= 'Taller';
				xLang['ENVIAR']					= 'Enviar recursos';
				xLang['COMPRAR']				= 'Comprar';
				xLang['VENDER']					= 'Vender';
				xLang['SENDIGM']				= 'Enviar IGM';
				xLang['LISTO']					= 'Listo';
				xLang['ON']						= 'el';
				xLang['A_LAS']					= 'a las';
				xLang['EFICIENCIA']				= 'Eficiencia';
				xLang['NEVER']					= 'Nunca';
				xLang['ALDEAS']					= 'Aldea(s)';
				xLang['TIEMPO']					= 'Tiempo';
				xLang['OFREZCO']				= 'Ofrezco';
				xLang['BUSCO']					= 'Busco';
				xLang['TIPO']					= 'Tipo';
				xLang['DISPONIBLE']				= 'Solo disponible';
				xLang['CUALQUIERA']				= 'Cualquiera';
				xLang['YES']					= 'Si';
				xLang['NO']						= 'No';
				xLang['LOGIN']               	= 'Ingresar';
				xLang['MARCADORES']				= 'Marcadores';
				xLang['ANYADIR']				= 'A\u00f1adir';
				xLang['ENLACE']					= 'URL del nuevo Marcador';
				xLang['TEXTO']					= 'Nombre del nuevo Marcador';
				xLang['ELIMINAR']				= 'Eliminar';
				xLang['MAPA']					= 'Mapa';
				xLang['MAXTIME']				= 'Tiempo m&aacute;ximo';
				xLang['ARCHIVE']				= 'Archivar';
				xLang['RESUMEN']				= 'Resumen';
				xLang['TROPAS']					= 'Tropas';
				xLang['CHECKVERSION']			= 'Actualizar TBeyond';
				xLang['ACTUALIZAR']				= 'Actualizar informaci&oacute;n de aldea';
				xLang['VENTAS']					= 'Guardar ofertas';
				xLang['MAPSCAN']				= 'Escanear el Mapa';
				xLang['BIGICONS']				= 'Mostrar iconos de acceso r&aacute;pido';
				xLang['NOTEBLOCK']				= 'Mostrar hoja de notas';
				xLang['SAVE']					= 'Guardar';
				xLang['RPDEFACT']				= 'Opci&oacute;n por defecto cuando se mandan tropas';
				xLang['ATTACKTYPE2']			= 'Refuerzos';
				xLang['ATTACKTYPE3']			= 'Ataque: Normal';
				xLang['ATTACKTYPE4']			= 'Ataque: Asalto';
				xLang['NBSIZE']					= 'Tama&ntilde;o de la hoja de notas';
				xLang['NBSIZEAUTO']             = 'Autom\u00e1tico';
				xLang['NBSIZENORMAL']			= 'Normal';
				xLang['NBSIZEBIG']				= 'Grande';
				xLang['NBHEIGHT']				= 'Altura de la hoja de notas';
				xLang['NBAUTOEXPANDHEIGHT']     = 'Expandir altura autom\u00e1ticamente';
				xLang['NBKEEPHEIGHT']			= 'Altura por defecto';
				xLang['SHOWCENTERNUMBERS']		= 'Mostrar el nivel de las construcciones en el centro de la aldea';
				xLang['NPCSAVETIME']			= 'Tiempo ahorrado: ';
				xLang['SHOWCOLORRESLEVELS']		= 'Mostrar colores en el nivel de los recursos';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Mostrar colores en el nivel de las construcciones';
				xLang['CNCOLORNEUTRAL']			= 'Color para las actualizaciones disponibles';
				xLang['CNCOLORMAXLEVEL']		= 'Color para los niveles m&aacute;ximos';
				xLang['CNCOLORNOUPGRADE']		= 'Color para las actualizaciones no disponibles';
				xLang['CNCOLORNPCUPGRADE']		= 'Color para actualizar por medio de NPC';
				xLang['TOTALTROOPS']			= 'Tropas totales de la aldea';
				xLang['SHOWBOOKMARKS']			= 'Mostrar marcadores';
				xLang['RACECRTV2']				= 'Raza';
				xLang['SERVERVERSION2']			= "Servidor Travian v2.x?";
				xLang['SELECTALLTROOPS']		= "Seleccionar todas las tropas";
				xLang['PARTY']					= "Fiesta";
				xLang['CPPERDAY']               = "PC/d\u00eda";
				xLang['SLOT']					= "Espacios disp.";
				xLang['TOTAL']					= "Total";
				xLang['NOPALACERESIDENCE']		= "La residencia, el palacio o el centro de la aldea de esta aldea no han sido abiertos a\u00fan!";
				xLang['SELECTSCOUT']			= "Seleccionar esp&iacute;as";
				xLang['SELECTFAKE']				= "Seleccionar unidad para fake";
				xLang['NOSCOUT2FAKE']			= "No es posible usar esp\u00edas para un fake!";
				xLang['NOTROOP2FAKE']			= "No hay tropas para usar como fake!";
				xLang['NOTROOP2SCOUT']			= "No hay esp\u00edas!";
				xLang['NOTROOPS']				= "No hay tropas en la aldea!";
				xLang['ALL']					= "Todo";
				xLang['NORACE']					= "Construye o abre el cuartel o centro de la aldea para determinar tu raza autom&aacute;ticamente";
				xLang['COLORHELPTEXT']			= "En los campos para escribir en el color, puedes poner:<br>- <b>green</b> o <b>red</b> o <b>orange</b>, etc.<br>- El c&oacute;digo Hexadecimal del color.<br>- D&eacute;jalo vac&iacute;o para usar el color por defecto";
				xLang['COLORHELP']				= "Ayuda para los campos de poner color";
				xLang['SHOWORIGREPORT']			= "Mostrar reporte original (para poner en foros)";
				xLang['SHOWCELLTYPEINFO']		= "Mostrar el tipo de casilla al ponerle el cursor encima";
				xLang['WARSIM']					= "&iquest;Qu&eacute; simulador de combate usar?:<br>(men&uacute; izquierdo)";
				xLang['WARSIMOPTION1']			= "Interno (el que trae travian por defecto)";
				xLang['WARSIMOPTION2']			= "Externo (kirilloid.ru)";
				xLang['WSANALYSER']				= "&iquest;Qu&eacute; analizador usar para las estad&iacute;sticas?";
				xLang['SHOWSTATLINKS']			= "Mostrar enlaces del analizador de estadisticas<br>(icono del mundo al lado de usuarios/alianzas)";
				xLang['NONEWVERSION']           = "Tiene la \u00faltima versi\u00f3n disponible";
				xLang['BETAVERSION']			= "Tal ves tengas una versi\u00f3n beta";
				xLang['NEWVERSIONAV']			= "Hay una nueva versi\u00f3n del script disponible";
				xLang['UPDATESCRIPT']			= "Actualizar el script?";
				xLang['CHECKUPDATE']			= "Buscando nuevas versiones del script. Por favor espera...";
				xLang['CROPFINDER']				= "Buscador de 9c/15c";
				xLang['AVPOPPERVIL']			= "Poblaci&oacute;n promedio por aldea";
				xLang['AVPOPPERPLAYER']			= "Poblaci&oacute;n promedio por jugador";
				xLang['SHOWRESUPGRADETABLE']	= "Mostrar la tabla de actualizaci&oacute;n de los recursos";
				xLang['SHOWBUPGTABLE']			= "Mostrar la tabla de actualizaci&oacute;n de las construcciones";
				xLang['CONSOLELOGLEVEL']		= "Nivel de Registro de la Consola<br>SOLO PARA PROGRAMADORES O DEPURACI&Oacute;N<br>(Valor por defecto = 1)";
				xLang['MARKETPRELOAD']			= "P&aacute;ginas mostradas en la secci&oacute;n 'Comprar' del mercado<br>(Valor por defecto = 1)";
				xLang['CAPITAL']				= 'Nombre de tu capital<br><b>Revisa tu perfil para actualizarla</b>';
				xLang['CAPITALXY']				= 'Coordenadas de tu capital<br><b>Revisa tu perfil para actualizarla</b>';
				xLang['MAX']					= 'Max.';
				xLang['TOTALTROOPSTRAINING']	= 'Tropas totales que se estan creando';
				xLang['SHOWDISTTIMES']			= 'Mostrar distancias y tiempos en tooltips';
				xLang['TBSETUPLINK']			= 'Config. de TBeyond';
				xLang['UPDATEALLVILLAGES']		= 'Actualizar todas las aldeas. USAR CON MUCHO CUIDADO, PUEDE LLEVAR A QUE BORREN TU CUENTA!';
				xLang['SHOWMENUSECTION3']		= "Mostrar enlaces adicionales en el menu de la izquierda<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
				xLang['LARGEMAP']				= 'Mapa grande';
				xLang['SHOWTRAVMAPLINKS']		= 'Mostrar enlaces del travmap.shishnet.org<br>(icono con puntitos al lado de usuarios/alianzas)';
				xLang['USETHEMPR']				= 'Llenar proporcionalmente a la cantidad de cada recurso que hay en los almacenes';
				xLang['USETHEMEQ']				= 'Llenar con la misma cantidad de cada recurso';
				xLang['TOWNHALL']				= 'Ayuntamiento';
				xLang['GAMESERVERTYPE']			= 'Versi&oacute;n del servidor';
				xLang['MARKETOFFERS']			= 'Ofertas del mercado';
				xLang['ACCINFO']                = 'Informaci\u00f3n de la Cuenta';
				xLang['BOOKMARKOPTIONS']		= xLang['MARCADORES'];
				xLang['NOTEBLOCKOPTIONS']		= 'Hoja de notas';
				xLang['MENULEFT']				= 'Men&uacute; en el lado izquierdo';
				xLang['STATISTICS']				= 'Estad&iacute;sticas';
				xLang['RESOURCEFIELDS']			= 'Campos de recursos';
				xLang['VILLAGECENTER']			= 'Centro de la aldea';
				xLang['MAPOPTIONS']				= 'Opciones del Mapa';
				xLang['COLOROPTIONS']			= 'Opciones de color';
				xLang['DEBUGOPTIONS']			= 'Opciones de depuraci&oacute;n (DEBUG)';
				xLang['SHOWBIGICONMARKET']		= 'Mercado';
				xLang['SHOWBIGICONMILITARY']	= 'Plaza de reuniones/Cuartel/Taller/Establo';
				xLang['SHOWBIGICONALLIANCE']	= xLang['ALLIANCE'];
				xLang['SHOWBIGICONMILITARY2']	= "Ayuntamiento/Hogar del H&eacute;roe/Armer&iacute;a/Herrer&iacute;a";
				xLang['HEROSMANSION']			= "Hogar del H&eacute;roe";
				xLang['BLACKSMITH']				= 'Armer&iacute;a';
				xLang['ARMOURY']				= 'Herrer&iacute;a';
				xLang['NOW']					= 'Ahora';
				xLang['CLOSE']					= 'Cerrar';
				xLang['USE']					= 'Usar';
				xLang['USETHEM1H']				= 'Llenar con 1 hora de producci&oacute;n de esta aldea';
				xLang['OVERVIEW']				= 'Resumen';
				xLang['FORUM']					= 'Foro';
				xLang['ATTACKS']				= 'Ataques';
				xLang['NEWS']					= 'Noticias';
				xLang['ADDCRTPAGE']				= 'A\u00f1adir Pag. Actual';
				xLang['SCRIPTPRESURL']			= 'P&aacute;gina de TBeyond';
				xLang['NOOFSCOUTS']				= 'N° de esp&iacute;as para selecionar por defecto en "Seleccionar espías"';
				xLang['SPACER']					= 'Separador';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'Mostrar informaci&oacute;n de tropas en tooltips';
				xLang['MESREPOPTIONS']			= 'Mensajes y Reportes';
				xLang['MESREPPRELOAD']			= 'N&uacute;mero de pag&iacute;nas de mensajes/reportes precargadas<br>(Valor por defecto = 1)';
				xLang['ATTABLES']				= 'Tabla de tropas';
				xLang['MTWASTED']				= 'Disponible';
				xLang['MTEXCEED']				= 'Excedido';
				xLang['MTCURRENT']				= 'Carga actual';
				xLang['ALLIANCEFORUMLINK']		= 'V&iacute;nculo a foro externo<br>(Dejar en blanco para foro interno)';
				xLang['LOCKBOOKMARKS']			= 'Bloquear marcadores<br>(Ocultar iconos de eliminar, subir, bajar)';
				xLang['MTCLEARALL']				= 'Limpiar todo';
				xLang['UNLOCKBOOKMARKS']		= 'Desbloquear marcadores<br>(Mostrar iconos de eliminar, subir, bajar)';
				xLang['CLICKSORT']				= 'Haga clic para ordenar';
				xLang['MIN']					= 'Min';
				xLang['SAVEGLOBAL']				= "Compartir entre las aldeas";
				xLang['VILLAGELIST']			= 'Lista de Aldeas';
				xLang['SHOWINOUTICONS']			= "Mostrar enlaces 'dorf1.php' y 'dorf2.php'";
				xLang['UPDATEPOP']				= 'Actualizar habitantes';
				xLang['SHOWRPRINFOTOOLTIPS']	= 'Mostrar tiempos y distancias a aldeas en tooltips<br>(Plaza de reuniones & Informes)';
				xLang['EDIT']					= 'Editar';
				xLang['SHOWMESOPENLINKS']		= 'Mostrar enlaces para abrir mensajes en ventana emergente';
				xLang['SHOWMAPTABLE']			= 'Mostrar tabla de Jugadores/Aldeas/Oasis ocupados';
				xLang['NEWVILLAGEAV']			= 'Fecha/Hora';
				xLang['TIMEUNTIL']				= 'Tiempo a esperar';
				xLang['SHOWREPDELTABLE']		= 'Mostrar la tabla "Borrar todo" en la p\u00e1gina de Informes';
				xLang['SHOWIGMLINKFORME']		= 'Mostrar \u00edcono "Enviar IGM" tambi\u00e9n para mi';
				xLang['CENTERMAP']				= 'Centrar mapa sobre esta aldea';
				xLang['SHOWCENTERMAPICON']		= 'Mostrar \u00edcono "Centrar mapa sobre esta aldea"';
				xLang['SENDTROOPS']				= 'Enviar tropas';
				xLang['SHOWBRSTATDETAILS']		= 'Mostrar detalles en Inf\u00f3rmes Estad\u00edsticos';
				xLang['SHOWBIGICONMISC']		= "Palacio/Residencia/Academia/Tesoro";
				xLang['PALACE']					= "Palacio";
				xLang['RESIDENCE']				= "Residencia";
				xLang['ACADEMY']				= "Academia";
				xLang['TREASURY']				= "Tesoro";
				xLang['SHOWBBLINK']				= "Mostrar nivel parpadeando en los edificios que est\u00e1n siendo ampliados";
				xLang['SHOWSENDTROOPSRESOURCES']= "Mostrar \u00edcono 'Enviar tropas/Enviar recursos' en lista de aldeas";
				break;
			case "fr":
				// by fr3nchlover . We appreciate his work and are grateful ! THANK YOU !!!)
				xLang['SIM']					= 'Simulateur';
				xLang['AREYOUSURE']				= 'Es-tu certain ?';
				xLang['LOSS']					= 'Pertes en mat&eacute;riels';
				xLang['PROFIT']					= 'Rentabilit&eacute;';
				xLang['EXTAVAILABLE']			= 'Tu peux d&eacute;j&agrave; augmenter son niveau';
				xLang['PLAYER']					= 'Joueur';
				xLang['POPULATION']				= 'Population';
				xLang['COORDS']					= 'Coordonn&eacute;es';
				xLang['SAVED']					= 'Sauvegarde';
				xLang['YOUNEED']				= 'Il manque';
				xLang['TODAY']					= 'aujourd\'hui';
				xLang['TOMORROW']				= 'demain';
				xLang['PAS_MANYANA']			= 'apr&egrave;s-demain';
				xLang['MARKET']					= 'Place du march&eacute;';
				xLang['BARRACKS']				= 'Caserne';
				xLang['RALLYPOINT']				= 'Place de rassemblement';
				xLang['STABLE']					= 'Ecurie';
				xLang['WORKSHOP']				= 'Atelier';
				xLang['ENVIAR']					= 'Envoyer des ressources';
				xLang['COMPRAR']				= 'Acheter des ressources';
				xLang['VENDER']					= 'Vendre des ressources';
				xLang['SENDIGM']				= 'Envoyer MSG';
				xLang['LISTO']					= 'Pr&ecirc;t';
				xLang['ON']						= 'le';
				xLang['A_LAS']					= '&agrave;';
				xLang['EFICIENCIA']				= 'Efficacit&eacute;';
				xLang['NEVER']					= 'Jamais';
				xLang['TIEMPO']					= 'Temps';
				xLang['OFREZCO']				= 'Offre';
				xLang['BUSCO']					= 'Recherche';
				xLang['DISPONIBLE']				= 'Disponible';
				xLang['CUALQUIERA']				= 'Toutes';
				xLang['YES']					= 'Oui';
				xLang['NO']						= 'Non';
				xLang['MARCADORES']				= 'Liens';
				xLang['ANYADIR']				= 'Ajouter';
				xLang['ENLACE']					= 'URL du nouveau lien';
				xLang['TEXTO']					= 'Texte du nouveau lien';
				xLang['ELIMINAR']				= 'Supprimer';
				xLang['MAPA']					= 'Carte';
				xLang['MAXTIME']				= 'Temps maximum';
				xLang['RESUMEN']				= 'R&eacute;sum&eacute;';
				xLang['TROPAS']					= 'Troupes';
				xLang['CHECKVERSION']			= 'M&agrave;J TBeyond';
				xLang['ACTUALIZAR']				= 'Mise a jour informations village';
				xLang['VENTAS']					= 'Param&egrave;tres Vente';
				xLang['MAPSCAN']				= 'Analyse de la carte - ATTENTION NE PAS UTILISER- RISQUE BLOCAGE OP !';
				xLang['BIGICONS']				= 'Afficher les icones &eacute;tendues';
				xLang['NOTEBLOCK']				= 'Afficher le bloc-notes';
				xLang['SAVE']					= 'Sauver';
				xLang['RPDEFACT']				= 'Action par d&eacute;faut sur place de rassemblement';
				xLang['ATTACKTYPE2']			= 'Assistance';
				xLang['ATTACKTYPE3']			= 'Attaque: Normal';
				xLang['ATTACKTYPE4']			= 'Attaque: Pillage';
				xLang['NBSIZE']					= 'Taille Bloc-notes';
				xLang['NBSIZENORMAL']			= 'Normal';
				xLang['NBSIZEBIG']				= 'Large';
				xLang['NBHEIGHT']				= 'Hauteur Bloc-notes';
				xLang['NBAUTOEXPANDHEIGHT']		= 'Hauteur Auto';
				xLang['NBKEEPHEIGHT']			= 'Hauteur par défaut';
				xLang['SHOWCENTERNUMBERS']		= 'Afficher nombres';
				xLang['NPCSAVETIME']			= 'Sauver : ';
				xLang['SHOWCOLORRESLEVELS']		= 'Afficher les ressources en couleur';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Afficher les batiments en couleur';
				xLang['CNCOLORNEUTRAL']			= 'Couleur pour Construction possible<br>(Vide =    couleur par d&eacute;faut)';
				xLang['CNCOLORMAXLEVEL']		= "Couleur pour 'Niveau max'<br>(Vide = couleur    par d&eacute;faut)";
				xLang['CNCOLORNOUPGRADE']		= "Couleur pour 'Construction impossible'<br>(Vide = couleur par d&eacute;faut)";
				xLang['CNCOLORNPCUPGRADE']		= "Couleur pour 'Construction avec NPC'<br>(Vide = d&eacute;faut)";
				xLang['TOTALTROOPS']			= 'Troupes totales du village';
				xLang['SHOWBOOKMARKS']			= 'Afficher les liens favoris';
				xLang['RACECRTV2']				= 'Peuple';
				xLang['SERVERVERSION2']			= "Serveur Travian v2.x";
				xLang['SELECTALLTROOPS']		= "Tout s&eacute;lectionner";
				xLang['PARTY']					= "Festivit&eacute;s";
				xLang['CPPERDAY']				= "PC/jour";
				xLang['NOPALACERESIDENCE']		= "Pas de r&eacute;sidence ou palais sur ce village !";
				xLang['SELECTSCOUT']			= "Eclaireur";
				xLang['SELECTFAKE']				= "Diversion";
				xLang['NOSCOUT2FAKE']			= "Un Eclaireur ne peut pas faire diversion  !";
				xLang['NOTROOP2FAKE']			= "Pas de troupes pour une diversion !";
				xLang['NOTROOP2SCOUT']			= "Pas de troupes pour partir en reconnaissance !";
				xLang['NOTROOPS']				= "Pas de troupes dans le village !";
				xLang['ALL']					= "Tout";
				xLang['NORACE']					= "Construire caserne pour d&eacute;terminer le peuple    et/ou ouvrir le centre du village...";
				xLang['COLORHELPTEXT']			= "Dans case 'Couleur' vous pouvez saisir :<br>-<b>red</b> ou  <b>orange</b>, etc.<br>- ou une couleur HEX exple :<b>#004523</b><br>- Laisser vide pour couleur par d&eacute;faut";
				xLang['COLORHELP']				= "Aide pour cases couleur";
				xLang['SHOWORIGREPORT']			= "Rapport original (A cocher obligatoirement avant diffusion du RC)";
				xLang['SHOWCELLTYPEINFO']		= "Affiche le type de case (sur carte) <br>lorsque le curseur passe dessus";
				xLang['WARSIM']					= "Simulateur de combat &agrave; utiliser :<br>(menu    gauche)";
				xLang['WARSIMOPTION1']			= "Interne (celui du jeu)";
				xLang['WARSIMOPTION2']			= "Externe (fourni par kirilloid.ru)";
				xLang['WSANALYSER']				= "Analyseur &agrave; utiliser ";
				xLang['SHOWSTATLINKS']			= "Afficher liens Analyseur";
				xLang['NONEWVERSION']			= "Pas de mise à jour disponible";
				xLang['BETAVERSION']			= "Tu as une version Beta du script (supérieure à version officielle) - Mise à jour impossible";
				xLang['NEWVERSIONAV']			= "Une nouvelle version du script est disponible";
				xLang['UPDATESCRIPT']			= "Mettre à jour le script ?";
				xLang['CHECKUPDATE']			= "Recherche de nouvelle version du script. Veuillez patienter...";
				xLang['CROPFINDER']				= "Recherche 15C";
				xLang['AVPOPPERVIL']			= "Population moyenne par village";
				xLang['AVPOPPERPLAYER']			= "Population moyenne par joueur";
				xLang['SHOWRESUPGRADETABLE']	= "Afficher tableau sur page ressources";
				xLang['SHOWBUPGTABLE']			= "Afficher tableau sur page batiments";
				xLang['CONSOLELOGLEVEL']		= "Console Log - R&Eacute;SERV&Eacute; aux DEVELOPPEURS et DEBUGGEURS<br>(D&eacute;faut = 0 ou laisser Vide)";
				xLang['MARKETPRELOAD']			= "Nombre de pages des offres march&eacute; ('March&eacute; => Offre') <br> &agrave; charger/consulter (D&eacute;faut = 1)";
				xLang['CAPITAL']				= 'Nom de la Capitale';
				xLang['CAPITALXY']				='Coordonnées de la Capitale';
				xLang['TOTALTROOPSTRAINING']	= 'Total troupes en fabrication ';
				xLang['SHOWDISTTIMES']			= 'Afficher distance & temps';
				xLang['TBSETUPLINK']			= 'Travian Beyond Setup';
				xLang['UPDATEALLVILLAGES']		= 'Actualiser tous les villages.  ATTENTION : NE PAS UTILISER - RISQUE BLOCAGE OP. !';
				xLang['SHOWMENUSECTION3']		= "Ajouter liens dans menu gauche<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
				xLang['LARGEMAP']				= 'Carte &eacute;tendue';
				xLang['SHOWTRAVMAPLINKS']		= 'Afficher lien vers Travmap<br>(joueur et alliance)';
				xLang['USETHEMPR']				= 'Calculer (proportionnel)';
				xLang['USETHEMEQ']				= 'Calculer (&eacute;galit&eacute;)';
				xLang['TOWNHALL']				= 'Hotel de ville';
				xLang['GAMESERVERTYPE']			= 'Type de serveur';
				xLang['MARKETOFFERS']			= 'Offres march&eacute;';
				xLang['ACCINFO']				= 'Données personnelles';
				xLang['BOOKMARKOPTIONS']		= 'Liens';
				xLang['NOTEBLOCKOPTIONS']		= 'Bloc-notes';
				xLang['MENULEFT']				= 'Menu &agrave; gauche';
				xLang['STATISTICS']				= 'Statistiques';
				xLang['RESOURCEFIELDS']			= 'Vue globale';
				xLang['VILLAGECENTER']			= 'Centre village';
				xLang['MAPOPTIONS']				= 'options Carte';
				xLang['COLOROPTIONS']			= 'options Couleur';
				xLang['DEBUGOPTIONS']			= 'options Debug';
				xLang['SHOWBIGICONMARKET']		= 'March&eacute;';
				xLang['SHOWBIGICONMILITARY']	= 'Militaire<br>Rassemblement/Caserne/Atelier/Etable';
				xLang['SHOWBIGICONALLIANCE']	= 'Alliance';
				xLang['SHOWBIGICONMILITARY2']	= "Hotel de ville/Manoir h&eacute;ros/Armurerie/Usine";
				xLang['HEROSMANSION']			= "Manoir H&eacute;ros";
				xLang['BLACKSMITH']				= "Armurerie";
				xLang['ARMOURY']				= "Usine armure";
				xLang['NOW']					= 'Maintenant';
				xLang['CLOSE']					= 'Fermer';
				xLang['USE']					= 'Utiliser';
				xLang['USETHEM1H']				= 'Calculer 1h de Prod.';
				xLang['OVERVIEW']				= 'Vue globale';
				xLang['FORUM']					= 'Forum';
				xLang['ATTACKS']				= 'Attaques';
				xLang['NEWS']					= 'Nouvelles';
				xLang['ADDCRTPAGE']				= 'Marquer cette page';
				xLang['SCRIPTPRESURL']			= 'Page TBeyond';
				xLang['NOOFSCOUTS']				= 'Nb. d\'&eacute;claireurs lors du clic sur "Eclaireur"';
				xLang['SPACER']					= 'S&eacute;parateur';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'Afficher info troupes dans info-bulle';
				xLang['MESREPOPTIONS']			= 'Messages & Rapports';
				xLang['MESREPPRELOAD']			= 'Nb. de pages message/rapport &agrave; charger<br>(D&eacute;faut = 1)';
				xLang['ATTABLES']				= 'Liste troupes';
				xLang['MTWASTED']				= 'Non utilis&eacute;';
				xLang['MTEXCEED']				= 'En trop';
				xLang['MTCURRENT']				= 'Transport&eacute;';
				xLang['ALLIANCEFORUMLINK']		= 'Lien vers forum externe<br>(Laisser vide pour forum interne)';
				xLang['LOCKBOOKMARKS']			= 'Verrouiller <br>(Cache icones pour g&eacute;rer les liens)';
				xLang['MTCLEARALL']				= 'Tout effacer';
				xLang['UNLOCKBOOKMARKS']		= 'D&eacute;verrouiller<br>(Affiche icones pour g&eacute;rer les liens)';
				xLang['CLICKSORT']				= 'Cliquer pour trier';
				xLang['SAVEGLOBAL']				= 'Sauver pour tous';
				xLang['VILLAGELIST']			= 'Liste des Villages';
				xLang['SHOWINOUTICONS']			= "Afficher liens 'Global' et 'Centre' sur liste des Villages";
				xLang['UPDATEPOP']				= 'MaJ pop.';
				xLang['SHOWRPRINFOTOOLTIPS']	= 'Afficher distance temps dans info bulle<br>(Rassemblement & Rapports)';
				xLang['EDIT']					= 'Editer';
				xLang['SHOWMESOPENLINKS']		= 'Afficher lien vers message en popup';
				xLang['NPCOPTIONS']				= 'Options assistant NPC';
				xLang['NPCASSISTANT']			= 'Afficher options NPC Assistant';
				xLang['SHOWMAPTABLE']			= 'Afficher tableau joueurs/villages/oasis';
				xLang['NEWVILLAGEAV']			= 'Date/Heure';
				xLang['TIMEUNTIL']				= 'Temps d attente';
				xLang['SHOWREPDELTABLE']		= 'Afficher "Tout supprimer" dans page de rapports';
				xLang['SHOWIGMLINKFORME']		= 'Afficher icone "Envoi message" pour moi aussi';
				xLang['CENTERMAP']				= 'Centrer la carte sur ce village';
				xLang['SHOWCENTERMAPICON']		= 'Afficher l icone "Centrer sur ce village"';
				xLang['ALLOWINETGP']			= 'Permettre packs graphiques Internet';
				xLang['SENDTROOPS']				= 'Envoyer troupes';
				xLang['SHOWBRSTATDETAILS']		= 'Afficher detail Statistiques dans rapport';
				xLang['SHOWBIGICONMISC']		= "Palais/Residence/Academie/Tresor";
				xLang['PALACE']					= "Palais";
				xLang['RESIDENCE']				= "Residence";
				xLang['ACADEMY']				= "Academie";
				xLang['TREASURY']				= "Tresor";
				xLang['SHOWBBLINK']				= "Afficher niveau clignotant sur batiment constructible";
				break;
			case "nl":
				// Por autor anonimo & Boeruh & TforAgree
				xLang['ALLIANCE']				= 'Alliantie';
				xLang['SIM']					= 'Gevecht simulator';
				xLang['AREYOUSURE']				= 'Weet je het zeker?';
				xLang['LOSS']					= 'Verlies';
				xLang['PROFIT']					= 'Winst';
				xLang['EXTAVAILABLE']			= 'Uitbreiding beschikbaar';
				xLang['PLAYER']					= 'Speler';
				xLang['VILLAGE']				= 'Dorp';
				xLang['POPULATION']				= 'Populatie';
				xLang['COORDS']					= 'Co&ouml;rd';
				xLang['MAPTABLEACTIONS']		= 'Acties';
				xLang['SAVED']					= 'Bewaard';
				xLang['YOUNEED']				= 'Nog nodig';
				xLang['TODAY']					= 'vandaag';
				xLang['TOMORROW']				= 'morgen';
				xLang['PAS_MANYANA']			= 'overmorgen';
				xLang['MARKET']					= 'Marktplaats';
				xLang['BARRACKS']				= 'Barakken';
				xLang['RALLYPOINT']				= 'Verzamelpunt';
				xLang['STABLE']					= 'Stal';
				xLang['WORKSHOP']				= 'Werkplaats';
				xLang['ENVIAR']					= 'Stuur grondstoffen';
				xLang['COMPRAR']				= 'Koop';
				xLang['VENDER']					= 'Verkoop';
				xLang['SENDIGM']				= 'Stuur IGM';
				xLang['LISTO']					= 'Uitbreiding beschikbaar';
				xLang['ON']						= 'om';
				xLang['A_LAS']					= 'om';
				xLang['EFICIENCIA']				= 'Effici&euml;ntie';
				xLang['NEVER']					= 'Nooit';
				xLang['ALDEAS']					= 'Dorp(en)';
				xLang['TIEMPO']					= 'Tijd';
				xLang['OFREZCO']				= 'Bieden';
				xLang['BUSCO']					= 'Zoeken';
				xLang['TIPO']					= 'Type';
				xLang['DISPONIBLE']				= 'Alleen beschikbaar';
				xLang['CUALQUIERA']				= 'Elke';
				xLang['YES']					= 'Ja';
				xLang['NO']						= 'Nee';
				xLang['LOGIN']					= 'Login';
				xLang['MARCADORES']				= 'Links';
				xLang['ANYADIR']				= 'Toevoegen';
				xLang['ENLACE']					= 'Nieuwe link URL';
				xLang['TEXTO']					= 'Nieuwe link Text';
				xLang['ELIMINAR']				= 'Verwijder';
				xLang['MAPA']					= 'Map';
				xLang['MAXTIME']				= 'Max. tijd';
				xLang['ARCHIVE']				= 'Archiveer';
				xLang['RESUMEN']				= 'Samenvatting';
				xLang['TROPAS']					= 'Troepen';
				xLang['CHECKVERSION']			= 'Update TBeyond';
				xLang['ACTUALIZAR']				= 'Update dorp informatie';
				xLang['VENTAS']					= 'Opgeslagen verkopen';
				xLang['MAPSCAN']				= 'Scan de map';
				xLang['BIGICONS']				= 'Uitgebreide iconen zichtbaar';
				xLang['SAVE']					= 'Opslaan';
				xLang['RPDEFACT']				= 'Verzamelplaats standaard aktie';
				xLang['ATTACKTYPE2']			= 'Versterking';
				xLang['ATTACKTYPE3']			= 'Aanval';
				xLang['ATTACKTYPE4']			= 'Overval';
				xLang['NOTEBLOCK']				= 'Kladblok zichtbaar';
				xLang['NBSIZE']					= 'Kladblok grote';
				xLang['NBSIZEAUTO']				= 'Auto';
				xLang['NBSIZENORMAL']			= 'Normaal (klein)';
				xLang['NBSIZEBIG']				= 'Groot';
				xLang['NBHEIGHT']				= 'Kladblok hoogte';
				xLang['NBAUTOEXPANDHEIGHT']		= 'Automatisch groter maken';
				xLang['NBKEEPHEIGHT']			= 'Standaard hoogte';
				xLang['SHOWCENTERNUMBERS']		= 'Dorp nummers weergeven';
				xLang['NPCSAVETIME']			= 'Bespaar: ';
				xLang['SHOWCOLORRESLEVELS']		= 'Grondstof kleur niveau weergeven';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Gebouwen kleur niveau weergeven';
				xLang['CNCOLORNEUTRAL']			= 'Kleur voor uitbreidbaar<br>(Standaard leeg)';
				xLang['CNCOLORMAXLEVEL']		= 'Kleur max level<br>(Standaard leeg)';
				xLang['CNCOLORNOUPGRADE']		= 'Kleur niet uitbreidbaar<br>(Standaard leeg)';
				xLang['CNCOLORNPCUPGRADE']		= 'Kleur uitbreidbaar via NPC<br>(Standaard leeg)';
				xLang['TOTALTROOPS']			= 'Totaal dorp troepen';
				xLang['SHOWDISTANCES']			= 'Afstand weergeven';
				xLang['SHOWBOOKMARKS']			= 'Links laten zien';
				xLang['RACECRTV2']				= 'Ras';
				xLang['SERVERVERSION2']			= "Travian v2.x server";
				xLang['SELECTALLTROOPS']		= "Selecteer alle troepen";
				xLang['PARTY']					= "Feest";
				xLang['CPPERDAY']				= "CP/dag";
				xLang['SLOT']					= "Slot";
				xLang['TOTAL']					= "Totaal";
				xLang['NOPALACERESIDENCE']		= "Geen resedentie of paleis in dit dorp of drop centrum nog niet open!";
				xLang['SELECTSCOUT']			= "Selecteer verkenners";
				xLang['SELECTFAKE']				= "Selecteer fake";
				xLang['NOSCOUT2FAKE']			= "Je kunt geen verkenners gebruiken voor een nep aanval";
				xLang['NOTROOP2FAKE']			= "Er zijn geen troepen voor een nep aanval";
				xLang['NOTROOP2SCOUT']			= "Er zijn geen troepen om te verkennen";
				xLang['NOTROOPS']				= "Geen troepen in dit dorp";
				xLang['ALL']					= "Alles";
				xLang['NORACE']					= "Bouw een barak om je ras vast te stellen.";
				xLang['COLORHELPTEXT']			= "In de kleur velen mag je invullen:<br>- <b>green</b>, <b>red</b> or <b>orange</b>, etc.<br>- de HEX kleur code zoals <b>#004523</b><br>- leeg laten voor standaard kleur";
				xLang['COLORHELP']				= "Help voor kleur velden";
				xLang['SHOWORIGREPORT']			= "Laat orgineel bericht zien (voor verzenden)";
				xLang['SHOWCELLTYPEINFO']		= "Laat veld type/oase info zien<br>bij muisover het veld";
				xLang['WARSIM']					= "Veldslagsimulator link gebruiken:<br>(in menu links)";
				xLang['WARSIMOPTION1']			= "Die van het spel";
				xLang['WARSIMOPTION2']			= "Externe (door kirilloid.ru)";
				xLang['WSANALYSER']				= "World Analyser gebruiken";
				xLang['SHOWSTATLINKS']			= "Show analyser statistic links";
				xLang['NONEWVERSION']			= "Je hebt de laatste versie";
				xLang['BETAVERSION']			= "Je hebt waarschijnlijk een beta versie";
				xLang['NEWVERSIONAV']			= "Er is een nieuwe versie beschikbaar";
				xLang['UPDATESCRIPT']			= "Update script nu ?";
				xLang['CHECKUPDATE']			= "Voor updates controleren.. Een moment.";
				xLang['CROPFINDER']				= "Graanvelden zoeker";
				xLang['AVPOPPERVIL']			= "Gemiddelde populatie per dorp";
				xLang['AVPOPPERPLAYER']			= "Gemiddelde populatie per speler";
				xLang['SHOWRESUPGRADETABLE']	= "Grondstofvelden uitbreidings tabel weergeven";
				xLang['SHOWBUPGTABLE']			= "Gebouwen uitbereidings tabel weergeven";
				xLang['CONSOLELOGLEVEL']		= "Console Log Niveau (Standaard = 0 of 'Leeg')<br>(alleen voor programeurs of debugging)";
				xLang['MARKETPRELOAD']			= "Aantal pagina's voorladen<br>bij 'Marktplaats => kopen'<br>(Standaard = 1)";
				xLang['CAPITAL']				= 'Naam van hoofddorp<br><b>Niet bewerken, ga hiervoor naar je profiel</b>';
				xLang['CAPITALXY']				= 'Coordinaten van hoofddorp<br><b>Niet bewerken, ga hiervoor naar je profiel</b>';
				xLang['TOTALTROOPSTRAINING']	= 'Totaal aantal troepen';
				xLang['SHOWDISTTIMES']			= 'Afstanden en tijden laten zien';
				xLang['UPDATEALLVILLAGES']		= 'Update alle dorpen. LETOP: Bij vaak gebruik kan dit lijden tot een ban van travain!';
				xLang['LARGEMAP']				= 'Grote map';
				xLang['SHOWMENUSECTION3']		= 'Extra link laten zien in linker menu<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)';
				xLang['SHOWTRAVMAPLINKS']		= 'Link laten zien van: travmap.shishnet.org<br>(users and alliances)';
				xLang['USETHEMPR']				= 'Verdeel (procentueel)';
				xLang['USETHEMEQ']				= 'Verdeel (Gelijkmatig)';
				xLang['TOWNHALL']				= 'Raadhuis';
				xLang['GAMESERVERTYPE']			= 'Server versie';
				xLang['MARKETOFFERS']			= 'Marktplaats opties';
				xLang['ACCINFO']				= 'xxx';
				xLang['BOOKMARKOPTIONS']		= 'Bladwijzers';
				xLang['NOTEBLOCKOPTIONS']		= 'Kladblok';
				xLang['MENULEFT']				= 'Linker menu';
				xLang['STATISTICS']				= 'Statistieken';
				xLang['RESOURCEFIELDS']			= 'Grondstof velden';
				xLang['VILLAGECENTER']			= 'Dorp centrum';
				xLang['MAPOPTIONS']				= 'Map opties';
				xLang['COLOROPTIONS']			= 'Kleur opties';
				xLang['DEBUGOPTIONS']			= 'Debug opties';
				xLang['SHOWBIGICONMARKET']		= 'Marktplaats';
				xLang['SHOWBIGICONMILITARY']	= 'Militair<br>Verzamelplaats/Barakken/Werkplaatsen/Stal';
				xLang['SHOWBIGICONALLIANCE']	= 'Alliantie';
				xLang['SHOWBIGICONMILITARY2']	= "Raadhuis/Heldenhof/Uitrustingssmederij/Wapensmid";
				xLang['HEROSMANSION']			= "Heldenhof";
				xLang['BLACKSMITH']				= "Wapensmid";
				xLang['ARMOURY']				= "Uitrustingssmederij";
				xLang['NOW']					= 'Nu';
				xLang['CLOSE']					= 'Sluit';
				xLang['USE']					= 'Verdeel het';
				xLang['USETHEM1H']				= 'Verdeel (1 uur productie)';
				xLang['OVERVIEW']				= 'Overzicht';
				xLang['FORUM']					= 'Forum';
				xLang['ATTACKS']				= 'Aanvallen';
				xLang['NEWS']					= 'Nieuws';
				xLang['ADDCRTPAGE']				= 'Huidige pagina';
				xLang['SCRIPTPRESURL']			= 'TBeyond pagina';
				xLang['NOOFSCOUTS']				= 'Aantal scouts voor de<br>"Selecteer verkenners" functie';
				xLang['SPACER']					= 'Scheidingsteken';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'Troepen info laten zien bij muis op plaatjes.';
				xLang['MESREPOPTIONS']			= 'Berichten & Raportages';
				xLang['MESREPPRELOAD']			= 'Aantal paginas voorladen<br>(Standaard = 1)';
				xLang['ATTABLES']				= 'Troepen tabellen';
				xLang['MTWASTED']				= 'Ruimte over';
				xLang['MTEXCEED']				= 'Te veel';
				xLang['MTCURRENT']				= 'Huidige lading';
				xLang['ALLIANCEFORUMLINK']		= 'Link naar extern forum<br>(Leeg laten voor intern forum)';
				xLang['LOCKBOOKMARKS']			= 'Bladwijzers vast zetten<br>(Verberg de verwijder en verplaats iconen)';
				xLang['MTCLEARALL']				= 'Leeg alle velden';
				xLang['SAVEGLOBAL']				= 'Beschikbaar voor alle dorpen';
				xLang['CLICKSORT']				= 'Klik voor sorteren';
				xLang['SAVEGLOBAL']				= 'Voor elk dorp gebruiken';
				xLang['VILLAGELIST']			= 'Dorpen lijst';
				xLang['SHOWINOUTICONS']			= "Laat de 'dorf1.php' en 'dorf2.php' links zien";
				xLang['SHOWRPRINFOTOOLTIPS']	= 'Afstand en tijd laten zien naar dorp in tooltip<br>(Verzamelplaats & Raporten)';
				xLang['ACCINFO']				= 'Account info';
				xLang['EDIT']					= 'Bewerk';
				xLang['SHOWMESOPENLINKS']		= 'Link laten zien voor pop-up';
				xLang['NPCOPTIONS']				= 'NPC Handel opties';
				xLang['NPCASSISTANT']			= 'NPC Handelaar links en info laten zien';
				xLang['NEWVILLAGEAV']			= 'Datum/Tijd';
				xLang['TIMEUNTIL']				= 'Wacht tijd';
				xLang['SHOWREPDELTABLE']		= 'Tabel met "Verwijder" laten zien op raporten pagina';
				xLang['SHOWIGMLINKFORME']		= 'Ook mijn "Stuur IGM" icoon laten zien';
				xLang['CENTERMAP']				= 'Centreer map op dit dorp';
				xLang['SHOWCENTERMAPICON']		= 'Icoon voor "Centreer map op dit dorp" laten zien';
				xLang['SHOWBBLINK']				= "Laat knipperend icoon zien voor gebouwen die worden gebouwd";
				break;
			case "pt":
				//provided by sepacavi. Updated by Fujis (Thank you !)
				xLang['ALLIANCE']				= 'Aliança';
				xLang['SIM']					= 'Simulador Combates';
				xLang['AREYOUSURE']				= 'Tens a Certeza?';
				xLang['LOSS']					= 'Perdas';
				xLang['PROFIT']					= 'Lucros';
				xLang['EXTAVAILABLE']			= 'Podes subir de nível';
				xLang['PLAYER']					= 'Jogador';
				xLang['VILLAGE']				= 'Aldeia';
				xLang['POPULATION']				= 'População';
				xLang['COORDS']					= 'Coordenadas';
				xLang['MAPTABLEACTIONS']		= 'Acções';
				xLang['SAVED']					= 'Guardado';
				xLang['YOUNEED']				= 'Falta';
				xLang['TODAY']					= 'Hoje';
				xLang['TOMORROW']				= 'Amanhã';
				xLang['PAS_MANYANA']			= 'Depois de Amanhã';
				xLang['MARKET']					= 'Mercado';
				xLang['BARRACKS']				= 'Quartel';
				xLang['RALLYPOINT']				= 'Ponto de Encontro';
				xLang['STABLE']					= 'Cavalariça';
				xLang['WORKSHOP']				= 'Oficina';
				xLang['ENVIAR']					= 'Enviar Recursos';
				xLang['COMPRAR']				= 'Comprar';
				xLang['VENDER']					= 'Vender';
				xLang['SENDIGM']				= 'Enviar IGM';
				xLang['LISTO']					= 'Disponível';
				xLang['ON']						= 'em';
				xLang['A_LAS']					= 'ás';
				xLang['EFICIENCIA']				= 'Eficiência';
				xLang['NEVER']					= 'Nunca';
				xLang['ALDEAS']					= 'Aldeia(s)';
				xLang['TIEMPO']					= 'Tempo';
				xLang['OFREZCO']				= 'Ofereço';
				xLang['BUSCO']					= 'Procuro';
				xLang['TIPO']					= 'Tipo';
				xLang['DISPONIBLE']				= 'Apenas Disponíveis';
				xLang['CUALQUIERA']				= 'Qualquer';
				xLang['YES']					= 'Sim';
				xLang['NO']						= 'Não';
				xLang['LOGIN']					= 'Login';
				xLang['MARCADORES']				= 'Favoritos';
				xLang['ANYADIR']				= 'Adicionar';
				xLang['ENLACE']					= 'URL Favorito';
				xLang['TEXTO']					= 'Texto Favorito';
				xLang['ELIMINAR']				= 'Apagar';
				xLang['MAPA']					= 'Mapa';
				xLang['MAXTIME']				= 'Tempo Máximo';
				xLang['ARCHIVE']				= 'Arquivo';
				xLang['RESUMEN']				= 'Sumário';
				xLang['TROPAS']					= 'Tropas';
				xLang['CHECKVERSION']			= 'Actualizar TBeyond';
				xLang['ACTUALIZAR']				= 'Actualizar Informação da Aldeia';
				xLang['VENTAS']					= 'Ofertas Guardadas';
				xLang['MAPSCAN']				= 'Procurar no Mapa';
				xLang['BIGICONS']				= 'Mostrar Icons Avançados';
				xLang['NOTEBLOCK']				= 'Mostrar Bloco de Notas';
				xLang['SAVE']					= 'Guardar';
				xLang['RPDEFACT']				= 'Acção por Defeito no Ponto de Encontro';
				xLang['ATTACKTYPE2']			= 'Reforços';
				xLang['ATTACKTYPE3']			= 'Ataque: Normal';
				xLang['ATTACKTYPE4']			= 'Ataque: Assalto';
				xLang['NBSIZE']					= 'Tamanho do Bloco de Notas';
				xLang['NBSIZEAUTO']				= 'Automático';
				xLang['NBSIZENORMAL']			= 'Normal (Pequeno)';
				xLang['NBSIZEBIG']				= 'Ecrã Grande (Grande)';
				xLang['NBHEIGHT']				= 'Altura do Bloco de Notas';
				xLang['NBAUTOEXPANDHEIGHT']		= 'Expandir Altura Automáticamente';
				xLang['NBKEEPHEIGHT']			= 'Altura por Defeito';
				xLang['SHOWCENTERNUMBERS']		= 'Mostrar Números no Centro';
				xLang['NPCSAVETIME']			= 'Guardar: ';
				xLang['SHOWCOLORRESLEVELS']		= 'Mostrar Côres dos Níveis de Recursos';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Mostrar Côres dos Níveis dos Edifícios';
				xLang['CNCOLORNEUTRAL']			= 'Actualização de Côres Disponível<br>(Defeito = Vazio)';
				xLang['CNCOLORMAXLEVEL']		= 'Côr do Nível Máximo<br>(Defeito = Vazio)';
				xLang['CNCOLORNOUPGRADE']		= 'Côr de Impossivel<br>(Defeito = Vazio)';
				xLang['CNCOLORNPCUPGRADE']		= 'Côr de Actualização via NPC<br>(Defeito = Vazio)';
				xLang['TOTALTROOPS']			= 'Total de Tropas da Aldeia';
				xLang['SHOWBOOKMARKS']			= 'Mostrar Favoritos';
				xLang['RACECRTV2']				= 'Tribo';
				xLang['SERVERVERSION2']			= "Travian v2.x server";
				xLang['SELECTALLTROOPS']		= "Seleccionar Todas as Tropas";
				xLang['PARTY']					= "Celebrações";
				xLang['CPPERDAY']				= "CP/Dia";
				xLang['SLOT']					= "Slot";
				xLang['TOTAL']					= "Total";
				xLang['NOPALACERESIDENCE']		= "Aldeia sem Residência ou Palácio !";
				xLang['SELECTSCOUT']			= "Seleccionar Espião";
				xLang['SELECTFAKE']				= "Seleccionar Fake";
				xLang['NOSCOUT2FAKE']			= "Impossivel Utilizar Espiões para Ataque Fake !";
				xLang['NOTROOP2FAKE']			= "Não há Tropas para Ataque Fake!";
				xLang['NOTROOP2SCOUT']			= "Não há Tropas para Espiar !";
				xLang['NOTROOPS']				= "Não há Tropas na Aldeia !";
				xLang['ALL']					= "Todas";
				xLang['NORACE']					= "Construir Quartel para Determinar Raça Automaticamente...";
				xLang['COLORHELPTEXT']			= "Nos Campos de Côres Pode Utilizar:<br>- green or red or orange, etc.<br>- Código de Côr HEX#004523<br>- Deixar Vazio para Côr por Defeito";
				xLang['COLORHELP']				= "Ajuda para Campos de Côr";
				xLang['SHOWORIGREPORT']			= "Mostrar Relatório Original (Para Postar)";
				xLang['SHOWCELLTYPEINFO']		= "Mostrar Info do Tipo de Célula/Oásis<br>Quando o Rato Passar por Cima";
				xLang['WARSIM']					= "Link para Simulador de Combates:<br>(Menu Esquerdo)";
				xLang['WARSIMOPTION1']			= "Interno (Fornecido pelo Jogo)";
				xLang['WARSIMOPTION2']			= "Externo (Fornecido por kirilloid.ru)";
				xLang['WSANALYSER']				= "World Analyser";
				xLang['SHOWSTATLINKS']			= "Mostrar Links para Analisador de Estatisticas";
				xLang['NONEWVERSION']			= "Tens a Ultima Versão Disponível";
				xLang['BETAVERSION']			= "Talvez Tenhas Uma Versão Beta";
				xLang['NEWVERSIONAV']			= "Uma Nova Versão do Script Está Disponível";
				xLang['UPDATESCRIPT']			= "Actualizar Script Agora?";
				xLang['CHECKUPDATE']			= "Procurando Actualização para o Script.  Por Favor Esperar...";
				xLang['CROPFINDER']				= "Crop finder";
				xLang['AVPOPPERVIL']			= "População Média por Aldeia";
				xLang['AVPOPPERPLAYER']			= "População Média por Jogador";
				xLang['SHOWRESUPGRADETABLE']	= "Mostrar Tabela de Actualização de Campos de Recursos";
				xLang['SHOWBUPGTABLE']			= "Mostrar Tabela de Actualização de Edificios";
				xLang['CONSOLELOGLEVEL']		= "Console Log Level<br>APENAS PARA PROGRAMADORES OU DEBBUGING<br>(Defeito = 1)";
				xLang['MARKETPRELOAD']			= "Numero de Páginas de Ofertas para Pré-Carregar<br>Enquanto 'Mercado => Comprar' Página<br>(Defeito = 1)";
				xLang['CAPITAL']				= 'Nome da tua Capital<br><b>Acede ao teu Perfil</b>';
				xLang['CAPITALXY']				= 'Coordenadas da tua Capital<br><b>Acede ao teu Perfil</b>';
				xLang['MAX']					= 'Max';
				xLang['TOTALTROOPSTRAINING']	= 'Total de Tropas em Treino';
				xLang['SHOWDISTTIMES']			= 'Mostrar Distâncias e Tempos';
				xLang['TBSETUPLINK']			= 'Setup';
				xLang['UPDATEALLVILLAGES']		= 'Actualizar Todas as Aldeias.  UTILIZAR COM PRECAUÇÂO. PODE LEVAR AO BAN DA CONTA !';
				xLang['SHOWMENUSECTION3']		= "Mostrar Links Adicionais no Menu da Esquerda<br>(Traviantoolbox, World Analyser, Travilog, Mapa, etc.)";
				xLang['LARGEMAP']				= 'Mapa Grande';
				xLang['SHOWTRAVMAPLINKS']		= 'Mostrar Links para travmap.shishnet.org<br>(Utilizadores e Alianças)';
				xLang['USETHEMPR']				= 'Usar (Proporcional)';
				xLang['USETHEMEQ']				= 'Usar (Igual)';
				xLang['TOWNHALL']				= 'Casa do Povo';
				xLang['GAMESERVERTYPE']			= 'Servido de Jogo';
				xLang['MARKETOFFERS']			= 'Ofertas de Mercado';
				xLang['ACCINFO']				= 'xxx';
				xLang['BOOKMARKOPTIONS']		= 'Favoritos';//identical to xLang['MARCADORES'] => check if this can be removed
				xLang['NOTEBLOCKOPTIONS']		= 'Bloco de Notas';
				xLang['MENULEFT']				= 'Menu Esquerdo';
				xLang['STATISTICS']				= 'Estatisticas';
				xLang['RESOURCEFIELDS']			= 'Campos de Recursos';
				xLang['VILLAGECENTER']			= 'Centro da Aldeia';
				xLang['MAPOPTIONS']				= 'Opções do Mapa';
				xLang['COLOROPTIONS']			= 'Opções de Côres';
				xLang['DEBUGOPTIONS']			= 'Opções de Debug';
				xLang['SHOWBIGICONMARKET']		= 'Mercado';
				xLang['SHOWBIGICONMILITARY']	= 'Militar<br>Ponto de Encontro/Quartel/Oficina/Cavalariça';
				xLang['SHOWBIGICONALLIANCE']	= xLang['ALLIANCE'];
				xLang['SHOWBIGICONMILITARY2']	= "Edificio Principal/Mansão do Herói/Fábrica de Armaduras/Ferreiro";
				xLang['HEROSMANSION']			= "Mansão do Herói";
				xLang['BLACKSMITH']				= 'Ferreiro';
				xLang['ARMOURY']				= 'Fábrica de Armaduras';
				xLang['NOW']					= 'Agora';
				xLang['CLOSE']					= 'Fechar';
				xLang['USE']					= 'Usar';
				xLang['USETHEM1H']				= 'Usar (1 Hora Produção)';
				xLang['OVERVIEW']				= 'Vista Geral';
				xLang['FORUM']					= 'Forum';
				xLang['ATTACKS']				= 'Ataques';
				xLang['NEWS']					= 'Noticias';
				xLang['ADDCRTPAGE']				= 'Adicionar Página Actual';
				xLang['SCRIPTPRESURL']			= 'Página TBeyond';
				xLang['NOOFSCOUTS']				= 'No. de Espiões para a<br>Função "Seleccionar Espiões"';
				xLang['SPACER']					= 'Spacer';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'Mostrar Info de Tropas em Tooltips';
				xLang['MESREPOPTIONS']			= 'Mensagens e Relatórios';
				xLang['MESREPPRELOAD']			= 'No. Páginas de Relatórios/Mensagens para Pré-Carregar<br>(Defeito = 1)';
				xLang['ATTABLES']				= 'Tabelas de Tropas';
				xLang['MTWASTED']				= 'Gasto';
				xLang['MTEXCEED']				= 'Excesso';
				xLang['MTCURRENT']				= 'Carga Actual';
				xLang['ALLIANCEFORUMLINK']		= 'Link para Fórum Externo<br>(Deixar Vazio para Fórum Interno)';
				xLang['LOCKBOOKMARKS']			= 'Bloquear Favoritos<br>(Esconder Icon Apagar, Icon Mover Acima, Icon Mover Abaixo)';
				xLang['MTCLEARALL']				= 'limpar Tudo';
				xLang['UNLOCKBOOKMARKS']		= 'Desbloquear Favoritos<br>(Mostrar Icon Apagar, Icon Mover Acima, Icon Mover Abaixo)';
				xLang['CLICKSORT']				= 'Click para Ordenar';
				xLang['MIN']					= 'Min';
				xLang['SAVEGLOBAL']				= 'Partilhar Entre Aldeias';
				xLang['VILLAGELIST']			= 'Lista de Aldeias';
				xLang['SHOWINOUTICONS']			= "Mostrar Links 'dorf1.php' e 'dorf2.php'";
				xLang['UPDATEPOP']				= 'Actualizar População';
				xLang['SHOWRPRINFOTOOLTIPS']	= 'Mostrar distancias e tempos entre as aldeias (Ponto de Reunião Militar & Relatórios)';
				xLang['EDIT']					= 'Editar';
				xLang['SHOWMESOPENLINKS']		= 'Mostrar links para abrir as mensagens e relatórios numa janela pop-up';
				xLang['NPCOPTIONS']				= 'NPC Assistente opções';
				xLang['NPCASSISTANT']			= 'Mostrar NPC Assistente cálculos / Links';
				xLang['SHOWMAPTABLE']			= 'Mostrar tabela de jogadores / aldeias / oasis ocupado';
				xLang['NEWVILLAGEAV']			= 'Data/Hora';
				xLang['TIMEUNTIL']				= 'Tempo de espera';
				xLang['SHOWREPDELTABLE']		= 'Mostrar "Excluir tudo" na tabela da página Relatórios';
				xLang['SHOWIGMLINKFORME']		= 'Mostrar o "Enviar IGM" ícone para mim também';
				xLang['CENTERMAP']				= 'Centralizar mapa sobre esta aldeia';
				xLang['SHOWCENTERMAPICON']		= 'Mostrar "Centralizar mapa sobre esta aldeia" ícone';
				xLang['INETGPOPTION']			= 'Internet Gráficos Pack';
				xLang['ALLOWINETGP']			= 'Permitir Internet Gráficos Packs';
				xLang['SHOWBIGICONMILITARY2']	= "Casa do Povo/Mansão do Herói/Fábrica de Armaduras/Ferreiro";
				xLang['SENDTROOPS']				= 'Enviar Tropas';
				xLang['SHOWBRSTATDETAILS']		= 'Mostrar detalhes no Relatório Estatísticas';
				xLang['SHOWBIGICONMISC']		= "Palácio/Residência/Academia/Tesouraria";
				xLang['PALACE']					= "Palácio";
				xLang['RESIDENCE']				= "Residência";
				xLang['ACADEMY']				= "Academia";
				xLang['TREASURY']				= "Tesouraria";
				break;
			case "br":
				// Tradução português (Brasil) por Bruno Guerreiro - brunogc@limao.com.br - Thank you !
				xLang['ALLIANCE']				= 'Aliança';
				xLang['SIM']					= 'Simulador de Combate';
				xLang['AREYOUSURE']				= 'Tem certeza?';
				xLang['LOSS']					= 'Perdas';
				xLang['PROFIT']					= 'Lucro';
				xLang['EXTAVAILABLE']			= 'Recursos suficientes';
				xLang['PLAYER']					= 'Jogador';
				xLang['VILLAGE']				= 'Aldeia';
				xLang['POPULATION']				= 'População';
				xLang['COORDS']					= 'Coords';
				xLang['MAPTABLEACTIONS']		= 'Ações';
				xLang['SAVED']					= 'Configurações salvas';
				xLang['YOUNEED']				= 'Você precisa';
				xLang['TODAY']					= 'hoje';
				xLang['TOMORROW']				= 'amanhã';
				xLang['PAS_MANYANA']			= 'depois de amanhã';
				xLang['MARKET']					= 'Mercado';
				xLang['BARRACKS']				= 'Quartel';
				xLang['RALLYPOINT']				= 'Enviar tropas';
				xLang['STABLE']					= 'Cavalaria';
				xLang['WORKSHOP']				= 'Oficina';
				xLang['ENVIAR']					= 'Enviar recursos';
				xLang['COMPRAR']				= 'Comprar';
				xLang['VENDER']					= 'Vender';
				xLang['SENDIGM']				= 'Enviar IGM';
				xLang['LISTO']					= 'Disponível';
				xLang['ON']						= 'em';
				xLang['A_LAS']					= 'as';
				xLang['EFICIENCIA']				= 'Eficiência';
				xLang['NEVER']					= 'Nunca';
				xLang['ALDEAS']					= 'Aldeias';
				xLang['TIEMPO']					= 'Tempo';
				xLang['OFREZCO']				= 'Oferecendo';
				xLang['BUSCO']					= 'Procurando';
				xLang['TIPO']					= 'Tipo';
				xLang['DISPONIBLE']				= 'Somente disponível?';
				xLang['CUALQUIERA']				= 'Qualquer';
				xLang['YES']					= 'Sim';
				xLang['NO']						= 'Não';
				xLang['LOGIN']					= 'Login';
				xLang['MARCADORES']				= 'Favoritos';
				xLang['ANYADIR']				= 'Adicionar';
				xLang['ENLACE']					= 'URL do novo favorito';
				xLang['TEXTO']					= 'Texto do novo favorito';
				xLang['ELIMINAR']				= 'Deletar';
				xLang['MAPA']					= 'Mapa';
				xLang['MAXTIME']				= 'Tempo máximo';
				xLang['ARCHIVE']				= 'Arquivo';
				xLang['RESUMEN']				= 'Sumário';
				xLang['TROPAS']					= 'Tropas';
				xLang['CHECKVERSION']			= 'Atualizar TBeyond';
				xLang['ACTUALIZAR']				= 'Atualizar informação da aldeia';
				xLang['VENTAS']					= 'Ofertas salvas';
				xLang['MAPSCAN']				= 'Analisar mapa';
				xLang['BIGICONS']				= 'Exibir ícones adicionais';
				xLang['NOTEBLOCK']				= 'Exibir bloco de anotações';
				xLang['SAVE']					= 'Salvo';
				xLang['RPDEFACT']				= 'Ação padrão do Ponto de Encontro';
				xLang['ATTACKTYPE2']			= 'Reforço';
				xLang['ATTACKTYPE3']			= 'Ataque: Normal';
				xLang['ATTACKTYPE4']			= 'Ataque: Assalto';
				xLang['NBSIZE']					= 'Tamanho do bloco de anotações';
				xLang['NBSIZEAUTO']				= 'Auto';
				xLang['NBSIZENORMAL']			= 'Normal (pequeno)';
				xLang['NBSIZEBIG']				= 'Grande';
				xLang['NBHEIGHT']				= 'Altura do bloco de anotações';
				xLang['NBAUTOEXPANDHEIGHT']		= 'Altura automática';
				xLang['NBKEEPHEIGHT']			= 'Altura padrão';
				xLang['SHOWCENTERNUMBERS']		= 'Exibir níveis de construção';
				xLang['NPCSAVETIME']			= 'Salvo: ';
				xLang['SHOWCOLORRESLEVELS']		= 'Exibir cores nos recursos';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Exibir cores nos edifícios';
				xLang['CNCOLORNEUTRAL']			= 'Cores disponíveis<br>(Default = Empty)';
				xLang['CNCOLORMAXLEVEL']		= 'Cor de nível máximo<br>(Default = Empty)';
				xLang['CNCOLORNOUPGRADE']		= 'Cor de não disponível<br>(Default = Empty)';
				xLang['CNCOLORNPCUPGRADE']		= 'Cor de atualização via NPC<br>(Default = Empty)';
				xLang['TOTALTROOPS']			= 'Total de tropas da aldeia';
				xLang['SHOWBOOKMARKS']			= 'Exibir favoritos';
				xLang['RACECRTV2']				= 'Raça';
				xLang['SERVERVERSION2']			= "Travian v2.x server";
				xLang['SELECTALLTROOPS']		= "Selecionar todas as tropas";
				xLang['PARTY']					= "Festividades";
				xLang['CPPERDAY']				= "CP/dia";
				xLang['SLOT']					= "Slot";
				xLang['TOTAL']					= "Total";
				xLang['NOPALACERESIDENCE']		= "Sem residência ou palácio !";
				xLang['SELECTSCOUT']			= "Enviar espiões";
				xLang['SELECTFAKE']				= "Enviar fakes";
				xLang['NOSCOUT2FAKE']			= "É impossível enviar ataques fakes !";
				xLang['NOTROOP2FAKE']			= "Não existem tropas para ser usadas como fake!";
				xLang['NOTROOP2SCOUT']			= "Não existe tropas/unidade de espionagem !";
				xLang['NOTROOPS']				= "Não há tropas nesta aldeia !";
				xLang['ALL']					= "Todos";
				xLang['NORACE']					= "Build the barracks to automatically determine the race and/or open <br>the village center...";
				xLang['COLORHELPTEXT']			= "In color fields you may enter:<br>- green or red or orange, etc.<br>- the HEX color code like #004523<br>- leave empty for the default color";
				xLang['COLORHELP']				= "Help for color fields";
				xLang['SHOWORIGREPORT']			= "Exibir relatório original";
				xLang['SHOWCELLTYPEINFO']		= "Show cell type/oasis info<br>while mousing over the map";
				xLang['WARSIM']					= "Combat simulator link to use:<br>(menu left)";
				xLang['WARSIMOPTION1']			= "Interno (provided by the game)";
				xLang['WARSIMOPTION2']			= "Externo (provided by kirilloid.ru)";
				xLang['WSANALYSER']				= "World Analyser to use";
				xLang['SHOWSTATLINKS']			= "Show analyser statistic links";
				xLang['NONEWVERSION']			= "Você tem a última versão instalada.";
				xLang['BETAVERSION']			= "VOcê tem uma versão beta.";
				xLang['NEWVERSIONAV']			= "Uma nova versão do script foi encontrada";
				xLang['UPDATESCRIPT']			= "Atualizar script agora ?";
				xLang['CHECKUPDATE']			= "Checando novas atualizações. Aguarde...";
				xLang['CROPFINDER']				= "Localizador de CROPs";
				xLang['AVPOPPERVIL']			= "Média de população por aldeia";
				xLang['AVPOPPERPLAYER']			= "Média de população por jogadores";
				xLang['SHOWRESUPGRADETABLE']	= "Exibir recursos disponíveis para elevar";
				xLang['SHOWBUPGTABLE']			= "Exibir construções disponíveis para elevar";
				xLang['CONSOLELOGLEVEL']		= "Console Log Level<br>ONLY FOR PROGRAMMERS OR DEBUGGING<br>(Default = 1)";
				xLang['MARKETPRELOAD']			= "Number of offer pages to preload<br>while on the 'Market => Buy' page<br>(Default = 1)";
				xLang['CAPITAL']				= 'Nome da sua capital<br>Visite seu perfil';
				xLang['CAPITALXY']				= 'Coordenadas da sua capital<br>Visite seu perfil';
				xLang['MAX']					= 'Máximo';
				xLang['TOTALTROOPSTRAINING']	= 'Total de tropas sendo treinadas';
				xLang['SHOWDISTTIMES']			= 'Exibir distâncias e tempos';
				xLang['TBSETUPLINK']			= 'Configurações do Script';
				xLang['UPDATEALLVILLAGES']		= 'Atualizar todas as aldeias.  UTILIZAR COM O MÁXIMO DE CAUTELA, ESSA FUNÇÃO PODE FAZER SUA CONTA SER BANIDA DO JOGO !';
				xLang['SHOWMENUSECTION3']		= "Exibir links adicionais no menu esquerdo?<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
				xLang['LARGEMAP']				= 'Mapa maior';
				xLang['SHOWTRAVMAPLINKS']		= 'Exibir link para travmap.shishnet.org<br>(usuários e alianças)';
				xLang['USETHEMPR']				= 'Usar tudo (proporcional)';
				xLang['USETHEMEQ']				= 'Usar tudo (equilibrar)';
				xLang['TOWNHALL']				= 'Edifício Principal';
				xLang['GAMESERVERTYPE']			= 'Game server';
				xLang['MARKETOFFERS']			= 'Ofertas do mercado';
				xLang['ACCINFO']				= 'xxx';
				xLang['BOOKMARKOPTIONS']		= 'Favoritos';//identical to xLang['MARCADORES'] => check if this can be removed
				xLang['NOTEBLOCKOPTIONS']		= 'Bloco de anotações';
				xLang['MENULEFT']				= 'Menu on the left side';
				xLang['STATISTICS']				= 'Statistics';
				xLang['RESOURCEFIELDS']			= 'Resource fields';
				xLang['VILLAGECENTER']			= 'Centro da Aldeia';
				xLang['MAPOPTIONS']				= 'Opções de Mapa';
				xLang['COLOROPTIONS']			= 'Opções de Cor';
				xLang['DEBUGOPTIONS']			= 'Opções de DEBUG';
				xLang['SHOWBIGICONMARKET']		= 'Mercado';
				xLang['SHOWBIGICONMILITARY']	= 'Militar<br>Ponto de encontro/Quartel/Oficina/Cavalaria';
				xLang['SHOWBIGICONALLIANCE']	= 'Aliança'; //identical to xLang['ALLIANCE'] => check if this can be removed
				xLang['SHOWBIGICONMILITARY2']	= "Edifício Principaç/Mansão do Herói/Fábrica de Armaduras/Ferreiro";
				xLang['HEROSMANSION']			= "Mansão do Herói";
				xLang['BLACKSMITH']				= 'Ferreiro';
				xLang['ARMOURY']				= 'Fábrica de Armaduras';
				xLang['NOW']					= 'Agora';
				xLang['CLOSE']					= 'Fechar';
				xLang['USE']					= 'Usar';
				xLang['USETHEM1H']				= 'Usar tudo (1 hora de produção)';
				xLang['OVERVIEW']				= 'Visão geral';
				xLang['FORUM']					= 'Forum';
				xLang['ATTACKS']				= 'LOG de ataques';
				xLang['NEWS']					= 'Notícias';
				xLang['ADDCRTPAGE']				= 'Adicionar atual';
				xLang['SCRIPTPRESURL']			= 'TBeyond page';
				xLang['NOOFSCOUTS']				= 'Nº de tropas espiãs<br>"Select scout" fuction';
				xLang['SPACER']					= 'Separador';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'Mostrar informações de tropas';
				xLang['MESREPOPTIONS']			= 'Mensagens e Relatórios';
				xLang['MESREPPRELOAD']			= 'Número de mensagens/relatórios por página<br>(Default = 1)';
				xLang['ATTABLES']				= 'Tabela de tropas';
				xLang['MTWASTED']				= 'Capacidade desperdiçada';
				xLang['MTEXCEED']				= 'Capacidade excedida';
				xLang['MTCURRENT']				= 'Capacidade utilizada';
				xLang['ALLIANCEFORUMLINK']		= 'Link para fórum externo<br>(deixe vazio o fórum interno)';
				xLang['LOCKBOOKMARKS']			= 'Fechar favoritos<br>(ocultar ícones de edição)';
				xLang['MTCLEARALL']				= 'Apagar tudo';
				xLang['UNLOCKBOOKMARKS']		= 'Abrir Favoritos<br>(Mostrar ícones de edição)';
				xLang['CLICKSORT']				= 'Click to sort';
				xLang['MIN']					= 'Mínimo';
				xLang['SAVEGLOBAL']				= 'Shared among villages';
				xLang['VILLAGELIST']			= 'Lista de Aldeias';
				xLang['SHOWINOUTICONS']			= "Mostrar 'dorf1.php' and 'dorf2.php' links";
				xLang['UPDATEPOP']				= 'Atualizar habitantes';
				break;
			case "cz":
				// český jazyk (travian.cz) by Rypi
				xLang['ALLIANCE']				= 'Aliance';
				xLang['SIM']					= 'Bitevní simulátor';
				xLang['AREYOUSURE']				= 'Jsi si jistý?';
				xLang['LOSS']					= 'Materiální ztráta';
				xLang['PROFIT']					= 'Výnos';
				xLang['EXTAVAILABLE']			= 'Rozšířit';
				xLang['PLAYER']					= 'Hráč';
				xLang['VILLAGE']				= 'Vesnice';
				xLang['POPULATION']				= 'Populace';
				xLang['COORDS']					= 'Souřadnice';
				xLang['MAPTABLEACTIONS']		= 'Akce';
				xLang['SAVED']					= 'Uloženo';
				xLang['YOUNEED']				= 'Potřebuješ:';
				xLang['TODAY']					= 'dnes';
				xLang['TOMORROW']				= 'zítra';
				xLang['PAS_MANYANA']			= 'pozítří';
				xLang['MARKET']					= 'Tržiště';
				xLang['BARRACKS']				= 'Kasárny';
				xLang['RALLYPOINT']				= 'Shromaždiště';
				xLang['STABLE']					= 'Stáje';
				xLang['WORKSHOP']				= 'Dílna';
				xLang['ENVIAR']					= 'Poslat suroviny';
				xLang['COMPRAR']				= 'Koupit';
				xLang['VENDER']					= 'Prodat';
				xLang['SENDIGM']				= 'Poslat zprávu';
				xLang['LISTO']					= 'Dostupné';
				xLang['ON']						= 'v';
				xLang['A_LAS']					= 'v';
				xLang['EFICIENCIA']				= 'Efektivita';
				xLang['NEVER']					= 'Nikdy';
				xLang['ALDEAS']					= 'Vesnic';
				xLang['TIEMPO']					= 'Čas';
				xLang['OFREZCO']				= 'Nabízí';
				xLang['BUSCO']					= 'Hledá';
				xLang['TIPO']					= 'Poměr';
				xLang['DISPONIBLE']				= 'Pouze dostupné';
				xLang['CUALQUIERA']				= 'Cokoli';
				xLang['YES']					= 'Ano';
				xLang['NO']						= 'Ne';
				xLang['LOGIN']					= 'Login';
				xLang['MARCADORES']				= 'Záložky';
				xLang['ANYADIR']				= 'Přidat';
				xLang['ENLACE']					= 'URL odkazu';
				xLang['TEXTO']					= 'Název záložky';
				xLang['ELIMINAR']				= 'Odstranit';
				xLang['MAPA']					= 'Mapa';
				xLang['MAXTIME']				= 'Maximální čas';
				xLang['ARCHIVE']				= 'Archiv';
				xLang['RESUMEN']				= 'Souhrn';
				xLang['TROPAS']					= 'Vojsko';
				xLang['CHECKVERSION']			= 'Aktualizuj T3Beyond';
				xLang['ACTUALIZAR']				= 'Aktualizovat informace o vesnici';
				xLang['VENTAS']					= 'Nabídky tržiště (neměnit)';
				xLang['MAPSCAN']				= 'Prohledat mapu';
				xLang['BIGICONS']				= 'Nastavení rozšiřujících ikon';
				xLang['NOTEBLOCK']				= 'Zobrazit poznámkový blok';
				xLang['SAVE']					= 'Uložit';
				xLang['RPDEFACT']				= 'Výchozí vojenská akce';
				xLang['ATTACKTYPE2']			= 'Podpora';
				xLang['ATTACKTYPE3']			= 'Normální';
				xLang['ATTACKTYPE4']			= 'Loupež';
				xLang['NBSIZE']					= 'Velikost poznámkového bloku';
				xLang['NBSIZEAUTO']				= 'Automatická';
				xLang['NBSIZENORMAL']			= 'Malý';
				xLang['NBSIZEBIG']				= 'Velký';
				xLang['NBHEIGHT']				= 'Výška poznámkového bloku';
				xLang['NBAUTOEXPANDHEIGHT']		= 'Automatická výška';
				xLang['NBKEEPHEIGHT']			= 'Výchozí výška';
				xLang['SHOWCENTERNUMBERS']		= 'Zobrazit úrovně budov';
				xLang['NPCSAVETIME']			= 'Ušetříš: ';
				xLang['SHOWCOLORRESLEVELS']		= 'Obarvit úrovně polí';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Obarvit úrovně budov';
				xLang['CNCOLORNEUTRAL']			= 'Možnost vylepšení (barva)<br>(Nezadáno = Výchozí)';
				xLang['CNCOLORMAXLEVEL']		= 'Maximální úroveň (barva)<br>(Nezadáno = Výchozí)';
				xLang['CNCOLORNOUPGRADE']		= 'Vylepšení nemožné (barva)<br>(Nezadáno = Výchozí)';
				xLang['CNCOLORNPCUPGRADE']		= 'Vylepšení pomocí NPC (barva)<br>(Nezadáno = Výchozí)';
				xLang['TOTALTROOPS']			= 'Všechny jednotky vyrobené ve vesnici';
				xLang['SHOWBOOKMARKS']			= 'Zobrazit záložky';
				xLang['RACECRTV2']				= 'Národ';
				xLang['SERVERVERSION2']			= "Travian verze 2.x";
				xLang['SELECTALLTROOPS']		= "Všechny jednotky";
				xLang['PARTY']					= "Slavnosti";
				xLang['CPPERDAY']				= "KB/den";
				xLang['SLOT']					= "Sloty";
				xLang['TOTAL']					= "Celkem";
				xLang['NOPALACERESIDENCE']		= "V této vesnici jsi zatím neotevřel rezidenci / palác!";
				xLang['SELECTSCOUT']			= "Špehy";
				xLang['SELECTFAKE']				= "Fake";
				xLang['NOSCOUT2FAKE']			= "Špehy nelze použít jako fake!";
				xLang['NOTROOP2FAKE']			= "Žádné jednotky pro fake!";
				xLang['NOTROOP2SCOUT']			= "Žádní špehové!";
				xLang['NOTROOPS']				= "Žádné jednotky ve vesnici!";
				xLang['ALL']					= "Vše";
				xLang['NORACE']					= "Postav kasárny nebo otevři centrum pro určení";
				xLang['COLORHELPTEXT']			= "Barvy můžeš zadat jako:<br>- <b>green</b> , <b>red</b> nebo <b>orange</b> atd.<br>- HEX kód barvy např. <b>#004523</b><br>- nechat prázdné pro výchozí barvu";
				xLang['COLORHELP']				= "Nápověda pro barvy";
				xLang['SHOWORIGREPORT']			= "Zobrazit originální report";
				xLang['SHOWCELLTYPEINFO']		= "Zobrazit typ vesnic<br>při najetí myší na mapu";
				xLang['WARSIM']					= "Bitevní simulátor:<br>(levé menu)";
				xLang['WARSIMOPTION1']			= "Interní (travian.cz)";
				xLang['WARSIMOPTION2']			= "Externí (kirilloid.ru)";
				xLang['WSANALYSER']				= "Analyser:";
				xLang['SHOWSTATLINKS']			= "Zobrazit odkaz na analyser";
				xLang['NONEWVERSION']			= "Máš poslední verzi";
				xLang['BETAVERSION']			= "Máš betaverzi";
				xLang['NEWVERSIONAV']			= "Je dostupná nová verze";
				xLang['UPDATESCRIPT']			= "Aktualizovat nyní?";
				xLang['CHECKUPDATE']			= "Kontroluji novou verzi. Prosím čekej...";
				xLang['CROPFINDER']				= "Vyhledávač MC";
				xLang['AVPOPPERVIL']			= "Průměrná populace vesnic";
				xLang['AVPOPPERPLAYER']			= "Průměrná populace hráčů";
				xLang['SHOWRESUPGRADETABLE']	= "Zobrazit tabulku rozšíření polí";
				xLang['SHOWBUPGTABLE']			= "Zobrazit tabulku rozšíření budov";
				xLang['CONSOLELOGLEVEL']		= "Console Log Level<br>ONLY FOR PROGRAMMERS OR DEBUGGING<br>(Výchozí= 0)";
				xLang['MARKETPRELOAD']			= "Počet kontrolovaných stránek<br>na 'Tržiště => Koupit'<br>(Výchozí= 1)";
				xLang['CAPITAL']				= 'Jméno hlavní vesnice<br><b>Pro aktualizaci navštiv svůj profil</b>';
				xLang['CAPITALXY']				= 'Souřadnice hlavní vesnice<br><b>Pro aktualizaci navštiv svůj profil</b>';
				xLang['MAX']					= 'Max';
				xLang['TOTALTROOPSTRAINING']	= 'Celkem jednotek ve výuce';
				xLang['SHOWDISTTIMES']			= 'Zobrazit vzdálenosti a časy';
				xLang['TBSETUPLINK']			= 'Nastavení T3Beyond';
				xLang['UPDATEALLVILLAGES']		= 'Aktualizovat všechny vesnice. POZOR! MŮŽE VÉST K ZABLOKOVÁNÍ ÚČTU';
				xLang['SHOWMENUSECTION3']		= "Zobrazit odkazy v levém menu<br>(Traviantoolbox, World Analyser, Travilog, Mapa)";
				xLang['LARGEMAP']				= 'Velká mapa';
				xLang['SHOWTRAVMAPLINKS']		= 'Zobrazit odkaz na mapu<br>(hráči a aliance)';
				xLang['USETHEMPR']				= 'Rozdělit (proportional)';
				xLang['USETHEMEQ']				= 'Rozdělit (equal)';
				xLang['TOWNHALL']				= 'Radnice';
				xLang['GAMESERVERTYPE']			= 'Nastavení serveru';
				xLang['MARKETOFFERS']			= 'Nastavení tržiště';
				xLang['ACCINFO']				= 'Nastavení hráče <b>Čeština: <a href="http://www.rypi.cz">Rypi</a></b>';
				xLang['BOOKMARKOPTIONS']		= 'Nastavení záložek';
				xLang['NOTEBLOCKOPTIONS']		= 'Nastavení poznámkového bloku';
				xLang['MENULEFT']				= 'Nastavení levého menu';
				xLang['STATISTICS']				= 'Nastavení statistik';
				xLang['RESOURCEFIELDS']			= 'Nastavení surovinových polí';
				xLang['VILLAGECENTER']			= 'Nastavení centra vesnice';
				xLang['MAPOPTIONS']				= 'Nastavení mapy';
				xLang['COLOROPTIONS']			= 'Nastavení barev';
				xLang['DEBUGOPTIONS']			= 'Nastavení ladění (pouze pro programátory)';
				xLang['SHOWBIGICONMARKET']		= 'Tržiště';
				xLang['SHOWBIGICONMILITARY']	= 'Shromaždiště/Kasárny/Dílny/Stáje';
				xLang['SHOWBIGICONALLIANCE']	= 'Aliance';
				xLang['SHOWBIGICONMILITARY2']	= "Radnice/Hrdinský dvůr/Zbrojnice/Kovárna";
				xLang['HEROSMANSION']			= "Hrdinský dvůr";
				xLang['BLACKSMITH']				= "Kovárna";
				xLang['ARMOURY']				= "Zbrojnice";
				xLang['NOW']					= 'Teď';
				xLang['CLOSE']					= 'Zavřít';
				xLang['USE']					= 'Použít';
				xLang['USETHEM1H']				= 'Rozdělit (1 hodinová produkce)';
				xLang['OVERVIEW']				= 'Přehled';
				xLang['FORUM']					= 'Fórum';
				xLang['ATTACKS']				= 'Útoky';
				xLang['NEWS']					= 'Novinky';
				xLang['ADDCRTPAGE']				= 'Přidat aktuální stránku';
				xLang['SCRIPTPRESURL']			= 'Stránka TBeyond';
				xLang['NOOFSCOUTS']				= 'Počet špehů při použití<br>funkce poslat špehy';
				xLang['SPACER']					= 'Oddělovač';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'Informace o jednotkách při najetí myší';
				xLang['MESREPOPTIONS']			= 'Zprávy & Reporty';
				xLang['MESREPPRELOAD']			= 'Počet stránek zpráv/reportů k načtení<br>(Výchozí= 1)';
				xLang['ATTABLES']				= 'Přehled jednotek';
				xLang['MTWASTED']				= 'Zbývá';
				xLang['MTEXCEED']				= 'Přebývá';
				xLang['MTCURRENT']				= 'Současný náklad';
				xLang['ALLIANCEFORUMLINK']		= 'Odkaz na externí fórum<br>(nevyplněno = interní fórum)';
				xLang['LOCKBOOKMARKS']			= 'Uzamknout záložky<br>(skryje ikony smazat a přesunout)';
				xLang['MTCLEARALL']				= 'Vyčistit vše';
				xLang['UNLOCKBOOKMARKS']		= 'Odemknout záložky<br>(zobrazí ikony smazat a přesunout)';
				xLang['CLICKSORT']				= 'Klikni pro seřazení';
				xLang['MIN']					= 'Min';
				xLang['SAVEGLOBAL']				= 'Pro všechny vesnice';
				xLang['VILLAGELIST']			= 'Seznam vesnic';
				xLang['SHOWINOUTICONS']			= "Zobrazit odkazy 'dorf1.php' a 'dorf2.php'";
				xLang['UPDATEPOP']				= 'Aktualizovat populaci';
				xLang['SHOWRPRINFOTOOLTIPS']	= 'Zobrazit vzdálenosti a časy při najetí myší<br>(Shromaždište & reporty)';
				xLang['EDIT']					= 'Upravit';
				xLang['SHOWMESOPENLINKS']		= 'Zobrazit odkaz pro otevření zprávy v novém okně.';
				xLang['NPCOPTIONS']				= 'Nastavení NPC pomocníka';
				xLang['NPCASSISTANT']			= 'Zobrazit NPC pomocníky (výpočty a odkazy)';
				xLang['SHOWMAPTABLE']			= 'Zobrazit tabulku hráčů/vesnic/oáz';
				xLang['NEWVILLAGEAV']			= 'Datum/čas';
				xLang['TIMEUNTIL']				= 'Čas čekání';
				xLang['SHOWREPDELTABLE']		= 'Zobrazit tabulku "Smazat vše" na stránce s reporty';
				xLang['SHOWIGMLINKFORME']		= 'Zobrazit "Poslat zprávu" i pro mě';
				xLang['CENTERMAP']				= 'Vycentruj mapu kolem této vesnice';
				xLang['SHOWCENTERMAPICON']		= 'Zobrazit ikonu centra vesnice';
				xLang['INETGPOPTION']			= 'Internetový grafický balíček';
				xLang['ALLOWINETGP']			= 'Povolit internetové grafické balíčky';
				xLang['SHOWBRSTATDETAILS']		= 'Zobrazit detaily ve statistikách reportu';
				xLang['SENDTROOPS']				= 'Poslat jednotky';
				xLang['SHOWBRSTATDETAILS']		= 'Zobrazit detaily ve statistice reportu';
				xLang['SHOWBIGICONMISC']		= "Palác/Rezidence/Akademie/Pokladnice";
				xLang['PALACE']					= "Palác";
				xLang['RESIDENCE']				= "Rezidence";
				xLang['ACADEMY']				= "Akademie";
				xLang['TREASURY']				= "Pokladnice";
				break;
			case "ru":
				// Russian translation: Thanks to millioner & MMIROSLAV & EXEMOK
				xLang['ALLIANCE']				= 'Альянс';
				xLang['LOGIN']					= 'Логин';
				xLang['SIM']					= 'Симулятор боя';
				xLang['AREYOUSURE']				= 'Вы уверены?';
				xLang['LOSS']					= 'Потери';
				xLang['PROFIT']					= 'Прибыль';
				xLang['EXTAVAILABLE']			= 'Возможно развитие';
				xLang['PLAYER']					= 'Игрок';
				xLang['VILLAGE']				= 'Деревня';
				xLang['POPULATION']				= 'Население';
				xLang['COORDS']					= 'Координаты';
				xLang['MAPTABLEACTIONS']		= 'Действия';
				xLang['SAVED']					= 'Сохранено';
				xLang['YOUNEED']				= 'Не хватает';
				xLang['TODAY']					= 'Сегодня';
				xLang['TOMORROW']				= 'Завтра';
				xLang['PAS_MANYANA']			= 'Послезавтра';
				xLang['MARKET']					= 'Рынок';
				xLang['BARRACKS']				= 'Казарма';
				xLang['RALLYPOINT']				= 'Пункт сбора';
				xLang['STABLE']					= 'Конюшня';
				xLang['WORKSHOP']				= 'Мастерская';
				xLang['ENVIAR']					= 'Послать ресурсы';
				xLang['COMPRAR']				= 'Купить';
				xLang['VENDER']					= 'Продать';
				xLang['SENDIGM']				= 'Послать сообщение';
				xLang['LISTO']					= 'Развитие будет возможно';
				xLang['ON']						= 'на';
				xLang['A_LAS']					= 'в';
				xLang['EFICIENCIA']				= 'Эффективность';
				xLang['NEVER']					= 'Никогда';
				xLang['ALDEAS']					= 'Деревни';
				xLang['TROPAS']					= 'Послать войска';
				xLang['TIEMPO']					= 'Время';
				xLang['OFREZCO']				= 'Продажа';
				xLang['BUSCO']					= 'Покупка';
				xLang['TIPO']					= 'Соотношение';
				xLang['CUALQUIERA']				= 'Все';
				xLang['YES']					= 'Да';
				xLang['NO']						= 'Нет';
				xLang['MARCADORES']				= 'Закладки';
				xLang['ANYADIR']				= 'Добавить';
				xLang['ENLACE']					= 'Добавить адрес (Http://***) в закладки';
				xLang['TEXTO']					= 'Название закладки';
				xLang['ELIMINAR']				= 'Удалить';
				xLang['MAPA']					= 'Карта';
				xLang['DISPONIBLE']				= 'Только доступные для покупки';
				xLang['TOTALTROOPSTRAINING']	= 'Общее число обучаемых войск';
				xLang['TOTAL']					= "Всего";
				xLang['NPCSAVETIME']			= 'Время: ';
				xLang['NONEWVERSION']			= "У вас последняя версия";
				xLang['NEWVERSIONAV']			= "Доступна новая версия скрипта";
				xLang['UPDATESCRIPT']			= "Вы хотите обновить скрипт сейчас ?";
				xLang['CHECKUPDATE']			= "Поиск обновлений скрипта. Пожалуйста, подождите...";
				xLang['TOTALTROOPS']			= 'Собственные войска в деревне';
				xLang['CHECKVERSION']			= 'Обновить TBeyond';
				xLang['ACTUALIZAR']				= 'Обновить информацию о деревне';
				xLang['ARCHIVE']				= 'Архив';
				xLang['UPDATEALLVILLAGES']		= 'Обновить все деревни. ИСПОЛЬЗУЙТЕ С КРАЙНЕЙ ОСТОРОЖНОСТЬЮ. ПОТОМУ ЧТО ЭТО МОЖЕТ ПРИВЕСТИ К БАНУ АККАУНТА !';
				xLang['SHOWORIGREPORT']			= 'Убрать описание (для отправки)';
				xLang['SCRIPTPRESURL']			= 'Страница TBeyond';
				xLang['CPPERDAY']				= "ЕК/день";
				xLang['PARTY']					= "Праздники";
				xLang['SLOT']					= "Слот";
				xLang['USETHEMPR']				= 'Использовать (в % содержании). ';
				xLang['USETHEMEQ']				= 'Использовать (равномерно).';
				xLang['USETHEM1H']				= 'Использовать (часовая выработка).';
				xLang['MTCLEARALL']				= 'Очистить все';
				xLang['MAXTIME']				= 'Максимальное время';
				xLang['SAVE']					= 'Сохранить';
				xLang['MAPSCAN']				= 'Сканировать карту';
				xLang['RACECRTV2']				= 'Раса';
				xLang['MARCADORES']				= 'Закладки';
				xLang['SHOWBOOKMARKS']			= 'Показывать закладки';
				xLang['GAMESERVERTYPE']			= 'Игровой сервер';
				xLang['BOOKMARKOPTIONS']		= 'Заметки';
				xLang['ACCINFO']				= 'Информация аккаунта';
				xLang['CAPITAL']				= 'Название вашей Столицы<br>Посетите свой профиль для обновления';
				xLang['CAPITALXY']				= 'Координаты вашей Столицы<br>Посетите свой профиль для обновления';
				xLang['MARKETOFFERS']			= 'Настройки рынка';
				xLang['MARKETPRELOAD']			= "количество страниц отображаемых в разделе<br>'Рынок => Покупка' страниц<br>(по умолчанию =1)";
				xLang['BIGICONS']				= 'Отображение иконок';
				xLang['SERVERVERSION2']			= "Travian сервер версии v2.x";
				xLang['SHOWBIGICONMARKET']		= 'Рынок';
				xLang['SHOWBIGICONMILITARY']	= 'Армия<br>Пункт сборп/Казарма/Мастермкая/Конюшня';
				xLang['SHOWBIGICONMILITARY2']	= "Ратуша/Таверна/Кузница доспехов/Кузница оружия";
				xLang['TOWNHALL']				= 'Ратуша';
				xLang['HEROSMANSION']			= "Таверна";
				xLang['BLACKSMITH']				= 'Кузница оружия';
				xLang['ARMOURY']				= 'Кузница доспехов';
				xLang['PROFILE']				= 'Профиль';
				xLang['MENULEFT']				= 'Меню с левой стороны';
				xLang['SHOWMENUSECTION3']		= "Показывать дополнительные ссылки в левом меню<br>(Traviantoolbox, World Analyser, Travilog, Map и т.д.)";
				xLang['WARSIM']					= "Использовать симулятор боя:<br>(левое меню)";
				xLang['WARSIMOPTION1']			= "Внутренний (предлагаемый игрой)";
				xLang['WARSIMOPTION2']			= "Внешний (предлагаемый kirilloid.ru)";
				xLang['VILLAGELIST']			= 'Список деревень';
				xLang['SHOWINOUTICONS']			= "Показывать ссылки на 'dorf1.php' и 'dorf2.php'";
				xLang['NOTEBLOCK']				= 'Показывать блок заметок';
				xLang['NOTEBLOCKOPTIONS']		= 'Блок заметок';
				xLang['NPCOPTIONS']				= 'Опции NPC помощника';
				xLang['NPCASSISTANT']			= 'Показывать NPC помощника калькулятор / ссылки';
				xLang['STATISTICS']				= 'Статистика';
				xLang['WSANALYSER']				= "Какой World Analyser (анализатор мира) использовать";
				xLang['SHOWSTATLINKS']			= "Показывать ссылки на статистику анализатора";
				xLang['SHOWTRAVMAPLINKS']		= 'Показывать ссылки на travmap.shishnet.org<br>(игроки и альянсы)';
				xLang['SHOWRESUPGRADETABLE']	= "Показыть таблицу развития ресурсных полей";
				xLang['SHOWBUPGTABLE']			= "Показывать таблицу развития зданий";
				xLang['RESOURCEFIELDS']			= 'Ресурсные поля';
				xLang['SHOWCOLORRESLEVELS']		= 'Показывать уровни ресурсных полей цветами';
				xLang['VILLAGECENTER']			= 'Центр деревни';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Показывать уровни зданий цветами';
				xLang['SHOWCENTERNUMBERS']		= 'Показывать уровни зданий в центре';
				break;
			case "hu":
				// Hungarian translation provided by geo.  Thank you
				xLang['ALLIANCE']				= 'Klán';
				xLang['SIM']					= 'Harc szimulátor';
				xLang['AREYOUSURE']				= 'Biztos vagy benne?';
				xLang['LOSS']					= 'Veszteség';
				xLang['PROFIT']					= 'Nyereség';
				xLang['EXTAVAILABLE']			= 'Fejlesztés elérhetõ';
				xLang['PLAYER']					= 'Játékos';
				xLang['VILLAGE']				= 'Falu';
				xLang['POPULATION']				= 'Népesség';
				xLang['COORDS']					= 'Koordináták';
				xLang['MAPTABLEACTIONS']		= 'Mozgás:';
				xLang['SAVED']					= 'Mentve';
				xLang['YOUNEED']				= 'Kell';
				xLang['TODAY']					= 'ma';
				xLang['TOMORROW']				= 'holnap';
				xLang['PAS_MANYANA']			= 'holnapután';
				xLang['MARKET']					= 'Piac';
				xLang['BARRACKS']				= 'Kaszárnya';
				xLang['RALLYPOINT']				= 'Gyülekezõtér';
				xLang['STABLE']					= 'Istálló';
				xLang['WORKSHOP']				= 'Mûhely';
				xLang['ENVIAR']					= 'Nyersanyag küldése';
				xLang['COMPRAR']				= 'Vétel';
				xLang['VENDER']					= 'Eladás';
				xLang['SENDIGM']				= 'Üzenet küldése';
				xLang['LISTO']					= 'Elérhetõ';
				xLang['ON']						= 'ezen a napon:';
				xLang['A_LAS']					= 'ekkor:';
				xLang['EFICIENCIA']				= 'Hatékonyság';
				xLang['NEVER']					= 'Soha';
				xLang['ALDEAS']					= 'Falvak';
				xLang['TIEMPO']					= 'Idõ';
				xLang['OFREZCO']				= 'Felajánlás';
				xLang['BUSCO']					= 'Keresés';
				xLang['TIPO']					= 'Típus';
				xLang['DISPONIBLE']				= 'Csak elfogadhatót';
				xLang['CUALQUIERA']				= 'Mind';
				xLang['YES']					= 'Igen';
				xLang['NO']						= 'Nem';
				xLang['LOGIN']					= 'Bejelentkezés';
				xLang['MARCADORES']				= 'Könyvjelzõk';
				xLang['ANYADIR']				= 'Hozzáad';
				xLang['ENLACE']					= 'Könyvjelzõ URL';
				xLang['TEXTO']					= 'Könyvjelzõ szövege';
				xLang['ELIMINAR']				= 'Törlés';
				xLang['MAPA']					= 'Térkép';
				xLang['MAXTIME']				= 'Maximum idõ';
				xLang['ARCHIVE']				= 'Archívum';
				xLang['RESUMEN']				= 'Összefoglalás';
				xLang['TROPAS']					= 'Egységek';
				xLang['CHECKVERSION']			= 'TBeyond frissítése';
				xLang['ACTUALIZAR']				= 'Falu információ frissítése';
				xLang['VENTAS']					= 'Mentett ajánlatok';
				xLang['MAPSCAN']				= 'Térkép vizsgálata';
				xLang['BIGICONS']				= 'Bõvített ikonok';
				xLang['NOTEBLOCK']				= 'Jegyzettömb mutatása';
				xLang['SAVE']					= 'Mentés';
				xLang['RPDEFACT']				= 'Gyülekezõtér alapmûvelet';
				xLang['ATTACKTYPE2']			= 'Támogatás';
				xLang['ATTACKTYPE3']			= 'Normál támadás';
				xLang['ATTACKTYPE4']			= 'Rablótámadás';
				xLang['NBSIZE']					= 'Jegyzettömb mérete';
				xLang['NBSIZEAUTO']				= 'Automatikus';
				xLang['NBSIZENORMAL']			= 'Normál (kicsi)';
				xLang['NBSIZEBIG']				= 'Nagy képernyõ (nagy)';
				xLang['NBHEIGHT']				= 'Jegyzettömb magassága';
				xLang['NBAUTOEXPANDHEIGHT']		= 'Magasság automatikus bõvítése';
				xLang['NBKEEPHEIGHT']			= 'Alap magasság';
				xLang['SHOWCENTERNUMBERS']		= 'Épület szintek mutatása';
				xLang['NPCSAVETIME']			= 'Spórolsz: ';
				xLang['SHOWCOLORRESLEVELS']		= 'Külterület színjelzése';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Épületek színjelzése';
				xLang['CNCOLORNEUTRAL']			= 'Szín, ha fejleszthetõ<br>(az alaphoz hagyd üresen)';
				xLang['CNCOLORMAXLEVEL']		= 'Szín, ha teljesen ki van építve<br>(az alaphoz hagyd üresen)';
				xLang['CNCOLORNOUPGRADE']		= 'Szín, ha nem elérhetõ a fejlesztés<br>(az alaphoz hagyd üresen)';
				xLang['CNCOLORNPCUPGRADE']		= 'Szín, ha NPC-vel fejleszthetõ<br>(az alaphoz hagyd üresen)';
				xLang['TOTALTROOPS']			= 'A faluban képzett egységek';
				xLang['SHOWBOOKMARKS']			= 'Könyvjelzõk mutatása';
				xLang['RACECRTV2']				= 'Nép';
				xLang['SERVERVERSION2']			= "Travian v2.x kiszolgáló";
				xLang['SELECTALLTROOPS']		= "Minden egység kiválasztása";
				xLang['PARTY']					= "Ünnepségek";
				xLang['CPPERDAY']				= "KP/nap";
				xLang['SLOT']					= "Hely";
				xLang['TOTAL']					= "Teljes";
				xLang['NOPALACERESIDENCE']		= "Nincs rezidencia vagy palota a faluban, vagy a faluközpont még nincs megnyitva!";
				xLang['SELECTSCOUT']			= "Kémek kiválasztása";
				xLang['SELECTFAKE']				= "Fake kiválasztása";
				xLang['NOSCOUT2FAKE']			= "Nem használhatsz kémeket fake támadásra!";
				xLang['NOTROOP2FAKE']			= "Nincsenek egységek fake támadáshoz!";
				xLang['NOTROOP2SCOUT']			= "Nincsenek egységek kémleléshez!";
				xLang['NOTROOPS']				= "Nincsenek egységek a faluban!";
				xLang['ALL']					= "Mind";
				xLang['NORACE']					= "Építs kaszárnyát vagy menj a faluközpontba a nép automatikus felismeréséhez...";
				xLang['COLORHELPTEXT']			= "A színeket így add meg:<br>- green vagy red vagy  orange stb.<br>- vagy HEX színkóddal #004523<br>- hagyd üresen az alapértelmezett színhez";
				xLang['COLORHELP']				= "Segítség a színes mezõkhöz";
				xLang['SHOWORIGREPORT']			= "Eredeti jelentés (küldéshez)";
				xLang['SHOWCELLTYPEINFO']		= "Mezõ-típus, oázis infó mutatása<br>az egérmutató alatt";
				xLang['WARSIM']					= "Harcszimulátor link:<br>(bal oldali menü)";
				xLang['WARSIMOPTION1']			= "Beépített";
				xLang['WARSIMOPTION2']			= "Külsõ (kirilloid.ru által)";
				xLang['WSANALYSER']				= "World Analyser választása";
				xLang['SHOWSTATLINKS']			= "Linkek a statisztika elemzõhöz";
				xLang['NONEWVERSION']			= "A legújabb verziót használod";
				xLang['BETAVERSION']			= "Lehet hogy BETA verziód van";
				xLang['NEWVERSIONAV']			= "A szkript új verziója elérhetõ";
				xLang['UPDATESCRIPT']			= "Frissíted most?";
				xLang['CHECKUPDATE']			= "Szkript-frissítés keresése. Kérlek várj...";
				xLang['CROPFINDER']				= "Búzakeresõ";
				xLang['AVPOPPERVIL']			= "Falunkénti átlag népesség";
				xLang['AVPOPPERPLAYER']			= "Játékosonkénti átlag népesség";
				xLang['SHOWRESUPGRADETABLE']	= "Külterület fejlesztési táblája";
				xLang['SHOWBUPGTABLE']			= "Épületek fejlesztési táblája";
				xLang['CONSOLELOGLEVEL']		= "Konzol naplózási szint<br>CSAK PROGRAMOZÓKNAK VAGY HIBAKERESÉSHEZ<br>(Alap = 1)";
				xLang['MARKETPRELOAD']			= "Piaci ajánlatoknál több oldal elõre betöltése<br>A Piac -Vásárlás- oldalán<br>(Alap = 1)";
				xLang['CAPITAL']				= 'Fõfalud neve<br><a href="spieler.php">Nézd meg a profilodat a frissítéshez</a>';
				xLang['CAPITALXY']				= 'Fõfalud koordinátái<br><a href="spieler.php">Nézd meg a profilodat a frissítéshez</a>';
				xLang['MAX']					= 'Max';
				xLang['TOTALTROOPSTRAINING']	= 'Összes kiképzés alatt álló egység';
				xLang['SHOWDISTTIMES']			= 'Távolság/idõ mutatása';
				xLang['TBSETUPLINK']			= 'Travian Beyond Beállítások';
				xLang['UPDATEALLVILLAGES']		= 'Minden falu frissítése. HASZNÁLD ÓVATOSAN, TILTÁS JÁRHAT ÉRTE!';
				xLang['SHOWMENUSECTION3']		= "További linkek bal oldalon<br>(Traviantoolbox, World Analyser, Travilog, Térkép, stb.)";
				xLang['LARGEMAP']				= 'Nagy térkép';
				xLang['SHOWTRAVMAPLINKS']		= 'travmap.shishnet.org-ra mutató linkek<br>(felhasználók és klánok)';
				xLang['USETHEMPR']				= 'Arányos elosztás';
				xLang['USETHEMEQ']				= 'Egyenlõ elosztás';
				xLang['TOWNHALL']				= 'Tanácsháza';
				xLang['GAMESERVERTYPE']			= 'Játék kiszolgáló';
				xLang['MARKETOFFERS']			= 'Piaci ajánlatok';
				xLang['ACCINFO']				= 'Felhasználó információ';
				xLang['BOOKMARKOPTIONS']		= 'Könyvjelzõk';//identical to xLang['MARCADORES'] => check if this can be removed
				xLang['NOTEBLOCKOPTIONS']		= 'Jegyzettömb';
				xLang['MENULEFT']				= 'Baloldali menü';
				xLang['STATISTICS']				= 'Statisztikák';
				xLang['RESOURCEFIELDS']			= 'Külterület';
				xLang['VILLAGECENTER']			= 'Faluközpont';
				xLang['MAPOPTIONS']				= 'Térkép beállítások';
				xLang['COLOROPTIONS']			= 'Szín beállítások';
				xLang['DEBUGOPTIONS']			= 'Hibakeresési beállítások';
				xLang['SHOWBIGICONMARKET']		= 'Piac';
				xLang['SHOWBIGICONMILITARY']	= 'Sereg<br>Gyülekezõtér/Kaszárnya/Mûhely/Istálló';
				xLang['SHOWBIGICONALLIANCE']	= 'Klán'; //identical to xLang['ALLIANCE'] => check if this can be removed
				xLang['SHOWBIGICONMILITARY2']	= "Tanácsháza/Hõsök háza/Páncélkovács/Fegyverkovács";
				xLang['HEROSMANSION']			= "Hõsök háza";
				xLang['BLACKSMITH']				= 'Fegyverkovács';
				xLang['ARMOURY']				= 'Páncélkovács';
				xLang['NOW']					= 'Most';
				xLang['CLOSE']					= 'Bezárás';
				xLang['USE']					= 'Használat';
				xLang['USETHEM1H']				= 'Egy órai termelés';
				xLang['OVERVIEW']				= 'Áttekintés';
				xLang['FORUM']					= 'Fórum';
				xLang['ATTACKS']				= 'Támadások';
				xLang['NEWS']					= 'Hírek';
				xLang['ADDCRTPAGE']				= 'Jelenlegi hozzáadása';
				xLang['SCRIPTPRESURL']			= 'TBeyond oldal';
				xLang['NOOFSCOUTS']				= 'Kémek száma a<br>"Kémek választása" funkcióhoz';
				xLang['SPACER']					= 'Elválasztó';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'Egység információ mutatása gyorstippben';
				xLang['MESREPOPTIONS']			= 'Üzenetek & Jelentések';
				xLang['MESREPPRELOAD']			= 'Üzenetek/jelentések elõre betöltött oldalainak száma<br>(Default = 1)';
				xLang['ATTABLES']				= 'Egység tábla';
				xLang['MTWASTED']				= 'Elpazarolva';
				xLang['MTEXCEED']				= 'Meghaladja';
				xLang['MTCURRENT']				= 'Jelenlegi rakomány';
				xLang['ALLIANCEFORUMLINK']		= 'Link külsõ fórumhoz<br>(belsõhöz hagyd üresen)';
				xLang['LOCKBOOKMARKS']			= 'Könyvjelzõk lezárása<br>(Törlés és mozgatás ikonok eltüntetése)';
				xLang['MTCLEARALL']				= 'Mindet törölni';
				xLang['UNLOCKBOOKMARKS']		= 'Könyvjelzõk feloldása<br>(Törlés és mozgatás ikonok mutatása)';
				xLang['CLICKSORT']				= 'Rendezéshez kattints';
				xLang['MIN']					= 'Min';
				xLang['SAVEGLOBAL']				= 'Minden faluhoz menteni';
				xLang['VILLAGELIST']			= 'Falu lista';
				xLang['SHOWINOUTICONS']			= "'dorf1.php' és 'dorf2.php' linkek mutatása";
				xLang['UPDATEPOP']				= 'Népesség frissítése';
				xLang['SHOWRPRINFOTOOLTIPS']	= 'Távolság és idõ mutatása falvakhoz<br>(Gyülekezõtér & Jelentések)';
				xLang['EDIT']					= 'Szerkesztés';
				xLang['SHOWMESOPENLINKS']		= 'Linkek az üzenetek felugró ablakban mutatásához';
				xLang['NPCOPTIONS']				= 'NPC segítõ beállításai';
				xLang['NPCASSISTANT']			= 'NPC segítõ számítások és linkek mutatása';
				xLang['SHOWMAPTABLE']			= 'Játékosok/falvak/oázisok mutatása a térképnél';
				xLang['NEWVILLAGEAV']			= 'Dátum/Idõ';
				xLang['TIMEUNTIL']				= 'Várakozás';
				xLang['SHOWREPDELTABLE']		= '"Mindet törölni" mutatása a jelentésekhez';
				xLang['SHOWIGMLINKFORME']		= '"Üzenet küldése" mutatása magam részére is';
				xLang['CENTERMAP']				= 'Térkép középpontjába ezt a falut';
				xLang['SHOWCENTERMAPICON']		= 'Mutasd a "Térkép központosítása" ikont';
				xLang['INETGPOPTION']			= 'Külsõ grafikus csomagok';
				xLang['ALLOWINETGP']			= 'Külsõ grafikai csomagok engedélyezése';
				xLang['SENDTROOPS']				= 'Egységek kiküldése';
				xLang['SHOWBRSTATDETAILS']		= 'Jelentés statisztika részletezése';
				xLang['SHOWBIGICONMISC']		= "Palota/Rezidencia/Akadémia/Kincstár";
				xLang['PALACE']					= "Palota";
				xLang['RESIDENCE']				= "Rezidencia";
				xLang['ACADEMY']				= "Akadémia";
				xLang['TREASURY']				= "Kincstár";
				xLang['SHOWBBLINK']				= "Villogó szintjelzés az éppen fejlesztett épületekhez";
				break;
			case "no":
				// Norsk oversettelse av ThePirate
				xLang['ALLIANCE']				= 'Allianse';
				xLang['SIM']					= 'Kamp-simulator';
				xLang['AREYOUSURE']				= 'Er du sikker?';
				xLang['LOSS']					= 'Tap';
				xLang['PROFIT']					= 'Profit';
				xLang['EXTAVAILABLE']			= 'Utvidelse tilgjengelig';
				xLang['PLAYER']					= 'Spiller';
				xLang['VILLAGE']				= 'By';
				xLang['POPULATION']				= 'Befolknong';
				xLang['COORDS']					= 'Koordinater';
				xLang['MAPTABLEACTIONS']		= 'Handlinger';
				xLang['SAVED']					= 'Lagret';
				xLang['YOUNEED']				= 'Du trenger';
				xLang['TODAY']					= 'idag';
				xLang['TOMORROW']				= 'imorgen';
				xLang['PAS_MANYANA']			= 'dagen etter imorgen';
				xLang['MARKET']					= 'Markedsplass';
				xLang['BARRACKS']				= 'Kaserne';
				xLang['RALLYPOINT']				= 'Møteplass';
				xLang['STABLE']					= 'Stall';
				xLang['WORKSHOP']				= 'Verksted';
				xLang['ENVIAR']					= 'Send ressurser';
				xLang['COMPRAR']				= 'Kjøp';
				xLang['VENDER']					= 'Selg';
				xLang['SENDIGM']				= 'Send IGM';
				xLang['LISTO']					= 'Kan bygges';
				xLang['ON']						= 'den';
				xLang['A_LAS']					= 'klokken';
				xLang['EFICIENCIA']				= 'Effektivitet';
				xLang['NEVER']					= 'Aldri';
				xLang['ALDEAS']					= 'By(er)';
				xLang['TIEMPO']					= 'Tid';
				xLang['OFREZCO']				= 'Tilbyr';
				xLang['BUSCO']					= 'Leter etter';
				xLang['TIPO']					= 'Type';
				xLang['DISPONIBLE']				= 'Kun tigjengelig';
				xLang['CUALQUIERA']				= 'Alle';
				xLang['YES']					= 'Ja';
				xLang['NO']						= 'Nei';
				xLang['LOGIN']					= 'Logg inn';
				xLang['MARCADORES']				= 'Bokmerker';
				xLang['ANYADIR']				= 'Legg til';
				xLang['ENLACE']					= 'Nytt bokmerke URL';
				xLang['TEXTO']					= 'Nytt nokmerke Text';
				xLang['ELIMINAR']				= 'Slett';
				xLang['MAPA']					= 'Kart';
				xLang['MAXTIME']				= 'Maximum tid';
				xLang['ARCHIVE']				= 'Arkiv';
				xLang['RESUMEN']				= 'Resume';
				xLang['TROPAS']					= 'Tropper';
				xLang['CHECKVERSION']			= 'Oppdater TBeyond';
				xLang['ACTUALIZAR']				= 'Oppdater by-informasjon';
				xLang['VENTAS']					= 'Lagrede tilbud';
				xLang['MAPSCAN']				= 'Scan Kartet';
				xLang['BIGICONS']				= 'Vis utvidede iconer';
				xLang['NOTEBLOCK']				= 'Vis notatblokk';
				xLang['SAVE']					= 'Lagre';
				xLang['RPDEFACT']				= 'Møteplass standard handling ';
				xLang['ATTACKTYPE2']			= 'Forsterkninger';
				xLang['ATTACKTYPE3']			= 'Angrep: Normalt';
				xLang['ATTACKTYPE4']			= 'Angrep: Plyndringstokt';
				xLang['NBSIZE']					= 'Notisblokk størrelse';
				xLang['NBSIZEAUTO']				= 'Auto';
				xLang['NBSIZENORMAL']			= 'Normal (Liten)';
				xLang['NBSIZEBIG']				= 'Større';
				xLang['NBHEIGHT']				= 'Notisblokk høyde';
				xLang['NBAUTOEXPANDHEIGHT']		= 'Automatisk utvid høyde';
				xLang['NBKEEPHEIGHT']			= 'Standard høyde';
				xLang['SHOWCENTERNUMBERS']		= 'Vis bygnings nivå';
				xLang['NPCSAVETIME']			= 'Lagre: ';
				xLang['SHOWCOLORRESLEVELS']		= 'Vi farge på ressurs nivået';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Vis bygnings nivå farger';
				xLang['CNCOLORNEUTRAL']			= 'Farge utvidelse tilgjengelig<br>(Standard = Tom)';
				xLang['CNCOLORMAXLEVEL']		= 'Farge maksimalt nivål<br>(Standard = Tom)';
				xLang['CNCOLORNOUPGRADE']		= 'Farge utvidelse ikke tilgjengelig<br>(Standard = Tom)';
				xLang['CNCOLORNPCUPGRADE']		= 'Farge utvidelse via NPC<br>(Standard = Tom)';
				xLang['TOTALTROOPS']			= 'Totale tropper i byen';
				xLang['SHOWBOOKMARKS']			= 'Vis bokmerker';
				xLang['RACECRTV2']				= 'Stamme';
				xLang['SERVERVERSION2']			= "Travian v2.x server";
				xLang['SELECTALLTROOPS']		= "Velg alle tropper";
				xLang['PARTY']					= "Fester";
				xLang['CPPERDAY']				= "KP/dag";
				xLang['SLOT']					= "Utvidelse";
				xLang['TOTAL']					= "Totalt";
				xLang['NOPALACERESIDENCE']		= "Ingen residens eller palass i denne byen eller sentrum har ikke blidt åpnet enda !";
				xLang['SELECTSCOUT']			= "Velg scout";
				xLang['SELECTFAKE']				= "Velg fake";
				xLang['NOSCOUT2FAKE']			= "Det er umulig å bruke scouts til et fake angrep !";
				xLang['NOTROOP2FAKE']			= "Det er ikke nok tropper til et fake angrep !";
				xLang['NOTROOP2SCOUT']			= "Det er ikke nok tropper til å scoute med !";
				xLang['NOTROOPS']				= "Det er ikke noen tropper i byen !";
				xLang['ALL']					= "Alle";
				xLang['NORACE']					= "Bygg kaserne for å automatisk velge stamme/eller åpne bysentrum...";
				xLang['COLORHELPTEXT']			= "I farge-felt kan du skrive:<br>- <b>green</b> eller <b>red</b> eller  <b>orange</b>, etc.<br>- the HEX color code like <b>#004523</b><br>- leave empty for the default color";
				xLang['COLORHELP']				= "Hjelp for farge felter";
				xLang['SHOWORIGREPORT']			= "Vis orginal rapport (for posting)";
				xLang['SHOWCELLTYPEINFO']		= "Vis rute/oase type<br>ved musepekeren over kartet";
				xLang['WARSIM']					= "Kampsimulator link:<br>(menyen til venstre)";
				xLang['WARSIMOPTION1']			= "Intern (provided by the game)";
				xLang['WARSIMOPTION2']			= "Extern (provided by kirilloid.ru)";
				xLang['WSANALYSER']				= "World Analyser to use";
				xLang['SHOWSTATLINKS']			= "Show analyser statistic links";
				xLang['NONEWVERSION']			= "Du her den siste versjonen tilgjengelig";
				xLang['BETAVERSION']			= "Du har kansje en beta versjon";
				xLang['NEWVERSIONAV']			= "En ny versjon er tilgjengelig";
				xLang['UPDATESCRIPT']			= "Oppdatere nå ?";
				xLang['CHECKUPDATE']			= "Leter etter script oppdatering. Venligst vent...";
				xLang['CROPFINDER']				= "Crop finder";
				xLang['AVPOPPERVIL']			= "Gjennomsnittlig befolkning per by";
				xLang['AVPOPPERPLAYER']			= "Gjennomsnittlig befolkning per spiller";
				xLang['SHOWRESUPGRADETABLE']	= "Vis utvidelseshjelp for ressursfelt";
				xLang['SHOWBUPGTABLE']			= "Vis utvidelseshjelp for bygninger";
				xLang['CONSOLELOGLEVEL']		= "Console Log Level<br>ONLY FOR PROGRAMMERS OR DEBUGGING<br>(Default = 1)";
				xLang['MARKETPRELOAD']			= "Mengde av 'tilbyr' sider som skal lastes<br>i 'Marked => Kjøp' side<br>(Standard = 1)";
				xLang['CAPITAL']				= 'Navn på din hovedby<br><b>Ikke endre på dette, besøk profilen din!</b>';
				xLang['CAPITALXY']				= 'Koordinater til hovedbyen din<br><b>Ikke endre på dette, besøk profilen din!</b>';
				xLang['MAX']					= 'Max';
				xLang['TOTALTROOPSTRAINING']	= 'Total troppe utviklings tid';
				xLang['SHOWDISTTIMES']			= 'Vis avstand og tid';
				xLang['TBSETUPLINK']			= 'Travian Beyond Setup';
				xLang['UPDATEALLVILLAGES']		= 'Oppdater alle byer.  USE WITH MAXIMUM CARE AS THIS CAN LEAD TO A BANNED ACCOUNT !';
				xLang['SHOWMENUSECTION3']		= 'Vis flere lenker i menyen til venstre<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)';
				xLang['LARGEMAP']				= 'Stort kart';
				break;
			case "si":
		  		//By BmW (Thank you !)
				xLang['ALLIANCE']				= 'Aliansa';
				xLang['SIM']					= 'Simulator bitk';
				xLang['AREYOUSURE']				= 'Ali ste prepričani?';
				xLang['LOSS']					= 'Izguba';
				xLang['PROFIT']					= 'Profit';
				xLang['EXTAVAILABLE']			= 'Nadgradnja možna';
				xLang['PLAYER']					= 'Igralec';
				xLang['VILLAGE']				= 'Naselbine';
				xLang['POPULATION']				= 'Populacija';
				xLang['COORDS']					= 'Koordinate';
				xLang['MAPTABLEACTIONS']		= 'Možnosti';
				xLang['SAVED']					= 'Shranjeno';
				xLang['YOUNEED']				= 'Manjka';
				xLang['TODAY']					= 'Danes';
				xLang['TOMORROW']				= 'Jutri';
				xLang['PAS_MANYANA']			= 'Pojutrišnjem';
				xLang['MARKET']					= 'Tržnica';
				xLang['BARRACKS']				= 'Barake';
				xLang['RALLYPOINT']				= 'Zbirališče';
				xLang['STABLE']					= 'Konjušnica';
				xLang['WORKSHOP']				= 'Izdelovalec oblegovalnih naprav';
				xLang['ENVIAR']					= 'Pošlji surovine';
				xLang['COMPRAR']				= 'Kupi';
				xLang['VENDER']					= 'Ponudi';
				xLang['SENDIGM']				= 'Pošlji sporočilo';
				xLang['LISTO']					= 'Dovolj';
				xLang['ON']						= '';
				xLang['A_LAS']					= 'ob';
				xLang['EFICIENCIA']				= 'Izkoristek';
				xLang['NEVER']					= 'Nikoli';
				xLang['ALDEAS']					= 'Vas(i)';
				xLang['TIEMPO']					= 'Čas';
				xLang['OFREZCO']				= 'Ponuja';
				xLang['BUSCO']					= 'Išče';
				xLang['TIPO']					= 'Tip';
				xLang['DISPONIBLE']				= 'Samo možne ponudbe';
				xLang['CUALQUIERA']				= 'Karkoli';
				xLang['YES']					= 'Da';
				xLang['NO']						= 'Ne';
				xLang['LOGIN']					= 'Prijava';
				xLang['MARCADORES']				= 'Povezave';
				xLang['ANYADIR']				= 'Dodaj';
				xLang['ENLACE']					= 'Cilj povezave';
				xLang['TEXTO']					= 'Ime povezave';
				xLang['ELIMINAR']				= 'Izbriši';
				xLang['MAPA']					= 'Zemljevid';
				xLang['MAXTIME']				= 'Maksimalen čas';
				xLang['ARCHIVE']				= 'Arhiv';
				xLang['RESUMEN']				= 'Pregled';
				xLang['TROPAS']					= 'Enote';
				xLang['CHECKVERSION']			= 'Posodobi skripto';
				xLang['ACTUALIZAR']				= 'Posodobi informacije o naseljih';
				xLang['VENTAS']					= 'Shranjene ponudbe';
				xLang['MAPSCAN']				= 'Preglej mapo';
				xLang['BIGICONS']				= 'Dodatne ikone';
				xLang['NOTEBLOCK']				= 'Prikaži beležko';
				xLang['SAVE']					= 'Shrani';
				xLang['RPDEFACT']				= 'Privzeta izbira Zbirališča';
				xLang['ATTACKTYPE2']			= 'Okrepitve';
				xLang['ATTACKTYPE3']			= 'Napad:  Polni napad';
				xLang['ATTACKTYPE4']			= 'Napad:  Roparski pohod';
				xLang['NBSIZE']					= 'Velikost';
				xLang['NBSIZEAUTO']				= 'Auto';
				xLang['NBSIZENORMAL']			= 'Normalna (majhna)';
				xLang['NBSIZEBIG']				= 'Velik zaslon (velika)';
				xLang['NBHEIGHT']				= 'Višina';
				xLang['NBAUTOEXPANDHEIGHT']		= 'Samodejno prilagajaj velikost';
				xLang['NBKEEPHEIGHT']			= 'Privzeta višina';
				xLang['SHOWCENTERNUMBERS']		= 'Stopnje';
				xLang['NPCSAVETIME']			= 'Prihrani: ';
				xLang['SHOWCOLORRESLEVELS']		= 'Barvne stopnje';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Barvne stopnje';
				xLang['CNCOLORNEUTRAL']			= 'Barva: Nadgradnja možna<br>(Prazno = privzeto)';
				xLang['CNCOLORMAXLEVEL']		= 'Barva: Najvišja stopnja<br>(Prazno = privzeto)';
				xLang['CNCOLORNOUPGRADE']		= 'Barva: Nadgradnja ni možna<br>(Prazno = privzeto)';
				xLang['CNCOLORNPCUPGRADE']		= 'Barva: Nadgradnja možna preko NPC Trgovanja<br>(Prazno = privzeto)';
				xLang['TOTALTROOPS']			= 'Skupno število enot';
				xLang['SHOWBOOKMARKS']			= 'Prikaži povezave';
				xLang['RACECRTV2']				= 'Pleme';
				xLang['SERVERVERSION2']			= "Travian v2.x server";
				xLang['SELECTALLTROOPS']		= "Vse enote";
				xLang['PARTY']					= "Festivali";
				xLang['CPPERDAY']				= "KT/Dan";
				xLang['SLOT']					= "Reže";
				xLang['TOTAL']					= "Vsota";
				xLang['NOPALACERESIDENCE']		= "V naselju ni rezidence oz. palače ali pa center naselja še ni bil odprt";
				xLang['SELECTSCOUT']			= "Skavti";
				xLang['SELECTFAKE']				= "Fake";
				xLang['NOSCOUT2FAKE']			= "Ni mogoče poslati skavtov kot fake napad";
				xLang['NOTROOP2FAKE']			= "Ni dovolj enot za fake napad!";
				xLang['NOTROOP2SCOUT']			= "Ni dovolj enot za poizvedbo!";
				xLang['NOTROOPS']				= "V naselju ni enot!";
				xLang['ALL']					= "Vse";
				xLang['NORACE']					= "Zgradite barake za samodejno prepoznavanje rase in/ali odprite center naselja...";
				xLang['COLORHELPTEXT']			= "V polja za barvo lahko vnesete:<br>- npr. green(zelena) ali red(rdeča) ali orange(oranžna)<br>- HEX kodo kot #004523<br>- pustite prazno za privzete barve";
				xLang['COLORHELP']				= "Pomoč za barvna polja";
				xLang['SHOWORIGREPORT']			= "Prikaži originalno poročilo (za pošiljanje)";
				xLang['SHOWCELLTYPEINFO']		= "Prikaži tip polja/info oaze<br>med premikanjem miške po mapi";
				xLang['WARSIM']					= "Simulator bitk (link):<br>(levi meni)";
				xLang['WARSIMOPTION1']			= "Notranji (ponujen v igri)";
				xLang['WARSIMOPTION2']			= "Zunanji (ponujen pri kirilloid.ru)";
				xLang['WSANALYSER']				= "Uporabi World Analyser";
				xLang['SHOWSTATLINKS']			= "Prikažali linke od Analyser statistike";
				xLang['NONEWVERSION']			= "Skripte ni treba posodobiti";
				xLang['BETAVERSION']			= "Lahko, da imate beta različico";
				xLang['NEWVERSIONAV']			= "Nova različica skripte je na voljo";
				xLang['UPDATESCRIPT']			= "Posodobi skripto?";
				xLang['CHECKUPDATE']			= "Preverjam za posodobitev. Prosim počakajte...";
				xLang['CROPFINDER']				= "Iskalec Žita";
				xLang['AVPOPPERVIL']			= "Povprečna populacija naselja";
				xLang['AVPOPPERPLAYER']			= "Povprečna populacija igralca";
				xLang['SHOWRESUPGRADETABLE']	= "Tabela nadgradenj";
				xLang['SHOWBUPGTABLE']			= "Tabela nadgradenj";
				xLang['CONSOLELOGLEVEL']		= "Konzola (Za stopnje)<br>SAMO ZA PROGRAMERJE ALI RAZHROŠČEVANJE<br>(Privzeto = 0 ali pustite prazno)";
				xLang['MARKETPRELOAD']			= 'Število strani ponudb, ki se naj naložijo:<br>medtem ko ste na "Tržnici => Kupi" strani<br>(Privzeto = 1)';
				xLang['CAPITAL']				= 'Ime metropole';
				xLang['CAPITALXY']				= 'Koordinate metropole';
				xLang['MAX']					= 'Maksimalno';
				xLang['TOTALTROOPSTRAINING']	= 'Skupno število enot v postopku';
				xLang['SHOWDISTTIMES']			= 'Prikaži razdalje in čase';
				xLang['TBSETUPLINK']			= 'Travian Beyond Nastavitve';
				xLang['UPDATEALLVILLAGES']		= 'Osveži vsa naselja.';
				xLang['SHOWMENUSECTION3']		= 'Dodatne povezave v levem meniju<br>(Traviantoolbox, World Analyser, Travilog, Map.)';
				xLang['LARGEMAP']				= 'Veliki zemljevid';
				xLang['SHOWTRAVMAPLINKS']		= 'Prikaži povezave do travmap.shishnet.org<br>(uporabniki in alianse)';
				xLang['USETHEMPR']				= 'Uporabi (izmenično)';
				xLang['USETHEMEQ']				= 'Uporabi (enako)';
				xLang['TOWNHALL']				= 'Mestna hiša';
				xLang['GAMESERVERTYPE']			= 'Tip Serverja';
				xLang['MARKETOFFERS']			= 'Tržnica';
				xLang['ACCINFO']				= 'Informacije o računu';
				xLang['BOOKMARKOPTIONS']		= 'Povezave';
				xLang['NOTEBLOCKOPTIONS']		= 'Beležka';
				xLang['MENULEFT']				= 'Meni na levi strani';
				xLang['STATISTICS']				= 'Statistika';
				xLang['RESOURCEFIELDS']			= 'Surovinska polja';
				xLang['VILLAGECENTER']			= 'Center naselja';
				xLang['MAPOPTIONS']				= 'Možnosti zemljevida';
				xLang['COLOROPTIONS']			= 'Barve';
				xLang['DEBUGOPTIONS']			= 'Možnosti razhroščevanja';
				xLang['SHOWBIGICONMARKET']		= 'Tržnica';
				xLang['SHOWBIGICONMILITARY']	= 'Vojska<br>Zbirališče/Barake/Konjušnica/Izdelovalec oblegovalnih naprav';
				xLang['SHOWBIGICONALLIANCE']	= 'Aliansa';
				xLang['SHOWBIGICONMILITARY2']	= 'Mestna hiša/Herojeva residenca<br>Izdelovalec oklepov/Izdelovalec orožja';
				xLang['HEROSMANSION']			= 'Herojeva residenca';
				xLang['BLACKSMITH']				= 'Izdelovalec orožja';
				xLang['ARMOURY']				= 'Izdelovalec oklepov';
				xLang['NOW']					= 'Sedaj';
				xLang['CLOSE']					= 'Zapri';
				xLang['USE']					= 'Uporabi';
				xLang['USETHEM1H']				= 'Uporabi (1 urna proizvodnja)';
				xLang['OVERVIEW']				= 'Pregled';
				xLang['FORUM']					= 'Forum';
				xLang['ATTACKS']				= 'Napadi';
				xLang['NEWS']					= 'Novice';
				xLang['ADDCRTPAGE']				= 'Dodaj trenutno stran';
				xLang['SCRIPTPRESURL']			= 'TBeyond stran';
				xLang['NOOFSCOUTS']				= 'Število skavtov za "Skavti" funkcijo';
				xLang['SPACER']					= 'Ločilna črta';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'Prikaži informacije o enoti, ki je v vasi<br>(Ko greste z miško na enoto)';
				xLang['MESREPOPTIONS']			= 'Sporočila in Poročila';
				xLang['MESREPPRELOAD']			= 'Število strani Sporočil/Poročil, ki se naj naložijo<br>(Privzeto = 1)';
				xLang['ATTABLES']				= 'Tabela enot';
				xLang['MTWASTED']				= 'Ostane';
				xLang['MTEXCEED']				= 'Preseženo';
				xLang['MTCURRENT']				= 'Skupaj';
				xLang['ALLIANCEFORUMLINK']		= 'Povezava do zunanjega Foruma<br>(Pusti prazno za notranji Forum)';
				xLang['MTCLEARALL']				= 'Počisti vse';
				xLang['LOCKBOOKMARKS']			= 'Zakleni povezave';
				xLang['UNLOCKBOOKMARKS']		= 'Odkleni povezave';
				xLang['CLICKSORT']				= 'Razvrsti';
				xLang['MIN']					= 'Minimalno';
				xLang['SAVEGLOBAL']				= 'Shrani za vse vasi';
				xLang['VILLAGELIST']			= 'Naselja';
				xLang['SHOWINOUTICONS']			= "Prikaži 'dorf1' in 'dorf2' povezave";
				xLang['UPDATEPOP']				= 'Posodobi populacijo';
				xLang['SHOWRPRINFOTOOLTIPS']	= 'Prikaži razdalje in čase do vasi<br>(Zbirališče in Poročila)';
				xLang['EDIT']					= 'Uredi';
				xLang['SHOWMESOPENLINKS']		= 'Prikaži ikono za odpiranje sporočil v novem oknu (Pop-up)';
				xLang['NPCOPTIONS']				= 'Možnosti NPC trgovanja';
				xLang['NPCASSISTANT']			= 'Prikaži NPC izračune/povezave';
				xLang['NEWVILLAGEAV']			= 'Nova vas';
				xLang['SHOWMAPTABLE']			= 'Prikaži tabelo Igralcev/Vasi/Okupiranih pokrajin';
				xLang['NEWVILLAGEAV']			= 'Datum/Čas';
				xLang['TIMEUNTIL']				= 'Čas čakanja';
				xLang['SHOWREPDELTABLE']		= 'Prikaži "Izbriši Vse" tabelo na strani poročil';
				xLang['SHOWIGMLINKFORME']		= 'Prikaži "Pošlji IGM" ikono tudi za mene';
				xLang['CENTERMAP']				= 'Centriraj zemljevid';
				xLang['SHOWCENTERMAPICON']		= 'Prikaži "Centriraj zemljevid" ikono';
				xLang['INETGPOPTION']			= 'Grafični paket';
				xLang['ALLOWINETGP']			= 'Dovoli grafični paket';
				xLang['SENDTROOPS']				= 'Pošlji enote';
				xLang['SHOWBRSTATDETAILS']		= 'Prikaži podrobnosti pri poročilih';
				xLang['SHOWBIGICONMISC']		= "Palača/Rezidenca/Akademija/Zakladnica";
				xLang['PALACE']					= "Palača";
				xLang['RESIDENCE']				= "Rezidenca";
				xLang['ACADEMY']				= "Akademija";
				xLang['TREASURY']				= "Zakladnica";
		  		break;
			case "tw":
			case "hk":
				// Taiwanese (Trd. Chinese) translation by MarioCheng, revised by chihsun(Thank you !)
				xLang['ALLIANCE']				= '聯盟';
				xLang['SIM']					= '戰鬥模擬器';
				xLang['AREYOUSURE']				= '是否確定?';
				xLang['LOSS']					= '損失';
				xLang['PROFIT']					= '獲益';
				xLang['EXTAVAILABLE']			= '已可升級!';
				xLang['PLAYER']					= '玩家';
				xLang['VILLAGE']				= '村莊';
				xLang['POPULATION']				= '人口';
				xLang['COORDS']					= '座標';
				xLang['MAPTABLEACTIONS']		= '行動';
				xLang['SAVED']					= '儲存';
				xLang['YOUNEED']				= '您要';
				xLang['TODAY']					= '今天';
				xLang['TOMORROW']				= '明天';
				xLang['PAS_MANYANA']			= '後天';
				xLang['MARKET']					= '市場';
				xLang['BARRACKS']				= '兵營';
				xLang['RALLYPOINT']				= '集結點';
				xLang['STABLE']					= '馬廄';
				xLang['WORKSHOP']				= '工場';
				xLang['ENVIAR']					= '運送資源';
				xLang['COMPRAR']				= '買進';
				xLang['VENDER']					= '賣出';
				xLang['SENDIGM']				= '發送IGM';
				xLang['LISTO']					= '升級可於';
				xLang['ON']						= '-';
				xLang['A_LAS']					= '-';
				xLang['EFICIENCIA']				= '效率';
				xLang['NEVER']					= '永不';
				xLang['ALDEAS']					= '村莊';
				xLang['TIEMPO']					= '時間';
				xLang['OFREZCO']				= '提供';
				xLang['BUSCO']					= '搜索';
				xLang['TIPO']					= '比例';
				xLang['DISPONIBLE']				= '忽略過少物資';
				xLang['CUALQUIERA']				= '所有';
				xLang['YES']					= '是';
				xLang['NO']						= '否';
				xLang['LOGIN']					= '登入';
				xLang['MARCADORES']				= '書籤';
				xLang['ANYADIR']				= '加入';
				xLang['ENLACE']					= '新書籤網址';
				xLang['TEXTO']					= '新書籤標題(只限英文及數字)';
				xLang['ELIMINAR']				= '刪除';
				xLang['MAPA']					= '地圖 (TravMap)';
				xLang['MAXTIME']				= '最大運輸時間';
				xLang['ARCHIVE']				= '儲存';
				xLang['RESUMEN']				= '概要';
				xLang['TROPAS']					= '軍隊';
				xLang['CHECKVERSION']			= '檢查版本更新';
				xLang['ACTUALIZAR']				= '更新此村莊的資料';
				xLang['VENTAS']					= '賣出紀錄';
				xLang['MAPSCAN']				= '搜尋此地圖';
				xLang['BIGICONS']				= '顯示更多快捷圖示';
				xLang['NOTEBLOCK']				= '顯示筆記欄';
				xLang['SAVE']					= '儲存';
				xLang['RPDEFACT']				= '集結點的預設行動';
				xLang['ATTACKTYPE2']			= '增援';
				xLang['ATTACKTYPE3']			= '攻擊：正常';
				xLang['ATTACKTYPE4']			= '攻擊：搶奪';
				xLang['NBSIZE']					= '筆記欄大小';
				xLang['NBSIZEAUTO']				= '自動';
				xLang['NBSIZENORMAL']			= '普通 (細)';
				xLang['NBSIZEBIG']				= '大畫面 (大)';
				xLang['NBHEIGHT']				= '筆記欄高度';
				xLang['NBAUTOEXPANDHEIGHT']		= '自動變更高度';
				xLang['NBKEEPHEIGHT']			= '固定高度';
				xLang['SHOWCENTERNUMBERS']		= '顯示建築物等級';
				xLang['NPCSAVETIME']			= '儲存資源需時：';
				xLang['SHOWCOLORRESLEVELS']		= '顯示資源田等級顏色';
				xLang['SHOWCOLORBUILDLEVELS']	= '顯示建築物等級顏色';
				xLang['CNCOLORNEUTRAL']			= '已可升級的顏色<br>(預設 = 空白)';
				xLang['CNCOLORMAXLEVEL']		= '已達最高等級的顏色<br>(預設 = 空白)';
				xLang['CNCOLORNOUPGRADE']		= '不可升級的顏色<br>(預設 = 空白)';
				xLang['CNCOLORNPCUPGRADE']		= '可利用NPC交易來升級的顏色<br>(預設 = 空白)';
				xLang['TOTALTROOPS']			= '此村莊的軍隊總數';
				xLang['SHOWBOOKMARKS']			= '顯示書籤';
				xLang['RACECRTV2']				= '種族';
				xLang['SERVERVERSION2']			= "Travian v2.x 伺服器";
				xLang['SELECTALLTROOPS']		= "選取全部士兵";
				xLang['PARTY']					= "慶祝";
				xLang['CPPERDAY']				= "文明點（每天）";
				xLang['SLOT']					= "擴展量";
				xLang['TOTAL']					= "總數";
				xLang['NOPALACERESIDENCE']		= "此村莊無行宮(皇宮)或是尚未開啟村莊大樓 !";
				xLang['SELECTSCOUT']			= "選取偵察軍隊";
				xLang['SELECTFAKE']				= "選取佯攻軍隊";
				xLang['NOSCOUT2FAKE']			= "無法使用偵察軍種來發出佯攻!";
				xLang['NOTROOP2FAKE']			= "沒有軍隊可以發出佯攻!";
				xLang['NOTROOP2SCOUT']			= "沒有偵察軍隊!";
				xLang['NOTROOPS']				= "此村莊無軍隊!";
				xLang['ALL']					= "全部";
				xLang['NORACE']					= "請建設軍營或開啟村莊大樓來取得種族資料";
				xLang['COLORHELPTEXT']			= "在欄位中，可以輸入：<br>- green 或 red 或 orange, 等等...<br>- 或是輸入顏色的16進制碼，如 #004523<br>- 也可以保留空白來使用預設顏色";
				xLang['COLORHELP']				= "顏色設定說明";
				xLang['SHOWORIGREPORT']			= "顯示原始的報告 (給張貼用)";
				xLang['SHOWCELLTYPEINFO']		= "當滑鼠移到時<br>顯示村莊種類或綠洲資料";
				xLang['WARSIM']					= "左側選單的戰鬥模擬器連結";
				xLang['WARSIMOPTION1']			= "內置 (由遊戲所提供)";
				xLang['WARSIMOPTION2']			= "外連 (由kirilloid.ru提供)";
				xLang['WSANALYSER']				= "選取世界分析網站";
				xLang['SHOWSTATLINKS']			= "在玩家名稱右側顯示分析連結";
				xLang['NONEWVERSION']			= "您正在使用最新版本";
				xLang['BETAVERSION']			= "目前正在使用測試版";
				xLang['NEWVERSIONAV']			= "目前已有更新的版本，";
				xLang['UPDATESCRIPT']			= "是否需要更新？";
				xLang['CHECKUPDATE']			= "正在檢查程式更新，請稍候...";
				xLang['CROPFINDER']				= "搜田工具";
				xLang['AVPOPPERVIL']			= "平均每村人口";
				xLang['AVPOPPERPLAYER']			= "平均每玩家人口";
				xLang['SHOWRESUPGRADETABLE']	= "顯示全資源田升級表單";
				xLang['SHOWBUPGTABLE']			= "顯示全建築物升級表單";
				xLang['CONSOLELOGLEVEL']		= "程式記錄等級<br>只適用於程式開發員 或 除蟲工作<br>(預設 = 0)";
				xLang['MARKETPRELOAD']			= "預先載入的頁數<br>'市場 → 買進' 的頁面中<br>(預設 = 1, 最多 = 5)";
				xLang['CAPITAL']				= '您村莊的名稱<br>請瀏覽個人資料來進行自動更新，不要手動修改此欄';
				xLang['CAPITALXY']				= '您村莊的坐標<br>請瀏覽個人資料來進行自動更新，不要手動修改此欄';
				xLang['MAX']					= '最多';
				xLang['TOTALTROOPSTRAINING']	= '所有正在訓練的士兵';
				xLang['SHOWDISTTIMES']			= '顯示距離及時間';
				xLang['TBSETUPLINK']			= '設定 TBeyond ML&CN';
				xLang['UPDATEALLVILLAGES']		= '更新所有村莊資料。(有機會導致被鎖帳號)';
				xLang['SHOWMENUSECTION3']		= "在左側選單中顯示更多連結<br>(Traviantoolbox, World Analyser, Travilog, Map, 等等.)";
				xLang['LARGEMAP']				= '大地圖';
				xLang['SHOWTRAVMAPLINKS']		= '顯示travmap.shishnet.org的連結<br>(用戶和聯盟地圖)';
				xLang['USETHEMPR']				= '派出所有商人 (按資源比例分配)';
				xLang['USETHEMEQ']				= '派出所有商人 (平均分配)';
				xLang['TOWNHALL']				= '村會堂';
				xLang['GAMESERVERTYPE']			= '遊戲伺服器';
				xLang['MARKETOFFERS']			= '市場賣出紀錄';
				xLang['ACCINFO']				= '帳號資料';
				xLang['BOOKMARKOPTIONS']		= '書籤';
				xLang['NOTEBLOCKOPTIONS']		= '筆記欄';
				xLang['MENULEFT']				= '左側選單';
				xLang['STATISTICS']				= '統計';
				xLang['RESOURCEFIELDS']			= '資源田';
				xLang['VILLAGECENTER']			= '城鎮中心';
				xLang['MAPOPTIONS']				= '地圖設定';
				xLang['COLOROPTIONS']			= '顏色設定';
				xLang['DEBUGOPTIONS']			= '除蟲設定';
				xLang['SHOWBIGICONMARKET']		= '市場';
				xLang['SHOWBIGICONMILITARY']	= '集結點/兵營/工場/馬廄';
				xLang['SHOWBIGICONALLIANCE']	= '聯盟';
				xLang['SHOWBIGICONMILITARY2']	= "村會堂/英雄宅/鐵匠/盔甲廠";
				xLang['HEROSMANSION']			= "英雄宅";
				xLang['BLACKSMITH']				= "鐵匠";
				xLang['ARMOURY']				= "盔甲廠";
				xLang['NOW']					= '現在';
				xLang['CLOSE']					= '關閉';
				xLang['USE']					= '送出';
				xLang['USETHEM1H']				= '派出所有商人 (資源1小時產量)';
				xLang['OVERVIEW']				= '概要';
				xLang['FORUM']					= '論壇';
				xLang['ATTACKS']				= '攻擊';
				xLang['NEWS']					= '新聞';
				xLang['ADDCRTPAGE']				= '加入此頁';
				xLang['SCRIPTPRESURL']			= 'TB ML&CN 官網';
				xLang['NOOFSCOUTS']				= '設定"選取偵察軍隊"時<br>預設派出的軍隊數量';
				xLang['SPACER']					= '分隔線';
				xLang['SHOWTROOPINFOTOOLTIPS']	= '在tooltip中顯示軍隊資料';
				xLang['MESREPOPTIONS']			= '訊息和報告';
				xLang['MESREPPRELOAD']			= '預先載入的頁數<br> 訊息和報告 的頁面中<br>(預設 = 1, 最多 = 5)';
				xLang['ATTABLES']				= '軍隊列表';//only for users with PLUS => dorf3.php?s=6 link on dorf3.php pages
				xLang['MTWASTED']				= '浪費負載';
				xLang['MTEXCEED']				= '超載量';
				xLang['MTCURRENT']				= '目前總搬運量';
				xLang['ALLIANCEFORUMLINK']		= '連結到自設聯盟論壇<br>(保留空白來使用預設聯盟論壇)';
				xLang['LOCKBOOKMARKS']			= '鎖定書籤<br>(隱藏 刪除, 移上, 移下的圖示)';
				xLang['MTCLEARALL']				= '全部清除'; 
				xLang['UNLOCKBOOKMARKS']		= '解鎖書籤<br>(顯示 刪除, 移上, 移下的圖示)';
				xLang['CLICKSORT']				= '點擊來排序';
				xLang['MIN']					= '最少';
				xLang['SAVEGLOBAL']				= '分享記錄到其他村莊';
				xLang['VILLAGELIST']			= '村莊列表';
				xLang['SHOWINOUTICONS']			= "在村莊旁顯示 'dorf1.php'和'dorf2.php'的圖示";
				xLang['UPDATEPOP']				= '更新人口';
				xLang['SHOWRPRINFOTOOLTIPS']	= '在tooltip中顯示距離和時間<br>(集結點&報告)';
				xLang['EDIT']					= '編輯';
				xLang['SHOWMESOPENLINKS']		= '顯示以彈出視窗方式讀取IGM的連結';
				xLang['NPCOPTIONS']				= 'NPC交易選項';
				xLang['NPCASSISTANT']			= '顯示NPC交易的連結和計算';
				xLang['SHOWMAPTABLE']			= '在地圖顯示 玩家/村莊/綠洲 表單';
				xLang['NEWVILLAGEAV']			= '日期/時間';
				xLang['TIMEUNTIL']				= '需要等待的時間';
				xLang['SHOWREPDELTABLE']		= '在報告頁面顯示 "全部刪除" 表單';
				xLang['SHOWIGMLINKFORME']		= '顯示 "發IGM給自己" 的圖示';
				xLang['CENTERMAP']				= '將村莊在地圖置中';
				xLang['SHOWCENTERMAPICON']		= "在村莊旁顯示 '地圖置中'的圖示";
				xLang['INETGPOPTION']			= '網路圖像包';
				xLang['ALLOWINETGP']			= '允許使用網絡路圖像包';
				xLang['SENDTROOPS']				= '派遣軍隊';
				xLang['SHOWBRSTATDETAILS']		= '顯示詳細戰鬥統計報告';
				xLang['SHOWBIGICONMISC']		= "皇宮/行宮/研究院/寶物庫";
				xLang['PALACE']					= "皇宮";
				xLang['RESIDENCE']				= "行宮";
				xLang['ACADEMY']				= "研究院";
				xLang['TREASURY']				= "寶物庫";
				xLang['SHOWBBLINK']				= "閃爍顯示正在升級的建築";
				xLang['SHOWSENDTROOPSRESOURCES']= "在村莊旁顯示 '集結點/運送資源'的圖示";
				break;
			case "cn":
				//provided by 独自疯狂 (Thank you !)
				xLang['ALLIANCE']				= '联盟';
				xLang['SIM']					= '战斗模拟器';
				xLang['AREYOUSURE']				= '你确定吗?';
				xLang['LOSS']					= '损失';
				xLang['PROFIT']					= '获益';
				xLang['EXTAVAILABLE']			= '可以升级!';
				xLang['PLAYER']					= '玩家';
				xLang['VILLAGE']				= '村庄';
				xLang['POPULATION']				= '人口';
				xLang['COORDS']					= '坐标';
				xLang['MAPTABLEACTIONS']		= '行动';
				xLang['SAVED']					= '已保存';
				xLang['YOUNEED']				= '您要';
				xLang['TODAY']					= '今天';
				xLang['TOMORROW']				= '明天';
				xLang['PAS_MANYANA']			= '后天';
				xLang['MARKET']					= '市场';
				xLang['BARRACKS']				= '兵营';
				xLang['RALLYPOINT']				= '集结点';
				xLang['STABLE']					= '马厩';
				xLang['WORKSHOP']				= '工场';
				xLang['ENVIAR']					= '运送资源';
				xLang['COMPRAR']				= '买';
				xLang['VENDER']					= '卖';
				xLang['SENDIGM']				= '发送IGM';
				xLang['LISTO']					= '升级可于';
				xLang['ON']						= '-';
				xLang['A_LAS']					= '-';
				xLang['EFICIENCIA']				= '效率';
				xLang['NEVER']					= '永不';
				xLang['ALDEAS']					= '村庄';
				xLang['TIEMPO']					= '时间';
				xLang['OFREZCO']				= '提供';
				xLang['BUSCO']					= '搜索';
				xLang['TIPO']					= '比例';
				xLang['DISPONIBLE']				= '忽略过少物资';
				xLang['CUALQUIERA']				= '所有';
				xLang['YES']					= '是';
				xLang['NO']						= '否';
				xLang['LOGIN']					= '登入';
				xLang['MARCADORES']				= '书签';
				xLang['ANYADIR']				= '加入';
				xLang['ENLACE']					= '新书签网址';
				xLang['TEXTO']					= '新书签标题(只限英文及数字)';
				xLang['MAXTIME']				= '最大运输时间';
				xLang['ELIMINAR']				= '删除';
				xLang['MAPA']					= 'TravMap';
				xLang['CHECKVERSION']			= '检查更新';
				xLang['ARCHIVE']				= '保存';
				xLang['RESUMEN']				= '概要';
				xLang['TOTALTROOPS']			= '此村庄的士兵总数';
				xLang['SELECTALLTROOPS']		= "选择全部士兵";
				xLang['SELECTSCOUT']			= "选择侦察兵";
				xLang['SELECTFAKE']				= "选择佯攻";
				xLang['TOTAL']					= "总数";
				xLang['AVPOPPERVIL']			= "平均每村人口";
				xLang['AVPOPPERPLAYER']			= "平均每玩家人口";
				xLang['PARTY']					= "活动";
				xLang['CPPERDAY']				= "文明点（每天）";
				xLang['SLOT']					= "扩张";
				xLang['TROPAS']					= '军队';
				xLang['ATTACKTYPE2']			= '增援';
				xLang['ATTACKTYPE3']			= '攻击：普通';
				xLang['ATTACKTYPE4']			= '攻击：抢夺';
				xLang['ALL']					= "全部";
				xLang['CHECKUPDATE']			= "正在检查插件更新，请等等...";
				xLang['NONEWVERSION']			= "你正在使用最新版本";
				xLang['NBSIZE']					= '笔记栏大小';
				xLang['NBSIZEAUTO']				= '自动';
				xLang['NBSIZENORMAL']			= '普通 (细)';
				xLang['NBSIZEBIG']				= '大画面 (大)';
				xLang['NBHEIGHT']				= '笔记栏高度';
				xLang['NBAUTOEXPANDHEIGHT']		= '高度自动伸展';
				xLang['NBKEEPHEIGHT']			= '基本高度';
				xLang['SHOWCENTERNUMBERS']		= '显示建筑物等级';
				xLang['NPCSAVETIME']			= '资源满足需时：';
				xLang['SHOWCOLORRESLEVELS']		= '显示资源田等级颜色';
				xLang['SHOWCOLORBUILDLEVELS']	= '显示建筑物等级颜色';
				xLang['CONSOLELOGLEVEL']		= "控制台日志等级<br>只适用于程序开发员 或 BUG调试<br>(默认 = 0 or 空白)";
				xLang['MARKETPRELOAD']			= "页数预先加载<br>在 '市场 => 买入' 页面中<br>(默认 = 1 或 空白; 最多 = 5)";
				xLang['CNCOLORNEUTRAL']			= '已可升级的颜色<br>(默认 = 空白)';
				xLang['CNCOLORMAXLEVEL']		= '已达最高等级的颜色<br>(默认 = 空白)';
				xLang['CNCOLORNOUPGRADE']		= '不可升级的颜色<br>(默认 = 空白)';
				xLang['CNCOLORNPCUPGRADE']		= '可利用npc交易来升级的颜色<br>(默认 = 空白)';
				xLang['SHOWBOOKMARKS']			= '显示书签';
				xLang['RACECRTV2']				= '种族';
				xLang['SERVERVERSION2']			= "Travian v2.x 服务器";
				xLang['CAPITAL']				= '主村名称<br>请浏览自己的个人资料来进行自动更新，不要自己修改此栏';
				xLang['CAPITALXY']				= '主村坐标<br>请浏览自己的个人资料来进行自动更新，不要自己修改此栏';
				xLang['MAX']					= '最多';
				xLang['CROPFINDER']				= "找田助手";
				xLang['VENTAS']					= '卖出纪录';
				xLang['SAVE']					= '保存';
				xLang['RPDEFACT']				= '集结点的默认行动';
				xLang['BIGICONS']				= '显示更多快捷图标';
				xLang['NOTEBLOCK']				= '显示笔记栏';
				xLang['SHOWORIGREPORT']			= "显示原始报告";
				xLang['SHOWCELLTYPEINFO']		= "当鼠标移到时<br>显示村庄种类或绿洲数据";
				xLang['WARSIM']					= "左边选单的战斗模拟器链接";
				xLang['WARSIMOPTION1']			= "内置 (由游戏所提供)";
				xLang['WARSIMOPTION2']			= "外部 (由kirilloid.ru提供)";
				xLang['WSANALYSER']				= "所选用的世界分析";
				xLang['SHOWSTATLINKS']			= "在玩家名称右边显示分析链接";
				xLang['SHOWRESUPGRADETABLE']	= "显示资源田升级信息";
				xLang['SHOWBUPGTABLE']			= "显示建筑物升级信息";
				xLang['COLORHELPTEXT']			= "在字段中，你可输入：<br>- green 或 red 或 orange, 等等...<br>- 也可输入颜色的16进制码，如 #004523<br>- 也可以什么也不填来用默认颜色";
				xLang['COLORHELP']				= "颜色设定帮助";
				xLang['NEWVERSIONAV']			= "已有新版本插件推出了，";
				xLang['UPDATESCRIPT']			= "要进行更新吗？";
				xLang['MAPSCAN']				= '扫描此地图';
				xLang['NORACE']					= "请建设兵营或开启市政厅来自动设定种族...";
				xLang['TOTALTROOPSTRAINING']	= '所有正在训练的士兵';
				xLang['SHOWDISTTIMES']			= '显示距离及时间';
				xLang['SHOWMENUSECTION3']		= "在左边的选单显示更多链接<br>(Travilog,Traviantoolbox,TravMap,World Analyser等等.)";
				xLang['TBSETUPLINK']			= 'TB设置';
				xLang['UPDATEALLVILLAGES']		= '更新所有村庄。(有可能导致账号被锁)';
				xLang['LARGEMAP']				= '大地图';
				xLang['SHOWTRAVMAPLINKS']		= '显示travmap.shishnet.org的链接<br>(用户和联盟地图)';
				xLang['USETHEMPR']				= '派出所有商人 (按资源比例分配)';
				xLang['USETHEMEQ']				= '派出所有商人 (平均分配)';
				xLang['TOWNHALL']				= '市政厅';
				xLang['GAMESERVERTYPE']			= '游戏服务器';
				xLang['MARKETOFFERS']			= '市场卖出纪录';
				xLang['ACCINFO']				= '个人资料';
				xLang['BOOKMARKOPTIONS']		= '书签';
				xLang['NOTEBLOCKOPTIONS']		= '笔记栏';
				xLang['MENULEFT']				= '左边选单';
				xLang['STATISTICS']				= '统计';
				xLang['RESOURCEFIELDS']			= '村落概貌';
				xLang['VILLAGECENTER']			= '村庄中心';
				xLang['MAPOPTIONS']				= '地图设定';
				xLang['COLOROPTIONS']			= '颜色设定';
				xLang['DEBUGOPTIONS']			= '调试设定';
				xLang['SHOWBIGICONMARKET']		= '市场';
				xLang['SHOWBIGICONMILITARY']	= '军事<br>集结点/兵营/马厩/工场';
				xLang['SHOWBIGICONALLIANCE']	= '联盟';
				xLang['SHOWBIGICONMILITARY2']	= "市政厅/英雄园/铁匠铺/军械库";
				xLang['HEROSMANSION']			= "英雄园";
				xLang['BLACKSMITH']				= "铁匠铺";
				xLang['ARMOURY']				= "军械库";
				xLang['NOW']					= '现在';
				xLang['CLOSE']					= '关闭';
				xLang['USE']					= '送出';
				xLang['USETHEM1H']				= '派出所有商人 (资源1小时产量)';
				xLang['OVERVIEW']				= '概要';
				xLang['FORUM']					= '论坛';
				xLang['ATTACKS']				= '攻击';
				xLang['NEWS']					= '新闻';
				xLang['ADDCRTPAGE']				= '加入本页';
				xLang['SCRIPTPRESURL']			= 'TBeyond官方网站 汉化：独自疯狂';
				xLang['ACTUALIZAR']				= '更新此村庄的数据';
				xLang['NOOFSCOUTS']				= '利用"选择侦察兵"时<br>所派出侦察兵的数量';
				xLang['SPACER']					= '分隔线';
				xLang['SHOWTROOPINFOTOOLTIPS']	= '快速显示士兵数据';
				xLang['MESREPOPTIONS']			= '讯息&报告';
				xLang['MESREPPRELOAD']			= '在讯息和报告的页面中<br>预先加载的页数<br>(默认 = 1 或 空白; 最多 = 5)';
				xLang['ATTABLES']				= '军队的列表';
				xLang['MTWASTED']				= '浪费负载';
				xLang['MTEXCEED']				= '超载量';
				xLang['MTCURRENT']				= '现时总搬运数';
				xLang['ALLIANCEFORUMLINK']		= '链接到外置论坛<br>(留空来使用内置论坛)';
				xLang['LOCKBOOKMARKS']			= '锁定书签<br>(隐藏 删除, 移上, 移下的图示)';
				xLang['MTCLEARALL']				= '全部清除';
				xLang['UNLOCKBOOKMARKS']		= '解锁书签<br>(显示 删除, 移上, 移下的图示)';
				xLang['CLICKSORT']				= '点击来排序';
				xLang['MIN']					= '最少';
				xLang['SAVEGLOBAL']				= '分享记录到其村庄';
				xLang['VILLAGELIST']			= '村庄列表';
				xLang['SHOWINOUTICONS']			= "显示'dorf1.php'和'dorf2.php'的链接";
				xLang['UPDATEPOP']				= '更新人口数据';
				xLang['SHOWRPRINFOTOOLTIPS']	= '在tooltip中显示距离和时间<br>(集结点&报告)';
				xLang['EDIT']					= '修改';
				xLang['SHOWMESOPENLINKS']		= '显示pop-up IGM链接';
				xLang['NPCOPTIONS']				= 'NPC交易选项';
				xLang['NPCASSISTANT']			= '显示NPC交易的链接和计算';
				xLang['NEWVILLAGEAV']			= '日期';
				xLang['TIMEUNTIL']				= '需要等待的时间';
				xLang['SHOWMAPTABLE']			= '在"karte.php"显示 玩家/村庄/绿洲 信息';
				xLang['SHOWREPDELTABLE']		= '在报告页面显示 "全删除"的选项';
				xLang['SHOWIGMLINKFORME']		= '显示 发IGM给自己的图示';
				xLang['CENTERMAP']				= '此村庄居中的地图';
				xLang['SHOWCENTERMAPICON']		= '在村庄旁 显示 "居中地图"的图示';
				xLang['INETGPOPTION']			= '网络图像包';
				xLang['ALLOWINETGP']			= '允许许使用网络图像包';
				xLang['SENDTROOPS']				= '出兵';
				xLang['SHOWBRSTATDETAILS']		= '显示战报的详细数据';
				xLang['SHOWBIGICONMISC']		= "皇宫/行宫/研发所/宝库";
				xLang['PALACE']					= "皇宫";
				xLang['RESIDENCE']				= "行宫";
				xLang['ACADEMY']				= "研发所";
				xLang['TREASURY']				= "宝库";
				break; 
			case "lt":
		// Lt translation by Domas & Zrip. General update by Vykintas.  Thank you !
				xLang['ALLIANCE']				= 'Aljansas';
				xLang['SIM']					= 'Mūšių simuliat.';
				xLang['AREYOUSURE']				= 'Tikrai pašalinti?';
				xLang['LOSS']					= 'Nuostoliai';
				xLang['PROFIT']					= 'Pelnas';
				xLang['EXTAVAILABLE']			= 'Įmanoma praplėsti';
				xLang['PLAYER']					= 'Žaidėjas';
				xLang['VILLAGE']				= 'Gyvenvietės pavadinimas';
				xLang['POPULATION']				= 'Populiacija';
				xLang['COORDS']					= 'Koordinatės';
				xLang['MAPTABLEACTIONS']		= 'Veiksmai';
				xLang['SAVED']					= 'Išsaugota';
				xLang['YOUNEED']				= 'Jums reikia';
				xLang['TODAY']					= 'šiandien';
				xLang['TOMORROW']				= 'rytoj';
				xLang['PAS_MANYANA']			= 'poryt';
				xLang['MARKET']					= 'Turgavietė';
				xLang['BARRACKS']				= 'Kareivinės';
				xLang['RALLYPOINT']				= 'Susibūrimo vieta';
				xLang['STABLE']					= 'Arklidė';
				xLang['WORKSHOP']				= 'Dirbtuvės';
				xLang['ENVIAR']					= 'Siųsti resursus';
				xLang['COMPRAR']				= 'Pirkti';
				xLang['VENDER']					= 'Parduoti';
				xLang['SENDIGM']				= 'Siųsti žinutę';
				xLang['LISTO']					= 'Resursų bus';
				xLang['ON']						= '';
				xLang['A_LAS']					= '';
				xLang['EFICIENCIA']				= 'Efektyvumas';
				xLang['NEVER']					= 'Niekada';
				xLang['ALDEAS']					= 'Gyvenvietė(-s)';
				xLang['TIEMPO']					= 'Laikas';
				xLang['OFREZCO']				= 'Siūloma';
				xLang['BUSCO']					= 'Ieškoma';
				xLang['TIPO']					= 'Santykis';
				xLang['DISPONIBLE']				= 'Tik įmanomi';
				xLang['CUALQUIERA']				= 'Nesvarbu';
				xLang['YES']					= 'Taip';
				xLang['NO']						= 'Ne';
				xLang['LOGIN']					= 'Prisijungti';
				xLang['MARCADORES']				= 'Žymos';
				xLang['ANYADIR']				= 'Pridėti';
				xLang['ENLACE']					= 'Nauja URL nuoroda';
				xLang['TEXTO']					= 'Nauja tekstinė nuoroda';
				xLang['ELIMINAR']				= 'Ištrinti';
				xLang['MAPA']					= 'Žemėlapis';
				xLang['MAXTIME']				= 'Gabenimo laikas (iki)';
				xLang['ARCHIVE']				= 'Archyvas';
				xLang['RESUMEN']				= 'Santrauka';
				xLang['LARGEMAP']				= 'Didelis žemėlapis';
				xLang['TROPAS']					= 'Kariai';
				xLang['CHECKVERSION']			= 'Atnaujinti TB';
				xLang['ACTUALIZAR']				= 'Atnaujinti gyvenvietės informaciją';
				xLang['VENTAS']					= 'Išsaugoti pasiūlymai';
				xLang['MAPSCAN']				= 'Skanuoti žemėlapį';
				xLang['BIGICONS']				= 'Išplėsti naršymo juostą';
				xLang['NOTEBLOCK']				= 'Rodyti užrašų knygelę';
				xLang['SAVE']					= 'Išsaugoti';
				xLang['RPDEFACT']				= 'Susibūrimo vietos pagrindinis veiksmas';
				xLang['ATTACKTYPE2']			= 'Pastiprinimas';
				xLang['ATTACKTYPE3']			= 'Puolimas: ataka';
				xLang['ATTACKTYPE4']			= 'Puolimas: reidas';
				xLang['NBSIZE']					= 'Užrašų knygelės dydis';
				xLang['NBSIZEAUTO']				= 'Automatinis';
				xLang['NBSIZENORMAL']			= 'Normalus (maža)';
				xLang['NBSIZEBIG']				= 'Dideliems ekranams (didelė)';
				xLang['NBHEIGHT']				= 'Užrašų knygelės aukštis';
				xLang['NBAUTOEXPANDHEIGHT']		= 'Automatiškai išsiplečianti';
				xLang['NBKEEPHEIGHT']			= 'Fiksuoto dydžio';
				xLang['SHOWCENTERNUMBERS']		= 'Rodyti gyvenvietės centro lygius';
				xLang['NPCSAVETIME']			= 'Bus sukaupta po: ';
				xLang['SHOWCOLORRESLEVELS']		= 'Rodyti resursų lygių spalvas';
				xLang['CNCOLORNEUTRAL']			= 'Galimo lygio kėlimo spalva<br>(Tuščia = pradinė)';
				xLang['CNCOLORMAXLEVEL']		= 'Aukščiausio lygio spalva<br>(Tuščia = pradinė)';
				xLang['CNCOLORNOUPGRADE']		= 'Negalimo lygio kėlimo spalva<br>(Tuščia = pradinė)';
				xLang['CNCOLORNPCUPGRADE']		= 'Galimo lygio kėlimo per NPC prekeivį spalva<br>(Tuščia = pradinė)';
				xLang['TOTALTROOPS']			= 'Visi gyvenvietės kariai';
				xLang['SHOWBOOKMARKS']			= 'Rodyti žymas';
				xLang['RACECRTV2']				= 'Gentis';
				xLang['SERVERVERSION2']			= "Travian v2.x serveris";
				xLang['SHOWSTATLINKS']			= "Rodyti World Analyser statistikos nuorodas";
				xLang['SELECTALLTROOPS']		= "Pasirinkti visus karius";
				xLang['SHOWCOLORBUILDLEVELS']	= 'Rodyti pastatų lygių spalvas';
				xLang['PARTY']					= "Taškai";
				xLang['CPPERDAY']				= "KT/per dieną";
				xLang['SLOT']					= "Vietos";
				xLang['TOTAL']					= "Iš viso";
				xLang['NOPALACERESIDENCE']		= "Šioje gyvenvietėje nėra rezidencijos arba valdovų rūmų, arba dar nebuvote nuėjęs į gyvenvietės centrą!";
				xLang['SELECTSCOUT']			= "Pasirinkti žvalgus";
				xLang['SELECTFAKE']				= "Pasirinkti netikrą ataką";
				xLang['NOSCOUT2FAKE']			= "Neįmanoma naudoti žvalgų netikram puolimui!";
				xLang['NOTROOP2FAKE']			= "Nėra kareivių netikram puolimui!";
				xLang['NOTROOP2SCOUT']			= "Nėra kareivių-žvalgų!";
				xLang['NOTROOPS']				= "Šioje gyvenvietėje nėra kareivių!";
				xLang['ALL']					= "Visi";
				xLang['NORACE']					= "Kad gentis būtų nustatyta automatiškai, pastatykite kareivines ir/arba nueikite į gyvenvietės centrą...";
				xLang['COLORHELPTEXT']			= "Spalvų laukuose galite įvesti:<br>- <b>green</b> arba <b>red</b> arba <b>orange</b>, ir t.t.<br>- taip pat HEX spalvų kodą, pvz.: <b>#004523</b><br>- jei norite palikti standartinę spalvą, laukelį palikite tuščią";
				xLang['COLORHELP']				= "Pagalba dėl spalvų laukelių";
				xLang['SHOWORIGREPORT']			= "Rodyti originalią ataskaitą (kopijavimui)";
				xLang['SHOWCELLTYPEINFO']		= "Rodyti laukų/oazių informaciją,<br>kai pele rodoma į žemėlapio laukelį";
				xLang['WARSIM']					= "Naudojama nuoroda kovos simuliatoriui:<br>(kairiajame meniu)";
				xLang['WARSIMOPTION1']			= "Vidinė (siūloma žaidimo)";
				xLang['WARSIMOPTION2']			= "Išorinė (siūloma kirilloid.ru)";
				xLang['WSANALYSER']				= "Naudojamas World Analyser";
				xLang['SHOWSTATLINKS']			= "Rodyti World Analyser statistikos nuorodas";
				xLang['NONEWVERSION']			= "Jūs turite naujausią versiją";
				xLang['BETAVERSION']			= "Jūs galite turėti beta versiją";
				xLang['NEWVERSIONAV']			= 'Dabartinė versija';
				xLang['UPDATESCRIPT']			= "Atnaujinti dabar?";
				xLang['CHECKUPDATE']			= "Ieškoma atnaujinimų. Prašome palaukti...";
				xLang['CROPFINDER']				= "Crop Finder";
				xLang['AVPOPPERVIL']			= "Gyventojų vidurkis gyvenvietei";
				xLang['AVPOPPERPLAYER']			= "Gyventojų vidurkis žaidėjui";
				xLang['SHOWRESUPGRADETABLE']	= "Rodyti resursų laukų tobulinimo lentelę";
				xLang['SHOWBUPGTABLE']			= "Rodyti pastatų tobulinimo lentelę";
				xLang['CONSOLELOGLEVEL']		= "Konsolės registro lygis<br>TIK PROGRAMUOTOJAMS ARBA KLAIDŲ PAIEŠKAI<br>(Numatyta = 0 arba palikti tuščią)";
				xLang['MARKETPRELOAD']			= "Pasiūlymų puslapių skaičius užkrovimui<br>esant puslapyje 'Turgavietė => Pirkti'<br>(Numatyta = 1)";
				xLang['CAPITAL']				= 'Jūsų sostinės pavadinimas';
				xLang['CAPITALXY']				= 'Jūsų sostinės koordinatės';
				xLang['MAX']					= 'Daugiausiai';
				xLang['TOTALTROOPSTRAINING']	= 'Iš viso treniruojamų kareivių';
				xLang['SHOWDISTTIMES']			= 'Rodyti atstumą ir laiką';
				xLang['TBSETUPLINK']			= 'Travian Beyond nustatymai';
				xLang['UPDATEALLVILLAGES']		= 'Atnaujinti visas gyvenvietes.  NAUDOTI ITIN ATSARGIAI, NES DĖL TO GALI BŪTI UŽBLOKUOTA SĄSKAITA !';
				xLang['SHOWMENUSECTION3']		= "Rodyti papildomas nuorodas kairiajame meniu<br>(Traviantoolbox, World Analyser, Travilog, žemėlapis ir t.t.)";
				xLang['LARGEMAP']				= 'Didelis žemėlapis';
				xLang['SHOWTRAVMAPLINKS']		= 'Rodyti nuorodas į travmap.shishnet.org<br>(žaidėjai ir aljansai)';
				xLang['USETHEMPR']				= 'Naudoti (proporcingai)';
				xLang['USETHEMEQ']				= 'Naudoti (lygiai)';
				xLang['TOWNHALL']				= 'Rotušė';
				xLang['GAMESERVERTYPE']			= 'Žaidimo serveris';
				xLang['MARKETOFFERS']			= 'Turgavietės pasiūlymai';
				xLang['ACCINFO']				= 'Registracijos informacija';
				xLang['BOOKMARKOPTIONS']		= 'Žymos';//identical to xLang['MARCADORES'] => check if this can be removed
				xLang['NOTEBLOCKOPTIONS']		= 'Užrašinė';
				xLang['MENULEFT']				= 'Meniu kairėje pusėje';
				xLang['STATISTICS']				= 'Statistika';
				xLang['RESOURCEFIELDS']			= 'Resursų laukai';
				xLang['VILLAGECENTER']			= 'Gyvenvietės centras';
				xLang['MAPOPTIONS']				= 'Žemėlapio parinktys';
				xLang['COLOROPTIONS']			= 'Spalvų parinktys';
				xLang['DEBUGOPTIONS']			= "Debug'inimo parinktys";
				xLang['SHOWBIGICONMARKET']		= 'Turgavietė';
				xLang['SHOWBIGICONMILITARY']	= 'Kariuomenė<br>Susibūrimo vieta/kareivinės/dirbtuvės/arklidė';
				xLang['SHOWBIGICONALLIANCE']	= 'Aljansas'; //identical to xLang['ALLIANCE'] => check if this can be removed
				xLang['SHOWBIGICONMILITARY2']	= "Rotušė/karžygio namai/šarvų kalvė/ginklų kalvė";
				xLang['HEROSMANSION']			= "Karžygio namai";
				xLang['BLACKSMITH']				= 'Ginklų kalvė';
				xLang['ARMOURY']				= 'Šarvų kalvė';
				xLang['NOW']					= 'Dabar';
				xLang['CLOSE']					= 'Atšaukti';
				xLang['USE']					= 'Naudoti';
				xLang['USETHEM1H']				= 'Naudoti (1 valandos produkcija)';
				xLang['OVERVIEW']				= 'Apžvalga';
				xLang['FORUM']					= 'Forumas';
				xLang['ATTACKS']				= 'Atakos';
				xLang['NEWS']					= 'Naujienos';
				xLang['ADDCRTPAGE']				= 'Pridėti šį puslapį';
				xLang['SCRIPTPRESURL']			= 'TB puslapis';
				xLang['NOOFSCOUTS']				= 'Žvalgų kiekis<br>Funkcijai "Pasirinkti žvalgus"';
				xLang['SPACER']					= 'Pridėti skirtuką';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'Pranešimų lentelėje rodyti karių informaciją';
				xLang['MESREPOPTIONS']			= 'Pranešimai ir ataskaitos';
				xLang['MESREPPRELOAD']			= 'Užkraunamų pranešimų/ataskaitų puslapių skaičius<br>(Numatyta = 1)';
				xLang['ATTABLES']				= 'Karių lentelė';
				xLang['MTWASTED']				= 'Neišnaudota';
				xLang['MTEXCEED']				= 'Viršyta';
				xLang['MTCURRENT']				= 'Esamas pakrovimas';
				xLang['ALLIANCEFORUMLINK']		= 'Nuoroda į įšorini forumą<br>(jei naudojate vidinį, nerašykite nieko)';
				xLang['LOCKBOOKMARKS']			= 'Fiksuoti žymas<br>(nerodyti trynimo, perkėlimo aukštyn bei žemyn ikonų)';
				xLang['MTCLEARALL']				= 'Viską išvalyti';           
				xLang['UNLOCKBOOKMARKS']		= 'Nefiksuoti žymų<br>(rodyti trynimo, perkėlimo aukštyn bei žemyn ikonas)';
				xLang['CLICKSORT']				= 'Rūšiuoti';
				xLang['MIN']					= 'Mažiausiai';
				xLang['SAVEGLOBAL']				= 'Visose gyvenvietėse';
				xLang['VILLAGELIST']			= 'Gyvenviečių sąrašas';
				xLang['SHOWINOUTICONS']			= "Rodyti 'dorf1.php' ir 'dorf2.php' nuorodas";
				xLang['UPDATEPOP']				= 'Atnaujinti populiaciją';
				xLang['SHOWRPRINFOTOOLTIPS']	= 'Atstumą ir laikus iki gyvenvietės rodyti pranešimų lentelėje<br>(Susibūrimo vietoje ir ataskaitose)';
				xLang['EDIT']					= 'Redaguoti';
				xLang['SHOWMESOPENLINKS']		= 'Rodyti nuorodas laiškų atidarymui iškylančiajame lange';
				xLang['NPCOPTIONS']				= 'NPC asistentas';
				xLang['NPCASSISTANT']			= 'Rodyti NPC asistento skaičiavimus/nuorodas';
				xLang['SHOWMAPTABLE']			= 'Rodyti žaidėjų/gyvenviečių/oazių lentelę';
				xLang['NEWVILLAGEAV']			= 'Data/Laikas';
				xLang['TIMEUNTIL']				= 'Laukimo laikas';
				xLang['SHOWREPDELTABLE']		= 'Rodyti "Trinti viską" lentelę ataskaitų puslapyje';
				xLang['SHOWIGMLINKFORME']		= 'Rodyti "Siųsti IGM" piktogramą ir man';
				xLang['CENTERMAP']				= 'Centruoti šią gyvenvietę žemėlapyje';
				xLang['SHOWCENTERMAPICON']		= 'Rodyti nuorodą "Centruoti šią gyvenvietę žemėlapyje"';
				xLang['INETGPOPTION']			= 'Internetinis grafikos paketas';
				xLang['ALLOWINETGP']			= 'Naudoti internetinius grafikos paketus';
				xLang['SENDTROOPS']				= 'Siųsti karius';
				xLang['SHOWBRSTATDETAILS']		= 'Rodyti detales ataskaitų statistikoje';
				xLang['SHOWBIGICONMISC']		= "Valdomų rūmai/Rezidencija/Akademija/Iždinė";
				xLang['PALACE']					= "Valdovų rūmai";
				xLang['RESIDENCE']				= "Rezidencija";
				xLang['ACADEMY']				= "Akademija";
				xLang['TREASURY']				= "Iždinė";
				xLang['SHOWBBLINK']				= "Rodyti mirksinčius pastatų lygius statybų metu";
		break;
			case "ae":
		  	// Arabic Translation (Thank you, Dream1 & Me_TheKing !)
				xLang['ALLIANCE']				= 'التحالف';
				xLang['SIM']					= 'محاكي المعركة';
				xLang['AREYOUSURE']				= 'هل أنت متأكد؟';
				xLang['LOSS']					= 'الخسائر';
				xLang['PROFIT']					= 'الفائدة';
				xLang['EXTAVAILABLE']			= 'متاح';
				xLang['PLAYER']					= 'اللاعب';
				xLang['VILLAGE']				= 'اسم القرية';
				xLang['POPULATION']				= 'السكان';
				xLang['COORDS']					= 'الإحداثيات';
				xLang['MAPTABLEACTIONS']		= 'الأمر';
				xLang['SAVED']					= 'تم حفظ الاعدادات';
				xLang['YOUNEED']				= 'تحتاج';
				xLang['TODAY']					= 'اليوم';
				xLang['TOMORROW']				= 'غداً';
				xLang['PAS_MANYANA']			= 'بعد غداً';
				xLang['MARKET']					= 'السوق';
				xLang['BARRACKS']				= 'الثكنة';
				xLang['RALLYPOINT']				= 'نقطة التجمع';
				xLang['STABLE']					= 'الإسطبل';
				xLang['WORKSHOP']				= 'المصانع الحربية';
				xLang['ENVIAR']					= 'إرسال الموارد';
				xLang['COMPRAR']				= 'شراء';
				xLang['VENDER']					= 'بيع';
				xLang['SENDIGM']				= 'إرسال رسالة';
				xLang['LISTO']					= 'يتاح';
				xLang['ON']						= 'على';
				xLang['A_LAS']					= 'في';
				xLang['EFICIENCIA']				= 'الفعالية';
				xLang['NEVER']					= 'أبدا';
				xLang['ALDEAS']					= 'القرى';
				xLang['TIEMPO']					= 'الوقت';
				xLang['OFREZCO']				= 'العرض';
				xLang['BUSCO']					= 'البحث';
				xLang['TIPO']					= 'النوع';
				xLang['DISPONIBLE']				= 'فقط المتاح';
				xLang['CUALQUIERA']				= 'أي';
				xLang['YES']					= 'نعم';
				xLang['NO']						= 'لا';
				xLang['LOGIN']					= 'تسجيل الدخول';
				xLang['MARCADORES']				= 'الروابط';
				xLang['ANYADIR']				= 'إضافة رابط+نص';
				xLang['ENLACE']					= 'ضع الرابط هنا';
				xLang['TEXTO']					= 'ضع نص الرابط هنا';
				xLang['ELIMINAR']				= 'حذف';
				xLang['MAPA']					= 'الخريطة';
				xLang['MAXTIME']				= 'الحد الأقصى للوقت';
				xLang['ARCHIVE']				= 'الأرشيف';
				xLang['RESUMEN']				= 'الموجز';
				xLang['TROPAS']					= 'القوات';
				xLang['CHECKVERSION']			= 'تحديث السكربت';
				xLang['ACTUALIZAR']				= 'تحديث معلومات القرية';
				xLang['VENTAS']					= 'حفظ العروض';
				xLang['MAPSCAN']				= 'فحص الخريطة';
				xLang['BIGICONS']				= 'إظهار الإيقونات المختصرة';
				xLang['NOTEBLOCK']				= 'أظهار دفتر الملاحظات';
				xLang['SAVE']					= 'حفظ';
				xLang['RPDEFACT']				= 'الاختصار الافتراضي في نقطة التجمع';
				xLang['ATTACKTYPE2']			= 'مساندة';
				xLang['ATTACKTYPE3']			= 'هجوم: كامل';
				xLang['ATTACKTYPE4']			= 'هجوم: للنهب';
				xLang['NBSIZE']					= 'مقاس دفتر الملاحظات';
				xLang['NBSIZEAUTO']				= 'تلقائي';
				xLang['NBSIZENORMAL']			= 'عادي (صغيره)';
				xLang['NBSIZEBIG']				= 'ملء الشاشة (كبيرة)';
				xLang['NBHEIGHT']				= 'ارتفاع دفتر الملاحظات';
				xLang['NBAUTOEXPANDHEIGHT']		= 'توسيع تلقائي للارتفاع';
				xLang['NBKEEPHEIGHT']			= 'ارتفاع افتراضي';
				xLang['SHOWCENTERNUMBERS']		= 'أظهار الأرقام على المباني';
				xLang['NPCSAVETIME']			= 'حفظ: ';
				xLang['SHOWCOLORRESLEVELS']		= 'اظهار الألوان على مستويات الموارد';
				xLang['SHOWCOLORBUILDLEVELS']	= 'أظهار الألوان على مستويات المباني';
				xLang['CNCOLORNEUTRAL']			= 'لون التطوير متاح<br>المربع فارغ = افتراضي)';
				xLang['CNCOLORMAXLEVEL']		= 'لون الحد الأقصى <br>(المربع فارغ = افتراضي)';
				xLang['CNCOLORNOUPGRADE']		= 'لون التطوير لا يمكن<br>(المربع فارغ = افتراضي)';
				xLang['CNCOLORNPCUPGRADE']		= 'لون التطوير عن طريق NPC<br>(المربع فارغ = افتراضي)';
				xLang['TOTALTROOPS']			= 'مجموع القوات في القرية';
				xLang['SHOWBOOKMARKS']			= 'أظهار الروابط';
				xLang['RACECRTV2']				= 'القبيلة';
				xLang['SERVERVERSION2']			= "Travian v2.x server";
				xLang['SELECTALLTROOPS']		= "اختيار كل القوات";
				xLang['PARTY']					= "الاحتفالات";
				xLang['CPPERDAY']				= "نقاط حضارية يومياً";
				xLang['SLOT']					= "فتح قرية";
				xLang['TOTAL']					= "المجموع";
				xLang['NOPALACERESIDENCE']		= "لايوجد قصر أو سكن في هذه القرية أو لم تفتح مركز القرية بعد !";
				xLang['SELECTSCOUT']			= "اختيار الكشافة";
				xLang['SELECTFAKE']				= "اختيار هجوم وهمي";
				xLang['NOSCOUT2FAKE']			= "مستحيل اختيار الكشافة في الهجوم الوهمي !";
				xLang['NOTROOP2FAKE']			= "لاتوجد قوات للهجوم الوهمي !";
				xLang['NOTROOP2SCOUT']			= "لاتوجد قوات كشافة !";
				xLang['NOTROOPS']				= "لا توجد قوات في القرية !";
				xLang['ALL']					= "الكل";
				xLang['NORACE']					= "بناء ثكنة تلقائياً لتحديد القبيلة و/أو فتح مركز القرية...";
				xLang['COLORHELPTEXT']			= "يمكنك إدخال الالوان كالاتي:<br>- green أو red أو  orange, الخ.<br>- رمز اللون مثل #004523<br>- تركه فارغ لالون الافتراضي";
				xLang['COLORHELP']				= "تعليمات حول خيارات الالوان";
				xLang['SHOWORIGREPORT']			= "أظهار النسخة الأصلية للتقرير";
				xLang['SHOWCELLTYPEINFO']		= "عرض نوع القرية<br>عند المرور بالماوس على الخريطة";
				xLang['WARSIM']					= "تغيير نوع محاكي المعركة:<br>(في القائمة اليسرى)";
				xLang['WARSIMOPTION1']			= "داخلي (محاكي المعركة العادي)";
				xLang['WARSIMOPTION2']			= "خارجي (محاكي المعركة المطور kirilloid.ru)";
				xLang['WSANALYSER']				= "أختيار نوع محلل عالم ترافيان";
				xLang['SHOWSTATLINKS']			= "أظهار رابط محلل الاحصائيات";
				xLang['NONEWVERSION']			= "لديك أحدث نسخة متاحة";
				xLang['BETAVERSION']			= "قد يكون لديك نسخة تجريبية";
				xLang['NEWVERSIONAV']			= "يوجد نسخة جديده من السكربت متاحة";
				xLang['UPDATESCRIPT']			= "هل تريد تحديث السكربت الآن؟";
				xLang['CHECKUPDATE']			= "التحقق من وجود تحديث للسكربت. الرجاء الانتظار...";
				xLang['CROPFINDER']				= "بحث عن القرى القمحيه";
				xLang['AVPOPPERVIL']			= "متوسط عدد السكان للقريه الواحده ";
				xLang['AVPOPPERPLAYER']			= "متوسط عدد السكان للاعب الواحد";
				xLang['SHOWRESUPGRADETABLE']	= "اظهار جدول رفع مستوى الموارد";
				xLang['SHOWBUPGTABLE']			= "اظهار جدول رفع مستوى المباني";
				xLang['CONSOLELOGLEVEL']		= "Console Log Level<br>ONLY FOR PROGRAMMERS OR DEBUGGING<br>(Default = 0 or leave Empty)";
				xLang['MARKETPRELOAD']			= "عدد صفحات العروض<br>في 'السوق => شراء'<br>(الوضع الافتراضي = 1 أو فارغ ؛ الحد الأقصى = 5)";
				xLang['CAPITAL']				= 'أسم العاصمه<br>لايمكنك التعديل, فقط قم بزيارة بطاقة العضوية';
				xLang['CAPITALXY']				= 'أحداثيات العاصمه<br>لايمكنك التعديل, فقط قم بزيارة بطاقة العضوية';
				xLang['MAX']					= 'الحد الأقصى';
				xLang['TOTALTROOPSTRAINING']	= 'أجمالي تدريب القوات';
				xLang['SHOWDISTTIMES']			= 'إظهار المسافات & الوقت';
				xLang['TBSETUPLINK']			= 'أعدادات ترافيان بايوند';
				xLang['UPDATEALLVILLAGES']		= 'تحديث جميع القرى. لاتستخدمها بكثره فقد يؤدي ذالك الى حظر حسابك !';
				xLang['SHOWMENUSECTION3']		= "إظهار الروابط الاضافية في القائمة اليمنى<br>(Traviantoolbox, World Analyser, Travilog, Map, وغيره.)";
				xLang['LARGEMAP']				= 'خريطة كبيرة';
				xLang['SHOWTRAVMAPLINKS']		= 'إظهار روابط الى travmap.shishnet.org<br>(اللاعبين و التحالفات)';
				xLang['USETHEMPR']				= 'الإستخدام (النسبي)';
				xLang['USETHEMEQ']				= 'الإستخدام (المتساوي)';
				xLang['TOWNHALL']				= 'البلدية';
				xLang['GAMESERVERTYPE']			= 'سيرفر اللعبة';
				xLang['MARKETOFFERS']			= 'عروض السوق';
				xLang['ACCINFO']				= 'معلومات الحساب';
				xLang['BOOKMARKOPTIONS']		= 'الروابط';//identical to xLang['MARCADORES'] => check if this can be removed
				xLang['NOTEBLOCKOPTIONS']		= 'دفتر الملاحظات';
				xLang['MENULEFT']				= 'القائمه على الجانب الأيمن';
				xLang['STATISTICS']				= 'أحصائيات';
				xLang['RESOURCEFIELDS']			= 'حقول الموارد';
				xLang['VILLAGECENTER']			= 'مركز القرية';
				xLang['MAPOPTIONS']				= 'خيارات الخريطة';
				xLang['COLOROPTIONS']			= 'خيارات الألوان';
				xLang['DEBUGOPTIONS']			= 'Debug options';
				xLang['SHOWBIGICONMARKET']		= 'السوق';
				xLang['SHOWBIGICONMILITARY']	= 'العسكرية<br>نقطة التجمع/الثكنة/المصانع الحربية/الإسطبل';
				xLang['SHOWBIGICONALLIANCE']	= 'التحالف'; //identical to xLang['ALLIANCE'] => check if this can be removed
				xLang['SHOWBIGICONMILITARY2']	= "البلدية/قصر الأبطال/مستودع الاسلحة/الحداد";
				xLang['HEROSMANSION']			= "قصر الأبطال";
				xLang['BLACKSMITH']				= 'الحداد';
				xLang['ARMOURY']				= 'مستودع الاسلحة';
				xLang['NOW']					= 'الآن';
				xLang['CLOSE']					= 'إغلاق';
				xLang['USE']					= 'استخدام';
				xLang['USETHEM1H']				= 'الإستخدام (1 ساعة الإنتاج)';
				xLang['OVERVIEW']				= 'العرض';
				xLang['FORUM']					= 'المنتدى';
				xLang['ATTACKS']				= 'الهجمات';
				xLang['NEWS']					= 'الاخبار';
				xLang['ADDCRTPAGE']				= 'إضافة نص للصفحة الحاليه';
				xLang['SCRIPTPRESURL']			= 'TBeyond page';
				xLang['NOOFSCOUTS']				= 'عدد الكشافة في<br>وظيفة "اختيار الكشافة"';
				xLang['SPACER']					= 'إضافة فاصل';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'إظهار معلومات القوات';
				xLang['MESREPOPTIONS']			= 'رسائل & تقارير';
				xLang['MESREPPRELOAD']			= 'عدد الصفحات في الرسائل/التقارير<br>(الوضع الافتراضي = 1 أو فارغ ؛ الحد الأقصى = 5)';
				xLang['ATTABLES']				= 'جدول القوات';
				xLang['MTWASTED']				= 'الباقي';
				xLang['MTEXCEED']				= 'الزائد';
				xLang['MTCURRENT']				= 'الحموله الحاليه';
				xLang['ALLIANCEFORUMLINK']		= 'رابط خارجي للمنتدى<br>(المربع فارغ = اذا كان المنتدى داخلي)';
				xLang['MTCLEARALL']				= 'مسح الكل';
				xLang['SAVEGLOBAL']				= 'عرض مشترك بين القرى';
				xLang['VILLAGELIST']			= 'قائمة القرية';
				xLang['SHOWINOUTICONS']			= "أظهار روابط 'dorf1.php' و 'dorf2.php'";
				xLang['UPDATEPOP']				= 'تحديث السكان';
				xLang['LOCKBOOKMARKS']			= 'إغلاق لوحة الروابط<br> إخفاء أيقونة ( حذف، فوق، تحت';
				xLang['UNLOCKBOOKMARKS']		= 'تحرير لوحة الروابط<br> إظهار أيقونة ( حذف، فوق، تحت)';
				xLang['CLICKSORT']				= 'إضغط لترتيب';
				xLang['MIN']					= 'الأدنى';
				xLang['SHOWRPRINFOTOOLTIPS']	= 'إظهار المسافة و الوقت للقرى كتلميحات<br>(نقطة التجمع والتقارير)';
				xLang['EDIT']					= 'تحرير';
				xLang['SHOWMESOPENLINKS']		= 'إظهار وصلات لفتح الرسائل في نافذة منبثقة';
				xLang['NPCOPTIONS']				= 'خيارات المساعدة NPC';
				xLang['NPCASSISTANT']			= 'إظهار الحسابات/الروابط للمساعد NPC';
				xLang['SHOWMAPTABLE']			= 'إظهار جدول اللاعبين/القرى/الواحات المحتلة';
				xLang['NEWVILLAGEAV']			= 'التاريخ/الوقت';
				xLang['TIMEUNTIL']				= 'الوقت اللازم للأنتظار';
				xLang['SHOWREPDELTABLE']		= 'إظهار جدول "حذف الجميع" على صفحة التقارير';
				xLang['SHOWIGMLINKFORME']		= 'إظهارأيقونة "أرسل رسالة" لي, أيضاً';
				xLang['CENTERMAP']				= 'توسيط هذه القرية على الخريطة';
				xLang['SHOWCENTERMAPICON']		= 'إظهار أيقونة "توسيط هذه القرية على الخريطة"';
				xLang['INETGPOPTION']			= 'خيار مجموعة الغرافيك';
				xLang['ALLOWINETGP']			= 'إسمح لمجموعة الغرافيك';
				xLang['SENDTROOPS']				= 'إرسال القوات';
				xLang['SHOWBRSTATDETAILS']		= 'إظهار التفاصيل في تقرير الإحصاءات';
				xLang['SHOWBIGICONMISC']		= "القصر/السكن/الأكاديمية/الخزنة";
				xLang['PALACE']					= "القصر";
				xLang['RESIDENCE']				= "السكن";
				xLang['ACADEMY']				= "الأكاديمية";
				xLang['TREASURY']				= "الخزنة";
				break;
			case "rs":
				// Srpski/Serbian (travian.rs) revision 3 - prevod David Maćej
				xLang['ALLIANCE']				= 'Савез';
				xLang['SIM']					= 'Симулатор борбе';
				xLang['AREYOUSURE']				= 'Да ли сте сигурни?';
				xLang['LOSS']					= 'Губитак';
				xLang['PROFIT']					= 'Добит';
				xLang['EXTAVAILABLE']			= 'Надоградња могућа';
				xLang['PLAYER']					= 'Играч';
				xLang['VILLAGE']				= 'Село';
				xLang['POPULATION']				= 'Популација';
				xLang['COORDS']					= 'Координате';
				xLang['MAPTABLEACTIONS']		= 'Акције';
				xLang['SAVED']					= 'Сачувано';
				xLang['YOUNEED']				= 'Потребно је';
				xLang['TODAY']					= 'данас';
				xLang['TOMORROW']				= 'сутра';
				xLang['PAS_MANYANA']			= 'прекосутра';
				xLang['MARKET']					= 'Пијаца';
				xLang['BARRACKS']				= 'Касарна';
				xLang['RALLYPOINT']				= 'Место окупљања';
				xLang['STABLE']					= 'Штала';
				xLang['WORKSHOP']				= 'Радионица';
				xLang['ENVIAR']					= 'Пошаљи ресурсе';
				xLang['COMPRAR']				= 'Купи';
				xLang['VENDER']					= 'Продај';
				xLang['SENDIGM']				= 'Пошаљи поруку';
				xLang['LISTO']					= 'Доступно';
				xLang['ON']						= ''; // on
				xLang['A_LAS']					= 'у'; // at
				xLang['EFICIENCIA']				= 'Ефикасност';
				xLang['NEVER']					= 'Никада';
				xLang['ALDEAS']					= 'Село(а)';
				xLang['TIEMPO']					= 'Време';
				xLang['OFREZCO']				= 'Нуди';
				xLang['BUSCO']					= 'Тражи';
				xLang['TIPO']					= 'Однос';
				xLang['DISPONIBLE']				= 'Само доступно';
				xLang['CUALQUIERA']				= 'Све';
				xLang['YES']					= 'Да';
				xLang['NO']						= 'Не';
				xLang['LOGIN']					= 'Пријави се';
				xLang['MARCADORES']				= 'Линкови';
				xLang['ANYADIR']				= 'Додај';
				xLang['ENLACE']					= 'Адреса новог линка';
				xLang['TEXTO']					= 'Назив новог линка';
				xLang['ELIMINAR']				= 'Обриши';
				xLang['MAPA']					= 'Мапа';
				xLang['MAXTIME']				= 'Максимално време';
				xLang['ARCHIVE']				= 'Архива';
				xLang['RESUMEN']				= 'Збир'; // summary
				xLang['TROPAS']					= 'Војска';
				xLang['CHECKVERSION']			= 'Унапреди TBeyond';
				xLang['ACTUALIZAR']				= 'Освежи информације о селима';
				xLang['VENTAS']					= 'Сачувај понуду';
				xLang['MAPSCAN']				= 'Претражи мапу';
				xLang['BIGICONS']				= 'Прикажи додатне иконе';
				xLang['NOTEBLOCK']				= 'Прикажи бележницу';
				xLang['SAVE']					= 'Сачувај';
				xLang['RPDEFACT']				= 'Основна акција на месту окупљања';
				xLang['ATTACKTYPE2']			= 'Појачање';
				xLang['ATTACKTYPE3']			= 'Напад';
				xLang['ATTACKTYPE4']			= 'Пљачка';
				xLang['NBSIZE']					= 'Величина бележнице';
				xLang['NBSIZEAUTO']				= 'Аутоматски';
				xLang['NBSIZENORMAL']			= 'Нормална';
				xLang['NBSIZEBIG']				= 'Велика';
				xLang['NBHEIGHT']				= 'Висина бележнице';
				xLang['NBAUTOEXPANDHEIGHT']		= 'Аутоматски повећај висину';
				xLang['NBKEEPHEIGHT']			= 'Основна висина';
				xLang['SHOWCENTERNUMBERS']		= 'Прикажи бројеве у центру села';
				xLang['NPCSAVETIME']			= 'Убрзај за: ';
				xLang['SHOWCOLORRESLEVELS']		= 'Прикажи нивое ресурса у боји';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Прикажи нивое грађевина у боји';
				xLang['CNCOLORNEUTRAL']			= 'Боја за унапређење могуће<br>(Основна = празно)';
				xLang['CNCOLORMAXLEVEL']		= 'Боја за максимални ниво<br>(Основна = празно)';
				xLang['CNCOLORNOUPGRADE']		= 'Боја за унапређење није могуће<br>(Основна = празно)';
				xLang['CNCOLORNPCUPGRADE']		= 'Боја за унапређење помоћу НПЦ<br>(Основна = празно)';
				xLang['TOTALTROOPS']			= 'Сва војска из села';
				xLang['SHOWBOOKMARKS']			= 'Прикажи линкове';
				xLang['RACECRTV2']				= 'Племе';
				xLang['SERVERVERSION2']			= "Травиан 2.x сервер";
				xLang['SELECTALLTROOPS']		= "Сва војска";
				xLang['PARTY']					= "Забаве";
				xLang['CPPERDAY']				= "КП/дан";
				xLang['SLOT']					= "Место за проширење";
				xLang['TOTAL']					= "Укупно";
				xLang['NOPALACERESIDENCE']		= "Нема резиденције или палате у селу или нисте у центру села!";
				xLang['SELECTSCOUT']			= "Извиђање";
				xLang['SELECTFAKE']				= "Лажни напад";
				xLang['NOSCOUT2FAKE']			= "Немогуће је послати извиђаче у лажни напад!";
				xLang['NOTROOP2FAKE']			= "У селу нема војске са лажни напад!";
				xLang['NOTROOP2SCOUT']			= "У селу нема извиђача!";
				xLang['NOTROOPS']				= "Нема војске у селу!";
				xLang['ALL']					= "Све";
				xLang['NORACE']					= "За аутоматско одређивање племена изградите касарну и/или идите на центар села...";
				xLang['COLORHELPTEXT']			= "У поље за избор боје можете унети:<br>- green или red или orange, итд.<br>- или HEX колорни код нпр. #004523<br>- оставите празно за основне боје.";
				xLang['COLORHELP']				= "Помоћ избора боја";
				xLang['SHOWORIGREPORT']			= "Прикажи оригинални извештај (за постовање)";
				xLang['SHOWCELLTYPEINFO']		= "Прикажи тип поља/информацију о оази<br>док се миш креће преко мапе";
				xLang['WARSIM']					= "Користи следећи симулатор борбе:<br>(у менију лево)";
				xLang['WARSIMOPTION1']			= "Из игре";
				xLang['WARSIMOPTION2']			= "Са сајта kirilloid.ru";
				xLang['WSANALYSER']				= "Травиан анализатор";
				xLang['SHOWSTATLINKS']			= "Прикажи анализатор као линк";
				xLang['NONEWVERSION']			= "Имате последњу верзију скрипта!";
				xLang['BETAVERSION']			= "Можда имате бетаверзију скрипта";
				xLang['NEWVERSIONAV']			= "Постоји нова верзија скрипта";
				xLang['UPDATESCRIPT']			= "Да ли унапредим скрипту сада?";
				xLang['CHECKUPDATE']			= "Проверавам да ли постоји нова верзија.  Молим сачекајте...";
				xLang['CROPFINDER']				= "Тражење житница";
				xLang['AVPOPPERVIL']			= "Просечна популација по селу";
				xLang['AVPOPPERPLAYER']			= "Просечна популација по играчу";
				xLang['SHOWRESUPGRADETABLE']	= "Прикажи табелу унапређења ресурса";
				xLang['SHOWBUPGTABLE']			= "Прикажи табелу унапређења грађевина";
				xLang['CONSOLELOGLEVEL']		= "Console Log Level<br>САМО ЗА ПРОГРАМЕРЕ или ТРАЖЕЊЕ ГРЕШАКА<br>(Основно = 0 или празно)";
				xLang['MARKETPRELOAD']			= "Број страна са понудама ѕа приказ<br>на пијаци => страна ѕа куповину<br>(Основно = 1)";
				xLang['CAPITAL']				= 'Назив главног града<br>Идите у профил';
				xLang['CAPITALXY']				= 'Координате главног града<br>Идите у профил';
				xLang['MAX']					= 'Максимум';
				xLang['TOTALTROOPSTRAINING']	= 'Укупна број јединица на обуци';
				xLang['SHOWDISTTIMES']			= 'Прикази даљине и времена';
				xLang['TBSETUPLINK']			= 'Travian Beyond подешавање';
				xLang['UPDATEALLVILLAGES']		= 'Освежи сва села. КОРИСТИТИ СА ОПРЕЗОМ, МОГУЋЕ ЈЕ БУДЕТЕ БАНОВАНИ!!!';
				xLang['SHOWMENUSECTION3']		= "Прикажи додатне линкове у менију лево<br>(Traviantoolbox, World Analyser, Travilog, Map, итд.)";
				xLang['LARGEMAP']				= 'Велика мапа';
				xLang['SHOWTRAVMAPLINKS']		= 'Прикажи линк до travmap.shishnet.org<br>(играчи и савези)';
				xLang['USETHEMPR']				= 'Пропорционална подела';
				xLang['USETHEMEQ']				= 'Једнака подела';
				xLang['TOWNHALL']				= 'Општина';
				xLang['GAMESERVERTYPE']			= 'Сервер';
				xLang['MARKETOFFERS']			= 'Понуде на пијаци';
				xLang['ACCINFO']				= 'xxx';
				xLang['BOOKMARKOPTIONS']		= 'Линкови';//identical to xLang['MARCADORES'] => check if this can be removed
				xLang['NOTEBLOCKOPTIONS']		= 'Бележница';
				xLang['MENULEFT']				= 'Мени са леве стране';
				xLang['STATISTICS']				= 'Статистика';
				xLang['RESOURCEFIELDS']			= 'Ресурсна поља';
				xLang['VILLAGECENTER']			= 'Центар села';
				xLang['MAPOPTIONS']				= 'Мапа';
				xLang['COLOROPTIONS']			= 'Боје';
				xLang['DEBUGOPTIONS']			= 'Тражење грешака';
				xLang['SHOWBIGICONMARKET']		= 'Пијаца';
				xLang['SHOWBIGICONMILITARY']	= 'Војне грађевине<br>Место окупљања/Касарна/радионица/Штала';
				xLang['SHOWBIGICONALLIANCE']	= 'Савез'; //identical to xLang['ALLIANCE'] => check if this can be removed
				xLang['SHOWBIGICONMILITARY2']	= "Општина/Дворац хероја/Ковачница оклопа/Ковачница оружја";
				xLang['HEROSMANSION']			= "Дворац хероја";
				xLang['BLACKSMITH']				= 'Ковачница оружја';
				xLang['ARMOURY']				= 'Ковачница оклопа';
				xLang['NOW']					= 'Сада';
				xLang['CLOSE']					= 'Затвори';
				xLang['USE']					= 'Користи';
				xLang['USETHEM1H']				= 'Једночасовна производња';
				xLang['OVERVIEW']				= 'Преглед';
				xLang['FORUM']					= 'Форум';
				xLang['ATTACKS']				= 'Напади';
				xLang['NEWS']					= 'Вести';
				xLang['ADDCRTPAGE']				= 'Додај тренутну страну као линк';
				xLang['SCRIPTPRESURL']			= 'TBeyond сајт';
				xLang['NOOFSCOUTS']				= 'Број извиђача за<br>"Извиђање" функцију';
				xLang['SPACER']					= 'Размак';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'Прикажи информације о јединици кад миш пређе преко ње';
				xLang['MESREPOPTIONS']			= 'Поруке и извештаји';
				xLang['MESREPPRELOAD']			= 'Број страна порука/извештаја за приказ<br>(Основно = 1)';
				xLang['ATTABLES']				= 'Преглед војске';
				xLang['MTWASTED']				= 'Неискоришћено';
				xLang['MTEXCEED']				= 'Има више';
				xLang['MTCURRENT']				= 'Тренутно се шаље';
				xLang['ALLIANCEFORUMLINK']		= 'Линк до спољног форума<br>(Оставити празно за форум из игре)';
				xLang['LOCKBOOKMARKS']			= 'Закључај линкове<br>(Уклони, обриши, горе, доле иконе)';
				xLang['MTCLEARALL']				= 'Обриши све';
				xLang['UNLOCKBOOKMARKS']		= 'Откључај линкове<br>(Уклони, обриши, горе, доле иконе)';
				xLang['CLICKSORT']				= 'Кликни за сортирање';
				xLang['MIN']					= 'Минимум';
				xLang['SAVEGLOBAL']				= 'Важи за сва села';
				xLang['VILLAGELIST']			= 'Списак села';
				xLang['SHOWINOUTICONS']			= "Прикажи линкове до 'dorf1.php' и 'dorf2.php'";
				xLang['UPDATEPOP']				= 'Освежи популацију';
				xLang['SHOWRPRINFOTOOLTIPS']	= 'Прикажи даљине и времена до села кад миш пређе преко<br>(Место окупљања и извештаји)';
				xLang['EDIT']					= 'Уреди';
				xLang['SHOWMESOPENLINKS']		= 'Прикажи линк за отварање порука у посебном прозору';
				xLang['NPCOPTIONS']				= 'NPC помоћник';
				xLang['NPCASSISTANT']			= 'Прикажи NPC помоћника';
				xLang['SHOWMAPTABLE']			= 'Прикажи табелу играча/села/освојених долина';
				xLang['NEWVILLAGEAV']			= 'Датум/Време';
				xLang['TIMEUNTIL']				= 'Време чекања';
				xLang['SHOWREPDELTABLE']		= 'Прикажи "Обриши све" табелу у извештајима';
				xLang['SHOWIGMLINKFORME']		= 'Прикажи "Пошаљи поруку" икону и за мој налог';
				xLang['CENTERMAP']				= 'Центритрај мапу на овом селу';
				xLang['SHOWCENTERMAPICON']		= 'Прикажи "Центритрај мапу на овом селу" икону';
				xLang['INETGPOPTION']			= 'Графички пакет са интернета';
				xLang['ALLOWINETGP']			= 'Омогући коришћење графичког пакета са интернета';
				xLang['SENDTROOPS']				= 'Пошаљи војску';
				xLang['SHOWBRSTATDETAILS']		= 'Прикажи статистику у извештајима';
				xLang['SHOWBIGICONMISC']		= "Палата/Резиденција/Академија/Ризница";
				xLang['PALACE']					= "Палата";
				xLang['RESIDENCE']				= "Резиденција";
				xLang['ACADEMY']				= "Академија";
				xLang['TREASURY']				= "Ризница";
				break;
			case "gr":
		case "el":
		//greek translantion by maintanosgr and ChuckNorris. Thank you !
				xLang['ALLIANCE']				= 'Συμμαχία';
				xLang['SIM']					= 'Προσομοιωτής μάχης';
				xLang['AREYOUSURE']				= 'Είσαι σίγουρος;';
				xLang['LOSS']					= 'Ζημιά';
				xLang['PROFIT']					= 'Κέρδος';
				xLang['EXTAVAILABLE']			= 'Διαθέσιμη αναβάθμιση';
				xLang['PLAYER']					= 'Παίκτης';
				xLang['VILLAGE']				= 'Χωριό';
				xLang['POPULATION']				= 'Πληθυσμός';
				xLang['COORDS']					= 'Συντεταγμένες';
				xLang['MAPTABLEACTIONS']		= 'Ενέργειες';
				xLang['SAVED']					= 'Αποθηκεύτηκε';
				xLang['YOUNEED']				= 'Χρειάζεσαι';
				xLang['TODAY']					= 'σήμερα';
				xLang['TOMORROW']				= 'αύριο';
				xLang['PAS_MANYANA']			= 'μεθαύριο';
				xLang['MARKET']					= 'Αγορά';
				xLang['BARRACKS']				= 'Στρατόπεδο';
				xLang['RALLYPOINT']				= 'Πλατεία συγκεντρώσεως';
				xLang['STABLE']					= 'Στάβλος';
				xLang['WORKSHOP']				= 'Εργαστήριο';
				xLang['ENVIAR']					= 'Αποστολή πρώτων υλών';
				xLang['COMPRAR']				= 'Αγόρασε';
				xLang['VENDER']					= 'Πούλησε';
				xLang['SENDIGM']				= 'Αποστολή μηνύματος';
				xLang['LISTO']					= 'Διαθέσιμο';
				xLang['ON']						= 'την';
				xLang['A_LAS']					= 'στις';
				xLang['EFICIENCIA']				= 'Πληρότητα';
				xLang['NEVER']					= 'Ποτέ';
				xLang['ALDEAS']					= 'Χωριό(ά)';
				xLang['TIEMPO']					= 'Χρόνος';
				xLang['OFREZCO']				= 'Προσφέρει';
				xLang['BUSCO']					= 'Αναζητεί';
				xLang['TIPO']					= 'Τύπος';
				xLang['DISPONIBLE']				= 'Μόνο διαθέσιμα';
				xLang['CUALQUIERA']				= 'Όλα';
				xLang['YES']					= 'Ναι';
				xLang['NO']						= 'Όχι';
				xLang['LOGIN']					= 'Σύνδεση';
				xLang['MARCADORES']				= 'Αγαπημένα';
				xLang['ANYADIR']				= 'Προσθήκη';
				xLang['ENLACE']					= 'Νέο αγαπημένο URL';
				xLang['TEXTO']					= 'Κείμενο';
				xLang['ELIMINAR']				= 'Διαγραφή';
				xLang['MAXTIME']				= 'Μέγιστος χρόνος';
				xLang['ARCHIVE']				= 'Αρχείο';
				xLang['RESUMEN']				= 'Σύνοψη';
				xLang['TROPAS']					= 'Στρατεύματα';
				xLang['CHECKVERSION']			= 'Αναβάθμιση TBeyond';
				xLang['ACTUALIZAR']				= 'Ανανέωσε πληροφορίες χωριού';
				xLang['VENTAS']					= 'Αποθηκευμένες Προσφορές';
				xLang['MAPSCAN']				= 'Σάρωση του χάρτη';
				xLang['BIGICONS']				= 'Εμφάνιση μεγάλων εικονιδίων';
				xLang['NOTEBLOCK']				= 'Εμφάνιση του σημειωματάριου';
				xLang['SAVE']					= 'Αποθήκευση';
				xLang['RPDEFACT']				= 'Προεπιλογή πλατείας συγκεντρώσεως';
				xLang['ATTACKTYPE2']			= 'Ενισχύσεις';
				xLang['ATTACKTYPE3']			= 'Επίθεση: Εισβολή';
				xLang['ATTACKTYPE4']			= 'Επίθεση: Εισβολή αρπαγής';
				xLang['NBSIZE']					= 'Μέγεθος σημειωματάριου';
				xLang['NBSIZEAUTO']				= 'Αυτόματο';
				xLang['NBSIZENORMAL']			= 'Κανονικό (μικρό)';
				xLang['NBSIZEBIG']				= 'Μεγάλη οθόνη (μεγάλο)';
				xLang['NBHEIGHT']				= 'Ύψος σημειωματάριου';
				xLang['NBAUTOEXPANDHEIGH']		= 'Αυτόματη επέκταση ύψους';
				xLang['NBKEEPHEIGHT']			= 'Προεπιλεγμένο ύψος';
				xLang['SHOWCENTERNUMBERS']		= 'Εμφάνιση κεντρικών αριθμών';
				xLang['NPCSAVETIME']			= 'Κερδίζεις: ';
				xLang['SHOWCOLORRESLEVELS']		= 'Δείξε χρώματα για το επίπεδο των πρώτων υλών';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Δείξε χρώματα για το επίπεδο των κτηρίων';
				xLang['CNCOLORNEUTRAL']			= 'Χρώμα όταν υπάρχει διαθέσιμη αναβάθμιση<br>(Προεπιλογή = άδειο)';
				xLang['CNCOLORMAXLEVEL']		= 'Χρώμα όταν είναι στο επίπεδο<br>(Προεπιλογή = άδειο)';
				xLang['CNCOLORNOUPGRADE']		= 'Χρώμα όταν δεν υπάρχει διαθέσιμη αναβάθμιση<br>(Προεπιλογή = άδειο)';
				xLang['CNCOLORNPCUPGRADE']		= 'Χρώμα για αναβάθμιση μέσω του NPC<br>(Προεπιλογή = άδειο)';
				xLang['TOTALTROOPS']			= 'Συνολικά στρατεύματα χωριού';
				xLang['SHOWBOOKMARKS']			= 'Εμφάνιση σελιδοδεικτών';
				xLang['RACECRTV2']				= 'Φυλή';
				xLang['SERVERVERSION2']			= "Travian v2.x server";
				xLang['SELECTALLTROOPS']		= "Επιλογή όλων των στρατευμάτων";
				xLang['PARTY']					= "Εορταστικές εκδηλώσεις";
				xLang['CPPERDAY']				= "Πόντοι Πολιτισμού/μέρα";
				xLang['SLOT']					= "Διαθέσιμος χώρος";
				xLang['TOTAL']					= "Σύνολο";
				xLang['NOPALACERESIDENCE']		= "Δεν υπάρχει μέγαρο/παλάτι ή το κέντρο του χωριού δεν άνοιξε ακόμα!";
				xLang['SELECTSCOUT']			= "Ανίχνευση";
				xLang['SELECTFAKE']				= "Αντιπερισπασμός";
				xLang['NOSCOUT2FAKE']			= "Είναι αδύνατο να χρησιμοποιήσεις ανιχνευτές για αντιπερισπασμό!";
				xLang['NOTROOP2FAKE']			= "Δεν υπάρχουν στρατεύματα για αντιπερισπασμό!";
				xLang['NOTROOP2SCOUT']			= "Δεν υπάρχουν ανιχνευτές!";
				xLang['NOTROOPS']				= "Δεν υπάρχουν στρατεύματα στο χωριό!";
				xLang['ALL']					= "Όλα";
				xLang['NORACE']					= "Χτίσε στρατόπεδο για να προσδιορίσεις την φυλή και/ή άνοιξε την πλατεία συγκεντρώσεως...";
				xLang['COLORHELPTEXT']			= "Στα πεδία χρωμάτων μπορείς να βάλεις:<br>- <b>green</b> ή <b>reb</b> ή <b>orange</b>, κτλ.<br>- κώδικα HEX για χρώμματα όπως <b>#004523</b><br>- άφησε κενό για προεπιλεγμένο χρώμα";
				xLang['COLORHELP']				= "Βοήθεια για τα πεδία χρωμάτων";
				xLang['SHOWORIGREPORT']			= "Δείξε κανονική αναφορά (για ποστάρισμα)";
				xLang['SHOWCELLTYPEINFO']		= "Δείξε τον τύπο του χωραφιού/της όασης<br>όταν πηγαίνω πάνω με το ποντίκι";
				xLang['WARSIM']					= "Link για προσομοιωτή μάχης:<br>(αριστερό μενού)";
				xLang['WARSIMOPTION1']			= "Εσωτερικός (παρέχεται από το παιχνίδι)";
				xLang['WARSIMOPTION2']			= "Εξωτερικός (παρέχεται από το kirilloid.ru)";
				xLang['WSANALYSER']				= "Χρήση World Analyser";
				xLang['SHOWSTATLINKS']			= "Δείξε link για αναλυτικά στατιστικά";
				xLang['NONEWVERSION']			= "Έχεις την νεότερη δυνατή έκδοση";
				xLang['BETAVERSION']			= "Έχεις δοκιμαστική έκδοση";
				xLang['NEWVERSIONAV']			= 'Διαθέσιμη νέα έκδοση';
				xLang['UPDATESCRIPT']			= "Να ενημερωθεί το scipt τώρα;";
				xLang['CHECKUPDATE']			= "Έλεγχος για ενημέρωση του script.<br>Παρακαλώ περιμένετε...";
				xLang['AVPOPPERVIL']			= "Μέσος πληθυσμός ανα χωριό";
				xLang['AVPOPPERPLAYER']			= "Μέσος πληθυσμός ανά παίκτη";
				xLang['SHOWRESUPGRADETABLE']	= "Δείξε τον πίνακα αναβαθμίσεων για τις πρώτες ύλες";
				xLang['SHOWBUPGTABLE']			= "Δείξε τον πίνακα αναβαθμίσεων για τα κτήρια";
				xLang['CONSOLELOGLEVEL']		= "Console Log Level<br><b>ΜΟΝΟ ΓΙΑ ΠΡΟΓΡΑΜΜΑΤΑΤΙΣΤΕΣ Ή ΑΠΑΣΦΑΛΜΑΤΩΣΗ</b><br>(Προεπιλογή = 0)";
				xLang['MARKETPRELOAD']			= "Αριθμός των σελίδων για φόρτωση<br>μέσα στην αγορά => στην σελίδα 'Αγοράστε'<br>(Προεπιλογή = 1, Μέγιστο = 5)";
				xLang['CAPITAL']				= "Όνομα πρωτεύουσας<br><b>Μην το πειράζεις, αν' αυτού επισκέψου το προφίλ σου</b>";
				xLang['CAPITALXY']				= "Συντεταγμένες πρωτεύουσας<br><b>Μην το πειράζεις, αν' αυτού επισκέψου το προφίλ σου</b>";
				xLang['MAX']					= 'Μέγιστο';
				xLang['TOTALTROOPSTRAINING']	= 'Συνολικά στρατεύματα σε εκπαίδευση';
				xLang['SHOWDISTTIMES']			= 'Δείξε αποστάσεις και χρόνους';
				xLang['TBSETUPLINK']			= 'Travian Beyond Ρυθμίσεις';
				xLang['UPDATEALLVILLAGES']		= 'Ενημέρωσε όλα τα χωριά. ΧΡΗΣΙΜΟΠΟΙΗΣΕ ΤΟ ΜΕ ΜΕΓΑΛΗ ΠΡΟΣΟΧΗ ΚΑΘΩΣ ΜΠΟΡΕΙ ΝΑ ΑΠΟΒΛΗΘΕΙΣ !!!';
				xLang['SHOWMENUSECTION3']		= "Δείξε επιπλέον link στο αριστερό μενού<br>(Traviantoolbox, World Analyser, Travilog, TravMap, κτλ.)";
				xLang['LARGEMAP']				= 'Μεγάλος χάρτης';
				xLang['SHOWTRAVMAPLINKS']		= 'Δείξε link για travmap.shishnet.org<br>(χρήστες και συμμαχίες)';
				xLang['USETHEMPR']				= 'Χρησιμοποίησε τα (αναλογικά)';
				xLang['USETHEMEQ']				= 'Χρησιμοποίησε τα (ίσα)';
				xLang['TOWNHALL']				= 'Δημαρχείο';
				xLang['GAMESERVERTYPE']			= 'Server Παιχνιδιού';
				xLang['MARKETOFFERS']			= 'Προσφορές Αγοράς';
				xLang['ACCINFO']				= 'Πληροφορίες λογαριασμού';
				xLang['BOOKMARKOPTIONS']		= 'Σελιδοδείκτες';
				xLang['NOTEBLOCKOPTIONS']		= 'Σημειωματάριο';
				xLang['MENULEFT']				= 'Μενού στο αριστερό μέρος';
				xLang['STATISTICS']				= 'Στατιστικά';
				xLang['RESOURCEFIELDS']			= 'Χωράφια πρώτων υλών';
				xLang['VILLAGECENTER']			= 'Κέντρο χωριού';
				xLang['MAPOPTIONS']				= 'Επιλογές χάρτη';
				xLang['COLOROPTIONS']			= 'Επιλογές χρωμάτων';
				xLang['DEBUGOPTIONS']			= 'Επιλογές απασφαλμάτωσης';
				xLang['SHOWBIGICONMARKET']		= 'Αγορά';
				xLang['SHOWBIGICONMILITARY']	= 'Στρατιωτικά<br>Πλατεία συγκεντρώσεως/Στρατόπεδο/Εργαστήριο/Στάβλος';
				xLang['SHOWBIGICONALLIANCE']	= 'Συμμαχία';
				xLang['SHOWBIGICONMILITARY2']	= "Δημαρχείο/Περιοχή ηρώων/Πανοπλοποιείο/Οπλοποιείο";
				xLang['HEROSMANSION']			= "Περιοχή ηρώων";
				xLang['BLACKSMITH']				= 'Οπλοποιείο';
				xLang['ARMOURY']				= 'Πανοπλοποιείο';
				xLang['NOW']					= 'Τώρα';
				xLang['CLOSE']					= 'Κλείσιμο';
				xLang['USE']					= 'Χρήση';
				xLang['USETHEM1H']				= 'Χρησιμοποίησε τα (1 ωριαία παραγωγή)';
				xLang['OVERVIEW']				= 'Επισκόπηση';
				xLang['FORUM']					= 'Φόρουμ (Forum)';
				xLang['ATTACKS']				= 'Επιθέσεις';
				xLang['NEWS']					= 'Νέα';
				xLang['ADDCRTPAGE']				= 'Πρόσθεσε τρέχουσα σελίδα ως σελιδοδείκτη';
				xLang['SCRIPTPRESURL']			= 'TBeyond website';
				xLang['NOOFSCOUTS']				= 'Αριθμός ανιχνευτών για την<br>λειτουργία "Ανίχνευση"';
				xLang['SPACER']					= 'Διάστημα';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'Δείξε πληροφορίες στρατιωτών<br>σε παράθυρο συμβουλών';
				xLang['MESREPOPTIONS']			= 'Μηνύματα & Αναφορές';
				xLang['MESREPPRELOAD']			= 'Αριθμός μηνυμάτων/αναφορών για φόρτωμα<br>(Προεπιλογή =1, Μέγιστο = 5)';
				xLang['ATTABLES']				= 'Πίνακες στρατευμάτων';
				xLang['MTWASTED']				= 'Χάσιμο';
				xLang['MTEXCEED']				= 'Υπέρβαση';
				xLang['MTCURRENT']				= 'Τρέχον φορτίο';
				xLang['ALLIANCEFORUMLINK']		= 'Link σε εξωτερικό φόρουμ<br>(’φησε το άδειο για το εσωτερικό φόρουμ)';
				xLang['LOCKBOOMARKS']			= 'Κλείδωσε τους σελιδοδείκτες<br>(κρύψε τα διαγραφή, μετακίνησε πάνω/πάτω εικονίδια)';
				xLang['MTCLEARALL']				= 'Καθαρισμός';
				xLang['UNLOCKBOOKMARKS']		= 'Ξεκλείδωσε τους σελιδοδείκτες<br>(δείξε τα διαγραφή, μετακίνησε πάνω/πάτω εικονίδια)';
				xLang['CLICKSORT']				= 'Κλικ για ταξινόμηση';
				xLang['MIN']					= 'Min';
				xLang['SAVEGLOBAL']				= 'Κοινό σε όλα τα χωριά';
				xLang['VILLAGELIST']			= 'Λίστα χωριών';
				xLang['SHOWINOUTICONS']			= "Δείξε τα link 'dorf1.php' και 'dorf2.php'";
				xLang['UPDATEPOP']				= 'Ενημέρωσε τον πληθυσμό';
				xLang['SHOWRPRINFOTOOLTIPS']	= 'Δείξε απόσταση και χρόνους στα χωριά<br>σε παράθυρο συμβουλών<br>(Πλατείας συγκεντρώσεως & Αναφορές)';
				xLang['EDIT']					= 'Επεξεργασία';
				xLang['SHOWMESOPENLINKS']		= 'Δείξε links για να ανοίγουν τα μυνήματα<br>σε αναδυόμενο παράθυρο';
				xLang['NPCOPTIONS']				= 'Επιλογές του NPC βοηθού';
				xLang['NPCASSISTANT']			= 'Δείξε τους υπολογισμούς/link του NPC βοηθού';
				xLang['SHOWMAPTABLE']			= 'Δείξε τον πίνακα των παικτών/χωριών/κατειλημένων οάσεων';
				xLang['NEWVILLAGEAV']			= 'Ημερομηνία/Ώρα';
				xLang['TIMEUNTIL']				= 'Χρόνος να περιμένεις';
				xLang['SHOWREPDELTABLE']		= 'Δείξε τον πίνακα "Διαγραφή" στην σελίδα αναφορών';
				xLang['SHOWIGMLINKFORME']		= 'Δείξε το "Αποστολή μηνύματος IGM" εικονίδιο για μένα, επείσης';
				xLang['CENTERMAP']				= 'Επικέντρωση χάρτη σε αυτό το χωριό';
				xLang['SHOWCENTERMAPICON']		= 'Δείξε το "Επικέντρωση χάρτη σε αυτό το χωριό" εικονίδιο';
				xLang['INETGPOPTION']			= 'Internet Graphic Pack';
				xLang['ALLOWINETGP']			= 'Επέτρεψε Internet Graphic Packs';
				xLang['SENDTROOPS']				= 'Αποστολή στρατευμάτων';
				xLang['SHOWBRSTATDETAILS']		= 'Δείξε λεπτομέρειες στατιστικών στις Αναφορές';
				xLang['SHOWBIGICONMISC']		= "Παλάτι/Μέγαρο/Ακαδημία/Θησαυροφυλάκιο";
				xLang['PALACE']					= "Παλάτι";
				xLang['RESIDENCE']				= "Μέγαρο";
				xLang['ACADEMY']				= "Ακαδημία";
				xLang['TREASURY']				= "Θησαυροφυλάκιο";
				xLang['SHOWBBLINK']				= "Δείξε το επίπεδο του κτηρίου που αναβαθμίζεται να αναβοσβήνει";
				break;
			case "kr":
				//Korean translation - Thank you, Daniel Cliff
				xLang['ALLIANCE']				= '동맹';
				xLang['AREYOUSURE']				= '확실합니까?';
				xLang['LOSS']					= '손실';
				xLang['PROFIT']					= '미율';
				xLang['EXTAVAILABLE']			= '확장 가능';
				xLang['PLAYER']					= '플레이어';
				xLang['VILLAGE']				= '마을';
				xLang['POPULATION']				= '인구';
				xLang['COORDS']					= '좌표';
				xLang['MAPTABLEACTIONS']		= '행동';
				xLang['SAVED']					= '저장성공';
				xLang['YOUNEED']				= 'You need';
				xLang['TODAY']					= 'today';
				xLang['TOMORROW']				= 'tomorrow';
				xLang['PAS_MANYANA']			= 'day after tomorrow';
				xLang['MARKET']					= '시장';
				xLang['BARRACKS']				= '병영';
				xLang['RALLYPOINT']				= '집결지';
				xLang['STABLE']					= '마구간';
				xLang['WORKSHOP']				= '대장간';
				xLang['ENVIAR']					= '자원 보내기';
				xLang['COMPRAR']				= '구매';
				xLang['VENDER']					= '판매';
				xLang['SENDIGM']				= 'IGM 보내기';
				xLang['LISTO']					= '가능한';
				xLang['ON']						= '날짜';
				xLang['A_LAS']					= '시간';
				xLang['EFICIENCIA']				= '효율';
				xLang['NEVER']					= 'Never';
				xLang['ALDEAS']					= '마을(들)';
				xLang['TIEMPO']					= '시간';
				xLang['OFREZCO']				= '제시';
				xLang['BUSCO']					= '판매';
				xLang['TIPO']					= '종류';
				xLang['DISPONIBLE']				= '가능한 거래만 표시';
				xLang['CUALQUIERA']				= '모두';
				xLang['YES']					= '네';
				xLang['NO']						= '아니오';
				xLang['LOGIN']					= '로그인';
				xLang['MARCADORES']				= '북마크';
				xLang['ANYADIR']				= '추가';
				xLang['ENLACE']					= '북마크 주소';
				xLang['TEXTO']					= '북마크 이름';
				xLang['ELIMINAR']				= '삭제';
				xLang['MAPA']					= '지도';
				xLang['MAXTIME']				= 'Maximum time';
				xLang['ARCHIVE']				= '보관';
				xLang['RESUMEN']				= '요약';
				xLang['LARGEMAP']				= '확장 지도';
				xLang['TROPAS']					= '부대';
				xLang['CHECKVERSION']			= 'Update TBeyond';
				xLang['ACTUALIZAR']				= 'Update village information';
				xLang['VENTAS']					= '저장된 판매리스트';
				xLang['MAPSCAN']				= '지도 검색';
				xLang['BIGICONS']				= '상단 메뉴 추가 아이콘 표시';
				xLang['NOTEBLOCK']				= '노트 표시';
				xLang['SAVE']					= '저장';
				xLang['RPDEFACT']				= '집결지 기본 설정';
				xLang['ATTACKTYPE2']			= '지원';
				xLang['ATTACKTYPE3']			= '공격: 통상';
				xLang['ATTACKTYPE4']			= '공격: 약탈';
				xLang['NBSIZE']					= '노트 크기';
				xLang['NBSIZEAUTO']				= '자동';
				xLang['NBSIZENORMAL']			= '보통 (작음)';
				xLang['NBSIZEBIG']				= '큰 스크린 (큼)';
				xLang['NBHEIGHT']				= '노트 높이';
				xLang['NBAUTOEXPANDHEIGHT']		= '높이 자동 설정';
				xLang['NBKEEPHEIGHT']			= '기본 높이';
				xLang['SHOWCENTERNUMBERS']		= 'Show center numbers';
				xLang['NPCSAVETIME']			= 'save: ';
				xLang['SHOWCOLORRESLEVELS']		= '자원필드 레벨 색 구분';
				xLang['SHOWCOLORBUILDLEVELS']	= '빌딩 레벨 색 구분';
				xLang['CNCOLORNEUTRAL']			= '색 : 업그레이드 가능(Empty = 기본)';
				xLang['CNCOLORMAXLEVEL']		= '색 : 최고 레벨 (Empty = 기본)';
				xLang['CNCOLORNOUPGRADE']		= '색 : 업그레이드 불가능(Empty = 기본)';
				xLang['CNCOLORNPCUPGRADE']		= '색 : NPC거래 후 업그레이드 가능(Empty = 기본)';
				xLang['TOTALTROOPS']			= '모든 마을 병력 총합';
				xLang['SHOWBOOKMARKS']			= '북마크 표시';
				xLang['RACECRTV2']				= '종족';
				xLang['SERVERVERSION2']			= "Travian v2.x 서버";
				xLang['SHOWSTATLINKS']			= "World Analyser 통계 링크 표시";
				xLang['SELECTALLTROOPS']		= "부대 모두 선택";
				xLang['PARTY']					= "잔치";
				xLang['CPPERDAY']				= "CP/일";
				xLang['SLOT']					= "슬롯";
				xLang['TOTAL']					= "총합";
				xLang['NOPALACERESIDENCE']		= "마을게 저택/궁전이 없습니다!";
				xLang['NEWVERSIONAV']			= '가능한 버전';
				break;
			case "my":
				//Malaysian language added - thank you Light@fei
				xLang['ALLIANCE']				= 'Kedutaan';
				xLang['SIM']					= 'Simulator Peperangan';
				xLang['AREYOUSURE']				= 'Adakah anda pasti?';
				xLang['LOSS']					= 'Kehilangan';
				xLang['PROFIT']					= 'Keuntungan';
				xLang['EXTAVAILABLE']			= 'Boleh dibesarkan';
				xLang['PLAYER']					= 'Pemain';
				xLang['VILLAGE']				= 'Kampung';
				xLang['POPULATION']				= 'Populasi';
				xLang['COORDS']					= 'Coordinats';
				xLang['MAPTABLEACTIONS']		= 'Tindakan';
				xLang['SAVED']					= 'Disimpan';
				xLang['YOUNEED']				= 'Anda perlu';
				xLang['TODAY']					= 'Hari ini';
				xLang['TOMORROW']				= 'Esok';
				xLang['PAS_MANYANA']			= 'hari';
				xLang['MARKET']					= 'Pasar';
				xLang['BARRACKS']				= 'Berek';
				xLang['RALLYPOINT']				= 'Titik perhimpunan';
				xLang['STABLE']					= 'Kandang Kuda';
				xLang['WORKSHOP']				= 'Bengkel';
				xLang['ENVIAR']					= 'Hantar Sumber-sumber';
				xLang['COMPRAR']				= 'Beli';
				xLang['VENDER']					= 'Jual';
				xLang['SENDIGM']				= 'Hantar IGM';
				xLang['LISTO']					= 'Ada';
				xLang['ON']						= 'pada';
				xLang['A_LAS']					= 'pada pukul';
				xLang['EFICIENCIA']				= 'Kecekapan';
				xLang['NEVER']					= 'Tidak pernah';
				xLang['ALDEAS']					= 'Kampung(-kampung)';
				xLang['TIEMPO']					= 'Masa';
				xLang['OFREZCO']				= 'Menawar';
				xLang['BUSCO']					= 'Mencari';
				xLang['TIPO']					= 'Jenis';
				xLang['DISPONIBLE']				= 'Only available';
				xLang['CUALQUIERA']				= 'Any';
				xLang['YES']					= 'Ya';
				xLang['NO']						= 'Tidak';
				xLang['LOGIN']					= 'Log-Masuk';
				xLang['MARCADORES']				= 'Bookmarks';
				xLang['ANYADIR']				= 'Tambah';
				xLang['ELIMINAR']				= 'Padam';
				xLang['MAPA']					= 'Peta';
				xLang['MAXTIME']				= 'Masa Maximum';
				xLang['ARCHIVE']				= 'Archive';
				xLang['RESUMEN']				= 'Summary';
				xLang['LARGEMAP']				= 'Extended map';
				xLang['TROPAS']					= 'Troops';
				xLang['CHECKVERSION']			= 'Update TBeyond';
				xLang['VENTAS']					= 'Tawaran yang disimpan';
				xLang['SAVE']					= 'Simpan';
				xLang['RPDEFACT']				= 'Aksi pertahanan titik perhimpunan';
				xLang['ATTACKTYPE2']			= 'Bantuan';
				xLang['ATTACKTYPE3']			= 'Serangan: Normal';
				xLang['ATTACKTYPE4']			= 'Serangan: Serbuan';
				break;
			case "lv":
				//
				xLang['ALLIANCE']				= 'Alianse';
				xLang['SIM']					= 'Kaujas simulātors';
				xLang['AREYOUSURE']				= 'Vai esi pārliecināts?';
				xLang['LOSS']					= 'Zaudējumi';
				xLang['PROFIT']					= 'Guvums';
				xLang['EXTAVAILABLE']			= 'Celšana pieejama';
				xLang['PLAYER']					= 'Spēlētājs';
				xLang['VILLAGE']				= 'Ciems';
				xLang['POPULATION']				= 'Populācija';
				xLang['COORDS']					= 'Koordinātes';
				xLang['MAPTABLEACTIONS']		= 'Notikumi';
				xLang['SAVED']					= 'Saglabāts';
				xLang['YOUNEED']				= 'Nepieciešams';
				xLang['TODAY']					= 'šodien';
				xLang['TOMORROW']				= 'rītdien';
				xLang['PAS_MANYANA']			= 'aizparīt';
				xLang['MARKET']					= 'Tirgus';
				xLang['BARRACKS']				= 'Kazarmas';
				xLang['RALLYPOINT']				= 'Mītiņa vieta';
				xLang['STABLE']					= 'Stallis';
				xLang['WORKSHOP']				= 'Darbnīca';
				xLang['ENVIAR']					= 'Sūtīt resursus';
				xLang['COMPRAR']				= 'Pirkt';
				xLang['VENDER']					= 'Pārdot';
				xLang['SENDIGM']				= 'Sūtīt ziņu';
				xLang['LISTO']					= 'Pieejams';
				xLang['ON']						= 'ap';
				xLang['A_LAS']					= 'ap';
				xLang['EFICIENCIA']				= 'Lietderība';
				xLang['NEVER']					= 'Ne tagad';
				xLang['ALDEAS']					= 'Ciemi';
				xLang['TIEMPO']					= 'Laiks';
				xLang['OFREZCO']				= 'Piedāvājumi';
				xLang['BUSCO']					= 'Meklē';
				xLang['TIPO']					= 'Tips';
				xLang['DISPONIBLE']				= 'Tikai pieejamos';
				xLang['CUALQUIERA']				= 'Jebkurš';
				xLang['YES']					= 'Jā';
				xLang['NO']						= 'Nē';
				xLang['LOGIN']					= 'Ieiet';
				xLang['MARCADORES']				= 'Saglabātās saites';
				xLang['ANYADIR']				= 'Pievienot';
				xLang['ENLACE']					= 'Jaunās saites URL';
				xLang['TEXTO']					= 'Jaunās saites nosaukums';
				xLang['ELIMINAR']				= 'Dzēst';
				xLang['MAPA']					= 'Karte';
				xLang['MAXTIME']				= 'Maksimālais laiks';
				xLang['ARCHIVE']				= 'Arhīvs';
				xLang['RESUMEN']				= 'Pārskats';
				xLang['TROPAS']					= 'Karavīri';
				xLang['CHECKVERSION']			= 'Atjaunot versiju';
				xLang['ACTUALIZAR']				= 'Atjaunot ciema informāciju';
				xLang['VENTAS']					= 'Saglabātie piedāvājumi';
				xLang['MAPSCAN']				= 'Meklēt kartē';
				xLang['BIGICONS']				= 'Rādīt papildus ikonas';
				xLang['NOTEBLOCK']				= 'Rādīt pierakstu blociņu';
				xLang['SAVE']					= 'Saglabāt';
				xLang['RPDEFACT']				= 'Mītiņa vietas noklusētā darbība';
				xLang['ATTACKTYPE2']			= 'Papildspēki';
				xLang['ATTACKTYPE3']			= 'Uzbrukums: Parasts';
				xLang['ATTACKTYPE4']			= 'Uzbrukums: Iebrukums';
				xLang['NBSIZE']					= 'Piezīmju blociņa izmērs';
				xLang['NBSIZEAUTO']				= 'Automātisks';
				xLang['NBSIZENORMAL']			= 'Normāls (mazais)';
				xLang['NBSIZEBIG']				= 'Platiem ekrāniem (lielais)';
				xLang['NBHEIGHT']				= 'Pierakstu blociņa augstums';
				xLang['NBAUTOEXPANDHEIGHT']		= 'Automātiski izstiepts augstums';
				xLang['NBKEEPHEIGHT']			= 'Noklusētais augstums';
				xLang['SHOWCENTERNUMBERS']		= 'Numurus rādīt centrētus';
				xLang['NPCSAVETIME']			= 'Saglabāt:';
				xLang['SHOWCOLORRESLEVELS']		= 'Rādīt resursu līmeņu krāsas';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Rādīt celtņu līmeņu krāsas';
				xLang['CNCOLORNEUTRAL']			= 'Krāsa: Iespējams uzlabot<br>(Noklusētais = Tukšs)';
				xLang['CNCOLORMAXLEVEL']		= 'Krāsa: Maksimālā līmeņa krāsa l<br>(Noklusētais = Tukšs)';
				xLang['CNCOLORNOUPGRADE']		= 'Krāsa: Līmeni nevar uzlabot<br>( Noklusētais = Tukšs)';
				xLang['CNCOLORNPCUPGRADE']		= 'Krāsa: Uzlabošana caur NPC<br>( Noklusētais = Tukšs)';
				xLang['TOTALTROOPS']			= 'Kopējais karaspēka skaits';
				xLang['SHOWBOOKMARKS']			= 'Rādīt saglabātās saites';
				xLang['RACECRTV2']				= 'Rase';
				xLang['SERVERVERSION2']			= "Travian v2.x server";
				xLang['SELECTALLTROOPS']		= "Izvēlēties visu karaspēku";
				xLang['PARTY']					= "Svinības";
				xLang['CPPERDAY']				= "Kultūras punkti/Dienā";
				xLang['SLOT']					= "Vieta";
				xLang['TOTAL']					= "Kopā";
				xLang['NOPALACERESIDENCE']		= "Šajā ciemā nav rezidences vai pils, vai arī ciema centrs nav atvērts!";
				xLang['SELECTSCOUT']			= "Izvēlieties izlūku";
				xLang['SELECTFAKE']				= "Izvēlieties ne-īsto";
				xLang['NOSCOUT2FAKE']			= "Nav iespējams izmantot skautus kā māņu uzbrukumu!";
				xLang['NOTROOP2FAKE']			= "Jums nav karaspēka, lai izpildītu māņu uzbrukumu!";
				xLang['NOTROOP2SCOUT']			= "Nav karspēka, lai veiktu izspiegošanu !";
				xLang['NOTROOPS']				= "Jums šajā ciema nav karaspēka!";
				xLang['ALL']					= "Visi";
				xLang['NORACE']					= "Uzceliet kazarmas, lai automātiski noteiktu rasi un/vai atvērtu ciema centru...";
				xLang['COLORHELPTEXT']			= "Krāsu laukumos varat ievadīt šādas krāsas:<br>- <b>green</b> vai <b>red</b> vai  <b>orange</b>, utt.<br>- kā arī krāsu kodus <b>#004523</b><br>- vai arī atstājat tukšu, lai izmantotu noklusētās krāsas";
				xLang['COLORHELP']				= "Palīdzēt ar krāsu laukumiņiem";
				xLang['SHOWORIGREPORT']			= "Rādīt oriģinālo ziņojumu (priekš kopēšanas utt)";
				xLang['SHOWCELLTYPEINFO']		= "Rādīt sūnas tipu/oāzes informācijuShow <br>while kamēr peles kursors ir uz kartes";
				xLang['WARSIM']					= "Kaujas simulatora saite:<br>(kreisā izvēlnes josla)";
				xLang['WARSIMOPTION1']			= "Iekšējais (nodrošinājusi spēle)";
				xLang['WARSIMOPTION2']			= "Ārējais (nodršinājis kirilloid.ru)";
				xLang['WSANALYSER']				= "Pasaules analīze";
				xLang['SHOWSTATLINKS']			= "Rādīt analīzes ikonu pie saitēm";
				xLang['NONEWVERSION']			= "Jūs jau lietojat pēdējo Travian Beyond versiju";
				xLang['BETAVERSION']			= "Jūs varat lietot arī Beta versiju";
				xLang['NEWVERSIONAV']			= "Jaunākā skripta versija ir pieejama";
				xLang['UPDATESCRIPT']			= "Atjaunot skriptu tagad?";
				xLang['CHECKUPDATE']			= "Meklēju skripta jauninājumu. Lūdzu uzgaidiet...";
				xLang['CROPFINDER']				= "Labības lauku meklētajs";
				xLang['AVPOPPERVIL']			= "Vidējā populācija pret ciemu";
				xLang['AVPOPPERPLAYER']			= "Vidējā populācija pret spēlētāju";
				xLang['SHOWRESUPGRADETABLE']	= "Rādīt resursu līmeņu tabulu";
				xLang['SHOWBUPGTABLE']			= "Rādīt celtņu līmeņu tabulu";
				xLang['CONSOLELOGLEVEL']		= "Konsules Log līmenis<br>TIKAI PRIEKŠ PROGRAMĒTĀJIEM  VAI KĻŪDU NOVĒRŠANAS<br>(Noklusētais = 1)";
				xLang['MARKETPRELOAD']			= "Piedāvājumu lapu skaits <br>kamēr ‘Tirgus => Pirkt' page<br>(Noklusētais = 1)";
				xLang['CAPITAL']				= 'Galvaspilsētas nosaukums<br><b>Apmeklē savu profilu</b>';
				xLang['CAPITALXY']				= 'Galvaspilsētas koordinātes<br><b> Apmeklē savu profilu</b>';
				xLang['MAX']					= 'Maksimālais';
				xLang['TOTALTROOPSTRAINING']	= 'Kopējais karaspēka skaits, kas tiek trenēts';
				xLang['SHOWDISTTIMES']			= 'Rādīt distanci un laiku';
				xLang['TBSETUPLINK']			= 'Travian Beyond opcijas';
				xLang['UPDATEALLVILLAGES']		= 'Uzlabot visus ciemus. ŠO LABĀK NEIZMANTOT, JO TAS VAR NOVEST PIE KONTA BLOĶĒŠANAS';
				xLang['SHOWMENUSECTION3']		= "Rādīt papildus saites kreisajā izvēlnes joslā<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
				xLang['LARGEMAP']				= 'Lielā karte';
				xLang['SHOWTRAVMAPLINKS']		= 'Rādīt saiti uz travmap.shishnet.org<br>(lietotāji un alianses)';
				xLang['USETHEMPR']				= 'Lietot tos (proporcionāli)';
				xLang['USETHEMEQ']				= 'Lietot tos (vienlīdzīgi)';
				xLang['TOWNHALL']				= 'Rātsnams';
				xLang['GAMESERVERTYPE']			= 'Spēles serveris';
				xLang['MARKETOFFERS']			= 'Tirgus piedāvajumi';
				xLang['ACCINFO']				= 'xxx';
				xLang['BOOKMARKOPTIONS']		= 'Saglabātās saites';//identical to xLang['MARCADORES'] => check if this can be removed
				xLang['NOTEBLOCKOPTIONS']		= 'Pierakstu blociņs';
				xLang['MENULEFT']				= 'Kreisās puses izvēles josla';
				xLang['STATISTICS']				= 'Statistika';
				xLang['RESOURCEFIELDS']			= 'Resursu lauki';
				xLang['VILLAGECENTER']			= 'Ciema centrs';
				xLang['MAPOPTIONS']				= 'Kastes iestatījumi';
				xLang['COLOROPTIONS']			= 'Krāsu iestatījumi';
				xLang['DEBUGOPTIONS']			= 'Kļūdu ziņojumu iestatījumi';
				xLang['SHOWBIGICONMARKET']		= 'Tirgus';
				xLang['SHOWBIGICONMILITARY']	= 'Militārās celtnes<br>Mītiņa vieta/Kazarmas/Darbnīca/Stallis';
				xLang['SHOWBIGICONALLIANCE']	= 'Alianse'; //identical to xLang['ALLIANCE'] => check if this can be removed
				xLang['SHOWBIGICONMILITARY2']	= "Rātsnams/Varoņu Savrupmāja/Ieroču kaltuve/Bruņu kaltuve";
				xLang['HEROSMANSION']			= " Varoņu Savrupmāja";
				xLang['BLACKSMITH']				=  ' Ieroču kaltuve ';
				xLang['ARMOURY']				= 'Bruņu kaltuve ';
				xLang['NOW']					= 'Tagad';
				xLang['CLOSE']					= 'Aizvērt';
				xLang['USE']					= 'Lietot';
				xLang['USETHEM1H']				= 'Lietot tos (1 stundas produkcija)';
				xLang['OVERVIEW']				= 'Pārskats';
				xLang['FORUM']					= 'Forums';
				xLang['ATTACKS']				= 'Uzbrukumi';
				xLang['NEWS']					= 'Ziņojumi';
				xLang['ADDCRTPAGE']				= 'Pievienot atvērto lapu';
				xLang['SCRIPTPRESURL']			= 'TBeyond mājaslapa';
				xLang['NOOFSCOUTS']				= 'Skautu skaits priekš <br>"Izvēlēties skautus" funkcijas';
				xLang['SPACER']					= 'Starp';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'Rādīt karaspēka informāciju Tooltip’os';
				xLang['MESREPOPTIONS']			= 'Saņemtās ziņas un ziņojumi';
				xLang['MESREPPRELOAD']			= 'Ziņojumu skaits <br>(Noklusētais = 1)';
				xLang['ATTABLES']				= 'Karaspēka saraksti';
				xLang['MTWASTED']				= 'Izniekots';
				xLang['MTEXCEED']				= 'Pārmērīgs';
				xLang['MTCURRENT']				= 'Pašreizējā krava';
				xLang['ALLIANCEFORUMLINK']		= 'Saite uz ārējo Travian forumu<br>(atstāj tukšu, lai saite būtu uz starptautisko forumu)';
				xLang['LOCKBOOKMARKS']			= 'Slēgt saites<br>(Slēpt dzēst, pārvietot uz augšu, uz leju ikonas)';
				xLang['MTCLEARALL']				= 'Nodzēst visu';
				xLang['UNLOCKBOOKMARKS']		= 'Atslēgt saites<br>( Rādīt dzēst, pārvietot uz augšu, uz leju ikonas)';
				xLang['SHOWINOUTICONS']			= "Rādīt 'dorf1.php' un 'dorf2.php' saites";
				xLang['VILLAGELIST']			= 'Ciemu saraksts';
				break;
			case "jp":
				//JP laguage provided by Jackie Jack
				//Jp language Added & modifed. by baan 2008.12.4
				xLang['ALLIANCE']				= '同盟';
				xLang['SIM']					= '戦闘シミュレータ';
				xLang['AREYOUSURE']				= 'ホントに良いですか？';
				xLang['LOSS']					= '損失';
				xLang['PROFIT']					= '利益';
				xLang['EXTAVAILABLE']			= '準備完了';
				xLang['PLAYER']					= 'プレイヤー';
				xLang['VILLAGE']				= '村名';
				xLang['POPULATION']				= '人口';
				xLang['COORDS']					= '座標';
				xLang['MAPTABLEACTIONS']		= 'アクション';
				xLang['SAVED']					= '保存しました';
				xLang['YOUNEED']				= '不足';
				xLang['TODAY']					= '今日';
				xLang['TOMORROW']				= '明日';
				xLang['PAS_MANYANA']			= '明後日';
				xLang['MARKET']					= '市場';
				xLang['BARRACKS']				= '兵舎';
				xLang['RALLYPOINT']				= '集兵所';
				xLang['STABLE']					= '馬舎';
				xLang['WORKSHOP']				= '作業場';
				xLang['ENVIAR']					= '資源の送付';
				xLang['COMPRAR']				= '売方';
				xLang['VENDER']					= '買方';
				xLang['SENDIGM']				= 'メッセージの送付';
				xLang['LISTO']					= '準備完了予定';
				xLang['ON']						= 'on';
				xLang['A_LAS']					= 'at';
				xLang['EFICIENCIA']				= '効率';
				xLang['NEVER']					= '容量不足';
				xLang['ALDEAS']					= '村';
				xLang['TIEMPO']					= '時間';
				xLang['OFREZCO']				= '売方';
				xLang['BUSCO']					= '買方';
				xLang['TIPO']					= 'タイプ';
				xLang['CUALQUIERA']				= '全て';
				xLang['LARGEMAP']				= '拡張マップ';
				xLang['DISPONIBLE']				= '取引可能';
				xLang['YES']					= 'はい';
				xLang['NO']						= 'いいえ';
				xLang['LOGIN']					= 'ログイン';
				xLang['MARCADORES']				= 'ブックマーク';
				xLang['ANYADIR']				= 'ブックマークへ追加';
				xLang['ENLACE']					= '追加するブックマークのURL';
				xLang['TEXTO']					= '追加するブックマークのタイトル';
				xLang['ELIMINAR']				= '削除';
				xLang['MAPA']					= 'TravMap';
				xLang['MAXTIME']				= '最大時間';
				xLang['CHECKVERSION']			= '最新バージョンのチェック';
				xLang['TROPAS']					= '兵士';
				xLang['ARCHIVE']				= 'アーカイブ';
				xLang['RESUMEN']				= '要約';
				xLang['NEWVERSIONAV']			= '最新バージョン';
				xLang['UPDATESCRIPT']			= "スクリプトをアップデートしますか?";
				xLang['CHECKUPDATE']			= "アップデートが無いか確認しています...";
				xLang['AVPOPPERVIL']			= "村当たりの平均人口";
				xLang['AVPOPPERPLAYER']			= "プレイヤー当たりの平均人口";
				xLang['SHOWRESUPGRADETABLE']	= "リソースフィールドを表示するテーブルのアップグレード";
				xLang['SHOWBUILDINGSUPGRADETABLE']= "建物を表示するテーブルのアップグレード";
				xLang['CONSOLELOGLEVEL']		= "コンソールログレベル<br>プログラマーやデバッグのために<br>(Default = 1)";
				xLang['MARKETPRELOAD']			= "トレードページの同時に読み込むページ数<br>(Default = 1)";
				xLang['CAPITAL']				= 'あなたの村の名前<br><b>Visit your Profile for an update</b>';
				xLang['CAPITALXY']				= 'あなたの村の座標<br><b>Visit your Profile for an update</b>';
				xLang['MAX']					= '最大';
				xLang['SHOWDISTTIMES']			= '距離と時間を表示する';
				xLang['TBSETUPLINK']			= 'Travian Beyondをセットアップ';
				xLang['SHOWMENUSECTION3']		= "左側のメニューに追加のリンクを表示<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
				xLang['LARGEMAP']				= '地図を大きくする';
				xLang['SHOWTRAVMAPLINKS']		= 'travmap.shishnet.orgへのリンクを表示する<br>(users and alliances)';
				xLang['TOWNHALL']				= '集会所';
				xLang['GAMESERVERTYPE']			= 'ゲームサーバー';
				xLang['MARKETOFFERS']			= 'トレードページ';
				xLang['ACCINFO']				= 'アカウント情報';
				xLang['BOOKMARKOPTIONS']		= 'ブックマーク';
				xLang['NOTEBLOCKOPTIONS']		= 'ノートブック';
				xLang['MENULEFT']				= '左メニューのリンク設定';
				xLang['STATISTICS']				= '統計';
				xLang['RESOURCEFIELDS']			= 'リソースフィールド';
				xLang['MAPOPTIONS']				= '地図オプション';
				xLang['COLOROPTIONS']			= '文字色オプション';
				xLang['DEBUGOPTIONS']			= 'デバッグオプション';
				xLang['SHOWBIGICONMARKET']		= '市場';
				xLang['SHOWBIGICONMILITARY']	= '軍事<br>集兵所/兵舎/作業場/馬舎';
				xLang['SHOWBIGICONALLIANCE']	= '統計';
				xLang['SHOWBIGICONMILITARY2']	= "集会所/英雄の館/防具工場/鍛冶場";
				xLang['HEROSMANSION']			= "英雄の館";
				xLang['BLACKSMITH']				= '鍛冶場';
				xLang['ARMOURY']				= '防具工場';
				xLang['CLOSE']					= '閉じる';
				xLang['ADDCRTPAGE']				= 'このページをブックマークに追加する';
				xLang['SPACER']					= 'スペーサー';
				xLang['MESREPOPTIONS']			= 'メッセージ・レポート';
				xLang['MTCLEARALL']				= 'すべてを削除';
				xLang['LOCKBOOKMARKS']			= 'ブックマークのロック<br>(削除,編集,上移動,下移動アイコンを隠す)';
				xLang['UNLOCKBOOKMARKS']		= 'ブックマークのアンロック<br>(削除,編集,上移動,下移動アイコンの表示)';
				xLang['BIGICONS']				= '拡張アイコンを表示する';
				xLang['SHOWBOOKMARKS']			= 'ブックマークを表示する';
				xLang['UPDATEPOP']				= '最新の情報に更新';
				xLang['OVERVIEW']				= '概要';
				xLang['FORUM']					= 'フォーラム';
				xLang['ATTACKS']				= '戦闘';
				xLang['NEWS']					= 'ニュース';
				xLang['ATTACKTYPE2']			= '援兵';
				xLang['ATTACKTYPE3']			= '通常攻撃';
				xLang['ATTACKTYPE4']			= '奇襲';
				xLang['MAPSCAN']				= 'マップをスキャン';
				xLang['ALLIANCEFORUMLINK']		= '外部のフォーラムへのリンク<br>(内部フォーラムを使う場合は書かないでください。)';
				xLang['NOTEBLOCK']				= 'メモ帳を表示する';
				xLang['NBSIZE']					= 'メモ帳のサイズ';
				xLang['NBHEIGHT']				= 'メモ帳の高さ';
				xLang['WARSIM']					= "戦闘シミュレータリンク設定<br>(メニュー左)";
				xLang['SHOWSTATLINKS']			= "analyserへのリンクを表示";
				xLang['WSANALYSER']				= "World Analyserの設定";
				xLang['SHOWCOLORRESLEVELS']		= '色でリソースのレベルを表示';
				xLang['SHOWBUILDINGSUPGRADETABLE']= "建物を表示するテーブルのアップグレード";
				xLang['SHOWCENTERNUMBERS']		= 'センターの数字を表示';
				xLang['SHOWCOLORBUILDLEVELS']	= '色で建物のレベルを表示';
				xLang['SHOWCELLTYPEINFO']		= "グリッドのタイプを表示/オアシスインフォメーション";
				xLang['VILLAGECENTER']			= '村の中心';
				xLang['SHOWBUPGTABLE']			= "建物を表示するテーブルのアップグレード";
				xLang['MESREPPRELOAD']			= 'レポートページの同時に読み込むページ数<br>(Default = 1)';
				xLang['NONEWVERSION']			= "あなたは最新バージョンを持っています。";
				xLang['MTCURRENT']				= '総輸送量';
				xLang['MTWASTED']				= '余剰輸送量';
				xLang['SHOWORIGREPORT']			= "オリジナルレポートを見る";
				xLang['EDIT']					= '編集';
				xLang['MTEXCEED']				= '不足輸送量';
				xLang['VILLAGELIST']			= '村のリスト';
				xLang['TOTALTROOPS']			= '全村の兵士';
				xLang['SELECTALLTROOPS']		= "すべての兵士を選択";
				xLang['SELECTSCOUT']			= "スカウトを選択";
				xLang['SELECTFAKE']				= "フェイクを選択";
				xLang['NPCSAVETIME']			= '時間を節約:';
				xLang['SAVE']					= '保存';
				xLang['NOTROOP2SCOUT']			= "スカウトが居ません!";
				xLang['SAVEGLOBAL']				= '全村で共有する';
				xLang['RPDEFACT']				= '集兵所の基本アクション';
				xLang['NOOFSCOUTS']				= 'スカウトを選んだ際、選択する人数';
				xLang['SHOWTROOPINFOTOOLTIPS']	= '兵士アイコンを選んだ際、詳細情報を表示';
				xLang['SHOWRPRINFOTOOLTIPS']	= '村の名前を選んだ際、距離・時間を表示する<br>(集兵所 & レポート)';
				xLang['SHOWMESOPENLINKS']		= 'ポップアップとしてメッセージを表示するアイコンの追加';
				xLang['NPCOPTIONS']				= 'NPCトレードオプション';
				xLang['NPCASSISTANT']			= 'NPCトレードへのリンクの表示';
				xLang['USETHEM1H']				= '1時間生産量';
				xLang['NEWVILLAGEAV']			= '新しい村';
				xLang['SHOWMAPTABLE']			= 'プレイヤーリストの表示(村・オアシス)';
				xLang['USETHEMEQ']				= '均等';
				xLang['USETHEMPR']				= '比例';
				xLang['NEWVILLAGEAV']			= '日付/時刻';
				xLang['TIMEUNTIL']				= '待ち時間';
				xLang['SHOWREPDELTABLE']		= 'レポートページに「全て削除」ボタンを追加';
				xLang['CENTERMAP']				= '村を中心にMAP表示';
				xLang['SHOWCENTERMAPICON']		= '「村を中心にマップを表示」アイコンの追加';
				xLang['INETGPOPTION']			= 'インターネットグラフィックパック';
				xLang['ALLOWINETGP']			= 'インターネットグラフィックパックを許可';
				xLang['SENDTROOPS']				= '兵士を送る';
				xLang['SHOWBIGICONMISC']		= "宮殿/官邸/学院/金庫";
				xLang['PALACE']					= "宮殿";
				xLang['RESIDENCE']				= "官邸";
				xLang['ACADEMY']				= "学院";
				xLang['TREASURY']				= "金庫";
				xLang['SHOWBBLINK']				= "アップグレードを行っている建物のLVを点滅表示";
				break;
			case "sk":
				//By Matthew-PoP for all peoples speak slovak. Verzia 1.0 rc
				xLang['ALLIANCE']				= 'Aliancia';
				xLang['SIM']					= 'Bojový simulátor';
				xLang['AREYOUSURE']				= 'Naozaj?';
				xLang['LOSS']					= 'Strata';
				xLang['PROFIT']					= 'Zisk';
				xLang['EXTAVAILABLE']			= 'Môžeš stavať';
				xLang['PLAYER']					= 'Hráč;';
				xLang['VILLAGE']				= 'Dedina';
				xLang['POPULATION']				= 'Populácia';
				xLang['COORDS']					= 'Súradnice';
				xLang['MAPTABLEACTIONS']		= 'Akcie';
				xLang['SAVED']					= 'Uložené';
				xLang['YOUNEED']				= 'Potrebuješ';
				xLang['TODAY']					= 'dnes';
				xLang['TOMORROW']				= 'zajtra';
				xLang['PAS_MANYANA']			= 'pozajtra';
				xLang['MARKET']					= 'Trh';
				xLang['BARRACKS']				= 'Kasárne';
				xLang['RALLYPOINT']				= 'Zhromaždište';
				xLang['STABLE']					= 'Stajňa';
				xLang['WORKSHOP']				= 'Dielňa';
				xLang['ENVIAR']					= 'Pošli suroviny';
				xLang['COMPRAR']				= 'Kúpiť';
				xLang['VENDER']					= 'Predať';
				xLang['SENDIGM']				= 'Pošli správu';
				xLang['LISTO']					= 'Môžeš stavať';
				xLang['ON']						= 'Dňa';
				xLang['A_LAS']					= 'o';
				xLang['EFICIENCIA']				= 'Efektivnosť';
				xLang['NEVER']					= 'Nikdy';
				xLang['ALDEAS']					= 'Počet dedín';
				xLang['TIEMPO']					= 'Čas';
				xLang['OFREZCO']				= 'Ponuka';
				xLang['BUSCO']					= 'Vyhľadať';
				xLang['TIPO']					= 'Typ';
				xLang['DISPONIBLE']				= 'Len dostupné';
				xLang['CUALQUIERA']				= 'Hociaká';
				xLang['YES']					= 'Áno';
				xLang['NO']						= 'Nie';
				xLang['LOGIN']					= 'Login';
				xLang['MARCADORES']				= 'Záložka';
				xLang['ANYADIR']				= 'Pridať;';
				xLang['ENLACE']					= 'Url adresa';
				xLang['TEXTO']					= 'Názov záložky';
				xLang['ELIMINAR']				= 'Vymazať;';
				xLang['MAPA']					= 'Mapa';
				xLang['MAXTIME']				= 'Maximálny čas';
				xLang['ARCHIVE']				= 'Archivovať';
				xLang['RESUMEN']				= 'Hlásenie';
				xLang['TROPAS']					= 'Vojsko';
				xLang['CHECKVERSION']			= 'Aktualizuj';
				xLang['ACTUALIZAR']				= 'Aktualizovať informácie o dedine';
				xLang['VENTAS']					= 'Uložiť ponuky';
				xLang['MAPSCAN']				= 'Skenovať mapu';
				xLang['BIGICONS']				= 'Ukáž rozširujúce ikony';
				xLang['NOTEBLOCK']				= 'Ukáz poznámkový blok';
				xLang['SAVE']					= 'Uložené';
				xLang['RPDEFACT']				= 'Prednastavená akcia zhromaždištia';
				xLang['ATTACKTYPE2']			= 'Podpora';
				xLang['ATTACKTYPE3']			= 'Normálny útok ';
				xLang['ATTACKTYPE4']			= 'Lúpež';
				xLang['NBSIZE']					= 'Veľkosť poznamkového bloku';
				xLang['NBSIZEAUTO']				= 'Automatická';
				xLang['NBSIZENORMAL']			= 'Normálna (malá)';
				xLang['NBSIZEBIG']				= 'veľká';
				xLang['NBHEIGHT']				= 'Výška poznamkového bloku';
				xLang['NBAUTOEXPANDHEIGHT']		= 'Automatické rozšírenie výšky';
				xLang['NBKEEPHEIGHT']			= 'Prednastavená výška';
				xLang['SHOWCENTERNUMBERS']		= 'Úkáž stredové čísla';
				xLang['NPCSAVETIME']			= 'Ušetrite:';
				xLang['SHOWCOLORRESLEVELS']		= 'Ukáž úroveň surovinových polí farebne';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Ukáž úroveň budov farebne';
				xLang['CNCOLORNEUTRAL']			= 'Farba, upgradu<br>(Prednastavené = Prázdne)';
				xLang['CNCOLORMAXLEVEL']		= 'Farba, maximálnej úrovne<br>(Prednastavené = Prázdne)';
				xLang['CNCOLORNOUPGRADE']		= 'Farba, nemožného upgradu<br>(Prednastavené = Prázdne)'; 
				xLang['CNCOLORNPCUPGRADE']		= 'Farba, upgradu cez NPC<br>(Prednastavené = Prázdne)';
				xLang['TOTALTROOPS']			= 'Všetky jednotky vycvičené v tejto dedine';
				xLang['SHOWBOOKMARKS']			= 'Ukáž záložky';
				xLang['RACECRTV2']				= 'Národy';
				xLang['SERVERVERSION2']			= "Travian v2.x server";
				xLang['SELECTALLTROOPS']		= "Vybrať všetky jednotky";
				xLang['PARTY']					= "Oslavy";
				xLang['CPPERDAY']				= "KB/denne";
				xLang['SLOT']					= "Slot";
				xLang['TOTAL']					= "Spolu";
				xLang['NOPALACERESIDENCE']		= "Žiadny palác alebo rezidencia nieje v dedine alebo centrum dediny nieje otvorené!";
				xLang['SELECTSCOUT']			= "Vyber počet špehov";				
				xLang['SELECTFAKE']				= "Vyber jednotky na fake";
				xLang['NOSCOUT2FAKE']			= "Je nemožné použiť špeha na fake!";
				xLang['NOTROOP2FAKE']			= "Nemáte jednotky na fake!"; 
				xLang['NOTROOP2SCOUT']			= "Nemáte jednotky na špehovanie !";
				xLang['NOTROOPS']				= "Žiadne jednotky v dedine !";
				xLang['ALL']					= "Všetko";
				xLang['NORACE']					= "Postav kasárne, aby si automaticky určil národ a /alebo otvor centrum dediny...";
				xLang['COLORHELPTEXT']			= "Môžeš vložiť farby :<br>- green alebo red alebo orange, atď. Farby zadávajte len v Anglištine.<br>- Napríklad HEX farba #004523.<br>- Nechajte prázdne ak chcete mať prednastavené farby";
				xLang['PLAYER']					= 'Hráč';
				xLang['COLORHELP']				= "Nápoveda pre farby";
				xLang['SHOWORIGREPORT']			= "Ukáž originálne správy";
				xLang['SHOWCELLTYPEINFO']		= "Ukaž typ bunky/oázy info<br>keď chodiš myšou po mape";
				xLang['WARSIM']					= "Link na bojový simulátor:<br>(ľavé menu)";
				xLang['WARSIMOPTION1']			= "Interný (poskytovaný hrou)";
				xLang['WARSIMOPTION2']			= "Externý (poskytnutý kirilloid.ru)";
				xLang['WSANALYSER']				= "Analyzátor";
				xLang['SHOWSTATLINKS']			= "Ukaž link na analyzátor ";
				xLang['NONEWVERSION']			= "Máte poslednú verziu";
				xLang['BETAVERSION']			= "Máte beta verziu";
				xLang['NEWVERSIONAV']			= "Je novšia verzia";
				xLang['UPDATESCRIPT']			= "Aktualizovať script teraz?";
				xLang['CHECKUPDATE']			= "Kontrolujem aktualizácie...";
				xLang['CROPFINDER']				= "Vyhľadávač obilia";
				xLang['AVPOPPERVIL']			= "Priemerná populácia na dedinu";
				xLang['AVPOPPERPLAYER']			= "Priemerná populácia na hráča";
				xLang['SHOWRESUPGRADETABLE']	= "Ukáž tabuľku pre upgrade surovinových poli";
				xLang['SHOWBUPGTABLE']			= "Ukáž tabuľku pre upgrade budov";
				xLang['CONSOLELOGLEVEL']		= "Úroveň konzoly. Len pre programátorov alebo na odstránenie chýb.<br>(Prednastavené = 1)";
				xLang['MARKETPRELOAD']			= "Počet kontrolovaných stránok na trhovovisku => Nákupných stránok<br>(Prednastavené = 1)";
				xLang['CAPITAL']				= 'Meno hlavnej dediny<br>Pozri profil pre zmenenie';
				xLang['CAPITALXY']				= 'Súradnice hlavnej dediny.<br>	Pozri svôj profil';
				xLang['MAX']					= 'Maximum';
				xLang['TOTALTROOPSTRAINING']	= 'Všetci vojaci vo výcviku';
				xLang['SHOWDISTTIMES']			= 'Ukáž zdialenosť a čas';
				xLang['TBSETUPLINK']			= 'Travian Beyond nastavenia';
				xLang['UPDATEALLVILLAGES']		= 'Updatuj všetký dediny. POUŽIVAJTE S MAXIMÁLNOU STAROSTLIVOSŤOU<br>LEBO TO MôžE VIESŤ K ZRUŠENIU ÚČTU !';
				xLang['SHOWMENUSECTION3']		= "Ukáž prídavné linky v ľavom menu<br>(Traviantoolbox, World Analyser, Travilog, Mapu, atď.)";
				xLang['LARGEMAP']				= 'Veľká mapa';
				xLang['SHOWTRAVMAPLINKS']		= 'Ukáž link na travmap.shishnet.org<br>(uživateľov a aliancie)';
				xLang['USETHEMPR']				= 'Použí ich (proporčne)';
				xLang['USETHEMEQ']				= 'Použí ich (rovným dielom)';
				xLang['TOWNHALL']				= 'Radnica';
				xLang['GAMESERVERTYPE']			= 'Server hry';
				xLang['MARKETOFFERS']			= 'Obchodné ponuky';
				xLang['ACCINFO']				= 'Informácie o účte';
				xLang['BOOKMARKOPTIONS']		= 'Záložky';//identical to xLang['MARCADORES'] => check if this can be
				xLang['NOTEBLOCKOPTIONS']		= 'Poznámkový blok';
				xLang['MENULEFT']				= 'Menu na ľavom boku';
				xLang['STATISTICS']				= 'Štatistika';
				xLang['RESOURCEFIELDS']			= 'Surovinové polia';
				xLang['VILLAGECENTER']			= 'Centrum dediny';
				xLang['MAPOPTIONS']				= 'Nastavenia mapy';
				xLang['COLOROPTIONS']			= 'Nastavenia farieb';
				xLang['DEBUGOPTIONS']			= 'Nastavenia v ladení';
				xLang['SHOWBIGICONMARKET']		= 'Trhovisko';
				xLang['SHOWBIGICONMILITARY']	= 'Vojsko<br>Zhromaždisko/Kasárne/Dielňa/Stájňa';
				xLang['SHOWBIGICONALLIANCE']	= 'Aliancia'; //identical to xLang['ALLIANCE'] => check if this can be removed
				xLang['SHOWBIGICONMILITARY2']	= "Radnica/Hrdinský dvor/Výzbroj/Kováč"; 
				xLang['HEROSMANSION']			= "Hrdinský dvor";
				xLang['BLACKSMITH']				= 'Kováč';
				xLang['ARMOURY']				= 'Zbrojnica';
				xLang['NOW']					= 'Teraz';
				xLang['CLOSE']					= 'Zavrieť';
				xLang['USE']					= 'Použiť';
				xLang['USETHEM1H']				= 'Použiť (1 h. produkcia)';
				xLang['OVERVIEW']				= 'Náhľad';
				xLang['FORUM']					= 'Forum';
				xLang['ATTACKS']				= 'Útok;';
				xLang['NEWS']					= 'Noviny';
				xLang['ADDCRTPAGE']				= 'Pridať túto stránku';
				xLang['SCRIPTPRESURL']			= 'TBeyond stránka';
				xLang['NOOFSCOUTS']				= 'Niesu špehovia<br>"Vyberte funkciu špeha';
				xLang['SPACER']					= 'Odeľovač';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'Ukáž informácie o vojakoch v bublinách';
				xLang['MESREPOPTIONS']			= 'Správy & Hlásenia';
				xLang['MESREPPRELOAD']			= 'Počet správ/hlásení stránka na preload<br>(Prednastavené = 1)';
				xLang['ATTABLES']				= 'Tabuľka jednotiek';//len pre plus => dorf3.php?s=6 link na dorf3.php stránku
				xLang['MTWASTED']				= 'Obchodníci ešte unesú';
				xLang['MTEXCEED']				= 'Presahuje o';
				xLang['MTCURRENT']				= 'Zaťaženie obchodníka';
				xLang['ALLIANCEFORUMLINK']		= 'Link na externé forum<br>(Nechaj prázdne pre interné forum)';
				xLang['LOCKBOOKMARKS']			= 'Zamkni záložku<br>(Skry vymaž, posuň hore/dole ikony)';
				xLang['MTCLEARALL']				= 'Vyčistiť všetko';
				xLang['UNLOCKBOOKMARKS']		= 'Odomkni záložky<br>(Ukáž vymaž, posuň hore/dole ikony)';
				xLang['CLICKSORT']				= 'Klikni roztiediť';
				xLang['MIN']					= 'Minimum';
				xLang['SAVEGLOBAL']				= 'Pre všetky dediny';
				xLang['VILLAGELIST']			= 'Zoznam dedin';
				xLang['SHOWINOUTICONS']			= "Ukáž 'dorf1.php' a 'dorf2.php' linky";
				xLang['UPDATEPOP']				= 'Updatuj populáciu';
				xLang['SHOWRPRINFOTOOLTIPS']	= 'Ukáž zdialenosť a čas od dediny v bublinách<br>(Zhromaždište & Hlásenia)';
				xLang['EDIT']					= 'Edituj';
				xLang['SHOWMESOPENLINKS']		= 'Ukáž link na otvorenie správy v pop-up';
				xLang['NPCOPTIONS']				= 'Nastavenia NPC asistenta';
				xLang['NPCASSISTANT']			= 'Ukáž kalkulačku/linky NPC asistenta';
				xLang['SHOWMAPTABLE']			= 'Ukáž tabuľku s hráčmy/dedinamy/okupovaými oázami';
				xLang['NEWVILLAGEAV']			= 'Dátum/čaš';
				xLang['TIMEUNTIL']				= 'Čas vyčkávania';
				xLang['SHOWREPDELTABLE']		= 'Ukáž "Vymazať všetký" tabuľky na stránke s hláseniami';
				xLang['SHOWIGMLINKFORME']		= 'Ukáž " v pošli správu" ikonu aj pre mňa';
				xLang['CENTERMAP']				= 'Vycentruj mapu na túto dedinu ';
				xLang['SHOWCENTERMAPICON']		= 'Ukáž ikonu" vycentruj mapu na dedinu ';
				xLang['INETGPOPTION']			= 'Internetové grafické balíky';
				xLang['ALLOWINETGP']			= 'Povoliť internetové graficke balíky';
				xLang['SENDTROOPS']				= 'Poslať jednotky';
				xLang['SHOWBRSTATDETAILS']		= 'Ukáž detaily v štatistikách hlásení';
				xLang['SHOWBIGICONMISC']		= "Palác/Rezidencia/Akadémia/Pokladnica";
				xLang['PALACE']					= "Palác";
				xLang['RESIDENCE']				= "Rezidencia";
				xLang['ACADEMY']				= "Akadémia";
				xLang['TREASURY']				= "Pokladnica";
				xLang['SHOWBBLINK']				= "Ukázať blikajúc budovy ktoré sa upgradujú?";
				break;
			case "tr":
				//Thank you greench ! Thanks, alinafiz for the correction !
				xLang['ALLIANCE']				= 'Birlik';
				xLang['SIM']					= 'Savaş Simülatörü';
				xLang['AREYOUSURE']				= 'Emin misiniz?';
				xLang['PROFIT']					= 'Kazanç';
				xLang['LOSS']					= 'Kayıp';
				xLang['EXTAVAILABLE']			= 'Geliştirilebilir';
				xLang['PLAYER']					= 'Oyuncu';
				xLang['VILLAGE']				= 'Köy';
				xLang['POPULATION']				= 'Nüfus';
				xLang['COORDS']					= 'Koordinatlar';
				xLang['MAPTABLEACTIONS']		= 'Eylemler';
				xLang['SAVED']					= 'Kaydedildi';
				xLang['YOUNEED']				= 'İhtiyacınız olan';
				xLang['TODAY']					= 'bugün';
				xLang['TOMORROW']				= 'yarın';
				xLang['PAS_MANYANA']			= 'ertesi gün';
				xLang['MARKET']					= 'Pazar yeri';
				xLang['BARRACKS']				= 'Kışla';
				xLang['RALLYPOINT']				= 'Askeri üs';
				xLang['STABLE']					= 'Ahır';
				xLang['WORKSHOP']				= 'Tamirhane';
				xLang['ENVIAR']					= 'Hammdde gönder';
				xLang['COMPRAR']				= 'Satın al';
				xLang['VENDER']					= 'Sat';
				xLang['SENDIGM']				= 'Genel mesaj gönder';
				xLang['LISTO']					= 'Mümkün';
				xLang['ON']						= ' ';
				xLang['A_LAS']					= ' ';
				xLang['EFICIENCIA']				= 'Verimlilik';
				xLang['NEVER']					= 'Hiç bir zaman';
				xLang['ALDEAS']					= 'Köy(ler)';
				xLang['TIEMPO']					= 'Süre';
				xLang['OFREZCO']				= 'Önerilen';
				xLang['BUSCO']					= 'İstenilen';
				xLang['TIPO']					= 'Oran';
				xLang['DISPONIBLE']				= 'Sadece olanaklı olanlar';
				xLang['CUALQUIERA']				= 'Hiçbiri';
				xLang['YES']					= 'Evet';
				xLang['NO']						= 'Hayır';
				xLang['LOGIN']					= 'Giriş';
				xLang['MARCADORES']				= 'Yerimleri';
				xLang['ANYADIR']				= 'Ekle';
				xLang['ENLACE']					= 'Yeni yerimi adresi';
				xLang['TEXTO']					= 'Yeni yerimi yazısı';
				xLang['ELIMINAR']				= 'Sil';
				xLang['MAPA']					= 'Harita';
				xLang['MAXTIME']				= 'En fazla süre';
				xLang['ARCHIVE']				= 'Arşiv';
				xLang['RESUMEN']				= 'Özet';
				xLang['TROPAS']					= 'Destekler';
				xLang['CHECKVERSION']			= 'TBeyond u güncelle';
				xLang['ACTUALIZAR']				= 'Köy bilgisini güncelle';
				xLang['VENTAS']					= 'Kayıtlı Teklifler';
				xLang['MAPSCAN']				= 'Haritayı Tara';
				xLang['BIGICONS']				= 'Ek simgeleri göster';
				xLang['NOTEBLOCK']				= 'Not defterini göster';
				xLang['SAVE']					= 'Kaydet';
				xLang['RPDEFACT']				= 'Askeri üs varsayılan eylemi';
				xLang['ATTACKTYPE2']			= 'Destek';
				xLang['ATTACKTYPE3']			= 'Saldırı: Normal';
				xLang['ATTACKTYPE4']			= 'Saldırı: Yağma';
				xLang['NBSIZE']					= 'Not defteri boyutu';
				xLang['NBSIZEAUTO']				= 'Oto';
				xLang['NBSIZENORMAL']			= 'Normal (küçük)';
				xLang['NBSIZEBIG']				= 'geniş ekran (büyük)';
				xLang['NBHEIGHT']				= 'Not defteri yüksekliği';
				xLang['NBAUTOEXPANDHEIGHT']		= 'Yüksekliği otomatik genişlet';
				xLang['NBKEEPHEIGHT']			= 'Varsayılan yükseklik';
				xLang['SHOWCENTERNUMBERS']		= 'Orta numaraları göster';
				xLang['NPCSAVETIME']			= 'Kazanılan zaman: ';
				xLang['SHOWCOLORRESLEVELS']		= 'Kaynak düzeyleri renklerini göster';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Bina düzeyleri renklerini göster';
				xLang['CNCOLORNEUTRAL']			= 'Geliştirme olanaklı rengi<br>(Varsayılan = Boş)';
				xLang['CNCOLORMAXLEVEL']		= 'En üst düzey rengi<br>(Varsayılan = Boş)';
				xLang['CNCOLORNOUPGRADE']		= 'Geliştirme olanaklı değil rengi<br>(Varsayılan = Boş)';
				xLang['CNCOLORNPCUPGRADE']		= 'NPC üzerinden geliştirme rengi<br>(Varsayılan = Boş)';
				xLang['TOTALTROOPS']			= 'Köydeki toplam asker';
				xLang['SHOWBOOKMARKS']			= 'Yerimlerini göster';
				xLang['RACECRTV2']				= 'Irk';
				xLang['SERVERVERSION2']			= "Travian v2.x sunucusu";
				xLang['SELECTALLTROOPS']		= "Tüm askerleri seç";
				xLang['PARTY']					= "Festivaller";
				xLang['CPPERDAY']				= "KP/gün";
				xLang['SLOT']					= "Boşluk";
				xLang['TOTAL']					= "Toplam";
				xLang['NOPALACERESIDENCE']		= "Bu köyde köşk ya da saray yok ya da köy merkezi henüz açılmadı !";
				xLang['SELECTSCOUT']			= "Casus seç";
				xLang['SELECTFAKE']				= "Sahte saldırı seç";
				xLang['NOSCOUT2FAKE']			= "Sahte saldırı için casusları kullanmak olanaklı değil !";
				xLang['NOTROOP2FAKE']			= "Sahte saldırı için asker yok!";
				xLang['NOTROOP2SCOUT']			= "Gözetlemek için asker yok !";
				xLang['NOTROOPS']				= "Köyde asker yok !";
				xLang['ALL']					= "Tümü";
				xLang['NORACE']					= "Irkı otomatik olarak belirlemek için kışla inşa et ve/veya şehir merkezini aç...";
				xLang['COLORHELPTEXT']			= "renk alanına şunları girebilirsiniz:<br>- green ya da red ya da orange, vb.<br>- HEX renk kodları, örneğin #004523<br>- varsayılan renkler için boş bırakın";
				xLang['COLORHELP']				= "Renk alanları için yardım";
				xLang['SHOWORIGREPORT']			= "Özgün raporu göster (foruma aktarmak için)";
				xLang['SHOWCELLTYPEINFO']		= "Haritada fare ile üzerine gelindiğinde<br>köy türünü göster/vadi bilgisini göster";
				xLang['WARSIM']					= "Savaş simülatörü kullanımı:<br>(sol menü)";
				xLang['WARSIMOPTION1']			= "Oyunun kendi hesaplayıcısı (oyun tarafından sağlanan)";
				xLang['WARSIMOPTION2']			= "Harici (kirilloid.ru tarafından sağlanan)";
				xLang['WSANALYSER']				= "İstatistik sitesi kullanımı";
				xLang['SHOWSTATLINKS']			= "Bağlantılarda istatistik bağlantısını göster";
				xLang['NONEWVERSION']			= "Son sürüme sahipsiniz";
				xLang['BETAVERSION']			= "Beta sürümüne sahip olabilirsiniz";
				xLang['NEWVERSIONAV']			= "Betiğin(script) yeni sürümü var";
				xLang['UPDATESCRIPT']			= "Betik şimdi güncellensin mi ?";
				xLang['CHECKUPDATE']			= "Betik güncellemesi denetleniyor.  Lütfen bekleyin...";
				xLang['CROPFINDER']				= "Tarla bulucu";
				xLang['AVPOPPERVIL']			= "Köy başına ortalama nüfus";
				xLang['AVPOPPERPLAYER']			= "Oyuncu başına ortalama  nüfus";
				xLang['SHOWRESUPGRADETABLE']	= "Kaynak alanlarını geliştirme tablosunu göster";
				xLang['SHOWBUPGTABLE']			= "Binaların geliştirme tablosunu göster";
				xLang['CONSOLELOGLEVEL']		= "Konsolun Kayıt Düzeyi<br>PROGRAMCILAR VE SORUN GİDERME İÇİN<br>(Varsayılan = 0 ya da Boş bırakın)";
				xLang['MARKETPRELOAD']			= "'Pazar Yeri=> Satın al' sayfasındayken<br>önyüklenen sayfa sayısı<br>(Varsayılan= 1 ya da Boş ; Maks = 5)";
				xLang['CAPITAL']				= 'Merkez Köyün Adı<br>Değiştirmeyin,onun yerine Profilinizi ziyaret edin';
				xLang['CAPITALXY']				= 'Merkez Köyün koordinatları<br>Değiştirmeyin,onun yerine Profilinizi ziyaret edin';
				xLang['MAX']					= 'En fazla';
				xLang['TOTALTROOPSTRAINING']	= 'Eğitimdeki asker sayısı';
				xLang['SHOWDISTTIMES']			= 'Mesafe ve süreyi göster';
				xLang['TBSETUPLINK']			= 'Travian Beyond Ayarları';
				xLang['UPDATEALLVILLAGES']		= 'Tüm köyleri güncelle. DİKKATLİ KULLANIN, HESABINIZ CEZA ALABİLİR!';
				xLang['SHOWMENUSECTION3']		= "Sol menüde ek bağlantılar göster<br>(Traviantoolbox, World Analyser, Travilog, Map, benzeri.)";
				xLang['LARGEMAP']				= 'Büyük harita';
				xLang['SHOWTRAVMAPLINKS']		= 'travmap.shishnet.org bağlantısını göster<br>(oyuncular ve birlikler)';
				xLang['USETHEMPR']				= 'Bunları kullan (oransal)';
				xLang['USETHEMEQ']				= 'Bunları kullan (eş miktarda)';
				xLang['TOWNHALL']				= 'Belediye';
				xLang['GAMESERVERTYPE']			= 'Oyun sunucusu';
				xLang['MARKETOFFERS']			= 'Pazar yeri teklifleri';
				xLang['ACCINFO']				= 'Hesap Bilgisi';
				xLang['BOOKMARKOPTIONS']		= 'Yerimleri';
				xLang['NOTEBLOCKOPTIONS']		= 'Not defteri';
				xLang['MENULEFT']				= 'Soldaki menü';
				xLang['STATISTICS']				= 'İstatistikler';
				xLang['RESOURCEFIELDS']			= 'Hammadde alanları';
				xLang['VILLAGECENTER']			= 'Köy merkezi';
				xLang['MAPOPTIONS']				= 'Harita ayarları';
				xLang['COLOROPTIONS']			= 'Renk seçenekleri';
				xLang['DEBUGOPTIONS']			= 'Sorun giderme seçenekleri';
				xLang['SHOWBIGICONMARKET']		= 'Pazar yeri';
				xLang['SHOWBIGICONMILITARY']	= 'Askeri<br>Askeri Üs/Kışla/Tamirhane/Ahır';
				xLang['SHOWBIGICONMILITARY2']	= "Belediye/Kahraman Kışlası/Silah Dökümhanesi/Zırh Dökümhanesi";
				xLang['SHOWBIGICONALLIANCE']	= xLang['ALLIANCE'];
				xLang['HEROSMANSION']			= "Kahraman kışlası";
				xLang['BLACKSMITH']				= 'Silah dökümhanesi';
				xLang['ARMOURY']				= 'Zırh dökümhanesi';
				xLang['NOW']					= 'Şimdi';
				xLang['CLOSE']					= 'Kapat';
				xLang['USE']					= 'Kullan';
				xLang['USETHEM1H']				= 'Bunları Kullan (1 saatlik üretim)';
				xLang['OVERVIEW']				= 'Genel bakış';
				xLang['FORUM']					= 'Forum';
				xLang['ATTACKS']				= 'Saldırılar';
				xLang['NEWS']					= 'Haberler';
				xLang['ADDCRTPAGE']				= 'Bu sayfayı yerimine ekle'; 
				xLang['SCRIPTPRESURL']			= 'TBeyond sayfası';
				xLang['NOOFSCOUTS']				= '"Casus seç" işlevi için<br> casus sayısı';
				xLang['SPACER']					= 'Ayırıcı';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'Araç ipuçları bölümünde asker bilgisini göster';
				xLang['MESREPOPTIONS']			= 'Mesajlar & Raporlar';
				xLang['MESREPPRELOAD']			= 'Önyüklenen Mesaj/Rapor sayfası sayısı<br>(Default = 1)';
				xLang['ATTABLES']				= 'Asker tablosu';
				xLang['MTWASTED']				= 'Artan';
				xLang['MTEXCEED']				= 'Aşan';
				xLang['MTCURRENT']				= 'Güncel yük';
				xLang['ALLIANCEFORUMLINK']		= 'Harici forumun adresi<br>(Dahili forum için boş bırakın)';
				xLang['LOCKBOOKMARKS']			= 'Yerimlerini kitle<br>(Sil, yukarı taşı, aşağı taşı simgelerini gizler)';
				xLang['MTCLEARALL']				= 'Tümünü temizle';
				xLang['UNLOCKBOOKMARKS']		= 'Yerimleri kilidini aç<br>(Sil, yukarı taşı, aşağı taşı simgelerini gösterir)';
				xLang['CLICKSORT']				= 'Sıralamak için tıklayın';
				xLang['MIN']					= 'En az';
				xLang['SAVEGLOBAL']				= 'Köyler arasında paylaştır';
				xLang['VILLAGELIST']			= 'Köy Listesi';
				xLang['SHOWINOUTICONS']			= "'dorf1.php' ve 'dorf2.php' bağlantılarını göster";
				xLang['UPDATEPOP']				= 'Nüfusu güncelle';
				xLang['SHOWRPRINFOTOOLTIPS']	= 'Araç ipuçlarında köye ulaşım süresini ve uzaklığı göster<br>(Askeri üs & Raporlar)';
				xLang['EDIT']					= 'Düzenle';
				xLang['SHOWMESOPENLINKS']		= 'Mesajları açılır pencerede açma bağlantısını göster';
				xLang['NPCOPTIONS']				= 'NPC Asistanı ayarları';
				xLang['NPCASSISTANT']			= 'NPC Asistanı hesaplayıcısını/bağlantılarını göster';
				xLang['SHOWMAPTABLE']			= 'Haritada oyuncu/köy/fethedilmiş vahalar tablosunu göster';
				xLang['NEWVILLAGEAV']			= 'Tarih/Zaman';
				xLang['TIMEUNTIL']				= 'Bekleme süresi';
				xLang['SHOWREPDELTABLE']		= 'Raporlar sayfasına "Tümünü sil" tablosu ekle';
				xLang['SHOWIGMLINKFORME']		= '"IGM Gönder" simgesini benim için de göster';
				xLang['CENTERMAP']				= 'Bu köyü haritada ortala';
				xLang['SHOWCENTERMAPICON']		= '"Bu köyü haritada ortala" simgesini göster';
				xLang['INETGPOPTION']			= 'İnternet Grafik Paketleri';
				xLang['ALLOWINETGP']			= 'İnternet Grafik Paketlerine izin ver';
				xLang['SENDTROOPS']				= 'Asker gönder';
				xLang['SHOWBRSTATDETAILS']		= 'Rapor İstatistiklerinde detayları göster';
				xLang['SHOWBIGICONMISC']		= "Saray/Köşk/Akademi/Hazine Binası";
				xLang['PALACE']					= "Saray";
				xLang['RESIDENCE']				= "Köşk";
				xLang['ACADEMY']				= "Akademi";
				xLang['TREASURY']				= "Hazine Binası";
				xLang['SHOWBBLINK']				= "Binalar için yükseltilen seviyeyi parlat";
				xLang['SHOWSENDTROOPSRESOURCES']= "Köy listesinde 'Destek gönder/Hammadde gönder' simgelerini göster"
				break;
			case "id":
				//provided by CuPliz13.  Thank you !
				xLang['ALLIANCE']				= 'Aliansi';
				xLang['SIM']					= 'Simulator Perang';
				xLang['AREYOUSURE']				= 'Apakah Anda yakin?';
				xLang['LOSS']					= 'Kerugian';
				xLang['PROFIT']					= 'Laba';
				xLang['EXTAVAILABLE']			= 'Naikkan tingkat';
				xLang['PLAYER']					= 'Pemain';
				xLang['VILLAGE']				= 'Desa';
				xLang['POPULATION']				= 'Populasi';
				xLang['COORDS']					= 'Koordinat';
				xLang['MAPTABLEACTIONS']		= 'Aksi';
				xLang['SAVED']					= 'Disimpan';
				xLang['YOUNEED']				= 'Anda butuh';
				xLang['TODAY']					= 'hari ini';
				xLang['TOMORROW']				= 'besok';
				xLang['PAS_MANYANA']			= 'lusa';
				xLang['MARKET']					= 'Pasar';
				xLang['BARRACKS']				= 'Barak';
				xLang['RALLYPOINT']				= 'Titik Temu';
				xLang['STABLE']					= 'Istal';
				xLang['WORKSHOP']				= 'Bengkel';
				xLang['ENVIAR']					= 'Kirim sumberdaya';
				xLang['COMPRAR']				= 'Beli';
				xLang['VENDER']					= 'Jual';
				xLang['SENDIGM']				= 'Kirim Pesan';
				xLang['LISTO']					= 'Tersedia';
				xLang['ON']						= 'pada';
				xLang['A_LAS']					= 'pukul';
				xLang['EFICIENCIA']				= 'Efisiensi';
				xLang['NEVER']					= 'jika gudang ditingkatkan';
				xLang['ALDEAS']					= 'Desa';
				xLang['TIEMPO']					= 'Waktu';
				xLang['OFREZCO']				= 'Penawaran';
				xLang['BUSCO']					= 'Cari';
				xLang['TIPO']					= 'Tipe';
				xLang['DISPONIBLE']				= 'Hanya tersedia';
				xLang['CUALQUIERA']				= 'Apapun';//'Beberapa';
				xLang['YES']					= 'Ya';
				xLang['NO']						= 'Tidak';
				xLang['LOGIN']					= 'Login';
				xLang['MARCADORES']				= 'Bookmark';
				xLang['ANYADIR']				= 'Tambah';
				xLang['ENLACE']					= 'URL Bookmark';
				xLang['TEXTO']					= 'Nama Bookmark';
				xLang['ELIMINAR']				= 'Hapus';
				xLang['MAPA']					= 'Peta';
				xLang['MAXTIME']				= 'Waktu maks';
				xLang['ARCHIVE']				= 'Arsip';
				xLang['RESUMEN']				= 'Laporan';
				xLang['TROPAS']					= 'Pasukan';
				xLang['ACTUALIZAR']				= 'Informasi Desa diubah';
				xLang['VENTAS']					= 'Simpan penawaran';
				xLang['MAPSCAN']				= 'Pindai peta';
				xLang['BIGICONS']				= 'Tampilkan ikon tambahan';
				xLang['NOTEBLOCK']				= 'Tampilkan blok catatan';
				xLang['SAVE']					= 'Simpan';
				xLang['RPDEFACT']				= 'Aksi default dari titik temu';
				xLang['ATTACKTYPE2']			= 'Bantuan';
				xLang['ATTACKTYPE3']			= 'Serangan: Normal';
				xLang['ATTACKTYPE4']			= 'Serangan: Raid';
				xLang['NBSIZE']					= 'Ukuran blok catatan';
				xLang['NBSIZEAUTO']				= 'Otomatis';
				xLang['NBSIZENORMAL']			= 'Normal (kecil)';
				xLang['NBSIZEBIG']				= 'Layar lebar (besar)';
				xLang['NBHEIGHT']				= 'Lebar blok catatan';
				xLang['NBAUTOEXPANDHEIGHT']		= 'Lebar menyesuaikan otomatis';
				xLang['NBKEEPHEIGHT']			= 'Lebar asal';
				xLang['SHOWCENTERNUMBERS']		= 'Tampilkan angka pusat';
				xLang['NPCSAVETIME']			= 'Simpan: ';
				xLang['SHOWCOLORRESLEVELS']		= 'Tampilkan warna tingkatan sumberdaya';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Tampilkan warna tingkatan bangunan';
				xLang['CNCOLORNEUTRAL']			= 'Upgrade tersedia<br>(Default = Kosong)';
				xLang['CNCOLORMAXLEVEL']		= 'Warna level maks<br>(Default = Kosong)';
				xLang['CNCOLORNOUPGRADE']		= 'Upgrade tidak tersedia<br>(Default = Kosong)';
				xLang['CNCOLORNPCUPGRADE']		= 'Upgrade lewat NPC<br>(Default = Kosong)';
				xLang['TOTALTROOPS']			= 'Jumlah pasukan';
				xLang['SHOWBOOKMARKS']			= 'Tampilkan bookmark';
				xLang['RACECRTV2']				= 'Lomba';
				xLang['SERVERVERSION2']			= "Server Travian v2.x";
				xLang['SELECTALLTROOPS']		= "Pilih semua pasukan";
				xLang['PARTY']					= "Festivalitas";
				xLang['CPPERDAY']				= "NB/hari";
				xLang['SLOT']					= "Slot";
				xLang['TOTAL']					= "Total";
				xLang['NOPALACERESIDENCE']		= "Tidak ada istana atau kastil di desa ini atau pusat desa belum ditetapkan sebelumnya!";
				xLang['SELECTSCOUT']			= "Pilih pengintai";
				xLang['SELECTFAKE']				= "Pilih penipu";
				xLang['NOSCOUT2FAKE']			= "Tidak dimungkinkan untuk memakai pengintai untuk serangan tipuan!";
				xLang['NOTROOP2FAKE']			= "Tidak ada pasukan untuk serangan tipuan!";
				xLang['NOTROOP2SCOUT']			= "Tidak ada pasukan untuk mengintai!";
				xLang['NOTROOPS']				= "Tidak ada pasukan di desa!";
				xLang['ALL']					= "Seluruh";
				xLang['NORACE']					= "Bangun barak untuk secara otomatis menetapkan lomba dan/atau membuka pusat desa...";
				xLang['COLORHELPTEXT']			= "Di kolom warna Anda bisa mengisi:<br>- <b>green</b> atau <b>red</b> atau <b>orange</b>, dll.<br>- warna menggunakan kode heksadesilmal (HEX), seperti <b>#004523</b><br>- kosongkan untuk warna default";
				xLang['COLORHELP']				= "Bantuan untuk kolom warna";
				xLang['SHOWORIGREPORT']			= "Tampilkan laporan asli (untuk posting dalam forum)";
				xLang['SHOWCELLTYPEINFO']		= "Tampilkan tipe info bidang/oasis<br>saat kursor mouse berada di atas peta";
				xLang['WARSIM']					= "Link simulator perang untuk dipakai:<br>(menu kiri)";
				xLang['WARSIMOPTION1']			= "Internal (dari permainan)";
				xLang['WARSIMOPTION2']			= "Eksternal (dari kirilloid.ru)";
				xLang['WSANALYSER']				= "World Analyser untuk dipakai";
				xLang['SHOWSTATLINKS']			= "Tampilkan link Analyser Statistic";
				xLang['NONEWVERSION']			= "Anda memiliki versi terakhir yang tersedia";
				xLang['BETAVERSION']			= "Anda memiliki versi beta";
				xLang['NEWVERSIONAV']			= "Versi script terbaru telah tersedia";
				xLang['UPDATESCRIPT']			= "Update script sekarang?";
				xLang['CHECKUPDATE']			= "Mengecek update script. Harap tunggu...";
				xLang['CROPFINDER']				= "Crop Finder";
				xLang['AVPOPPERVIL']			= "Populasi rata-rata per desa";
				xLang['AVPOPPERPLAYER']			= "Populasi rata-rata per pemain";
				xLang['SHOWRESUPGRADETABLE']	= "Tampilkan tabel tingkatan lahan sumberdaya";
				xLang['SHOWBUPGTABLE']			= "Tampilkan tabel tingkatan bangunan";
				xLang['CONSOLELOGLEVEL']		= "Console Log Level<br>HANYA UNTUK PROGRAMMERS SAAT DEBUGGING<br>(Default = 1)";
				xLang['MARKETPRELOAD']			= "Jumlah halaman penawaran untuk ditampilkan<br>saat ada di halaman 'Pasar => Beli'<br>(Default = 1)";
				xLang['CAPITAL']				= 'Nama Ibukota<br><b>Kunjungi profil Anda untuk perubahan</b>';
				xLang['CAPITALXY']				= 'Koordinat Ibukota Anda<br><b>Kunjungi profil Anda untuk perubahan</b>';
				xLang['MAX']					= 'Maks';
				xLang['TOTALTROOPSTRAINING']	= 'Total pelatihan pasukan';
				xLang['SHOWDISTTIMES']			= 'Tampilkan jarak & waktu';
				xLang['TBSETUPLINK']			= 'Travian Beyond Setup';
				xLang['UPDATEALLVILLAGES']		= 'Update semua desa. PEMAKAIAN MAKSIMUM BISA MENYEBABKAN AKUN ANDA DIHAPUS!';
				xLang['SHOWMENUSECTION3']		= "Tampilkan link tambahan di menu kiri<br>(Travian Toolbox, World Analyser, Travilog, Map, dll.)";
				xLang['LARGEMAP']				= 'Peta lebar';
				xLang['SHOWTRAVMAPLINKS']		= 'Tampilkan link ke travmap.shishnet.org<br>(infopemain dan aliansi)';
				xLang['USETHEMPR']				= 'Pakai (proporsional)';
				xLang['USETHEMEQ']				= 'Pakai (sama)';
				xLang['TOWNHALL']				= 'Balai Desa';
				xLang['GAMESERVERTYPE']			= 'Server permainan';
				xLang['MARKETOFFERS']			= 'Penawaran pasar';
				xLang['ACCINFO']				= 'Informasi Akun';
				xLang['BOOKMARKOPTIONS']		= 'Bookmark';//identical to xLang['MARCADORES'] => check if this can be removed
				xLang['NOTEBLOCKOPTIONS']		= 'Catatan';
				xLang['MENULEFT']				= 'Menu di sebelah kanan';
				xLang['STATISTICS']				= 'Statistik';
				xLang['RESOURCEFIELDS']			= 'Lahan Sumberdaya';
				xLang['VILLAGECENTER']			= 'Pusat desa';
				xLang['MAPOPTIONS']				= 'Opsi peta';
				xLang['COLOROPTIONS']			= 'Opsi warna';
				xLang['DEBUGOPTIONS']			= 'Opsi debug';
				xLang['SHOWBIGICONMARKET']		= 'Pasar';
				xLang['SHOWBIGICONMILITARY']	= 'Militer<br>Titik temu|Barak|Bengkel|Istal';
				xLang['SHOWBIGICONALLIANCE']	= 'Aliansi'; //identical to xLang['ALLIANCE'] => check if this can be removed
				xLang['SHOWBIGICONMILITARY2']	= "Balai desa|Padepokan|Pabrik perisai|Pandai besi";
				xLang['HEROSMANSION']			= "Padepokan";
				xLang['BLACKSMITH']				= 'Pandai besi';
				xLang['ARMOURY']				= 'Pabrik perisai';
				xLang['NOW']					= 'Sekarang';
				xLang['CLOSE']					= 'Tutup';
				xLang['USE']					= 'Pakai';
				xLang['USETHEM1H']				= 'Pakai (1 jam produksi)';
				xLang['OVERVIEW']				= 'Peninjauan';
				xLang['FORUM']					= 'Forum';
				xLang['ATTACKS']				= 'Serangan';
				xLang['NEWS']					= 'Berita';
				xLang['ADDCRTPAGE']				= 'Tambahkan halaman ini'; //additional Add link for Bookmarks meaning 'add current page as a bookmark'
				xLang['SCRIPTPRESURL']			= 'TBeyond Home';
				xLang['NOOFSCOUTS']				= 'Jumlah pengintai untuk<br>fungsi "Pilih pengintai"';
				xLang['SPACER']					= 'Penjeda';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'Tampilkan info pasukan di tooltip';
				xLang['MESREPOPTIONS']			= 'Pesan & Laporan';
				xLang['MESREPPRELOAD']			= 'Jumlah halaman pesan/laporan untuk ditampilkan<br>(Default = 1)';
				xLang['ATTABLES']				= 'Tabel pasukan';//only for users with PLUS => dorf3.php?s=6 link on dorf3.php pages
				xLang['MTWASTED']				= 'Sisa muatan';
				xLang['MTEXCEED']				= 'Melampaui';
				xLang['MTCURRENT']				= 'Muatan saat ini';
				xLang['ALLIANCEFORUMLINK']		= 'Link ke forum luar<br>(kosongkan untuk memakai forum internal)';
				xLang['LOCKBOOKMARKS']			= 'Kunci bookmark<br>(sembunyikan ikon hapus, naikkan, turunkan)';
				xLang['MTCLEARALL']				= 'Kosongkan Semua';
				xLang['UNLOCKBOOKMARKS']		= 'Buka bookmark<br>(tampilkan ikon hapus, naikkan, turunkan)';
				xLang['CLICKSORT']				= 'Klik untuk mengurutkan';
				xLang['MIN']					= 'Min';
				xLang['SAVEGLOBAL']				= 'Pembagian diantara desa-desa';
				xLang['VILLAGELIST']			= 'Daftar Desa';
				xLang['SHOWINOUTICONS']			= "tampilkan link 'Peninjauan Desa' dan 'Pusat Desa'";
				xLang['UPDATEPOP']				= 'Update populasi';
				xLang['SHOWRPRINFOTOOLTIPS']	= 'Tampilkan jarak dan waktu ke desa-desa di tooltip<br>(Titik Temu & Laporan)';
				xLang['EDIT']					= 'Ubah';
				xLang['SHOWMESOPENLINKS']		= 'Tampilkan link untuk membuka pesan dalam popup';
				xLang['NPCOPTIONS']				= 'Opsi NPC Assistant';
				xLang['NPCASSISTANT']			= 'Tampilkan link kalkulasi dari NPC Assistant';
				xLang['SHOWMAPTABLE']			= 'Tampilkan tabel pemain, desa dan oasis yang dikuasai';
				xLang['NEWVILLAGEAV']			= 'Tanggal/Waktu';
				xLang['TIMEUNTIL']				= 'Waktu untuk menunggu';
				xLang['SHOWREPDELTABLE']		= 'Tampilkan tabel "Hapus semua" di halaman Laporan';
				xLang['SHOWIGMLINKFORME']		= 'Tampilkan ikon "Kirim Pesan"';
				xLang['CENTERMAP']				= 'Desa ini sebagai tengah-tengah peta';
				xLang['SHOWCENTERMAPICON']		= 'Tampilkan ikon "Desa ini sebagai tengah-tengah peta"';
				xLang['INETGPOPTION']			= 'Graphic Pack Online';
				xLang['ALLOWINETGP']			= 'Izinkan Graphic Pack Online';
				xLang['SENDTROOPS']				= 'Kirim Pasukan';
				xLang['SHOWBRSTATDETAILS']		= 'Tampilkan detail pada Laporan Statistik';
				xLang['SHOWBIGICONMISC']		= "Istana|Kastil|Akademi|Gudang Ilmu";
				xLang['PALACE']					= "Istana";
				xLang['RESIDENCE']				= "Kastil";
				xLang['ACADEMY']				= "Akademi";
				xLang['TREASURY']				= "Gudang Ilmu";
				xLang['SHOWBBLINK']				= "Tampilkan kedipan untuk bangunan yang sedang ditingkatkan";
				break;
			case "pl":
				// Tłumaczenie Dzikuska - PAv s1.pl & Signum
				xLang['ALLIANCE']				= 'Sojusz';
				xLang['SIM']					= 'Symulator Walki';
				xLang['AREYOUSURE']				= 'Jesteś pewien?';
				xLang['LOSS']					= 'Strata';
				xLang['PROFIT']					= 'Zysk';
				xLang['EXTAVAILABLE']			= 'Rozbudowa możliwa';
				xLang['PLAYER']					= 'Gracz';
				xLang['VILLAGE']				= 'Osada';
				xLang['POPULATION']				= 'Populacja';
				xLang['COORDS']					= 'Koordynaty';
				xLang['MAPTABLEACTIONS']		= 'Akcje';
				xLang['SAVED']					= 'Zapisane';
				xLang['YOUNEED']				= 'Potrzebujesz';
				xLang['TODAY']					= 'Dzisiaj';
				xLang['TOMORROW']				= 'Jutro';
				xLang['PAS_MANYANA']			= 'Pojutrze';
				xLang['MARKET']					= 'Rynek';
				xLang['BARRACKS']				= 'Koszary';
				xLang['RALLYPOINT']				= 'Miejsce Zbiórki';
				xLang['STABLE']					= 'Stajnia';
				xLang['WORKSHOP']				= 'Warsztat';
				xLang['ENVIAR']					= 'Wyślij surowce';
				xLang['COMPRAR']				= 'Kup';
				xLang['VENDER']					= 'Sprzedaj';
				xLang['SENDIGM']				= 'Wyślij PW';
				xLang['LISTO']					= 'Możliwe';
				xLang['ON']						= 'na';
				xLang['A_LAS']					= 'o';
				xLang['EFICIENCIA']				= 'Efektywność';
				xLang['NEVER']					= 'Nigdy';
				xLang['ALDEAS']					= 'Osada(y)';
				xLang['TIEMPO']					= 'Czas';
				xLang['OFREZCO']				= 'Oferuję';
				xLang['BUSCO']					= 'Szukam';
				xLang['TIPO']					= 'Rodzaj';
				xLang['DISPONIBLE']				= 'Tylko możliwe';
				xLang['CUALQUIERA']				= 'Jakikolwiek';
				xLang['YES']					= 'Tak';
				xLang['NO']						= 'Nie';
				xLang['LOGIN']					= 'Login';
				xLang['MARCADORES']				= 'Zakładki';
				xLang['ANYADIR']				= 'Dodaj';
				xLang['ENLACE']					= 'Nowa zakładka URL';
				xLang['TEXTO']					= 'Nowa zakładka Text';
				xLang['ELIMINAR']				= 'Usuń';
				xLang['MAPA']					= 'Mapa';
				xLang['MAXTIME']				= 'Maksimum czasu';
				xLang['ARCHIVE']				= 'Archiwum';
				xLang['RESUMEN']				= 'Razem';
				xLang['TROPAS']					= 'Jednostki';
				xLang['CHECKVERSION']			= 'Uaktualnij TBeyond';
				xLang['ACTUALIZAR']				= 'Aktualizuj informacje o osadzie';
				xLang['VENTAS']					= 'Zapisz ofertę';
				xLang['MAPSCAN']				= 'Skanuj mapę';
				xLang['BIGICONS']				= 'Pokaż rozszerzone ikony';
				xLang['NOTEBLOCK']				= 'Pokaż notatnik';
				xLang['SAVE']					= 'Zapisz';
				xLang['RPDEFACT']				= 'Miejsce zbiórki, domyślna akcja';
				xLang['ATTACKTYPE2']			= 'Posiłki';
				xLang['ATTACKTYPE3']			= 'Atak: Normalny';
				xLang['ATTACKTYPE4']			= 'Atak: Grabież';
				xLang['NBSIZE']					= 'Notatnik - Rozmiar';
				xLang['NBSIZEAUTO']				= 'Auto';
				xLang['NBSIZENORMAL']			= 'Normalny (mały)';
				xLang['NBSIZEBIG']				= 'Duży obraz (duży)';
				xLang['NBHEIGHT']				= 'Notatnik - wysokość';
				xLang['NBAUTOEXPANDHEIGHT']		= 'Automatycznie ustaw wysokość';
				xLang['NBKEEPHEIGHT']			= 'Domyślna wysokość';
				xLang['SHOWCENTERNUMBERS']		= 'Pokaż centrum osady';
				xLang['NPCSAVETIME']			= 'Zapisz: ';
				xLang['SHOWCOLORRESLEVELS']		= 'Pokaż kolory poziomu surowców';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Pokaż kolory poziomu budynków';
				xLang['CNCOLORNEUTRAL']			= 'Kolor: rozbudowa możliwa<br>(Domyślnie  = Brak)';
				xLang['CNCOLORMAXLEVEL']		= 'Kolor: poziomu maksymalnego<br>(Domyślnie  = Brak)';
				xLang['CNCOLORNOUPGRADE']		= 'Kolor: rozbudowa niemożliwa<br>(Domyślnie  = Brak)';
				xLang['CNCOLORNPCUPGRADE']		= 'Kolor: rozbudowa przy pomocy NPC<br>(Domyślnie  = Brak)';
				xLang['TOTALTROOPS']			= 'Wszystkie jednostki';
				xLang['SHOWBOOKMARKS']			= 'Pokaż zakładki';
				xLang['RACECRTV2']				= 'Rasa';
				xLang['SERVERVERSION2']			= "Travian v2.x server";
				xLang['SELECTALLTROOPS']		= "Wybierz wszystkie jednostki";
				xLang['PARTY']					= "Święto";
				xLang['CPPERDAY']				= "PK/dzień";
				xLang['SLOT']					= "Miejsce";
				xLang['TOTAL']					= "Razem";
				xLang['NOPALACERESIDENCE']		= "Brak rezydencji lub pałacu w tej wiosce lub jeszcze nie otwarte centrum wioski !";
				xLang['SELECTSCOUT']			= "Wybierz zwiadowców";
				xLang['SELECTFAKE']				= "Wybierz fejka";
				xLang['NOSCOUT2FAKE']			= "Nie można użyć zwiadowcy do wysłania fejka !";
				xLang['NOTROOP2FAKE']			= "Brak jednostek aby wysłać fejka!";
				xLang['NOTROOP2SCOUT']			= "Brak jednostek aby wysłać zwiadowcę !";
				xLang['NOTROOPS']				= "Brak jednostek w osadzie !";
				xLang['ALL']					= "Wszystko";
				xLang['NORACE']					= "Zbuduj koszary żeby automatycznie wysłać jednostki i/lub otworzyć centrum osady...";
				xLang['COLORHELPTEXT']			= "Jako kolor pól możesz wpisać:<br>- <b>green</b> or <b>red</b> or  <b>orange</b>, etc.<br>- lub kod koloru w HEX np. <b>#004523</b><br>- zostaw puste dla domyślnych kolorów";
				xLang['COLORHELP']				= "Pomoc dla kolorów pól";
				xLang['SHOWORIGREPORT']			= "Pokaż oryginalny raport (do publikacji)";
				xLang['SHOWCELLTYPEINFO']		= "Pokaż zawartość i typ doliny<br>kiedy wskażesz myszką";
				xLang['WARSIM']					= "Symulator walki link do:<br>(menu z lewej strony)";
				xLang['WARSIMOPTION1']			= "Wewnętrzny (wbudowany w grę)";
				xLang['WARSIMOPTION2']			= "Zewnętrzny (zrobiony przez kirilloid.ru)";
				xLang['WSANALYSER']				= "Używany World Analyser ";
				xLang['SHOWSTATLINKS']			= "Pokaż linki statystyki analysera";
				xLang['NONEWVERSION']			= "Masz najnowszą wersję";
				xLang['BETAVERSION']			= "Masz wersję beta";
				xLang['NEWVERSIONAV']			= "Nowa wersja skryptu jest możliwa do pobrania";
				xLang['UPDATESCRIPT']			= "Uaktualnić skrypt teraz? ?";
				xLang['CHECKUPDATE']			= "Sprawdzam aktualizację skryptu. Proszę czekać...";
				xLang['CROPFINDER']				= "Crop finder";
				xLang['AVPOPPERVIL']			= "Średnia populacja wg osady";
				xLang['AVPOPPERPLAYER']			= "Średnia populacja wg gracza";
				xLang['SHOWRESUPGRADETABLE']	= "Pokaż tabelkę rozbudowy surowców";
				xLang['SHOWBUPGTABLE']			= "Pokaż tabelkę rozbudowy budynków";
				xLang['CONSOLELOGLEVEL']		= "Console Log Level<br>ONLY FOR PROGRAMMERS OR DEBUGGING<br>(Default = 1)";
				xLang['MARKETPRELOAD']			= "Liczba stron ofert na rynku <br>w zakładce 'Rynek => Kupowanie' Stron<br>(Domyślnie = 1)";
				xLang['CAPITAL']				= 'Nazwa Twojej stolicy<br><b>Wejdź do swojego profilu w ustawieniach aby zaktualizować</b>';
				xLang['CAPITALXY']				= 'Współrzędne Twojej stolicy<br><b>Wejdź do swojego profilu w ustawieniach aby zaktualizować</b>';
				xLang['MAX']					= 'Maks.';
				xLang['TOTALTROOPSTRAINING']	= 'Suma szkolonych jednostek';
				xLang['SHOWDISTTIMES']			= 'Pokaż dystans i czas';
				xLang['TBSETUPLINK']			= 'Travian Beyond Setup';
				xLang['UPDATEALLVILLAGES']		= 'Uaktualnij wszystkie osady. UŻYWAJ TEGO Z MAKSYMALNĄ ROZWAGĄ. MOŻE DOPROWADZIĆ DO ZABLOKOWANIA KONTA !';
				xLang['SHOWMENUSECTION3']		= "Pokaż dodatkowe linki w menu po lewej stronie<br>(Traviantoolbox, World Analyser, Travilog, Map, itp.)";
				xLang['LARGEMAP']				= 'Duża mapa';
				xLang['SHOWTRAVMAPLINKS']		= 'Pokaż  link do travmap.shishnet.org<br>(użytkownicy i sojusze)';
				xLang['USETHEMPR']				= 'Użyj je  (proporcjonalnie)';
				xLang['USETHEMEQ']				= 'Użyj je (równe)';
				xLang['TOWNHALL']				= 'Ratusz';
				xLang['GAMESERVERTYPE']			= 'Serwer gry';
				xLang['MARKETOFFERS']			= 'Oferty na rynku';
				xLang['ACCINFO']				= 'Informacje o koncie';
				xLang['BOOKMARKOPTIONS']		= 'Zakładki';
				xLang['NOTEBLOCKOPTIONS']		= 'Notatnik';
				xLang['MENULEFT']				= 'Menu po lewej stronie';
				xLang['STATISTICS']				= 'Statystyki';
				xLang['RESOURCEFIELDS']			= 'Pola surowców';
				xLang['VILLAGECENTER']			= 'Centrum osady';
				xLang['MAPOPTIONS']				= 'Opcje mapy';
				xLang['COLOROPTIONS']			= 'Opcje kolorów';
				xLang['DEBUGOPTIONS']			= 'Debug options';
				xLang['SHOWBIGICONMARKET']		= 'Rynek';
				xLang['SHOWBIGICONMILITARY']	= 'Wojskowe<br>Miejsce zbiórki/koszary/Warsztat/Stajnia';
				xLang['SHOWBIGICONALLIANCE']	= 'Sojusz'; //identical to xLang['ALLIANCE'] => check if this can be removed
				xLang['SHOWBIGICONMILITARY2']	= "Ratusz/Dwór bohaterów/Kuźnia/Zbrojownia";
				xLang['HEROSMANSION']			= "Dwór bohaterów";
				xLang['BLACKSMITH']				= 'Zbrojownia';
				xLang['ARMOURY']				= 'Kuźnia';
				xLang['NOW']					= 'Teraz';
				xLang['CLOSE']					= 'Zamknij';
				xLang['USE']					= 'Użyj';
				xLang['USETHEM1H']				= 'Użyj je (1 godzinna  produkcja)';
				xLang['OVERVIEW']				= 'Ogólne';
				xLang['FORUM']					= 'Forum';
				xLang['ATTACKS']				= 'Ataki';
				xLang['NEWS']					= 'Nowości';
				xLang['ADDCRTPAGE']				= 'Dodaj bieżącą'; //additional Add link for Bookmarks meaning 'add current page as a bookmark'
				xLang['SCRIPTPRESURL']			= 'Strona TBeyond';
				xLang['NOOFSCOUTS']				= 'Ilość zwiadowców dla funkcji<br>"Wybierz zwiadowców"';
				xLang['SPACER']					= 'Odstęp';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'Pokaż informację o jednostkach w podpowiedziach';
				xLang['MESREPOPTIONS']			= 'Wiadomości i raporty';
				xLang['MESREPPRELOAD']			= 'Liczba wiadomości/raportów na stronie  <br>(Domyslnie = 1)';
				xLang['ATTABLES']				= 'Tabela jednostek';//only for users with PLUS => dorf3.php?s=6 link on dorf3.php pages
				xLang['MTWASTED']				= 'Niewykorzystane';
				xLang['MTEXCEED']				= 'Przekroczenie';
				xLang['MTCURRENT']				= 'Bierząca ładowność';
				xLang['ALLIANCEFORUMLINK']		= 'Link do zewnętrznego forum<br>(Zostaw puste dla wewnętrznego forum)'; 
				xLang['LOCKBOOKMARKS']			= 'Zablokuj zakładki<br>(Ukryj usuń, do góry, na dół ikonki)';
				xLang['MTCLEARALL']				= 'Wyczyść wszystko';
				xLang['UNLOCKBOOKMARKS']		= 'Odblokuj zakładki<br>(Ukryj usuń, do góry, na dół ikonki)';
				xLang['CLICKSORT']				= 'Kliknij aby posortować';
				xLang['MIN']					= 'Min';
				xLang['SAVEGLOBAL']				= 'Zapisz również dla innych osad';
				xLang['VILLAGELIST']			= 'Lista Osad';
				xLang['SHOWINOUTICONS']			= "Pokaż 'dorf1.php' i 'dorf2.php' linki";
				xLang['UPDATEPOP']				= 'Aktualizuj populację';
				xLang['SHOWRPRINFOTOOLTIPS']	= 'Pokaż odległość i czas dojścia do osady w podpowiedziach <br>(Miejsce zbiórki & Raporty)';
				xLang['EDIT']					= 'Edytuj';
				xLang['SHOWMESOPENLINKS']		= 'Pokaż link do otwarcia wiadomości w okienku';
				xLang['NPCOPTIONS']				= 'Opcje handlarza NPC';
				xLang['NPCASSISTANT']			= 'Pokaż kalkulacje handlarza NPC /linki';
				xLang['NEWVILLAGEAV']			= 'Nowa osada';
				xLang['SHOWMAPTABLE']			= 'Pokaż tabelkę graczy/osad/zdobytych dolin';
				xLang['NEWVILLAGEAV']			= 'Data/Czas';
				xLang['TIMEUNTIL']				= 'Pozostało czasu';
				xLang['SHOWREPDELTABLE']		= 'Pokaż tabelkę "Usuń wszystko" na stronie z raportami';
				xLang['SHOWIGMLINKFORME']		= 'Pokaż ikonkę "Wyślij PW" również dla mnie';
				xLang['CENTERMAP']				= 'Centruj mapę na tej osadzie';
				xLang['SHOWCENTERMAPICON']		= 'Pokaż ikonkę "Centruj mapę na tej osadzie"';
				xLang['INETGPOPTION']			= 'Internetowy pakiet graficzny';
				xLang['ALLOWINETGP']			= 'Pozwól na Internetowy pakiet graficzny';
				xLang['SENDTROOPS']				= 'Wyślij jednostki';
				xLang['SHOWBRSTATDETAILS']		= 'Pokaż szczegóły statystyk w raporcie';
				xLang['SHOWBIGICONMISC']		= "Pałac/Rezydencja/Akademia/Skarbiec";
				xLang['PALACE']					= "Pałac";
				xLang['RESIDENCE']				= "Rezydencja";
				xLang['ACADEMY']				= "Akademia";
				xLang['TREASURY']				= "Skarbiec";
				xLang['SHOWBBLINK']				= "Pokaż poziom budynku który jest aktualnie budowany jako migający";
				xLang['SHOWSENDTROOPSRESOURCES']= "W spisie osad pokaż ikonki 'Wyślij jednostki/Wyślij surowce'";
				break;
			case "ba":
				//by Nemanja (Thank you !)
				xLang['ALLIANCE']				= 'Alijansa';
				xLang['SIM']					= 'Simulator borbe';
				xLang['AREYOUSURE']				= 'Da li ste sigurni?';
				xLang['LOSS']					= 'Gubitak';
				xLang['PROFIT']					= 'Profit';
				xLang['EXTAVAILABLE']			= 'Dostupna ekstenzija';
				xLang['PLAYER']					= 'Igrač';
				xLang['VILLAGE']				= 'Selo';
				xLang['POPULATION']				= 'Populacija';
				xLang['COORDS']					= 'Koordinate';
				xLang['MAPTABLEACTIONS']		= 'Akcije';
				xLang['SAVED']					= 'Sačuvano';
				xLang['YOUNEED']				= 'Potrebno';
				xLang['TODAY']					= 'danas';
				xLang['TOMORROW']				= 'sutra';
				xLang['PAS_MANYANA']			= 'prekosutra';
				xLang['MARKET']					= 'Pijaca';
				xLang['BARRACKS']				= 'Kasarna';
				xLang['RALLYPOINT']				= 'Mjesto okupljanja';
				xLang['STABLE']					= 'Štala';
				xLang['WORKSHOP']				= 'Radionica';
				xLang['ENVIAR']					= 'Slanje resursa';
				xLang['COMPRAR']				= 'Kupovina';
				xLang['VENDER']					= 'Prodaja';
				xLang['SENDIGM']				= 'Pošalji poruku';
				xLang['LISTO']					= 'Dostupno';
				xLang['ON']						= 'za';
				xLang['A_LAS']					= 'u';
				xLang['EFICIENCIA']				= 'Učinkovitost';
				xLang['NEVER']					= 'Nikad';
				xLang['PC']						= 'Kulturalni poeni';
				xLang['ALDEAS']					= 'Sela';
				xLang['TIEMPO']					= 'Vrijemo';
				xLang['OFREZCO']				= 'Nudi';
				xLang['BUSCO']					= 'Traži';
				xLang['TIPO']					= 'Tip';
				xLang['DISPONIBLE']				= 'Dostupno samo';
				xLang['CUALQUIERA']				= 'Svejedno';
				xLang['YES']					= 'Da';
				xLang['NO']						= 'Ne';
				xLang['LOGIN']					= 'Prijava';
				xLang['MARCADORES']				= 'Oznake';
				xLang['ANYADIR']				= 'Dodaj';
				xLang['ENLACE']					= 'Dodaj adresu u Oznake';
				xLang['TEXTO']					= 'Dodaj tekst u Oznake';
				xLang['ELIMINAR']				= 'Obriši';
				xLang['MAPA']					= 'Mapa';
				xLang['MAXTIME']				= 'Maksimalno vrijeme';
				xLang['ARCHIVE']				= 'Arhiva';
				xLang['RESUMEN']				= 'Rezime';
				xLang['TROPAS']					= 'Vojska';
				xLang['CHECKVERSION']			= 'Update';
				xLang['ACTUALIZAR']				= 'Ažuriraj podatke o selu';
				xLang['VENTAS']					= 'Spremljenje ponude';
				xLang['MAPSCAN']				= 'Skeniraj mapu';
				xLang['BIGICONS']				= 'Prikazuj proširene ikone';
				xLang['NOTEBLOCK']				= 'Prikaži notes';
				xLang['SAVE']					= 'Spremi';
				xLang['RPDEFACT']				= 'Standardna akcija za<br>mjesto okupljanja';
				xLang['ATTACKTYPE2']			= 'Pojačanje';
				xLang['ATTACKTYPE3']			= 'Napad: normalan';
				xLang['ATTACKTYPE4']			= 'Napad: pljačka';
				xLang['NBSIZE']					= 'Veličina notesa';
				xLang['NBSIZEAUTO']				= 'Automatski';
				xLang['NBSIZENORMAL']			= 'Normalno (malo)';
				xLang['NBSIZEBIG']				= 'Veliki ekran (veliko)';
				xLang['NBHEIGHT']				= 'Visina notesa';
				xLang['NBAUTOEXPANDHEIGHT']		= 'Automatsko proširenje visine';
				xLang['NBKEEPHEIGHT']			= 'Standardna visina';
				xLang['SHOWCENTERNUMBERS']		= 'Prikaži centralne brojeve';
				xLang['NPCSAVETIME']			= 'Spremi: ';
				xLang['SHOWCOLORRESLEVELS']		= 'Prikazuj boje nivoa resursa';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Prikazuj boje nivoa građevine';
				xLang['CNCOLORNEUTRAL']			= 'Boja dostupne nadogradnje<br>(Zadano = prazno)';
				xLang['CNCOLORMAXLEVEL']		= 'Boja maksimalnog nivoa<br>(Zadano = prazno)';
				xLang['CNCOLORNOUPGRADE']		= 'Boja nemoguće nadogradnje<br>(Zadano = prazno)';
				xLang['CNCOLORNPCUPGRADE']		= 'Boja nadogradnje pomoću NPC-a<br>(Zadano = prazno)';
				xLang['TOTALTROOPS']			= 'Ukupna vojska sela';
				xLang['SHOWBOOKMARKS']			= 'Prikaži Oznake';
				xLang['RACECRTV2']				= 'Pleme';
				xLang['SERVERVERSION2']			= 'Travian v2.x server';
				xLang['SELECTALLTROOPS']		= 'Izaberi sve vojnike';
				xLang['PARTY']					= 'Zabave';
				xLang['CPPERDAY']				= 'KP/dnevno';
				xLang['SLOT']					= 'Slot';
				xLang['TOTAL']					= 'Ukupno';
				xLang['NOPALACERESIDENCE']		= 'Ne postoji rezidencija ili palača u ovom selu ili centar sela još nije otvoren!';
				xLang['SELECTSCOUT']			= 'Izaberi izviđača';
				xLang['SELECTFAKE']				= 'Izaberi lažnjak';
				xLang['NOSCOUT2FAKE']			= 'Nije moguće koristiti izviđače za lažni napad!';
				xLang['NOTROOP2FAKE']			= 'Nema jedinica za lažni napad!';
				xLang['NOTROOP2SCOUT']			= 'Nema jedinica za izviđanje!';
				xLang['NOTROOPS']				= 'Nema jedinica u selu!';
				xLang['ALL']					= 'Sve';
				xLang['NORACE']					= 'Izgradi kasarnu za automatsko određivanje plemena i/ili otvori centar sela...';
				xLang['COLORHELPTEXT']			= 'U polja boje možeš unijeti:<br>- green ili red ili  orange, itd.<br>- HEX (heksadecimalni) kod boje poput #004523<br>- ostaviti prazno za standardnu boju';
				xLang['COLORHELP']				= 'Pomoć za polja boje';
				xLang['SHOWORIGREPORT']			= 'Prikaži originalni izvještaj (za postanje)';
				xLang['SHOWCELLTYPEINFO']		= 'Prikazuj podatke o tipu/oazi ćelije pri prelazu miša preko mape';
				xLang['WARSIM']					= 'Simulator borbe koji se koristi: (izbornik lijevo)';
				xLang['WARSIMOPTION1']			= 'Interni (iz igre)';
				xLang['WARSIMOPTION2']			= 'Eksterni (kirilloid.ru)';
				xLang['WSANALYSER']				= 'Analizator svijeta koji se koristi';
				xLang['SHOWSTATLINKS']			= 'Prikaži statističke linkove analizatora';
				xLang['WANALYSER0']				= 'World Analyser'; //nema prijevod
				xLang['WANALYSER1']				= 'Travian Utils'; //nema prijevod
				xLang['NONEWVERSION']			= 'Imate posljednju dostupnu verziju';
				xLang['BETAVERSION']			= 'Moguće da imate beta verziju';
				xLang['NEWVERSIONAV']			= 'Dostupna je nova verzija skripte';
				xLang['UPDATESCRIPT']			= 'Nadograditi odmah?';
				xLang['CHECKUPDATE']			= 'Provjera nadogradnje skripte. Molimo sačekajte...';
				xLang['CROPFINDER']				= 'Crop finder';
				xLang['AVPOPPERVIL']			= 'Prosječno populacije po selu';
				xLang['AVPOPPERPLAYER']			= 'Prosječno populacije po igraču';
				xLang['SHOWRESUPGRADETABLE']	= 'Prikazuj tablicu nadogradnje za polja resursa';
				xLang['SHOWBUPGTABLE']			= 'Prikazuj tablicu nadogradnje za infrastrukturu';
				xLang['CONSOLELOGLEVEL']		= 'Nivo zapisa konzole<br>ONLY FOR PROGRAMMERS(Zadano = 1)';
				xLang['MARKETPRELOAD']			= 'Proj preučitanih stranica ponude<br>dok ste na stranici za kupovinu => na Pijaci<br>(Zadano = 1)';
				xLang['CAPITAL']				= 'Naziv glavnog grada<br>Za ažuriranje posjetite vaš profil';
				xLang['CAPITALXY']				= 'Koordinate vašeg glavnog grada<br>Za ažuriranje posjetite vaš profil';
				xLang['MAX']					= 'Maksimalno';
				xLang['TOTALTROOPSTRAINING']	= 'Ukupno obučavane vojske';
				xLang['SHOWDISTTIMES']			= 'Prikazuj udaljenosti i vremena';
				xLang['TBSETUPLINK']			= 'Travian Beyond Podešavanje';
				xLang['UPDATEALLVILLAGES']		= 'Ažuriraj sva sela. KORISTITI OPREZNO JER MOŽE DOVESTI DO SUSPENZIJE NALOGA!';
				xLang['SHOWMENUSECTION3']		= 'Prikazuj dodatne linkove u lijevom<br>izborniku<br>(Traviantoolbox, World Analyser, Travilog, Map, itd.)';
				xLang['LARGEMAP']				= 'Velika mapa';
				xLang['SHOWTRAVMAPLINKS']		= 'Prikazuj linkove na travmap.shishnet.org<br>(igrači i alijanse)';
				xLang['USETHEMPR']				= 'Koristi ih (proporcionalno)';
				xLang['USETHEMEQ']				= 'Koristi ih (jednako)';
				xLang['TOWNHALL']				= 'Opština';
				xLang['GAMESERVERTYPE']			= 'Game server';
				xLang['MARKETOFFERS']			= 'Ponude na pijaci';
				xLang['ACCINFO']				= 'Informacije o nalogu';
				xLang['BOOKMARKOPTIONS']		= 'Oznake';
				xLang['NOTEBLOCKOPTIONS']		= 'Notes';
				xLang['MENULEFT']				= 'Izbornik s lijeve strane';
				xLang['STATISTICS']				= 'Statistika';
				xLang['RESOURCEFIELDS']			= 'Polja resursa';
				xLang['VILLAGECENTER']			= 'Centar sela';
				xLang['MAPOPTIONS']				= 'Opcije mape';
				xLang['COLOROPTIONS']			= 'Opcije boje';
				xLang['DEBUGOPTIONS']			= 'Debug opcije';
				xLang['SHOWBIGICONMARKET']		= 'Pijaca';
				xLang['SHOWBIGICONMILITARY']	= 'Vojska Mjesto okupljanja/Kasarna/Radionica/Štala';
				xLang['SHOWBIGICONALLIANCE']	= 'Alijansa';
				xLang['SHOWBIGICONMILITARY2']	= 'Opština/Herojska vila/Kovačnica oklopa/Kovačnica oružja';
				xLang['HEROSMANSION']			= 'Herojska vila';
				xLang['BLACKSMITH']				= 'Kovačnica oružja';
				xLang['ARMOURY']				= 'Kovačnica oklopa';
				xLang['NOW']					= 'Odmah';
				xLang['CLOSE']					= 'Zatvori';
				xLang['USE']					= 'Koristi';
				xLang['USETHEM1H']				= 'Koristi ih (1 satna proizvodnja)';
				xLang['OVERVIEW']				= 'Pregled';
				xLang['FORUM']					= 'Forum';
				xLang['ATTACKS']				= 'Napadi';
				xLang['NEWS']					= 'Vijesti';
				xLang['ADDCRTPAGE']				= 'Dodaj trenutnu'; //additional Add link for Bookmarks meaning 'add current page as a bookmark'
				xLang['SCRIPTPRESURL']			= 'TBeyond';
				xLang['NOOFSCOUTS']				= 'Broj izviđača za "Izaberi izviđača" funkciju';
				xLang['SPACER']					= 'Spacer';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'Prikazuj informacije o vojsci na napomenama';
				xLang['MESREPOPTIONS']			= 'Poruke & Izvještaji';
				xLang['MESREPPRELOAD']			= 'Broj unaprijed učitanih<br>poruka/izvještaja<br>(Zadano = 1)';
				xLang['ATTABLES']				= 'Vojne tabele';
				xLang['MTWASTED']				= 'Škart';
				xLang['MTEXCEED']				= 'Premašuje';
				xLang['MTCURRENT']				= 'Trenutni tovar';
				xLang['ALLIANCEFORUMLINK']		= 'Link na eksterni forum<br>(Ostaviti prazno za interni forum)';
				xLang['LOCKBOOKMARKS']			= 'Zaključaj Oznake<br>(Sakrij ikone za brisanje i pomjeranje)';
				xLang['MTCLEARALL']				= 'Poništi sve';
				xLang['UNLOCKBOOKMARKS']		= 'Otključaj Oznake<br>(Prikaži ikone za brisanje i pomjeranje)';
				xLang['CLICKSORT']				= 'Klikni da sortiraš';
				xLang['MIN']					= 'Min';
				xLang['SAVEGLOBAL']				= 'Djeljeno među selima';
				xLang['VILLAGELIST']			= 'Lista sela';
				xLang['SHOWINOUTICONS']			= "Prikazuj 'dorf1.php' i 'dorf2.php' linkove";
				xLang['UPDATEPOP']				= 'Ažuriraj populaciju';
				xLang['SHOWRPRINFOTOOLTIPS']	= 'Prikazuj udaljenosti i vremena<br>do sela u napomenama<br>(Mjesto okupljanja & Izvještaji)';
				xLang['EDIT']					= 'Uredi';
				xLang['SHOWMESOPENLINKS']		= 'Prikazuj linkove na otvorene<br>poruke u pop-upu';
				xLang['NPCOPTIONS']				= 'NPC Assistant opcije';
				xLang['NPCASSISTANT']			= 'Prikazuj NPC Assistant kalkulacije/linkove';
				xLang['SHOWMAPTABLE']			= 'Prikaži tabelu igrača/sela/oaza';
				xLang['NEWVILLAGEAV']			= 'Datum/Vrijeme';
				xLang['TIMEUNTIL']				= 'Vrijeme za sačekajte';
				xLang['SHOWREPDELTABLE']		= 'Prikaži "Izbriši sve" u izvještajima';
				xLang['SHOWIGMLINKFORME']		= 'Prikaži "Pošalji IGM" ikonu i za mene';
				xLang['CENTERMAP']				= 'Centriraj kartu na ovo selo';
				xLang['SHOWCENTERMAPICON']		= 'Prikaži "Centriraj kartu na ovo selo" ikonu';
				xLang['INETGPOPTION']			= 'Internet grafički paketi';
				xLang['ALLOWINETGP']			= 'Dopusti internet grafičke pakete';
				xLang['SENDTROOPS']				= 'Pošalji vojsku';
				xLang['SHOWBRSTATDETAILS']		= 'Prikaži detalje u izvještajima';
				xLang['SHOWBIGICONMISC']		= "Dvorac/Rezidencija/Akademija/Zgrada za blago";
				xLang['PALACE']					= "Dvorac";
				xLang['RESIDENCE']				= "Rezidencija";
				xLang['ACADEMY']				= "Akademija";
				xLang['TREASURY']				= "Zgrada za blago";
				break;
			case "ir":
				xLang['ALLIANCE'] 				= 'اتحاد';
				xLang['SIM'] 					= 'شبيه ساز جنگي';
				xLang['AREYOUSURE'] 			= 'مطمئنيد؟';
				xLang['LOSS'] 					= 'زيان';
				xLang['PROFIT'] 				= 'سود';
				xLang['EXTAVAILABLE'] 			= 'افزونه در دسترس';
				xLang['PLAYER'] 				= 'بازيکن';
				xLang['VILLAGE'] 				= 'دهکده';
				xLang['POPULATION'] 			= 'جمعيت';
				xLang['COORDS'] 				= 'مختصات';
				xLang['MAPTABLEACTIONS']		= 'اعمال';
				xLang['SAVED'] 					= 'Saved';
				xLang['YOUNEED'] 				= 'احتياج شما';
				xLang['TODAY'] 					= 'امروز';
				xLang['TOMORROW'] 				= 'فردا';
				xLang['PAS_MANYANA'] 			= 'پس قردا';
				xLang['MARKET'] 				= 'بازار';
				xLang['BARRACKS'] 				= 'سربازخانه';
				xLang['RALLYPOINT'] 			= 'اردوگاه';
				xLang['STABLE'] 				= 'اصطبل';
				xLang['WORKSHOP'] 				= 'مرکز دهکده';
				xLang['ENVIAR'] 				= 'ارسال منابع';
				xLang['COMPRAR'] 				= 'خريد';
				xLang['VENDER'] 				= 'فروش';
				xLang['SENDIGM'] 				= 'Send IGM';
				xLang['LISTO'] 					= 'در دسترس';
				xLang['ON'] 					= 'روشن';
				xLang['A_LAS'] 					= 'at';
				xLang['EFICIENCIA'] 			= 'Efficiency';
				xLang['NEVER']					= 'هرگز';
				xLang['ALDEAS']					= 'دهکده(s)';
				xLang['TIEMPO']					= 'زمان';
				xLang['OFREZCO']				= 'پيشنهاد';
				xLang['BUSCO']					= 'جستجو';
				xLang['TIPO']					= 'نوع';
				xLang['DISPONIBLE']				= 'Only available';
				xLang['CUALQUIERA']				= 'Any';
				xLang['YES']					= 'بله';
				xLang['NO']						= 'خير';
				xLang['LOGIN']					= 'ورود';
				xLang['MARCADORES']				= 'علاقه مندي';
				xLang['ANYADIR']				= 'اضافه کردن';
				xLang['ENLACE']					= 'New Bookmark URL';
				xLang['TEXTO']					= 'New Bookmark Text';
				xLang['ELIMINAR']				= 'حذف';
				xLang['MAPA']					= 'نقشه';
				xLang['MAXTIME']				= 'حداکثر زمان';
				xLang['ARCHIVE']				= 'آرشيو';
				xLang['RESUMEN']				= 'خلاصه';
				xLang['TROPAS']					= 'سربازان';
				xLang['CHECKVERSION']			= 'به روز رساني TBeyond';
				xLang['ACTUALIZAR']				= 'به روز رساني اطلاعات دهکده';
				xLang['VENTAS']					= 'Saved Offers';
				xLang['MAPSCAN']    			= 'اسکن نقشه';
				xLang['BIGICONS']				= 'نشان دادن آيکونها';
				xLang['NOTEBLOCK']				= 'نشان دادن بلوک يادداشت';
				xLang['SAVE']					= 'ذخيره';
				xLang['RPDEFACT']				= 'Rally point default action';
				xLang['ATTACKTYPE2']			= 'تقويت';
				xLang['ATTACKTYPE3']			= 'حمله: عادي';
				xLang['ATTACKTYPE4']			= 'حمله: غارت';
				xLang['NBSIZE']					= 'اندازه بلوک يادداشت';
				xLang['NBSIZEAUTO']				= 'اتوماتيک';
				xLang['NBSIZENORMAL']			= 'عادي (کوچک)';
				xLang['NBSIZEBIG']				= 'صفحه بزرگ (بزرگ)';
				xLang['NBHEIGHT']				= 'ارتفاع بلوک يادداشت';
				xLang['NBAUTOEXPANDHEIGHT']		= 'گسرتش اتوماتيک ارتفاع';
				xLang['NBKEEPHEIGHT']			= 'ارتفاع پيش فرض';
				xLang['SHOWCENTERNUMBERS'] 		= 'نشان دادن شماره هاي مرکز';
				xLang['NPCSAVETIME']			= 'ذخيره: ';
				xLang['SHOWCOLORRESLEVELS']		= 'نشان دادن رنگ مراحل منابع';
				xLang['SHOWCOLORBUILDLEVELS']	= 'نشان دادن رنگ مراحل ساختمانها';
				xLang['CNCOLORNEUTRAL'] 		= 'به روز رساني رنگها<br>(پيش فرض = خالي)';
				xLang['CNCOLORMAXLEVEL'] 		= 'رنگ مرحله نهايي<br>(پيش فرض = خالي)';
				xLang['CNCOLORNOUPGRADE'] 		= 'به روز رساني رنگ امکان پذير نيست<br>(پيش فرض = خالي)';
				xLang['CNCOLORNPCUPGRADE'] 		= 'به روز رساني رنگ از طريق NPC<br>(پيش فرض = خالي)';
				xLang['TOTALTROOPS'] 			= 'مجموع نيروهاي دهکده';
				xLang['SHOWBOOKMARKS'] 			= 'نشان دادن علاقه منديها';
				xLang['RACECRTV2'] 				= 'نژاد';
				xLang['SERVERVERSION2'] 		= "Travian v2.x server";
				xLang['SELECTALLTROOPS'] 		= "انتخاب تمام سربازان";
				xLang['PARTY'] 					= "Festivities";
				xLang['CPPERDAY']				= "CP/day";
				xLang['SLOT']					= "Slot";
				xLang['TOTAL']					= "مجموع";
				xLang['NOPALACERESIDENCE'] 		= "هنوز اقامتگاه يا قصري در اين دهکده يا مرکز دهکده درست نشده است  !";
				xLang['SELECTSCOUT'] 			= "Select scout";
				xLang['SELECTFAKE'] 			= "Select fake";
				xLang['NOSCOUT2FAKE'] 			= "It's impossible to use scouts for a fake attack !";
				xLang['NOTROOP2FAKE'] 			= "براي حمله ي مجازي سربازي وجود ندارد !";
				xLang['NOTROOP2SCOUT'] 			= "There aren't troops to scout !";
				xLang['NOTROOPS'] 				= "سربازي در دهکده وجود ندارد !";
				xLang['ALL'] 					= "همه";
				xLang['NORACE'] 				= "Build the barracks to automatically determine the race and/or open the village center...";
				xLang['COLORHELPTEXT']			= "در فيلد رنگ ميتوانيد وارد کنيد:<br>- green يا red يا  orange, غيره.<br>-  HEX color code مانند #004523<br>- براي انتخاب پيش فرض خالي رها کنيد";
				xLang['COLORHELP']				= "راهنمائي براي فيلد رنگ ها";
				xLang['SHOWORIGREPORT']			= "نمايش گزارش اورجينال (for posting)";
				xLang['SHOWCELLTYPEINFO']		= "نمايش فروش نوع/دهکده اطلاعات<br>وقتي ماوس روي نقشه هست";
				xLang['WARSIM']					= "لينک استفاده از شبيه ساز جنگي:<br>(منوي چپ)";
				xLang['WARSIMOPTION1']			= "داخلي (با امکانات خود بازي)";
				xLang['WARSIMOPTION2']			= "خارجي ( با امکانات kirilloid.ru)";
				xLang['WSANALYSER'] 			= "World Analyserبراي استفاده ";
				xLang['SHOWSTATLINKS'] 			= "نمايش لينک analyser statistic ";
				xLang['NONEWVERSION']			= "شما از آخرين ورژن موجود استفاده ميکنيد";
				xLang['BETAVERSION']			= "شما ممکن است از ورژن آزمايشي استفاده کنيد";
				xLang['NEWVERSIONAV']			= "نسخه جديد در دسترس ميباشد";
				xLang['UPDATESCRIPT']			= "به روز رساني اسکريپت ?";
				xLang['CHECKUPDATE']			= "کنترل براي به روز رساني اسکريپت.  لطفا صبر کنيد...";
				xLang['CROPFINDER']				= "Crop finder";
				xLang['AVPOPPERVIL']			= "ميانگين جمعيت هر دهکده";
				xLang['AVPOPPERPLAYER']			= "ميانگين جمعيت هر بازيکن";
				xLang['SHOWRESUPGRADETABLE']	= "نمايش جدول ارتقا منابع";
				xLang['SHOWBUPGTABLE'] 			= "نمايش جدول ارتقا ساختمانها";
				xLang['CONSOLELOGLEVEL']		= "Console Log Level<br>ONLY FOR PROGRAMMERS OR DEBUGGING<br>(Default = 1)";
				xLang['MARKETPRELOAD']			= "Number of offer pages to preload<br>while on the 'Market => Buy' page<br>(Default = 1)";
				xLang['CAPITAL']				= 'نام پايتخت شما<br>راي تغيير به پروفايل خود برويد';
				xLang['CAPITALXY']				= 'Coordinates of your capital<br>براي تغيير به پروفايل خود برويد';
				xLang['MAX']					= 'Max';
				xLang['TOTALTROOPSTRAINING']	= 'مجموع سربازان در حال تربيت';
				xLang['SHOWDISTTIMES'] 			= 'نمايش فاصله و زمان';
				xLang['TBSETUPLINK'] 			= 'تنظيمات تراوين فضايي ';
				xLang['UPDATEALLVILLAGES']		= 'به روز رساني تمام دهکده ها .  USE WITH MAXIMUM CARE AS THIS CAN LEAD TO A BANNED ACCOUNT !';
				xLang['SHOWMENUSECTION3']		= "نمايش لينکهاي اضافي در منوي چپ<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
				xLang['LARGEMAP']				= 'نقشه بزرگ';
				xLang['SHOWTRAVMAPLINKS']		= 'نمايش لينک به travmap.shishnet.org<br>(کاربران و اتحاد ها)';
				xLang['USETHEMPR']				= 'Use them (متناسب)';
				xLang['USETHEMEQ']				= 'Use them (برابر)';
				xLang['TOWNHALL']				= 'تالار شهر';
				xLang['GAMESERVERTYPE']			= 'Game server';
				xLang['MARKETOFFERS']			= 'Market offers';
				xLang['ACCINFO']				= 'اطلاعات اکانت';
				xLang['BOOKMARKOPTIONS']		= 'Bookmarks';//identical to xLang['MARCADORES'] => check if this can be removed
				xLang['NOTEBLOCKOPTIONS']		= 'بلوک يادداشت';
				xLang['MENULEFT']				= 'منو در سمت چپ';
				xLang['STATISTICS']				= 'آمار';
				xLang['RESOURCEFIELDS']			= 'فيلد منابع';
				xLang['VILLAGECENTER']			= 'مرکز دهکده';
				xLang['MAPOPTIONS']				= 'تنظيمات نقشه';
				xLang['COLOROPTIONS']			= 'تنظيمات رنگ';
				xLang['DEBUGOPTIONS']			= 'Debug options';
				xLang['SHOWBIGICONMARKET']		= 'بازار';
				xLang['SHOWBIGICONMILITARY']	= 'نظامي<br>اردوگاه/سربازخانه/مرکز دهکده/اصطبل';
				xLang['SHOWBIGICONALLIANCE']	= 'اتحاد'; //identical to xLang['ALLIANCE'] => check if this can be removed
				xLang['SHOWBIGICONMILITARY2']	= "تالار شهر/امارت قهرمان/زره سازي/اسلحه سازي";
				xLang['HEROSMANSION']			= "امارت قهرمان";
				xLang['BLACKSMITH']				= 'اسلحه سازي';
				xLang['ARMOURY']				= 'زره سازي';
				xLang['NOW']					= 'اکنون';
				xLang['CLOSE']					= 'بستن';
				xLang['USE']					= 'استفاده';
				xLang['USETHEM1H']				= 'Use them (1 hour production)';
				xLang['OVERVIEW']				= 'Overview';
				xLang['FORUM']					= 'Forum';
				xLang['ATTACKS']				= 'حملات';
				xLang['NEWS']					= 'ابار';
				xLang['ADDCRTPAGE']				= 'Add current'; //additional Add link for Bookmarks meaning 'add current page as a bookmark'
				xLang['SCRIPTPRESURL']			= 'TBeyond page';
				xLang['NOOFSCOUTS']				= 'No. of scouts for the<br>"Select scout" function';
				xLang['SPACER'] 				= 'Spacer';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'نمايش اطلاعات سربازان در  tooltips';
				xLang['MESREPOPTIONS']			= 'پيام ها و گزارشات';
				xLang['MESREPPRELOAD']			= 'تعداد پيام ها/صفحه گزارشات<br>(Default = 1)';
				xLang['ATTABLES']				= 'جدول سربازان';//only for users with PLUS => dorf3.php?s=6 link on dorf3.php pages
				xLang['MTWASTED'] 				= 'تلف شده';
				xLang['MTEXCEED'] 				= 'Exceeding';
				xLang['MTCURRENT'] 				= 'Current load';
				xLang['ALLIANCEFORUMLINK']		= 'لينک به فوروم خارجي<br>(براي فوروم داخلي خالي رها کنيد)';
				xLang['LOCKBOOKMARKS']			= 'قفل علاقه منديها<br>(Hide delete, move up, move down icons)';
				xLang['MTCLEARALL']				= 'پاک کردن همه';
				xLang['UNLOCKBOOKMARKS']		= 'باز کردن قفل <br>(Show delete, move up, move down icons)';
				xLang['CLICKSORT']				= 'انتخاب براي ترتيب کردن';
				xLang['MIN']					= 'Min';
				xLang['SAVEGLOBAL']				= 'Shared among villages';
				xLang['VILLAGELIST']			= 'ليست دهکده ها';
				xLang['SHOWINOUTICONS']			= "نمايش لينک 'dorf1.php' و 'dorf2.php' ";
				xLang['UPDATEPOP']				= 'آپديت جمعيت';
				xLang['SHOWRPRINFOTOOLTIPS']	= 'نمايش زمان و فاصله دهکده در تولتيپ<br>(اردوگاه و گزارشات)';
				xLang['EDIT']					= 'ويرايش';
				xLang['SHOWMESOPENLINKS']		= 'نمايش لينک براي باز کردن پيام در  pop-up';
				xLang['NPCOPTIONS']				= 'NPC Assistant options';
				xLang['NPCASSISTANT']			= 'Show NPC Assistant calculations/links';
				xLang['SHOWMAPTABLE']			= 'نمايش جدولي از  بازيکن ها/دهکده ها/دهکده هاي اشغالي';
				xLang['NEWVILLAGEAV']			= 'تاريخ/ساعت';
				xLang['TIMEUNTIL']				= 'زمان انتظار';
				xLang['SHOWREPDELTABLE']		= 'نمايش "Delete all" در صفحه گزارشات';
				xLang['SHOWIGMLINKFORME']		= 'نمايش ايکون "Send IGM" براي خودم , همچنين';
				xLang['CENTERMAP']				= 'مرکز نقشه در اين دهکده';
				xLang['SHOWCENTERMAPICON']		= 'نمايش ايکون "مرکز نقضه در اين دهکده" ';
				xLang['INETGPOPTION']			= 'Internet Graphic Pack';
				xLang['ALLOWINETGP']			= 'Allow Internet Graphic Packs';
				xLang['SENDTROOPS']				= 'ارسال سربازان';
				xLang['SHOWBRSTATDETAILS']		= 'نمايش جزئيات در آمار گزارشات';
				xLang['SHOWBIGICONMISC']		= "تالار شهر/افامتگاه/دارالفنون/خزانه";
				xLang['PALACE']					= "تالار شهر";
				xLang['RESIDENCE']				= "اقامتگاه";
				xLang['ACADEMY']				= "دارالفنون";
				xLang['TREASURY']				= "خزانه";
				xLang['SHOWBBLINK']				= "Show blinking levels for buildings being upgraded";
				xLang['SHOWSENDTROOPSRESOURCES'] = "نمايش 'ارسال سرباز/ارسال منابع' آيکون در ليست دهکده";
				break;
			case "il":
				// Hebrew - Translated by zZzMichel & BlueShark; rewrote by yabash; updated by removesoul & DMaster (Thank you !)
				xLang['ALLIANCE']				= 'ברית';
				xLang['SIM']					= 'סימולטור קרב ';
				xLang['AREYOUSURE']				= 'האם אתה בטוח?';
				xLang['LOSS']					= 'הפסד';
				xLang['PROFIT']					= 'רווח';
				xLang['EXTAVAILABLE']			= 'שידרוג זמין';
				xLang['PLAYER']					= 'שחקן';
				xLang['VILLAGE']				= 'כפר';
				xLang['POPULATION']				= 'אוכלוסייה';
				xLang['COORDS']					= 'קואורדינטות';
				xLang['MAPTABLEACTIONS']		= 'פעולות';
				xLang['SAVED']					= 'נשמר';
				xLang['YOUNEED']				= 'את/ה צריכ/ה';
				xLang['TODAY']					= 'היום';
				xLang['TOMORROW']				= 'מחר';
				xLang['PAS_MANYANA']			= 'מחרתיים';
				xLang['MARKET']					= 'שוק';
				xLang['BARRACKS']				= 'מגורי חיילים';
				xLang['RALLYPOINT']				= 'שלח כוחות';
				xLang['STABLE']					= 'אורווה';
				xLang['WORKSHOP']				= 'בית מלאכה';
				xLang['ENVIAR']					= 'שלח משאבים';
				xLang['COMPRAR']				= 'קנה';
				xLang['VENDER']					= 'מכור';
				xLang['SENDIGM']				= 'שלח הודעה';
				xLang['LISTO']					= 'זמין';
				xLang['ON']						= 'זמין';
				xLang['A_LAS']					= 'ב';
				xLang['EFICIENCIA']				= 'יעילות';
				xLang['NEVER']					= 'אף פעם';
				xLang['ALDEAS']					= 'כפר(ים)';
				xLang['TIEMPO']					= 'זמן';
				xLang['OFREZCO']				= 'מציע';
				xLang['BUSCO']					= 'מחפש';
				xLang['TIPO']					= 'יחס ההחלפה';
				xLang['DISPONIBLE']				= 'רק עסקאות אפשריות ?';
				xLang['CUALQUIERA']				= 'כל סוג';
				xLang['YES']					= 'כן';
				xLang['NO']						= 'לא';
				xLang['LOGIN']					= 'התחבר';
				xLang['MARCADORES']				= 'מועדפים';
				xLang['ANYADIR']				= 'הוסף';
				xLang['ENLACE']					= 'לינק';
				xLang['TEXTO']					= 'שם';
				xLang['ELIMINAR']				= 'מחק';
				xLang['MAPA']					= 'מפה';
				xLang['MAXTIME']				= 'מקסימום זמן שליחה';
				xLang['ARCHIVE']				= 'ארכיון';
				xLang['RESUMEN']				= 'סיכום';
				xLang['TROPAS']					= 'כוחות';
				xLang['CHECKVERSION']			= 'עדכן TBeyond';
				xLang['ACTUALIZAR']				= 'עדכן מידע על הכפר';
				xLang['VENTAS']					= 'הצעות שמורות';
				xLang['MAPSCAN']				= 'סרוק מפה';
				xLang['BIGICONS']				= 'הצג אייקונים מורחבים';
				xLang['NOTEBLOCK']				= 'הצג פנקס הערות';
				xLang['SAVE']					= 'שמור';
				xLang['RPDEFACT']				= 'פעולת ברירת מחדל בנקודת המפגש';
				xLang['ATTACKTYPE2']			= 'תגבורת';
				xLang['ATTACKTYPE3']			= 'התקפה רגילה';
				xLang['ATTACKTYPE4']			= 'התקפת פשיטה';
				xLang['NBSIZE']					= 'גודל פנקס הערות';
				xLang['NBSIZEAUTO']				= 'אוטומאטי';
				xLang['NBSIZENORMAL']			= 'רגיל (קטן)';
				xLang['NBSIZEBIG']				= 'מסך רחב';
				xLang['NBHEIGHT']				= 'גובה פנקס הערות';
				xLang['NBAUTOEXPANDHEIGHT']		= 'הרחב גובה אוטומאטית';
				xLang['NBKEEPHEIGHT']			= 'גובה ברירת מחדל';
				xLang['SHOWCENTERNUMBERS']		= 'הצג רמות מבנים';
				xLang['NPCSAVETIME']			= 'שמור: ';
				xLang['SHOWCOLORRESLEVELS']		= 'הצג רמת שדות משאבים בצבע';
				xLang['SHOWCOLORBUILDLEVELS']	= 'הצג רמת מבנים בצבע';
				xLang['CNCOLORNEUTRAL']			= 'צבע שדרוג זמין (ריק = ברירת מחדל)';
				xLang['CNCOLORMAXLEVEL']		= 'צבע שלב מקסימאלי (ריק = ברירת מחדל)';
				xLang['CNCOLORNOUPGRADE']		= 'צבע כאשר שדרוג לא אפשרי (ריק = ברירת מחדל)';
				xLang['CNCOLORNPCUPGRADE']		= 'צבע שדרוג ע"י NPC (ריק = ברירת מחדל)';
				xLang['TOTALTROOPS']			= 'סה"כ כוחות שיש לכפר זה';
				xLang['SHOWBOOKMARKS']			= 'הראה מועדפים';
				//xLang['RACECRTV2'] = 'גזע';
				xLang['RACECRTV2']				= '<b>גזע</b><br>אם מופיעה שגיאה/ריק, אנא הכנס למגורי החיילים';
				xLang['SERVERVERSION2']			= "שרת טרוויאן גירסה 2.x";
				xLang['SELECTALLTROOPS']		= "בחר את כל החיילים";
				xLang['PARTY']					= "חגיגות";
				xLang['CPPERDAY']				= "נקודות תרבות ליום";
				xLang['SLOT']					= "מקום פנוי";
				xLang['TOTAL']					= 'סה"כ';
				xLang['NOPALACERESIDENCE']		= "ארמון או מגורים מלכותיים לא נמצאו בכפר זה או שמרכז הכפר לא נפתח עדיין";
				xLang['SELECTSCOUT']			= "בחר סייר";
				xLang['SELECTFAKE']				= "התקפה מזויפת";
				xLang['NOSCOUT2FAKE']			= "אי אפשר להשתמש בסיירים להתקפה מזויפת!";
				xLang['NOTROOP2FAKE']			= "אין חיילים להתקפה מזויפת!";
				xLang['NOTROOP2SCOUT']			= "אין סיירים לריגול!";
				xLang['NOTROOPS']				= "אין חיילים בכפר!";
				xLang['ALL']					= "הכל";
				xLang['NORACE']					= "בנה מגורי חיילים בשביל זיהוי אוטומטי של הגזע או הכנס למרכז הכפר";
				xLang['COLORHELPTEXT']			= "בשורות הצבעים אתה יכול להכניס:<br>- <b>green</b> או <b>red</b> או  <b>orange</b> וכו'<br>- קוד HEX  כמו <b>#004523</b><br>- השאר ריק בשביל ברירת המחדל";
				xLang['COLORHELP']				= "עזרה לשורות הצבעים";
				xLang['SHOWORIGREPORT']			= "הראה דוח רגיל (לפרסום)";
				xLang['SHOWCELLTYPEINFO']		= "הראה סוג עמק נטוש/נווה מדבר<br>בזמן העברת העכבר מעליו במפה";
				xLang['WARSIM']					= "סימולטור קרב לשימוש<br>(בתפריט הימני)";
				xLang['WARSIMOPTION1']			= "פנימי (מסופק על ידי המשחק)";
				xLang['WARSIMOPTION2']			= "חיצוני (מסופק על ידי kirilloid.ru)";
				xLang['WSANALYSER']				= "מאגר נתונים לשימוש";
				xLang['SHOWSTATLINKS']			= "הצג לינקים סטטיסטיים ממאגר נתונים";
				xLang['NONEWVERSION']			= "יש לך את הגירסה העדכנית ביותר";
				xLang['BETAVERSION']			= "אתה יכול להוריד את גירסת הבטא";
				xLang['NEWVERSIONAV']			= "קיימת גירסה חדשה לסקריפט";
				xLang['UPDATESCRIPT']			= "עדכן את הסקיפט עכשיו?";
				xLang['CHECKUPDATE']			= "בודק עדכונים לסקריפט. אנא המתן...";
				xLang['CROPFINDER']				= "מוצא קרופרים";
				xLang['AVPOPPERVIL']			= "ממוצע אוכלוסייה לכפר";
				xLang['AVPOPPERPLAYER']			= "ממוצע אוכלוסייה לשחקן";
				xLang['SHOWRESUPGRADETABLE']	= "הראה טבלת שדרוג שדות משאבים";
				xLang['SHOWBUPGTABLE']			= "הראה טבלת שדרוג מבנים";
				xLang['CONSOLELOGLEVEL']		= "Console Log Level<br>רק בשביל מתכנתים או בודקי באגים<br>(ברירת מחדל = 0 או השאר ריק)";
				xLang['MARKETPRELOAD']			= "מספר דפי הצעות לטעינה בזמן <br>שנמצאים בעמוד 'שוק => הצעות'<br>(ברירת מחדל = 1 או ריק; מקסימום = 5)";
				xLang['CAPITAL']				= '<b>שם הבירה</b><br>אם מופיעה שגיאה/ריק, אנא הכנס לדף הפרופיל';
				xLang['CAPITALXY']				= '<b>קואורדינטות הבירה</b><br>אם מופיעה שגיאה/ריק, אנא הכנס לדף הפרופיל'; 
				xLang['MAX']					= 'מקס';
				xLang['TOTALTROOPSTRAINING']	= 'סה"כ חיילים באימון';
				xLang['SHOWDISTTIMES']			= 'הצג מרחקים וזמנים';
				xLang['TBSETUPLINK']			= 'הגדרות Travian Beyond';
				xLang['UPDATEALLVILLAGES']		= 'עדכן מידע על כל הכפרים. השתמשו בזהירות כי הדבר יכול להוביל לקבלת באן!';
				xLang['SHOWMENUSECTION3']		= "הראה לינקים נוספים בתפריט הימני<br>(Traviantoolbox, World Analyser, Travilog, מפה, וכו')";
				xLang['LARGEMAP']				= 'מפה גדולה';
				xLang['SHOWTRAVMAPLINKS']		= 'הראה לינקים אל travmap.shishnet.org<br>(משתמשים ובריתות)';
				xLang['USETHEMPR']				= 'חלק משאבים (באופן פרופורציוני)';
				xLang['USETHEMEQ']				= 'חלק משאבים (באופן שווה)';
				xLang['TOWNHALL']				= 'בניין העירייה';
				xLang['GAMESERVERTYPE']			= 'סוג השרת';
				xLang['MARKETOFFERS']			= 'הצעות השוק';
				xLang['ACCINFO']				= 'מידע חשבון';
				xLang['BOOKMARKOPTIONS']		= 'מועדפים';
				xLang['NOTEBLOCKOPTIONS']		= 'פנקס הרשימות';
				xLang['MENULEFT']				= 'תוספות התפריט שבצד ימין';
				xLang['STATISTICS']				= 'סטטיסטיקות';
				xLang['RESOURCEFIELDS']			= 'שדות משאבים';
				xLang['VILLAGECENTER']			= 'מרכז הכפר'; 
				xLang['MAPOPTIONS']				= 'אפשרויות מפה';
				xLang['COLOROPTIONS']			= 'אפשרויות צבעים';
				xLang['DEBUGOPTIONS']			= 'מסוף שגיאות';
				xLang['SHOWBIGICONMARKET']		= 'שוק';
				xLang['SHOWBIGICONMILITARY']	= 'צבא<BR>נקודת מפגש/מגורי חיילים/בית-מלאכה/אורווה ';
				xLang['SHOWBIGICONALLIANCE']	= 'ברית';
				xLang['SHOWBIGICONMILITARY2']	= "בניין העירייה/אחוזת הגיבור/נשקיה/נפחייה";
				xLang['HEROSMANSION']			= "אחוזת הגיבור";
				xLang['BLACKSMITH']				= "נפחייה";
				xLang['ARMOURY']				= "נשקייה";
				xLang['NOW']					= 'כעת';
				xLang['CLOSE']					= 'סגור';
				xLang['USE']					= 'השתמש';
				xLang['USETHEM1H']				= 'חלק משאבים (תוצר של שעה)';
				xLang['OVERVIEW']				= 'מבט-על';
				xLang['FORUM']					= 'פורום';
				xLang['ATTACKS']				= 'התקפות';
				xLang['NEWS']					= 'חדשות';
				xLang['ADDCRTPAGE']				= 'הוסף דף נוכחי';
				xLang['SCRIPTPRESURL']			= 'אתר הסקריפט';
				xLang['SPACER']					= 'קו הפרדה';
				xLang['NOOFSCOUTS']				='מספר הסיירים שירשם בשימוש בפונקציה<BR>"שלח סייר"';
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'הצג מידע על החיילים בהצבעת העכבר על תמונותיהם';
				xLang['MESREPOPTIONS']			= 'הודעות ודוחות';
				xLang['MESREPPRELOAD']			= 'מספר דפי ההודעות/דוחות שברצונך לטעון<br>(ברירת-מחדל = 1 או השאר ריק; מקסימום = 5)';
				xLang['ATTABLES']				= 'טבלאות חיילים';
				xLang['MTWASTED']				= 'מקום פנוי';
				xLang['MTEXCEED']				= 'לא ניתן לשלוח';
				xLang['MTCURRENT']				= 'סה"כ משאבים';
				xLang['ALLIANCEFORUMLINK']		= 'קישור לפורום ברית חיצוני<br>(השאר ריק כדי להשתמש בפורום של המשחק)';
				xLang['LOCKBOOKMARKS']			= 'נעל מועדפים<br>(מסתיר את סמלי המחיקה וההזזה)';
				xLang['MTCLEARALL']				= 'נקה הכל';
				xLang['UNLOCKBOOKMARKS']		= 'בטל נעילת מועדפים<br>(מציג את סמלי המחיקה וההזזה)';
				xLang['CLICKSORT']				= 'לחץ כדי למיין';
				xLang['MIN']					= 'מינימום';
				xLang['SAVEGLOBAL']				= 'שתף את ההצעה בכל הכפרים שלי';
				xLang['VILLAGELIST']			= 'רשימת הכפרים';
				xLang['SHOWINOUTICONS']			= "הצג קישוריי 'dorf1.php' ו- 'dorf2.php' ברשימת הכפרים";
				xLang['UPDATEPOP']				= 'עדכן אוכלוסייה'; 
				xLang['SHOWRPRINFOTOOLTIPS']	= 'הצג מרחקים וזמנים בהצבעת העכבר על שמות כפרים<br>(פעיל בנקודת המפגש ובדוחות)';
				xLang['SHOWMESOPENLINKS']		= 'הצג קישור לפתיחת הודעות בחלון מוקפץ';
				xLang['NPCOPTIONS']				= 'אפשרויות מְסַיֵּעַ ה- NPC';
				xLang['NPCASSISTANT']			= 'הצג חישובים ולינקים של מְסַיֵּעַ ה- NPC';
				xLang['NEWVILLAGEAV']			= 'מתי ?';
				xLang['SHOWMAPTABLE']			= 'הצג טבלה של שחקנים/כפרים/עמקים תפוסים';
				xLang['TIMEUNTIL']				= 'עוד כמה זמן ?';
				xLang['SHOWREPDELTABLE']		= 'הצג את טבלת כפתורי המחיקה בדפי הדוחות';
				xLang['SHOWIGMLINKFORME']		= 'הצג את סמל "שליחת הודעה" גם ליד שם המשתמש שלי';
				xLang['CENTERMAP']				= 'מַרְכֵּז כפר זה במפה';
				xLang['SHOWCENTERMAPICON']		= 'הצג סמל "מַרְכֵּז כפר זה במפה" ברשימת הכפרים';
				xLang['INETGPOPTION']			= 'חבילות גרפיקה באינטרנט';
				xLang['ALLOWINETGP']			= 'אפשר שימוש בחבילות גרפיקה מהאינטרנט';
				xLang['SENDTROOPS']				= 'שלח כוחות';
				xLang['SHOWBRSTATDETAILS']		= 'הצג פרטי סטטיסטיקה נוספים בדפי הדוחות';
				xLang['SHOWBIGICONMISC']		= "ארמון/מגורים/אקדמיה/משרד-האוצר";
				xLang['PALACE']					= "ארמון";
				xLang['RESIDENCE']				= "מגורים מלכותיים";
				xLang['ACADEMY']				= "אקדמיה";
				xLang['TREASURY']				= "משרד-האוצר";
				xLang['SHOWBBLINK']				= "הצג מספרים מהבהבים למבנים שעוברים שידרוג";
				xLang['SHOWSENDTROOPSRESOURCES']= "הצג את הסמלים 'שליחת כוחות/משאבים' ברשימת הכפרים";
				break;
			case "th":
				xLang['ALLIANCE']				= 'พันธมิตร';
				xLang['SIM']					= 'จำลองการต่อสู้';
				xLang['AREYOUSURE']				= 'แน่ใจนะ?';
				xLang['LOSS']					= 'ความเสียหาย';
				xLang['PROFIT']					= 'กำไร';
				xLang['EXTAVAILABLE']			= 'พร้อมขยาย';
				xLang['PLAYER']					= 'ผู้เล่น';
				xLang['VILLAGE']				= 'หมู่บ้าน';
				xLang['POPULATION']				= 'ประชากร';
				xLang['COORD']					= 'พิกัด';
				xLang['MAPTABLEACTIONS']		= 'การดำเนินการ';
				xLang['SAVED']					= 'Saved';
				xLang['YOUNEED']				= 'คุณต้องการ';
				xLang['TODAY']					= 'วันนี้';
				xLang['TOMORROW']				= 'วันพรุ่งนี้';
				xLang['PAS_MANYANA']			= 'วันมะรืนนี้';
				xLang['MARKET']					= 'ตลาดสินค้า';
				xLang['BARRACKS']				= 'ค่ายทหาร';
				xLang['RALLYPOINT']				= 'จุดรวมกำลังพล';
				xLang['STABLE']					= 'โรงม้า';
				xLang['WORKSHOP']				= 'ห้องเครื่อง';
				xLang['ENVIAR']					= 'ส่งทรัพยากร';
				xLang['COMPRAR']				= 'ซื้อ';
				xLang['VENDER']					= 'ขาย';
				xLang['SENDIGM']				= 'ส่ง IGM';
				xLang['LISTO']					= 'พร้อม';
				xLang['ON']						= 'วันที่';
				xLang['A_LAS']					= 'ณ เวลา';
				xLang['EFICIENCIA']				= 'ประสิทธิผล';
				xLang['NEVER']					= 'ไม่มีทาง';
				xLang['ALDEAS']					= 'หมู่บ้าน';
				xLang['TIEMPO']					= 'เวลา';
				xLang['OFREZCO']				= 'สิ่งที่เสนอ';
				xLang['BUSCO']					= 'สิ่งที่ต้องการ';
				xLang['TIPO']					= 'รูปแบบ';
				xLang['DISPONIBLE']				= 'พร้อมเท่านั้น';
				xLang['CUALQUIERA']				= 'ทั้งหมด';
				xLang['YES']					= 'ใช่';
				xLang['NO']						= 'ไม่ใช่';
				xLang['LOGIN']					= 'เข้าสู่ระบบ';
				xLang['MARCADORES']				= 'บุ๊คมาร์ค';
				xLang['ANYADIR']				= 'เพิ่ม';
				xLang['ENLACE']					= 'URL บุ๊คมาร์คใหม่';
				xLang['TEXTO']					= 'ข้อความบุ๊คมาร์คใหม่';
				xLang['ELIMINAR']				= 'ลบ';
				xLang['MAPA']					= 'แผนที่';
				xLang['MAXTIME']				= 'เวลาสูงสุด';
				xLang['ARCHIVE']				= 'เอกสารสำคัญ';
				xLang['RESUMEN']				= 'สรุป';
				xLang['TROPAS']					= 'กองกำลัง';
				xLang['CHECKVERSION']			= 'ปรับปรุง TBeyond';
				xLang['ACTUALIZAR']				= 'ปรังปรุงข้อมูลหมู่บ้าน';
				xLang['VENTAS']					= 'Saved Offers';
				xLang['MAPSCAN']				= 'Scan แผนที่';
				xLang['BIGICONS']				= 'แสดง extended icons';
				xLang['NOTEBLOCK']				= 'แสดงกล่องข้อความ';
				xLang['SAVE']					= 'บันทึก';
				xLang['RPDEFACT']				= 'Rally point default action';
				xLang['ATTACKTYPE2']			= 'ส่งกองกำลังเสริม';
				xLang['ATTACKTYPE3']			= 'โจมตี: ปกติ';
				xLang['ATTACKTYPE4']			= 'โจมตี: ปล้น';
				xLang['NBSIZE']					= 'ขนาดกล่องข้อความ';
				xLang['NBSIZEAUTO']				= 'อัตโนมัติ';
				xLang['NBSIZENORMAL']			= 'ปกติ (เล็ก)';
				xLang['NBSIZEBIG']				= 'จอขนาดใหญ่ (ใหญ่)';
				xLang['NBHEIGHT']				= 'กล่องข้อความ height';
				xLang['NBAUTOEXPANDHEIGHT']		= 'ขยายความสูงอัตโนมัติ';
				xLang['NBKEEPHEIGHT']			= 'ความสูงปกติ';
				xLang['SHOWCENTERNUMBERS']		= 'Show center numbers';
				xLang['NPCSAVETIME']			= 'ประหยัดเวลา: ';
				xLang['SHOWCOLORRESLEVELS']		= 'Show resource level colours';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Show building level colours';
				xLang['CNCOLORNEUTRAL']			= 'Color upgrade available<br>(ปกติ = ว่าง)';
				xLang['CNCOLORMAXLEVEL']		= 'Color max level<br>(ปกติ = ว่าง)';
				xLang['CNCOLORNOUPGRADE']		= 'Color upgrade not possible<br>(ปกติ = ว่าง)';
				xLang['CNCOLORNPCUPGRADE']		= 'Color upgrade via NPC<br>(ปกติ = ว่าง)';
				xLang['TOTALTROOPS']			= 'กองกำลังของหมู่บ้านทั้งหมด';
				xLang['SHOWBOOKMARKS']			= 'แสดงบุ๊คมาร์ค';
				xLang['RACECRTV2']				= 'เผ่า';
				xLang['SERVERVERSION2']			= "Travian v2.x server";
				xLang['SELECTALLTROOPS']		= "เลือกกองกำลังทั้งหมด";
				xLang['PARTY']					= "การเฉลิมฉลอง";
				xLang['CPPERDAY']				= "CP/วัน";
				xLang['SLOT']					= "ช่อง";
				xLang['TOTAL']					= "รวม";
				xLang['NOPALACERESIDENCE']		= "No residence or palace in this village or village center not opened yet !";
				xLang['SELECTSCOUT']			= "เลือกหน่วยสอดแนม";
				xLang['SELECTFAKE']				= "เลือกโจมตีหลอก";
				xLang['NOSCOUT2FAKE']			= "มันเป็นไปไม่ได้ที่จะใช้หน่วยสอดแนมสำหรับการโจมตีหลอก !";//It's impossible to use scouts for a fake attack !
				xLang['NOTROOP2FAKE']			= "ไม่มีกองกำลังสำหรับสิ่งที่โจมตี!";//There aren't troops for a fake attack!
				xLang['NOTROOP2SCOUT']			= "ไม่มีหน่วยสอดแนม !";//There aren't troops to scout !
				xLang['NOTROOPS']				= "ไม่มีกองกำลังในหมู่บ้าน !";//There aren't troops in the village !
				xLang['ALL']					= "ทั้งหมด";
				xLang['NORACE']					= "Build the barracks to automatically determine the race<br>and/or open the village center...";
				xLang['COLORHELPTEXT']			= "In color fields you may enter:<br>- green or red or  orange, etc.<br>- the HEX color code like #004523<br>- leave empty for the default color";
				xLang['COLORHELP']				= "Help for color fields";
				xLang['SHOWORIGREPORT']			= "แสดงรายงานแบบเดิม (for posting)";
				xLang['SHOWCELLTYPEINFO']		= "แสดงข้อมูล ประเภทของcellหรือโอเอซิส<br>ขณะที่เมาส์อยู่บนแผนที่";
				xLang['WARSIM']					= "ใช้ลิ้งค์จำลองการต่อสู้:<br>(เมนูด้านซ้าย)";
				xLang['WARSIMOPTION1']			= "ภายใน (provided by the game)";
				xLang['WARSIMOPTION2']			= "ภายนอก (provided by kirilloid.ru)";
				xLang['WSANALYSER']				= "ใช้ World Analyser";
				xLang['SHOWSTATLINKS']			= "แสดงลิ้งค์ analyser statistic";
				xLang['NONEWVERSION']			= "You have the latest version available";
				xLang['BETAVERSION']			= "You may have a beta version";
				xLang['NEWVERSIONAV']			= "A new version of the script is available";
				xLang['UPDATESCRIPT']			= "ปรับปรุง script เดี๋ยวนี้?";
				xLang['CHECKUPDATE']			= "กำลังปรับปรุง script. กรุณารอสักครู่...";
				xLang['CROPFINDER']				= "Crop finder";
				xLang['AVPOPPERVIL']			= "ประชากรเฉลี่ยต่อหมู่บ้าน";
				xLang['AVPOPPERPLAYER']			= "ประชากรเฉลี่ยต่อผู้เล่น";
				xLang['SHOWRESUPGRADETABLE']	= "Show resource fields upgrade table";
				xLang['SHOWBUPGTABLE']			= "Show buildings upgrade table";
				xLang['CONSOLELOGLEVEL']		= "Console Log Level<br>สำหรับ PROGRAMMERS หรือ DEBUGGING เท่านั้น<br>(ปกติ = 1)";
				xLang['MARKETPRELOAD']			= "Number of offer pages to preload<br>while on the 'Market => Buy' page<br>(ปกติ = 1)";
				xLang['CAPITAL']				= 'ชื่อเมืองหลวงของคุณ<br>Visit your Profile for an update';
				xLang['CAPITALXY']				= 'พิกัดของเมืองหลวง<br>	Visit your Profile for an update';
				xLang['MAX']					= 'สูงสุด';
				xLang['TOTALTROOPSTRAINING']	= 'Total troops training';
				xLang['SHOWDISTTIMES']			= 'แสดงระยะทางและเวลา';
				xLang['TBSETUPLINK']			= 'Travian Beyond Setup';
				xLang['UPDATEALLVILLAGES']		= 'Update all villages.  USE WITH MAXIMUM CARE AS THIS CAN LEAD TO A BANNED ACCOUNT !';
				xLang['SHOWMENUSECTION3']		= "Show additional links in left menu<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
				xLang['LARGEMAP']				= 'แผนที่ขนาดใหญ่';
				xLang['SHOWTRAVMAPLINKS']		= 'Show links to travmap.shishnet.org<br>(users and alliances)';
				xLang['USETHEMPR']				= 'Use them (proportional)';
				xLang['USETHEMEQ']				= 'Use them (equal)';
				xLang['TOWNHALL']				= 'ศาลากลาง';
				xLang['GAMESERVERTYPE']			= 'Game server';
				xLang['MARKETOFFERS']			= 'Market offers';
				xLang['ACCINFO']				= 'ข้อมูลบัญชี';
				xLang['BOOKMARKOPTIONS']		= 'บุ๊คมาร์ค';//identical to xLang['MARCADORES'] => check if this can be removed
				xLang['NOTEBLOCKOPTIONS']		= 'กล่องข้อความ';
				xLang['MENULEFT']				= 'เมนูด้านซ้าย';
				xLang['STATISTICS']				= 'สถิติ';
				xLang['RESOURCEFIELDS']			= 'พื้นที่ทรัพยากร';
				xLang['VILLAGECENTER']			= 'ศูนย์กลางหมู่บ้าน';
				xLang['MAPOPTIONS']				= 'Map options';
				xLang['COLOROPTIONS']			= 'Color options';
				xLang['DEBUGOPTIONS']			= 'Debug options';
				xLang['SHOWBIGICONMARKET']		= 'ตลาด';
				xLang['SHOWBIGICONMILITARY']	= 'ทางทหาร<br>จุดระดมพล/ค่ายทหาร/ห้องเครื่อง/โรงม้า';
				xLang['SHOWBIGICONALLIANCE']	= 'พันธมิตร'; //identical to xLang['ALLIANCE'] => check if this can be removed
				xLang['SHOWBIGICONMILITARY2']	= "ศาลากลาง/คฤหาสน์ของฮีโร่/คลังแสง/ช่างตีเหล็ก";
				xLang['HEROSMANSION']			= "คฤหาสน์ของฮีโร่";
				xLang['BLACKSMITH']				= 'ช่างตีเหล็ก';
				xLang['ARMOURY']				= 'คลังแสง';
				xLang['NOW']					= 'เดี๋ยวนี้';
				xLang['CLOSE']					= 'ปิด';
				xLang['USE']					= 'ใช้';
				xLang['USETHEM1H']				= 'Use them (1 hour production)';
				xLang['OVERVIEW']				= 'ภาพรวม';
				xLang['FORUM']					= 'ฟอรัม';
				xLang['ATTACKS']				= 'โจมตี';
				xLang['NEWS']					= 'ข่าว';
				xLang['ADDCRTPAGE']				= 'เพิ่มหน้าปัจจุบัน'; //additional Add link for Bookmarks meaning 'add current page as a bookmark'
				xLang['SCRIPTPRESURL']			= 'หน้า TBeyond';
				xLang['NOOFSCOUTS']				= 'จำนวนของหน่วยสอดแนมสำหรับ<br>ฟังก์ชัน "เลือกหน่วยสอดแนม"';
				xLang['SPACER']					= 'คั่น';//Spacer
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'แสดงข้อมูลกองกำลังใน tooltips';
				xLang['MESREPOPTIONS']			= 'ข่าวสาร & รายงาน';
				xLang['MESREPPRELOAD']			= 'Number of message/report pages to preload<br>(Default = 1)';
				xLang['ATTABLES']				= 'Troop tables';//only for users with PLUS => dorf3.php?s=6 link on dorf3.php pages
				xLang['MTWASTED']				= 'ไร้ประโยชน์';
				xLang['MTEXCEED']				= 'มากมาย';
				xLang['MTCURRENT']				= 'Current load';
				xLang['ALLIANCEFORUMLINK']		= 'Link to external forum<br>(Leave empty for internal forum)';
				xLang['LOCKBOOKMARKS']			= 'ล็อคบุ๊คมาร์ค<br>(ซ่อนปุ่ม ลบ, เลื่อนขึ้น, เลื่อนลง, แก้ไข)';
				xLang['MTCLEARALL']				= 'ล้างทั้งหมด';
				xLang['UNLOCKBOOKMARKS']		= 'ปลดล็อคบุ๊คมาร์ค<br>(แสดงปุ่ม ลบ, เลื่อนขึ้น, เลื่อนลง, แก้ไข)';
				xLang['CLICKSORT']				= 'คลิกเพื่อจัดเรียง';
				xLang['MIN']					= 'ต่ำสุด';
				xLang['SAVEGLOBAL']				= 'แบ่งระหว่างหมู่บ้าน';
				xLang['VILLAGELIST']			= 'รายชื่อหมู่บ้าน';
				xLang['SHOWINOUTICONS']			= "แสดงลิ้งค์ 'dorf1.php' และ 'dorf2.php'";
				xLang['UPDATEPOP']				= 'ปรับปรุงประชากร';
				xLang['SHOWRPRINFOTOOLTIPS']	= 'แสดงระยะทางและเวลาไปถึงหมู่บ้านใน tooltips<br>(จุดรวมกำลังพล & รายงาน)';
				xLang['EDIT']					= 'แก้ไข';
				xLang['SHOWMESOPENLINKS']		= 'Show links to open messages in a pop-up';
				xLang['NPCOPTIONS']				= 'NPC Assistant options';
				xLang['NPCASSISTANT']			= 'Show NPC Assistant calculations/links';
				xLang['SHOWMAPTABLE']			= 'Show table of players/villages/occupied oasis';
				xLang['NEWVILLAGEAV']			= 'วันที่/เวลา';
				xLang['TIMEUNTIL']				= 'เวลาที่รอ';
				xLang['SHOWREPDELTABLE']		= 'แสดงตาราง "ลบทั้งหมด" บนหน้ารายงาน';
				xLang['SHOWIGMLINKFORME']		= 'แสดงไอคอน "ส่ง IGM"';
				xLang['CENTERMAP']				= 'ไปยังกลางแผนที่';
				xLang['SHOWCENTERMAPICON']		= 'แสดงไอคอน "ไปยังกลางแผนที่"';
				xLang['INETGPOPTION']			= 'Internet Graphic Pack';
				xLang['ALLOWINETGP']			= 'อนุญาตให้ใช้ Internet Graphic Packs';
				xLang['SENDTROOPS']				= 'ส่งกองกำลัง';
				xLang['SHOWBRSTATDETAILS']		= 'Show details in Report Statistics';
				xLang['SHOWBIGICONMISC']		= "พระราชวัง/ที่พักอาศัย/สถานศึกษา/คลังสมบัติ";
				xLang['PALACE']					= "พระราชวัง";
				xLang['RESIDENCE']				= "ที่พักอาศัย";
				xLang['ACADEMY']				= "สถานศึกษา";
				xLang['TREASURY']				= "คลังสมบัติ";
				break;
			}
		}

	// Lumber mine
	var lumberCost = [
		[0, 0, 0, 0, 0, 0],
		[40, 100, 50, 60, 1, 2],
		[65, 165, 85, 100, 1, 3],
		[110, 280, 140, 165, 2, 4],
		[185, 465, 235, 280, 2, 5],
		[310, 780, 390, 465, 2, 6],
		[520, 1300, 650, 780, 3, 8],
		[870, 2170, 1085, 1300, 4, 10],
		[1450, 3625, 1810, 2175, 4, 12],
		[2420, 6050, 3025, 3630, 5, 14],
		[4040, 10105, 5050, 6060, 6, 16],// Level 10
		[6750, 16870, 8435, 10125, 7, 18],
		[11270, 28175, 14090, 16905, 9, 20],
		[18820, 47055, 23525, 28230, 11, 22],
		[31430, 78580, 39290, 47150, 13, 24],
		[52490, 131230, 65615, 78740, 15, 26],
		[87660, 219155, 109575, 131490, 18, 29],
		[146395, 365985, 182995, 219590, 22, 32],
		[244480, 611195, 305600, 366715, 27, 35],
		[408280, 1020695, 510350, 612420, 32, 38],
		[681825, 1704565, 852280, 1022740, 38, 41],// Level 20
		[1138650, 2846620, 1423310, 1707970, 38, 44],
		[1901540, 4753855, 2376925, 2852315, 38, 47],
		[3175575, 7938935, 3969470, 4763360, 38, 50],
		[5303210, 13258025, 6629015, 7954815, 38, 53],
		[8856360, 22140900, 11070450, 13284540, 38, 56] // Level 25
	];

	// Clay mine
	var clayCost = [
		[0, 0, 0, 0, 0, 0],
		[80, 40, 80, 50, 1, 2],
		[135, 65, 135, 85, 1, 3],
		[225, 110, 225, 140, 2, 4],
		[375, 185, 375, 235, 2, 5],
		[620, 310, 620, 390, 2, 6],
		[1040, 520, 1040, 650, 3, 8],
		[1735, 870, 1735, 1085, 4, 10],
		[2900, 1450, 2900, 1810, 4, 12],
		[4840, 2420, 4840, 3025, 5, 14],
		[8080, 4040, 8080, 5050, 6, 16],// Level 10
		[13500, 6750, 13500 ,8435, 7, 18],
		[22540, 11270, 22540, 14090, 9, 20],
		[37645, 18820, 37645, 23525, 11, 22],
		[62865, 31430, 62865, 39290, 13, 24],
		[104985, 52490, 104985, 65615, 15, 26],
		[175320, 87660, 175320, 109575, 18, 29],
		[292790, 146395, 292790, 182995, 22, 32],
		[488955, 244480, 488955, 305600, 27, 35],
		[816555, 408280, 816555, 510350, 32, 38],
		[1363650, 681825, 1363650, 852280, 38, 41],// Level 20
		[2277295, 1138650, 2277295, 1423310, 38, 44],
		[3803085, 1901540, 3803085, 2376925, 38, 47],
		[6351150, 3175575, 6351150, 3969470, 38, 50],
		[10606420, 5303210, 10606420, 6629015, 38, 53],
		[17712720, 8856360, 17712720, 11070450, 38, 56] // Level 25
	];

	// Iron mine
	var ironCost = [
		[0, 0, 0, 0, 0, 0],
		[100, 80, 30, 60, 1, 3],
		[165, 135, 50, 100, 1, 5],
		[280, 225, 85, 165, 2, 7],
		[465, 375, 140, 280, 2, 9],
		[780, 620, 235, 465, 2, 11],
		[1300, 1040, 390, 780, 3, 13],
		[2170, 1735, 650, 1300, 4, 15],
		[3625, 2900, 1085, 2175, 4, 17],
		[6050, 4840, 1815, 3630, 5, 19],
		[10105, 8080, 3030, 6060, 6, 21],// Level 10
		[16870, 13500, 5060, 10125, 7, 24],
		[28175, 22540, 8455, 16905, 9, 27],
		[47055, 37645, 14115, 28230, 11, 30],
		[78580, 62865, 23575, 47150, 13, 33],
		[131230, 104985, 39370, 78740, 15, 36],
		[219155, 175320, 65745, 131490, 18, 39],
		[365985, 292790, 109795, 219590, 22, 42],
		[611195, 488955, 183360, 366715, 27, 45],
		[1020695, 816555, 306210, 612420, 32, 48],
		[1704565, 1363650, 511370, 1022740, 38, 51],// Level 20
		[2846620, 2277295, 853985, 1707970, 38, 54],
		[4753855, 3803085, 1426155, 2852315, 38, 57],
		[7938935, 6351150, 2381680, 4763360, 38, 60],
		[13258025, 10606420, 3977410, 7954815, 38, 63],
		[22140900, 17712720, 6642270, 13284540, 38, 66] // Level 25
	];


	// crop field
	var cropCost = [
		[0, 0, 0, 0, 0, 0],
		[70, 90, 70, 20, 1, 0],
		[115, 150, 115, 35, 1, 0],
		[195, 250, 195, 55, 2, 0],
		[325, 420, 325, 95, 2, 0],
		[545, 700, 545, 155, 2, 0],
		[910, 1170, 910, 260, 3, 1],
		[1520, 1950, 1520, 435, 4, 2],
		[2535, 3260, 2535, 725, 4, 3],
		[4235, 5445, 4235, 1210, 5, 4],
		[7070, 9095, 7070, 2020, 6, 5],// Level 10
		[11810, 15185, 11810, 3375, 7, 6],
		[19725, 25360, 19725, 5635, 9, 7],
		[32940, 42350, 32940, 9410, 11, 8],
		[55005, 70720, 55005, 15715, 13, 9],
		[91860, 118105, 91860, 26245, 15, 10],
		[153405, 197240, 153405, 43830, 18, 12],
		[256190, 329385, 256190, 73195, 22, 14],
		[427835, 550075, 427835, 122240, 27, 16],
		[714485, 918625, 714485, 204140, 32, 18],
		[1193195, 1534105, 1193195, 340915, 38, 20],// Level 20
		[1992635, 2561960, 1992635, 569325, 38, 22],
		[3327700, 4278470, 3327700, 950770, 38, 24],
		[5557255, 7145045, 5557255, 1587785, 38, 26],
		[9280620, 11932225, 9280620, 2651605, 38, 28],
		[15498630, 19926810, 15498630, 4428180, 38, 30] // Level 25
	];

	// Warehouse
	var warehouseCost = [
		[0, 0, 0, 0, 0,0],
		[130,160,90,40,1,1],
		[165,205,115,50,1,2],
		[215,260,145,65,2,3],
		[275,335,190,85,2,4],
		[350,430,240,105,2,5],
		[445,550,310,135,3,6],
		[570,705,395,175,4,7],
		[730,900,505,225,4,8],
		[935,1155,650,290,5,9],
		[1200,1475,830,370,6,10],					// Level 10
		[1535,1890,1065,470,7,12],
		[1965,2420,1360,605,9,14],
		[2515,3095,1740,775,11,16],
		[3220,3960,2230,990,13,18],
		[4120,5070,2850,1270,15,20],
		[5275,6490,3650,1625,18,22],
		[6750,8310,4675,2075,22,24],
		[8640,10635,5980,2660,27,26],
		[11060,13610,7655,3405,32,28],
		[14155,17420,9800,4355,38,30]					// Level 20
	];

	// Granary
	var granaryCost = [
		[0, 0, 0, 0, 0,0],
		[80,100,70,20,1,1],
		[100,130,90,25,1,2],
		[130,165,115,35,2,3],
		[170,210,145,40,2,4],
		[215,270,190,55,2,5],
		[275,345,240,70,3,6],
		[350,440,310,90,4,7],
		[450,565,395,115,4,8],
		[575,720,505,145,5,9],
		[740,920,645,185,6,10],						// Level 10
		[945,1180,825,235,7,12],
		[1210,1510,1060,300,9,14],
		[1545,1935,1355,385,11,16],
		[1980,2475,1735,495,13,18],
		[2535,3170,2220,635,15,20],
		[3245,4055,2840,810,18,22],
		[4155,5190,3635,1040,22,24],
		[5315,6645,4650,1330,27,26],
		[6805,8505,5955,1700,32,28],
		[8710,10890,7620,2180,38,30]					// Level 20
	];
	
	// Grain Mill
	var grainMillCost = [
		[0, 0, 0, 0, 0, 0], 			// Level 0
		[500, 440, 380, 1240,1,3],
		[900, 790, 685, 2230,1,5],
		[1620, 1425, 1230, 4020,2,7],
		[2915, 2565, 2215, 7230,2,9],
		[5250, 4620, 3990, 13015,2,11] // Level 5
	];

	// Brickyard
	var brickyardCost = [
		[0, 0, 0, 0, 0,0],
		[440, 480, 320, 50,1,3],
		[790, 865, 575, 90,1,5],
		[1425, 1555, 1035, 160,2,7],
		[2565, 2800, 1865, 290,2,9],
		[4620, 5040, 3360, 525,2,11] 				// Level 5
	];

	// Sawmill
	var sawmillCost = [
		[0, 0, 0, 0,0,0],
		[520, 380, 290, 90,1,4],
		[935, 685, 520, 160,1,6],
		[1685, 1230, 940, 290,2,8],
		[3035, 2215, 1690, 525,2,10],
		[5460, 3990, 3045, 945,2,12] 				// Level 5
	];

	// Iron foundry
	var ironFoundryCost = [
		[0, 0, 0, 0, 0,0],
		[200, 450, 510, 120,1,6],
		[360, 810, 920, 215,1,9],
		[650, 1460, 1650, 390,2,12],
		[1165, 2625, 2975, 700,2,15],
		[2100, 4725, 5355, 1260,2,18] 				// Level 5
	];

	// Bakery
	var bakeryCost = [
		[0, 0, 0, 0, 0,0],
		[1200, 1480, 870, 1600,1,4],
		[2160, 2665, 1565, 2880,1,6],
		[3890, 4795, 2820, 5185,2,8],
		[7000, 8630, 5075, 9330,2,10],
		[12595, 15535, 9135, 16795,2,12] 			// Level 5
	];
	
	//Great warehouse
	var greatWarehouseCost = [
		[0, 0, 0, 0, 0, 0,0],
		[650, 800, 450, 200,1,1],
		[830, 1025, 575, 255,1,2],
		[1065, 1310, 735, 330,2,3],
		[1365, 1680, 945, 420,2,4],
		[1745, 2145, 1210, 535,2,5],
		[2235, 2750, 1545, 685,3,6],
		[2860, 3520, 1980, 880,4,7],
		[3660, 4505, 2535, 1125,4,8],
		[4685, 5765, 3245, 1440,5,9],
		[5995, 7380, 4150, 1845,6,10],				// Level 10
		[7675, 9445, 5315, 2360,7,12],
		[9825, 12090, 6800, 3020,9,14],
		[12575, 15475, 8705, 3870,11,16],
		[16095, 19805, 11140, 4950,13,18],
		[20600, 25355, 14260, 6340,15,20],
		[26365, 32450, 18255, 8115,18,22],
		[33750, 41540, 23365, 10385,22,24],
		[43200, 53170, 29910, 13290,27,26],
		[55295, 68055, 38280, 17015,32,28],
		[70780, 87110, 49000, 21780,38,30]			// Level 20
	];

	//Great granary
	var greatGranaryCost = [
		[0, 0, 0, 0, 0, 0],
		[400, 500, 350, 100,1],
		[510, 640, 450, 130,1,2],
		[655, 820, 575, 165,2,3],
		[840, 1050, 735, 210,2,4],
		[1075, 1340, 940, 270,2,5],
		[1375, 1720, 1205, 345,3,6],
		[1760, 2200, 1540, 440,4,7],
		[2250, 2815, 1970, 565,4,8],
		[2880, 3605, 2520, 720,5,9],
		[3690, 4610, 3230, 920,6,10],				// Level 10
		[4720, 5905, 4130, 1180,7,12],
		[6045, 7555, 5290, 1510,9,14],
		[7735, 9670, 6770, 1935,11,16],
		[9905, 12380, 8665, 2475,13,18],
		[12675, 15845, 11090, 3170,15,20],
		[16225, 20280, 14200, 4055,18,22],
		[20770, 25960, 18175, 5190,22,24],
		[26585, 33230, 23260, 6645,27,26],
		[34030, 42535, 29775, 8505,32,28],
		[43555, 54445, 38110, 10890,38,30]			// Level 20
	];
	
	// Academy
	var academyCost = [
		[0, 0, 0, 0,0,0],
		[220, 160, 90, 40,5,4],
		[280, 205, 115, 50,6,6],
		[360, 260, 145, 65,7,8],
		[460, 335, 190, 85,8,10],
		[590, 430, 240, 105,10,12],
		[755, 550, 310, 135,12,15],
		[970, 705, 395, 175,14,18],
		[1240, 900, 505, 225,17,21],
		[1585, 1155, 650, 290,21,24],
		[2030, 1475, 830, 370,25,27], 				// Level 10
		[2595, 1890, 1065, 470,30,33],
		[3325, 2420, 1360, 605,36,36],
		[4255, 3095, 1740, 775,43,39],
		[5445, 3960, 2230, 990,51,42],
		[6970, 5070, 2850, 1270,62,45],
		[8925, 6490, 3650, 1625,74,49],
		[11425, 8310, 4675, 2075,89,53],
		[14620, 10635, 5980, 2660,106,57],
		[18715, 13610, 7655, 3405,128,61],
		[23955, 17420, 9800, 4355,153,65] 				// Level 20
	];

	// Armoury
	var armouryCost = [
		[0, 0, 0, 0,0,0],
		[130,210,410,130,2,4],
		[165,270,525,165,3,6],
		[215,345,670,215,3,8],
		[275,440,860,275,4,10],
		[350,565,1100,350,5,12],
		[445,720,1410,445,6,15],
		[570,925,1805,570,7,18],
		[730,1180,2310,730,9,21],
		[935,1515,2955,935,10,24],
		[1200,1935,3780,1200,12,27],					// Level 10
		[1535,2480,4840,1535,15,30],
		[1965,3175,6195,1965,18,33],
		[2515,4060,7930,2515,21,36],
		[3220,5200,10150,3220,26,39],
		[4120,6655,12995,4120,31,42],
		[5275,8520,16630,5275,37,46],
		[6750,10905,21290,6750,44,50],
		[8640,13955,27250,8640,53,54],
		[11060,17865,34880,11060,64,58],
		[14155,22865,44645,14155,77,62]				// Level 20
	];
	
	// Blacksmith
	var blacksmithCost = [
		[0, 0, 0, 0,0,0],
		[170,200,380,130,2,4],
		[220,255,485,165,3,6],
		[280,330,625,215,3,8],
		[355,420,795,275,4,10],
		[455,535,1020,350,5,12],
		[585,685,1305,445,6,15],
		[750,880,1670,570,7,18],
		[955,1125,2140,730,9,21],
		[1225,1440,2740,935,10,24],
		[1570,1845,3505,1200,12,27],					// Level 10
		[2005,2360,4485,1535,15,30],
		[2570,3020,5740,1965,18,33],
		[3290,3870,7350,2515,21,36],
		[4210,4950,9410,3220,26,39],
		[5390,6340,12045,4120,31,42],
		[6895,8115,15415,5275,37,46],
		[8825,10385,19730,6750,44,50],
		[11300,13290,25255,8640,53,54],
		[14460,17015,32325,11060,64,58],
		[18510,21780,41380,14155,77,62]				// Level 20
	];
	
	// Barracks
	var barracksCost = [
		[0, 0, 0, 0,0,0],
		[210,140,260,120,1,4],
		[270,180,335,155,1,6],
		[345,230,425,195,2,8],
		[440,295,545,250,2,10],
		[565,375,700,320,2,12],
		[720,480,895,410,3,15],
		[925,615,1145,530,4,18],
		[1180,790,1465,675,4,21],
		[1515,1010,1875,865,5,24],
		[1935,1290,2400,1105,6,27],					// Level 10
		[2480,1655,3070,1415,7,30],
		[3175,2115,3930,1815,9,33],
		[4060,2710,5030,2320,11,36],
		[5200,3465,6435,2970,13,39],
		[6655,4435,8240,3805,15,42],
		[8520,5680,10545,4870,18,46],
		[10905,7270,13500,6230,22,50],
		[13955,9305,17280,7975,27,54],
		[17865,11910,22120,10210,32,58],
		[22865,15245,28310,13065,38,68]				// Level 20
	];

	// Stable
	var stableCost = [
		[0, 0, 0, 0,0,0],
		[260,140,220,100,2,5],
		[335,180,280,130,3,8],
		[425,230,360,165,3,11],
		[545,295,460,210,4,14],
		[700,375,590,270,5,17],
		[895,480,755,345,6,20],
		[1145,615,970,440,7,23],
		[1465,790,1240,565,9,26],
		[1875,1010,1585,720,10,29],
		[2400,1290,2030,920,12,32],					// Level 10
		[3070,1655,2595,1180,15,36],
		[3930,2115,3325,1510,18,40],
		[5030,2710,4255,1935,21,44],
		[6435,3465,5445,2475,26,48],
		[8240,4435,6970,3170,31,52],
		[10545,5680,8925,4055,37,56],
		[13500,7270,11425,5190,44,60],
		[17280,9305,14620,6645,53,64],
		[22120,11910,18715,8505,64,68],
		[28310,15245,23955,10890,77,72]				// Level 20
	];

	// Workshop
	var workshopCost = [
		[0, 0, 0, 0,0,0],
		[460,510,600,320,4,3],
		[590,655,770,410,4,5],
		[755,835,985,525,5,7],
		[965,1070,1260,670,6,9],
		[1235,1370,1610,860,7,11],
		[1580,1750,2060,1100,9,13],
		[2025,2245,2640,1405,11,15],
		[2590,2870,3380,1800,13,17],
		[3315,3675,4325,2305,15,19],
		[4245,4705,5535,2950,19,21],					// Level 10
		[5430,6020,7085,3780,22,24],
		[6950,7705,9065,4835,27,27],
		[8900,9865,11605,6190,32,30],
		[11390,12625,14855,7925,39,33],
		[14580,16165,19015,10140,46,36],
		[18660,20690,24340,12980,55,39],
		[23885,26480,31155,16615,67,42],
		[30570,33895,39875,21270,80,45],
		[39130,43385,51040,27225,96,48],
		[50090,55535,65335,34845,115,51]				// Level 20
	];

	// Rally point
	var rallyPointCost = [
		[0, 0, 0, 0, 0, 0],
		[110,160,90,70,1,1],
		[140,205,115,90,1,2],
		[180,260,145,115,2,3],
		[230,335,190,145,2,4],
		[295,430,240,190,2,5],
		[380,550,310,240,3,6],
		[485,705,395,310,4,7],
		[620,900,505,395,4,8],
		[795,1155,650,505,5,9],
		[1015,1475,830,645,6,10], 					// Level 10
		[1300,1890,1065,825,7,12],
		[1660,2420,1360,1060,9,14],
		[2130,3095,1740,1355,11,16],
		[2725,3960,2230,1735,13,18],
		[3485,5070,2850,2220,15,20],
		[4460,6490,3650,2840,18,22],
		[5710,8310,4675,3635,22,24],
		[7310,10635,5980,4650,27,26],
		[9360,13610,7655,5955,32,28],
		[11980,17420,9800,7620,38,30] 				// Level 20
	];
	
	// Tournament square
	var tournamentSquareCost = [
		[0, 0, 0, 0,0,0],
		[1750,2250,1530,240,1,1],
		[2240,2880,1960,305,1,2],
		[2865,3685,2505,395,2,3],
		[3670,4720,3210,505,2,4],
		[4700,6040,4105,645,2,5],
		[6015,7730,5255,825,3,6],
		[7695,9895,6730,1055,4,7],
		[9850,12665,8615,1350,4,8],
		[12610,16215,11025,1730,5,9],
		[16140,20755,14110,2215,6,10],				// Level 10
		[20660,26565,18065,2835,7,12],
		[26445,34000,23120,3625,9,14],
		[33850,43520,29595,4640,11,16],
		[43330,55705,37880,5940,13,18],
		[55460,71305,48490,7605,15,20],
		[70990,91270,62065,9735,18,22],
		[90865,116825,79440,12460,22,24],
		[116000,150000,102000,15950,27,26],
		[149000,191000,130000,20415,32,28],
		[190560,245005,166600,26135,38,30]			// Level 20
	];

	// Great barracks
	var greatBarrackCost = [
		[0, 0, 0, 0, 0, 0],
		[630,420,780,360,1,4],
		[805,540,1000,460,1,6],
		[1030,690,1280,590,2,8],
		[1320,880,1635,755,2,10],
		[1690,1125,2095,965,2,12],
		[2165,1445,2680,1235,3,15],
		[2770,1845,3430,1585,4,18],
		[3545,2365,4390,2025,4,21],
		[4540,3025,5620,2595,5,24],
		[5810,3875,7195,3320,6,27],					// Level 10
		[7440,4960,9210,4250,7,30],
		[9520,6345,11785,5440,9,33],
        [12185,8125,15085,6965,11,36],
		[15600,10400,19310,8915,13,39],
		[19965,13310,24720,11410,15,42],
        [25555,17035,31640,14605,18,46],
		[32710,21810,40500,18690,22,50],
		[41870,27915,51840,23925,27,54],
		[53595,35730,66355,30625,32,58],
		[68600,45735,84935,39200,38,62]				// Level 20
	];

	// Great stable
	var greatStableCost = [
		[0, 0, 0, 0, 0, 0],
		[780,420,660,300,2,5],
		[1000,540,845,385,3,8],
		[1280,690,1080,490,3,11],
		[1635,880,1385,630,4,14],
		[2095,1125,1770,805,5,17],
		[2680,1445,2270,1030,6,20],
		[3430,1845,2905,1320,7,23],
		[4390,2365,3715,1690,9,26],
		[5620,3025,4755,2160,10,29],
		[7195,3875,6085,2765,12,32],					// Level 10
		[9210,4960,7790,3540,15,36],
		[11785,6345,9975,4535,18,40],
		[15085,8125,12765,5805,21,44],
		[19310,10400,16340,7430,26,48],
		[24720,13310,20915,9505,31,52],
		[31640,17035,26775,12170,37,56],
		[40500,21810,34270,15575,44,60],
		[51840,27915,43865,19940,53,64],
		[66355,35730,56145,25520,64,68],
		[84935,45735,71870,32665,77,72]				// Level 20
	];

	// City wall (Romans)
	var wallRomansCost = [
		[0, 0, 0, 0, 0, 0],
		[70, 90, 170, 70,1,0],
		[90, 115, 220, 90,1,0],
		[115, 145, 280, 115,2,0],
		[145, 190, 355, 145,2,0],
		[190, 240, 455, 190,2,0],
		[240, 310, 585, 240,3,1],
		[310, 395, 750, 310,4,2],
		[395, 505, 955, 395,4,3],
		[505, 650, 1225, 505,5,4],
		[645, 830, 1570, 645,6,5],					// Level 10
		[825, 1065, 2005, 825,7,6],
		[1060, 1360, 2570, 1060,9,7],
		[1355, 1740, 3290, 1355,11,8],
		[1735, 2230, 4210, 1735,13,9],
		[2220, 2850, 5390, 2220,15,10],
		[2840, 3650, 6895, 2840,18,12],
		[3635, 4675, 8825, 3635,22,14],
		[4650, 5980, 11300, 4650,27,16],
		[5955, 7655, 14460, 5955,32,18],
		[7620, 9800, 18510, 7620,38,20]				// Level 20
	];

	// Palisade (Gauls)
	var wallGaulsCost = [
		[0, 0, 0, 0,0,0],
		[160, 100, 80, 60,1,0],
		[205, 130, 100, 75,1,0],
		[260, 165, 130, 100,2,0],
		[335, 210, 170, 125,2,0],
		[430, 270, 215, 160,2,0],
		[550, 345, 275, 205,3,1],
		[705, 440, 350, 265,4,2],
		[900, 565, 450, 340,4,3],
		[1155, 720, 575, 430,5,4],
		[1475, 920, 740, 555,6,5],					// Level 10
		[1890, 1180, 945, 710,7,6],
		[2420, 1510, 1210, 905,9,7],
		[3095, 1935, 1545, 1160,11,8],
		[3960, 2475, 1980, 1485,13,9],
		[5070, 3170, 2535, 1900,15,10],
		[6490, 4055, 3245, 2435,18,12],
		[8310, 5190, 4155, 3115,22,14],
		[10635, 6645, 5315, 3990,27,16],
		[13610, 8505, 6805, 5105,32,18],
		[17420, 10890, 8710, 6535,38,20]				// Level 20
	];

	// Earth wall (Teutons)
	var wallTeutonsCost = [
		[0, 0, 0, 0,0,0],
		[120, 200, 0, 80,1,0],
		[155, 255, 0, 100,1,0],
		[195, 330, 0, 130,2,0],
		[250, 420, 0, 170,2,0],
		[320, 535, 0, 215,2,0],
		[410, 685, 0, 275,3,1],
		[530, 880, 0, 350,4,2],
		[675, 1125, 0, 450,4,3],
		[865, 1440, 0, 575,5,4],
		[1105, 1845, 0, 740,6,5],					// Level 10
		[1415, 2360, 0, 945,7,6],
		[1815, 3020, 0, 1210,9,7],
		[2320, 3870, 0, 1545,11,8],
		[2970, 4950, 0, 1980,13,9],
		[3805, 6340, 0, 2535,15,10],
		[4870, 8115, 0, 3245,18,12],
		[6230, 10385, 0, 4155,22,14],
		[7975, 13290, 0, 5315,27,16],
		[10210, 17015, 0, 6805,32,18],
		[13065, 21780, 0, 8710,38,20]					// Level 20
	];
	
	// Hero's mansion
	var herosMansionCost = [
		[0, 0, 0, 0,0,0],
		[700, 670, 700, 240,1,2],
		[930, 890, 930, 320,1,3],
		[1240, 1185, 1240, 425,2,4],
		[1645, 1575, 1645, 565,2,5],
		[2190, 2095, 2190, 750,2,6],
		[2915, 2790, 2915, 1000,3,8],
		[3875, 3710, 3875, 1330,4,10],
		[5155, 4930, 5155, 1765,4,12],
		[6855, 6560, 6855, 2350,5,14],
		[9115, 8725, 9115, 3125,6,16],				// Level 10
		[12125, 11605, 12125, 4155,7,18],
		[16125, 15435, 16125, 5530,9,20],
		[21445, 20525, 21445, 7350,11,22],
		[28520, 27300, 28520, 9780,13,24],
		[37935, 36310, 37935, 13005,15,24],
		[50450, 48290, 50450, 17300,18,27],
		[67100, 64225, 67100, 23005,22,30],
		[89245, 85420, 89245, 30600,27,33],
		[118695, 113605, 118695, 40695,32,36],
		[157865, 151095, 157865, 54125,37,39]			// Level 20
	];

	// Trapper
	var trapperCost = [
		[0,0,0,0,0,0],
		[100,100,100,100,1,4],
		[130,130,130,130,1,6],
		[165,165,165,165,2,8],
		[210,210,210,210,2,10],
		[270,270,270,270,2,12],
		[345,345,345,345,3,15],
		[440,440,440,440,4,18],
		[565,565,565,565,4,21],
		[720,720,720,720,5,24],
		[920,920,920,920,6,27],					// Level 10
		[1180,1180,1180,1180,7,30],
		[1510,1510,1510,1510,9,33],
		[1935,1935,1935,1935,11,36],
		[2475,2475,2475,2475,13,39],
		[3170,3170,3170,3170,15,42],
		[4055,4055,4055,4055,18,46],
		[5190,5190,5190,5190,22,50],
		[6645,6645,6645,6645,27,54],
		[8505,8505,8505,8505,32,58],
		[10890,10890,10890,10890,38,62]			// Level 20
	];
	
	// Main building
	var mainBuildingCost = [
		[0, 0, 0, 0, 0, 0],
		[70,40,60,20,2,2],
		[90,50,75,25,3,3],
		[115,65,100,35,3,4],
		[145,85,125,40,4,5],
		[190,105,160,55,5,6],
		[240,135,205,70,6,8],
		[310,175,265,90,7,10],
		[395,225,340,115,9,12],
		[505,290,430,145,10,14],
		[645,370,555,185,12,16],						// Level 10
		[825,470,710,235,15,18],
		[1060,605,905,300,18,20],
		[1355,775,1160,385,21,22],
		[1735,990,1485,495,26,24],
		[2220,1270,1900,635,31,26],
		[2840,1625,2435,810,37,29],
		[3635,2075,3115,1040,44,32],
		[4650,2660,3990,1330,53,35],
		[5955,3405,5105,1700,64,38],
		[7620,4355,6535,2180,77,41]					// Level 20
	];

	// Market place
	var marketplaceCost = [
		[0,0,0,0,0,0],
		[80,70,120,70,4,4],
		[100,90,155,90,4,6],
		[130,115,195,115,5,8],
		[170,145,250,145,6,10],
		[215,190,320,190,7,12],
		[275,240,410,240,9,15],
		[350,310,530,310,11,18],
		[450,395,675,395,13,21],
		[575,505,865,505,15,24],
		[740,645,1105,645,19,27], 					// Level 10
		[945,825,1415,825,22,30],
		[1210,1060,1815,1060,27,33],
		[1545,1355,2320,1355,32,38],
		[1980,1735,2970,1735,39,41],
		[2535,2220,3805,2220,46,44],
		[3245,2840,4870,2840,55,48],
		[4155,3635,6230,3635,67,52],
		[5315,4650,7975,4650,80,56],
		[6805,5955,10210,5955,96,60],
		[8710,7620,13065,7620,115,64] 				// Level 20
	];
	
	// Embassy
	var embassyCost = [
		[0, 0, 0, 0, 0, 0],
		[180,130,150,80,5,3],
		[230,165,190,100,6,5],
		[295,215,245,130,7,7],
		[375,275,315,170,8,9],
		[485,350,405,215,10,11],
		[620,445,515,275,12,13],
		[790,570,660,350,14,15],
		[1015,730,845,450,17,17],
		[1295,935,1080,575,21,19],
		[1660,1200,1385,740,25,21],					// Level 10
		[2125,1535,1770,945,30,24],
		[2720,1965,2265,1210,36,27],
		[3480,2515,2900,1545,43,30],
		[4455,3220,3715,1980,51,33],
		[5705,4120,4755,2535,62,36],
		[7300,5275,6085,3245,74,39],
		[9345,6750,7790,4155,89,42],
		[11965,8640,9970,5315,106,45],
		[15315,11060,12760,6805,128,48],
		[19600,14155,16335,8710,153,51]				// Level 20
	];

	// Cranny
	var crannyCost = [
		[0, 0, 0, 0, 0, 0],
		[40,50,30,10,1,0],
		[50,65,40,15,1,0],
		[65,80,50,15,2,0],
		[85,105,65,20,2,0],
		[105,135,80,25,2,0],
		[135,170,105,35,3,1],
		[175,220,130,45,4,2],
		[225,280,170,55,4,3],
		[290,360,215,70,5,4],
		[370,460,275,90,6,5]						// Level 10
	];

	// Townhall
	var townhallCost = [
		[0, 0, 0, 0,0,0],
		[1250,1110,1260,600,6,4],
		[1600,1420,1615,770,7,6],
		[2050,1820,2065,985,9,8],
		[2620,2330,2640,1260,10,10],
		[3355,2980,3380,1610,12,12],
		[4295,3815,4330,2060,15,15],
		[5500,4880,5540,2640,18,18],
		[7035,6250,7095,3380,21,21],
		[9005,8000,9080,4325,26,24],
		[11530,10240,11620,5535,31,27],				// Level 10
		[14755,13105,14875,7085,37,30],
		[18890,16775,19040,9065,45,33],
		[24180,21470,24370,11605,53,36],
		[30950,27480,31195,14855,64,39],
		[39615,35175,39930,19015,77,42],
		[50705,45025,51110,24340,92,46],
		[64905,57635,65425,31155,111,50],
		[83075,73770,83740,39875,133,54],
		[106340,94430,107190,51040,160,58],
		[136115,120870,137200,65335,192,62]			// Level 20
	];

	// Residence
	var residenceCost = [
		[0, 0, 0, 0,0,0],
		[580,460,350,180,2,1],
		[740,590,450,230,3,2],
		[950,755,575,295,3,3],
		[1215,965,735,375,4,4],
		[1555,1235,940,485,5,5],
		[1995,1580,1205,620,6,6],
		[2550,2025,1540,790,7,7],
		[3265,2590,1970,1015,9,8],
		[4180,3315,2520,1295,11,9],
		[5350,4245,3230,1660,12,10],					// Level 10
		[6845,5430,4130,2125,15,12],
		[8765,6950,5290,2720,18,14],
		[11220,8900,6770,3480,21,16],
		[14360,11390,8665,4455,26,18],
		[18380,14580,11090,5705,31,20],
		[23530,18660,14200,7300,37,22],
		[30115,23885,18175,9345,44,24],
		[38550,30570,23260,11965,53,26],
		[49340,39130,29775,15315,64,28],
		[63155,50090,38110,19600,77,30]				// Level 20
	];

	// Palace
	var palaceCost = [
		[0, 0, 0, 0,0,0],
		[550,800,750,250,6,1],
		[705,1025,960,320,7,2],
		[900,1310,1230,410,9,3],
		[1155,1680,1575,525,10,4],
		[1475,2145,2015,670,12,5],
		[1890,2750,2575,860,15,6],
		[2420,3520,3300,1100,18,7],
		[3095,4505,4220,1405,21,8],
		[3965,5765,5405,1800,26,9],
		[5075,7380,6920,2305,31,10],					// Level 10
		[6495,9445,8855,2950,37,12],
		[8310,12090,11335,3780,45,14],
		[10640,15475,14505,4835,53,16],
		[13615,19805,18570,6190,64,18],
		[17430,25355,23770,7925,77,20],
		[22310,32450,30425,10140,92,22],
		[28560,41540,38940,12980,111,24],
		[36555,53170,49845,16615,133,26],
		[46790,68055,63805,21270,160,28],
		[59890,87110,81670,27225,192,30]				// Level 20
	];

	// Treasury
	var treasuryCost = [
		[0, 0, 0, 0,0,0],
		[2880,2740,2580,990,10,4],
		[3685,3505,3300,1265,12,6],
		[4720,4490,4225,1620,14,8],
		[6040,5745,5410,2075,17,10],
		[7730,7355,6925,2660,20,12],
		[9895,9415,8865,3400,24,15],
		[12665,12050,11345,4355,29,18],
		[16215,15425,14525,5575,34,21],
		[20755,19745,18590,7135,41,24],
		[26565,25270,23795,9130,50,27]				// Level 10
	];

	// Trade office
	var tradeOfficeCost = [
		[0, 0, 0, 0,0,0],
		[1400,1330,1200,400,4,3],
		[1790,1700,1535,510,4,5],
		[2295,2180,1965,655,5,7],
		[2935,2790,2515,840,6,9],
		[3760,3570,3220,1075,7,11],
		[4810,4570,4125,1375,9,13],
		[6155,5850,5280,1760,11,15],
		[7880,7485,6755,2250,13,17],
		[10090,9585,8645,2880,15,19],
		[12915,12265,11070,3690,19,21],				// Level 10
		[16530,15700,14165,4720,22,24],
		[21155,20100,18135,6045,27,27],
		[27080,25725,23210,7735,32,30],
		[34660,32930,29710,9905,39,33],
		[44370,42150,38030,12675,46,36],
		[56790,53950,48680,16225,55,39],
		[72690,69060,62310,20770,67,42],
		[93045,88395,79755,26585,80,45],
		[119100,113145,102085,34030,96,48],
		[152445,144825,130670,43555,115,51]			// Level 20
	];

	// Brewery (not in T3)
	var breweryCost = [
		[0,0,0,0,0,0],
		[1200,1400,1050,2200,1,6],
		[1535,1790,1345,2815,1,9],
		[1965,2295,1720,3605,2,12],
		[2515,2935,2200,4615,2,15],
		[3220,3760,2820,5905,2,18],
		[4125,4810,3610,7560,3,22],
		[5280,6155,4620,9675,4,26],
		[6755,7880,5910,12385,4,30],
		[8645,10090,7565,15855,5,34],
		[11070,12915,9685,20290,6,38],			// Level 10
		[14165,16530,12395,25975,7,42],
		[18135,21155,15865,33245,9,46],
		[23210,27080,20310,42555,11,50],
		[29710,34660,25995,54470,13,54],
		[38030,44370,33275,69720,15,58],
		[48680,56790,42595,89245,18,63],
		[62310,72690,54520,114230,22,68],
		[79755,93045,69785,146215,27,73],
		[102085,119100,89325,187155,32,78],
		[130670,152445,114335,239560,38,83]		// Level 20
	];

	// Stonemason
	var stonemasonCost = [
		[0,0,0,0,0,0],
		[155,130,125,70,1,2],
		[200,165,160,90,1,3],
		[255,215,205,115,2,4],
		[325,275,260,145,2,5],
		[415,350,335,190,2,6],
		[535,445,430,240,3,8],
		[680,570,550,310,4,10],
		[875,730,705,395,4,12],
		[1115,935,900,505,5,14],
		[1430,1200,1155,645,6,16],				// Level 10
		[1830,1535,1475,825,7,18],
		[2340,1965,1890,1060,9,20],
		[3000,2515,2420,1355,11,22],
		[3840,3220,3095,1735,13,24],
		[4910,4120,3960,2220,15,26],
		[6290,5275,5070,2840,18,29],
		[8050,6750,6490,3635,22,32],
		[10300,8640,8310,4650,27,35],
		[13185,11060,10635,5955,32,38],
		[16880,14155,13610,7620,38,41]				// Level 20
	];

	//World wonder
    var wwCost = [
		[0, 0, 0, 0,0,0],
		[66700, 69050, 72200, 13200,0,1],
		[68535, 70950, 74185, 13565,0,2],
		[70420, 72900, 76225, 13935,0,3],
		[72355, 74905, 78320, 14320,0,4],
		[74345, 76965, 80475, 14715,0,5],
		[76390, 79080, 82690, 15120,0,6],
		[78490, 81255, 84965, 15535,0,7],
		[80650, 83490, 87300, 15960,0,8],
		[82865, 85785, 89700, 16400,0,9],
		[85145, 88145, 92165, 16850,0,10], 			// Level 10
		[87485, 90570, 94700, 17315,0,12],
		[89895, 93060, 97305, 17790,0,14],
		[92365, 95620, 99980, 18280,0,16],
		[94905, 98250, 102730, 18780,0,18],
		[97515, 100950, 105555, 19300,0,20],
		[100195, 103725, 108460, 19830,0,22],
		[102950, 106580, 111440, 20375,0,24],
		[105785, 109510, 114505, 20935,0,26],
		[108690, 112520, 117655, 21510,0,28],
		[111680, 115615, 120890, 22100,0,30],		// Level 20
		[114755, 118795, 124215, 22710,0,33],
		[117910, 122060, 127630, 23335,0,36],
		[121150, 125420, 131140, 23975,0,39],
		[124480, 128870, 134745, 24635,0,42],
		[127905, 132410, 138455, 25315,0,45],
		[131425, 136055, 142260, 26010,0,48],
		[135035, 139795, 146170, 26725,0,51],
		[138750, 143640, 150190, 27460,0,54],
		[142565, 147590, 154320, 28215,0,57],
		[146485, 151650, 158565, 28990,0,60], 		// Level 30
		[150515, 155820, 162925, 29785,0,64],
		[154655, 160105, 167405, 30605,0,68],
		[158910, 164505, 172010, 31450,0,72],
		[163275, 169030, 176740, 32315,0,76],
		[167770, 173680, 181600, 33200,0,80],
		[172380, 178455, 186595, 34115,0,84],
		[177120, 183360, 191725, 35055,0,88],
		[181995, 188405, 197000, 36015,0,92],
		[186995, 193585, 202415, 37005,0,96],
		[192140, 198910, 207985, 38025,0,100], 		// Level 40
		[197425, 204380, 213705, 39070,0,105],
		[202855, 210000, 219580, 40145,0,110],
		[208430, 215775, 225620, 41250,0,115],
		[214165, 221710, 231825, 42385,0,120],
		[220055, 227805, 238200, 43550,0,125],
		[226105, 234070, 244750, 44745,0,130],
		[232320, 240505, 251480, 45975,0,135],
		[238710, 247120, 258395, 47240,0,140],
		[245275, 253915, 265500, 48540,0,145],
		[252020, 260900, 272800, 49875,0,150],		// Level 50
		[258950, 268075, 280305, 51245,0,156],
		[266070, 275445, 288010, 52655,0,162],
		[273390, 283020, 295930, 54105,0,168],
		[280905, 290805, 304070, 55590,0,174],
		[288630, 298800, 312430, 57120,0,180],
		[296570, 307020, 321025, 58690,0,186],
		[304725, 315460, 329850, 60305,0,192],
		[313105, 324135, 338925, 61965,0,198],
		[321715, 333050, 348245, 63670,0,204],
		[330565, 342210, 357820, 65420,0,210],		// Level 60
		[339655, 351620, 367660, 67220,0,217],
		[348995, 361290, 377770, 69065,0,224],
		[358590, 371225, 388160, 70965,0,231],
		[368450, 381435, 398835, 72915,0,238],
		[378585, 391925, 409800, 74920,0,245],
		[388995, 402700, 421070, 76985,0,252],
		[399695, 413775, 432650, 79100,0,259],
		[410685, 425155, 444550, 81275,0,266],
		[421980, 436845, 456775, 83510,0,273],
		[433585, 448860, 469335, 85805,0,280], 		// Level 70
		[445505, 461205, 482240, 88165,0,288],
		[457760, 473885, 495505, 90590,0,296],
		[470345, 486920, 509130, 93080,0,304],
		[483280, 500310, 523130, 95640,0,312],
		[496570, 514065, 537520, 98270,0,320],
		[510225, 528205, 552300, 100975,0,328],
		[524260, 542730, 567490, 103750,0,336],
		[538675, 557655, 583095, 106605,0,344],
		[553490, 572990, 599130, 109535,0,352],
		[568710, 588745, 615605, 112550,0,360],	// Level 80
		[584350, 604935, 632535, 115645,0,369],
		[600420, 621575, 649930, 118825,0,378],
		[616930, 638665, 667800, 122090,0,387],
		[633895, 656230, 686165, 125450,0,396],
		[651330, 674275, 705035, 128900,0,405],
		[669240, 692820, 724425, 132445,0,414],
		[687645, 711870, 744345, 136085,0,423],
		[706555, 731445, 764815, 139830,0,432],
		[725985, 751560, 785850, 143675,0,441],
		[745950, 772230, 807460, 147625,0,450],	// Level 90
		[766460, 793465, 829665, 151685,0,460],
		[787540, 815285, 852480, 155855,0,470],
		[809195, 837705, 875920, 160140,0,480],
		[831450, 860745, 900010, 164545,0,490],
		[854315, 884415, 924760, 169070,0,500],
		[877810, 908735, 950190, 173720,0,510],
		[901950, 933725, 976320, 178495,0,520],
		[926750, 959405, 1000000, 183405,0,530],
		[952235, 985785, 1000000, 188450,0,540],
		[1000000, 1000000, 1000000, 193630,0,550], 		// Level 100
        ];

	var buildingCost = new Array();
	buildingCost[0] = lumberCost;
	buildingCost[1] = clayCost;
	buildingCost[2] = ironCost;
	buildingCost[3] = cropCost;

	buildingCost[5] = sawmillCost;
	buildingCost[6] = brickyardCost;
	buildingCost[7] = ironFoundryCost;
	buildingCost[8] = grainMillCost;
	buildingCost[9] = bakeryCost;
	buildingCost[10] = warehouseCost;
	buildingCost[11] = granaryCost;
	buildingCost[12] = blacksmithCost;
	buildingCost[13] = armouryCost;
	buildingCost[14] = tournamentSquareCost;
	buildingCost[15] = mainBuildingCost;
	buildingCost[16] = rallyPointCost;
	buildingCost[17] = marketplaceCost;
	buildingCost[18] = embassyCost;
	buildingCost[19] = barracksCost;
	buildingCost[20] = stableCost;
	buildingCost[21] = workshopCost;
	buildingCost[22] = academyCost;
	buildingCost[23] = crannyCost;
	buildingCost[24] = townhallCost;
	buildingCost[25] = residenceCost;
	buildingCost[26] = palaceCost;
	buildingCost[27] = treasuryCost;
	buildingCost[28] = tradeOfficeCost;
	buildingCost[29] = greatBarrackCost;
	buildingCost[30] = greatStableCost;
	buildingCost[31] = wallGaulsCost;
	buildingCost[32] = wallRomansCost;
	buildingCost[33] = wallTeutonsCost;
	buildingCost[34] = stonemasonCost;
	buildingCost[35] = breweryCost;
	buildingCost[36] = trapperCost;
	buildingCost[37] = herosMansionCost;
	buildingCost[38] = greatWarehouseCost;
	buildingCost[39] = greatGranaryCost;
	buildingCost[40] = wwCost;

	// Training cost for each unit (4), load capacity (1), attack power (1), def power infantery (1), def power cavalery (1), speed (1) - for normal servers, crop consumption(1)
	// Def and crop of nature from http://www.kirilloid.ru/travian
	var uc = new Array();

	// Romans
	uc[1] = [120,100,180,40,40,40,35,50,6,1]; 			// Legionnaire
	uc[2] = [100,130,160,70,20,30,65,35,5,1];			// Praetorian
	uc[3] = [150,160,210,80,50,70,40,25,7,1]; 			// Imperian
	uc[4] = [140,160,20,40,0,0,20,10,16,2]; 			// Equites legati
	uc[5] = [550,440,320,100,100,120,65,50,14,3];		// Equites imperatoris
	uc[6] = [550,640,800,180,70,180,80,105,10,4];		// Equites cesaris
	uc[7] = [900,360,500,70,0,60,30,75,4,3];			// Battering ram
	uc[8] = [950,1350,600,90,0,75,60,10,3,6];			// Fire catapult
	uc[9] = [30750,27200,45000,37500,0,50,40,30,4,5];	// Senator
	uc[10] = [5800,5300,7200,5500,3000,0,80,80,5,1];	// Settler

	// Teutons
	uc[11] = [95,75,40,40,60,40,20,5,7,1];				// Club swinger
	uc[12] = [145,70,85,40,40,10,35,60,7,1];			// Spearman
	uc[13] = [130,120,170,70,50,60,30,30,6,1];			// Axeman
	uc[14] = [160,100,50,50,0,0,10,5,9,1];				// Scout
	uc[15] = [370,270,290,75,110,55,100,40,10,2];		// Paladin
	uc[16] = [450,515,480,80,80,150,50,75,9,3];			// Teutonic knight
	uc[17] = [1000,300,350,70,0,65,30,80,4,3];			// Ram
	uc[18] = [900,1200,600,60,0,50,60,10,3,6];			// Catapult
	uc[19] = [35500,26600,25000,27200,0,40,60,40,4,4];	// Chief
	uc[20] = [7200,5500,5800,6500,3000,10,80,80,5,1];	// Settler

	// Gauls
	uc[21] = [100,130,55,30,30,15,40,50,7,1];			// Phalanx
	uc[22] = [140,150,185,60,45,65,35,20,6,1]; 			// Swordsman
	uc[23] = [170,150,20,40,0,0,20,10,17,2];			// Pathfinder
	uc[24] = [350,450,230,60,75,90,25,40,19,2]; 		// Theutates thunder
	uc[25] = [360,330,280,120,35,45,115,55,16,2];		// Druidrider
	uc[26] = [500,620,675,170,65,140,50,165,13,3];		// Haeduan
	uc[27] = [950,555,330,75,0,50,30,105,4,3];			// Ram
	uc[28] = [960,1450,630,90,0,70,45,10,3,6];			// Trebuchet
	uc[29] = [30750,45400,31000,37500,0,40,50,50,5,4];	// Chieftain
	uc[30] = [5500,7000,5300,4900,3000,0,80,80,5,1];	// Settler
	
	// Nature's
	uc[31] = [0,0,0,0,0,10,25,20,0,1];			// Rat
	uc[32] = [0,0,0,0,0,20,35,40,0,1];			// Spider
	uc[33] = [0,0,0,0,0,60,40,60,0,1];			// Snake
	uc[34] = [0,0,0,0,0,80,66,50,0,1];			// Bat
	uc[35] = [0,0,0,0,0,50,70,33,0,2];			// Wild boar
	uc[36] = [0,0,0,0,0,100,80,70,0,2];			// Wolf
	uc[37] = [0,0,0,0,0,250,140,200,0,3];		// Bear
	uc[38] = [0,0,0,0,0,450,380,240,0,3];		// Crocodile
	uc[39] = [0,0,0,0,0,200,170,250,0,3];		// Tiger
	uc[40] = [0,0,0,0,0,600,440,520,0,5];		// Elephant

	// Natarian
	uc[41] = [0,0,0,0,0,0,0,0,0,0];				// Pikeman
	uc[42] = [0,0,0,0,0,0,0,0,0,0];				// Thorned warrior
	uc[43] = [0,0,0,0,0,0,0,0,0,0];				// Guardsman
	uc[44] = [0,0,0,0,0,0,0,0,0,0];				// Birds of prey
	uc[45] = [0,0,0,0,0,0,0,0,0,0];				// Axerider
	uc[46] = [0,0,0,0,0,0,0,0,0,0];				// Natarian knight
	uc[47] = [0,0,0,0,0,0,0,0,0,0];				// Warelephant
	uc[48] = [0,0,0,0,0,0,0,0,0,0];				// Ballista
	uc[49] = [0,0,0,0,0,0,0,0,0,0];				// Natarian emperor
	uc[50] = [0,0,0,0,0,0,0,0,0,0];				// Settler

	// Other..Demons?
	uc[51] = [0,0,0,0,0,0,0,0,0,0];
	uc[52] = [0,0,0,0,0,0,0,0,0,0];
	uc[53] = [0,0,0,0,0,0,0,0,0,0];
	uc[54] = [0,0,0,0,0,0,0,0,0,0];
	uc[55] = [0,0,0,0,0,0,0,0,0,0];
	uc[56] = [0,0,0,0,0,0,0,0,0,0];
	uc[57] = [0,0,0,0,0,0,0,0,0,0];
	uc[58] = [0,0,0,0,0,0,0,0,0,0];
	uc[59] = [0,0,0,0,0,0,0,0,0,0];
	uc[60] = [0,0,0,0,0,0,0,0,0,0];

	uc[98] = [20, 30, 10, 20, 0];			// trap
	uc[99] = [20, 30, 10, 20, 0];			// trap

	//Speed for the market Merchants
	var mts = new Array();
	mts['Romans']	= 16;
	mts['Gauls']	= 24;
	mts['Teutons']	= 12;
	
	var imgPrefix = 'data:image/gif;base64,';
	var imgPrefixPNG = 'data:image/png;base64,';

	var image = new Array();		// base64 coded images included in script

	// Image for the "Send IGM" link
	image["igm"] = imgPrefix + 'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAICAYAAAAvOAWIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QsKFws6qttDxQAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAkUlEQVQY05XQTUpDQRAE4K8yz9BuPEduEH8C2Tw8haeT3CQbPZEiIeNmhLdIAvamqerqaqqDdxxwcr0mvAWv+MYHfi4I13hErXCuqmOSp9batFS11qYk26o64gzzmCXJPsl64DvskYHn1cKo995PvfdnPOBl5OjLa/PY3qEGtxm9Bh/MfwG/8Hkj4Bb3+c/rfgHKwRzhskmMfQAAAABJRU5ErkJggg==';
	//Image for the open IGM
	image["igmopen"] = imgPrefix + 'R0lGODlhCwAPAPcAAEBAQAAm/4CAgP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAACwAPAAAIRwAHABhIkOAAgQcTHgSwcECAhw8RSlQokSHEiAwnKsxo8SLCgRQXAhAgwKFHkiVLKkypUuWAljBRHiT5kiJLlysFjETJU2dAADs=';
	//Image to replace the block_b21.gif
	image["blockheader"] = imgPrefix + 'R0lGODlhuAEpAPcAAP///wEBAhYXFwMIEhIREFBdaz4/Oh0eHGt8k3GCk2x7jSgyOyIqNDlGVYeKjQkTGouKh3F9lP///RgjLC0uKWtraZOWmmmBjSYnJlxdXVdmd1hXWEVRXUlHNlxvgIuMiy86R/39/f3//2+In5aZnIKCgg0MCWuClkFMVwoWL215hmR1hSQkGpCNiIiHhVVYWfz++n5+fvr+/niCinKEmjU0K3eIlru8u1NVWHd8hGZxeMTFxk9MRDc3N2RlZJWVlmN0ijExMmV8m/z3+rm4uYuNkGt1i7KyrLOys/f29bW2t4OIg8C8ib7Bwufq6mZ7lGV8jWp9meDg4f37+niFnf7+/m1zlfT082V3kP/+/dzc22Nrduzs66yojHiLn8LCwr+/wE1PTXh6eqCfoImGi8/Q0fr6+QIRBJqWlQ4NB+Pj4//9//38/vHy8vr69amqpqSkoaaqrc/Rze/u7ZudoXR1d62wqtXUy/78+xApEc3Mz3l2ce3u8I2RitLR0ZiWmniEk9TU0/X+/djX15aYlYF/ea6xskZHRWFdUMvFlZycm8G/wpCPkZqalWpqanp6dKWlo4J+g1JSUrW3scPDu+bl5/79/w4ODIeHc+fo5aurq2NtgWtpVszMy1dURoCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAC4ASkAQAj/AGHIEERQBIBBEAgECPDgAYEJGSYBABACgAwZIsxMGTJkIoAySFrEiFHiiB6KIULAEIhRI0ePIEWSNIlSJcuMGztOjDmy5MmUNi/ifLkzZE+aQFcKdanzo9GZP1MqbZkT5lOfNacObcoTatabTK3KxJoUbNWiY5FKNUvUadqoQam27Up27dKzbo/C1RoWrd6vd+deVRt3q9i/ZS/K5Tp4L1vGb796nDwxS4YACyJEiLJggAkBBASIHk069IABRhBE0HA6dGjRr2MTMI1aNesBrkfHhj1bwOnUq1uD1g2bN23gt3MXHw6692/bwl8zl30cOm7m0437rh38uvTdzat3/1eePfx25NGJT3fOPTl28LPFu/++PP556+Ths0fvXT31++O9V99++Am4HoEB0ncggPP5x9tyAXgUAAMBrADFBTYEQAFlHE5URQWYJRDFBSlg0GGHbHwY4oglnshhiiAuICKJJro4GYwr0mjjjSrKyGKNOwKAo486BilkjzO2aOSQSQK5I5M/GnlkjE1KCWWRQV6pZJZIRrlkl1g+CeaWYo7ppI1anukiG5OVEOFEAcQwmSEMTKABIDPowEEQGGDQgAozDPDmZEo8wMAKNEQAwgR58NDBGQbkMEEAY3RY6KGJLtroo5FOWimHlyKqKKOOQioppZYaKqqmpXaKKqiqZv9KKqenfkpZqLJuaqqnqWI6qq6u2kporL+2Wmuvq86666u3EssqrbzC6uuzywrrEa7FQsvssNMqGyyyuRobbbPdAnssuNlWiy6137Y5aAAlSCnvvPTWa++9+Oar77789uvvvwAHLPC/bkoY78AIJ6zwwgw37PDDEEfMb8ETTcGmFgQwoMIJUQhhBQinBTDABA1sgcFCKKP8QAEInDACEA1w0EADKOgwAwop58wQyy7DLDPNNuOss8o8vxzzzDXfPDTRLRv9c9JCL71y0z4jHfTSC03d89FAK4211k5b7bXURVfdddRDg2021FjvTDXXbH9dNtxXy/3203WTfbfYaOv/rDbdY6c9N96BC7732W3/TXjfKH8y2UIFXBAFApNSYqQEpymgeQED7CAv5gNorgDnnksJuuikf5755p2rHjrrpV+++uitmz576ra/TnvsQZ4Ou+uo1y677rgPHzzvO/q+O/C/537858oX3/vtws9LMQAmFLIGzhpccAEKD1RQiQs9GGBAD4VIwaEDAWiQgAINBLDEZEnsyL778MtPv/3tvx///B6pn43u5z/9BZB/+Pvf/gbYv/wBcCICdBEBHbhACTZQgQdkYAINCEEEFvCBAIjgiSaIwQ5q8IMVHOEFORhCD1Iwgxbc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';
	//Image to replace the underline.gif
	image["underline"] = imgPrefix + 'R0lGODlhFwAQAIABAODg4AAAACH5BAEAAAEALAAAAAAXABAAQAIVjI+py+0Po5y02ouz3rxjAIbiSIIFADs=';
	//Image for the delete Button
	image["delButton"] = imgPrefix + 'R0lGODlhLAASAPcAAAAAAH/YFL4gHL0pK7RDO7lVWMkZC8oYDc4cDMwXE9YEANAYCtEcDdcfDNwVCdoYCtkZDN4ZCtwaCtgbG8wjFcwkHNsgA9AgFNUiFNAgHdMlGtonG9ooGsspJ88pIMssLsI7Lsc1N9s5L9A7O+YfDeEZGewxD+M8EPY9APg0AOEkJOg+Puc+QPNfHehOKOFFPuRNOfdvHOxhJMBMSdRTU95lTOJMSORZRIrdIZPhLJ7mOanrRrTwU7/1X8f5as78ctD9dNH9epeXl6atmwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAsABIAAAj/AP/9E0KwoMGDCBMqNChw4BAgECNKhBikYkWKF4FYnMhxiBCHHEOKHEnSoxCSEglYmIGyJUSCLoFwiJGiA0cBC2K+PCkyiMQgIlyY+CCxggGOPkfC1BnkRYkRED0gCJlUJMEfWLNmDaL1B1esKhIcoNB1a1mtBH2oXcu2LdsVChi4nTuXYI+7ePPqxctiAg0bGPYK3kuQh+HDiBMbhrEhhGEIGhRLTkxwh+XLmDPvuHECBOYHFzSLxkxQh+nTqFPXaNGgQGoHElLLTk0wh+3buHPLQDEgt+0IvoPfJoijuPHjyElkQM68eXOCQwJIn069uvXr2Kl7dJi9u3fs2wUuBhxPfrzAgAA7';
	image["delButton35"] = imgPrefix + 'R0lGODlhLQAUAPcAAAAAAHHQAL4gHL0pK7lVWMkZC8oYDc4cDMwXE9YEANAYCtEcDdcfDNwVCdoYCtkZDN4ZCtwaCtgbG8wjFcwkHNsgA9AgFNUiFNAgHdMlGtonG8spJ88pIMssLsI7Lsc1N9s5L9A7O+YfDeEZGewxD+M8EPY9APg0AOEkJOg+Puc+QPNfHehOKOFFPuRNOfdvHOxhJMBMSdRTU95lTOJMSORZRMrKyszMzM/Pz9LS0tjY2Nra2tzc3ODg4OLi4uTk5OXm5Obm5ufn5+jo6Onp6evr6+zs7O3t7e7v7e/v7/Hx8fPz8/T09PX19fb29vf39/j4+Pn5+fr6+vz8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAtABQAAAj/AP8J/BegoMGDCBMqXBhg4MCCViJKnEixosWLVgo+xMixI0cqDQl6HEnSypOGAaqoXMmyZZUKMVzKnFmFipMjBWtS2cmzZ88XJzb4pCJAwdCjVJoIKUhlitOnUKOCYEGiA1QKBaJqhcrkR0GnUsKKHStlytgWI0KE5XCgLNm3YpX4KCglCpS7ePNCsasXBQIDE+7y1UsYSpIeBe0+Wcy48RMojp+kSLCAMeTImA8XhOKkiefPoJt0Bq1CggwaFzyPDs26iRHEAZ4wWUK7tu0ls2u70PCB9oMMuG8Lr12ER8EmS5QoX85cSXLlNUp4YO7AwvPm2JUQ2VGQiZIk4MOLkU/yPcmMFQwIjG8QYbz78EN0FFSCxIj9+/iN1DcCw8SA/PZBAOCARfyQQ0FHFEHEggw2SISCRIiAgYMMQkihgz/ocCBBQwQBRBAghhhih0B8KKKIJJ4oIhA97IBDSAH0wMOMNNbIg4w25ohjjjRqeMMNIREUQA44/GjkkT8SieSSTP5ogw0aOSQkQ1RWiZBDAQEAOw==';
	//image for the Travian World Analyser links
	image["globe"] = imgPrefix + 'R0lGODlhDAANAPcAAAAAAAVrEwB0CgB4DQB7DQByHwplPQF+MRZlNxJwOQdcRAZYagRkTwFuTRhiUAFjditgawM/pQBHmxVHlx9UgwFApwNGqABGrQJJrwBQtQBUuwBevBJCpxREqRdFqxdWsgFrpQB1tAF4uitcgShOtCJXtjdXpDddvjhXuDtdvTxltQBcwgBrzQFuzQ1oxxxsxRV41EFdiUdemkRerVxsk1lsmkZxvgGCNiSoLDSxLgGGQQGETAGJWQyTcB6beD6NdSWkfky/LEK3RljFNWfNRWzPQ2LKU2/QVHTTan7YdQGAjQiHjw2Xgx6KnQKIoQiEohyilTazjQGJyQKD3AaS2AGG7QmY5BKe+xehxzSd6DCw+meBkHqJmHKQmHaIqnmGo06Qz0mj3kq+/nam2nbNrGfL13rU1JyisqOotKistqW6va6yuYir1pWnwY3YkIjcq4LStZDhkZPhpJ3mpJzlrqTpoqTjtpvV0p3K66rL0qHZ0KLH5qfjzabow7XwxQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAMAA0AAAifAP8J/McHDpk7AwfaeSMnyRAgWfAMdINkjh86RqBMaZLnnx4hReLU6VMGi5MDP/6F8RGEyBEzYqzwIJBADYwnOHJE0XJFyo0CBrq4aLGkBxMqVZQMCOBgy4sVLETo2BECBAMEELiAwaBhQwMBDzJYGBEDzZ4PFS4sUCAhAgcTNASOKdGBwgQPJFDIWDOQjQ0VJ1LMqJEmocA2Xr6cSRgQADs=';
	//Image for the market function "Use them" proportional
	image["usethempr"] = imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAntJREFUSEuVlU1ME1EQx1dOHD169OjRo0eP3rTGLV5Mjdui3lCaQEy01bAtfiDRlIgEwbYkxBAwVVGCgZqI8WsNcjBNlYMJoYRaWNq1ZVtWVv6bvGa7fbv7mOSlzb7Z/29m3szbA5yLtQnR43DZbeGMXztr2eXeYa9VUz/F4zdVN92G/ZO+0MGuWyNjiYm5yvLvnIyluxjxm3z1Yfua+HSa9905xAQ9I0ROTL5YyGvav5obxGn/9ZxUuHClP+AI7RZHn6ys5l2zYQ2kIJe2eu6Pp6jQQOeDc+t5eZNVjNWvXFH/Xu4aCDdAUe+Xs1/W7ERyuZwuSZKezWapLtjDsrOPUmbjdLt4pA4N3x2b0TSNemapVEoXBMEQFEVRDwaDTboej0dHUE52e2Bi0QD6fKFWdJadM8TMZhUnwbiVeGZeUtH9HObMqe2tQGRJyheLxXQsFgPDmGneHz1fLJUVpwwJQFEUnQSAZ7Ty2umo1Zrq9Uc69oCRS3udVHaKEsJYKB8axwzGe25NA58dTdvhBbGbw6Dvd/aQJcBoFPxPp9N6MpmsZ08Lfm1d3vK2i6c4jMT8+++OGZoFkCnEYcjY3J14TvasUDDq113f4FSG5eDJiBBfa0OR0aFpDSXe/KnPIe/vOfpt6VfBCQoxKwDZmLvUmjHRw5Hh6Bpum6uh4XuVbZXarTgvwGjlAhAgLFTAavgI3OhNTDXdp7gA+oeeL1WrNdtLgKXsZh/A4s/eZoyBpxmgndcfP8z8XJH3K271RxmRmS3MHIDX33vs0ej06sLnHwramRW+sVkqfl3MFkfGZ4tNZ8byNW67GD2M2eED0TDL8gbEsw1fBQrkP6+jTExmIuLUAAAAAElFTkSuQmCC';
	//Image for the market function "Use them" equal
	image["usethemeq"] = imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAflJREFUSEtjZCAAwpPbHUBK/jExgGlcgOkfwwGQHMefHycWLmz8QchcFHn/+HqB8qZ5Sxat3vvtzoNn70H4PwEAU7d2y9HvVa0LtobGd0kQZWlIcpvH2k1HXv358/cXIUvwyW/be+ZNUmF/Kl5LK1rnz3389BVB3xDrkDfvP31o6Vu+EaulqcUTY1++ev+OWMOIVff1248vmeVTG1AsBYX35l2nnhNrCKnqjp+5/jYorVUDbmlD95Idf/78oSjOCDmic+rq82AL4+PrOUApi5AGSuV37DvzA5T6GUD5jJhkP2XKlP9nzpzBijdu3Pj/5s2beN0EsgOcp0NT2hM+fvr6mZAPAgMD/9vY2ODEIMfgAz9+/voRltJWALSwLQOYkr4SsvDzZ4JuwmvE7z9/focmt1YwgDI6MXmP0iB9/vL9h7C01gAGUJbYd/gCQR9SGqQgO+DFXe+MdddpHaSzFm1/Dc+HoSktBmcv3n5DyFJy5UFRBoo6lNKmqH5Oz7fvPyhLGVhcBKoE6joWrcMoT0EFQP+s9Rd//vxFtUIAZNnClbuvgzM8NgCytLh25qTrtx5TXGOAghHkM5yWITsgLKXDYvr8rU+PnLz6GZSciY27t+8+fTx9/ubHect3fcSIM2Jq4/D0dgVQ3glNbW8gBoeltkag1ApYLAEAIKtp4+xd+jMAAAAASUVORK5CYII=';
	//Image for the market function "Use them" 1 hour production
	image["usethem1h"] = imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAA8FJREFUSEudlUtsG2UQx01PPXLkyJEjR46coPQCQjjlgoJIUtITLRWkQoIEVCflWYFUAVEfJKpUoZICgUBUlAqJIkobmkdBVuq68Wu9tnfX6/V6n971n5kPOfL60USMtLI8+3l+8/jP54diu9ihkZkn+UhrX0x8DrJ9rdiv/G5/4N6Ym3vX3S1u5P2zw5MPT7x3/uL85RX7Xqao84NdrH1u4cffnbcSXy3Fhz94ZE/QF0amDywsXq8EQeh3Mnzfh240IFd05IsaspKKgqyhrNbQsBy0WmEkpZ9WVtVXjp0eeyD0ROLCubxEETssDANUdR3ZfAkFqYJyWYWqaNAUFUpFRVGuIEPvJPq0bTsCVfV67eQnl77vCx07/ulL5Ype7fxFMwgooILtrARN0+HZFkLXRmA16DHFZ+jY5Lchl1SktyXqghmBWrbbODJxZioC5X7/cPWm3Hmy1QIUzaDsZXiOg3q9TnAZDaOGgMBNhhLMNk2Uya8pClRKKp2lM9TiTvtjNak9fzjx2A506sOLy0EQRGbmek1kCxXU9BpavicC5wsScvkCfAK2PBeuZWErlcbt9Q1oqgoaJM1XodmqCDnjDnv/zOU1ARwentzPyuoWoWE6YjauWUeTAFyN2yDRyGWRhGs7oqJCsQSTkmmLpkotvU9V+n4zEnL52qrL6o/xnvWTvW5YAugxkNonoK6DkKrNFSvYTKZQNxs9y1IzLaQzNIYuIDPETsdHZ1426qSALmvYHrZzJZqZge8WvgE1A/dTdxE2faFGnapkXzabjfyypFSRKZRBaxXxu57vDo1OHyXg9DgpyeoGBmEIqVTFa0ePIXnnjgi+nb6HkJTLs2LrBtqOR6Ipgtahp3JSfDM+kjgR40Xv3r32advxhXBk2r3/gmcigdi3uLiI8fFxPHPwIJaWVyhJDZxst8llvTZ0OPFcjFfi2m/rPRXuQF1f3CgcfH3zb9iOC78ZUMsC4XvjzQlKSMPsuTk89fSBnla24zBj57r7+IsryZ6UOhycMQe/dXtTyD5HN05OUoTvxs01VOh629pKie+DbHb+Z2VnD+OjJx//ayNFizTY+gmk08fiGQTkkfHoIrfN65NnP6J29ai1ncL/BfKfwDun5q/03Kd8AZye/XbD8/zIJcCg7qe9CrtVyLC5r39JioXvZww9/vaXnyXv5vUHtXcv77iNXNlAWGcCQ6Onnvj8wpJ0/c9/TJbzXgB8RqvWjVtrW8b5S1eNnpn1LbHLeejVmUd5d+JjM1N7eYbGEi9G/hX6QP4F7nAoMfND3esAAAAASUVORK5CYII=';
	//Image to replace the OK button (in english only !)
	image["buttonOK"] = imgPrefix + 'R0lGODlhMgAUAMQfANHzpLbEoPb/5NH9eo7eLe390tb8iOb+t/L+2979oNv9lLPqa6HkScPwg+j8w9z4se39zKnmWrTwU6nrRr/1X878csf5ap7mOZPhLIrdIYLaGHHQAH/YFMDAwND9dP///yH5BAEAAB8ALAAAAAAyABQAAAX/4Pd1ZGmeaKqunTgGXizP9GDb8Z3jdB8HrQ7M5zMojkeDMblUGAZEGrATrRkSh2w2gd12DwkFtBojkXPXQ0HARjjUAjfcnRiTzef0esPfICACfAV7Gw51Zx54VQMKcHwQCHwIgX6Ub2KIilGMB5QQB4B8lJ5gBoiJHRWqq6yqnJZZo32SYAOtt6skFru8vbyNkYVYwcGzhgO+ybwkFM3Oz84GD8EOD9OSj9QAA9DdziQS4eLj4g0ABYIPDpTU6BsFDw0U5PThJBP4+fr5FOYQkpbcWRPYQMK+g/hIXFjIsCFDBgvMOZj1AMDEDQAs8gHQgIHDjwtJYBhJsmTJCxEWVmRc2UBlxpYsI1wwSXMkiQw4c+rcSQDigp8LIjBIGXToT487k+YkoaGp06dQmxKYOhUnVatVo2ptSiIAh69gw4odS7asWQ5AXpxdy3ZtWhEs4sqdKyIEADs=';
	//Image to replace the Save button 
	image["buttonSave"] = imgPrefix + 'R0lGODlhUAAUAPcAAAAAACAwQDAwYDA4cDBAQEA4cFBQUFBYcFBgcBA4oDA4oCBAoCBIsDBAoDBIsDBQsEA4gEBAgEBIkFBIkEBAoEBIsFBQoFBQsFBYsGBYsGBogGlqjmB4gHB4kEBQwFBYwFBgwGBgwGBowGBg0GBo0HBo0HBw0HB40HB44H/YFHCAkIB40IB44ILaGIrdIZPhLJ7mOanrRrTwU7/1X8f5as78ctD9dJeXl6atm4CA4ICI8JCI4JCI8JCQ4JCQ8JCQ/6CY4KCY/7C4wKCg8KCg/6Co8LCo8LCo/7Cw8LCw/7C48LC4/8C4/8DA0MDI0MDI4MDA/8DQ4NDY8NDg8ODg8ODo8PDw8PD4/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAABQABQAAAj/AP/9u0GwoMGDCBMqXMiwIUOBA3HYmEixosWLGDNq3MgxI44bETuKHEmy5MWPN0ySVKIECRIjQ4D06LEjx4oTJlSOJKhTJBIoP7AIHYrlyocMGXp25Kl0408eRIVeseJBAIamG5lixVgESo6oU6s8YGFha0atZisOgYKCaFgpDkyUTWuRYI27ePPq3cs3LxAoJoa+jbKAhIW+iBPrJUijsePHkCNLftwDCgmpVqpIifIkQYgJk0OLhkxwhunTqFOrXo16B5MlI0B88PDAwQLPHySw3s07NUEZwIMLH068uPAcSZIQ8aEjBwsTJUJ8uCDBuPXrwwnG2M69u/fv4Luvujiy/ID5Awg0TK8QIbz7994JwphPv779+/jrn1iu4wAAAlJMwUEFFVAQQX4IJmgfQS806OCDEEYo4YMmBNHcAQR0QEUVKjRAQQMQTCjiiBAS5MKJKKao4oospliCDzkwEIAQQjThhAENNKBAAS326KOKBLUg5JBEFmnkkURuIAIGFjQ5gQQSRAABBAUMgOSVWBZJEA4pdOnll2CGKeaYZJZpZpkfRXTmmmy26eaXaQrk0Jx01mknQgIFBAA7';	
	image["buttonSave35"] = imgPrefix + 'R0lGODlhUAAUAPcAAAAAACAwQDAwYDA4cDBAQEA4cFBQUFBYcFBgcBA4oDA4oCBAoCBIsDBAoDBIsDBQsEA4gEBAgEBIkFBIkEBAoEBIsFBQoFBQsFBYsGBYsGBogGlqjmB4gHB4kEBQwFBYwFBgwGBgwGBowGBg0GBo0HBo0HBw0HB40HB44HHQAHCAkIB40IB44ICA4ICI8JCI4JCI8JCQ4JCQ8JCQ/6CY4KCY/7C4wKCg8KCg/6Co8LCo8LCo/7Cw8LCw/7C48LC4/8C4/8rKyszMzM/Pz8DA0MDI0NLS0tjY2Nra2tzc3MDI4MDA/8DQ4NDY8NDg8ODg4OLi4uTk5OXm5Obm5ufn5+jo6Onp6evr6+zs7O3t7e7v7e/v7+Dg8ODo8PDw8PHx8fPz8/T09PX19fb29vf39/D4//j4+Pn5+fr6+vz8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAABQABQAAAj/AP8J/JeioMGDCBMqXMiwocOEAwcWZEOxosWLGDNq3MixI8aCEj2KHEmy5EU1KQSmMDnShw8ePHTcoBEjxosWK06YYOmRTMoUa4IKHUq0qNGhPJbMyFjmQ4YMR6NKDapmTJaCa9Ro3cq1q9evW5PCwFjGiwcBGMCqXbtVDJWCatLInUu3rt27c3MsaXGxbJcHLCzgHUx4bpgoBeWiWcy4sePHkNGkubEEhUW/TRyYsBC5s2fGX6AURHPGjOnTqFOrXm3mDI0lOyliZrKAhAXWuHOf3vKkYGkywIMLH068OBkzMZaQkO2lSxMmShKEmGC8uvXgvAuaGSOmu/fv4MOL/xcz5gWQHyNAfPDwwMEC6R8kjJ9P3zuW3inIhAHDv7///wAGCEYYLfTQAw4yuNACCyaUEMIHF0gg4IQU9ndFEgWJAcYXHHbo4YcghvgFGCvsgOABKB6AgAYQVhCBiDDG2KEVSBQUxhdb5Kjjjjz26OMWX5yAoAsHAEBAE05wUEEFFETw45NQ6ljFEQV9oQUWWGap5ZZcdomFFibUoOABBHTARRcqNEBBAxB46eabWF4RhREFZXGFFXjmqeeefPZpxRUlyNACAwHYYAMRRRjQQAMKFODno5DiGcURdBJUxRRSTKHppppmyumnoGpaxQYiYGDBqRNIIEEEEEBQwACehkka66azfirFE0gMkRJBTyTh66/ABivssEn0Suyvxh6r7LCUCiHErgSlYMQQzlZr7bXYZuvstNp26623QQQBUkTRPmTuueimG1FAADs=';

	//Image for the ally (Thank you, CuPliz13 & onetmt !)
	image["alliance"] = imgPrefix + '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';
	image["alliance_gs"] = imgPrefix + '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';
	//Image for the market big icon(Thank you, CuPliz13 & onetmt!)
	image["mercado"] = imgPrefix + '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';
	image["mercado_gs"]  = imgPrefix + 'R0lGODlhRgBkAOdkAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEAAPwALAAAAABGAGQAAAj+APkJHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzpk2GhDz9Yobt3DlRouJo6UULU01PzOz9W9qvXS9CinbhoiSI3tJ3v4y2dCQN39J9+PCZKyZIES5iwoQpU9TLHr59S+39IpQSk7d/YMOGFeWoEytjwAIDE4arqt63S6XRJenobr/D+Eo5woVLmODLxvqkgxy2nz9mi0HS6vf48LNKTR79EsaKleXLrEVx1tvvnqePhM7941wMyhc5bPigJXb5siBxs8PCZQZxi/Pn0J8Typf38LUkX/gEkvOFFfHigY3+sSpVL3nYf+eiq4dur7379/be6a6uV5wWNoj4IArE5hFg8MT8QokW2ph3nj3MdAPfggy+9847u0GWTjOEULFffoF8oYgyxQlDTC6UfEFIOwYqh6A3Dbr34IosyhehXumI4sYROmwRSCCI3LHdHasNRlxrlMhBCCvLrOOWgf3I5U2LLaZ412HalMKGD1RQYYQPNdyB4R1mePdhLqxMSUUTUFDSiy6/qHNkcv9gdU6KTD6ITT/VFZOEDk1U2QSVW8ih335bUKJMLqUg8kUNRjQxghZamFEJNLT8QqJ5/ZyjyzlxZuoNaXrl48oNN0BhxBZHNIHjjTfywccWXG7RhAz+ENTwhQq0lGKGDma4Uowr3JTHpjTMYMqkN8QWi4039OHzKS2UREEIIfihmt8dfIzQgQ9NfLGFFGZQ0gQhdhRDiBdJeFGKK5Imt88+tDBT7LvweiNNaYe5EsY2lASaiBmI9IshH2zI0IQcclASByFH9LuqKIS4IooMOVCiCy3q4MNML/kcts85rhwLLyYgg+zIOckqGwYzVozghhtf3CFHvy4jMmUTbHDCyRYidOCFHWxsp8WzbvDsCCGUQHHEEW64sllntBAScsjMRB31Ly/W6wYlNNDgggs+yIAnqvz5sAUfpQSigwsdlLLMuIhwEsjPorCBTDGieHGEEVMcoQX+Lea89Y5OUgc+NYSzlQIFG1lDccMLOuhQA7+BAOxDwYUKQQMLbBAihBaUlFIKJX1AQQgzy/wyihsuGEGFFka40Xc/v6AieOBUc9YOOpUYMQINI7BwhAxGsBHihXKM4AMirCBiwggvKDoFJ6VAz4kZEMiyDOlzQRFFEkfcYMQ2fgM+e7DJnhPGznewwYMROPjAb6FT+Fu8D18EwokRX1BCCdmcUIKIHDiQQQdGJ4xeFMMOUBACJYxBCCiA7y2ucMX4dEGv+oRBBTo4XoaM0LlA+I8NcYADIrZQAx+MYARbgF70EPHBJrAAeCNwgTCw4QkvqCAHQfAEPpqhhQfug4b+O5ldBfGRj15sQQdUEIIMRpCf6PWPD6Zwhh2a8AIW9M4SLpBBzT4XiCYEEAc4eMEIdOAMaUSBBx0YgQko0Q5zmOGB+LCHJ9oVNWxgQxrnGCI+SEGFMGhBBxDoAMA8R4k7EEIW4JCHJ1wwgiRYwhh2qEIHjGAoGcgAB0aogQhcQAhnEGILbDBDDV7QgSMQIhE9pI0raCENO9qRGZxhRjNKsTkqCMIIo7pD2cxgiXFUwxngYIcwTBEmITzLDjlIIy6NwIMjOKIX4MCFDnLAgzuECIw8aIIZzqGXfTADFa10pS6qRgtXjCMaQIMWG1gwhTiMAhvg6MY5urGMcbADH9L+SAInzyENN7ChAzUooR2wwY5zsEMZbHBDGHQwBRyZgRNaiAJylOMNTPDEY9KoWjSwYYx6yqMbYTBCAu0wDXzQEJHxBMc4zlENwhh0Gt2QRTK3cAt8SNET52iESJ1xC7v5KRB28EQvvKEXOf6iWNJ4kl6c0g1nCKMbdiyFJRIpDJ754AWyYIc0nFENaYxjHNJwhCgsUQpjOMMT25CHLNwghCS4wQq4ZINKb2EHLWCiK+cQRlFR8QuPuatq+KAHPYrRSmEkEhzgEEYSmKmCKFACH/GEKjuM4UGpJK8U7GAHNrbgBUdsoRNu6AAngflRXNhRGNd4R706Rqxg6REfsnj+Ri/s2Q1pRNODRsCCEKLQi4/WUzGtyUVajEGHW7BjGVHowxZkwIMamEAIy+hFTxCrDGVcgx4aowU4vXEO186GFt64xjaUIY1uHNcNiDCDILYAgSNQwqvTKEYgcGGMtAgjF4EQBjtWEYdOvCoHI4AAdIEJjpb2wh2c2UfsetLdd5RsH7oYhznKwYxo8JOribBCG5LQBFxqARXnGIclHjGeXZSiD4TABj0dYYlOrM8HdpDFOQqMWm+MkzOwQwWDf+FgHP+iHOaY8DiYcYueyAILgnAsIjosA0LANgnMMMY1hMEGGVcjmKawgxdcsAV50JgZ1yhHOX5Rsn4wwxN4fIf+uKoghTa7uQpCcHObt0CIaCxjFS4wwRYE0TYS6kAQdiCEPNgxaEKsAhXC+OWVx7EKwz6FDXIWApvlLIUqUAIVS3qHNMyhRwWrg0XwcEc6ilENXUxmGpTgjwyEIIQaLaMb3RBGFFQAATZUQ57O6IU0bqEMbcADHitCBzJKho/YZRqPerxHMcjx62YD+xziKEYZC2uHJAgiCb0zgheiAGARCMEOWpWFMJxxDXE4u9njaEbJ7hHBTB8LsG9hBjfO/et3uOMcxejFMrAhj2iwAQs8MIMZxpSoO3wBCZVgR6yXYYx00PvX2ygQZ+yBClpg6h7nUOph7mEObaSoHvVwRzH+lOEMYxhjnWb4XL84wQozeAIb40jHkuCRomxMSmN/47F7MjqbeEgjRe8xh65jzYZAfY4SnJBDwm+RFKC3Bxr1uAdnzmHRd9yjPcyA9z3ygYx3uKcZJg+7yZtRj3SMQxlPxYQb+BMHQRDCGOO4Rj3aU41U2N1I72lHMzLGGWlgAhvvwcZbEpyNcbQHHsbQheIXr/h4HP4ado6muJdxjXTMY+72WEcqIMH5XmC+PeEYx2zkgtP2xGVTo89GP/7RDsa7HkJL8Yc9xLENaaTjFtrwx1J2v3k72KHzu+8HNqQOmX3kXCm7/wc24P2Wa8TDH+gYhesVPwp0JH/3VfiHP3T+n/ze+973kKjGVYg6m4pKAy7JH35y5tGNfZRjFKSIv/xJMYpzcD/52b++P3oBCUb5Xwu/Vw370CvJkRW6cX32gHoJxg3v8H7x9wmkAIH0Z3/X9w/5l3y9UFf/93/hFw7zMBt/owv1UIH/cH6zcXXWEA6j8Aks2IKfUH33h33J1w/VUFdMsIGMcoOQsA7JEVZzQoI+QWz4sA7LMAqXcIRIeAmkQIHXd4H/UINMEIVSOIVRqAWQIA+c8Q6ogAqwV4H90BXJkQ+goQhkWIaKQArmEINLcYH9YAdMQARwSIVUqAWp8IFFFVZdkXzwQSzEdg/hABVmSIaEYHgLIgXusQ7+GxiHRCCFG+grYfE3IAYfs0MLqtUpo3CJo0CGgrCJmyiIpEAIoxA4QiA1unAHYHCKWvCGiwiHWpAFYHAHd7CERTUXEiQ4FYgghzEPisCJvNiLgsAHZZEPMrgU5lAUlJAIYQCHyriIfaA/ElMOYZGAjkCJ/7B6uxcnraQX5iAKqoIHqvKN4OiNfCAK3tBsUoBuzPALv0AKybiMzEgLxYAM1kAi8eEJf5cpcfILJIMP4cAKhIAHABmQAjkHAEkIqJAN5ths7oAO5jAOutCOy8gEfRAO79AOjncP70ALjhAs+Mgk58Bj+KAOAsIGeDAHJnmSJ4kHbOAIEVZv5+hs7zD+DrSQBUSwAztQk3DYB+igFxhJIRbXkXHiDTxWD+FgamwwB2yQlEp5lJkzCsjADebwaVLwDupgDt6QDdKwDDNpk1x5kzpZVBTiCpkGlEyCDfrIfk2jkkuplNPIDeggL88ADUIADdBADeHQDvZwD8eQBV1pk0TQBxWDkaDhCtlAlvholpiCDa4ALWPQmI2ZObLQDXa4LvtQBftAJ3pRD3vZlzapkxj5C46gY4bZkd5AC9fQDtKACjzjmJnTMfFAfHohBZwxD8cwBZy5A32AKU3TMaMJlDa2DOTADKfjmHaACtRgdZwhm5ChmbbJmX0ADZ7gCEdlmA5hD9LASsXgCW7jMAZugArQ0A6weRjKeRj1cA13sATomZ5XkAg5IQ3v0BH4IJSyIAuY4AiegAzrEJ7iOXHe4ApD8yzQAkq6QFQgYQ/QiQlO+SbmMZ48qQ7L4AqoMAqOkJSEoAvo0A8i0Q/rEDuuAA1vop9hwaBhcQ/zMGT+6TS/IJkmgQ/vcA3aJUHY8CB5+RaWGUcPwk+/YI9z5J74oBJJgqNbiAqrpI5CoI4Qao+YgAq6gEf2gKEusQ/xIS/pSAu0wAarFCk8sSRNahNQuiLmsCLtcQ83MaZkWqZmeqZomqZquqZs2qZu+qYIERAAOw==';
	//Image for the first military big icon (Thank you, CuPliz13 & onetmt !)
	image["militar"] = imgPrefix + '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';
	image["militar_gs"] = imgPrefix + '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';
	//Image for the big icon bar - military 2 - blacksmith/armoury/townhall/hero's mansion(Thank you, CuPliz13 & onetmt !)
	image["militar2"] = imgPrefix + 'R0lGODlhRgBkAPcAAAAAAP///8zMzPj4+Pb29u/v7+7w7+bm5t7e3hccK1FYYo+gsGxyd8rW39Tg6a64wFNkcMTR2r7K0nqFjKm0u7O+xbjDyp6orpGanzU5O1lfYoWNkZC5zURTWWNqbZCXmomUmJmhpKWusXN+gUpOTz9ERPX29vP09Onq6svMzO3v7uTm5ePl5OLk48rMy+3w7pCUkOzv7OLj4t/g37O0s6qrqouQiYeLhbe5tpWakqu2o1txQ+3x6c3QylFSUPX29Ovs6ujp59rb2dDRz8fIxp65f+jv4MXTsuHp1t7h2tvf1K+/kFRgOtjfyVNUUfT18vP08fDx7m1+R73JoM/WvpGcc9LWyJ+qf+Tm3oaQZnd6bczOxb3BrpaahVFTSKmtl660fra4plRVTeDi0aGjjW1uXoSFdcfIuGNjViEhHd/f2Ojo4u7u6e/v7FVVVPf39vb29fX19Nzc29fX1o6LVYOAUFxbSpqWYr+7iZ6beKqnh7KmOqagZdDIhnp2VTAvJrWylZWHKLirUVZSM8S7e7OrcOHXkf3yqI6KbGxpUpGOd+3JBte5E7iiHcKtJuPMOqOUNp+SSGhhN3RtQfDkm2lkRltXPk5LOIWAYv32zebgvOvEAde0BOrFCO7JCuvHCuXBCd+9CsWnCfPODOfEC+/LDerGDPbRDurHDenGDeLADdq5DNGyDOzJDuvIDurHDunGDufFDuXDDrmdC6yTDqGJEI14DsmtF31tH9/ER97IYH91RLevhsjBndLLqL64mODZtfbux1xLCGVTC3RtUI17PH1rLywnFlNIKD44JnBbJ0Q0D2tSGyMbCl9MIBIPCJNsIY1eC39VDH1UDINYDW9MDGZFC3dSD4tiFnVUFlU9EJVgBotZBsZ+C3pOB35RCIFUCXRLCIJVCntRCptmDahuD4ZZDLd6EYFWDal2H+qUGIQ2KUhHR/7+/v39/fv7+/f39/Hx8e3t7efn5+Xl5d3d3djY2NLS0sTExL6+vp6enpiYmFlZWVNTU1BQUP///yH5BAEAAP8ALAAAAABGAGQAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzpk2GN/TlE2Bv3rwa8xDYE0BjH0FjMPUJINAuQAB37t690wIVqtM4Z4qlK1eMpQ0uiNpgYTOgrNkB/c4OyLo1nVszH5VZUybJ4D4EAQjcoYNpjNqyac2q0FLOrdtzdATc6HjNHDhp2ej+s4HXXVlEdzCp+YvWbJR9FYoVNpxOzzvFGpmBo0ZNmjhw4LJN+nIGyIA3ZM5E4dx5QBAbHyR0IUf6HLZ87gjow7hrHDpp0NFRmyauejVlebgAwvKDd2AYHi5U/5BgrNy5cuSccSkw4F0AARD5yZ+PJts41tSeS88vLb84dM4Mkod3ZcUjwgMSNPDFNuRgckMGJpwVwDxoFHOLJ6zsMt+G8hHgoYdPYPLNNNKYsx9rz/UnDTreGEPIIFSUBc+M7bnxTlkiXIBgA13UQMEEGcxjFgFj8HILJLtE8okofMDx4ZNPvsEFOOOQqN9+0GUpTTh8FMKHJWugMAc+ONBAQwZm4vCBCBJU0IADFmAAQQLsrXGGIIyMwgoIFDzgSCezjAGlhwUUWoAaynyzIn/oNNofidOg800xhPARyTKY0JAPEUMIMQMJMwgxxIMXSJDgBZgUg8segjiySiillP9yCwYV+NkJJ70YquuTeXjzqDmtTcOodCuGU4wxARKCTA9AFBDPCXH0E8cJ8cDwBwMRtBmJKKEscsooo7gCyyulNIKBBQ80EgooggwwqKFcXONca6xJI2xr0VEzDjPGNAPAMYTQUQkQBhRsgD8GX6ABCA5IoEctmIixyyqevGJxK6sYs0Cft3ziyR5r6KqrPJOEA46JVvaHL3TUiFNNIYU8AwAylSKjh8EHF6xCCA80YEEEgtiyQQkjFBNKKxeHUosiD1zQiCej3NKEyAUggEA9ZEyiTDXfNHolOikb28cdAAAwCCGE+HHMGVYjwE7b+lBgwc97FFPJIJUQQ0spFrv/IgsrtECyByuulLJKL20nbvUXd+xlDNfm2DvdivZew0elADxD8x3JNOOHEFa/bbU+IljQAA615NBmF4ngYgrSFqeSCiidIN0KKYUojsA+vJthSB3JVFLHJMyE819045izTCJ50BH8IINcMkgiZvC+TwbWjyDCeFwEomMIFERAhiiljPuKK+j3LQsokVhvvQDwk2EIH808wwcd+DNTDTiNOjfJHYlAQxnQ4AU7SGIQZoAf/EqgQBhcwHRfKEYFMEACDUjgAXsABStgl75XtCIUnHAEDhRIQgGQgRJ0OEYzDHGHYwyCDrvQXzi+oYw7VOISUpBEHSSxC0l4oQskZIcC/z8AvgbkoRgU2MAIEhCCCESCE6KABfpkEQtXnI8VqgiFIkqowC+w8BjP6AP9AECMQtRheM6owx3KoAUtlMEMZYgjH7aoQHakAH4fEI8FEOEHDIyAAQAIjh5EoQpZoE8Vq7Di+UZhikjshItebGEYCwHGOxxCEs2wxB0moUY+9MEXvOCFLwyRtjDUUYH7oEAIJnABBZCAAQ+YwAgsIAJakGIVSHNFLDw4ClU0Yg9fqAEXTTg/MaShD5R8Bh0OsQuZ3a8QlDjEIQrhDGcQ4hCE2EUW4JcCIcIPAyG4wAQ+AAJWNkAEILjAAowRClX0LVaxoAUfQMAFe+ikhGfIQx8Owf8LLcDMX3U4RB1kRog+9MEQ2NSGNqwxCWZKAhGnxOMDNzCBDYDgouEcwQS8IIpWwKIVnQjFLJCRgQ9YgAbKoYEC7WEPLjRun4ZgITueEVA/POMZBa0DHQyxC2ss4xvOMAQlMXGPOcyBHUadAxElcAElbuADG2AACEgAAgXUAlyfEEQeFAGABExAAjRwRw1ocA+WslQA74hBGO6AUErgwQyKuCRB+zC8QhSvGt4I6hXQgIYwGBWpRs1BCGiJAQaUwAN/rGgFRkCHTbAiEDRowAUSwAAKiMAKp6lBWc2KgwCUpQ1h0OchDHHQMrADAGirwwuvUQ1r5JUQv6hADvLw16T/bsEGFRCBHxnAAA00FQOx3Acu0lACuTXNAiEYQnt2xxN7WO0eni3LG9gQBj4g9BB9+AIDCpFNNVbjGtrI6x0QoYUvyCF0bavHHHLAgAlogAEeYIAFnjrBCEAAACXYngUugAOylEU5+WjbPfBylje8AQt5sO4h3EoIQ0gCGbsIhze0gYkvEKEeihOd1YQAAvga9hkk+FGpQiABDfzhqxSowRDecBYC1CAfzkWAAAj8l3zggAwKxq4Y0HCJauwiDBjWndsSNwc2iWAEHlCABjbgjw3kVgIhKF0IaMDiv9SgBjEWwDwsoxZ40GAICJiDHgoR0wdYoAxk2IKQ26ZhBMgB/wch2AAMPPzeEYBTArSkgQvycSO1vIMGmkXAPLTMZbXgAAEHOMAKhMC4GoDgC0poQqInTekDkKDSB5jBDOihVAmcCwR5FEEN5EAPOfD5L+/IB5Z9IoAC9PksqZZBpecxaXrQA9OUvjSmkyBrHDwgBB8gAgKI0INbH6AF+WjHX9yh6jn4JB+uXnY+jI3raufa2gewdbZxTY9Tq8UdAtDHPeZRACKMwA39SLe63VACf7jb3U7wgRPeTe962/ve+KZ3CdCt7nS7AQY1QEChxl1os6QaBTjDwhHGoAKcORxnCHu4xCWOAiK8+iyqFngBCP4XeOCDBThrAhWSMPGHR1ziQP8gWMlbgNayHKEJSHgCPK6scedGF9YpkEPBYsAFGNjABmd4QckNdnKHHyEQkViCEiYuBCGUpQlNWMIRkOBiGpAbHkG5OTymsAQrHEAIHjKCdjvAADJEYVCD6segeLCERnyil40AgxIGZQ95GGEJS4A6Et5RAJ0U4EPQLQsSIkGLWcgzDHHw0AMqUIELfAEKaIeS2qEEhnXZbhSfaMQVkvChOAzBBFSYAhKQAA8Wz2MfrYaHhwQQXTBsUBWsEEUt+PALK5TuARiwwQtMEPkPTf5DSlBXIi3mwVNkng9UMIE8BBAFHXQBCWe5xz7s8SR7tIcHdFgE0mKhClWAYhW06AL/BSqwAC1MgQpn7/3vPSSITmyQ+MRvxSg8cQtBhGEGOtDoFyLkrnzoYx4e4hQEgADucASzoApV5Aqt0Aqu8AmzYANMhQu1wAqsEAlG4BQYmIFugIHuUAikIAuqADvEZz6tECuMAAld4AAR8AVlwXc6QQAZGAD2EABLIAq49FGwMC6gYAsjcAGBwAms0Ag2CAYxqIEY6HqjwIDw50GhEAsYowquMAqLcAd4pgNmsTv34B4ZaA8mAAarQEWxADi0wAqxIAq40AghVQhNkAeiQIRF6BQb6BRIsAeiAAp8A39+AwtheD6wwAl3UAEWUAVKUBb5sA/zUIQEIAR78IUYIwqi/2B4tVAKoUAKo0ALirALylALhdAUbxiHAdAOWQMJsRAreOg3uPQKq1ALZtAzmGAMWNB3OHACbzgEGeRBs2ALs7AKwjAL4fJBgYAMzUAGggAJT/CGAeCJ7dAFgOALxkALq5CESzhFs+AMG2AqNyAJWTAENmAP7lCE7aAEGTSKoeAvz7AMp7CAn0ALvWAGfwAIfBAIUGCMnsgFlpAH5VEO0UALsRAuxOeEZkgMWlAqN4AJkmAGNVAAxogEjuBRrhAKomALy1ALp9B9oAAJmpAIx0AMuwCP8ugUV1AN0AAIysAN5VAO5lALs1CCFqMKqGALiVAHDhQCOeAHfjAJPQAPGf/4JFOACqgwgqRACp+ACqwAC6IgCX6ACYDQC3eAC1vABmindiaQBdsADZqgBQCgDeRQkvlIPqXwQbiACX4AA+Mxk3QwCFsAJdzEBY0wCvBXCuijgKFgCrSQB73AC5GADduwDdhQDIhwBXoQBmGAA90EP1dQDlSJCc/wB8tgDduAHtKQi6NQlGBpA1EWAsKTDDlQQk7RDpAQCp9QCqNQPqKgSLEgC6EwDMiADtzQmOSQlVmJHtOgDWRwjE4xBeWQDIqgB4nwB7y5DOjwmtVQC7ZADARpAxRAARdwCYngDNZQBViAgYYyBZGAC7RAC6IQC4EgRa+wS6wgDGmQDIvZmOj/QQ7ccA3G0AVZIHQRRwXFsAAMwAuIkAx/gAyWcAzWQJ7E4AtgWQeXwAAYkHt2cAnKEA3WkAhRIDIGoAOAkAfJkAy2UAuqEJqtoAqzoA1/YAk3tAzaUA3ToAyKcAZBcAQ3kzMGcAbGMAE+oAfs2AzJoAXHkAbL8AyKkAl64AfEcAl5AAi/4AvAkAjaEA3cUAQiEw+EIAi94AuXYAloYAkSyAqGUwvLkAxJWgmVwI5eEAbzoAIxoANkUDAIUwBzIAkZoAiAQAzJAAHJsA68mQYAgAnBoAfEYAmJAAiaoAnAoAlUoAx5uQRU8wi5AAy9UAaWEKBeoJi2YAvGkAzPkAFI/2YHetCfX+AC9yAEZPAFKKAC/qACKLACXNABualQdpAB2tCgf/AMmNALenBDiPALwNCqd5oHzrAMWUA190MGE8AFvdCgJfAHaUBcI+AvHcABIHAMiDAIaMAF72ACQEAGS5ACQ8AOQzAE94ADGVAFXeAM4xAO5lAOy/AHyZAGWnADimAJlqAIvWCnruoLgxAJvGAAumIAUbAEWjABy4gGWqAIZZABadAFXaANx3Ch2VAOxsAPl+AHMVAWV9AEUmEjUfEGVjACXOAH1jAO1iAOt5kMxIqvGJoHd+qqrYoJugAGVPMCTfAFOsAFZEAGGmAHvqAFmKAJeOAMfAAN5dAN1v9wDExQDupwBN3hnIBhFiZgBDdwBmawmNNgDt3QoGlgCXrwqImgBztap8DAo4UgCFVANQXwAlprACrQr8vgQ4oQDLyQDYSQDrZwB8RQB1LgFkVgBAOQBVjws0DLYm2gBdoQDtxwDt3aDMswCHpgCX7wC5jwB17AsVOrB0UQBIaSEFIQDuVwt8qgCbxgDGbUtrh6BezQAUfAA28bt73xF2+wBcSjBzeADOkADenQBcngB72gAxwAAV7gC7KrBw4hBdSADdbQDdCQBXx0BVbwBGVBBUtQB2tgFtwht7wRDwfwAypQBW4BCXpwDGXQCyHAAQxQBqwKDFcQEeWBFP9AAPfE8GII8AM8QAV0QCC84S4bVwM3gLrFoAjHcAmAAAiy9AtHmgcY4Q4FQBRkFQRV9heBcRaqVzX+ZwOaVQ9UQBB+0AUQoAV8JAUbMQAFYA+AJkz2UCgEAA81ciMEUCjzcA/+tw/6QFbsgRB/sAMgkRwfrGpXNlb5kA/s8MJXpg+8UwM4MG4E4A4KwQQoLBLvQAAqUA/3IAD5YCYeMFaawhMCl8M28cOGcgCG4iHwcBNUXMVWfMVYnMVavMVc3MVe/MVgjBABAQA7';
	image["militar2_gs"] = imgPrefix + 'R0lGODlhRgBkAOdsAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEAAPwALAAAAABGAGQAAAj+APkJHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzpk2Gijz5Yobt3LlV57xhY0YLE0E1MD0xs+fv379+/fbtwwMVqtN6x/TsmaOHpaNfid6Vc4evrFl8U87iy7p1j1tCH7kg4fLFICZv/+xNQvQHnNqyac2+wzPHrds/iJgp6lilC5YsV+jyc4S3X9lEk/54+4vWbDxMvPQUNryn1D7FGqdg4cIlSxYsWK6sWXWMHb57oY7F49wZXzpHlpBhWkP6Txlf/ex5wkinihbXWbRweez6CZdMv2KVs8c78KQ0pnj+IVMz58+cNU1+vcO37x8ziNChi7lShTWX59LvZ9GvpUmUTN2VFQ8rtiBDzSplrPGHIjhwZ9Y/54ihByrDtEJHfBjao6GG9fxRxWNd5Mfac/tFJ4UauEQxTVn3tMheFfuUxYopBVKDySqyDILDOWbZA44rqEBCxyPBiNLJhkgmec8vWHwYXXT5YZjFE52g0okV6KhzDTG40EILDl7iYgkryPBCjTfBYBIGB+uhc8wpsyDTiiSy2ILKL5iAk6SG7/T5jjdcVBEdf1o8N91rWlShBy6dPFLDH7T4gkw024DTBDjbRMOgKcgYaMofeqwRyimo0HJLMcWgApqdv7wCjJ/+sCKZiRT7YdFFa6vhJ110T+ihhn+4IPEMO+/EQ089U9RDTzyTvBDHM2U+IsotwyzTqTDABFNMJ5gEY0snt+xyCj57+vlLFc61xtpr67omXRVTqLEBACfggsgY7MCjLzxQ7GuKF5J4g0wphfxBBR20DBPMwsPQooYndaISzDChoAMrrO2s8YStWjxmaGvQtfYEKqg8AAASjCJRyr786vsOKLZQE8wzp9TByBB86EEtw7cU0ogtpnQyDDKocHPxn950E8oaXDzhXKFQdvxkr8VMAgAAUeCCCx0nHOPN10d87Q3ECz8Tih5jRDEGG48Us7AwvbTyCCShtCJMMbQAI/b+3l+vMsleajjdBbsev1ZFJ4wC8ADKk+CwAR3bgC22J6wEQw0uhWBSJiZorAGMwgsDA8wuvyg8jC+o8O0NJqwTQk0fOIzRxxpTPPFkdI3VgEYmiMQeRRRKRIEGIaxjgkPxfLAi3i+D0AiKLGaLUky2wQhj/du97PJI8cUz430o1HSywQOdIGJ+7VgU6twak6AhRhtiSKHFF1EQ4r33Q9w/iSmWr6IHL5hogheQYYtQ7KIVoLvexG7xClTg4n4QZEYowoGIE2yAGpM4QRQQQYfaOY0LkxiDEuzwhT58gQ5fkAImIHiE+1niedTIhB5kwQg+cAAUz3jEK0QBDOv14hf+wqheK3Rxi0ZE8H6rwOAJHrCtebEBFX2YXRP6MIk24AEPbSBEG7bYCSPer4Xes0R4gpEIOmCCD3EAQHBKIQpd9MJ6uqBFEKuHDGA8YidHTGIGmYiKJU7iHV/YgBUmsQYqdqIYynCFK5RxOTrY4ov3w4QsQNG8KzQhDrYYBB+CwYo7Jqx6v5gYMnTRiVCsYhVHlGD4qBCCVC0REe+gg8nKh4pw9AkVTWgCLt6xtUVA0nuYAIUpBmEJSTSPGqyQhCk8oYZb6OJtqPrFIzohiV9gQycRPEYmivEOV+CBZPPqwzv6YDJcoIoavPzBD5Cwhlh+IRG/ZIYYg8GIQTBCEvj+FCYfBiEFUQzjc7+4BSaQgANLBIMWyqHF/bCBjV/8jZvUwOARHiBOWT7AnH1ABDXogIQaVKEJ1OjjH6RxjWscoaTXeCEyTFFDRliCEXGQRBMkcYVCdCoYp8hEIwDAgUEggxb9WAUtpMFQhjJjH+6wxSTQGQ5cEKIRgCxnMWaHCg9KAaSlEIMYbFHSk5Y0mJzERByGkAY02pMXfECEL1oxCFpQwxQciIMsWEGN06yCqEXFxT/K8g5bbPMd1CgGNdpwBABorQ8brMITkHBVXNwCgJnoKkqb4QhesOKMcYiDF1iKiUwOJwRDkIW3+AeKaLBndTzBxteksVcWJbUT6Hz+RzFWEQcH0oGKTvvBVSeRCDysghuS+1o3riHWQXghDmmIAz0tAcBnhAEAQ1BeMEyBC7KURTm+EJs08HKWFpUjE7B9R1NxQY0vIIEOT5DCD/6wCmR0g29hE9s2JIHcsT6gCTniFCiQ4YUX+FQWq4jGPc5ij1X4QrXeYAZ3/+ILXIQivLKlghiU8ARHvld13ojv165BJlbwIQ1X8AIjoMAIyyIDFJUDBS0G/JdTIpgZ57CMWu5Bi2h44xqlQEVEbRGMNoSiGRgWm4a9wQ1cgIIRk6jvcfkQTGRwUqG+iJFa9kGLu3rjHDCWsVpw4Q1zeHkbfluFJFbRDW54+cxoNkf+E9JsDnCAoxwpFU4wJCFGVvy2HNyI8l/24YtV9ATL75DyWfg8jjSf48zlKAeb0bxmNoOj0LiwBSiCI7BnKNoc5PCFP/7Sjz5fwye+CDSnfXHpRZua0ac2R6JVvehy6Fkt/WCGJ6Rxjncggw/wmoKudV2FIUDh17+mghSoAOxiG/vYyE52sYeQ611PoQqTWIU3+kRrLZuFz+pgWTmcAY53sOzbLOsXuMc9bnUgQ9Bn6fO031Htv9yDGOVgGTemAQ5yg1vc42ZHvuxNjqOWxRlmrsc9Trlu1bZ20Mzghr7c4VBHOOIY3ra3vvD9bWcM4hG46Aa5t7GNsnCjyM4wR4H+aVHrewTl4PcYBnnNsQ0NsYO2UIhDKOKxpz1NYU/wYFQwRtmJV3RjT9hoBzu09nFz7OMdOnnHhlhbFnM8YnvTtEU9NGQLXvDCFKugR82TdPMkvSJcpnNyJ0qhJw5Fwx7TGIaXXXSOFb7jHhpiRmtfgUBdtEIUhQAXMr2FCUcofesb6vqGugEuOS5sYssIRic6MQ17tIMZ8ZAFJsxxFmlgAhtIwgZ74IGIYSjsF7rQxS5osT1Z8MITeBjGNGgOeMFr6BS/QODhDz+0YaDiFLYAhyz2uQoH2cMXnjiHhpxiD2/0wxmY0AUQheH5IPZ9pWsoRCvkxg6nWP/6VbB+P1D+4Yte6AJ0h6feMFA1C0jc5RmrKMvRdWKP6/8DG//AhSgS9jnRBWMXdeDDMOneifm/wv3YZ310hwzDMEe0dwulQwu6IAwEOAlOJgtmsTrS0B7Xh3mvQAs/FHtP1wq/IApr0AkBVTSZIAr/B4BOkX1OYQ6hIAq74DazBzfAEHvVAwyvMAm8EAyX0A1l4QuYcA4AaA/bEAoY2DCiIAqY8AiFUAy3ICmP0Ah0wAWFgApNYYIo+A/+sDSQ8Auo8oJw80m0UAiEEDN/oAblgHS4QA8mGA0GNDGYUAeYQAtKoDnMdwuDgAQbMCqQUA8m+A9V6A+YEAvKoAaPQAsEOHvVAzf+AcQInaIIX7AI0eAI2NAPAOgPSkM6SjgvD1ADy+B5wfAIwEAILxALnTAIaEiF1vcLVpAJ5DEHYvAIv4AMBlg6HsgGeMApivAHX0AIq/AOe2gOFNJDtyAKdVADhbAMobcLkPANaHACbEAHpLiHKFgKT/AGscAFXjAHc9AFmTN+C/NMdYAGVGQKoIAJdEAHa/AM93B9SAJ+oeMLvrAwrQAMonBCfxALwEBIzeAONdd1i1AGb/ANeAAAP7AG2NiK0lMMw3ALCkIHNigcdIAIUdAMSXI/v9AJTnZ4xWA9c2hHmQAMrvAIZRCSZaAHiVAKpWALtvBAYFQKc/CPf/AAL1D+A0hQBueRBW+IDPP4B3TgCCgGCrJzPBHkFP4ACbegLcgwPaIwR7/QC7cgBUigBV5Ak2tAkAR5HljwA6HAh04xDHOAA41QCmjwAmJZA1pQlU9QCHXABrjoCLIgC6agBGjQBEhwCeVgfX4yDI+wBk8nCszTQ8EQSq2gBCGAAzJJk+exBl5QBWqACYvgbeI2DXrgCXHgComAAy+ABFZwAuzkBWygDDrZB0oQB6zjCFqgBFwgBkiABvFwMfAgC7GQCTiAA3VQCLpwlMOgC5jwAy9gBSJUAz+wMVzQCMeQDs6wMi0DD8egBvxUCqC4ATiABycQAjXwAI1QD6VAB2ygBJn+EAu3oAzYgAY/IAZe8AoXEw+4cArAoAxKYAViYAXR1wp4Uwg1gAPrOQZjAIpSYAu15g6yEAoTBw/vcA1f4JWxwAY4EAY4YARiGQIA8AftUApsYAVoEAvf8A3Y8A3TwAUhuUsXYwzBgA3A0AZWUJpSEJN1UAdqgAMPgAMfpgWlEJqoJA1BuArq8A5Q8A7qYA6/AAVfqU5agAM/EJsv8AB/AAylIEKJcAtFdaGZ0AQ10JgXUz6hMAi/AAyxOQQvEAKgxQfzAgWyIAknkAhRIAa/sA/2wA6h8EDRcATREA3SgAs4cAkBpFhdMAc18AI4EAJ4oAiNYAVW0AjAYKFFpQz+UfAIrgCgfgIP5okHgwCIYoAHjdAGeco6P3ACu3kFc6AGWaAEdGBdpcANUgEjUXEP1MAHv8BRVYAEWdCVOBCmkcqbmXChS4oNf1AM5Hk03IAjvxAKoeAFWqAMePAH34ALTdAJbzAHhYAEJ7AFc9AJzsAddAkYPcIOinAMhCCTtlIIsRkCVmCScFkK3Vmh2OCdt3cJRwMrAJqbNZBCjdAOrnAFuLAHdTAJbNAHduAWr2Abi1AO0tojAzYYv+kFf3CnG1ADUVAKVkAHt/AHLyAFsTqupfAK6eAnCWEHTzAHv8kF3+AKagBF+VqlpXAEUOAM8IAP+9qv7tYMtFMKioD+BHvwBntgPHQADG0ZBlKgDDhbCg5hBxqKBIXwBotQRqVADfVQFtOAC32ADmaxHSjLGfEgcu9wCW4BCaVwAm0ADM8TB22gpNigsxBBHkjBD/YgDQbmDfYAD9OACAHCG+TCbqugCDCrB41wAkoQC7GgSbeQnpmAEf3wDkQxVOnAYn8RGN1lD38CfI5wV90wDQRhRmGAB2VkBxuBD++ADVWGStjQJ/YwYPsAI237DucgDcCHCZ4wVOuBEC+QBiCRHKHbZ6ckVO54BO54Sp7AOquAC7RmD/2gEFuguiJhpu/QDdLADL7gJWkgVJHCE9OmuzYBvH1iDn6iIfdwE9RbvdYTe73Ym73au73c273e+73gixABAQA7';
	//Image for the big icon - miscellaneous(Thank you, CuPliz13 & onetmt !)
	image["misc"] = imgPrefix + 'R0lGODlhRgBkAPcAAAAAAP///8zMzPf39/b29u7w7+7u7ubm5khOU3B6gtrm75ikrK26w1JdZHmEi7XCysjV3dHe5ltla2RudICMk1JZXaOvtr7L0ubz+ktUWJGcoYqVmW52eEhOT0FDQ05PT0ZHR+jp6bGysqOkpH+JgzAzMTg7OWVqZeLj4tvc29HS0c/Qz4qTiOvt6uXn5IeoZMfWuCAiHnqAdNfgzvb39fT18/P08uTl4+Dh38PEwrrIqsfNwN/l2HOMU6qupPn79qm0l8HItd3g2Nnc1IiXbNnnvrC6nc7Uw4SaVaSyiNTayObp4O7v7Onq556jk2l1SbTBk+bn45qje9TV0MzOw4yPfXByZnB5OGNmT05PSFpbT6mqnLu8rklJSFpaWfz8++3t7Ozs69ra2Xl4Y66oUYWARMO9cJ+baIqIcpmQMr24i5eVg7SyoK2gOLOrb4aCZ3BtV5qWeb25nGhmV8/LsOnHDqGLENi6F8uxGb2kGquXH8i2U8i+hlpXRbGriqeihJKOdNbQrdDKqKyni9zWssO+nrKtkOPduv/749rYzezFAu3IBq+TBeTBCOvGCsqrCPDMC9m4C9GxCr+hCY94B/nTDe7KDd+9DOvIDuXDDpaACuG/F3xrE9C1OHxuLNbEaNnLgEdENO7mv7exk6Gcgbq0lsnDpLq1mvjxz0A7J2tkRXlzWFJOPfjEAYRqCPrJGvnMLfjTSo55MP3ea/rii/TjomNdSPa5AderGOS4I4Z7VzEtINqkBJSDUpeKY6iacvSxAaJzApFsD2pZMFhMLdqXAJttATgrDsedPCMcDHlnP++iAaFqC6BrDqZvD6NtD5lmDqlxEJ1pD31UDbF3E2ZJFoFdHZZuI3NWH1NBH6FlAZ1lB3NJBqluCo1cCZViDGFACK10EqZuEk42Duzp5KSASg4MCe2IAdd3AnxKGMZhBKhrNKNLA45AApVOF5lWI/7+/vz8/Pn5+fT09PLy8t7e3t3d3dfX19TU1M3NzcnJybu7u5SUlFJSUkxMTP///yH5BAEAAP8ALAAAAABGAGQAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGNe7IFtGBKZEd9hy9gjHcoeNzX6PJlGj0k0SQTYO3BgH1N8Avbxe3hF1iNHaagqRJKV4AgBNohUIxegbIB+8cyW/dJEqkJPdiRlqqNIT5mFPcDJUpgnj0B++AaUtaEDDZgBiAf0S5x43q9eSui5LWhnUqRGmTDVcRSpq8K7CPVggoRHR9nENGi4MUMg8WLGiMu1O0KjrICpAmUxihQp0yVMl4JHYojH08E0jRQtUmSmBuwjePIccQ17gA05iZYkLpvjXxlGk37X/8k0F5OkOgrb4KkTSc8Vg3vif4LiHLESMush5XGjRHF1ejwgRoAQAQr2AxK7NQLJIpY0CEkjw4V2iSOYWEIaQfwcwIYpgdChg4A86NFIhZiQt4d/jPEgRRlJLCFFPydMh1gRSMjSRied5PHIHXh0EhRBXgTZSCN1WFIHJIqo4gUWWCxRwxihlLIKEIn9EYlmRs7ViTyvIcZDGZQwwognCzDAQBCtIbYFGqc4McgZv6hRiCljBGmnF4m1cQeRddyxxw709LKNLGf0scsoMmyR2BFpbKLZeJu4IQYIYqSAAwpnUCJJJI8wYsEFDHyYmBNwkOJHIIGYUogcphhRnYClqP8Biht8FELHDEdcE0034gBCyijl+GKEEkzcsIYfbtDKhxpBFNBPAQekoIMslmX2iA8MaIAEfzbU4IQJaBgiCCGHzBkIFNUZoK4chxxCRyGFBBJEGcw4E040vvwhiza8NoONE3+sesop5B5RwAcFJAyFJpuOJokPF1igmx1ptJEGJ7L4skYocQhCSihJqCuyAYkNMsYgHK6yhi/eOONMN840A80z0TgTDTNukDLIH30YYgocg1BBQD8EFJ0EI4/IBcnDFmzw3SSTbCrJJJRkY44th/RhDhHpqgvILm/EG0oo18DczDPPnG3zy9eQMgwafSTzhyBgB2EAwgW0QMYjl8z/ZYkkW2SriibBQTLJMLqkMckxWIiCxhtSFDDyyKTs0secWYAjTcxno/3M2swoo4sfPJdASiGsDELHwQm30MaImkHyCD8LUODJIw7rAoIMukxihimmkBvy5PYU7wcpp8vRizfNSNOMzWk//wwz0hgyCquDyDGKz3JwUU8X9dQzhWiPWsLIGySUMUkdo9nRyzDVDGPHJ+8KEkgSxeev/9ymyDHINdt4BjRclja0OeMZ2+iFHArxC1+8gRDaM4UgvAe+egABD0aqgwbZEx5MVKgRrsBGMpIxCDe0gRD2C8QW9Fc8frjwD6sYAx3KsY0DxixmNENbN64hB1IoYxzZ+AMc/wpBCFaQYgv8KIELy3CeR7GvQY8y3C9MEYNkrGEUeiAEvAJRBRd6kR8CCKMUxqaLaTDDgJ5b2wFloQtP+GIXoRAFK/xwiF2sggv58EA+uJAGSVwigxtkXyYioQgycGEUu4jBHwLhiTcIgkNr2EcYJzlJKaQiFWjYxTimwbxoRCMcNquZN46RDEGgwgS76MU4/kBFQHBBAB4QgBHy0IjzBFKDf5PEI86wBjlUURXDAIcqSLFAJ3yFkpUkBSAGYahscIOT0PCky7bhCxPEQBBqyEY2yhAHOQTCm6+MZRsWAYkNlkg8lrhMJ06hCmKYwxx9UIUy3uAHLSJRksgUgBTe8P8HP6wiFW/CBjfAMQ1nUKMbsjhEKJKBDWz4ohRyIAS5fFGIcAqADHmYkCU8SJ4NXgISaVBGNcCRhSpQwQlv0MIaCKEMUohABPkUwBvGgY0/jAFsaPjDOMYBDm5wwxu/8EM2sNELUpiiFKMQxCEAMY5esAGWAthBEpSRhkhAUTMlyoQk2JgNLIjAB7aYgy/0MCdr/MEe/MgBMvWhinFUIw7/HEMf/FCCdw7DGuAABzZ+cYqZEmNggWDpOMqwBajKchRxqIYmIgEJD5YIEoyIgyneQAwsnCAOgSiEHgRRimmQgh78wKcA8EHaKoyDG3BNBVzfkIp3xmEQvdDFKegwipH/gmMVEgxEMIexhXuA4B73AAIhDGEOAHhCFnlgECYa4Yk1pMoUyhjGG0QhiIj6gRt/GMBLScvdHMAjB8SIYRKwgAZStBYAb2AFvEohCGUMdBrDGIWthjEMEQD3t/cwgiDoht5RjPUSlZCELgARCFH4oqfjQIMoyFUKblxhAAIYAXdJu48A1AAGVXDCFJQxt1QkA71YKIUhBlFbn3KDGBwaxBqCAFzfAncITiBFIPgpikCw4hiuSMMaSHGI6z7TG9mIlygKMYwPHQCMpC0ePgLAmBS0QxmDwGwopusHP5QCED31KTEMQQQq2CN84atgPXDABSm0ixCi6AMAzPEH7Ymi/xfP/Gk1TLHgONBmAPQYQQ7yhw97MDkxiYhBKLCAMkHEwRer6KYvfAoOT6DBCEcAM5jFHD6pnkoUY3inNwtxiDLEeRrjOF0QbkCDxIxgH/kTwAH+jJgpwAELq0DDKmwha0DIF87/SoGkd03p8A0hCFUohCjisIt4meIQ5TCxMoigg6KlCTHbLV4OVg0bHqxhDFiwBRx08Q44tFkXb8jBrsfd6/DZIwVcgEJuU3UIWUzjDGwQwwrs8ezEiEDCSxGAAVidGBWooApYMIIUgmiIOCThAC5gisIXzhR/MHzhLphBEsycqhlTQeEpuMer9iECfDAlB/uuTj5wcIAbHAAIrP8gwhaO8PCWH8DhLmfKDYIABDkYwQhDSDhTUBAY2AQgBxL+eMhh4/GYG13hMDe6zl3ec8b8POgG2IcP+kH1qvfDA/74gNa3zvWue/3rYA+7P0Bg9aq7cAXqwsfQGTPvhLn97XCPe8LwJve6wx0FGq/OPkaQgrRTm+gryIETXGD3wtM97jsAhC/KgYxyVAEHcBdD0xnzUnuoayn8RowYcuCDXeSg8HY/vNtbkARuq6MYwLgFL3qhg7fjQwyvOvUBSHYAP1cHB/ogBTeqMQh6O/v3wP890YDPgzi8wx3sOEfqXwGLV+ShEAUo2sj/o2eS4XnJ1QnBPq7BDGpAYxhriEL/8MdftOE7uwBveEc7kr+MVrTiFbSoRSwkYYSi6SME1TmyAOjBf3oIIPMDUABr8A3SEA7N8A3T4Atc0ATkB3zmVzSDsA7swH7A4H6tEAsLFgt5wAMokA8FUB34wA/2wBgjWB1TQIDUIA3eEA7hgIDKwAU10IDl93tDIIHsoA7nsAy3YIGtMAuoUAuwoAYqcA/zoHcjcACIcRq2xxi/sA3i4H2fAw3SQA3eYA2AIDRqkYX9YBY/8Afqh4PKZ4G3cAvwhwqz0AbTli6nJhhqsYSIMQTX8A33UoDRIA3isDYIiAYqgAMtkIVnYRYzUA4TiA45uIPuN4a3EAuIIAq4AAQf/wgbaLVkWViCiBEoAdSC4gBK0ABKnFOH1kAMaAAPWmgWQbAO60eI7XeIiAgLqIAIsHAGzmEDBTIAOZAhfkgPS8gG2wAN3ieHziCFnPgNNiMO3zAMrLAG8qAWW1gWcuAO7aAOhFiBhwgM1PgKviADsZAGrTEDrjIABnBq9OCHAYB9NlAOchgN0CAO4vAMdIiOBZiC0wBMrAAGylgW8OAGyIeKhjiG1Kh6WZAAOXIKphAEVIAYISiJfsgUX/AHAeR9vCgOzZCJLjNA1EAN3zAOx7ALpOADolgWyxgAv3CKhSiG/RgMWsAAezAJT7AGVOKNIzAC+yaO42gDgDAN0SAz1P8QDex4k84gDdEUDtJgDaoQA7swDKqAA2axjDCgDOrwjDkoja1wC9QIDNygBQtABnqwCuVABK1xkGx4GiSYAj4wBuMADd0QDtFzQM/gDc+Alt5QDmuQDOOwCqWwBTE4NEUjA3Nwg+yADssgjYgIDMvQCxCwALagAabYB0AwBC+JhIyRTyJgC9lgBbowDNJwk6CEjs8TDtDwDdGlDH4gB+xkBfpgWE7gAG8gDtCIemI4hssACBEQARTQANkwDhtgARwgAzCFTH5YAPwAP6lgCHBQDfZSh2iDlttQDdkQB6eAWMOgDGNgA38YAD9gBRRgAaRADejAC6knlctQDHqgARL/AAEX4ADWqQEaQAL7EI5ZODnq4gSlwArJ0AdGpAw22Tw2o4KrYAinQAry9AeyhgKskzAykAEbQJ4WsAVxcAYMugbWCQEnwAAPQAG1owEOUAVT4J4a+o2GYAselgyz5kMtg5bf4AlsQAqrkA2r8AdukA3EcAADWgAscAE+UAEIkAENkAAOkAAJkAElMAELEKQU6gAbQAEU4ASzt6GT4wOFMAce5mHjoAxz4AfKYA3fwAy+4AvEYAur4AvaNAqDEAIxygIQwAUckAHmUAIV4AAmUAKJFANAegILQKQUkAEWsA8iAwZKagBNwA+DwApPugtxoAvHAAhoIAeeMA3EsEqr/6AMGZkFgPAGYkp3LBABSbABXgAOFUABDzAB0yAMCeABHqABE7CjFSABDvAAIKcuOrCnVnCoxFBFHlYFaJAKx5AKiKYzqzAMI5QNqRBWWsACIfABIYACU8ACD0AEG2AL4CABFHABMhAMwSCeaVoBHIAA5tAAqRoEQrAETQAEeyoucuAL4zBCu+AFXRAKu3AMxzAOcUBZH5YMoZAKcCADJ3AC+2AC+yB1JEABWEAB9jkBGgChPLUBE9ABMaABFBADMYCqD+ADafALStCqSkoFbDAKpUAKb+QFeqmuqbALtqALHFYCAJAMxJAKY1AFXuAEIeAPIdACOnACG+AAFAAH1//AARbAAHPgDcbAAg4AASVQOyUApw7wBzqAUjqgBHtqAGGwBcsUCH+QBRxgBeq6CyhrCmjACjFQsoA6B1aAr/4BAyQApAqgABfwABwwAROgBZ5QBhNgARFgAhbApjGQANaQC2sQB+7wBBSrLgqBBpIFCCxAlslgtUBDCqxAsslwSavgBFLnH2+goxtwARAQmxZAAbepALGJARdQAhYwARuAABIQCsowAamwtxGBBixgAWjgC9VwDDEwBqdgCHVSAgN1DHBgBSQgA0MzAD6bABRApAkwsxygAbEZMRuQALtwDcTQABxgAtq6AKyQDS8QESwgAyRwAoZACrowDm9QCn//MAcnwKzcoAxWwAL3phgEwAIksAEKwADBqwE6mgAcwAE0ywG0WQy6oLYIoLYXMAfH0AMR4bg5IAOA4DN/8Aej4AdWoAGpMA5rYAAFcA9ruBhNwAM6wA8RgAEWoAEcEAEQ8ACUO7wb4A9jMLYZgAVIMAFEkBFjEAfyVQqDMAc+YAVVIAbqQg8D0BpdQg9C4AROoAEM8LNlqwAQILAW6gAMkAAgcUWG8AZzIAO5+ZIj8FL7kAMnkAMc95IuVAUy4AQ50ANiXL09oAXoeQEkIBJoMAccMAIa8A8GcABQsa8iwAFWLEkeVwAKgb0y0BL0oC6ragD0gBOEXMiGfMiInMiKDrzIjNzIjvzIkBzJ/xAQADs=';
	image["misc_gs"] = imgPrefix + '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';
	//Image for the setup	
	image["setup"] = imgPrefix + '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';
	
	image["alliance35"] = imgPrefix + 'R0lGODlhRgBDAPcAAAAAABIRCyoUBiAgFzUqDTMzLw8dQhs2dTpDXFI0Bmo1Y15CDlpKJlZZNFB2DmpREW1bJ3dkB2BzPHVlNEVFQk9PTlNTU1VWVlRTWFNYXFlZWWNJaWxkSWJjXH5wRn94W2ttaHV2dTpRhzJisjxywW4sjXUomV9ujEh+x2aUIHuhQnyGkWCAslmLzmaY1Huo3J8ICIVyDoNfX5V6eskKCtAnJ/AQEPUuLsZISPRXV/J+foEtpJE0sqQ8xpNblaltvLl8pLVW0cV+tsd33pyGC5aJKauRCbecDKiWMbWrO42HXY2JcJqPb42rXZ+2e6OYXaSbdLOmU5/IYcanBMOnDs+wCM2wFde3Ddm3Bt28DMKrLd2/Js25cOTAAeLADebEDejFBurHCejGCunHDejGDuvIDe3KC+3KDevJFPPMAvDMCfPPCPDMDfPPDfHQHOnJIuvNNdPKR+jST+nbcYGBg46PjouTl5GQgJ+cgZubjZOUk5KbnpiYmJubm56fnoyZrJulsq2niqWkkrCtkbiyi7eylb+6m6KioaWopaKrrKykpKupoKioqK6urqavtKu2vrqtprCyqrS4orS0tL2/t7q6ur+/v5e44bG7wrPFmLjDy7/K1L7R6tOXlvOeneOzs9ib6dKu0djIk8bCpM3MrcPGvM3WvN/buvPnifHorcTFxMfHx8nKycvOzMzNyMzMzM3Nzc3Pzc3Ozs3G0M7Ry8fS2c/Q0NvFxdLTzNLS0tPU1NXV0dXW1tfX19bY1N3e1tjY2Nra2tzd3N7e3svY4tTg7uLT0u7Z2fjNzePD7ODh3+Ll2vLtyOLh4OLj4uPl5OXl5eTm5eXn5ufn5+bo4O7m5ujp5+jo6Onq6evr6+vt7O3t7e3u7e7u7u/v7+Lr9O7w7+70+vrh4fHx7PLy8vPz8/Px9Pby9/T18vX19fb09/X29fX29vf39/rw8Pz3//j4+Pn5+fv7+/j6/fz5+f39/f/+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAABGAEMAAAj/AP8JHEiwoEGDdPxYegVs2jRG04YBezWJz8GLGDNqvOjnFTt7IOvVkycvhEiRIO15s2Rxo8uXBuvkggdSHrybOOFZyIlTHkh2lujAHJqRzzB7NnnmbLdTaU+QuYQSnfqvztF6TpU2zYpT5CupVDWmSNHECall7bjm3Kr2XDJQcEENCXvQwdi7KqSQQqf2Jtus7OAOGTxELl2CdlOoKNtkrJRM63iy4/nX6dshQTJnHhIqleewSuw6EfauXjlTKlJIMRUZ57p2sOHJs5AUJ65I5W6ak9tDs+YholChSsWM6Ci7g2Y1mqRqVXMVKpwsu9ku3TVeqipNmkRhe6VVwbzR/7pDyRW1VT+C9PbdO7jwVESbOFBRqX4lVsB0rcqkOtMvV6os950twQhTwTDB2JLdJI2E0MSDIKTXw4QUtofKHKiIssxQEjjgBCurvPKKLcIMk8sviqmABBJPUGIJK7w4Q046FaRTDjneaIMNMEtIIYUKIQChXoUTCjHHkXOMogxMlEiQQiav6MKLLrb00kww1ChWRBpqdIFECBiAQAct4FQAzplncoONEz6qwAEdPxDZGxdIcrEITML80qETsPQyZS6w8MKLKWMVccUZaUQBSAZ2OBIJN2aieSY2dzzYhB50+DAhD5z2AMQccoTKBSG+vBSMMqGpUAow+VG5SiVOKP9GBBZndBEFJ5gQU0sIuxw4zK+/9qJHJpLAMssPPPTQaac+cBHHs3GI4lIu8jhThwMe6tJLMMCwUokkdyGxhRldPLGJJppMUsQTFJQI7DC6RGLLMKEgy+m9+PIQhRzQSqvRNPIEg8EAolFCCyt+4HFXDEmM2wUUxOTqCBVYFKHEHXrwoTEfdWR87w6cgizyDjv4AG0cUWhkiT3XdDCABQ1gq1hjKWAbAxJakKEGFkycS0wiR0wxxREWFyJJJIssEYgkJDft9NNPPJvEExlZ4g05IBQAQggFDBAztmDfnMQXYqhRxSDEaFKLI0QcEfQUVVSxIhIPGIFECSY8/bQJJij/EUcSUdzRB0ZWh0DB1gUEcEEIIDTgeAQxFIGEFWaMocYUfhSjCTGOxNA2FVeIYcYaa4Rx6BV486366qp/gEQTeVTSkkGvSOMHBSHQQcEAGfDhBwhbdxDDEVposQUZY6RBxR6YaLIJIBO0XYUXY4xRxhhfYHEEEQqw7r0JJTCxRB2NCMNIIwdVAk8dFYA5AAYKTUJHH354cEQWV8QhxxthpIGEI454BAAh0LYrfKF6ZcACEZ6AhwcwQAEliCDeJBhBE9ChDn6oRDDI0Qs/HOQV5KiEBgpQAA34QRXOOMQkKhGJJ3RBDVuIAxyq5z9NYKIYz2vA8LJQvTFUbBCkOMUS/xawAAhSkIJ0OIQlcvEMcrSDHX6YREFyMQ1yqEJ3GOCDKrDBi0YoCAQeMIMbZEgGMdTqCZs71x90eATqlfEITCAFHvAwCgYkYAEYOGIJNkAHRryiipOBRz2WU5BXwKMcwWiEHk4ojXRUwhK8kMUiihAGfm0hDGRowxQEgS5MJOIPHIjBFLxwPSzEYBCDwIMhRtGABDyAAyFg3NZiqYdcZCOQN5HHKxhRkErYox3d4IUlVgGNdJADEa/oxR2YgIQ2wOGZcChDGo7gCE08YhOO2IMGImCELJyBDEeYACkMYQg8eCABrpyAHtbZsT4cog/bwGUuhzE7geTCHvBghzewof+NdMDjGZMIxjBYsQQirOENoXoDG8plw3M5wg4geMARyFAGLxjhA6NgwgQe8EoGRGACkwDRKlYBC1s0QhtOgaIlBpKLozhFFqooUdK0wAY47A8NYDgCJ2vxDU3YgQ4dIEIWKJqFGDBgowlgwCCY8YEExGAS7xqGMCzhjJQyYqUCeYVLlXKfX0XiA1Sw6RuwVwUlbKIWNsTEHk4AgVGOgQxXiAA6CRCADjCDGYZ4QAw+ENVhqMIWWWkE+rI6DawoZRLz8sUhlGCFhJphChHYQzES4QhMOAIQICDCFZD3hSNE4AMBAMAAPsCMU3yAAA+YQCmiCgtL1KYnk+AlYQ3LE6j/SsMZiHgAGmwqBzRgwQhKeAQgHiFAOkQACwckwxeAS4oBDIAAFGACA6YbgSJEQhrYxa4wKvHaXFpCtv94hTe6K5tKOAO7w0iCGmw6QzaEwQgTGK5wO2AEMXBWgYQ4xQACIAACMIAJp8DDAiIgCGhk97a+VEo9vjsQq5F3wQaWRimswN4xhMEMV8jCFGIwgQ8UgQhfuB72plCEU4xiAAL47ylK+4EHRIADuzgwNFyr4Fd4UCBXtICOd6xjClSgAhbgQBZsioYwVM8MXqBCFYIGBrhewQxkyAJ8mQCB/45iFKSAAgTQGQMIdODHYKbABXi8Yz2ANxfSoG1PLIENcOBC/wtukAMcsCCG67HhClQ4oBq+0AYqUOEMY6hCDBbAACUMwhCDoDIROTCBCDygFJLCxirICw8G27OwSmmHKp4BjlFgwaZbqAIZKmc9M5TBDFW4QhuuUIUyfEHQhibFKD4wgQU8AAJ4kIQHXLwISTkjFuRth2AHAoyt5kSXwgBHEtLwBjig4QoGvF4Zpv0FKmTB1GWIMtEMQYol1HoBHpBjIDiwgBhEwAOSCkYwrCrFgRgbJ+2QRjDUYYUutMF6Y8gCKXt4hiRfgQ3Wyx4RoOBtIjLBEIEYRa0ZULcjQKAR7Ih4MLahFHl4QyEEuadTyJGLdCgBCVNQQ+Wm3UN84+8L3//MQhWIwABbK2EJJt4ouEeBByIQAQKIiHg6bJGOtPBkGnx4BUFegU+etCMeq+iGMkgBgSOAYQ1tAHTJr2fALHwBz47GNTOgoIQtJ4ADdy2Eiz+Ai4hvAxbxcEou6vkPYMim4sFwxjrWQYePW6EKX1BDyasHaH2vHAKLGAUUmPCABBBAAOBeMSE8kIRCRJwdzaiqUoByY4IMQ804SYcxkOEOQRRiCR5oqxdEvnfrqZwIS5AEExZg+NAO4AEeWPEdQkCJcYQEGD4/9sWxShBgFN3ot0AGMvJQzjw8QQmSe7qpEfiFLBBtCRAgYgICEADnwp4Zg0jEI/7wghdc4vvf54T/N3JCz1wYBPdOKccn1r+EQhQCD6i8wxKKcIQrXNgM/b4CER6wAAIAIAEQUH0E8HoTsAQU8AcukIDd133gdwnfgBMscRGXpxTI4AkWeAt5AH+FMAiFUE6gdwRhkAVi4AVx5V/7VQAPUH0FQABVFgInwAIJGIML6H2X8ALf0A4XVwkXQS2SYYEW+An0oAqCMAiBYAgbGAjLhARFYARTQAQEAG6JY2sCCACphQktcIUtEIOcwAkv4AIMaIO5UAcZATA5cQyeoANo6AnHYA/ZQAnwh3CBgEqCkAfeNl0L8AEF8H8LQH0BUAATwAAsgIVY6ALhYA9dqIDehwjgdRC54A7i//CIZoiGkugJyPCIxgAJedCBh1YIgVAId3AHtbYEeagBFCBaIIALS3ACKLCKKHCFrfh9MaiALbACGnGGZyiJOZCLuSiJk9gJd3BliNaBhuABC6AEJEQMdDAAHeAL7IANLcCKq9gCl8AJl+ACWRiLLsACGqEDutiN3uiNaLgIy1QIo0BOo0CMHlABF/AIdBACGpAHq1AKJEAC0CiN31APLyCIMaiNGfEJuXgDABmQAhmQudgJrkAO8aAKd5BwWHZODbACIdABW7MHiEAO1YAC8wiNJMAJhtiK+siPGNEIM4ADA1mSAIkDM9AHVHUmyjAJnncK5yQD57ICjVILiPAMvP8wjzqJkRsZDs8oiFcIkhfBCocwkgBpA0d5A0iJlChZB4ggC9IgKcpACXmwZRPwCN+ACblSC36gDKwwAjpJjyTQAt/ACdDIii0glEOJCEZpA26plG+JA3fACLKgDLogC8NwDdyAJsOQBwzAAXtQC82DCYhQCq1QCmAZliPwAvNwCfR4liiglhcBC4qAA255mZiJA42gC9rADvKQDs3wCrkgUNHATxfAC63QB3aQCHxgCcpADsLAAok5jyNwCfXgAo+JliTwBy/xCTWAmcB5A5/gDblHEuygDSYiC7ZAAbZgC6ywSNZgE+2gDHswAokJlhyZj2G5iiOwiBnRCXAJnJf/+Ql8kRUkIQ8XIA8joRTQMAknAJbWWZvfUAyOmZEoMAK0+BI6gJk1gAO/eZk6QA59oRNc4Q26cAjvSZtj2QJhSQIjcAKHABOW6ZY4IAMdIAO/SQM2gAPVMKCVgRPscA2qwAciYJ0OGp86+aB2MBQaSgMJIBCNUAcX+ps4cAy5lxUfmnnOUAl6cAIlGp/xeQAGMBUwAAMCkHGHEJE4oAPBcKNOkaM4UQ7DID8YgAAicKUHIKSHcRCrUAcgsAKv4E9qAaX51A2y0AexRAdquqUaMVWNwAiTQEXs4KR+kWn6NAyW4AdOCSOswKYvoQ3Z0Aux1QgM4Q3eMKeyQRv5ZKjTT5ALeeo7cUqcfkoU9cAOjfpdjHA+k2AJlkABnPqmfqAxjFAJcloPk0oX8nCnufAKlrAdILAcm8oQw3Copnqqk5qqhuoN0JCrEdcOtvoPAQEAOw==';
	image["alliance35_gs"] = imgPrefix + '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';
	image["mercado35"] = imgPrefix + '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';
	image["mercado35_gs"] = imgPrefix + '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';
	image["militar35"] = imgPrefix + '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';
	image["militar35_gs"] = imgPrefix + 'R0lGODlhRgBDAPcAAAAAAA8PDyAgICQkJCoqKjAwMDExMTo6Ojs7O0BAQEJCQkNDQ0VFRUZGRklJSUpKSktLS0xMTE5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFpaWltbW1xcXF9fX2BgYGJiYmRkZGVlZWZmZmdnZ2lpaWpqamtra2xsbG1tbW5ubm9vb3BwcHJycnR0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+foGBgYODg4WFhYaGhoeHh4iIiImJiYqKiouLi4yMjI6Ojo+Pj5CQkJGRkZSUlJaWlpqampubm52dnZ+fn6CgoKGhoaKioqOjo6SkpKampqenp6ioqKmpqaurq62tra6urrGxsbKysrOzs7S0tLW1tba2trm5ubq6uru7u7y8vL29vb6+vr+/v8HBwcLCwsPDw8TExMbGxsjIyMnJycvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dfX19jY2Nra2tvb29zc3N3d3d7e3uDg4OHh4eLi4uPj4+Xl5ebm5ufn5+jo6Onp6evr6+zs7O3t7e7u7u/v7/Hx8fLy8vT09PX19ff39/j4+Pn5+fv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAABGAEMAAAj/AP8JHEiwoEGDQpacgbPn0KEqhwDtgeNlycGLGDNqvLgEjiRNIDFhsmSJhkiRIDU5OmNxo8uXCO1QAmmJks2blC7gvGkJpKQzQmAKzbgEkCZLiCIswDCkjyJIN3XuxNlTk52gQ7P+E2IUk01ECCYcOFCgadSpaEXCwarVpReROCW1ISKhgwQsks6iTYvoxowgbTEKOaTJZl6ciLRgeVMoUiRFOffundTDb+CDQiLVpPRICSC0j1yIUIIksuSpSlig6XPZIBoljmx2GeAi0lRHCRTUeGIpw+bTlCZ9YRGECCZJcAC1FujCABybYQZwgHpTUiRCFhSsOOMlgZfvbPo4/zq8U5JfEzHyWEKuvCAWQwen9GHUJo+iQ5QiFRlQxOaQExnENokkfUhRhRdDFLBAGIBEEMgedbAxhhdauKEIeZQEMsMNHhRHyXFntDdQEzd8YdAQkKThwQ5L0CECD0yYQIMkj0SggQiPRALIGV9goUQidCCAgBaSUGDdI40s0ocWFJ2RyGFdYEADDjvI0MdMKx1CkBZIeGEQD2ngMAEIJgiQgAg/IPBDJJK4QNsgE9aBhQVaNNLIGGE84QgFjvQ5CBYwrIAFIHJ4ccYik+BghA47NMrDJB8eMoaWjhjyhCCNGIQABkUoQYKZBkhpQBg2UeDCF1pw0MYhRUTxhSN2Jv8yw56OCDIFDC/Y8EILeyQSCBxatLFCDUZQuQMOaMRmFRz/pFFDDGkcRAQOeABSSBtLhKBABEr0AUdHaLRhggEi+MFEBzT4AUgVSogASAOAqGCCri/UywMgfkw0BA8QcBHDDozWcAMSaFiiBRE1NNrSQXZ4RUkaB3RwpSMmRCCEFnnQ0MC9aQAQgR9xLLCABQ0CMoUJK9Rb7wpFAfJGDTwEwIUOLCRcQxA3PKFFwgDvwANGh2z2iAhT2FRIBhG4gIUWJZzQwxJKJDAE1BxgYMISBizxQwspq/wCmVNCUQMBXEAxQg00LPFEEDUYC7AOMhwExxnB2ZSGAVjYJIQGGjD/sYccDRDAw9xhuAGHCiNM0FEDcExxBNe5rrDBBBYgsMIdSEBBxR0y7PDCFjyw0GjPOyRMhEFnNELDFHn1gQZUk0jBNx1wwMEDAErUXnsbSyEgBBwNuMHEET6sYMIEBRzggxNYQMHFFm1sbjYRVNTAsw6Mll6DDGEUdEYeJlgQiE2QTlLgAAPkAcfdBjCpuxsqSGDAE8DDMfzjFRQQwAKNOlHFFoPggxqo0AUcRAEKBWBU9gLGAh2cjiCH8MIALFAJnDxCC91JAO2AxQaWVKF2Z5ACGp5AP8Yp4QjEOwIPcBACH2hBDXwQIB/uwIc2ROEONRDACrHXMxxQyQQEGUMl/yJAgBI8ojpyqEIXLCAF3cGBDSo4AALaEIcIHCACIqCBG0x4hCnQ4AhAUAMLYKCGLtSgDUWgIR+0cEP9rZBK2bOeDLBAEDjgpogWPBAcvuBELZAAAx6oQRhcgIEHGAAJbKifG5TgAx8cwQJVqMIdojgBHGCABTW8wwEHAAAeYE+BLDCC2NAwEDsc4hJfmOBhLPEGGoCJDXqI5RkQoIAJ8GAKSnjABPZHhlg2IJZ6SAMRckCCDhBBDGogwh2WwAJlDuIOYtjCHVxALCrFQAdlI4IW6ugfF1gADpCihBRoIII2AFMPYWAACRCghCrQcn8fIAMe9PDLWM4zDVuoAgtYxv+HAEKTCCFQQwBnSAUo0CAGRuACAekYxEyIUwlKyINNIKGE5LlgnnFAghZ+gAMe9OELNVjAADLAAyz48pyxTEMXiLAFC6ygCv0kgQJIoIY72HQQVDDCCzRXh0b4oSMEsUNhrGMbm/ShAyYIwRsAAQgsZLEPTAUEHKRwgyCQIarvwipWvzCXLUCAB2oQQxXaMNAZ8mEJPGiDIyAlCYWU0ihoYUMYDJCAPTA1DBtIwUSgCog8cMkOfVBXVrWKVSXcAQdbYIAYBkpDm87wD3WjhCSqcIaBJKcwU8GTBRJAA0AIYQBjSQACXOCHPrigD4HgK1PhRVis9qEIYoyhbG16h/H/TEULWtiDQOBwCIftxAthiMMb6AAICwRAAAJQwAJMIAUeuEGwWGVta5mqrjzgoJ+N5cPcfsMTL1TBDrvtLVq8YK1CFIIQIoBAAYz5BdLowbzwhS8F4kvf+BoCtY3tAyH8MAbu2sQSZ6iCbv9hR/9SwhJj6EN8w8ADHmihD4IARCDqK18KW9gQgKhDIAxx3jFgFieYCPCAz+AIA4e4vg7hsIXjO98Vu9i8ZzDxt8D7DzbwIAMXyLGOL9AACvj4x0AOspCHTOQiNwDHO75ABpJQhfbYoRC+5YmT+kTlKlv5yrTCspatnAg2GJgSAXayeHcyCTYQYsto7hOf0uyIQgii/8pooMEQvDyVSeC2PXb9MCUGYYQmQGEJbWgEm7G85jS3CwuD6FMTeIBItEzWSwKJyIclwQQroAENW/hzGiTB6U57+tOdvgCoQS0ICSyAASKQAiPCkIYk7GEqlnCEW0v54TcEYQtjGIMZ0ACGJizhC48YtbBFLexO/4ABDIAABBjQATA1IRDhxMkhgGpZzCYCCFjItRWsMAY0mKHXQOiCIIrtaWJ/uhB94PQbkq1sZR+AA02gARZisxM7LEEPBHn1eqrQBDDkGgxbwLUZdN3rWwoCEuQ2t6d/sAIl0EEF7W73AuCdhQWoANjVYYmWCAIITKQhCNnOtRkGnmuRf9sKDv8WxExSwvIMsBwkfzDBeZAdcQgcgAZguIKpGaACOhxY1pUtyB76UNKR/9vfJU/6yWUghI+8XBMuZzkmcDCDDeXgBiGgubIRkIU00GAB7l4AZAGxBBoTRA9MqAEWLj3wbYOB5G1/uxusoIAC8CART496StAg8xvc4Op/D8Gyl22CDhxA2QxAABJ4sAeWXGQOaujzFi49hm3ruuRWmLwbMHCAEFTgtC/XuyYasQIWbOjvV7/6DATPgAOAfesmQMIOVMCDMVzEDpYowgdG0O9ub+Htl/+9G4IQsRCAYAMdwEPLUyIJIrDAL3/3e/SjzwILsDvZSBBAB7BAAiVc5BB9wAH/CMikgyZk3tslB8PcH1CBD2SgAx+YAAbCUJWoYwILY5Q+6gEf/RnkAAYFkHgDwwDYhgUqcBBoQAQwgDIoYwO6sgNgAHzdZgYj8AAh0AEZkIHxJwVOF3XgkwOAF4KptwMguCEhsALIhgXMo4JYwAQGAQcOMHFdkysOaANBgAOWdmkx0HkfgIEZuAErkG6cRmyN0AUkYAI5sAP+B3hL6Hc5MAMd4AQIUABA4AQ30AFR6H0F4QU84AU08AAgsDI0+AIToABBMAZNcAAVcIEb8IMdQAJeoDuMoztKEAIWgIRKCH2pl4QdAAQ7AAMYkHgMYAIs4AQ/YBBv8ANiEAUhoEsm/5ArYggC1kMDLdB+HbABmNiGLNAHmQASeocJW4AFYGACBRACjbIhS7gDLNABSBAAN2BALIAALGACTuCCBZEaWFAGQTAFH5BckcMCt6QHdfA4DwB/l4iBbzgHVFZojlAFWLAGSFAAArBeM5CHN7ADEIAFN1AASMA8N2ABs+gEWkgQOyBvVsACXgQAdMUCTBIbgzAFPtACxXiJ74eJLLAHy0hlRfiM0ag/AYBUMHCNJ7gGoggGN6CNEBCOtkgQNbACSNAFVeADIBABUOMFNgEIWiACNUCMmHiJGxB/HSAGdaBmVdYF/FgABmABMIAFWGACEACATrAGawAGTiABO3ADCf/JAj5iEFiAA3nQCIbABkPwAxz1HHaGhRspjxXwkZj4ARWQAU3ABYnQCBTQCIlACG2AAzGJBBjgACYAA0hwAyogAhZgAfyIA08gAivwjSwQAkhgIgXBBlNQZYTQKUSgBFpwBj05By5wBF/4lBmQifKnfnBQBw0gJz+AhbSIBEyAAz8gAg6ABXYgik4ABjswBEDhAjfJc0MQB1hABxkxBl0ACAm4BGqgAloACG3iA1/4g5MDAQlgAPA2Er6BADMwLZcEAUxABojwcAMSiszjYEJQBTwABEjwBIngCFhQAj+gBC5wEWMgAjhQBERQnUNQB5SwCC7AmsW4ARXAAAmQASX/0AMlQDeRIQEq0AEh0JYFgAKQFQjzhgY4wJJYMHtSoAdFsANRgI9SgAMJAAMW0AQXEQbjJAIdgAMcoARuEBt14AMfsAAPgAARUALjCQZZIAWQERlK0AhpoAILIgJPUAiSFRwZYAI06QQ7EAISQAikEQWDkAcLwAIQsADoohEFgJ4mwAZ2QF5xEARBUDUlQANJkAW9lmD0JhWUUAhTEASKgAUZmqR5IARewIIrYAEf8A9UiAQDgQAL8BKFNxCUsCNS0ARhwGBp0ANZcAVsQG96QQmN8Ad0gCGUQAZ2gARKoIJOYBEG8A8o0AEosBwCoQhaAAR+RgVJkARucERTgaSOm/YIZFAFSKACYKCCPwOoB9EIX0AFSwCRbnAI0YYTjEo+kuAIO7IEQoAFZPAEzOMELGCpGEEJjrAH3sUk+DgekNIbNTGqjnAIdsASS7AEXoAHilAIAlFMf+qqGHEcvBpgkYRBZ3AGDfCsWlAFv7oEVTAGpiQJmICsWrEepGoHc/MdJoBBhgIHegAI47Gt3Loc3tonh0BlnDYJ3BoQADs=';
	image["militar235"] = imgPrefix + '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';
	image["militar235_gs"] = imgPrefix + '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';
	image["misc35"] = imgPrefix + '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';
	image["misc35_gs"] = imgPrefix + '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';
	image["setup35"] = imgPrefix + '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';

	//Image for the down arrow (Thank you, DMaster)
	image["arrowup"] = imgPrefix + 'R0lGODlhCgAMAOZMAIStVElsPEhqO6fEhxxHEq/Jja7Fjlp/RMbNxvr7+oewVsXPxefp54mwWZi0laO7hTFGHYOleJeuecLSwHGMbWmJQmmFZVh/Tvf39zxQNDlJNHWSX5qtmVV1NOjs6Nrj2miIPkNYNp26hU9wR5S3Z52wgcTTwqnBh6K7mKK9l5KVku7x7qG/gq/KjZS4Zio3IoqmbdPe0Wd2Zevw65G1cqHCeZKygc7XzrTLk566jfn6+a7JjFVqRHKGXJCqdZ29ebDEq5e6anJ9cKa9o3KXQ0xeR9/h3ytEJoStU1t8R5KkkO/z7v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEwALAAAAAAKAAwAAAddgEyCTA5Dg4dLNheHgyYDBzeMCSg1MBSMHyIuJwErh0A/DQUbHIMzOSQAOw8jgxMsCkgtOEkLTDopQUQVEgY+FkwxNCAQGhk9JQIeER0vKhhGMiE8SgRCDIcIRUeBADs=';
	//Image for the up arrow (Thank you, DMaster)
	image["arrowdown"] = imgPrefix + 'R0lGODlhCgAMAOZMAIStVElsPEhqO6fEhxxHEq/Jja7Fjlp/RMbNxvr7+oewVsXPxefp54mwWZi0laO7hTFGHYOleJeuecLSwHGMbWmJQmmFZVh/Tvf39zxQNDlJNHWSX5qtmVV1NOjs6Nrj2miIPkNYNp26hU9wR5S3Z52wgcTTwqnBh6K7mKK9l5KVku7x7qG/gq/KjZS4Zio3IoqmbdPe0Wd2Zevw65G1cqHCeZKygc7XzrTLk566jfn6+a7JjFVqRHKGXJCqdZ29ebDEq5e6anJ9cKa9o3KXQ0xeR9/h3ytEJoStU1t8R5KkkO/z7v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEwALAAAAAAKAAwAAAdfgEdFCEyFTAxCBEo8ITJGGCovHREeAiU9GRoQIDQxTBY+BhIVREEpOkwLSTgtSAosE4YjDzsAJDkzhhwbBQ0/QIZMKwEnLiIfwUwUMDUoCck3BwMmyYUXNkvVTEMOwYEAOw==';		
	//Image for the speed icon on troop tooltips (Thank you, DMaster !)
	image["speedl"] = imgPrefix + 'R0lGODlhGgAQAPcAAAAAAAICAgQEBAYGBgkJCQ0NDRAQEBISEhYWFhkZGR0dHR8fHyIiIiQkJCYmJigoKCsrKy4uLjMzMzU1NTc3Nzg4OD4+PkFBQUdHR0tLS01NTU9PT1JSUldXV1lZWV5eXmJiYmVlZWdnZ2hoaHFxcXNzc3R0dHd3d3l5eYGBgYKCgoSEhIaGhomJiYqKioyMjI2NjY+Pj5CQkJGRkZWVlZqampubm5ycnKGhoaampqioqKurq6+vr7Ozs7S0tLW1tbi4uLm5ub6+vr+/v8PDw8fHx8nJycrKyszMzM7Ozs/Pz9HR0dLS0tfX193d3d7e3uDg4OHh4eLi4uPj4+Tk5Ofn5+jo6Onp6erq6uzs7O/v7/Dw8PLy8vPz8/T09PX19fb29vj4+Pn5+fv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAaABAAAAj/AP8JHEiwoMAzOBpgqGKwoUAiQrAM1FIAAIATDgs+iTFAgAIQN5hYgWARRsaBQDQIsFCCQgABBkQQ6ZCiy8l/QxoAcHHlH5gWBCwGMXOzzAsABnwIDMOiQAEYCSSIGUhGBoqCZDxgYCJwSQYAF4r8swGAh0AnIQBEMAjGi8AcCQqoCCPwCwMGWo4sAOCBYcMpJCxuQAJmoA4AFgocoEHGYZEGAig4eGlhRpR/XiIAeKDE4ZYZTmlwufJjREUFVv4lWTHFoRQNASIYIVjjgAAWUzOO4aEAgAkqA6eI2NzjJhcTAg7sIAhF5wcpN7NUAMCBK8ElE2AQvdkEQQq6BrncAxwYEAA7';
	image["speedr"] = imgPrefix + 'R0lGODlhGgAQAPcAAAAAAAICAgQEBAYGBgkJCQ0NDRAQEBISEhYWFhkZGR0dHR8fHyIiIiQkJCYmJigoKCsrKy4uLjMzMzU1NTc3Nzg4OD4+PkFBQUdHR0tLS01NTU9PT1JSUldXV1lZWV5eXmJiYmVlZWdnZ2hoaHFxcXNzc3R0dHd3d3l5eYGBgYKCgoSEhIaGhomJiYqKioyMjI2NjY+Pj5CQkJGRkZWVlZqampubm5ycnKGhoaampqioqKurq6+vr7Ozs7S0tLW1tbi4uLm5ub6+vr+/v8PDw8fHx8nJycrKyszMzM7Ozs/Pz9HR0dLS0tfX193d3d7e3uDg4OHh4eLi4uPj4+Tk5Ofn5+jo6Onp6erq6uzs7O/v7/Dw8PLy8vPz8/T09PX19fb29vj4+Pn5+fv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAaABAAAAj/AP8J/FcFQwMcZwYqXMhw4AkAAApoGYhFCJGGGGFAhGCFyQ0QCgQMiPEE48IuKToQEWFAQAAKJSwI0ADE5EIzQSASaAHm3xUXABoMaYhCBpmBYiQkgFGgAIswAn0YAPCizMIIAEI4EcgDgI1/RS4AyLBEIBMMHo4qrOIBwIIjWhgw+CIwjIoCCXII9NKTIRkaBwpYAKBjIBgkGyCSmGLzn5IHACJ4+RdlhswADigIaFCk8ZQVSf5ZURBxxI8rXGg0nbGlsUAxLAQcqKHQSIQAGqS4FtgDsgjGAqmYAKCAx5jdUj4EhaJwxwEBJrjsNgNjQlmFTDgAqJBl9z/pDMOkBEDQJCAAOw==';
	//Image for the capacity icon on the troop tooltips (Thank you, Brains !)
	image["capacity"] = imgPrefix + 'R0lGODlhDwAQAOZ/AKqlmopuQKyMVpqETFdGI3psSqaXe6ySVczJwpWKcqSdjuLf2aWKWWdQLJqUhYRxQ3tjQLy3qtnTzk09IlpVRod9aP38+mFLLMLBtJ2FW/f38qmOXKWKVpd7RpuOaaKGVN7c1vTz7m5bMpODXHdfN////o12QqqPWqOFRaeNV5d9TotzRYtxQmhVLoBnP62PWJl6Sop1Rf7+/f39/aKhmqiGVI9xRaSHUph+TZGAZJyFYWFTP21WOqiLXY9ySuzp5J+MVJF4SZR5SOLh3Z2AVGVOJ722pfHu525iNrCkiLSvoLe3sk1EKcS7ZVlKNF9XPpF0SH59aczIv/n595GCaXdqMW9qUIVpPGFSNI99Tp6LWnJaK2tVMmpfPquKWNTLxMvGuKSRWKuPXefm4u/s6aGLUqSPUDsvGISBb3ttQIJnN7iuYYBsN5iQe4lrPIVwTZF+TIuAXPPz8/b19WJUKKCCUaKMYpmBULCTW5mAVJ2HU2NFJpp8SVZBIZ1+TP///yH5BAEAAH8ALAAAAAAPABAAAAfsgH+CfyFSVkoIDksyQwgWglMRCR5rdDwXbRFoURh/cxUtF2xNdHsuTxVgITQlDg0rKy5VSA8EFAoSMnIyCXYnLCoHYSJnFBgzg0cjQFkiDDEEE1gAMoMWcVVpLSQtRS4kfQDIfwsjbA8PJBB5KgFbBAB/GgZ3dRspH0QMHTZXF0wavmjhAwPPCwEfOJgI4uaCk3kfYLDgIOBFihQDBqjpU0GGDj81fEDhIEaMECE4uEwA8ScDCgE9OJwQw4BFBhc7FghKYubGhwMvDpSBk6YLS0FkPOgxUcfLgBgFHIwZJOiHkRwQ3lBRoJPqn0AAOw==';
	//Image for the bookmark locks (Thank you, DMaster !)
	image["unlockedl"] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAQCAMAAADDGrRQAAAAAXNSR0IArs4c6QAAAYBQTFRFAAAA/sSU9XQV+4Ym/ta2/d3D9nEN/3kB7qsT/+LI/+ra8LMc/qJS8bti/ePP/4ES/7p+//37/vPq/+HG/c+t/pY8/+XN/eHM9deD9oMv/8CI+3oO/7h5/4MVq4xa9oQwp4ZS9n4n///+/5Mz/7Rx7JwW8MdK9+Kz8a8R/atl//fw+Iw5996g/byI7ak6/uTR+uvI++zP8bAs+ee38Lgc9Kwe78Nw//Tq+KFi+JRJ/30I+eSu/frx+oAg/PTg/+3E7Z8E/6RU6Y4H+HUS99WMuZFU+JxZ7J0t/tGr/u7j7qgE/7Jt/6le920E+9mH/KNZ+n0X+okw//v4/9Cl64MF6oQI8cs+6Y0PpYE8++zJ/+7IqolU88JY9chU765H8bMWzYYdmHtL+u/S++7U/+jU/d/J/9q68L4o88V666YN/4AP76oK17h89duh+XMJ9t2m9r9l//Xt/phA/XkK+3UG++Kn9tKF//v3/6BM8cxa+7F3//Hk8LBO+u3B9slM65cFJqizLQAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AsOFwYDc4wxCQAAANVJREFUGNNjYEAA82AeUU1WQSQRpWoZK2npElsRJMFCmeIqcX3dADYWhLI0dkYQ7ZFnCRcLkmLmAtGComxwsXKVQE8wo8iXQYtLTFhYmDNFrMKWFSzGo83gZsTvqCzLnyWr7M0iBBJjFWFQDKuNNLCPMky2s2FMhZojmV4pIZEjl5uvniQlDhWTN1GLjUlUMCvTMRbgg4nFc3Bzyynw8mZYI8Q0uE1No11rClxK4WKS2ZkcHAkR7npxfj4wMUUvh3qnkNBwVaM6K5gdFmxMUODsLwQRAgAIGCOyrkYbMQAAAABJRU5ErkJggg==';
	image["locked"] = imgPrefix + 'R0lGODlhDAAQAOZ/APvx0qmIUvnqtc2ra//Fk/+bQ/p2Cf6xZvuROvp+HP15CZ6AT/6GHfV1GPRnAP+4ePnpuP54AfGtS/nowu2dFv7Opv/aufvmqu+0DfXEXvGuQPtzAfCvE/RoAf/y6P7Gj+2ZFfeWT/XCQf+RMPTRfvS7X/nqxMOaW/zbw/iQQOeDBumLB/qlZPPFVvK+NP/JmPjmve7PNf2WP/bYkPK/We2dBf+hTv7x6PvKpfydT/TThv2rWP7y6fmNOv/DjvnqwPK2If/Qpvd5GPDAHvbdo//r2Pvfp//hx/K8Yv+1c/25dfDVR/+iUPLTb/+/humQE+mQGfCiHvyFIvrciPz35u+lEeeDCvhuAemOD/+rYP+vaPHKVPO0OPO6PPvhu/CtIvjnuPTHcu/IK/LEb/uTP/+7f//Mn/C6F/zBkvXblvjovu+lBOuUBvh3D//XtPG3Se2dLv+pXP7fwPXYmv+fSvKrF/fSg/fotPRrB/qlQP+oW/9/DfqMNcGZV//z6f///yH5BAEAAH8ALAAAAAAMABAAAAesgH+CFQUMDExHgoosGwoIPQZ7boo4VzIegjxkI0WCKQp+in83Bk6CCTaignxxp1qqfwhZfyhtBRZBLwQEaFJ6fnhcXh9KBwc7eUZyZg5Ldz9qMBMmAgBUPg4xTSQ6AwNzRGAAZQ5iWy00CwtjJGkQDw5DLl1vfSdIYTMC8GdAdVEBAkgoYedCEgcYOFQB8QQKHA0ZptDpsKYGmxUqrGCh8EVEhBANQooUKSRHIAA7';
	image["unlockedr"] = imgPrefix + 'R0lGODlhEwAQAOZ/AP7ElPV0FfuGJv7Wtv3dw/ZxDf95Ae6rE//iyP/q2vCzHP6iUvG7Yv3jz/+BEv+6fv/9+/7z6v/hxv3Prf6WPP/lzf3hzPXXg/aDL//AiPt6Dv+4ef+DFauMWvaEMKeGUvZ+J////v+TM/+0ceycFvDHSvfis/GvEf2rZf/38PiMOffeoP28iO2pOv7k0frryPvsz/GwLPnnt/C4HPSsHu/DcP/06vihYviUSf99CPnkrv368fqAIPz04P/txO2fBP+kVOmOB/h1EvfVjLmRVPicWeydLf7Rq/7u4+6oBP+ybf+pXvdtBPvZh/yjWfp9F/qJMP/7+P/QpeuDBeqECPHLPumND6WBPPvsyf/uyKqJVPPCWPXIVO+uR/GzFs2GHZh7S/rv0vvu1P/o1P3fyf/auvC+KPPFeuumDf+AD++qCte4fPXboflzCfbdpva/Zf/17f6YQP15Cvt1Bvvip/bShf/79/+gTPHMWvuxd//x5PCwTvrtwfbJTOuXBf///yH5BAEAAH8ALAAAAAATABAAAAfRgH8QBCgUC1I2f4qLjIITPHMaGjkbeiGNjAMFTywuFnlyG3CYizhtR4wABmWXpAUUEIwJAhlRpH9McY1IUCN2tyoLjQQ8dxVjCBLKFQkpEwSMEUUxDkAiHA5pHCJKA5hkIFV8WC8+WTBiPTsAmBYYZngXF2sdbG4mYRmYDR4zJVxbwHyoUWeFjAf7PHg5oEBBhw8MGJzRgbARvxMKaNDQQmTPmyF0KjJqgEENmgMHvlwx0qJLkyXtQCT54SfIFCpWSMTokwNThBsFAggdKlSIk0AAOw==';
	//Image for a bookmark, external link (Thank you, fr3nchlover !)
	image["external"] = imgPrefix + 'R0lGODlhCgAKAKIFAAChAf+AALjogArGASnGAf///wAAAAAAACH5BAEAAAUALAAAAAAKAAoAAAMlWFrRvoMsNsNYAWgQBAZKVwhXxnhCQ5gCkYIXOAaFXE+3su1LAgA7';
	//Image for dorf1.php link in village list
	image["insidev"] = imgPrefix + 'R0lGODlhEAAQAPcAAAAAABAQEBgYGCAgICgoKDg4OEBAQFhYWGBgYHBwcH9/f/8AAP4ICP4wMP5AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAiSAP8J/KdAAICDAAQoGMgwwMEBBgwMOBiA4b+DBSz+K3BwoEMEGgUiAFAxAQADAxksWMBgoAEACRwOXNmgwcqBJAEQEKiSIUuBBA4eELjAAUMHCwQeEErU6ECkSg/u/NdzZst/QWUSXVDzpkCSJlHyXHn138sE/z6G/Dey4lcAGS1yBGDRIQCIEimGLIgw4cKBAQEAOw==';
	//Image for dorf2.php link in village list
	image["outsidev"] = imgPrefix + 'R0lGODlhEAAQAPcAAAAAAAgICDAwMAB/DkBAQBCGHBiKJCCOKyiSMziaQkCeSliqYGCuaHC2d3++hQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAiSAP8J/OfAwICDAww4GMiwwMEDChQcOFiA4b+DCSz+S3BwoEMGGgUyGFCxwQAFAwMAABBgoIIBDRwOXClAwMqBJAcgEKiSIUuBCA4uEAiAAEMCAAQuEErU6ECkSg/u/NdzZst/QWUSBVDzpkCSJlHyXHn138sG/z6G/Dey4tcBGS1yHGDR4QCIEimGLIgw4cKBAQEAOw==';
	//image for the center map function
	image["centermap"] = imgPrefix + 'R0lGODlhEAAQAPcAAAAAAAATfwx0FRB3GRZ8Hxh9IRl+IxQu/yQ+/yBG5S9J/0NZ/0Ve/0xj/2B1/xyAJSOELCmJMzCOOTaRPzeSQTuURT+XSE6gVk+gV1alX1ukal+pZmGsaXe4fnizvIC9h5up/5LHmJvLoKXQqbjbvKLjqbj/osvT/8LgxcvlztXq2ODv4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAiHAAMs+EewoEGDDgIgOMiwIIMADRo2VBAAhESGBwKc+DeBwkWCAQJoKBDAwoqLI0KaCBCCwAeGKyxIKBEgQQATJi5AQFHwA4EQOD2oxGniwYZ/AirgDMmUKE4OA1JA+OC0Ks4HPP9doGAVZwYJJwuKeGA1QoeGKswSfUDiYwYKGCR8LGjAQMOAADs=';
	//image for the distance (ltr & rtl servers)
	image["distl"] = imgPrefix + 'R0lGODlhDAAMAPcAAAAAACpIgjJWmTdkqzhstDh0uzh7wEdhklJkiFRmiUNjoUhwsFJwqFZ7t1J/vTiExTiMyTiUzTWn1FmEv0mAwEiGxEeVy0CYzlOUy1aVzFacz06x2FKh0nCWxnyey2+k0X+hzHiq1Hus1VvB317D342pz4q02Jew0pW62qOuxajT5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAMAAwAAAhZAP8JFDiCxMCDAlVIkLAB4cELESJwcDjQAgQIGgZ+CCHCBAoMD0Jm+GegpMmTBioUWMmyZQEK/zp4AFHihAMCOCdQXDBgQAOKCgQIYEAxRYAABygKRJAAYUAAOw==';
	image["distr"] = imgPrefix + 'R0lGODlhDAAMANUqADh0uzh7wDhstDiExTWn1DJWmTiUzTdkqypIgjiMyVvB33CWxlacz0eVy0CYzkdhkn+hzG+k0Yq02I2pz6jT5Hiq1FJwqHus1Zew0laVzFRmiVZ7t06x2FKh0lJ/vUiGxFOUy1JkiFmEv0NjoUhwsHyey17D30mAwJW62qOuxf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACoALAAAAAAMAAwAAAZIQJVQaFIMj0IOgUBBCjsGg8OpYiQSDWpmwAWhJJdKRPUJmM/owAnAbrsBKpFg7sFMIKXFcHM4kKhCFgUFI4AqDwgIKYYaIUhBADs='; // Distance Icon - RTL servers
	//image merchant
	image["merchant"] = imgPrefix + 'R0lGODlhCgAMAPcAAAAAAAAEBQQAAAACCw4GEwARAA8TAg8WDgQZEg8cFRMLAB0WBB0aCRwgHxQ0KSYoGywhHTUvHyInKy0tISwsJC45Kys+PDo1IjM1MjgyNBxFMzNFNzlLMyJMQjZISjxbXj94aU8/L0c6MUZFM1BQTktXY1xkT0V5Y0B4d1B2a2JfQGxeQ2xlS25sXXFsWHl6anR6el+LjmKupFXRyW3NyXLTyoKAZ5GHbpSRcJyXeZ6bfJqRgJ+Xio+hi6eZjq+qjaWikbOti7GtlLiykKamsrvEp8XFoczXt9POsdjUt83Hy+LW2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAKAAwAAAhuAP/9W7HggQqBCIOEgJBBwQ2E/3L4WEJAwA6ISEQoIWKhQhKIPBp4QNGBA8R/G1LQkKGhCEIbBU7MqAGih0AjBgKUiPEhgRCIMAY4QHAA4Y8WGCQcMTEBiEAWESiQ+DfkAgMdAl2MeCGQAQMcAQEAOw==';
	//image for the different wall types (wall/palisade/earth wall) and the rally point - used for the building upgrade table
	image["empalizada"] = imgPrefix + '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';
	image["muralla"] = imgPrefix + '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';
	image["terraplen"] = imgPrefix + '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';
	//Image to replace the rally point (g16.gif)
	image["rallypoint"] = imgPrefix + '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';
	// images for the resource fields in the upgrade table
	image["r0"] = imgPrefix + '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';
	image["r1"] = imgPrefix + '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';
	image["r2"] = imgPrefix + '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';
	image["r3"] = imgPrefix + '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';

	//image reload (for update all villages on the 'dorf3.php' pages
	image["reload"] = imgPrefix + 'R0lGODlhEgARAPcAAAAAABpAthlDuRlHvBpIvCZGtyNJuRlLwBpMwBhQxBhUyBhZzBde0Bdi1BZn2BZr3Bds3BZv3xdw3x9x3RVy4hV15RV35x575iJTwiRhziNm0j9oyiF+6Epkwkh30keC20WS62eM12iD0GiG0nuP03qU13yS1Xqa3GWa5GWg6GWh6nmm53qs63mu7niv74ag3YWw66S55ae96Ki55bG846fC7K3E6q3K76fG8KfJ8rDA57DJ773L6rDM8rfN8LbR9LzS88rT68rT7MnZ8dXc7tfe79je79nf8Nvh8Nzi8d7j8t/k8uDl8uHm8+Po9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAASABEAAAjjAP8JFFgkCZMmTZgkGYjkxsB/RJT0cAGCAwcQLnosUfLDAhOBRoa0uFChpMkLLXKUdCJwiAoKMGPKjMlSCYsIESSkwCEQRwoJOHE6KbJjwgMIMJoMbALk6IOnTpKscOAAhdKBPqhqdeCEyYcGDWoYGWgDrFmwS5poYMDg4b8jTJzIlbvkX5MMCxa43TuQiQcFCmTw3ZvkRIIEIa4OJJIkxsKBOjAcQPBCsd0XCDbwGKikxIABBEbMEDhjBIHPJR4KESGgtevXIoS4DWLCQIDbuA2YCMJXCQ0SHQoU6ECChpKHAQEAOw==';
	//image small map for link to travmap
	image["smap"] = imgPrefix + 'R0lGODlhDAAMAPcAAAB/DgAm//8AAP/YAICAgP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAADAAMAAAIPgAJCBxIcKAAAQQKKEy4kMBBhgUgClyoMGKBAAEmWqSIUaPEih5BgmSYcMAAiSQLmEQJAMDHhi1fRixIk0BAADs=';
	//image for the Add bookmark link (Thank you, DMaster !)
	image["addbookmark"] = imgPrefix + 'R0lGODlhEAAQAOZ/APV+AfaRA/748/qdVfvKpvl0CvV6APunC/54AvZ8JP/7+P/t3f/9/P/49PijB/2rDv/59P3Dk/7z6v/ewP/HaPeBAvx7DP/u4P62OPzBVv+xSfidBv3o2f/Kc/eQRf/z6fyiM//cr/7q2fSPAfuwKvzQsP/FYvuLBf2uDv+xa//69fuLDv++T//9+/V1Fv+4cP25QvR2APmwJv/VkPSDAPWgAvyqDf/Kmv67RvecBf/lzf/w4v/KcfRpAf/37/iPQf/MlPaEBv/Vp//dpP/gxPipB/q0gP/YtfvJo/eiDvzLpf/isf/Nof/XsvzUtv/IbP+mRP2pEf6sE/+vF/iaVfyfUv+TJf+vGPqoGP/17P717v/VmPusbvmLNPytbv2safaCLf+9dfuZJPhvAf+jU/+mV//DXP/RhvWUAv/Xk/WBAP/38vehBvmmCf2pDvV5H//Lnf/8+fy6RP2XP//+/fafBP7AV//lz/+ybf+/U/++Uf7CWPx9CvRpBP/27v///yH5BAEAAH8ALAAAAAAQABAAAAezgH+Cg39ZO4SIiE0piY0QeAgijYgTYSBck4MKEVsZBReIDAo+C3dHQkMUYnM3RAt+cUxlZC9AIUtpT3saUFZ8BV4qVSswHTNnPCZmdnIyQT9afwwDFVgYLHl6OCRJAD8Ngy0DYwdSU1dRGz0e4IQfFm4PNg8HOX0ciToIKG1sDg51YjhJBOdEETQGDASoQcNIoi8B1CQgUAIMgBFUEnVxEUGAIAVI3iSgQ0iBEgmJ1hBoFwgAOw==';
	//image for the Add this page as bookmark (Thank you, DMaster !)
	image["addbookmarkthispage"] = imgPrefix + 'R0lGODlhFwAQAOZ/AP/69v+rQ/l8GPV+AfaEMf/RlfqKL/2qDP3Zvf/Kmv6SMvuuI/738f/x5v/kzf/m0vacBP/48v/PgPlxBfumZf/v4f717fu7i/dxCv/27//HlP/BivWRAv/GZv/59faEA/mscf/8+vmlCP16CfyMBf+1MvzHnv/BW/ZsBP/Fkf6ubf/Ytf+DFfulYvuzef26RP7n1fypZv///v/s3f7q2fqhWv/9/P57B//Sqv+zb/mAIf/fwv/69f/+/f+6ff7dwv6mWv2HIf6zLP/VsPvLqP+sYv/Oif2taf+fSfZ/JvigBvR4APicWPqpGf+LJP6/VPuWB//UpPmna//coP/frP/79/mvef7r3feNQPSMAf/juPy3gPhzCPeTSfyWQv+aQPyhL/7z6vmeDPvBl/qpbfusbviECf2qaPeiEvqmH/2pYv/AdP/o1f+uZ/6jNP+oWv+zXP/hx/zRsfuTHP7Xtf/Ylv/Lc//Ej//NoP/Ibf+/eft5DP58DPq4h/+9gv///yH5BAEAAH8ALAAAAAAXABAAAAf/gH9/PAkbgocAFRmHgkM4EYdVGgqQjBU+OIx/AG13kD0rLJWMO3pHNpo8RRshGUgqmn8NGkYCP7EJCjMafAiHMiFVO1F1YDEVHj2HcSxnTgYwIQ8PDjsreFp1JyNfPikadCFsBjojLX8efgFwawVUUxIdTwFuc2ZlkGoYNzWCHlsT0rzIY6fDiRcL0HwAwUAQkAn8EPVBIWZBiRJCmkAYYKWhoDdcbpxD5ILEgZMHlHyQ4lFQDi5BDDxglMCkiJtKBlywpEDHGQy+BFXJAUUEhwEcIGRhEubQjj0UZqAgc6iBl41YxnRZwoEAjUMqUFwJAUKAB0EOMCQhYuFPBjkEKZbc+lNFAIgQbikYOEvDRANNFkzAoKuAwiJBFlzs/IMqlg1lG1y0/RMIADs=';
	//image for the bookmark spacer (Thank you, DMaster !)
	image["addbookmarkspacer"] = imgPrefix + 'R0lGODlhEwAQAOZrAP/+/f/8+vZrAPumZP/59f/7+P/JmP+SMf57B/x0APhuAPmAIf7r3fuiWvlvAP/69f/Gkvy0ef/BivqCIv727/+rYf/Ej/3ZvP/Ci/2qZ/dyDPdxCPqRPvumYv56CP/s3f6RMvytbPulYv58DP/t3f95AfqmZ/+JIP/9/Py8iv6nWv2NLvp+F/mIL/+EFvmKMv/hxv+aQPuxeP+uZ/VrBPqtcf/Sqv/GlPyqaP/69v+oWvhxB/uyef/Aiv/48//17f61ePxzAP/p1f/27/mrcf2QMf+MJv/27v7s3f57CP+LJPqpbf/Ytv/48vdtBP/9+/dsAPhyB/3Kov/79//59P/Wsv+CFP7n1f3YvPqILv/t3Pd4F//ewf3l0/+fSPyUPvt5DP/VsP/48f2pYv6vbfhzCP2HIf+IH/+mVv717f+wa////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGsALAAAAAATABAAAAengGtrDwYSgoeIYTZihwU3RVSIkjkzFk1rAEwuPpKdDxUYAUdeIZ2mBgcfECMXpp0wVjhKWVcorodPQisLHiKYt4hjGwgNaydnQUBVMSUJJGhGCV9rKjvEaw4KAjJSDlACDBPaHGs6UUkdwJJqZWYtXeqCWgcLGRpY8WtcYCZINEv5yDhhEKDGFgLqprAgEmDNkAEvEAIwVQDEAAqHfvBIcatHhDSCAgEAOw==';
	//image for the bookmark edit (Thank you, DMaster !)
	image["editbookmark"] = imgPrefix + 'R0lGODlhEAAQAOZ/AP/x5P7z6v7t3/SdBv/8+fq3hv/lzv/69P/cvP/17PiYUffYS/VuCfpzBfhuAfV5HfVqAffZhf/Fkfq8jvmqcf/7+f7p2PZ/KfV2Gf+3d/K/NvVqBPeuKP738fu+j//+/fZyEP/38f/Djv+cRfngqP/38PVzE/nplfbcb/+zb/isMf/Hlv+9hPXaZvTCSPTRYfnWZfeCKvXHWf+4efq6jPffefp+HP+gS/WcEfXTav/o0/jhiPbcaf+MJ/7IkvrbofVxEP/GkvXUJP/Qpv/TrPyrVfLMJf+uZvfQPPfhZvmwevz03P7v5P7m1P/Ytf7ox/PCQvadIvzJovLLQvjNTvnaafjWUvveqvjaU/G4Hf/XtO/DHP1+EPixNf2gUfu5XP+oW//jyv/kyvzln/2xcfZxEPdvBv+SMvqdMPSYFPafF/u9jPjUX/XMLf53Af+8f/qHKvnnifvqw/SeCv7q3P+JIP/u3/+fS/nWbPnfo/vuzP7uz//Il//LnP/o1P///yH5BAEAAH8ALAAAAAAQABAAAAfYgH+CgwRBd3aDiX8fJYs6TiIsBH8Jk4IJWnxhRAgAe24jK2deAoIARwB9Fno5UzVPEmNmTYNDGSdQUSBlaRpJHBSJGWIaGxMBARMbWW0xlwYpcg4TiR4OLQ5rATdvBi8gHYkhXBFVag82aFRbQOGDB3URC3MmAVIMRhAeiQg9KBAFLAiCg8dFAxEhDhiQ8IPNhURkvsSRUQTMDB9XlqhQMshPgwUckPDIQ2IHjC5CMAj8I0DBAwoXIGCxguMCBQYKSgkiwORPhQIDBtCo8IeOJUUsMTxwlygQADs=';
	//image for the "Close" button in the Travian Beyond Setup
	image["closeButton"] = "data:image/png;base64,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";

	//images added because of the "no-cache" option of the new Travian pages
	image["def1"] = imgPrefix + 'R0lGODlhEAAQANUgADtsLWU+ALt+IOTLpjdcANDczPL399ClY6/CxNXEqLzO0MLU1lppANStcFl6MpmusEJsH+jw8avAo39tFCucAD5GAJqjYpR4Tezz9IVRAMGymdDh4znQACF6ABZPACyhAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACAALAAAAAAQABAAAAaOQMXGACoaj4aNELGJHI+RDROzeQA82CwW8NhgQAtAp/P5cDjlMWBh9IzL53THc3STzejPmN5+4+V8RRB+cXodEEcObnB5cw5HFgR3hR0EFk8MHoxlHgxPAxMEmx8EEwNGDQIZFZpxHhUZAg0gA6oBGhIeFBQeEhoBsQMHGbdFBVgFRb8ZBwkXGk9PGhcJQQA7';
	//Image to replace the  def_i.gif
	image["def_i"] = imgPrefix + 'R0lGODlhEAAQALMLANDh45musLt+IIVRAOO2AL2OAEQoBXFDB8p6Em9DCZdZCv///wAAAAAAAAAAAAAAACH5BAEAAAsALAAAAAAQABAAAARIcC1Fa7pYLlS7TxIHeF+oBCNJgZtioKrCcseblq1SwzhH7YRepUYoCDqzTs0wOK40vl+teWCZPMuq5qrUbrmW7xbhu4jFlHMEADs=';
	//Image to replace the  def_c.gif
	image["def_c"] = imgPrefix + 'R0lGODlhEAAQAKIHAEQoBZmusMp6EtDh43FDB29DCZdZCv///yH5BAEAAAcALAAAAAAQABAAAANNeGfc9VAd0aotitqNZx3gQDhZAwYBOBqddgJAGowtMwQAod90adw524zlA654RI8BgDQmPQTYSPpU6hjXqpIj6Woqna5EoHmIzwsDOgEAOw==';
	//Image to replace the att_all.gif
	image["att_all"] = imgPrefix + 'R0lGODlhEAAQANUgALzO0P/SAIGXmeTLpuzz9PTimdStcPL390RSU5R4TdXEqMLU1ujw8dClY6a0tt7AXIaNjnqLjeTHXL/S1IVRAMGymeXSmbt+IK/CxGU+AJmusOO2AN7q672OAHGIitDh4////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACAALAAAAAAQABAAAAaRQMDnACoaj4ePEPNhHI+MD5Pw0Xw4TxCn+iGAFh/B9bgVL4wYgGes/XgAmKcAs+ZsPRhBFuTRrN1+WQVFHhOAHkWDRhYbbX0eECAbFkcWHQGHCA4BHZRHHRuPCBEeGx1PAxegAUUBphcDRgYXFBkdoKYdGRQXBiCptRUgFg8SlBW7sA3BeyDIFA0KCcLNzgkKQQA7';
	//Image to replace the bluebullet (b1.gif)
	image["bulletBlue"] = imgPrefix + 'R0lGODlhDAAMANU4AABDx2F1/wA8/3KD/wA2/wBBxwBV/ABT9gBJ4IeT/wA8sgBExQBBuB5G/wNBzQBQ7QBO5ABAwgBH3xtS/wBDyQBIywA9uWh7/wA9qQBT8gJE/73E/ztd/wAx/x9f9WZ5/wBFvQA4nQA+tQBK4wBQ4wBD/wBG/w1X9QBGzABCvgA4pgBDwgBJ/wBL3gA6pQBT/wBP/wA5oQA//0B6/wBF/wA5pABT9ydP/////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADgALAAAAAAMAAwAAAZyQJwQF6u5YsNhTZSKFBaM2jBmQcxYJEgL4BIqJLPBxmYwPFa4EIh1fdFKJlpLpaKMMm4BoXGTpVQoBzZuBDcBNx0VMQuCMDINAQk3EwU4DAg2jhwJAzceQjUAD44XHzczDkMuKy02AhonqUk4GAopaENBADs=';
	//Image to replace the green bullet (b2.gif)
	image["bulletGreen"] = imgPrefix + 'R0lGODlhDAAMANU3AAG/AACxAgOpAFTlcWjkgwDZEgGpAEXnZAWdAAbtJgWoAATWAAXRAADZFwOXAATKAAfBAAfjCgihACDqPQbOAAKdAEvmaQXCAAaQAAC+AASaAADZGwOrAAHbAALtE0nmaADZDAatAADbDQLBAJvfqQWuAAGlAADZCAWGAAS9AALZAAONAASiAAWlAADZAgDZBwWJAADZCgDZDyXqJwTSAA3sKwSMAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADcALAAAAAAMAAwAAAZxwJvwBrPZYMOhTcMyGRQI2xBWAcxekEtKIL05MrMBibZYPFo3lOR1VcVAp1hqteKMKO5CI1GTsVYlDDRuDTUHNRshMAqCLjIJBwQ1HgY3CAA0jhMEAzURQjYCD44WHzUzAUotKTQFIh2pSTcYDixoQ0EAOw==';
	//Image to replace the yellow bullet (b3.gif)
	image["bulletYellow"] = imgPrefix + 'R0lGODlhDAAMANU4ALJ6AP/zcs2VA/arAOCdAP/3h//RAP/eHsWHALh9AP/LAP/wYceKAPywAMeMAO2lAMyNAOOgAJ1qAN+eAP/PG//xZqlyAP/FAsmNAP/BAL1+AOSdAPKmALmBAPWyDf/WALV8AMuJAP/EAPW7H//jO+OaAP/6vcKIAP/waKVwAKZzAN6aAMKFAP+4AP+0AP++AL6CAP/LQKRvAKFtAP/CAP/IAPerAP/eJ////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADgALAAAAAAMAAwAAAZyQJwQN5OlZsOhDAQ7ORAJ2XDWIcRepc2KkRICJrGAydZoPFg4ieZ1ddFEGdpKpcJEOG6F4XCrwVQQAzZuBjcLNx8hMwiCLTUHCwU3FA44CQQ2jiQFATcjQjIMD44oFTcxAkMpLCs2ChceqUk4FgAwaENBADs=';
	//Image to replace the red bullet (b4.gif)
	image["bulletRed"] = imgPrefix + 'R0lGODlhDAAMANU4AMcbAP+XYbIWAMUYAPYgAP9BALgVAP+zh/whAP87AMcaAOAfAP+jcv9fHs0jA+0fAP8xAKkSAN8gAP/Vvf9OG+MaAOQcALUWAP80AP+baMkbAL0TAP90O/VCH8IbAOMgAPIdAP82Av+bZssWAPUvDZ0RAP9GALkZAMwZAN4dAP8oAP8kAL4WAP8uAMIXAKYVAKUTAP8yAKQTAP84AP9fQKESAPcgAP9kJ////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADgALAAAAAAMAAwAAAZyQJwQV5PBasOh7MLyAAYG2bB2WtBaFUtKARMKJDTGxIZAPFy40qZ1XcUwkFjq9dJ8QO5EoXGbsV4oBDZuBTcBNyYjNQOCKjMNAQc3FAA4Bgs2jhwHDDcdQjIKD44ZIjc0DkMwLik2CSEkqUk4EQIsaENBADs=';
	//Image to replace the grey bullet (b5.gif)
	image["bulletGrey"] = imgPrefix + 'R0lGODlhDAAMANUhAMrKyqqqqunp6bi4uOTk5J+fn62traenp+Hh4bOzs76+vt/f38HBwaCgoLu7u9TU1PX19cfHx8nJyZWVlZubm7S0tKKioqSkpNXV1bKysqampqmpqc3Nzby8vJiYmL+/v5mZmf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACEALAAAAAAMAAwAAAZnwJAw5PGAPMOhp3HRbA4WpNBjSWA+lUpmAxIWMhgCpKNQDDShyeVz/bjdGRBoU3G8PwDO5wIKdDpvHAt6AR4Hf24ACwIcEhshVYAfDwIEHBFTGwNuCAgcGAZDIBoZkgyhSSEUBU1JQQA7';
	//image to replace the Delete icon (del.gif)
	image["del"] = imgPrefix + 'R0lGODlhDAAMANU2AN4ZCtAgFNAgHdsgA9waCs4cDMwkHPNfHcspJ9oYCsoYDc8pINAYCvg0AORNOeFFPtA7O+c+QNRTU8BMSb4gHN5lTNooGsc1N+g+PuEkJOhOKLlVWOwxD9MlGtUiFMwjFcI7LtcfDPY9ANs5L+JMSOxhJLRDO+YfDdYEAPdvHORZRMkZC9EcDcwXE8ssLtonG9gbG+M8EOEZGdkZDNwVCb0pKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADYALAAAAAAMAAwAQAZJQNNgYisajzZVDHRMBJC2TEvxOY40HNfRsEJGYBKS51gS1aA2gCXVQEApDONDBikuCmgMioV2vC5FMx1GFQchG0g0BDYnAmhFQQA7';
	//Image to replace the Construction icon (bau.gif)
	image["bau"] = imgPrefix + 'R0lGODlhCgAQAOYAAP///7y+wFRVXuPSwlRXXsnIxHJ1e09SWnd8gXF0enp8gfT09djDsUhLU46RlI2QlMbHyP78+dO/r7q8v/39/fn18Lq7u8zNzeLj45qcnJeYmU1QWP38++7j2FtcYene0vXv5/Dr6Pj4+H+ChlNWXtbY2GBjabeqoPT19aqusWVnb0tOVo2QkY+SlFhcY6+xsKOlpN3PxFZYYHZ4flJSV6Gkp9G7qNTV1XN2fIiLkd3NvtO+rPn288rKy66wtN7NvdjOxtzd3+nq6tXCsWVnbXZ5f8LGx/r6+uzk3gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAKABAAAAdhgACCgwAVDCGEgx0SHImCPzGOABE7SJIgNjySH0OSAAM6nidAkihEPYkTKUYeEIRBLhsPNAoBJQALOAQNCCMwBUIUOSQHRQ4aFiIAPisyBi0ZF4MqAiYsLxiEMwk1N0eJgQA7';

	
	//update the script (by Richard Gibson; changed by ms99)
	function updateScript(SCRIPT) {
		var divUpdate = elem("DIV", "<b>" + T('CHECKUPDATE') + "</b>");
		var a = get(dmid1);
		if (a) a.appendChild(divUpdate);
		try {
			if (!GM_getValue) return;
			GM_xmlhttpRequest({
				method: 'GET',
				url: SCRIPT.url + '?source', // don't increase the 'installed' count; just for checking
				onload: function(result) {
					removeElement(divUpdate);
					if (result.status != 200) return;
					if (!result.responseText.match(/@version\s+([\d.]+)/)) return;
					var theOtherVersion = RegExp.$1;
					if (theOtherVersion == SCRIPT.version) {
						alert(T('NONEWVERSION') + ' (v ' + SCRIPT.version + ') !');
						return;
					} else if (theOtherVersion < SCRIPT.version) {
						alert(T('BETAVERSION') + ' (v ' + SCRIPT.version + ') ?!');
						return;
					} else {
						if (window.confirm(T('NEWVERSIONAV') + ' (v ' + theOtherVersion + ')!\n\n' + T('UPDATESCRIPT') + '\n')) {
							window.location.href = SCRIPT.url;
						}
					}
				}
			});
		} catch (ex) {
		}
	}

	function newTable(cAttribute) {
		var aTable = document.createElement("TABLE");
		if (cAttribute != undefined) {
			for (var xi = 0; xi < cAttribute.length; xi++) {
				aTable.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
			}
		}
		return aTable;
	}
	
	function newRow(iHTML, cAttribute) {
		var aRow = document.createElement("TR");
		aRow.innerHTML = iHTML;
		if (cAttribute != undefined) {
			for (var xi = 0; xi < cAttribute.length; xi++) {
				aRow.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
				if (cAttribute[xi][0].toUpperCase() == 'TITLE') {
					aRow.setAttribute('alt', cAttribute[xi][1]);
				}
			}
		}
		return aRow;
	}
	
	function newCell(iHTML, cAttribute) {
		var aCell = document.createElement("TD");
		aCell.innerHTML = iHTML;
		if (cAttribute != undefined) {
			for (var xi = 0; xi < cAttribute.length; xi++) {
				aCell.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
				if (cAttribute[xi][0].toUpperCase() == 'TITLE') {
					aCell.setAttribute('alt', cAttribute[xi][1]);
				}
			}
		}
		return aCell;
	}
	
	function newImage(cAttribute) {
		var aImg = document.createElement("IMG");
		if (cAttribute != undefined) {
			for (var xi = 0; xi < cAttribute.length; xi++) {
				aImg.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
				if (cAttribute[xi][0].toUpperCase() == 'TITLE') {
					aImg.setAttribute('alt', cAttribute[xi][1]);
				}
			}
		}
		return aImg;
	}
	
	function newLink(iHTML, cAttribute) {
		var aLink = document.createElement("A");
		aLink.innerHTML = iHTML;
		if (cAttribute != undefined) {
			for (var xi = 0; xi < cAttribute.length; xi++) {
				aLink.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
				if (cAttribute[xi][0].toUpperCase() == 'TITLE') {
					aLink.setAttribute('alt', cAttribute[xi][1]);
				}
			}
		}
		return aLink;
	}
	
	 /**
	* Function that does absolutely nothing. Used when there is no other choice but need to use a function
	*/
    function dummy() {return;}

	function getRandomTimeRange(maxrange) {
	    var nr = Math.floor(maxrange * (0.6 + 0.4 * Math.random()));
		return nr;
	}

	/**
	* Function that extracts the name of a file path or URL
	* Params: path = Path or URL to extract the filename
	* Returns: The name of the file that points to the path or URL
	*/
    function basename(path) { return path.replace(/.*\//, "");}

	/**
	 * Convert a number to a string with 2 digits (for time representation)
	 * Params: n = Number to convert
	 * Returns: the string of 2 digits
	 */
	function convertTo2DigitString(n){	return (n > 9 ? n : '0' + n); }

	/**
	* Wrapper for the function getElementById
	* Params: aId = Text of the ID of the element to look for
	* Returns: Element of the document with the specified ID
	*/
    function get(aID) {
        if (aID != "") {
            return document.getElementById(aID);
        } else {
            return undefined;
        }
    }

	/**
	 * Multiplica cada elemento de un array por un valor
	 * Params:
	 *	a	Array con los elementos a procesar
	 *	n	Valor numero por el que multiplicar el array
	 * Returns:
	 *	Nuevo array con los valores calculados
	 */
	function arrayByN(a, n){
		var b = arrayClone(a);
		for (var i in b) { b[i] *= n; }
		return b;
	}

	/**
	 * Realiza una copia por valor de un array
	 * Params: a = Array to copy
	 * Returns: the new array (a copy of the a array)
	 */
	function arrayClone(a){
		var b = new Array();
		for(var i in a){ b[i] = a[i]; }
		return b;
	}

	/**
	 * Suma el contenido de dos arrays. Si cualquiera de los dos tiene valor nulo, se devuelve una copia del otro
	 * Params:
	 *	a	Primer array sumando
	 *	b	Segundo array sumando
	 * Returns:
	 *	Referencia a un nuevo array con la suma
	 */
	function arrayAdd(a, b){
		if(!a){ return arrayClone(b); }
		if(!b){ return arrayClone(a); }
		var c = new Array();
		//for(var i = 0; i < Math.max(a.length,b.length); c[i] = a[i] + b[i++]);
		for (var i = 0; i < Math.max(a.length,b.length); c[i] = a[i] + b[i++]);
		return c;
	}
	
	/**
	 * Remove an element of the current document
	 * Param: elem = Element to remove
	 */
	function removeElement(elem) {
		if (elem) {
			if (elem.parentNode) {
				elem.parentNode.removeChild(elem);
			}
		}
	}

	/**
	 * Mueve un elemento de lugar en un arbol DOM
	 * Params:
	 *	elem: Elemento a desplazar
	 *	dest: Nuevo padre del elemento
	 */
	function moveElement(elem, dest){
		removeElement(elem);
		dest.appendChild(elem);
	}

	/**
	 * Sum all the values of an array
	 * Parameters: a = Array a with values to sum
	 * Returns: Sum of all values of the array a
	 */
	function arrayToInt(a){
		var h = 0;
		for(var i in a){ h += a[i]; }
		return h;
	}

	/**
	 * Inserta un nodo despues de otro
	 * Params:
	 *	node		Nodo de referencia
	 *	referenceNode	Nodo a insertar
	 */
	function insertAfter(node, referenceNode) {
		node.parentNode.insertBefore(referenceNode, node.nextSibling);
	}

	/**
	 * Create a new element
	 * Params:	tag	Type of the element
	 *		content innerHTML (content)
	 * Returns:	a reference to the new created element
	 */
	function elem(tag, aContent){
		var ret = document.createElement(tag);
		ret.innerHTML = aContent;
		return ret;
	}

	/**
	 * Realiza una busqueda en el documento usando XPath
	 * Params:
	 *	xpath	Expresion de busqueda
	 *	xpres	Tipo de busqueda
	 * Returns:
	 *	Referencia a un elemento resultado de XPath
	 */
	function find(xpath, xpres, startnode){
		if (!startnode) {startnode = document;}
		var ret = document.evaluate(xpath, startnode, null, xpres, null);
		return  xpres == XPFirst ? ret.singleNodeValue : ret;
	}

	function getCrtServer() {
		crtLocation.search(/http:\/\/(.*)\//);
        fullServerName = RegExp.$1;
		var aServer = fullServerName.replace(/\.travian\./,'');
		return aServer;
	}

	function getCrtUserName() {
		//try to get the current user name
		var crtUserName = '';
		var crtUserNameLink = find("//div[@id='" + dleft + "']//table//a[contains(@href, 'chatname')]", XPFirst);
		if (crtUserNameLink == null) {
			dleft = 'sleft';
			crtUserNameLink = find("//div[@id='" + dleft + "']//p//a[contains(@href, 'chatname')]", XPFirst);
		}
		if (crtUserNameLink) {
			crtUserName = crtUserNameLink.href.split("%7C")[1];
		}
		return crtUserName;
	}
	
	function getCrtUserID() {
		crtUserID = '0';
		var crtUserIDLink = find("//div[@id='" + dleft + "']//table//a[contains(@href, 'spieler.php')]", XPFirst);
		if (crtUserIDLink == null) {
			dleft = 'sleft';
			crtUserIDLink = find("//div[@id='" + dleft + "']//p//a[contains(@href, 'spieler.php')]", XPFirst);
		}
		if (crtUserIDLink) {
			crtUserID = crtUserIDLink.href.split("uid=")[1];
		}
		return crtUserID;
	}

	function getLanguageAndPlusStatus() {
		//for Travian 3.5
		var imgPlus = get("logo");
		if (imgPlus != undefined && imgPlus != null) {
			plus = imgPlus.getAttribute("class");
			if (plus) {
				var ahref = imgPlus.parentNode.href;
				if (ahref) {
					var aLang = ahref.split(".")[2];
					detectedLanguage = aLang.replace("/", "");
				}
				plus = true;
			} else plus = false;
			if (detectedLanguage) switchLanguage(detectedLanguage);
		} else {
			//for Travian older versions
			imgPlus = find("//img[contains(@src, 'plus.gif')]", XPFirst);
			if (imgPlus != undefined && imgPlus != null) {
				imgPlus.src.search(/\/img\/([^\/]+)\//);
				detectedLanguage = RegExp.$1;
				if (detectedLanguage) switchLanguage(detectedLanguage);
			}
			
			// Plus
			if (find("//img[contains(@src, 'travian1.gif')]", XPFirst)) plus = true; else plus = false;
		}
		//log(3, "detectedLanguage = " + detectedLanguage + "; plus = " + plus);
	}
	
	function getGMcookie(aName, addNewDid) {
		var aNewdidActive;
		var strGMCookieName;

		if (addNewDid == undefined || addNewDid == null) addNewDid = false;

		if (addNewDid == true) {
			if (newdidActive == undefined) {
				aNewdidActive = getNewdidVillage();
			} else {
				aNewdidActive = newdidActive;
			}
			strGMCookieName = gServer + '_' + crtUserID + '_' + aNewdidActive + '_' + aName;
		} else {
			strGMCookieName = gServer + '_' + crtUserID + '_' + aName;
		}
		var gmcookie = GM_getValue(strGMCookieName, false);
		var valueToReturn = decodeURIComponent(gmcookie);
		return valueToReturn;
	}
	
	function setGMcookie(aName, aValue, addNewDid) {
		var aNewdidActive;
		var strGMCookieName;
		
		if (addNewDid == undefined || addNewDid == null) addNewDid = false;

		if (addNewDid == true) {
			if (newdidActive == undefined) {
				aNewdidActive = getNewdidVillage();
			} else {
				aNewdidActive = newdidActive;
			}
			strGMCookieName = gServer + '_' + crtUserID + '_' + aNewdidActive + '_' + aName;
		} else {
			strGMCookieName = gServer + '_' + crtUserID + '_' + aName;
		}

		if (aValue) {
			GM_setValue(strGMCookieName, encodeURIComponent(aValue));
		} else {
			GM_setValue(strGMCookieName, false);
		}
	}

	function appendGMcookieValue(aName, values, addNewDid) {
		var newValue = '';
		for (var i = 0; i < values.length; i++){
			if (values[i] != ''){
				newValue += values[i];
				if (i != values.length - 1) newValue += '$';
			} else {
				return;
			}
		}
		var cookieValue = getGMcookie(aName, addNewDid);

		if (cookieValue != "false" && cookieValue != '') {
			cookieValue += "$$" + newValue;
		} else {
			cookieValue = newValue;
		}
		setGMcookie(aName, cookieValue, addNewDid);
	}
	
	function addGMcookieValue(aName, values, addNewDid) {
		var newValue = '';
		
		for (var i = 0; i < values.length; i++) {
			if (values[i] != '') {
				newValue += values[i];
				if (i != values.length - 1) newValue += '$';
			} else {
				return;
			}
		}
		var cookieValue = getGMcookie(aName, addNewDid);

		if (cookieValue != "false" && cookieValue != '') {
			if (cookieValue.indexOf(newValue) == -1) {
				cookieValue += "$$" + newValue;
			}
		} else {
			cookieValue = newValue;
		}
		setGMcookie(aName, cookieValue, addNewDid);
	}

	function updateGMcookieValue(aName, values, addNewDid) {
		var newValue = '';
		var boolUpdate = false;
		
		for (var i = 0; i < values.length; i++) {
			if (values[i] != '') {
				newValue += values[i];
				if (i != values.length - 1) newValue += '$';
			} else {
				return;
			}
		}
		
		var cookieValue = getGMcookie(aName, addNewDid);
		
		if (cookieValue != "false" && cookieValue != '') {
			var arrCookies = cookieValue.split("$$");
			for (var i = 0; i < arrCookies.length; i++) {
				var aCookie = arrCookies[i].split("$");
				if (aCookie[0] == values[0]) {
					arrCookies[i] = newValue;
					boolUpdate = true;
				}
			}
			if (boolUpdate == true) {
				cookieValue = arrCookies.join("$$");
				//for (var i = 0; i < arrCookies.length; i++) {
				//	cookieValue += "$$" + arrCookies[i];
				//}
			} else {
				cookieValue += "$$" + newValue;
			}
		} else {
			log(3, "newCookie => value = " + newValue);
			cookieValue = newValue;
		}
		setGMcookie(aName, cookieValue, addNewDid);
	}
	
	function removeGMcookieValue(aName, indexNo, reloadPage, aFunctionToRunAfter, addNewDid) {
        return function(){
			if (confirm(T('ELIMINAR') + ". " + T('AREYOUSURE'))) {
				var cookieValue = getGMcookie(aName, addNewDid);
				if (cookieValue != "false" && cookieValue != '') {
					cookieValue = cookieValue.split("$$");
					cookieValue.splice(indexNo, 1);
					cookieValue = cookieValue.join("$$");
					setGMcookie(aName, cookieValue, addNewDid);
					removeElement(find("//*[@id='" + aName + "']", XPFirst));
					if (reloadPage) {
						history.go(0);
					} else {
						aFunctionToRunAfter();
					}
				}
			}
		}
	}

	function deleteGMcookie(aName, addNewDid) {
		setGMcookie(aName, undefined, addNewDid);
	}

	/**
	 * Create the path of the image, taking into account the possible graphic pack
	 * Params: ref Relative path of the image
	 * Returns: Absolute path of the image
	 */
	function img(ref, lang_dependant) { //return (!lang_dependant ? localGraphicPack + "img/un/" + ref : localGraphicPack + "img/" + detectedLanguage + '/' + ref); }
		var imgPath = '';
		if (ref == 'img/x.gif') {
			imgPath = ref;
		} else if (!lang_dependant) {
			imgPath = localGraphicPack + "img/un/" + ref;
		} else {
			imgPath = localGraphicPack + "img/" + detectedLanguage + '/' + ref;
		}
		return imgPath;
	}

	/**
	 * Compute the identifier of the cell having the x,y coordinated
	 * Params:
	 *	x	Coordinate X
	 *	y	Coordinate Y
	 * Returns: the ID of the cell coresponding to the given x,y coordinates
	 */
	function xy2id(x, y){
		return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));
	}

	/**
	* Inverse function for xy2id(x, y) => id2xy(id)
	*inspired from Travian3 Beyond Hacked FR (mik french (fr), A_r_e_s (br), Booboo(hu) )
	*/
	//function id2xy(vid) {
	//	var x = (vid % 801) - 401;
	//	var y = 400 - (vid - 401 - x) / 801;
	//	return ("" + x + "|" + y);
	//}
	
	/**
	* Inverse function for xy2id(x,y) => id2xy(vid)
	* Version proposed by fr3nchlover.  Thank you !
	*/
	function id2xy(vid) {
		//var x = (vid % 801) - 401;
		var x = (vid%801?(vid%801)-401:400);
		var y = 400 - (vid - 401 - x) / 801;
		return ("" + x + "|" + y);
	}

	function arrid2xy(vid) {
		var arrXY = new Array;
		arrXY[0] = (vid%801?(vid%801)-401:400);
		arrXY[1] = 400 - (vid - 401 - arrXY[0]) / 801;
		return arrXY;
	}
	
	/**
	*Compute the second for a given human time
	 * Params: humanTime (e.g. 23:45:23)
	 * Returns: the number of seconds corresponding the the param humanTime
	 */
	function ComputeSeconds(humanTime) {
		var p = humanTime.split(":");
		return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1);
	}

	/**
	* Custom log function
	//param {int} level
	//param:{istring}  Message to log.
	*/
    function log(level, msg) {
       if (level <= LOG_LEVEL) {
          if (console != undefined) {
             console.log(msg);
          }
       }
    }

	//convert a number of seconds to "human understandable time" => format h:mm:ss (or h:mm:s?)
	//this is the "inverse" to the "ComputeSeconds" function
	function formatTime(s, returndays){
		if (s > -1) {
			var hours = Math.floor(s/3600);
			var minutes = Math.floor(s/60) % 60;
			var seconds = parseInt(s % 60);
			var t = "";
			if (returndays) {
				var days = Math.floor(hours/24);
				hours = hours - days * 24;
				t = "" + days + ", ";
			}
			t += hours + ":" + convertTo2DigitString(minutes) + ":" + convertTo2DigitString(seconds);
		} else t = "0:00:0?";
		return t;
	}

	/**
	 * Get the new Dorf ID (newdid) of the current village
	 * Returns: the new Dorf ID (newdid) of the current village or 0 (zero)
	 */
	function getNewdidVillage(){
		var aX = xpathResultEvaluate('//a[@class="active_vl"]');
		if (aX) {
			var aLink = aX.snapshotItem(0).href.split("=");
			var villageNewdid = parseInt(aLink[1]);
			return villageNewdid;
		} else return 0;
	}

	/**
	 * Get the ID of the current village
	 * Returns: the ID of the current village or 0 (zero)
	 */
	function getIdVillageV3(){
		//get the villageID using XPFirst (works for one village - after reading the singleTown name/coordinates/newdid from the profile of the player - and for more villages - directly from the existing village list on the right side -
		var a = find('//a[@class="active_vl"]/../../td/table/tbody/tr/td', XPFirst);
		var villageID = "0";
		var villageName = '';
		var retValue;
		if (a) {
			try {
				var x1 = a.textContent.replace("(", "");
				a = find('//a[@class="active_vl"]/../../td/table/tbody/tr/td[3]', XPFirst);
				var y1 = a.textContent.replace(")", "");
				villageID = xy2id(x1, y1);
				var villageLink = find('//a[@class="active_vl"]', XPFirst);
				if (villageLink) {
					villageName = villageLink.textContent;
				}
				retValue = villageName + "|" + villageID;
			} catch(e) {
				retValue = getIdVillageFromCookie();
			}
		} else {
			retValue = getIdVillageFromCookie();
		}
		return retValue;
		
		function getIdVillageFromCookie() {
			//get the singleTown villageId from the GM "cookies"
			var singleTown = getGMcookie('singleTownNI', false);
			if (singleTown != false) {
				var singleTownArray = singleTown.split("|");
				var villageID = singleTownArray[1];
				var villageName = singleTownArray[0];
				return villageName + "|" + villageID;
			} else {
				return "0|''";
			}
		}
	}


	/**
	* Calculates the movement in pixels from 23 link
	* lateral (villages or custom links)
	* Returns: The shift in pixels
	*/
	function longitudPantalla(aTable){
		if (boolIsT35 == false) {
		var topx = 0;
		var rightx = 0;
		var leftx = 0;
		var bx = 0;
		var middlex = 0;
		var menux = 0;
		var troopx = 0;
		var mapx = 0;
		var maxTopY = 0;
		var middlex1 = 0;
		var middlex2 = 0;
		var navix = 0;
		var docElem;

		docElem = get(dTop1);
		if (docElem != null) topx = parseInt(docElem.clientHeight);

		docElem = get(dlright1);
		if (docElem != null) rightx = topx + parseInt(docElem.clientHeight);

		docElem = find("//td[@class='menu']", XPFirst);
		if (docElem != null) menux = topx + parseInt(docElem.clientHeight); //+60

		docElem = get("navi_table");
		if (docElem != null) navix = topx + parseInt(docElem.clientHeight) + 30;

		docElem = get(dleft);
		if (docElem != null) leftx = topx + parseInt(docElem.clientHeight); //+60

		docElem = get("lmidlc");
		if (docElem != null) middlex = topx + parseInt(docElem.clientHeight);

		docElem = get(dmid);
		if (docElem != null) middlex1 = topx + parseInt(docElem.clientHeight);

		docElem = get("lres0");
		if (docElem != null) middlex2 = topx + parseInt(docElem.clientHeight);

		docElem = get("ltbw1");
		if (docElem != null) middlex2 += parseInt(docElem.clientHeight);

		docElem = get("lrpr");
		if (docElem != null) middlex2 += parseInt(docElem.clientHeight);

		docElem = get("ltrm");
		if (docElem != null) middlex2 += parseInt(docElem.clientHeight); //+170

		docElem = get("lbau1");
		if (docElem != null) middlex2 += parseInt(docElem.clientHeight);

		docElem = get("map_content");
		if (docElem != null) {
			docElem = docElem.firstChild;
			if (docElem != null) mapx = topx + 10 + parseInt(docElem.clientHeight);
		}

		maxTopY = leftx;
		//log(3, "leftx = " + leftx + "; navix = " + navix);
		if (navix >= maxTopY) maxTopY = navix;
		if (menux >= maxTopY) maxTopY = menux;
		//if (rightx >= menux) maxTopY = rightx;
		if (middlex >= maxTopY) maxTopY = middlex;
		if (middlex1 >= maxTopY) maxTopY = middlex1;
		if (middlex2 >= maxTopY) maxTopY = middlex2;
		if (mapx >= maxTopY) maxTopY = mapx;
		//log(3, "leftx = " + leftx + "; navix = " + navix + "; rightx = " + rightx + "; middlex = " + middlex + "; middlex1 = " + middlex1 + "; middlex2 = " + middlex2 + "; mapx = " + mapx + "; topx = " + topx);
		//log(3, "maxTopY = " + maxTopY);
		
		if (maxTopY < 0) maxTopY = 0;
		
		var maxX = document.body.clientWidth;
		//log(3, "maxTopY = " + maxTopY);
		maxTopY = maxTopY - (docDir[0] == 'left' ? Math.floor(topx * 3/4 - 30) : -30);
		} else {
			var dfooter = get("footer");
			if (dfooter) {
				maxTopY = dfooter.offsetTop;
			}
		}
		return maxTopY;
	}

	function calculateResourceTime(need){
		var maxTime = 0;
		//var a = null;
		//var res_table = '';
		var boolTb = false;
		var cRTstyle1 = "color:#404040;font-size:8pt";
		var cRTstyle2 = "color:#404040;font-size:6pt";
		var cRTstyle;
		var resTable = newTable("");
		for (var i = 0; i < 4; i++){
			need[i] = need[i] - 0;
			var restante = need[i] - currentResUnits[i];
			if (restante > 100000) cRTstyle = cRTstyle2; else cRTstyle = cRTstyle1;
			if (restante > 0) {
				if (productionPerHour[i] != 0) {
					var tiempo = Math.round(restante / (productionPerHour[i] / 3600));
				} else {
					tiempo = -1;
				}
				if (tiempo < 0 || capacity[i]-need[i]<0) {
                    maxTime = 'Infinity';
					var aRow = newRow("");
					var aCell = newCell(gIcons["r" + (i + 1)], [['style', tdNoBorder]]);
					var bCell = newCell(' ' + restante +' ', [['style', cRTstyle + '; ' + tdNoBorder], ['align', docDir[1]], ['id', "timeout" + i]]);
					var cCell = newCell(' ' + T('NEVER') + ' ', [['width', '220'], ['style', cRTstyle + '; ' + tdNoBorder], ['align', docDir[1]]]);
					aRow.appendChild(aCell);
					aRow.appendChild(bCell);
					aRow.appendChild(cCell);
					resTable.appendChild(aRow);
					boolTb = true;
                } else {
                   if (tiempo > maxTime && maxTime !='Infinity') maxTime = tiempo;
                   tiempo = formatTime(tiempo + 5);
				   var aRow = newRow("");
				   var aCell = newCell(gIcons["r" + (i + 1)], [['style', tdNoBorder]]);
				   var bCell = newCell(' ' + restante +' ', [['style', cRTstyle + '; ' + tdNoBorder], ['align', docDir[1]], ['id', "timeout" + i]]);
				   var cCell = newCell(' ' + tiempo + ' ', [['width', '60'], ['style', cRTstyle + '; ' + tdNoBorder], ['align', docDir[1]], ['id', 'timeout']]);
				   aRow.appendChild(aCell);
				   aRow.appendChild(bCell);
				   aRow.appendChild(cCell);
				   resTable.appendChild(aRow);
				   boolTb = true;
                }
			}
		}

		if (maxTime == 'Infinity'){
			var xRow = newRow("");
			var aCell = newCell(T('LISTO'), [['style', cRTstyle + '; ' + tdNoBorder], ['colspan' ,"2"]]);
			var bCell = newCell(T('NEVER'), [['style', cRTstyle + '; ' + tdNoBorder]]);
			xRow.appendChild(aCell);
			xRow.appendChild(bCell);
			resTable.appendChild(xRow);
			boolTb = true;
            //a = '<table align="' + docDir[0] + '">'+res_table+'<tr><td style="color:#404040;font-size:8pt" colspan="2">'+T('LISTO') + '</td><td style="color:#404040;font-size:8pt">' + T('NEVER')+ '</td></tr></table>';
		} else if (maxTime > 0) {
			var tiempo2 = formatTime(maxTime + 5); // a 5 seconds addition to compensate differences between JS timer and server
			var aDate = new Date();
			aDate.setTime(aDate.getTime() + (maxTime * 1000));
			var xRow = newRow("");
			var aCell = newCell(T('LISTO'), [['style', 'color:#000000;font-size:8pt; ' + tdNoBorder], ['colspan', '2'], ['align', 'center']]);
			var bCell = newCell(computeTextTime(aDate), [['style', 'color:#000000;font-size:8pt; ' + tdNoBorder], ['colspan', "1"], ['align', docDir[1]]]);
			xRow.appendChild(aCell);
			xRow.appendChild(bCell);
			resTable.appendChild(xRow);
			boolTb = true;
            //a = '<table align="' + docDir[0] + '">' + res_table + '<tr><td style="color:#000000;font-size:8pt;" colspan="1">' + T('LISTO') + '</td><td style="color:#000000;font-size:8pt" colspan="2">' + computeTextTime(aDate)+ '</td></tr></table>';
		}
		//return a;
		//log(3, "exiting CalculateResourceTime with boolTb = " + boolTb);
		if (boolTb == true) {
			return resTable;
		} else {
			return null;
		}
	}

	/**
	 * Formatea el tiempo needed hasta alcanzar determinada fecha
	 * Params: fecha: Objeto de tipo Date con la fecha futura
	 * Returns: Cadena de texto con el calculo de tiempo restante
	 */
	function computeTextTime(fecha){
		var dtNow = new Date();
		// Calcula la diferencia de hours entre la fecha dada y la actual
		// para saber si se trata de las proximas 72 hours
		var hours = ((fecha.getTime() - dtNow.getTime()) / 1000 / 60 / 60);
		hours += dtNow.getHours() + (dtNow.getMinutes() / 60);
		var timeRemaining='';
		//if (hours < 24) timeRemaining = T('TODAY');
		if (hours < 24) timeRemaining = "";
		else if (hours < 48) timeRemaining = T('TOMORROW');
		else if (hours < 72) timeRemaining = T('PAS_MANYANA');
		else timeRemaining = T('ON') + " " + convertTo2DigitString(fecha.getDate()) + "/" + convertTo2DigitString((fecha.getMonth()+1));
		return timeRemaining + " " + T('A_LAS') + " " + convertTo2DigitString(fecha.getHours()) + ":" + convertTo2DigitString(fecha.getMinutes());
	}

	/**
	 * Calcula el tiempo maximo estimado hasta conseguir los resources especificados basandose
	 * en la cantidad actual y en la production de cada tipo de resource
	 * Params: needed: Array con la cantidad deseada de cada tipo de resource
	 * Returns: Tiempo maximo en seconds hasta conseguir los resources deseados
	 */
	function calculateTime(needed){
		var tiempo_max = 0;
		var tiempo = 0;

		for (var i = 0; i < 4; i++){
			var restante = needed[i] - currentResUnits[i];
			if (restante > 0){
				tiempo = Math.round(restante / (productionPerHour[i] / 3600));
				if (tiempo > tiempo_max) tiempo_max = tiempo;
				if (tiempo < 0) tiempo_max = 'Infinity';
			}
		}
		if (tiempo_max > 0 && tiempo_max != 'Infinity') tiempo_max = formatTime(tiempo_max + 5); // Se introduce un margen de 5 seconds para compensar posibles desviaciones en los temporizadores de javascript
		return tiempo_max;
	}

	/**
	 * Calcula y muestra el tiempo estimado hasta el llenado/vaciado de los almacenes y graneros
	 */
	function calculateFillTime(){
		var resl4 = get('l4');
		//if (resl4 == undefined || resl4 == null) return;
		var tbodyelem = resl4.parentNode.parentNode;
		var beforelres = tbodyelem.childNodes[0];
		var timeToFillRow = newRow("");
		for (var i = 0; i < 4; i++){
			timeToFill[i][0] = -1;
			if (productionPerHour[i] < 0) {
				timeToFill[i][0] = Math.round(currentResUnits[i] / (-productionPerHour[i] / 3600));
				var strRemainingTime = formatTime(timeToFill[i][0]);
			} else if (productionPerHour[i] > 0) {
				timeToFill[i][0] = Math.round((capacity[i] - currentResUnits[i]) / (productionPerHour[i] / 3600));
				var strRemainingTime = formatTime(timeToFill[i][0]);
			} else if (productionPerHour[i] == 0) {
				timeToFill[i][0] = -1;
				var strRemainingTime = "Infinity";
			}
			if (strRemainingTime == -1) {
				timeToFill[i][1] = "<span id='timeouta' style='font-weight:bold;color:#008000;'>" + T('NEVER') + "</span>";
			} else if (timeToFill[i][0] <= 0) {
				timeToFill[i][1] = "<span id='timeouta' style='font-weight:bold;color:#FF0000;'>" + strRemainingTime.blink() + "</span>";
			} else if (timeToFill[i][0] < 7200) {
				timeToFill[i][1] = "<span id='timeouta' style='font-weight:bold;color:#FF0000;'>" + strRemainingTime + "</span>";
			} else if (productionPerHour[i] < 0) {
				timeToFill[i][1] = "<span id='timeouta' style='font-weight:bold;color:#FF0000;'>" + strRemainingTime + "</span>";
			} else {
				timeToFill[i][1] = "<span id='timeouta' style='font-weight:bold;color:#008000;'>" + strRemainingTime + "</span>";
			}
			if (productionPerHour[i] < 0) {
				var productionFormat = "<span style='color:#FF0000'>" + productionPerHour[i] + "</span>";
			} else {
				var productionFormat = "" + productionPerHour[i] + "";
			}
			var aCell = newCell('(' + productionFormat + ', ' + timeToFill[i][1] +')', [["style","font-size:9px; color:#707070; text-align:" + docDir[0] + "; padding-" + docDir[0] + ":25px;"], ["colspan","2"], ["valign","top"]]);
			timeToFillRow.appendChild(aCell);
		}
		tbodyelem.insertBefore(timeToFillRow, beforelres);
	}

	/**
	 * Get a script text message
	 * Params: aText: the "index" of the text to return
	 * Returns: the translated (or English) version of the text searched for
	 */
	function T(aText){
		var retText = '---';
		if (xLang[aText] != undefined) retText = xLang[aText];
		return retText;
	}

	/**
	* get current resource units, capacity or warehouse/granary, production per hour
	*/
	function getResourceInfo() {
		currentResUnits[4] = 0;
		productionPerHour[4] = 0;
		var intImg = 0;
		for (var i = 0; i < 4; i++){
			var a = get('l' + (4-i));
			if (a != undefined && a != null) {
				//get current resource units
				var resIppH = a.textContent.split("/");
				currentResUnits[i] = parseInt(resIppH[0]);
				currentResUnits[4] += currentResUnits[i];
				//get capacity of warehouse/granary
				capacity[i] = parseInt(resIppH[1]);
				//get production per hour
				productionPerHour[i] = parseInt(a.title);
				productionPerHour[4] += productionPerHour[i];
				
				//get the resource namespaces
				if (i > 0 && boolIsT35 == false) intImg = 1;
				var resImg = a.previousSibling.previousSibling.childNodes[intImg];
				//log(3, "resImg = " + resImg);
				//log(3, "res" + (i + 1) + " = " + resImg.title);
				xLang['RECURSO' + (i + 1)] = resImg.title;
			}
		}
	}

	//change the browser title, get active village coords and coords for the cell/oasis/village opened from the map
	function getCrtLocation() {
		//log(3, "start getCrtLocation");
		var crtLocationTitle = '';
		var locX;		
		var getTheCoords = xpathResultEvaluate("//a[@class='active_vl']");
		if (getTheCoords) {
			//log(3, "getTheCoords = " + getTheCoords.snapshotLength);
			var actCoords = getTheCoords.snapshotItem(0).parentNode.nextSibling;
			if (actCoords != null) {
				var xyActCoords = actCoords.textContent.replace("(", "").replace(")", "").split("|");
				TB3O.xActive = parseInt(xyActCoords[0]);
				TB3O.yActive = parseInt(xyActCoords[1]);
			}
		}
		if (crtLocation.indexOf('dorf3') != -1) {
			//the dorf3 page
			crtLocationTitle = T("ALDEAS") + " (" + TB3O.xActive + "|" + TB3O.yActive + ")";
			TB3O.xCrt = TB3O.xActive;
			TB3O.yCrt = TB3O.yActive;
		} else {
			locX = find("//h1", XPFirst);
			locXx = find("//span[@id='x']", XPFirst);
			locXy = find("//span[@id='y']", XPFirst);
			
			if (locXx != null) {
				//log(3, "locXx = " + locXx.textContent);
				TB3O.xCrt = parseInt(locXx.textContent);
			}
			if (locXy != null) {
				//log(3, "locXy = " + locXy.textContent);
				TB3O.yCrt = parseInt(locXy.textContent);
			}
			
			log(3, "locX.textContent = " + locX.textContent + "; locXx = " + locXx + "; locXy = " + locXy);
			
			if (locX && locXx == null && locXy == null) {
				var aH = new Array();
				var theName = locX.textContent;
				var ipLast = theName.lastIndexOf(")");
				log(3, "ipLast + 1 = " + (ipLast + 1) + "; theName.length = " + theName.length);
				if (ipLast + 1 == theName.length || ipLast + 2 == theName.length) {
					if (ipLast > 0) theName = theName.substring(0, ipLast + 1);
					ipLast = theName.lastIndexOf("(");
					if (ipLast != -1) {
						aH[0] = theName.substring(0, ipLast);
						aH[1] = theName.substr(ipLast + 1);
					} else aH[0] = theName;
					crtLocationTitle = aH[0];
					if (aH.length > 1) {
						var strCoords = aH[1].replace(")", "").replace(" ", "").replace(" ", "");
						var aCoord = strCoords.split("|");
						TB3O.xCrt = parseInt(aCoord[0]);
						TB3O.yCrt = parseInt(aCoord[1]);
						crtLocationTitle += " (" + TB3O.xCrt + "|" + TB3O.yCrt + ")";
					} else {
						TB3O.xCrt = TB3O.xActive;
						TB3O.yCrt = TB3O.yActive;
						var strCoords = "(" + TB3O.xCrt + "|" + TB3O.yCrt + ")";
						if (crtLocationTitle.indexOf(strCoords) == -1) {
							crtLocationTitle += " (" + TB3O.xCrt + "|" + TB3O.yCrt + ")";
						}
					}
				} else {
					TB3O.xCrt = TB3O.xActive;
					TB3O.yCrt = TB3O.yActive;
					crtLocationTitle = theName + " (" + TB3O.xCrt + "|" + TB3O.yCrt + ")";
				}
			} else {
				if (locX != null) {
					crtLocationTitle = locX.textContent;
					var strCoords = "(" + TB3O.xCrt + "|" + TB3O.yCrt + ")";
					if (crtLocationTitle.indexOf(strCoords) == -1) {
						crtLocationTitle += " " + strCoords;
					}
				}
			}
		}
		//change the browser title
		TB3O.crtLocationTitle = crtLocationTitle;
		document.title = TB3O.OrigDocTitle + " - " + TB3O.crtLocationTitle;
		return true;
	}

	/**
	*general function for getting info from the XPathResult
	*/
	function xpathResultEvaluate(searchFor, startNode) {
		if (!startNode) {startNode = document;}
		return document.evaluate(searchFor, startNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	}
	
	/**
	 * Function to get/post a page via asynchronous request (AJAX) to/from a server
	 * Parameters:
	 *	url: URL of the page to get from the game server
	 *	method: GET or POST (usually only get)
	 *	param: Parameters URI encoded Parametros (only for POST)
	 *	onSuccess: Function to call if the request is successfully
	 *	onFailure: Function to call in case the request is not successfully
	 */
	function ajaxRequest(url, aMethod, param, onSuccess, onFailure){
		var xmlHttpRequest = new XMLHttpRequest();
		xmlHttpRequest.onreadystatechange = function() {
			if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) onSuccess(xmlHttpRequest);
			else if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status != 200) onFailure(xmlHttpRequest);
		}

		xmlHttpRequest.open(aMethod, url, true);
		if (aMethod == 'POST') xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlHttpRequest.send(param);
	}
	
	function getRace() {
		var aRace = getGMcookie('raceV2', false);
		var aRaceCrt = getGMcookie('raceCrtV2', false);
		if ((aRace == "false" || aRaceCrt == "false") && boolIsAvailableBarracks == true) {
			//race cookies are undefined
			//we now enter the barracks and try to get the race of the player
			var barracksLink = "build.php?gid=19";

			ajaxRequest(barracksLink, 'GET', null, function(AJAXrespX) {
				var aDoc = document.implementation.createDocument("", "", null);
				var aElem = document.createElement('DIV');
				aElem.innerHTML = AJAXrespX.responseText;
				aDoc.appendChild(aElem);
				var strToEvaluate = "//img[starts-with(@class, 'unit')]";
				if (boolIsT35 == false) strToEvaluate = "//img[@class='unit']";
				var aValue = aDoc.evaluate(strToEvaluate, aElem, null, XPFirst, null).singleNodeValue;
				if (aValue) {
					//recognition of the race is done by the first image appearing in the table of troups that can be trained
					if (boolIsT35 == false) {
						if (aValue.getAttribute('src').indexOf("21.gif") > -1) {
							aRace = "Gauls";
						} else if (aValue.getAttribute('src').indexOf("11.gif") > -1) {
							aRace = "Teutons";
						} else if (aValue.getAttribute('src').indexOf("1.gif") > -1) {
							aRace = "Romans";
						}
					} else {
						var classname = aValue.getAttribute('class').split(" ");
						log(3, "classname = " + classname);
						var xRace = classname[1].replace("u", "");
						if (xRace == "1") {
							aRace = "Romans";
						} else if (xRace == "11") {
							aRace = "Teutons";
						} else if (xRace == "21") {
							aRace = "Gauls";
						}
					}
					//set the GM cookie for the race
					setGMcookie('raceV2', aRace, false);
				}
			});

			//now make the AJAX request to determine the correct name of the race from the '/spieler.php' page
			var profileLink = "/spieler.php";
			ajaxRequest(profileLink, 'GET', null, function(AJAXrespX) {
				var aDoc = document.implementation.createDocument("", "", null);
				var aElem = document.createElement('DIV');
				aElem.innerHTML = AJAXrespX.responseText;
				aDoc.appendChild(aElem);
				//if (boolIsT35 == false) {
					var aValue = aDoc.evaluate("//table[@class='tbg']/tbody/tr[5]/td[2]", aElem, null, XPFirst, null).singleNodeValue;
				//} else {
				//	var aValue = aDoc.evaluate("//table[@class='tbg']/tbody/tr[4]/td[1]", aElem, null, XPFirst, null).singleNodeValue;
				//}
				if (aValue) {
					var aRaceCrt = aValue.textContent;
					//set the GM cookie for the real race
					setGMcookie('raceCrtV2', aRaceCrt, false);
				}
			});
			aRace = getGMcookie('raceV2', false);
		}

		crtUserRace = aRace;
		return aRace;
	}

	/**
	 * Get general information (when opening a page) that may be used by other functions
	 */
	function getGeneralData() {
		//log(3, "dTop5 = " + dTop5 + "; get(dTop5) = " + get(dTop5));
		if (get(dTop5) == null) boolIsT35 = true;
		getLanguageAndPlusStatus();
		gServer = getCrtServer();
		// get the userid
		crtUserID = getCrtUserID();
		crtUserRace = getRace();
		//compute resources, capacity, production per hour per resource, total resources available, total production per hour and the name of resources
		getResourceInfo();
		
		//get the doc direction
		var docDirection = document.defaultView.getComputedStyle(document.body, null).getPropertyValue("direction");
		if (docDirection == "rtl") {docDir[0] = "right"; docDir[1] = "left";}

		//Path to the graphic pack (if available)
		// empty graphics set support added

		var cssDeclaration = find("//link[starts-with(@href, 'file') and @rel='stylesheet']", XPFirst);
		if (cssDeclaration != null) {
			var csshr = cssDeclaration.href;
			csshr.search(/^file:\/\/[^\/]*\/(.*\/)?(.*)\.css/);
			localGraphicPack = RegExp.$1;
			localGraphicPack = 'file://' + localGraphicPack;
		}
	
		var strLogLevel = getGMcookie("consoleloglevel", false);
		if (strLogLevel != "false" && strLogLevel != false) LOG_LEVEL = parseInt(strLogLevel);

		// Name of the server and analyser server (wsServerName)
		crtLocation.search(/http:\/\/(.*)\//);
        var oldserver =  RegExp.$1;

		var crtServerX = new Array();
		var crtServerX = oldserver.split(".");
		var strFirst = crtServerX[0];
		var strLast = crtServerX[crtServerX.length - 1];
		if (strFirst.indexOf("speed") != -1 && strLast == "se") {
			// for swedish speed servers
			wsServerName = strLast + "z";
		} else if (strFirst == "speed1" && strLast == "ae") {
			//for ae speed server 1
			wsServerName = strLast + "z";
		} else if (strFirst == "speed2" && strLast == "ae") {
			//for ae speed server 2
			wsServerName = strLast + "y";
		} else if (strFirst == "speed" || strFirst == "speedserver") {
			// for all other speed servers
			wsServerName = strLast + "x";
		} else if (strFirst == "team") {
			//for the team server
			wsServerName = "team";
		} else if (strFirst == "lv1") {
			//for "lv" server
			wsServerName = "lv1";
		} else if (strLast == "com" && strFirst.indexOf("ae") != -1) {
			//for new ae server
			wsServerName = strFirst;
		} else if (strLast == "at") {
			//for Austrian server
			wsServerName = "at";
			detectedLanguage = "de";
			switchLanguage(detectedLanguage);
		} else if (strLast == "org") {
			//for the org server
			wsServerName = "org";
			detectedLanguage = "de";
			switchLanguage(detectedLanguage);
		} else if (strLast == "cat") {
			//for catalunian server
			wsServerName = "cat";
		} else if (strLast == "net" && detectedLanguage == "es") {
			//for spanish servers
			wsServerName = "net" + strFirst.substr(strFirst.search(/[0-9]{1,2}/));
		} else if (strLast == "net") {
			//for the www.travian.net server
			wsServerName = "net";
		} else if (strLast == "fr" && wsAnalyserOption != "1") {
			// france3 3 - exception mentioned by fr3nchlover (Thank you !)
            wsServerName = "fr3" + strFirst.substr(strFirst.search(/[0-9]{1,2}/));
		} else if (strLast == detectedLanguage || strLast == "com"){
			//for all other normal servers
			wsServerName = strLast + strFirst.substr(strFirst.search(/[0-9]{1,2}/));
		} else if (strLast == "asia") {
			//for Thailand server
			wsServerName = "th1";
		}

		//get some of the saved GM "cookies" and set as active if Setup has not been visited yet
		var wsAnalyserOption = getGMcookie('wsanalyser', false);
		TB3O.boolShowDistTimes = getGMcookie("showdisttimes", false);
		if (TB3O.boolShowDistTimes == 'false') TB3O.boolShowDistTimes = '1';
		
		boolShowStatLinks = getGMcookie("showstatlinks", false);
		if (boolShowStatLinks == 'false') boolShowStatLinks = '1';
		
		boolShowCellTypeInfo = getGMcookie("showcelltypeinfo", false);
		if (boolShowCellTypeInfo == 'false') boolShowCellTypeInfo = '1';
		
		boolShowTravmapLinks = getGMcookie("showtravmaplinks", false);
		if (boolShowTravmapLinks == 'false') boolShowTravmapLinks = '1';
		
		boolShowTroopInfoTooltips = getGMcookie("showtroopinfotooltips", false);
		if (boolShowTroopInfoTooltips == 'false') boolShowTroopInfoTooltips = '1';
		
		boolShowBigIconAlliance = getGMcookie("showbigiconalliance", false);
		if (boolShowBigIconAlliance == 'false') boolShowBigIconAlliance = '1';
		
		TB3O.boolShowCPinUpgTables = getGMcookie("showcpinupgtables", false);
		if (TB3O.boolShowCPinUpgTables == 'false') TB3O.boolShowCPinUpgTables = '1';
		
		TB3O.boolShowCCinUpgTables = getGMcookie("showccinupgtables", false);
		if (TB3O.boolShowCCinUpgTables == 'false') TB3O.boolShowCCinUpgTables = '1';
		
		boolOldServerVersion = getGMcookie("serverversion2", false);
		
		//get the colors for center numbers
		var colorX = getGMcookie("cncolorneutral", false);
		if (colorX != "false" && colorX != "") CN_COLOR_NEUTRAL = colorX;

		colorX = getGMcookie("cncolormaxlevel", false);
		if (colorX != "false" && colorX != "") CN_COLOR_MAX_LEVEL = colorX;

		colorX = getGMcookie("cncolornoupgrade", false);
		if (colorX != "false" && colorX != "") CN_COLOR_NO_UPGRADE = colorX;

		colorX = getGMcookie("cncolornpcupgrade", false);
		if (colorX != "false" && colorX != "") CN_COLOR_UPGRADABLE_VIA_NPC = colorX;
	}

	/**
	 * try to find the add/banner and hide it (adds are usual only for german servers !)
	 */
	function hideAd(){
		var ad = find("//iframe", XPFirst);
		//var bigIconBar = get(dTop5);
		//if (bigIconBar == null)  dTop1 = 'header';
		if (boolIsT35 == true) dTop1 = 'header';
		if (ad) {
			if (ad.id == '') {
				ad.style.display = 'none';
				var headerTop = find("//html/body/div", XPFirst);
				if (headerTop) {
					headerTop.style.height = '30px';
					headerTop.style.backgroundImage = '';
				}
				var header2 = find("//html/body/div[2]", XPFirst);
				if (header2) header2.style.display = 'none';
				var header3 = find("//html/body/div[3]", XPFirst);
				if (header3) {
					if (header3.id != dTop1) header3.style.display = 'none';
				}
				var lres = get("lres2");
				if (lres) lres.style.top = '100px';
			}
		}
	}

	/**
	 * Change the menu on the left side
	 */
	function leftMenuLinks() {
		var menu = find("//td[@class='menu']", XPFirst);
		if (menu == null) menu = find("//div[@id='sleft']//p", XPFirst);
			
		var menuiHTML = menu.innerHTML;
		menu.innerHTML = menuiHTML.replace("\n", "").replace("<br>", "").replace("<br>", "").replace("<br>", "").replace("<br>", "");

		var boolShowMenuSection3 = getGMcookie("showmenusection3", false);
		if (boolShowMenuSection3 == 'false') boolShowMenuSection3 = '1';
		
		var linkWarSim = warsimExtLink;
		var warsimOption = getGMcookie('warsim', false);
		if (warsimOption != "1") linkWarSim = warsimIntLink;

		var allLinks = [0,
				[T('LOGIN'), "login.php"],
				(boolShowBigIconAlliance != "1" ? [T('ALLIANCE'), "allianz.php"] : ['', '']),
				[T('SENDTROOPS'), "a2b.php"],
				[T('SIM'), linkWarSim, "_blank"],
                0
			];

		if (boolShowMenuSection3 == "1") {
			var ttbLang;
			switch (detectedLanguage) {
				case "il": ttbLang = "he"; break;
				case "us":
				case "uk":
				case "en": ttbLang = "en"; break;
				case "es":
				case "ar":
				case "cl":
				case "mx": ttbLang = "es"; break;
				case "kr": ttbLang = "ko"; break;
				case "pt":
				case "br": ttbLang = "pt"; break;
				case "cn":
				case "tw":
				case "hk": ttbLang = "cn"; break;
				default: ttbLang = detectedLanguage; break;
			}
			
			var wsAnalyserOption = getGMcookie('wsanalyser', false);
			var linkWAnalyser = wsURLStart["1"];
			var labelWAnalyser = T('WANALYSER1');
			if (wsAnalyserOption != "1") {
				linkWAnalyser = wsURLStart["0"];
				labelWAnalyser = T('WANALYSER0');
			}
		
			var menuSection3Links = [
				//[T('CROPFINDER'), wsURLStart[1] + wsServerName + wsURLCropFinderLink, "_blank"],
				[T('CROPFINDER'), wsURLCropFinderLinkV2, "_blank"],
				['Travilog', "http://travilog.org.ua/" + detectedLanguage + "/", "_blank"],
				['Toolbox', "http://www.traviantoolbox.com/index.php?lang=" + ttbLang, "_blank"],
				//['Travian Utility', "http://travianutility.netsons.org/index_en.php", "_blank"], - sorry, old, last update = December.2008 -> nothing lost here
				['TravianBox', wsURLTravianBox + "/stats/server/" + wsServerName, "_blank"],
				[T('MAPA'), "http://travmap.shishnet.org/?lang=" + detectedLanguage, "_blank"],
				[labelWAnalyser, linkWAnalyser + wsServerName, "_blank"],
				0
			];
			allLinks = allLinks.concat(menuSection3Links);
		}
		
		for (var i = 0; i < allLinks.length; i++) {
			if (allLinks[i]) {
				if (allLinks[i][1] != '') {
					var aLink = newLink(allLinks[i][0], [['href', allLinks[i][1]]]);
					if (allLinks[i][2]) aLink.setAttribute('target', allLinks[i][2]);
					menu.appendChild(aLink);
				}
			} else menu.appendChild(document.createElement('HR'));
		}
		
		var presentationLink = newLink(T('SCRIPTPRESURL'), [['target', '_blank'], ['href', SCRIPT.presentationurl]]);
		menu.appendChild(presentationLink);
		
		var updateLink = newLink(T('CHECKVERSION'), [["href", jsVoid]]);
		updateLink.addEventListener('click', function() {updateScript(SCRIPT)}, false);
		menu.appendChild(updateLink);
	}

	function adaptBigIcons() {
		//big icons
		var cssBigIconStyle = "";
		var bIheight = "100";
		if (boolIsT35 == true) {
			image["alliance"] = image["alliance35"];
			image["alliance_gs"] = image["alliance35_gs"];
			image["mercado"] = image["mercado35"];
			image["mercado_gs"] = image["mercado35_gs"];
			image["militar"] = image["militar35"];
			image["militar_gs"] = image["militar35_gs"];
			image["militar2"] = image["militar235"];
			image["militar2_gs"] = image["militar235_gs"];
			image["misc"] = image["misc35"];
			image["misc_gs"] = image["misc35_gs"];
			image["setup"] = image["setup35"];
			image["delButton"] = image["delButton35"];
			image["buttonSave"] = image["buttonSave35"];
			bIheight = "67";
		}
		
		var cssBigIconStyle = "";
		cssBigIconStyle += "#n6, #n7, #n8, #n9, #n10, #n11 {width:70px; height:" + bIheight + "px; background-repeat:no-repeat;}";
		cssBigIconStyle += "#n6:hover,#n7:hover,#n8:hover,#n9:hover,#n10:hover,#n11:hover {background-position:bottom;}";
		cssBigIconStyle += '#n6 {background-image: url(' + image["mercado_gs"] + ');}';
		cssBigIconStyle += '#n7 {background-image: url(' + image["militar_gs"] + ');}';
		cssBigIconStyle += '#n8 {background-image: url(' + image["alliance_gs"] + ');}';
		cssBigIconStyle += '#n9 {background-image: url(' + image["setup"] + ');}';
		cssBigIconStyle += '#n10 {background-image: url(' + image["militar2_gs"] + ');}';
		cssBigIconStyle += '#n11 {background-image: url(' + image["misc_gs"] + ');}';
		
		GM_addStyle(cssBigIconStyle);		
	}
	
	function adaptIcons() {
		if (boolIsT35 == true) {
			gIcons["clock"] = '<img class="clock" src="img/x.gif">';
			gIcons["cropcons"] = '<img class="r5" src="img/x.gif">';
			gIcons["r1"] = '<img class="r1" src="img/x.gif" title="' + T('RECURSO1') + '" alt="' + T('RECURSO1') + '">';
			gIcons["r2"] = '<img class="r2" src="img/x.gif" title="' + T('RECURSO2') + '" alt="' + T('RECURSO2') + '">';
			gIcons["r3"] = '<img class="r3" src="img/x.gif" title="' + T('RECURSO3') + '" alt="' + T('RECURSO3') + '">';
			gIcons["r4"] = '<img class="r4" src="img/x.gif" title="' + T('RECURSO4') + '" alt="' + T('RECURSO4') + '">';
			gIcons["r41"] = '<img class="r4" src="img/x.gif" title="' + T('ENVIAR') + '" alt="' + T('ENVIAR') + '" border = "0"';
			//gIcons["def1"] = 'class="def1" src="img/x.gif"';
			//gIcons["att_all"] = 'src="' + img("a/att_all.gif") + '"';
			//gIcons["def_i"] = 'src="' + img("a/def_i.gif") + '"';
			//gIcons["def_c"] = 'src="' + img("a/def_c.gif") + '"';
			gIcons["def1"] = 'src="' + img("a/def1.gif") + '" width="12" height="12" border="0"';
			gIcons["att_all"] = 'src="' + image["att_all"] + '"';
			gIcons["def_i"] = 'src="' + image["def_i"] + '"';
			gIcons["def_c"] = 'src="' + image["def_c"] + '"';
			gIcons["b1"] = image["bulletBlue"];
			gIcons["b2"] = image["bulletGreen"];
			gIcons["b3"] = image["bulletYellow"];
			gIcons["b4"] = image["bulletRed"];
			gIcons["b5"] = image["bulletGrey"];
			gIcons["del"] = image["del"];
			gIcons["bau"] = image["bau"];
			for (var i = 1; i < 31; i ++) {
				gIcons["u" + i] = 'img/x.gif';
			}
			gIcons["hero"] = 'class="unit uhero" src="img/x.gif"';
		} else {
			gIcons["clock"] = '<img src="' + img("a/clock.gif") + '" width="16" height="12">';
			gIcons["cropcons"] = '<img src="' + img("r/5.gif") + '" width="16" height="12">';
			gIcons["r1"] = '<img src="' + img("r/1.gif") + '" width="16" height="12" title="' + T('RECURSO1') + '" alt="' + T('RECURSO1') + '">';
			gIcons["r2"] = '<img src="' + img("r/2.gif") + '" width="16" height="12" title="' + T('RECURSO2') + '" alt="' + T('RECURSO2') + '">';
			gIcons["r3"] = '<img src="' + img("r/3.gif") + '" width="16" height="12" title="' + T('RECURSO3') + '" alt="' + T('RECURSO3') + '">';
			gIcons["r4"] = '<img src="' + img("r/4.gif") + '" width="16" height="12" title="' + T('RECURSO4') + '" alt="' + T('RECURSO4') + '">';
			gIcons["r41"] = '<img src="' + img("r/4.gif") + '" width="16" height="12" title="' + T('ENVIAR') + '" alt="' + T('ENVIAR') + '" border="0"';
			gIcons["def1"] = 'src="' + img("a/def1.gif") + '" width="12" height="12" border="0"';
			gIcons["att_all"] = 'src="' + img("a/att_all.gif") + '"';
			gIcons["def_i"] = 'src="' + img("a/def_i.gif") + '"';
			gIcons["def_c"] = 'src="' + img("a/def_c.gif") + '"';
			gIcons["b1"] = img("a/b1.gif");
			gIcons["b2"] = img("a/b2.gif");
			gIcons["b3"] = img("a/b3.gif");
			gIcons["b4"] = img("a/b4.gif");
			gIcons["b5"] = img("a/b5.gif");
			gIcons["del"] = img("a/del.gif");
			gIcons["bau"] = img("a/bau.gif");
			for (var i = 1; i < 31; i ++) {
				gIcons["u" + i] = img("u/" + i) + ".gif";
			}
			gIcons["hero"] = 'src="' + img("u/hero.gif") + '"';
		}
	}
	
	//The setup page of the script 
    function TravianBeyondSetup(){
		//all Travian Beyond Setup parameters
		var arrTBSetupParams = [
			[1, "accinfo", "TR", "3"],
				[2, "capital", "span", ""],
				[2, "capitalxy", "span", ""],
				[2, "raceCrtV2", "span", ""],
			[1, "gameservertype", "TR", "1"],
				[2, "serverversion2", "checkbox", ""],
			//[1, "inetgpoption", "TR", "1"],
				//[2, "allowinetgp", "checkbox", ""],
			[1, "bigicons", "TR","4"],
				[2, "showbigiconmarket", "checkbox", ""],
				[2, "showbigiconmilitary", "checkbox", ""],
				[2, "showbigiconmilitary2", "checkbox", ""],
				[2, "showbigiconmisc", "checkbox", ""],
				[2, "showbigiconalliance", "checkbox", ""],
				[2, "allianceforumlink", "text", ""],
			[1, "menuleft", "TR","2"],
				[2, "showmenusection3", "checkbox", ""],
				[2, "warsim", "SELECT", [T('WARSIMOPTION1'), T('WARSIMOPTION2')]],
			[1, "villagelist", "TR","1"],
				[2, "showinouticons", "checkbox",""],
				[2, "showcentermapicon", "checkbox", ""],
				[2, "showsendtroopsresources", "checkbox", ""],
			[1, "bookmarkoptions", "TR", "2"],
				[2, "showbookmarks", "checkbox",""],
				[2, "marcadores", "text", ""],
			[1, "noteblockoptions", "TR","3"],
				[2, "noteblock", "checkbox",""],
				[2, "nbsize", "SELECT", [T('NBSIZEAUTO'), T('NBSIZENORMAL'), T('NBSIZEBIG')]],
				[2, "nbheight", "SELECT", [T('NBKEEPHEIGHT'), T('NBAUTOEXPANDHEIGHT')]],
			[1, "npcoptions", "TR", "1"],
				[2, "npcassistant", "checkbox", ""],
			[1, "statistics", "TR", "3"],
				[2, "wsanalyser", "SELECT", [T('WANALYSER0'), T('WANALYSER1'), T('WANALYSER2')]],
				[2, "showstatlinks", "checkbox", ""],
				[2, "showtravmaplinks", "checkbox", ""],
			[1, "upgtables", "TR", "3"],
				[2, "showcpinupgtables", "checkbox", ""],
				[2, "showccinupgtables", "checkbox", ""],
			[1, "resourcefields", "TR", "2"],
				[2, "showresupgradetable", "checkbox", ""],
				[2, "showcolorreslevels", "checkbox", ""],
			[1, "villagecenter", "TR", "3"],
				[2, "showbupgtable", "checkbox", ""],
				[2, "showcenternumbers", "checkbox", ""],
				[2, "showcolorbuildlevels", "checkbox", ""],
				[2, "showbblink", "checkbox", ""],
			[1, "marketoffers", "TR", "2"],
				[2, "marketpreload", "SELECT", ["1", "2", "3", "4", "5"]],
				[2, "ventas", "text", ""],
			[1, "rallypoint", "TR", "3"],
				[2, "rpdefact", "SELECT", [T('ATTACKTYPE2'), T('ATTACKTYPE3'), T('ATTACKTYPE4')]],
				[2, "noofscouts", "text", ""],
				[2, "showtroopinfotooltips", "checkbox", ""],
				[2, "showrprinfotooltips", "checkbox", ""],
			[1, "mapoptions", "TR", "2"],
				[2, "showcelltypeinfo", "checkbox", ""],
				[2, "showdisttimes", "checkbox", ""],
				[2, "showmaptable", "checkbox", ""],
			[1, "mesrepoptions", "TR", "1"],
				[2, "mesreppreload", "SELECT", ["1", "2", "3", "4", "5"]],
				[2, "showmesopenlinks", "checkbox", ""],
				[2, "showrepdeltable", "checkbox", ""],
				[2, "showigmlinkforme", "checkbox", ""],
				[2, "showbrstatdetails", "checkbox", ""],
			[1, "coloroptions", "TR", "3"],
				[2, "cncolormaxlevel", "text", ""],
				[2, "cncolornoupgrade", "text", ""],
				[2, "cncolornpcupgrade", "text", ""],
			[1, "debugoptions", "TR", "1"],
				[2, "consoleloglevel", "SELECT", ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]],
		];
	
		//------------------------------------------
		//Modified by Lux
		//------------------------------------------
		if (get('configuracion'))
		{
			showMsgPage(true);
			return;
		}
		//------------------------------------------
		var a = get(dmid2);
		//------------------------------------------
		//Modified by Lux
		//------------------------------------------
		var innerPane = get('InnerMsgPage');
		if (!innerPane)
		{
			addDiv();
			var innerPane = get('InnerMsgPage');
		}
		//------------------------------------------

		if (!a) a = find("//form", XPFirst);

		var setupTable = newTable([["cellspacing", "1"], ["cellpadding", "2"], ["class", "tbg"], ["id", "configuracion"]]);

		var topRow = newRow("", [["class", "rbg"]]);
		var topCell = newCell(T('TBSETUPLINK') + " - " + TB3O.versionText(), [["width", "70%"]]);
		
		//create the save button image with the associated "Save" function
		var saveCell = newCell("", [['width', '20%']]);
		var saveImage = newImage([['src', image["buttonSave"]], ['style', 'cursor:pointer;'], ['title', T('SAVE')]]);
		saveImage.addEventListener("click", TravianBeyondSetupSave, 0);
		saveCell.appendChild(saveImage);
		
		//create the close setup image
		var closeCell = newCell("", [['width', '10%']]);
		var closeImage = newImage([['src', image["closeButton"]], ['style', 'cursor:pointer;'], ['title', T('CLOSE')]]);
		closeImage.addEventListener("click", function(){showMsgPage(false)}, true);
		
		closeCell.appendChild(closeImage);
		topRow.appendChild(topCell);
		topRow.appendChild(saveCell);
		topRow.appendChild(closeCell);
		setupTable.appendChild(topRow);

		var inparr = new Array(arrTBSetupParams.length);

		for (var i = 0; i < arrTBSetupParams.length; i++){
			if (arrTBSetupParams[i][0] == 1) {
				var sectionRow = elem(arrTBSetupParams[i][2], "");
				var sectionTitleCell = newCell(T(arrTBSetupParams[i][1].toUpperCase()), [["class", "rbg"], ['align', docDir[0]], ['style', "font-size:9pt; font-weight:bold; color:darkblue;"], ['colspan', '3']]);
				sectionRow.appendChild(sectionTitleCell);
				setupTable.appendChild(sectionRow);
			} else if (arrTBSetupParams[i][0] == 2) {
				var setupRow = elem("TR", "");
				var setupRowLabel = newCell(T(arrTBSetupParams[i][1].toUpperCase()), [['align', docDir[0]], ['style', 'font-size:8pt']]);
				setupRow.appendChild(setupRowLabel);
				var cellInput = newCell("", [['align', docDir[0]], ['colspan', '2']]);
				var aValue = getGMcookie(arrTBSetupParams[i][1], false);
				var cellInputValue = (aValue != "false" ? aValue : '');
				if (arrTBSetupParams[i][2] == "SELECT") {
					var elemInput = document.createElement(arrTBSetupParams[i][2]);
					elemInput.setAttribute('type', arrTBSetupParams[i][2]);
				} else if (arrTBSetupParams[i][2] == "span") {
					var elemInput = document.createElement("SPAN");
				} else {
					var elemInput = document.createElement("INPUT");
					elemInput.setAttribute('type', arrTBSetupParams[i][2]);
				}
				elemInput.setAttribute('name', arrTBSetupParams[i][1]);
				elemInput.setAttribute("id", 'is_' + arrTBSetupParams[i][1]);
				switch (arrTBSetupParams[i][2]) {
					case "checkbox":
						elemInput.setAttribute('value', T('YES'));
						if (cellInputValue == 1) elemInput.setAttribute('checked', true);
						break;
					case "text":
						elemInput.setAttribute('style',"width:360px");
						elemInput.setAttribute('value', cellInputValue);
						elemInput.setAttribute('class','fm');
						break;
					case "SELECT":
						for (var xi = 0; xi < arrTBSetupParams[i][3].length; xi++) {
							elemInput.options[xi] = new Option(arrTBSetupParams[i][3][xi], xi, false, false);
						}
						elemInput.setAttribute('class', 'fm');
						elemInput.selected = cellInputValue;
						elemInput.value = cellInputValue;
						break;
					case "span":
						if (cellInputValue == "false") {
							if (arrTBSetupParams[i][1] == "raceCrtV2") {
								elemInput.innerHTML = T('NORACE');
							} else {
								elemInput.innerHTML = "";
							}
							elemInput.setAttribute('style', 'font-size:8pt; color:red;');
						} else {
							elemInput.innerHTML = cellInputValue;
							elemInput.setAttribute('style', 'font-weight:bold; font-size:8pt;');
						}
						break;
					default:
						break;
				}
				cellInput.appendChild(elemInput);
				setupRow.appendChild(cellInput);
				setupTable.appendChild(setupRow);
			}
		}
		
		var colCodeExplRow = elem("TR", "");
		var colCodeExplCell1 = newCell("<b>" + T('COLORHELP') + "</b>", [['style', 'font-size:8pt; color: blue;'], ["align", docDir[0]]]);
		var colCodeExplCell2 = newCell(T('COLORHELPTEXT'), [['style', 'font-size:8pt; color:blue;'], ["align", docDir[0]], ["colspan", "2"]]);

		colCodeExplRow.appendChild(colCodeExplCell1);
		colCodeExplRow.appendChild(colCodeExplCell2);
		setupTable.appendChild(colCodeExplRow);

		//create the "Save" row
		var saveRow = newRow("", [['class', 'rbg']]);
		var bottomCell = newCell(T('TBSETUPLINK') + " - " + TB3O.versionText(), [["colspan", "1"], ["width", "70%"]]);
		var saveCell2 = newCell("", [["class", "rbg"], ["align", "center"], ["width", "20%"]]);
		var saveImage2 = saveImage.cloneNode(true);
		saveImage2.addEventListener("click", TravianBeyondSetupSave, 0);
		saveCell2.appendChild(saveImage2);
		
		var closeCell2 = newCell("", [["class", "rbg"], ["align", "center"], ["width", "10%"]]);
		var closeImage2 = closeImage.cloneNode(true);
		closeImage2.addEventListener("click", function(){showMsgPage(false)}, true);
		closeCell2.appendChild(closeImage2);
		
		saveRow.appendChild(bottomCell);
		saveRow.appendChild(saveCell2);
		saveRow.appendChild(closeCell2);
		setupTable.appendChild(saveRow);
		//------------------------------------------
		//Modified by Lux
		//------------------------------------------
		innerPane.appendChild(setupTable);
		showMsgPage(true);
		//------------------------------------------
		
		function TravianBeyondSetupSave() {
			var arrayOfInputValues = get("configuracion").getElementsByTagName("INPUT");
			var arrayOfSelectValues = get("configuracion").getElementsByTagName("SELECT");
			var arrayOfValues = arrayOfInputValues;
			for (var i = 0; i < arrayOfValues.length; i++) {
				var valueCurrent = arrayOfValues[i].value;
				if (arrayOfValues[i].type == 'checkbox') {(arrayOfValues[i].checked == true) ? (valueCurrent = '1') : (valueCurrent = '0');}
				setGMcookie(arrayOfValues[i].name, valueCurrent, false);
			}
			var arrayOfValues = arrayOfSelectValues;
			for (var i = 0; i < arrayOfValues.length; i++) {
				var valueCurrent = arrayOfValues[i].value;
				setGMcookie(arrayOfValues[i].name, valueCurrent, false);
			}
			var boolShowNoteBlock = getGMcookie("noteblock", false);
			if (boolShowNoteBlock == 'false') boolShowNoteBlock = '1';
			if (boolShowNoteBlock == "1") {
				var nbnotes = get('notas');
				if (nbnotes) {
					setGMcookie('notas', nbnotes.value, false);
				}
			}
			alert(T('SAVED') + ".");
			location.reload(true);
		}
		
    }
	
	function bigIconsBar(){
		//localise superior bar with the big icons
		//move the  "Plus" icon
		var intAdditionalIcons = 0;
		var hPlaceHolder = '100px';
		var strMapCbib = ["0,0,35,50", "35,0,70,50", "0,50,35,100", "35,50,70,100"];
		var strMapMbib = ["0,0,70,50", "0,50,35,100", "35,50,70,100"];
		var bigIconBar = get(dTop5);
		
		//if (bigIconBar == null) {
		if (boolIsT35 == true) {
			dTop5 = 'mtop';
			dmid2 = 'content';
			dmid1 = 'content';
			var bigIconBar = get(dTop5);
			xGIF = "img/x.gif";
			hPlaceHolder = '67px';
			var clearDiv = find("//div[@id='" + dTop5 + "']//div[@class='clear']", XPFirst);
			if (clearDiv) bigIconBar.removeChild(clearDiv);
			strMapCbib = ["0,0,35,33", "35,0,70,33", "0,33,35,67", "35,33,70,67"];
			strMapMbib = ["0,0,70,33", "0,33,35,67", "35,33,70,67"];
			//boolIsT35 = true;
		}
		
		adaptBigIcons();
		adaptIcons();
		
		bigIconBar.style.display = 'none';
		var iHTML = '';

		//create the setup icon
		var setupLink = newLink("<img id='n9' src='" + img(xGIF) + "'>", [['title', T('TBSETUPLINK')], ['href', jsVoid]]);
		setupLink.addEventListener('click', TravianBeyondSetup, false);
		
		bigIconBar.setAttribute("style", docDir[0] + ":10px");
		bigIconBar.style.width = '900px';
		
		var aPlus = find("//div[@id='" + dTop5 + "']//a[contains(@href, 'plus.php')]", XPFirst);
		if (!aPlus) {
			var aPlus = find("//div[@id='" + dTop1 + "']//a[contains(@href, 'plus.php')]", XPFirst);
		}
		if (aPlus) {
			aPlus.href += "?id=3";
			aPlus.setAttribute("style", "margin-left:30px;");
			bigIconBar.removeChild(aPlus);
		}

		var boolShowBigIconMarket = getGMcookie("showbigiconmarket", false);
		var boolShowBigIconMilitary2 = getGMcookie("showbigiconmilitary2", false);
		var boolShowBigIconMilitary = getGMcookie("showbigiconmilitary", false);
		var boolShowBigIconMisc = getGMcookie("showbigiconmisc", false);
		
		//enable the icons if Setup has not been visited yet
		if (boolShowBigIconMarket == 'false') boolShowBigIconMarket = '1';
		if (boolShowBigIconMilitary == 'false') boolShowBigIconMilitary = '1';
		if (boolShowBigIconMilitary2 == 'false') boolShowBigIconMilitary2 = '1';
		if (boolShowBigIconMisc == 'false') boolShowBigIconMisc = '1';
		
		if (boolShowBigIconMarket == "1") {
			// Associate the market map with the image created
			var marketLink = newLink("<img usemap='#market' id='n6' src='" + img(xGIF) + "'>");
			bigIconBar.appendChild(marketLink);
			intAdditionalIcons += 1;
		}
		
		if (boolShowBigIconMilitary == "1") {
			// Associate the military map with the image created
			var militaryLink = newLink("<img usemap='#militar' id='n7' src='" + img(xGIF) + "'>");
			bigIconBar.appendChild(militaryLink);
			intAdditionalIcons += 1;
		}
		
		if (boolShowBigIconMilitary2 == "1") {
			// Associate the military map with the image created
			var militaryLink2 = newLink("<img usemap='#militar2' id='n10' src='" + img(xGIF) + "'>");
			bigIconBar.appendChild(militaryLink2);
			intAdditionalIcons += 1;
		}
		
		if (boolShowBigIconMisc == "1") {
			// Associate the misc map with the image created
			var miscLink = newLink("<img usemap='#misc' id='n11' src='" + img(xGIF) + "'>");
			bigIconBar.appendChild(miscLink);
			intAdditionalIcons += 1;
		}

		if (boolShowBigIconAlliance == "1") {
			//Associate the ally with the image create
			var allyLink = newLink("<img usemap='#alliance' id='n8' src='" + img(xGIF) + "' title='" + T('ALLIANCE') + "' alt = '" + T('ALLIANCE') + "'>");
			bigIconBar.appendChild(allyLink);
			intAdditionalIcons += 1;
		}
		
		if (plus) {
			bigIconBar.appendChild(aPlus);
		}
		
		if (boolShowBigIconMarket == "1") {
			// Map for the market big icon
			iHTML += '<map name="market" onmouseover="bigIconMarket()" onmouseout="bigIconMarketGS()"><area shape="rect" coords="' + strMapMbib[0] + '" href="build.php?gid=17" title="' + T('ENVIAR') + '"><area shape="rect" coords="' + strMapMbib[1] + '" href="build.php?gid=17&t=1" title="' + T('COMPRAR') + '"><area shape="rect" coords="' + strMapMbib[2] + '" href="build.php?gid=17&t=2" title="' + T('VENDER') + '"></map>';
            addGreyScaleSwitcher ("mercado");
		}

		if (boolShowBigIconMilitary == "1") {
			// Map for the military big icon
			//iHTML += '<map name="militar" onmouseover="bigIconMilitar()" onmouseout="bigIconMilitarGS()"><area shape="rect" coords="0,0,35,54" href="build.php?gid=16&j&k" title="' + T('RALLYPOINT') + '"><area shape="rect" coords="35,0,70,50" href="build.php?gid=19" title="' + T('BARRACKS') + '"><area shape="rect" coords="0,50,35,100" href="build.php?gid=20" title="' + T('STABLE') + '"><area shape="rect" coords="35,50,70,100" href="build.php?gid=21" title="' + T('WORKSHOP') + '"></map>';
			iHTML += '<map name="militar" onmouseover="bigIconMilitar()" onmouseout="bigIconMilitarGS()"><area shape="rect" coords="' + strMapCbib[0] + '" href="build.php?gid=16&j&k" title="' + T('RALLYPOINT') + '"><area shape="rect" coords="' + strMapCbib[1] + '" href="build.php?gid=19" title="' + T('BARRACKS') + '"><area shape="rect" coords="' + strMapCbib[2] + '" href="build.php?gid=20" title="' + T('STABLE') + '"><area shape="rect" coords="' + strMapCbib[3] + '" href="build.php?gid=21" title="' + T('WORKSHOP') + '"></map>';
            addGreyScaleSwitcher ("militar");
		}
		
		if (boolShowBigIconMilitary2 == "1") {
			// Map for the military big icon
			iHTML += '<map name="militar2" onmouseover="bigIconMilitar2()" onmouseout="bigIconMilitar2GS()"><area shape="rect" coords="' + strMapCbib[0] + '" href="build.php?gid=24" title="' + T('TOWNHALL') + '"><area shape="rect" coords="' + strMapCbib[1] + '" href="build.php?gid=37" title="' + T('HEROSMANSION') + '"><area shape="rect" coords="' + strMapCbib[2] + '" href="build.php?gid=12" title="' + T('BLACKSMITH') + '"><area shape="rect" coords="' + strMapCbib[3] + '" href="build.php?gid=13" title="' + T('ARMOURY') + '"></map>';
            addGreyScaleSwitcher ("militar2");
		}
		
		if (boolShowBigIconMisc == "1") {
			// Map for the miscelaneous big icon
			iHTML += '<map name="misc"  onmouseover="bigIconMisc()" onmouseout="bigIconMiscGS()"><area shape="rect" coords="' + strMapCbib[0] + '" href="build.php?gid=26" title="' + T('PALACE') + '"><area shape="rect" coords="' + strMapCbib[1] + '" href="build.php?gid=25" title="' + T('RESIDENCE') + '"><area shape="rect" coords="' + strMapCbib[2] + '" href="build.php?gid=22" title="' + T('ACADEMY') + '"><area shape="rect" coords="' + strMapCbib[3] + '" href="build.php?gid=27" title="' + T('TREASURY') + '"></map>';
            addGreyScaleSwitcher ("misc");
		}

		
		if (boolShowBigIconAlliance == "1") {
			var forumLink = getGMcookie("allianceforumlink", false);
			if (forumLink == "0" || forumLink == "false" || forumLink == "") {
				forumLink = "allianz.php?s=2";
			} else {
				forumLink += ' target="_blank"';
			}
			
			iHTML += '<map name="alliance" onmouseover="bigIconAlliance()" onmouseout="bigIconAllianceGS()"><area shape="rect" coords="' + strMapCbib[0] + '" href="allianz.php" title="' + T('ALLIANCE') + ':&nbsp;' + T('OVERVIEW') + '"><area shape="rect" coords="' + strMapCbib[1] + '" href=' + forumLink + ' title="' + T('ALLIANCE') + ':&nbsp;' + T('FORUM') + '"><area shape="rect" coords="' + strMapCbib[2] + '" href="allianz.php?s=3" title="' + T('ALLIANCE') + ':&nbsp;' + T('ATTACKS') + '"><area shape="rect" coords="' + strMapCbib[3] + '" href="allianz.php?s=4" title="' + T('ALLIANCE') + ':&nbsp;' + T('NEWS') + '"></map>';
            addGreyScaleSwitcher ("alliance");
		}
		
		bigIconBar.innerHTML += iHTML;
		
		//insert an empty image based on the boolShowBigIconsOptions
		switch (intAdditionalIcons) {
			case 1: var leftM = 115; break;
			case 2: var leftM = 80; break;
			case 3: var leftM = 45;	break;
			case 4: var leftM = 10;	break;
			case 5: var leftM = 0; break;
			default: var leftM = 141; break;
		}
		
		var emptyImage = newImage([['src', img(xGIF)], ['width', leftM + 'px'], ['height', hPlaceHolder]]);

		bigIconBar.insertBefore(emptyImage, bigIconBar.firstChild);
		bigIconBar.insertBefore(setupLink, emptyImage);

		bigIconBar.style.display='';
	}
	
	//following function provided by onetmt (THANK YOU SO MUCH FOR THIS !)
	function addGreyScaleSwitcher (icon) {
        // This function is a workaround for the mouse event unawareness of
        // <area> tag with respect to background image; through addGreyScaleSwitcher
        // it is possible to change from a greyscale background to a color one,
        // increasing the look and feel coherence with original travian GUI. 
        var mouseover_fun = document.createElement ("script");
        var mouseout_fun  = document.createElement ("script");
        var div_id  = "";
        var fun_id  = "";
        var icon_gs = icon + "_gs";
        
        switch (icon) {
            case "mercado":
                div_id = "n6";
                fun_id = "Market";
                break;
            case "militar":
                div_id = "n7";
                fun_id = "Militar";
                break;
            case "alliance":
                div_id = "n8";
                fun_id = "Alliance";
                break;
            case "militar2":
                div_id = "n10";
                fun_id = "Militar2";
                break;
            case "misc":
                div_id = "n11";
                fun_id = "Misc";
                break;
        }
        
        mouseover_fun.innerHTML = "function bigIcon" + fun_id + " () { var icon = document.getElementById (\"" + div_id + "\"); icon.style.backgroundImage = \"url(\'" + image[icon] + "\')\";}";
        document.body.appendChild (mouseover_fun);

        mouseout_fun.innerHTML = "function bigIcon" + fun_id + "GS () { var icon = document.getElementById (\"" + div_id + "\"); icon.style.backgroundImage = \"url(\'" + image[icon_gs] + "\')\";}";
        document.body.appendChild (mouseout_fun);
    }
	
	function createStatLink(strType, aX, textURL) {
		var linkType;
		var linkURLws = '';
		var statLink = '';
		var wsAnalyserOption = getGMcookie('wsanalyser', false);
		if (wsAnalyserOption == "false" || wsAnalyserOption == "0") {
			var linkWAnalyser = wsURLStart["0"];
			var labelWAnalyser = T('WANALYSER0');
			if (strType == "user") {
				linkType = 'uid=';
			} else if (strType == "ally") {
				linkType = 'aid=';
			}
			linkURLws = linkWAnalyser + wsServerName + "&" + linkType + aX;
		} else if (wsAnalyserOption == "1") {
			var linkWAnalyser = wsURLStart["1"];
			var labelWAnalyser = T('WANALYSER1');
			if (strType == "user") {
				linkType = 'idu=';
			} else if (strType == "ally") {
				linkType = 'ida=';
			}
			linkURLws = linkWAnalyser + wsServerName + "&" + linkType + aX;
		} else if (wsAnalyserOption == "2") {
			var linkWAnalyser = wsURLStart["2"];
			var labelWAnalyser = T('WANALYSER2');
			if (strType == "user") {
				linkType = 'player/';
			} else if (strType == "ally") {
				linkType = 'alliance/';
			}
			linkURLws = linkWAnalyser + linkType + wsServerName + "/id/" + aX;
		}

		if (textURL) {
			var statLink = newLink(textURL, [['target', '_blank'], ['href', linkURLws]]);
		} else if (linkURLws != '') {
			var aImg = newImage([['src', image["globe"]], ['style', 'margin:0px 2px -2px 3px; display:inline;'], ['title', labelWAnalyser], ['border', '0']]);
			statLink = newLink("", [['target', '_blank'], ['href', linkURLws]]);
			statLink.appendChild(aImg);
		}
		//statLink.href = linkURLws;
		return statLink;
	}

	function createMapLink(strType, aX) {
		var smURLStart = "http://travmap.shishnet.org/map.php?lang=" + detectedLanguage + "&server=" + fullServerName;
		var smURLEnd = "&groupby=player&casen=on&format=svg&azoom=on";
		var hrefMapPage = '';
		var linkMapPage = '';
		if (strType == "user") {
			hrefMapPage = smURLStart + "&player=id:" + aX + smURLEnd;
		} else if (strType == "ally") {
			hrefMapPage = smURLStart + "&alliance=id:" + aX + smURLEnd;
		}
		if (hrefMapPage != '') {
			var aImg = newImage([['src', image["smap"]], ['style', 'margin:0px 2px -2px 3px; display:inline;'], ['title', 'Map'], ['border', '0']]);
			var linkMapPage = newLink("",[['href', hrefMapPage], ['target', '_blank']]);
			linkMapPage.appendChild(aImg);
		}
		return linkMapPage;
	}

	function insertTravMapUserLink(aNode, uid) {
		//insert the Travmap link
		aNode.parentNode.insertBefore(createMapLink("user", uid), aNode.nextSibling);
	}

	function insertWALink(aNode, uid) {
		//insert the Travian World Analyser link
		aNode.parentNode.insertBefore(createStatLink("user", uid), aNode.nextSibling);
	}
	
	function insertIGMLink(aNode, uid) {
		// Insert the IGM link
		var aImg = newImage([['src', image["igm"]], ['style', 'margin:3px 0px 1px 3px; display:inline;'], ['title', T('SENDIGM')], ['border', '0']]);
		var igmLink = newLink("", [['href', 'nachrichten.php?t=1&id=' + uid]]);
		igmLink.appendChild(aImg);
		aNode.parentNode.insertBefore(igmLink, aNode.nextSibling);
	}
	
	function addReadMesRepInPopup(aNode) {
		//var boolShowMesOpenLinks = getGMcookie("showmesopenlinks", false);
		//if (boolShowMesOpenLinks == 'false') boolShowMesOpenLinks = '1';
		//if (boolShowMesOpenLinks == "1") {
		if (aNode.parentNode) {
			var origWidth = aNode.parentNode.clientWidth;
			if (aNode.parentNode.innerHTML.indexOf(imgPrefix) == -1) {
				var aButton = newLink("&nbsp;&nbsp;", [['href', jsVoid], ['style', 'height:0px; width:20px; position:relative; float:' + docDir[1]]]);
				var aImg = newImage([['src', image['igmopen']]]);;
				aImg.addEventListener("click", createMesRepPopup(aNode), false);
				aButton.appendChild(aImg);
				aNode.parentNode.insertBefore(aButton, aNode);
				//aNode.parentNode.appendChild(aButton);
				//if (crtLocation.indexOf("?s=3") == -1) {
				//	aNode.parentNode.setAttribute("width", (parseInt(origWidth) + 30) + "px");
				//}
				//aNode.parentNode.insertBefore(aButton, aNode.nextSibling);
			}
		}
		//}
		
		function createMesRepPopup(aNode) {
			return function() {
				ajaxRequest(aNode.href, 'GET', null, function(AJAXrespX) {
					var aDoc = document.implementation.createDocument("", "", null);
					var aElem = document.createElement('DIV');
					aElem.innerHTML = AJAXrespX.responseText;
					aDoc.appendChild(aElem);
					var aValue = aDoc.evaluate("//div[@id='" + dmid2 + "']", aElem, null, XPFirst, null).singleNodeValue;
					if (aValue) {
						if (!get("mr_tooltip")) createMesRepTooltip();
						var tooltip = get("mr_tooltip");
						if (get('lmid2_1')) removeElement(get('lmid2_1'));
						aValue.setAttribute('id', 'lmid2_1');
						tooltip.appendChild(aValue);
						
						//process message
						var arrayCells = xpathResultEvaluate("//td[@background]");
						if (arrayCells.snapshotLength > 0) {
							//add coordinates in message if needed
							for (var i = 0; i < arrayCells.snapshotLength; i++) {
								var aCell = arrayCells.snapshotItem(i);
								var iHTML = aCell.innerHTML;
								aCell.innerHTML = processCoordsInMessage(iHTML);
							}
						} else {
							//process battle Report
							battleReportV2();
							playerLinks();
							if (boolShowTroopInfoTooltips == "1") showTroopInfo();
						}
						tooltip.style.display = "block";
					}
				}, dummy);
			}
		}
		
		function createMesRepTooltip() {
			var div = elem("DIV");
			div.setAttribute("id", "mr_tooltip");
			div.setAttribute("style", "position:absolute; width:450px; top:90px; " + docDir[0] + ":680px; display:block; padding:1px; z-index:100; clear:both; border:solid 2px #C0C0C0; background-color:#FFFFFF;");
			div.innerHTML = "";
			
			var dragDiv = elem("DIV");
			dragDiv.setAttribute("style", "height:20px; width:405px; float:" + docDir[0] + "; cursor: pointer; border-bottom:solid 1px #C0C0C0;background-color:#C0C0C0;");
			dragDiv.innerHTML = "";
			
			var closeDiv = elem("DIV");
			closeDiv.setAttribute("style", "height:20px; width:45px; float:" + docDir[0] + "; border-bottom:solid 1px #C0C0C0; background-color:#C0C0C0;");
			closeDiv.innerHTML = "";
			
			var closeImage = newImage([['src', image["closeButton"]], ['style', 'cursor:pointer'], ['title', T('CLOSE')]]);
			closeImage.addEventListener("click", function() {get("mr_tooltip").style.display = "none"; }, false);
			closeDiv.appendChild(closeImage);
			
			makeDraggable(div, dragDiv);
			div.appendChild(dragDiv);
			div.appendChild(closeDiv);
			
			document.body.appendChild(div);
		}
	}
	
	function createResBarTooltip() {
		var resbarCoords = getGMcookie("resbarXY", false);
		if (resbarCoords == "false") {
			resbarCoords = "680px|90px";
			setGMcookie("resbarCoords", resbarCoords, false);
		}
		var resbarXY = resbarCoords.split("|");
		var resbarWidth = 250;
		var div = elem("DIV");
		div.setAttribute("id", "resbar_tooltip");
		div.setAttribute("style", "position:absolute; width:" + resbarWidth + "px; top:" + resbarXY[1] + "; " + docDir[0] + ":" + resbarXY[0] + "; display:block; padding:1px; z-index:50; clear:both; border:solid 2px #C0C0C0; background-color:#FFFFFF;");
		div.innerHTML = '';
		
		var dragDiv = elem("DIV");
		dragDiv.setAttribute("style", "height:20px; width:" + (resbarWidth - 45) + "px; float:" + docDir[0] + "; cursor: pointer; border-bottom:solid 1px #C0C0C0; background-color:#C0C0C0;");
		dragDiv.innerHTML = "";
		
		var closeDiv = elem("DIV");
		closeDiv.setAttribute("style", "height:20px; width:45px; float:" + docDir[0] + "; border-bottom:solid 1px #C0C0C0; background-color:#C0C0C0;");
		closeDiv.innerHTML = "";
		
		var closeImage = newImage([['src', image["closeButton"]], ['style', 'cursor:pointer'], ['title', T('CLOSE')]]);
		closeImage.addEventListener("click", function() {get("resbar_tooltip").style.display = "none"; setGMcookie("showresbars", "0", false);}, false);
		closeDiv.appendChild(closeImage);
		
		makeDraggable(div, dragDiv);
		div.appendChild(dragDiv);
		div.appendChild(closeDiv);
		
		//create the res bar table
		var resBarDiv = elem("DIV");
		//resBarDiv.innerHTML = '';
		var resBarTable = newTable();
		for (var i = 0; i < 4; i++) {
			var aRow = newRow("", [['style', 'white-space:nowrap;']]);
			var aCell = newCell(gIcons["r" + (i+1)]);
			var strSpan = timeToFill[i][1];
			var intColorA = strSpan.indexOf("color");
			var tSpanColor = strSpan.substring(intColorA);
			var intBlink = tSpanColor.indexOf("blink");
			var intColorB = tSpanColor.indexOf(";");
			tSpanColor = tSpanColor.substring(0, intColorB);
			var tBlink = '';
			if (intBlink != -1) tBlink = '; text-decoration:blink; ';
			var procNo = Math.round(currentResUnits[i] / capacity[i] * 100) + "%";
			var procSpan = '<span id="timeouta" style="font-size:8pt;' + tSpanColor + tBlink + '">' + procNo + '</span>';
			var bCell = newCell(procSpan, [['align', docDir[0]]]);
			
			var cCell = newCell(timeToFill[i][1]);
			aRow.appendChild(aCell);
			aRow.appendChild(bCell);
			aRow.appendChild(cCell);
			resBarTable.appendChild(aRow);
		}
		resBarDiv.appendChild(resBarTable);
		div.appendChild(resBarDiv);
		
		document.body.appendChild(div);
	}
	
	function insertUserLinks(aNode, uid) {
		if (aNode.parentNode) {
			if (aNode.parentNode.innerHTML.indexOf(imgPrefix) == -1) {
				if (boolShowTravmapLinks == "1") insertTravMapUserLink(aNode, uid);
				if (boolShowStatLinks == "1") insertWALink(aNode, uid);
				var boolShowIGMLinkForMe = getGMcookie("showigmlinkforme", false);
				if (crtUserID != uid || (crtUserID == uid && boolShowIGMLinkForMe != "0")) insertIGMLink(aNode, uid);
			}
		}
	}
	
	function insertAttSendResLinks(aNode, newdid) {
		var aNodeParent = aNode.parentNode;
		if (aNodeParent) {
			//if (aNodeParent.innerHTML.indexOf(imgPrefix) == -1) {
			var imgIsHere = aNodeParent.innerHTML.indexOf("att_link_" + newdid);
			if (imgIsHere == -1) {
				var arrAction = getRallyPointDefaultActionArray();
				// insert a market link for this village
				//var srlink = elem('a',"&nbsp;<img " + gIcons["r4"] + " style='margin:3px 0px 1px 3px; display:inline;' title='" + T('ENVIAR') + "' alt='" + T('ENVIAR') + "' border='0'>");
				var srlink = newLink("&nbsp;" + gIcons["r41"]);
				srlink.href = aNode.href.replace("karte.php?d", "build.php?z") + "&gid=17";
				aNodeParent.insertBefore(srlink, aNode.nextSibling);
				// insert an attack/reinforcement link for this village
				var atklink = elem('a',"&nbsp;<img " + gIcons[arrAction[0]] + " id='att_link_" + newdid + "' style='margin:3px 0px 1px 3px; display:inline;' width='12px' height='12px' title='" + arrAction[1] + "' alt='" + arrAction[1] + "' border='0'>");
				atklink.href = 'a2b.php?z=' + newdid;
				atklink.id = 'att_link_' + newdid;
				aNodeParent.insertBefore(atklink, aNode.nextSibling);
			}
		}
	}
	
	function insertAllyLinks(aNode, aid) {
		var aNodeParent = aNode.parentNode;
		if (aNodeParent) {
			if (aNodeParent.innerHTML.indexOf(imgPrefix) == -1) {
				//insert the Travmap link
				if (boolShowTravmapLinks == "1") aNodeParent.insertBefore(createMapLink("ally", aid), aNode.nextSibling);
				//insert the Travian World Analyser link
				if (boolShowStatLinks == "1") aNodeParent.insertBefore(createStatLink("ally", aid), aNode.nextSibling);
			}
		}
	}
	
	function getTroopIndexTitleFromImage(tImg) {
		var tInfo = [0, ""];
		if (tImg.src.match(/img\/un\/u\/(\d+)\.gif/)) {
			tInfo[0] = RegExp.$1;
			tInfo[1] = tImg.title;
		} else {
			//log(3, "tImg.className = " + tImg.getAttribute("class"));
			var imgClassName = tImg.getAttribute("class");
			if (imgClassName != null) {
				if (imgClassName.indexOf("unit") != -1) {
					if (imgClassName.indexOf(" ") != -1) {
						tInfo[0] = imgClassName.split(" ")[1].replace("u", "");
						tInfo[1] = tImg.title;
					}
				}
			}
		}
		return tInfo;
	}
	
	function showTroopInfo() {
		if (!get('tb_tooltip')) {
			createTooltip();
		}
		var images = document.images;
		for (var i = 0; i < images.length; i++) {
			var tInfo = getTroopIndexTitleFromImage(images[i]);
			if (tInfo[0] != 0  && tInfo[0] < 41) {
				var troopImg = images[i];
				if (tInfo != 0 && tInfo[1] == '') {
					//for the dorf1.php page where there is no title attribute to the image
					var xRow = troopImg.parentNode;
					if (xRow) {
						if (xRow.getAttribute("href")) {
							xRow = xRow.parentNode;
							if (xRow) {
								xRow = xRow.parentNode;
							}
						} else {
							xRow = xRow.parentNode;
						}
						if (xRow) {
							try {
								var troopNameCell = xRow.cells[2];
								if (troopNameCell) {
									tInfo[1] = troopNameCell.textContent;
								}
							} catch(e) {
							}
						}
					}
				}
				troopImg.removeAttribute('title');
				troopImg.addEventListener("mouseover", showTroopInfoTooltip(tInfo[0], tInfo[1]), 0);
				troopImg.addEventListener("mouseout", function() {get("tb_tooltip").style.display = 'none';}, 0);
			}
		}
	}
	
	/**
	 * Crea un enlace para mandar un IGM cuando aparece un enlace al perfil de un jugador, un enlace de
	 * ataque rapido cuando aparece un enlace a una ubicacion del mapa, y otro enlace de estadisticas si
	 * esta soportado para el language del servidor activo
	 */
	function playerLinks(){
		var boolShowRPrInfoTooltips = getGMcookie("showrprinfotooltips", false);
		if (boolShowRPrInfoTooltips == 'false') boolShowRPrInfoTooltips = '1';
		
		var boolShowMesOpenLinks = getGMcookie("showmesopenlinks", false);
		if (boolShowMesOpenLinks == 'false') boolShowMesOpenLinks = '1';
		
		var allLinks = document.getElementsByTagName("a");
		for(var i = 0; i < allLinks.length; i++) {
			// if it's a player link
			if (allLinks[i].href.search(/spieler.php\?uid=(\d+$)/) > 0) {
				var a = RegExp.$1;
                if (a == 0) continue;
				if (allLinks[i].parentNode.className == 'menu' || allLinks[i].parentNode.nodeName == 'P') continue;
				insertUserLinks(allLinks[i], a);
			
			// the attack link for karte.php links
			//} else if (allLinks[i].href.search(/karte.php\?d=(\d+)/) > 0  && crtLocation.indexOf("build.php?gid=17") == -1 && crtLocation.indexOf("&t=1") == -1 && allLinks[i].href.indexOf("#") == -1) {
			} else if (allLinks[i].href.search(/karte.php\?d=(\d+)/) > 0  && crtLocation.indexOf("build.php?gid=17") == -1 && crtLocation.indexOf("&t=1") == -1) {
				var newdid = RegExp.$1;
				if (newdid != villageInfo[1]) {
					insertAttSendResLinks(allLinks[i], newdid);
					if (boolShowRPrInfoTooltips == "1" && (crtLocation.indexOf("build.php?id=39") != -1 || crtLocation.indexOf("gid=16") != -1 || crtLocation.indexOf("berichte.php") != -1) || crtLocation.indexOf("spieler.php?") != -1) {
						//add a tooltip including distance and troop times
						allLinks[i].addEventListener("mouseover", showCoordAndDist(newdid), false);
						allLinks[i].addEventListener("mouseout", function() {get("tb_tooltip").style.display = 'none';}, false);
					}
				}	
			// if it's an alliance link
			} else if (allLinks[i].href.search(/allianz.php\?aid=(\d+$)/) > 0){
				var a = RegExp.$1;
				if (a == 0) continue;
				insertAllyLinks(allLinks[i], a);
			//if it's a message link
			} else if (boolShowMesOpenLinks == "1") {
				if (allLinks[i].href.indexOf("nachrichten.php?id=") != -1 || allLinks[i].href.indexOf("berichte.php?id=") != -1) {
					addReadMesRepInPopup(allLinks[i]);
				}
			}
		}
		
		function showCoordAndDist(newdid) {
			return function() {
				var toolTipHTML = "<table class='f8' cellpadding='0' cellspacing='0' border='0' width='0%'>";
				var xyCoord = id2xy(newdid);
				toolTipHTML += "<td colspan='2' align='center' style='font-weight:bold; color:green; border-bottom:1px grey solid;'>(" + xyCoord + ")</td>";
				toolTipHTML += getTroopMerchantTooltipHTML(newdid, "blue", false, true, true);
				toolTipHTML += "</table>";
				var tooltipdiv = get("tb_tooltip");
				if (!tooltipdiv) {
					createTooltip();
				}
				tooltipdiv.innerHTML = toolTipHTML;
				tooltipdiv.style.display = 'block';
			}
		}
	}

	/**
	 * Crea eventos para enviar al formulario de envio de materias primas del mercado las coordenadas
	 * de las propias aldeas.
	 * Codigo sugerido por Bafox
	 */
	function quickCity(){
		var formInput = find("//form[@name='snd']", XPFirst);
		if (formInput == null) return;
		var cities = new Array();
		var xDestination, yDestination;

		// Recupera la coordenada X
		var n = find("//table[@class='dtbl']//td[@class='right dlist1']", XPList);
		for (var i = 0; i < n.snapshotLength; i++){
			cities[i] = new Object();
			try {
				cities[i].x = n.snapshotItem(i).innerHTML.split('(')[1];
			} catch(ex1) {}
		}

		// Recupera la coordenada Y
		n = find("//table[@class='dtbl']//td[@class='left dlist3']", XPList);
		for(var i = 0; i < n.snapshotLength; i++){
			try {
				cities[i].y = n.snapshotItem(i).innerHTML.split(')')[0];
			} catch(ex2){}
		}

		// Por cada par de coordenadas crea un evento para copiarlas al formulario
		n = find("//table[@class='dtbl']//tr", XPList);
		for (var i = 0; i < cities.length; i++){
			var elemVillage = n.snapshotItem(i);
			elemVillage.setAttribute('onClick',"snd.x.value='" + cities[i].x + "';snd.y.value='" + cities[i].y + "'");
			elemVillage.setAttribute('onMouseOver', 'this.style.color="red"');
			elemVillage.setAttribute('onMouseOut', 'this.style.color="black"');
			elemVillage.style.cursor = "pointer";
		}


		if  (crtLocation.indexOf('a2b.php') > -1 || crtLocation.indexOf('karte.php?d=') > -1) {
			var xyValues = new Array();
			xyValues[0] = find("//form[@name='snd']//input[@name='x']", XPFirst);
			xyValues[0].addEventListener('keyup', function() {captureDestination();}, 0);
			xyValues[1] = find("//form[@name='snd']//input[@name='y']", XPFirst);
			xyValues[1].addEventListener('keyup', function() {captureDestination();}, 0);
			if (crtLocation.indexOf('a2b.php?z=') > -1) captureDestination();
			if (crtLocation.indexOf('a2b.php?newdid=') > -1 && crtLocation.indexOf('z=')) captureDestination();
		}

		function captureDestination() {
			var xDestination = xyValues[0].value;
			var yDestination = xyValues[1].value;
			if (xDestination != "" && yDestination != "") {
				var oldTable = get("trooptimetable");
				if (oldTable) {
					var oldChild = oldTable.parentNode.removeChild(oldTable);
				}
				var ttTable = newTable();

				//for compatibility to the Travian Battle Analyser (where an additional <p/> element is introduced to the lmid2 div)
				var parOK = find("//form[@name='snd']/p[4]", XPFirst);
				if (!parOK) {
					//normal case, when Travian Battle Analyser is not active
					var parOK = find("//form[@name='snd']/p[3]", XPFirst);
				}
				parOK.appendChild(ttTable);
				var aRow = newRow("&nbsp;");
				ttTable.appendChild(aRow);

				createTimeTroopTable(aRow, xDestination, yDestination);
			} else {
				var oldTable = get("trooptimetable");
				if (oldTable) {
					oldTable.style.visibility = "hidden";
				}
			}
			return;
		}
	}

	function battleReportV2(aFrom){
		//return;
		//log(3, "Enter battleReportV2");
		if (boolIsT35 == false) {
			var t = find("//table[@class='tbg']//table[@class='tbg']", XPList);
		} else {
			var t = find("//table[@class='std reports_read']//table[@class='std']", XPList);
		}
		if (!t) return;
		//log(3, "t.snapshotLength = " + t.snapshotLength);
		if (boolIsT35 == false) {
			if (t.snapshotLength < 2) return;
		} else {
			if (t.snapshotLength < 1) return;
		}
		
		var boolShowBRStatDetails = getGMcookie("showbrstatdetails", false);
		if (boolShowBRStatDetails == "false") boolShowBRStatDetails = '1';
		
		if (aFrom == "orig") {
			if (boolIsT35 == false) {
				var origTable = find("//table[@class='tbg']", XPFirst);
			} else {
				var origTable = find("//table[@class='std reports_read']", XPFirst);
			}
			var newOrigTable = origTable.cloneNode(true);
			var divlmid2 = find("//div[@id='" + dmid2 + "']", XPFirst);
			divlmid2.removeChild(origTable);
			//add a paragraph, a table with a text and a checkbox
			var input = elem("INPUT");
			input.setAttribute("type", "checkbox");
			//input.setAttribute("border", "0");
			input.setAttribute("id", "tb_battlereport");
			input.addEventListener("click", function() { showHideOriginalBattleReport(p1, newOrigTable, origTable); }, 0);

			var p2 = elem("P", "");
			var ptable = newTable();
			var aRow = newRow("");
			var aCell = elem("TD", T('SHOWORIGREPORT') + ":");
			aRow.appendChild(aCell);
			var bCell = elem("TD", "");
			bCell.appendChild(input);
			aRow.appendChild(bCell);
			ptable.appendChild(aRow);
			p2.appendChild(ptable);
			divlmid2.appendChild(p2);

			//create a  second paragraph (for displaying the tables)
			var p1 = elem("P", "");
			//append the paragraph to the divlmid2
			var divlmid2 = get(dmid2);
			divlmid2.appendChild(p1);
			p1.appendChild(origTable);
		}
		
		//get the total booty
		var booty = 0;
		var labelReward = '<img src="' + image["capacity"] + '" border="0">';
		var imgRes = new Array;
		for (var i = 0; i < 4; i++) {
			imgRes[i] = gIcons["r" + (i + 1)];
		}
		var stBooty = [0, 0, 0, 0];
		
		if (boolIsT35 == false) {
			var aX = find("//tr[@class='cbg1']", XPList);
		} else {
			var aX = find("//table[@class='std']//thead", XPList);
		}
		
		if (boolIsT35 == false) {
			if (aX.snapshotLength >= 3){
				var intToProcess = -1;
				for (var i = 0; i < aX.snapshotLength; i++) {
					if (aX.snapshotItem(i).childNodes.length == 4) intToProcess = i;
				}
				//log(3, "aX.snapshotLength = " + aX.snapshotLength + "; intToProcess = " + intToProcess);
				if (intToProcess > -1) {
					var b = aX.snapshotItem(intToProcess).childNodes[3];
				} else {
					var b = aX.snapshotItem(1).childNodes[1];
					if (b.innerHTML.indexOf('class="res"') == -1) {
						var b = aX.snapshotItem(2).childNodes[1];
					}
				}
				if (b.childNodes.length == 8){
					var qBooty = new Array();
					var infoBooty = '';
					for (var i = 0; i < 4; i++) {
						qBooty[i] = parseInt(b.childNodes[i*2 + 1].nodeValue);
						infoBooty += imgRes[i];
						infoBooty += qBooty[i];
						if (i < 3) infoBooty += ' + '; else infoBooty += ' = ';
						stBooty[i] = qBooty[i];
					}
					booty = arrayToInt(qBooty);
					infoBooty += booty;
					b.innerHTML = infoBooty;
				}
			}
		} else {
			var infoBooty = '';
			var b1Table = aX.snapshotItem(0).parentNode;
			if (!b1Table.rows[4]) return;
			var bootyCell = b1Table.rows[4].cells[1];
			var aqBooty = bootyCell.textContent.split("|");
			if (aqBooty.length > 1) {
				var qBooty = new Array();
				for (var i = 0; i < aqBooty.length; i++) {
					qBooty[i] = parseInt(aqBooty[i].replace(" ", "").replace(" ", ""));
					infoBooty += imgRes[i];
					infoBooty += qBooty[i];
					if (i < 3) infoBooty += ' + '; else infoBooty += ' = ';
					stBooty[i] = qBooty[i];
				}
				//log(3, "qBooty = " + qBooty);
				booty = arrayToInt(qBooty);
				infoBooty += booty;
				bootyCell.innerHTML = infoBooty;
			}
		}

		var arrLoss = new Array();
		var arrCarry = new Array();
		// there are more tables for the participants in the attack (1 = attacker, 1 = attacked and x = reinforcements)
		//log(3, "t.snapshotLength = " + t.snapshotLength);
		//tadPower => 0 = attack power; 1 = def_i power; 2 = def_c power; 3 = total loss; 4 = loss res 1; 5 = loss res 2; 6 = loss res 3; 7 = loss ress 4; 8 = crop consumption of killed troops; 9 = hero no.; 10 = crop consumption of initial troops
		var tadPower = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
		var atkLabelCell;
		var defLabelCell;
		var brCell = t.snapshotItem(0).parentNode;
		
		for (var g = 0; g < t.snapshotLength; g++){
			arrCarry[g] = 0;
			var tTable = t.snapshotItem(g);
			var attdefPower = [0,0,0];
			var intNoOfCells = tTable.rows[1].cells.length - 1;
			if (intNoOfCells == 11) {
				if (g == 0) tadPower[0][9] += 1; else tadPower[1][9] += 1;
			}
			if (g == 0) atkLabelCell = tTable.rows[0].cells[0].cloneNode(true); else defLabelCell = tTable.rows[0].cells[0].cloneNode(true);
			for(var j = 1; j < 11; j++){
				var troopIndexImg = tTable.rows[1].cells[j].getElementsByTagName('img')[0];
				if (boolIsT35 == false) {
					var troopIndex = troopIndexImg.src.replace(/.*\/.*\//,'').replace(/\..*/,'');
				} else {
					var arrTroopIndex = troopIndexImg.className.split(" ");
					var troopIndex = arrTroopIndex[1].replace("u", "");
				}
				var intNoOfTroops = parseInt(tTable.rows[2].cells[j].textContent);
				var intNoOfTroopsLost = 0;
				if (tTable.rows[3]) {
					var intNoOfTroopsLost = parseInt(tTable.rows[3].cells[j].textContent);
				}
				if (!isNaN(intNoOfTroops)) {
					if (g == 0) {
						attdefPower[0] += uc[troopIndex][5] * intNoOfTroops;
						tadPower[0][0] += uc[troopIndex][5] * intNoOfTroops;
						tadPower[0][1] += uc[troopIndex][6] * intNoOfTroops;
						tadPower[0][2] += uc[troopIndex][7] * intNoOfTroops;
						tadPower[0][8] += uc[troopIndex][9] * intNoOfTroopsLost;
						tadPower[0][10] += uc[troopIndex][9] * intNoOfTroops;
					} else {
						attdefPower[0] += uc[troopIndex][5] * intNoOfTroops;
						attdefPower[1] += uc[troopIndex][6] * intNoOfTroops;
						attdefPower[2] += uc[troopIndex][7] * intNoOfTroops;
						tadPower[1][0] += uc[troopIndex][5] * intNoOfTroops;
						tadPower[1][1] += uc[troopIndex][6] * intNoOfTroops;
						tadPower[1][2] += uc[troopIndex][7] * intNoOfTroops;
						tadPower[1][8] += uc[troopIndex][9] * intNoOfTroopsLost;
						tadPower[1][10] += uc[troopIndex][9] * intNoOfTroops;
					}
				}
				
				// Recupera la cantidades de tropa de cada tipo que han intervenido
				var u = uc[troopIndex];
				var p = tTable.rows[3] ? tTable.rows[3].cells[j].innerHTML : 0;
				// Basandose en el coste por unidad y su capacidad, se calculan las lossTotal y la capacidad de carga total
				var ptu = arrayByN(u, p);
				arrLoss[g] = arrayAdd(arrLoss[g], ptu.slice(0, 4));
				arrCarry[g] += (tTable.rows[2] ? tTable.rows[2].cells[j].innerHTML - p : 0) * u[4];
			}
			
			//add the attack/def power to the row[1].cells[0]
			var attdefCell = tTable.rows[1].cells[0];
			if (g == 0) {
				//the attacking power
				attdefCell.setAttribute('style', 'font-size:8pt; color:#FF8000');
				attdefCell.innerHTML = attdefPower[0].toLocaleString() + " " + "<img " + gIcons["att_all"] + " width='10px' height='10px'>";
			} else {
				//the defense power of the defender (per table)
				attdefCell.setAttribute('style', 'font-size:8pt; color:green');
				attdefCell.innerHTML = attdefPower[1].toLocaleString() + " " + "<img " + gIcons["def_i"] + " width='10px' height='10px'><br>" + attdefPower[2].toLocaleString() + " " + "<img " + gIcons["def_c"] + " width='10px' height='10px'>";
			}

			// add the loss row to the att/def table
			var iHTML = '';
			for (var i = 0; i < 4; i++){
				iHTML += imgRes[i];
				iHTML += arrLoss[g][i];
				if (i < 3) iHTML += ' + '; else iHTML += ' = ';
				if (g == 0) {
					tadPower[0][4 + i] += arrLoss[g][i];
				} else {
					tadPower[1][4 + i] += arrLoss[g][i];
				}
			}
			var lossTotal = arrayToInt(arrLoss[g]);
			if (g == 0) tadPower[0][3] += lossTotal; else tadPower[1][3] += lossTotal;
			if (lossTotal > 0) iHTML += " <b><font color='red'>" + lossTotal + "</font></b>"; else iHTML += lossTotal;
			var informe = newCell(iHTML, [['colspan', intNoOfCells], ['class', 's7']]);
			var aRow = newRow("", [['class', 'cbg1']]);
			//aRow.className = "cbg1";
			aRow.appendChild(elem("TD", T('LOSS')));
			aRow.appendChild(informe);
			tTable.appendChild(aRow);

			// For the attacker we'll compute the profit and efficiency of the attack
			if (g == 0){
				// Profit compared to lossTotal
				var profit = 0;
				if (arrCarry[g] == 0) {
					booty = 0;
					for (var i = 0; i < 4; i++) {stBooty[i] = 0;}
				} else  {
					profit = ((booty - lossTotal) * 100 / booty).toFixed(2);
				}
				if (booty == 0)	if (lossTotal == 0) profit = 0; else profit = -100;
				var bCell = newCell(profit + "%", [['colspan', intNoOfCells], ['class', 's7']]);
				var pRow = newRow("", [['class', 'cbg1']]);
				pRow.appendChild(elem("TD", T('PROFIT')));
				pRow.appendChild(bCell);
				tTable.appendChild(pRow);

				// Efficiency -> the entire booty compared to how much the attacker can carry back (considering only the troops that survived)
				var efficiency = 100 - ((arrCarry[g] - booty) * 100 / arrCarry[g]);
				if (arrCarry[g] == 0) efficiency = 0;
				var bCell = newCell(efficiency.toFixed(2) + "% (" + booty + "/" + arrCarry[g] + ")", [['colspan', intNoOfCells], ['class', 's7']]);
				var eRow = newRow("", [['class', 'cbg1']]);
				eRow.appendChild(elem("TD", T('EFICIENCIA')));
				eRow.appendChild(bCell);
				tTable.appendChild(eRow);
			}
		}
		
		//add a simple statistics table 
		var sTable = newTable([['id', 'br_table'], ['width', '100%'], ['align', 'center'], ['cellspacing', '0'], ['cellpadding', '3'], ['border', '1px'], ['rules', 'all']]);
		sTable.setAttribute('style', 'border:1px solid #C2C2C2');
		
		//add the title row
		var sTitleRow = newRow("", [['class', 'cbg1']]);
		var sTcell1 = newCell(T('STATISTICS'), [['style','background-color:#F3F3F3;']]);
		sTitleRow.appendChild(sTcell1);
		atkLabelCell.removeAttribute("width");
		defLabelCell.removeAttribute("width");
		sTitleRow.appendChild(atkLabelCell);
		sTitleRow.appendChild(defLabelCell);
		sTable.appendChild(sTitleRow);
		
		//attack power row
		atkRow = newRow("");
		var atkIconCell = newCell("<img " + gIcons["att_all"] + ">", [['style', tdBorderTop]]);
		atkRow.appendChild(atkIconCell);
		var atkAPower = newCell(tadPower[0][0].toLocaleString(), [['align', docDir[1]], ['style', tdBorderTop + '; text-align:' + docDir[1] + ';']]);
		atkRow.appendChild(atkAPower);
		var atkDPower = newCell(tadPower[1][0].toLocaleString(), [['align', docDir[1]], ['style', tdBorderTop + '; text-align:' + docDir[1] + ';']]);
		atkRow.appendChild(atkDPower);
		sTable.appendChild(atkRow);
		
		//def power rows
		defiRow = newRow("");
		var defiIconCell = newCell("<img " + gIcons["def_i"] + ">", [['style', tdBorderTop]]);
		defiRow.appendChild(defiIconCell);
		var defiAPower = newCell(tadPower[0][1].toLocaleString(), [['align', docDir[1]], ['style', tdBorderTop + '; text-align:' + docDir[1] + ';']]);
		defiRow.appendChild(defiAPower);
		var defiDPower = newCell(tadPower[1][1].toLocaleString(), [['align', docDir[1]], ['style', tdBorderTop + '; text-align:' + docDir[1] + ';']]);
		defiRow.appendChild(defiDPower);
		sTable.appendChild(defiRow);
		
		defcRow = newRow("");
		var defcIconCell = newCell("<img " + gIcons["def_c"] + ">", [['style', tdBorderTop]]);
		defcRow.appendChild(defcIconCell);
		var defcAPower = newCell(tadPower[0][2].toLocaleString(), [['align', docDir[1]], ['style', tdBorderTop + '; text-align:' + docDir[1] + ';']]);
		defcRow.appendChild(defcAPower);
		var defcDPower = newCell(tadPower[1][2].toLocaleString(), [['align', docDir[1]], ['style', tdBorderTop + '; text-align:' + docDir[1] + ';']]);
		defcRow.appendChild(defcDPower);
		sTable.appendChild(defcRow);
		
		//reward row (for the attacker only)
		var strRewATotal = booty.toLocaleString() + (boolShowBRStatDetails == '1' ? " " + T('TOTAL') : '');
		var rewATotal = newCell(strRewATotal, [['align', docDir[1]], ['style', tdBorderTop +' font-weight:bold;' + ' text-align:' + docDir[1] + ';']]);
		
		var rewRow1 = newRow("");
		var intDetailRowSpan = 1 + parseInt(boolShowBRStatDetails);
		log(3, "intDetailRowSpan = " + intDetailRowSpan);
		var rewLabelCell = newCell(labelReward, [['style', tdBorderTop], ['rowspan', intDetailRowSpan]]);
		rewRow1.appendChild(rewLabelCell);
		
		//log(3, "stBooty = " + stBooty);
		if (boolShowBRStatDetails == '1') {
			var rewA = '';
			for (var i = 1; i < 5; i++) {
				rewA += stBooty[i - 1].toLocaleString() + " " + imgRes[i - 1] + "<br>";
			}
			var rewADetail = newCell(rewA, [['align', docDir[1]], ['style', tdBorderTop + '; text-align:' + docDir[1] + ';']]);
			rewRow1.appendChild(rewADetail);
		} else {
			rewRow1.appendChild(rewATotal);
		}
		
		var rewDDetail = newCell('-', [['align', docDir[1]], ['style', tdBorderTop + '; text-align:' + docDir[1] + ';'], ['rowspan', intDetailRowSpan]]);
		rewRow1.appendChild(rewDDetail);
		sTable.appendChild(rewRow1);
		
		if (boolShowBRStatDetails == '1') {
			var rewRow2 = newRow("");
			var rewATotal = newCell(booty.toLocaleString() + " " + T('TOTAL'), [['align', docDir[1]], ['style', tdBorderTop + ' font-weight:bold;' + ' text-align:' + docDir[1] + ';']]);
			rewRow2.appendChild(rewATotal);
			sTable.appendChild(rewRow2);
		}
		
		//loss row
		
		var strLossATotal = tadPower[0][3].toLocaleString() + (boolShowBRStatDetails == '1' ? " " + T('TOTAL') : '');
		var lossATotal = newCell(strLossATotal, [['align', docDir[1]], ['style', tdBorderTop + ' font-weight:bold;' + ' text-align:' + docDir[1] + ';']]);
		if (tadPower[0][3] > 0) lossATotal.setAttribute('style', tdBorderTop + ' font-weight:bold; color:red' + '; text-align:' + docDir[1] + ';');
		
		var strLossDTotal = (tadPower[1][3] + booty).toLocaleString() + (boolShowBRStatDetails == '1' ? " " + T('TOTAL') : '');
		lossDTotal = newCell(strLossDTotal, [['align', docDir[1]], ['style', tdBorderTop + ' font-weight:bold;' + 'text-align:' + docDir[1] + ';']]);
		if (tadPower[1][3] + booty > 0) lossDTotal.setAttribute('style', tdBorderTop + ' font-weight:bold; color:red' + '; text-align:' + docDir[1] + ';');
		
		var lossRow1 = newRow("");
		var lossLabelCell = newCell(T('LOSS'), [['style', tdBorderTop], ['rowspan', intDetailRowSpan]]);
		lossRow1.appendChild(lossLabelCell);
		
		if (boolShowBRStatDetails == '1') {
			var iLossA = '';
			var iLossD = '';
			for (var i = 1; i < 5; i++) {
				//iLossA += tadPower[0][i + 3].toLocaleString() + " (-" + stBooty[i - 1].toLocaleString() + ") " + imgRes[i - 1] + "<br>";
				iLossA += tadPower[0][i + 3].toLocaleString() + imgRes[i - 1] + "<br>";
				iLossD += (tadPower[1][i + 3] + stBooty[i - 1]).toLocaleString() + " " + imgRes[i - 1] + "<br>";
			}
			var lossADetail = newCell(iLossA, [['align', docDir[1]], ['style', tdBorderTop + '; text-align:' + docDir[1] + ';']]);
			if (tadPower[0][3] > 0) lossADetail.setAttribute('style', tdBorderTop + ' color:red' + '; text-align:' + docDir[1] + ';');
			lossRow1.appendChild(lossADetail);
			var lossDDetail = newCell(iLossD, [['align', docDir[1]], ['style', tdBorderTop + '; text-align:' + docDir[1] + ';']]);
			if (tadPower[1][3] + booty > 0) lossDDetail.setAttribute('style', tdBorderTop + ' color:red;' + '; text-align:' + docDir[1] + ';');
			lossRow1.appendChild(lossDDetail);
		} else {
			lossRow1.appendChild(lossATotal);
			lossRow1.appendChild(lossDTotal);
		}
		sTable.appendChild(lossRow1);
		
		if (boolShowBRStatDetails == '1') {
			var lossRow2 = newRow("");
			lossRow2.appendChild(lossATotal);
			lossRow2.appendChild(lossDTotal);
			sTable.appendChild(lossRow2);
		}
		
		//crop consumption of initial troops
		var ccRow = newRow("");
		var ccRowLabelCell = newCell(gIcons["cropcons"], [['style', tdBorderTop]]);
		ccRow.appendChild(ccRowLabelCell);
		ccACell = newCell(tadPower[0][10] + " (-" + tadPower[0][8] + ")", [['align', docDir[1]], ['style', tdBorderTop + '; text-align:' + docDir[1] + ';']]);
		ccDCell = newCell(tadPower[1][10] + " (-" + tadPower[1][8] + ")", [['align', docDir[1]], ['style', tdBorderTop + '; text-align:' + docDir[1] + ';']]);
		ccRow.appendChild(ccACell);
		ccRow.appendChild(ccDCell);
		sTable.appendChild(ccRow);
		
		//hero row
		var heroRow = newRow("");
		var heroLabelCell = newCell("<img " + gIcons["hero"] + ">", [['style', tdBorderTop]]);
		heroRow.appendChild(heroLabelCell);
		var acc = 0;
		if (tadPower[0][9] > 0) acc = tadPower[1][8];
		heroACell = newCell(acc, [['align', docDir[1]], ['style', tdBorderTop + ' font-weight:bold;' + ' text-align:' + docDir[1] + ';']]);
		if (tadPower[1][9] > 0) acc = Math.floor(tadPower[0][8] / tadPower[1][9]); else acc = 0;
		heroDCell = newCell(acc, [['align', docDir[1]], ['style', tdBorderTop + ' font-weight:bold;' + ' text-align:' + docDir[1] + ';']]);
		heroRow.appendChild(heroACell);
		heroRow.appendChild(heroDCell);
		sTable.appendChild(heroRow);
		
		//create a simple paragraph
		var sPar = document.createElement("P");
		brCell.appendChild(sPar);
		brCell.appendChild(sTable);

		function showHideOriginalBattleReport(p1, newOrigTable, origTable) {
			var input = get("tb_battlereport");
			if (input) {
				if (input.checked == true) {
					p1.removeChild(origTable);
					p1.appendChild(newOrigTable);

				} else {
					p1.removeChild(newOrigTable);
					p1.appendChild(origTable);
				}
			}
		}

	}


	/**
	 * Create the resource fields upgrade table
	 */
	function preCompute1() {
		var datos = 0;
		var boolIsThisTheCapital = isThisTheCapital();
		var currentTotalRes = currentResUnits[4];
		var arrBiP = getArrayBuildingsInProgress();

		//get cookie for server version
		//boolOldServerVersion = getGMcookie("serverversion2", false);

		var boolShowResColorCodes = getGMcookie("showcolorreslevels", false);
		if (boolShowResColorCodes == 'false') boolShowResColorCodes = '1';
		
		if (boolShowResColorCodes == "1") {
			//create the DIV for the coloured level numbers
			var posDIV = elem("DIV", "");
			posDIV.id = 'resDiv';
			if (boolIsT35 == false) {
				if (docDir[0] == 'right') {
					posDIV.setAttribute('style', 'position:absolute; top:69px; left:257px; z-index:20;');
				}
			} else {
				if (docDir[0] == 'right') {
					posDIV.setAttribute('style', 'position:absolute; top:32px; left:257px; z-index:20;');
				}
			}
			var parentOfposDIV = get(dmid2);
			if (parentOfposDIV == null) {
				dmid2 = 'content';
				parentOfposDIV = get(dmid2);
			}
			parentOfposDIV.appendChild(posDIV);
		}

		// Crea una matriz inicializada a 0 con todos los posibles niveles de cada tipo de resource
		var grid = new Array(4);
		for (var i = 0; i < 4; i ++) {
			grid[i] = new Array(26);
			for(var j = 0; j <= 25; j++) {
				grid[i][j] = 0;
			}
		}

		// Solo hay 6 tipos de aldeas de 15 casillas cada uno. Se describe el tipo de resource por casilla
		var dist = [
			[3, 3, 0, 3, 3, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], // 9 cereales
			[2, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[0, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[0, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[0, 3, 0, 2, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[3, 3, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3] // 15 cereales
		];

		find("//div[starts-with(@id, 'f')]", XPFirst).id.search(/f(\d)/);
		var tipo = RegExp.$1;
		log(3, "precompute1: " + "tipo = " + tipo);

		var aTitle = find("//map[starts-with(@name, 'rx')]", XPFirst);
		
		if (boolIsT35 == true) {
			var allLvl = find("//img[starts-with(@class, 'reslevel')]", XPList);
			//log(3, "allLvl = " + allLvl);
		}

		// get all fields and fill the matrix with the levels detected
		for (var i = 1; i <= 18; i++){
			if (boolIsT35 == false) {
				var imgLvl = find("//img[@class='rf" + i + "']", XPFirst);
			} else {
				var imgLvl = allLvl.snapshotItem(i - 1).getAttribute("class").split(" ")[2].replace("level", "");
			}

			var crtLevel = 0;
			var strNewLevel = null;
			if (imgLvl) {
				if (boolIsT35 == false) {
					imgLvl.src.search(/\/s(\d+).gif$/);
					crtLevel = parseInt(RegExp.$1);
				} else crtLevel = parseInt(imgLvl);
				if (arrBiP != null) {
					strNewLevel = getNewUpgradeLevel(arrBiP, '', crtLevel);
					crtLevel = strNewLevel[0];
				}
				grid[dist[tipo - 1][i - 1]][crtLevel] = i;
			} else {
				grid[dist[tipo - 1][i - 1]][0] = i;
			}
			
			var strClass = "reslevel rf" + i + " level" + crtLevel;
			if (boolIsT35 == false) strClass = "rf" + i;
			var resLink = newLink("", [['href', "build.php?id=" + i], ['id', "RES" + i], ['class', strClass], ['title', aTitle.areas[i-1].title]]);
			
			if (posDIV) {
				posDIV.appendChild(resLink);
				var aDIV = createCNDiv(crtLevel, strNewLevel);			
				resLink.appendChild(aDIV);
			}	
			
			if (boolShowResColorCodes == "1") {
				aDIV.style.visibility = 'visible';
				if ((boolIsThisTheCapital == false && crtLevel < 10) || (boolIsThisTheCapital == true && boolOldServerVersion != "1") || (boolIsThisTheCapital == true && boolOldServerVersion == "1" && crtLevel < 12)) {
					//select resource type
					var colorCode = colorLvl(crtLevel, parseInt(dist[tipo - 1][i - 1]) + 1, currentTotalRes);				
					if (colorCode == 2) {
						aDIV.style.backgroundColor = CN_COLOR_UPGRADABLE_VIA_NPC;
					} else if (colorCode == 0) {
						aDIV.style.backgroundColor = CN_COLOR_NO_UPGRADE;
					}
				} else {
					aDIV.style.backgroundColor = CN_COLOR_MAX_LEVEL;
				}
				//aDIV.innerHTML = '' + crtLevel;
			}
		}

		var boolShowResUpgradeTable = getGMcookie("showresupgradetable", false);
		if (boolShowResUpgradeTable == 'false') boolShowResUpgradeTable = '1';

		if (boolShowResUpgradeTable == '1') {
			//create the resource fields upgrade table and append a first line (with images of the 4 resource types)
			var table = newTable([["class", "tbg"], ["align", docDir[0]], ["cellspacing", "1"], ["cellpadding", "1"], ["id", "resumen"]]);
			var fila1 = newRow("", [['class', 'rbg']]);
			var showUpgTable = false;
			table.appendChild(fila1);
			var noOfEntries = [0, 0, 0, 0];
			var noOfRow = 0;
			for (var i = 0; i < 4; i++) {
				var td1 = newCell(gIcons["r" + (i + 1)], [['width','25%']]);
				
				fila1.appendChild(td1);
				for (var j = 0; j < 25; j++){
					if ((boolIsThisTheCapital) || (!boolIsThisTheCapital && j < 10)){
						if (grid[i][j] > 0 && buildingCost[i][j+1] != null){
							noOfEntries[i] = noOfEntries[i] + 1;
							for (k = 0; k < 4; k++) {
								if (noOfRow < noOfEntries[k]) {
									noOfRow = noOfEntries[i];
									var bRow = newRow("");
									for (xi = 0; xi < 4; xi++) {
										var td2 = newCell("", [['valign', 'top'], ['width','25%']]);
										bRow.appendChild(td2);
									}
									table.appendChild(bRow);
								}
							}
							
							var table2 = newTable([['align', 'center'], ['valign', 'top']]);
							var td4 = table.rows[noOfEntries[i]].cells[i];
							td4.appendChild(table2);
							
							showUpgTable = true;
							var fila3 = newRow("");
							
							imgPath = 'class="reslevel rfx level' + j + '"  src="img/x.gif" alt="" style="position:relative; ' + docDir[0] + ':12px;" border="0"';
							if (boolIsT35 == false) imgPath = 'src="' + img("g/s/s" + j + ".gif") + '" style="position:relative; bottom:30px; ' + docDir[0] + ':12px;" border="0"';
							
							var imagen = '<a href="/build.php?id=' + grid[i][j] + '"><div style="width: 0%;"><img src="' + image["r" + i] + '" border="0" title="' + T('RECURSO' + (i+1)) + '">';
							if (j > 0) imagen += '<img ' + imgPath + '>';
							imagen += '</div></a>';
							var td = newCell(imagen, [['style', tdNoBorder], ['valign', 'top']]);
							fila3.appendChild(td);

							var restante = calculateResourceTime(buildingCost[i][j+1]);
							var td3 = newCell("", [['class', 'dcol f7'], ['style', tdNoBorder]]);
							fila3.appendChild(td3);
							table2.appendChild(fila3);
							var cpB = [buildingCost[i][j][4], buildingCost[i][j + 1][4]];
							var ccB = [buildingCost[i][j][5], buildingCost[i][j + 1][5]];
							//********************
							if (restante != null) {
								if (TB3O.boolShowCPinUpgTables == '1') restante.appendChild(getCpRow(cpB));
								if (TB3O.boolShowCCinUpgTables == '1') restante.appendChild(getCcRow(ccB));
								td3.setAttribute('valign', 'bottom');
								td3.setAttribute('style', tdNoBorder);
								td3.appendChild(restante);
							} else {
								td3.setAttribute('valign', 'center');
								var aTable = newTable("");
								var aRow = newRow("");
								var aCell = newCell('<a href="/build.php?id=' + grid[i][j] + '">' + T('EXTAVAILABLE') + '</a>', [['style', tdNoBorder + 'font-size:8pt; font-weight:bold;']]);
								aRow.appendChild(aCell);
								aTable.appendChild(aRow);
								if (TB3O.boolShowCPinUpgTables == '1') aTable.appendChild(getCpRow(cpB));
								if (TB3O.boolShowCCinUpgTables == '1') aTable.appendChild(getCcRow(ccB));
								td3.appendChild(aTable);
							}
						}
					}
				}
			}
			// Se desplaza la aTable hacia abajo para no interferir con la lista de aldeas / enlaces derecha
			if (showUpgTable == true)  {
				var middleblock = get(dmid);
				var TableY = longitudPantalla(table) + 'px';
				table.style.top = TableY;
				table.style.position = "absolute";
				middleblock.appendChild(table);
	        }
		}
	}

	function getCpRow(cpPerDay) {
		var cpRow = newRow("");
		var dAr = '→';
		if (docDir[0] == 'right') dAr = '←';
		var cpCell = newCell(T('CPPERDAY') + ": " + cpPerDay[0] + " " + dAr + " " + cpPerDay[1], [['colspan', '3'], ['style', 'font-size:8pt; color:blue; ' + tdNoBorder]]);
		cpRow.appendChild(cpCell);
		return cpRow;
	}
	
	function getCcRow(ccPerDay) {
		var ccRow = newRow("");
		var dAr = '→';
		if (docDir[0] == 'right') dAr = '←';
		var ccCell = newCell(gIcons["cropcons"] + " : " + ccPerDay[0] + " " + dAr + " " + ccPerDay[1], [['colspan', '3'], ['style', 'font-size:8pt; color:red; ' + tdNoBorder]]);
		ccRow.appendChild(ccCell);
		return ccRow;
	}
	
	function getNewUpgradeLevel(arrBiP, bName, bLevel) {
		var arrNewLevel = [parseInt(bLevel), ''];
		for (var xi = 0; xi < arrBiP.length; xi++) {
			if (arrBiP[xi][0] != '') {
				if (arrBiP[xi][0] == bName && parseInt(arrBiP[xi][2]) == arrNewLevel[0] + 1) {
					arrNewLevel[0] += 1;
					//log(3, "arrBiP[" + xi + "][0] = " + arrBiP[xi][0] + " -> newLevel = " + arrNewLevel[0]);
					arrNewLevel[1] = " (↑ " + (arrNewLevel[0] + 1) + ")";
				}
			}
		}
		return arrNewLevel;
	}

	function createCNDiv(levelX, strNewLevel, boolShowBlinkingBuildingLevels) {
		var aDIV = elem("DIV", "");
		var iHTML = levelX;
		aDIV.className = 'CNbuildingtags';
		if (boolShowBlinkingBuildingLevels == '1') {
			if (strNewLevel != null) {
				if (strNewLevel[1].indexOf("(") != -1) {
					iHTML = (levelX + "").blink();
				}
			}
		}
		aDIV.innerHTML = iHTML;
		aDIV.style.visibility = "visible";
		return aDIV;
	}

	//Create the buildings upgrade table & center numbers if necessary 
	function preCompute2() {
		//new approach...don't know if it works with Travian 2.x (???)
		log(3, "Entering preCompute2");
		if (boolIsT35 == false) {
			var aMap = find("//map[@name='map1']", XPFirst);
		} else {
			var aMap = get("map1");
		}
		if (aMap == null) return;
		//var boolIsMarket = isMarketSendResourcesPage();
		//if (boolIsMarket == true) return;
		var intNoCellsPerRow = 3;
		var boolShowTable = false;
		var bImg = new Array();
		var bDesc = new Array();
		var bLink = new Array();
		var bCoords = new Array();
		var arrBiP = getArrayBuildingsInProgress();		
		var currentTotalRes = currentResUnits[4];
		
		var boolShowCenterNumbers = getGMcookie("showcenternumbers", false);
		if (boolShowCenterNumbers == 'false') boolShowCenterNumbers = '1';
		
		var boolShowBuildColorCodes = getGMcookie("showcolorbuildlevels", false);
		if (boolShowBuildColorCodes == 'false') boolShowBuildColorCodes = '1';
		
		var boolShowBlinkingBuildingLevels = getGMcookie("showbblink", false);
		if (boolShowBlinkingBuildingLevels == 'false') boolShowBlinkingBuildingLevels = '1';

		if (boolIsT35 == false) {
			var aXP = find("//map[@name='" + dmap + "']", XPFirst);
		} else {
			dmap = 'map2';
			var aXP = find("//map[@id='" + dmap + "']", XPFirst);
		}
		
		//get building descriptions and links
		for (var xi = 0; xi < aXP.areas.length; xi++) {
			bDesc[bDesc.length] = aXP.areas[xi].getAttribute('title')
			bLink[bLink.length] = aXP.areas[xi].getAttribute('href');
			bCoords[bCoords.length] = aXP.areas[xi].coords;
			//log(3, "xi = " + xi + "; " + bDesc[bDesc.length -1] + "; " + bLink[bLink.length - 1] + "; " + bCoords[bCoords.length - 1]);
		}
		
		// get all the building images
		if (boolIsT35 == false) {
			var aXP = find("//div[@id='" + dmid2 + "']/img/@src", XPList);
		} else {
			var aXP = find("//div[starts-with(@class, 'village2_map')]/img[starts-with(@class, 'building') or starts-with(@class, 'dx')]", XPList);
		}
		
		if (boolIsT35 == false) bImg[0] = img('g/g16.gif');
		
		for (var i = 0; i < aXP.snapshotLength; i++) {
			if (boolIsT35 == false) {
				if (aXP.snapshotItem(i).nodeValue.indexOf("special") == -1) bImg[bImg.length] = aXP.snapshotItem(i).nodeValue;
			} else {
				var clName = aXP.snapshotItem(i).getAttribute("class");
				if (clName != null) {
					if (clName != '') {
						var clName1 = clName.split(" ");
						if (clName1.length > 1) {
							bImg[bImg.length] = clName1[clName1.length - 1] + ".gif";
						}
					}
				}
				//log(3, "bImg[" + i + "] = " + bImg[i]);
			}
			//log(3, "bDesc[" + i + "] = " + bDesc[i] + "; bLink[" + i + "] = " + bLink[i] + "; bImg[" + i + "]= " + bImg[i]);
		}
		
		// get the type of wall
		if (boolIsT35 == false) {
			var a = find("//div[starts-with(@class, 'd2_x')]", XPFirst);
			if (a) {
				switch(a.className){
					case 'd2_x d2_0': break;
					case 'd2_x d2_1': var b = "g/g31.gif"; break;
					case 'd2_x d2_11': var b = "g/g32.gif"; break;
					case 'd2_x d2_12': var b = "g/g33.gif"; break;
				}
				if (b) bImg[bImg.length - 2] = img(b);
			}
		} else {
			var ahref = find("//area[@href='build.php?id=40']", XPFirst);
			if (ahref) {
				//log(3, "crtUserRace = " + crtUserRace);
				switch (crtUserRace) {
					case "Romans": bImg[bImg.length] = "g/g32.gif"; break;
					case "Gauls": bImg[bImg.length] = "g/g31.gif"; break;
					case "Teutons": bImg[bImg.length] = "g/g32.gif"; break;
				}
				
			}
		}

		for(var i = 0; i < bImg.length; i++) {
			//log(3, "bDesc[" + i + "] = " + bDesc[i] + "; bLink[" + i + "] = " + bLink[i] + "; bImg[" + i + "]= " + bImg[i]);
			if (bImg[i] && bImg[i].indexOf("iso.gif") == -1) {
				// Get current building level
				var bLevel = bDesc[i].split(" ");
				bLevel = parseInt(bLevel[bLevel.length - 1]);
				
				var gid = bImg[i].split("/");
				gid = gid[gid.length-1].split(".");
				if (gid[0].search(/(\d+)/)) gid = parseInt(RegExp.$1);
				
				//log(3, "crtUserRace = " + crtUserRace);
				
				switch (gid) {
					case 25: setGMcookie('cpbuilding', 25, true); break; //residence is available
					case 26: setGMcookie('cpbuilding', 26, true); break; //palace is available
					case 19: {setGMcookie('barracks', 19, true); boolIsAvailableBarracks = true; if (crtUserRace == 'false') getRace();} break;
					case 29: setGMcookie('bigbarracks', 29, true); break;
					case 21: setGMcookie('workshop', 21, true); break;
					case 20: setGMcookie('stable', 20, true); break;
					case 30: setGMcookie('bigstable', 30, true); break;
					case 14: setGMcookie('tournamentsquare', bLevel, true); break;
					case 24: setGMcookie('townhall', 24, true); break;
				}
			}
		}

		var boolShowBUpgTable = getGMcookie("showbupgtable");
		if (boolShowBUpgTable == 'false') boolShowBUpgTable = '1';
		
		var table = newTable([["class", "tbg"], ["align", docDir[0]], ["cellspacing", "1"], ["cellpadding", "2"], ["id", "resumen"]]);
		var j = 0;
		var k = bImg.length;
		if (boolIsT35 == false) k = k - 1;
		for (var i = 0; i < k; i++) {
			if (bImg[i] && bImg[i].indexOf("iso.gif") == -1) {
				//get the level of the building
				var arrLevel = bDesc[i].split(" ");
				var bLevel = parseInt(arrLevel[arrLevel.length - 1]);
				var crtBlevel = bLevel;
				var strNewLevel = [bLevel, ''];
				
				if (arrBiP != null) {
					var bName = arrLevel.pop();
					bName = arrLevel.pop();
					bName = arrLevel;
					bName = arrLevel.join(" ");
					strNewLevel = getNewUpgradeLevel(arrBiP, bName, bLevel);
					bLevel = strNewLevel[0];
				}

				var gid = bImg[i].split("/");
				gid = gid[gid.length-1].split(".");
				if (gid[0].search(/(\d+)/)) gid = parseInt(RegExp.$1);
				
				//Show Center Numbers
				if (boolShowCenterNumbers == '1' && !isNaN(bLevel)) {
					//show center numbers if required					
					var aDIV = createCNDiv(crtBlevel, strNewLevel, boolShowBlinkingBuildingLevels);
					var coords = bCoords[i].split(",");
					var dy = 30;
					if (boolIsT35 == false) dy = 60;
					aDIV.style.top = parseInt(coords[1]) + dy + 'px';
					aDIV.style.left = parseInt(coords[0]) + 95 + 'px';

					var bMaxLevel = getBuildingMaxLevel(gid);					
					if (boolShowBuildColorCodes != "1") {
						aDIV.style.backgroundColor = CN_COLOR_NEUTRAL;
					} else if (bLevel == bMaxLevel || bLevel == 100) {
						aDIV.style.backgroundColor = CN_COLOR_MAX_LEVEL;
					} else {
						var colorCode = colorLvl(bLevel, parseInt(gid), currentTotalRes);
						if (colorCode == 0) {
							aDIV.style.backgroundColor = CN_COLOR_NO_UPGRADE;
						} else if (colorCode == 2) {
							aDIV.style.backgroundColor = CN_COLOR_UPGRADABLE_VIA_NPC;
						}
					}
					get(dmid2).appendChild(aDIV);
				}
				
				//create a new cell in the building uprade table id necessary
				if (buildingCost[gid] != null && buildingCost[gid][bLevel + 1] != null) {
					// check/create a new row if necessary
					if (j % intNoCellsPerRow == 0){
						var aRow = elem("TR", "");
						table.appendChild(aRow);
					}
					j++;
					
					boolShowTable = true;
					// Switch image for the roman wall/pallisade/earth wall
					switch (gid) {
						//31,32,33 - palisade, wall, earth wall
						case 31: bImg[i] = image["empalizada"]; break;
						case 32: bImg[i] = image["muralla"]; break;
						case 33: bImg[i] = image["terraplen"]; break;
						case 16: bImg[i] = image["rallypoint"]; break;
					}

					var td = newCell("", [['width', Math.floor(100/intNoCellsPerRow) + '%'], ['valign','top']]);
					aRow.appendChild(td);

					var table2 = newTable([["align", "left"], ['class','bttable']]);
					td.appendChild(table2);

					var nametr = elem("TR", "");
					table2.appendChild(nametr);
					var nametd = newCell('<a href="' + bLink[i] + '">' + bDesc[i] + strNewLevel[1] + '</a>', [['colspan',"2"], ['class', 'f10'], ['style', tdNoBorder]]);
					nametr.appendChild(nametd);

					var bRow = elem("TR", "");
					table2.appendChild(bRow);
					var imgBuilding = 'class="building ' + bImg[i].split(".")[0] + '" src="img/x.gif"';
					if (boolIsT35 == false || gid == 16 || (gid > 30 && gid < 34)) imgBuilding = 'src="' + bImg[i] + '"';
					if (boolIsT35 == false) strImgWidth = " width='90%' "; else strImgWidth = '';
					var td2 = newCell('<a href="' + bLink[i] + '"><img ' + imgBuilding + strImgWidth + 'border="0"></a>', [['class', 'f10'], ['style', tdNoBorder]]);

					bRow.appendChild(td2);

					var restante = calculateResourceTime(buildingCost[gid][bLevel+1]);
					var td3 = newCell("", [['class', 'dcol f7'], ['valign','bottom'], ['style', tdNoBorder]]);
					bRow.appendChild(td3);
					var cpB = [buildingCost[gid][bLevel][4], buildingCost[gid][bLevel + 1][4]];
					var ccB = [buildingCost[gid][bLevel][5], buildingCost[gid][bLevel + 1][5]];

					if (restante != null) {
						if (TB3O.boolShowCPinUpgTables == '1') restante.appendChild(getCpRow(cpB));
						if (TB3O.boolShowCCinUpgTables == '1') restante.appendChild(getCcRow(ccB));
						td3.setAttribute('valign', 'bottom');
						td3.appendChild(restante);
                    } else {
						td3.setAttribute('valign', 'center');
						var xTable = newTable("");
						var xRow = newRow("");
						var xCell = newCell('<a href="' + bLink[i] + '">' + T('EXTAVAILABLE') + '</a>', [['style', tdNoBorder + 'font-size:8pt; font-weight:bold;']]);
						xRow.appendChild(xCell);
						xTable.appendChild(xRow);
						if (TB3O.boolShowCPinUpgTables == '1') xTable.appendChild(getCpRow(cpB));
						if (TB3O.boolShowCCinUpgTables == '1') xTable.appendChild(getCcRow(ccB));
						td3.appendChild(xTable);
                    }
				}
			}
		}
		while (j % intNoCellsPerRow != 0) {
			aRow.appendChild(elem("TD", ""));
			j++;
	    }
		
		//reposition the building upgrade table vertically
		if (boolShowBUpgTable == '1') {
			if (boolShowTable == true)  {
				var middleblock = get(dmid);
				var TableY = longitudPantalla(table) + 'px';
				table.style.top = TableY;
				table.style.position = "absolute";
				middleblock.appendChild(table);
			}
		}
	}


	/**
	* Ordena en orden ascendete y descendente
	* Params:
	* 	sTableID: 	ID de la aTable a ordenar
	* 	iCol: 		Indice de la columna a ordenar
	* 	sDataType:	Tipo de datos de la columna, valor por defecto:texto
	*/
	function sortTable(sTableID, iCol, sDataType) {
		//log(3, "function sortTable");
		return function(){
			var oTable = get(sTableID);
			var oTBody = oTable.tBodies[0];
			var colDataRows = oTBody.rows;
			var aTRs = new Array;

			for (var i = 0; i < colDataRows.length; i++) aTRs[i] = colDataRows[i];
			if (oTable.getAttribute("sortCol") == iCol) aTRs.reverse();
			else aTRs.sort(generateCompareTRs(iCol, sDataType));

			var oFragment = document.createDocumentFragment();
			for (var i = 0; i < aTRs.length; i++) oFragment.appendChild(aTRs[i]);

			oTBody.appendChild(oFragment);
			oTable.setAttribute("sortCol", iCol);
		}
	}
	
	/**
	 * Convierte un elemento a un determinado tipo segun un argumento
	 * Params:
	 *	elemento: elemento a convertir
	 *	sDataType: nuevo tipo de datos (int o float)
	 * Returns: El elemento convertido al nuevo tipo de datos
	 */
	function convert(aElement, sDataType) {
		switch(sDataType) {
			case "int": return ((aElement.nodeValue == null) || !aElement.nodeValue.match(/\d+/)) ? 0 : parseInt(aElement.nodeValue);
			case "float": return ((aElement.nodeValue == null) || !aElement.nodeValue.match(/\d+/)) ? 0 : parseFloat(aElement.nodeValue);
			default: return (aElement == null) ? '' : aElement.textContent.toLowerCase();
		}
	}

	/**
	 * Realiza una compare entre las casillas de la misma columna en distintas filas
	 * Params:
	 *	iCol: numero de columna dentro de la fila a comparar
	 *	sDataType: tipo de datos de la comparacion
	 * Returns:
	 * 	Devuelve -1, 1 o 0 segun el resultado de la comparacion
	 */
	function generateCompareTRs(iCol, sDataType) {
		return function compareTRs(oTR1, oTR2) {
			var vValue1 = convert(oTR1.cells[iCol].firstChild, sDataType);
			var vValue2 = convert(oTR2.cells[iCol].firstChild, sDataType);

			if (vValue1 < vValue2) return -1;
			else if (vValue1 > vValue2) return 1;
			else return 0;
		}
	}

	/**
	 * Create a noteblock (data from GM cookies)
	 */
	function noteBlock(a,notas){
		// create an HTML structure for the note block
		var aTable = newTable([['style', 'width:0%;']]);
		var tr = elem("TR", "");
		//var td = newCell("", [["align", docDir[0]]]);
		var td = newCell("", [["align", 'center']]);
		var p1 = document.createElement("P");
		var p2 = document.createElement("P");
		var imh = newImage([['src', image["blockheader"]]]);

		var textarea = elem("TEXTAREA", notas);
		textarea.setAttribute("id", "notas");
		textarea.setAttribute("style", 'background-image: url(' + image["underline"] + '); border: 1px #000000 solid; border-top: 0px; margin: -3px 0px 0px -1px; padding: 0px 1px 0px 2px; overflow:auto');
		textarea.setAttribute("nowrap", false);
		//height of the note block
		var nl = 10;
		var nbheightX = getGMcookie('nbheight', false);
		if (nbheightX != false) {
			var nbheight = parseInt(nbheightX);
		} else {
			var nbheight = 0;
		}
		if (nbheight > 0) {
			if (notas != null && notas != '') {nl = 3 + notas.split("\n").length; }
		}
		if (nl > 30) nl=30;
		textarea.setAttribute("rows", nl);

		var input = document.createElement("INPUT");
		input.setAttribute("type", "image");
		input.setAttribute("border", "0");
		input.setAttribute("src", image["buttonSave"]);
		input.setAttribute("alt", T('SAVE') );
		// En el evento del boton de guardado actualiza el valor de la cookie (1 adz?o de duracion por defecto)
		input.addEventListener("click", function(){setGMcookie("notas",textarea.value, false); alert(T('SAVED')); }, 0);

		//width of the note block
		var nboptionX = getGMcookie('nbsize', false);
		if (nboptionX != false) {
			var nboption = parseInt('nboptionX');
		} else {
			var nboption = 0;
		}

		if ((nboption == 0 && screen.width >= 1200) || nboption == 2) {
			imh.setAttribute("width", "509");
			aTable.setAttribute("width", "545px");
			textarea.setAttribute("cols", "60");
		} else if ((nboption == 0 && screen.width < 1200) || nboption == 1) {
			imh.setAttribute("width", "267");
			aTable.setAttribute("width", "280px");
			textarea.setAttribute("cols", "30");
		} else {
			imh.setAttribute("width","267");
			aTable.setAttribute("width", "280px");
			textarea.setAttribute("cols", "30");
		}

        td.appendChild(imh);
        td.appendChild(textarea);
		p2.appendChild(input);
		td.appendChild(p2);
		tr.appendChild(td);
		aTable.appendChild(tr);
		a.appendChild(document.createElement("P"));
		a.appendChild(aTable);
	}

	function getMerchantMultiplier() {
		var intMultiplierM = 1;
		if (crtLocation.indexOf('speed') != -1) intMultiplierM = 3;
		return intMultiplierM;
	}

	function getTTime(iTroopType, crtUserRace, arX) {
		var tt = 1;
		switch (crtUserRace) {
			case "Romans": tt = 1; break;
			case "Teutons": tt = 11; break;
			case "Gauls": tt = 21; break;
		}
		var aTime = Math.round(arX[0] * 3600 / uc[tt + iTroopType][8] / arX[4] + arX[1] * 3600 / uc[tt + iTroopType][8] / arX[4] / (1 + arX[2]/10));
		return aTime;
	}

	function getMTime(qDist, crtUserRace) {
		var intMultiplierM = getMerchantMultiplier();
		var aTime = Math.round(qDist * 3600 / mts[crtUserRace] / intMultiplierM);
		return aTime;
	}

	function getTroopsDetails(qDist, crtUserRace, boolIgnoreTS) {
		var arX = [qDist, 0, 0, 1, 1];
		if (boolIgnoreTS) {
			//not really necessary
			arX[0] = qDist;
			arX[1] = 0;
		} else {
			//get the tournament square level if available
			var strtsLevel = getGMcookie('tournamentsquare', true);
			if (strtsLevel != "false") {
				//the tournament square is available and we need to split the distance in 2 parts for distances > 30
				arX[2] = parseInt(strtsLevel);
				if (qDist > 30) {
					arX[0] = 30;
					arX[1] = qDist - 30;
				}
			}
		}
		//troop image ZERO index if not Romans race
		if (crtUserRace == "Teutons") {
			arX[3] = 11;
		} else if (crtUserRace == "Gauls") {
			arX[3] = 21;
		}
		//troop speed multiplier for speed servers
		if (crtLocation.indexOf('speed') != -1) arX[4] = 2;
		return arX;
	}

	function createTimeTroopTable(nodeToAppendTo, x2, y2, boolAllRaces) {
		var dRow = elem("TR", "");
		insertAfter(nodeToAppendTo, dRow);
		var newdid = xy2id(x2, y2);
		var tmHTML = getTroopMerchantTooltipHTML(newdid, "blue", true, true, true, boolAllRaces);
		var aDiv = elem("DIV");
		aDiv.innerHTML = '<table>' + tmHTML + '</table>';
		aDiv.style.fontSize = '8pt';
		dRow.parentNode.appendChild(aDiv);
		dRow.parentNode.id = "trooptimetable";
	}

	function createTimeMerchantTable(nodeToAppendTo, x2, y2) {
		var dRow = elem("TR", "");
		insertAfter(nodeToAppendTo, dRow);
		var newdid = xy2id(x2, y2);
		var tmHTML = getTroopMerchantTooltipHTML(newdid, "blue", true, true, false);
		var aDiv = elem("DIV");
		var mWidth = '';
		if (boolIsT35) mWidth = ' style=width:50%;';
		aDiv.innerHTML = '<table' + mWidth + '>' + tmHTML + '</table>';
		aDiv.style.fontSize = '8pt';
		dRow.parentNode.appendChild(aDiv);
		dRow.parentNode.id = "Merchanttimetable";
	}

	function isMarketSendResourcesPage() {
		var boolMLink1 = false;
		var boolMLink2 = false;
		var boolMLink3 = false;
		var boolMarketResources = false;
		var listLinks = "";
		if (find("//form[@action='build.php' and @name='snd']")) {
			var mLinks = document.getElementsByTagName("a");
			for (xi = 0; xi < mLinks.length; xi++) {
				if (mLinks[xi].href.indexOf("&t=1") != -1) boolMLink1 = true;
				if (mLinks[xi].href.indexOf("&t=2") != -1) boolMLink2 = true;
				if (mLinks[xi].href.indexOf("&t=3") != -1) boolMLink3 = true;
				listLinks += mLinks[xi].href + '\n';
			}
			if (boolMLink1 && boolMLink2 && boolMLink2) {
				if (find("//input[@type='Text']", XPList).snapshotLength > 6) boolMarketResources = true;
				if (boolMarketResources == false) {
					if (find("//input[@type='text']", XPList).snapshotLength > 6) boolMarketResources = true;
				}
			}
		}
		return boolMarketResources;
	}
	
	/**
	 * Insert new quantities selectable via links on the market -> send resources page
	 */
	function marketResources() {
		var boolMarketResources = false;
		boolMarketResources = isMarketSendResourcesPage();
		if (boolMarketResources) {
			//we are inside the market, option "Send resources"
			// Array of new quantities
			var quantities = [100, 250, 500, 1000];
			var boolNewMaxCapacity = false;
			var strMaxCapacity = find("//form//p/b", XPFirst);
			log(3, "strMaxCapacity = " + strMaxCapacity.innerHTML);
			var maxCapacity = 0;
			if (strMaxCapacity != undefined && strMaxCapacity != null) {
				maxCapacity = toNumber(strMaxCapacity.innerHTML);
			}
			
			for (var i = 0; i < quantities.length; i++) {
				if (maxCapacity == quantities[i]){
					boolNewMaxCapacity = true;
					break;
				}
			}
			addCumulativeArrivals(maxCapacity);
			if (!boolNewMaxCapacity) quantities = [100, 500, 1000, maxCapacity];
			var merchantsCell = find("//table[@class='f10']//tr//td[@colspan='2']", XPFirst);
			var merchantsCellIHTML = merchantsCell.innerHTML;
			var mName = merchantsCellIHTML.split(' ')[0];
			setGMcookie("merchantsName", mName, false);
			updateGMcookieValue("merchantsCapacityV3", [villageInfo[1], maxCapacity], false);
			var maxNoOfMerchants = parseInt(merchantsCellIHTML.split(' ')[1].split('/')[0]);
			var mhMH = merchantsCellIHTML.split(' ')[0];
			var newMCIHTML = merchantsCellIHTML.replace('<br>', '');
			merchantsCell.innerHTML = newMCIHTML;
			//log(3, mhMH);
			var max_transport = maxNoOfMerchants * maxCapacity;
			var resTable = find("//table[@class='f10']", XPFirst);
			var rxInput = new Array();
			for (var i = 0; i < 4; i++){
				//Remove original options
				var aRow = resTable.rows[i];
				aRow.removeChild(aRow.cells[3]);
				//new with additional cells
				//For each new quantity and resource create a new link with the associated request
				for(var j = 0; j < quantities.length; j++){
					var xLink = newLink('<span style="white-space:nowrap;">&nbsp;' + quantities[j] + '</span>', [['href', jsVoid], ['style', 'font-size:8pt;']]);
					xLink.addEventListener('click', createEventMarketResources(i, quantities[j], max_transport, maxNoOfMerchants, maxCapacity), false);
					//new with additional cells
					var aCell = newCell("", [['align', 'center']]);
					aCell.appendChild(xLink);
					aRow.appendChild(aCell);
				}
				//add the ALL option to the list of links
				var xLink = newLink('<span style="white-space:nowrap;">&nbsp;' + T('ALL') + '</span>', [['href', jsVoid], ['style', 'font-size:8pt;']]);
				xLink.addEventListener('click', createEventMarketResources(i, currentResUnits[i], max_transport, maxNoOfMerchants, maxCapacity), false);
				var aCell = newCell("", [['align', 'center']]);
				aCell.appendChild(xLink);
				aRow.appendChild(aCell);

				rxInput[i + 1] = find("//input[@name='r" + (i + 1) + "']", XPFirst);
				rxInput[i + 1].addEventListener('keyup', function() {mhRowUpdate(maxNoOfMerchants, maxCapacity);}, false);
				rxInput[i + 1].addEventListener('change', function() {mhRowUpdate(maxNoOfMerchants, maxCapacity);}, false);
			}
			
			//add all resource type images and the the clear all button
			//log(3, "resTable.rows.length = " + resTable.rows.length);
			var clAllRow = elem("TR","");
			
			var aCell = newCell(gIcons["r1"] + gIcons["r2"] + gIcons["r3"] + gIcons["r4"], [['colspan', '2']]);
			clAllRow.appendChild(aCell);
			var aCell = newCell("", [['align', 'center']]);
			var clAllImg = newImage([['src', image["delButton"]], ['title', T('MTCLEARALL')]]);
			var clAllLink = newLink("", [['href', jsVoid]]);
			clAllLink.appendChild(clAllImg);
			clAllLink.addEventListener("click", clearTransport(maxNoOfMerchants, maxCapacity), false);
			aCell.appendChild(clAllLink);
			clAllRow.appendChild(aCell);
			
			//add the 100,500,1000,1500 links for all merchants
			for (var i = 0; i < 4; i++) {
				var uCellA1 = newCell("", [['align', 'center']]);
				var useThemLinkA1 = newLink('<span style="white-space:nowrap;">&nbsp;' + quantities[i] + '</span>', [['href', jsVoid], ['style', 'font-size:8pt;']]);
				useThemLinkA1.addEventListener('click', createEventMarketResourcesAll(quantities[i], max_transport, maxNoOfMerchants, maxCapacity), false);
				uCellA1.appendChild(useThemLinkA1);
				clAllRow.appendChild(uCellA1);
			}
			
			//add the reall ALL resources link (don't know if it really makes sense)
			var uCellA1 = newCell("", [['align', 'center']]);
			var useThemLinkA1 = newLink('<span style="white-space:nowrap;">&nbsp;' + T('ALL') + '</span>', [['href', jsVoid], ['style', 'font-size:8pt;']]);
			useThemLinkA1.addEventListener('click', createEventMarketAllRes(maxNoOfMerchants, maxCapacity), false);
			uCellA1.appendChild(useThemLinkA1);
			clAllRow.appendChild(uCellA1);
			
			resTable.appendChild(clAllRow);
			
			var merchantsRow = merchantsCell.parentNode;
			merchantsCell.setAttribute("colspan", "3");
			var mIHTML = merchantsCell.innerHTML;
			var bigTable = merchantsRow.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			//log(3, "bigTable = " + bigTable);
			if (bigTable) {
				if (!bigTable.rows) return;
				var bigRow = bigTable.rows[0];
				var bigRowCell0 = bigRow.cells[0];
				bigRowCell0.setAttribute("width", "70%");
				var bigRowCell1 = bigRow.cells[1];
				bigRowCell1.setAttribute("width", "30%");
				var firstBigRow = elem("TR", "");
				var firstBigCell = newCell("", [["width", "70%"]]);
				firstBigRow.appendChild(firstBigCell);
				var secondBigCell = newCell("<b>" + mIHTML + "</b>", [["style", "color:darkblue"], ["width", "30%"]]);
				firstBigRow.appendChild(secondBigCell);
				bigTable.removeChild(bigRow.parentNode);
				bigTable.appendChild(firstBigRow);
				bigTable.appendChild(bigRow);
			}

			merchantsRow.removeChild(merchantsCell);

			var merchantsTable = merchantsRow.parentNode;
			var merchantsRow1Cell0 = merchantsTable.rows[1].cells[0];
			merchantsRow1Cell0.setAttribute("colspan", "4");
			var merchantsRow2Cell0 = merchantsTable.rows[2].cells[0];
			merchantsRow2Cell0.setAttribute("colspan", "4");
			var merchantsRow2Cell0 = merchantsTable.rows[3].cells[0];
			merchantsRow2Cell0.setAttribute("colspan", "4");

			var uRow1 = elem("TR", "");

			var uCell1 = elem("TD", gIcons["r1"]);
			uRow1.appendChild(uCell1);
			var uCell2 = elem("TD", "");
			var i1Check = elem("INPUT");
			i1Check.setAttribute("type", "checkbox");
			i1Check.setAttribute("checked", "true");
			i1Check.setAttribute("id", "res1x");
			var aTitle = T('USE') + " " + T('RECURSO1');
			i1Check.setAttribute("title", aTitle);
			i1Check.setAttribute("alt", aTitle);
			uCell2.appendChild(i1Check);
			uRow1.appendChild(uCell2);
			
			var uCell3 = elem("TD", "");
			var useThemLink = document.createElement('A');
			useThemLink.href = jsVoid;
			useThemLink.innerHTML = "<img src='" + image["usethempr"] + "' title='" + T('USETHEMPR') + "' alt='" + T('USETHEMPR') + "'>";
			useThemLink.addEventListener('click', function () {createEventUseThemAllPr(maxNoOfMerchants, maxCapacity);}, false);
			uCell3.appendChild(useThemLink);
			uRow1.appendChild(uCell3);
			
			insertAfter(merchantsRow, uRow1);

			var uRow2 = elem("TR", "");
			var uCell4 = elem("TD", gIcons["r2"]);
			uRow2.appendChild(uCell4);
			var uCell5 = elem("TD", "");
			var i2Check = elem("INPUT");
			i2Check.setAttribute("type", "checkbox");
			i2Check.setAttribute("checked", "true");
			i2Check.setAttribute("id", "res2x");
			aTitle = T('USE') + " " + T('RECURSO2');
			i2Check.setAttribute("title", aTitle);
			i2Check.setAttribute("alt", aTitle);
			uCell5.appendChild(i2Check);
			uRow2.appendChild(uCell5);
			
			var uCell6 = elem("TD", "");
			var useThemLinkEq = document.createElement('A');
			useThemLinkEq.href = jsVoid;
			useThemLinkEq.innerHTML = "<img src='" + image["usethemeq"] + "' title='" + T('USETHEMEQ') + "' alt='" + T('USETHEMEQ') + "'>";
			useThemLinkEq.addEventListener('click', function () {createEventUseThemAllEq(maxNoOfMerchants, maxCapacity);}, false);
			uCell6.appendChild(useThemLinkEq);
			uRow2.appendChild(uCell6);
			
			insertAfter(uRow1, uRow2);

			var uRow3 = elem("TR", "");
			var uCell7 = elem("TD", gIcons["r3"]);
			uRow3.appendChild(uCell7);
			var uCell8 = elem("TD", "");
			var i3Check = elem("INPUT");
			i3Check.setAttribute("type", "checkbox");
			i3Check.setAttribute("checked", "true");
			i3Check.setAttribute("id", "res3x");
			aTitle = T('USE') + " " + T('RECURSO3');
			i3Check.setAttribute("title", aTitle);
			i3Check.setAttribute("alt", aTitle);
			uCell8.appendChild(i3Check);
			uRow3.appendChild(uCell8);

			var uCell9 = elem("TD", "");
			var useThemLink1H = document.createElement('A');
			useThemLink1H.href = jsVoid;
			useThemLink1H.innerHTML = "<img src='" + image["usethem1h"] + "' title='" + T('USETHEM1H') + "' alt='" + T('USETHEM1H') + "'>";
			useThemLink1H.addEventListener('click', function () {createEventUseThemAll1H(maxNoOfMerchants, maxCapacity);}, false);
			uCell9.appendChild(useThemLink1H);
			uRow3.appendChild(uCell9);
			
			insertAfter(uRow2, uRow3);

			var uRow4 = elem("TR", "");
			var uCell10 = elem("TD", gIcons["r4"]);
			uRow4.appendChild(uCell10);
			var uCell11 = elem("TD", "");
			var i4Check = elem("INPUT");
			i4Check.setAttribute("type", "checkbox");
			i4Check.setAttribute("checked", "true");
			i4Check.setAttribute("id", "res4x");
			aTitle = T('USE') + " " + T('RECURSO4');
			i4Check.setAttribute("title", aTitle);
			i4Check.setAttribute("alt", aTitle);
			uCell11.appendChild(i4Check);
			uRow4.appendChild(uCell11);
			uRow4.appendChild(elem("TD", ""));
			
			//merchantsRow.appendChild(uRow4);
			insertAfter(uRow3, uRow4);

			var xyValues = new Array();
			xyValues[0] = find("//form[@name='snd']//input[@name='x']", XPFirst);
			xyValues[0].addEventListener('keyup', function() {captureMerchantDestination();}, 0);
			xyValues[1] = find("//form[@name='snd']//input[@name='y']", XPFirst);
			xyValues[1].addEventListener('keyup', function() {captureMerchantDestination();}, 0);

			if (crtLocation.indexOf("z=") != -1) {
				captureMerchantDestination();
			}
		}

		function clearTransport(maxNoOfMerchants, maxCapacity) {
			return function() {
				for (var i = 1; i < 5; i++) {
					rxInput[i].value = '';
					mhRowUpdate(maxNoOfMerchants, maxCapacity);
				}
			}
		}
		
		function createEventUseThemAllPr(maxNoOfMerchants, maxCapacity) {
			//log(3, "Enter createEventUseThemAllPr");
			var maxTotalTransport = maxNoOfMerchants * maxCapacity;
			var totalRes = 0;
			for (var i = 0; i < 4; i++) {
				var useRes = get("res" + (i + 1) + "x");
				if (useRes) {
					if (useRes.checked == true) {
						totalRes += currentResUnits[i];
					}
				}
			}
			var dmx = maxTotalTransport / totalRes;
			for (var i = 1; i < 5; i++) {
				var useRes = get("res" + i + "x");
				if (useRes) {
					if (useRes.checked == true) {
						var aRes = Math.floor(currentResUnits[i - 1] * dmx);
						if (aRes > currentResUnits[i - 1]) {
							aRes = currentResUnits[i - 1];
						}
						rxInput[i].value = aRes;
					} else {
						rxInput[i].value = 0;
					}
				} else {
					rxInput[i].value = 0;
				}
			}
			mhRowUpdate(maxNoOfMerchants, maxCapacity);
			return;
		}

		function createEventUseThemAllEq(maxNoOfMerchants, maxCapacity) {
			//log(3, "Enter createEventUseThemAllEq");
			var maxTotalTransport = maxNoOfMerchants * maxCapacity;
			var totalRes = 0;
			var intSelected = 0;
			for (var i = 0; i < 4; i++) {
				var useRes = get("res" + (i + 1) + "x");
				if (useRes) {
					if (useRes.checked == true) {
						totalRes += currentResUnits[i];
						intSelected += 1;
					}
				}
			}
			var minA = maxTotalTransport / intSelected;
			var minB = totalRes / intSelected;
			if (minA > minB) {
				minX = parseInt(minB);
			} else {
				minX = parseInt(minA);
			}
			for (var i = 1; i < 5; i++) {
				var useRes = get("res" + i + "x");
				if (useRes) {
					if (useRes.checked == true) {
						var aRes = minX;
						if (aRes > currentResUnits[i - 1]) {
							aRes = currentResUnits[i - 1];
						}
						rxInput[i].value = aRes;
					} else {
						rxInput[i].value = 0;
					}
				} else {
					rxInput[i].value = 0;
				}
			}
			mhRowUpdate(maxNoOfMerchants, maxCapacity);
			return;
		}
		
		function createEventUseThemAll1H(maxNoOfMerchants, maxCapacity) {
			var maxTotalTransport = maxNoOfMerchants * maxCapacity;
			var totalRes = 0;
			var intSelected = 0;
			for (var i = 0; i < 3; i++) {
				var useRes = get("res" + (i + 1) + "x");
				var intPPH = parseInt(productionPerHour[i]);
				totalRes += intPPH;
				if (useRes.checked == true) {
					intSelected += 1;
				}
			}
			var useRes = get("res4x");
			if (useRes.checked == true) {
				intSelected += 1;
			}
			//crop production without troop upkeep
			var tableCrop = find("//table[@class='f9']", XPFirst);
			if (tableCrop) {
				var cropProd1H = tableCrop.rows[1].cells[1].textContent.split("/")[1];
			} else {
				var cropProdReal = document.getElementById("l1");
				if (cropProdReal) {
					var cropProd1H = cropProdReal.parentNode.cells[8].textContent.split("/")[1];
				}
			}
			totalRes += parseInt(cropProd1H);
			
			var prod1H = [parseInt(productionPerHour[0]), parseInt(productionPerHour[1]),  parseInt(productionPerHour[2]), parseInt(cropProd1H)];
			
			for (var i = 0; i < 4; i++) {
				var useRes = get("res" + (i + 1) + "x");
				if (useRes) {
					if (useRes.checked == true) {
						if (intSelected == 4) {
							var aRes = parseInt(prod1H[i]);
						} else {
							var aRes = Math.floor(totalRes / intSelected);
						}
						if (aRes > currentResUnits[i]) {
							aRes = currentResUnits[i];
						}
						rxInput[i + 1].value = aRes;
					} else {
						rxInput[i + 1].value = 0;
					}
				} else {
					rxInput[i + 1].value = 0;
				}
			}
			mhRowUpdate(maxNoOfMerchants, maxCapacity);
			return;
		}

		function createEventMarketAllRes(maxNoOfMerchants, maxCapacity) {
			return function(){
				for (var i = 0; i < 4; i++) {
					rxInput[i + 1].value = currentResUnits[i];
				}
				mhRowUpdate(maxNoOfMerchants, maxCapacity);
			}
		}
		
		function mhRowUpdate(maxNoOfMerchants, maxCapacity) {
			var totalTransport = 0;
			for (var xi = 1; xi < 5; xi++) {
				var aR = parseInt(rxInput[xi].value);
				if (!isNaN(aR)) totalTransport += aR;
			}
			//log(3, "totalTransport = " + totalTransport);
			var totMerchants = Math.ceil(totalTransport / maxCapacity);
			
			//added code provided by MarioCheng & DMaster for wasted/exceeding resources
			var crtWaste = maxCapacity - (totalTransport - (totMerchants-1) * maxCapacity);
            var crtExceed = totalTransport - (maxNoOfMerchants * maxCapacity);
			//finished code addition
			var mhText = '<img src="' + image["merchant"] + '">' + "<b>" + " (" + mhMH + "): " + totMerchants + "/" + maxNoOfMerchants + "<br>" + T('MAX') + ": " + maxNoOfMerchants * maxCapacity + "<br>";
			
			if (totMerchants > maxNoOfMerchants) {
				var mhColor = "red";
				mhText += T('MTEXCEED') + ": "+ crtExceed;
			} else {
				var mhColor = "darkgreen";
				mhText += T('MTWASTED') + ": "+ crtWaste;
			}
			mhText += "<br>" + T('MTCURRENT') + ": " + totalTransport + "</b>";
			var mhCell = get("mhMerchants");
			if (mhCell == null || mhCell == undefined) {
				var mhRow = elem("TR", "");
				var mhCell = newCell(mhText, [["id", "mhMerchants"], ["style", 'color:' + mhColor], ["colspan", '8']]);
				mhRow.appendChild(mhCell);
				resTable.appendChild(mhRow);
			} else {
				mhCell.innerHTML = mhText;
				mhCell.setAttribute("style", 'color:' + mhColor);
			}
			//work in progress !!!
			return;
		}

		function createEventMarketResources(resource, quantity, max_transport, maxNoOfMerchants, maxCapacity){
			return function(){
				var a = document.getElementsByTagName('input')[resource + 1];
				var aValue = a.value;
				if (aValue == '') var suma = 0; else var suma = parseInt(aValue);
				suma += quantity;
				if (suma > currentResUnits[resource]) suma = currentResUnits[resource];
				if (suma > max_transport) suma = max_transport;
				a.value = suma;
				mhRowUpdate(maxNoOfMerchants, maxCapacity);
			}
		}

		function createEventMarketResourcesAll(quantity, max_transport, maxNoOfMerchants, maxCapacity){
			return function(){
				for (var i = 0; i < 4; i++) {
					var useRes = get("res" + (i + 1) + "x");
					if (useRes) {
						if (useRes.checked == true) {
							var a = document.getElementsByTagName('input')[i + 1];
							var aValue = a.value;
							if (aValue == '') var suma = 0; else var suma = parseInt(aValue);
							suma += quantity;
							if (suma > currentResUnits[i]) suma = currentResUnits[i];
							if (suma > max_transport) suma = max_transport;
							a.value = suma;
							mhRowUpdate(maxNoOfMerchants, maxCapacity);
						}
					}
				}
			}
		}
		
		function captureMerchantDestination() {
			var xDestination = xyValues[0].value;
			var yDestination = xyValues[1].value;
			if (xDestination != "" && yDestination != "") {
				var oldTable = get("Merchanttimetable");
				if (oldTable) {
					var oldChild = oldTable.parentNode.removeChild(oldTable);
				}
				var mtTable = elem("TABLE", "");
				var parOK = find("//form[@name='snd']/p[2]", XPFirst);
				parOK.appendChild(mtTable);
				var aRow = elem("TR", "");
				var bRow = elem("TR", "");
				aRow.appendChild(bRow);
				mtTable.appendChild(aRow);
				createTimeMerchantTable(aRow, xDestination, yDestination);
			} else {
				var oldTable = get("Merchanttimetable");
				if (oldTable) {
					oldTable.style.visibility = "hidden";
				}
			}
			return;
		}
		
		//function provided by david.maciej (Thank you !) 
		function MerchantArrivingTitles(maxCapacity) {
			var mercGroupTitles = xpathResultEvaluate("//div[@id='" + dmid2 + "']/form/p[@class='b']");
			if (mercGroupTitles.snapshotLength == 0) { return; }
			if (mercGroupTitles.snapshotLength == 2) {
				// 2 groups: 1st is arriving mercs, 2nd is own mercs
				return(mercGroupTitles.snapshotItem(0).innerHTML);
			}
			var mercsFromOtherUsers = xpathResultEvaluate("//div[@id='" + dmid2 + "']/form/table[@class='tbg']/tbody/tr[1]/td[1]/a[1][not(contains(@href, 'spieler.php?uid=" + crtUserID + "'))]");
			if (mercsFromOtherUsers.snapshotLength > 0) {
				// only 1 group: the arriving mercs group
				return(mercGroupTitles.snapshotItem(0).innerHTML);
			}
			var availableAndTotalMercsString = xpathResultEvaluate("//div[@id='" + dmid2 + "']/form/table/tbody/tr/td/table[@class='f10']/tbody/tr/td/span[@class='f135 b']/../../../tr[1]/td");
			if (availableAndTotalMercsString.snapshotLength) {
				availableAndTotalMercsString = availableAndTotalMercsString.snapshotItem(0).firstChild.textContent;
				var availableAndTotalMercsArray = availableAndTotalMercsString.split(" ")[1].split("/");
				var mercsOnWay = availableAndTotalMercsArray[1] - availableAndTotalMercsArray[0];
				//var mercsLoad = retrievePageMarketPlaceSendResources_MercLoad();
				//log(3, "mercsLoad = " + mercsLoad + "; maxCapacity = " + maxCapacity);
				var resSpanOnMercTables = xpathResultEvaluate("//div[@id='" + dmid2 + "']/form/table[@class='tbg']/tbody/tr[3]/td[2]/span[@class='f10']");
				var totalMercsOnTables = 0;
	      	
				for(var i = 0; i < resSpanOnMercTables.snapshotLength; i++) {
					var resSpan = resSpanOnMercTables.snapshotItem(i);
					var mercWood = parseInt(resSpan.childNodes[1].nodeValue.replace("|", ""));
					var mercClay = parseInt(resSpan.childNodes[3].nodeValue.replace("|", ""));
					var mercIron = parseInt(resSpan.childNodes[5].nodeValue.replace("|", ""));
					var mercCrop = parseInt(resSpan.childNodes[7].nodeValue.replace("|", ""));

					var totalResOnThisTable = mercWood + mercClay + mercIron + mercCrop;

					//var mercsOnThisTable = totalResOnThisTable / mercsLoad;
					var mercsOnThisTable = totalResOnThisTable / maxCapacity;
					totalMercsOnTables += Math.ceil(mercsOnThisTable);
				}
				if (totalMercsOnTables > mercsOnWay) {
					return(mercGroupTitles.snapshotItem(0).innerHTML);
				}
			}
		}

		//initial function provided by david.maciej (Thank you !) 
		//modified by ms99: changed to table, added timers
		//fixed by mare.  Thank you !!!
		function addCumulativeArrivals(maxCapacity) {
            // selects the receiving merchants
            var sendReceive = xpathResultEvaluate("//div[@id='" + dmid2 + "']/form/table[@class='tbg']|//div[@id='" + dmid2 + "']/form/p[@class='b']");
            if (sendReceive.snapshotLength == 0) { return; }
            if (MerchantArrivingTitles(maxCapacity) != sendReceive.snapshotItem(0).textContent) { return; }
            var totalResArriving = 0;
            var tRow = null;
            var allValues = new Array(0, 0, 0, 0);
            for(var i = 0; i < sendReceive.snapshotLength; i++) {
                if (i > 0 && sendReceive.snapshotItem(i).nodeName == "P") { break; }
                if (sendReceive.snapshotItem(i).nodeName == "P") {
                    //create table to sum the resources
                    var txtPar = sendReceive.snapshotItem(0).textContent;
                    txtPar = txtPar.split(":");
                    armTable = newTable([['class', 'tbg'], ['cellspacing', '1'], ['cellpadding', '1']]);
                    var hRow = newRow("", [['class', 'cbgx']]);
                    var hCell = newCell(T('RESUMEN') + " - " + txtPar[0], [['colspan', '6']]);
                    hRow.appendChild(hCell);
                    armTable.appendChild(hRow);
                    var rRow = elem("TR", "");
                    var qRow = elem("TR", "");
                    tRow = elem("TR", "");
                   
                    var cCell = elem("TD", gIcons["clock"]);
                    rRow.appendChild(cCell);
                    var tCell = newCell("", [["id", "timeoutT"], ['style', 'font-size:9pt;']]);
                    qRow.appendChild(tCell);
                    var eCell = elem("TD","");
                    tRow.appendChild(eCell);
                   
                    for (var xi = 1; xi < 6; xi++) {
                        if (xi < 5) {
                            var iCell = elem("TD", gIcons["r" + xi]);
                            var tCell = newCell("00:00:00", [['id', 'timeouta'], ['style', 'font-weight:normal; font-size:9pt;']]);
                        } else {
                            var iCell = elem("TD", T('TOTAL'));
                            var tCell = elem("TD", "");
                            //tCell.setAttribute('style', 'font-weight:normal; font-size:9pt;');
                        }
                        rRow.appendChild(iCell);
                        var qCell = elem("TD", "0");
                        qCell.setAttribute('id', "arrmQ" + xi);
                        if (xi < 5) {
                            qCell.setAttribute('style', 'font-weight:normal; font-size:9pt;');
                        }
                        qRow.appendChild(qCell);
                        tRow.appendChild(tCell);
                    }
                   
                    armTable.appendChild(rRow);
                    armTable.appendChild(qRow);
                    armTable.appendChild(tRow);
                    var aPar = elem("P", "");
                    aPar.appendChild(armTable);
                    sendReceive.snapshotItem(i).appendChild(aPar);
                } else {
                      // add resources
                    var aTable = sendReceive.snapshotItem(i);
                    var tdRes = aTable.rows[2].cells[1].textContent;
                    var inRes = tdRes.split(" | ");
                    var tdTime = get('timer' + i);
                    //log(3, "tdTime = " + tdTime.textContent);
                    var tdTimeSeconds = ComputeSeconds(tdTime.textContent);
                    //compute the time the granary & warehouse will be full, productionPerHour (0-3). capacity (0-3), currentResUnits (0-3)
                    for (var zi = 0; zi < 4; zi++) {
                        var aValue = parseInt(inRes[zi]);
                        allValues[zi] += aValue;
                        totalResArriving += aValue;
                        var aCell = get("arrmQ" + (zi + 1));
                        aCell.innerHTML = toNumber(aCell.innerHTML) + aValue;
                    }
                }
            }

			//log(3, "allValues = " + allValues);
            // compute time to fill for total transport
            for (var zi = 0; zi < 4; zi++) {
				var aValue = allValues[zi];
				var tBlink = '';
				var timeToEmpty = false;
				//log(4, "aValue = " + aValue);
				var productionPerSecond = parseInt(productionPerHour[zi]) / 3600;
				var totalAtArrival = currentResUnits[zi];
				if (aValue > 0) totalAtArrival += productionPerSecond * tdTimeSeconds + aValue;
				var aDif = Math.floor(parseInt(capacity[zi]) - totalAtArrival);
				//log(3, "aDif = " + aDif);
				var timeToFill = aDif / productionPerSecond;
				var txtTime = '';
				if (aDif <= 0) timeToFill = tdTimeSeconds;
				if (productionPerSecond < 0) {
					timeToFill = Math.abs(currentResUnits[zi] / productionPerSecond);
					if (aValue > 0 && timeToFill >= tdTimeSeconds) timeToFill = Math.abs(totalAtArrival / productionPerSecond);
					timeToEmpty = true;
				} else if (productionPerSecond == 0) {
					if (totalAtArrival > parseInt(capacity[zi])) timeToFill = tdTimeSeconds; else timeToFill = "Infinity";
				}
				
                if (tRow != null) {
                    var rtCell = tRow.cells[zi + 1];
                     if (timeToFill == "Infinity") {
						//overflow never
                        txtTime = "<span id='timeouta' style='color:#000000;'>" + T('NEVER') + "</span>";
					} else if (productionPerSecond == 0) {
						//overflow at arrival of last merchant
						tBlink = "<textNode style='font-weight:bold;color:#FFFFFF;'>" + " *".blink() + "</textnode>";
						txtTime = "<span><textnode id='timeouta' style='color:#FFFFFF;'>" + formatTime(timeToFill, false) + "</textnode>" + tBlink + "</span>";
						rtCell.setAttribute('style', 'background-color:#FF0000;');
					} else if (timeToEmpty == true) {
						//empty at timeToFill
						if (timeToFill < 7200) tBlink = "<textNode style='font-weight:bold;color:#FF0000;'>" + " *".blink() + "</textnode>";
						txtTime = "<span><textnode id='timeouta' style='color:#FF0000;'>" + formatTime(timeToFill, false) + "</textnode>" + tBlink + "</span>";
                    } else if (timeToFill < 7200) {
						//overflow in less than 2 hours
						if (timeToFill == tdTimeSeconds) tBlink = "<textNode style='font-weight:bold;color:#FFFFFF;'>" + " *".blink() + "</textnode>";
                        txtTime = "<span><textnode id='timeouta' style='color:#FFFFFF;'>" + formatTime(timeToFill, false) + "</textnode>" + tBlink + "</span>";
						rtCell.setAttribute('style', 'background-color:#008000;');
                    } else {
						//overflow in more than 2 hours
                        txtTime = "<span id='timeouta' style='color:#008000;'>" + formatTime(timeToFill, false) + "</span>";
                    }
                    rtCell.innerHTML = txtTime;
                }
            }

            var aCell = get("arrmQ5");
            aCell.innerHTML = totalResArriving;
            //add a digit separator (as BmW suggested)
            for (var xi = 1; xi < 6; xi++) {
                var aCell = get("arrmQ" + xi);
                aCell.innerHTML = parseInt(aCell.innerHTML).toLocaleString();
            }
            //add the timer for the last arrival
            var tCell = get("timeoutT");
            tCell.innerHTML = tdTime.textContent;
            tCell.setAttribute('id', 'timeouta');
        }
	}

	/**
	 * Calcula el numero de aldeas que se posee en funcion de los puntos de cultura disponibles.
	 * Funcion estandard no valida para version Speed
	 * Params: puntos: cantidad de puntos de cultura
	 * Returns: el numero de aldeas que se dispone con esos puntos
	 */
	function cp2villages(cp){
		if (document.domain.indexOf("speed") > -1) {
			//formula for speed servers
			return Math.round(Math.pow(3*cp/1600, 1 / 2.3));
		} else {
			if (boolOldServerVersion == "1") {
				//formula for Travian 2 servers
				return Math.round(Math.pow(cp/2000, 1 / 2));
			} else {
				//formula for Travian 3 servers
				return Math.round(Math.pow(cp/1600, 1 / 2.3));
			}
		}
	}

	/**
	 * Compute number of culture point needed to create a specific number of villages
	 * Params: aldeas: number of villages
	 * Returns: number of culture point needed
	 */

	//version from fr3nchlover
    function villages2cp(aldeas){
        if (document.domain.indexOf("speed")>-1) {
            return Math.round(1.6/3 * Math.pow(aldeas, 2.3)*10) * 100;
        } else {
            if (aldeas > 1) {
                if (boolOldServerVersion == "1") {
					//formula for Travian 2.x servers
                    return Math.round(2 * Math.pow(aldeas, 2)*10) * 100;
                } else {
                    //formula for Travian 3 servers
                    return Math.round(1.6 * Math.pow(aldeas, 2.3)) * 1000;
                }
            } else {
                return 2000;
            }
        }
    }
	
	/**
	 * Calcula y muestra los puntos de cultura necesarios para la siguiente village y el tiempo para conseguirlo, o
	 * las aldeas adicionales que se pueden fundar con los puntos actuales
	 */
	function culturePoints(){
		var aX = find("//div[@id='" + dmid2 + "']//b", XPList);
		log(3, "aX.snapshotLength = " + aX.snapshotLength);
		var intAdd = 0;
		if (boolIsT35 == false) {
			if (aX.snapshotLength != 5) return;
			intAdd = 1;
		}else {
			if (aX.snapshotLength != 4) return;
		}

		var bColorGreen = '#C8FFC8';
		var bColorRed = '#FFE1E1';
		
		//get cookie for server version
		//boolOldServerVersion = getGMcookie("serverversion2", false);

		// Cuture point production for all villages
		var prodTotalCP = toNumber(aX.snapshotItem(intAdd + 1).innerHTML);
		// Current number of culture points
		var crtTotalCP = toNumber(aX.snapshotItem(intAdd + 2).innerHTML);
		// Puntos de cultura necesarios para fundar la siguiente village
		var pc_aldea_prox = toNumber(aX.snapshotItem(intAdd + 3).innerHTML);

		// Number of current villages
		var aldeas_actuales = cp2villages(pc_aldea_prox);
		// Numero de aldeas que se pueden tener con los PC actuales
		var aldeas_posibles = cp2villages(crtTotalCP);
		
		//get now
		var dtNow = new Date();
		
		var textMenu = find("//p[@class='txt_menue']", XPFirst);
		if (textMenu) var arrValues = textMenu.textContent.replace('\n', '').split(" |");
		
		//create the new cp to villages table
		var cpTable = newTable([['class', 'tbg'], ['align', 'center'], ['cellspacing', '1'], ['cellpadding', '2']]);
		//create first header row
		var cpHeader1 = newRow("", [['class', 'rbg']]);
		var cpHeader1Cell1 = newCell(T('VILLAGE'), [['rowspan', 2], ['style', 'font-size:8pt']]);
		cpHeader1.appendChild(cpHeader1Cell1);
		var cpHeader1Cell2 = newCell(arrValues[1], [['colspan', 2], ['style', 'font-size:8pt']]);
		cpHeader1.appendChild(cpHeader1Cell2);
		var cpHeader1Cell3 = newCell(gIcons["clock"], [['colspan', 2]]);
		cpHeader1.appendChild(cpHeader1Cell3);
		cpTable.appendChild(cpHeader1);
		//create second header row
		var cpHeader2 = newRow("", [['class', 'rbg'], ['style', 'font-size:8pt']]);
		var cpHeader2Cell2 = newCell(T('TOTAL'), [['style', 'font-size:8pt']]);
		cpHeader2.appendChild(cpHeader2Cell2);
		var cpHeader2Cell3 = newCell(T('YOUNEED'), [['style', 'font-size:8pt']]);
		cpHeader2.appendChild(cpHeader2Cell3);
		var cpHeader2Cell4 = newCell(T('NEWVILLAGEAV'), [['style', 'font-size:8pt']]);
		cpHeader2.appendChild(cpHeader2Cell4);
		var cpHeader2Cell5 = newCell(T('TIMEUNTIL'), [['style', 'font-size:8pt']]);
		cpHeader2.appendChild(cpHeader2Cell5);
		cpTable.appendChild(cpHeader2);
		
		var maxNewVillages = 1;
		var boolReachedMaxNewVillages = false;
		
		for (var i = 0; i < maxNewVillages && i < 50; i++) {
			var cpRow = elem("TR", "");
			var iHTML = [aldeas_actuales + i + 1, '', '', '', ''];
			//get the necessary CP for building/conquering a new village
			var pc_necesarios = villages2cp(aldeas_actuales + i);
			
			if (pc_necesarios <= crtTotalCP) {
				iHTML[1] = pc_necesarios;
				iHTML[2] = "0";
				iHTML[3] = T('NOW');
				iHTML[4] = "0:00:00";
				var strStyle = "font-size:8pt; background-color:" + bColorGreen + ";";
				maxNewVillages += 1;
			} else {
				if (boolReachedMaxNewVillages == false) {
					maxNewVillages += 2;
					boolReachedMaxNewVillages = true;
				}
				//compute how long it will take until the number of CP permits building/conquering a new village
				var tiempo = ((pc_necesarios - crtTotalCP) / prodTotalCP) * 86400;
				var timeFormatted = formatTime(tiempo, true);
				iHTML[4] = timeFormatted;
				
				dtNow.setTime(dtNow.getTime() + (tiempo * 1000));
				var texto_tiempo = computeTextTime(dtNow);
				iHTML[1] = pc_necesarios;
				iHTML[2] = "" + (pc_necesarios - crtTotalCP) ;
				iHTML[3] = texto_tiempo;
				var strStyle = "font-size:8pt; background-color:" + bColorRed + ";";
			}
			for (var xi = 0; xi < 5; xi++) {
				var cpCellx = newCell(iHTML[xi], [['style', strStyle]]);
				cpRow.appendChild(cpCellx);
			}
			cpTable.appendChild(cpRow);
		}
		aX.snapshotItem(intAdd + 3).parentNode.parentNode.appendChild(cpTable);
	}

	function getMarketOfferRatioCell(aRow) {
		var aRatio = parseInt(aRow.cells[1].textContent) / parseInt(aRow.cells[3].textContent);
		var aColor = 'black';
		var bColor = 'white';
		var bColor;
		if (aRatio < 1.00) {
			aColor = 'red';
			bColor = '#FFE1E1';
		} else if (aRatio > 1.00) {
			aColor = 'darkgreen';
			bColor = '#C8FFC8';
		}
		var ratioCell = newCell(aRatio.toFixed(2), [["style", "font-size:9px; background-color:" + bColor + "; color:" + aColor + ";"]]);
		var timeCell = aRow.cells[5];
		if (timeCell) timeCell.setAttribute("style", "font-size:10px");
		var actionCell = aRow.cells[6];
		if (actionCell) actionCell.setAttribute("style", "font-size:10px;");
		return ratioCell;
	}
	
	function getMarketOfferAllianceCell(aRow) {
		// Aliance info is provided by the title property of the player
		var allyName = aRow.childNodes[aRow.childNodes.length == 12 ? 8 : 4].getAttribute('title');
		if (allyName == undefined || allyName == null || allyName == "") {
			var allyName = "-";
		}
		var allyCell = newCell(allyName, [['style', 'font-size:8pt']]);
		return allyCell;
	}

	function addMarketOfferCellEvents(aRow) {
		var cellA = aRow.cells[3];
		var cellB = aRow.cells[6];
		var quantity = cellA.innerHTML;
		cellA.addEventListener('mouseover', showNeededMerchants(quantity), false);
		cellA.addEventListener("mouseout", function() {get("tb_tooltip").style.display = 'none';}, 0);
		if (cellB.getAttribute('class') != 'c' && cellB.getAttribute('class') != 'act c') {
			cellB.addEventListener('mouseover', showNeededMerchants(quantity), false);
			cellB.addEventListener("mouseout", function() {get("tb_tooltip").style.display = 'none';}, 0);
		}
		
		function showNeededMerchants(quantity) {
			return function() {
				var tooltip = get("tb_tooltip");
				if (!tooltip) {
					createTooltip();
					tooltip = get("tb_tooltip");
				}
				var mQ = parseInt(quantity);
				var mC = parseInt(merchantsCapacity);
				//var mC = parseInt(capacity);
				if (mC != 0) {
					var mTotal = Math.ceil(mQ / mC) + " x " + '<img src="' + image["merchant"] + '"> (' + merchantsName + ')';
				} else {
					var mTotal = 0;
				}
				var aWaste = parseInt(mTotal) * mC - mQ;
				var aTable = newTable();
				var aRow = elem("TR", "");
				var aCell = newCell(mTotal, [['style', 'font-size:8pt; font-weight:bold; color:blue;']]);
				aRow.appendChild(aCell);
				aTable.appendChild(aRow);
				if (aWaste > 0) {
					var bRow = elem("TR", "");
					var bCell = newCell(T('MTWASTED') + ": " + aWaste, [["style", "font-size:8pt; color:red;"]]);
					bRow.appendChild(bCell);
					aTable.appendChild(bRow);
				}
				tooltip.innerHTML = "";
				tooltip.appendChild(aTable);
				tooltip.style.display = 'block';
			}
		}
		
	}
	
	/**
	 * Create a new column showing the alliance of the player that offers resources for trade at the market and a ratio column
	 */
	function addAllyColumnForMarketOffers() {
		if (boolIsT35 == false) {
			var aX = find("//tr[@class='rbg']", XPFirst).parentNode;
		} else {
			var aX = get("market_buy");
		}
		
		//prepare insertion of column
		var b = aX.getElementsByTagName("TR");
		b[0].childNodes[b[0].childNodes.length == 3 ? 1 : 0].setAttribute('colspan', '9');
		b[b.length - 1].childNodes[0].setAttribute("colspan", "9");

		// Create and insert the alliance & ration columns
		if (boolIsT35 == false) {
			var aColumn = elem("TD", T('ALLIANCE'));
			var bColumn = elem("TD", "");
			b[1].appendChild(aColumn);
			b[1].appendChild(bColumn);
		} else {
			var aColumn = elem("TH", T('ALLIANCE'));
			var bColumn = elem("TH", "");
			b[1].appendChild(aColumn);
			b[1].appendChild(bColumn);
		}

		for(var i = 2; i < b.length - 1; i++){
			var allyCell = getMarketOfferAllianceCell(b[i]);
			b[i].appendChild(allyCell);
			var ratioCell = getMarketOfferRatioCell(b[i]);
			b[i].appendChild(ratioCell);
			
			addMarketOfferCellEvents(b[i]);
		}
	}

	/**
	 * Oculta un elemento y le asgina un atributo de tipo filtro
	 * Params:
	 *	oferta: elemento a modificar
	 *	filtro: nombre del filtro que se le aplicara como atributo
	 */
	function asignarFiltro(oferta, filtro) {
		oferta.setAttribute("style", "display:none");
		oferta.setAttribute("filtro" + filtro, "on");
	}

	/**
	 * Elimina un atributo de tipo filtro de un elemento y elimina su estilo si no tiene ningun filtro activo
	 * Params:
	 *	oferta: elemento a modificar
	 *	filtro: nombre del filtro a quitar
	 *	filtros: lista de filtros a comprobar para quitar el estilo
	 */
	function quitMarketFilter(oferta, filtro, filtros) {
		oferta.removeAttribute("filtro" + filtro);
		var remove = true;
		for (var i = 0; i < filtros.length; i++) if (oferta.getAttribute("filtro" + filtros[i]) == 'on') remove = false;
		if (remove == true) oferta.removeAttribute("style");
	}

	/**
	 * Establece filtros por tipo de resource y proporcion de intercambio en las oferta de venta del
	 * mercado
	 * Arany es nyersanyagtipusbeallito
	 */
	function MarketFilters(){
		/**
		 * Crea la funcion que gestiona el evento de los filtros en el mercado
		 * Param:
		 *	tipo	Tipo de filtro (0 para ofrezco, 1 para busco y 2 para tipo)
		 *	resource	Recurso del filtro (0-4 resources basicos, 5 para cualquiera)
		 * Returns: La funcion que gestiona el evento
		 */
		function functionMarketFilters(origOffersTable, aType, resource) {
			return function () {
				setGMcookie("market" + aType, resource, false);
				filterMarket(origOffersTable, aType, resource);
			}
		}

		function filterMarket(origOffersTable, tipo, resource) {
			log(3, "enter filterMarket");
			var iniValue;
			var maxValue;
			if (boolIsT35 == false) {
				var aRows = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]//tr[not(@class)]", XPList, get(dmid2));
				iniValue = 0;
				maxValue = aRows.snapshotLength - 1;
			} else {
				var aRows = find("//table[@id='market_buy']/tbody/tr", XPList, get(dmid2));
				iniValue = 1;
				maxValue = aRows.snapshotLength;
			}
			for (var i = iniValue; i < maxValue; i++) {
				var b = aRows.snapshotItem(i);
				if (boolIsT35 == false) {
					if (b.childNodes.length > 8) var error = true; else var error = false;
					b.childNodes[error ? 1 : 0].firstChild.src.search(/\/(\d).gif$/); var ofrezco = RegExp.$1;
					b.childNodes[error ? 4 : 2].firstChild.src.search(/\/(\d).gif$/); var busco = RegExp.$1;
					var ofrezco_cantidad = parseInt(b.childNodes[error ? 2 : 1].innerHTML);
					var busco_cantidad = parseInt(b.childNodes[error ? 6 : 3].innerHTML);
					if (b.childNodes[error ? 11 : 6].className == 'c') var carencia = true; else var carencia = false;
					var tiempo = ComputeSeconds(b.childNodes[error ? 10 : 5].innerHTML);
				} else {
					var ofrezco = b.cells[0].firstChild.className.replace("r", "");
					var busco = b.cells[2].firstChild.className.replace("r", "");
					var ofrezco_cantidad = parseInt(b.cells[1].innerHTML);
					var busco_cantidad = parseInt(b.cells[3].innerHTML);
					if (b.cells[6].className == 'act c') var carencia = true; else var carencia = false;
					var tiempo = ComputeSeconds(b.cells[5].innerHTML);
				}
				// Para mantener 4 filtros activos a la vez sobre cada oferta, utiliza 3 atributos distintos
				// sobre cada fila
				switch (tipo) {
					case 0: if ((ofrezco != resource) && resource != 5) {
								asignarFiltro(b, "Ofrezco");
							} else {
								quitMarketFilter(b, "Ofrezco", ["Busco", "Tipo", "Carencia", "Tiempo"]);
							}
							break;
					case 1: if ((busco != resource) && resource != 5) {
								asignarFiltro(b, "Busco");
							} else {
								quitMarketFilter(b, "Busco", ["Ofrezco", "Tipo", "Carencia", "Tiempo"]);
							}
							break;
					case 2: switch(resource) {
						case 1: if (ofrezco_cantidad <= busco_cantidad) {
									asignarFiltro(b, "Tipo");
								} else {
									quitMarketFilter(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								}
								break;
						case 2: if (ofrezco_cantidad != busco_cantidad) {
									asignarFiltro(b, "Tipo");
								} else {
									quitMarketFilter(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								}
								break;
						case 3: if (ofrezco_cantidad >= busco_cantidad) {
									asignarFiltro(b, "Tipo");
								} else {
									quitMarketFilter(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								}
								break;
						case 4: quitMarketFilter(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;
					} break;
					case 3: switch(resource) {
						case 1: if (carencia == true) {
									asignarFiltro(b, "Carencia");
								} else {
									quitMarketFilter(b, "Carencia", ["Ofrezco", "Busco", "Tipo", "Tiempo"]);
								}
								break;
						case 2: quitMarketFilter(b, "Carencia", ["Ofrezco", "Busco", "Tipo", "Tiempo"]);
								break;
					} break;
					case 4: switch(resource) {
						case 1: if (tiempo > (60*60)) {
									asignarFiltro(b, "Tiempo");
								} else {
									quitMarketFilter(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								}
								break;
						case 2: if (tiempo > (2*60*60)) {
									asignarFiltro(b, "Tiempo");
								} else {
									quitMarketFilter(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								}
								break;
						case 3: if (tiempo > (3*60*60)) {
									asignarFiltro(b, "Tiempo");
								} else {
									quitMarketFilter(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								}
								break;
						case 4: quitMarketFilter(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								break;
					} break;
				}
			}

			// Para mantener un unico sombreado por cada filtro, activa el que se ha seleccionado y elimina
			// el resto de su tipo
			for (var i = 0; i < 5; i++){
				for (var j = 0; j < 6; j++){
					var aFilters = find("//td[@id='filtro" + i + j + "']", XPFirst);
					if (aFilters) {
						if (i == tipo && j == (resource - 1)) {
							aFilters.setAttribute("style", "background-color:#E5E5E5");
						}else if (i == tipo) {
							aFilters.removeAttribute("style");
						}
					}
				}
			}
		}

		function applyMarketFilters(origOffersTable) {
			var defaults = [5, 5, 4, 2, 4];
			for (var i = 0; i < 5; i++){
				var markets = getGMcookie("market" + i, false);
				var marketi;
				if (markets != "false") {
					marketi = parseInt(markets);
				} else {
					marketi = defaults[i];
					setGMcookie("market" + i, defaults[i], false);
				}
				if (marketi != defaults[i]) filterMarket(origOffersTable, i, marketi);
			}
		}

		function processOfferPage(t) {
			var ans = elem("DIV", t.responseText);
			var ansdoc = document.implementation.createDocument("", "", null);
			ansdoc.appendChild(ans);
			if (boolIsT35 == false) {
				var strOffersTableRows = "//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]/tbody/tr";
				var xpres = ansdoc.evaluate(strOffersTableRows, ans, null, XPList, null);
				var linktrl = find(strOffersTableRows, XPList,get(dmid2));
			} else {
				var strOffersTableRows = "//table[@id='market_buy']/tbody/tr";
				var xpres = ansdoc.evaluate(strOffersTableRows, ans, null, XPList, null);
				var linktrl = find(strOffersTableRows, XPList,get(dmid2));
			}
			
			var linktrlind = 3;
			var linktr = linktrl.snapshotItem(linktrlind);
			var linktimedata = ComputeSeconds(linktr.childNodes[linktr.childNodes.length >= 12 ? 10 : 6].innerHTML);
			for (var i = 2; i < xpres.snapshotLength - 1; i++) {
				var mrow = xpres.snapshotItem(i);
				var timedata = ComputeSeconds(mrow.childNodes[mrow.childNodes.length == 12 ? 10 : 6].innerHTML);
				var allyCell = getMarketOfferAllianceCell(mrow);
				mrow.appendChild(allyCell);
				var ratioCell = getMarketOfferRatioCell(mrow);
				mrow.appendChild(ratioCell);
				addMarketOfferCellEvents(mrow);
				while (linktimedata < timedata && linktrlind < linktrl.snapshotLength - 1) {
					linktrlind++;
					linktr = linktrl.snapshotItem(linktrlind);
					if (linktr.innerHTML.indexOf('class="rowpic"') < 0) {
						linktimedata = ComputeSeconds(linktr.childNodes[linktr.childNodes.length >= 12 ? 10 : 6].innerHTML);
					} else {
						linktimedata = 999999;
					}
				}
				linktr.parentNode.insertBefore(mrow,linktr);
			}
			applyMarketFilters(origOffersTable);
		}

		function createPreloadFunc(page) {
			return function() {
				ajaxRequest("build.php?id=" + linkid + "&t=1&u=" + (page * 40) + "#h2", "GET", null, processOfferPage, dummy);
			}
		}

		function createOffersTable(origOffersTable) {
			var table = newTable([["class", "tbg"], ["style", "width:100%"], ["cellspacing", "1"], ["cellpadding", "0"]]);
			// Se crea la aTable con 3 filas, Ofrezco, Busco y Tipo
			//var arrayLabels = [T('OFREZCO'), T('BUSCO')];
			var arrayLabels = [origOffersTable.rows[1].cells[0].textContent, origOffersTable.rows[1].cells[1].textContent];
			for (var j = 0; j < 2; j++){
				//var marketj = getOption("market" + j, 5, "integer");
				var markets = getGMcookie("market" + j, false);
				if (markets == "false") {
					marketj = 5;
					setGMcookie("market" + j, 5);
				} else {
					marketj = parseInt(markets);
				}
				var tr = elem("TR", "");
				tr.appendChild(elem("TD", arrayLabels[j]));
				// Para Ofrezco y Busco se muestran 4 materiales y un quinto comodin
				for (var i = 0; i < 4; i++){
					var td = newCell("", [["id", "filtro" + j + i]]);
					var ref = newLink("");
					var refImg = newImage([['src', img("r/" + (i+1) + ".gif")], ['width', '18'], ['height', '12'], ['border', '0'], ['title', T('RECURSO' + (i+1))]]);
					ref.appendChild(refImg);
					if (i + 1 == marketj) td.setAttribute("style", "background-color:#E5E5E5");
					td.addEventListener("click", functionMarketFilters(origOffersTable, j, i  + 1), 0);
					td.appendChild(ref);
					tr.appendChild(td);
				}
				var td = newCell("", [["id", "filtro" + j + "4"]]);
				if (marketj == 5) td.setAttribute("style", "background-color:#E5E5E5");
				var ref = newLink(T('CUALQUIERA'), [['href', jsVoid]]);
				td.addEventListener("click", functionMarketFilters(origOffersTable, j, 5), 0);
				td.appendChild(ref);
				tr.appendChild(td);
				table.appendChild(tr);
			}
			// Tipo de transaccion segun la relacion entre oferta y demanda
			var markets = getGMcookie("market2", false);
			if (markets == "false") {
				market2 = 4;
				setGMcookie("market2", 4, false);
			} else {
				market2 = parseInt(markets);
			}
			var tr = elem("TR", "");
			tr.appendChild(elem("TD", T('TIPO')));
			table.appendChild(tr);
			var etiquetas_tipo = ["1:>1", "1:1", "1:<1", "1:x"];
			for (var i = 0; i < 4; i++){
				var td = newCell("", [["id", "filtro" + 2 + i]]);
				if (i+1 == market2) td.setAttribute("style", "background-color:#E5E5E5");
				var ref = newLink(etiquetas_tipo[i], [['href', jsVoid]]);
				td.addEventListener("click", functionMarketFilters(origOffersTable, 2, i+1), 0);
				td.appendChild(ref);
				tr.appendChild(td);
			}
			tr.appendChild(elem("TD", ""));

			// Tiempo maximo de transporte
			var markets = getGMcookie("market4", false);
			if (markets == "false") {
				market4 = 4;
				setGMcookie("market4", 4, false);
			} else {
				market4 = parseInt(markets);
			}
			var tr = elem("TR", "");
			tr.appendChild(elem("TD", T('MAXTIME')));
			table.appendChild(tr);
			var etiquetas_tipo = ["1", "2", "3", ">3"];
			for (var i = 0; i < 4; i++){
				var td = newCell("", [["id", "filtro" + 4 + i]]);
				if (i+1 == market4) td.setAttribute("style", "background-color:#E5E5E5");
				var ref = newLink(etiquetas_tipo[i], [["href", jsVoid]]);
				td.addEventListener("click", functionMarketFilters(origOffersTable, 4, i+1), 0);
				td.appendChild(ref);
				tr.appendChild(td);
			}
			tr.appendChild(elem("TD", ""));
			// Filtro por disponibilidad de resources y mercaderes
			var markets = getGMcookie("market3", false);
			if (markets == "false") {
				market3 = 2;
				setGMcookie("market3", 2, false);
			} else {
				market3 = parseInt(markets);
			}
			var tr = elem("TR", "");
			tr.appendChild(elem("TD", T('DISPONIBLE')));
			table.appendChild(tr);
			var etiquetas_carencia = [T('YES'), T('NO')];
			for (var i = 0; i < 2; i++){
				var td = newCell("", [["colspan", "2"], ["id", "filtro" + 3 + i]]);
				if (i+1 == market3) td.setAttribute("style", "background-color:#E5E5E5");
				var ref = newLink(etiquetas_carencia[i], [["href", jsVoid]]);
				td.addEventListener("click", functionMarketFilters(origOffersTable, 3, i+1), 0);
				td.appendChild(ref);
				tr.appendChild(td);
			}
			tr.appendChild(elem("TD", ""));
			//log(3, "before applyMarketFilters");
			applyMarketFilters(origOffersTable);
			var p = document.createElement("P");
			p.appendChild(table);
			origOffersTable.parentNode.insertBefore(p, origOffersTable);
		}

		//get the original offers table
		if (boolIsT35 == false) {
			var origOffersTable = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]", XPFirst, get(dmid2));
		} else {
			var origOffersTable = get("market_buy");
		}
		
		//getMerchantsInformation();
		createOffersTable(origOffersTable);
		//get the market building id from the << >> row (last row of the offers table)
		if (boolIsT35 == false) {
			var linkid = find('//td[@class="rowpic"]/a', XPFirst, origOffersTable).href.match('id=([0-9]*)&')[1];
		} else {
			var lastCell = origOffersTable.rows[origOffersTable.rows.length - 1].cells[0];
			var linkid = lastCell.lastChild.href.match('id=([0-9]*)&')[1];;
		}
		// market preload
		var marketpreloads = getGMcookie("marketpreload", false);
		if (marketpreloads == "false") {
			marketpreload = 0;
			setGMcookie("marketpreload", 0, false);
		} else {
			marketpreload = parseInt(marketpreloads) + 1;
		}

		var pageNo1 = crtLocation.indexOf("&u=");
		if (pageNo1 != -1) {
			var pageNo2 = crtLocation.indexOf("#h2");
			var pageNoS1 = crtLocation.substring(pageNo1 + 3, pageNo2);
			var crtPage = Math.round(parseInt(pageNoS1) / 40);
		} else {
			var crtPage = 0;
		}

		if (marketpreload > 1) {
			for (var i = 1; i < marketpreload; i++) {
				setTimeout(createPreloadFunc(i + crtPage), getRandomTimeRange(1302));
			}
			var X2 = (marketpreload + crtPage) * 40;
			var X1 = (crtPage - marketpreload) * 40;
			var backLink = "build.php?id=" + linkid + "&t=1&u=" + X1 + "#h2";
			var forwardLink = "build.php?id=" + linkid + "&t=1&u=" + X2 + "#h2";
			var tdbfLinks = find('//td[@class="rowpic"]', XPFirst);
			if (tdbfLinks) {
				if (X1 < 0) {
					var aSpan = elem("SPAN", "«");
					aSpan.setAttribute("style", "font-weight:bold;");
					aSpan.setAttribute("class", "c");
				} else {
					var aSpan = elem("A", "« ");
					aSpan.setAttribute("style", "font-weight:bold;");
					aSpan.href = backLink;
				}
				var fwLink = elem("A", "»&nbsp;");
				fwLink.setAttribute("style", "font-weight:bold;");
				fwLink.href = forwardLink;
				tdbfLinks.innerHTML = "";
				tdbfLinks.appendChild(aSpan);
				tdbfLinks.appendChild(fwLink);
			}
		}
	}


	function TimeToExplore() {
		//if (boolIsT35 == false) {
			//var aY = find("//div[@id='" + dmid2 + "']//div/table[@class='f10']/tbody/tr/td", XPFirst,get(dmid2));
			var aY = find("//div[@id='" + dmid2 + "']//div/table/tbody/tr/td", XPFirst,get(dmid2));
		//} else {
		//	var aY = find("//div[@id='" + dmid2 + "']//div/table/tbody/tr/td", XPFirst,get(dmid2));
		//}
		//log(3, "TimeToExplore: aY = " + aY);
		if (aY == null || (boolIsT35 == false && aY.childNodes.length != 12 && aY.childNodes.length != 4)) {
			//return;
		} else {
			var d = aY.textContent.split("|").splice(0,4);
			var e = calculateResourceTime(d);
			if (e != null) {
				var aZ = aY.parentNode;
				if (aZ) {
					aZ = aZ.parentNode;
					if (aZ) {
						aZ = aZ.parentNode;
						if (aZ) {
							aZ = aZ.parentNode;
							if (aZ) {
								aZ = aZ.getElementsByTagName("span");
								if (aZ) {
									aZ = aZ[0];
									if (aZ) {
										//aZ.innerHTML = e;
										aZ.innerHTML = '';
										if (boolIsT35 == true) e.setAttribute('id', 'resNtable');
										aZ.appendChild(e);
									}
								}
							}
						}
					}
				}
			}
		}

		//fix for the armoury, blacksmith and town hall
		var boolIsTownHall = true;
		var mainTable = null;
		if (boolIsT35 == true) {
			var strToSearchFor = "//div[@id='" + dmid2 + "']//table[@class='std build_details']";
			mainTable = find(strToSearchFor, XPFirst);
		}
		if (mainTable == null) {
			var ax = find("//table[@class='tbg']//tr[@class='cbg1']", XPFirst);
			if (ax == null || (ax.childNodes.length != 2 && ax.childNodes.length != 4)) return;
			//start new version
			var mainTable = ax.parentNode.parentNode;
		}

		for (var xi = 1; xi < mainTable.rows.length; xi++) {
			var aCell = mainTable.rows[xi].cells[0];
			var aTable = aCell.childNodes[1];
			//log(3, "aTable = " + aTable);
			if (aTable) {
				if (aTable.nodeName == "TABLE") {
					//there is a table  to analyse in this cell
					var levelx = "0";
					log(3, "aTable.rows.length = " + aTable.rows.length);
					for (yi = 0; yi < aTable.rows.length; yi++) {
						var bCell = aTable.rows[yi].cells[0];
						if (xi == 1 && yi == 0) {
							if (bCell.getAttribute("rowspan") != null) {
								//we are in the academy, blacksmith or armoury
								boolIsTownHall = false;
							}
						}
						if (boolIsTownHall) {
							//code for missing resources for parties
							if (yi == 1) {
								var dx = bCell.textContent.split("|").splice(0,4);
								var ex = calculateResourceTime(dx);
								//if (ex) mainTable.rows[xi].cells[1].innerHTML = ex;
								if (ex != null) {
									mainTable.rows[xi].cells[1].innerHTML = '';
									mainTable.rows[xi].cells[1].appendChild(ex);
								}
							}
						} else {
							//code for missing resources to develop/train troops in the academy/blacksmith or armoury
							if (yi == 0 && aTable.rows) {
								levelx = aTable.rows[yi].cells[1].innerHTML;
								var zi = levelx.lastIndexOf("(");
								levelx = levelx.substring(zi + 1);
								zi = levelx.indexOf(")");
								levelx = levelx.substring(0, zi);
								var lvlArBlObj = find("//div[@id='" + dmid2 + "']//h1", XPFirst);
								var lvlArBl = '';
								if (lvlArBlObj) lvlArBl = lvlArBlObj.textContent;
								var devTable = find("//table[@class='tbg']//tr[@class='cbg1']//td[@colspan='2']", XPFirst);
								if (levelx.search("20") == -1 && !devTable) {
									levelx = "0";
									if (lvlArBl != '') {
										if (levelx.search(lvlArBl) != -1) {
											levelx = "20";
										}
									}
								} else {
									levelx = "20";
								}
							}
							if (yi == 1) {
								if (levelx != "20") {
									var dx = bCell.textContent.split("|").splice(0,4);
									var ex = calculateResourceTime(dx);
									if (ex != null) {
										mainTable.rows[xi].cells[1].innerHTML = '';
										mainTable.rows[xi].cells[1].appendChild(ex);
									}
									//var multipliers = getXmX(getXfields());
								}
							}
						}
					}
				} else if (aTable.nodeName == "DIV") {
					var levelx = "0";
					var aSpan = aCell.childNodes[1];
					var bSpan = aCell.childNodes[3];
					var boolShowCalculation = true;
					if (aSpan) {
						if (aSpan.textContent.indexOf("20") != -1) boolShowCalculation = false;
					}
					if (boolShowCalculation == true) {
						var dx = bSpan.textContent;
						var dx = dx.split("|").splice(0, 4);
						//log(3, "dx = " + dx);
						var ex = calculateResourceTime(dx);
						if (ex != null) {
							mainTable.rows[xi].cells[1].innerHTML = '';
							mainTable.rows[xi].cells[1].appendChild(ex);
						}
					}
				}
			}
		}

	}

	//function find(xpath, xpres, startnode){
	//	if (!startnode) {startnode = document;}
	//	var ret = document.evaluate(xpath, startnode, null, xpres, null);
	//	return  xpres == XPFirst ? ret.singleNodeValue : ret;
	//}
	
    /**
         * Modifica el valor por defecto del tipo de ataque a enviar
         */

	function defaultAttackType(){
        // 2 -> Defend, 3 -> Attack, 4 -> Steal
        var actionCookie = getGMcookie('rpdefact', false);
        if (actionCookie != false && actionCookie != "0") {
            var action = "" + (parseInt(actionCookie) + 2);
        }
        var cities = find("//div[@id='" + dlright1 + "']//table[@class='f10']", XPFirst);
        try {
            if (cities) {
                if (crtLocation.search(/z=(\d+)/) >= 0){
                    var z = RegExp.$1;
                    cities = cities.firstChild;
                    for (var i = 0; i < cities.childNodes.length; i++){
                        var city = cities.childNodes[i];
                        city.textContent.search(/\((.*)\n?\|\n?(.*)\)/);
                        var id = xy2id(RegExp.$1, RegExp.$2);
                        if (id == z) action = "2";
                    }
                }
            }
        } catch(e) {
        }
		// BUGFIX : OASIS - can only be an attack:raid (Thank you, fr3nchlover !)
        if (crtLocation.match(/a2b.php\?(.*)&o/)) action = 4;
		// finish BUGFIX : OASIS
        var rbAction = find("//input[@value='" + action + "' and @name='c']", XPFirst);
        if (rbAction) {rbAction.checked = true;}
    }
	
	/**
	 * Player Bookmarks on the right side
	 */
	function userBookmarks(){
		var boolShowBookmarks = getGMcookie("showbookmarks", false);
		if (boolShowBookmarks == 'false') boolShowBookmarks = '1';

		// Add user bookmarks if not already present
		var ba = find("//div[@id='" + dlright1 + "']", XPFirst);
		if (!ba){
			ba = document.createElement("DIV");
			ba.setAttribute("id", dlright1);
			var divlmidall = find("//body/div[@id='" + dmid + "']", XPFirst);
			//if (divlmidall != undefined && divlmidall != null) {
				divlmidall.appendChild(ba);
			//} else return;
		}
		if (boolShowBookmarks == "1") {
			var div = document.createElement("DIV");
			var titulo = elem("B", T('MARCADORES') + ":");
			var enlace = newLink("",[['href', jsVoid]]);
			var bmImg = newImage([['src', image["addbookmark"]], ['title', T('ANYADIR')]]);
			enlace.appendChild(bmImg);
			var aTable = newTable([["class", "f10"]]);
			if (boolIsT35 == true) aTable.setAttribute('style', 'width:0%;');
			div.setAttribute("id", "marcadores");
			div.style.width = '400px';
			enlace.addEventListener("click", function() {addUserBookmark();}, 0);
			titulo.setAttribute("class","f10");
			div.appendChild(titulo);
			var enlaceCrtPage = newLink("", [['href', jsVoid]]);
			var bmCrtImg = newImage([['src', image["addbookmarkthispage"]], ['title', T('ADDCRTPAGE')]]);
			enlaceCrtPage.appendChild(bmCrtImg);
			enlaceCrtPage.addEventListener("click", function() {addUserBookmark(window.location.href);}, 0);
			var bmSpImg = newImage([['src', image["addbookmarkspacer"]], ['title', T('SPACER')]]);
			var spacer = newLink("", [['href', jsVoid]]);
			spacer.appendChild(bmSpImg);
			spacer.addEventListener("click", function() {appendGMcookieValue("marcadores", ["<hr size='2' width='100%' noshade color=black>", "#"], false); removeElement(find("//div[@id='marcadores']", XPFirst)); userBookmarks();}, 0);
			
			var boolLockBookmarks = getGMcookie("lockbookmarks", false);
			if (boolLockBookmarks == "1") {
				var imgLock = image["locked"];
				var titleLock = T('UNLOCKBOOKMARKS').replace("<br>", " ");
				var gmBMLcookie = "0";
			} else {
				var imgUnlocked = "unlocked" + docDir[0].substring(0, 1);
				var imgLock = image[imgUnlocked];
				var titleLock = T('LOCKBOOKMARKS').replace("<br>", " ");
				var gmBMLcookie = "1";
			}
			
			var bmLockImg = newImage([['src', imgLock], ['title', titleLock]]);
			var bmlock = newLink("", [['href', jsVoid]]);
			bmlock.appendChild(bmLockImg);
			bmlock.addEventListener("click", function() {setGMcookie("lockbookmarks", gmBMLcookie, false); removeElement(find("//div[@id='marcadores']", XPFirst)); userBookmarks(); }, false);
			
			//add the bookmark links
			div.appendChild(document.createTextNode("  "));
			div.appendChild(enlace);
			div.appendChild(document.createTextNode(" | "));
			div.appendChild(enlaceCrtPage);
			div.appendChild(document.createTextNode(" | "));
			div.appendChild(spacer);
			div.appendChild(document.createTextNode(" | "));
			div.appendChild(bmlock);
			
			div.appendChild(aTable);
			var p = document.createElement("P");
			p.appendChild(div);
			ba.appendChild(p);

			// get bookmark string
			var strBookmarks = getGMcookie("marcadores", false);
			if (strBookmarks == "false") strBookmarks = '';

			var marcadores = new Array();
			if (strBookmarks != ''){
				strBookmarks = strBookmarks.split("$$");
				for (var i = 0; i < strBookmarks.length; i++) marcadores[i] = strBookmarks[i].split("$");
			}
			
			for (var i = 0; i < marcadores.length; i++){
				var bmRow = elem("TR", "");
				var strBookmark = marcadores[i][0];
				var aCell = elem("TD", "");
				if (boolLockBookmarks != "1") {
					var delImg = newImage([['src', gIcons["del"]], ['width', '12'], ['height', '12'], ['border', '0'], ['style', 'cursor:pointer'], ['title', T('ELIMINAR')]]);
					var delIconLink = newLink("", [['href', jsVoid]]);
					delIconLink.appendChild(delImg);
					delIconLink.addEventListener("click", removeGMcookieValue("marcadores", i, false, userBookmarks, false), 0);
					aCell.appendChild(delIconLink);
					bmRow.appendChild(aCell);
					
					var dummyCell = elem("TD", "&nbsp;");
					bmRow.appendChild(dummyCell);
					
					var upLinkCell = elem("TD", "");
					if (i > 0) {
						var upLinkImg = newImage([['src', image["arrowup"]], ['style', 'cursor:pointer']]);
						var upLink = newLink("", [['href', jsVoid]]);
						upLink.appendChild(upLinkImg);
						upLink.addEventListener("click", moveUserBookmark(i, -1), false);
						upLinkCell.appendChild(upLink);
					}
					bmRow.appendChild(upLinkCell);
					
					var downLinkCell = elem("TD", "");
					if (i < marcadores.length - 1) {
						var downLinkImg = newImage([['src', image["arrowdown"]], ['style', 'cursor:pointer']]);
						var downLink = newLink("", [['href', jsVoid]]);
						downLink.appendChild(downLinkImg);
						downLink.addEventListener("click", moveUserBookmark(i, 1), false);
						downLinkCell.appendChild(downLink);
					}
					bmRow.appendChild(downLinkCell);
					
					var dummyCell = elem("TD", "&nbsp;");
					bmRow.appendChild(dummyCell);
					
					var editLinkCell = elem("TD", "");
					var editLinkImg = newImage([['src', image["editbookmark"]], ['style', 'cursor:pointer'], ['title', T('EDIT')]]);
					var editLink = newLink("", [['href', jsVoid]]);
					editLink.appendChild(editLinkImg);
					editLink.addEventListener("click", editUserBookmark(i), false);
					editLinkCell.appendChild(editLink);
					bmRow.appendChild(editLinkCell);
					
					var dummyCell = elem("TD", "&nbsp;");
					bmRow.appendChild(dummyCell);
				} else {
					//add just a simple black button
					if (marcadores[i][1] == crtLocation) {
                        aCell = elem("TD", "<span> &#9675;&nbsp;&nbsp;</span>");
                    } else {
						var aCell = elem("TD", "<span> &#8226;&nbsp;&nbsp;</span>");
					}
					bmRow.appendChild(aCell);
				}
				var bmCell = elem("TD", "");
				//some changes and additions by fr3nchlover (Thank you !)
				var bmLink = "";
                if (marcadores[i][1].indexOf("*") != -1) {
					var extLinkImg = newImage([['src', image["external"]], ['style', 'cursor:pointer']]);
					strLinkHTML = newLink(strBookmark + " ", [['href', marcadores[i][1].substring(0,marcadores[i][1].length-1)], ['target','_blank']]);
					strLinkHTML.appendChild(extLinkImg);
				} else {
					strLinkHTML = newLink(strBookmark, [['href', marcadores[i][1].substring(0,marcadores[i][1].length)]]);
				}
				bmLink = elem("DIV", "");
				bmLink.appendChild(strLinkHTML);
                bmCell.appendChild(bmLink);               
                bmRow.appendChild(bmCell);
                aTable.appendChild(bmRow);
				
			}
		}
		
		//add the notwblock if necessary
		var boolShowNoteBlock = getGMcookie("noteblock", false);
		if (boolShowNoteBlock == 'false') boolShowNoteBlock = '1';
		
        if (boolShowNoteBlock == "1") {
			var noteValue = getGMcookie("notas", false);
			if (noteValue == "false") noteValue = "";
			if (div) {
				noteBlock(div, noteValue);
			} else {
				noteBlock(ba, noteValue);
			}
		}
		
		function addUserBookmark(linkURL, linkLabel) {
			if (!linkURL) {
				var linkURL = prompt(T('ENLACE'));
				if (linkURL == null || linkURL == '') return;
			}
			var linkLabel = prompt(T('TEXTO'));
			if (linkLabel == null || linkLabel == '') return;
			appendGMcookieValue("marcadores", [linkLabel, linkURL], false);
			removeElement(find("//div[@id='marcadores']", XPFirst));
			userBookmarks();
		}
		
		function moveUserBookmark(i, updown) {
			return function(){
				var bookmarks = getGMcookie("marcadores", false);
				var newbookmarks = bookmarks.split("$$");
				var tempBookmark = newbookmarks[i + updown];
				newbookmarks[i + updown] = newbookmarks[i];
				newbookmarks[i] = tempBookmark;
				var strBookmarks = newbookmarks.join("$$");
				setGMcookie("marcadores", strBookmarks, false);
				removeElement(find("//div[@id='marcadores']", XPFirst));
				userBookmarks();
			}
		}
		
		function editUserBookmark(i) {
			return function() {
				var bookmarks = getGMcookie("marcadores", false);
				var newbookmarks = bookmarks.split("$$");
				var tempBookmark = newbookmarks[i].split("$");
				
				var linkLabel = prompt(T('TEXTO'), tempBookmark[0]);
				var linkURL = null;
				if (linkLabel != '') linkURL = prompt(T('ENLACE'), tempBookmark[1]);
				
				if (linkLabel == null) linkLabel = tempBookmark[0];
				if (linkURL == null) linkURL = tempBookmark[1];
				
				if (linkLabel != '' && linkURL != '' && (linkLabel != tempBookmark[0] || linkURL != tempBookmark[1])) {
					newbookmarks[i] = linkLabel + "$" + linkURL;
					var strBookmarks = newbookmarks.join("$$");
					setGMcookie("marcadores", strBookmarks, false);
					removeElement(find("//div[@id='marcadores']", XPFirst));
					userBookmarks();
				}
			}
		}
	}

	function getSingleTown() {
		//we'll do the AJAX Request only if the user has only one village
		// get the list of villages
        var cities = find("//div[@id='" + dlright1 + "']//table[@class='f10']", XPFirst);
        if (!cities || ((cities) && cities.firstChild.childNodes.length == 1)) {
			//get town coordinates from the spieler.php page via AJAX request
			ajaxRequest("/spieler.php", 'GET', null, function(AJAXrespX) {
				var aDoc = document.implementation.createDocument("", "", null);
				var aElem = document.createElement('DIV');
				aElem.innerHTML = AJAXrespX.responseText;
				aDoc.appendChild(aElem);
				var aValue = aDoc.evaluate("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@class='s7']//a[contains(@href,'karte.php?d=')]", aElem, null, XPFirst, null).singleNodeValue;
				var singleTownName = aValue.textContent;
				var singleTownId = aValue.href.match(/\?d=(\d+)/)[1];
				setGMcookie('singleTownNI', singleTownName + "|" + singleTownId, false);
				setGMcookie('capital', singleTownName, false);
			});
			//get the newdid from the dorf3.php page via AJAX request
			ajaxRequest("/dorf3.php", 'GET', null, function(AJAXrespX) {
				var aDoc = document.implementation.createDocument("", "", null);
				var aElem = document.createElement('DIV');
				aElem.innerHTML = AJAXrespX.responseText;
				aDoc.appendChild(aElem);
				var aValue = aDoc.evaluate("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@class='s7 li ou']//a[contains(@href,'dorf1.php?newdid=')]", aElem, null, XPFirst, null).singleNodeValue;
				var singleTownNEWDID = aValue.href.split("=")[1];
				setGMcookie('singleTownNEWDID', singleTownNEWDID, false);
			});
		}
	}

	function createVillageList(divlright1) {
		//we have only one village here
		//try to get the GM "cookie" containing the single town name and id
		var singleTown = getGMcookie('singleTownNI', false);
		var singleTownNEWDID = getGMcookie('singleTownNEWDID', false);
		if (singleTown == "false" || singleTownNEWDID == "false") {
			getSingleTown();
			var singleTown = getGMcookie('singleTownNI', false);
			var singleTownNEWDID = getGMcookie('singleTownNEWDID', false);
		}
		if (singleTown != "false") {
			//inspired from Travian3 Beyond Hacked FR (mik french (fr), A_r_e_s (br), Booboo(hu) )
			//now we construct the city table on the right side even if there is a single village
			var singleTown = singleTown.split("|");
			var singleTownName = singleTown[0];
			var singleTownCoords = "(" + id2xy(singleTown[1]) + ")";
			//find divlright1
			if (!divlright1) {
				//create divlright1
				var divlright1 = elem("DIV", "");
				divlright1.setAttribute("id", dlright1);
				var divlmidall = get(dmid);
				//if (divlmidall != undefined && divlmidall != null) {
					divlmidall.appendChild(divlright1);
				//} else return;
			}
			
			divlright1.style.position = "relative";

			var vLink = elem('a', '<span class="f10 c0 s7 b">' + T('VILLAGE') + ':</span>');
			vLink.setAttribute('href', 'dorf3.php');
			divlright1.insertBefore(vLink, divlright1.firstChild);
			var vTable = newTable([['class', "f10"]]);
			if (boolIsT35 == true) vTable.setAttribute('style', 'width:0%;');
			//vTable.setAttribute("width", "0%");
			var aBody = elem("TBODY", "");
			vTable.appendChild(aBody);
			var aRow = elem("TR", "");
			aBody.appendChild(aRow);
			var aCell = newCell('<span class="c2">&#8226;</span>&nbsp;&nbsp;', [['class', 'nbr']]);
			aRow.appendChild(aCell);

			var bLink = elem('a', singleTownName);
			bLink.setAttribute('class', 'active_vl');
			if (singleTownNEWDID != false) {
				bLink.setAttribute('href', '?newdid=' + singleTownNEWDID);
			} else {
				bLink.setAttribute('href', '?newdid=0');
			}
			aCell.appendChild(bLink);
			var bCell = newCell("", [['class', 'right']]);
			aRow.appendChild(bCell);

			var aTable = newTable([["class", "dtbl"], ["cellspacing", "0"], ["cellpadding", "0"]]);
			bCell.appendChild(aTable);
			var bBody = elem("TBODY", "");
			aTable.appendChild(bBody);

			var bRow = elem("TR", "");
			bBody.appendChild(bRow);
			//format correctly: coordinates of the village as if this table would have been generated by the game server - for compatibility to other scripts
			var xy = singleTownCoords.split("|");
			var cCell = newCell(xy[0], [["class", "right dlist1"]]);
			var dCell = newCell("|", [["class", "center dlist2"]]);
			var eCell = newCell(xy[1], [["class", "left dlist3"]]);
			bRow.appendChild(cCell);
			bRow.appendChild(dCell);
			bRow.appendChild(eCell);
			insertAfter(vLink, vTable);
		}
	}
	
	/**
	 * Crea enlaces directos en la lista de aldeas para enviar tropas o enviar comerciantes
	 */
    function villageList() {
		// get the list of villages
		var cities;
		var divlright1 = find("//div[@id='" + dlright1 + "']", XPFirst);
		if (divlright1 == null) {
			dlright1 = 'sright';
			dmid = "mid";
			divlright1 = find("//div[@id='" + dlright1 + "']", XPFirst);
		}
        
		cities = find("//div[@id='" + dlright1 + "']//table[@class='f10']", XPFirst);
		
        if (!cities) {
			createVillageList(divlright1);
			cities = find("//div[@id='" + dlright1 + "']//table[@class='f10']", XPFirst);
		} else {
			setGMcookie('singleTownNI', false, false);
		}
		if (!cities) return;
				
		//log(4, "windowwidth = " + windowwidth);
		if (windowwidth > 1024) divlright1.style.width = '320px'; else divlright1.style.width = '280px';

		vilCount();
		getCrtLocation();
		
		var tmpX, tmpY;
		cities.setAttribute("cellpadding", "2");
		cities.setAttribute("cellspacing", "1");
		cities = cities.firstChild;
		
		var boolShowCenterMapIcon = getGMcookie("showcentermapicon", false);
		if (boolShowCenterMapIcon == 'false') boolShowCenterMapIcon = '1';
		
		var boolShowInOutIcons = getGMcookie("showinouticons", false);
		if (boolShowInOutIcons == 'false') boolShowInOutIcons = '1';
		
		var boolShowSendTroopsResources = getGMcookie("showsendtroopsresources", false);
		if (boolShowSendTroopsResources == 'false') boolShowSendTroopsResources = '1';
		
		for (var i = 0; i < cities.childNodes.length; i++){
			
			var city = cities.childNodes[i];
			var cityLink = city.cells[0].innerHTML;
			var newdidxi = cityLink.indexOf('?newdid=');
			cityLink = cityLink.substring(newdidxi + 7);
			newdidxi = cityLink.substring('?');
			if (newdidxi > 0) cityLink = cityLink.substring(0, newdidxi);
			var newdidyi = cityLink.indexOf('"');
			var cityName = cityLink.substring(newdidyi);
			var newdidzi = cityName.indexOf("<");
			cityName = cityName.substring(0, newdidzi);
			var newdidti = cityName.indexOf(">");
			cityName = cityName.substring(newdidti + 1);
			
			// Use the text of the coordinates to get the ID needed for following links
			cityLink = cityLink.substring(0, newdidyi);
			var intLastP = city.textContent.lastIndexOf("(");
			var strCityCoords = city.textContent.substring(intLastP);
			//log(3, "strCityCoords = " + strCityCoords);
			//city.textContent.search(/\((.*)\n?\|\n?(.*)\)/);
			strCityCoords.search(/\((.*)\n?\|\n?(.*)\)/);
			tmpX = RegExp.$1;
			tmpY = RegExp.$2;
	
			var vID = xy2id(tmpX, tmpY);
			var popX = getGMcookie("" + vID, false);
			if (popX == "false") {
				var popCell = elem("TD", "<a href='spieler.php?uid=" + crtUserID + "'>?</a>");
			} else {
				var popCell = newCell(popX, [['style', 'font-size:8pt; color:darkgreen']]);
			}
			popCell.setAttribute("align", docDir[1]);
			city.appendChild(popCell);
			if (boolShowInOutIcons == "1") {
				city.appendChild(elem("TD", "<a href='dorf1.php?newdid" + cityLink + "'><img src='" + image["outsidev"] + "' width='12' border='0' title='" + cityName + " (dorf1.php)' alt='" + cityName + " (dorf1.php)'></a>"));
				city.appendChild(elem("TD", "<a href='dorf2.php?newdid" + cityLink + "'><img src='" + image["insidev"] + "' width='12' border='0' title='" + cityName + " (dorf2.php)' alt='" + cityName + " (dorf2.php)'></a>"));
			}
			if (boolShowCenterMapIcon == '1') {
				city.appendChild(elem("TD", "<a href='karte.php?z=" + vID + "'><img src='" + image["centermap"] + "' width='12' border='0' title='" + T('CENTERMAP') + " (" + cityName + ")" + "' alt='" + T('CENTERMAP') + " (" + cityName + ")" + "'></a>"));
			}
			
			if (boolShowSendTroopsResources == '1') {
				city.appendChild(elem("TD", "<a href='a2b.php?z=" + vID + "'><img " + gIcons["def1"] + " title='" + T('RALLYPOINT') + "' alt='" + T('RALLYPOINT') + "'</img></a>"));
				city.appendChild(elem("TD", "<a href='build.php?z=" + vID + "&gid=17'>" + gIcons["r41"] + "</a>"));
			}
			if (crtLocation.indexOf('karte') != -1) {
				if (TB3O.boolShowDistTimes == "1" && TB3O.xCrt != -1000 && TB3O.yCrt != -1000) {
					var lDist = getDistance(parseInt(tmpX), parseInt(tmpY), TB3O.xCrt, TB3O.yCrt);
					var distCell = newCell("", [['style', 'font-size:8pt; color:blue; white-space:nowrap']]);
					distCell.innerHTML = " " + "<img src='" + image["dist" + docDir[0].substr(0,1)] + "'>" + " " + lDist.toFixed(2);
					city.appendChild(distCell);
				}
			}
		}
	}
	
	function selectFakeTroopsCell(boolShowAll) {
		//crtUserRace = getRace();
		var addInt = 0;
		if (crtUserRace != 'false') {
			if (crtUserRace == 'Teutons') {
				addInt = 10;
			} else if (crtUserRace == 'Gauls') {
				addInt = 20;
			}
			//log(3, "crtUserRace = " + crtUserRace);
			var aCell = elem("TD", "");
			aCell.setAttribute('id', 'selectfaketroopscell');
			for (var xi = 1; xi < 9; xi++) {
				if ((crtUserRace != 'Gauls' && xi != 4) || (crtUserRace == 'Gauls' && xi != 3)) {
					var tAv = get("troopsav_" + xi);
					if (tAv || boolShowAll) {
						var aInput = document.createElement("INPUT");
						aInput.setAttribute("type", "checkbox");
						aInput.setAttribute('id', 'faketroop_' + xi);
						aInput.setAttribute('value', '1');
						aCell.appendChild(aInput);
						var aImg = newImage([['src', gIcons["u" + (xi + addInt)]]]);
						if (boolIsT35 != false) aImg.setAttribute('class', "unit u" + (xi + addInt));
						aCell.appendChild(aImg);
						var aTxt = document.createTextNode("  ")
						aCell.appendChild(aTxt);
					}
				}
			}
			return aCell;
		} else {
			return null;
		}
	}
	
	//code for the initial selectAllTroops(function) provided by someweirdnobody.  Thank you !
	//selectScout and selectFake functions provided by Nux
	//aggregated and rewritten into a single function by ms99
	//changed by suggestion of Acr111
	function selectAllTroops() {
		var iField = find("//input[@name='t1' and not (@type='hidden')]", XPFirst);
		//log(3, "iField = " + iField);
		if (iField == null) return;
		//add an EventListener to all the input fields
		for (var i = 1; i < 12; i++) {
			var troopInput = find("//input[@name='t" + i + "']", XPFirst);
			//log(3, "troopLink(" + i + ") = " + troopLink);
			if (troopInput) {
				troopInput.setAttribute("id", "t" + i);
				troopInput.addEventListener('keyup', updateTroopsPower, false);
				troopInput.addEventListener('change', updateTroopsPower, false);
				if (boolIsT35 == false) {
					var troopLink = troopInput.parentNode.nextSibling;
				} else {
					var troopLink = troopInput.parentNode.childNodes[5].childNodes[0];
					//log(3, "troopLink(" + i + ") = " + troopLink);
					//var troopLink = find("//span//b//a", XPFirst, iParent);
				}
				//log(3, "troopLink(" + i + ") = " + troopLink);
				if (troopLink) {
					var xxx = troopLink.textContent.replace("(", "").replace(")", "");
					//log(3, "i = " + i + "; xxx = " + xxx);
					if (xxx != '0') {
						if (troopLink.firstChild) {
							troopLink.firstChild.setAttribute('id', 'troopsav_' + i);
						}
						troopLink.addEventListener('click', addUpdateTroopsPower(i, troopLink), false);
					}
				}
			}
		}
	
		//original position
		var header = find("//div[@id='" + dmid2 + "']//h1", XPFirst);
		//move the table as suggested by Acr111
		//var header = find("//td[@width='33%']", XPFirst); 
		var arrSelect = [[T('SELECTALLTROOPS'), getAllTroops], [T('SELECTSCOUT'), getScout], [T('SELECTFAKE'), getFakeUnitV2]];
		var aTable = newTable([["cellspacing", "1"], ["style", 'font-size:8pt;']]);
		//change the style of the table as suggested by Acr111
		//aTable.setAttribute("style", "position:relative; left:-20px; z-index: 100; border: solid 1px #00C000; font-size:11px;"); 
		for (var i = 0; i < 3; i++) {
			var aRow = elem("TR", "");
			var aCell = newCell("", [['style', 'font-size:8pt']]);
			//change as suggested by Acr111
			//if (i == 0) aCell.setAttribute("colspan", "3");
			var aLink = elem("A", arrSelect[i][0]);
			aLink.setAttribute("href", jsVoid);
			aLink.addEventListener("click", arrSelect[i][1], true);
			aCell.appendChild(aLink);
			aRow.appendChild(aCell);
			if (i == 0) {
				var bCell = elem("TD", "");
				bCell.setAttribute('colspan', '2');
				aRow.appendChild(bCell);
			}
			if (i == 1){
				//insert no of fakes cell
				var bCell = elem("TD","");
				var scoutInput = document.createElement("INPUT");
				scoutInput.setAttribute("type", "text");
				//scoutInput.setAttribute('style', 'font-size:8pt');
				scoutInput.setAttribute("id", 'selectscoutnumber');
				scoutInput.setAttribute('style', 'width:30px; font-size:8pt');
				var noOfScouts = getGMcookie("noofscouts", false);
				if (noOfScouts == "false") {
					setGMcookie("noofscouts", "3", false);
					noOfScouts = "3";
				}
				scoutInput.value = parseInt(noOfScouts);
				bCell.appendChild(scoutInput);
				aRow.appendChild(bCell);
				//insert save option to change the setup option directly from the Rally point -> Send troops page
				var cCell = elem("TD", "&nbsp;<input type='checkbox' id='savescoutnumber' value='1'></input>&nbsp;" + T('SAVE'));
				aRow.appendChild(cCell);
			}
			if (i == 2) {
				//allow selection of fake unit
				var aCell = selectFakeTroopsCell();
				if (aCell != null) {
					aCell.setAttribute('colspan', '2');
					aRow.appendChild(aCell);
				}
			}
			aTable.appendChild(aRow);
		}
		
		insertAfter(header, aTable);
		
		if (boolIsT35 == false) {
			var troopTable = find("//table[@class='f10']", XPFirst);
		} else {
			var troopTable = find("//table[@class='troops']", XPFirst);
			if (troopTable == null) {
				var troopTable = find("//table[@class='dashed']", XPFirst);
			}
		}
		//fix for unusual icons appearing under the list of villages - Thank you, fr3nchlover !
		var tags7 = find("//div[@id='" + dmid2 + "']//td[@class='s7']", XPFirst);
        if ((boolIsT35 == false && troopTable != null && !tags7) || (boolIsT35 == true && troopTable != null)) {			
			//add the "clear all" button
			var aRow = elem("TR", "");
			var delCell = newCell("", [['align', 'center'], ['colspan', '12']]);
			var clAllLink = elem("A", "<img src='" + image["delButton"] + "' title='" + T('MTCLEARALL') + "' alt='" + T('MTCLEARALL') + "'>");
			clAllLink.href = jsVoid;
			clAllLink.addEventListener("click", clearAllTroops, false);
			delCell.appendChild(clAllLink);
			aRow.appendChild(delCell);
			troopTable.appendChild(aRow);
			var minLabel = " (* = " + T('MIN') + ")";
			
			
			//add additional table as requested by users
			if (boolIsT35 == false) {
				var parX = find("//table[@class='p1']", XPFirst);
			} else {
				var parX = troopTable;
			}
			//log(3, "parX = " + parX);
			if (parX) {
				
	      		var attdefTable = newTable([['class', 'tbg'], ['cellspacing', '1'], ['cellpadding', '2']]);
				
	      		var hRow = newRow("", [['class', 'rbg']]);
	      		var hCell = newCell(T('STATISTICS') + minLabel, [['colspan', '4'], ['style', 'font-weight:bold;']]);
	      		hRow.appendChild(hCell);
	      		attdefTable.appendChild(hRow);
				
	      		//add the total attack, def_i and def_c power for the selected troops
	      		var bRow = newRow("", [['align', docDir[0]]]);
				
	      		var aCell = newCell("<img " + gIcons["att_all"] + "> *", [['id', "troopsattpower"], ['width', "33,3%"]]);
	      		var bCell = newCell("<img " + gIcons["def_i"] + "> *", [['id', "troopsdefipower"], ['colspan', "2"], ['width', "33,3%"]]);
	      		var cCell = newCell("<img " + gIcons["def_c"] + "> *", [['id', "troopsdefcpower"], ['width', "33,3%"]]);
	      		
	      		bRow.appendChild(aCell);
	      		bRow.appendChild(bCell);
	      		bRow.appendChild(cCell);
	      		attdefTable.appendChild(bRow);
	      		var dRow = elem("TR", "");				

	      		//add the total capacity
	      		var dCell = newCell("<img src='" + image["capacity"] + "'>", [['id', 'troopscapacity'], ['align', docDir[0]], ['colspan', "2"], ['width', '50%']]);

	      		//add the crop consumption
	      		var eCell = newCell(gIcons["cropcons"], [['id', 'troopscropconsumption'], ['align', docDir[0]], ['colspan', "2"], ['width', '50%']]);
				
	      		dRow.appendChild(dCell);
	      		dRow.appendChild(eCell);
	      		attdefTable.appendChild(dRow);

	      		var aDiv = elem("DIV", "");
	      		var pX = elem("P", "");
	      		aDiv.appendChild(pX);
	      		aDiv.appendChild(attdefTable);
				//var pMin = elem("P", minLabel);
				//pMin.setAttribute('style', 'font-size:8pt;');
				//aDiv.appendChild(pMin);
	      		insertAfter(parX, aDiv);
	      	}
		}
		
		function addUpdateTroopsPower(i, troopLink) {
			return function() {
				var aNo = parseInt(troopLink.textContent.replace("(", "").replace(")", ""));
				//log(3, "aNo = " + aNo);
				var troopInput = get("t" + i);
				if (troopInput) {
					troopInput.value = aNo;
					updateTroopsPower();
				}
			}
		}
		
		function updateTroopsPower() {
			var totals = [["troopsattpower", "att_all", 5, 0], ["troopsdefipower", "def_i", 6, 0], ["troopsdefcpower", "def_c", 7, 0], ["troopscapacity", "capacity", 4, 0], ["troopscropconsumption", "img5", 9, 0]];
			for (var i = 1; i < 11; i++) {
				var troopInput = get("t" + i);
				if (troopInput) {
				if (boolIsT35 == false) {
					var troopTypeImg = troopInput.parentNode.previousSibling.firstChild.src;
					var xi = troopTypeImg.lastIndexOf("/");
					troopTypeImg = troopTypeImg.substring(xi + 1);
					xi = troopTypeImg.lastIndexOf(".");
					var troopType = troopTypeImg.substring(0, xi);
				} else {
					var troopTypeImg = troopInput.parentNode.childNodes[1].className;
					var arrTroopType = troopTypeImg.split(" ");
					var troopType = parseInt(arrTroopType[1].replace("u", ""));
				}
					
					if (troopInput.value != "") {
						var troopTypeNo = parseInt(troopInput.value);
						for (var j = 0; j < 5; j++) {
							totals[j][3] += troopTypeNo * uc[parseInt(troopType)][totals[j][2]];
						}
					}
				}
			}
			for (var j = 0; j < 5; j++) {
				var aCell = get(totals[j][0]);
				if (aCell) {
					var imgPath;
					var strX = " *";
					switch (j) {
						case 0:
						case 1:
						case 2: imgPath = gIcons[totals[j][1]]; break;
						case 3: imgPath = "src='" + image["capacity"] + "'"; strX = ""; break;
						case 4: imgPath = gIcons["cropcons"]; strX = ""; break;
					}
					aCell.innerHTML = "<img " + imgPath + ">" + strX + " " + totals[j][3].toLocaleString();
				}
			}
			return;
		}
		
		function clearAllTroops() {
			for (var i = 1; i < 12; i++) {
				var troopInput = get("t" + i);
				if (troopInput) troopInput.value = '';
			}
			updateTroopsPower();
			return;
		}
		
		function getTroopInputFields() {
			var nodeRes;
			if (boolIsT35 == false) {
				nodeRes = find("//table[@class='p1']//table[@class='f10']//input[@type='text']", XPList);
				if (nodeRes == null || nodeRes.snapshotLength == 0) {
					nodeRes = find("//table[@class='p1']//table[@class='f10']//input[@type='Text']", XPList);
				}
			} else {
				nodeRes = find("//form[@name='snd']//table//input[@type='text' and not (@name='x') and not (@name='y')]", XPList);
				//log(3, "nodeRes = " + nodeRes);
				if (nodeRes == null || nodeRes.snapshotLength == 0) {
					nodeRes = find("//form[@name='snd']//table//input[@type='Text' and not (@name='x') and not (@name='y')]", XPList);
				}
			}
			return nodeRes;
		}
		
		function getTroopInputMaxFields() {
			var nodes;
			if (boolIsT35 == false) {
				nodes = find("//table[@class='p1']//table[@class='f10']//a", XPList);
			} else {
				nodes = find("//form[@name='snd']//table//a", XPList);
			}
			return nodes;
		}
		
		function getAllTroops() {
			log(3, "getAllTroops; boolIsT35 = " + boolIsT35);
			var nodeRes = getTroopInputFields();
			//log(4, "nodeRes.snapshotLength = " + nodeRes.snapshotLength);
			//clear all the input fields
			for (var i = 0; i < nodeRes.snapshotLength; i++) {nodeRes.snapshotItem(i).value = ""; }
			var troopsForm = document.forms.namedItem("snd");
			var nodes = getTroopInputMaxFields();
			//log(3, "nodes.snapshotLength = " + nodes.snapshotLength);
			if (nodes.snapshotLength > 1) {
				for(var i = 0; i < nodes.snapshotLength; i++) {
					var node = nodes.snapshotItem (i);
					if (node.getAttribute("onClick")) {
						node.getAttribute("onClick").search(/document\.snd\.(.*)\.value=(.*); return false;/);
						var inputName = RegExp.$1;
						var troopValue = RegExp.$2;
						var troopInput = troopsForm.elements.namedItem(inputName);
						troopInput.value = troopValue;
					}
				}
				updateTroopsPower();
			} else {
				alert(T('NOTROOPS'));
			}
		}
		
		function getScout() {
			var indCol = ((getGMcookie('raceV2', false) == "Gauls") ? 't3' : 't4');
			var nodeRes = getTroopInputFields();
			//clear all the input fields
			for (var i = 0; i < nodeRes.snapshotLength; i++) { nodeRes.snapshotItem(i).value = ""; }
			
			//set the attack:raid as action
			var rbAction = find("//input[@value='4' and @name='c']", XPFirst);
			if (rbAction) {rbAction.checked = true;}
			
			var troopsForm = document.forms.namedItem("snd");
			var nodeScout = document.evaluate("//table[@class='p1']//table[@class='f10']//a[contains(@onclick, '" + indCol + "')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (nodeScout.snapshotLength != 0) {
				var node = nodeScout.snapshotItem (0);
				node.getAttribute("onClick").search(/document\.snd\.(.*)\.value=(.*); return false;/);
				var inputName = RegExp.$1;
				if (inputName != 't9' && inputName != 't10') {
					var scoutInput = troopsForm.elements.namedItem(inputName);
					var inputNoOfScouts = get('selectscoutnumber');
					if (inputNoOfScouts) {
						scoutInput.value = parseInt(inputNoOfScouts.value);
					} else {
						scoutInput.value = 3;
					}
					var scoutSave = get('savescoutnumber');
					if (scoutSave) {
						if (scoutSave.checked == true) {
							setGMcookie("noofscouts", scoutInput.value, false);
						}
					}
					updateTroopsPower();
				}
			} else {
				alert(T('NOTROOP2SCOUT'));
			}
		}
		
		function getFakeUnitV2() {
			//var indCol = ((getRace() == "Gauls") ? 't3' : 't4');
			var indCol = ((crtUserRace == "Gauls") ? 't3' : 't4');
			var nodeRes = getTroopInputFields();
			//remove previously selected units
			for (var i = 0; i < nodeRes.snapshotLength; i++) { nodeRes.snapshotItem(i).value = ""; }
			
			//set the attack:normal as action
			var rbAction = find("//input[@value='3' and @name='c']", XPFirst);
			if (rbAction) {rbAction.checked = true;}
			
			//var nodeUnits = document.evaluate("//table[@class='p1']//table[@class='f10']//a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			var nodeUnits = getTroopInputMaxFields();
			if (nodeUnits.snapshotLength > 1) {
				var chk = false;						
				for (var xi = 1; xi < 9; xi++) {
					var faketroopselected = get("faketroop_" + xi);
					if (faketroopselected) {
						if (faketroopselected.checked) {
							var faketroopavailable = get('troopsav_' + xi);
							if (faketroopavailable) {
								//there are units available from selected fake troop type
								var aInput = get("t" + xi);
								if (aInput) {
									aInput.value = 1;
									chk = true;
								}
							}
						}
					}
				}
				log(3, "chk = " + chk);
				if (chk == false) {
					//no troops for fake selected or nothing availabe => use default
					var tTroop = 2;
					var faketroopavailable = get('troopsav_2');
					//log(3, "faketroopavailable = " + faketroopavailable);
					if (faketroopavailable == null) {
						log(3, "faketroopavailable = null");
						faketroopavailable = get('troopsav_1');
						tTroop = 1;
					}
					//log(3, "faksetroopavailable (1st or 2nd search) = " + faketroopavailable);
					if (faketroopavailable != null) {
						var aInput = get("t" + tTroop);
						if (aInput) {
							aInput.value = 1;
							chk = true;
						}
					}
				}
				if (chk == false) {
					alert(T('NOSCOUT2FAKE'));
				} else {
					updateTroopsPower();
				}
			} else {
				alert(T('NOTROOPS'));
			}
		}
	}

	function getOasisTroopsInfoTable(tNTroops, boolFromMap) {
		//log(3, "animalsTable = " + tNTroops);
		if (!tNTroops) return '';
		var tNinfo = [0, 0, 0];
		var toolTipHTML = '';
		var boolFoundInfo = false;
		//log(3, "tNTroops.nodeName = " + tNTroops.nodeName);
		if (tNTroops.rows == null) return toolTipHTML;
		for (var i = 0; i < tNTroops.rows.length; i++) {
			var aRow = tNTroops.rows[i];
			var aImg = aRow.cells[0].firstChild;
			//log(3, "aImg = " + aImg);
			if (aImg.src) {
				if (boolIsT35 == false) {
					var ind = aImg.src.match(/^(.*)img\/un\/u\/(\d+)\.gif$/);
					if (ind.length < 3) return;
					var index = ind.pop();
				} else {
					var arrIndex = aImg.className.split(" ");
					var index = arrIndex[1].replace("u", "");
				}
				if (boolFromMap) {
					if (boolIsT35 == false) {
						toolTipHTML += "<td><img src=" + aRow.childNodes[0].firstChild.src + "></td><td align='" + docDir[1] + "'>" + aRow.cells[1].textContent + "</td></tr>";
					} else {
						toolTipHTML += "<td><img class='" + aImg.className + "' src='img/x.gif'></td><td align='" + docDir[1] + "'>" + aRow.cells[1].textContent + "</td></tr>";
					}
				}
				var tNo = parseInt(aRow.cells[1].textContent);
				//var tNo = parseInt(aRow.childNodes[1].textContent);
				//log(3, "tNo = " + tNo);
				tNinfo[0] += tNo * uc[index][6];
				tNinfo[1] += tNo * uc[index][7];
				tNinfo[2] += tNo * uc[index][9];
				boolFoundInfo = true;
			} else {
				if (boolFromMap) {
					toolTipHTML += "<td>" + aRow.cells[0].textContent + "</td></tr>";
				}
			}
			//toolTipHTML += "</tr>";
		}
		if (boolFoundInfo == true) {
			if (tNinfo[0] != 0 + tNinfo[1] + tNinfo[2] > 0) {
				var strTextAlign = docDir[0];
				if (boolFromMap == true) {
					toolTipHTML += "<tr><td>&nbsp;</td></tr>";
					strTextAlign = docDir[1];
				}
				toolTipHTML += "<tr><td><img " + gIcons["def_i"] + " border='0'></td><td align='" + docDir[1] + "'" + " style='text-align:" + strTextAlign + ";'" + ">&nbsp;" + tNinfo[0] + "</td></tr>";
				toolTipHTML += "<tr><td><img " + gIcons["def_c"] + " border='0'></td><td align='" + docDir[1] + "'" + " style='text-align:" + strTextAlign + ";'" + ">&nbsp;" + tNinfo[1] + "</td></tr>";
				toolTipHTML += "<tr><td>" + gIcons["cropcons"] + "</td><td align='" + docDir[1] + "'" + " style='text-align:" + strTextAlign + ";'" + ">&nbsp;" + tNinfo[2] + "</td></tr>";
			}
		}
		return toolTipHTML;
	}
	
	function addTroopTimes() {
		//append the distance and time for the case the user opened a cell from the map
		log(3, "TB3O.xCrt = " + TB3O.xCrt + "; TB3O.yCrt = " + TB3O.yCrt);
		if (TB3O.xCrt != -1000 && TB3O.yCrt != -1000 && TB3O.boolShowDistTimes == "1") {
			log(3, "start addTroopTimes");
			var lastRowActions = null;
			//lastRowActions = find("//div[@class='map_details_actions']//table[@class='f10' and @width='100%']/tbody/tr[3]", XPFirst);
			//if (lastRowActions == null) lastRowActions = find("//div[@class='map_details_actions']//table[@class='f10' and @width='100%']/tbody/tr[2]", XPFirst);
			//if (lastRowActions == null) lastRowActions = find("//div[@class='map_details_actions']//table[@class='f10' and @width='100%']//tr", XPFirst);
			var idType = '@id';
			if (boolIsT35 == false) idType = '@class';
			var strToEvaluate = "//div[" + idType + "='map_details_actions']//table/tbody/tr[3]";
			lastRowActions = find(strToEvaluate, XPFirst);
			if (lastRowActions == null) {
				strToEvaluate = "//div[" + idType + "='map_details_actions']//table/tbody/tr[2]";
				lastRowActions = find(strToEvaluate, XPFirst);
			}
			if (lastRowActions == null) {
				strToEvaluate = "//div[" + idType + "='map_details_actions']//table//tr";
				lastRowActions = find(strToEvaluate, XPFirst);
			}
			if (lastRowActions != null) {
				createTimeTroopTable(lastRowActions, TB3O.xCrt, TB3O.yCrt, true);
				var imgOasis = get("resfeld");
				if (imgOasis == null) imgOasis = find("//img[starts-with(@id, 'w')]", XPFirst);
				//log(3, "imgOasis = " + imgOasis);
				if (imgOasis != null) {
					//we are probably inside an oasis
					if (boolIsT35 == false) {
						var tNTroops = find("//table[@class='f10']", XPFirst);
					} else {
						var tNTroops = find("//div[@id='map_details_troops']//table", XPFirst);
					}
					//log(3, "tNTroops = " + tNTroops);
					if (tNTroops) {
						if (boolIsT35 == false) {
							var tNTroopsS = tNTroops.childNodes[0];
						} else {
							var tNTroopsS = tNTroops.childNodes[1];
						}
						//log(3, "tNTroopsS = " + tNTroopsS);
						//tNTroopsS = tNTroops;
						var tNInfo = getOasisTroopsInfoTable(tNTroopsS, false);
						if (tNInfo != '') {
							tNInfo = "<table class='b' cellpadding='0' cellspacing='0' border='0' width='100px'>" + tNInfo + "</table>";
							var aPar = elem("P");
							aPar.innerHTML = tNInfo;
							tNTroops.parentNode.appendChild(aPar);	
						}
					}
				}
			}
		}
	}

	/**
	 * Convierte todos los enlaces a la propia pagina del tipo "#" como enlaces vacios de javascript
	 */
	function changeHashLinksToJsVoid(){
		var aX = find("//a[@href='#']", XPList);
		for (var i = 0; i < aX.snapshotLength; i++) aX.snapshotItem(i).href = jsVoid;
	}	

	//Compute the total time needed for the script to run
	function displayTBTotalRuntime(){
		var div = find("//div[@id='ltime']/br", XPFirst);
		if (div) {
			TB3O.TBEndTime = new Date().getTime();
	        var timeval = TB3O.TBTotalRunTime();
	        var tbtime = elem("span", " | Travian Beyond time: " + timeval + " ms");
	        tbtime.setAttribute("class","b");
			tbtime.setAttribute("style", "z-index: 2; color: #FFFFFF;");
			div.parentNode.style.width="400px";
			div.parentNode.insertBefore(tbtime, div);
		}
	}

	function installMapEventHandler() {
		//log(3, "installMapEventHandler");	
		log(3, "boolIsT35 = " + boolIsT35);
		for (var i = 1; i < 50; i++) {
			var k1 = (i - 1) % 7;
			var k2 = Math.floor((49 - i) / 7);
			var area = get("a_" + k1 + "_" + k2);
			var mevobj = createMapInfoObjV2(area, i - 1);
			if (TB3O.origMap == true) {
				area.addEventListener("mouseover", mevobj.mouseOverEvent, false);
				area.addEventListener("mouseout",  mevobj.mouseOutEvent, false);
			}
		}
		//log(3, "installMapEventHandler end");
	}

	function showFieldInfoInTooltip(newdid, fieldtype, animalsTable) {
		var tooltipDiv = get("tb_tooltip");
		var typeDisplayTooltip = "none";
		if (fieldtype != 0) {
			//a map cell or a village
			var tmTableHTML = "";
			var toolTipHTML = "<table class='f8' cellpadding='0' cellspacing='0' border='0'>";
			//log(3, "fieldtype = " + fieldtype);
			if (fieldtype != null) {
				//there are 12 types of cells
				var dist = [[3, 3, 3, 9], [3, 4, 5, 6], [4, 4, 4, 6], [4, 5, 3, 6], [5, 3, 4, 6], [1, 1, 1, 15], [4, 4, 3, 7], [3, 4, 4, 7], [4, 3, 4, 7], [3, 5, 4, 6], [4, 3, 5, 6], [5, 4, 3, 6]];
				var info = dist[fieldtype-1];
				toolTipHTML += "<tr><td colspan='2'>";
				//for (var i = 1; i < 5; i++) toolTipHTML += '<img ' + gIcons["r" + i] + ' width="18" height="12" border="0" title="' + T('RECURSO' + i) + '" alt="' + T('RECURSO' + i) + '">' + info[i-1] + ' ';
				for (var i = 1; i < 5; i++) toolTipHTML += gIcons["r" + i] + " " + info[i-1] + ' ';
				toolTipHTML += "</td></tr>";
				toolTipHTML += "<tr><td>&nbsp;</td></tr>";
			}
			if (TB3O.boolShowDistTimes == "1") {
				tmTableHTML = getTroopMerchantTooltipHTML(newdid, "blue", false, true, true);
			}
			typeDisplayTooltip = "block";
			tooltipDiv.innerHTML = toolTipHTML + tmTableHTML + "</table>";
			tooltipDiv.style.display = typeDisplayTooltip;
		} else {
			//this is an oasis
			var toolTipHTML = getOasisTroopsInfoTable(animalsTable, true);
			//log(3, "toolTipHTML = " + toolTipHTML);
			if (toolTipHTML != '') {
				typeDisplayTooltip = "block";
				if (TB3O.boolShowDistTimes == "1") toolTipHTML += "<tr><td>&nbsp;</td></tr>";
				toolTipHTML = "<table class='f8' cellpadding='0' cellspacing='0' border='0'>" + toolTipHTML;
			}
			toolTipHTML += getTroopMerchantTooltipHTML(newdid, "blue", false, false, true) + "</table>";
			tooltipDiv.innerHTML = toolTipHTML;
			tooltipDiv.style.display = typeDisplayTooltip;
		}
		
	}
	
	function createMapInfoObjV2(area, pos) {
		//log(3, "createMapInfoObj");
		var mev = new Object();
		mev.area = area;
		mev.pos = pos;
		mev.timeout = 0;
		mev.mouseOverEvent = function() {
			var strRegExp1 = false;
			var strRegExp2 = false;
			mev.area.removeAttribute("title");
			var crtPos = mev.area.href.match(/d=(\d+)/).pop();
			//log(3, "crtPos = " + crtPos);
			if (boolIsT35 == false) {
				mev.pict = get("i_"+ area.id.substring(2)).src;
				if (mev.pict.match(/\/(d|t)\d*.gif$/)) {
					strRegExp1 = true;
				} else if (mev.pict.match(/\/(o)\d*.gif$/)) strRegExp2 = true;
				//all AJAX requests
				if (boolShowCellTypeInfo == '1')  {
						mev.timeout = setTimeout(function() {
							ajaxRequest(mev.area.href, "GET", null, function(t) {if (mev.timeout!=0) processMapCell(t, mev, crtPos)}, dummy); }, 300)
				} else {
					if (strRegExp1 == true) {
						showFieldInfoInTooltip(crtPos, null);
					} else if (strRegExp2 == true) {
						showFieldInfoInTooltip(crtPos, null);
					}
				}
			} else {
				if (boolShowCellTypeInfo == '1') {
					if (TB3O.origMap == true) {
						//this is the case where the user just opened the map
						var kx = area.id.substring(2).split("_");
						var origFieldType = unsafeWindow.m_c;
						var fieldtype = origFieldType.ad[kx[0]][kx[1]][2];
						if (fieldtype != 0) {
							//this is an empty cell or a village
							showCellInfo(mev.pos + 1, fieldtype);
							showFieldInfoInTooltip(crtPos, fieldtype);
						} else {
							//this is an oasis
							if (mev.area.href != '') {
								mev.timeout = setTimeout(function() {
									ajaxRequest(mev.area.href, "GET", null, function(t) {if (mev.timeout != 0) processMapCell(t, mev, crtPos)}, dummy); }, 300);
							}
						}
					} else {
						//we try to use the map_infobox
						var mapInfoBox = get("map_infobox");
						if (mapInfoBox != null) {
							var aRowContent = mapInfoBox.rows[0].textContent;
							if (aRowContent.indexOf(":") != -1 && aRowContent.indexOf("-")) {
								var strType = aRowContent.split(": ");
								if (strType.length > 1) {
									var fieldtype = showCellInfo(mev.pos + 1, strType[1]);
									showFieldInfoInTooltip(crtPos, fieldtype);
								}
							} else {
								//second alternative - to generate AJAX requests to get the information
								mev.timeout = setTimeout(function(){
									ajaxRequest(mev.area.href, "GET", null, function(t) {if (mev.timeout!=0) processMapCell(t, mev, crtPos)}, dummy); }, 300);
								}
						} else {
							//second alternative - to generate AJAX requests to get the information
							mev.timeout = setTimeout(function(){
								ajaxRequest(mev.area.href, "GET", null, function(t) {if (mev.timeout!=0) processMapCell(t, mev, crtPos)}, dummy); }, 300);
						}
					}
				} else {
					//show only distance and time
					showFieldInfoInTooltip(crtPos, null);
				}
			}
		}
		mev.mouseOutEvent = function(){ clearTimeout(mev.timeout); mev.timeout = 0; get("tb_tooltip").style.display = 'none'; }
		mev.scan = function(){ ajaxRequest(mev.area.href, "GET", null, function(t) {processMapCell(t, mev, null);}, dummy); }
		//log(3, "createMapInfoObj end");
		return mev;
	}
	
	function showCellInfo(pos, aType) {
		var celldiv = get('map_info_' + pos);
		if (celldiv != null) {
			if (typeof(aType) == 'string') {
				if (aType.indexOf("-") != -1) {
					switch(aType) {
						case "3-3-3-9": aType = 1; break;
						case "3-4-5-6": aType = 2; break;
						case "4-4-4-6": aType = 3; break;
						case "4-5-3-6": aType = 4; break;
						case "5-3-4-6": aType = 5; break;
						case "1-1-1-15": aType = 6; break;
						case "4-4-3-7": aType = 7; break;
						case "3-4-4-7": aType = 8; break;
						case "4-3-4-7": aType = 9; break;
						case "3-5-4-6": aType = 10; break;
						case "4-3-5-6": aType = 11; break;
						case "5-4-3-6": aType = 12; break;
					}
				}
			}
			if (aType < 13) {
				var addSpace = '';
				if (boolIsT35 == true) {
					addSpace = '&nbsp;';
					var itext=['', addSpace + '9', gIcons["r3"], addSpace + '6', gIcons["r2"], gIcons["r1"], '15', addSpace + '7', addSpace + '7', addSpace + '7', gIcons["r2"], gIcons["r3"], gIcons["r1"]];
				} else {
					var itext=['', '(9)', gIcons["r3"], '(6)', gIcons["r2"], gIcons["r1"], '(15)', '(7)', '(7)', '(7)', gIcons["r2"], gIcons["r3"], gIcons["r1"]];
				}
				celldiv.innerHTML = itext[aType];
				if (boolIsT35 == true) {
					celldiv.setAttribute("style", "position:relative; height:16px; width:20px; left:31px; top:45px; z-index:90; border:solid 1px #00C000; background-color: #FEFFE3; -moz-border-radius: 10px;");
				}
			}
		}
		return aType;
	}
	
	function processMapCell(t, mev, crtPos) {
		log(3, "start processMapCell");
		var fieldType;
		var ans = document.createElement('DIV');
		ans.innerHTML = t.responseText;
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);
		
		if (boolIsT35 == false) {
			var aField = ansdoc.evaluate("//img[@id='resfeld']", ans, null, XPFirst, null).singleNodeValue;
			if (aField != null) {
				aField = aField.src.search(/\/w(\d+)\.jpg$/);
			} else if (aField == null) {
				aField = ansdoc.evaluate("//img[starts-with(@id, 'w')]", ans, null, XPFirst, null).singleNodeValue;
			}
		
			if (aField != null) {
				//this is an oasis and we're going to evaluate the animals inside
				if (crtPos != null) {
					var animalsTable = ansdoc.evaluate("//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
					if (animalsTable != null) animalsTable = animalsTable.childNodes[0]; //we need only the table not the body
					fieldType = 0;
					showFieldInfoInTooltip(crtPos, 0, animalsTable);
				}
			} else {
				aField = ansdoc.evaluate("//div[starts-with(@id, 'f')]", ans, null, XPFirst, null).singleNodeValue;
				aField.id.search(/f(\d)/);
				var fieldtype = RegExp.$1;
				//this is an empty cell or a village
				showCellInfo(mev.pos + 1, fieldtype);
				if (crtPos != null) {
					showFieldInfoInTooltip(crtPos, fieldtype);
				}
			}
		} else {
			var imgID = ansdoc.evaluate("//img[starts-with(@id, 'f')]", ans, null, XPFirst, null).singleNodeValue;
			log(3, "imgID village = " + imgID);
			if (imgID != null) {
				//a cell or village
				var fieldTypeC = imgID.getAttribute("class");
				if (fieldTypeC == null) {
					fieldType = imgID.getAttribute("alt");
				} else {
					var fieldTypeS = fieldTypeC.replace("f", "");
					fieldType = parseInt(fieldTypeS);
				}
				var fieldtype = showCellInfo(mev.pos + 1, fieldType);
				if (crtPos != null) {
					showFieldInfoInTooltip(crtPos, fieldtype);
				}
			} else {
				//perhaps an oasis
				if (crtPos != null) {
					imgID = ansdoc.evaluate("//img[starts-with(@id, 'w')]", ans, null, XPFirst, null).singleNodeValue;
					log(3, "imgID oasis = " + imgID);
					if (imgID != null) {
						var animalsTable = ansdoc.evaluate("//div[@id='map_details_troops']//table", ans, null, XPFirst, null).singleNodeValue;
						if (animalsTable) animalsTable = animalsTable.childNodes[1]; //we need only the table not the body
						showFieldInfoInTooltip(crtPos, 0, animalsTable);
						fieldType = 0;
					}
				}
			}
		}
		return fieldType;
	}
	
	function getRallyPointDefaultActionArray() {
		var arrAction = ['def1', T('ATTACKTYPE2')];
		var rallypointDefaultAction = getGMcookie('rpdefact', false);
		if (rallypointDefaultAction != "false") {
			switch (parseInt(rallypointDefaultAction)) {
				case 1: arrAction[0] = "att_all"; arrAction[1] = T('ATTACKTYPE3'); break;
				case 2: arrAction[0] = "att_all"; arrAction[1] = T('ATTACKTYPE4'); break;
				default: arrAction[0] = "def1"; arrAction[1] = T('ATTACKTYPE2'); break;
			}
		}
		return arrAction;
	}
	
	function getTroopMerchantTooltipHTML(newdid, aColor, addCoords, addMTime, addTTime, boolAllRaces) {
		var iHTML = "";
		var properAlign = docDir[1];
		var xyCoord = id2xy(newdid).split("|");
		var qDist = getDistance(parseInt(xyCoord[0]), parseInt(xyCoord[1]), TB3O.xActive, TB3O.yActive);
		//add the distance row
		if (aColor == undefined) aColor = 'black';
		var strDist = '';
		
		var aRow = elem("TR", "");
		var aCell = newCell("", [["style", 'font-size:8pt; color:' + aColor + "; text-align:" + docDir[0] +";"]]);
		var imgDist = newImage([['src', image["dist" + docDir[0].substr(0,1)]]]);
		aCell.appendChild(imgDist);
		aRow.appendChild(aCell);
		
		if (qDist != 0) {
			strDist = qDist.toFixed(2);
			var bCell = newCell(strDist, [["style", 'font-size:8pt; color:' + aColor + "; text-align:" + properAlign +";"]]);
			aRow.appendChild(bCell);
			
			strDist = "";
			if (addCoords != undefined) {
				if (addCoords == true) {
					strDist = "(" + TB3O.xActive + "|" + TB3O.yActive + ") " + "<img src= '" + image["dist" + docDir[0].substr(0,1)] + "'>" + " (" + xyCoord[0] + "|" + xyCoord[1] + ")"; 
				}
			}
			if (strDist != "") {
				c1Cell = newCell("&nbsp;&nbsp;");
				var intCols = '1';
				if (boolAllRaces == true) intCols = '4';
				cCell = newCell(strDist, [["style", 'font-size:8pt; color:' + aColor + "; text-align:" + properAlign +";"], ['colspan', intCols]]);
				aRow.appendChild(c1Cell);
				aRow.appendChild(cCell);
			}
			
			iHTML = "<tr>" + aRow.innerHTML;
			iHTML += "</tr>";
		} else {iHTML = '';}
		
		if (strDist != '') strDist = "<td></td>";
		//var crtUserRace = getRace();
		if (crtUserRace != "false" && qDist != 0) {
			if (crtUserRace == "Romans") {
				var arrRaces = ["Teutons", "Gauls"];
			} else if (crtUserRace == "Teutons") {
				var arrRaces = ["Romans", "Gauls"];
			} else if (crtUserRace == "Gauls") {
				var arrRaces = ["Romans", "Teutons"];
			}
			var aColspan = '';
			var aAlign = '';
			if (addTTime == true) {
				aColspan = "colspan='2' ";
				aAlign = "align='center' ";
			}
			var clockCell = "<td " + aColspan + aAlign + gIcons["clock"] + "</td> ";
			if (addTTime == true) {
				//add the clock row
				iHTML += "<tr>" + clockCell;
				clockCell = '';
				if (boolAllRaces == true) iHTML += "<td colspan='6'</td>";
				iHTML += "</tr>";
			}
			
			if (addMTime == true) {
				//add the merchant row
				var aTime = getMTime(qDist, crtUserRace);
				aMalign = docDir[1];
				if (addTTime == false) aMalign = docDir[0];
				iHTML += "<tr>" + clockCell + "<td><img src='" + image["merchant"] + "'></td><td style='color:blue;' align='" + aMalign +"'>" + formatTime(aTime) + " h</td>" + strDist;
				if (boolAllRaces) {
					aTime = getMTime(qDist, arrRaces[0]);
					aMalign = docDir[1];
					iHTML += "<td><img src='" + image["merchant"] + "'></td><td style='color:blue;' align='" + aMalign +"'>" + formatTime(aTime) + " h</td><td>&nbsp;&nbsp;&nbsp</td>";
					
					aTime = getMTime(qDist, arrRaces[1]);
					aMalign = docDir[1];
					iHTML += "<td><img src='" + image["merchant"] + "'></td><td style='color:blue;' align='" + aMalign +"'>" + formatTime(aTime) + " h</td>";
				}
				iHTML += "</tr>";
			}
			if (addTTime == true) {
				//add the troop rows
				var arX = getTroopsDetails(qDist, crtUserRace);
				var arY = getTroopsDetails(qDist, arrRaces[0], true);
				var arZ = getTroopsDetails(qDist, arrRaces[1], true);
				for (iTroopType = 0; iTroopType < 10; iTroopType++) {
					var imgNo = iTroopType + arX[3];
					var imgName = "src='" + gIcons["u" + imgNo] + "'"; 
					if (boolIsT35 != false) imgName = "class='unit u" + imgNo + "' src='img/x.gif'";
					var aTime = getTTime(iTroopType, crtUserRace, arX);
					//log(4, strDist);
					iHTML += "<tr><td><img " + imgName + "></td><td align='" + properAlign + "'>" + "&nbsp;" + formatTime(aTime) + " h</td>" + strDist;
					if (boolAllRaces) {
						var imgNo = iTroopType + arY[3];
						//var imgName = img("u/" + imgNo) + ".gif";
						var imgName = "src='" + gIcons["u" + imgNo] + "'"; 
						if (boolIsT35 != false) imgName = "class='unit u" + imgNo + "' src='img/x.gif'";
						var aTime = getTTime(iTroopType, arrRaces[0], arY);
						iHTML += "<td><img " + imgName + "></td><td align='" + properAlign +"'>" + "&nbsp;" + formatTime(aTime) + " h</td><td>&nbsp;&nbsp;&nbsp</td>";
						
						var imgNo = iTroopType + arZ[3];
						//var imgName = img("u/" + imgNo) + ".gif";
						var imgName = "src='" + gIcons["u" + imgNo] + "'"; 
						if (boolIsT35 != false) imgName = "class='unit u" + imgNo + "' src='img/x.gif'";
						var aTime = getTTime(iTroopType, arrRaces[1], arZ);
						//log(4, strDist);
						iHTML += "<td><img " + imgName + "></td><td align='" + properAlign +"'>" + "&nbsp;" + formatTime(aTime) + " h</td>";
					}
					iHTML += "</tr>";
				}
			}
		}
		return iHTML;
	}

	//update tooltip position
	function updateTooltip(e){
		//log(3, "updateTooltip");
		var div = get("tb_tooltip");
		var xTooltip = (e.pageX + 8);
		var yTooltip = (e.pageY + 8);
		var divHeight = div.clientHeight;
		div.style.left = xTooltip + "px";
		if (yTooltip + divHeight > windowheight) yTooltip = yTooltip - divHeight;
		div.style.top = yTooltip + "px";
	}

	function createTooltip(){
		//log(3, "createTooltip");
		var div = elem("DIV");
		div.setAttribute("id", "tb_tooltip");
		div.setAttribute("style", "position:absolute; display: block; padding: 4px; z-index: 900; border: solid 1px #00C000; background-color: #FEFFE3; display: none;");
		document.body.appendChild(div);
		document.addEventListener("mousemove", updateTooltip, 0);
		//log(3, "createTooltip end");
	}
	
	function reloadMapFunctions() {
		TB3O.origMap = false;
		mapFunctions();
	}
	
	// Map functions
	function mapFunctions() {
		var aTimeOut = getRandomTimeRange(1200);
		var allArrows = find("//area[starts-with(@id, 'ma_n')]", XPList);
		for (var xi = 0; xi < allArrows.snapshotLength; xi++) {
			if (TB3O.origMap == true) {
				//log(3, "TB3O.origMap = " + TB3O.origMap + " => addEventListener");
				allArrows.snapshotItem(xi).addEventListener('click', reloadMapFunctions, false);
			}
		}
	
		//if (get("tb_tooltip") == null) createTooltip();
		var mapcontent = get('map_content');
		//var casillas = find("//div[@class='mdiv' and @style='z-index: 2;']/img", XPList, mapcontent); // areatypeimage
		var areas = find("//map//area[@shape='poly' and (@coords)]", XPList, mapcontent);
		if (areas.snapshotLength > 0 && boolShowCellTypeInfo == '1') genMapCellInfoDivs();
		
		//the village/player/oasis table needs a delay because maps are loaded via AJAX requests
		setTimeout(genMapTable, aTimeOut);
		//recompute the title of the browser because of clicking the arrows
		setTimeout(getCrtLocation, aTimeOut);
		addMapScanLink();
		document.addEventListener("mousemove", updateTooltip, 0);
		installMapEventHandler();

		//the functions needed for the map
		function mapScan() {
			//var mapcontent = get('map_content');
			var j = 0;
			for(var i=1; i < 50; i++) {
				if (get('map_info_' + i).innerHTML == '') {
					var k1 = (i - 1) % 7;
					var k2 = Math.floor((49-i)/7);
					if (get("i_" + k1 + "_" + k2).src.match(/\/(d|t)\d*.gif$/)) {
						var area = get("a_" + k1 + "_" + k2);
						var mevobj = createMapInfoObjV2(area, i-1);
						setTimeout(mevobj.scan, j * 600 + getRandomTimeRange(600));
						j++;
					}
				}
			}
		}

		function addMapScanLink() {
			if (get('map_opts')) removeElement(get('map_opts'));
			if (boolShowCellTypeInfo == '1' && boolIsT35 == false) {
				// create the "Scan the Map" link
				var b = find("//form[@method='post']", XPFirst).parentNode;
				var ctable = newTable([["id", "map_opts"]]);
				var ctbody = document.createElement("TBODY");
				var mapScanA = newLink(T('MAPSCAN'), [['id', 'mapscan'], ['href', jsVoid]]);
				mapScanA.addEventListener("click", mapScan, 0);
				trc = elem("TR", "");
				tdc = newCell("", [["colspan", '2']]);
				tdc.appendChild(mapScanA);
				trc.appendChild(tdc);
				ctbody.appendChild(trc);
				ctable.appendChild(ctbody);
				b.appendChild(ctable);
			}
		}
		
		//generate the table on the "karte.php" page
		function genMapTable(){
			//log(3, "entering genMapTable");
			//select the correct images and link titles for the reinf/attack icons
			var boolShowMapTable = getGMcookie("showmaptable", false);
			if (boolShowMapTable == 'false') boolShowMapTable = '1';
			if (boolShowMapTable != '1') return;

			var arrAction = getRallyPointDefaultActionArray();

			if (get('tabla_mapa')) removeElement(get('tabla_mapa'));
			var table = newTable([["id", "tabla_mapa"], ["sortCol", -1], ["class", "tbg"], ["align", docDir[0]], ["cellspacing", "1"], ["cellpadding", "2"]]);
			var thead = document.createElement("THEAD");
			var tbody = document.createElement("TBODY");
			var fila = newRow("", [['class', "rbg"]]);
			thead.appendChild(fila);
			table.appendChild(thead);
			var columnLabels = ['PLAYER', 'ALLIANCE', 'ALDEAS', 'POPULATION', 'COORDS', 'MAPTABLEACTIONS'];
			for (var i = 0; i < columnLabels.length; i++){
				if (i < 4){
					var td = newCell(T(columnLabels[i]) + " (<img src='" + image["arrowdown"] + "' width='8' style='cursor:pointer;'><img src='" + image["arrowup"] + "' width='8' style='cursor:pointer'>)", [['title', T('CLICKSORT')], ['style', 'font-size:8pt']]);
					switch(i){
						case 3:
							td.addEventListener("click", sortTable('tabla_mapa', i, 'int'), 0);
							break;
						default:
							td.addEventListener("click", sortTable('tabla_mapa', i), 0);
					}
					td.style.cursor = "pointer";
				} else {
					var td = newCell(T(columnLabels[i]), [['style', 'font-size:8pt']]);
				}
				fila.appendChild(td);
			}
			var boolMapTable = false;
			var area;
			var crtUserName = getCrtUserName();
			for (var i = 0; i < 7; i++) {
				for (var j = 0; j < 7; j++) {
					area = get('a_' + i + '_' + j).wrappedJSObject;
					var cellinfo = area.details;
					if (cellinfo && cellinfo.name != null ) {
						boolMapTable = true;
						//var inforow = elem("TR", "");
						var inforow = newRow("", [['style', 'font-size:8pt']]);
						var aName = cellinfo.name;
						if (cellinfo.name == crtUserName) {
							aName = '<b>' + aName + '</b>';
						}
						inforow.appendChild(newCell(aName, [['style', 'font-size:8pt']]));
						inforow.appendChild(newCell(cellinfo.ally, [['style', 'font-size:8pt']]));
						var aHref = area.href;
						inforow.appendChild(newCell('<a href="' + aHref + '">' + cellinfo.dname + '</a>', [['style', 'font-size:8pt']]));
						inforow.appendChild(newCell(cellinfo.ew, [['style', 'font-size:8pt']]));
						inforow.appendChild(newCell('<a href="' + aHref + '">' + cellinfo.x + " | " + cellinfo.y + '</a>', [['style', 'font-size:8pt']]));
						inforow.appendChild(newCell('<a href="' + aHref.replace("karte.php?d", "a2b.php?z") + '"><img ' + gIcons[arrAction[0]] + ' width="12" title="' + arrAction[1] + '"></a>' + '  ' + '<a href="' + aHref.replace("karte.php?d", "build.php?z") + '&gid=17">' + gIcons["r41"] + '</a>'), [['style', 'font-size:8pt']]);
						tbody.appendChild(inforow);
					}
				}
			}
			table.appendChild(tbody);
			if (boolMapTable == true)  {
				var middleblock = get(dmid);
				var TableY = longitudPantalla(table) + 'px';
				table.style.top = TableY;
				table.style.position = "absolute";
				middleblock.appendChild(table);
			}
		}

		function genMapCellInfoDivs() {
			// not permitted yet for T35
			//if (boolIsT35 == true) return;
			var mapinfoX = get("map_info");
			if (mapinfoX != null) {
				//remove the big DIV
				removeElement(mapinfoX);
			} else {
				//remove all the small DIVs
				for(var i = 1; i < 50; i++) {
					var aCellInfo = get('map_info_' + i);
					if (aCellInfo) removeElement(aCellInfo);
				}
			}
			if (boolIsT35 == false) {
				var mapinfo = document.createElement("div");
				mapinfo.setAttribute("id","map_info");
			}
			
			for(var i = 1; i < 50; i++){
				if (boolIsT35 == false) {
					var divs = elem('div','<div id="map_info_' + i + '" style="position:relative; left:31px; top:54px; z-index:90; border:solid 1px #00C000; background-color: #FEFFE3; -moz-border-radius:10px;"></div>');
					divs.className = 'mt' + i;
					divs.setAttribute("style", "z-index:2;");
					mapinfo.appendChild(divs);
				} else {
					var divs = elem('div','<div id="map_info_' + i + '" style="position:relative; height:1px; width:1px; left:31px; top:45px; z-index:90; border:solid 1px #00C000; background-color: #FEFFE3; -moz-border-radius:10px;"></div>');
					var k1 = (i - 1) % 7;
					var k2 = Math.floor((49-i)/7);
					var mapCell = get("i_" + k1 + "_" + k2);
					mapCell.appendChild(divs);
				}
			}
			if (boolIsT35 == false) {
				var iniCell = get("a_0_6");
				if (iniCell) iniCell.parentNode.appendChild(mapinfo);
			}
		}
	}

	function showOffers(){
		//global/local option provided by Zippo.  Thank you !
		marketSimpleOffer();
		if (!find("//input[@type='hidden' and @name='t' and @value='2']", XPFirst)) return;
		find("//form", XPFirst).setAttribute("name", "sell");

		var a = find("//input[@type='image' and @name='s1']", XPFirst);
		a.addEventListener("click", function(){
			var saveofferoption = document.getElementById('saveofferoption');
			var saveofferglobal = document.getElementById('saveofferglobal');
			var boolSaveOffer = true;
			var boolSaveGlobal = true;
			if (saveofferoption) {
				if (saveofferoption.checked == false) boolSaveOffer = false;
			}
			if (saveofferglobal) {
				if (saveofferglobal.checked == false) boolSaveGlobal = false;
			}
			if (boolSaveOffer) {
				var param = ["m1", "m2", "rid1", "rid2", "d2"];
				var checks = ["d1", "ally"];
				var values = new Array();
				for(var i = 0; i < param.length; i++) eval("values[" + i + "] = find(\"//*[@name='" + param[i] + "']\", XPFirst).value");
				for(var i = 0; i < checks.length; i++){
					try {
						eval("var b = find(\"//*[@name='" + checks[i] + "']\", XPFirst).checked");
						if (b == true) values[i + param.length] = '1'; else values[i + param.length] = '0';
					} catch(e) {}
				}
				if ( ! boolSaveGlobal ) values[7] = villageInfo[1];
				appendGMcookieValue("ventas", values, false);
			}
		}, 0);

		// get offers string
		var strOffers = getGMcookie("ventas", false);
		if (strOffers == "false") strOffers = '';

		var ventas = new Array();
		if (strOffers != ''){
			strOffers = strOffers.split("$$");
			var j = 0;
			for (var i = 0; i < strOffers.length; i++) {
				var strVillage = strOffers[i].split("$")[7];
				if ( strVillage == villageInfo[1] || strVillage == undefined ) {
					ventas[j] = strOffers[i].split("$");
					ventas[j][8] = i;
					j++;
				}
			}
		}

		if (ventas.length > 0){
			var aTable = newTable([["id", "ventas"], ["class", "tbg"], ["align", "center"], ["cellspacing", "1"], ["cellpadding", "2"]]);

			var tr = newRow("", [["class", "rbg"]]);
			var columnas = [T('OFREZCO'), T('BUSCO'), T('MAXTIME'), T('ALLIANCE'), T('VENDER'), T('ELIMINAR')];
			for (var i = 0; i < columnas.length; i++) tr.appendChild(elem("TD", columnas[i]));
			aTable.appendChild(tr);

			for (var i = 0; i < ventas.length; i++){
				var tr = elem("TR", "");
				//var td = elem("TD", '<img ' + gIcons["r" + (ventas[i][2])] + ' width="18" height="12" border="0" title="' + T('RECURSO' + (ventas[i][2])) + '"> ' + ventas[i][0]);
				var td = elem("TD", gIcons["r" + (ventas[i][2])] + ' ' + ventas[i][0]);
				tr.appendChild(td);
				td = elem("TD", gIcons["r" + (ventas[i][3])] + ' ' + ventas[i][1]);
				tr.appendChild(td);
				td = elem("TD", ventas[i][5] == '1' ? ventas[i][4] : T('NO'));
				tr.appendChild(td);
				td = elem("TD", ventas[i][6] == '1' ? T('YES') : T('NO'));
				tr.appendChild(td);

				td = elem("TD", '<a href=' + jsVoid + ' onClick="sell.m1.value=' + ventas[i][0] + ';sell.m2.value=' + ventas[i][1] + ';sell.rid1.value=' + ventas[i][2] + ';sell.rid2.value=' + ventas[i][3] + ';sell.d2.value=' + ventas[i][4] + ';sell.d1.checked=' + (ventas[i][5] == '1') + (ventas[i][6] ? ';sell.ally.checked=' + (ventas[i][6] == '1') : '') + ';sell.submit();"><img src="' + image["buttonOK"] + '" title="' + T('VENDER') + '" alt="' + T('VENDER') + '" border="0"></a>');
				tr.appendChild(td);
				aTable.appendChild(tr);

				//var enlace = elem("A", " <img src='" + gIcons["del"] + "' width='12' height='12' border='0' title='" + T('ELIMINAR') + "'>");
				var enlace = newLink("", [['href', jsVoid]]);
				var delImg = newImage([['src', gIcons["del"]], ['width', '12'], ['height', '12'], ['border', '0'], ['style', 'cursor:pointer'], ['title', T('ELIMINAR')]]);
				//enlace.href = jsVoid;
				enlace.appendChild(delImg);
				enlace.addEventListener("click", removeGMcookieValue("ventas", ventas[i][8] , true, showOffers, false), 0);
				var td = elem("TD", "");
				td.appendChild(enlace);
				tr.appendChild(td);;
			}
			insertAfter(a, aTable);
		}
	}

	function processVillage11(t){
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// newdid of the village
		try {
			ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var newdid = RegExp.$1;
		} catch(e) {
			var newdid = getGMcookie('singleTownNEWDID', false);
		}

		var times = new Array();

		// Atacks
		var casilla = find("//td[@id='aldea" + newdid + "_1_2" + "']", XPFirst);
		//fix provided by MarioCheng !  Thank you ! Will enable detection of attacks even if the div changes from 'ltbw1' to ltbw0'
		var a = ansdoc.evaluate("//div[@id='ltbw0']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (!a) {
			var a = ansdoc.evaluate("//div[@id='ltbw1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		}

		if (a){
			var a = a.firstChild;
			var b = new Array();
			for (var i = 0; i < a.childNodes.length; i++){
				var tr = a.childNodes[i];
				var error = (tr.childNodes.length == 5 ? false : true);
				times.push(tr.childNodes[error ? 9 : 4].textContent.split(" ")[0]);
				b[i] = '<a href="build.php?newdid=' + newdid + '&gid=16" title="' + tr.childNodes[error ? 3 : 1].textContent.split(" ")[1] + '">' + tr.childNodes[error ? 1 : 0].firstChild.innerHTML + "</a>";
			}
			casilla.innerHTML = b.join(" ");
		} else casilla.innerHTML = '-';

		// Buildings in progress
		var casilla = find("//td[@id='aldea" + newdid + "_1_3" + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='lbau1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (a){
			var b = new Array();
			for (var i = 0; i < a.firstChild.childNodes.length; i++){
				times.push(a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0]);
				//b[i] = "<img src='" + img("a/bau.gif") + "' title='" + a.firstChild.childNodes[i].childNodes[1].innerHTML + ' ' + a.firstChild.childNodes[i].childNodes[2].textContent.split(' ')[0] + "'>";
				b[i] = "<img src='" + gIcons["bau"] + "' title=\"" + a.firstChild.childNodes[i].childNodes[1].innerHTML + ' ' + a.firstChild.childNodes[i].childNodes[2].textContent.split(' ')[0] + "\">"; 
			}
			casilla.innerHTML = b.join(" ");
		} else casilla.innerHTML = '-';

		find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b2"];
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='" + dlright1 + "']]", XPFirst).parentNode.firstChild.className = 'c2';

        // Auto Refresh
		if (times.length > 0) {
			var time = Number.POSITIVE_INFINITY;
        	for (var i = 0; i < times.length; i++) {
                times[i] = ComputeSeconds(times[i]);
               	if (times[i] < time) time = times[i];
	        }
        	//setTimeout(createEventRefreshVillageV2(newdid), 1000 * time);
		}
	}


	function processVillage119(t) {
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// newdid of the village
		try {
			ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var newdid = RegExp.$1;
		} catch(e) {
			var newdid = getGMcookie('singleTownNEWDID', false);
		}

		// Baracks,Big barracks, Stable, BigStable, Workshop, Residence/Palace troops training
		var a = ansdoc.evaluate("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@width='5%']", ans, null, XPFirst, null).singleNodeValue;
		if (a){
			var casilla = find("//td[@id='aldea" + newdid + "_1_4" + "']", XPFirst);
			var aTable = a.parentNode.parentNode;
			var troopTraining = getTroopTrainingArray(aTable);
			var intAdd = troopTraining[troopTraining.length - 1][0];

			var iHTML = casilla.innerHTML;
			if (iHTML == "-") iHTML = "";
			var gid = "false";
			for (var xi = 0; xi < troopTraining.length - 1; xi++) {
				if (troopTraining[xi][0] > 0) {
					var imgNo = xi + intAdd;
					//var imgName = img("u/" + imgNo) + ".gif";
					var imgName = "src='" + gIcons["u" + imgNo] + "'"; 
					if (boolIsT35 != false) imgName = "class='unit u" + imgNo + "' src='img/x.gif'";
					if (gid != "" && gid != "false") {
						iHTML += "<a href='build.php?newdid=" + newdid + "&gid=" + gid + "'><img " + imgName + " title='" + troopTraining[xi][0] + "' alt='" + troopTraining[xi][1] + "'> ";
					} else {
						iHTML += "<img " + imgName + " title='" + troopTraining[xi][0] + "' alt='" + troopTraining[xi][1] + "'> ";
					}
				}
			}
			casilla.innerHTML = iHTML;
			setGMcookie("crtgid", "false", false);
		}
	}

	function processVillage2(t){
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// newdid of the village
		try {
			ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var newdid = RegExp.$1;
		} catch(e) {
			var newdid = getGMcookie('singleTownNEWDID', false);
		}

		//Resources
		var resi = new Array();
		var oldresi = new Array();
		var addInt = 2;
		for (i = 4; i > 0; i--) {
			var a = ansdoc.getElementById("l" + i);
			if (a) {
				var crti = a.innerHTML.split("/");
				resi[i] = toNumber(crti[0]);
				var casilla = find("//td[@id='aldea" + newdid + "_2_" + (i - addInt) + "']", XPFirst);
				oldresi[i] = 0;
				if (casilla.innerHTML != "-") oldresi[i] = toNumber(casilla.innerHTML);
				casilla.innerHTML = resi[i].toLocaleString();
				casilla.setAttribute("align", docDir[1]);
				if (Math.abs(resi[i]) > 1000) casilla.setAttribute("style", "font-size:8pt; white-space:nowrap;");
				
				var sumCell = find("//td[contains(@id, 'aldea_s_2_" + (i - addInt) + "')]", XPFirst);
				var sValue = resi[i];
				if (sumCell.innerHTML != "-") sValue += toNumber(sumCell.innerHTML) - oldresi[i];
				sumCell.innerHTML = sValue.toLocaleString();
				if (Math.abs(sValue) > 1000) sumCell.setAttribute("style", "font-size:8pt; white-space:nowrap;");
				
				addInt = addInt - 2;
				if (i == 1) {
					//for the moment crop production/hour to be displayed in the crop consumption cell
					var casilla = find("//td[@id='aldea" + newdid + "_2_6']", XPFirst);
					var vCpH = toNumber(a.getAttribute("title"));
					var oldvCpH = 0;
					if (casilla.innerHTML != "-") oldvCpH = toNumber(casilla.innerHTML);
					casilla.innerHTML = vCpH.toLocaleString();
					casilla.setAttribute("align", docDir[1]);
					if (Math.abs(vCpH) > 1000) casilla.setAttribute("style", "font-size:8pt; white-space:nowrap;");
					if (vCpH < 0) {
						var aStyle = casilla.getAttribute("style");
						aStyle += ' color:red;';
						//casilla.setAttribute('style', 'color:red');
						casilla.setAttribute('style', aStyle);
					}
					var sumCell = find("//td[contains(@id, 'aldea_s_2_6')]", XPFirst);
					var s1Value = vCpH;
					if (sumCell.innerHTML != "-") s1Value += toNumber(sumCell.innerHTML) - oldvCpH;
					sumCell.innerHTML = s1Value.toLocaleString();
					sumCell.setAttribute("align", docDir[1]);
					if (Math.abs(s1Value) > 1000) sumCell.setAttribute("style", "font-size:8pt; white-space:nowrap;");
				}
			}
		}
		
		find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b2"];
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='" + dlright1 + "']]", XPFirst).parentNode.firstChild.className = 'c2';
	}

	function processVillage3(t){
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// newdid of the village
		try {
			ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var newdid = RegExp.$1;
		} catch(e) {
			var newdid = getGMcookie('singleTownNEWDID', false);
		}

		//Resources
		var resi = new Array();
		var prodH = new Array();
		var capi = new Array();
		var addInt;
		var timeToFillW = Infinity;
		var timeToFillG;
		for (i = 4; i > 0; i--) {
			var a = ansdoc.getElementById("l" + i);
			if (a) {
				var crti = a.innerHTML.split("/");
				resi[i] = crti[0];
				capi[i] = crti[1];
				prodH = a.title;
				var crtFillTime = Math.round((capi[i] - resi[i])*3600/prodH);
				//crtFillTime = crtFillTime;
				if (i > 1) {
					if (timeToFillW > crtFillTime) timeToFillW = crtFillTime;
				} else {
					if (parseInt(prodH) < 0) {
						timeToFillG = Math.round(resi[i]*3600/prodH);
					} else {
						timeToFillG = crtFillTime;
					}
				}
				switch (i) {
					case 4: addInt = 2; break;
					case 3: addInt = 3; break;
					case 2: addInt = 4; break;
					case 1: addInt = 6; break;
				}
				var casilla = find("//td[@id='aldea" + newdid + "_3_" + addInt + "']", XPFirst);
				var procFill = Math.round(100 * resi[i]/capi[i]);
				if (procFill >= 90) {
					casilla.innerHTML = "" + procFill + "%";
					casilla.style.color = "red";
				} else {
					casilla.innerHTML = "" + procFill + "%";
					casilla.style.color = "black";
				}
				//casilla.setAttribute("class", "r7 ou");
			}
		}
		var casilla = find("//td[@id='aldea" + newdid + "_3_5" + "']", XPFirst);
		if (timeToFillW == 0) {
			casilla.innerHTML = "-";
		} else if (timeToFillW == Infinity) {
			casilla.innerHTML = "<span id='timer1'>" + "-" + "</span>";
		} else {
			casilla.innerHTML = "<span id='timer1'>" + formatTime(timeToFillW) + "</span>";
		}

		var casilla = find("//td[@id='aldea" + newdid + "_3_7" + "']", XPFirst);
		if (timeToFillG == 0) {
			casilla.innerHTML = "-";
		} else if (timeToFillG == Infinity) {
			casilla.innerHTML = "<span id='timer1'>" + "-" + "</span>";
			casilla.style.color = "black";
		} else if (timeToFillG < 0) {
			timeToFillG = Math.abs(timeToFillG);
			casilla.innerHTML = "<span id='timer1'>" + formatTime(timeToFillG) + "</span>";
			casilla.style.color = "red";
		} else {
			casilla.innerHTML = "<span id='timer1'>" + formatTime(timeToFillG) + "</span>";
			casilla.style.color = "black";
		}

		find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b2"];
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='" + dlright1 + "']]", XPFirst).parentNode.firstChild.className = 'c2';
	}

	function processVillage42(t){

		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// newdid of the village
		try {
			ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var newdid = RegExp.$1;
		} catch(e) {
			var newdid = getGMcookie('singleTownNEWDID', false);
		}

		var a = ansdoc.evaluate("//div[@id='" + dmid2 + "']//table[@class='f10']/tbody/tr/td[2]/b", ans, null, XPFirst, null).singleNodeValue;
		if (a) {cpi = a.textContent;} else {cpi = 0;}

		var a = ansdoc.evaluate("//div[@id='" + dmid2 + "']//table[@class='f10']/tbody/tr[2]/td[2]/b", ans, null, XPFirst, null).singleNodeValue;
		if (a) {cpt = a.textContent;} else {cpt = 0;}

		var casilla = find("//td[@id='aldea" + newdid + "_4_2" + "']", XPFirst);
		casilla.innerHTML = cpi;
		//casilla.setAttribute("class", "ou");

		var casilla = find("//td[@id='aldea_s_4_2']", XPFirst);
		casilla.innerHTML = cpt;

		find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b2"];
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='" + dlright1 + "']]", XPFirst).parentNode.firstChild.className = 'c2';
	}

	//function provided by MarioCheng for checking the Townhall and the parties thrown.  Thank you !
	function processVillage43(t){
		
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// newdid of the village
		try {
			ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var newdid = RegExp.$1;
		} catch(e) {
			var newdid = getGMcookie('singleTownNEWDID', false);
		}
		
		var lvl = 0;
		var bTitle = ansdoc.evaluate("//div[@id='" + dmid2 + "']/h1/b", ans, null, XPFirst, null).singleNodeValue;
		if (bTitle) {
			var aLvl = bTitle.textContent.split(" ");
			for (i = 0; i < aLvl.length; i++) {
				if (!isNaN(parseInt(aLvl[i]))) lvl = parseInt(aLvl[i]);
			}
		}
		
		var casilla = find("//td[@id='aldea" + newdid + "_4_3" + "']", XPFirst);
		var showLvl = "Lvl " + lvl;
		var partyTime = "";
		
		var a = ansdoc.evaluate("//td[@width='25%']//span[@id='timer1']", ans, null, XPFirst, null).singleNodeValue;
		if (a) {
			partyTime = a.textContent;
			casilla.innerHTML = "<font title='" + showLvl + "'>" + partyTime + "</font>";
		} else {
			if (lvl > 0) {
				partyTime = "•";
				casilla.innerHTML = "<a href='build.php?newdid=" + newdid + "&gid=24' title='" + showLvl + "'>" + partyTime + "</a>";
			}
		}
						
		find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b2"];
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='" + dlright1 + "']]", XPFirst).parentNode.firstChild.className = 'c2';
	}
	
	function processVillage44(t) {
		//get available senators/chiefs/settlers
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// newdid and villageID of the village
		try {
			ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var newdid = RegExp.$1;

			var aX = ansdoc.evaluate('//a[@class="active_vl"]/../../td/table/tbody/tr/td', ans, null, XPFirst, null).singleNodeValue;
			if (aX) {
				var X = parseInt(aX.innerHTML.replace("(", ""));
				var aY = ansdoc.evaluate('//a[@class="active_vl"]/../../td/table/tbody/tr/td[3]', ans, null, XPFirst, null).singleNodeValue;
				if (aY) {
					var Y = parseInt(aY.innerHTML.replace(")", ""));
					var villageID = xy2id(X, Y);
				}
			}

		} catch(e) {
			var newdid = getGMcookie('singleTownNEWDID', false);
			var singleTown = getGMcookie('singleTownNI', false);
			if (singleTown != false) {
				var singleTownArray = singleTown.split("|");
				var villageID = singleTownArray[1];
			}
		}
		
		if (villageID != 0) {
			var vTroopTables = ansdoc.evaluate("//div[@id='" + dmid2 + "']/table/tbody/tr/td[1]/a[contains(@href, " + villageID + ")]/../../../..|//div[@id='" + dmid2 + "']/p[@class='b f16']", ans, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (vTroopTables) {
				var casilla = find("//td[@id='aldea" + newdid + "_4_4" + "']", XPFirst);
				casilla.innerHTML = "";
				var aValue;
				//loop through all table of troops
				for (i = 0; i < vTroopTables.snapshotLength; i++) {
					var aTable = vTroopTables.snapshotItem(i);
					if (aTable.nodeName == "P") break;
					var allTroopCells = aTable.rows[2].cells;
					aValue = toNumber(allTroopCells[9].innerHTML);
					if (aValue != 0) {
						//senators, chiefs, etc.
						for (var xi = 1; xi < aValue + 1; xi++) {
							var aImg = aTable.rows[1].cells[9].firstChild;
							var dImg = aImg.cloneNode(true);
							//log(3, "dImg = " + dImg);
							dImg.setAttribute("class", 'unit');
							dImg.setAttribute('border', '0');
							//casilla.innerHTML += aTable.rows[1].cells[9].innerHTML + " ";
							casilla.appendChild(dImg);
							casilla.innerHTML += " ";
						}
					}
					aValue = toNumber(allTroopCells[10].innerHTML);
					if (aValue != 0) {
						//settlers
						for (var xi = 1; xi < aValue + 1; xi++) {
							var aImg = aTable.rows[1].cells[10].firstChild;
							var dImg = aImg.cloneNode(true);
							//log(3, "dImg = " + dImg);
							dImg.setAttribute("class", 'unit');
							dImg.setAttribute('border', '0');
							//casilla.innerHTML += aTable.rows[1].cells[10].innerHTML + " ";
							casilla.appendChild(dImg);
							casilla.innerHTML += " ";
						}
					}
				}
				if (casilla.innerHTML == "") {
					casilla.innerHTML = "-";
				}
			}
		}
		find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b2"];
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='" + dlright1 + "']]", XPFirst).parentNode.firstChild.className = 'c2';		
	}
	
	function processVillage45(t){
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// newdid of the village
		try {
			ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var newdid = RegExp.$1;
		} catch(e) {
			var newdid = getGMcookie('singleTownNEWDID', false);
		}

		var lvl = 0;
		var maxSlots = 0;
		var bTitle = ansdoc.evaluate("//div[@id='" + dmid2 + "']/h1/b", ans, null, XPFirst, null).singleNodeValue;
		if (bTitle) {
			var aLvl = bTitle.textContent.split(" ");
			for (i = 0; i < aLvl.length; i++) {
				if (!isNaN(parseInt(aLvl[i]))) lvl = parseInt(aLvl[i]);
			}
		}

		if (lvl != 0) {
			var cpbuilding = GM_getValue(gServer + '_' + crtUserID + '_' + newdid + '_cpbuilding', false);
		}

		var maxSlots = 0;
		maxSlots = (cpbuilding == "26")?((lvl==20)?3:(lvl>=15)?2:(lvl>=10)?1:0):(lvl==20)?2:(lvl>=10)?1:0;
		
		var aOcSlots = ansdoc.evaluate("//div[@id='" + dmid2 + "']//table[@class='tbg']/tbody/tr[5]", ans, null, XPFirst, null).singleNodeValue;
		if (aOcSlots) {
			ocSlots = 3;
		} else {
			var aOcSlots = ansdoc.evaluate("//div[@id='" + dmid2 + "']//table[@class='tbg']/tbody/tr[4]", ans, null, XPFirst, null).singleNodeValue;
			if (aOcSlots) {
				ocSlots = 2;
			} else {
				var aOcSlots = ansdoc.evaluate("//div[@id='" + dmid2 + "']//table[@class='tbg']/tbody/tr[3]/td", ans, null, XPFirst, null).singleNodeValue;
				if (aOcSlots.textContent.indexOf('1') != -1) {
					ocSlots = 1;
				} else {
					ocSlots = 0;
				}
			}
		}

		var slots = "" + ocSlots + "/" + maxSlots;

		//work on !

		var casilla = find("//td[@id='aldea" + newdid + "_4_5" + "']", XPFirst);
		var oldSlots = casilla.innerHTML;
		if (oldSlots != "-") {
			oldSlots = oldSlots.split("/");
		} else {
			var oldSlots = ["0", "0"];
		}

		casilla.innerHTML = slots;
		var sumCell = find("//td[@id='aldea_s_4_5']", XPFirst);
		if (sumCell) {
			var sumCellValue = sumCell.innerHTML.replace(",", "").replace(".", "").replace(" ", "").replace("&nbsp;", "");
			if (sumCellValue == "-") {
				sumCell.innerHTML = slots;
			} else {
				sumCell.innerHTML = (parseInt(sumCellValue.split("/")[0]) + ocSlots - parseInt(oldSlots[0])) + "/" + (parseInt(sumCellValue.split("/")[1]) + maxSlots - parseInt(oldSlots[1]));
			}
		}

		find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b2"];
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='" + dlright1 + "']]", XPFirst).parentNode.firstChild.className = 'c2';
	}

	function processVillage5(t){
		var villageID = 0;
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);
		// newdid and villageID of the village
		try {
			ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var newdid = RegExp.$1;

			var aX = ansdoc.evaluate('//a[@class="active_vl"]/../../td/table/tbody/tr/td', ans, null, XPFirst, null).singleNodeValue;
			if (aX) {
				var X = parseInt(aX.innerHTML.replace("(", ""));
				var aY = ansdoc.evaluate('//a[@class="active_vl"]/../../td/table/tbody/tr/td[3]', ans, null, XPFirst, null).singleNodeValue;
				if (aY) {
					var Y = parseInt(aY.innerHTML.replace(")", ""));
					var villageID = xy2id(X, Y);
				}
			}

		} catch(e) {
			var newdid = getGMcookie('singleTownNEWDID', false);
			var singleTown = getGMcookie('singleTownNI', false);
			if (singleTown != false) {
				var singleTownArray = singleTown.split("|");
				var villageID = singleTownArray[1];
			}
		}

		if (villageID != 0) {
			var strTD = 'th';
			var strBody = 'thead';
			if (boolIsT35 == false) {strTD = 'td'; strBody = 'tbody';}
			var vTroopTables = ansdoc.evaluate("//div[@id='" + dmid2 + "']/table/" + strBody + "/tr/" + strTD + "[1]/a[contains(@href, " + villageID + ")]/../../../..|//div[@id='" + dmid2 + "']/p[@class='b f16']", ans, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var oldValues = new Array();
			for (i = 2; i < 13; i++) {
				//get old values for this village
				var casilla = find("//td[@id='aldea" + newdid + "_5_" + i + "']", XPFirst);
				oldValues[i] = 0;
				if (casilla.innerHTML != '-') oldValues[i] = toNumber(casilla.innerHTML); else casilla.innerHTML = '0';
				if (oldValues[i] == 0) casilla.setAttribute("class", "c");
			}
			//log(3, oldValues);
			if (vTroopTables) {
				for (i = 2; i < 13; i++) {
					var casilla = find("//td[@id='aldea" + newdid + "_5_" + i + "']", XPFirst);
					if (casilla) {
						casilla.innerHTML = "-";
					}
				}
				for (i = 0; i < vTroopTables.snapshotLength; i++) {
					var aTable = vTroopTables.snapshotItem(i);
					if (aTable.nodeName == "P") break;
					var nSibling = aTable.nextSibling;
					if (nSibling) {
						if (nSibling.nodeName == "P") {
							if (nSibling.className == 'b f16') i = vTroopTables.snapshotLength;
						}
					}
					var allTroopCells = aTable.rows[2].cells;
					for (j = 1; j < allTroopCells.length; j++) {
						var casilla = find("//td[@id='aldea" + newdid + "_5_" + (j + 1) + "']", XPFirst);
						var aValue = toNumber(allTroopCells[j].innerHTML);
						var iValue = aValue;
						if (casilla.innerHTML != "-") iValue = toNumber(casilla.innerHTML) + aValue;
						if (iValue > 0) casilla.setAttribute("class", "");
						if (iValue > 1000) casilla.setAttribute("style", 'font-size:8pt');
						
						casilla.innerHTML = iValue;
						var	sumCell = find("//td[@id='aldea_s_5_" + (j + 1) + "']", XPFirst);
						iValue = aValue;
						if (sumCell.innerHTML != "-") iValue = toNumber(sumCell.innerHTML) + aValue;
						sumCell.innerHTML = iValue;
					}
				}
				for (i = 2; i < 13; i++) {
					var sumCell = find("//td[@id='aldea_s_5_" + i + "']", XPFirst);
					var sValue = 0;
					if (sumCell.innerHTML != '-') sValue = toNumber(sumCell.innerHTML);
					sValue = sValue - oldValues[i];
					sumCell.innerHTML = sValue;
					if (sValue == 0) sumCell.setAttribute("class", "c"); else sumCell.setAttribute("class", "");
					if (sValue > 1000) sumCell.setAttribute("style", 'font-size:8pt');
				}
			}
		}
		find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b2"];
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='" + dlright1 + "']]", XPFirst).parentNode.firstChild.className = 'c2';
	}

	function createEventRefreshVillageV2(newdid, i, xi){

		return function(){
			find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = gIcons["b3"];
			if (xi == 1) {
				//buildings and attacks in progress
				//fix provided by MarioCheng
				var casilla = find("//td[@id='aldea" + newdid[i] + "_1_4" + "']", XPFirst);
				casilla.innerHTML = "-";
				//end fix provided by MarioCheng
				ajaxRequest("dorf1.php?newdid=" + newdid[i], "GET", null, processVillage11,
					function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = gIcons["b4"]; });
				
				var updTroopsTraining = get("d3Upd_1_3");
				var boolUpdTroopsTraining = false;
				if (updTroopsTraining) boolUpdTroopsTraining = updTroopsTraining.checked;
				
				if (boolUpdTroopsTraining) {
					//troops in training in the barracks
					var isAvailableBarracks = GM_getValue(gServer + '_' + crtUserID + '_' + newdid[i] + '_barracks', false);
					if (isAvailableBarracks != false) {
						var pgAjaxRequest = "build.php?newdid=" + newdid[i] + "&gid=" + isAvailableBarracks;
						ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = gIcons["b4"]; });
					}
					//troops in training in the big barracks
					var isAvailableBigBarracks = GM_getValue(gServer + '_' + crtUserID + '_' + newdid[i] + '_bigbarracks', false);
					if (isAvailableBigBarracks != false) {
						var pgAjaxRequest = "build.php?newdid=" + newdid[i] + "&gid=" + isAvailableBigBarracks;
						ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = gIcons["b4"]; });
					}
					//troops in training in the stable
					var isAvailableStable = GM_getValue(gServer + '_' + crtUserID + '_' + newdid[i] + '_stable', false);
					if (isAvailableStable != false) {
						var pgAjaxRequest = "build.php?newdid=" + newdid[i] + "&gid=" + isAvailableStable;
						ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = gIcons["b4"]; });
					}
					//troops in training in the big stable
					var isAvailableBigStable = GM_getValue(gServer + '_' + crtUserID + '_' + newdid[i] + '_bigstable', false);
					if (isAvailableBigStable != false) {
						var pgAjaxRequest = "build.php?newdid=" + newdid[i] + "&gid=" + isAvailableBigStable;
						ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = gIcons["b4"]; });
					}
					//troops in training in the workshop
					var isAvailableWorkshop = GM_getValue(gServer + '_' + crtUserID + '_' + newdid[i] + '_workshop', false);
					if (isAvailableWorkshop != false) {
						var pgAjaxRequest = "build.php?newdid=" + newdid[i] + "&gid=" + isAvailableWorkshop;
						ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = gIcons["b4"]; });
					}
					//troops in training in the residence/palace
					var cpbuilding = GM_getValue(gServer + '_' + crtUserID + '_' + newdid[i] + '_cpbuilding', false);
					if (cpbuilding != false) {
						var pgAjaxRequest = "build.php?newdid=" + newdid[i] + "&gid=" + cpbuilding;
						ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = gIcons["b4"]; });
					}
				}
				//cannot get the correct request and table as no residence/palace level 10 available in test accounts
			} else if (xi == 2) {
				ajaxRequest("dorf1.php?newdid=" + newdid[i], "GET", null, processVillage2,
					function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = igIcons["b4"]; });
			} else if (xi == 3) {
				ajaxRequest("dorf1.php?newdid=" + newdid[i], "GET", null, processVillage3,
					function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = gIcons["b4"]; });
			} else if (xi == 4) {
				var cpbuilding = GM_getValue(gServer + '_' + crtUserID + '_' + newdid[i] + '_cpbuilding', false);
				if (cpbuilding != false) {
				
					var updPCperDay = get("d3Upd_4_2");
					var boolupdPCperDay = false;
					if (updPCperDay) boolupdPCperDay = updPCperDay.checked;
					
					var updSlots = get("d3Upd_4_5");
					var boolupdSlots = false;
					if (updSlots) boolupdSlots = updSlots.checked;
				
					var pgAjaxRequest = "build.php?newdid=" + newdid[i] + "&gid=" + cpbuilding;
					if (boolupdPCperDay == true) {
						var pgAjaxRequest2 = pgAjaxRequest + "&s=2";
						ajaxRequest(pgAjaxRequest2, "GET", null, processVillage42,
							function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = gIcons["b4"]; });
					}
					if (boolupdSlots == true) {
						var pgAjaxRequest5 = pgAjaxRequest + "&s=4";
						ajaxRequest(pgAjaxRequest5, "GET", null, processVillage45,
							function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = gIcons["b4"]; });
					}
				} else {
					find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = gIcons["b5"];
					var casilla = find("//td[@id='aldea" + newdid[i] + "_4_5" + "']", XPFirst);
					casilla.innerHTML = "0/0";
					//alert(T('NOPALACERESIDENCE'));
				}
				
				//parties thrown in the village
				var updParty = get("d3Upd_4_3");
				var boolupdParty = false;
				if (updParty) boolupdParty = updParty.checked;
				
				if (boolupdParty == true) {
					var isAvailableTownhall = GM_getValue(gServer + '_' + crtUserID + '_' + newdid[i] + '_townhall', false);
					if (isAvailableTownhall != "false") {
						var pgAjaxRequestParty = "build.php?newdid=" + newdid[i] + "&gid=24";
						ajaxRequest(pgAjaxRequestParty, "GET", null, processVillage43, function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = gIcons["b4"]; });
					}
				}
				
				var updSenSettlers = get("d3Upd_4_4");
				var boolupdSenSettlers = false;
				if (updSenSettlers) boolupdSenSettlers = updSenSettlers.checked;
				
				if (boolupdSenSettlers == true) {
					//available senators/chiefs/settlers
					ajaxRequest("build.php?newdid=" + newdid[i] + "&gid=16&j&k", "GET", null, processVillage44,
						function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = gIcons["b4"]; });
				}
				
			} else if (xi == 5) {
				//added "&j&k" as suggested by MarioCheng. Thank you !
				ajaxRequest("build.php?newdid=" + newdid[i] + "&gid=16&j&k", "GET", null, processVillage5,
					function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = gIcons["b4"]; });
			}
		}
	}

	function removeDorf3Table() {
		var oldTable = find("//div[@id='" + dmid2 + "']//table[@class='tbg']", XPFirst);
		if (oldTable) {
			removeElement(oldTable);
		}
	}

	function createDorf35Table(newdid, villageName, newPar, topRowText, secRowText) {
		var intAdd = 1;
		removeDorf3Table();
		var aTable = newTable([["class", "tbg"], ["cellspacing", "1"], ["cellpadding", "2"]]);

		var trTop = elem("TR", "");

		var updAllCell = createUpdAllCell(newdid, 5);
		trTop.appendChild(updAllCell);

		var tdTop = newCell(topRowText[4], [["colspan", "11"]]);
		trTop.appendChild(tdTop);
		trTop.setAttribute("class", "rbg");
		aTable.appendChild(trTop);
		var trTop2 = elem("TR", "");
		var tdTop2 = newCell(secRowText[0], [['width', '150']]);
		trTop2.appendChild(tdTop2);

		//crtUserRace = getRace();

		if (crtUserRace != "false") {
			if (crtUserRace == "Teutons") {
				intAdd = 11;
			} else if (crtUserRace == "Gauls") {
				intAdd = 21;
			}
		}

		for (xi = 0; xi < 10; xi++) {
			if (crtUserRace != "false") {
				log(3, "intAdd = " +intAdd);
				if (boolIsT35 == false) {
					var imgName = "src='" + gIcons["u" + (xi + intAdd)] + "'";
				} else {
					var imgName = 'class="unit u' + (xi + intAdd) + '" src="img/x.gif"';
				}
				//var tdTop2 = elem("TD", "<img src =" + imgName + ">");
				var tdTop2 = elem("TD", "<img " + imgName + ">");
			} else {
				var tdTop2 = newCell("-", [["class", "c"]]);
			}
			trTop2.appendChild(tdTop2);
		}
		var tdTopHero = elem("TD","<img " + gIcons["hero"] + ">");
		if (crtUserRace != "false") tdTopHero.setAttribute("class", "c");
		trTop2.appendChild(tdTopHero);
		aTable.appendChild(trTop2);

		//create the rows for the villages
		rowsDorf3(aTable, newdid, villageName, 11, 5);
		//Sum row
		sumRowDorf3(aTable, 11, 5);
		if (newPar) insertAfter(newPar, aTable);
	}

	function createDorf34Table(newdid, villageName, newPar, topRowText, secRowText) {

		removeDorf3Table();
		var aTable = newTable([["class", "tbg"], ["cellspacing", "1"], ["cellpadding", "2"]]);
		var trTop = elem("TR", "");
		var updAllCell = createUpdAllCell(newdid, 4);
		trTop.appendChild(updAllCell);
		var tdTop = newCell(topRowText[3], [["colspan", "4"]]);
		trTop.appendChild(tdTop);
		trTop.setAttribute("class", "rbg");
		aTable.appendChild(trTop);

		var trTop2 = elem("TR", "");
		for (xi = 0; xi < 5; xi++){
			switch (xi) {
				case 0: var tdTop2 = elem("TD", secRowText[0]); break;
				case 1: var tdTop2 = elem("TD", T('CPPERDAY')); break;
				case 2: var tdTop2 = elem("TD", T('PARTY')); break;
				case 3: var tdTop2 = elem("TD", T('TROPAS')); break;
				case 4: var tdTop2 = elem("TD", T('SLOT')); break;
			}
			if (xi > 0) {
				var aCB = createDorf3Checkbox();
				aCB.setAttribute('id', 'd3Upd_4_' + (xi + 1));
				tdTop2.appendChild(aCB);
			} else if (xi == 0) tdTop2.setAttribute('width', '150');
			trTop2.appendChild(tdTop2);

		}

		aTable.appendChild(trTop2);
		//create the rows for the villages
		rowsDorf3(aTable, newdid, villageName, 4, 4);
		//Sum row
		sumRowDorf3(aTable, 4, 4);
		if (newPar) insertAfter(newPar, aTable);
	}

	function createDorf33Table(newdid, villageName, newPar, topRowText, secRowText) {

		removeDorf3Table();

		var aTable = newTable([["class", "tbg"], ["cellspacing", "1"], ["cellpadding", "2"]]);
		var trTop = newRow("", [["class", "rbg"]]);
		var updAllCell = createUpdAllCell(newdid, 3);
		trTop.appendChild(updAllCell);
		var tdTop = newCell(topRowText[2], [["colspan", "6"]]);
		trTop.appendChild(tdTop);
		aTable.appendChild(trTop);

		var trTop2 = elem("TR", "");
		for (xi = 0; xi < 7; xi++){
			switch (xi) {
				case 0: var tdTop2 = elem("TD", secRowText[0]); break;
				case 1:
				case 2:
				case 3: var tdTop2 = elem("TD", gIcons["r" + xi]); break;
				case 5: var tdTop2 = elem("TD", gIcons['r4']); break;
				case 4:
				case 6: var tdTop2 = elem("TD", gIcons["clock"]); break;
			}
			if (xi == 0) tdTop2.setAttribute('width', '150');
			trTop2.appendChild(tdTop2);
		}

		aTable.appendChild(trTop2);
		//create the rows for the villages
		rowsDorf3(aTable, newdid, villageName, 6, 3);
		if (newPar) insertAfter(newPar, aTable);
	}

	function createDorf32Table(newdid, villageName, newPar, topRowText, secRowText, merchant) {

		removeDorf3Table();

		var aTable = newTable([["class", "tbg"], ["cellspacing", "1"], ["cellpadding", "2"]]);

		var trTop = newRow("", [["class", "rbg"]]);

		var updAllCell = createUpdAllCell(newdid, 2);
		trTop.appendChild(updAllCell);

		var tdTop = newCell(topRowText[1], [["colspan", "6"]]);
		trTop.appendChild(tdTop);

		aTable.appendChild(trTop);

		var trTop2 = elem("TR", "");
		for (xi = 0; xi < 7; xi++){
			switch (xi) {
				case 0: var tdTop2 = elem("TD", secRowText[0]); break;
				case 1:
				case 2:
				case 3:
				case 4: var tdTop2 = elem("TD", gIcons["r" + xi]); break;
				case 5: var tdTop2 = elem("TD", gIcons["cropcons"] + "/" + gIcons["clock"]); break;
				case 6: var tdTop2 = elem("TD", secRowText[4]); break;
			}
			if (xi == 0) tdTop2.setAttribute('width', '150');
			trTop2.appendChild(tdTop2);
		}

		aTable.appendChild(trTop2);
		//create the rows for the villages
		rowsDorf3(aTable, newdid, villageName, 6, 2, merchant);
		//Sum row
		sumRowDorf3(aTable, 6, 2, merchant);

		if (newPar) insertAfter(newPar, aTable);

	}

	function createDorf31Table(newdid, villageName, newPar, topRowText, secRowText, merchant) {
		removeDorf3Table();
		var aTable = newTable([["class", "tbg"], ["cellspacing", "1"], ["cellpadding", "2"]]);
		var trTop = newRow("", [["class", "rbg"]]);
		var updAllCell = createUpdAllCell(newdid, 1);
		trTop.appendChild(updAllCell);
		var tdTop = newCell(topRowText[0], [["colspan", "4"]]);
		trTop.appendChild(tdTop);
		aTable.appendChild(trTop);
		if (secRowText) {
			var trTop2 = elem("TR", "");
			for (xi = 0; xi < secRowText.length; xi++){
				var tdTop2 = elem("TD", secRowText[xi]);
				if (xi == 0) tdTop2.setAttribute('width', '150');
				if (xi == 3) {
					var aCB = createDorf3Checkbox();
					aCB.setAttribute('id', 'd3Upd_1_' + xi);
					tdTop2.appendChild(aCB);
				}
				trTop2.appendChild(tdTop2);
			}
		}
		aTable.appendChild(trTop2);
		//create the rows for the villages
		rowsDorf3(aTable, newdid, villageName, secRowText.length - 1, 1, merchant);
		if (newPar) insertAfter(newPar, aTable);
	}
	
	function createUpdAllCell(newdid, xi) {
		var tdUpdAll = elem("TD", "");
		var updAllLink = elem("A", "<img src='" + image['reload'] + "' border='0' width='12' title='" + T('UPDATEALLVILLAGES') + "' alt = '" + T('UPDATEALLVILLAGES') + "'>");
		updAllLink.setAttribute("href", jsVoid);
		updAllLink.addEventListener('click', function () {updateAllVillages(newdid, xi);}, false);
		tdUpdAll.appendChild(updAllLink);
		return tdUpdAll;
	}

	function updateAllVillages(newdid, xi) {
		for (var i = 0; i < newdid.length; i++) {
			//code to update the villages via random timer
			var aTimeOut = getRandomTimeRange(1971);
			setTimeout(createEventRefreshVillageV2(newdid, i, xi), aTimeOut);
		}
		return;
	}

	function createDorf3Checkbox() {
		var cb = document.createElement("INPUT");
		cb.setAttribute('type', 'checkbox');
		cb.setAttribute('value', '1');
		cb.setAttribute('checked', 'true');
		return cb;
	}
	
	function sumRowDorf3(nodeToAppendTo, maxTD, tabNo, merchant) {
		//Separator row
		var trSeparator = elem("TR", "");
		var tdSeparator = newCell("", [["colspan", "" + (maxTD + 1)]]);
		trSeparator.appendChild(tdSeparator);
		nodeToAppendTo.appendChild(trSeparator);

		//sum row
		var trSum = elem("TR", "");
		//first sum cell
		var ts1 = newCell(T('TOTAL'), [['style', 'font-weight:bold']]);
		trSum.appendChild(ts1);
		var totalMerchants = new Array();
		totalMerchants = [0, 0];
		if (merchant) {
			for (xi = 0; xi < merchant.length; xi++) {
				var merchants = merchant[xi].split("/");
				var posX = merchants[0].lastIndexOf(">");
				totalMerchants[0] += parseInt(merchants[0].substring(posX + 1));
				posX = merchants[1].indexOf("<");
				totalMerchants[1] += parseInt(merchants[1].substring(0, posX));
			}
		}
		for (var yi = 0; yi < maxTD; yi++){
			if (merchant && yi == maxTD - 1) {
				var ts = elem("TD", "" + totalMerchants[0] + "/" + totalMerchants[1]);
			} else if (tabNo == 4 && yi == 1) {
				var ts = newCell("", [["colspan", "2"]]);
			} else if (tabNo == 4 && yi == 2) {
			} else {
				var ts = elem("TD", "-");
			}
			ts.setAttribute("id", "aldea_s_" + tabNo + "_" + (yi+2));
			trSum.appendChild(ts);
		}
		nodeToAppendTo.appendChild(trSum);
		//return trSeparator;
	}

	function rowsDorf3(nodeToAppendTo, newdid, villageName, maxTD, tabNo, merchant) {
		for (var i = 0; i < newdid.length; i++){
			var tr = elem("TR", "");
			//first cell
			var td1 = newCell("", [['align', docDir[0]]]);
			var aLink = elem("A", "<img src='" + gIcons["b5"] + "' border='0' title='" + T('ACTUALIZAR') + "' id='aldea" + newdid[i] + "_boton'>");
			aLink.href = jsVoid;
			aLink.addEventListener("click", createEventRefreshVillageV2(newdid, i, tabNo), 0);
			var nobr = elem("NOBR", "");
			nobr.appendChild(aLink);
			nobr.appendChild(elem("SPAN", ' <a href="dorf1.php?newdid=' + newdid[i] + '">' + villageName[i] + '</a>'));
			td1.appendChild(nobr);
			//td1.align = docDir[0];
			if (newdid[i] == newdidActive && tabNo < 4) td1.setAttribute("class", "li ou");
			tr.appendChild(td1);
			//second cell and the other ones
			for (yi = 0; yi < maxTD; yi++) {
				var td = newCell("-", [["id", "aldea" + newdid[i] + "_" + tabNo + "_" + (yi+2)]]);
				if (yi == maxTD - 1 && (tabNo == 1 || tabNo == 2)) {
					td.innerHTML = merchant[i];
				}
				if (newdid[i] == newdidActive && tabNo < 4) {
					td.setAttribute("class", "ou");
					if (yi == maxTD - 1) {
						td.setAttribute("class", "re ou");
					} else {
						td.setAttribute("class", "ou");
					}
				}
				tr.appendChild(td);
			}
			nodeToAppendTo.align = docDir[0];
			nodeToAppendTo.appendChild(tr);
		}
	}

	function overviewVillages(){
		//log(3, "enter overviewVillages");
		var origParTop = find("//div[@id='" + dmid2 + "']//p[@class='txt_menue']", XPFirst);
		if (plus) {
			//log(3, "plus available");
			origParTop.innerHTML += ' | <a href="dorf3.php?s=6">' + T('ATTABLES') + '</a>';
			return;
		}
		//get the table with the list of villages from the right side
		var ba = find("//div[@id='" + dlright1 + "']//table[@class='f10']", XPFirst);
		if (!ba) return;

		var origTable = find("//div[@id='" + dmid2 + "']//table[@class='tbg']", XPFirst);
		if (origTable) origTable.style.visibility = "hidden";
		
		if (origParTop) {
			var arrayParTopLinks = origParTop.textContent.split("\n");
			var arrayParTopText = new Array();
			for (xi = 0; xi < arrayParTopLinks.length; xi++) {
				arrayParTopText[xi] = arrayParTopLinks[xi].replace("|", "");
			}
			arrayParTopText.shift();
			origParTop.style.visibility = "hidden";
		}

		var originalSecRowHTML = find("//div[@id='" + dmid2 + "']//table[@class='tbg']/tbody/tr[2]", XPFirst);
		var originalSecRow = originalSecRowHTML.textContent.split("\n");
		originalSecRow.pop();
		originalSecRow.shift();

		//get the villages array
		var newdid = new Array();
		var villageName = new Array();
		var merchant = new Array();
		for (var i = 0; i < ba.rows.length; i++) {
			var cLinks = new Array;
			var j = -1;
			while (!cLinks[0] && j < 10) {
				j = j + 1
				var aCell = ba.rows[i].cells[j];
				cLinks = aCell.getElementsByTagName("A");
			}
			aLink = cLinks[0].getAttribute("href");
			if (aLink) {
				if (aLink.search(/\?newdid=(\d+$)/) >= 0) {
					newdid[newdid.length] = RegExp.$1;
					villageName[villageName.length] = cLinks[0].textContent;					
				}
			}
		}

		//get the merchant array
		for (i = 0; i < newdid.length; i++) {
			var findformula = "//div[@id='" + dmid2 + "']//table[@class='tbg']/tbody/tr[" + (3 + i) + "]/td[5]";
			var mLink = find(findformula, XPFirst);
			if (mLink != null) {
				merchant[i] = mLink.innerHTML;
			}
		}

		//replace the original Paragraph with a new one providing the same options as in Travian Plus
		var newPar = elem("P", "");
		var a = find("//div[@id='" + dmid2 + "']", XPFirst);
		if (a.firstChild) {
			a.insertBefore(newPar, a.firstChild);
		} else {
			a.appendChild(newPar);
		}

		for (xi = 0; xi < arrayParTopText.length; xi++) {

			var newParElem = elem("A", arrayParTopText[xi]);
			newParElem.setAttribute("class",  "newDorf3elem_" + xi);
			newParElem.setAttribute("href", jsVoid);
			if (xi == 0) {
				newParElem.addEventListener("click", function() {createDorf31Table(newdid, villageName, newPar, arrayParTopText, originalSecRow, merchant);}, 0);
			} else if (xi == 1) {
				newParElem.addEventListener("click", function() {createDorf32Table(newdid, villageName, newPar, arrayParTopText, originalSecRow, merchant);}, 0);
			} else if (xi == 2) {
				newParElem.addEventListener("click", function() {createDorf33Table(newdid, villageName, newPar, arrayParTopText, originalSecRow);}, 0);
			} else if (xi == 3) {
				newParElem.addEventListener("click", function() {createDorf34Table(newdid, villageName, newPar, arrayParTopText, originalSecRow);}, 0);
			} else if (xi == 4) {
				newParElem.addEventListener("click", function() {createDorf35Table(newdid, villageName, newPar, arrayParTopText, originalSecRow);}, 0);
			}
			newPar.appendChild(newParElem);
			if (xi < arrayParTopText.length - 1) {
				var newParSeparator = elem("SPAN", " | ");
				newPar.appendChild(newParSeparator);
			}
		}
		removeElement(origTable);
		removeElement(origParTop);
		createDorf31Table(newdid, villageName, newPar, arrayParTopText, originalSecRow, merchant);
	}

	/**
	 * Modifica el estilo del mensaje de borrado de cuenta para adaptarlo a los cambios que realiza el script
	 */
	function deleteAccount(){
		var a = find("//p[parent::div[@id='" + dleft + "'] and @style]", XPFirst);
		if (a){
			moveElement(a, document.body);
			a.setAttribute("style", "position:absolute; display: block; padding: 4px; z-index: 2; border: solid 1px #00C000; background-color: #FEFFE3; width:130px; text-align:center; " + docDir[1] + ":0px; top:0px;");
		}
	}

	/**
	 *  time and resource counters
	 */
	function setTimers(){
		function createResourceTimer(i){
			return function(){
				var sTimeouts = find("//*[@id='timeout" + i + "']", XPList);
				//decrease the required amount of the i type resource
				currentResUnits[i]++;
				if (sTimeouts && sTimeouts != null) {
					for (var j = 0; j < sTimeouts.snapshotLength; j++){
						if (sTimeouts.snapshotItem(j)) {
							var quantity = sTimeouts.snapshotItem(j).innerHTML - 1; // calculate needed resource quantity
							if (quantity >= 0) {
								sTimeouts.snapshotItem(j).innerHTML = quantity;
							} else {
								var aParentNode = sTimeouts.snapshotItem(j).parentNode;
								if (aParentNode != undefined && aParentNode != null) {
									var tbodyNode = aParentNode.parentNode;
									if (tbodyNode) {
										if (tbodyNode.childNodes.length <= 2) {
											var resourceCellNode = tbodyNode.parentNode.parentNode;
											removeElement(tbodyNode.parentNode);
											if (resourceCellNode != null) {
												resourceCellNode.setAttribute('valign', 'center');
												resourceCellNode.setAttribute('style', tdNoBorder);
												resourceCellNode.innerHTML = T('EXTAVAILABLE');
											}
										} else {
											removeElement(sTimeouts.snapshotItem(j).parentNode);
										}
									}
								}
							}
						}
					}
				}
			}
		}

		function createTimerHandler(){
			return function () {
				var allTimeouts = find("//*[@id='timeout' or @id='timeouta']", XPList);
				//decrease resource timers
				for (var i = 0; i < allTimeouts.snapshotLength; i++){
					var tiempo = ComputeSeconds(allTimeouts.snapshotItem(i).innerHTML) - 1; // calculate in seconds
					if (tiempo >= 0) { // not reached
						allTimeouts.snapshotItem(i).innerHTML = formatTime(tiempo);
					} else if (allTimeouts.snapshotItem(i).id == 'timeout') {
						if (sTimeouts && sTimeouts != null) {
							var tbodyNode = sTimeouts.snapshotItem(j).parentNode.parentNode;
							if (tbodyNode.childNodes.length <= 2) {
								var resourceCellNode = tbodyNode.parentNode.parentNode;
								removeElement(tbodyNode.parentNode);
								if (resourceCellNode != null) {
									resourceCellNode.setAttribute('valign', 'center');
									resourceCellNode.setAttribute('style', tdNoBorder);
									resourceCellNode.innerHTML = T('EXTAVAILABLE');
								}
							} else {
								removeElement(sTimeouts.snapshotItem(j).parentNode);
							}
						}
					}
				}
				//moved here by suggestion of fr3nchlover.  Thank you !
				NPCUpdate();
			}
		}
		
		// Calcula cada cuantos segundos debe actualizar cada contador de resources restantes para
		// aprovechar el temporizador del resto de allTimeouts
		var arrFrequency = new Array(4);
		for (var i = 0; i < 4; i++){
			arrFrequency[i] = (1000.0 / Math.abs(productionPerHour[i]/3600));
			if (!isFinite(arrFrequency[i]) || arrFrequency[i] < 0||capacity[i] - currentResUnits[i] == 0) {
				arrFrequency[i] = Number.POSITIVE_INFINITY;
			} else {
				setInterval(createResourceTimer(i), Math.floor(arrFrequency[i]));
			}
		}
		setInterval(createTimerHandler(),1000);
	}

	function getBuildingMaxLevel(gid) {
		var maxLevel;
		switch (gid) {
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
				maxLevel = 5;
				break;
			case 23:
			case 27:
				maxLevel = 10;
				break;
			case 40:
				maxLevel = 100;
				break;
			default:
				maxLevel = 20;
		}
		return (maxLevel);
	}

    function colorLvl(currLvl, gid, currentTotalRes){
        eval('var nameStruct = ' + gidToName[gid] + 'Cost;');
        var result = 1;
		var neededResNPC = 0;
		var XY = nameStruct[parseInt(currLvl) + 1];
		if (XY) {
	        for (var i = 0; i < 4; i++) {
	            if (currentResUnits[i] < XY[i]) {
	                result = 0;
	                //i = 4;
	            }
				neededResNPC += XY[i];
	        }
			if (result == 0 && neededResNPC <= currentTotalRes) {
				result = 2;
			}
		}
        return result;
    }
	
	//market => offer: function marketSimpleOffer automatically selects as offering the resource
        // from which you have the most units and
        // searching the resource with the minimum units for the current village
		//add option to save the offer
		//add option to save the offer as global (Thank you, Zippo !)
	function marketSimpleOffer() {
		var aX = find("//input[@class='fm fm25']", XPFirst);
		if (!aX) return;
		//log(3, "enter marketSimpleOffer");
		var maxRes = currentResUnits[0];
		var minRes = currentResUnits[0];
		var indexMaxRes = 0;
		var indexMinRes = 0;
		var elemInput = document.getElementById('saveofferoption');
		
		for (var xi = 0; xi < 4; xi++){
			if (maxRes <= parseInt(currentResUnits[xi])) {maxRes = currentResUnits[xi]; indexMaxRes = xi;}
			if (minRes >= parseInt(currentResUnits[xi])) {minRes = currentResUnits[xi]; indexMinRes = xi;}
		}
		try {
			var offerTypeMax = document.getElementsByName("rid1");
			var offerTypeMin = document.getElementsByName("rid2");
			if (offerTypeMax) {offerTypeMax[0].value = "" + (indexMaxRes + 1) + ""; }
			if (offerTypeMin) {offerTypeMin[0].value = "" + (indexMinRes + 1) + ""; }
		} catch(e) {}
		
		if (!elemInput) {
			var aTable = find("//table[@class='f10']", XPFirst);
			if (aTable) {
				var sRow = elem("TR", "");
				var saveCell = elem("TD", "<input type='checkbox' id='saveofferoption' value='1'></input>&nbsp;" + T('SAVE') + "&nbsp;" + "<input type='checkbox' id='saveofferglobal' value='1'></input>&nbsp;" + T('SAVEGLOBAL'));
				for (var i = 0; i < 4; i++) {
					var aCell = elem("TD", "");
					sRow.appendChild(aCell);
				}
				sRow.appendChild(saveCell);
				aTable.appendChild(sRow);
			}
		}
		
		//add information about capacity of the merchants and make transport functions available to this page, too
		var merchantsPar = find("//form//p[@class='f10']", XPFirst);
		//var mCap = getGMcookie("merchantsCapacityV3", false);
		var mHTML = "";
		if (merchantsPar) {
			mHTML = merchantsPar.innerHTML;
			var mhMH = mHTML.split(" ")[0];
			var avMerchants = parseInt(mHTML.split(" ")[1].split("/")[0]);
			if (mHTML.indexOf("(") == -1) {
				getMerchantsInformation();
				if (merchantsCapacity != "0") {
					merchantsPar.innerHTML += " (" + merchantsCapacity + " / <img src='" + image["merchant"] + "'>)";
				}
			}
		}
		
		var rxInput = find("//input[@class='fm' and @name='m1']", XPFirst);
		if (rxInput) {
			rxInput.addEventListener('keyup', function() {mhRowUpdate3(avMerchants);}, false);
		}
		var rxType = find("//select[@class='fm' and @name='rid1']", XPFirst);
		if (rxType) {
			rxType.addEventListener('change', function() {mhRowUpdate3(avMerchants);}, false);
		}
		
		function mhRowUpdate3(maxNoOfMerchants) {
			var totalTransport = 0;
			var maxCapacity = parseInt(merchantsCapacity);
			var aR = parseInt(rxInput.value);
			
			if (rxType) {
				if (currentResUnits[parseInt(rxType.value) - 1] < aR) {
					rxInput.value = currentResUnits[parseInt(rxType.value) - 1];
				}
			}
			
			if (!isNaN(aR)) totalTransport += aR;

			var totMerchants = Math.ceil(totalTransport / maxCapacity);
			
			//added code provided by MarioCheng & DMaster for wasted/exceeding resources
			var crtWaste = maxCapacity - (totalTransport - (totMerchants-1) * maxCapacity);
            var crtExceed = totalTransport - (maxNoOfMerchants * maxCapacity);
			//finished code addition
			var mhText = "<b>" + mhMH + ": " + totMerchants + "/" + maxNoOfMerchants + "<br>" + T('MAX') + ": " + maxNoOfMerchants * maxCapacity + "<br>";
			
			if (totMerchants > maxNoOfMerchants) {
				var mhColor = "red";
				mhText += T('MTEXCEED') + ": "+ crtExceed;
			} else {
				var mhColor = "darkgreen";
				mhText += T('MTWASTED') + ": "+ crtWaste;
			}
			mhText += "<br>" + T('MTCURRENT') + ": " + totalTransport + "</b>";
			var mhCell = get("mhMerchants");
			if (mhCell == null || mhCell == undefined) {
				var mhRow = elem("TR", "");
				var mhCell = newCell(mhText, [["id", "mhMerchants"], ["style", 'color:' + mhColor], ["colspan", '8']]);
				mhRow.appendChild(mhCell);
				aTable.appendChild(mhRow);
			} else {
				mhCell.innerHTML = mhText;
				mhCell.setAttribute("style", 'color:' + mhColor);
			}
			//work in progress !!!
			return;
		}
	}

	//get hero's mansion pageX
	function boolIsHerosMansion() {
		var retValue = false;
		var nameHeroNode = xpathResultEvaluate("//div[@id='" + dmid2 + "']/table[@class='tbg']/tbody/tr[@class='rbg']/td/span[@class='t']/../a[contains(@href, '&rename')]/span[@class='c0']");
		if (nameHeroNode != null) retValue = (nameHeroNode.snapshotLength == 1);
		return retValue;
	}

	//show hero extended status
	function showHeroStatus() {

		var heroInfo = xpathResultEvaluate("//div[@id='" + dmid2 + "']/table[@class='tbg']/tbody/tr[@class='rbg']/td/span[@class='t']/../a[contains(@href, '&rename')]/span[@class='c0']/../../../..").snapshotItem(0);

		var posType = heroInfo.rows[0].cells[0].textContent.indexOf(" (");
		var heroHeader = heroInfo.rows[0].cells[0].textContent.substr(0, posType);
		var xLevel = "";
		notgata = true;
		for (xi = heroHeader.length; xi > 0; xi--) {
			if (heroHeader.charAt(xi) != " " && notgata) {
				xLevel = heroHeader.charAt(xi) + xLevel
			} else { notgata = false;}
		}
		var heroLevel = parseInt(xLevel);
		var heroPercent = parseInt(heroInfo.rows[heroInfo.rows.length - 1].cells[1].textContent);

		var thisLevelExp = (heroLevel + 1) * 100;
		var expCurrentLevel = ((thisLevelExp) / 2) * heroLevel;
		var nextLevelExp = expCurrentLevel + thisLevelExp;

		var expGainedCurrentLevel = (heroLevel+1) * heroPercent;
		var expToLevelUp = (heroLevel + 1) * (100 - heroPercent);

		var levelTxt = heroInfo.rows[0].cells[0].childNodes[1].textContent;
		levelTxt = levelTxt.substr(0, levelTxt.indexOf(heroLevel) - 1);

		var emptyRow = elem("TR", '<td colspan="0" />');
		heroInfo.appendChild(emptyRow);

		var xRow = elem("TR", '');
		var heroCell = newCell("", [['colSpan', '0']]);
		
		var heroNewTable = newTable([['width', '100%'], ['border', '1px'], ['rules', 'all'], ['cellspacing', '1'], ['cellpadding', '2']]);
		heroNewTable.setAttribute('style', 'border:1px solid #C2C2C2');
		var aRow = elem("TR", '');
		var aCell = elem("TD", levelTxt + " " + heroLevel);
		var bCell = elem("TD", "" + heroPercent + "%");
		var cCell = elem("TD", "" + (100 - heroPercent) + "%");
		var dCell = elem("TD", levelTxt + " " + (heroLevel + 1));
		aRow.appendChild(aCell);
		aRow.appendChild(bCell);
		aRow.appendChild(cCell);
		aRow.appendChild(dCell);

		var bRow = elem("TR", '');
		var a1Cell = newCell('', [['width', '100px'], ['style', 'border-top:1px solid #C2C2C2']]);
		bRow.appendChild(a1Cell);
		var b1Cell = newCell('', [['colSpan', 2], ['style', 'border-top:1px solid #C2C2C2']]);
		bRow.appendChild(b1Cell);

		var graphBar = newTable([['cellspacing', 0], ['style', 'height: 10px; width: 100%']]);

		var rX = elem("TR", '');
		var x1Cell = newCell('', [['style', 'width: ' + heroPercent + '%; background-color: blue']]);
		var x2Cell = newCell('', [['style', 'width: ' + (100 - heroPercent) + '%; background-color: lightgrey']]);

		rX.appendChild(x1Cell);
		rX.appendChild(x2Cell);
		graphBar.appendChild(rX);
		b1Cell.appendChild(graphBar);

		var c1Cell = newCell('', [['colSpan', 2], ['style', 'border-top:1px solid #C2C2C2']]);
		bRow.appendChild(c1Cell);

		var cRow = elem("TR", '');
		var a2Cell = newCell(expCurrentLevel, [['style', 'border-top:1px solid #C2C2C2']]);
		cRow.appendChild(a2Cell);
		var b2Cell = newCell(expGainedCurrentLevel, [['title', "" + expCurrentLevel + " + " + expGainedCurrentLevel + " = " + (expCurrentLevel + expGainedCurrentLevel)], ['style', 'border-top:1px solid #C2C2C2']]);
		cRow.appendChild(b2Cell);
		var c2Cell = newCell(expToLevelUp, [['style', 'border-top:1px solid #C2C2C2']]);
		cRow.appendChild(c2Cell);
		var d2Cell = newCell(nextLevelExp, [['style', 'border-top:1px solid #C2C2C2']]);
		cRow.appendChild(d2Cell);

		heroNewTable.appendChild(aRow);
		heroNewTable.appendChild(bRow);
		heroNewTable.appendChild(cRow);
		heroCell.appendChild(heroNewTable);
		xRow.appendChild(heroCell);
		heroInfo.appendChild(xRow);
	}

	//NPC Merchant

	function NPCexcludedPage(URL) {
		if (boolIsThisNPC()) return false;
		return (URL.match(/^\/build\.php\?id=\d+\&t=\d+/) != null);
	}

	//check if we are on the NPC Merchant page
	function boolIsThisNPC()  {
		var xp = xpathResultEvaluate('//tr[@class="rbg"]/td[@colspan="5"]');
		return (xp.snapshotLength == 1 && document.getElementsByName('m2[]').length == 4);
	}
	
	//check if we are on the page where the NPC trade has been finished
	function boolIsThisPostNPC() {
		var xp = xpathResultEvaluate('//p[@class="txt_menue"]/following-sibling::*/img[@class="res"]');
		return (xp.snapshotLength == 8);
	}

	//insert the NPC assistant back link
	function insertNPCHistoryLink() {
		var bname = getQueryParameters(urlNow, NPCbacklinkName);
		if (!bname) {
			var bname = "Go back";
		}
		var div = get(dmid2);
		div.innerHTML += '<p><a href="#" onclick="window.history.go(-2)"> &laquo; ' + bname + '</a></p>';
	}
	
	//fill out the NPC Merchant fields
	function fillOutNPCfields(URL) {
		if (URL.indexOf('&' + NPCResources) != NPCURL.length) return false;
		var needed = getQueryParameters(URL, NPCResources).split(',');
		var inputs = document.getElementsByName('m2[]');
		for (var i = 0; i < 4; i++) {
			inputs[i].value = needed[i];
		}
		unsafeWindow.calculateRest();
	}

	function getXfields() {
		var xp = xpathResultEvaluate('//table[@class="tbg"]/tbody/tr/td/input[starts-with(@name, "t")]');
		if (xp.snapshotLength) {
			var fields = new Array();
			for (var i = 0; i < xp.snapshotLength; i++) {
				fields.push(xp.snapshotItem(i));
			}
			return fields;
		} else return;
	}

	function getXmX(fields) {
		if (fields) {
			var inputs = new Array();
			for (var i = 0; i < fields.length; i++) {
				var f = fields[i].value;
				inputs.push(f.length == 0 || isNaN(f) ? 0 : parseInt(f));
			}
			return inputs;
		} else return;
	}

	function parseURL(URL) {
		var urlParts = URL.split('?', 2);
		if (urlParts.length == 1) urlParts[1] = '';
		var parts = {path: urlParts[0], query: urlParts[1]};
		return parts;
	}

	function getQueryParameters(URL, param) {
		var urlParts = parseURL(URL).query.split('&');
		for (var i = 0; i < urlParts.length; i++) {
			var ki = urlParts[i].split('=');
			if (ki[0] == param) return decodeURIComponent(ki[1]);
		}
	}

	function addQueryParameter(URL, param, value) {
		var add_pair = param + '=' + encodeURIComponent(value);
		var added = false;
		var urlParts = parseURL(URL);
		var pairs = urlParts.query.split('&');
		for (var i = 0; i < pairs.length; i++) {
			var ki = pairs[i].split('=');
			if (ki[0] == param) {
				pairs[i] = add_pair;
				added = true;
				break;
			}
		}
		if (!added) pairs.push(add_pair);
		return urlParts.path + '?' + pairs.join('&');
	}

	function createFunctionToExploreMilitaryUnits(aId, coste) {
		var funcion = function (){
			var inputElem = find("//input[@type='text']", XPList);
			if (inputElem.snapshotLength == 0) {
				inputElem = find("//input[@type='Text']", XPList);
			}
			var a = inputElem.snapshotItem(aId - 1);
			var b = find("//div[@name='exp" + aId + "']", XPFirst);
			var c = calculateResourceTime(arrayByN(coste, a.value));
			if (c != null) {
				b.innerHTML = '';
				if (boolIsT35 == true) c.setAttribute('id', 'resNtable');
				b.appendChild(c);
			} else if (b != null) b.innerHTML = '';
        }
        return funcion;
    }

    function timeToExploreMilitaryUnits() {
		if (!find("//form[@name='snd']//input[@type='image' and @value='ok']", XPFirst)) return;
		var clName = 'starts-with(@class="f10")';
		if (boolIsT35 == false) clName = "@class='f10'";
		var aX = find("//table[@class='tbg']//tr[not(@class)]//table[" + clName + "]", XPList);
		for (var i = 0; i < aX.snapshotLength; i++){
			var b = aX.snapshotItem(i);
			if (boolIsT35 == false) {
				var c = b.getElementsByTagName("TD")[2].textContent.split(" ")[0].split("|");
			} else {
				var c = b.textContent.replace("\n", "").split("|");
			}
			//log(3, "c = " + c);
			var div = document.createElement("DIV");
			div.setAttribute("name", "exp" + (i+1));
			var tr = elem("TR", "");
			var td = newCell("", [["colspan", "2"], ["class", "dcol f7 s7"]]);
			td.appendChild(div);
			tr.appendChild(td);
			var d = b.childNodes;
			d[d.length - 1].appendChild(tr);
			b.parentNode.parentNode.getElementsByTagName("INPUT")[0].addEventListener("keyup", createFunctionToExploreMilitaryUnits((i+1), c), 0);
		}
	}
	
	function NPCUpdate() {
		var boolShowNPCAssistant = getGMcookie("npcassistant", false);
		if (boolShowNPCAssistant == 'false') boolShowNPCAssistant = '1';
		if (boolShowNPCAssistant != '1') return;
		if (NPCexcludedPage(urlNow)) return;
		if (boolIsT35 == false) {
			var aMap = find("//map[@name='map1']", XPFirst);
		} else {
			var aMap = get("map1");
		}
		if (crtLocation.indexOf('build') != -1 && aMap == null) {
			var multipliers = null;
			var xpToEvaluate = '//td[@class="required"]';
			var clName = 'starts-with(@class="f10")';
			if (boolIsT35 == false) {
				clName = '@class="f10"';
				xpToEvaluate = '//div[@id="' + dmid2 + '"]//div/table[' + clName + ']/tbody/tr[1]/td';
			}
			var xpNeeded = xpathResultEvaluate(xpToEvaluate);
			if (xpNeeded.snapshotLength != 0) NPCAssistant(1, xpNeeded, multipliers);
			if (boolIsTroopsTrainingBuilding == true && document.getElementsByName('s1').length > 0) multipliers = getXmX(getXfields());
			xpNeeded = xpathResultEvaluate('//table[@class="tbg"]/tbody/tr/td/table['+ clName + ']/tbody/tr[2]/td');
			if (xpNeeded.snapshotLength == 0) xpNeeded = xpathResultEvaluate('//div[@class="build_desc"]//span[@class="required"]');
			if (xpNeeded.snapshotLength != 0) NPCAssistant(2, xpNeeded, multipliers);
		}
	}

	//function for the NPC entries on pages where an NCP trade is possible
	function NPCAssistant(typeNPC, xpNeeded, multipliers) {
		//log(3, "start NPCAssistant; typeNPC = " + typeNPC);
		var currentResUnitsTotal = currentResUnits[4];
		var productionPerHourTotal = productionPerHour[4];
		var currentBuildingName = TB3O.crtLocationTitle;

		// Needed resources
		for (var i = 0; i < xpNeeded.snapshotLength; i++) {
			var td = xpNeeded.snapshotItem(i);
			var arrContent = td.textContent.replace("\n", "").split("|");
			var arrayRes = new Array;
			for (xi = 0; xi < 4; xi++) {
				var intVal = parseInt(arrContent[xi]);
				if (isNaN(intVal)) return;
				arrayRes[arrayRes.length] = intVal;
			}
			//log(3, "arrayRes = " + arrayRes);
			if (arrayRes == null || arrayRes.length < 4) continue;
			// Read needed resources and calculate total
			var neededResUnits = new Array();
			var neededResUnitsTotal = 0;
			for (var j = 0; j < 4; j++) {
				neededResUnits.push(multipliers ? arrayRes[j] * multipliers[i] : arrayRes[j]);
				neededResUnitsTotal += arrayRes[j];
			}

			//change suggested by fr3nchlover.  Thank you !
			var neededTotal = multipliers && multipliers[i]!=0 ? neededResUnitsTotal * multipliers[i] : neededResUnitsTotal;
			
			// Get or create HTML container
			var container_id = 'npcXX_' + typeNPC + '_' + i;
			var container = undefined;
			while ((container = get(container_id)) == null) {
				//log(3, "td.nodeName = " + td.nodeName);
				if (td.nodeName == "TD") td.innerHTML += '<br>';
				td.innerHTML += '<div id="' + container_id + '" class="npc-general"> </div>';
			}
			// Show total & deficit/surplus
			var r = currentResUnitsTotal - neededTotal;
			var r_s = '(' + r + ')';
			if (r < 0) {
				r_s = '<span class="npc-red">(' + r + ')</span>';
			} else if (r > 0) {
				r_s = '<span class="npc-green">(+' + r + ')</span>';
			}
			container.innerHTML = '<b>' + T("TOTAL") + '</b>: ' + neededTotal + ' ' + r_s;

			// Show time estimate
			var dtNow = new Date();
			var dtEstimated = new Date();
			if (neededTotal > 0 && r < 0) {
				var secondsEstimated = Math.ceil(Math.abs(r) / (productionPerHourTotal / 3600));
				dtEstimated.setTime(dtNow.getTime() + (secondsEstimated * 1000));
				var formatDtEstimated =
					(dtEstimated.getDate() < 10 ? '0' + dtEstimated.getDate() : dtEstimated.getDate()) + '.' +
					(dtEstimated.getMonth() < 9 ? '0' + (dtEstimated.getMonth() + 1) : (dtEstimated.getMonth() + 1)) +
					(dtNow.getFullYear() < dtEstimated.getFullYear() ? dtEstimated.getYear() : '');
				if (dtEstimated.getDate() == dtNow.getDate() && dtEstimated.getMonth() == dtNow.getMonth()) {
					formatDtEstimated = "";
				} else {
					formatDtEstimated = '&nbsp;' + formatDtEstimated;
				}
				var formatTimeEstimated =
					(dtEstimated.getHours() < 10 ? '0' + dtEstimated.getHours() : dtEstimated.getHours()) + ':' +
					(dtEstimated.getMinutes() < 10 ? '0' + dtEstimated.getMinutes() : dtEstimated.getMinutes());
					container.innerHTML += ' | ' + T('LISTO') + '<span class="npc-red">' + formatDtEstimated + '&nbsp;' + '</span>' + T('A_LAS') + '&nbsp;' + '<span class="npc-red">' + formatTimeEstimated + '</span>';
			}

			// Show time saved by NPC
			var time_saved = 0;

			if (neededTotal > 0) {
				for (var j = 0; j < 4; j++) {
					var productionPerMinuteTotal = productionPerHour[j] / 60;
					var minutesUntilNPCpossible = (dtEstimated.getTime() - dtNow.getTime()) / 1000 / 60;
					var resAtNPCtime = parseInt(currentResUnits[j]) + (minutesUntilNPCpossible * productionPerMinuteTotal);
					var deficitUntilNPCtime = neededResUnits[j] - resAtNPCtime;
					if (deficitUntilNPCtime <= 0) continue;
					if (productionPerMinuteTotal <= 0) {
						time_saved = null;
						break;
					}
					var diffCalculated = Math.ceil(deficitUntilNPCtime / productionPerMinuteTotal);
					if (diffCalculated > time_saved)
						time_saved = diffCalculated;
				}
			}

			if (time_saved == null) {
				container.innerHTML += ' | &#8734;';
			} else if (r < 0) {
			} else if (time_saved > 0) {
				var diffHours = Math.floor(time_saved / 60);
				if (diffHours < 10) diffHours = "0" + diffHours;
				var diffMinutes = time_saved % 60;
				if (diffMinutes < 10) diffMinutes = "0" + diffMinutes;
				var delta_str = T('NPCSAVETIME') + '&nbsp;' + diffHours + ':' + diffMinutes + ' h';
				if (diffHours < 1) delta_str = '<span class="npc-red">' + delta_str + '</span>';
				container.innerHTML += ' | ' + delta_str;
			}

			// Show max.
			if (multipliers) {
				var maxY = Math.floor(currentResUnitsTotal / neededResUnitsTotal);
				container.innerHTML += ' | ' + T('MAX') + '. ';
				var aLink = newLink(maxY, [['href', jsVoid]]);
				aLink.addEventListener('click', clickOnNPCAssistant(i, maxY), false);
				container.appendChild(aLink);
			}

			// Show NPC link
			if (neededTotal > 0 && r >= 0 && (time_saved > 0 || time_saved == null) && boolShowNPCLink) {
				var urlNPCback = addQueryParameter(NPCURL, NPCResources, neededResUnits.join(','));
				urlNPCback = addQueryParameter(urlNPCback, NPCbacklinkName, currentBuildingName);
				container.innerHTML += '&nbsp;<a href="' + urlNPCback + '"> &raquo; NPC</a>';
			}
		}
		
		function clickOnNPCAssistant(i, maxY) {
			return function() {
				var aIfield = get("inputTroopNo_" + i);
				aIfield.value = maxY;
				//document.snd.' + xFields[i].name + '.value = max;
			}
		}
		
	}
	
	function tableTotalVillageTroopsV3() {
		//var villageID = getIdVillageV3().split("|")[1];
		var villageID = villageInfo[1];
		var htmlConsumption = '';
		var labelConsumption = '';
		var sendBackLink = new Array;
		//log(3, "entering tableTotalVillageTroopsV3");
		
		if (villageID != "0") {
			var strTD = 'th';
			var strBody = 'thead';
			if (boolIsT35 == false) {strTD = 'td'; strBody = 'tbody';}
			var vTroopTables = xpathResultEvaluate("//div[@id='" + dmid2 + "']/table/" + strBody + "/tr/" + strTD + "[1]/a[contains(@href, " + villageID + ")]/../../../..|//div[@id='" + dmid2 + "']/p[@class='b f16']");
			//var vTroopTables = xpathResultEvaluate("//div[@id='" + dmid2 + "']/table/thead/tr/" + strTD + "[1]/a[contains(@href, " + villageID + ")]/../../../..|//div[@id='" + dmid2 + "']/p[@class='b f16']");
			//log(3, "vTroopTables = " + vTroopTables.snapshotItem(0));
			if (vTroopTables.snapshotLength > 0) {
				var tTable = vTroopTables.snapshotItem(0).cloneNode(true);
				tTable.rows[0].setAttribute("class", "cbgx");
				var tTableTroopIconRow = tTable.rows[1];
				var tTableTroopUnitsRow = tTable.rows[2];
				var tTableConsumptionRow = tTable.rows[3];
				var aConsumption = 0;
				//log(3, "vTroopTables.snapshotLength = " + vTroopTables.snapshotLength);
				for (var i = 1; i < vTroopTables.snapshotLength; i++) {
					var aTable = vTroopTables.snapshotItem(i);
					//log(3, "i = " + i + "; aTable.nodeName = " + aTable.nodeName);
					if (aTable.nodeName == "P") break;
					//log(3, "i = " + i + "; aTable = " + aTable);
					//if (aTable.nodeName == "P") continue;
					//fix for the troops in oasis
					var nSibling = aTable.nextSibling;
					if (nSibling) {
						if (nSibling.nodeName == "P") {
							if (nSibling.className == 'b f16') i = vTroopTables.snapshotLength;
						}
					}
					//preparation for the recall all troops sent as reinforcement (if this will be implemented at all)
					if (aTable.rows[0].cells[1].innerHTML.indexOf("karte.php?d") != -1) {
						var aLinkhref = aTable.rows[3].cells[1].firstChild.rows[0].cells[1].firstChild;
						//log(3, "aLinkhref = " + aLinkhref);
						sendBackLink[sendBackLink.length] = aLinkhref;
					}
					
					if (aTable.nodeName == "P") { break; }
					//fix provided by fr3nchlover (THANK YOU !)
					var allTroopCells = aTable.rows[2].cells;
					if (allTroopCells.length == 12) {
						var heroIconCell = aTable.rows[1].cells[11];
						tTableTroopIconRow.appendChild(heroIconCell.cloneNode(true)); //<= add a new cell to first line
						tTableTroopUnitsRow.appendChild(allTroopCells[11].cloneNode(true)); //<= add a new cell to second line
						tTableTroopUnitsRow.cells[11].innerHTML = ""; // clean new cell
						tTableConsumptionRow.cells[1].colSpan = 11; // add 1 to cols
						tTable.rows[0].cells[1].colSpan = 11; // add 1 to cols
                    }
					
					//add the troop units from the current table to the new created table
					for (var j = 1; j < allTroopCells.length; j++) {
						var iHTML = tTableTroopUnitsRow.cells[j].innerHTML;
						var intTroops = parseInt(allTroopCells[j].innerHTML);
						if ((iHTML == undefined) || (iHTML == "")) {
							tTableTroopUnitsRow.cells[j].innerHTML = intTroops;
						} else {
							tTableTroopUnitsRow.cells[j].innerHTML = parseInt(iHTML) + intTroops;
						}
					}
					var currentCropCell = aTable.rows[3].cells[1];
					if (currentCropCell.innerHTML.indexOf('4.gif') != -1) {
						labelConsumption = aTable.rows[3].cells[0].innerHTML;
					}
				}
				
				for (var j = 1; j < tTableTroopUnitsRow.cells.length; j++) {
					tTableTroopUnitsRow.cells[j].className = (tTableTroopUnitsRow.cells[j].innerHTML == "0") ? "c" : "";
				}

				tTable.rows[0].cells[1].innerHTML = '<b>' + T('TOTALTROOPS') + '</b>';

				for (var xi = 1; xi < tTable.rows[1].cells.length; xi++) {
					if (xi == 11) {
						//hero
						aConsumption += 6;
					} else {
						//other troops
						if (boolIsT35 == false) {
							var troopImg = tTable.rows[1].cells[xi].innerHTML;
							var ti = troopImg.lastIndexOf("/");
							troopImg = troopImg.substring(ti + 1);
							ti = troopImg.indexOf(".");
							var troopType = troopImg.substring(0, ti);
							aConsumption += uc[parseInt(troopType)][9] * parseInt(tTable.rows[2].cells[xi].textContent);
						} else {
							var troopImg = tTable.rows[1].cells[xi].firstChild;
							var troopType = getTroopIndexTitleFromImage(troopImg);
							aConsumption += uc[parseInt(troopType)][9] * parseInt(tTable.rows[2].cells[xi].textContent);
						}
					}
				}
				tTableConsumptionRow.cells[1].innerHTML = (aConsumption) + " " + gIcons["cropcons"];
				if (labelConsumption != "")	tTableConsumptionRow.cells[0].innerHTML = labelConsumption;
				if (boolIsT35 == false) {
					var p = xpathResultEvaluate("//div[@id='" + dmid2 + "']/p[@class='txt_menue']").snapshotItem(0);
				} else {
					var p = xpathResultEvaluate("//div[@id='" + dmid2 + "']/p/a").snapshotItem(0).parentNode;
				}
				p.parentNode.insertBefore(tTable, p.nextSibling);

				newP = elem('P', '');
				newP.innerHTML += '<b>' + T('TOTALTROOPS') + '</b>';
				p.parentNode.insertBefore(newP, p.nextSibling);
			}
		}
    }
	
	function getDistance(x1, y1, x2, y2) {
		var dX = Math.min(Math.abs(x2 - x1),Math.abs(801 - Math.abs(x2 - x1)));
		var dY = Math.min(Math.abs(y2 - y1),Math.abs(801 - Math.abs(y2 - y1)));
		var dist = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
		return dist;
	}

	//------------------------------------------
	//Modified by Lux
	//------------------------------------------
	function showMsgPage(state) {
		scroll(0,0);
		var outerPane = get('OuterMsgPage');
		var innerPane = get('InnerMsgPage');
		var buttonPane = get('divCloseMsgPage');

		if (state) {
			diplayElements("none");
			outerPane.className = 'OuterMsgPageOn';
			innerPane.className = 'InnerMsgPageOn';
			buttonPane.className = 'divCloseMsgPageOn';

			var button = get('ButtonCloseMsgPage');
			//changed by ms99
			if (button) {
			//end changed by ms99
				button.addEventListener("click", function(){showMsgPage(false)}, true);
			}
		} else {
			outerPane.className = 'MsgPageOff';
			innerPane.className = 'MsgPageOff';
			buttonPane.className = 'MsgPageOff';
			diplayElements("");
		}
	}

	function addDiv() {
		var div = document.createElement("div");
		//modified by ms99
		div.innerHTML = '<div align="right" id="OuterMsgPage" class="MsgPageOff"></div>'+
						'<div align="right" id="divCloseMsgPage" class="MsgPageOff"></div>'+
						'<div id="InnerMsgPage" class="MsgPageOff"></div>';
		document.body.insertBefore(div, document.body.firstChild);
	}

	function diplayElements(type) {
		var uTable = get('resumen');
		var mapTable = get('tabla_mapa');
		var trooptimetable = get('trooptimetable');
		if (uTable != null) {
			uTable.style.display = type;
		} else if (mapTable != null) {
			mapTable.style.display = type;
		} else if (trooptimetable != null) {
			trooptimetable.style.display = type;
		}
	}
	//------------------------------------------

	function vilCount() {
		var VHead = find("//div[@id='" + dlright1 + "']/a[contains(@href, 'dorf3.php')]", XPList);
		var VList = find("//div[@id='" + dlright1 + "']//a[contains(@href, '?newdid=')]", XPList);
		if (VList.snapshotLength != 0 || VHead.snapshotLength != 0) {
			VCount = VList.snapshotLength;
			VHead.snapshotItem(0).firstChild.innerHTML = T('ALDEAS') + " (" + VCount + "):&nbsp;&nbsp;";
			var aLink = elem("A", "<img src='" + image["reload"] + "' width=12 title='" + T('UPDATEPOP') + "' alt='" + T('UPDATEPOP') + "'>");
			aLink.href = jsVoid;
			aLink.addEventListener("click", updatePopulation, false);
			insertAfter(VHead.snapshotItem(0), aLink);
		}
		function updatePopulation() {
			//var crtLocation = crtLocation;
			ajaxRequest('spieler.php', 'GET', null, function(AJAXrespX) {
				var aDoc = document.implementation.createDocument("", "", null);
				var aElem = document.createElement('DIV');
				aElem.innerHTML = AJAXrespX.responseText;
				aDoc.appendChild(aElem);
				var aTable = aDoc.evaluate("//div[@id='" + dmid2 + "']//table[@class='tbg'][2]", aElem, null, XPFirst, null).singleNodeValue;
				if (aTable) {
					var vPop = 0;
					var totalPop = 0;
					var totalVil = aTable.rows.length - 2;
					for (i = 2; i < totalVil + 2; i++) {
						vPop = parseInt(aTable.rows[i].cells[1].innerHTML);
						totalPop += vPop;
						var xy = aTable.rows[i].cells[2].innerHTML.split("|");
						var vID = xy2id(xy[0].substr(1), xy[1]);
						setGMcookie(vID, vPop, false);
					}
					pauseScript(892);
					location.href = crtLocation;
				}
			});
			return;
		}
	}

	function allyCalculation() {
		if (crtLocation.indexOf("allianz.php?aid") != -1) {
			if (boolIsT35 == false) {
				var allyTable = find("//div[@id='" + dmid2 + "']//table[@class='tbg']", XPFirst);
			} else {
				var allyTable = find("//div[@id='" + dmid2 + "']//table", XPFirst);
			}
			if (allyTable) {
				var iHTML = allyTable.rows[0].cells[0].innerHTML;
				var allyName = allyTable.rows[3].cells[1].innerHTML;
				allyTable.rows[0].cells[0].innerHTML = iHTML + " " + allyName + "<a href='" + crtLocation + "'>" + " " + "</a>";
			}
		}
	
		var a = find("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@width='6%']", XPFirst);
		if (a) {
			var aTable = a.parentNode.parentNode;
			var totalPop = 0;
			var totalVil = 0;
			var totalBullets = [[0, ""], [0, ""], [0, ""], [0, ""], [0, ""]]; //blue, green, yellow, red, grey
			var boolMyAlly = true;
			for (var i = 1; i < aTable.rows.length; i++) {
				totalPop += parseInt(aTable.rows[i].cells[2].innerHTML);
				totalVil += parseInt(aTable.rows[i].cells[3].innerHTML);
				if (boolMyAlly) {
					if (aTable.rows[i].cells[4]) {
						var imgBullet = aTable.rows[i].cells[4].firstChild;
						for (var j = 0; j < 5; j++) {
							if (imgBullet.src.indexOf("b" + (j + 1) + ".gif") != -1) {
								totalBullets[j][0] += 1;
								totalBullets[j][1] = imgBullet.title;
							}
						}
					} else {
						boolMyAlly = false;
					}
				}
			}
			var popPerPlayer = Math.round(totalPop/(aTable.rows.length - 1));
			var boolIsMyAlly = aTable.rows[1].cells.length == 5;

			var rowTotal = newRow("", [["class", "rbg"]]);
			aTable.appendChild(rowTotal);
			var aCell = newCell("<b>" + T('TOTAL') + "</b>", [["colspan", "2"], ["align", "center"]]);
			rowTotal.appendChild(aCell);
			var bCell = newCell("<b>" + totalPop + "</b>", [["align", "center"]]);
			rowTotal.appendChild(bCell);
			var cCell = newCell("<b>" + totalVil + "</b>", [["align", "center"]]);
			rowTotal.appendChild(cCell);
			if (boolIsMyAlly) {
				var x1Cell = elem("TD","");
				rowTotal.appendChild(x1Cell);
			}

			//average population per member of aliance
			var rowAverage = newRow("", [["class", "rbg"]]);
			aTable.appendChild(rowAverage);
			var dCell = newCell("<b>" + T('AVPOPPERPLAYER') + "</b>", [["colspan", "2"], ["align", "center"]]);
			rowAverage.appendChild(dCell);
			var eCell = newCell("<b>" + popPerPlayer + "</b>", [["colspan", "2"], ["align", "center"]]);
			rowAverage.appendChild(eCell);
			if (boolIsMyAlly) {
				var x2Cell = elem("TD","");
				rowAverage.appendChild(x2Cell);
			}

			//average population per village
			var rowAverage = newRow("", [["class", "rbg"]]);
			aTable.appendChild(rowAverage);
			var dCell = newCell("<b>" + T('AVPOPPERVIL') + "</b>", [["colspan", "2"], ["align", "center"]]);
			rowAverage.appendChild(dCell);
			var eCell = newCell("<b>" + Math.round(totalPop/totalVil) + "</b>", [["colspan", "2"], ["align", "center"]]);
			rowAverage.appendChild(eCell);
			if (boolIsMyAlly) {
				var x3Cell = elem("TD","");
				rowAverage.appendChild(x3Cell);
			}
			
			//number of bullets by type
			if (boolMyAlly) {
				var rowBullets = elem("TR", "");
				var cellBullets = newCell("", [['colspan', '5'], ['align', docDir[0]]]);
				var cBiHTML = "";
				var addSpacer = " | ";
				for (var j = 0; j < 5; j++) {
					if (totalBullets[j][0] > 0) {
						cBiHTML += "<img src='" + gIcons["b" + (j+1)] + "' title='" + totalBullets[j][1] + "'> = &nbsp;" + totalBullets[j][0] + addSpacer + " ";
					}
				}
				cellBullets.innerHTML = cBiHTML.substring(0, cBiHTML.length - 3);
				rowBullets.appendChild(cellBullets);
				aTable.appendChild(rowBullets);
			}
		}
	}

	//function to determine if the current active village is the capital (needed for precompute1 to show/hide the resource upgrade table for resource fields >= 10)
	function isThisTheCapital() {
		var capitalCoordsString = getGMcookie("capitalxy", false);
		var boolReturn = true;
		if (capitalCoordsString != "false") {
			capitalCoords = capitalCoordsString.replace("(", "").replace(")", "").split("|");
			var x = parseInt(capitalCoords[0]);
			var y = parseInt(capitalCoords[1]);
			var capitalID = xy2id(x, y);
			if (parseInt(capitalID) != parseInt(villageInfo[1])) boolReturn = false;		
		}
		return boolReturn;
	}

	function getTroopTrainingArray(trainingTable) {
		var intAdd = 1;
		var troopTraining = [[0,''],[0,''],[0,''],[0,''],[0,''],[0,''],[0,''],[0,''],[0,''],[0,''], [1,'']];
		//crtUserRace = getRace();
		if (crtUserRace != "false") {
			if (crtUserRace == "Teutons") {
				intAdd = 11;
			} else if (crtUserRace == "Gauls") {
				intAdd = 21;
			}
		}
		for (var i = 1; i < trainingTable.rows.length - 1; i++) {
			if (boolIsT35 == false) {
				var aImg = trainingTable.rows[i].cells[0].firstChild.src;
				if (aImg) {
					var xi = aImg.lastIndexOf("/");
					var xj = aImg.lastIndexOf(".");
					var iTroopType = aImg.substring(xi + 1, xj);
				}
			} else {
				var aImg = trainingTable.rows[i].cells[0].firstChild.className.split(" ");
				var iTroopType = parseInt(aImg[1].replace("u", ""));
			}
			var troopsTrained = parseInt(trainingTable.rows[i].cells[1].textContent);
			troopTraining[iTroopType - intAdd][0] += troopsTrained;
			troopTraining[iTroopType - intAdd][1] = trainingTable.rows[i].cells[2].textContent;
		}
		troopTraining[troopTraining.length - 1][0] = intAdd;
		return troopTraining;
	}
	
	function processTroopsTrainingTable() {
	
		//add cells/row to the original table
		if (boolIsT35 == false) {
			var origTable = find("//div[@id='" + dmid2 + "']//table[@class='tbg' and @cellspacing='1']", XPFirst);
		} else {
			var origTable = find("//div[@id='" + dmid2 + "']//table[@class='tbg' and @cellpadding='2']", XPFirst);
		}
		if (origTable) {
			origTable.setAttribute("id", "trainingTable");
			var hCell = newCell(gIcons["clock"] + "&" + gIcons["cropcons"], [['class', 'cbg1']]);
			origTable.rows[0].appendChild(hCell);
			for (xi = 1; xi < origTable.rows.length; xi++) {
				//color:blue;
				var aCell = newCell("", [['style', 'font-size:8pt;']]);
				origTable.rows[xi].appendChild(aCell);
			}
		}
	
		//get all the input cells
		var bInputList = find("//div[@id='" + dmid2 + "']//table[@class='tbg']//input[@type='Text']", XPList);
		if (bInputList == undefined || bInputList == null || (bInputList && bInputList.snapshotLength == 0)) {
			bInputList = find("//div[@id='" + dmid2 + "']//table[@class='tbg']//input[@type='text']", XPList);
		}
		if (bInputList) {
			//log(3," bInputList.snapshotLength = " + bInputList.snapshotLength);
			var tIndex = [0, ''];
			//trooInfo = array => troopIndex, time to build 1 troop of this type
			var troopInfo = [[0, 0], [0, 0], [0, 0], [0, 0]];
			for (var xi = 0; xi < bInputList.snapshotLength; xi++) {
				var bInput = bInputList.snapshotItem(xi);
				bInput.setAttribute("id", 'inputTroopNo_' + xi);
				//get the time for training this troop type
				var bRow = bInput.parentNode.parentNode;
				var bCell = bRow.cells[0].childNodes[1].rows[1].cells[0];
				var aTimeElem = bCell.innerHTML.split("|")[5];
				var aTime = aTimeElem.substring(aTimeElem.lastIndexOf(">") + 2);
				bCell.setAttribute("style", 'font-size:8pt;');
				var aTimeSeconds = ComputeSeconds(aTime);
				var tCell = bRow.cells[0].childNodes[1].rows[0].cells[0];
				if (tCell) {
					var tImg = tCell.firstChild;
					tIndex = getTroopIndexTitleFromImage(tImg);
					troopInfo[xi][0] = tIndex[0];
				}
				troopInfo[xi][1] = aTimeSeconds;
				var cCell = bRow.cells[3];
				bInput.addEventListener("keyup", computeTimeTrainTroops(xi, troopInfo, cCell), false);
				//bInput.addEventListener("change", computeTimeTrainTroops(xi, troopInfo, cCell), false);
				//get the number link
				var aNrLink = bRow.cells[2].childNodes[0].firstChild;
				aNrLink.addEventListener("click", computeTimeTrainTroops(xi, troopInfo, cCell), false);
			}
			//log(3, "troopInfo = " + troopInfo);
		}
	}
	
	function isThisTroopTrainingBuilding() {
		var aReturnValue = false;
		var strInputName = 't1';
		var cValue = find("//input[@name='" + strInputName + "']", XPFirst);
		if (cValue == null) {
			strInputName = 'z';
			cValue = find("//input[@name='" + strInputName + "']", XPFirst);
		}
		if (cValue) {
			if (boolIsT35 == false) {
				var aValue = find("//img[@class='unit']", XPFirst);
			} else {
				var aValue = find("//img[starts-with(@class, 'unit')]", XPFirst);
			}
			if (aValue) {
				//this is a barracks/stable/big barracks/big stable/workshop
				var aCell = find("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@width='5%']", XPFirst);
				if (aCell) {
					//there are troops being trained
					var trainingTable = aCell.parentNode.parentNode.parentNode;
					//log(3, "trainingTable = " + trainingTable);
					if (trainingTable) {
						var troopTraining = getTroopTrainingArray(trainingTable);
						var intAdd = troopTraining[troopTraining.length - 1][0];
						var aRow = newRow("", [["class", "cbg1"]]);
						var aCell = newCell(T('TOTALTROOPSTRAINING'), [["colspan", "5"]]);
						aRow.appendChild(aCell);
						trainingTable.appendChild(aRow);
						for (var i = 0; i < troopTraining.length - 1; i++) {
							if (troopTraining[i][0] > 0) {
								var bRow = elem("TR", "");
								var imgName = "src='" + gIcons["u" + (i + intAdd)] + "'";
								if (boolIsT35 != false) imgName = "class='unit u" + (i + intAdd) + "' src='img/x.gif'";
								var b1Cell = newCell("<img " + imgName + ">");
								bRow.appendChild(b1Cell);
								var b3Cell = newCell(troopTraining[i][1], [["colspan", "2"]]);
								bRow.appendChild(b3Cell);
								var b2Cell = newCell(troopTraining[i][0], [["colspan", "2"]]);
								bRow.appendChild(b2Cell);
								trainingTable.appendChild(bRow);
							}
						}
					}
				}
				processTroopsTrainingTable();
				aReturnValue = true
			}
		}
		return aReturnValue;
	}
	
	function computeTimeTrainTroops(xi, troopInfo, nodeToAppendTo) {
		return function() {
			var trNoInput = get("inputTroopNo_" + xi);
			var totalTimeCell = get("timeToTrainTroops_" + xi);
			var totalCropCell = get("ccTrainedTroops_" + xi);
			var boolAddDiv = false;
			if (trNoInput) {
				var intNo = trNoInput.value;
				if (intNo == '') {
					intNo = 0
				} else {
					intNo = parseInt(intNo);
				}
				if (isNaN(intNo)) intNo = 0;
				if (!isNaN(intNo)) {
					var totalSeconds = parseInt(intNo) * troopInfo[xi][1];
					var totalConsumption = 0;
					if (troopInfo[xi][0] > 0) {
						totalConsumption = parseInt(intNo) * uc[troopInfo[xi][0]][9];
					}
					var timeTotal = formatTime(totalSeconds);
					var aDiv = elem("DIV", "");
					var aTable = newTable();
					var iHTML1 = '';
					var iHTML2 = '';
					if (totalSeconds > 0) {
						iHTML1 = timeTotal + " h";
					}
					if (totalConsumption > 0) {
						var iHTML2 = gIcons["cropcons"] + " " + totalConsumption;
					}
					if (!totalTimeCell) {
						var aRow = elem("TR", "");
						// border-bottom:1px grey solid; color:blue;
						var aCell = newCell(iHTML1, [['style', 'font-size:8pt;' + tdNoBorder], ['id', 'timeToTrainTroops_' + xi]]);
						aRow.appendChild(aCell);
						aTable.appendChild(aRow);
						boolAddDiv = true;
					} else {
						totalTimeCell.innerHTML = iHTML1;
					}
					if (!totalCropCell) {
						var bRow = elem("TR", "");
						var bCell = newCell(iHTML2, [['style', 'font-size:8pt;' + tdNoBorder], ['id', 'ccTrainedTroops_' + xi]]);
						bRow.appendChild(bCell);
						aTable.appendChild(bRow);
						boolAddDiv = true;
					} else {
						totalCropCell.innerHTML = iHTML2;
					}
					if (boolAddDiv == true) {
						aDiv.appendChild(aTable);
						nodeToAppendTo.appendChild(aDiv);
					}
					
					//add the 2 bottom rows to the existing table
					var origTable = get("trainingTable");
					if (origTable) {
						if (!get("trbCell_0")) {
							var sRow = newRow("", [['class', 'cbg1']]);
							var aFsize = 10;
							var sCell = newCell(T('RESUMEN'), [['colspan', origTable.rows[0].cells.length]]);
							sRow.appendChild(sCell);
							origTable.appendChild(sRow);
							var bottomRow = elem("TR", "");
							var aColor = 'black';
							for (i = 0; i < origTable.rows[0].cells.length; i++) {
								//if (i == origTable.rows[0].cells.length - 1) {
									//aColor = 'blue';
								//}
								if (i == origTable.rows[0].cells.length - 1) aFsize = 8;
								var bCell = newCell("", [['style', 'font-size:' + aFsize + 'pt; color:' + aColor + ';'], ['id', 'trbCell_' + i]]);
								bottomRow.appendChild(bCell);
							}
							origTable.appendChild(bottomRow);
						}
						var btCell0 = get("trbCell_0");
						var btCell1 = get("trbCell_1");
						var btCell3 = get("trbCell_3");
						if (btCell0 && btCell1 && btCell3) {
							var iHTML0 = '';
							var iHTML1 = '';
							var iHTML3 = '';
							var intTotal = 0;
							var intTTotal = 0;
							var intCTotal = 0;
							for (i = 0; i < troopInfo.length; i++) {
								var inputX = get('inputTroopNo_' + i);
								if (inputX) {
									var intNo = inputX.value;
									if (intNo == '') {
										intNo = 0;
									} else {
										intNo = parseInt(intNo);
									}
									if (isNaN(intNo)) intNo = 0;
									if (i > 0) iHTML0 += " | ";
									var imgName = "src='" + gIcons["u" + troopInfo[i][0]] + "'"; 
									if (boolIsT35 != false) imgName = "class='unit u" + troopInfo[i][0] + "' src='img/x.gif'";
									iHTML0 += "<img " + imgName + "> " + intNo;
									intTotal += intNo;
									intTTotal += intNo * troopInfo[i][1];
									intCTotal += intNo * uc[troopInfo[i][0]][9];
								}
							}
							btCell0.innerHTML = iHTML0;
							if (intTotal > 0) iHTML1 = intTotal;
							btCell1.innerHTML = iHTML1;
							if (intTTotal > 0) iHTML3 = formatTime(intTTotal) + " h <br>" + gIcons["cropcons"] + " " + intCTotal;
							btCell3.innerHTML = iHTML3;
						}
					}
					
				} else {
					if (totalTimeCell) {
						totalTimeCell.innerHTML = "";
					}
					if (totalCropCell) {
						totalCropCell.innerHTML = "";
					}
				}
			}
		}
	}

	function processCoordsInMessage(iHTML) {
		var arrAction = getRallyPointDefaultActionArray();
		var arrCoords = iHTML.match(/\((-?\d+)\s*[\|\,\s\/]\s*(-?\d+)\)/g);
		if (arrCoords) {
			for (var j = 0; j < arrCoords.length; j++) {
				var xyCoord = arrCoords[j].replace(" ", "").replace(",", "|").replace(";", "|").replace("/", "|").replace("\\", "|");
				if (xyCoord.indexOf("(") == 0 && xyCoord.indexOf(")") != -1  && xyCoord.indexOf("|") != -1) {
					xyCoord = xyCoord.replace("(", "").replace(")", "");
					var xyCoord = xyCoord.split("|");
					var x2 = parseInt(xyCoord[0]);
					var y2 = parseInt(xyCoord[1]);
					var idVillage = xy2id(x2, y2);
					var villageLink = "<a href='karte.php?z=" + idVillage + "'>" + "( " + x2 + "|" + y2 + " )" + "</a>" +
					"&nbsp;<a href='a2b.php?z=" + idVillage + "'><img border='0' height='12' " + gIcons[arrAction[0]] + " title='" + arrAction[1] + "' alt='" + arrAction[1] + "'/></a>" +
					"&nbsp;<a href='build.php?z=" + idVillage + "&gid=17'>" + gIcons["r41"] + "</a>";
					iHTML = iHTML.replace(arrCoords[j], villageLink);
				}
			}
		}
		return iHTML;
	}
	
	function convertCoordsInMessagesToLinks() {
		var arrayCells;
		arrayCells = find("//td[@background]", XPList);
		for (var i = 0; i < arrayCells.snapshotLength; i++) {
			var aCell = arrayCells.snapshotItem(i);
			var iHTML = aCell.innerHTML;
			aCell.innerHTML = processCoordsInMessage(iHTML);
		}
	}

	function addPopulationStatistics() {
		var userTable = find("//div[@id='" + dmid2 + "']//table[@class='tbg']", XPFirst);
		if (userTable) {
			var iHTML = userTable.rows[0].cells[0].innerHTML;
			userTable.rows[0].cells[0].innerHTML = iHTML + " " + "<a href='" + crtLocation + "'>" + " " + "</a>";
		}
		var aTable = find("//div[@id='" + dmid2 + "']//table[@class='tbg'][2]", XPFirst);
		if (aTable) {
			var vPop = 0;
			var totalPop = 0;
			var totalVil = aTable.rows.length - 2;
			for (i = 2; i < totalVil + 2; i++) {
				vPop = parseInt(aTable.rows[i].cells[1].innerHTML);
				totalPop += vPop;
				var xy = aTable.rows[i].cells[2].innerHTML.split("|");
				var vID = xy2id(xy[0].substr(1), xy[1]);
				if (crtLocation.indexOf("spieler.php?uid=" + crtUserID) != -1) {
					setGMcookie(vID, vPop, false);
				}
			}
			//total row (population, villages)
			var rowTotal = newRow("", [["class", "rbg"]]);
			aTable.appendChild(rowTotal);
			var aCell = newCell("<b>" + T('TOTAL') + "</b>", [["colspan", "1"], ["align", "center"]]);
			rowTotal.appendChild(aCell);
			var bCell = newCell("<b>" + totalPop + "</b>", [["align", "center"]]);
			rowTotal.appendChild(bCell);
			cCell = elem("TD", "");
			rowTotal.appendChild(cCell);

			//average population per village
			var rowAverage = newRow("", [["class", "rbg"]]);
			aTable.appendChild(rowAverage);
			var dCell = newCell("<b>" + T('AVPOPPERVIL') + "</b>", [['colspan', '1'], ['align', 'center']]);
			rowAverage.appendChild(dCell);
			var eCell = newCell("<b>" + Math.round(totalPop/totalVil) + "</b>", [["align", "center"]]);
			rowAverage.appendChild(eCell);
			var fCell = elem("TD", "");
			rowAverage.appendChild(fCell);
			//move the "(capital)" string to the same line as the name of the capital
			var aSpan = find("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@class='s7']//span[@class='c']", XPFirst);
			if (aSpan) {
				aSpan.style.cssFloat = '';
				//aSpan.className = '';
				aSpan.style.display = '';
				//save capital name and capital coordinates as GM "cookies"
				if (crtLocation.indexOf("spieler.php?uid=" + crtUserID) != -1) {
					var cellCapital = aSpan.parentNode;
					var capitalCell = cellCapital.getElementsByTagName("A")[0];
					var capitalName = cellCapital.firstChild.firstChild.nodeValue;
					var capitalRow = cellCapital.parentNode;
					var capitalCoords = capitalRow.cells[2].textContent;
					setGMcookie("capital", capitalName, false);
					setGMcookie("capitalxy", capitalCoords, false);
				}
			}
		}
	}
	
	//flat function redesigned by rtellezi.  Thank you !
	function showTroopInfoTooltip(ucIndex, troopName) {
        return function() {
            var tooltip = get('tb_tooltip');
			var xAlign = docDir[1];
			var imgSpeed = "speed" + docDir[0].substring(0,1);
			
            var aTable = newTable([['cellpadding','2'], ['cellspacing','0']]);
           
            if (troopName != "") {
                //name of the troop row
                var aRow1 = elem("TR", "");
				var aCell1 = newCell(troopName, [['style', 'font-size:8pt; font-weight:bold;'], ['colspan', '6'], ['align', 'center']]);
                aRow1.appendChild(aCell1);
                aTable.appendChild(aRow1);
            }
           
            var aRow2 = elem("TR", "");           

            //attack power row
			var aCell2 = newCell("<img " + gIcons["att_all"] + ">", [['style', 'border-bottom:1px grey solid;']]);
			var aCell3 = newCell(uc[ucIndex][5], [['style', 'font-size:8pt; border-' + xAlign + ':1px grey solid; border-bottom:1px grey solid;'], ['align', xAlign]]);
            aRow2.appendChild(aCell2);
            aRow2.appendChild(aCell3);
                       
            //def power infantry row			
			var aCell4 = newCell("<img " + gIcons["def_i"] + ">", [['style', 'border-bottom:1px grey solid;']]);
			var aCell5 = newCell(uc[ucIndex][6], [['style', 'font-size:8pt; border-' + xAlign + ':1px grey solid; border-bottom:1px grey solid;'], ['align', xAlign]]);
            aRow2.appendChild(aCell4);
            aRow2.appendChild(aCell5);

            //def power cavalry row
			var aCell6 = newCell("<img " + gIcons["def_c"] + ">", [['style', 'border-bottom:1px grey solid;']]);
			var aCell7 = newCell(uc[ucIndex][7], [['style', 'font-size:8pt; border-bottom:1px grey solid;'], ['align', xAlign]]);
            aRow2.appendChild(aCell6);
            aRow2.appendChild(aCell7);
            aTable.appendChild(aRow2);
           
            var aRow3 = elem("TR", "");

            //speed only for troops as animals do not move
			var aCell8 = newCell("<img src='" + image[imgSpeed] + "'>", [['style', 'font-size:8pt']]);
			var tSpeed = "-";
			if (ucIndex < 31) {
				tSpeed = uc[ucIndex][8];
                if (crtLocation.indexOf('speed') != -1) {
					tSpeed = tSpeed * 2;
                }
			}
			var aCell9 = newCell(tSpeed, [['style', 'font-size:8pt; border-' + xAlign + ':1px grey solid;'], ['align', xAlign]]);
			aRow3.appendChild(aCell8);
            aRow3.appendChild(aCell9);
           
            //can carry
			var aCell10 = newCell("<img src='" + image["capacity"] + "'>", [['style', 'font-size:8pt']]);
			var aCell11 = newCell(uc[ucIndex][4], [['style', 'font-size:8pt; border-' + xAlign + ':1px grey solid;'], ['align', xAlign]]);
            aRow3.appendChild(aCell10);
            aRow3.appendChild(aCell11);
           
            //crop consumption
			var aCell12 = newCell(gIcons["cropcons"], [['style', 'font-size:8pt']]);
			var aCell13 = newCell(uc[ucIndex][9], [['style', 'font-size:8pt'], ['align', xAlign]]);
            aRow3.appendChild(aCell12);
            aRow3.appendChild(aCell13);
            aTable.appendChild(aRow3);

            tooltip.innerHTML = "";
            tooltip.appendChild(aTable);
            tooltip.style.display = 'block';
			tooltip.style.zIndex = 200;
        }
    }
	
	function addSelectAllCheckbox(intRows, mrTable) {
		//check for the "s10" element to avoid double checkbox from other scripts
		var sACheckbox = get("s10");
		if (!sACheckbox) {
			//there's no selectAll checkbox available so we're going to create it
			var sAcell = mrTable.rows[intRows - 1].cells[0];
			log(3, "sAcell.innerHTML = " + sAcell.innerHTML);
			var sAcolspan = sAcell.getAttribute("colspan");
			if (sAcolspan) {
				if (sAcolspan == "2") {
					sAcell.setAttribute('colspan', '1');
					sAcell.removeAttribute('class');
					if (boolIsT35 == false) {
						var bCell = newCell(sAcell.innerHTML, [['align', docDir[0]]]);
					} else {
						var bCell = document.createElement("TH");
						bCell.setAttribute("class", 'buttons');
						bCell.setAttribute('align', docDir[0]);
						bCell.innerHTML = sAcell.innerHTML;
					}
					insertAfter(sAcell, bCell);
				}
			}
			//sAcell.innerHTML = '<td align="center"><input id="s10" name="s10" onclick="Allmsg(this.form);" align="bottom" type="checkbox"></td>';
			sAcell.innerHTML = '<input id="s10" name="s10" onclick="Allmsg(this.form);" align="bottom" type="checkbox">';
			//now append the archive button if necessary
			if (!plus) {
				//log(3, "mrTable.rows.length = " + mrTable.rows.length + "; intRows = " + intRows + "; mrTable.rows[intRows - 1].cells.length = " + mrTable.rows[intRows - 1].cells.length);
				var buttonRow = mrTable.rows[intRows - 1].cells[1];
				if (buttonRow) {
					var bRiHTML = buttonRow.innerHTML;
					log(3, "bRiHTML = " + bRiHTML);
					if (bRiHTML.toUpperCase().indexOf("ARCHIVE") == -1) {
						buttonRow.innerHTML += '<input class="std" type="submit" name="archive" value="' + T('ARCHIVE') + '"/></input>';
					}
				}
			}
		}
	}
	
	function createDelRepTable(aLinks) {
		var delTable = newTable([['id', 'del_table'], ['width', '100%'], ['align', 'center'], ['cellspacing', '0'], ['cellpadding', '3'], ['border', '1px'], ['rules', 'all']]);
		delTable.setAttribute('style', 'border:1px solid #C2C2C2');
		var intMax = aLinks.length;
		if (intMax > 5) intMax = 5;
		var tRow = newRow("", [['class', 'rbg'], ['align', 'center']]);
		var tCell = newCell(T('ELIMINAR'), [['colspan', intMax]]);
		tRow.appendChild(tCell);
		var bRow = newRow("", [['align', 'center'], ['bgColor', '#EBEBEB']]);
		var cRow = elem("TR", "");
		cRow.align = 'center';
		var crtLink = crtLocation;
		for (var i = 0; i < intMax; i++) {
			var bTitle = aLinks[i].firstChild.nodeValue;
			var bCell = newCell(bTitle, [['style', 'border-top:1px solid #C2C2C2']]);
			bRow.appendChild(bCell);
			cTitle = T('MTCLEARALL') + " (" + bTitle  + ")";
			var cLink = elem("A", "<img src='" + image["delButton"] + "' title='" + bTitle + "' alt='" + bTitle + "'>");
			cLink.href = jsVoid;
			//log(3, "i = " + i + "; aLinks[i] = " + aLinks[i]);
			cLink.addEventListener('click', delete10Reports(i, aLinks), false);
			var cCell = newCell("", [['style', 'border-top:1px solid #C2C2C2']]);
			cCell.appendChild(cLink);
			cRow.appendChild(cCell);
		}
		delTable.appendChild(tRow);
		delTable.appendChild(bRow);
		delTable.appendChild(cRow);
		return delTable;
	}
	
	function delete10Reports(xi, aLinks) {
		return function() {
			//if (confirm(T('ELIMINAR') + ". " + T('AREYOUSURE'))) {
				//log(3, aLinks);
				var aLink = aLinks[xi].href;
				//log(3, "xi = " + xi + "aLink = " + aLink);
				var crtLink = crtLocation;
				setGMcookie("reportsPageToDelete", aLink, false);
				setGMcookie("reportsPageToReturnTo", crtLink, false);
				location.href = aLink;
			//}
		}
	}
	
	function MessageOptions(){
		if (crtLocation.indexOf("nachrichten.php") != -1) {
			var genLink = "nachrichten.php?s=";
			var archLink = ' | <a href="nachrichten.php?t=3">' + T('ARCHIVE') + '</a>';
		
			//code provided by rtellezi for enabling sending message by pressing the CTRL+ENTER keys.  Thank you !
			//modified by ms99 to apply only to the "igm" textarea
			if (document.evaluate) {
				var allInps = find("//textarea[@id='igm']", XPList);
		        for (var i = 0; i < allInps.snapshotLength; i++) {
		            var t = allInps.snapshotItem(i);
		            t.addEventListener("keydown", sendMessage, 0);
		        }
			}
		} else if (crtLocation.indexOf("berichte.php") != -1) {
			var genLink = "berichte.php?s=";
			var archLink = ' | <a href="berichte.php?t=5">' + T('ARCHIVE') + '</a>';
		}
		
		if (get("adressbuch")) return;
		var topMenu = find("//p[@class='txt_menue']", XPFirst);
		
		//add the Archive option to the menu if PLUS not available and if the Archive link is not already present (added by other scripts)
		if (!plus) {
			if (topMenu) {
				var tMiHTML = topMenu.innerHTML.split("|");
				var boolAddArchiveLink = false;
				if (genLink.indexOf("nachrichten.php") != -1) {
					if (tMiHTML.length < 4) boolAddArchiveLink = true;
				} else if (genLink.indexOf("berichte.php") != -1) {
					if (tMiHTML.length < 6) boolAddArchiveLink = true;
				}
				if (boolAddArchiveLink == true) {
					topMenu.innerHTML += archLink
				}
			}
		}

		//add the delete icons in a separate row below the menubar if on 'berichte.php' page
		if (crtLocation.indexOf("berichte.php") != -1  && crtLocation.indexOf("&id=") == -1 && topMenu) {
			var newMenu = newTable([["id", "rep_table"]]);
			var listTopMenuLinks = find("//p[@class='txt_menue']//a", XPList);
			var aLinks = new Array;
			//log(3, "listTopMenuLinks.snapshotLength = " + listTopMenuLinks.snapshotLength);
			var aRow = elem("TR", "");
			var aCell = newCell("", [['style', 'font-size:2pt;'], ["colspan", listTopMenuLinks.snapshotLength]]);
			aRow.appendChild(aCell);
			newMenu.appendChild(aRow);
			var aRow = newRow("", [["style", "white-space:nowrap;"]]);
			var aSeparator = " | ";
			for (var i = 0; i < listTopMenuLinks.snapshotLength; i++) {
				var aLink = listTopMenuLinks.snapshotItem(i);
				aLinks[i] = aLink;
				var aCell = elem("TD", "");
				aCell.appendChild(aLink);
				if (i == listTopMenuLinks.snapshotLength - 1) {
					aSeparator = "";
				}
				aCell.innerHTML = aCell.innerHTML + aSeparator;
				aRow.appendChild(aCell);
			}
			newMenu.appendChild(aRow);
			var boolShowRepDelTable = getGMcookie("showrepdeltable", false);
			if (boolShowRepDelTable != "0") {
				var delTable = createDelRepTable(aLinks);
				var lastDiv = find("//div[@id='" + dmid2 + "']", XPFirst);
				if (lastDiv) {
					var newPar = elem("P", "");
					insertAfter(lastDiv.lastChild, newPar);
					newPar.appendChild(delTable);
				}
			}
			insertAfter(topMenu.parentNode.firstChild, newMenu);
			removeElement(topMenu);
		}
		
		if (crtLocation.indexOf("?newdid=") != -1 && crtLocation.indexOf("&id=") != -1) return;
		
		//general variables needed for this function
		var mrTable;
		if (boolIsT35 == false) {
			mrTable = find("//table[@class='tbg']", XPFirst);
		} else {
			mrTable = find("//table[@class='reports std']", XPFirst);
			if (mrTable == null) {
				mrTable = find("//table[@class='tbg']", XPFirst);
			}
		}
		var intRows = mrTable.rows.length;
		
		addSelectAllCheckbox(intRows, mrTable);
		
		isThisReportsToDeletePage();
		
		//get the number of pages to preload from server
		var mesreppreloads = getGMcookie("mesreppreload", false);
		if (mesreppreloads == "false") {
			mesreppreload = 0;
			setGMcookie("mesreppreload", 0, false);
		} else {
			mesreppreload = parseInt(mesreppreloads) + 1;
			if (mesreppreload > 5) {
				mesreppreload = 4;
				setGMcookie("mesreppreload", 4, false);
			}
		}

		var pageNo1 = crtLocation.indexOf("?s=");
		if (pageNo1 != -1) {
			var pageNoS1 = crtLocation.substring(pageNo1 + 3);
			var crtPage = Math.round(parseInt(pageNoS1) / 10);
		} else {
			var crtPage = 0;
		}

		if (mesreppreload > 1) {
			for (var i = 1; i < mesreppreload; i++) {
				setTimeout(createMrPreloadFunc(i + crtPage), getRandomTimeRange(i * 498));
			}
			var X2 = (mesreppreload + crtPage) * 10;
			var X1 = (crtPage - mesreppreload) * 10;
			
			var intPgType = crtLocation.indexOf("t=");
			if (intPgType != -1) {
				var addLink = "&" + crtLocation.substr(intPgType,3);
			} else {
				var addLink = "";
			}
			
			var backLink = genLink + X1 + addLink;
			var forwardLink = genLink + X2 + addLink;
			
			var tdbfLinks = mrTable.rows[mrTable.rows.length - 1].cells[2];
			if (tdbfLinks) {
				if (X1 < 0) {
					var aSpan = elem("SPAN", "«");
					aSpan.setAttribute("style", "font-weight:bold;");
					aSpan.setAttribute("class", "c");
				} else {
					var aSpan = elem("A", "« ");
					aSpan.setAttribute("style", "font-weight:bold;");
					aSpan.href = backLink;
				}
				var fwLink = elem("A", "»&nbsp;");
				fwLink.setAttribute("style", "font-weight:bold;");
				fwLink.href = forwardLink;
				tdbfLinks.innerHTML = "";
				tdbfLinks.appendChild(aSpan);
				tdbfLinks.appendChild(fwLink);
			}
		}
		
		//code provided by rtellezi for sending message by pressing CTRL+ENTER (Thank you !)
		//modified by ms99 to work only on the form  action='nachrichten.php' and form name='msg'
		function sendMessage(event) {
			if (event.keyCode == 13 && event.ctrlKey) {
				var formSend = find("//form[@name='msg']", XPFirst);
				if (formSend) formSend.submit();
			}
			return;
		}

		function createMrPreloadFunc(page) {
			var intPgType = crtLocation.indexOf("t=");
			if (intPgType != -1) {
				var addLink = "&" + crtLocation.substr(intPgType,3);
			} else {
				var addLink = "";
			}
			return function() {
				ajaxRequest(genLink + (page * 10) + addLink, "GET", null, processMrPage, dummy);
			}
		}
		
		function processMrPage(t) {
			var ans = elem("DIV", t.responseText);
			var ansdoc = document.implementation.createDocument("", "", null);
			ansdoc.appendChild(ans);
			var boolShowMesOpenLinks = getGMcookie("showmesopenlinks", false);
			if (boolShowMesOpenLinks == 'false') boolShowMesOpenLinks = '1';
			
			var aTable = ansdoc.evaluate("//table[@class='tbg']", ans, null, XPFirst, null).singleNodeValue;
			if (aTable) {
				var maxRows = aTable.rows.length;
				var mrTable = find("//table[@class='tbg']", XPFirst);
				var lastRow = mrTable.rows[mrTable.rows.length - 1];
				removeElement(lastRow);
				if (maxRows > 3) {
					for (var xi = 1; xi < maxRows - 1; xi++) {
						var aRow = aTable.rows[xi];
						var xRow = elem("TR", "");
						var intNoOfCells = aRow.cells.length;
						if (intNoOfCells > 1) {
							for (var yi = 0; yi < intNoOfCells; yi++) {
								var aCell = aRow.cells[yi];
								var xCell = elem("TD", aCell.innerHTML);
								var iHTML = xCell.innerHTML;
								if (iHTML.indexOf("spieler.php") != -1) {
									var aNode = xCell.childNodes[0];
									if (aNode.href.search(/spieler.php\?uid=(\d+$)/) > 0) {
										var uid = RegExp.$1;
										//insert, if necessary travmap, world analyser and IGM links
										insertUserLinks(aNode, uid);
									}
								}
								if (boolShowMesOpenLinks == "1") {
									if (iHTML.indexOf("nachrichten.php?id=") != -1 || iHTML.indexOf("berichte.php?id=") != -1) {
										var aNode = xCell.childNodes[0];
										addReadMesRepInPopup(aNode);
									}
								}
								
								if (yi == 1) {
									xCell.setAttribute('align', docDir[0]);
									xCell.setAttribute('class', 's7');
								}
								xRow.appendChild(xCell);
							}
							mrTable.appendChild(xRow);
						}
					}
				} else {
				}
				mrTable.appendChild(lastRow);
			}
		}
	}
	
	function pauseScript(ms) {
		var ms1 = getRandomTimeRange(ms);
		var aDate = new Date();
		var crtDate = new Date();
		do {crtDate = new Date();}
		while (crtDate - aDate < ms1);
	}
	
	function isThisReportsToDeletePage() {
		var pageToDeleteReportsFrom = getGMcookie("reportsPageToDelete", false);
		var pageToReturnTo = getGMcookie("reportsPageToReturnTo", false);
		log(3, "pageToDeleteReportsFrom = " + pageToDeleteReportsFrom);
		if (pageToDeleteReportsFrom == "") return;
		if (pageToDeleteReportsFrom == crtLocation) {
			//log(3, "location.href = " + location.href);
			pauseScript(500);
			var allCB = find("//input[@type='checkbox' and not(@id)]", XPList);
			//log(3, "allCB.length = " + allCB.snapshotLength);
			if (allCB.snapshotLength > 0) {
				var selectAllCB = document.getElementsByName("s10");
				if (selectAllCB) {
					//log(3, "selectAllCB found");
					selectAllCB[0].click();
					var delButton = document.getElementsByName("del");
					if (delButton) {
						//log(3, "delButton found");
						setGMcookie("reportsPageToDelete", "", false);
						setGMcookie("reportsPageToReturnTo", "", false);
						pauseScript(500);
						delButton[0].click();
						
						//if (pageToReturnTo != "") {
						//	location.href = pageToReturnTo;
						//}
					}
				}
				//document.location.href = crtLink;
			} else {
				setGMcookie("reportsPageToDelete", "", false);
				setGMcookie("reportsPageToReturnTo", "", false);
			}
		} else {
			setGMcookie("reportsPageToDelete", "", false);
			setGMcookie("reportsPageToReturnTo", "", false);
		}
	}
	
	function toNumber(aValue) {
		return parseInt(aValue.replace(",", "").replace(",", "").replace(".", "").replace(".", "").replace(" ", "").replace(" ", "").replace("&nbsp;", "").replace("&nbsp", ""));
	}
	
	function getMerchantsInformation() {
		//get the current capacity of the merchants for this village
		merchantsCapacity = getGMcookie("merchantsCapacityV3", false);
		merchantsName = getGMcookie("merchantsName", false);
		if (merchantsName == "false") merchantsName = '';
		var sCapacity = "0";
		if (merchantsCapacity != "") {
			merchantsCapacity = merchantsCapacity.split("$$");
			for (var i = 0; i < merchantsCapacity.length; i++) {
				var aX = merchantsCapacity[i].split("$")
				if (aX[0] == villageInfo[1]) {
					sCapacity = aX[1];
				}
			}
		}
		merchantsCapacity = toNumber(sCapacity);
	}
	
	function getStatisticsMenu() {
		var topMenu = find("//p[@class='txt_menue']", XPFirst);
		if (topMenu) {
			var statArray = new Array();
			var listTitles = new Array();
			var aHrefList = xpathResultEvaluate("//div[@id='" + dmid2 + "']/p[@class='txt_menue']//a");
			var aTitleList = topMenu.textContent.split(" |");
			for (xi = 0; xi < aTitleList.length; xi++) {
				listTitles[xi] = aTitleList[xi].replace("\n", "").replace(" ", "");
				statArray[0] = listTitles[xi];
				var aLink = aHrefList.snapshotItem(xi).href; 
				statArray[1] = aLink.substring(aLink.lastIndexOf("/") + 1);
				addGMcookieValue("statArray", statArray, false);
				//log(3, "statArray = " + statArray);
			}
		}
	}
	
	function updateCrtProdPerHour() {
		var strProdPerHour = '';
		for (var i = 0; i < 4; i++) {
			strProdPerHour += productionPerHour[i];
			if (i < 3) strProdPerHour += "#";
		}
		strProdPerHour = villageInfo[0] + "#" + strProdPerHour;
		//log(3, "updateCrtProdPerHour function: strProdPerHour = " + strProdPerHour);
		updateGMcookieValue("prodPerHour", [villageInfo[1], strProdPerHour], false);
	}
	
	function getAllCrtProdPerHourTable() {
		var aCookie = getGMcookie("prodPerHour", false);
		log(3, aCookie);
	}
	
	function getArrayBuildingsInProgress() {
		var divName = "lbau1";
		var arrBiP = [['', '', ''], ['', '', ''], ['', '', '']];
		var divlbau = get(divName);
		if (!divlbau) {
			divName = "lbau2";
			divlbau = get(divName);
		}
		if (divlbau) {
			var tableBiP = find("//div[@id='" + divName + "']//table", XPFirst);
			var noOfRows = tableBiP.rows.length;
			for (xi = 0; xi < noOfRows; xi++) {
				var aName = tableBiP.rows[xi].cells[1].textContent.split(" (");
				arrBiP[xi][0] = aName[0];
				arrBiP[xi][1] = aName[1].replace(")", "");
				var lvl = arrBiP[xi][1].split(" ");
				arrBiP[xi][2] = lvl[1];
				//log(3, "aName = " + arrBiP[xi]);
			}
			if (noOfRows < 3) arrBiP.pop();
			if (noOfRows < 2) arrBiP.pop();
			//log(3, "noOfRows = " + noOfRows + "; arrBiP = " + arrBiP);
			return arrBiP;
		} else return null;
	}
	
	function adjustCSS() {
		if (boolIsT35 == false) {
			var cssResDiv = "#resDiv{position:absolute; top:69px; left:12px; z-index:20;}";
			GM_addStyle(cssResDiv);
		} else {
			var cssResDiv = "#resDiv{position:absolute; top:32px; left:12px; z-index:20;}";
			GM_addStyle(cssResDiv);
		}
	}
	
	//following functions from http://userscripts.org/scripts/show/35277
	//© Copyright 2007 Richard Laffers
	/************************ Start of Drag n drop******************************/
	var mouseOffset = null;
	var iMouseDown  = false;
	var lMouseState = false;
	var dragObject  = null;
	var curTarget   = null;
	function mouseCoords(ev){
		return {x:ev.pageX, y:ev.pageY};
	}
	
	function getMouseOffset(target, ev){
		var docPos  = getPosition(target);
		var mousePos  = mouseCoords(ev);
		return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
	}

	function getPosition(e){
		var left = 0;
		var top = 0;
		while (e.offsetParent){
			left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
			top += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
			e   = e.offsetParent;
		}
		left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		return {x:left, y:top};
	}
		
	function mouseMove(ev){
		var target = ev.target;
		var mousePos = mouseCoords(ev);
		if (dragObject){
			dragObject.style.position = 'absolute';
			dragObject.style.top  = (mousePos.y - mouseOffset.y) +'px';
			dragObject.style.left   = (mousePos.x - mouseOffset.x) +'px';
		}
		lMouseState = iMouseDown;
		return false;
	}

	function mouseUp(ev){
		//var dragObject = get("resbar_tooltip");
		if (dragObject) {
			//log(3, "dragObject = " + dragObject.id);
			if (dragObject.id == "resbar_tooltip") {
				if (docDir[0] == "left") {
					var dOx = dragObject.style.left;
				} else {
					var dOx = dragObject.style.right;
				}
				var dOy = dragObject.style.top;
				log(3, 'dOx + "|" + dOy = ' + dOx + "|" + dOy);
				setGMcookie("resbarXY", dOx + "|" + dOy, false);
			}
		}
		dragObject = null;
		iMouseDown = false;
	}

	function mouseDown(ev){
		var target = ev.target;
		iMouseDown = true;
		if (target.getAttribute('DragObj')){
			return false;
		}
	}

	function makeDraggable(parent, item){
		document.addEventListener('mousemove', mouseMove, false);
		document.addEventListener('mousedown', mouseDown, false);
		document.addEventListener('mouseup', mouseUp, false);
		if (!parent||!item) return;
		item.addEventListener('mousedown',function(ev){
			dragObject  = parent;
			mouseOffset = getMouseOffset(parent, ev);
			return false;
		}, false);
	}
	/************************ End of Drag n drop******************************/
	
	//General actions to be performed on all pages 
	//log(3, "Start script !");
	getGeneralData();
	//if (crtLocation.indexOf('statistiken.php') != -1)												getStatisticsMenu();
	if (crtLocation.indexOf('karte2.php') == -1) {
		changeHashLinksToJsVoid();
		hideAd();
		bigIconsBar();
		adjustCSS();
		leftMenuLinks();
		
	   	calculateFillTime();
		villageInfo = getIdVillageV3().split("|");
		villageList();

	   	deleteAccount();
		userBookmarks();
		//createResBarTooltip();
	}
	//log(3, "after all genfunctions: boolIsT35 = " + boolIsT35);
	//updateCrtProdPerHour();

	/* Specific actions to be performed only on specific pages */
	if (crtLocation.indexOf('allianz.php') != -1)													allyCalculation();
	if (crtLocation.indexOf('karte.php?') != -1 && crtLocation.indexOf('d=') != -1)					addTroopTimes();
	if (crtLocation.indexOf('build.php') != -1)														boolIsTroopsTrainingBuilding = isThisTroopTrainingBuilding();
	if (crtLocation.indexOf('build.php?') != -1)													{quickCity(); marketResources(); getMerchantsInformation();}
    if (crtLocation.indexOf('build.php') != -1) 													{timeToExploreMilitaryUnits();TimeToExplore();showOffers();}
    if (crtLocation.indexOf('dorf1') != -1)															preCompute1();
	if (crtLocation.match(/a2b\.php($|\?newdid=|\?z=)/)) 											selectAllTroops(); // Only for "Send troops" page.
	if (crtLocation.indexOf('dorf2') != -1 || crtLocation.indexOf('build.php?newdid=') != -1)		preCompute2();
    if (crtLocation.indexOf('a2b.php') != -1)														{quickCity(); defaultAttackType(); }
    if (crtLocation.match(/dorf3.php($|\?newdid=(\d+)$)/) || crtLocation.indexOf('dorf3.php') != -1) overviewVillages();
    if (crtLocation.match(/build.php\?(.*)&s=2/))													culturePoints();
    if (crtLocation.match(/build.php\?(.*)&t=1/))													{addAllyColumnForMarketOffers(); MarketFilters(); }
    //if ((crtLocation.match(/karte.php($|\?z=|\?new)/) && crtLocation.indexOf('d=') == -1) || crtLocation.match(/karte.php($|\?newdid=(\d+)$)/)) {mapFunctions(); installMapEventHandler(); }
	if ((crtLocation.match(/karte.php($|\?z=|\?new)/) && crtLocation.indexOf('d=') == -1) || crtLocation.match(/karte.php($|\?newdid=(\d+)$)/)) {mapFunctions(); }
	if (crtLocation.indexOf('gid=16') != -1 || crtLocation.indexOf('id=39') != -1) 					tableTotalVillageTroopsV3();
	if (crtLocation.match(/nachrichten.php($|\?t=|\?s=|\?newdid=)/) || crtLocation.match(/berichte.php($|\?t=|\?s=|\?newdid=)/)) {MessageOptions();}
	if (crtLocation.indexOf("nachrichten.php?") != -1)												convertCoordsInMessagesToLinks();
	if (crtLocation.indexOf("berichte.php?") != -1)													battleReportV2("orig");
	if (crtLocation.indexOf("spieler.php?") != -1 && crtLocation.indexOf("uid") != -1)				addPopulationStatistics();
	if (crtLocation.indexOf('spieler.php') != -1 && crtLocation.indexOf('?') == -1) 				getSingleTown(); //to capture the change of the singleTown name while in the Profile
	if (boolIsHerosMansion())																		showHeroStatus();
	if (boolIsThisNPC()) 																			fillOutNPCfields(urlNow);
	if (crtLocation.indexOf('build.php') != -1)														NPCUpdate();
	if (boolIsThisPostNPC())																		insertNPCHistoryLink();

	/* General actions  continued */
	if (getGMcookie("starttimers", false) == "false")												setTimers();
	if (boolShowTroopInfoTooltips == "1")															showTroopInfo();
	playerLinks();
	
   	displayTBTotalRuntime();

};

//window.addEventListener('load', functionMain, false);
if (window.addEventListener) {
	window.addEventListener('load', functionMain, false);
} else {
	window.attachEvent('onload', functionMain);
}
