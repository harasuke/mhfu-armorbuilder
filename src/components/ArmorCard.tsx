import React from "react";
import { ArmorPiece } from "@prisma/client";
import { ArmorInteractionButton } from "./ArmorInteractionButton";
import Image from "next/image";

interface ArmorCardProps {
  className?: string;
  armorPiece: ArmorPiece;
  actions?: string[];
}

export const ArmorCard = ({ className, armorPiece }: ArmorCardProps) => {
  return (
    <div
      className={`flex flex-col max-w-[500px] max-h-[350px] rounded-md border-1 ${className}`}
    >
      <div className="flex justify-between">
        <p className="flex">{armorPiece.name}</p>
        <ArmorInteractionButton armorPiece={armorPiece} />
      </div>
      <div className="mt-3 flex justify-evenly">
        {(Object.keys(armorPiece) as (keyof ArmorPiece)[])
          ?.filter((key) => key.includes("Res") || key.includes("defense"))
          ?.map((key) => (
            <div key={key} className="flex flex-col items-center">
              <Image alt={key} src={"/" + key + ".png"} width={16} height={16} style={{ width: "1em" }}/>
              <span>{armorPiece[`${key}`]}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
