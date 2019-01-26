	function setSearch(forum)
	{
		forum.action = "searchindex.asp?zoom_query=" + forum.KW.value + "&s=s&filtervalue=" + forum.KW.value;
	}

	//disable tooltip for iOS
	var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

	function positionToolTip (ctrl,e) 
	{
		if (! iOS)
		{
			var scroll = getScroll();
			var d = ctrl;
			
			if (d.offsetWidth >= scroll.width)
				d.style.width = scroll.width - 10 + "px";
			else
				d.style.width = "";
				
			//ow = d.offsetWidth;
			oh = d.offsetHeight;
			ow = 525;
			//oh = 225;
			
			d.style.left = (e.clientX + 10) + "px";
			d.style.top = (e.clientY + 10) + "px";
			
			var scrollTop = document.body.scrollTop;
			var scrollLeft = document.body.scrollLeft;
			var clientWidth = document.body.clientWidth;
			var clientHeight = document.body.clientHeight;
			
			if (document.compatMode && document.compatMode != "BackCompat")
			{
				 scrollTop = document.documentElement.scrollTop;
				 scrollLeft = document.documentElement.scrollLeft;
				 clientWidth = document.documentElement.clientWidth;
				 clientHeight = document.documentElement.clientHeight;	        
			}		 
		
			if (document.all && typeof scrollTop != "undefined") {	// IE model
				d.style.left = parseInt(d.style.left) + scrollLeft;
			   d.style.top = parseInt(d.style.top) + scrollTop;		
			}else{
			  d.style.left = (parseInt(d.style.left) + window.pageXOffset) + "px";
			  d.style.top = (parseInt(d.style.top) + window.pageYOffset) + "px";			
			}	
			
		
			right = parseInt(ow) + parseInt(d.style.left);
			end = parseInt(oh) + parseInt(d.style.top);
					
			if (document.all && typeof scrollTop != "undefined") {	// IE model
				
			if (right >= clientWidth + scrollLeft)
				//d.style.left = (clientWidth - (ow*2) + scrollLeft) + "px";
				d.style.left = (e.clientX - ow + scrollLeft) + "px";
			if (end >= clientHeight + scrollTop)
				//d.style.top = (clientHeight - (oh*2) + scrollTop) + "px";
				d.style.top = (e.clientY - oh - 25 + scrollTop) + "px";
			
			}else{

			  if (right >= window.innerWidth + window.pageXOffset)
				//d.style.left = (window.innerWidth - (ow*2) + window.pageXOffset) + "px";
				d.style.left = (e.clientX - ow + window.pageXOffset) + "px";
			if (end >= window.innerHeight + window.pageYOffset)
				//d.style.top = (window.innerHeight - (oh*2) + window.pageYOffset) + "px";		    
				d.style.top = (e.clientY - oh - 25 + window.pageYOffset) + "px";
			}
			
			d.style.position = "absolute";	        
			d.style.display = "";		
		}
	}
	
	// returns the scroll left and top for the browser viewport.
	function getScroll() {
		if (document.all && typeof document.body.scrollTop != "undefined") {	// IE model
			var ieBox = document.compatMode != "CSS1Compat";
			var cont = ieBox ? document.body : document.documentElement;
			return {
				left:	cont.scrollLeft,
				top:	cont.scrollTop,
				width:	cont.clientWidth,
				height:	cont.clientHeight
			};
		}
		else {
			return {
				left:	window.pageXOffset,
				top:	window.pageYOffset,
				width:	window.innerWidth,
				height:	window.innerHeight
			};
		}
	}


function hidehint()
{
	document.getElementById("prhint").style.display = "none";
//	document.getElementById("prhintimg").src = "img/hourglass.gif";
//	document.getElementById("prhintdesc").innerHTML = "";
//	document.getElementById("prhintname").innerHTML = "";
}

function showhint(img, desc, name, event)
{
	if (! iOS)
	{
		document.getElementById("prhintdesc").innerHTML = desc;
		document.getElementById("prhintname").innerHTML = "<b>" + name + "</b>";

		elsrc = document.getElementById("prhintimg");

		if (img != "")
		{
			elsrc.src = img;
			elsrc.style.display = "";
		}
		else
		{
			elsrc.src = "img/empty.png";
			elsrc.style.display = "none";
		}

		el = document.getElementById("prhint");

		//el.style.top = (getPosition(event).y + 20) + "px";
		//el.style.left = (getPosition(event).x) + "px";

		positionToolTip(el, event);

		//el.style.display = "";
	}
}

function movehint(event)
{
	el = document.getElementById("prhint");

/*
	el.style.top = (getPosition(event).y + 20) + "px";
	el.style.left = (getPosition(event).x) + "px";
	el.style.display = "";
	*/
	positionToolTip(el, event);
}

function startDL(fname,api,dlcount)
{
	window.location = "?dl=" + fname + "&a=" + api + "&c=" + dlcount
//	window.location = 'http://www.tmssoftware.com/' + fname;
}


function togglediv(id)
{
	var mydiv = document.getElementById("faq" + id);
	var myimg = document.getElementById("img" + id);

	if (mydiv.style.display == "none")
	{
		mydiv.style.display = "";
		myimg.src = "img/nodeclose.gif";
	}
	else
	{
		mydiv.style.display = "none";
		myimg.src = "img/nodeopen.gif";
	}
}

function confirmAction(msg){
	var allowClick = confirm(msg);
	return allowClick;
}

function Check_Cookie() {
        Set_Cookie('test', 'none', '', '/', '', '');
        if (Get_Cookie('test')) {
                Delete_Cookie('test', '/', '');
        }
        else {
                alert("Please enable cookies to use the login functionality.");
				return false;
        }
}

function Set_Cookie(name, value, expires, path, domain, secure)  {
	var today = new Date();
	today.setTime( today.getTime() );
	if (expires) {
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date(today.getTime() + (expires));

	document.cookie = name + "=" +escape( value ) + (( expires ) ? ";expires=" + expires_date.toGMTString() : "") +  (( path ) ? ";path=" + path : "") + (( domain ) ? ";domain=" + domain : "") + (( secure ) ? ";secure" : "");
}

function Get_Cookie(name) {
	var start = document.cookie.indexOf( name + "=" );
	var len = start + name.length + 1;
	if (!start) 
		if (name != document.cookie.substring(0, name.length)) {
		return null;
	}
	if (start == -1)
		return null;
	var end = document.cookie.indexOf(";", len);
	if (end == -1)
		end = document.cookie.length;
	return unescape(document.cookie.substring(len, end));
}

function Delete_Cookie(name, path, domain) {
	if (Get_Cookie(name)) document.cookie = name + "=" + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}




function write_sales(subject)
{
  document.write('<a href="');
  document.write('mail');
  document.write('to:sales');
  document.write('@');
  document.write('tmssoftware');
  document.write('.com'); 
  
  if ( (subject != "") && (subject != undefined))
  {
	  document.write('?subject=' + subject)
  }

  document.write('">sales');
  document.write('@');
  document.write('tmssoftware');
  document.write('.com</a>');
}

function write_info()
{
  document.write('<a href="');
  document.write('mail');
  document.write('to:info');
  document.write('@');
  document.write('tmssoftware');
  document.write('.com">info');
  document.write('@');
  document.write('tmssoftware');
  document.write('.com</a>');
}

function write_support()
{
  document.write('<a href="');
  document.write('mail');
  document.write('to:support');
  document.write('@');
  document.write('tmssoftware');
  document.write('.com">support');
  document.write('@');
  document.write('tmssoftware');
  document.write('.com</a>');
}

function write_help()
{
  document.write('<a href="');
  document.write('mail');
  document.write('to:help');
  document.write('@');
  document.write('tmssoftware');
  document.write('.com">help');
  document.write('@');
  document.write('tmssoftware');
  document.write('.com</a>');
}

function write_brasil(subject)
{
	if (subject != "")
	{
		subject = "?subject=" + subject
	}

  document.write('<a href="');
  document.write('mail');
  document.write('to:brasil');
  document.write('@');
  document.write('tmssoftware');
  document.write('.com' + subject + '">brasil');
  document.write('@');
  document.write('tmssoftware');
  document.write('.com</a>');
}

function write_brasil_order(subject)
{
	if (subject != "")
	{
		subject = "?subject=" + subject
	}

  document.write('<a href="');
  document.write('mail');
  document.write('to:brasil');
  document.write('@');
  document.write('tmssoftware');
  document.write('.com' + subject + '">order now');
  document.write('</a>');
}


function trim(value) {
  value = value.replace(/^\s+/,'');
  value = value.replace(/\s+$/,'');
  return value;
}

function toggle(fld,focussed) 
{
  if (focussed) 
  {
    if (fld.value==fld.defaultValue) 
	{
      fld.className='focus';
      fld.value=''; 
    }
  }
  else 
  { 
    if (fld.value=='') 
	{
      fld.className='text';
      fld.value = fld.defaultValue; 
    }
  }
}

function validate()
{
	var mail = document.getElementById("REGEMAIL");
	var code = document.getElementById("REGCODE");

	if ( 
		(mail.value == mail.defaultValue)
		|| (code.value == code.defaultValue)
		|| (trim(mail.value) == "")
		|| (trim(code.value) == "")
	)
	{
		alert("Please enter your registration e-mail address and code.");
		return false;
	}
	else
	{
		document.getElementById("loginbutton").disabled = true;
		return true;
	}
}

function validateLogin()
{
	var mail = document.getElementById("REGEMAIL");
	var code = document.getElementById("REGCODE");

	if ( 
		(trim(mail.value) == "")
		|| (trim(code.value) == "")
	)
	{
		alert("Please enter your registration e-mail address and code.");
		return false;
	}
}

function validateEmail(email)   
{  
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
	return re.test(email);
} 

function validateAlert()
{
	var mail = document.getElementById("ALERTEMAIL");

	if (! validateEmail(mail.value))
	{
		alert("Please enter a valid e-mail address.");
		return false;
	}
}

function validateNL()
{
	var mail = document.getElementById("NLALERTEMAIL");

	if (! validateEmail(mail.value))
	{
		alert("Please enter a valid e-mail address.");
		return false;
	}
}

function validate3()
{
	var search = document.getElementById("zoom_query");

	if ( 
		(search.value == search.defaultValue)
		|| (trim(search.value) == "")
	)
	{
		alert("Please enter a search text.");
		return false;
	}
}

function validateSearch()
{
	var search = document.getElementById("search_query");

	if ( 
		(search.value == search.defaultValue)
		|| (trim(search.value) == "")
	)
	{
		alert("Please enter a search text.");
		return false;
	}
}

function validate4()
{
	var mail = document.getElementById("CODEEMAIL");
	var name = document.getElementById("CODENAME");

	if (
		(trim(mail.value) == "")
		&&
		(trim(name.value) == "")
	   )
	{
		alert("Please enter your registration e-mail address or your companyname/username.");
		return false;
	}
}


//orders

	function getPosition(e) {
		e = e || window.event;
		var cursor = {x:0, y:0};
		if (e.pageX || e.pageY) {
			cursor.x = e.pageX;
			cursor.y = e.pageY;
		} 
		else {
			var de = document.documentElement;
			var b = document.body;
			cursor.x = e.clientX + 
				(de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
			cursor.y = e.clientY + 
				(de.scrollTop || b.scrollTop) - (de.clientTop || 0);
		}
		return cursor;
	}

	function showtitle(show,ctrl,event)
	{
		if (! iOS)
		{
			var el = document.getElementById("legend");
			el.innerHTML = ctrl;

			ShowLegend(show,"",event,false)
		}
	}

	function hidetitle()
	{
		var el = document.getElementById("legend");
		el.style.display = 'none';
		el.style.top = "0px";
		el.style.left = "0px";
	}

	function ShowLegend(show,ctrl,event,pos)
	{
		var el = document.getElementById('legend' + ctrl);
		var selel = document.getElementById('select' + ctrl);

		var movepos = 0
		if (pos)
			movepos = 325;

		if (show)
		{
			el.style.display = '';
			el.style.top = (getPosition(event).y + 22) + "px";
			el.style.left = (getPosition(event).x - movepos) + "px";
			el.style.position = 'absolute';

		
			if (selel)
				selel.style.visibility = 'hidden';
		}
		else
		{
			el.style.display = 'none';
			el.style.top = "0px";
			el.style.left = "0px";

			if (selel)
				selel.style.visibility = 'visible';
		}
	}

	function OrderClick(id,prname,ctrl)
	{
		if (id == "103312" || id == "195965")
			id = id + "&ADDITIONAL1[" + id + "]=" + prname

		url = "https://secure.element5.com/register.html?prognr=" + id + "&languageid="

		if (ctrl.selectedIndex == 1)
			url += "8"
		else if (ctrl.selectedIndex == 2)
			url += "6"
		else if (ctrl.selectedIndex == 3)
			url += "3"
		else if (ctrl.selectedIndex == 4)
			url += "2"
		else if (ctrl.selectedIndex == 5)
			url += "5"
		else if (ctrl.selectedIndex == 6)
			url += "4"
		else
			url += "1"

		window.location = url
	}

	function AddToCart(id,prname,ctrl,cartcontent)
	{
		url = ""

		if (ctrl.selectedIndex == 1)
			url += "8"
		else if (ctrl.selectedIndex == 2)
			url += "6"
		else if (ctrl.selectedIndex == 3)
			url += "3"
		else if (ctrl.selectedIndex == 4)
			url += "2"
		else if (ctrl.selectedIndex == 5)
			url += "5"
		else if (ctrl.selectedIndex == 6)
			url += "4"
		else
			url += "1"

		url = "?addtocart=" + url + "&addid=" + id

		if (id == "103312" || id == "195965")
			url = url + "&addbasic=" + prname

		window.location = url	  
	}

	function changeLang(ctrl,idx)
	{
		url = "1"

		if (ctrl.selectedIndex == 1)
			url = "8"
		else if (ctrl.selectedIndex == 2)
			url = "6"
		else if (ctrl.selectedIndex == 3)
			url = "3"
		else if (ctrl.selectedIndex == 4)
			url = "2"
		else if (ctrl.selectedIndex == 5)
			url = "5"
		else if (ctrl.selectedIndex == 6)
			url = "4"

		href = document.getElementById("buy" + idx).href;
		//href = href.substr(0,href.length-1) + url
		href = href + "&languageid=" + url;
		document.getElementById("buy" + idx).href = href;

		href = document.getElementById("add" + idx).href;		
		href = href + "&languageid=" + url;
		document.getElementById("add" + idx).href = href;

	}

//	https://secure.element5.com/shareit/cart.html?PRODUCT[100838]=1&PRODUCT[300143280]=1&languageid=1&currencies=EUR&js=-1


//-------
//changes inputtype text to inputtype password onfocus
//-------

/*
// Note: It is known that the dss_addLoadEvent function crashes Netscape 
// versions 4.02 and older. I recommend you use a more comprehensive event 
// management script for production (aka "live") pages.
function dss_addLoadEvent(fn) {
  if(typeof(fn)!="function")return;
  var tempFunc=window.onload;
  window.onload=function() {
    if(typeof(tempFunc)=="function")tempFunc();
    fn();
  }
}


// Example 2 (JS part 1)
function changeInputType(
  oldElm, // a reference to the input element
  iType, // value of the type property: 'text' or 'password'
  iValue, // the default value, set to 'password' in the demo
  blankValue, // true if the value should be empty, false otherwise
  noFocus) {  // set to true if the element should not be given focus
  if(!oldElm || !oldElm.parentNode || (iType.length<4) || 
    !document.getElementById || !document.createElement) return;
  var newElm = document.createElement('input');
  newElm.type = iType;
  if(oldElm.name) newElm.name = oldElm.name;
  if(oldElm.id) newElm.id = oldElm.id;
  if(oldElm.className) newElm.className = oldElm.className;
  if(oldElm.size) newElm.size = oldElm.size;
  if(oldElm.tabIndex) newElm.tabIndex = oldElm.tabIndex;
  if(oldElm.accessKey) newElm.accessKey = oldElm.accessKey;
  newElm.onfocus = function(){return function(){
    if(this.hasFocus) return;
    var newElm = changeInputType(this,'password',iValue,
      (this.value.toLowerCase()==iValue.toLowerCase())?true:false);
    if(newElm) newElm.hasFocus=true;
  }}();
  newElm.onblur = function(){return function(){
    if(this.hasFocus)
    if(this.value=='' || (this.value.toLowerCase()==iValue.toLowerCase())) {
      changeInputType(this,'text',iValue,false,true);
    }
  }}();
 // hasFocus is to prevent a loop where onfocus is triggered over and over again
  newElm.hasFocus=false;
  oldElm.parentNode.replaceChild(newElm,oldElm);
  if(!blankValue) newElm.value = iValue;
  if(!noFocus || typeof(noFocus)=='undefined') {
    window.tempElm = newElm;
    setTimeout("tempElm.hasFocus=true;tempElm.focus();",1);
  }
  return newElm;
}
*/

//highlight anchor links for subnav
/*
sfTarget = function() {	
	var sfEls = document.getElementsByTagName("H3");
	var aEls = document.getElementsByTagName("A");
	document.lastTarget = null;
	if (cls)
	{
		for (var i=0; i<sfEls.length; i++) {
			if (sfEls[i].id) {
				if (location.hash==("#" + sfEls[i].id)) {
					sfEls[i].className+=" " + cls;
					document.lastTarget=sfEls[i];
				}
				for (var j=0; j<aEls.length; j++) {
					if (aEls[j].hash==("#" + sfEls[i].id)) aEls[j].targetEl = sfEls[i]; aEls[j].onclick = function() {
						if (document.lastTarget) document.lastTarget.className = document.lastTarget.className.replace(new RegExp(" sftarget\\b"), "");
						if (this.targetEl) this.targetEl.className+=" sftarget"; document.lastTarget=this.targetEl;
						return true;
					}
				}
			}
		}
	}
}
if (window.attachEvent) window.attachEvent("onload", sfTarget);
*/


function social() {
	this.txtVersion = "1.2";
	this.addtoInterval = null;
	this.popupWin = '';
	this.addtoMethod=1;
	this.AddTitle=null;
	this.AddURL=null;
	
	this.sns=[
	 {name:'Facebook',		image: 'icon_facebook.png',	url: 'http://www.facebook.com/sharer.php?', urlVar: 'u', titleVar: 't', noteVar: '', returnVar: '', otherVars: '' },
	 {name:'Twitter',		image: 'icon_twitter.png',	url: 'http://www.twitter.com/home?status', urlVar: '', titleVar: '', noteVar: '', returnVar: '', otherVars: '' },
	 {name:'Google Bookmarks',		image: 'icon_google_favicon.png',		url: 'http://www.google.com/bookmarks/mark?',		urlVar: 'bkmk',	titleVar: 'title',	noteVar: '',	returnVar: '',	otherVars: '&op=edit' },
//	 {name:'Windows Live',	image: 'windows.png',		url: 'https://favorites.live.com/quickadd.aspx?', urlVar: 'url', titleVar: 'title',	noteVar: '',	returnVar: '',	otherVars: '&marklet=1&mkt=en-us&top=1' }
//	 ,{name:'Yahoo! Bookmarks',	image: 'AddTo_Yahoo.png',		url: 'http://myweb2.search.yahoo.com/myresults/bookmarklet?', urlVar: 'u', titleVar: 't',	noteVar: '', returnVar: '', otherVars: '&d=&ei=UTF-8' }
	];

	this.DrawLink = function(varName, index, cellClass)
	{
		document.write("<a class=\"" + cellClass + "\" title=\"Add this to " + this.sns[index].name + "\" ");
		document.write("onclick=\"return " + varName + ".addto(" + index.toString() + ", '" + this.AddURL + "', '" + this.AddTitle + "');\" href=\"#\"><img class=\"bmimg\" align=\"absmiddle\" src=\"img/" + this.sns[index].image + "\" ");
		document.write("border=\"0\" />" + /*this.sns[index].name +*/ "</a> ");
	};

	this.DrawLinks = function (varName, href, title, cols, width, headClass, cellClass) 
	{
		this.AddTitle = title;
		this.AddURL = href;

		//document.write("<span class=\"" + headClass + "\">Add this article to: </span> ")
		for (var i = 0; i < this.sns.length; i++)
		{
			this.DrawLink(varName, i, cellClass)
			document.write(" ");
		}
	};

	this.addtoWin = function(addtoFullURL)
	{
		if (!this.popupWin.closed && this.popupWin.location){
			this.popupWin.location.href = addtoFullURL;
			//this.addtoInterval = setInterval("closeAddTo();",1000);
		}
		else{
			this.popupWin = window.open(addtoFullURL,'addtoPopUp','width=770px,height=500px,menubar=1,toolbar=1,status=1,location=1,resizable=1,scrollbars=1,left=0,top=100');
			//this.addtoInterval = setInterval("closeAddTo();",1000);
			if (!this.popupWin.opener) this.popupWin.opener = self;
		}
		if (window.focus) {this.popupWin.focus()}
		return false;
	};
	
	// closes the popupWin
	this.closeAddTo = function() {
		if (!this.popupWin.closed && this.popupWin.location){
			if (this.popupWin.location.href == this.AddURL)	//if it's the same url as what was bookmarked, close the win
			this.popupWin.close();
		}
		else {	//if it's closed - clear the timer
			clearInterval(this.addtoInterval)
			return true
		}
	};

	this.addto = function(index, AddURL, AddTitle){
		this.AddURL = AddURL;
		this.AddTitle = AddTitle;
		if (!this.AddURL) this.AddURL = document.location.href;
		if (!this.AddTitle) this.AddTitle = escape(document.title);

		var addtoFullURL = this.sns[index].url + this.sns[index].urlVar + "=" + this.AddURL;

		if (this.sns[index].titleVar != "")
			addtoFullURL = addtoFullURL + "&" + this.sns[index].titleVar + "=" + this.AddTitle;

		addtoFullURL = addtoFullURL + this.sns[index].otherVars

		if (this.sns[index].noteVar != "") 
			addtoFullURL = addtoFullURL + "&" + this.sns[index].noteVar + "=" + this.AddTitle;
		if (this.sns[index].returnVar != "")
			addtoFullURL = addtoFullURL + "&" + this.sns[index].returnVar + "=" + this.AddURL;

		switch(this.addtoMethod){
			case 0:	// 0=direct link
				self.location = addtoFullURL
				break
			case 1:	// 1=popup
				this.addtoWin(addtoFullURL);
				break
			default:	
		}
		return false;
	};
}

//	checking across domains causes errors - this is to suppress these
//function handleError() {return true;}
//window.onerror = handleError;