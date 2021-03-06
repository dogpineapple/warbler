async function getLikedPosts(message_id){
  const response = await axios.post(`https://olivia-and-diana.herokuapp.com${message_id}`);
  return response.data;
}

$('.messages-like').on('click', '.fa', async function(event){
  event.preventDefault();
  let path = $(event.target).closest('form').attr('action');
  let resp = await getLikedPosts(path);

  if (resp['message']){
    $("#alerts-messages").prepend('<div class="alert alert-success" role="alert">No more likez</div>');

    setTimeout(function(){
      $(".alert").remove();
    }, 2000)
  }
  /*toggleClass looks at jQuery object and sees if it has class fa-thumbs-up, if it does, change to fa-star
    and vice versa */
  $(event.target).toggleClass("fa-thumbs-up fa-star");
  $(event.target).closest('button').toggleClass("btn-secondary btn-primary");
})

$('.create-new-message').on('submit', async function(event){
  event.preventDefault();

  let text = $('#text').val();

  let data = await postNewMessage(text);

  console.log(data)

})


async function postNewMessage (text) {

  let data = {'text': text}
  let resp = await axios.post('https://olivia-and-diana.herokuapp.com/messages/new', data);
  return resp.data;
}
