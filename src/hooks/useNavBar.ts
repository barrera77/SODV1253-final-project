import React, { useState } from "react";

type UseNavBarProps = {
  handleScrollNavigation: (id: string) => void;
  activeLink: string;
  active: string;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setActive: React.Dispatch<React.SetStateAction<string>>;
};

export const useNavBar = (): UseNavBarProps => {
  const [activeLink, setActiveLink] = useState<string>("");
  const [active, setActive] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);

  const handleScrollNavigation = (id: string) => {
    const pageSection = document.getElementById(id);
    if (pageSection) {
      pageSection.scrollIntoView({ behavior: "smooth" });
      setActiveLink(id);
    }
  };

  return {
    activeLink,
    active,
    toggle,
    setToggle,
    setActive,
    handleScrollNavigation,
  };
};
