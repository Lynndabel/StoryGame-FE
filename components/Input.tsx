interface InputProps {
  placeholder: string;
  type: string;
  value?: string | number;
  min?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = ({
  placeholder,
  type,
  value,
  onChange,
  min,
  onKeyDown,
}: InputProps) => {
  return (
    <div className="relative flex w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        min={min}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="w-full font-merriweather bg-[#F2E8CF29] h-[56px] p-[8px] border rounded-md border-[#FCFBF726] shadow-md shadow-[#333333] placeholder:text-base placeholder:text-[#D8D6CF] focus:outline-[#333333]"
      />
    </div>
  );
};

export default Input;
