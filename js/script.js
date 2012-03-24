


(function (window, document, undefined) {

  // Prepare window
  $('#new_unit').tab('show');

  var Course = function() {

    this.units = [];

    this.add_unit = function() {
      var unit = {
        name: "",
        children: []
      };

      this.units.push(unit);
      return unit;
    };

    this.add_video = function(unit) {
      var video = {
        title: "",
        url: ""
      };

      unit.children.push(video);
      return video;
    };

    this.add_question = function(unit) {
      var question = {
        question: "",
        answer: ""
      };

      unit.children.push(question);
      return question;
    };
  };

  // app

  window.course = new Course;
  window.active = null;

  $('#unit_options').on('hide', function() {
    var unit = course.add_unit();
    active = unit;
  })

  $( document ).on( 'click', '.new_unit', ( function( e ) {
    $("#unit_options").modal();
  }));

  $( document ).on( 'click', '.new_video', ( function( e ) {
    var video = course.add_video();
  }));

  $( document ).on( 'click', '.new_question', ( function( e ) {
    var unit = course.add_unit();
    active = unit;
  }));

})(this, document);