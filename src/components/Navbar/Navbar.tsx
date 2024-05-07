import { useEffect } from "react";
import { useThemeContext } from "../../hooks/useThemeContext";
import "./Navbar.css";
import MoonSVG from "../icons/moon";
import Select, { Option } from "../Select/Select";
import SeparatorVertical from "../SeparatorVertical/Separator";

const Navbar: React.FC = () => {
  const { theme, font, setTheme, setFont } = useThemeContext();

  useEffect(() => {
    theme === "dark"
      ? (document.body.style.backgroundColor = "#050505")
      : (document.body.style.backgroundColor = "#fff");
  }, [theme]);

  const onClickHandler = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  const fontsOptions: Array<Option> = [
    { value: "sans-serif", label: "Sans Serif" },
    { value: "serif", label: "Serif" },
    { value: "mono", label: "Mono" },
  ];

  return (
    <div className="navbar">
      <img src="images/logo.svg" alt="logo" />
      <div className="settings">
        <Select options={fontsOptions} defaultValue={font} onChange={setFont} />
        <SeparatorVertical />
        <div className="theme-changer">
          <button onClick={onClickHandler}></button>
          <MoonSVG />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
