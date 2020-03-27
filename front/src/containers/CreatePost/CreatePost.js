import React, {Component} from 'react';
import {createPost} from "../../store/actions/postsActions";
import {connect} from "react-redux";
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import FormElement from "../../components/UI/FormElement/FormElement";

class CreatePost extends Component {
    componentDidMount() {
        if(!this.props.user)
            this.props.history.push("/login");
    };

    state={
       title:"",
       description:"",
       image:""
   };
    inputChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };
    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };
    submitFormHandler = async event => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        await this.props.createPost(formData);
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
                <h2>New post: </h2>
                <Form onSubmit={this.submitFormHandler}>
                    <FormElement
                        type="text"
                        propertyName="title"
                        title="Title"
                        value={this.state.title}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('title')}
                        placeholder='Enter title'
                        autoComplete='new-title'
                    />
                    <FormElement
                        type="text"
                        propertyName="description"
                        title="Description"
                        value={this.state.description}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('description')}
                        placeholder='Enter description'
                        autoComplete='new-description'
                    />
                    <FormGroup row>
                        <Label sm={2} for="image">Image</Label>
                        <Col sm={10}>
                            <Input
                                type="file"
                                name="image" id="image"
                                onChange={this.fileChangeHandler}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={{offset:2, size:10}}>
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
        post: state.posts.post,
        user: state.users.user,
        error:state.posts.createError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createPost: (postData) => dispatch(createPost(postData)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);