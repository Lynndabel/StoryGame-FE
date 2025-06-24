const Button = ({ text, onClick, style }: { text: string, onClick?: (e: React.FormEvent) => void , style?: string}) => {
  return (
    <button onClick={onClick} className={`bg-[#FFD700] uppercase px-4 rounded-md py-2 text-[#1A1203] font-merriweather font-bold ${style}`}>
      {text}
    </button>
  );
};
export default Button;
