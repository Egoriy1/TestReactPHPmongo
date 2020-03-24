import React, { Component } from 'react';
import './App.css';

class AddTitle extends Component {
  render() {
    return (
      <div>
        <div>Добавь любимых персанажей</div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Имя:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Отправить" />
        </form>
      </div>
    )
  }
}
export default AddTitle;