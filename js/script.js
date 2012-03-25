
function parse_form(inputs) {
  var values = {};
  inputs.each(function() {
      values[this.name] = $(this).val();
  });
  return values;
}


(function (window, document, undefined) {

  var Course = function() {

    this.units = [];

    this.add_unit = function(title) {
      var unit = {
        title: title,
        children: []
      };

      this.units.push(unit);
      return unit;
    };

    this.add_video = function(unit, title, url) {
      var video = {
        type: "video",
        title: title,
        url: url
      };

      unit.children.push(video);
      return video;
    };

    this.add_question = function(unit, question, answers, correct) {
      var question = {
        type: "question",
        question: question,
        answers: answers,
        correct_answer: correct
      };

      unit.children.push(question);
      return question;
    };

    this.draw_course = function() {
      var result = "<div id='class_display'><ul class='nav nav-list'>";
      for(var u in this.units) {
        var unit = this.units[u];
        result += "<li><a href='#'><i class='icon-list-alt'></i> " + unit.title + "</a><ul class='nav nav-list'>";
        for(var c in unit.children) {
          var child = unit.children[c];
          if(child.type === "question") {
            result += "<li><a href='#'><i class='icon-question-sign'></i> " + child.question + "</a></li>";
          } else if(child.type === "video") {
            result += "<li><a href='#'><i class='icon-facetime-video'></i> " + child.title + "</a></li>";
          }
        }
        result += "</ul></li>";
      }
      result += "</ul></div>";
      // make way!
      $('#class_display').remove();
      // for the king?
      $('#course_layout').append(result);
    };

    this.JSON = function() {
      return JSON.stringify(this);
    };
  };

  // app
  var App = function() {
    this.course = new Course;
    this.active = null;


  };

  window.app = new App;

  // Editing Course

  $('#new_unit_form').submit(function() {
    var inputs = $('#new_unit_form :input');
    var values = parse_form(inputs);

    app.active = app.course.add_unit(values.title);

    // cleanup
    $('#unit_title').attr('value', '');

    app.course.draw_course();
  });

  $('#new_video_form').submit(function() {
    if(app.active) {
      var inputs = $('#new_video_form :input');
      var values = parse_form(inputs);

      app.course.add_video(app.active, values.title, values.url);

      // cleanup
      $('#video_title').attr('value', '');
      $('#video_url').attr('value', '');

      app.course.draw_course();
    } else {
      alert("No unit to add video to");
    }
  });


  $('#new_question_form').submit(function() {
    if(Curriculum.active) {
      var inputs = $('#new_question_form :input');
      var values = parse_form(inputs);
      
      var question = values.question;
      var correct = $('input[name=correct_answer]:checked', '#new_question_form').val();
      var answers = [];
      
      for(var i = 0; values["answer" + i]; i++) {
        answers.push(values["answer" + i]);
      }

      app.course.add_question(Curriculum.active, question, answers, correct);

      // cleanup
      app.answer_count = 0;
      $('.answer').remove();
      $('#question_field').attr('value', '');

      course.draw_course();
    } else {
      alert("No unit to add question to");
    }
});

  // Editing Question
  app.answer_count = 0;

  $( document ).on( 'click', '#add_answer', ( function( e ) {
    var count = app.answer_count;
    $('<fieldset class="answer"><input type="text" class="span6" name="answer' + count + '" placeholder="Option ' + (count + 1) + '"><input class="span1" type="radio" name="correct_answer" value="' + count + '"></fieldset>').insertBefore(this);
    app.answer_count += 1;
    return false;
  }));

  $( document ).on( 'click', '#remove_answer', ( function( e ) {
    $('.answer:last').remove();
    if(app.answer_count > 0)
      app.answer_count -= 1;
    return false;
  }));

})(this, document);
