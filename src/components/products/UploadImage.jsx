import { Image, message, Modal, Upload } from "antd";
import {PlusOutlined} from "@ant-design/icons"
import { useState } from "react";

const getBase64 = (file) => {
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    })
}

const UploadImage = (props) => {
    const [previewOpen,setPreviewOpen] = useState(false)
    const [previewImage,setpreviewImage] = useState('')
    const [previewTitle,setPreviewTitle] = useState('')

    const handleCancel = () => {
        setPreviewOpen(false);
    };

    const handlePreview = async (file) => {
        if(!file.url && !file.preview){
            file.preview = await getBase64(file.originFileObj)
        }

        setpreviewImage(file.url || file.preview)

        setPreviewOpen(true)

        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/")+1))

    }

    const handleChange = (info) => {
        const {fileList} = info
        const status = info.file.status
        if(status !== 'uploading'){
            console.log(info.file)
        }

        if(status === 'done'){
            message.success(`${info.file.name} file uploaded successfully`)
        }else if(status === 'removed'){
            message.success(`${info.file.name} file is removed`)
        }else if(status !== 'uploading'){
            message.success(`${info.file.name} file uploaded failed`)
        }
        props.onUpdateFileList(fileList.slice());
    }

    const handleRemove = (info) => {
        if(info.fileName){
            console.log('delete' + info.fileName)
        }else if(info.response && info.response.fileName){
            console.log('delete' + info.response.fileName)
        }
    }

    const uploadButton = (
        <div>
            <PlusOutlined/>

            <div style = {{marginTop: 12}}>Upload</div>
        </div>
    )
    const {fileList} = props
    return (
        <div>
            <Upload 
            name='file' 
            action='http://localhost:8080/api/v1/products/images/one'
            listType="picture-card"
            defaultFileList={fileList}
            multiple={true}
            onPreview = {handlePreview}
            onChange = {handleChange}
            onRemove = {handleRemove}
            >
                {FileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
            >
                <Image src={previewImage} alt="Preview Image" style={{width: "100%"}} />
            </Modal>
        </div>
      );
}

export default UploadImage;