var baseurl = '/';
$.ajax({
    url: baseurl+'status/server/plugins/'
}).success(function(data){
    $.each(data, function(index, value){
       $('.plugin-list').append(
           '<li class="list-group-item">' +
           '<a href="' + baseurl + 'plugins/configs/' + value + '">' + value +
           '<a class="pull-right" href="' + baseurl + 'plugins/delete/' + value + '">Uninstall' +
           '</li>');
    });
});