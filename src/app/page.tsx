import React from "react";
import { getArmors } from "./actions/get/getArmors";
import { ArmorCard } from "@/components/ArmorCard";
import { ArmorBuild } from "@/components/ArmorBuild";

export default async function Home() {
  const armors = await getArmors();

  return (
    <>
      <ArmorBuild />
      {armors.map((armor, index) => (
        <ArmorCard key={index} armorPiece={armor} />
      ))}
    </>
  );
}
