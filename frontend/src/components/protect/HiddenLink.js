import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';

//Components that are shown when user is logged in (isLoggedIn)
export const ShowInLogin = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if(isLoggedIn) {
        return <>{children}</>;
    } else return null;
};

//Components that are shown when user is logged out (!isLoggedIn)
export const ShowInLogout = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    if(!isLoggedIn) {
        return <>{children}</>;
    } else return null;
};