$(function() {
   $( '.toggle-button-1' ).on( 'click', function() {
       var $target = $( this.getAttribute( 'data-target' ) ),
           $this = $( this );

       // À décommenter si tu veux masquer toutes les autres div
       // $( '.toggle-button' ).not( this ).removeClass( 'hide' ).html( '+' );
       // $( '.togglable' ).not( this.getAttribute( 'data-target' ) ).hide( 'slow' );

       $this.toggleClass( 'hide' );
       if ( $this.hasClass( 'hide' ) )
           $this.find('span').html( '&#x2193;' );
       else
           $this.find('span').html( '&#x2192;' );
       $target.toggle( 'fast' );
   });
});

$(function() {
   $( '.toggle-button-2' ).on( 'click', function() {
       var $target = $( this.getAttribute( 'data-target' ) ),
           $this = $( this );

      $this.toggleClass( 'hide' );
      if ( $this.hasClass( 'hide' ) )
           $this.find('span').html( '&#x2192;' );
           else
           $this.find('span').html( '&#x2193;' );
      $target.toggle( 'fast' );
  });
});

$(function() {
   $( '.toggle-button-3' ).on( 'click', function() {
       var $target = $( this.getAttribute( 'data-target' ) ),
           $this = $( this );

      $this.toggleClass( 'hide' );
      if ( $this.hasClass( 'hide' ) )
          $this.find('span').html( '&#x2192;' );
           else
           $this.find('span').html( '&#x2193;' );
      $target.toggle( 'fast' );
  });
});
