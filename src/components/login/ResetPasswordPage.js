import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { defineMessages, FormattedMessage, injectIntl, intlShape } from "react-intl";
import validate from "validate.js";
import _isUndefined from "lodash/isUndefined";
import queryString from "query-string";

import { passwordConstraints, passwordRepeatConstraint } from "./CommonConstraints";
import colors from "yoast-components/style-guide/colors.json";

// Images
import logo from "../../images/my-yoast-academy-logo.svg";

// Components.
import LoginColumnLayout from "./LoginColumnLayout";
import { Button } from "../Button";
import ValidationInputField from "../ValidationInputField";
import { StyledLabel } from "../Labels";
import isEmpty from "lodash/isEmpty";
import { Redirect } from "react-router";
import ErrorDisplay from "../../errors/ErrorDisplay";

const messages = defineMessages( {
	labelPassword: {
		id: "reset.newPassword",
		defaultMessage: "New password",
	},
	labelPasswordRepeat: {
		id: "reset.newPasswordRepeat",
		defaultMessage: "Repeat new password",
	},
	resetMessage: {
		id: "reset.message",
		defaultMessage: "Please enter a new password for the MyYoast account linked to {email}.",
	},
	resetButton: {
		id: "reset.button",
		defaultMessage: "Confirm password change",
	},
	loadingButton: {
		id: "reset.button.loading",
		defaultMessage: "Saving password...",
	},
} );

// Styled components.
const Header = styled.div`
	text-align: center;
	margin-bottom: 40px;
`;

const Column = styled.div`
	margin: 20px;
`;

const TextInput = styled( ValidationInputField )`
	background-color: ${ colors.$color_background_light };
`;

const Logos = styled.img`
	width: 360px;
`;

const FormGroup = styled.form`
	position: relative;
	width: 100%;
	min-height: 300px;
	margin-top: 40px;
`;

const LabelBlock = styled.div`
	width: 100%;
`;

const Label = styled( StyledLabel )`
	margin-top: 5px;
`;

const SaveButtonArea = styled.div`
	bottom: 0;
	width: 100%;
`;

const SaveButton = styled( Button )`
	margin: 1em 0;
	width: 100%;
`;

/**
 * Page to change the password of an account.
 */
class ResetPasswordPage extends React.Component {

	constructor( props ) {
		super( props );

		let parsedQuery = queryString.parse( this.props.location.search, { arrayFormat: "bracket" } );
		// Default state.
		this.state = {
			password: "",
			passwordRepeat: "",
			errors: {},
			userLogin: parsedQuery.login || "",
			key: parsedQuery.key || "",
			email: parsedQuery.email || this.props.email,
		};

		this.handleSubmit = this.handleSubmit.bind( this );
		this.onUpdatePassword = this.onUpdate.bind( this, "password" );
		this.onUpdatePasswordRepeat = this.onUpdate.bind( this, "passwordRepeat" );
		this.validate = this.validate.bind( this );

		// Validation constraints.
		this.constraints = {
			passwordRepeat: passwordRepeatConstraint( this.props.intl ),
		};
	}

	/**
	 * Updates the specified field in the state,
	 * to be used as callback functions in text input fields.
	 *
	 * @param {string} field the field in the state that should be updated.
	 * @param {Object} event the input field change event.
	 * @param {Object} errors the input field change event.
	 * @returns {void}
	 */
	onUpdate( field, event, errors ) {
		let obj = {};
		obj[ field ] = event.target.value;
		obj.errors = Object.assign( {}, this.state.errors );
		obj.errors[ field ] = errors;
		this.setState( obj, () => {
			let newErrors = this.validate();
			errors = Object.assign( {}, this.state.errors, newErrors );
			this.setState( { errors } );
		} );
	}

	/**
	 * Validates the password and password repeat fields
	 * and returns an array of errors if there are any errors,
	 * and an empty array if none are present.
	 *
	 * @returns {string[]} the array of error messages.
	 */
	validate() {
		if ( this.state.passwordRepeat.length === 0 ) {
			return [];
		}

		let errors = validate( {
			password: this.state.password,
			passwordRepeat: this.state.passwordRepeat,
		}, this.constraints );

		if ( _isUndefined( errors ) ) {
			errors = [];
		}
		return errors;
	}

	/**
	 * Checks whether or not the form may be submitted.
	 *
	 * @returns {boolean} Whether or not the form may be submitted.
	 */
	canSubmit() {
		return isEmpty( this.state.password ) === false &&
			isEmpty( this.state.passwordRepeat ) === false &&
			this.state.password === this.state.passwordRepeat &&
			isEmpty( this.state.errors.password ) &&
			isEmpty( this.state.errors.passwordRepeat ) &&
			isEmpty( this.props.submitErrors ) &&
			this.props.loading === false;
	}

	/**
	 * Resets the user's password.
	 *
	 * @param { object } event The button click event.
	 * @returns {void}
	 */
	handleSubmit( event ) {
		event.preventDefault();
		if ( this.canSubmit() === false ) {
			return;
		}
		let data = {
			/* eslint-disable camelcase */
			user_login: this.state.userLogin || "",
			password1: this.state.password,
			password2: this.state.passwordRepeat,
			key: this.state.key || "",
			/* eslint-enable camelcase */
		};
		this.props.attemptResetPassword( data );
	}

	render() {
		if ( this.props.passwordResetSuccess ) {
			return <Redirect to={ "/forgot-password/success" }/>;
		}

		let buttonText = messages.resetButton;
		if ( this.props.loading ) {
			buttonText = messages.loadingButton;
		}
		return (
			<LoginColumnLayout>
				<Column>
					<Header>
						<Logos src={ logo } alt="MyYoast - Yoast Academy"/>
					</Header>
					<FormattedMessage
						id={ messages.resetMessage.id }
						defaultMessage={ messages.resetMessage.defaultMessage }
						values={ { email: this.state.email } }
					/>
					<FormGroup onSubmit={ this.handleSubmit }>
						<ErrorDisplay error={ this.props.submitErrors }/>
						<LabelBlock>
							<Label htmlFor="password">
								<FormattedMessage { ...messages.labelPassword } />
							</Label>
							<TextInput
								id="password"
								name="password"
								type="password"
								onChange={ this.onUpdatePassword }
								delay={ 0 }
								constraint={ passwordConstraints( this.props.intl ) }
							/>
						</LabelBlock>

						<LabelBlock>
							<Label htmlFor="password-repeat">
								<FormattedMessage { ...messages.labelPasswordRepeat } />
							</Label>
							<TextInput
								id="password-repeat"
								name="repeat password"
								type="password"
								onChange={this.onUpdatePasswordRepeat}
								errors={this.state.errors.passwordRepeat}
							/>
						</LabelBlock>

						<SaveButtonArea>
							<SaveButton type="submit" enabledStyle={ this.canSubmit() }>
								<FormattedMessage { ...buttonText } />
							</SaveButton>
						</SaveButtonArea>
					</FormGroup>
				</Column>
			</LoginColumnLayout>
		);
	}
}

ResetPasswordPage.propTypes = {
	intl: intlShape.isRequired,
	children: PropTypes.array,
	email: PropTypes.string,
	attemptResetPassword: PropTypes.func.isRequired,
	submitErrors: PropTypes.object,
	location: PropTypes.object,
	passwordResetSuccess: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
};

ResetPasswordPage.defaultProps = {
	email: "your email address",
	loading: false,
	passwordResetSuccess: false,
};

export default injectIntl( ResetPasswordPage );
