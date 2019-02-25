---
layout:     post
title:     antDesign中DatePicker组件设置约束时间
subtitle:   
date:       2018-08-16
author:     Song
header-img: img/post-bg-coding.jpg
catalog: true
tags:
    - ant-design DatePicker getFieldDecorator disabledDate
---

### getFieldDecorator装饰器中设置disabledDate的方法
    通过getValueFromEvent拿到date值

```
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: null,
      endValue: null,
    };
  }

  componentDidMount() {
    
  }

  disabledStartDate(startValue) {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate(endValue) {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const nameConfig = {
      rules: [{ type: "string", required: false, message: "请输入员工姓名" }]
    };
    const mobileConfig = {
      rules: [{ type: "string", pattern: /^[1][3,4,5,7,8][0-9]{9}$/, required: false, message: "手机号格式不正确" }]
    };
    const jobsConfig = {
      rules: [{ type: "string", required: false, message: "请输入岗位名称" }]
    };
    const startTimeConfig = {
      rules: [
        { type: "object", required: false, message: "请选择查询起始时间" }
      ],
      getValueFromEvent: (e) => {
        //选择日期时更新state
        this.setState({
          startValue: e
        })
        return e
      }
    };
    const endTimeConfig = {
      rules: [
        { type: "object", required: false, message: "请选择查询结束时间" }
      ],
      getValueFromEvent: (e) => {
        //选择日期时更新state
        this.setState({
          endValue: e
        })
        return e
      }
    };
    const deptConfig = {
      rules: [
        { type: "string", required: false, message: "请选择所属部门" }
      ]
    };
    const roleConfig = {
      rules: [
        { type: "string", required: false, message: "请选择角色" }
      ]
    };
    return (
      <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
        <FormItem label="创建时间" className="label">
          <FormItem>
            {getFieldDecorator("startTime", startTimeConfig)(
              <DatePicker format="YYYY-MM-DD" disabledDate={this.disabledStartDate.bind(this)} placeholder="" style={{ width: "180px" }}/>
            )}
          </FormItem>
          <span className="to">至</span>
          <FormItem>
            {getFieldDecorator("endTime", endTimeConfig)(
              <DatePicker format="YYYY-MM-DD" disabledDate={this.disabledEndDate.bind(this)} placeholder="" style={{ width: "180px" }}/>
            )}
          </FormItem>
        </FormItem>
      </Form>
    );
  }
}
```
