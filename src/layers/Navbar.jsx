import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";

const Navbar = ({ children }) => {
  const { pathname } = useLocation();
  const [activeItem, setActiveItem] = useState(undefined);
  
  const handleClick = (_, { name }) => {
    setActiveItem(name);
  };
  
  useEffect(() => {
    const path = pathname.split("/")[1];

    if (!path) setActiveItem("characters");
    else setActiveItem(path);
  }, [pathname]);

  const items = [
    {
      key: "characters",
      name: "characters",
      active: activeItem === "characters",
      onClick: handleClick,
      to: "/characters",
      link: true,
      as: Link,
    },
    {
      key: "comics",
      name: "comics",
      active: activeItem === "comics",
      onClick: handleClick,
      to: "/comics",
      link: true,
      as: Link,
    },
    {
      key: "series",
      name: "series",
      active: activeItem === "series",
      onClick: handleClick,
      to: "/series",
      link: true,
      as: Link,
    },
  ];
  return (
    <>
      <Container>
        <Menu pointing secondary items={items} />
        {children}
      </Container>
    </>
  );
};

export default Navbar;
