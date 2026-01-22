import { useState, useCallback, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CaptchaProps {
  onValidate: (isValid: boolean) => void;
}

const generateCaptcha = (): { num1: number; num2: number; operator: string; answer: number } => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operators = ["+", "-", "×"];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  
  let answer: number;
  switch (operator) {
    case "+":
      answer = num1 + num2;
      break;
    case "-":
      answer = Math.max(num1, num2) - Math.min(num1, num2);
      break;
    case "×":
      answer = num1 * num2;
      break;
    default:
      answer = num1 + num2;
  }
  
  return { 
    num1: operator === "-" ? Math.max(num1, num2) : num1, 
    num2: operator === "-" ? Math.min(num1, num2) : num2, 
    operator, 
    answer 
  };
};

const Captcha = ({ onValidate }: CaptchaProps) => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userAnswer, setUserAnswer] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [hasError, setHasError] = useState(false);

  const refreshCaptcha = useCallback(() => {
    setCaptcha(generateCaptcha());
    setUserAnswer("");
    setIsValidated(false);
    setHasError(false);
    onValidate(false);
  }, [onValidate]);

  useEffect(() => {
    if (userAnswer === "") {
      setIsValidated(false);
      setHasError(false);
      onValidate(false);
      return;
    }

    const userNum = parseInt(userAnswer, 10);
    if (!isNaN(userNum)) {
      if (userNum === captcha.answer) {
        setIsValidated(true);
        setHasError(false);
        onValidate(true);
      } else {
        setIsValidated(false);
        setHasError(true);
        onValidate(false);
      }
    }
  }, [userAnswer, captcha.answer, onValidate]);

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">
        Security Verification
      </label>
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-captcha-bg border border-captcha-border rounded-lg px-4 py-3">
          <span className="font-mono text-lg font-semibold text-captcha-text select-none">
            {captcha.num1} {captcha.operator} {captcha.num2} =
          </span>
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={3}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value.replace(/\D/g, ""))}
            className={`w-16 text-center font-mono text-lg bg-input-bg border-input-border focus:border-primary focus:ring-primary ${
              isValidated ? "border-success text-success" : hasError ? "border-destructive" : ""
            }`}
            placeholder="?"
            aria-label="Enter captcha answer"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={refreshCaptcha}
          className="shrink-0 h-12 w-12 border-input-border hover:bg-muted"
          aria-label="Refresh captcha"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      {isValidated && (
        <p className="text-sm text-success flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-success"></span>
          Verified
        </p>
      )}
      {hasError && userAnswer.length > 0 && (
        <p className="text-sm text-destructive">Incorrect answer. Please try again.</p>
      )}
    </div>
  );
};

export default Captcha;