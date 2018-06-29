import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Badge, CardSubtitle, Row, CardText, 
	CardFooter, Button, Modal, ModalHeader, ModalBody, ModalFooter, 
	Form, FormGroup, Input, Label, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { LocalForm, Control, Errors } from 'react-redux-form'
import TagInput, {Tags} from './TagComponent'

const required = (val) => val && val.length

class MyPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isOpen: false
		}
		this.project = {}
		this.toggle = this.toggle.bind(this)
		this.addProject = this.addProject.bind(this)
		this.submitAddProject = this.submitAddProject.bind(this)
		this.tagOnChange = this.tagOnChange.bind(this)
		this.onKeyPress = this.onTagKeyPress.bind(this)
	}

	onTagKeyPress(event) {
		if(event.which === 13) {
			event.preventDefault()
		}
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}
	
	addProject() {
		this.props.addProject(this.project)
	}

	submitAddProject(project) {
		this.project = {
			...project, 
			...this.project
		}
		this.project.members = [
			...this.membersInput.getValue()
		]
		this.toggle()
		if(project){
			console.log('submit add project')
			this.addProject()
		}
	}

	tagOnChange(tags) {
		this.project.tags = tags
		console.log('tag on change')
	}

	render(){
		const RenderModal = (props) => {
			return(
				<Modal isOpen = {this.state.isOpen} toggle={this.toggle} >
					<ModalHeader toggle={this.toggle}>Add Project</ModalHeader>
					<LocalForm onSubmit={(project)=>this.submitAddProject(project)} className = 'form'>
						<ModalBody>
							<Row className='form-group'>
								<Label className='text-right' sm = {12} md={3} for='title'>Title</Label>
								<Col sm = {12} md={9}>
									<Control.text 
										className='form-control' model='.title' name='title' id='title'
										validators = {{
											required
										}}
									/>
									<Errors
										className='text-danger'
										model ='.title'
										show = 'touched'
										messages = {{
										required: 'This item is required'
									}}/>
								</Col>
							</Row>
							<Row className='form-group'>
								<Label className='text-right' sm = {12} md={3} for='tag'>Tag</Label>
								<Col sm = {12} md={9}>
									<TagInput onKeyPress={this.onTagKeyPress} onChange = {this.tagOnChange}/>
								</Col>
							</Row>
							<Row className='form-group'>
								<Label className='text-right' sm = {12} md={3} for='members'>Members</Label>
								<Col sm = {12} md={9}>
									<TagInput onKeyPress={this.onTagKeyPress} ref={(instance) => this.membersInput = instance}/>
								</Col>
							</Row>
							<Row className='form-group'>
								<Label className='text-right' sm = {12} md={3} for='course'>Course</Label>
								<Col sm = {12} md={9}>
									<Control.text className='form-control' model='.course' name='course' type='text' id='course'/>
								</Col>
							</Row>
							<Row className='form-group'>
								<Label className='text-right' sm = {12} md={3} for='due'>Due Date</Label>
								<Col sm = {12} md={9}>
									<Control.text className='form-control' name='due' model='.due' id='due'/>
								</Col>
							</Row>
							<Row className='form-group'>
								<Label className='text-right' sm = {12} md={3} for='description'>Description</Label>
								<Col sm = {12} md={9}>
									<Control.textarea className='form-control' name='description' model='.description' id='description'/>
								</Col>
							</Row>																						
						</ModalBody>					
					<ModalFooter>
						<Button color='secondary' outline onClick = {this.toggle}>Cancel</Button>
						<Button color='primary' type='submit'>Add</Button>
					</ModalFooter>
					</LocalForm>
				</Modal>
			)
		}

		const RenderProjects = (props) => {
			if(!props.projects) return (<div></div>)
			else {
				return (
					<div>
						<div>
							{props.projects.map((project, key) => {
								return (<RenderProject tasks = {props.tasks? props.tasks.filter((task)=> task.projectId === project.id): []} project = {project} key = {key}/>)
							})}
						</div>
						<div style={{clear:'both'}}>
						</div>
					</div>
				)
			}
		}

		const RenderProject = (props) => {
			const completedTasks = props.tasks ?props.tasks.filter((task) => task.finish).length :0
			const ongoingTasks = props.tasks ?props.tasks.filter((task) => !task.finish).length :0

			const project = props.project;

			return (
				<div className='col-sm-12 col-md-6 project float-left'>
					<Card> 
						<CardBody>
							<CardTitle>
								<Link to= { '/projectdetail/' + project.id }>{project.title}</Link>
								<CardSubtitle className='float-right'>{project.course}</CardSubtitle>	
							</CardTitle>
							<Tags className='float-left' tags={project.tags}/>
							<div style={{clear:'both'}}/>
						
							<CardText>
								{project.description}
							</CardText>
							<Card className = 'task-panel'>
								<CardBody>
									<p className='task-panel-item'>{ongoingTasks} tasks ongoing</p>
								</CardBody>
							</Card>
						</CardBody>
						<CardFooter>
							{
								project.due 
								? <span className='float-left'>{project.due}</span>
								: null
							}
							
							<span className='float-right'>Last Update: yesterday</span>
						</CardFooter>
					</Card>
				</div>
			)
		}

		return (
			<div className = 'container'>
				<Row>
					<div className='col-md-12'>
						<Button className='float-right adjust-add-button' onClick = {this.toggle}>Add Project</Button>	
					</div>
				</Row>
				<RenderProjects tasks = {this.props.tasks.tasks} projects = {this.props.projects.projects}/>
				<RenderModal addProject = {this.props.addProject}/>
			</div>
		)
	}
}

export default MyPage