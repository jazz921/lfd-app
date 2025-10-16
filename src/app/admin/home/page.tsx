import React from "react";
import ModifyFilesCard from "@/components/AdminPage/ModifyFilesCard";
import GoToDashboard from "@/components/AdminPage/GoToDashboard";
import AnimateComponent from "@/components/AnimateComponent";

const AdminHomePage = () => {
  return (
    <div className="p-3 w-full flex flex-col items-center gap-y-10 mt-10">
      {/* Title Section */}
      <div className="text-center">
        <p className="font-avenir-regular font-bold text-[24px]">
          Welcome, Admin
        </p>
        <p className="font-avenir-regular">You have access in the following:</p>
      </div>

      <div className="flex gap-10 flex-col lg:flex-row">
        <AnimateComponent>
          <ModifyFilesCard />
        </AnimateComponent>
        <AnimateComponent>
          <GoToDashboard />
        </AnimateComponent>
      </div>
    </div>
  );
};

export default AdminHomePage;
