
var baseurl = '/';
var maxMem = 3641000000; /* In bytes */


function refresh(){
    /* Is server running? */
    $.ajax({
        url: baseurl+'status/server/running/'
    }).success(function(data){
        if (data){
            $('#server-start-stop').removeClass('btn-success').addClass('btn-danger').html('Stop server').attr('href',baseurl+"actions/server/stop");
            $('#save-world').removeClass('hidden').html('Save all').attr('href',baseurl+"actions/server/save");

            /* Get cpu usage */
            $.ajax({
                url: baseurl+'status/server/usage'
            }).success(function(data){
                var mem = (data["memory"]/maxMem)*100;
                $('#cpuUsage').animate({width: data["cpu"]+"%"}, 400, "linear").text(Math.round(data["cpu"])+"%");
                $('#memUsage').animate({width: mem+"%"}, 400, "linear").text(Math.round(mem)+"%").css("min-width",20);
            });
        }else{
            $('#server-start-stop').removeClass('btn-danger').addClass('btn-success').html('Start server').attr('href',baseurl+"actions/server/start");
            $('#save-world').addClass('hidden').html('Save all').attr('href',baseurl+"actions/server/save");
            $('#memUsage').css("min-width",0);
        }
    });
}
refresh();
setInterval(refresh,5000)
var serverRunning = false;
$("#reload-data").click(function(){
    refresh();
});
$('.action').click(function(event){
    event.preventDefault();
    $.ajax({
        url: this.href
    })
    refresh();
});