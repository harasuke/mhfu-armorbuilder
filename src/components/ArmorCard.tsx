'use client'
import React from "react";
import { ArmorPiece } from "@prisma/client";
import { useAppDispatch } from "@/lib/hooks";
import {
  addArmorPiece,
  removeArmorPiece,
} from "@/lib/features/armor-build/armorBuildSlice";

interface ArmorCardProps {
  armorPiece: ArmorPiece;
  actions?: string[];
}

export const ArmorCard = ({
  armorPiece,
  actions = ["add"],
}: ArmorCardProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col">
      <div className="flex">{armorPiece.name}</div>
      {actions?.length &&
        actions.map((action, index) => (
          <button
            key={index}
            onClick={() => {
              if (action == "add") dispatch(addArmorPiece({ ...armorPiece }));
              else if (action == "remove")
                dispatch(removeArmorPiece({ ...armorPiece }));
            }}
          >
            Do {action}
          </button>
        ))}
    </div>
  );
};
