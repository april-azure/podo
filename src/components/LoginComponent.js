import React, { Component } from 'react'
import { Card, Row, Button, CardBody } from 'reactstrap'

class Login extends Component {
	render(){
		return (
			<div className = 'container'>
				<Card className = 'col-sm-12 col-md-6 offset-md-3 login-card' >
					<CardBody>
						<Row>
							<Button color='warning' className = 'btn-lg col-sm-12'>Login</Button>
						</Row>
					</CardBody>
				</Card>
			</div>
		)
	}
}

export default Login