import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Jumbotron, Container, Col, Row, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import Exercise from './ExerciseComponent';

export default function Arsenal() {

    const [isModalOpen, modalSwitch] = useState(false);
    const [exerciseArr, setExerciseData] = useState([]);

    function toggleModal() { 
        modalSwitch((isModalOpen) => isModalOpen = !isModalOpen);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const eName = e.target[0].value;
        const eType = e.target[1].checked ?
        e.target[1].value :
        e.target[2].checked ?
        e.target[2].value : alert('All new exercises must have an assigned Type.');
        setExerciseData(exerciseArr => [{
            id: exerciseArr.length.toString(),
            eName,
            eType,
        }, ...exerciseArr]);
        toggleModal();
    }

    function parseType(strength, cardio) {
        return strength ? strength : cardio ? cardio : null;
    }

    const sArray= parseType(exerciseArr.filter(exercises => exercises.eType === "Strength"), null);
    const cArray= parseType(null, exerciseArr.filter(exercises => exercises.eType === "Cardio"));

    return(
        <>
            <Container fluid={true} className="grid">
                <Row className="mt-1 mx-sm-2">
                    <Col className="text-center cat">
                        <h5>Your Workouts</h5>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center my-auto mb-2">
                        ~~Workouts Here~~
                    </Col>
                </Row>
                <hr />
                <Row className="mt-1 mx-sm-2"> 
                    <Col className="text-center cat">
                        <h5>Your Exercises</h5>
                    </Col>
                </Row>
                <Row>
                    <Col className="cat mb-3">
                        <h5 className="text-center mb-0">Strength</h5>
                        {sArray.map(exercise => {
                            return(
                                <Exercise exercise={exercise} />
                            );
                        })}
                    </Col>
                    <Col className="cat mb-3">
                        <h5 className="text-center mb-0">Cardio</h5>
                        {cArray.map(exercise => {
                            return(
                                <Exercise exercise={exercise} />
                            );
                        })}
                    </Col>
                </Row>
            </Container>
            <Jumbotron fluid={true}>
                <Row className="mt-4">
                    <Col className="text-center">
                        <Button className="shadow-none" size="lg" color="secondary" outline onClick={toggleModal}>
                            Forge
                        </Button>
                    </Col>
                    <Col className="text-center">
                        <NavLink to="/"> {/*<-- exercises for execution passed through here? */}
                            <Button className="shadow-none" size="lg" color="secondary" outline >
                                Execute
                            </Button>
                        </NavLink>
                    </Col>
                    <Modal isOpen={isModalOpen} toggle={toggleModal}>
                        <ModalHeader toggle={toggleModal}>
                            <h4 className="title">Forge Menu</h4>
                        </ModalHeader>
                        <ModalBody className="text-center">
                            <Form onSubmit={e => (handleSubmit(e))} autoComplete="off">
                                <Container form fluid={true}>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label className="mt-3 mb-2 title" htmlFor="exerciseName">Name Your Exercise:</Label>
                                                <Input type="text" className="form-control" name="exerciseName" id="exerciseName" required
                                                 />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label htmlFor="exerciseType" className="mt-3 mb-2 title">Assign Type:</Label>
                                                <Input type="button" value="Strength" className="form-control mb-2" id="strengthExercise"
                                                name="exerciseType" onFocus={e => {e.target.checked = true; e.target.form[2].checked = false}} />
                                                <span>or</span>
                                                <Input type="button" value="Cardio" className="form-control mt-2" id="cardioExercise" 
                                                name="exerciseType" onFocus={e => {e.target.checked = true; e.target.form[1].checked = false;}} />
                                            </FormGroup>
                                            <Button type="submit" className="mt-5 mb-3 shadow-none" size="lg" color="secondary" outline>
                                            Finish
                                            </Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </Form>
                        </ModalBody>
                    </Modal>
                </Row>
            </Jumbotron>
        </>
    );
}