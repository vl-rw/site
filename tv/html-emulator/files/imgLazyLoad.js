function imgLazyLoadBindEvent(el, event, handler, useCapture){
    var useCapture = useCapture || false;
    function bind(){
        var el = this;
       // try{
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
    bind.call(el);
}

function imgLazyLoad(){
   // if(!window.imgLazyLoadInit){
        var images = document.getElementsByTagName('img'),
            imagesArr = [];
        //console.warn(images);
        for(var x=0, l=images.length; x<l; x++){
            var img = images[x],
                original = img.getAttribute('original');
            if(original){
                imagesArr.push({
                    img : images[x],
                    top : getOffsetTop(img) || 0,
                    src : original
                });
            }
        };

    //    var logBox = document.getElementById('log');
    //    function log(mes){
    //        //console.warn(mes);
    //        if(logBox){
    //            logBox.innerHTML = mes;
    //        }
    //    }

        // add events
        /* all */
        imgLazyLoadBindEvent(window, 'scroll', show);
    //    /* Gecko */
    //    lib.bind(window, 'DOMMouseScroll', show);
    //    /* Opera */
    //    lib.bind(window, 'mousewheel', show);
    //    /* IE */
    //    lib.bind(document, 'mousewheel', show);
        function getClientHeight(){
          return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientHeight:document.body.clientHeight;
        }
        function getBodyScrollTop() {
          return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
        }

        function getBodyScrollBottom() {
          return getBodyScrollTop() + parseInt( getClientHeight() );
        }




        function getOffsetRect(elem){
            var box = elem.getBoundingClientRect();
            var body = document.body;
            var docElem = document.documentElement;
            var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
            //var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
            var clientTop = docElem.clientTop || body.clientTop || 0;
            //var clientLeft = docElem.clientLeft || body.clientLeft || 0;
            var top  = box.top +  scrollTop - clientTop;
            //var left = box.left + scrollLeft - clientLeft;
            var left = 0;
            return { top: Math.round(top), left: Math.round(left) }
        }

        function getOffsetSum(elem) {
            var top = 0,
                left = 0;
            while(elem) {
                top = top + parseFloat(elem.offsetTop);
                //left = left + parseFloat(elem.offsetLeft);
                elem = elem.offsetParent;
            }
            return {top: Math.round(top), left: Math.round(left)}
        }

        function getOffset(elem) {
            if (elem.getBoundingClientRect) {
                // "правильный" вариант
                return getOffsetRect(elem);
            } else {
                // пусть работает хоть как-то
                return getOffsetSum(elem);
            }
        }

        function getOffsetTop(elem) {
            var offset = getOffset(elem);
            return offset && offset.top ? offset.top : 0;
        }

        function arrayRemove(array, from, to) {
            var rest = array.slice((to || from) + 1 || array.length);
            array.length = from < 0 ? array.length + from : from;
            return array.push.apply(array, rest);
        }

        function updateTops(){
            for(var x=0, l=imagesArr.length; x<l; x++){
                    var obj = imagesArr[x],
                        img = obj.img;
                    obj.top = getOffsetTop(img) || 0 ;
            }
        }
        var calls = 0;
        function show(){
            setTimeout(function(){
                //var mes = 'imagesArr -'+ imagesArr +'<br/>';
                var bottom = getBodyScrollBottom() + 100;
                for(var x=0, l=imagesArr.length; x<l; x++){
                    //if(imagesArr[x]){
                        var obj = imagesArr[x],
                            img = obj.img,
                            top = obj.top;
                        //mes += top +' < '+ bottom +'<br/>';
                        if(top < bottom){
                            //var src = img.getAttribute('original');
                            var src = obj.src;
                            img.setAttribute('src', src);
                            imagesArr.splice(x, 1);
                            l = 0;
                            show();
                            break;
                        }
                    //}
                }
                if(calls++ > 9){
                    //mes += 'update top<br/>';
                    calls = 0;
                    updateTops();
                }
                //log(mes);
            }, 1);
        }

        show();

        window.imgLazyLoadInit = true;
   // }
}
imgLazyLoadBindEvent(document, 'DOMContentLoaded', function(){
    //console.warn('load');
    imgLazyLoad();
    setInterval(function(){
        if(!window.imgLazyLoadInit){
            imgLazyLoad();    
        }
    }, 5000)
});

