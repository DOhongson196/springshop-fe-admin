import { Button, Col, DatePicker, Divider, Form, Input, Row, Select } from "antd";
import Upload from "antd/es/upload/Upload";
import React, { Component } from "react"
import {UploadOutlined} from '@ant-design/icons'

class ProductForm extends Component {
    form = React.createRef();
    goNext = () => {
        this.props.goNext({});
    }
    render(){
        const {product} = this.props;
        return (
            <>
                <Form
                layout="vertical"
                className="form"
                size="middle"
                ref = {this.form}
                >
                    <Row>
                        <Col md={12}>
                            <Form.Item
                            label = 'Product Id'
                            name="id"
                            initialValue={product.id}
                            >
                                <Input readOnly></Input>
                            </Form.Item>

                            <Form.Item
                            label = 'Name'
                            name="name"
                            initialValue={product.name}
                            >
                                <Input></Input>
                            </Form.Item>

                            <Form.Item
                            label = 'Quantity'
                            name="quantity"
                            initialValue={product.quantity}
                            >
                                <Input ></Input>
                            </Form.Item>

                            <Form.Item
                            label = 'Price'
                            name="price"
                            initialValue={product.price}
                            >
                                <Input ></Input>
                            </Form.Item>

                            <Form.Item
                            label = 'Discount'
                            name="discount"
                            initialValue={product.discount}
                            >
                                <Input ></Input>
                            </Form.Item>
                        </Col>
                        <Col md={1}>
                            <Divider type="vertical" style={{height: '100%'}}></Divider>
                        </Col>
                        <Col md={11}>
                        <Form.Item
                            label = 'Status'
                            name="status"
                            initialValue={product.status}
                            >
                                <Select placeholder="Select product status">
                                    <Select.Option value = "inStock">In Stock</Select.Option>
                                    <Select.Option value = "outOfStock">Out Of Stock</Select.Option>
                                    <Select.Option value = "discontinue">Discontinue</Select.Option>
                                    <Select.Option value = "onBackOrder">On Back Order</Select.Option>
                                </Select>
                        </Form.Item>

                        <Form.Item
                            label = 'Category'
                            name="categoryId"
                            initialValue={product.categoryId}
                            >
                                <Select placeholder="Select Category">
                                    <Select.Option value = "inStock">Computer</Select.Option>
                                    <Select.Option value = "outOfStock">Laptop</Select.Option>
                                </Select>
                        </Form.Item>

                        <Form.Item
                            label = 'Manufacturer'
                            name="manufacturerId"
                            initialValue={product.manufacturerId}
                            >
                                <Select placeholder="Select Manufacturer">
                                    <Select.Option value = "inStock">FPT</Select.Option>
                                    <Select.Option value = "outOfStock">Dell</Select.Option>
                                </Select>
                        </Form.Item>

                        <Form.Item
                            label = 'Manufacturer Date'
                            name="manufacturerId"
                            initialValue={product.manufacturerDate}
                            >
                                <DatePicker></DatePicker>
                        </Form.Item>

                        <Form.Item
                            label = 'Main Image'
                            name="image"
                            initialValue={product.image ? [{...product.image}] : []}
                            >
                                <Upload
                                listType="picture"
                                accept=".jpg,.png,.gif"
                                maxCount={1}
                                >
                                    <Button icon={<UploadOutlined/>}></Button>
                                </Upload>
                        </Form.Item>

                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <Form.Item
                            label = 'Brief'
                            name="brief"
                            initialValue={product.brief}
                            >
                                <Input></Input>
                            </Form.Item>
                        </Col>
                        <Col md={24}>
                            <Form.Item
                            label = 'Description'
                            name="description"
                            initialValue={product.description}
                            >
                                <Input></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <Divider></Divider>
                            <Button type="primary" onClick={this.goNext} style={{float:"right"}}>NEXT</Button>
                        </Col>
                    </Row>
                </Form>
            </>
        )
    }
}

export default ProductForm