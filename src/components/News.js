import React, { PureComponent } from 'react'

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import NewCard from './NewCard';
import Loading from './Loading';
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
export class News extends PureComponent {

    static defaultProps = {
        category: "top-headlines",
        Country: "us"
    }

    static propTypes = {
        category: PropTypes.string,
        Country: PropTypes.string,
        routerMapping: PropTypes.array.isRequired,
    }

    constructor() {
        super();
        this.state = {
            article: [],
            pagNo: 1,
            totalNumber: 0,
            perPageNum: 6,
            // isLoading: false,
            isMore: false
        }
    }
    async componentDidMount() { // run automatically after run custructor and rendering page
        const { params } = this.props;
        this.setState({ params });
        // this.setState({ isLoading: true });
        let rawData;

        rawData = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.category}&apiKey=79dab764ed5e421da0a13f171a12233c` + `&page=` + this.state.pagNo + `&pagesize=` + this.state.perPageNum)


        let parsedData = await rawData.json();
        this.setState({
            totalNumber: parsedData.totalResults,
            article: parsedData.articles,
            // isLoading: false,
            isMore: this.state.article.length < this.state.totalNumber ? true : false
        });
        document.title = "News Monley - " + this.props.category.toUpperCase();
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.category !== this.props.category) {
            this.setState({ isLoading: true });
            this.fetchData();
        }
    }

    fetchData = async () => {
        try {
            const rawData = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.category}&apiKey=79dab764ed5e421da0a13f171a12233c` +
                + `&page=` + this.state.pagNo + `&pagesize=` + this.state.perPageNum
            );
            const parsedData = await rawData.json();
            this.setState({
                pagNo: this.state.pagNo + 1,
                totalNumber: parsedData.totalResults,
                article: parsedData.articles,
                // isLoading : false,
                isMore: this.state.article.length + 1 < this.state.totalNumber ? true : false
            });
        } catch (error) {
            console.error(error);
            // this.setState({ isLoading: false });
        }
        document.title = "News Monkey - " + this.props.category.toUpperCase();
    };



    // async updatePage() {
    //     this.setState({
    //         isLoading: true
    //     });

    //     let rawData = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.category}&apiKey=79dab764ed5e421da0a13f171a12233c` + `&page=` + this.state.pagNo + `&pagesize=` + this.state.perPageNum);

    //     let parsedData = await rawData.json();
    //     this.setState({
    //         article: parsedData.articles,
    //         isLoading: false
    //     });
    // }

    // moveNextPage = () => {
    //     this.setState({
    //         pagNo: this.state.pagNo + 1,
    //     });
    //     this.updatePage();
    // }

    // movePrevPage = async () => {
    //     this.setState({
    //         pagNo: this.state.pagNo - 1,
    //     })
    //     this.updatePage();
    // }
    appendNextArticles = async () => {
        this.setState({
            // isLoading: true
        });

        let rawData = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.Country}&category=${this.props.category}&apiKey=79dab764ed5e421da0a13f171a12233c` + `&page=` + this.state.pagNo + `&pagesize=` + this.state.perPageNum);

        let parsedData = await rawData.json();
        this.setState({
            article: this.state.article.concat(parsedData.articles),
            // isLoading: false,
            isMore: this.state.article.length + 1 < this.state.totalNumber ? true : false
        });
    }
    fetchMoreData = async () => {
        console.log("Yup");
        this.setState({
            pagNo: this.state.pagNo + 1,
        })
        this.appendNextArticles();
    }
    getNextCategoryObj = () => {
        let currentIndex = this.props.routerMapping.findIndex(
            (route) => route.category === this.props.category
        )
        currentIndex = (currentIndex + 1) % this.props.routerMapping.length
        return this.props.routerMapping[currentIndex]
    }
    render() {
        return (
            <InfiniteScroll
                dataLength={this.state.article.length} //This is important field to render the next data
                next={this.fetchMoreData}
                hasMore={true}
                loader={(this.state.isMore) && <Loading />}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                topclassName={"Container"}
            >
                <Container key={this.state.pagNo + 1}>
                    <Row>
                        {
                            this.state.article && this.state.article.map((element) => {
                                return element.description && <Col key={element.url} className={"md-4 d-flex justify-content-center"}>
                                    <NewCard title={element.title} description={element.description} imgUrl={element.urlToImage} btnUrl={element.url} author={element.author} publishedAt={element.publishedAt} />
                                </Col>
                            })
                        }
                    </Row>
                </Container>

                {/* <Container className={"mb-5"}>
                                <Row>
                                    <Col md={4}>
                                        <Button className={"py-2 px-4"} variant="primary" disabled={this.state.pagNo > 1 ? false : true} onClick={this.movePrevPage}>&larr; Prev</Button>
                                    </Col>

                                    <Col md={{ span: 4, offset: 4 }}>
                                        <Button className={"py-2 px-4"} variant="primary" disabled={this.state.pagNo < Math.ceil(this.state.totalNumber / this.state.perPageNum) ? false : true} onClick={this.moveNextPage}>Next &rarr; </Button>
                                    </Col>
                                </Row>
                            </Container> */}

                {!this.state.isMore && <div className='d-flex justify-content-center my-4'>
                    <button className="py-2 px-4" varient="primary">
                        <a as={Link} to={this.getNextCategoryObj().path} varient="primary">
                            Go to {this.getNextCategoryObj().category}
                        </a>
                    </button>
                </div>}
                {/* {! this.state.isMore && <Loading/>} */}
            </InfiniteScroll>
        )
    }
}

export default News
