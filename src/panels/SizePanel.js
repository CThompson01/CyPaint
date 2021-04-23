import React from 'react';
import small from '../icons/smDot.png'
import medium from '../icons/mdDot.png'
import large from '../icons/lrgDot.png'

export function SizePanel(props) {

	return (
		<div>
			<table style={{ border: 'solid black', width: '100px', height: '50px' }}>
				<tbody>
					<tr>
						<td id='small' onClick={() => props.setSize(3)}>
							<img src={small} width='20' height='20' alt=''/>
						</td>
						<td id='medium' onClick={() => props.setSize(9)}>
							<img src={medium} width='20' height='20' alt=''/>
						</td>
						<td id='large' onClick={() => props.setSize(15)}>
							<img src={large} width='20' height='20' alt=''/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

	);
}