import React, { Component } from 'react'
import { Card, CardTitle, CardSubTitle, CardBody, CardHeader, Badge, Input, 
	FormGroup, Form, Label, Button, Row, Col, Modal, ModalHeader, ModalFooter, 
	ModalBody } from 'reactstrap'
import { LocalForm, Control, Errors } from 'react-redux-form'

const required = (val) => val && val.length

class ProjectDetail extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			isOpen: false,
			taskPanelId: null
		}
		this.toggle = this.toggle.bind(this)
		this.addTodo = this.addTodo.bind(this)
		this.addTaskList = this.addTaskList.bind(this)
	}

	toggle(taskPanelId) {
		console.log(taskPanelId)
		this.setState({
			isOpen: !this.state.isOpen,
			taskPanelId: taskPanelId
		})
	}

	addTodo(todo) {
		const newTodo = {
			...todo, 
			projectId: this.props.projectId
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

	render() {	
		const RenderModal = (props) => {
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
									<Control.select className='form-control' model='.assignee' >
										<option></option>
										<option>Alice</option>
										<option>Bob</option>
									</Control.select>
								</Col>
							</Row>			
							<Row className='form-group'>
								<Label className='col-md-3 text-right'>Due Date</Label>
								<Col className='col-md-9'>
									<Control.text className='form-control' model='.due' />
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

		const RenderTask = (props) => {
			const task = props.task
			return(
				<Card className='task-item container'>
					<Form>
						<FormGroup check>
							<Label check className='col-sm-10 float-left task-item-check-label'>
								<Input type='checkbox'/>
								{task.title}
							</Label>
							<Label className='float-right'>Edit</Label>

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

		const RenderTaskPanel = (props) => {
			const taskList = props.taskPanel
			console.log(props)
			console.log(taskList.id)
			return (
				<div className ='col col-sm-12 col-md-6 col-lg-4 project float-left' >
					<Card className='task-list'>
						<CardHeader>
							<CardTitle>{taskList.title}<Badge className='float-right' color='light' pill>1/4</Badge></CardTitle>
						</CardHeader>
						<CardBody>
							<Button onClick = {() => this.toggle(taskList.id)} outline className='btn-sm'>+ Todo</Button>
							{
								this.props.tasks.map((task) => {
									return (<RenderTask task = {task}/>)
								})
							}
						</CardBody>
					</Card>
				</div>
			)
		}
		return (
			<div className = 'container'>
				<Row className='justify-content-end'>
					<Button onClick = {this.addTaskList}>Add Task List</Button>
				</Row>
				{this.props.taskPanels.map((taskPanel,i)=> {
					const tasks = this.props.tasks.filter((task)=> task.taskPanelId === taskPanel.id)	
					return (<RenderTaskPanel tasks = {tasks} taskPanel = {taskPanel} key={i}/>)
				})}
				<RenderModal/>
			</div>
		)
		
	}
}

export default ProjectDetail