
var baseurl = '/';
var maxMem = 3641000000; /* In bytes */


function getUsage(){
    /* Get cpu usage */
    $.ajax({
        url: baseurl+'status/server/usage'
    }).success(function(data){
        var mem = (data["memory"]/maxMem)*100;
        //$('#cpuUsage').animate({width: data["cpu"]+"%"}, 400, "linear").text(Math.round(data["cpu"])+"%");
        //$('#memUsage').animate({width: mem+"%"}, 400, "linear").text(Math.round(mem)+"%").css("min-width",20);
        $('#cpuUsage').css("width",data["cpu"]+"%").text(Math.round(data["cpu"])+"%");
        $('#memUsage').css("width",mem+"%").text(Math.round(mem)+"%").css("min-width",20);
    });
}
$('.action').click(function(event){
   event.preventDefault();
    $.ajax({
        url: $(this).attr('href')
    });
});

socket.on('server-status',function(msg){
    if (msg==100){
        $('#server-start-stop').removeClass('btn-success').addClass('btn-danger').html('Stop server').attr('href',baseurl+"actions/server/stop");
        $('#save-world').removeClass('hidden').html('Save all').attr('href',baseurl+"actions/server/save");

        var usageInterval = setInterval(getUsage,1000);
    }else if(msg==101){
        $('#server-start-stop').removeClass('btn-danger').addClass('btn-success').html('Start server').attr('href',baseurl+"actions/server/start");
        $('#save-world').addClass('hidden').html('Save all');
        $('#memUsage').css("min-width",0);
        clearInterval(usageInterval);
    }
});
socket.emit('server-status',999);
$('#reload-data').click(function(event){
    event.preventDefault();
    socket.emit('server-status',999);
});