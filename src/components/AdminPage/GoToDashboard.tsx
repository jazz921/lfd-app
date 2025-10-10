import React from "react";
import BoxContainer from "../BoxContainer";
import Image from "next/image";
import Button from "../Button";
import Link from "next/link";

const GoToDashboard = () => {
  return (
    <BoxContainer>
      <div className="flex flex-col items-center justify-center p-10 py-14 gap-y-10 md:min-w-[500px]">
        <Image
          src="/svg/link-icon.svg"
          alt="File Icon"
          width={150}
          height={150}
        />
        <p className="font-avenir-regular font-bold text-[24px]">
          Lens Forecast Dashboard
        </p>
        <div className="flex gap-x-3">
          <Link href="/">
            <Button variant="outlined" text="Go to Lens Forecast Dashboard" />
          </Link>
        </div>
      </div>
    </BoxContainer>
  );
};

export default GoToDashboard;
