import React, { Component } from 'react'
import { Card, Row, Button, CardBody, Form, FormGroup, Label, Input } from 'reactstrap'

class Login extends Component {
	render(){
		return (
			<div className = 'container'>
				<Card className = 'col-sm-12 col-md-6 offset-md-3 login-card' >
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
								<Button href={process.env.PUBLIC_URL + '/mypage'} color='warning' className='btn-lg' width='100%' block>Login</Button>
							</FormGroup>
						</Form>
					</CardBody>
				</Card>
			</div>
		)
	}
}

export default Login