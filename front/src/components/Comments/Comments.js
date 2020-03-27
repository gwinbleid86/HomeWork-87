import React from 'react';
import {Card, CardBody, CardHeader, CardText} from "reactstrap";
import Moment from "react-moment";

const Comments = ({comments}) => {
    return (
        <div>
            {comments.map(comment => {
                return <Card style={{marginBottom:"15px"}} key={comment._id}>
                    <CardHeader style={{padding:"0"}}>
                        <p style={{display: "inline-block", margin: "0 10px"}}>
                            <Moment format="YYYY-MM-DD HH:mm:hh">
                                {comment.dateTime}
                            </Moment>
                        </p>
                        <h5 style={{display: "inline-block"}}>{comment.user.username}</h5>
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            {comment.text}
                        </CardText>
                    </CardBody>
                </Card>
            })}

        </div>
    );
};

export default Comments;