import { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

interface StarRatingProps {
  initialRating: number;
  ratings: number;
  onChange: (rating: number) => void;
}

const StarRating = ({ initialRating,ratings, onChange }: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (index: number) => {
    setRating(index + 1);
    onChange(index + 1);
  };

  useEffect(() => {
    setRating(ratings);
  }, [ratings]);

  return (
    <div className="flex items-center justify-center">
    {[...Array(5)].map((_, index) => (
      <StarIcon
        key={index}
        className={`h-9 w-9 ${
          index < rating ? 'text-yellow-500' : 'text-white-600'
        } cursor-pointer`}
        onClick={() => handleClick(index)}
      />
    ))}
  </div>
  
  );
};

export default StarRating;