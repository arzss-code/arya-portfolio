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
          className="glass-input w-full rounded-xl p-3 text-sm outline-none transition-all duration-300 placeholder:text-neutral-500"
        ></textarea>
      ) : (
        <input
          type="text"
          placeholder={renderPlaceholder}
          {...register(name, rule)}
          className="glass-input w-full rounded-xl p-3 text-sm outline-none transition-all duration-300 placeholder:text-neutral-500"
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
