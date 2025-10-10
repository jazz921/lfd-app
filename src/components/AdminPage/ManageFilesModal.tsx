import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fileSlice, { getFileState } from "@/store/slices/file.slice";
import Modal from "../Modal";
import Button from "../Button";
import Image from "next/image";
import Dropdown from "../Dropdown";

interface ManageFileModalProps {
  filesModal: boolean;
  handleFileModal: (val: boolean) => void;
}

const ManageFilesModal = ({
  filesModal,
  handleFileModal,
}: ManageFileModalProps) => {
  const [toDeleteFile, setToDeleteFile] = useState<null | number | string>(null);
  const { datas } = useSelector(getFileState);
  const dispatch = useDispatch();

  const getFiles = () => {
    return Array.from(new Set(datas?.map((data) => data.file_name)));
  };

  const handleClickDeleteFile = (filename: string) => {
    setToDeleteFile(filename)
  };
  
  const handleConfirmDeleteFile = () => {
    const newData = datas.filter((data) => data.file_name !== toDeleteFile);
    dispatch(fileSlice.actions.setData(newData));
    setToDeleteFile("")
  }

  return (
    <>
      {/* Modal No. 1 List of Files Modal */}
      <Modal open={filesModal} close={() => handleFileModal(false)}>
        <div className="min-w-[90vw] md:min-w-[45vw] sm:max-h-[70vh] flex flex-col items-center px-8 py-10 gap-y-5">
          <p className="font-avenir-regular font-bold text-[24px]">
            List of Files
          </p>
          <div className="w-full flex justify-end">
            {/* TODO: SHOULD BE DROPDOWN */}
            <Button
              variant="contained"
              text="Select Country"
              className="bg-[#26304D] text-white text-sm p-[8px] cursor-pointer"
            />
          </div>
          {/* List of countries container */}
          <ul className="w-full flex flex-col gap-y-2 px-[2px] py-[5px] overflow-auto scrollbar">
            {getFiles().length > 0
              ? getFiles().map((i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between border border-gray-300 p-3 shadow-md"
                  >
                    <div className="flex items-center flex-1/3">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="mr-1.5 w-[20px] h-[20px] cursor-pointer"
                      />
                      <p className="font-avenir-regular">{i}</p>
                    </div>
                    {/* <p className="font-avenir-regular flex flex-1/3">8 File/s</p> */}
                    <Image
                      src="/svg/delete-icon-black.svg"
                      width={32}
                      height={32}
                      alt="Delete Icon"
                      className="cursor-pointer"
                      onClick={() => handleClickDeleteFile(i)}
                    />
                  </li>
                ))
              : "No Files Added"}
          </ul>
        </div>
      </Modal>

      {/* Modal No. 2 File Deletion Modal */}
      <Modal open={toDeleteFile ? true : false} close={() => setToDeleteFile("")}>
        <div className="w-[80vw] md:w-[40vw] h-auto bg-white flex flex-col items-center gap-y-5 p-10">
          <div>
            <p className="font-avenir-regular text-[18px] text-center">
              Are you sure to delete the file <br /> <span className="font-bold">{toDeleteFile}</span>?
            </p>
          </div>
          <div className="flex gap-x-10">
            <Button 
              variant="outlined"
              text="Cancel"
              click={() => setToDeleteFile("")}
            />
            <Button 
              variant="contained"
              text="Confirm"
              click={handleConfirmDeleteFile}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ManageFilesModal;
