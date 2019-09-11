import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "./mockjs";
export default class App extends Component {
    state = {
      list: [],
      num: [],
    //   page: 1,
      active:0,
    //   pagesize:10
    };
    render() {
      return (
        <div>
          <div className="list">
            {this.state.list
              ? this.state.list.map((item, index) => {
                  return <li key={index}>{item.name}</li>;
                })
              : ""}
          </div>
          <div className="nav">
            <span onClick={this.Previous.bind(this)}>&lt;</span>
            {this.state.num
              ? this.state.num.map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={this.change.bind(this, index)}
                      className={this.state.active === index ? "active" : ""}
                    >
                      {index + 1}
                    </span>
                  );
                })
              : ""}
            <span onClick={this.next.bind(this)}>&gt;</span>
          </div>
        </div>
      );
    }
    Axios() {
      axios.post("/list", { page: this.state.page, pagesize: this.state.pagesize }).then(res => {
        this.setState({
          list: res.data.data
        });
      });
    }
    Previous() {
      let { active, num } = this.state;
  
      if (active <= 0) {
        active = num.length - 1;
      } else {
        active--;
      }
      this.setState(
        {
          active: active,
          page: active + 1
        },
        () => {
          this.Axios();
        }
      );
    }
    next() {
      let { active, num } = this.state;
      console.log(num.length);
      if (active >= num.length - 1) {
        active = 0;
      } else {
        active++;
      }
      this.setState(
        {
          active: active,
          page: active + 1
        },
        () => {
          this.Axios();
        }
      );
    }
    change(index) {
      this.setState(
        {
          page: index + 1,
          active: index
        },
        () => {
          this.Axios();
        }
      );
    }
    componentDidMount() {
      console.log(this.props.page)
      this.setState({
          page:this.props.page,
          pagesize:this.props.pagesize
      },()=>{
          console.log(this.state)
        axios.post("/list", { page: this.state.page, pagesize:this.state.pagesize }).then(res => {
            let { num } = this.state;
            for (let i = 0; i < res.data.num; i++) {
              num.push(0);
            }
            this.setState(
              {
                list: res.data.data,
                num: num
              }
            );
          });
      })
      
    }
  }