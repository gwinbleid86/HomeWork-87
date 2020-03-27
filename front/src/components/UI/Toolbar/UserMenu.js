import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, NavItem, NavLink, UncontrolledDropdown} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const UserMenu = ({user, logout}) => {
    return (
        <>
            <NavItem>
                <NavLink tag={RouterNavLink} to="/add_post" exact>Add new post</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Hello, {user.username}!
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        View profile
                    </DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem onClick={logout}>
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </>
    );
};

export default UserMenu;