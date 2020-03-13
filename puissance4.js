$.fn.power4 = function(lgn, cln, color1, color2, player1, player2) {
  
  /*const lgn = 6;
  const cln = 7;

  var color1 = "#ff6666";
  var color2 = "#f7f770";
  var player1 = "player 1";
  var player2 = "player 2";*/

  /*var player1 = prompt("Entrez le NOM du joueur 1");
  var color1 = prompt("Choisissez la COULEUR pour le joueur 1");
  var player2 = prompt("Entrez le NOM du joueur 2");
  var color2 = prompt("Choisissez la COULEUR pour le joueur 2");*/

  var score = 0;

  class Player {
    constructor(id, color, score){
      this.id = id;
      this.color = color;
      this.score = score;
    }
  };

  const joueur1 = new Player(player1, color1, score);
  const joueur2 = new Player(player2, color2, score);

  let joueur = joueur1;

  draw();
  play();
  remove();
  reset();

  function draw(){
    // titre
    $('body').before("<h1>Puissance 4</h1>");
    $('h1').css({'color':'#040464', 'font-family': 'Alegreya SC', 'font-size':'50px','text-align':'center', 'padding':'30px'});
    $('h1').after('<h2 class="tour">Au tour de : '+joueur.id+' </h2>');
    $('h2').css({'font-family': 'Alegreya SC', 'font-size':'35px','text-align':'center','color': '#040464'});
    $('h2').append('<button id="remove"><b>↶</b></button>');
    // grille
    $('body').css({'background-color':'#aed3c7'});
    $('body').append('<div id="grille">');
    $("#grille").append('<table id="table">');
    $('#table').css({'margin-left':'33%', 'margin-top':'70px'});
    $('#table').after('<h2 class="score">SCORE : '+ joueur1.score + ' - '+ joueur2.score + ' </h2>');
    $('.score').css({'font-family': 'Alegreya SC', 'font-size':'35px','text-align':'center','color': '#040464'});
    $('.score').append('<button id="reset"><b>reset</b></button>');

    for (let i = 0; i < lgn; i++) {
      $('#table').append('<tr>');
      $('#table').css({'background-color': '#040464'});
      $('tr').css({'margin-left':'40px'});
      $('tr').addClass('ligne');
      for (let j = 0; j < cln; j++) {
        $('tr:last').append('<td>');
        $('td').css({'width':'80px', 'height':'80px', 'border-radius': '50%'});
        $('td').addClass('cell-empty').css({'background-color': 'white'});
      };
    };

    // lgn-id et col-id
    $('.ligne').each(function(index){
      $(this).attr('ligne', index);
    });
    $('[ligne="0"] td').each(function(index){
      $(this).attr('col-id', index).attr('lgn-id', '0');
    });
    $('[ligne="1"] td').each(function(index){
      $(this).attr('col-id', index).attr('lgn-id', '1');
    });
    $('[ligne="2"] td').each(function(index){
      $(this).attr('col-id', index).attr('lgn-id', '2');
    });
    $('[ligne="3"] td').each(function(index){
      $(this).attr('col-id', index).attr('lgn-id', '3');
    });
    $('[ligne="4"] td').each(function(index){
      $(this).attr('col-id', index).attr('lgn-id', '4');
    });
    $('[ligne="5"] td').each(function(index){
      $(this).attr('col-id', index).attr('lgn-id', '5');
    });
    $('[ligne="6"] td').each(function(index){
      $(this).attr('col-id', index).attr('lgn-id', '6');
    });
    $('[ligne="7"] td').each(function(index){
      $(this).attr('col-id', index).attr('lgn-id', '7');
    });
  }
  
  function play(){
    $('#table tr td').click(function(){
      var checkCol = $(this).attr('col-id');
      var checkLgn = $(this).attr('lgn-id');
      var ligne = lgn-1;

      if(joueur == joueur1){

        for (let a= ligne; a >= 0; a--){
          var checkClass = $(`[lgn-id='${a}'][col-id='${checkCol}']`).attr('class');
          if(checkClass === 'cell-empty' ){
            $('td').removeAttr('last');
            $(`[lgn-id='${a}'][col-id='${checkCol}']`).removeClass('cell-empty').addClass('joueur1').css({'background-color':joueur1.color});
            $(`[lgn-id='${a}'][col-id='${checkCol}']`).attr('last', 'ok');
            $('.tour').html('Au tour de : '+joueur2.id +' ');
            $('.tour').append('<button id="remove"><b>↶</b></button>');
            horizontal(checkCol, a, 'joueur1');
            vertical(checkCol, a, 'joueur1' );
            diagonal(checkCol, a, 'joueur1');
            remove();
            full();
            reset();
            joueur = joueur2;
            break;
          }
        }
      }
      else{

        for (let a= ligne; a >= 0; a--){
          var checkClass = $(`[lgn-id='${a}'][col-id='${checkCol}']`).attr('class');
          if(checkClass === 'cell-empty'){
            $('td').removeAttr('last');
            $(`[lgn-id='${a}'][col-id='${checkCol}']`).removeClass('cell-empty').addClass('joueur2').css({'background-color':joueur2.color});
            $(`[lgn-id='${a}'][col-id='${checkCol}']`).attr('last', 'ok');
            $('.tour').html('Au tour de : '+joueur1.id +' ');
            $('.tour').append('<button id="remove"><b>↶</b></button>');
            horizontal(checkCol, a, 'joueur2');
            vertical(checkCol, a, 'joueur2');
            diagonal(checkCol, a, 'joueur2');
            remove();
            full();
            reset();
            joueur = joueur1;
            break;
          }
        }
      }
    });
  }

  // bouton remove last coup
  function remove(){
    $('#remove').click(function(){
      var last = $('td').attr('last');
      if(last = true){
        $(`[last="ok"]`).removeAttr('last').removeClass().addClass('cell-empty').css({'background-color':'white'});
        if(joueur = joueur1){
          $('.tour').html('Au tour de : '+joueur1.id +' ');
          joueur = joueur1;
        }
        else{
          $('.tour').html('Au tour de : '+joueur2.id +' ');
          joueur = joueur2;
        }
      }
    })
  }

  // bouton reset
  function reset(){
    $('#reset').click(function(){
      $('td').removeClass().addClass('cell-empty').css({'background-color':'white'});
      joueur1.score = 0;
      joueur2.score = 0;
      joueur = joueur1;
      $('.score').html('SCORE : '+ joueur1.score + ' - '+ joueur2.score + ' ');
      $('.score').append('<button id="reset"><b>reset</b></button>');
      $('.tour').html('Au tour de : '+joueur1.id +' ');
    })
  }

  // full plateau
  function full(){
    var fullTD = $('td').hasClass('cell-empty');
    if(fullTD = false){
      alert('Match null...');
      $('td').removeClass().addClass('cell-empty').css({'background-color':'white'});
    }
  }

  // condition de win
  function horizontal(col, lign, classJoueur){
    let count = 0;
    
    for(let j=0; j< cln; j++){
      if($(`[lgn-id='${lign}'][col-id='${j}']`).attr('class')== classJoueur){
        count ++;
      }
      else{
        count = 0;
      }
      if(count>=4){
        alert('Bravo '+ joueur.id + ' a gagné !!!');
        $('td').removeClass().addClass('cell-empty').css({'background-color':'white'});
        joueur.score++;
        $('.score').html('SCORE : '+ joueur1.score + ' - '+ joueur2.score + ' ');
        $('.score').append('<button id="reset"><b>reset</b></button>');
        break;
      }
    }
  }

  function vertical(col, lign, classJoueur){
    let count = 0;
    
    for(let i=0; i < lgn; i++){
      if($(`[lgn-id='${i}'][col-id='${col}']`).attr('class')== classJoueur){
        count ++;
      }
      else{
        count = 0;
      }
      if(count>=4){
        alert('Bravo '+ joueur.id + ' a gagné !!!');
        $('td').removeClass().addClass('cell-empty').css({'background-color':'white'});
        joueur.score++;
        $('.score').html('SCORE : '+ joueur1.score + ' - '+ joueur2.score + ' ');
        $('.score').append('<button id="reset"><b>reset</b></button>');
        break;
      }
    }
  }

  function diagonal(col, lign, classJoueur){
    let count = 0;
    let r, c;

    // diagonal haut gauche->bas droite partie basse
    for(let rowStart = 0; rowStart < lgn -3; rowStart++){
      for(r = rowStart, c = 0; r < lgn && c < cln; r++, c++){
        if($(`[lgn-id='${r}'][col-id='${c}']`).attr('class')== classJoueur){
          count++;
        }
        else{
          count = 0;
        }
        if(count>=4){
          alert('Bravo '+ joueur.id + ' a gagné !!!');
          $('td').removeClass().addClass('cell-empty').css({'background-color':'white'});
          joueur.score++;
          $('.score').html('SCORE : '+ joueur1.score + ' - '+ joueur2.score + ' ');
          $('.score').append('<button id="reset"><b>reset</b></button>');
          break;
        }
      }
    }

    // diagonal haut gauche->bas droite partie haute
    for(let colStart = 0; colStart < cln -3; colStart++){
      for(c = colStart, r = 0; c < cln && r < lgn; c++, r++){
        if($(`[lgn-id='${r}'][col-id='${c}']`).attr('class')== classJoueur){
          count++;
        }
        else{
          count = 0;
        }
        if(count>=4){
          alert('Bravo '+ joueur.id + ' a gagné !!!');
          $('td').removeClass().addClass('cell-empty').css({'background-color':'white'});
          joueur.score++;
          $('.score').html('SCORE : '+ joueur1.score + ' - '+ joueur2.score + ' ');
          $('.score').append('<button id="reset"><b>reset</b></button>');
          break;
        }
      }
    }

    // diagonal haut droite->bas gauche partie basse
    for(rowStart = 0; rowStart < lgn -3; rowStart++){
      for(r = rowStart, c = cln; r < lgn && c <= cln; r++, c--){
        if($(`[lgn-id='${r}'][col-id='${c}']`).attr('class')== classJoueur){
          count++;
        }
        else{
          count = 0;
        }
        if(count>=4){
          alert('Bravo '+ joueur.id + ' a gagné !!!');
          $('td').removeClass().addClass('cell-empty').css({'background-color':'white'});
          joueur.score++;
          $('.score').html('SCORE : '+ joueur1.score + ' - '+ joueur2.score + ' ');
          $('.score').append('<button id="reset"><b>reset</b></button>');
          break;
        }
      }
    }

    // diagonal haut droite->bas gauche partie haute
    for(colStart = 0 ; colStart < cln ; colStart++){
      for(c = colStart, r = 0; c <= cln && r < lgn; r++, c--){
        if($(`[lgn-id='${r}'][col-id='${c}']`).attr('class')== classJoueur){
          count++;
        }
        else{
          count = 0;
        }
        if(count>=4){
          alert('Bravo '+ joueur.id + ' a gagné !!!');
          $('td').removeClass().addClass('cell-empty').css({'background-color':'white'});
          joueur.score++;
          $('.score').html('SCORE : '+ joueur1.score + ' - '+ joueur2.score + ' ');
          $('.score').append('<button id="reset"><b>reset</b></button>');
          break;
        }
      }
    }
  }

};

$(function(){
  $("window").power4(6, 7, "#ff6666", "#f7f770", "Val", "Lulu");
});