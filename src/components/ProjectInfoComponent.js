import React from 'react'
import { LocalForm, Control, Errors } from 'react-redux-form'
import { Row, Label, Card, CardBody, Button, CardFooter } from 'reactstrap'
import ProjectDetailForm from './ProjectDetailForm'

class ProjectInfo extends React.Component {
	render() {
		return (
			<div className = 'container'>
				<Row className='justify-content-center'>
					<Card className='col col-md-8' style={{marginTop:'1rem'}}>
						<Row>
							<CardBody>
								<ProjectDetailForm project={this.props.project}/>
								<Row className='justify-content-end'>
									<div className='col col-md-2'>
										<Button style={{width:'100%'}} color='primary'>Update</Button>
									</div>
								</Row>
							</CardBody>
						</Row>						

					</Card>
				</Row>
			</div>
		)
	}
}

export default ProjectInfo 