import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Input, Button, Row, Col, ListGroup, ListGroupItem, Alert } from 'reactstrap'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      inputValue: '',
      listToDo: [],
      errorVisible: false,
      visible: true,
      messageError: ''
    }

    this.handleClickAdd = this.handleClickAdd.bind(this)
    this.handleChangeInput = this.handleChangeInput.bind(this)
    this.onDismiss = this.onDismiss.bind(this);
  }

  /**
   * When canceling Alert notification
   */
  onDismiss() {
    this.setState({ visible: false });
  }

  /**
   * When clicking to Add Button
   * Comparing if the element exists before adding it to the list
   * If the element exists we show error message
   * If the element not exist we add it to the list and then we send to backend Js
   */
  handleClickAdd() {

    if(this.state.inputValue=='') {
      this.setState({
        errorVisible: true,
        messageError: 'Le champs est vide'
      })
    }
    else
    if (!this.state.listToDo.includes(this.state.inputValue)) {
      let list = this.state.listToDo
      list.push(this.state.inputValue)

      this.setState({
        listToDo: list
      })

      //Send data to koa 
      fetch('http://localhost:3001/todos/'+this.state.inputValue)
      .then(result => {
          return result.json()
      }).then(data => {
    
      }).catch((error) => {
          console.error(error);
      });

    }
    else {
      this.setState({
        errorVisible: true,
        messageError: 'le todo existe dejà !'
      })
    }

  }

  /**
   * This function update the input value when the input is changing
   * @param {*} event  
   */
  handleChangeInput(event) {
    this.setState({
      inputValue: event.target.value,
      errorVisible: false
    })
  }


  render() {

    console.log('hello world')

    /**
     * Mapping the array and modifying it's elements
     */
    var list = this.state.listToDo.map((element) =>
      <ListGroupItem>
        <Input addon type="checkbox" />
        &nbsp;
        {element}
      </ListGroupItem>
    )

    return (
      <div className="App">
        <br />
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <h3>To do list</h3>
          </Col>
        </Row>
        <hr />
        <br />
        <ListGroup>
          <Col md={{ size: 6, offset: 3 }}> {list} </Col>
        </ListGroup>
        <br />
        <Row>
          <Col md={{ size: 4, push: 3 }}>
            <Input type="text" value={this.state.inputValue} onChange={this.handleChangeInput} />
          </Col>
          <br />
          <Col md={{ size: 1, push: 3 }}>
            <Button color='success' onClick={this.handleClickAdd} >
              <img src="https://1001freedownloads.s3.amazonaws.com/icon/thumb/204/add-512.png" height="20" width="20" />
              &nbsp;
              Ajouter
            </Button>
          </Col>
        </Row>
        <br />
        {this.state.errorVisible ? 
            <Row>
              <Col md={{ size: 6, offset: 3 }}>
                <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                  {this.state.messageError}
                </Alert>
              </Col>
            </Row>
          : null}
      </div>
    );
  }
}

export default App;
