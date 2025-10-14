import { TextInput } from "react-native";

export function FormTextInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  autoFocus,
  hasValidationError,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric";
  autoFocus?: boolean;
  hasValidationError?: boolean;
}) {
  return (
    <TextInput
      className={`border border-gray-300 rounded p-2 ${hasValidationError ? "border-red-500" : ""}`}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType || "default"}
      autoFocus={autoFocus || false}
    />
  );
}
