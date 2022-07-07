// import { useState } from 'react';
// import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { getCurrentOfficeData, getUserInfo, deauthenticateUser } from '../../auth/auth';

// interface HeaderState {
//   dropdownOpen: boolean
//   userInfo: any
//   redirectToLogin: boolean,
//   notify: number,
//   isAuthError: boolean
// }

// import login from '../Login/Login';

function Header() {
  const navigate = useNavigate();
  const userInfo = getUserInfo();
  const userOffice: any = getCurrentOfficeData();
  console.log(userInfo);
  console.log(userOffice);
  //
  // const [state, setState] = useState<HeaderState>({
  //   dropdownOpen: false,
  //   userInfo: getUserInfo(),
  //   redirectToLogin: false,
  //   notify: 0,
  //   isAuthError: false,
  // });
  //
  // console.log(state);
  // console.log(setState);
  //
  const logout = () => {
    deauthenticateUser();
    navigate('/login');
  };
  //
  // const toggle = () => {
  //   setState((prev: HeaderState) => ({
  //     ...prev,
  //     dropdownOpen: !state.dropdownOpen,
  //   }));
  // };
  //
  // const { dropdownOpen, userInfo, isAuthError } = state;
  // if (isAuthError) {
  //   deauthenticateUser();
  //   return (
  //     <Navigate to="/login" />
  //   );
  // }

  // @ts-ignore
  // @ts-ignore
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/11">Navbar</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/11">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/11">Link</a>
            </li>
            <li className="nav-item">
              <a href="/11" className="nav-link disabled">Disabled</a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="11"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {userInfo?.username}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li className="text-center">Действия</li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li><button type="button" className="dropdown-item" onClick={() => { navigate('/login'); }}>{userOffice.address || userOffice.name}</button></li>
                <li><button type="button" className="dropdown-item" onClick={logout}>Выйти</button></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
    // <li className="nav-item">
    //   <Dropdown
    //     isOpen={dropdownOpen}
    //     toggle={toggle}
    //   >
    //     <button
    //       onClick={toggle}
    //       className="nav-link dropdown-toggle"
    //       data-toggle="dropdown"
    //       type="button"
    //       aria-haspopup="true"
    //       aria-expanded={dropdownOpen}
    //     >
    //       <img className="img-avatar" alt="avatar" />
    //       <span className="d-md-down-none">{userInfo ? userInfo.username : ''}</span>
    //     </button>
    //
    //     <DropdownMenu className="dropdown-menu-right">
    //       <DropdownItem header className="text-center">
    //         <strong>
    //           Действия
    //         </strong>
    //       </DropdownItem>
    //       <DropdownItem>
    //         <Link to="/officein">
    //           <i className="icon-location-pin">1111 </i>
    //         </Link>
    //       </DropdownItem>
    //       <DropdownItem onClick={logout}>
    //         <i className="icon-logout"> </i>
    //         {' '}
    //         Выход
    //       </DropdownItem>
    //     </DropdownMenu>
    //   </Dropdown>
    // </li>
  );
}

export default Header;
