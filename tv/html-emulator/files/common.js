// extend native objects
if (Object && Object.defineProperty && String && !String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function (searchString, position) {
      position = position || 0;
      return this.lastIndexOf(searchString, position) === position;
    }
  });
}

(function(){
var trim = String.prototype.trim,
    // Used for trimming whitespace
    trimLeft = /^\s+/,
    trimRight = /\s+$/,
	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
    // for makeRequest
    http_request = false;
window.lib = {
    includeScripts : {},
    isGetStartScripts : false,
    getStartScripts : function(){
        var self = this;
        self.isGetStartScripts = true;
        var scripts = document.getElementsByTagName('script');
        this.each(scripts, function(){
            var path = lib.attr(this, 'src');
            if( self.isStr(path) ){
                self.includeScripts[path] = true;
            }
        });

    },
    docHead : false,
    include : function(path, callback) {
        if(!this.isGetStartScripts){
            this.getStartScripts();
        }
        if( !this.includeScripts[path] && this.isStr(path) ){
            var head = this.docHead ? this.docHead : document.getElementsByTagName('head').item(0),
                js = document.createElement('script');
            js.setAttribute('type', 'text/javascript');
            js.setAttribute('src', path);
            if(lib.isFunc(callback)){
                lib.bind(js, 'load', function(){
                    callback();
                });
            }
            head.appendChild(js);
            this.includeScripts[path] = true;
            if(!this.docHead){
                this.docHead = head;
            }
        } else {
            if(lib.isFunc(callback)){
                callback();
            }
        }
    },
    isObj: function(obj){
        var res = false;
        if(obj && typeof(obj)=="object"){
            res = true;
        }
        return res;
    },
    isFunc: function(func){
        var res = false;
        if(func && typeof(func)=="function"){
            res = true;
        }
        return res;
    },
    isStr: function(str){
        var res = false;
        if(str && typeof(str)=="string"){
            res = true;
        }
        return res;
    },
    isString: function(str){
        return ( (typeof(str) == 'object') || (typeof(str) == 'string') ) && ( str instanceof String );
    },
    isNumber: function(nom){
        return !isNaN(parseFloat(nom));
    },
    isArray : function(arr){
        return (typeof(arr) == 'object') && ( arr instanceof Array );
    },
    isDomElement : function(el){
        return (el && el.nodeType && el.nodeType === 1) ? true : false;
    },
    bind: function(el, event, handler, useCapture){
        // !this.isFunc(el) important
        if( !this.isObj(el) && !this.isFunc(el) ){ return []; }
        var useCapture = useCapture || false;
        function bind(){
            var el = this;
            //try{
                if (el.addEventListener) {
                    el.addEventListener(event, handler, useCapture ? useCapture : false);
                } else if (el.attachEvent) {
                    el.attachEvent('on' + event, function(){
                        handler.call(el);
                    });
                } else{
                    //alert("Add handler is not supported");
                }
            //}catch(err){}
        }
        if(el.length){
            this.each(el, bind);
        } else {
            bind.call(el);
        }
    },
    isDOMContentLoaded : false,
    ready : function(callback){
        if(this.isFunc(callback)){
            this.bind(document, 'DOMContentLoaded', callback);
            //this.bind(window, 'load', callback);
            // callback();
            if(this.isDOMContentLoaded) {
                callback();
            }
        }
    },
    getByClass : function(className, context){
        var res = [],
            context = (this.isObj(context) && context.getElementsByTagName) ? context : document;
        if(this.isStr(className)&& className.length){
            var className = className.charAt(0) == '.' ? className : '.' + className;
            if(document.querySelector && context.querySelectorAll){
                res = context.querySelectorAll(className);
            } else{
                res = this._getByClass(className, context);
            }
        }
        return res;
    },
    _getByClass : function(className, context){
        if( !this.isStr(className) ){ return []; }
        var self = this,
            res = [],
            context = (self.isObj(context) && context.getElementsByTagName) ? context : document,
            reg = new RegExp('\\b' + self.trim(className).replace('.', '') + '\\b'),
            els = context.getElementsByTagName("*");
        for(var i=0, j=els.length; i<j; i++){
            if( reg.test(els[i].className) ){
                res.push(els[i]);
            }
        }
        return res;
    },
    each : function(list, callback){
        if( this.isFunc(callback) && this.isObj(list)){
            var list = list.length ? list : [list];
            for(var i=0, j=list.length; i<j; i++){
                callback.call(list[i], (i+1));
            }
        }
    },
    stopPropagation : function(e) {
        if (e && e.stopPropogation) {
            e.stopPropogation();
        } else if (window.event && window.event.cancelBubble){
            window.event.cancelBubble = true;
        }
    },
    preventDefault : function(e) {
        if (e &&e.preventDefault){
            e.preventDefault();
        } else if (window.event && window.event.returnValue){
            window.eventReturnValue = false;
        }
    },
    urlEncode : function(text){
        var res = '';
        if( this.isStr(text) ){
            res = decodeURIComponent(text);
        }
        return res;
    },
    error : function(){},
	// Use native String.trim function wherever possible
	trim : trim ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				text.toString().replace( trimLeft, "" ).replace( trimRight, "" );
		},
    parseJSON : function(data){
		if ( !this.isStr(data) || !data ) {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data = this.trim( data );

		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( rvalidchars.test( data.replace( rvalidescape, "@" )
			.replace( rvalidtokens, "]" )
			.replace( rvalidbraces, "")) ) {

			return (new Function( "return " + data ))();

		}
		this.error( "Invalid JSON: " + data );
    },
    makeRequest : function(url, parameters){
		if ( !this.isStr(url)) {
			return false;
		}
        parameters = parameters || '';
        http_request = false;
        if (window.XMLHttpRequest) { // Mozilla, Safari,...
            http_request = new XMLHttpRequest();
            if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
        }
        } else if (window.ActiveXObject) { // IE
            try {
                http_request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                   http_request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }
        if (!http_request) {
            alert('Cannot create XMLHTTP instance');
            return false;
        }
        http_request.open('GET', url + parameters, true);
        http_request.send(null);
    },
    show : function(el){
        if( this.isObj(el) ){
            if(el.style){
                el.style.display = '';
            } else{
                el.setAttribute('style', 'display: ');
            }
        }
    },
    hide : function(el){
        if( this.isObj(el) ){
            if(el.style){
                el.style.display = 'none';
            } else{
                el.setAttribute('style', 'display: none');
            }
        }
    },
	offset:function(el){
        if( !this.isObj(el) ){ return false; }
        var left = el.offsetLeft,
            top = el.offsetTop,
            width = el.offsetWidth,
            height = el.offsetHeight;
        for(var parent = el.offsetParent; parent; parent = parent.offsetParent){
            left += parent.offsetLeft; top += parent.offsetTop;
        }
	    return {
            left: left,
            top: top,
            right: left + width,
            bottom: top + height,
            width: width,
            height: height
        };
	},
    lazyBlock : function(prefix, callBack){
        var boxs = lib.getByClass(prefix + 'LazyImgWrap');
        lib.each(boxs, function(){
            var box = this,
                img = lib.getByClass(prefix + 'LazyImg', box)[0];
            if(img){
                var src = lib.attr(img, 'src');
                if(src){
                    callBack.call(box);
                } else{
                    lib.bind(img, 'load', function(){
                        callBack.call(box);
                    });
                }
            }
        });
    },
    inheritance : function(Child, Parent){ // need constructors in params
        var F = function(){ };
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.constructor = Child;
        Child.superClass = Parent.prototype;
        return Child;
    },
    extend : function(Parent, Child){ // need constructors in params
        if( this.isObj(Parent) && this.isObj(Child) ){
            for(var key in Child) {
                Parent[key] = Child[key];
            }
        }
        return Parent;
    },
    normalizeSpace : function(str){
        var res = '';
        if( this.isStr(str) ){
            res = this.trim( str.replace(/\s+/gim, ' ') );
        }
        return res;
    },
    attr : function(el, attr){
        var res = '';
        if( this.isObj(el) && this.isStr(attr) ){
            var attr = this.trim(attr);
            if(attr == 'class' && el.className){
                res = el.className;
            } else{
                res = (el && el.getAttribute) ? el.getAttribute(attr) : '';
            }
            res = this.normalizeSpace(res);
        }
        return res;
    },
    hasClass : function(el, name){
        if( !this.isObj(el) || !this.isStr(name) ){ return false; }
        var classStr = this.attr(el, 'class'),
            classes = classStr.split(' '),
            res = false;
        this.each(classes, function(){
            if(this == name){
                res = true;
            }
        });
        return res;
    },
    removeClass : function(el, name){
        var self = this;
        this.each(el, function(){
            var el = this,
                classStr = self.attr(el, 'class'),
                classes = classStr.split(' '),
                newClasses = '';
            self.each(classes, function(){
                var str = this.toString();
                if(str != name){
                    newClasses +=(' '+str);
                }
            });
            if(el && el.className){
                el.className = lib.trim(newClasses);
            }
        });
    },
    addClass : function(el, name){
        var self = this;
        this.each(el, function(){
            var el = this,
                classStr = self.attr(el, 'class'),
                classes = classStr.split(' '),
                isAdd = false;
            self.each(classes, function(){
                if(this.toString() == name){
                    isAdd = true;
                }
            });
            if(!isAdd && el && el.className){
                el.className = self.trim( classStr+' '+ name );
            }
        });
    },
    arrayIndexOf : function(array, val){
        var res = -1;
        if( !this.isObj(array) || !val ){ return res; }
        if(array.indexOf){
            res = array.indexOf(val);
        } else{
            var l = array.length;
            for(var i=0; i < l; i++){
                if(this[i] == val){
                    res = i;
                    break;
                }
            }
        }
        return res;
    },
    trigger : function(el, event, type){
        var type = type || 'MouseEvents';
        if( this.isObj(el) && this.isStr(event) && event.length ){
            if(document.createEvent){
                var evt = document.createEvent(type);
                evt.initEvent(event, true, true);
                el.dispatchEvent(evt);
            } else if(el.fireEvent){
                el.fireEvent('on'+event);
            }
        }
    },
    remove : function(el, context){
        var self = this,
            context = ( context && self.isObj(context) ) ? context : document;
        if( self.isObj(el) ){
            context.removeChild(el);
        }
    },
    parent : function(el){
		var parent = this.isObj(el) ? el.parentNode : null;
		return parent && parent.nodeType !== 11 ? parent : null;
    },
    inArray :function(arr, val){
        var res = false;
        if(arr && val){
            if(arr.indexOf){
                res = arr.indexOf(val) != -1;
            } else{
                var i = arr.length;
                while (i--) {
                    if (arr[i] === val){
                        res = true;
                    }
                }
            }
        }
        return res;
    },
    unlink : function(link){
        if( this.isObj(link) ){
            link.setAttribute('href', 'javascript: void(0);');
            link.removeAttribute('target');
        }
    },
    log : function (mes){
        if(mes && window.console && console.warn){
            console.warn(mes);
        }
    },
    reverseStr: function(str) {
        var newStr = '',
            str = str.toString();
        for (var i = str.length - 1; i >= 0; i--) {
            newStr += str.charAt(i);
        }
        return newStr;
        //return str.split("").reverse().join("");
    },
    formatNumber : function(num){
        var res = '',
            num = this.reverseStr( num.toString() );
        for(var x=0, l = num.length; x <= l; x++){
            if( (x % 3) == 0 ){
                res += ' ';
            }
            res += num.charAt(x);
        }
        return this.reverseStr(res);
    },
    randomArr : function(arr){
        return arr[Math.floor(Math.random() * arr.length)];
    },
    randomNumber : function(m, n){
        m = parseInt(m);
        n = parseInt(n);
        return Math.floor( Math.random() * (n - m + 1) ) + m;
    },
	append: function(el, parent) {;
        var parent = lib.isDomElement(parent) ? parent : document.body,
            res = false;
        if ( lib.isDomElement(el) ) {
            res = parent.appendChild( el );
        }
        return res;
	},
    fullScreen : function(el){
        this.log('set fullScreen');
//        var doc = document.body;
//        this.log(doc);
//        if(doc.requestFullscreen){
//            doc.requestFullscreen();
//        }
//        else if(doc.mozRequestFullScreen){
//            doc.mozRequestFullScreen();
//        }
//        else if(doc.webkitRequestFullScreen){
//            doc.webkitRequestFullScreen();
//        }else{
//            // resize window
//            if(window.moveTo && window.resizeTo && screen.availWidth){
//                window.moveTo(0, 0);
//                window.resizeTo(screen.availWidth, screen.availHeight);
//            }
//            // set full screen
//            window.fullScreen = true;
//        }



        var el = el || document.documentElement
            , rfs = // for newer Webkit and Firefox
                   el.requestFullScreen
                || el.webkitRequestFullScreen
                || el.mozRequestFullScreen
                || el.msRequestFullScreen
        ;
        lib.log(rfs);
        if(typeof rfs != "undefined" && rfs){
          rfs.call(el);
        } else if(typeof window.ActiveXObject != "undefined"){
            // for Internet Explorer
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript!=null) {
             wscript.SendKeys("{F11}");
            }
        }

//        var bool = true,
//            isMobile = false;
//        if(bool){
//            var el=document.documentElement,
//                rfs=el.requestFullScreen||el.webkitRequestFullScreen||el.mozRequestFullScreen;
//        }
//        else{
//            var el=document,
//                rfs=el.exitFullscreen||el.webkitCancelFullScreen||el.mozCancelFullScreen||el.cancelFullScreen;
//        }
//        if(isMobile){
//
//        }else{
//            if(typeof rfs!="undefined"&&rfs){
//                rfs.call(el);
//            }
//            else if(typeof window.ActiveXObject!="undefined"){
//                var wscript = new ActiveXObject("WScript.Shell");
//                if(wscript!=null)wscript.SendKeys("{F11}");
//            }
//        }

    }
 };

 lib.bind(document, 'DOMContentLoaded', function(){
    lib.isDOMContentLoaded = true;
 });

})();


function bookmark(a){
    var title = document.title,
        url = document.location;
    try {
        window.external.AddFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            if (this.isObj(opera)) {
                a.rel = "sidebar";
                a.title = title;
                a.href = url;
                return true;
            }
            else {
                alert('Для добавления страницы в Избранное нажмите Ctrl+D');
            }
        }
    }
    return false;
}

// tabs
function createTabs(box, buttons, func){
    if(lib.isObj(box)){
        var adsClasses = [],
            buttons = buttons || lib.getByClass('tabButton', box);
        //console.warn(buttons);
        var i = 0;
        lib.each(buttons, function(){
            var but = this;
            i++;
            (function(i){
                lib.bind(but, 'click', function(){
                    var isCurrent = lib.hasClass(but, 'current');
                    //console.warn(but);
                    if(!isCurrent){
                        var boxClass = 'activeTab_' + i;
                        lib.removeClass(buttons, 'current');
                        lib.addClass(but, 'current');
                        // box ad active class
                        lib.each(adsClasses, function(){
                            var classStr = this.toString();
                            if( classStr.length && classStr != boxClass ){
                                //console.warn('remove class - '+ classStr);
                                lib.removeClass(box, classStr);
                            }
                        });
                        lib.addClass(box, boxClass);
                        if( lib.arrayIndexOf(adsClasses, boxClass) === -1 ){
                            adsClasses.push(boxClass);
                        }
                        if(lib.isFunc(func)){
                            func.call(but, i);
                        }
                    }
                });
            })(i);
        });
    }
}

lib.ready(function(){
        var boxs = lib.getByClass('tabBox');
        //console.warn(boxs);
        lib.each(boxs, function(){
            var box = this;
            if(!lib.hasClass(box, 'noAutoTab')){
                createTabs(box);
            }
        });
});

// vkontakte lazy load
lib.ready(function(){
    var img = document.getElementById('vkLazyImg');
    if(!img){
        // lib.log('not take VK box #vkLazyImg');
        return;
    }

    function init(){
        setTimeout(function(){
            if(window.VK && VK.Share){
                lib.include('/js/vk.js?ver=3');
                // lib.log('init VK widgets 2');
            }else {
                init();
                // lib.log('VK init()');
            }
        }, 500);
    }

    lib.bind(img, 'load', function(){
        var box = document.getElementById('vkLazyImgWrap'),
            html = '<div id="vk_comments_box">'+
                '<div id="vk_save"></div>'+
                '<div id="vk_like"></div>'+
                '<div id="vk_comments"></div>'+
            '</div>';
        box.innerHTML = html;
        lib.include('https://userapi.com/js/api/openapi.js?46');
        lib.include('https://vk.com/js/api/share.js?87');
        init();
        // lib.log('VK image load');
    });
});

// Scroll top button
lib.ready(function(){
    var button = document.createElement('a');
    button.setAttribute('href', 'javascript: void(0);');
    button.setAttribute('class', 'scroll-top');
    button.innerHTML = '<svg class="icon icon-up-arrow" role="img"><polyline fill="none" stroke="currentColor" stroke-miterlimit="10" points="13.871,7.7 7.203,0.719 0.357,7.7 "/></svg>';
    lib.hide(button);
    lib.append(button, document.body);
    lib.bind(button, 'click', function(e){
        document.body.scrollTop = 0; // For Chrome, Safari and Opera
        document.documentElement.scrollTop = 0; // For IE and Firefox
        e.preventDefault();
        return false;
    });

    lib.bind(window, 'scroll', function(e) {
        setTimeout(function(){
            if (document.body.scrollTop > 700 || document.documentElement.scrollTop > 700) {
                lib.show(button);
            } else {
                lib.hide(button);
            }
        }, 50);
        return false;
    });
});


