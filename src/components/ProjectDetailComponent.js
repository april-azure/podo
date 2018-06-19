import React, { Component } from 'react'
import { Card, CardTitle, CardSubTitle, CardBody, CardHeader, Badge, Input, FormGroup, Form, Label, Button, Row } from 'reactstrap'

class ProjectDetail extends Component {

	render () {	

		const RenderTask = (props) => {
			return(
				<Card className='task-item container'>
					<Form>
						<FormGroup check>
							<Label check className='col-sm-10 float-left task-item-check-label'>
								<Input type='checkbox'/>
								test
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
						<small style={{paddingLeft:0}} className='col col-sm-9 offset-sm-1'>Due: 20 Jul. 2018</small>
						<img className='col col-sm-2' height='30px' width='50px' src='/assets/logo.PNG'/>
					</div>
					
				</Card>
			)
		}

		const RenderTaskPanel = (props) => {
			return (
				<div className ='col col-sm-12 col-md-6 col-lg-4 project float-left' >
					<Card className='task-list'>
						<CardHeader>
							<CardTitle>Design<Badge className='float-right' color='light' pill>1/4</Badge></CardTitle>
						</CardHeader>
						<CardBody>
							<Button outline className='btn-sm'>+ Task</Button>
							<RenderTask/>
							<RenderTask/>
						</CardBody>
					</Card>
				</div>
			)
		}
		return (
			<div className = 'container'>
				<RenderTaskPanel/>
				<RenderTaskPanel/>
				<RenderTaskPanel/>
				<RenderTaskPanel/>
			</div>
		)
		
	}
}

export default ProjectDetail