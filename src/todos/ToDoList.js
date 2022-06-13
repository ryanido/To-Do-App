import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TodoListItem from './ToDoListItem';
import { loadTodos, removeTodoRequest, updateTodoComplete } from './thunks';
import NewTodoForm from './NewTodoForm'
import styled from 'styled-components';
import { getTodosLoading, getCompletedTodos, getIncompleteTodos} from './selectors';

const ListWrapper = styled.div`
max-width: 700px;
margin: auto;
`;

function TodoList({ todos = [],completeTodos, incompleteTodos, onRemovePressed, onCompletePressed, isLoading, startLoadingTodos}) {
    useEffect(() => {
        startLoadingTodos();
    }, []);
    
    const loadingMessage = <div>Loading todos...</div>
    const content = (
        <ListWrapper>
            <NewTodoForm />
            <h3>Incomplete:</h3>
            {incompleteTodos.map(todo => <TodoListItem todo={todo} onRemovePressed ={onRemovePressed} onCompletePressed = {onCompletePressed} />)}
            <h3>Complete:</h3>
            {completeTodos.map(todo => <TodoListItem todo={todo} onRemovePressed ={onRemovePressed} onCompletePressed = {onCompletePressed} />)}
        </ListWrapper>
    )
    return isLoading ? loadingMessage : content;
}

const mapStateToProps = state => ({
    isLoading: getTodosLoading(state),
    completeTodos: getCompletedTodos(state),
    incompleteTodos: getIncompleteTodos(state),
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletePressed: id => dispatch(updateTodoComplete(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);