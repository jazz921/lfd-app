import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import iFileState from "../interface/models/file-state.interface";
import iRootState from "../interface/root-state.interface";

const initialState: iFileState = {
  loading: false,
  uploadModal: false,
  fileName: "No File Selected",
  excelData: [],
  countryModal: false,
  fileModal: false,
  datas: [],
  countries: []
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setInitialState: () => initialState,
    setUploadModal: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        uploadModal: action.payload,
      };
    },
    setFileName: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        fileName: action.payload
      }
    },
    setCountryModal: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        countryModal: action.payload
      }
    },
    setFileModal: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        fileModal: action.payload
      }
    },
    setData: (state, action: PayloadAction<any[]>) => {
      return {
        ...state,
        datas: action.payload
      }
    },
    setCountries: (state, action: PayloadAction<string[]>) => {
      // state.countries.push(action.payload)
      return {
        ...state,
        countries: action.payload
      }
    }
  },
});

export const getFileState = (state: iRootState) => state.file;
export default fileSlice;
