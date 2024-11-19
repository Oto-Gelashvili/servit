'use client';

import { useState } from 'react';

interface QuantitySelectorProps {
  stock: number;
  minOrder: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  stock,
  minOrder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(minOrder);

  const options: number[] = [];
  for (let i = minOrder; i <= stock; i++) {
    options.push(i);
  }

  return (
    <div className="quantitySelector">
      <button onClick={() => setIsOpen(!isOpen)} className="quantityButton">
        <span>Amount: {quantity}</span>
        <span>▼</span>
      </button>

      {isOpen && (
        <div className="dropdownMenu">
          {options.map((value) => (
            <button
              key={value}
              className="dropdownOption"
              onClick={() => {
                setQuantity(value);
                setIsOpen(false);
              }}
            >
              {value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuantitySelector;