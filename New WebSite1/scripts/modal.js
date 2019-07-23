$(document).ready(function(){

  // MODAL
  var modalText = {
    roambi: {
      title: 'GitHubMe',
      tag: 'API',
      detail: 'This is a website I make using HTML, CSS, JavaScript, AJAX, with API. This fun website allows the user to look up github usernames.',
      link: 'http://www.ozdevops.byethost10.com/githubfinder/github.html'
    },
    walker: {
      title: 'DK-Studio',
      tag: 'UI & UX',
      detail: 'Photography website showcasing work this website was created for a friend of mine who is a photographer and designer. She wanted a website to showcase her projects and give information about the projects. Beautifully designed and responsive this is a nice clean website.',
      link: 'http://www.ozdevops.byethost10.com/picture%20site/picturesite.html'
    },
    powur: {
      title: 'Coin-Collector',
      tag: 'JavaScript- Game',
      detail: 'This was a fun project using Javascript, its a simple demo game.',
      link: 'http://www.ozdevops.byethost10.com/game/game.html'
    },
    mystand: {
      title: 'GARDEN ÇOTANAK 2.0',
      tag: 'Restaurant Website',
      detail: 'Updated website I created for a restaurant overseas. The project uses responsive design and bright beautiful colors and carousel with pictures of the food and restaurant itself. I also added buttons so that when customers want to call all they have to do is just click the button',
      link: 'http://www.ozdevops.byethost10.com/newcotanak/garden.html'
    },
    never: {
      title: 'Pizza Palace',
      tag: 'Restaurant Website.',
      detail: 'Responsive website built for an Italian Restaurant. The website is beautiful and fits on all size screens.',
      link: 'https://happy-davinci-a2f4e3.netlify.com/'
    },
    themall: {
      title: 'BlackSea Landscaping',
      tag: 'Landscaping and Gardening Website.',
      detail: 'The Mall is a place to follow the latest fashion purchases of your friends and favorite celebrities. Built with Node.js and Handlebars. Features the ability to import thousands of top brands products into one shopping site.',
      link: 'https://pensive-davinci-8d274d.netlify.com/'
    }
      
  };

  $('#gallery .button').on('click', function(){
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
      slideWidth = 700,
      threshold = slideWidth/3,
      dragStart, 
      dragEnd;

  setDimensions();

  $('#next').click(function(){ shiftSlide(-1) })
  $('#prev').click(function(){ shiftSlide(1) })

  carousel.on('mousedown', function(){
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function(){
      dragEnd = event.pageX;
      $(this).css('transform','translateX('+ dragPos() +'px)');
    });
    $(document).on('mouseup', function(){
      if (dragPos() > threshold) { return shiftSlide(1) }
      if (dragPos() < -threshold) { return shiftSlide(-1) }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1)
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup')
    carousel.off('mousemove')
            .addClass('transition')
            .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
    setTimeout(function(){
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition')
      carousel.css('transform','translateX(0px)'); 
    },700)
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link) $('#modal .button').addClass('visible')
                                               .parent()
                                               .attr('href', modalText[id].link)

    $.each($('#modal li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background: "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });
              
    });
  }
})
