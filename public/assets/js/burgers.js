$(document).ready(() => {
  $('#add-burger').on('submit', event => {
    event.preventDefault();

    var newBurger = {
      name: $('#burger-name').val().trim()
    };

    $.ajax('/api/burgers', {
      type: 'POST',
      data: newBurger
    }).then(id => location.reload()
    ).fail(error => console.error(error));
  });

  /* Cannot use => due to this reference. */
  $('.devour-burger').on('click', function(event) {
    var id = $(this).data('id');

    var newState = {
      devoured: true
    };

    $.ajax('/api/burgers/' + id, {
      type: 'PUT',
      data: newState
    }).then(() => location.reload()
    ).fail(error => console.error(error));
  });
});