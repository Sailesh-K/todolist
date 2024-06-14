import React, { useState } from 'react';

function TodoCreate() {
    const [tasks, setTasks] = useState([
        {
            name: "Breakfast",
            desc: "8.30 AM",
            status: "not completed"
        },
        {
            name: "Morning Task",
            desc: "9 AM",
            status: "not completed"
        }
    ]);

    const [newTask, setNewTask] = useState({ name: "", desc: "", status: "not completed" });
    const [statusFilter, setStatusFilter] = useState("all");

    function ipChange(event) {
        const { name, value } = event.target;
        setNewTask(prevTask => ({ ...prevTask, [name]: value }));
    }

    function addTask() {
        if (newTask.name && newTask.desc) {
            setTasks(prevTasks => [...prevTasks, newTask]);
            setNewTask({ name: "", desc: "", status: "not completed" });
        }
    }

    function delTask(index) {
        setTasks(prevTasks => prevTasks.filter((task, i) => i !== index));
    }

    function editTask(index) {
        const taskToEdit = tasks[index];
        setNewTask(taskToEdit);
        delTask(index);
    }

    function handleStatusChange(event, index) {
        const { value } = event.target;
        setTasks(prevTasks => {
            const newTasks = [...prevTasks];
            newTasks[index].status = value;
            return newTasks;
        });
    }

    const filteredTasks = tasks.filter(task => {
        if (statusFilter === "all") return true;
        return task.status === statusFilter;
    });

    return (
        <div className="todo-container">
            <div className="new-task">
                <h3>My ToDo</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Task Name"
                    value={newTask.name}
                    onChange={ipChange}
                />
                <input
                    type="text"
                    name="desc"
                    placeholder="Task Description"
                    value={newTask.desc}
                    onChange={ipChange}
                />
                <button className="add-button" onClick={addTask}>Add Todo</button>
                <form id="status-filter">
                    <label htmlFor="filter">Status-Filter: </label>
                    <select name="filter" id="filter" onChange={e => setStatusFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="not completed">Not Completed</option>
                        <option value="completed">Completed</option>
                    </select>
                </form>
            </div>

            <div className="tasks-container">
                {filteredTasks.map((task, index) => (
                    <div className="task-card" key={index}>
                        <div className="task-content">
                            <h4>{task.name}</h4>
                            <p>{task.desc}</p>
                        </div>
                        <div className="task-actions">
                            <form id="task-status">
                                <label htmlFor="status">Status: </label>
                                <select
                                    name="status"
                                    id="status"
                                    value={task.status}
                                    onChange={event => handleStatusChange(event, index)}
                                >
                                    <option value="not completed" className="not">Not Completed</option>
                                    <option value="completed" className="comp">Completed</option>
                                </select>
                            </form>
                            <button className="delete-button" onClick={() => delTask(index)}>Delete</button>
                            <button className="edit-button" onClick={() => editTask(index)}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TodoCreate;
