import React, { Component } from 'react'
import { Card, Row, Button, CardBody, Form, Label, Input } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'
import { LocalForm, Control } from 'react-redux-form'

class Login extends Component {

	handdleSubmit(user){
		this.props.signIn(user.username)
		this.props.history.push('/mypage')
	}

	render(){

		return (
			<div className = 'container'>
				<div className='row justify-content-center'>
					<Card className = 'col-sm-12 col-md-5 login-card' >
						<CardBody>
							<LocalForm onSubmit = {(values) => this.handdleSubmit(values)}>
								<Row className='form-group'>
									<h2>Login to 
									<span><img style={{marginLeft: '10px', height:'42px'}} src='/assets/logo.PNG' /></span></h2>
								</Row>
								<Row className='form-group'>
									<Label>Username</Label>
									<Control.text model='.username' className='form-control'></Control.text>
								</Row>
								<Row className='form-group'>
									<Label>Password</Label>
									<Control.text className='form-control' type='password' model='.password'></Control.text>
								</Row>							
								<Row>
									<Button color='warning' className='btn-lg' width='100%' block>Login</Button>
								</Row>
							</LocalForm>
						</CardBody>
					</Card>
				</div>
			</div>
		)
	}
}

export default withRouter(Login)