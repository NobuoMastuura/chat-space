$(function(){
  function buildHTML(message){
    var html =  `<div class="chat-box">
                  <div class="chat-data">
                    <div class="chat-data__chat__name">
                      <%= message.name %>
                    </div>
                    <div class="chat-data__chat__date">
                      <%= message.created_at %>
                    </div>
                  </div>
                  <div class="chat__content">
                    <% message.content.present? %>
                      <p class="lower-message__content">
                        <%= message.content %>
                      </p>
                    <%= image_tag message.image.url, class:'lower-message_image' if message.image.present? %>
                  </div>
                </div>`
    return html:
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-content').append(html)
      $('.main-bottom__message').val('')
    })
    .fail(function(){
      alert('error');
    })
  })
});
