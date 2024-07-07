import { Circle, CircleCheck } from "lucide-react";

type PasswordConditionsProps = {
  password: string;
  shouldShow: boolean;
};

type PasswordConditionProps = {
  title: string;
  isMet: boolean;
};

export default function PasswordConditions({
  password,
  shouldShow,
}: PasswordConditionsProps) {
  const validationResponse = ValidateNewPassword(password);
  const {
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialCharacter,
    isEightCharactersLong,
  } = validationResponse.validations;

  return (
    <div
      className={`text-sm ${
        shouldShow ? "max-h-[200px]" : "max-h-[0px]"
      } transition-all duration-500 overflow-y-hidden`}
    >
      <PasswordCondition title="Uppercase letter" isMet={hasUppercase} />
      <PasswordCondition title="Lowercase letter" isMet={hasLowercase} />
      <PasswordCondition title="Number" isMet={hasNumber} />
      <PasswordCondition
        title="Special character"
        isMet={hasSpecialCharacter}
      />
      <PasswordCondition
        title="8 characters or more"
        isMet={isEightCharactersLong}
      />
    </div>
  );
}

function PasswordCondition({ title, isMet }: PasswordConditionProps) {
  const icon = isMet ? (
    <CircleCheck className="h-4 w-4" />
  ) : (
    <Circle className="h-4 w-4" />
  );

  return (
    <div
      className={
        "flex flex-row items-center transition gap-2 " +
        (isMet ? "text-emerald-400" : "text-slate-500")
      }
    >
      {icon}
      <p>{title}</p>
    </div>
  );
}

type ValidateNewPasswordResponse = {
  isValid: boolean;
  errorMessage: string | undefined;
  validations: {
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecialCharacter: boolean;
    isEightCharactersLong: boolean;
  };
};

export function ValidateNewPassword(
  password: string
): ValidateNewPasswordResponse {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};`':"\\|,.<>\/?]/.test(
    password
  );
  const isEightCharactersLong = password.length >= 8;
  const isValid =
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialCharacter &&
    isEightCharactersLong;

  let errorMessage;
  if (!isEightCharactersLong) {
    errorMessage = "Password must be 8 or more characters";
  } else if (!hasUppercase) {
    errorMessage = "Password must contain an uppercase character";
  } else if (!hasLowercase) {
    errorMessage = "Password must contain a lowercase character";
  } else if (!hasNumber) {
    errorMessage = "Password must contain a number";
  } else if (!hasSpecialCharacter) {
    errorMessage = "Password must contain a special character";
  }

  return {
    isValid,
    errorMessage,
    validations: {
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialCharacter,
      isEightCharactersLong,
    },
  };
}
