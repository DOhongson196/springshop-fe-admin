import { Button, Col, Row } from "antd";
import { Component } from "react";
import withRouter from "../../helpers/withRouter";
import ContentHeader from "../common/ContentHeader";
import ManufacturerForm from "./ManufacturerForm";
import ManufacturerList from "./ManufacturerList";



class ListManufacturers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }
    onCreate = (values) => {
        console.log(values);
    }
    render(){
        const {navigate} = this.props.router;
        const {open} = this.state;
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
                <ManufacturerList/>


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

export default withRouter(ListManufacturers);