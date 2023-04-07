import { Button, Checkbox, Col, DatePicker, Divider, Form, Input, InputNumber, message, Row, Select } from "antd";
import Upload from "antd/es/upload/Upload";
import React, { Component } from "react"
import {UploadOutlined} from '@ant-design/icons'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactQuill from "react-quill";
import  "react-quill/dist/quill.snow.css";

class ProductForm extends Component {
    form = React.createRef();
    constructor(props){
        super(props);

        this.state = {
            descriptionCKData: ''
        }
    }
    goNext = () => {
        this.form.current
        .validateFields()
        .then((values) =>{
            console.log(values);
            console.log(values.manufacturerDate);

            const newValues = {
                ...values,
                description: this.state.descriptionCKData,
                manufacturerDate: values.manufacturerDate.format('YYYY-MM-DD'),
                //image: values.image[0].fileName ? values.image[0] : values.image[0].response
            }
            this.props.goNext(newValues);
        }).catch((info) => {
            console.log(info);
            message.error("Data validation error")
        })
    }
    render(){
        const {product} = this.props;
        const {descriptionCKData } = this.state;
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
                            rules = {[{required: true,  min: 2}]}
                            hasFeedback
                            >
                                <Input></Input>
                            </Form.Item>

                            <Form.Item
                            label = 'Quantity'
                            name="quantity"
                            initialValue={product.name}
                            rules = {[{required: true}]}
                            hasFeedback
                            >
                                <InputNumber min={0}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                style = {{width: "100%"}}
                                ></InputNumber>
                            </Form.Item>

                            <Form.Item
                            label = 'Price'
                            name="price"
                            initialValue={product.price}
                            rules = {[{required: true}]}
                            hasFeedback
                            >
                                <InputNumber min={0}
                                formatter = {(value)=>
                                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                }
                                parser= {(value)=> value.replace(/$\s?|(,*)/g,'')}
                                style = {{width: "100%"}}
                                addonAfter = {'$'}
                                ></InputNumber>
                            </Form.Item>

                            <Form.Item
                            
                            label = 'Discount'
                            name="discount"
                            initialValue={product.discount}
                            >
                             <InputNumber
                                      min={0}
                                      max={100}
                                      formatter={(value) => `${value}`}
                                      parser={(value) => value.replace('%', '')}
                                      style = {{width: "100%"}}
                                      addonAfter = {'%'}
                                ></InputNumber>
                            </Form.Item>

                            <Form.Item
                            
                            label ='Featured'
                            name="isFeatured"
                            initialValue={product.isFeatured}
                            >

                                <Checkbox></Checkbox>
                            </Form.Item>
                        </Col>
                        <Col md={1}>
                            <Divider type="vertical" style={{height: '100%'}}></Divider>
                        </Col>
                        <Col md={11}>
                        <Form.Item
                            label = 'Status'
                            name="status"
                            rules = {[{required: true}]}
                            hasFeedback
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
                            rules = {[{required: true}]}
                            hasFeedback
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
                            rules = {[{required: true}]}
                            hasFeedback
                            initialValue={product.manufacturerId}
                            >
                                <Select placeholder="Select Manufacturer">
                                    <Select.Option value = "inStock">FPT</Select.Option>
                                    <Select.Option value = "outOfStock">Dell</Select.Option>
                                </Select>
                        </Form.Item>

                        <Form.Item
                            label = 'Manufacturer Date'
                            name="manufacturerDate"
                            rules = {[{required: true}]}
                            hasFeedback
                            initialValue={product.manufacturerDate}
                            >
                                <DatePicker></DatePicker>
                        </Form.Item>

                        <Form.Item
                            label = 'Main Image'
                            name="image"
                            rules = {[{required: true}]}
                            hasFeedback
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
                            hasFeedback
                            rules = {[{required: true}]}
                            >
                                <ReactQuill theme="snow"></ReactQuill>
                            </Form.Item>
                        </Col>
                        <Col md={24}>
                            <Form.Item
                            label = 'Description'
                            name="description"
                            initialValue={descriptionCKData}
                            hasFeedback
                            rules = {[{required: true}]}
                            >
                                <CKEditor
                                editor={ClassicEditor}
                                data={descriptionCKData}
                                onReady={(editor)=>{
                                    editor.editing.view.change((writer) =>{
                                        writer.setStyle('height','200px',editor.editing.view.document.getRoot())
                                    })
                                }}
                                onChange = {(event,editor)=>{
                                    const data = editor.getData();
                                    this.setState({...this.state,descriptionCKData: data})
                                }}
                                >
                                </CKEditor>
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