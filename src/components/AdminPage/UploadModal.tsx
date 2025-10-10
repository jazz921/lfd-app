import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fileSlice, { getFileState } from "@/store/slices/file.slice";
import * as XLSX from "xlsx";
import Modal from "../Modal";
import Button from "../Button";

interface UploadModalProps {
  uploadModal: boolean;
  handleUploadModal: (val: boolean) => void;
}

const UploadModal = ({ uploadModal, handleUploadModal }: UploadModalProps) => {
  const [selectedCountry, setSelectedContry] = useState("")
  const [tempData, setTempData] = useState<any>([]);
  const { fileName, datas, countries } = useSelector(getFileState);
  const dispatch = useDispatch();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    dispatch(fileSlice.actions.setFileName(file.name));

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (event) => {
      const data = event.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        raw: true,
        defval: "",
      });
      setTempData(parsedData);
    };
    reader.onabort = () => {
      return null;
    };
  };

  const handleUploadData = () => {
    let newDatas = tempData.map((data: any) => ({...data, country_db: selectedCountry, file_name: fileName}))
    dispatch(fileSlice.actions.setData([...datas, ...newDatas]));
    dispatch(fileSlice.actions.setFileName(''))
    dispatch(fileSlice.actions.setUploadModal(false))
    setTempData([])
  };

  return (
    <Modal open={uploadModal} close={() => {
      handleUploadModal(false)
      dispatch(fileSlice.actions.setFileName(''))
    }}>
      <div className="flex flex-col items-center justify-center p-[40px] gap-y-8">
        <div>
          <p className="font-avenir-regular font-bold text-[24px] text-center">
            Upload File
          </p>
          <p className="font-avenir-regular">Select a file to proceed</p>
        </div>
        <div className="flex items-center w-full max-w-sm cursor-pointer">
          <input
            id="file-upload"
            type="file"
            accept=".xlsx, .xls, .csv"
            className="hidden"
            onChange={handleFileUpload}
          />
          <label
            htmlFor="file-upload"
            className="min-w-[150px] text-center font-avenir-regular group relative px-[8px] py-[6px] border-2 border-black overflow-hidden cursor-pointer transition-colors duration-500 ease-out hover:border-sky-blue inline-block"
          >
            <div className="w-auto absolute inset-0 bg-sky-blue z-0 translate-x-[-100%] transition-transform duration-500 ease-out group-hover:translate-x-0"></div>
            <span className="w-auto relative z-10 transition-colors duration-500 ease-out group-hover:text-white">
              Select a file
            </span>
          </label>
          <p className="ml-4">{fileName}</p>
        </div>
        <div className="flex gap-x-5 items-center">
          <label htmlFor="country">Select Country:</label>
          <select
            name="country"
            id="country"
            className="border border-gray-400 p-1"
            onChange={(e) => setSelectedContry(e.target.value)}
          >
            <option value="">Select Country</option>
            {countries.map((i, index) => (
              <option key={index} value={i}>{i}</option>
            ))}
          </select>
        </div>

        <Button
          variant="contained"
          text="Upload File"
          disabled={tempData.length >= 1 ? false : true}
          className="w-full"
          click={handleUploadData}
        />
      </div>
    </Modal>
  );
};

export default UploadModal;
