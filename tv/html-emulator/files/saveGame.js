(function(){
    // save game
    var shareGameBox = document.getElementById('vk_save_game'),
        max = 6,
        i = 0;
    function initGameShare(){
        if(window.VK && VK.Share){
            if(shareGameBox){
                var gameName = lib.attr(shareGameBox, 'gameTitle'),
                    butText = 'Сохранить игру "'+ (gameName || '') +'"';

                shareGameBox.innerHTML = VK.Share.button(false,{type: "round", text: butText });
            }
        }else {
            if( i++ <= max ){
                setTimeout(initGameShare, 2000);
            }
        }
    }

    if(shareGameBox){
        lib.include('https://userapi.com/js/api/openapi.js?45');
        lib.include('https://vk.com/js/api/share.js?86');
        setTimeout(initGameShare, 500);
    }

})();