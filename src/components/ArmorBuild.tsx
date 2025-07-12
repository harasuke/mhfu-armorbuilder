"use client";
import { useAppSelector } from "@/lib/hooks";
import React from "react";
import { ArmorCard } from "./ArmorCard";
import {
  getOverallSkills,
  getOverallStats,
} from "@/lib/features/armor-build/armorBuildSlice";
import { shallowEqual } from "react-redux";
import Image from "next/image";

export const ArmorBuild = () => {
  const armorBuild = useAppSelector(
    (state) => state.armorbuild.armor,
    shallowEqual
  );
  const overallStats = useAppSelector(getOverallStats);
  const overallSkills = useAppSelector(getOverallSkills);

  return (
    <div className="flex flex-row outline-1 outline-red-500 justify-between">
      <div className="flex gap-6">
        <div className="flex flex-col">
          {Object.entries(overallStats).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <Image
                src={"/" + key + ".png"}
                alt={key}
                height={16}
                width={16}
                style={{
                  width: "2em",
                }}
              />
              <p
                style={{
                  color: value > 0 ? "green" : "red",
                }}
              >
                <i>{value}</i>
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <h3>
            <b>Skill points</b>
          </h3>
          {Object.entries(overallSkills)?.map(([key, value]) => (
            <div key={key} className="flex justify-between gap-2">
              <p>
                <b>{key}</b>
              </p>
              <p
                style={{
                  color:
                    value > 0
                      ? `rgba(0,255,0,${value >= 10 ? "1" : ".5"})`
                      : `rgba(255,0,0,${value >= 10 ? "1" : ".5"})`,
                }}
              >
                <i>{value}</i>
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <h3>
            <b>Active Skills</b>
          </h3>
          {Object.keys(overallSkills)
            ?.filter((key) => overallSkills[key] >= 10)
            .map((key) => (
              <p key={key}>{key}</p>
            ))}
        </div>
      </div>
      <div className="flex flex-col">
        {armorBuild?.length &&
          armorBuild.map((armor, index) => (
            <ArmorCard key={index} armorPiece={armor} actions={["remove"]} />
          ))}
      </div>
    </div>
  );
};
