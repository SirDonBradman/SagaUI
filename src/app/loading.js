import React from 'react';
import { SyncLoader } from 'react-spinners';
import styles from './loading.module.css';

export default function Loading(props) {
	if(props.loading){
		return (
			// <div>
			// 	<h2>Loading...</h2>
			// </div>
			<div className={styles.loadingIcon}>
        	<SyncLoader
				sizeUnit={"px"}
				size={20}
				color={'#00838F'}
				loading={props.loading}
        	/>
      </div> 
		);
	}
	else
		return null;
}