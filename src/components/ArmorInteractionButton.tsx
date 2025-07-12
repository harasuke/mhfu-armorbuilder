"use client";
import {
  addArmorPiece,
  removeArmorPiece,
} from "@/lib/features/armor-build/armorBuildSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ArmorPiece } from "@prisma/client";
import React, { useEffect, useState } from "react";

interface ArmorInteractionButtonProps {
  armorPiece: ArmorPiece;
}

export const ArmorInteractionButton = ({
  armorPiece,
}: ArmorInteractionButtonProps) => {
  const dispatch = useAppDispatch();
  const armorBuild = useAppSelector((state) => state.armorbuild.armor);
  const [toAdd, setToAdd] = useState<boolean>(true);

  useEffect(() => {
    const toadd = !armorBuild.some(
      (armor) =>
        armor.name === armorPiece.name && armor.type === armorPiece.type
    );
    setToAdd(toadd);
  }, [armorBuild]);

  function addOrRemoveAction() {
    if (toAdd) dispatch(addArmorPiece({ ...armorPiece }));
    else dispatch(removeArmorPiece({ ...armorPiece }));
  }

  return (
    <>
      <button className="block outline-1" onClick={addOrRemoveAction}>
        {toAdd ? 'add' : 'remove'}
      </button>
    </>
    // <>
    //   {actions?.length &&
    //     actions.map((action, index) => (
    //       <button
    //         className="block outline-1"
    //         key={index}
    //         onClick={() => {
    //           if (action == "add") dispatch(addArmorPiece({ ...armorPiece }));
    //           else if (action == "remove")
    //             dispatch(removeArmorPiece({ ...armorPiece }));
    //         }}
    //       >
    //         Do {action}
    //       </button>
    //     ))}
    // </>
  );
};
