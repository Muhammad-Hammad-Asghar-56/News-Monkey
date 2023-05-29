import React, { PureComponent } from 'react'

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import NewCard from './NewCard';
import Loading from './Loading';
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom';

export class News extends PureComponent {
    
    static defaultProps={
        category:"top-headlines",
        Country:"us"
    }
    
    static propTypes={
        category:PropTypes.string,
        Country:PropTypes.string,
    }
    
    constructor() {
        super();
        this.state = {
            article: [],
            pagNo: 1,
            totalNumber: null,
            perPageNum: 6,
            isLoading: false,
        }
    }
    async componentDidMount() { // run automatically after run custructor and rendering page
        const { params } = this.props;
        this.setState({ params });
        this.setState({ isLoading: true });
        let rawData;

        rawData = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.category}&apiKey=79dab764ed5e421da0a13f171a12233c`+ "&page=" + this.state.pagNo+"&pagesize="+this.state.perPageNum)
 

        let parsedData = await rawData.json();
        this.setState({

            totalNumber: parsedData.totalResults,
            article: parsedData.articles,
            isLoading: false
        });
        document.title="News Monley - "+this.props.category.toUpperCase();
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.category !== this.props.category) {
          this.setState({ isLoading: true, pagNo: 1 });
          this.fetchData();
        }
      }
    
      fetchData = async () => {
        try {
          const rawData = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.category}&apiKey=79dab764ed5e421da0a13f171a12233c` +
              `&page=` +
              this.state.pagNo +
              `&pagesize=` +
              this.state.perPageNum
          );
          const parsedData = await rawData.json();
          this.setState({
            totalNumber: parsedData.totalResults,
            article: parsedData.articles,
            isLoading: false
          });
        } catch (error) {
          console.error(error);
          this.setState({ isLoading: false });
        }
        document.title="News Monley - "+this.props.category.toUpperCase();
    };    



    async updatePage(){
        this.setState({
            isLoading: true
        });

        let rawData = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.category}&apiKey=79dab764ed5e421da0a13f171a12233c` + `&page=` + this.state.pagNo + `&pagesize=` + this.state.perPageNum);
        
        let parsedData = await rawData.json();
        this.setState({
            article: parsedData.articles,
            isLoading: false
        });
    }

    moveNextPage = () => {
        this.setState({
            pagNo: this.state.pagNo + 1,
        });
        this.updatePage();
    }
    
    movePrevPage = async () => {
            this.setState({
                pagNo: this.state.pagNo-1,
            })
            this.updatePage();
    }
    render() {
        return (
            <>
                <div topclassName={"Container"}>
                    {this.state.isLoading ? <Loading /> : false}
                    {!(this.state.isLoading) &&
                    <>
                    
                    <Container>
                        <Row>
                            {
                                this.state.article && this.state.article.map((element) => {
                                    return element.description && <Col key={element.url} className='md-4'>
                                        <NewCard title={element.title} description={element.description} imgUrl={element.urlToImage} btnUrl={element.url} author={element.author} publishedAt={element.publishedAt}/>
                                    </Col>
                                })
                            }
                        </Row>
                    </Container>

                    <Container className={"mb-5"}>
                        <Row>
                            <Col md={4}>
                                <Button className={"py-2 px-4"} variant="primary" disabled={this.state.pagNo > 1 ? false:true } onClick={this.movePrevPage}>&larr; Prev</Button>
                            </Col>

                            <Col md={{ span: 4, offset: 4 }}>
                                <Button className={"py-2 px-4"} variant="primary" disabled={this.state.pagNo < Math.ceil(this.state.totalNumber/this.state.perPageNum)? false : true} onClick={this.moveNextPage}>Next &rarr; </Button>
                            </Col>
                        </Row>
                    </Container>
                    </>
                    }
                </div>
            </>
        )
    }
}

export default News
