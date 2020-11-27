import './style.scss';
import $ from 'jquery';
import 'bootstrap';
import { game } from './src/maureen';
import { buildQuiz } from './src/samiha';

const link = $('#link');
link.on('click', function () {
  $('#game').append(game);
});

$('#btnGo').on('click', function () {
  $('canvas').css('display', 'block');
  $('#clockdiv').css('display', 'block');
  $('.smalltext').css('display', 'block');
  $(this).remove();
});
