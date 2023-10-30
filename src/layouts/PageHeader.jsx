import {
  Bell,
  Menu,
  Upload,
  User,
  Film,
  Mic,
  Search,
  ArrowLeft,
} from "lucide-react";
import Button from "../components/Button";
import { useState } from "react";
import { useSidebarContext } from "../contexts/SidebarContext";
import PropTypes from "prop-types";

export default function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <PageHeaderFirstSection hidden={showFullWidthSearch} />
      <form
        className={`gap-4 flex-grow justify-center ${
          showFullWidthSearch ? "flex" : "hidden sm:flex"
        }`}
      >
        {showFullWidthSearch && (
          <Button
            onClick={() => setShowFullWidthSearch(false)}
            type="button"
            size="icon"
            variant={"ghost"}
            className="flex-shrink-0"
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
          <Button
            className={
              "py-2 px-4 rounded-r-full border border-secondary-border border-l-0 flex-shrink-0"
            }
          >
            <Search />
          </Button>
        </div>
        <Button type="button" size="icon" className={"flex-shrink-0"}>
          <Mic />
        </Button>
      </form>
      <div
        className={`flex-shrink-0 md:gap-2 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}
      >
        <Button
          onClick={() => setShowFullWidthSearch(true)}
          size="icon"
          variant="ghost"
          className={"sm:hidden"}
        >
          <Search />
        </Button>
        <Button size="icon" variant="ghost" className={"sm:hidden"}>
          <Mic />
        </Button>
        <Button size="icon" variant="ghost">
          <Upload />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>
        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </div>
  );
}

export function PageHeaderFirstSection({ hidden = false }) {
  const { toggle } = useSidebarContext();
  return (
    <div
      className={`gap-4 items-center flex-shrink-0 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <Button onClick={toggle} variant="ghost" size="icon">
        <Menu />
      </Button>
      <a href="/" className="flex items-center">
        <Film className="text-red-500" />
        <p className="font-bold">MJMTube</p>
      </a>
    </div>
  );
}

PageHeaderFirstSection.propTypes = {
  hidden: PropTypes.bool,
};
