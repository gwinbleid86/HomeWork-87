import React, {Component} from 'react';
import {connect} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Card, CardBody, CardSubtitle, CardTitle, Col, Row} from "reactstrap";
import {NavLink} from "react-router-dom";
import Moment from "react-moment";
import {getPosts} from "../../store/actions/postsActions";
import PostsThumbnail from "../../components/PostThumbnail/PostThumbnail";

class Posts extends Component {
    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        return (this.props.loading ? <Spinner/> :
                this.props.posts.length > 0 ? <>
                    <h2>Posts: </h2>
                    {this.props.posts.map(post => {
                        return <div key={post._id}>
                            <Card style={{marginBottom: "10px"}}>
                                <CardBody>
                                    <Row>
                                        <Col sm={12} md={4} lg={3}>
                                            <PostsThumbnail image={post.image}/>
                                        </Col>
                                        <Col sm={12} md={8} lg={9}>
                                            <CardSubtitle>
                                                <p style={{display: 'inline-block', marginRight: '5px'}}>
                                                    <Moment format="YYYY-MM-DD HH:mm:hh">
                                                        {post.dateTime}
                                                    </Moment> by
                                                </p>
                                                <h4 style={{display: 'inline-block'}}>{post.user.username}</h4>
                                            </CardSubtitle>
                                            <CardTitle style={{
                                                fontSize: "25px",
                                                fontWeight: "bold",
                                                margin: "10px 0 0"
                                            }}>
                                                <NavLink
                                                         to={'/posts/' + post._id} exact>
                                                    {post.title}
                                                </NavLink>
                                            </CardTitle>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </div>
                    })}
                </> : <h3>No albums</h3>
        )
    }
}


const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
        loading: state.posts.loading,
        error: state.posts.error,
        user: state.users.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPosts: () => dispatch(getPosts()),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Posts);