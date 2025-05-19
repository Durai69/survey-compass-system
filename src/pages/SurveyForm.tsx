
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/MainLayout/MainLayout';
import { useSurvey } from '@/contexts/SurveyContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import StarRating from '@/components/StarRating';
import { surveyCategories } from '@/data/surveyQuestions';
import { useToast } from '@/components/ui/use-toast';

interface QuestionAnswer {
  id: string;
  category: string;
  question: string;
  rating: number;
  remarks: string;
}

const SurveyForm = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const { departments, submitSurvey } = useSurvey();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
  const [finalSuggestion, setFinalSuggestion] = useState('');
  
  const department = departments.find(d => d.id === departmentId);

  useEffect(() => {
    // Initialize answers array with all questions
    const initialAnswers: QuestionAnswer[] = [];
    
    surveyCategories.forEach(category => {
      category.questions.forEach(question => {
        initialAnswers.push({
          id: question.id,
          category: category.name,
          question: question.text,
          rating: 0,
          remarks: '',
        });
      });
    });
    
    setAnswers(initialAnswers);
  }, [departmentId]);

  const handleRatingChange = (questionId: string, rating: number) => {
    setAnswers(prev => 
      prev.map(answer => 
        answer.id === questionId ? { ...answer, rating } : answer
      )
    );
  };

  const handleRemarksChange = (questionId: string, remarks: string) => {
    setAnswers(prev => 
      prev.map(answer => 
        answer.id === questionId ? { ...answer, remarks } : answer
      )
    );
  };

  const validateSurvey = () => {
    // Check if all questions are rated
    const unratedQuestion = answers.find(answer => answer.rating === 0);
    if (unratedQuestion) {
      toast({
        title: 'Incomplete Survey',
        description: `Please rate all questions.`,
        variant: 'destructive',
      });
      return false;
    }
    
    // Check if remarks are provided for low ratings
    const lowRatingWithoutRemarks = answers.find(
      answer => answer.rating <= 2 && !answer.remarks.trim()
    );
    
    if (lowRatingWithoutRemarks) {
      toast({
        title: 'Incomplete Survey',
        description: `Please provide remarks for ratings below 3 stars.`,
        variant: 'destructive',
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = () => {
    if (!validateSurvey() || !department) return;
    
    submitSurvey({
      departmentId: department.id,
      departmentName: department.name,
      date: new Date().toISOString().split('T')[0],
      questions: answers.map(({ id, category, question, rating, remarks }) => ({
        id,
        category,
        question,
        rating,
        ...(remarks.trim() ? { remarks } : {}),
      })),
      ...(finalSuggestion.trim() ? { suggestion: finalSuggestion } : {}),
    });
    
    toast({
      title: 'Survey Submitted',
      description: `Your survey for ${department.name} has been submitted successfully.`,
    });
    
    navigate('/submission-success');
  };

  if (!department) {
    return <div>Department not found</div>;
  }

  return (
    <MainLayout>
      <div className="px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          INTERNAL CUSTOMER SATISFACTION SURVEY
        </h2>

        <div className="space-y-12">
          {surveyCategories.map((category, categoryIndex) => (
            <div key={category.id} className="space-y-6">
              <h3 className="text-xl font-medium">
                {categoryIndex + 1}. {category.name}
              </h3>
              
              <div className="space-y-8">
                {category.questions.map((question, questionIndex) => {
                  const answer = answers.find(a => a.id === question.id);
                  const requiresRemarks = answer?.rating && answer.rating <= 2;
                  
                  return (
                    <div key={question.id} className="space-y-3">
                      <div className="text-gray-800">
                        {String.fromCharCode(97 + questionIndex)}) {question.text}
                      </div>
                      
                      <StarRating
                        rating={answer?.rating || 0}
                        onRatingChange={(rating) => handleRatingChange(question.id, rating)}
                      />
                      
                      {requiresRemarks && (
                        <div className="mt-2">
                          <Textarea
                            placeholder={`*Reason for rating ${answer?.rating} & ${answer?.rating}`}
                            value={answer?.remarks || ''}
                            onChange={(e) => handleRemarksChange(question.id, e.target.value)}
                            className="resize-none"
                            required
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="space-y-3">
            <label htmlFor="suggestion" className="text-gray-800">
              Additional Suggestions or Feedback
            </label>
            <Textarea
              id="suggestion"
              placeholder="Add any suggestions or feedback here..."
              value={finalSuggestion}
              onChange={(e) => setFinalSuggestion(e.target.value)}
              className="resize-none"
            />
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              className="bg-primary text-white px-8 py-2"
            >
              SUBMIT
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SurveyForm;
