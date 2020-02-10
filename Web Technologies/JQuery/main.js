$(document).ready(function(){
    //declared variables
    var globalCount=0;
    var ansRight=0;
    var ansWrong=0;
    var questionCount=0;
    var answerList=new Array();
    //options array stores various option of each question
    var options=new Array(
    'Birds and fish','All of the above','Alligators and fish','Alligators and Birds',
    'Rhino','Giraffe','Hippo','Monkey',
    'Tiger','Hippo','Dog','Goat',
    'Neither','False','I don\'t know','True'
    );
    var optionsCount=0;
    //actualAnswer array stores right answer to each question
    var actualAnswerList=new Array('Blue Whale','Alligators and Birds','Monkey','Tiger','False');
    //actualQ array stores different questions
    var actualQ=new Array('Which of these animal pairs are closely related to dinosaurs?',
                        'Which of these animals is smartest?',
                        'Which of these animals is close to extinction?',
                        'True or false? Dogs can\'t hear high-pitched sounds.');
    //first option/button click event handler
    $("#btn1").click(function(){
        console.log($("#ans1").text());
        answerList[globalCount]=($("#ans1").text());
        checkAnswer();
        incrAttempted();
        globalCount++;
        changeQA();
        gameFinishedOrNot();
    });
    //second option/button click event handler
    $("#btn2").click(function(){
        console.log($("#ans2").text());
        answerList[globalCount]=($("#ans2").text());
        checkAnswer();
        incrAttempted();
        globalCount++;
        changeQA();
        gameFinishedOrNot();
      });
    //third option/button click event handler
    $("#btn3").click(function(){
        console.log($("#ans3").text());
        answerList[globalCount]=($("#ans3").text());
        checkAnswer();
        incrAttempted();
        globalCount++;
        changeQA();
        gameFinishedOrNot();
    });
    //fourth option/button click event handler
    $("#btn4").click(function(){
        console.log($("#ans4").text());
        answerList[globalCount]=($("#ans4").text());
        checkAnswer();
        incrAttempted();
        globalCount++;
        changeQA();
        gameFinishedOrNot();
    });
    //function to check answer selected is right or not
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
    //function to increment attempted questions
    function incrAttempted(){
        $("#attemptedQ").text(parseInt($("#attemptedQ").text())+1);
    }
    //function to change questions and their options
    function changeQA() {
        $.each($('.toChangeO'), function(index, value) {
            //console.log(index + ':' + $(value).text());
            $(value).text(options[optionsCount]);
            optionsCount=optionsCount+1;
          });
          $("#toChangeQ").text(actualQ[questionCount]);
          questionCount=questionCount+1;
    }
    //function to check whether all question's list is over
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