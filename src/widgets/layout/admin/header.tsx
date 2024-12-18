import { FC } from "react";
import { FlexBox, TOKEN, TOKEN_KEY } from "@/shared";
import { Button } from "antd";
import { LuLogOut } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  setActiveSection: (section: "main" | "analysis") => void;
}

const Header: FC<HeaderProps> = ({ setActiveSection }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onLogout = () => {
    TOKEN.remove(TOKEN_KEY);
    navigate("/login");
  };

  return (
    <FlexBox cls="justify-between shadow-sm bg-white">
      <FlexBox>
        <nav className="flex items-center text-[16px]">
          <Link
            className={`p-5 hover:bg-[rgba(0,0,0,0.2)] hover:text-slate-950 ${
              pathname === "/" ? "border-b-2 bg-[rgba(0,0,0,0.1)]" : ""
            }`}
            to="/"
            onClick={() => setActiveSection("main")}
          >
            Главная
          </Link>
          <Link
            className={`p-5 hover:bg-[rgba(0,0,0,0.2)] hover:text-slate-950 ${
              pathname === "/count" ? "border-b-2 bg-[rgba(0,0,0,0.1)]" : ""
            }`}
            to="/count"
            onClick={() => setActiveSection("analysis")}
          >
            Анализ клиентов
          </Link>
        </nav>
      </FlexBox>
      <FlexBox>
        <Button icon={<LuLogOut />} onClick={onLogout} type="primary">
          Выйти
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

export { Header };
