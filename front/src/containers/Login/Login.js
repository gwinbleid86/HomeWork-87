import React, {Component} from 'react';
import {Alert, Button, Col, Form, FormGroup} from "reactstrap";
import FormElement from "../../components/UI/FormElement/FormElement";
import {connect} from "react-redux";
import {loginUser} from "../../store/actions/usersActions";

class Login extends Component {
    state = {
        username: "",
        password: ""
    };
    inputChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };
    submitFormHandler = event => {
        event.preventDefault();
        this.props.loginUser({...this.state});
    };
    getFieldError = fieldName => {
        try {
            return this.props.error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    render() {
        return (
            <>
                <h2>Login</h2>
                {this.props.error && (
                    <Alert color="danger">{this.props.error.error}</Alert>
                )}
                <Form onSubmit={this.submitFormHandler}>
                    <FormElement
                        type="text"
                        propertyName="username"
                        title="UserName"
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('username')}
                        placeholder={'Enter username'}
                        autoComplete='new-username'
                    />
                    <FormElement
                        type="password"
                        propertyName="password"
                        title="Password"
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('password')}
                        placeholder={'Enter password'}
                        autoComplete='new-password'
                    />
                    <FormGroup row>
                        <Col sm={{offset:2, size:10}}>
                            <Button type="submit" color="primary">
                                Login
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </>
        );
    }
}
const mapStateToProps = state => ({
    loading: state.users.loginLoading,
    error: state.users.loginError
});

const mapDispatchToProps = dispatch => ({
    loginUser: (userData) => dispatch(loginUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);