interface TextToSpeechButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

function TextToSpeechButton({ children, onClick }: TextToSpeechButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-green-700 flex items-center justify-center text-xl text-white h-10 w-10"
    >
      {children}
    </button>
  );
}

export default TextToSpeechButton;
