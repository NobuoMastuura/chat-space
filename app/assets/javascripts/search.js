$(function(){
// 検索結果
var search_list = $('#user-search-result');
// メンバーが追加された結果
var result_list = $('#chat-group-users');

// インクリメンタルサーチに引っかかった時
function appendGroup(group){
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name"> ${ group.name } </p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ group.id }" data-user-name="${ group.name }">追加</a>
              </div>`
  search_list.append(html);
}

// インクリメンタルサーチに引っかからなかった時
function appendNoGroup(group){
  var html = `<div class="chat-group-user clearfix">
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add">${ group }</a>
              </div>`
  search_list.append(html);
}

// メンバーを追加する機能
function appendGroupMember(name, id){
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ id }'>
                <input name='group[user_ids][]' type='hidden' value='${ id }'>
                <p class='chat-group-user__name'> ${ name } </p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
  result_list.append(html);
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
  // インクリメンタルサーチででてきたユーザーを「チャットメンバー」のボックスに追加するため
  $("#user-search-result").on("click", "a",  function(){
    var id = $(this).attr('data-user-id');
    var name = $(this).attr('data-user-name');
    // emptyは要素の子要素を消し去る
    // removeは要素自体を消し去る
    $(this).parent().remove();
    appendGroupMember(name, id)
    })
  // インクリメンタルサーチで追加したユーザーを削除するためのもの
    $("#chat-group-users").on("click", "a", function(){
      $(this).parent().empty();
    })


    $(".chat-group-form__action-btn").on("click", function(e){
      e.preventDefault();
      var data = $("#chat-group-users").find('div');
      console.log(data);
    })
});
