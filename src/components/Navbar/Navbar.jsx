import useLanguageContext from "../../globalContext/languageContext";
import { Avatar_Avacado_Food } from "../../assets/images";

function Navbar() {
  const { siteContent } = useLanguageContext();
  return (
    <div className="navbar bg-base-100 md:p-6">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">
          {siteContent?.navbar.websiteName}
        </a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={Avatar_Avacado_Food} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
