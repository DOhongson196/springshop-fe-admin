import { Button, Col, Modal, Row } from "antd";
import { Component } from "react";
import withRouter from "../../helpers/withRouter";
import ContentHeader from "../common/ContentHeader";
import ManufacturerForm from "./ManufacturerForm";
import ManufacturerList from "./ManufacturerList";
import {insertManufacturer,getManufacturers,deleteManufacturer} from "../../redux/actions/manufacturerAction"
import { connect } from "react-redux";



class ListManufacturers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            manufacturer: {}
        }
    }
    componentDidMount = () => {
        this.props.getManufacturers();

        console.log("did mount");
    }
    onCreate = (values) => {
        console.log(values);

        this.props.insertManufacturer(values);
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
    render(){
        const {navigate} = this.props.router;
        const {open} = this.state;
        const {manufacturers} = this.props;
        return (
            
            <div>
                <ContentHeader
                    navigate={navigate}
                    title = "List Manufacturers"
                    className="site-page-header"
                >
                </ContentHeader>

            <Row>
                <Col md={24}>
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
                <ManufacturerList dataSource={manufacturers} onDelete={this.onDelete}/>


      <ManufacturerForm
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
    manufacturers: state.manufacturerReducer.manufacturers

})

const mapDispatchToProps = {
    insertManufacturer,
    getManufacturers,
    deleteManufacturer,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListManufacturers))