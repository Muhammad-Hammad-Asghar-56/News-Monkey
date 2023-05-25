import React, { PureComponent } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class NewComponent extends PureComponent {
    constructor(props){
        super();
        this.props=props;
    }
    render() {
       
        return (
            <div className={"mt-4 mb-4"} style={{textAlign:"Left"}} >
                <Card style={{ width: '20rem' }}>
                    <Card.Img variant="top" src={! this.props.imgUrl ? "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png" : this.props.imgUrl} />                   
                    <Card.Body>
                        <Card.Title>{this.props.title.slice(0,50)+"..."}</Card.Title>
                        <Card.Text>
                            {this.props.description.slice(0,80)+"..."}
                        </Card.Text>
                        <Button variant="primary">Read more</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default NewComponent
