import React, { useState } from 'react';

const Problem1 = () => {
    const [allTask, setAllTask] = useState([]);
    const [currentStatus, setCurrentStatus] = useState('all');
    const [inputTask, setInputTask] = useState({
        name: '',
        status: ''
    });

    // Function to handle the update of the input task
    const handleUpdateInputTask = (name, value) => {
        setInputTask({ ...inputTask, [name]: value });
    };

    // Function to handle the submit task
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the input task is empty or not
        if (inputTask.name === '' || inputTask.status === '') {
            alert('Please fill all the fields')
        }

        setAllTask((prev) => {
            const temp = JSON.parse(JSON.stringify(prev));
            temp.push(inputTask);
            return temp;
        });

        setInputTask({
            name: '',
            status: ''
        });
    };

    // Function to filter data according to the current status
    const getFilteredTasks = (status) => {
        if (status.toLowerCase() === 'all') {
            allTask.sort((a, b) => {
                const statusOrder = {
                    active: 1,
                    completed: 2,
                };

                const aStatusOrder = statusOrder[a.status] || 3;
                const bStatusOrder = statusOrder[b.status] || 3;

                return aStatusOrder - bStatusOrder;
            });
            return allTask;
        } else if (status.toLowerCase() === 'active') {
            return allTask.filter(task => task.status === 'active');
        } else if (status.toLowerCase() === 'completed') {
            return allTask.filter(task => task.status === 'completed');
        }
    };

    // Function to change the current status
    const handleChangeStatus = (val) => {
        setCurrentStatus(val);
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <div
                        className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={inputTask.name}
                                onChange={(e) => handleUpdateInputTask('name', e.target.value)}
                            />
                        </div>
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Status"
                                value={inputTask.status}
                                onChange={(e) => handleUpdateInputTask('status', e.target.value)}
                            />
                        </div>
                        <div className="col-auto">
                            <button
                                onClick={handleSubmit}
                                className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${currentStatus === 'all' && 'active'}`}
                                type="button"
                                onClick={() => handleChangeStatus('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${currentStatus === 'active' && 'active'}`}
                                type="button"
                                onClick={() => handleChangeStatus('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${currentStatus === 'completed' && 'active'}`}
                                type="button"
                                onClick={() => handleChangeStatus('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getFilteredTasks(currentStatus).map((task, index) => (
                                    <tr key={index}>
                                        <td>{task.name}</td>
                                        <td>{task.status}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;