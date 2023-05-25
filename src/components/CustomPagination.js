import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';

class MyPagination extends React.Component {

    render() {
        let active = 2;
        let items = [];
        for (let number = 1; number <= this.props.totalLimit ; number++) {
            items.push(
                <Pagination.Item className="justify-content-center" onClick={() => this.props.setPageNumfunction(number)}>
                {number}
                </Pagination.Item>

            );
        }

        return (
            <Container className={"d-flex justify-content-center"}>               
                <Pagination>{items}</Pagination>
            </Container>
            
        );
    }
}

export default MyPagination;
