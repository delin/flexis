$(function() {
    $(".dial").knob({
        "fgColor":"#ed272d",
        "bgColor":"rgba(255, 255, 255, .19)",
        "readOnly": true,
        "font": 'Open Sans',
        "fontWeight": '900',
        "inputColor": '#fff',
        "min": 0,
        "width": 174,
        "height": 174,
        "thickness": 0.23,
        "format": function(v){
            if(Math.floor(v / 10) == 0) {
                return '0' + v;
            }
            return v;
        }
    });
    var GMT = new Date();
    GMT = -GMT.getTimezoneOffset()/60;

    var endTime = $('.b-counters').data('endtime');

    function parseIt(s) {
        var months = {Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5,
            Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11};

        // Split the string up 
        var s = s.split(/[\s:]/);

        // Create a date object, setting the date 
        var d = new Date(s[5], months[s[0]], s[1]);

        // Set the time
        d.setHours(s[2], s[3], s[4], 0);

        // Done 
        return d;
    }

    endTime = parseIt(endTime);

    function animateTime() {
        var timeNow = endTime.getTime() - (new Date().getTime());

        if (timeNow < 0) {
            clearInterval(interval);
            return false;
        }

        var a = new Date(timeNow);

        var b = a.getTime()/(1000*60*60*24);
        b = b - (b%1);

        var $ = $('.dial');
        var $t = $.parents('.b-counters__item').find('.b-counters__text'); 
        
        $.eq(0).val(b).trigger("change");
        $.eq(1).val(a.getHours() - GMT).trigger("change");
        $.eq(2).val(a.getMinutes()).trigger("change");
        
        $t(0).text()
        
        setInterval(animateTime, 60000);
    }
    animateTime();

});