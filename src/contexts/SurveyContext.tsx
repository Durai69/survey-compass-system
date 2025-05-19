
import React, { createContext, useContext, useState } from 'react';

// Types
export interface Department {
  id: string;
  name: string;
  completed?: boolean;
}

export interface SurveyQuestion {
  id: string;
  category: string;
  question: string;
  rating: number;
  remarks?: string;
}

export interface SurveySubmission {
  departmentId: string;
  departmentName: string;
  date: string;
  questions: SurveyQuestion[];
  suggestion?: string;
}

interface SurveyContextType {
  departments: Department[];
  surveySubmissions: SurveySubmission[];
  submitSurvey: (submission: SurveySubmission) => void;
  getSurveyProgress: () => { completed: number; total: number };
}

// Mock departments data
const mockDepartments: Department[] = [
  { id: '1', name: 'IT' },
  { id: '2', name: 'HR' },
  { id: '3', name: 'QA' },
  { id: '4', name: 'SCM' },
  { id: '5', name: 'Design Control' },
  { id: '6', name: 'Finance' },
  { id: '7', name: 'Assembly' },
  { id: '8', name: 'Project Management' },
  { id: '9', name: 'Mktg IA' },
  { id: '10', name: 'Design IA' },
  { id: '11', name: 'Parts & Manufacturing' },
  { id: '12', name: 'Mktg Trading' },
  { id: '13', name: 'TPM' },
  { id: '14', name: 'Design TA' },
  { id: '15', name: 'Mktg TA' },
  { id: '16', name: 'CSD' },
];

// Mock survey data
const mockSurveySubmissions: SurveySubmission[] = [
  {
    departmentId: '3',
    departmentName: 'QA',
    date: '2025-05-14',
    questions: [
      {
        id: '1',
        category: 'Quality',
        question: 'Understands Customer needs',
        rating: 4,
      },
      {
        id: '2',
        category: 'Quality',
        question: 'Provides 100% quality parts / service / information',
        rating: 3,
      }
    ],
  },
  {
    departmentId: '4',
    departmentName: 'SCM',
    date: '2025-05-12',
    questions: [
      {
        id: '1',
        category: 'Quality',
        question: 'Understands Customer needs',
        rating: 2,
        remarks: 'Need to improve customer understanding',
      },
      {
        id: '2',
        category: 'Quality',
        question: 'Provides 100% quality parts / service / information',
        rating: 2,
        remarks: 'Quality issues need to be addressed',
      }
    ],
  }
];

// Create the context
const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [departments] = useState<Department[]>(mockDepartments);
  const [surveySubmissions, setSurveySubmissions] = useState<SurveySubmission[]>(
    mockSurveySubmissions
  );

  const submitSurvey = (submission: SurveySubmission) => {
    setSurveySubmissions((prev) => [...prev, submission]);
  };

  const getSurveyProgress = () => {
    return {
      completed: surveySubmissions.length,
      total: departments.length - 1, // Exclude user's own department
    };
  };

  return (
    <SurveyContext.Provider
      value={{
        departments,
        surveySubmissions,
        submitSurvey,
        getSurveyProgress,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = (): SurveyContextType => {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};
