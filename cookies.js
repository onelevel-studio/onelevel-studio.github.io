(function () {
    var KEY = 'cookie-consent';
    var GTM_ID = 'GTM-M32KDZHL';
    var banner = document.getElementById('cookie-banner');

    function loadGTM() {
        if (window.gtmLoaded) return;
        window.gtmLoaded = true;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
        document.head.appendChild(s);
    }

    function save(value) {
        try { localStorage.setItem(KEY, value); } catch (e) {}
        banner.hidden = true;
        if (value === 'accepted') loadGTM();
    }

    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}

    if (saved === 'accepted') {
        loadGTM();
    } else if (saved !== 'refused') {
        banner.hidden = false;
    }

    document.getElementById('cookie-accept').addEventListener('click', function () { save('accepted'); });
    document.getElementById('cookie-refuse').addEventListener('click', function () { save('refused'); });

    // Lien du footer : permet de changer d'avis
    var manage = document.getElementById('cookie-manage');
    if (manage) {
        manage.addEventListener('click', function (e) {
            e.preventDefault();
            try { localStorage.removeItem(KEY); } catch (err) {}
            location.reload();
        });
    }
})();
