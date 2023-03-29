import { Component } from "react";
import withRouter from "../../helpers/withRouter";
import ContentHeader from "../../common/ContentHeader";
import {Table,Space,Button,Tag, Modal, Skeleton} from 'antd';
import Column from 'antd/lib/table/Column'
import {EditOutlined,DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { connect } from "react-redux";
import {getCategories,clearCategoryState} from "../../redux/actions/categoryAction"
class ListCategory extends Component {
  constructor(){
    super()

    this.state = {
      // dataSource : [
      //   {categoryId: 1,name: 'Computer', status: 0},
      //   {categoryId: 2,name: 'Laptop', status: 0},
      //   {categoryId: 3,name: 'PC', status: 1},
      //   {categoryId: 4,name: 'Mouse', status: 1},
      //   {categoryId: 5,name: 'Server', status: 0},
      // ],
      category: {}
    }
  }

  componentDidMount = () => {
    this.props.getCategories();
    console.log("did mount");
  }

  componentWillUnmount = () => {
    this.props.clearCategoryState();
    console.log("un mount");
  }

  editCategory = (category) => {
    console.log(category);
  }

  deleteCategory = () => {
    console.log(this.state.category);
  }
  openDeleteConfirmModal = (category) => {
    this.setState({...this.state, category: category});
    console.log(category);

    const message = 'Do you want to delete this category'

    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined/>,
      content: message,
      okText: "Confirm Delete",
      cancelText: "Cancel",
      onOk: this.deleteCategory,
    })
  }
  render() {
    const {navigate} = this.props.router;
    const {categories , isLoading} = this.props

    if (isLoading) {
      return (
        <>
                <ContentHeader
                    navigate={navigate}
                    title = "List Categories"
                    className="site-page-header"
                >
                </ContentHeader>
                <Skeleton activer />
        </>
      )
    }

    return (

            <div>
                <ContentHeader
                    navigate={navigate}
                    title = "List Categories"
                    className="site-page-header"
                >
                </ContentHeader>

                <Table
                  dataSource={categories}
                  size = "middle"
                  rowKey= "id"
                >
                  <Column
                  title = "Category ID"
                  key="id"
                  dataIndex = "id"
                  width = {120}
                  align = "center"
                  >
                  </Column>
                  <Column
                  title = "Name"
                  key="name"
                  dataIndex = "name"
                  >
                  </Column>
                  <Column
                  title = "Status"
                  key="status"
                  dataIndex = "status"
                  width = {100}
                  render={(_,{status})=>{
                    let color = 'volcano'
                    let name = "In-visible"
                    if(status===0){
                      color = 'green'
                      name = 'Visible'
                    }

                    return <Tag color={color} >{name}</Tag>
                  }}
                  >
                  </Column>
                  <Column
                  title = "Action"
                  key="action"
                  dataIndex = "action"
                  width = {350}
                  align = "center"
                  render={(_,record) => (
                    <Space size='large'>
                      <Button key={record.key} type = 'primary' 
                        onClick={() => this.editCategory(record)}
                      >
                        <EditOutlined style={{marginRight: 12}}/>
                        Edit
                      </Button>
                      <Button key={record.key} danger type = 'primary'
                        onClick={() => this.openDeleteConfirmModal(record)}
                      >
                        <DeleteOutlined style={{marginRight: 12}}/>
                        Delete
                      </Button>
                      
                    </Space>
                  )}
                  >
                  </Column>
                </Table>
            </div>
            
         );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categoryReducer.categories,
  isLoading: state.commonReducer.isLoading
})

const mapDispatchToProps = {
  getCategories,
  clearCategoryState,
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ListCategory));