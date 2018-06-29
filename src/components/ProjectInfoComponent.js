import React from 'react'
import { LocalForm, Control, Errors } from 'react-redux-form'
import { Row, Label, Card, CardBody, Button, CardFooter, Col } from 'reactstrap'
import ProjectDetailForm from './ProjectDetailForm'
import {connect} from 'react-redux'
import TagInput, {Tags} from './TagComponent'
import * as actions from '../redux/ActionCreator'

class ProjectInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			editingProject: null,
			editing: false
		}
		this.handleProjectChange = this.handleProjectChange.bind(this)
		this.updateProjectInfo = this.updateProjectInfo.bind(this)
	}

	handleProjectChange(value) {
		this.setState({
			editingProject: value
		})
	}

	setEditing(editing) {
		this.setState({
			editing: editing
		})
	}

	updateProjectInfo() {
		//this.setEditing(false)
		this.props.dispatch(actions.updateProjectInfo(this.state.editingProject))
	}

	render() {
		const RenderProjectInfo = (props) => {
			let project = props.project
			return (
				<div>
					<Row className='justify-content-end' >
						<div onClick={() => this.setEditing(true)} className='col-md-3 text-right'>
							<img className='svg-md' src='/assets/svg/si-glyph-edit.svg'/>
						</div>
					</Row>
					<Row>
						<Label className='col-md-3 text-right'>
							Title
						</Label>
						<Label className='col-md-9'>
							{project.title}
						</Label>
					</Row>
					<Row>
						<Label className='col-md-3 text-right'>
							Tag
						</Label>
						{
							project.tags && project.tags.length > 0
							?(<Tags tags={project.tags} className='col-md-9'/>)
							:(<Label className='col-md-9'>---</Label>)
						}
					</Row>	
					<Row>
						<Label className='col-md-3 text-right'>
							Memebers
						</Label>
						<Label className='col-md-9'>
							---
						</Label>
					</Row>
					<Row>
						<Label className='col-md-3 text-right'>
							Course
						</Label>
						<Label className='col-md-9'>
							{project.course}
						</Label>
					</Row>
					<Row>
						<Label className='col-md-3 text-right'>
							Due Date
						</Label>
						<Label className='col-md-9'>
							{project.due}
						</Label>
					</Row>	
					<Row>
						<Label className='col-md-3 text-right'>
							Description
						</Label>
						<Label className='col-md-9'>
							{project.description}
						</Label>
					</Row>						
				</div>
			)
		}

		return (
			<div className = 'container'>
				<Row className='justify-content-center'>
					<Card className='col col-md-8' style={{marginTop:'1rem', marginBottom:'1rem'}}>
							<CardBody className='container'>
								{
									this.state.editing
									? 
									(
										<div>
											<ProjectDetailForm handleProjectChange={this.handleProjectChange} project={this.props.project}/>
											<Row className='justify-content-end'>
												<div className='col col-md-3'>
													<Button onClick = {this.updateProjectInfo} style={{width:'100%'}} color='primary'>Update</Button>
												</div>
											</Row>
										</div>
									)
									: 
									(
										<div>	
											<RenderProjectInfo project = {this.props.project}/>
										</div>
									)
								}
							</CardBody>					

					</Card>
				</Row>
			</div>
		)
	}
}

export default connect()(ProjectInfo)