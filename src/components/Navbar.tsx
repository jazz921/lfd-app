"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import SideMenu from "./SideMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const handleSideMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className="w-full h-[56px] md:h-[65px] flex items-center justify-between fixed top-0 left-0 z-50 bg-white p-3 md:px-9 md:py-3 shadow-md">
        <Link href="/">
          <Image
            className="cursor-pointer"
            src={"/images/osel-logo.png"}
            alt="Organization Logo"
            width={213}
            height={32}
          />
        </Link>

        <div
          onClick={handleSideMenu}
          className="w-[24px] h-[24px] relative flex flex-col justify-around cursor-pointer"
        >
          {[1, 2, 3].map((i) => (
            <span key={i} className="w-full h-[3px] bg-black rounded-md"></span>
          ))}
        </div>
      </nav>

      <SideMenu isOpen={isOpen} setIsOpen={handleSideMenu} />
    </>
  );
};

export default Navbar;
