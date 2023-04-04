import { Button, Col, Form, Input, Modal, Pagination, Row } from "antd";
import { Component } from "react";
import withRouter from "../../helpers/withRouter";
import ContentHeader from "../common/ContentHeader";
import ManufacturerForm from "./ManufacturerForm";
import ManufacturerList from "./ManufacturerList";
import {insertManufacturer,getManufacturers,deleteManufacturer,updateManufacturer,getManufacturersByName} from "../../redux/actions/manufacturerAction"
import { connect } from "react-redux";



class ListManufacturers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            manufacturer: {id: '',name:'',logo: ''}
        }
    }
    componentDidMount = () => {
        this.props.getManufacturers();

        console.log("did mount");
    }
    onCreate = (values) => {
        console.log(values);
        if(values.id){
            this.props.updateManufacturer(values.id,values)
        }else{
            this.props.insertManufacturer(values);
        }
        this.setState({...this.state, manufacturer: {},open: false});

    }
    onEdit = (value) => {
        this.setState({...this.state, manufacturer: value,open: true});
    }
    deleteManufacturer = ()  => {
        this.props.deleteManufacturer(this.state.manufacturer.id);

        console.log("delete manufacturer");
    }
    onDelete = (value) => {
        this.setState({...this.state,manufacturer: value})

        const message = "Do you want to delete this manufacturer " + value.name

        Modal.confirm({
            title: "Confirm",
            content: message,
            onOk: this.deleteManufacturer,
            okText: "Delete",
            cancelText: "Cancel",
        })
    }
    // onShowSizeChange = (current,pageSize) => {
    //     console.log(current,pageSize)
    //     const {pagination} = this.props
    //     const params = {
    //         query: pagination.query,
    //         page: 0,
    //         size: pageSize,
    //     }
    //     this.props.getManufacturersByName(params);
    // }
    onChange = (pageNumber,pageSize) => {
        const {pagination} = this.props
        const params = {
            query: pagination.query,
            page: pageNumber - 1,
            size: pageSize,
        }
        this.props.getManufacturersByName(params);
    }
    handleSearch = (value) => {
        console.log(value)

        const {pagination} = this.props
        const params = {
            query: value.query,
            size: pagination.size
        }
        this.props.getManufacturersByName(params);
    }
    render(){
        const {navigate} = this.props.router;
        const {open} = this.state;
        const {manufacturers,pagination} = this.props;
        return (
            
            <div>
                <ContentHeader
                    navigate={navigate}
                    title = "List Manufacturers"
                    className="site-page-header"
                >
                </ContentHeader>

            <Row style={{marginBottom: 12}}>
                <Col md={18}>
                    <Form layout="inline"
                    name="searchForm"
                    onFinish={this.handleSearch}
                    >
                        <Form.Item
                        name='query'
                        initialValue={pagination.query}
                        >
                            <Input></Input>
                        </Form.Item>
                        <Button type="primary" htmlType="submit">Search</Button>
                    </Form>
                </Col>
                <Col md={6}>
                    <Button
                        type="primary"
                        onClick={() => {
                        this.setState({...this.state,open:true});
                    }}
                    >
                    New Manufacturer
                    </Button>
                </Col>
            </Row>
                <ManufacturerList 
                dataSource={manufacturers} 
                onDelete={this.onDelete}
                onEdit={this.onEdit}
                />
        <Row style={{marginTop: 12}}>
            <Col md={24} style={{textAlign: "right"}}>
                <Pagination defaultCurrent={pagination.page}
                defaultPageSize={pagination.size}
                total={pagination.totalElements}
                //onShowSizeChange={this.onShowSizeChange}
                onChange={this.onChange}
                showSizeChanger="true"
                ></Pagination>
            </Col>
        </Row>


      <ManufacturerForm
        manufacturer = {this.state.manufacturer}
        open={open}
        onCreate={this.onCreate}
        onCancel={() => {
            this.setState({...this.state,open:false});
        }}
      />
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    manufacturers: state.manufacturerReducer.manufacturers,
    pagination: state.manufacturerReducer.pagination

})

const mapDispatchToProps = {
    insertManufacturer,
    getManufacturers,
    deleteManufacturer,
    updateManufacturer,
    getManufacturersByName,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListManufacturers))