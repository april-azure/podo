import React, { Component } from 'react'
import { NavLink, Card, CardBody, CardTitle, Badge, CardSubtitle, Row, CardText, CardFooter, Button } from 'reactstrap'

class MyPage extends Component {

	render (){

		const RenderProjects = (props) => {
			if(!props.projects) return (<div></div>)
			else {
				console.log(props.projects)
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
							<CardTitle><NavLink href='/projectdetail'>{project.title}</NavLink><Badge className='float-right' color='danger'>Urgent</Badge></CardTitle>
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
							<span className='float-left'>Due: 15 Jul. 2018</span>
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
						<Button className='float-right'>Add Project</Button>	
					</div>
				</Row>
				<RenderProjects projects = {this.props.projects.projects}/>
			</div>
		)
	}
}

export default MyPage