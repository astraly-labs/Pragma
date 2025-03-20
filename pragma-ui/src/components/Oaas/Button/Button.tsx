import React from 'react'
import cx from 'classnames'
import styles from './Button.module.scss'

const Button = ({ children, className, onClick, title, ariaLabel }) => (
	<button className={cx(styles.button, className)} onClick={onClick} title={title} aria-label={ariaLabel}>
		{children}
	</button>
)


export default Button
