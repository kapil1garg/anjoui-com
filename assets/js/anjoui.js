$(document).ready(function() {
  $('#fullpage').fullpage({
    anchors: ['home', 'how-it-works', 'why-anjoui', 'signup', 'about'],
    menu: '#menu',
    autoScrolling: false,
    onLeave: function(index, nextIndex, direction) {
        var leavingSection = $(this);

        //after leaving section 1
        if (index == 1 && direction == 'down') {
          $('#header').toggleClass('show');
        } else if (index == 2 && direction == 'up') {
          $('#header').toggleClass('show');
        }
    }
  });
});