$(document).ready(function() {
  $('#fullpage').fullpage({
    anchors: ['home', 'what-is-anjoui', 'how-it-works', 'why-anjoui', 'sign-up', 'about-team'],
    menu: '#menu',
    autoScrolling: false,
    fitToSectionDelay: 300,
    css3: true,
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