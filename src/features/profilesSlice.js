import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../app/firebase";

export const fetchAsyncProfiles = createAsyncThunk(
  "profiles/fetchAsyncProfiles",
  async (genderSearch) => {
    console.log(genderSearch + "genderrrrrrrrrrr");
    const promise = db
      .collection("users")
      .where("gender", "==", genderSearch)
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            data: doc.data()
          });

          // assign data
        });
        console.log(data);
        return data;
      });
    const data = await promise;
    return data;
  }
);
export const fetchAsyncProfileDetail = createAsyncThunk(
  "profiles/fetchAsyncProfileDetail",
  async (id) => {
    const promiseDetail = db
      .collection("users")
      .doc(id)
      .get()
      .then((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        return doc.data();
        // setprofilee(doc.data());
        // setLoadingpartnerPref(false);
        // console.log(profilee);
        // if (profilee.length) setProfileeready(true);
      })

      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    const detailData = await promiseDetail;
    return detailData;
  }
);
const initialState = {
  profiles: [],
  selectProfile: {}
};
const profilesSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    removeSelectedProfile: (state) => {
      state.selectProfile = {};
    }
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  extraReducers: {
    [fetchAsyncProfiles.pending]: () => {
      console.log("pending");
    },
    [fetchAsyncProfiles.fulfilled]: (state, { payload }) => {
      console.log("fetched succesfully");
      console.log(payload);
      return { ...state, profiles: payload };
    },
    [fetchAsyncProfileDetail.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully detail!");
      console.log(payload);
      return { ...state, selectProfile: payload };
    }
  }
});

export const getAllProfiles = (state) => state.profiles.profiles;
export default profilesSlice.reducer;
export const getSelectedProfile = (state) => state.profiles.selectProfile;
export const { removeSelectedProfile } = profilesSlice.actions;
