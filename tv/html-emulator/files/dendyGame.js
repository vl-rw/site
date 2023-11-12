
function gameControlBox(){
    var box = lib.getByClass('dendyDirect')[0];
    if(!box){ return; }
    var images = box.getElementsByTagName('img');
    lib.bind(images, 'click', function(){
        var box = lib.getByClass('dendyDirect')[0],
            tabBox = box.parentNode,
            buttons = lib.getByClass('tabButton', tabBox);
        lib.each(buttons, function(){
            var but = this;
            if( !lib.hasClass(this, 'current') ){
                setTimeout(function(){
                    //console.warn(but.className);
                    lib.trigger(but, 'click');
                }, 1);
            }
        });
    });
}

function gameBlogShare(){
    if(window.ajax){
        var box = document.getElementById('blogShareBox'),
            area = document.getElementById('blogShareArea'),
            cache = [];
        if(box && area){
            cache[1] = lib.trim(area.innerHTML);
            var params = lib.attr(box, 'shareParams');
            createTabs(box, null, function(i){
                var but = this,
                    i = parseInt(i),
                    height = lib.attr(but, 'areaHeight');
                if(cache[i]){
                    area.innerHTML = cache[i];
                } else{
                    var type = lib.attr(but, 'shareType'),
                        url = '/games/share/code.php?type='+type+params;
                    //preload
                    lib.addClass(box, 'preload');
                    area.style.visibility = 'hidden';
                    ajax.get(url, function(data){
                        cache[i] = data;
                        area.innerHTML = data;
                        //preload stop
                        lib.removeClass(box, 'preload');
                        area.style.visibility = '';
                    });
                }
                if(height){
                    area.style.height = height;
                }
            });
        }
    }
}

lib.ready(function(){
    // game init
    if( (typeof(initIframeGame) == "function") && lib.isFunc(initIframeGame) ){
        initIframeGame();
    } else if( (typeof(initGame)== "function") && lib.isFunc(initGame) ){
        initGame();
    }
    // control
    gameControlBox();

    // blog share
    gameBlogShare();
});
