
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import MainLayout from '@/components/MainLayout/MainLayout';

interface IncomingFeedback {
  fromDepartment: string;
  ratingGiven: number;
  remark: string;
}

interface OutgoingFeedback {
  department: string;
  rating: number;
  yourRemark: string;
  theirResponse: {
    explanation: string;
    actionPlan: string;
    responsiblePerson: string;
  };
}

const RemarksResponse = () => {
  const { toast } = useToast();
  
  // Mock incoming feedback data
  const [incomingFeedback] = useState<IncomingFeedback>({
    fromDepartment: 'Production',
    ratingGiven: 2,
    remark: 'Slow response to inventory requests'
  });

  // Mock outgoing feedback data
  const [outgoingFeedback] = useState<OutgoingFeedback>({
    department: 'QA Department',
    rating: 2.0,
    yourRemark: 'Delayed reports submission',
    theirResponse: {
      explanation: 'We were understaffed due to resignations',
      actionPlan: 'Hiring 2 more analysts by next month',
      responsiblePerson: 'Mr. Arjun'
    }
  });

  // Form state for incoming feedback response
  const [responseForm, setResponseForm] = useState({
    yourResponse: '',
    actionPlan: '',
    responsiblePerson: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setResponseForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!responseForm.yourResponse.trim() || !responseForm.actionPlan.trim() || !responseForm.responsiblePerson.trim()) {
      toast({
        title: 'Validation Error',
        description: 'All fields are required to submit your response.',
        variant: 'destructive',
      });
      return;
    }

    // Mock submission
    toast({
      title: 'Response Submitted',
      description: 'Your response has been submitted successfully.',
    });

    // Reset form
    setResponseForm({
      yourResponse: '',
      actionPlan: '',
      responsiblePerson: ''
    });
  };

  return (
    <MainLayout title="Remarks & Response">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Incoming Feedback Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Incoming Feedback</h2>
          
          <Card className="bg-green-50 border-green-200 mb-6">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="font-medium text-gray-700 min-w-[140px]">From Department:</span>
                  <span className="text-gray-800">{incomingFeedback.fromDepartment}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="font-medium text-gray-700 min-w-[140px]">Rating Given:</span>
                  <span className="text-gray-800">{incomingFeedback.ratingGiven}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start">
                  <span className="font-medium text-gray-700 min-w-[140px]">Remark:</span>
                  <span className="text-gray-800">"{incomingFeedback.remark}"</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Your Response (Explanation):
                  </label>
                  <Textarea
                    placeholder="Enter Your Explanation"
                    value={responseForm.yourResponse}
                    onChange={(e) => handleInputChange('yourResponse', e.target.value)}
                    className="min-h-[100px] bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Action Plan:
                  </label>
                  <Textarea
                    placeholder="Enter your Action Plan"
                    value={responseForm.actionPlan}
                    onChange={(e) => handleInputChange('actionPlan', e.target.value)}
                    className="min-h-[100px] bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Responsible Person:
                  </label>
                  <Input
                    placeholder="Enter the name of the responsible person"
                    value={responseForm.responsiblePerson}
                    onChange={(e) => handleInputChange('responsiblePerson', e.target.value)}
                    className="bg-white"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-primary hover:bg-primary/90 text-white px-8">
                    Submit
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          </div>
        </div>

        {/* Outgoing Feedback Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Outgoing Feedback</h2>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="font-medium text-gray-700 min-w-[120px]">You rated:</span>
                  <span className="text-gray-800">{outgoingFeedback.department} - {outgoingFeedback.rating}</span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-start">
                  <span className="font-medium text-gray-700 min-w-[120px]">Your Remark:</span>
                  <span className="text-gray-800">"{outgoingFeedback.yourRemark}"</span>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 underline">Their Response:</h3>
                  
                  <div className="space-y-4 pl-4">
                    <div>
                      <span className="font-medium text-gray-700">Explanation: </span>
                      <span className="text-gray-800">{outgoingFeedback.theirResponse.explanation}</span>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-700">Action Plan: </span>
                      <span className="text-gray-800">{outgoingFeedback.theirResponse.actionPlan}</span>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-700">Responsible Person: </span>
                      <span className="text-gray-800">{outgoingFeedback.theirResponse.responsiblePerson}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom pagination dots */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RemarksResponse;
