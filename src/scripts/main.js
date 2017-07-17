(function(){
   var app = angular.module("myQuiz",[]);

   app.controller("quizController", ["$scope", "$http", "$sce", function($scope, $http, $sce){
   	   $scope.score = 0;
   	   $scope.activeQuestion = -1;
   	   $scope.activeQuestionAnswered = 0;
   	   $scope.percentage = 0;

   	   $http.get("src/quiz_data.json").then(function(quizData){
   	   	   $scope.myQuestions = quizData.data;
   	   	   $scope.totalQuestions = $scope.myQuestions.length;
   	   });

   	  $scope.selectAnswer = function(qIndex, aIndex){
   	  	  //alert(qIndex + " and " + aIndex);
   	     var questionState = $scope.myQuestions[qIndex].questionState;
             
           if( questionState != "answered" ){
             
            $scope.myQuestions[qIndex].selectedAnswer = aIndex;

            var correctAnswer = $scope.myQuestions[qIndex].correct;
            
            $scope.myQuestions[qIndex].correctAnswer =correctAnswer; 


            if(aIndex === correctAnswer){
              //$scope.myQuestions[qIndex].correctness = "green";
               $scope.myQuestions[qIndex].correctness = "correct";
               $scope.score +=1;
            }else{
              // $scope.myQuestions[qIndex].correctness ="red";
               $scope.myQuestions[qIndex].correctness ="incorrect";
            }
            
             $scope.myQuestions[qIndex].questionState ="answered";

           };


           $scope.percentage = (($scope.score / $scope.totalQuestions) *100).toFixed(2); 
           if($scope.percentage >= 50){
             $scope.message = "Congratulations, you know Javascript very well!";
           }else{
             $scope.message = "Sorry, but you might need to learn more about javascript";
           }
                 
        }


      $scope.isSelected = function(qIndex, aIndex){
      	return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
      }
       

      $scope.isCorrect = function(qIndex, aIndex){
      	return $scope.myQuestions[qIndex].correctAnswer === aIndex;
      } 

      $scope.nextQuestion = function(){
         return $scope.activeQuestion += 1;
      }


   }])
})();