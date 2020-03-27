import React from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';
import {Container, Nav, Navbar, NavbarBrand} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonymousMenu";
import {logoutUser} from "../../../store/actions/usersActions";

const Toolbar = () => {
    const user = useSelector(state => state.users.user); //ShallowEqual
    const dispatch = useDispatch();
    return (
        <Navbar color="light" light expand="md">
            <Container>
                <NavbarBrand tag={RouterNavLink} to="/">Forum</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    {user ? (
                        <UserMenu user={user} logout={()=>dispatch(logoutUser())}/>
                    ) : (
                        <AnonymousMenu/>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Toolbar;