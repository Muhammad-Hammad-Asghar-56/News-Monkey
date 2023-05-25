import React, { PureComponent } from 'react'

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import NewComponent from './NewComponent';
import Loading from './Loading';


export class News extends PureComponent {
    constructor() {
        super();
        this.state = {
            article: [],
            pagNo: 1,
            totalNumber: null,
            perPageNum: 50,
            isLoading: false,
        }
    }
    async componentDidMount() { // run automatically after run custructor and rendering page
        this.setState({ isLoading: true });
        let rawData;

        rawData = await fetch("https://newsapi.org/v2/everything?q=bitcoin&apiKey=79dab764ed5e421da0a13f171a12233c"+ "&pageNo=" + this.state.pagNo+"&pagesize="+this.state.perPageNum);
        let parsedData = await rawData.json();
        this.setState({

            totalNumber: parsedData.totalResults,
            article: parsedData.articles,
            isLoading: false
        });

    }

    moveNextPage = async () => {
        let currentPg = this.state.pagNo + 1;
        this.setState({
            pagNo: currentPg,
            isLoading: true
        });
    
        console.log("https://newsapi.org/v2/everything?q=bitcoin&apiKey=79dab764ed5e421da0a13f171a12233c" + "&pageNo=" + this.state.pagNo + "&pagesize=" + this.state.perPageNum);
        let rawData = await fetch("https://newsapi.org/v2/everything?q=bitcoin&apiKey=79dab764ed5e421da0a13f171a12233c" + "&pageNo=" + currentPg + "&pagesize=" + this.state.perPageNum);
        
        let parsedData = await rawData.json();
        this.setState({
            article: parsedData.articles,
            isLoading: false
        });
    }
    
    movePrevPage = async () => {

            let currentPg =this.state.pagNo-1;
            this.setState({
                pagNo: currentPg,
               isLoading: true
            })
            let rawData = await fetch("https://newsapi.org/v2/everything?q=bitcoin&apiKey=79dab764ed5e421da0a13f171a12233c" + "&pageNo=" + this.state.pagNo+"&pagesize="+this.state.perPageNum);
            
            let parsedData = await rawData.json();
            this.setState({
                article: parsedData.articles,
                isLoading: false
            });
    }

    render() {
        return (
            <>
                <div className={"Container"}>
                    {this.state.isLoading ? <Loading /> : false}
                    <Container>
                        <Row>
                            {
                                this.state.article && this.state.article.map((element) => {
                                    return element.description && <Col key={element.url} className='md-4'>
                                        <NewComponent title={element.title} description={element.description} imgUrl={element.urlToImage} btnUrl={element.url} />
                                    </Col>

                                })
                            }
                        </Row>
                    </Container>

                    {!(this.state.isLoading) && <Container className={"mb-5"}>
                        <Row>
                            <Col md={4}>
                                <Button className={"py-2 px-4"} variant="secondary" disabled={this.state.pagNo > 1 ? false:true } onClick={this.movePrevPage}>&larr; Prev</Button>
                            </Col>

                            <Col md={{ span: 4, offset: 4 }}>
                                <Button className={"py-2 px-4"} variant="secondary" disabled={this.state.pagNo < Math.ceil(this.state.totalNumber/this.state.perPageNum)? false : true} onClick={this.moveNextPage}>Next &rarr; </Button>
                            </Col>
                        </Row>
                    </Container>}
                </div>
            </>
        )
    }
}

export default News
