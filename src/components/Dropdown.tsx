import React, { useState } from "react";
import Button from "./Button";

interface DropdownProps {
  list: [];
}

const Dropdown = () => {
  return (
    <div>
      <Button variant="contained"></Button>

      {/* Dropdown selections */}
      <ul>
        <li>
          <input type="checkbox" />
          <p></p>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
