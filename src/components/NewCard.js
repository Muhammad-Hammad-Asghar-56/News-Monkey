import React, { PureComponent } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Label from 'react-bootstrap/FormLabel'
export class NewCard extends PureComponent {
    constructor(props) {
        super();
        this.props = props;
    }
    render() {

        return (
            <div className={"mt-4 mb-4"} style={{ textAlign: "Left" }} >
                <Card style={{ width: '20rem' }}>
                    <Card.Img variant="top" src={!this.props.imgUrl ? "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png" : this.props.imgUrl} />
                    <Card.Body>
                        <Card.Title>{this.props.title.slice(0, 50) + "..."}</Card.Title>
                        <Card.Text>
                            {this.props.description.slice(0, 80) + "..."}
                        </Card.Text>
                        <Button href={this.props.btnUrl} target='_blank' variant="primary">Read more</Button>
                    </Card.Body>
                    <Card.Footer>
                            <small className="text-muted">By <strong> {this.props.author ? this.props.author : "Unkown"} </strong>at {new Date(this.props.publishedAt).toUTCString()}</small>
                    </Card.Footer>
                </Card>
            </div>
        )
    }
}

export default NewCard
