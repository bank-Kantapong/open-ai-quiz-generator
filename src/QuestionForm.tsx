import React, { useState } from "react";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  styled,
} from "@mui/material";
import { generateQuestion } from "./openaiService";

interface Choice {
  id: number;
  title: string;
  isCorrect: boolean;
}

interface QuestionData {
  id: number;
  question: string;
  correctAnswer: string;
  choices: Choice[];
}

const QuestionForm: React.FC = () => {
  const [topic, setTopic] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [questionData, setQuestionData] = useState<QuestionData[]>([]);
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);

  const handleGenerateQuestion = async () => {
    setLoading(true);
    setQuestionData([]);
    const generatedQuestion = await generateQuestion(topic);
    setQuestionData(generatedQuestion);
    setLoading(false);
  };

  const handleShowAnswer = () => {
    setIsShowAnswer((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        padding: "24px",
      }}
    >
      <Box
        className="no-print print-button"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          width: "100%",
        }}
      >
        <CustomTextField
          size="small"
          label="อธิบายโจทย์คำถามที่คุณต้องการ เช่น โจทย์คณิตศาสตร์ป.1 จำนวน 3 ข้อ"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{
            height: "40px",
            fontWeight: 600,
            borderRadius: "12px",
            flexGrow: 1,
            whiteSpace: "nowrap",
          }}
          disabled={!topic || loading}
          onClick={handleGenerateQuestion}
        >
          {loading ? "กำลังสร้างคำถาม..." : "สร้างคำถาม"}
        </Button>
        <Button
          sx={{
            height: "40px",
            fontWeight: 600,
            borderRadius: "12px",
            flexGrow: 1,
            whiteSpace: "nowrap",
          }}
          disabled={!topic || loading}
          onClick={handleShowAnswer}
        >
          {isShowAnswer ? "ซ่อนเฉลย" : "ดูเฉลย"}
        </Button>
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "flex-start",
          overflowY: "auto",
          height: "calc(100vh - 200px)",
          border: "1px solid #cfcfcf",
          borderRadius: 12,
          padding: "0px 16px 24px",
        }}
      >
        {questionData?.map((item, index) => (
          <div key={item?.id}>
            <h3>
              {index + 1}. {item.question}
            </h3>
            <RadioGroup value={isShowAnswer ? item.correctAnswer : ""}>
              {item.choices.map((choice) => (
                <FormControlLabel
                  key={choice.id}
                  value={choice.title}
                  control={<Radio />}
                  label={choice.title}
                  disabled={isShowAnswer}
                />
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default QuestionForm;

const CustomTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  ".MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.css-nsce92-MuiInputBase-root-MuiOutlinedInput-root":
    {
      borderRadius: 12,
    },
}));
