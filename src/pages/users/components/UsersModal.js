import React from 'react';
import { Modal, Form, Input } from 'antd';
class UsersModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            visible: false,
            formLayout: "horizontal"
        };
    }
    isVisible = (e) => {
        if (e) e.stopPropagation();
        this.setState({
            visible: !this.state.visible
        });
    }

    getModalTitle = (title = "创建用户") => {
        return title;
    }
    saveHandler = () => {
        const { form, onSave } = this.props;
        form.validateFieldsAndScroll((error, values) => {
            if(!error) {
                onSave(values); //保存用户
            }
        });
    }
    render() {
        const { children, form, record } = this.props;
        const { getFieldDecorator } = form;
        const { name, email, company } = record;
        
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <span>
                <span onClick={this.isVisible}>{ children }</span>
                <Modal
                    title="创建用户"
                    visible={this.state.visible}
                    onCancel={this.isVisible}
                    wrapClassName="vertical-center-modal"
                    okText="保存"
                    cancelText="取消"
                    onOk={this.saveHandler}
                >
                    <Form 
                        layout={this.state.formLayout}
                        //horizontal
                        //onSubmit={this.saveHandler}
                    >
                        <Form.Item
                            {...formItemLayout}
                            label="姓名"
                        >
                            {
                                getFieldDecorator('name' ,{
                                    initialValue: name,
                                    rules: [{
                                        required: true,
                                        message: '请输入用户姓名.'
                                    }]
                                })(<Input/>)
                            }
                        </Form.Item>
                        <Form.Item 
                            {...formItemLayout}
                            label="邮件"
                        >
                            {
                                getFieldDecorator('email', {
                                    initialValue: email,
                                    rules: [{
                                        type: 'email',
                                        message: '邮箱格式不正确.'
                                    }, {
                                        required: true,
                                        message: '请输入邮箱.'
                                    }]
                                })(<Input/>)
                            }
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="公司"
                        >
                            {
                                getFieldDecorator('company', {
                                    initialValue: (!company) ? '': company.name
                                })(<Input/>)
                            }
                        </Form.Item>
                    </Form>
                </Modal>
            </span>
        );
    }
}

export default Form.create()(UsersModal);