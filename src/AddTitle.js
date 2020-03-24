import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class AddTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      placeholder: 'Кот Леапольд',
      arr: [],
      arrAll: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.destroyItem = this.destroyItem.bind(this);
  }
  componentDidMount() {
   const allName =  axios.get('http://egori.loldev.ru/product/list',
   )
     .then((response) => {
       console.log("response", response)
       this.setState({
         arrAll: response.data
       })
     })
     console.log("allName", allName)
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post("http://egori.loldev.ru/news/index",  this.state.arr, {
      headers: {
        "content-type": "application/json"
      }
    })
      .then((response) => {
        console.log("response2", response)
          this.setState({
            arrAll: [...this.state.arrAll, ...this.state.arr],
            arr: []
          })
      }).catch(e => {
      console.error(e)
    })

  }

  handleAddItem = (value) => {
    this.setState({
      arr: [...this.state.arr, value],
      value: ''
    })
  }

  destroyItem (value) {
    this.setState({
      arr: this.state.arr.filter(item => item !== value)
    })
  }

  render() {
    const items = this.state.arr.map((item, i) =>
      <li key={i} > <a href="#"> {item} <input type="button"  value="Х" onClick={() => {this.destroyItem(item)}}/> </a> </li>
    );
    console.log("this.state", this.state)
    console.log("this.state.arrAll", this.state.arrAll)
    const names = this.state.arrAll.map((item, i) =>
      <li key={i}> <a href="#"> {item} </a> </li>
    );

    return (
      <div>
        <div className="formBox">
          <div className="title">Добавь любимых персанажей</div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Имя Персанажа:
              <input className="input" type="text" placeholder={this.state.placeholder} value={this.state.value} onChange={this.handleChange} />
            </label>
            <input className="button" type="button" value="Добавить" onClick={() => {this.handleAddItem(this.state.value)}}/>
            <input className="button" type="submit" value="Сохранить"/>
            <ol className="rounded">
              {items}
            </ol>
          </form>
        </div>
        <div className="formBox">
          <div className="title">Уже добавленные персанажи</div>
          <ol className="rounded">
            {names}
          </ol>
        </div>
      </div>
    )
  }
}
export default AddTitle;