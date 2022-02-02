import { Route, Switch, Redirect, Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { baseUrl } from '../shared/baseUrl';
import Login from './LoginComponent';
import Header from './HeaderComponent';
import Execute from './ExecuteComponent';
import Arsenal from './ArsenalComponent';
import About from './AboutComponent';

export default function Main() {

	const [isLoggedIn, setLoggedIn] = useState();

	const [exercises, setExercises] = useState([]);
	const [workouts, setWorkouts] = useState([]);
	const [userWeight, setUserWeight] = useState([]);
	const [archive, setArchive] = useState([]);

	const loginRedirect = useRef();

	useEffect(() => {
		if (isLoggedIn && fetch(baseUrl + 'users/isLoggedIn', {
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				return res.json();
			})
			.then(res => {
				return res;
			})
		) {
			try {
				Promise.all([
					fetch(baseUrl + 'exercises', {
						credentials: 'include'
					}),
					fetch(baseUrl + 'workouts', {
						credentials: 'include'
					}),
					fetch(baseUrl + 'userWeight', {
						credentials: 'include'
					}),
					fetch(baseUrl + 'archive', {
						credentials: 'include'
					})
				])
					.then(res => {
						return (Promise.all(res.map(response => {
							console.log(response)
							return response.json();

						})));
					})
					.then(data => {
						console.log(data);
						console.log('exercises: ', data[0]);
						console.log('workouts: ', data[1]);
						console.log('userWeight: ', data[2]);
						console.log('archive: ', data[3].reverse());

						setExercises([...data[0]]);
						setWorkouts([...data[1]]);
						setUserWeight(data[2]);
						setArchive([...data[3]]);
					})
					.catch(err => {
						console.log(err);
					})
			}
			catch (err) {
				alert(err);
			}
		} else {
			redirectToLogin();
		}
	}, [isLoggedIn, setExercises, setWorkouts, setUserWeight, setArchive]);

	function redirectToLogin() {
		loginRedirect.current.click();
	}

	return (
		<>
			<Link to="/login" ref={loginRedirect} replace hidden />
			<Header
				isLoggedIn={isLoggedIn}
				userWeight={userWeight}
				archive={archive}
				setArchive={setArchive} />
			<Switch>
				<Route path="/login"
					render={() => <Login
						setExercises={setExercises}
						setWorkouts={setWorkouts}
						setUserWeight={setUserWeight}
						setArchive={setArchive}
						isLoggedIn={isLoggedIn}
						setLoggedIn={setLoggedIn}
					/>} />
				<Route path="/arsenal"
					render={() => <Arsenal
						exercises={exercises}
						workouts={workouts}
						setExercises={setExercises}
						setWorkouts={setWorkouts}
						setLoggedIn={setLoggedIn}
					/>} />
				<Route path="/execute"
					render={() => <Execute
						workouts={workouts}
						exercises={exercises}
						archive={archive}
						setExercises={setExercises}
						setWorkouts={setWorkouts}
						setUserWeight={setUserWeight}
						setArchive={setArchive}
						setLoggedIn={setLoggedIn}
					/>} />
				<Route path="/about" component={About} />
				{(isLoggedIn) ? <Redirect to="/arsenal" /> : <Redirect to="/login" />}
			</Switch>
		</>
	);
}