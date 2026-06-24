import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface RadioInputProps<TFormValue extends FieldValues> {
  register: UseFormRegister<TFormValue>;
  name: Path<TFormValue>;
  error: FieldErrors;
  rule?: RegisterOptions;
  isTextArea?: boolean;
  placeholder?: string;
  rows?: number;
}

const InputField = <TFormValue extends FieldValues>({
  name,
  rule,
  error,
  isTextArea = false,
  placeholder = "",
  rows = 2,
  register,
}: RadioInputProps<TFormValue>) => {
  const renderPlaceholder =
    placeholder || name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div className="w-full space-y-2">
      {isTextArea ? (
        <textarea
          rows={rows}
          placeholder={renderPlaceholder}
          {...register(name, rule)}
          className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 text-sm text-neutral-900 outline-none transition-all duration-300 placeholder:text-neutral-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-100 dark:focus:border-blue-400 dark:focus:bg-neutral-900 dark:focus:ring-blue-400/10"
        ></textarea>
      ) : (
        <input
          type="text"
          placeholder={renderPlaceholder}
          {...register(name, rule)}
          className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 text-sm text-neutral-900 outline-none transition-all duration-300 placeholder:text-neutral-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-100 dark:focus:border-blue-400 dark:focus:bg-neutral-900 dark:focus:ring-blue-400/10"
        />
      )}{" "}
      {error[name]?.type === "required" && (
        <p role="alert" className="text-[10px] text-red-400">
          {error[name]?.message ? String(error[name]?.message) : `*${name} is required`}
        </p>
      )}
      {error[name]?.type === "pattern" && (
        <p role="alert" className="text-[10px] text-red-400">
          *{String(error[name]?.message)}
        </p>
      )}
    </div>
  );
};

export default InputField;
