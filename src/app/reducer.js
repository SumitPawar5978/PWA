import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
const initialState = {
  loading: false,
  counter: 0,
  role: "User",
  userProfile: null,
  loginUserName: null,
  agentAdharDetail: null,
  userDetails: null,
  agentUserDetails:null,
  selectCity: null,
  selectCityName: null,
  stateId:null,
  districtId:null,
  selectState: null,
  allCity: null,
  selectCityDialogbox: false,
  selectedProperty: null,
  loggedInRole:null,
  isImgSelected:false,
  userdata: {
    firstName: "",
    lastName: "",
    mobile_no: "",
    email: "",
    dob: "",
    city: "",
    address: "",
  },
  schedulePropId: {
    property_id: "",
    manage_schedule_id: "",
  },
  propertyFilter: {
    district: "",
    type: "",
    status: "",
    order: "",
    bhkType: "",
    min_price: "",
    max_price: "",
  },
};

const reducer = createSlice({
  name: "reducer",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setIsImgSelected: (state, action) => {
      state.isImgSelected = action.payload;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setCounter: (state, action) => {
      state.counter = action.payload;
    },
    setUserData: (state, action) => {
      state.userdata = action.payload;
    },
    setSchedulePropId: (state, action) => {
      state.schedulePropId = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setDistrictId: (state, action) => {
      state.districtId = action.payload;
    },
    setStateId: (state, action) => {
      state.stateId = action.payload;
    },
    setSelectCity: (state, action) => {
      state.selectCity = action.payload;
    },
    setSelectCityName: (state, action) => {
      state.selectCityName = action.payload;
    },
    setSelectState: (state, action) => {
      state.selectState = action.payload;
    },
    setCityDialogbox: (state, action) => {
      state.selectCityDialogbox = action.payload;
    },
    setAgentAdharDetail: (state, action) => {
      state.agentAdharDetail = action.payload;
    },
    setAllCity: (state, action) => {
      state.allCity = action.payload;
    },
    setPropertyFilter: (state, action) => {
      state.propertyFilter = action.payload;
    },
    setSelectedProperty: (state, action) => {
      state.selectedProperty = action.payload;
    },
    setLoginUserName: (state, action) => {
      state.loginUserName = action.payload;
    },
    setLoginRole: (state, action) => {
      state.loggedInRole = action.payload;
    },
    setAgentUserDetails: (state, action) => {
      state.agentUserDetails = action.payload;
    },

    resetUserState: (state) => {
      // Reset the state to its initial empty value
      return {
        ...initialState,
        selectCity: state.selectCity,
        allCity:state.allCity,
        selectCityName:state.selectCityName,
        selectState:state.selectState,
      };
    },
  },
});

export const {
  startLoading,
  stopLoading,
  setCounter,
  setRole,
  setUserData,
  setUserProfile,
  setUserDetails,
  setSelectCity,
  setSelectCityName,
  setSelectState,
  setCityDialogbox,
  resetUserState,
  setAgentAdharDetail,
  setAllCity,
  setSchedulePropId,
  setPropertyFilter,
  setSelectedProperty,
  setLoginUserName,
  setLoginRole,
  setAgentUserDetails,
  setIsImgSelected,
  setStateId,
  setDistrictId
} = reducer.actions;

export default reducer.reducer;
