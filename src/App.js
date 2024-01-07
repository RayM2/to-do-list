import React, { Component } from "react"; 
import "bootstrap/dist/css/bootstrap.css"; 
import Container from "react-bootstrap/Container"; 
import Button from "react-bootstrap/Button"; 
import InputGroup from "react-bootstrap/InputGroup"; 
import Row from "react-bootstrap/Row"; 
import Col from "react-bootstrap/Col"; 
import FormControl from "react-bootstrap/FormControl"; 
import ListGroup from "react-bootstrap/ListGroup"; 
  
class App extends Component { 
    constructor(props) { 
        super(props); 
        

  
        // Setting up state 
        this.state = {
          userInput: "",
          list: [],
          completedTasks: 0, // Initialize completedTasks to 0
        };
    } 
  
    // Set a user input value 
    updateInput(value) { 
        this.setState({ 
            userInput: value, 
        }); 
    } 
  
    // Add item if user input in not empty 
    addItem() {
      if (this.state.userInput !== "") {
        this.setState((prevState) => ({
          list: [
            ...prevState.list,
            {
              id: Math.random(),
              value: prevState.userInput,
              priority: 0,
            },
          ],
          userInput: "",
        }));
      }
    }
  
    // Used to delete item from list use id to delete 
    deleteItem(key) {
      this.setState((prevState) => {
        const list = [...prevState.list];
        const taskIndex = list.findIndex((item) => item.id === key);
    
        if (taskIndex !== -1) {
          // Increment the completedTasks counter when a task is marked as completed
          prevState.completedTasks = Number(prevState.completedTasks) + 1;
          list.splice(taskIndex, 1);
        }
    
        return {
          list,
          completedTasks: prevState.completedTasks,
        };
      });
    }
    
  
    editItem = (index) => {
      const todos = [...this.state.list];
      const editedTodo = prompt('Edit the todo:');
    
      if (editedTodo !== null && editedTodo.trim() !== '') {
        const updatedTodos = [...todos];
        updatedTodos[index].value = editedTodo;
    
        this.setState({
          list: updatedTodos,
        });
      }
    };
  
    moveItemUp(index) {
      const list = [...this.state.list];
      if (index > 0) {
        // Swap the tasks
        [list[index - 1], list[index]] = [list[index], list[index - 1]];
        this.setState({
          list,
        });
      }
    }
    
    moveItemDown(index) {
      const list = [...this.state.list];
      if (index < list.length - 1) {
        // Swap the tasks
        [list[index + 1], list[index]] = [list[index], list[index + 1]];
        this.setState({
          list,
        });
      }
    }
    render() { 
    return ( 
    <Container fluid style={{ backgroundColor: "#238fda", minHeight: "100vh" }}> 
    <Row
      style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "3rem",  // Font size
      fontWeight: "bolder",  // Font weight
      color: "white",  // Font color
    }
    }
>
                    TO-DO LIST 
    </Row> 
  
    <hr /> 
    <Row> 
    <Col md={{ span: 5, offset: 4 }}> 
    <InputGroup className="mb-3"> 
    <FormControl 
      placeholder="add item . . . "
      size="lg"
      value={this.state.userInput} 
      onChange={(item) => 
      this.updateInput(item.target.value) 
                                } 
      aria-label="add something"
      aria-describedby="basic-addon2"/> 
     <InputGroup> 
     <Button 
      variant="dark"
      className="mt-2"
      onClick={() => this.addItem()} 
                                > 
    ADD 
    </Button> 
    </InputGroup> 
    </InputGroup> 
                    </Col> 
                </Row> 
                <Row> 
                    <Col md={{ span: 5, offset: 4 }}> 
                        <ListGroup> 
                            {/* map over and print items */} 
                            {this.state.list.map((item, index) => {
  return (
    <div key={index}>
      <ListGroup.Item
        variant="dark"
        action
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>{item.value}</span>
        <span>
          <Button
            style={{ marginRight: "10px" }}
            variant="light"
            onClick={() => this.deleteItem(item.id)}
          >
            Delete
          </Button>
          <Button
            variant="light"
            onClick={() => this.editItem(index)}
          >
            Edit
          </Button>
          <Button
            variant="light"
            onClick={() => this.moveItemUp(index)}
            disabled={index === 0}
          >
            Move Up
          </Button>
          <Button
            variant="light"
            onClick={() => this.moveItemDown(index)}
            disabled={index === this.state.list.length - 1}
          >
            Move Down
          </Button>
        </span>
      </ListGroup.Item>
    </div>
  );
})}
                        </ListGroup> 
                    </Col> 
                </Row> 
                 {/* Display completed tasks counter */}
      <Row style={{ marginTop: "20px", textAlign: "center" }}>
        <Col>
          <p>Completed Tasks: {this.state.completedTasks}</p>
        </Col>
      </Row>
    </Container>
 
        ); 
    } 
} 

export default App;

