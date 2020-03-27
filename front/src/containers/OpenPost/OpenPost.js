import React, {Component} from 'react';
import {getPostById} from "../../store/actions/postsActions";
import {connect} from "react-redux";
import {getComments} from "../../store/actions/commentsActions";
import {Card, CardBody, CardSubtitle, CardTitle, Col, Row} from "reactstrap";
import Spinner from "../../components/UI/Spinner/Spinner";
import {apiURL} from "../../constants";
import Moment from "react-moment";
import Comments from "../../components/Comments/Comments";
import imgNotAvailable from "../../assets/images/img_not_available.jpg"
import CreateComment from "../CreateComment/CreateComment";

class OpenPost extends Component {
    async componentDidMount() {
        const postId = this.props.match.params.id;
        await this.props.getPostById(postId);
        await this.props.getComments(postId);
    }

    render() {
        return (
            this.props.loadingComments || this.props.loadingPost ? <Spinner/> :
                !this.props.post ? <h3>No post</h3> :
                    <>
                        <Card style={{marginBottom: "25px"}}>
                            <CardBody>
                                <Row>
                                    <Col sm={12} md={4} lg={3}>
                                        <img width="200"
                                             src={this.props.post.image ? apiURL + '/uploads/' + this.props.post.image : imgNotAvailable}
                                             alt=""/>
                                    </Col>
                                    <Col sm={12} md={8} lg={9}>
                                        <CardSubtitle>
                                            <p style={{display: 'inline-block', marginRight: '5px'}}>
                                                <Moment format="YYYY-MM-DD">
                                                    {this.props.post.dateTime}
                                                </Moment> by
                                            </p>
                                            <h5 style={{display: 'inline-block'}}>{this.props.post.user.username}</h5>
                                        </CardSubtitle>
                                        <CardTitle style={{
                                            fontSize: "25px",
                                            fontWeight: "bold",
                                            margin: "10px 0 0"
                                        }}>
                                            {this.props.post.title}
                                        </CardTitle>
                                        <CardSubtitle>
                                            <p style={{marginTop: "25px"}}>{this.props.post.description}</p>
                                        </CardSubtitle>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        {this.props.user ? <CreateComment/> : <h3>Login to write a comment</h3>}
                        {this.props.comments.length === 0 ? <h3>No comments</h3> :
                            <div>
                                <h3>Comments: </h3>
                                <Comments comments={this.props.comments}/>
                            </div>
                        }
                    </>
        );
    }
}

const mapStateToProps = state => {
    return {
        post: state.posts.post,
        comments: state.comments.comments,
        loadingComments: state.comments.loading,
        errorComments: state.comments.error,
        loadingPost: state.posts.loading,
        errorPost: state.posts.error,
        user: state.users.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPostById: (postId) => dispatch(getPostById(postId)),
        getComments: (postId) => dispatch(getComments(postId)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(OpenPost);