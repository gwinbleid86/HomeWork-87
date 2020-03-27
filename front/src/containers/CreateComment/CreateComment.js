import React, {Component} from 'react';
import {Button, Col, Form, FormGroup} from "reactstrap";
import FormElement from "../../components/UI/FormElement/FormElement";
import {connect} from "react-redux";
import {createComment} from "../../store/actions/commentsActions";

class CreateComment extends Component {
    componentDidMount() {
        if (!this.props.user)
            this.props.history.push("/login");
    };

    state = {
        text: "",
    };
    inputChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    submitFormHandler = async event => {
        event.preventDefault();
        const formData = {
            text: this.state.text,
            post: this.props.post._id
        };
        await this.props.createComment(formData);
        this.setState({text:""});
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
                <Form onSubmit={this.submitFormHandler}>
                    <FormElement
                        type="text"
                        propertyName="text"
                        title="Comment"
                        value={this.state.text}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('text')}
                        placeholder='Enter comment'
                        autoComplete='new-text'
                        required={true}
                    />
                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}>
                            <Button type="submit" color="primary">
                                Create
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
        error: state.comments.createError,
        post: state.posts.post
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createComment: (commentData) => dispatch(createComment(commentData)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);