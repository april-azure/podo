import React, { Component } from 'react'
import { Card, CardTitle, CardSubTitle, CardBody, CardHeader, Badge, Input, 
	FormGroup, Form, Label, Button, Row, Col, Modal, ModalHeader, ModalFooter, 
	ModalBody } from 'reactstrap'
import { LocalForm, Control, Errors } from 'react-redux-form'

const required = (val) => val && val.length

class Task extends Component {
	constructor(props){
		super(props)
		this.state = {
			finished: false
		}
		this.toggle = this.toggle.bind(this)
	}

	toggle() {
		this.setState({
			finished: !this.state.finished
		})
	}

	render() {
			const task = this.props.task
			return(
				<Card className='task-item container'>
					<Form>
						<FormGroup check>
							<Label check style = {{textDecoration: !this.state.finished?'none':'line-through' }} className='col-sm-10 float-left task-item-check-label'>
								<Input type='checkbox' onChange = {this.toggle}/>
								{task.title}
							</Label>
							<Button color='primary' onClick = {() => this.props.editTask(task.id)} className='float-right btn-sm' outline>Edit</Button>
						</FormGroup>
					</Form>
					<div className='row'>
						<div style={{paddingLeft:0}} className='col col-sm-11 offset-sm-1'>
							<Badge>ui design</Badge>	
						</div>
					</div>
					<div className='row'>
						<small style={{paddingLeft:0}} className='col col-sm-9 offset-sm-1'>{task.due}</small>
						<small>{task.assignee}</small>
					</div>	
				</Card>
			)
		}
}

class TaskPanelModal extends Component {

}

class ProjectDetail extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			isOpen: false,
			taskPanelId: null,
			editingTask: null, 
			isEditingListTitle: false
		}
		this.toggle = this.toggle.bind(this)
		this.addTodo = this.addTodo.bind(this)
		this.addTaskList = this.addTaskList.bind(this)
		this.editTask = this.editTask.bind(this)
	}

	toggle(taskPanelId, isEditing=false) {
		console.log(taskPanelId)
		this.setState({
			isOpen: !this.state.isOpen,
			taskPanelId: taskPanelId,
		})
		if(!isEditing){
			this.setState({
				editingTask:null
			})
		}
	}

	addTodo(todo) {
		const newTodo = {
			...todo, 
			projectId: this.props.projectId,
			taskPanelId: this.state.taskPanelId
		}
		this.props.addTodo(newTodo)
	}

	addTaskList() {
		this.props.addTaskList({
			id: this.props.taskPanels.length,
			projectId: this.props.projectId,
			title: 'Task List'			
		})
	}

	editTask(taskId) {
		//set editingTask to something 
		console.log('edit task '+ taskId)
		const task = this.props.tasks.filter((task)=> task.id === taskId)[0]
		this.setState({
			editingTask: task
		})
		this.toggle(taskId, true)
	}

	render() {	
		const RenderModal = (props) => {
			const editingTask = this.state.editingTask
			return(
				<Modal isOpen = {this.state.isOpen} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Add Todo to <strong></strong></ModalHeader>
					<LocalForm onSubmit = {(todo) => this.addTodo(todo)}>
						<ModalBody>
							<Row className='form-group'>
								<Label className='col-md-3 text-right'>Todo</Label>
								<Col className='col-md-9'>
									<Control.text 
										className='form-control' model='.title'
										validators = {{
											required
										}}
										defaultValue = {editingTask? editingTask.title: ''}
									/>
									<Errors 
										model ='.title'
										show ='touched'
										className='text-danger'
										messages = {{
											required: 'This item is required'
										}}
									/>
								</Col>
							</Row>
							<Row className='form-group'>
								<Label className='col-md-3 text-right'>Tag</Label>
								<Col className='col-md-9'>
									<Control.text className='form-control' model='.tag'/>
								</Col>
							</Row>
							<Row className='form-group'>
								<Label className='col-md-3 text-right'>Assignee</Label>
								<Col className='col-md-9'>
									<Control.select className='form-control' model='.assignee' defaultValue={editingTask? editingTask.assignee: ''}>
										<option></option>
										<option>Alice</option>
										<option>Bob</option>
									</Control.select>
								</Col>
							</Row>			
							<Row className='form-group'>
								<Label className='col-md-3 text-right'>Due Date</Label>
								<Col className='col-md-9'>
									<Control.text className='form-control' model='.due' defaultValue={editingTask? editingTask.due: ''}/>
								</Col>
							</Row>																						
						</ModalBody>
						<ModalFooter>
							<Button outline onClick = {this.toggle}>Cancel</Button>
							<Button color='primary'>Add</Button>
						</ModalFooter>
					</LocalForm>
				</Modal>
			)
		}

		return (
			<div className = 'container'>
				<Row className='justify-content-end'>
					<Button onClick = {this.addTaskList}>Add Task List</Button>
				</Row>
				{this.props.taskPanels.map((taskPanel,i)=> {
					const tasks = this.props.tasks.filter((task)=> task.taskPanelId === taskPanel.id)	
					return (<TaskPanel toggle={this.toggle} editTask = {this.editTask} tasks = {tasks} taskPanel = {taskPanel} key={i}/>)
				})}
				<RenderModal/>
			</div>
		)
		
	}
}

class TaskPanel extends Component {
	render(){
		const taskList = this.props.taskPanel
		console.log(this.props)
		console.log(taskList.id)
		return (
			<div className ='col col-sm-12 col-md-6 col-lg-4 project float-left' >
				<Card className='task-list'>
					<CardHeader>
						<CardTitle>{taskList.title}<Badge className='float-right' color='light' pill>1/4</Badge></CardTitle>
					</CardHeader>
					<CardBody>
						<Button onClick = {() => this.props.toggle(taskList.id)} outline className='btn-sm'>+ Todo</Button>
						{
							this.props.tasks.filter((task)=> task.taskPanelId == taskList.id).map((task, i) => {
									return (<Task editTask = {this.props.editTask} task = {task} key = {task.id}/>)
							})
						}
					</CardBody>
				</Card>
			</div>
		)
	}
}

export default ProjectDetail