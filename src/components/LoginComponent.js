import React, { Component } from 'react'
import { Card, Row, Button, CardBody, Form, FormGroup, Label, Input } from 'reactstrap'
import { Link } from 'react-router-dom'

class Login extends Component {
	render(){
		return (
			<div className = 'container'>
				<div className='row justify-content-center'>
					<Card className = 'col-sm-12 col-md-5 login-card' >
						<CardBody>
							<Form>
								<FormGroup className=''>
									<h2>Login to 
									<span><img style={{marginLeft: '10px', height:'42px'}} src='/assets/logo.PNG' /></span></h2>
								</FormGroup>
								<FormGroup>
									<Label>Username</Label>
									<Input bsSize ='lg' type='text'></Input>
								</FormGroup>
								<FormGroup>
									<Label>Password</Label>
									<Input bsSize='lg' type='password'></Input>
								</FormGroup>							
								<FormGroup>
									<Link to='/mypage' className='link-nostyle'><Button color='warning' className='btn-lg' width='100%' block>Login</Button></Link>
								</FormGroup>
							</Form>
						</CardBody>
					</Card>
				</div>
			</div>
		)
	}
}

export default Login