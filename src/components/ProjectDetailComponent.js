import React, { Component } from 'react'
import { Card, CardTitle, CardSubTitle, CardBody, CardHeader, Badge, Input, 
	FormGroup, Form, Label, Button, Row, Col, Modal, ModalHeader, ModalFooter, 
	ModalBody, Navbar, Nav, NavItem, NavbarBrand, NavLink as NavLinkItem } from 'reactstrap'
import { LocalForm, Control, Errors } from 'react-redux-form'
import { withRouter, Switch, Route, Link, NavLink } from 'react-router-dom'
import ProjectInfo from './ProjectInfoComponent'

const required = (val) => val && val.length

class Task extends Component {
	constructor(props){
		super(props)
		this.toggle = this.toggle.bind(this)
	}

	toggle() {
		this.props.finishTask(this.props.task.id)
	}

	render() {
			const task = this.props.task
			return(
				<Card className='task-item container'>
					<Form>
						<FormGroup check>
							<Label check style = {{textDecoration: !task.finish?'none':'line-through' }} className='col-sm-9 float-left task-item-check-label'>
								<Input type='checkbox' onChange = {this.toggle} checked = {task.finish}/>
								{task.title}
							</Label>
							<Button color='primary' onClick = {() => this.props.editTask(task.id)} className='float-right btn-sm' outline>Edit</Button>
						</FormGroup>
					</Form>
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
		console.log(this.props.project.members )
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
			projectId: this.props.project.id,
			taskPanelId: this.state.taskPanelId,
			id: this.state.editingTask? this.state.editingTask.id: null
		}
		this.props.addTodo(newTodo)
	}

	addTaskList() {
		this.props.addTaskList({
			id: this.props.taskPanels.length,
			projectId: this.props.project.id,
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
		this.toggle(task.taskPanelId, true)
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
								<Label className='col-md-3 text-right'>Assignee</Label>
								<Col className='col-md-9'>
									<Control.select className='form-control' model='.assignee' defaultValue={editingTask? editingTask.assignee: ''}>
										{
											props.members && props.members.length > 0 ?
											props.members.map((member,i) => (
												<option>{member.content}</option>
											))
											: (<option></option>)
										}
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
							{
								this.state.editingTask === null
								? <Button color='primary'>Add</Button>
								: <Button color='primary'>Save</Button>
							}
						</ModalFooter>
					</LocalForm>
				</Modal>
			)
		}

		const RenderTaskPanels = (props) => {
			return (
				<div className = 'container'>
					<Row className='justify-content-end'>
						<Button className='adjust-add-button' onClick = {this.addTaskList}>Add Task List</Button>
					</Row>
					{this.props.taskPanels.map((taskPanel,i)=> {
						const tasks = this.props.tasks.filter((task)=> task.taskPanelId === taskPanel.id)	
						return (<TaskPanel saveTitle={this.props.updateTitle} finishTask={this.props.finishTask} toggle={this.toggle} editTask = {this.editTask} tasks = {tasks} taskPanel = {taskPanel} key={i}/>)
					})}
					<div style={{clear:'both'}}>
					</div>
					<RenderModal members = {this.props.project.members}/>				
				</div>
			)
		}

		return (
			<div>
				<div className='text-warning' style={{backgroundColor: '#343a40'}}>
					<div className='container'>
						<Link to='/mypage'>
							<Button style={{border:'0px'}} color='warning' outline className='btn-sm'>{'<-'}</Button>
						</Link>

					</div>

					<Navbar expand='md' className='text-warning container' color='dark' dark>

						<Nav horizontal navbar className='float-left'>
							<NavItem>
								<NavLinkItem><NavLink exact activeClassName='text-warning' className='link-nostyle' className='link-nostyle' to={this.props.match.url}><h5>{this.props.project.title}</h5></NavLink></NavLinkItem>
							</NavItem>
							<NavItem>
								<NavLinkItem><NavLink activeClassName='text-warning' className='link-nostyle' to ={`${this.props.match.url}/info`}>Info</NavLink></NavLinkItem>
							</NavItem>
							<NavItem>
								<NavLinkItem><NavLink activeClassName='text-warning' className='link-nostyle' to ={`${this.props.match.url}/members`}>Members</NavLink></NavLinkItem>
							</NavItem>							
						</Nav>
					</Navbar>
				</div>

				<Route exact path={this.props.match.url} component = { RenderTaskPanels } />
				<Route path={`${this.props.match.url}/info`} component = {() => <ProjectInfo project = {this.props.project}/> } />
				<Route path='/members/' />

			</div>
		)
		
	}
}

class TaskPanel extends Component {
	constructor(props) {
		super(props)
		this.state = {
			editingTitle: false,
			title: props.taskPanel.title,
		}
		this.toggleEditingTitle = this.toggleEditingTitle.bind(this)
		this.handleChangeTitle = this.handleChangeTitle.bind(this)
		//this.saveTitle = this.saveTitle.bind(this)
	}

	toggleEditingTitle() {
		this.setState({
			editingTitle: !this.state.editingTitle
		})
	}

	saveTitle(panelId){
		this.props.saveTitle(panelId, this.state.title ? this.state.title: 'Task List')
		this.setState({
			editingTitle: !this.state.editingTitle
		})
	}

	handleChangeTitle(event) {
		this.setState({
			title: event.target.value
		})
	}

	handleKeyPress(event) {
		if(event.key === 'Enter') {
			this.handleChangeTitle(event)
		}
	}

	render() {
		const taskList = this.props.taskPanel
		console.log(this.props)
		console.log(taskList.id)
		const totalTasks = this.props.tasks.length 
		const finishedTasks = this.props.tasks.filter((task)=> task.finish).length
		return (
			<div className ='col col-sm-12 col-md-6 col-lg-4 project float-left' >
				<Card className='task-list'>
					<CardHeader>
						<CardTitle  className='container'>
							<div className='row'>
								{
									! this.state.editingTitle
									? <span onClick = {this.toggleEditingTitle} style={{paddingLeft:0}} className='col-sm-9'>{taskList.title}</span>
									: <Input autoFocus 
											className='form-control col-sm-9' 
											onBlur={()=>this.saveTitle(taskList.id)}
											onChange={this.handleChangeTitle}
											onKeyPress={this.handleKeyPress}
											value={this.state.title}
											/>
								}
						  		<small style={{paddingRight:0}} className='col col-sm-3 text-right'><b>{finishedTasks}/{totalTasks}</b></small>
							</div>
						</CardTitle>
					</CardHeader>
					<CardBody>
						<Button onClick = {() => this.props.toggle(taskList.id)} outline className='btn-sm'>+ Todo</Button>
						{
							this.props.tasks.filter((task)=> task.taskPanelId == taskList.id).map((task, i) => {
									return (<Task finishTask = {this.props.finishTask} editTask = {this.props.editTask} task = {task} key = {task.id}/>)
							})
						}
						{this.props.tasks.length? null: <div><small>There is no task</small></div>}
					</CardBody>
				</Card>
			</div>
		)
	}
}

export default withRouter(ProjectDetail)