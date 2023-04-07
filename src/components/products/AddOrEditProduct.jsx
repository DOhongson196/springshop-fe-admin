import { Button, Col, Divider, Row, Space, Steps} from "antd";
import { Component } from "react";
import withRouter from "../../helpers/withRouter";
import ContentHeader from "../common/ContentHeader";
import ProductForm from "./ProductForm";
import UploadImage from "./UploadImage";
import {SaveOutlined} from "@ant-design/icons"

class AddOrEditProduct extends Component {
    constructor(props){
        super(props)

        this.state = {
            step: 0,
        }
    }
    goNext = (values) => {
        this.setState({...this.state, product: values, step:1})
    }
    goPrevious = () => {
        this.setState({...this.state, step:0})
    }
    saveProduct = () => {
        console.log("Save Product");
    }
    render(){
        const {navigate} = this.props.router;
        const {step} = this.state;
        const {product} = this.props;
        let title = "Add products";
        return (
            <>
                <ContentHeader
                    navigate={navigate}
                    title = {title}
                    className="site-page-header"
                >
                </ContentHeader>

                <Row>
                    <Col md={24}>
                        <Steps
                        current={step}
                        items = {[
                            {
                                title:"Basic Information",
                                description: "Fill basic information"
                            },
                            {
                                title: "Images",
                                description: "Choose the list of images"
                            },

                        ]}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={24}>
                        {step === 0 && (
                            <>
                                <Divider></Divider>
                                <ProductForm product={{}} goNext={this.goNext}></ProductForm>
                            </>
                        )}
                        {step === 1 && (
                            <>
                                <Divider></Divider>
                                <Row>
                                    <Col md={24}>
                                        <UploadImage></UploadImage>
                                        <Divider></Divider>
                                        <div>
                                            <Space>
                                                <Button
                                                type="primary"
                                                onClick={this.goPrevious}
                                                >Previous</Button>
                                                <Button
                                                type="primary"
                                                onClick={this.saveProduct}
                                                >
                                                    <SaveOutlined/> {product && product.id ? "Updated" : "Save"}

                                                </Button>
                                            </Space>
                                        </div>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Col>
                </Row>
            </>
        )
    }
}

export default withRouter(AddOrEditProduct);