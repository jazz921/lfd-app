import React from "react";
import Modal from "./Modal";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import settings from "@/constants/settings.constant";

interface SideMenuProps {
  isOpen?: boolean;
  setIsOpen?: () => void;
}

const SideMenu = ({ isOpen, setIsOpen }: SideMenuProps) => {
  return (
    <Modal
      open={isOpen}
      close={setIsOpen}
      fullHeight={true}
      position="right"
      entrance={isOpen ? "slideLeft" : "slideLeftExit"}
    >
      <div className="bg-white w-[20vw] h-full p-5 flex flex-col justify-between">
        <div className="flex flex-col items-center gap-y-5">
          <Image
            src={"/images/osel-logo.png"}
            alt="Organization Logo"
            width={213}
            height={32}
          />

          <Link href={"/admin"} className="w-full">
            <Button variant="outlined" text="Go to Admin" className="w-full" />
          </Link>
        </div>
        <footer className="text-gray-400 text-xs self-">
          App version: {settings[settings.environment].version}
        </footer>
      </div>
    </Modal>
  );
};

export default SideMenu;
