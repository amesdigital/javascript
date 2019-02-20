// External dependencies
import React from "react";
import PropTypes from "prop-types";
import { defineMessages, FormattedMessage, injectIntl } from "react-intl";
import styled from "styled-components";

// Internal dependencies
import { ModalHeading } from "../Headings";
import colors from "yoast-components/style-guide/colors";
import { LargeButton, LargeSecondaryButton, makeButtonFullWidth } from "../Button";
import ButtonsContainer from "../general/ButtonsContainer";
import ErrorDisplay from "../../errors/ErrorDisplay";


const messages = defineMessages( {
	siteAuthenticationFormHeader: {
		id: "SiteAuthenticationform.header.text",
		defaultMessage: "Authorization",
	},
	siteAuthenticationFormAuthorizationRequest: {
		id: "SiteAuthenticationform.authorizationRequest",
		defaultMessage: "Authorize {source} to:",
	},
	siteAuthenticationFormAuthorizeButtonText: {
		id: "SiteAuthenticationform.Authorizebutton.text",
		defaultMessage: "Authorize",
	},
	siteAuthenticationFormCancelButtonText: {
		id: "SiteAuthenticationform.Cancelbutton.text",
		defaultMessage: "Cancel",
	},
	siteAuthenticationFormConnectText: {
		id: "SiteAuthenticationform.connectText",
		defaultMessage: "Authorizing will start the process of connecting your website to your MyYoast account.",
	},
	goBack: {
		id: "SiteAuthenticationform.goBack",
		defaultMessage: "Go back",
	},
} );

const AuthenticationFormContainer = styled.div`
	margin: -24px -24px -40px;
`;

const AuthorizationList = styled.ul`
	border-top: 1px solid ${ colors.$color_grey_medium_dark };
	margin: 1em 0 2em;
	padding: 0;
	list-style-position: inside;
`;

const AuthorizationRow = styled.li`
	border-bottom: 1px solid ${ colors.$color_grey_medium_dark };
	padding: 8px 0 8px 24px;
`;

const FadedParagraph = styled.p`
	color: ${ colors.$color_grey_text_light }
`;

const WideAuthorizeButton = makeButtonFullWidth( LargeButton );
const WideReturnButton = styled( WideAuthorizeButton )`
	margin-top: 8px;
`;
const WideSecondaryButton = makeButtonFullWidth( LargeSecondaryButton );

/**
 * Create an unordered list based on the passed authorizations the user has to agree to achieve a connection between their url and my yoast.
 *
 * @param {Array} authorizations The authorizations to display.
 *
 * @returns {ReactElement} An unordered list of authorizations.
 */
function getAuthorizations( authorizations ) {
	return (
		<AuthorizationList>
			{ authorizations.map(
				( authorization, index ) =>
					<AuthorizationRow key={ `${ index }:row` }>
						<FormattedMessage
							id={ `${ index }:description` }
							defaultMessage={ authorization.description }
						/>
					</AuthorizationRow>
			) }
		</AuthorizationList>
	);
}

/**
 * Returns a DataMissing component, telling the user something went wrong, and presenting a "go back" button.
 *
 * @returns {ReactElement} The DataMissing component.
 */
const DataMissing = () => {
	const error = {
		code: "authorization_parameters_missing",
	};
	return (
		<AuthenticationFormContainer>
			<ModalHeading>
				<b><FormattedMessage { ...messages.siteAuthenticationFormHeader } /></b>
			</ModalHeading>
			<ErrorDisplay
				error={ error }
			/>
			<ButtonsContainer>
				<WideReturnButton
					onClick={
						() => {
							window.history.back();
						}
					}
				>
					<FormattedMessage { ...messages.goBack } />
				</WideReturnButton>
			</ButtonsContainer>
		</AuthenticationFormContainer>
	);
};

/**
 * The Connect component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Connect component.
 */
function ConnectComponent( props ) {
	if ( props.dataMissing ) {
		return <DataMissing />;
	}
	const url = new URL( props.url );
	const myYoastText = <b>{ "MyYoast" }</b>;

	const siteUrl = <b>{ url.hostname }</b>;

	const siteAuthorizations = [ { description: "Receive Yoast plugin updates." }, { description: "Send messages to MyYoast." } ];
	const myYoastAuthorizations = [ { description: "Send messages to your website." } ];

	return (
		<AuthenticationFormContainer>
			<ModalHeading>
				<b><FormattedMessage { ...messages.siteAuthenticationFormHeader } /></b>
			</ModalHeading>
			<p>
				<FormattedMessage { ...messages.siteAuthenticationFormAuthorizationRequest } values={ { source: siteUrl } } />
			</p>
			{ getAuthorizations( siteAuthorizations ) }
			<p>
				<FormattedMessage { ...messages.siteAuthenticationFormAuthorizationRequest } values={ { source: myYoastText } } />
			</p>
			{ getAuthorizations( myYoastAuthorizations ) }
			<FadedParagraph>
				<FormattedMessage { ...messages.siteAuthenticationFormConnectText } />
			</FadedParagraph>
			<ButtonsContainer>
				<WideSecondaryButton onClick={ props.onDeny }>
					<FormattedMessage { ...messages.siteAuthenticationFormCancelButtonText } />
				</WideSecondaryButton>
				<WideAuthorizeButton
					onClick={
						() => {
							props.onAuthorize( {
								url: props.url,
								clientId: props.clientId,
								extensions: props.extensions,
								redirectUrl: props.redirectUrl,
								credentialsUrl: props.credentialsUrl,
								type: props.type,
							} );
						}
					}
				>
					<FormattedMessage { ...messages.siteAuthenticationFormAuthorizeButtonText } />
				</WideAuthorizeButton>
			</ButtonsContainer>
		</AuthenticationFormContainer>
	);
}

ConnectComponent.propTypes = {
	dataMissing: PropTypes.bool.isRequired,
	url: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.bool,
	] ).isRequired,
	clientId: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.bool,
	] ).isRequired,
	extensions: PropTypes.oneOfType( [
		PropTypes.array,
		PropTypes.bool,
	] ).isRequired,
	redirectUrl: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.bool,
	] ).isRequired,
	type: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.bool,
	] ).isRequired,
	credentialsUrl: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.bool,
	] ).isRequired,
	onAuthorize: PropTypes.func,
	onDeny: PropTypes.func,
};

ConnectComponent.defaultProps = {
	onAuthorize: () => {},
	onDeny: () => {},
};

export default injectIntl( ConnectComponent );
