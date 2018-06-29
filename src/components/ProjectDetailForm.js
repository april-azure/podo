import React, {Component} from 'react'
import {LocalForm, Control, Errors} from 'react-redux-form'
import {Row, Col, Label} from 'reactstrap'
import TagInput from './TagComponent'
const required = (val) => val && val.length

class ProjectDetailForm extends Component {
	constructor(props) {
		super(props)
		this.handleProjectChange = this.handleProjectChange.bind(this)
		this.tagOnChange = this.tagOnChange.bind(this)
		this.project = props.project
		this.getTagValue = this.getTagValue.bind(this)
	}

	tagOnChange(tags) {
		this.project.tags = [...tags]
		this.handleProjectChange(this.project)
		console.log('tags ' + JSON.stringify(tags) )
	}

	getTagValue(tags) {
		this.project.tags = [...tags]
	}

	handleProjectChange(project) {
		project = {
			...project, 
			id: this.props.project.id,
			tags: this.project.tags? this.project.tags: []
		}
		this.project = project
		this.props.handleProjectChange(project)
	}

	render() {
		const project = this.props.project
		return(
			<LocalForm className = 'form' model='project' onChange = {(project) => this.handleProjectChange(project)}>
					<Row className='form-group'>
						<Label className='text-right' sm = {12} md={3} for='title'>Title</Label>
						<Col sm = {12} md={9}>
							<Control.text 
								className='form-control' model='.title' name='title' id='title'
								validators = {{
									required
								}}
								defaultValue = {
									project? project.title: ''
								}
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
							<TagInput getTagValue={this.getTagValue} onChange = {this.tagOnChange} tags={this.props.project.tags}/>
						</Col>
					</Row>
					<Row className='form-group'>
						<Label className='text-right' sm = {12} md={3} for='members'>Members</Label>
						<Col sm = {12} md={9}>
							<Control.select className='form-control' model='.members' name='members' id='members'
								defaultValue = {project && project.memeber? project.member:''}>
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
							<Control.text className='form-control' model='.course' name='course' type='text' id='course'
								defaultValue = {project && project.course? project.course: ''}/>
						</Col>
					</Row>
					<Row className='form-group'>
						<Label className='text-right' sm = {12} md={3} for='due'>Due Date</Label>
						<Col sm = {12} md={9}>
							<Control.text className='form-control' name='due' model='.due' id='due'
								defaultValue = {project && project.due ? project.due: ''}/>
						</Col>
					</Row>
					<Row className='form-group'>
						<Label className='text-right' sm = {12} md={3} for='description'>Description</Label>
						<Col sm = {12} md={9}>
							<Control.textarea className='form-control' name='description' model='.description' id='description' rows='8'
								defaultValue={project && project.description? project.description: ''}/>
							
						</Col>
					</Row>																									
			</LocalForm>
		)
	}
}


export default ProjectDetailForm 