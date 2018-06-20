import React, { Component } from 'react'
import { Card, CardBody, CardTitle, Badge, CardSubtitle, Row, CardText, 
	CardFooter, Button, Modal, ModalHeader, ModalBody, ModalFooter, 
	Form, FormGroup, Input, Label, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { LocalForm, Control, Errors } from 'react-redux-form'

const required = (val) => val && val.length

class MyPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isOpen: false
		}

		this.toggle = this.toggle.bind(this)
		this.addProject = this.addProject.bind(this)
		this.submitAddProject = this.submitAddProject.bind(this)
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}
	
	addProject(project) {
		console.log('addproject' + project)
		this.props.addProject(project)
	}

	submitAddProject(project) {
		console.log(project)
		this.toggle()
		if(project){
			console.log('submit add project')
			this.addProject(project)
		}
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
									<Control.text className='form-control' model='.tag' name='tag' type='text' id='tag'/>
								</Col>
							</Row>
							<Row className='form-group'>
								<Label className='text-right' sm = {12} md={3} for='members'>Members</Label>
								<Col sm = {12} md={9}>
									<Control.select className='form-control' model='.members' name='members' id='members'>
										<option></option>
										<option>Alice</option>
										<option>Brian</option>
										<option>Tag</option>
									</Control.select>
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
						{props.projects.map((project, key) => {
							return (<RenderProject project = {project} key = {key}/>)
						})}
					</div>
				)
			}
		}

		const RenderProject = (props) => {
			const project = props.project;

			return (
				<div className='col-sm-12 col-md-6 project float-left'> 
					<Card> 
						<CardBody>
							<CardTitle><Link to= { '/projectdetail/' + project.id }>{project.title}</Link><Badge className='float-right' color='danger'>Urgent</Badge></CardTitle>
							<CardSubtitle>{project.course}</CardSubtitle>
							<hr/>
							<CardText>
								{project.description}
							</CardText>
							<Card className = 'task-panel'>
								<CardBody>
									<p className='task-panel-item'>5 tasks ongoing</p>
									<p className='task-panel-item'>5 tasks uncompleted</p>
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
						<Button className='float-right' onClick = {this.toggle}>Add Project</Button>	
					</div>
				</Row>
				<RenderProjects projects = {this.props.projects.projects}/>
				<RenderModal addProject = {this.props.addProject}/>
			</div>
		)
	}
}

export default MyPage