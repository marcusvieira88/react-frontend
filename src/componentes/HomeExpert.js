import React, {Component} from 'react';
import {Card, List, TextField, ListItem, RaisedButton} from 'material-ui';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import QuestionAnswerIcon from 'material-ui/svg-icons/action/question-answer';
import QuestionEnum from '../enums/QuestionEnum';
import {
    expertsCardStyle,
    messagesCardStyle,
    list1Style,
    messagesInputStyle,
    fieldStyle,
    buttonStyle
} from '../css/Home';

import UserApi from '../backend-api/UserApi';

export default class HomeExpert extends Component {

    constructor() {
        super();
        this.state = {
            user: JSON.parse(localStorage.getItem('user-logged')),
            clients: [],
            selectedClient: null,
            selectedQuestion: null,
            questions: [],
            newAnswer: '',
            newAnswerError: '',
        };
        this.onClientSelect = this.onClientSelect.bind(this);
    }

    async componentDidMount() {
        const result = await UserApi.getClientsWithQuestion(this.state.user.id);
        this.setState({clients: result.data});
    }

    onChangeNewAnswer(value) {
        if (value.length <= 300) {
            this.setState({
                newAnswer: value,
                newAnswerError: '',
            });
        }
        else {
            this.setState({newAnswerError: 'Message to Long'});
        }
    }

    async sendAnswerToClient(ev) {
        ev.preventDefault();

        const data = {
            clientId: this.state.selectedClient._id,
            userId: this.state.user.id,
            content: this.state.newAnswer,
            questionId: this.state.selectedQuestion.id,
        };

        const result = await UserApi.sendAnswer(data);
        const questionIdx = this.state.questions.findIndex(item => item.id === result.data.questionId);
        const questions = this.state.questions;
        questions[questionIdx].status = QuestionEnum.getStatusEnum().ANSWERED;
        questions[questionIdx].answerId = result.data;
        this.setState({
            questions: questions,
            newAnswer: '',
        });
    }

    async loadQuestions(client) {
        const result = await UserApi.getQuestionsForClient(this.state.user.id, client._id);
        this.setState({questions: result.data});
    }

    async onClientSelect(client) {
        this.setState({selectedClient: client}, await this.loadQuestions(client));
    }

    render() {


        return (
            <div style={{display: 'flex', justifyContent: 'center', height: '100vh'}}>
                <Card style={expertsCardStyle}>
                    <form>
                        <List component="nav">
                            {this.state.clients.map((item, idx) =>
                                <ListItem key={`clt.${idx}`}
                                          leftIcon={<PeopleIcon/>}
                                          primaryText={item.firstName + " " + item.lastName}
                                          onClick={ev => this.onClientSelect(item)}
                                >
                                </ListItem>
                            )}
                        </List>
                    </form>
                </Card>

                <Card style={messagesCardStyle}>

                    <div id={'list1'} style={list1Style}>
                        <List component="nav">
                            {this.state.questions.map((item, idx) =>
                                <ListItem key={`exp.${idx}`}
                                          leftIcon={<QuestionAnswerIcon/>}
                                          primaryText={item.content}
                                          onClick={ev => {
                                              this.setState({selectedQuestion: item})
                                          }}
                                          style={{
                                              backgroundColor: this.state.selectedQuestion && item.id === this.state.selectedQuestion.id
                                                  ? 'lightgray' : 'white',
                                          }}
                                          secondaryText={
                                              item.status === QuestionEnum.getStatusEnum().OPEN
                                                  ? <p><span style={{color: 'red'}}>Unanswered</span></p>
                                                  : <p><span
                                                      style={{color: 'green'}}>Answered</span> -- {item.answerId.content}
                                                  </p>
                                          }
                                >
                                </ListItem>
                            )}
                        </List>
                    </div>
                    <form>
                        <div id={'list2'} style={messagesInputStyle}>
                            <TextField
                                id="newAnswer"
                                type={"newAnswer"}
                                label="newAnswer"
                                multiLine={true}
                                rows={3}
                                style={fieldStyle}
                                value={this.state.newAnswer}
                                floatingLabelText={
                                    this.state.selectedClient === null
                                        ? 'Select a client to anwser'
                                        : this.state.selectedQuestion === null
                                        ? 'Select a question to answer'
                                        : `Answer ${this.state.selectedClient.firstName}`}
                                onChange={ev => this.onChangeNewAnswer(ev.target.value)}
                                errorText={this.state.newAnswerError}
                                errorStyle={{color: 'red'}}
                                disabled={
                                    this.state.selectedClient === null
                                    || this.state.selectedQuestion === null
                                    || (
                                        this.state.selectedQuestion
                                        && this.state.selectedQuestion.status === QuestionEnum.getStatusEnum().ANSWERED
                                    )}
                            />

                            <RaisedButton
                                type="button"
                                label="Answer"
                                style={buttonStyle}
                                primary={true}
                                onClick={this.sendAnswerToClient.bind(this)}
                                disabled={
                                    this.state.selectedClient === null
                                    || this.state.selectedQuestion === null
                                    || (
                                        this.state.selectedQuestion
                                        && this.state.selectedQuestion.status === QuestionEnum.getStatusEnum().ANSWERED
                                    )}
                            />
                        </div>
                    </form>
                </Card>
            </div>
        );
    }
}