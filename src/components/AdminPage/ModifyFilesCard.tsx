"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import fileSlice, { getFileState } from "@/store/slices/file.slice";

import BoxContainer from "../BoxContainer";
import Image from "next/image";
import Button from "../Button";
import Modal from "../Modal";

import UploadModal from "./UploadModal";
import ManageCountryModal from "./ManageCountryModal";
import ManageFilesModal from "./ManageFilesModal";

const ModifyFilesCard = () => {
  const { uploadModal, countryModal, fileModal } = useSelector(getFileState);
  const dispatch = useDispatch();

  const handleUploadModal = (val: boolean) => {
    dispatch(fileSlice.actions.setUploadModal(val));
  };

  const handleCountryModal = (val: boolean) => {
    dispatch(fileSlice.actions.setCountryModal(val));
  };

  const handleFileModal = (val: boolean) => {
    dispatch(fileSlice.actions.setFileModal(val));
  };

  return (
    <>
      <BoxContainer>
        <div className="flex flex-col items-center justify-center p-10 py-14 gap-y-10 md:min-w-[500px]">
          <Image
            src="/svg/file-icon.svg"
            alt="File Icon"
            width={150}
            height={150}
          />
          <p className="font-avenir-regular font-bold text-[24px]">
            Modify Files
          </p>
          <div className="flex gap-x-3">
            <Button
              variant="outlined"
              click={() => handleUploadModal(true)}
              text="Upload File"
            />
            <Button
              variant="outlined"
              click={() => handleCountryModal(true)}
              text="Add/Remove Country"
            />
            <Button
              variant="outlined"
              click={() => handleFileModal(true)}
              text="Remove File"
            />
          </div>
        </div>
      </BoxContainer>

      {/* Modals */}
      <UploadModal
        uploadModal={uploadModal}
        handleUploadModal={handleUploadModal}
      />

      <ManageCountryModal
        countryModal={countryModal}
        handleCountryModal={handleCountryModal}
      />

      <ManageFilesModal
        filesModal={fileModal}
        handleFileModal={handleFileModal}
      />
    </>
  );
};

export default ModifyFilesCard;
