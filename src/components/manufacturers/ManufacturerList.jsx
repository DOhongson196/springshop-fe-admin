import { Component } from "react";
import {Table,Space,Button, Image} from 'antd';
import Column from 'antd/lib/table/Column'
import {EditOutlined,DeleteOutlined } from '@ant-design/icons'



class ManufacturerList extends Component {
    render(){
        const {dataSource,onEdit,onDelete} = this.props;
        return(
            <Table
                  dataSource={dataSource}
                  size = "middle"
                  rowKey= "id"
                >
                                      <Column
                  title = "Logo"
                  key="logo"
                  dataIndex = "logo"
                  width = {120}
                  align = "center"
                  render={(_,record) =>(
                    <Space size="middle">
                        <Image width='100%' src={record.logo}></Image>
                    </Space>
                  )}
                  >
                  </Column>
                  <Column
                  title = "ID"
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
                  title = "Action"
                  key="action"
                  dataIndex = "action"
                  width = {350}
                  align = "center"
                  render={(_,record) => (
                    <Space size='large'>
                      <Button key={record.key} type = 'primary' 
                        onClick={() => this.onEdit(record)}
                      >
                        <EditOutlined style={{marginRight: 12}}/>
                        Edit
                      </Button>
                      <Button key={record.key} danger type = 'primary'
                        onClick={() => this.onDelete(record)}
                      >
                        <DeleteOutlined style={{marginRight: 12}}/>
                        Delete
                      </Button>
                      
                    </Space>
                  )}
                  >
                  </Column>
                </Table>
        )
    }
}

export default ManufacturerList