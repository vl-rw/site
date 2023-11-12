(function(){
    // AJAX OBJECT (https://github.com/seven1m/mini/)
    var ajax = {};
    var $=function(e){
      if(typeof e=='string')e=document.getElementById(e);
      return e
    };

    function collect(a,f){
        var n=[];
        for(var i=0; i< a.length; i++){
            var v = f(a[i]);
            if(v!=null){
                n.push(v);
            }
        }
        return n;
    }

    ajax.bustcache = 'nocache'; // Set to null to disable additional cache-busting arg on all ajax requests

    ajax.x = function(){
//      try{
//        return new ActiveXObject('Msxml2.XMLHTTP')
//      }catch(e){
//        try{
//          return new ActiveXObject('Microsoft.XMLHTTP')
//        }catch(e){
//          return new XMLHttpRequest()
//        }
//      }
        var http_request = false;
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
        return http_request;
    };

    ajax.send = function(u,f,m,a){
        var x = ajax.x();
        if(ajax.bustcache){
            var c = ajax.bustcache+'='+new Date().getTime();
            if(m=='GET'){
                u+= u.indexOf('?')==-1?'?':'&'+c;
            }
            else if(a&&a!=''){
                a+='&'+c;
            }
            else{
                a=c;
            }
        }
        x.open(m,u,true);
        if(f){
            x.onreadystatechange = function(){
                if(x.readyState==4){
                    f(x.responseText);
                }
            };
        }
        if(m=='POST'){
            x.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        }
        x.send(a);
    };

    ajax.get=function(url,func){
        ajax.send(url,func,'GET');
    };

    ajax.gets=function(url){
        var x=ajax.x();
        x.open('GET',url,false);
        x.send(null);
        return x.responseText;
    };

    ajax.post=function(url,func,args){
        ajax.send(url,func,'POST',args);
    };

    ajax.update=function(url,elm,method,args){
        method=method||'POST';
        var e=$(elm);
        var f=function(r){e.innerHTML=r};
        ajax.send(url,f,method,args);
    };

    ajax.submit=function(url,frm,elm){
        var e=$(elm);
        var f=function(r){
            e?e.innerHTML=r:eval(r);
        };
        ajax.post(url,f,form.serialize(frm));
    };

    window.ajax = ajax;
})();