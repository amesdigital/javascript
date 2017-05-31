import React from "react";
import styled from "styled-components";
import logo from "../images/logo.svg";
import Link from "./Link.js";

/**
 * @param {Object} props Component props.
 * @param {String} props.size The width of the prop.
 * @param {String} props.alt The alternative text to show for the logo.
 * @returns {ReactElement} A react component describing the logo component.
 * @constructor
 */
export function Logo( props ) {
	return (
		<Link to="/"><LogoImage src={ logo } size={ props.size } alt={ props.alt }/></Link>
	);
}

Logo.propTypes = {
	size: React.PropTypes.string,
	alt: React.PropTypes.string,
};

Logo.defaultProps = {
	size: "200px",
	alt: "Home page",
};

const LogoImage = styled.img`
	width: ${ props => props.size };
	display: block;
	margin: 30px auto 25px;

	@media screen and ( max-width: 1024px ) {
	margin: 12px 0 0 5px;
	}
`;

LogoImage.propTypes = {
	size: React.PropTypes.string,
};

LogoImage.defaultProps = {
	size: "200px",
};
