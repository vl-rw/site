lib.ready(function(){
    var boxs = lib.getByClass('shareLazyImgWrap');
    lib.each(boxs, function(){
        var box = this,
            img = lib.getByClass('shareLazyImg', box)[0];
        lib.bind(img, 'load', function(){
            var html = '<a class="sh_vk" title="Поделиться В Контакте" href="/url/?u=http%3A%2F%2Fvk.com%2Fshare.php%3Ftitle%3D{--title--}%26url%3D{--url--}" target="_blank" rel="nofollow"></a><a class="sh_fb" title="Поделиться в Facebook" href="/url/?u=http%3A%2F%2Fwww.facebook.com%2Fsharer%2Fsharer.php%3Fu%3D{--url--}" target="_blank" rel="nofollow"></a><a class="sh_class" title="Добавить в Одноклассники" href="/url/?u=http%3A%2F%2Fwww.odnoklassniki.ru%2Fdk%3Fst.cmd%3DaddShare%26st._surl%3D{--url--}" target="_blank" rel="nofollow"></a><a class="sh_twit" title="Добавить в Twitter" href="/url/?u=http%3A%2F%2Ftwitter.com%2Fintent%2Ftweet%3Ftext%3D{--title--}%26url%3D{--url--}" target="_blank" rel="nofollow"></a><a class="sh_lj" title="Опубликовать в LiveJournal" href="/url/?u=http%3A%2F%2Fwww.livejournal.com%2Fupdate.bml%3Fevent%3D{--title--}{--br--}{--img--}{--br--}{--description--}{--br--}{--url--}%26subject%3D{--title--}%26prop_taglist%3D{--keywords--}" target="_blank" rel="nofollow"></a><a class="sh_mail" title="Поделиться в Моем Мире@Mail.Ru" href="/url/?u=http%3A%2F%2Fconnect.mail.ru%2Fshare%3Furl%3D{--url--}" target="_blank" rel="nofollow"></a><a class="sh_ya" title="Поделиться в Я.ру" href="/url/?u=http%3A%2F%2Fmy.ya.ru%2Fposts_add_link.xml%3FURL%3D{--url--}%26title%3D{--title--}%26body%3D{--description--}" target="_blank" rel="nofollow"></a><a class="sh_ya_zak" title="Добавить в Яндекс.Закладки" href="/url/?u=http%3A%2F%2Fzakladki.yandex.ru%2Fnewlink.xml%3Furl%3D{--url--}%26name%3D{--title--}%26descr%3D{--description--}%26tags%3D{--keywords--}" target="_blank" rel="nofollow"></a><a class="sh_li" title="Опубликовать в LiveInternet" href="/url/?u=http%3A%2F%2Fwww.liveinternet.ru%2Fjournal_post.php%3Faction%3Dn_add%26cnurl%3D{--url--}%26cntitle%3D{--title--}" target="_blank" rel="nofollow"></a><a class="sh_mem" title="Сохранить закладку в Memori.ru" href="/url/?u=http%3A%2F%2Fmemori.ru%2Flink%2F%3Fsm%3D1%26u_data%5Burl%5D%3D{--url--}" target="_blank" rel="nofollow"></a><a class="sh_bobr" title="Забобрить" href="/url/?u=http%3A%2F%2Fbobrdobr.ru%2Fadd.html%3Furl%3D{--url--}%26title%3D{--title--}%26tags%3D{--keywords--}" target="_blank" rel="nofollow"></a><a class="sh_wong" title="Сохранить закладку в Мистер Вонг" href="/url/?u=http%3A%2F%2Fwww.mister-wong.ru%2Findex.php%3Faction%3Daddurl%26bm_url%3D{--url--}%26bm_description%3D{--title--}%26bm_notice%3D{--description--}" target="_blank" rel="nofollow"></a><a class="sh_google" title="Сохранить закладку в Google" href="/url/?u=https%3A%2F%2Fwww.google.com%2Fbookmarks%2Fmark%3Fop%3Dedit%26output%3Dpopup%26bkmk%3D{--url--}%26title%3D{--title--}%26labels%3D{--keywords--}%26annotation%3D{--description--}" target="_blank" rel="nofollow"></a><a class="sh_pikabu" title="Добавить в Pikabu" href="/url/?u=http%3A%2F%2Fpikabu.ru%2Fadd_story.php%3Fstory_url%3D{--url--}" target="_blank" rel="nofollow"></a>';
            box.innerHTML = html;
            initButtons();
        });
    });

    function initButtons(){
        var boxs = lib.getByClass('shareBox');
        lib.each(boxs, function(){
            var box = this;
            lib.bind(box, 'click', function(e){
                var e = e || window.event,
                    el = e.target || e.srcElement;
                if(el.tagName.toLowerCase() == 'a'){
                    //lib.preventDefault(e);
                    var href = el.getAttribute('href'),
                        dataBox = document.getElementById('shareDataBox'),
                        dataStr = dataBox ? dataBox.getAttribute('data') : '{}',
                        data = lib.parseJSON(dataStr);
                    data.url = lib.urlEncode('http://www.dendyemulator.ru' + window.location.pathname);
                    data.br = lib.urlEncode('<br/>');
                    data.img = lib.urlEncode('<img width="100" height="100" src="http://www.mario8bit.ru/img/mario.png">');
                    for(var key in data){
                        var re = new RegExp("{--"+key+"--}",'g');
                        href = href.replace(re, data[key] );
                    }
                    el.setAttribute('href', href);
                    // alert(href);
                }
                return true;
            });
        });
    }
});