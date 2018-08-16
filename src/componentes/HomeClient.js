import React, {Component} from 'react';
import {RaisedButton} from 'material-ui';

import {Card, CardHeader, CardText, List, TextField, ListItem} from 'material-ui';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import QuestionEnum from '../enums/QuestionEnum';
import ClientApi from '../backend-api/ClientApi';
import {
    expertsCardStyle,
    messagesCardStyle,
    list1Style,
    messagesInputStyle,
    fieldStyle,
    buttonStyle
} from '../css/Home';

export default class HomeClient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            client: JSON.parse(localStorage.getItem('user-logged')),
            experts: [],
            selectedExpert: null,
            questions: [],
            newQuestion: '',
            newQuestionError: '',
        };
        this.onExpertSelect = this.onExpertSelect.bind(this);
    }

    async componentDidMount() {
        const result = await ClientApi.getAllUsers();
        this.setState({experts: result.data});
    }

    onChangeNewQuestion(value) {
        if (value.length <= 300) {
            this.setState({
                newQuestion: value,
                newQuestionError: '',
            });
        }
        else {
            this.setState({newQuestionError: 'Message to Long'});
        }

    }

    async sendQuestionToExpert(ev) {
        ev.preventDefault();
        // const client = JSON.parse(localStorage.getItem('user-logged'));
        const data = {
            clientId: this.state.client.id,
            userId: this.state.selectedExpert.id,
            content: this.state.newQuestion,
            status: QuestionEnum.getStatusEnum().OPEN,
        };

        const result = await ClientApi.sendQuestion(data);
        const currentQuestions = this.state.questions;
        currentQuestions.push(result.data);
        this.setState({
            questions: currentQuestions,
            newQuestion: '',
        });

    }

    async loadQuestions(expert) {
        const client = JSON.parse(localStorage.getItem('user-logged'));
        const result = await ClientApi.getQuestionsForUser(client.id, expert.id);
        this.setState({questions: result.data});

    }

    async onExpertSelect(expert) {
        this.setState({selectedExpert: expert}, await this.loadQuestions(expert));
    }


    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center', height: '100vh'}}>
                <Card style={expertsCardStyle}>
                    <form>
                        <List component="nav">
                            {this.state.experts.map((item, idx) =>
                                <ListItem key={`exp.${idx}`}
                                          leftIcon={<PeopleIcon/>}
                                          primaryText={item.name}
                                          onClick={ev => this.onExpertSelect(item)}>
                                </ListItem>
                            )}
                        </List>
                    </form>
                </Card>

                <Card style={messagesCardStyle}>

                    <div id={'list1'} style={list1Style}>
                        <List component="nav">
                            {this.state.questions.map((item, idx) => {
                                    const qDate = new Date();//item.
                                    return (
                                        <Card key={`exp.${idx}`}>
                                            <CardHeader
                                                title={`Question in ${qDate.toLocaleString('en')}`}
                                                avatar={<PeopleIcon/>}
                                            />
                                            <CardText>
                                                <p>{item.content}</p>
                                                {item.answerId
                                                    ? <p><span
                                                        style={{color: 'mediumpurple'}}>Answer: </span>{item.answerId.content}
                                                    </p>
                                                    : null}
                                            </CardText>
                                        </Card>
                                    );
                                }
                            )}
                        </List>
                    </div>

                    <form>
                        <div id={'list2'} style={messagesInputStyle}>
                            <TextField
                                id="newQuestion"
                                type={"newQuestion"}
                                label="newQuestion"
                                multiLine={true}
                                rows={3}
                                style={fieldStyle}
                                value={this.state.newQuestion}
                                floatingLabelText={this.state.selectedExpert === null ? 'Select an expert to ask.' : 'Type a new question'}
                                onChange={ev => this.onChangeNewQuestion(ev.target.value)}
                                errorText={this.state.newQuestionError}
                                errorStyle={{color: 'red'}}
                                disabled={this.state.selectedExpert === null}
                            />

                            <RaisedButton
                                type="button"
                                label="Ask"
                                style={buttonStyle}
                                primary={true}
                                onClick={this.sendQuestionToExpert.bind(this)}
                                disabled={this.state.selectedExpert === null}
                            />
                        </div>
                    </form>
                </Card>
            </div>
        );
    }
}