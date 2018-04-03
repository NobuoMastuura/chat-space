$(function(){
  function buildHTML(message){
    var html =  `<div class="chat-content">
                  <div class="chat-box">
                    <div class="chat-data">
                      <div class="chat-data__chat__name">
                        ${message.name}
                      </div>
                      <div class="chat-data__chat__date">
                       ${message.created_at}
                      </div>
                    </div>
                    <div class="chat__content">
                      <p class="lower-message__content">
                         ${message.content}
                      </p>
                    </div>
                  </div>
                </div>`;
    return html;
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    console.log(formData.get('message[content]'));
    $('.main-center').animate({scrollTop: $('.main-center')[0].scrollHeight}, 100, 'swing');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".chat-contents").append(html)
      $(".main-bottom__message").val("")
    })
  });
});
