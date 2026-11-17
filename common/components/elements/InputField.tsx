import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute, useId } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface InputFieldProps<TFormValue extends FieldValues> {
  register: UseFormRegister<TFormValue>;
  name: Path<TFormValue>;
  label?: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  inputMode?: "text" | "email" | "tel" | "url" | "numeric" | "search";
  spellCheck?: boolean;
  error: FieldErrors;
  rule?: RegisterOptions<TFormValue, Path<TFormValue>>;
  isTextArea?: boolean;
  placeholder?: string;
  rows?: number;
}

const InputField = <TFormValue extends FieldValues>({
  name,
  label,
  type = "text",
  autoComplete,
  inputMode,
  spellCheck,
  rule,
  error,
  isTextArea = false,
  placeholder = "",
  rows = 4,
  register,
}: InputFieldProps<TFormValue>) => {
  const generatedId = useId();
  const fieldId = `field-${String(name)}-${generatedId}`;
  const errorId = `${fieldId}-error`;
  const fieldError = error[name];
  const hasError = Boolean(fieldError);
  const displayLabel =
    label || placeholder || name.charAt(0).toUpperCase() + name.slice(1);
  const hintPlaceholder = placeholder ? `${placeholder}…` : `${displayLabel}…`;
  const isRequired = Boolean(rule?.required);

  const errorMessage = fieldError?.message
    ? String(fieldError.message)
    : hasError
      ? `${displayLabel} is required.`
      : "";

  const controlClasses = `input-tactile w-full rounded-[10px] px-3.5 py-3 text-base text-neutral-900 outline-none placeholder:text-neutral-400 sm:text-sm dark:text-neutral-100 dark:placeholder:text-neutral-500 ${
    hasError ? "!border-red-500 dark:!border-red-400" : ""
  }`;

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label
        htmlFor={fieldId}
        className="text-sm font-semibold text-neutral-800 dark:text-neutral-200"
      >
        {displayLabel}
        {isRequired ? (
          <span aria-hidden="true" className="ml-0.5 text-blue-600 dark:text-blue-400">
            *
          </span>
        ) : null}
      </label>

      {isTextArea ? (
        <textarea
          id={fieldId}
          rows={rows}
          placeholder={hintPlaceholder}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          {...register(name, rule)}
          className={`${controlClasses} min-h-[120px] resize-y`}
        />
      ) : (
        <input
          id={fieldId}
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          spellCheck={spellCheck}
          placeholder={hintPlaceholder}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          {...register(name, rule)}
          className={`${controlClasses} min-h-[44px]`}
        />
      )}

      {hasError ? (
        <p
          id={errorId}
          role="alert"
          aria-live="polite"
          className="text-xs font-medium text-red-600 dark:text-red-400"
        >
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};

export default InputField;
