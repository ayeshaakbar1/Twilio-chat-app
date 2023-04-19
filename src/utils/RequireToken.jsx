
import { useSelector } from "react-redux";
import {Navigate} from "react-router-dom";

const RequireToken = ({children}) => {
    const email = useSelector((state) => state.chatReducers.email);
    const room = useSelector((state) => state.chatReducers.room);
    const token = useSelector((state) => state.chatReducers.token);

    {/* if email, room, and token are not defined, redirect to home page */}
    if (!email && !room && !token) {
        return <Navigate to="/" replace/>;
    } else {
        return children;
    } 
};
export default RequireToken;