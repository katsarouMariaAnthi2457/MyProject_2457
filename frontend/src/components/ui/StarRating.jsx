import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function StarRating() {
  const [value, setValue] = useState(2);

  return (
    <div className="mt-8 flex flex-col items-center">
      <Typography component="legend" className="mb-2">Βαθμολογία</Typography>
      <Rating
        name="recipe-rating"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <Typography className="mt-1">Η βαθμολογία σου: {value ? value : 'Καμία'}</Typography>
    </div>
  );
}

export default StarRating;
