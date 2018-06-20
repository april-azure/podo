import React, { Component } from 'react'
import { Navbar, NavbarBrand, Button, NavLink } from 'reactstrap'

class Header extends Component{
	render(){
		return(
			<div>
				<Navbar color = 'dark'>
					<div className = 'container'>
						<NavbarBrand href = {process.env.PUBLIC_URL + '/marketing' } >
							<img src = '/assets/logo.PNG' height='30'/>
						</NavbarBrand>
						<Button outline color = 'warning' href='/login'>
							Login
						</Button>
					</div>
				</Navbar>
			</div>
		)
	}
}

export default Header