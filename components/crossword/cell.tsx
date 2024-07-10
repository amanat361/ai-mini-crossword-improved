import React from "react";

interface CrosswordCellProps {
  value: string;
  isSelected: boolean;
  onClick: () => void;
}

const CrosswordCell: React.FC<CrosswordCellProps> = ({
  value,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`rounded-lg w-full h-full aspect-square flex items-center justify-center text-6xl font-bold cursor-pointer border-2 border-gray-300 ${
        isSelected ? "bg-blue-100 animate-pulse" : ""
      }`}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

export default CrosswordCell;
