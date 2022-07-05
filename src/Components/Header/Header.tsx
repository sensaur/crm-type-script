import { useState } from 'react';
import { getUserInfo, getUserRole } from '../../auth/auth';

interface HeaderState {
  dropdownOpen: false
  userInfo: any
  redirectToLogin: boolean,
  notify: number,
  isAuthError: boolean
}

function Header() {
  const userRole = getUserRole();
  debugger;
  console.log(userRole);

  const [state, setState] = useState<HeaderState>({
    dropdownOpen: false,
    userInfo: getUserInfo(),
    redirectToLogin: false,
    notify: 0,
    isAuthError: false,
  });

  console.log(state);
  console.log(setState);
  return (
    <div>Здесь будет хедер</div>
  );
}

export default Header;
