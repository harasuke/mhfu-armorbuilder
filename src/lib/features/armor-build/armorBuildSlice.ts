import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArmorPiece } from "@prisma/client";

interface ArmorBuildState {
  value: ArmorPiece[];
}

const initialState: ArmorBuildState = {
  value: [],
} satisfies ArmorBuildState as ArmorBuildState;

const counterSlice = createSlice({
  name: "armorbuild",
  initialState,
  reducers: {
    addArmorPiece(state: ArmorBuildState, action: PayloadAction<ArmorPiece>) {
      state.value.push(action.payload);
    },
    removeArmorPiece(
      state: ArmorBuildState,
      action: PayloadAction<ArmorPiece>
    ) {
      const toRemove = state.value.findIndex(
        (armor) =>
          armor.name == action.payload.name && armor.type == action.payload.type
      );
      state.value.splice(toRemove, 1);
    },
  },
});

// export const asyncIncrement = createAsyncThunk(
//   "armorbuild/addArmorPieceAsync",
//   async (amount: number) => {
//     await new Promise((res) => setTimeout(res, 1000));
//     return amount;
//   }
// );

export const { addArmorPiece, removeArmorPiece } = counterSlice.actions;
export default counterSlice.reducer;
