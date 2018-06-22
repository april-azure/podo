import React, { Component } from 'react'
import { Navbar, NavbarBrand, Button, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'

class Header extends Component{

	signOut() {
		this.props.signOut()
	}

	render() {
		const user = this.props.user
		return(
			<div>
				<Navbar color = 'dark'>
					<div className = 'container'>

						<div className='navbar-brand'>
							<Link to = '/marketing'><img src = '/assets/logo.PNG' height='30'/></Link>
						</div>
						{	
							!user.login 
							? (	<Link to='/login' className='link-nostyle'><Button outline color = 'warning'>
									Login
								</Button></Link>) 
							: ( <div>
								<span className='text-white'>Hi {user.user}, </span>
								<Link to='/login' className='link-nostyle'><Button onClick = {this.signOut.bind(this)} outline color = 'warning'>
									Logout
								</Button></Link></div>) 
						}

					</div>
				</Navbar>
			</div>
		)
	}
}

export default Header