import React, {useEffect} from "react";
import {StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, Alert, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

const colors = {primary: '#1f145c', white: '#ffffff'}
const App = () => {
    const [textInput, setTextInput] = React.useState('')
    const [completedTodo, setCompletedTodo] = React.useState([]);
    const [unCompletedTodo, setUnCompletedTodo] = React.useState([]);
    const [completedTodoListView, setCompletedListView] = React.useState(false);
    const [unCompletedTodoListView, setUnCompletedTodoListView] = React.useState(false);
    const [allTodoView, setAllTodoView] = React.useState(true);

    const [todos, setTodos] = React.useState([
        {
            id: 1,
            task: 'Task 1',
            completed: true
        },
        {
            id: 2,
            task: 'Task 2',
            completed: false
        },
    ]);

    useEffect(() => {
        showMarkComplete();
        showUnComplete();
    }, [todos])

    const ListItem = ({todo}) => {
        return <View style={styles?.listItem}>
            <View style={{flex: 1}}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: colors?.primary,
                    textDecorationLine: todo?.completed ? "line-through" : "none"
                }}>{todo?.task}</Text>
            </View>
            {!todo?.completed &&
            <TouchableOpacity style={styles?.actionIcon} onPress={() => markTodoComplete(todo?.id)}>
                <Icon name={'done'} size={10} color={colors?.white}/>
            </TouchableOpacity>}
            {todo?.completed &&
            <TouchableOpacity style={styles?.actionIcon} onPress={() => markTodoUnComplete(todo?.id)}>
                <Icon name={'cancel'} size={10} color={colors?.white}/>
            </TouchableOpacity>}
            <TouchableOpacity style={styles?.actionIconTrash} onPress={() => deleteTodo(todo)}>
                <Icon name={'delete'} size={10} color={colors?.white}/>
            </TouchableOpacity>
        </View>
    }

    const addTodo = () => {
        if (textInput) {
            const newTodo = {
                id: Math.random(),
                task: textInput,
                completed: false
            }
            setTodos([...todos, newTodo]);
            setTextInput('');
        } else {
            Alert.alert('Error', 'Please add some todo');
        }
    }

    const markTodoComplete = todoId => {
        const newTodoList = todos?.map(todo => {
            if (todo?.id == todoId) {
                return {...todo, completed: true}
            }
            return todo;
        });
        setTodos(newTodoList)
    }

    const showMarkComplete = () => {
        const newTodoList = todos?.filter(todo => todo?.completed);
        setCompletedTodo(newTodoList);
    }

    const showUnComplete = () => {
        const newTodoList = todos?.filter(todo => !todo?.completed);
        setUnCompletedTodo(newTodoList);
    }

    const showAll = () => {
        setUnCompletedTodoListView(false);
        setCompletedListView(false);
        setAllTodoView(true);
    }

    const markTodoUnComplete = todoId => {
        const newTodoList = todos?.map(todo => {
            if (todo?.id == todoId) {
                return {...todo, completed: false}
            }
            return todo;
        });
        setTodos(newTodoList)
    }
    const deleteTodo = (todoItem) => {
        Alert.alert('confirm', `You want to delete? ${todoItem?.task}`, [
            {
                text: 'Yes',
                onPress: () => {
                    const newTodos = todos?.filter(todo => todo?.id !== todoItem?.id)
                    setTodos(newTodos);
                }
            },
            {
                text: 'No'
            }
        ]);
    }
    const clearTodos = () => {
        Alert.alert('confirm', 'Clear todos?', [
            {
                text: 'Yes',
                onPress: () => setTodos([])
            },
            {
                text: 'No'
            }
        ]);
    }
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors?.white}}>
            <View style={styles.header}>
                <View>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: colors?.primary}}>
                        TODO APP
                    </Text>
                </View>
                {!!todos?.length && <Icon name="delete" size={25} color={'red'} onPress={clearTodos}/>}
            </View>
            <Text style={{
                paddingLeft: 30,
                fontSize: 15,
                fontWeight: 'bold'
            }}>{completedTodoListView ? 'Completed Todo' : unCompletedTodoListView ? 'Un Completed Todos' : 'All Todos'}</Text>
            {allTodoView && <View><FlatList style={{marginBottom: 200}}
                                            showsVerticalScrollIndicator={false}
                                            contentContainerStyle={{padding: 20, paddingBottom: 20}}
                                            data={todos}
                                            renderItem={({item}) => <ListItem todo={item}/>}/>
                {(todos?.length === 0 && allTodoView) &&
                <Text style={{margin: 'auto', textAlign: 'center'}}>Add your todos</Text>}
            </View>}
            {completedTodoListView && <View><FlatList style={{marginBottom: 200}}
                                                      showsVerticalScrollIndicator={false}
                                                      contentContainerStyle={{padding: 20, paddingBottom: 20}}
                                                      data={completedTodo}
                                                      renderItem={({item}) => <ListItem todo={item}/>}/>
                {completedTodo?.length === 0 && <Text style={{textAlign: 'center'}}>No completed Todos</Text>}
            </View>}
            {unCompletedTodoListView &&
            <View><FlatList style={{marginBottom: 200}}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{padding: 20, paddingBottom: 20}}
                            data={unCompletedTodo}
                            renderItem={({item}) => <ListItem todo={item}/>}/>
                {unCompletedTodo?.length === 0 && <Text style={{textAlign: 'center'}}>No uncompleted Todos</Text>}
            </View>}
            <View style={styles.footer1}>
                <View style={styles?.inputBox}>
                    <TextInput placeholder={"Add Todo"} value={textInput} onChangeText={text => setTextInput(text)}/>
                </View>
                <TouchableOpacity onPress={addTodo}>
                    <View style={styles?.icon}>
                        <Icon name={'add'} size={30} color={colors?.white}/>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <View>
                    <Button
                        title="All Todos"
                        color="#841584"
                        onPress={() => {
                            showAll();
                        }}
                    />
                </View>
                <View>
                    <Button
                        title="Completed"
                        color="#841584"
                        onPress={() => {
                            setCompletedListView(true);
                            setUnCompletedTodoListView(false);
                            setAllTodoView(false);
                            showMarkComplete();
                        }}
                    />
                </View>
                <View>
                    <Button
                        title="Un completed"
                        color="#841584"
                        onPress={() => {
                            setUnCompletedTodoListView(true);
                            setCompletedListView(false);
                            setAllTodoView(false);
                            showUnComplete();
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 30,
        paddingTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    footer: {
        position: 'absolute',
        bottom: 10,
        color: colors?.white,
        flexDirection: 'row',
        display: 'flex',
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    footer1: {
        position: 'absolute',
        bottom: 80,
        color: colors?.white,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    inputBox: {
        backgroundColor: colors?.white,
        elevation: 40,
        flex: 1,
        height: 50,
        marginVertical: 20,
        marginRight: 20,
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 10
    },
    icon: {
        height: 50,
        width: 50,
        backgroundColor: colors?.primary,
        borderRadius: 50,
        elevation: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listItem: {
        padding: 20,
        backgroundColor: colors?.white,
        flexDirection: 'row',
        elevation: 12,
        borderRadius: 7,
        marginVertical: 10
    },
    actionIcon: {
        height: 25,
        width: 25,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        borderRadius: 3
    },
    actionIconTrash: {
        height: 25,
        width: 25,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        borderRadius: 3
    }
});

export default App;