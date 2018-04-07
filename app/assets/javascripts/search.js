$(function(){
// 検索結果
var search_list = $('#user-search-result');
// メンバーが追加された結果
var result_list = $('#chat-group-users');

// インクリメンタルサーチに引っかかった時
function appendUser(user, current_user){
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
  if (user.id != current_user) {
      search_list.append(html);
  }
}
// インクリメンタルサーチに引っかからなかった時
function appendNoUser(user){
  var html = `<div class="chat-group-user clearfix">
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add">${user}</a>
              </div>`
  search_list.append(html);
}
// メンバーを追加する機能
function appendGroupMember(name, id){
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                <input name='group[user_ids][]' type='hidden' value='${id}'>
                <p class='chat-group-user__name'> ${name} </p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
  result_list.append(html);
}
  $("#user-search-field").on("keyup", function(){
    // if文を使って空の状態のときだけajax通信を行う
    var none = ""
    var input = $("#user-search-field").val();
    var current_user = $(".current_user_name").val();
    console.log(current_user);
    // 空白じゃないときだけajax通信を行う
    if (input != none) {
      $.ajax({
        type: 'GET',
        url: '/users',
        data: {keyword: input},
        dataType: 'json'
      })
      .done(function(users){
        $('#user-search-result').empty();
        if (users.length !== 0){
          users.forEach(function(user){
            appendUser(user, current_user);
          });
        }
        else {
          appendNoUser("一致するユーザーはいません")
        }
      })
      .fail(function(){
        alert('error');
      })
    }
  });
  // インクリメンタルサーチででてきたユーザーを「チャットメンバー」のボックスに追加するため
  $("#user-search-result").on("click", ".user-search-add.chat-group-user__btn.chat-group-user__btn--add",  function(){
    var user_id = $(this).attr('data-user-id');
    var user_name = $(this).attr('data-user-name');
    // emptyは指定した要素の子要素を消し去る
    // removeは指定した要素自体を消し去る
    $(this).parent().remove();
    appendGroupMember(user_name, user_id)
    })
  // インクリメンタルサーチで追加したユーザーを削除するためのもの
    $("#chat-group-users").on("click", ".user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn", function(){
      $(this).parent().remove();
    })
});
