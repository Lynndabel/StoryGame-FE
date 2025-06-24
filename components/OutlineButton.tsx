const Button = ({ text, onClick }: { text: string, onClick?: (e: React.FormEvent) => void }) => {
  return (
    <button onClick={onClick} className="text-[#FFD700] uppercase px-4 rounded-md py-2 border border-yellow font-merriweather font-bold">
      {text}
    </button>
  );
};
export default Button;
