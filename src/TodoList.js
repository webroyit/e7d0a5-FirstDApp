import React from 'react';

class TodoList extends React.Component{

  render(){
    return (
        <div id="content">
            <form onSubmit={(event) => {
                event.preventDefault();
                this.props.createTask(this.task.value);
            }}>
                <input
                    id="newTask"
                    ref={(input => this.task = input)}
                    type="text"
                    className="form-control"
                    placeholder="Add Task..."
                    required />
                <input type="submit" hidden={true} />
            </form>
            <ul id="taskList" className="list-unstyled">
                { this.props.tasks.map((task, key) => {
                    return(
                    <div className="taskTemplate checkbox" key={key}>
                        <label>
                        <input
                            type="checkbox"
                            name={task.id}
                            defaultChecked={task.completed}/>
                        <span className="content">{task.content}</span>
                        </label>
                    </div>
                    )
                })}
            </ul>
        </div>
    );
  }
}

export default TodoList;