import React, { Component } from 'react'
import { Navbar, NavbarBrand, Button, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'

class Header extends Component{
	render(){
		return(
			<div>
				<Navbar color = 'dark'>
					<div className = 'container'>

						<div className='navbar-brand'>
							<Link to = '/marketing'><img src = '/assets/logo.PNG' height='30'/></Link>
						</div>
						<Link to='/login' className='link-nostyle'><Button outline color = 'warning'>
							Login
						</Button></Link>
					</div>
				</Navbar>
			</div>
		)
	}
}

export default Header