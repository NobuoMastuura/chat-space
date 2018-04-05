$(function(){

var search_list = $('#user-search-result');

function appendGroup(group){
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name"> ${ group.name } </p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ group.id }" data-user-name="${ group.name }">追加</a>
              </div>`
  search_list.append(html);
}

function appendNoGroup(group){
  var html = `<div class="chat-group-user clearfix">
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add">${ group }</a>
              </div>`
  search_list.append(html);
}

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    console.log(input)
    $.ajax({
      type: 'GET',
      url: '/groups/search',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(groups){
      $('#user-search-result').empty();
      if (groups.length !== 0){
        groups.forEach(function(group){
          appendGroup(group);
        });
      }
      else {
        appendNoGroup("一致するユーザーはいません")
      }
    })
    .fail(function(){
      alert('error');
    })
  });
});
