import React from 'react';

export function SizePanel(props) {

	return (
		<div>
			<table style={{ border: 'solid black', width: '100px', height: '50px' }}>
				<tbody>
					<tr>
						<td id='small' onClick={() => props.setSize(3)}>
							<img src='../icons/smDot.png' width='20' height='20'/>
						</td>
						<td id='medium' onClick={() => props.setSize(9)}>
							<img src='../icons/mdDot.png' width='20' height='20'/>
						</td>
						<td id='large' onClick={() => props.setSize(15)}>
							<img src='../icons/lrgDot.png' width='20' height='20'/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

	);
}