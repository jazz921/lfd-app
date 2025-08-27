"use client"

import { useState } from "react";
import Image from "next/image";
import withAnimation from "@/utils/hoc/withAnimation";
import TestComponent from "@/components/TestComponent";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";

export default function Home() {
  const [test, setTest] = useState<boolean>(false)

  const AnimatedTest = withAnimation(TestComponent)

  return (
    <div className="overflow-hidden">
      <Button click={() => setTest(!test)}>Go to Lens Forecast Dashboard</Button>
      <Modal open={test}>
        <div className="w-[300px] h-[200px] bg-white">

        </div>
      </Modal>
    </div>
  );
}
