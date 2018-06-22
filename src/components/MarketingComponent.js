import React from 'react'
import { Jumbotron, Row } from 'reactstrap'

export const Marketing = () => {
	return (
		<div>
			<Jumbotron className = 'marketing-1'>
				<div className = 'container'>
					<Row className= 'branding-panel'>	
						<div className = 'col-sm-12 col-md-5'> 
							<img className='branding-img' width = '100%' src = '/assets/project-management.PNG'/>
						</div>
						<div className='col-sm-12 col-md-7'>
							<h3>The standard Lorem Ipsum passage, used since the 1500s</h3>
							<p>minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
						</div>
					</Row>
				</div>
			</Jumbotron>
			<Jumbotron className = 'marketing-2'>
				<div className = 'container'>
					<div className='branding-panel'>
						<Row className= 'branding-panel'>	
							<div className='col-sm-12 col-md-7'>
								<h3>The standard Lorem Ipsum passage, used since the 1500s</h3>
								<p>minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
							</div>
							<div className = 'col-sm-12 col-md-5'> 
								<img className='branding-img' width = '100%' src = '/assets/project-management.PNG'/>
							</div>
						</Row>						
					</div>
				</div>
			</Jumbotron>
		</div>
	)
}