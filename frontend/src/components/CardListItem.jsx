import React from 'react';
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";

function CardListItem({ title, image }) {
  return (
    <Link
      to={`/category/${encodeURIComponent(title)}`}
      className="cursor-pointer block min-w-[140px]"
    >
      <Card className="h-full">
        <CardContent className="p-2">
          <img
            src={image}
            alt={title}
            className="w-full h-32 object-cover rounded-lg mb-2"
          />
          <p className="text-sm font-semibold text-center">{title}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CardListItem;
