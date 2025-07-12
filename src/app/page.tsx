import React from "react";
import { getArmors } from "./actions/get/getArmors";
import { ArmorCard } from "@/components/ArmorCard";
import { ArmorBuild } from "@/components/ArmorBuild";

export default async function Home() {
  const armors = await getArmors();

  return (
    <>
      <div className="flex flex-col justify-around m-2">
        <div className="flex flex-col">
          <h3>Your current build</h3>
          <ArmorBuild />
        </div>
        <div className="flex flex-wrap gap-4 mt-2">
          {armors.map((armor, index) => (
            <ArmorCard key={index} armorPiece={armor} className="w-full !max-w-[30%]"/>
          ))}
        </div>
      </div>
    </>
  );
}
