// import axios from "axios";
import {
  ADD_FAV_PROPERTY,
  ADHAR_UPLOAD,
  ADVERTISEMENT,
  AGENT_LEAD_GENERATION,
  AGENT_OTP_VERIFY,
  AGENT_PASSWORD,
  AGENT_PROFILE,
  BASEURL,
  BOOST_PROPERTY,
  EDIT_PASSWORD,
  EDIT_PROFILE,
  GET_ALL_CITY,
  GET_ALL_DISTRICT,
  GET_ALL_PROPERTY,
  GET_ALL_PROPERTY_SLUG,
  GET_ALL_STATE,
  GET_ALL_TALUKA,
  GET_AMENITIES_LIST,
  GET_CONTACT_DETAILS,
  GET_IN_TOUCH,
  GET_SCHEDULE_VISIT_DETAILS,
  GET_SEARCH_PLACE,
  GET_SINGLE_PROPERTY,
  GET_USER_DETAIL,
  LOGIN,
  LOGOUT,
  NOTIFICATION,
  PASSWORD_UPDATE,
  POST_PROPERTY,
  PROPERTY_ENQUIRY_REQUEST,
  PROPERTY_LOG,
  PROPERTY_VERIFY_REQUEST,
  SCHEDULE_VISIT,
  SCHEDULE_VISIT_CONFIRM,
  SCHEDULE_VISIT_DATE_TIME,
  SEND_AGENT_OTP,
  SEND_OTP,
  SUGGESTED_PROPERTY,
  TESTIMONIALS,
  USERPROFILE,
  VERIFY_OTP,
} from "./api";
import origin from "axios";
export const axios = origin.create({
  baseURL: BASEURL,
});

console.log(BASEURL)
export const loginAxios = async (params) => {
  const res = await axios.post(LOGIN, params);
  return res;
};

export const registerUser =async(params)=>{
  try {
    const res=await axios.post(SEND_OTP,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const verifyOtp =async(params)=>{
  try {
    const res=await axios.post(VERIFY_OTP,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const uploadProfileDetail =async(params)=>{
  try {
    const res=await axios.post(USERPROFILE,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}

export const passwordUpdate =async(params)=>{
  try {
    const res=await axios.post(PASSWORD_UPDATE,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const userProfileDetail =async(params)=>{
  try {
    const res=await axios.get(GET_USER_DETAIL,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const editUserProfileDetail =async(params)=>{
  try {
    const res=await axios.post(EDIT_PROFILE,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
    return error
  }
}
export const editUserPassword =async(params)=>{
  try {
    const res=await axios.post(EDIT_PASSWORD,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}

export const getSearchBoxPlaceDetail =async(params)=>{
  try {
    const res=await axios.post(GET_SEARCH_PLACE,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}

export const getAllCity =async(talukaId)=>{
  try {
    const res=await axios.get(GET_ALL_CITY+'/'+talukaId);
    console.log(res,'resss district')   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const getAllTaluka =async(districtId)=>{
  try {
    const res=await axios.get(GET_ALL_TALUKA+'/'+districtId);
    console.log(res,'resss district')   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const getAllDistrict =async(stateId)=>{
  try {
    const res=await axios.get(GET_ALL_DISTRICT+'/'+stateId);
    console.log(res,'resss district')   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const getAllState =async(countyId)=>{
  try {
    const res=await axios.get(GET_ALL_STATE+'/'+countyId);
    console.log(res,'resss state')   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}

export const getAmenitiesList =async(params)=>{
  try {
    const res=await axios.get(GET_AMENITIES_LIST,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const getAllPropertySlug =async()=>{
  try {
    const res=await axios.get(GET_ALL_PROPERTY_SLUG);
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const getAllPropertyDetail =async(params)=>{
  try {
    const res=await axios.post(GET_ALL_PROPERTY,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const getIndividualPropertyDetail =async(propertyId)=>{
  console.log('prop id',propertyId)
  try {
    const params = {
      property_id: propertyId,
    };
    const res=await origin.get(BASEURL+GET_SINGLE_PROPERTY+'/'+propertyId);
    console.log(res)    
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const suggestedPropertyList =async(params)=>{
  try {
    const res=await axios.post(SUGGESTED_PROPERTY,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const addFavoriteProperty =async(propertyId)=>{
  console.log('prop id',propertyId)
  try {
    const params = {
      property_id: propertyId,
    };
    const res=await axios.get(ADD_FAV_PROPERTY+'/'+propertyId);
    console.log(res)    
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const userSearchPropertyLog =async(propertyId)=>{
  console.log('prop id',propertyId)
  try {
    const params = {
      property_id: propertyId,
    };
    const res=await axios.get(PROPERTY_LOG+'/'+propertyId);
    console.log(res)    
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const userBoostProperty =async(propertyId)=>{
  console.log('prop id',propertyId)
  try {
    const params = {
      property_id: propertyId,
    };
    const res=await axios.get(BOOST_PROPERTY+'/'+propertyId);
    console.log(res)    
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const userPropertyVerificationRequest =async(propertyId)=>{
  console.log('prop id',propertyId)
  try {
    const params = {
      property_id: propertyId,
    };
    const res=await axios.get(PROPERTY_VERIFY_REQUEST+'/'+propertyId);
    console.log(res)    
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const propertyEnquiryRequest =async(propertyId)=>{
  console.log('prop id',propertyId)
  try {
    const params = {
      property_id: propertyId,
    };
    const res=await axios.get(PROPERTY_ENQUIRY_REQUEST+'/'+propertyId);
    console.log(res)    
    return res;
  } catch (error) {
    console.log('error',error)
  }
}

export const addUserPropertyPost =async(params)=>{
  try {
 
    const res=await axios.post(POST_PROPERTY,params);
    console.log(res)    
    return res;
  } catch (error) {
    console.log('error',error)
  }
}

export const agentSendOTP =async(params)=>{
  try {
    const res=await axios.post(SEND_AGENT_OTP,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const agentVerifyOTP =async(params)=>{
  try {
    const res=await axios.post(AGENT_OTP_VERIFY,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const agentUploadAdharDetail =async(params)=>{
  try {
    const res=await axios.post(ADHAR_UPLOAD,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const agentUploadProfileDetail =async(params)=>{
  try {
    const res=await axios.post(AGENT_PROFILE,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const agentPasswordUpdate =async(params)=>{
  try {
    const res=await axios.post(AGENT_PASSWORD,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const agentLeadPost =async(params)=>{
  try {
    const res=await axios.post(AGENT_LEAD_GENERATION,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}

export const scheduleVisitPost =async(params)=>{
  try {
    const res=await axios.post(SCHEDULE_VISIT,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const scheduleVisitDateTime =async(params)=>{
  try {
    const res=await axios.post(SCHEDULE_VISIT_DATE_TIME,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const scheduleVisitConfirmationPost =async(params)=>{
  try {
    const res=await axios.post(SCHEDULE_VISIT_CONFIRM,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}


export const getScheduleVisitDetail =async(manageScheduleId)=>{
  console.log('prop id',manageScheduleId)
  try {
    const params = {
      manage_schedule_id: manageScheduleId,
    };
    const res=await axios.get(GET_SCHEDULE_VISIT_DETAILS+'/'+manageScheduleId);
    console.log(res)    
    return res;
  } catch (error) {
    console.log('error',error)
  }
}



export const getInTouchPost =async(params)=>{
  try {
    const res=await axios.post(GET_IN_TOUCH,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const getContactDetail =async(params)=>{
  try {
    const res=await axios.post(GET_CONTACT_DETAILS,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const testimonialDetails =async(params)=>{
  try {
    const res=await axios.post(TESTIMONIALS,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const getAdvertisementDetail =async(params)=>{
  try {
    const res=await axios.post(ADVERTISEMENT,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}
export const notificationList =async(params)=>{
  try {
    const res=await axios.get(NOTIFICATION,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}

export const logout =async(params)=>{
  try {
    const res=await axios.get(LOGOUT,params);
    console.log(res)   
    return res;
  } catch (error) {
    console.log('error',error)
  }
}

axios.interceptors.request.use(
  async (config) => {
   
    const user = await localStorage.getItem("userDetails");
    if (user !== null) {
      const token = JSON.parse(user).token;
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
    }

    return config;
  }
  // async (error) => {
  //     Promise.reject(error);
  //     await store.dispatch(stoploading());
  //     await store.dispatch(
  //         setSnackbar({
  //             open: false,
  //             msg: "something went wrong",
  //             sevarity: "error",
  //         })
  //     );
  // }
);
export default axios;
