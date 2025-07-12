import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArmorPiece, ArmorPieceSkill } from "@prisma/client";

interface ArmorBuildState {
  armor: ArmorPiece[];
}

const initialState: ArmorBuildState = {
  armor: [],
} satisfies ArmorBuildState as ArmorBuildState;

const counterSlice = createSlice({
  name: "armorbuild",
  initialState,
  reducers: {
    addArmorPiece(state: ArmorBuildState, action: PayloadAction<ArmorPiece>) {
      state.armor.push(action.payload);
    },
    removeArmorPiece(
      state: ArmorBuildState,
      action: PayloadAction<ArmorPiece>
    ) {
      const toRemove = state.armor.findIndex(
        (armor) =>
          armor.name == action.payload.name && armor.type == action.payload.type
      );
      state.armor.splice(toRemove, 1);
    },
  },
});

const armorState = (state: { armorbuild: ArmorBuildState }) =>
  state.armorbuild.armor;

export const getOverallSkills = createSelector([armorState], (currentArmor) => {
  const armorSkills: (ArmorPiece & ArmorPieceSkill)[][] = currentArmor.map(
    (armor) => {
      return armor.ArmorPieceSkill.map((pieceSkill) => {
        return {
          [pieceSkill.Skill.name]: pieceSkill.skillPoints,
        };
      });
    }
  );

  const sumOfSkill: Record<string, number> = {};
  armorSkills.flat().forEach((obj) => {
    const [key, value] = Object.entries(obj)[0];
    sumOfSkill[key] = (sumOfSkill[key] ?? 0) + value;
  });
  return sumOfSkill;
});

export const getOverallStats = createSelector(
  [armorState],
  (
    currentArmor
  ): Pick<
    ArmorPiece,
    "defense" | "fireRes" | "waterRes" | "iceRes" | "thunderRes" | "dragonRes"
  > => {
    return {
      defense: currentArmor?.reduce((acc, armor) => (acc += armor.defense), 0),
      fireRes: currentArmor?.reduce((acc, armor) => (acc += armor.fireRes), 0),
      waterRes: currentArmor?.reduce(
        (acc, armor) => (acc += armor.waterRes),
        0
      ),
      iceRes: currentArmor?.reduce((acc, armor) => (acc += armor.iceRes), 0),
      thunderRes: currentArmor?.reduce(
        (acc, armor) => (acc += armor.thunderRes),
        0
      ),
      dragonRes: currentArmor?.reduce(
        (acc, armor) => (acc += armor.dragonRes),
        0
      ),
    };
  }
);

export const { addArmorPiece, removeArmorPiece } = counterSlice.actions;
export default counterSlice.reducer;
