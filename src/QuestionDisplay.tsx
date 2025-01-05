import React from 'react';
import { FormControl, FormControlLabel, RadioGroup, Checkbox, Radio, TextField } from '@mui/material';

interface Question {
  id: number;
  text: string;
  type: 'radio' | 'checkbox' | 'free-text';
  options?: string[];
}

interface QuestionDisplayProps {
  questions: Question[];
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ questions }) => {
  return (
    <div>
      {questions.map((question) => (
        <FormControl component="fieldset" key={question.id} fullWidth margin="normal">
          <label>{question.text}</label>
          {question.type === 'radio' && (
            <RadioGroup>
              {question.options?.map((option, index) => (
                <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
              ))}
            </RadioGroup>
          )}
          {question.type === 'checkbox' && (
            <>
              {question.options?.map((option, index) => (
                <FormControlLabel key={index} control={<Checkbox />} label={option} />
              ))}
            </>
          )}
          {question.type === 'free-text' && <TextField fullWidth />}
        </FormControl>
      ))}
    </div>
  );
};

export default QuestionDisplay;
