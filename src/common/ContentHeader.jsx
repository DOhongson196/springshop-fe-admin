import { Component } from "react";
import {Divider} from 'antd';
import { PageHeader } from '@ant-design/pro-layout';

class ContentHeader extends Component {
    render() {
      const {navigate,title,className} = this.props;
      return (
        <div>
          <PageHeader
                  className={className}
                  style={{marginLeft: 0 }}
                  title = {title}
                  onBack={() => navigate(-1)}
          ></PageHeader>
  
          <Divider></Divider>
  
        </div>
      )
    }
  }
  
  export default ContentHeader;