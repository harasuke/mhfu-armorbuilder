"use client";
import { useAppSelector } from "@/lib/hooks";
import React from "react";
import { ArmorCard } from "./ArmorCard";

interface ArmorBuildProps {}

export const ArmorBuild = ({}: ArmorBuildProps) => {
  const armorBuild = useAppSelector((state) => state.armorbuild.value);
  // const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col outline-1 outline-red-500 p-3">
      {armorBuild?.length &&
        armorBuild.map((armor, index) => (
          <ArmorCard key={index} armorPiece={armor} actions={["remove"]} />
        ))}
    </div>
  );
};
