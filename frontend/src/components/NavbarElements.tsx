import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background: #4B2E83;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    
`;
// background: #4B2E83;
//     height: 85px;
//     display: flex;
//     justify-content: center;
//     padding: 0.2rem calc((100vw - 0px) / 2);
//     z-index: 12;

// export const NavLink = styled(Link)`
//     color: #808080;
//     display: flex;
//     align-items: center;
//     text-decoration: none;
//     padding: 0 1rem;
//     height: 100%;
//     width: 100%;
//     cursor: pointer;
//     &.active {
//         color: #000000;
//     }
// `;

export const Bars = styled(FaBars)`
    display: none;
    color: #B7A57A;
    margin: 5px;
    @media screen and (max-width: 1920px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin: 20px;
    /* Second Nav */
    /* margin-right: 24px; */
    /* Third Nav */
    /* width: 100vw;
    white-space: nowrap; */
    @media screen and (max-width: 700px) {
        display: none;
    }
`;

// export const NavBtn = styled.nav`
//     display: flex;
//     align-items: center;
//     margin-right: 24px;
//     margin-left: 24px;
//     justify-content: center;
//     width: 100vw;
//     @media screen and (max-width: 1920px) {
//         display: none;
//     }
// `;

export const NavBtnLink = styled(Link)`
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background: #85754D;
    padding: 10px 20px;
    color: #FFFFFF;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    /* Second Nav */
    margin-left: 24px;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #808080;
    }
`;