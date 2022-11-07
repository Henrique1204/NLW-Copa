import React from 'react';

declare module 'react' {
	export interface IDefaultProps {
		testId?: string;
		className?: string;
		children?: React.ReactNode;
	}

	export interface IComponent<T = {}> extends React.FC<IDefaultProps & T> {}
}