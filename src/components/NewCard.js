import React, { PureComponent } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Label from 'react-bootstrap/FormLabel'
export class NewCard extends PureComponent {
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
                        <Label className={"d-block "}>Date : {this.props.publishedAt.split("T")[0]}</Label>
                        <Label className={"d-block "}>Time : {this.props.publishedAt.split("T")[1]}</Label>
                        <Button href= {this.props.btnUrl} target='_blank' variant="primary">Read more</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default NewCard
