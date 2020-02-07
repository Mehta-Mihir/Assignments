$(document).ready(function(){
    var globalCount=0;
    var ansRight=0;
    var ansWrong=0;
    var questionCount=0;
    var answerList=new Array();
    var options=new Array(
    'Birds and fish','All of the above','Alligators and fish','Alligators and Birds',
    'Rhino','Giraffe','Hippo','Monkey',
    'Tiger','Hippo','Dog','Goat',
    'Neither','False','I don\'t know','True'
    );
    var optionsCount=0;
    var actualAnswerList=new Array('Blue Whale','Alligators and Birds','Monkey','Tiger','False');
    var actualQ=new Array('Which of these animal pairs are closely related to dinosaurs?',
                        'Which of these animals is smartest?',
                        'Which of these animals is close to extinction?',
                        'True or false? Dogs can\'t hear high-pitched sounds.');
    $("#btn1").click(function(){
        console.log($("#ans1").text());
        answerList[globalCount]=($("#ans1").text());
        checkAnswer();
        incrAttempted();
        globalCount++;
        changeQA();
        gameFinishedOrNot();
    });
    $("#btn2").click(function(){
        console.log($("#ans2").text());
        answerList[globalCount]=($("#ans2").text());
        checkAnswer();
        incrAttempted();
        globalCount++;
        changeQA();
        gameFinishedOrNot();
      });
    $("#btn3").click(function(){
        console.log($("#ans3").text());
        answerList[globalCount]=($("#ans3").text());
        checkAnswer();
        incrAttempted();
        globalCount++;
        changeQA();
        gameFinishedOrNot();
    });
    $("#btn4").click(function(){
        console.log($("#ans4").text());
        answerList[globalCount]=($("#ans4").text());
        checkAnswer();
        incrAttempted();
        globalCount++;
        changeQA();
        gameFinishedOrNot();
    });
    function checkAnswer() {
        if(answerList[globalCount] === actualAnswerList[globalCount]) {
                ansRight=parseInt(ansRight)+1;
                //console.log(ansRight)
                $("#rightAns").text(ansRight);
            }
            else {
                ansWrong=parseInt(ansWrong)+1;
                $("#wrongAns").text(ansWrong);
            }
    }
    function incrAttempted(){
        $("#attemptedQ").text(parseInt($("#attemptedQ").text())+1);
    }
    function changeQA() {
        $.each($('.toChangeO'), function(index, value) {
            //console.log(index + ':' + $(value).text());
            $(value).text(options[optionsCount]);
            optionsCount=optionsCount+1;
          });
          $("#toChangeQ").text(actualQ[questionCount]);
          questionCount=questionCount+1;
    }
    function gameFinishedOrNot() {
        if(parseInt(globalCount)>4) {
            //console.log("Answer List for loop:"+answerList);
            $("#toChange").text("Final Result:");
            $.each($('.toHideRows'), function(index, value) {
                //console.log(index + ':' + $(value).text());
                $(value).hide();
              });
              $("#toChangeQ").text("Final Score: ("+ansRight+"/5)");
        }
    }
});