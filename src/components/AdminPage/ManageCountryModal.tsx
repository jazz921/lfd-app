import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fileSlice, { getFileState } from "@/store/slices/file.slice";
import countries from "world-countries";
import Image from "next/image";
import Modal from "../Modal";
import Button from "../Button";

interface ManageCountryModalProps {
  countryModal: boolean;
  handleCountryModal: (val: boolean) => void;
}

const countryNames = countries.map((c) => c.name.common.toLowerCase());

const ManageCountryModal = ({
  countryModal,
  handleCountryModal,
}: ManageCountryModalProps) => {
  const { countries, datas } = useSelector(getFileState);
  const dispatch = useDispatch();
  const [countryName, setCountryName] = useState<string>("");
  const [countryInputModal, setCountryInputModal] = useState<boolean>(false);
  const [toDeleteCountry, setToDeleteCountry] = useState<null | number | string>(null);

  const handleAddCountry = (e: any) => {
    e.preventDefault();
    if (countries.includes(countryName)) {
      alert("Country already added");
      setCountryName("");
    } else if (countryNames.includes(countryName)) {
      const countriesTemp = [...countries, countryName]
      dispatch(fileSlice.actions.setCountries(countriesTemp));
      setCountryName("");
      // setCountryInputModal(false);
    } else {
      alert("Invalid country, please validate your input");
      setCountryName("");
    }
  };

  const handleClickDeleteCountry = (countryName: string) => {
    setToDeleteCountry(countryName)
  }

  const getFileCount = (c: string) => {
    const tempData = Array.from(
      new Set(
        datas
          .filter((data) => data.country_db === c)
          .map((data) => data.file_name)
      )
    ).length;

    return `${tempData} File/s`;
  };

  const handleConfirmDeleteCountry = () => {
    // 2 Steps needed
    // 1. Delete Country
    // 2. Delete Files associated to that country
    const newCountries = countries.filter(c => c !== toDeleteCountry)
    dispatch(fileSlice.actions.setCountries(newCountries))
    setToDeleteCountry("")

    const newDatas = datas.filter(data => data.country_db !== toDeleteCountry)
    dispatch(fileSlice.actions.setData(newDatas))

  }
  

  return (
    <>
      {/* Modal No. 1:  List of Countries */}
      <Modal open={countryModal} close={() => handleCountryModal(false)}>
        <div className="min-w-[90vw] md:min-w-[45vw] sm:max-h-[70vh] flex flex-col items-center px-8 py-10 gap-y-5">
          <p className="font-avenir-regular font-bold text-[24px]">
            List of Countries
          </p>
          <div className="w-full flex justify-end">
            <Button
              variant="contained"
              text="Add Country"
              click={() => setCountryInputModal(true)}
            />
          </div>
          {/* List of countries container */}
          <ul className="w-full flex flex-col gap-y-2 px-[2px] py-[5px] overflow-auto scrollbar">
            {countries.length > 0 ? (
              countries.map((c) => (
                <li
                  key={c}
                  className="flex items-center justify-between border border-gray-300 p-3 shadow-md"
                >
                  <div className="flex items-center flex-1/3">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="mr-1.5 w-[20px] h-[20px] cursor-pointer"
                    />
                    <p className="font-avenir-regular">
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </p>
                  </div>
                  <p className="font-avenir-regular flex flex-1/3">
                    {getFileCount(c)}
                  </p>
                  <Image
                    src="/svg/delete-icon-black.svg"
                    width={32}
                    height={32}
                    alt="Delete Icon"
                    className="cursor-pointer"
                    onClick={() => handleClickDeleteCountry(c)}
                  />
                </li>
              ))
            ) : (
              <p className="font-avenir-regular text-center">
                No Countries Added
              </p>
            )}
          </ul>
        </div>
      </Modal>

      {/* Modal No. 2 Add Country Modal */}
      <Modal open={countryInputModal} close={() => setCountryInputModal(false)}>
        <div className="w-auto h-auto bg-white flex flex-col items-center gap-y-5 p-5">
          <div>
            <p className="font-avenir-regular font-bold text-[24px] text-center">
              Add Country
            </p>
            <p className="font-avenir-regular text-center">
              Input Country Name
            </p>
          </div>
          <form className="flex flex-col gap-y-5" onSubmit={handleAddCountry}>
            <div>
              <input
                className="border border-gray-400 p-2"
                name="country"
                type="text"
                value={countryName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCountryName(e.target.value)
                }
                list="countries"
              />
              <datalist id="countries">
                {countryNames.map((name) => (
                  <option key={name} value={name} />
                ))}
              </datalist>
            </div>
            <div className="flex justify-center gap-x-3">
              <Button
                variant="outlined"
                text="Back"
                click={() => setCountryInputModal(false)}
                type="button"
              />
              <Button
                variant="contained"
                text="Confirm"
                disabled={!countryName}
                type="submit"
              />
            </div>
          </form>
        </div>
      </Modal>

      {/* Modal No. 3 Country Deletion Modal */}
      <Modal open={toDeleteCountry ? true : false} close={() => setToDeleteCountry("")}>
        <div className="w-[80vw] md:w-[40vw] h-auto bg-white flex flex-col items-center gap-y-5 p-10">
          <div>
            <p className="font-avenir-regular text-[18px] text-center">
              Are you sure to delete the Country <br /> 
              <span className="font-bold">{toDeleteCountry}</span> <br />
               and it's <span className="font-bold">{getFileCount(toDeleteCountry as string)}</span>?
            </p>
          </div>
          <div className="flex gap-x-10">
            <Button 
              variant="outlined"
              text="Cancel"
              click={() => setToDeleteCountry("")}
            />
            <Button 
              variant="contained"
              text="Confirm"
              click={handleConfirmDeleteCountry}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ManageCountryModal;
