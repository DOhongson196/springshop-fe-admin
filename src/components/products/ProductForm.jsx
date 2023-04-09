import { Button, Checkbox, Col, DatePicker, Divider, Form, Image, Input, InputNumber, message, Row, Select } from "antd";
import Upload from "antd/es/upload/Upload";
import React, { Component } from "react"
import {UploadOutlined} from '@ant-design/icons'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactQuill from "react-quill";
import  "react-quill/dist/quill.snow.css";
import {MdOutlineCategory} from 'react-icons/md'
import ManufacturerService from "../../services/manufacturerService";
import ProductService from "../../services/productService";

class ProductForm extends Component {
    form = React.createRef();
    constructor(props){
        super(props);

        this.state = {
            descriptionCKData: ''
        }
    }
    componentDidMount = () => {
        this.setState({
            ...this.state,
            descriptionCKData: this.props.product.description
        })
    }
    static getDerivedStateFromProps(nextProps,prevState){
        if(nextProps.product.description && !prevState.descriptionCKData){
            return{
                ...prevState,
                descriptionCKData: nextProps.product.description
            }
        }
        return null;
    }
    goNext = () => {
        this.form.current
        .validateFields()
        .then((values) =>{
            const newValues = {
                ...values,
                description: this.state.descriptionCKData,
                manufacturerDate: values.manufacturerDate.format('YYYY-MM-DD'),
                image: values.image[0].fileName ? values.image[0] : values.image[0].response
            }
            console.log(newValues)
            this.props.goNext(newValues);
        }).catch((info) => {
            console.log(info);
            message.error("Data validation error")
        })
    }
    handleImageRemoved = (info) =>{
        console.log('removed')

        if(info.fileName){
            ProductService.deleteProductImage(info.fileName)
        }else if(info.response && info.response.fileName){
            ProductService.deleteProductImage(info.response.fileName)
        }
    }
    normFile = (e) =>{
        if(Array.isArray(e)){
            return e
        }
        if(e.fileList.length >1){
            return [e.fileList[0]];
        }

        return e && e.fileList;
    }
    render(){
        const {product, categories, manufacturers} = this.props;
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
                            valuePropName="checked"
                            >

                                <Checkbox ></Checkbox>
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
                                    <Select.Option value = "InStock">In Stock</Select.Option>
                                    <Select.Option value = "OutOfStock">Out Of Stock</Select.Option>
                                    <Select.Option value = "Discontinue">Discontinue</Select.Option>
                                    <Select.Option value = "OnBackOrder">On Back Order</Select.Option>
                                </Select>
                        </Form.Item>

                        <Form.Item
                            label = 'Category'
                            name="categoryId"
                            rules = {[{required: true}]}
                            hasFeedback
                            initialValue={product.categoryId}
                            >
                                <Select placeholder="Select Category" suffixIcon={<MdOutlineCategory/>}>
                                    {categories && categories.map((item) => (
                                        <Select.Option value = {item.id} key={item.id}>
                                            {item.name}
                                        </Select.Option>
                                    ))}
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
                                {manufacturers && manufacturers.map((item) => (
                                        <Select.Option value = {item.id} key={item.id}>
                                            <Image
                                                src={ManufacturerService.getManufacturerLogoUrl(item.logo)}
                                                height = {32}
                                            ></Image>
                                            {item.name}
                                        </Select.Option>
                                    ))}
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
                            initialValue={product.image ? [{...product.image,
                            url: ProductService.getProductImageUrl(
                                product.image.fileName
                            )
                            }] : []}
                            valuePropName="fileList"
                            getValueFromEvent={this.normFile}
                            >
                                <Upload
                                listType="picture"
                                accept=".jpg,.png,.gif"
                                maxCount={1}
                                onRemove = {this.handleImageRemoved}
                                action={ProductService.getProductImageUploadUrl()}
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