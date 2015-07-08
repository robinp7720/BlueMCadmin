var baseurl = '/';
$(function(){
    reloadPlugins();
});

function reloadPlugins(){
    $('.plugin-list').html("");
    $.ajax({
        url: baseurl + 'status/server/plugins/'
    }).success(function (data) {
        $.each(data, function (index, value) {
            $('.plugin-list').append(
                '<li class="list-group-item">' +
                value +
                '<a class="pull-right uninstall" data-toggle="modal" data-target="#uninstall-plugin" data-plugin="' + value + '">Uninstall' +
                '</li>');
        });
        $('.uninstall').click(function (event) {
            var plugin = $(this).data("plugin");
            bootbox.confirm("Uninstall " + plugin + "?", function (result) {
                if (result === true){
                    $.ajax({
                        url: baseurl + 'actions/plugins/uninstall/'+plugin
                    }).success(function(data){
                        reloadPlugins();
                    });
                }
            });
        });
    });
}